#!/usr/bin/env python3
"""Build the per-locale review scaffold: clean copies, file lists, structure parity.

usage: REPO=<docs checkout> prep.py   (REPO defaults to the current directory)
"""
import os
import re
import subprocess
import sys
from pathlib import Path

REPO = Path(os.environ.get("REPO", Path.cwd()))
S = Path(__file__).resolve().parent
MARK = "\U000E0101"

# The per-locale re-sync commits reviewed in October 2026 (branch
# i18n/latest-content). Replace them for another round; a history rewrite
# leaves these unreachable.
COMMITS = {
    "bg": "908c2faa", "da": "c22761f4", "de": "ff448649", "es": "2c4c6391",
    "fr": "c51c3016", "it": "ba198352", "ja": "28d63ed7", "ko": "7ef8d9b8",
    "mi": "4f5b2724", "nl": "6a1e221a", "pl": "6fecb636", "pt-br": "67f15567",
    "sv": "09f59016", "tr": "64c5d969", "uk": "c14b0c6d", "zh-cn": "d30489ac",
}


def git(*args):
    return subprocess.run(["git", "-C", str(REPO), *args], check=True,
                          capture_output=True, text=True).stdout


def show(path, rev="HEAD"):
    try:
        return git("show", f"{rev}:{path}")
    except subprocess.CalledProcessError:
        return None


def split_fm(text):
    m = re.match(r"^---\n(.*?)\n---\n?(.*)$", text, re.S)
    return (m.group(1), m.group(2)) if m else ("", text)


FENCE = re.compile(r"^(```|~~~)", re.M)


def fences(body):
    blocks, cur, inside = [], [], False
    for line in body.splitlines():
        if FENCE.match(line.strip()):
            if inside:
                blocks.append("\n".join(cur))
                cur, inside = [], False
            else:
                inside, cur = True, [line.strip()]
            continue
        if inside:
            cur.append(line)
    return blocks


def strip_code(body):
    out, inside = [], False
    for line in body.splitlines():
        if FENCE.match(line.strip()):
            inside = not inside
            continue
        if not inside:
            out.append(line)
    return "\n".join(out)


def headings(body):
    return [len(m.group(1)) for m in re.finditer(r"^(#{1,6})\s", strip_code(body), re.M)]


LINK = re.compile(r"\]\(([^)\s]+)")
HREF = re.compile(r'href="([^"]+)"')


def links(body, loc):
    prose = strip_code(body)
    urls = LINK.findall(prose) + HREF.findall(prose)
    return [re.sub(rf"^/{re.escape(loc)}/", "/en/", u) for u in urls]


def tags(body):
    return re.findall(r"\{%\s*/?\s*([a-zA-Z_-]+)", body)


def report(loc, pages, tree):
    lines = [f"# Structural parity: {loc} vs en (HEAD), U+E0101 marks stripped", ""]
    for page in pages:
        en = (S / "en" / page).read_text()
        tr = (S / loc / "clean" / page).read_text()
        efm, ebody = split_fm(en)
        tfm, tbody = split_fm(tr)
        notes = []
        eh, th = headings(ebody), headings(tbody)
        if eh != th:
            notes.append(f"headings differ: en {eh} vs {loc} {th}")
        if 1 in th:
            notes.append("body H1 present")
        ef, tf = fences(ebody), fences(tbody)
        if len(ef) != len(tf):
            notes.append(f"code block count: en {len(ef)} vs {loc} {len(tf)}")
        else:
            diff = [i + 1 for i, (a, b) in enumerate(zip(ef, tf)) if a != b]
            if diff:
                notes.append(f"code blocks whose content differs from en (comments may be translated): #{diff}")
        el, tl = links(ebody, loc), links(tbody, loc)
        missing = sorted(set(el) - set(tl))
        extra = sorted(set(tl) - set(el))
        if missing:
            notes.append(f"links in en missing from {loc}: {missing}")
        if extra:
            notes.append(f"links in {loc} not in en: {extra}")
        if len(el) != len(tl):
            notes.append(f"link count: en {len(el)} vs {loc} {len(tl)}")
        # /en/ links that could point at an existing locale page
        en_links = [u for u in LINK.findall(strip_code(tbody)) if u.startswith("/en/")]
        fixable = sorted({u for u in en_links
                          if u.split("#")[0].strip("/").removeprefix("en/").rstrip("/") in tree})
        if fixable:
            notes.append(f"/en/ links whose target exists in {loc} tree: {fixable}")
        if tags(ebody) != tags(tbody):
            notes.append(f"markdoc tags differ: en {tags(ebody)} vs {loc} {tags(tbody)}")
        ekeys = re.findall(r"^([A-Za-z]+):", efm, re.M)
        tkeys = re.findall(r"^([A-Za-z]+):", tfm, re.M)
        meta = {"textprov", "audience", "pageType", "sourceOfTruth", "plan"}
        if set(ekeys) - meta != set(tkeys) - meta:
            notes.append(f"frontmatter keys: en {ekeys} vs {loc} {tkeys}")
        ratio = len(tbody) / max(1, len(ebody))
        notes.append(f"body length ratio {loc}/en = {ratio:.2f} (chars)")
        lines.append(f"## {page}")
        lines += [f"- {n}" for n in notes]
        lines.append("")
    return "\n".join(lines)


def main():
    head = git("rev-parse", "--short", "HEAD").strip()
    union = set()
    per_loc = {}
    for loc, sha in COMMITS.items():
        files = git("show", "--name-only", "--format=", sha).split()
        pages = [f.removeprefix(f"src/content/docs/{loc}/") for f in files
                 if f.startswith(f"src/content/docs/{loc}/")]
        per_loc[loc] = pages
        union.update(pages)
        d = S / loc
        (d / "clean").mkdir(parents=True, exist_ok=True)
        (d / "files.txt").write_text("\n".join(pages) + "\n")
        for p in pages:
            text = show(f"src/content/docs/{loc}/{p}")
            out = d / "clean" / p
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_text(text.replace(MARK, ""))
    for p in sorted(union):
        text = show(f"src/content/docs/en/{p}")
        if text is None:
            sys.exit(f"missing en source for {p}")
        out = S / "en" / p
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(text.replace(MARK, ""))
    for loc, pages in per_loc.items():
        tree = set()
        for p in (REPO / "src/content/docs" / loc).rglob("*.md*"):
            rel = p.relative_to(REPO / "src/content/docs" / loc).with_suffix("")
            slug = rel.parent if rel.name == "index" else rel
            tree.add("" if slug == Path(".") else slug.as_posix())
        (S / loc / "locale-tree.txt").write_text("\n".join(sorted(t for t in tree if t)) + "\n")
        (S / loc / "structure.md").write_text(report(loc, pages, tree))
    (S / "HEAD_SHA").write_text(head + "\n")
    print(head, {k: len(v) for k, v in per_loc.items()}, len(union))


if __name__ == "__main__":
    main()
