#!/usr/bin/env python3
"""Merge agent translations into src/content/i18n/<loc>.json.

usage: merge.py [--write] LOCALE...   (run from the repo root)

Reads <scratch>/<loc>.json (flat {key: translation}) and <loc>.todo.json,
checks the key set, then inserts each key into the locale bundle right after
the nearest preceding English sibling that the bundle already has. Existing
entries are never changed or reordered.
"""
import json
import sys
from pathlib import Path

S = Path(__file__).parent
REPO = Path.cwd()
KEEP_EN = {"API", "SSO", "DNS", "TLS", "REST", "SDK", "TextProv", "Single sign-on (SSO)", "Self-hosting", "API & SDKs"}


def nested_path(en, key):
    """Resolve a flat key against en.json's real structure."""
    if key in en:
        return [key]
    head, _, rest = key.partition(".")
    if isinstance(en.get(head), dict):
        sub = nested_path(en[head], rest)
        if sub:
            return [head] + sub
    return None


def insert_after(obj, anchor, key, value):
    items = list(obj.items())
    out = {}
    if anchor is None:
        out[key] = value
    for k, v in items:
        out[k] = v
        if k == anchor:
            out[key] = value
    obj.clear()
    obj.update(out)


def load(path):
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)


def merge(loc, write):
    en = load(REPO / "src/content/i18n/en.json")
    bundle_path = REPO / f"src/content/i18n/{loc}.json"
    bundle = load(bundle_path)
    todo = {r["key"]: r["en"] for r in load(S / f"{loc}.todo.json")["labels"]}
    got = load(S / f"{loc}.json")
    def values(d):
        for v in d.values():
            yield from values(v) if isinstance(v, dict) else (v,)
    existing = set(values(bundle))
    problems = []
    if set(got) != set(todo):
        problems.append(f"key set differs: missing={sorted(set(todo) - set(got))} extra={sorted(set(got) - set(todo))}")
    for k, v in got.items():
        if not isinstance(v, str) or not v.strip():
            problems.append(f"{k}: empty")
        # A value the bundle already uses elsewhere is accepted even when it
        # equals the English: the locale has already chosen to keep that term.
        elif k in todo and v == todo[k] and v not in KEEP_EN and v not in existing:
            problems.append(f"{k}: identical to English ({v!r})")
        elif v != v.strip():
            problems.append(f"{k}: surrounding whitespace")
        elif "\U000E0101" in v:
            problems.append(f"{k}: contains provenance mark")
    if problems:
        print(f"{loc}: NOT merged")
        for p in problems:
            print("  ", p)
        return False
    inserted = 0
    for key in todo:  # todo is in en order
        path = nested_path(en, key)
        parent_en, parent_b = en, bundle
        for part in path[:-1]:
            parent_en = parent_en[part]
            parent_b = parent_b.setdefault(part, {})
        leaf = path[-1]
        if leaf in parent_b:
            continue
        anchor = None
        for k in parent_en:
            if k == leaf:
                break
            if k in parent_b:
                anchor = k
        insert_after(parent_b, anchor, leaf, got[key])
        inserted += 1
    print(f"{loc}: {inserted} keys inserted")
    if write:
        # Re-serialises the whole bundle, dropping blank grouping lines. The
        # locale bundles have none; do not point this at en.json.
        with open(bundle_path, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(json.dumps(bundle, ensure_ascii=False, indent=2) + "\n")
    return True


if __name__ == "__main__":
    args = sys.argv[1:]
    write = "--write" in args
    # Merge every locale before deciding, so one failure does not hide the rest.
    results = [merge(loc, write) for loc in args if loc != "--write"]
    sys.exit(0 if all(results) else 1)
