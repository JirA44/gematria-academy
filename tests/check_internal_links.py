#!/usr/bin/env python3
"""Check local HTML resources across the repository and the production route graph.

The explicit exception manifest is limited to unlinked legacy/demo pages. All
HTML files are scanned; exceptions are exact page+URL pairs, and stale entries
fail so they cannot silently hide a repaired or changed reference.
"""
from __future__ import annotations

import json
import os
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
ROUTE_MAP_PATH = ROOT / "tests" / "fixtures" / "production-routes.json"
EXCEPTIONS_PATH = ROOT / "tests" / "fixtures" / "internal-link-exceptions.json"
ATTRIBUTES = {"href", "src", "poster"}
IGNORED_SCHEMES = {"data", "javascript", "mailto", "tel", "blob"}


class LocalReferenceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.references: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for name, value in attrs:
            normalized_name = name.lower()
            if normalized_name in ATTRIBUTES and value:
                self.references.append(value.strip())
            elif normalized_name == "onclick" and value:
                # Resolve literal location.href assignments used for navigation.
                self.references.extend(match.group(1) for match in re.finditer(r"(?:window\.)?location\.href\s*=\s*['\"]([^'\"]+)['\"]", value))

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)


def local_target(page: str, reference: str) -> str | None:
    parsed = urlsplit(reference)
    if parsed.scheme.lower() in IGNORED_SCHEMES or parsed.netloc:
        return None
    raw_path = unquote(parsed.path)
    if not raw_path:
        return None
    if raw_path == "/":
        return "index.html"
    if raw_path.startswith("/"):
        candidate = ROOT / raw_path.lstrip("/")
    else:
        candidate = ROOT / Path(page).parent / raw_path
    normalized = Path(os.path.normpath(str(candidate)))
    try:
        relative = normalized.relative_to(ROOT).as_posix()
    except ValueError:
        return "__outside_repository__"
    if normalized.is_dir():
        relative = (Path(relative) / "index.html").as_posix()
    return relative


def parse_page(page: str) -> list[str]:
    parser = LocalReferenceParser()
    parser.feed((ROOT / page).read_text(encoding="utf-8"))
    return parser.references


def main() -> int:
    route_data = json.loads(ROUTE_MAP_PATH.read_text(encoding="utf-8"))
    expected_routes = set(route_data["routes"])
    actual_routes = set()
    html_files = sorted(path.relative_to(ROOT).as_posix() for path in ROOT.rglob("*.html"))
    for page in html_files:
        for reference in parse_page(page):
            target = local_target(page, reference)
            if target and target.endswith(".html") and (ROOT / target).is_file():
                actual_routes.add(target)

    discovered = {"index.html"}
    pending = ["index.html"]
    while pending:
        page = pending.pop()
        for reference in parse_page(page):
            target = local_target(page, reference)
            if target and target.endswith(".html") and (ROOT / target).is_file() and target not in discovered:
                discovered.add(target)
                pending.append(target)

    unresolved: set[tuple[str, str]] = set()
    for page in html_files:
        for reference in parse_page(page):
            target = local_target(page, reference)
            if target and target != "__outside_repository__" and not (ROOT / target).exists():
                unresolved.add((page, reference))
            elif target == "__outside_repository__":
                unresolved.add((page, reference))

    manifest = json.loads(EXCEPTIONS_PATH.read_text(encoding="utf-8"))
    expected_exceptions = {
        (page, reference)
        for page, record in manifest.items()
        for reference in record["links"]
    }
    routes_missing_files = sorted(route for route in expected_routes if not (ROOT / route).is_file())
    route_map_mismatch = sorted(expected_routes ^ discovered)
    exceptions_on_routes = sorted(page for page, _ in expected_exceptions if page in expected_routes)
    unexpected = sorted(unresolved - expected_exceptions)
    stale = sorted(expected_exceptions - unresolved)

    errors = []
    if routes_missing_files:
        errors.append(f"route-map files missing: {routes_missing_files}")
    if route_map_mismatch:
        errors.append(f"production route map differs from link crawl: {route_map_mismatch}")
    if exceptions_on_routes:
        errors.append(f"exceptions overlap production routes: {exceptions_on_routes}")
    if unexpected:
        errors.append(f"unallowlisted local references: {unexpected}")
    if stale:
        errors.append(f"stale exception entries: {stale}")
    if errors:
        print("\n".join(errors))
        return 1
    print(
        f"Checked {len(html_files)} HTML files; "
        f"{len(expected_routes)} production routes are reachable and present; "
        f"{len(expected_exceptions)} exact broken references remain only on explicitly deferred legacy/demo pages."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
