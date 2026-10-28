#!/usr/bin/env python3
"""Check baseline metadata and canonical sitemap coverage for every HTML document."""
from html.parser import HTMLParser
from pathlib import Path
import json
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", "node_modules", ".github"}

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = False
        self.title_text = ""
        self.lang = ""
        self.viewport = False
        self.description = False
        self.h1 = False
        self.in_title = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang", "").strip()
        elif tag == "title":
            self.in_title = True
        elif tag == "meta":
            name = a.get("name", "").lower()
            if name == "viewport" and a.get("content", "").strip():
                self.viewport = True
            if name == "description" and a.get("content", "").strip():
                self.description = True
        elif tag == "h1":
            self.h1 = True

    def handle_endtag(self, tag):
        if tag == "title":
            self.title = bool(self.title_text.strip())
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title_text += data

def html_files():
    for path in ROOT.rglob("*.html"):
        if not any(part in SKIP_DIRS for part in path.relative_to(ROOT).parts):
            yield path

errors = []
pages = list(html_files())
if not pages:
    errors.append("No HTML documents found")
for path in pages:
    parser = PageParser()
    try:
        parser.feed(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError) as exc:
        errors.append(f"{path.relative_to(ROOT)}: cannot read ({exc})")
        continue
    missing = []
    if not parser.title: missing.append("title")
    if not parser.lang: missing.append("html lang")
    if not parser.viewport: missing.append("viewport")
    if not parser.description: missing.append("meta description")
    if not parser.h1: missing.append("h1")
    if missing:
        errors.append(f"{path.relative_to(ROOT)}: missing {', '.join(missing)}")

fixture = json.loads((ROOT / "tests/fixtures/production-routes.json").read_text(encoding="utf-8"))
excluded = {
    "index_ecritures_sacrees.html", "index_mega_enriched.html",
    "index_principal.html", "index_production.html", "index_standard.html",
    "pages/user/login.html", "pages/user/profile.html",
    "pages/versions/index_enrichi.html", "pages/versions/index_mega_enriched.html",
}
expected = {route for route in fixture["routes"] if route not in excluded}
namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
try:
    root = ET.parse(ROOT / "sitemap.xml").getroot()
    actual = {
        loc.text.removeprefix("https://gematria-academy.pages.dev/")
        for loc in root.findall(".//sm:loc", namespace)
        if loc.text and loc.text.startswith("https://gematria-academy.pages.dev/")
    }
    if actual != expected:
        errors.append(f"sitemap route mismatch: {len(expected - actual)} missing, {len(actual - expected)} unexpected")
except (ET.ParseError, OSError) as exc:
    errors.append(f"sitemap.xml: invalid ({exc})")

robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
if "Sitemap: https://gematria-academy.pages.dev/sitemap.xml" not in robots:
    errors.append("robots.txt: missing canonical sitemap URL")

if errors:
    print("\n".join(f"ERROR: {error}" for error in errors))
    sys.exit(1)
print(f"Metadata and sitemap checks passed for {len(pages)} HTML documents and {len(expected)} canonical routes.")
