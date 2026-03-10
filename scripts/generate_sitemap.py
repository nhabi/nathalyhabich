#!/usr/bin/env python3
"""Genera un sitemap.xml automáticamente a partir de páginas y proyectos."""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
import re
from urllib.parse import quote
from xml.etree.ElementTree import Element, SubElement, tostring
from xml.dom import minidom


DEFAULT_BASE_URL = "https://nathalyhabich.me"


def normalize_path(path: str) -> str:
    clean = path.strip()
    if not clean:
        return "/"
    if not clean.startswith("/"):
        clean = f"/{clean}"
    if clean.endswith("/index.html"):
        clean = clean[: -len("index.html")]

    if clean == "/index":
        return "/"
    if clean != "/" and not clean.endswith("/"):
        clean = f"{clean}/"
    return clean


def is_noindex_html(html_path: Path) -> bool:
    try:
        head = html_path.read_text(encoding="utf-8", errors="ignore")[:3000].lower()
    except OSError:
        return False
    return bool(re.search(r"<meta[^>]+name=['\" ]?robots['\" ]?[^>]+content=['\" ][^'\"]*noindex", head))


def discover_static_pages(repo_root: Path) -> set[str]:
    urls: set[str] = set()

    directory_routes: set[str] = set()
    for index_file in repo_root.glob("*/index.html"):
        if is_noindex_html(index_file):
            continue
        route = normalize_path(f"/{index_file.parent.name}/index.html")
        directory_routes.add(route)
        urls.add(route)

    for html_file in repo_root.glob("*.html"):
        if is_noindex_html(html_file):
            continue
        if html_file.name == "index.html":
            urls.add("/")
            continue

        # Evita duplicar /slug.html cuando ya existe /slug/
        route_with_slash = normalize_path(f"/{html_file.stem}/index.html")
        if route_with_slash in directory_routes:
            continue

        urls.add(f"/{html_file.name}")

    return urls


def discover_project_pages(repo_root: Path) -> set[str]:
    urls: set[str] = set()

    for media_file in sorted(repo_root.glob("*/media.json")):
        try:
            data = json.loads(media_file.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            continue

        href = data.get("href")
        if isinstance(href, str) and href.strip():
            urls.add(normalize_path(href))

    return urls


def build_sitemap(url_paths: set[str], base_url: str, lastmod: str) -> str:
    urlset = Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")

    for path in sorted(url_paths):
        url = SubElement(urlset, "url")
        loc = SubElement(url, "loc")
        encoded_path = quote(path, safe="/")
        loc.text = f"{base_url.rstrip('/')}{encoded_path}"
        mod = SubElement(url, "lastmod")
        mod.text = lastmod

    xml_raw = tostring(urlset, encoding="utf-8")
    parsed = minidom.parseString(xml_raw)
    return parsed.toprettyxml(indent="  ", encoding="utf-8").decode("utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Genera sitemap.xml automáticamente")
    parser.add_argument(
        "--base-url",
        default=DEFAULT_BASE_URL,
        help=f"URL base del sitio (default: {DEFAULT_BASE_URL})",
    )
    parser.add_argument(
        "--output",
        default="sitemap.xml",
        help="Ruta de salida para el sitemap (default: sitemap.xml)",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    repo_root = Path(__file__).resolve().parent.parent
    lastmod = datetime.now(timezone.utc).date().isoformat()

    all_paths = discover_static_pages(repo_root)
    all_paths.update(discover_project_pages(repo_root))

    sitemap_content = build_sitemap(all_paths, args.base_url, lastmod)
    output_path = (repo_root / args.output).resolve()
    output_path.write_text(sitemap_content, encoding="utf-8")
    print(f"Sitemap generado con {len(all_paths)} URLs en {output_path}")


if __name__ == "__main__":
    main()
