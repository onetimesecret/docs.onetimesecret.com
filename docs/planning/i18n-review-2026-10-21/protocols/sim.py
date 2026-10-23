#!/usr/bin/env python3
"""Simulate a sequence of dogfood edits in memory and run check_text against the on-disk file.

usage: SIM_TMP=<dir> sim.py FILE ID [ID ...]   (run from the worktree root; IDs name <dir>/<id>-old.txt / -new.txt)
Writes nothing.
"""
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path.cwd() / "tools"))
import dogfood  # noqa: E402

TMP = Path(os.environ["SIM_TMP"])
path = Path(sys.argv[1]).resolve()
base = dogfood.read_text(path)
source = base
for ident in sys.argv[2:]:
    old = dogfood.read_text(TMP / f"{ident}-old.txt")
    new = dogfood.read_text(TMP / f"{ident}-new.txt")
    plain = dogfood.textprov.strip_marks(source)
    if plain.count(old) != 1:
        sys.exit(f"{ident}: old matches {plain.count(old)} times")
    start = plain.index(old)
    source = dogfood.mark_edit(path, source, start, start + len(old), new, "ai")
problems = dogfood.check_text(path, base, source)
for line, col, msg in problems:
    print(f"{line}:{col}: {msg}")
print("PASS" if not problems else f"FAIL ({len(problems)})")
