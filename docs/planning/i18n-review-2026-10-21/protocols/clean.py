#!/usr/bin/env python3
"""Print a TextProv-marked file without U+E0101 marks, with line numbers.

usage: clean.py FILE [START [END]]
"""
import sys

path = sys.argv[1]
start = int(sys.argv[2]) if len(sys.argv) > 2 else 1
end = int(sys.argv[3]) if len(sys.argv) > 3 else None
with open(path, encoding="utf-8") as fh:
    for n, line in enumerate(fh, 1):
        if n < start:
            continue
        if end is not None and n > end:
            break
        sys.stdout.write(f"{n:4}\t{line.replace(chr(0xE0101), '')}")
