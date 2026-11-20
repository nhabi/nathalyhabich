#!/usr/bin/env python3
"""
Pre-renderiza el contenido de los proyectos como HTML estático para que Google lo lea sin JavaScript.

Qué hace:
  1. Páginas de proyecto (/<proyecto>/index.html y /en/<proyecto>/index.html):
     escribe el bloque del video principal + cuadro resumen (tomado de <proyecto>/project-gallery.js)
     y la grilla de fotos/videos (tomada de <proyecto>/media.json), con las mismas etiquetas y clases
     que genera project-gallery.js. El JS detecta data-prerendered="true" y solo activa galería y lightbox.
  2. Grillas de proyectos (home, /tv/, /streaming/, /esports-y-eventos/ y proyectos.html, ES y EN):
     escribe las tarjetas de cada <div class="grilla" data-proyectos="..."> con el mismo HTML que
     genera js/nh-grilla.js. Nombre y cliente salen de data/proyectos.json.
  3. Agrega a cada página de proyecto su meta description (el excerpt) y su bloque de datos
     estructurados JSON-LD (schema.org CreativeWork). En las páginas en inglés traduce los alts.

Es idempotente: se puede correr las veces que haga falta; reemplaza lo que generó la vez anterior.

Uso (desde la raíz del repo):
    python scripts/prerender.py
"""
from __future__ import annotations

import html
import json
import re
import sys
import time
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://nathalyhabich.me"

START = "<!-- prerender:start (generado por scripts/prerender.py, no editar a mano) -->"
END = "<!-- prerender:end -->"
BLOCK_RE = re.compile(r"[ \t]*" + re.escape(START) + r".*?" + re.escape(END) + r"\n?", re.S)

def attr(value: str) -> str:
    return html.escape(value or "", quote=True)


def poster_for(src: str) -> str:
    return re.sub(r"\.mp4$", "-poster.webp", src, flags=re.I)


def read(path: Path) -> tuple[str, bool]:
    raw = path.read_bytes().decode("utf-8")
    crlf = "\r\n" in raw
    return raw.replace("\r\n", "\n"), crlf


def write(path: Path, text: str, crlf: bool) -> None:
    if crlf:
        text = text.replace("\n", "\r\n")
    data = text.encode("utf-8")
    for attempt in range(10):  # en Windows el archivo puede estar bloqueado un instante (antivirus, sync)
        try:
            path.write_bytes(data)
            return
        except OSError:
            if attempt == 9:
                raise
            time.sleep(0.5)


def strip_blocks(text: str) -> str:
    text = BLOCK_RE.sub("", text)
    text = text.replace(' data-prerendered="true"', "")
    text = re.sub(r'(<div class="row" id="(?:lightgallery|portfolio-grid)">)\s*</div>', r"\1</div>", text)
    return re.sub(r'(<div class="grilla" data-proyectos="[^"]*" data-lang="(?:es|en)">)\s*</div>', r"\1</div>", text)


# --------------------------------------------------------------------------- páginas de proyecto

def hero_copies(js: str) -> dict[str, str]:
    m = re.search(r"heroCopy\.innerHTML\s*=\s*isEnglish\s*\?\s*`(.*?)`\s*:\s*`(.*?)`\s*;", js, re.S)
    if not m:
        return {}
    return {"en": m.group(1), "es": m.group(2)}


def lightbox_video_html(src: str) -> str:
    # Debe coincidir con lightboxVideoHtml() de project-gallery.js
    return (f'<video class="lg-video-object lg-html5" controls muted loop playsinline preload="none">'
            f'<source src="{attr(src)}" type="video/mp4"></video>')


def localize_alt(alt: str, lang: str) -> str:
    if lang == "en":
        return alt.replace(" – dirección de arte – foto ", " – art direction – photo ")
    return alt


def project_markup(data: dict, copy: str | None, indent: str, lang: str = "es") -> tuple[str, str]:
    media = data.get("media") or []
    first_video = next((m for m in media if m.get("type") == "video"), None)

    hero = ""
    if first_video:
        src = first_video["src"]
        hero = (
            f'{indent}<div class="project-video-hero">'
            f'<div class="project-video-hero-media">'
            f'<video src="{attr(src)}" class="img-fluid" autoplay muted loop playsinline preload="metadata" '
            f'poster="{attr(poster_for(src))}"></video></div>'
            f'<div class="project-video-hero-copy">{copy or ""}</div></div>\n'
        )

    items = []
    first_hidden = False
    for item in media:
        src = item.get("src", "")
        classes = "col-sm-6 col-md-4 col-lg-4 col-xl-4 item"
        if item.get("type") == "video":
            if not first_hidden and first_video and src == first_video["src"]:
                classes += " desktop-hide-first-video"
                first_hidden = True
            inner = (f'<video src="{attr(src)}" poster="{attr(poster_for(src))}" class="img-fluid" '
                     f'muted loop playsinline preload="none" data-lazy-video></video>')
            # lightGallery v1 abre los videos HTML5 desde data-html (no desde data-src)
            lightbox = (f'data-html="{attr(lightbox_video_html(src))}" data-poster="{attr(poster_for(src))}" '
                        f'data-thumb="{attr(poster_for(src))}"')
        else:
            inner = (f'<img src="{attr(src)}" alt="{attr(localize_alt(item.get("alt", ""), lang))}" class="img-fluid" '
                     f'loading="lazy" decoding="async">')
            lightbox = f'data-src="{attr(src)}" data-thumb="{attr(src)}"'
        items.append(f'{indent}  <div class="{classes}" data-aos="fade" {lightbox}>'
                     f'<a href="#">{inner}</a></div>')
    grid = "\n".join(items)
    return hero, grid


def absolute_url(path: str) -> str:
    return SITE + quote(path, safe="/:%()")


def creative_work_jsonld(text: str, data: dict, lang: str, folder: str) -> str:
    media = data.get("media") or []
    first_image = next((m for m in media if m.get("type") == "image"), None)
    first_video = next((m for m in media if m.get("type") == "video"), None)
    if first_image:
        image = absolute_url(first_image["src"])
    elif first_video:
        image = absolute_url(poster_for(first_video["src"]))
    else:
        image = None
    canonical = re.search(r'<link rel="canonical" href="([^"]+)"', text)
    url = canonical.group(1) if canonical else f"{SITE}{'/en' if lang == 'en' else ''}/{folder}/"
    description = (data.get("excerpt_en") if lang == "en" else None) or data.get("excerpt") or ""
    work = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": data.get("title", ""),
        "description": re.sub(r"<[^>]+>", "", description),
        "url": url,
        "inLanguage": lang,
        "author": {"@type": "Person", "name": "Nathaly Habich", "url": f"{SITE}/"},
    }
    if image:
        work["image"] = image
    payload = json.dumps(work, ensure_ascii=False, indent=2).replace("</", "<\\/")
    payload = "\n".join("  " + line for line in payload.split("\n"))
    plain = re.sub(r"<[^>]+>", "", description).strip()
    meta = ""
    if plain and not re.search(r'<meta name="description"', text):
        meta = f'  <meta name="description" content="{attr(plain)}">\n'
    return f'  {START}\n{meta}  <script type="application/ld+json">\n{payload}\n  </script>\n  {END}\n'


def prerender_project_page(page: Path, data: dict, copy: str | None, lang: str, folder: str) -> bool:
    text, crlf = read(page)
    original = text
    text = strip_blocks(text)
    # Datos estructurados (JSON-LD CreativeWork) al final del <head>
    head_end = text.find("</head>")
    if head_end != -1:
        text = text[:head_end] + creative_work_jsonld(text, data, lang, folder) + text[head_end:]
    m = re.search(r'\n([ \t]*)<div class="row" id="lightgallery"></div>', text)
    if not m:
        print(f"  ! {page.relative_to(ROOT)}: no encontré <div id=\"lightgallery\">, la salto")
        return False
    indent = m.group(1)
    hero, grid = project_markup(data, copy, indent, lang)
    new = "\n"
    if hero:
        new += f"{indent}{START}\n{hero}{indent}{END}\n"
    new += (f'{indent}<div class="row" id="lightgallery" data-prerendered="true">\n'
            f"{indent}  {START}\n{grid}\n{indent}  {END}\n{indent}</div>")
    text = text[:m.start()] + new + text[m.end():]
    if text != original:
        write(page, text, crlf)
        return True
    return False


def run_projects() -> int:
    count = 0
    for media_file in sorted(ROOT.glob("*/media.json")):
        folder = media_file.parent
        js_file = folder / "project-gallery.js"
        if not js_file.exists():
            continue
        data = json.loads(media_file.read_text(encoding="utf-8"))
        copies = hero_copies(js_file.read_text(encoding="utf-8"))
        for lang, page in (("es", folder / "index.html"), ("en", ROOT / "en" / folder.name / "index.html")):
            if not page.exists():
                continue
            if prerender_project_page(page, data, copies.get(lang), lang, folder.name):
                print(f"  ✓ {page.relative_to(ROOT).as_posix()}")
            count += 1
    return count


# --------------------------------------------------------------------------- grillas de proyectos

GRILLA_RE = re.compile(r'\n([ \t]*)<div class="grilla" data-proyectos="([^"]*)" data-lang="(es|en)"></div>')


def es_ancha(i: int, total: int) -> bool:
    """Ritmo: una ancha y dos medianas; si al final sobran dos, van las dos medianas (igual que js/nh-grilla.js)."""
    if total % 3 == 2 and i >= total - 2:
        return False
    return i % 3 == 0


def card_html(slug: str, datos: dict, media: dict, i: int, total: int, lang: str) -> str:
    """Mantener idéntico a tarjeta() de js/nh-grilla.js."""
    nombre = datos.get("nombre_en") if lang == "en" and datos.get("nombre_en") else datos["nombre"]
    href = ("/en/" if lang == "en" else "/") + slug + "/"
    items = media.get("media") or []
    video = next((m for m in items if m.get("type") == "video"), None)
    foto = next((m for m in items if m.get("type") == "image"), None)
    if video:
        visual = (f'<video src="{attr(video["src"])}" poster="{attr(poster_for(video["src"]))}" '
                  f'muted loop playsinline preload="none" data-lazy-video></video>')
    elif foto:
        visual = f'<img src="{attr(foto["src"])}" alt="{attr(nombre)}" loading="lazy" decoding="async">'
    else:
        visual = ""
    clase = "tarjeta tarjeta--ancha" if es_ancha(i, total) else "tarjeta"
    return (f'<a class="{clase}" href="{href}">'
            f'<div class="tarjeta__media">{visual}</div>'
            f'<p class="tarjeta__pie"><span class="tarjeta__numero" aria-hidden="true">{i + 1:02d}</span>'
            f'<span class="tarjeta__nombre">{attr(nombre)}</span>'
            f'<span class="tarjeta__cliente">— {attr(datos["cliente"])}</span></p></a>')


def run_grillas() -> int:
    """Escribe las tarjetas de cada <div class="grilla" data-proyectos="..." data-lang="..."> del sitio."""
    catalogo = json.loads((ROOT / "data" / "proyectos.json").read_text(encoding="utf-8"))["proyectos"]
    count = 0
    for page in sorted(ROOT.rglob("*.html")):
        rel = page.relative_to(ROOT).as_posix()
        if rel.startswith(("brand/", "_originales/", "fonts/")):
            continue
        text, crlf = read(page)
        if 'class="grilla" data-proyectos=' not in text:
            continue
        original = text
        text = strip_blocks(text)

        def reemplazar(m: re.Match) -> str:
            indent, lista, lang = m.group(1), m.group(2), m.group(3)
            pedidos = [s.strip() for s in lista.split(",") if s.strip()]
            slugs = [s for s in pedidos if s in catalogo]
            faltan = [s for s in pedidos if s not in catalogo]
            if faltan:
                print(f"  ! {rel}: no están en data/proyectos.json: {', '.join(faltan)}")
            cards = []
            for n, slug in enumerate(slugs):
                media = json.loads((ROOT / slug / "media.json").read_text(encoding="utf-8"))
                cards.append(f"{indent}  " + card_html(slug, catalogo[slug], media, n, len(slugs), lang))
            return (f'\n{indent}<div class="grilla" data-proyectos="{lista}" data-lang="{lang}" data-prerendered="true">\n'
                    f"{indent}  {START}\n" + "\n".join(cards) + f"\n{indent}  {END}\n{indent}</div>")

        text = GRILLA_RE.sub(reemplazar, text)
        if text != original:
            write(page, text, crlf)
            print(f"  ✓ {rel}")
        count += 1
    return count


def main() -> int:
    print("Páginas de proyecto:")
    n1 = run_projects()
    print("Grillas de proyectos:")
    n2 = run_grillas()
    print(f"Listo: {n1} páginas de proyecto y {n2} páginas con grilla revisadas.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
