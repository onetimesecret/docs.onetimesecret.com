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

usage:
    python3 tools/textprov_reanchor.py BASE [--strict] [--write] FILE...

FILE paths are relative to the current directory and must lie inside the
repository; a FILE that does not exist at BASE is skipped as a new file.
Without --write it only reports. Afterwards run
`python3 tools/dogfood.py check --base BASE` (and `--preserve-only`).
See docs/TEXTPROV.md for when re-anchoring is appropriate.
"""
import argparse
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import dogfood  # noqa: E402

# Each pass can expose a new alignment; real branches settle in two or three.
MAX_PASSES = 5


def fix(path, before, after, strict=False):
    old, new = dogfood.clusters(before), dogfood.clusters(after)
    matches = dogfood.correspondence(old, new)
    offsets = dogfood.eligible_offsets(path, dogfood.textprov.strip_marks(after))
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
        elif strict and item.state not in dogfood.textprov.GENERATED_STATES:
            raw = dogfood.textprov.mark(item.text, state="ai")
        elif item.state in dogfood.textprov.GENERATED_STATES and item.raw != dogfood.textprov.mark(item.text, state=item.state):
            raw = dogfood.textprov.mark(item.text, state=item.state)
        changed += raw != item.raw
        out.append(raw)
    return "".join(out), changed


def reanchor(path, before, after, strict=False):
    """Run fix() to a fixpoint; return (result, clusters changed, converged)."""
    result, changed, converged = after, 0, False
    for _ in range(MAX_PASSES):
        result, n = fix(path, before, result, strict)
        changed += n
        if not n:
            converged = True
            break
    if dogfood.textprov.strip_marks(result) != dogfood.textprov.strip_marks(after):
        raise RuntimeError(f"{path}: re-anchoring changed the plain text")
    return result, changed, converged


def parser():
    result = argparse.ArgumentParser(description="Re-anchor TextProv marks against a base commit.")
    result.add_argument("base", metavar="BASE", help="commit the PR is checked against (its merge base)")
    result.add_argument("files", metavar="FILE", nargs="+", help="file to re-anchor")
    result.add_argument("--strict", action="store_true", help="also mark new unmarked prose as AI")
    result.add_argument("--write", action="store_true", help="write changes instead of only reporting")
    return result


def main(argv=None):
    args = parser().parse_args(argv)
    root = dogfood.ROOT
    if subprocess.run(["git", "-C", str(root), "rev-parse", "--verify", "--quiet", f"{args.base}^{{commit}}"],
                      capture_output=True).returncode:
        parser().error(f"BASE {args.base!r} is not a commit")
    # Resolve every FILE before writing any, so a bad one cannot stop a run halfway.
    targets = []
    for name in args.files:
        path = Path(name).resolve()
        try:
            targets.append((name, path, path.relative_to(root).as_posix()))
        except ValueError:
            parser().error(f"{name} is outside the repository {root}")
    total, unsettled = 0, []
    for name, path, relative in targets:
        shown = subprocess.run(["git", "-C", str(root), "show", f"{args.base}:{relative}"], capture_output=True)
        if shown.returncode:
            print(f"skip (new file) {name}")
            continue
        before = shown.stdout.decode("utf-8")
        after = dogfood.read_text(path)
        result, changed, converged = reanchor(path, before, after, args.strict)
        if not converged:
            unsettled.append(name)
            print(f"warning: {name} still changed on pass {MAX_PASSES}; left as it was", file=sys.stderr)
            continue
        left = dogfood.check_text(path, before, result, require_marks=args.strict)
        total += changed
        print(f"{changed:4d} clusters  {len(left):3d} left  {name}")
        if args.write and changed:
            with path.open("w", encoding="utf-8", newline="") as fh:
                fh.write(result)
    print("total clusters changed:", total)
    return 1 if unsettled else 0


if __name__ == "__main__":
    sys.exit(main())
