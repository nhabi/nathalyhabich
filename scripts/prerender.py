#!/usr/bin/env python3
"""
Pre-renderiza el contenido de los proyectos como HTML estático para que Google lo lea sin JavaScript.

Qué hace:
  1. Páginas de proyecto (/<proyecto>/index.html y /en/<proyecto>/index.html):
     escribe el bloque del video principal + cuadro resumen (tomado de <proyecto>/project-gallery.js)
     y la grilla de fotos/videos (tomada de <proyecto>/media.json), con las mismas etiquetas y clases
     que genera project-gallery.js. El JS detecta data-prerendered="true" y solo activa galería y lightbox.
  2. Tarjetas de proyectos del home y de proyectos.html (ES y EN): escribe las tarjetas dentro de
     #portfolio-grid con el mismo HTML que genera el JS de cada página.
  3. Agrega a cada página de proyecto su bloque de datos estructurados JSON-LD (schema.org CreativeWork).

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

# Páginas con tarjetas de proyectos: idioma y si aceptan proyectos sin video (usan la primera imagen)
LISTING_PAGES = {
    "index.html": {"lang": "es", "allow_image": False},
    "en/index.html": {"lang": "en", "allow_image": False},
    "proyectos.html": {"lang": "es", "allow_image": True},
    "en/proyectos.html": {"lang": "en", "allow_image": True},
}


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
    return re.sub(r'(<div class="row" id="(?:lightgallery|portfolio-grid)">)\s*</div>', r"\1</div>", text)


# --------------------------------------------------------------------------- páginas de proyecto

def hero_copies(js: str) -> dict[str, str]:
    m = re.search(r"heroCopy\.innerHTML\s*=\s*isEnglish\s*\?\s*`(.*?)`\s*:\s*`(.*?)`\s*;", js, re.S)
    if not m:
        return {}
    return {"en": m.group(1), "es": m.group(2)}


def project_markup(data: dict, copy: str | None, indent: str) -> tuple[str, str]:
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
        else:
            inner = (f'<img src="{attr(src)}" alt="{attr(item.get("alt", ""))}" class="img-fluid" '
                     f'loading="lazy" decoding="async">')
        items.append(f'{indent}  <div class="{classes}" data-aos="fade" data-src="{attr(src)}">'
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
    return f'  {START}\n  <script type="application/ld+json">\n{payload}\n  </script>\n  {END}\n'


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
    hero, grid = project_markup(data, copy, indent)
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


# --------------------------------------------------------------------------- tarjetas (home / proyectos)

def card_markup(data: dict, lang: str, allow_image: bool) -> str | None:
    media = data.get("media") or []
    first_video = next((m for m in media if m.get("type") == "video"), None)
    first_image = next((m for m in media if m.get("type") == "image"), None)
    preview = first_video or (first_image if allow_image else None)
    title, href = data.get("title"), data.get("href")
    if not preview or not href or not title:
        return None
    if lang == "en":
        excerpt = data.get("excerpt_en") or data.get("excerpt") or ""
        href = data.get("href_en") or (f"/en{href}" if href.startswith("/") else href)
    else:
        excerpt = data.get("excerpt") or ""
    # Igual que el JS: título y excerpt se insertan tal cual (innerHTML)
    if preview.get("type") == "video":
        src = preview["src"]
        media_html = (f'<video src="{src}" poster="{poster_for(src)}" class="img-fluid" muted loop playsinline '
                      f'preload="none" data-lazy-video></video>')
    else:
        media_html = f'<img src="{preview["src"]}" class="img-fluid" alt="{title}" loading="lazy">'
    excerpt_html = f'<p class="portfolio-card__excerpt">{excerpt}</p>' if excerpt else ""
    return (
        f'<div class="col-lg-4">\n'
        f'        <a class="portfolio-card" href="{href}" aria-label="{title}">\n'
        f'          {media_html}\n'
        f'          <span class="portfolio-card__overlay">\n'
        f'            <span class="portfolio-card__content">\n'
        f'              <span class="btn btn-outline-white py-2 px-4 portfolio-card__button">{title}</span>\n'
        f'              {excerpt_html}\n'
        f'            </span>\n'
        f'          </span>\n'
        f'        </a>\n'
        f'      </div>'
    )


def run_listings() -> int:
    count = 0
    for rel, cfg in LISTING_PAGES.items():
        page = ROOT / rel
        if not page.exists():
            continue
        text, crlf = read(page)
        original = text
        text = strip_blocks(text)
        lst = re.search(r"const projects = \[(.*?)\];", text, re.S)
        m = re.search(r'\n([ \t]*)<div class="row" id="portfolio-grid"></div>', text)
        if not lst or not m:
            print(f"  ! {rel}: no encontré la lista de proyectos o #portfolio-grid, la salto")
            continue
        indent = m.group(1)
        cards = []
        for path in re.findall(r"'([^']+media\.json)'", lst.group(1)):
            media_file = ROOT / path.lstrip("/")
            if not media_file.exists():
                print(f"  ! {rel}: falta {path}")
                continue
            card = card_markup(json.loads(media_file.read_text(encoding="utf-8")), cfg["lang"], cfg["allow_image"])
            if card:
                cards.append(f"{indent}  {card}")
        new = (f'\n{indent}<div class="row" id="portfolio-grid" data-prerendered="true">\n'
               f"{indent}  {START}\n" + "\n".join(cards) + f"\n{indent}  {END}\n{indent}</div>")
        text = text[:m.start()] + new + text[m.end():]
        if text != original:
            write(page, text, crlf)
            print(f"  ✓ {rel} ({len(cards)} tarjetas)")
        count += 1
    return count


def main() -> int:
    print("Páginas de proyecto:")
    n1 = run_projects()
    print("Tarjetas de proyectos:")
    n2 = run_listings()
    print(f"Listo: {n1} páginas de proyecto y {n2} páginas con tarjetas revisadas.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
