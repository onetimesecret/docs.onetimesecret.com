#!/usr/bin/env python3
"""Re-anchor TextProv marks so a branch passes `dogfood.py check` against BASE.

`dogfood.py check` aligns whole files, so edits that each passed `--base HEAD`
can fail against the PR merge-base: new AI text that equals legacy text at the
shifted alignment reads as "marked unchanged legacy text", and marks that
earlier rounds moved read as lost. This script rewrites the marks only; the
plain text never changes.

For every cluster the check matches to an unchanged base cluster whose bytes
differ, restore the base bytes. Strip a mark that sits outside eligible prose.
With --strict, also mark remaining new eligible prose as AI; use it only when
every new prose cluster on the branch is AI-authored.

usage (from the repo root):
    python3 tools/textprov_reanchor.py BASE [--strict] [--write] FILE...

Without --write it only reports. Afterwards run
`python3 tools/dogfood.py check --base BASE` (and `--preserve-only`).
"""
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import dogfood  # noqa: E402
from dogfood import textprov  # noqa: E402


def fix(path, before, after, strict=False):
    old, new = dogfood.clusters(before), dogfood.clusters(after)
    matches = dogfood.correspondence(old, new)
    offsets = dogfood.eligible_offsets(path, textprov.strip_marks(after))
    out, changed = [], 0
    for index, item in enumerate(new):
        raw = item.raw
        if index in matches:
            original = old[matches[index]]
            if original.raw != item.raw and original.text == item.text:
                raw = original.raw
        elif not dogfood.eligible(item, offsets):
            if item.state:
                raw = item.text
        elif strict and item.state not in textprov.GENERATED_STATES:
            raw = textprov.mark(item.text, state="ai")
        elif item.state in textprov.GENERATED_STATES and item.raw != textprov.mark(item.text, state=item.state):
            raw = textprov.mark(item.text, state=item.state)
        changed += raw != item.raw
        out.append(raw)
    return "".join(out), changed


def main():
    base, args = sys.argv[1], sys.argv[2:]
    write = "--write" in args
    strict = "--strict" in args
    files = [a for a in args if a not in ("--write", "--strict")]
    total = 0
    for name in files:
        path = Path(name)
        try:
            before = subprocess.run(["git", "show", f"{base}:{name}"], capture_output=True, check=True).stdout.decode("utf-8")
        except subprocess.CalledProcessError:
            print(f"skip (new file) {name}")
            continue
        after = dogfood.read_text(path)
        result, changed = after, 0
        for _ in range(5):
            result, n = fix(path, before, result, strict)
            changed += n
            if not n:
                break
        assert textprov.strip_marks(result) == textprov.strip_marks(after)
        left = dogfood.check_text(path, before, result, require_marks=strict)
        total += changed
        print(f"{changed:4d} clusters  {len(left):3d} left  {name}")
        if write and changed:
            with path.open("w", encoding="utf-8", newline="") as fh:
                fh.write(result)
    print("total clusters changed:", total)


if __name__ == "__main__":
    main()
