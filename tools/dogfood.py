#!/usr/bin/env python3
"""Repository integration for forward-only TextProv authoring and checks."""

import argparse
from collections import defaultdict
from dataclasses import dataclass
from difflib import SequenceMatcher
import fnmatch
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unicodedata

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "vendor/textprov/python"))
import textprov  # noqa: E402

MAPPING = textprov.default_mapping()
SELECTORS = set(MAPPING.selectors.values())
STATES = {value: key for key, value in MAPPING.selectors.items()}
# Smallest move threshold that excludes the reported one-cluster coincidence
# while still checking mark changes on two-cluster moves. Not a confidence score
# or a minimum for primary equal runs; see docs/TEXTPROV.md alignment limitations.
MIN_MOVE_CLUSTERS = 2


@dataclass
class Cluster:
    start: int
    end: int
    raw: str
    text: str
    state: str


def clusters(source):
    """Keep original encodings alongside offsets in the unmarked source."""
    result = []
    offset = 0
    for raw in textprov.segments(source):
        plain = textprov.strip_marks(raw)
        state = STATES.get(ord(raw[-1]))
        if len(raw) == 1 and ord(raw) in MAPPING.pua2base:
            state = MAPPING.pua2base[ord(raw)][1]
        result.append(Cluster(offset, offset + len(plain), raw, plain, state))
        offset += len(plain)
    return result


def correspondence(old, new):
    """Infer correspondence, not authorship, ignoring reflow whitespace.

    Exact encodings anchor the primary alignment; visible-text alignment in
    the gaps can pair even one coincidental cluster. A minimum there would
    also discard retained legacy bytes or hide changes to existing marks.
    Unique exact unmatched blocks are then paired as moves: mark changes are
    checked only at MIN_MOVE_CLUSTERS or above, while shorter blocks must keep
    identical bytes. Short moves and cumulative edits remain ambiguous; see
    docs/TEXTPROV.md for examples, historical exceptions, and follow-up scope.
    """
    a = [i for i, item in enumerate(old) if item.text and not item.text.isspace()]
    b = [i for i, item in enumerate(new) if item.text and not item.text.isspace()]
    # Prefer exact preserved encodings as anchors. Otherwise inserting an AI
    # copy before an identical human-labelled passage looks like relabelling.
    anchors = SequenceMatcher(
        None, [old[i].raw for i in a], [new[i].raw for i in b], autojunk=False
    )
    matches = {}
    old_gaps = defaultdict(list)
    new_gaps = defaultdict(list)

    def align(tag, i, j, k, l):
        if tag == "equal":
            # Keep singleton survivors (including their original encoding).
            # The unmatched-move threshold is unsafe for these primary runs.
            matches.update(zip(b[k:l], a[i:j]))
        else:
            if i < j:
                old_gaps[tuple(old[n].text for n in a[i:j])].append(a[i:j])
            if k < l:
                new_gaps[tuple(new[n].text for n in b[k:l])].append(b[k:l])

    for tag, i, j, k, l in anchors.get_opcodes():
        if tag == "equal":
            align(tag, i, j, k, l)
            continue
        visible = SequenceMatcher(
            None, [old[n].text for n in a[i:j]],
            [new[n].text for n in b[k:l]], autojunk=False,
        )
        for subtag, x, y, z, w in visible.get_opcodes():
            align(subtag, i + x, i + y, k + z, k + w)
    for key, old_blocks in old_gaps.items():
        new_blocks = new_gaps.get(key, [])
        if len(old_blocks) != 1 or len(new_blocks) != 1:
            continue
        pairs = list(zip(new_blocks[0], old_blocks[0]))
        # One cluster does not identify a passage: the y removed from "życia"
        # and the y written in "pomocy?" are a coincidence, not a move. Pair a
        # shorter block only when that keeps its exact bytes, so it can retain
        # legacy text but never report a relabelled or lost mark.
        if len(key) >= MIN_MOVE_CLUSTERS or all(new[n].raw == old[o].raw for n, o in pairs):
            matches.update(pairs)
    return matches


_MARKDOWN_INFO = {}


def markdown_info(sources):
    """Parse sources with the Node bridge, caching results by source text.

    A check reads each file several times; check_repository prefetches every
    changed file in one call so a large diff costs one Node start, not hundreds.
    """
    missing = [source for source in dict.fromkeys(sources) if source not in _MARKDOWN_INFO]
    if missing:
        try:
            result = subprocess.run(
                ["node", str(ROOT / "tools/markdown-prose.mjs")],
                input=json.dumps(missing), encoding="utf-8", capture_output=True, check=True,
            )
        except (OSError, subprocess.CalledProcessError) as error:
            detail = getattr(error, "stderr", "") or str(error)
            raise ValueError(
                "Markdown parser unavailable or failed; run pnpm install.\n" + detail
            ) from error
        _MARKDOWN_INFO.update(zip(missing, json.loads(result.stdout)))
    return [_MARKDOWN_INFO[source] for source in sources]


def eligible_offsets(path, source):
    if path.suffix.lower() == ".txt":
        return set(range(len(source)))
    info = markdown_info([source])[0]
    return {offset for start, end in info["ranges"] for offset in range(start, end)}


def eligible(item, offsets):
    return bool(item.text) and not item.text.isspace() and all(
        offset in offsets for offset in range(item.start, item.end)
    )


def validate_markdown(path, source, baseline=None):
    if path.suffix.lower() not in (".md", ".mdoc"):
        return
    marked, plain = markdown_info([
        source, textprov.strip_marks(source) if baseline is None else baseline,
    ])
    if marked["shape"] != plain["shape"]:
        raise ValueError("provenance marks change Markdown structure or link destinations")


def mark_edit(path, source, start, end, replacement, state):
    """Apply a declared edit, retaining unchanged clusters within that edit."""
    if state not in textprov.GENERATED_STATES:
        raise ValueError("origin must be human or ai")
    plain = textprov.strip_marks(source)
    old = clusters(source)
    boundaries = {0, len(plain)} | {item.start for item in old} | {item.end for item in old}
    if start not in boundaries or end not in boundaries or not 0 <= start <= end <= len(plain):
        raise ValueError("edit boundaries must lie between complete grapheme clusters")
    if textprov.strip_marks(replacement) != replacement:
        raise ValueError("replacement must be unmarked; use --state to declare its origin")
    candidate = plain[:start] + replacement + plain[end:]
    candidate_boundaries = {0, len(candidate)} | {item.end for item in clusters(candidate)}
    if start not in candidate_boundaries or start + len(replacement) not in candidate_boundaries:
        raise ValueError("replacement joins an adjacent grapheme; include the whole cluster in the edit")
    offsets = eligible_offsets(path, candidate)
    inside = [item for item in old if item.start >= start and item.end <= end]
    added = clusters(replacement)
    matches = correspondence(inside, added)
    output = []
    unmarked_edit = []
    for index, item in enumerate(added):
        if index in matches:
            output.append(inside[matches[index]].raw)
            unmarked_edit.append(inside[matches[index]].raw)
        else:
            absolute = Cluster(start + item.start, start + item.end, item.raw, item.text, None)
            output.append(textprov.mark(item.raw, state=state) if eligible(absolute, offsets) else item.raw)
            unmarked_edit.append(item.raw)
    before = "".join(item.raw for item in old if item.end <= start)
    after = "".join(item.raw for item in old if item.start >= end)
    result = before + "".join(output) + after
    if textprov.strip_marks(result) != candidate:
        raise ValueError("edit did not preserve the intended plain text")
    # Compare against this edit without its new marks, retaining legacy bytes.
    # Existing syntax defects (for example genesis.md) are not a migration gate.
    validate_markdown(path, result, before + "".join(unmarked_edit) + after)
    return result


def check_text(path, before, after, require_marks=True):
    old, new = clusters(before), clusters(after)
    matches = correspondence(old, new)
    plain = textprov.strip_marks(after)
    offsets = eligible_offsets(path, plain)
    problems = []
    for index, item in enumerate(new):
        message = None
        if index in matches:
            original = old[matches[index]]
            # Removing a mark from syntax (an aside fence, say) repairs it.
            repaired = original.state and item.state is None and not eligible(item, offsets)
            if original.raw != item.raw and not repaired:
                message = "changed or lost an existing mark" if original.state else "marked unchanged legacy text"
        elif eligible(item, offsets):
            if item.state not in textprov.GENERATED_STATES:
                if require_marks:
                    message = "new prose cluster has no supported origin mark"
            elif item.raw != textprov.mark(item.text, state=item.state):
                message = "new prose cluster must have one selector mark"
        elif item.state or not item.text:
            message = "new mark is outside eligible prose or attached to whitespace"
        if message:
            line = plain.count("\n", 0, item.start) + 1
            column = item.start - plain.rfind("\n", 0, item.start)
            problems.append((line, column, message))
    # Legacy formatting defects do not become new adoption requirements.
    if not problems and before != after:
        try:
            validate_markdown(path, after)
        except ValueError as error:
            try:
                validate_markdown(path, before)
            except ValueError:
                pass
            else:
                problems.append((1, 1, str(error)))
    return problems


def git(root, *args):
    return subprocess.check_output(["git", "-C", str(root), *args])


def read_text(path):
    with path.open(encoding="utf-8", newline="") as stream:
        return stream.read()


def policy(root):
    return json.loads((root / "tools/dogfooding.json").read_text(encoding="utf-8"))


def included(path, rules):
    # fnmatch, not glob: "*" also matches "/", so docs/*.md covers every depth.
    return any(fnmatch.fnmatchcase(path, pattern) for pattern in rules["include"]) and not any(
        fnmatch.fnmatchcase(path, pattern) for pattern in rules["exclude"]
    )


def changed_files(root, base, head=None, staged=False):
    args = ["diff", "--name-status", "-z", "--find-renames", base]
    if head:
        args.append(head)
    elif staged:
        args.append("--cached")
    args.append("--")
    records = iter(git(root, *args).decode("utf-8").split("\0")[:-1])
    result = []
    for status in records:
        path = next(records)
        old_path = path
        # Renames and copies carry source and destination. --find-renames
        # overrides diff.renames=copies, but a C record must not desync parsing.
        if status.startswith(("R", "C")):
            path = next(records)
        if status == "D":
            continue
        result.append((None if status == "A" else old_path, path))
    if not head and not staged:
        for path in git(root, "ls-files", "--others", "--exclude-standard", "-z").decode("utf-8").split("\0"):
            if path:
                result.append((None, path))
    return result


def has_ai_marks(text):
    """True for a cluster in either AI encoding: the selector or legacy PUA."""
    return any(item.state == "ai" for item in clusters(text))


def human_marks(text):
    """Clusters carrying the human selector, which the docs renderer publishes raw.

    The same code point after a CJK ideograph is a genuine ideographic
    variation sequence, so those clusters are left alone.
    """
    return [
        item for item in clusters(text) if item.state == "human"
        and not (item.text and unicodedata.name(item.text[0], "").startswith("CJK "))
    ]


def check_repository(root, base, head=None, staged=False, require_marks=True):
    rules = policy(root)
    failed = checked = 0
    files = []
    for old_path, path in changed_files(root, base, head, staged):
        if not included(path, rules):
            continue
        before = git(root, "show", f"{base}:{old_path}").decode("utf-8") if old_path else ""
        if head or staged:
            after = git(root, "show", f"{head or ''}:{path}").decode("utf-8")
        else:
            if (root / path).is_symlink():
                raise ValueError(f"refusing to follow symlink: {path}")
            after = read_text(root / path)
        files.append((path, before, after))
    # Parse every changed Markdown file in one Node call; check_text reads the cache.
    try:
        markdown_info([
            source for path, _, after in files if Path(path).suffix.lower() in (".md", ".mdoc")
            for source in (after, textprov.strip_marks(after))
        ])
    except ValueError:
        pass  # Parse file by file below, so the error names the failing file.
    for path, before, after in files:
        checked += 1
        try:
            problems = check_text(Path(path), before, after, require_marks=require_marks)
            if path.startswith('src/content/docs/') and has_ai_marks(after):
                metadata = markdown_info([after])[0]
                if metadata['textprov'] is not True:
                    problems.append((1, 1, 'AI-marked docs must opt in with textprov: true in frontmatter'))
            if path.startswith('src/content/docs/'):
                plain = textprov.strip_marks(after)
                for item in human_marks(after):
                    line = plain.count("\n", 0, item.start) + 1
                    column = item.start - plain.rfind("\n", 0, item.start)
                    problems.append((line, column, 'docs record AI edits only; a human mark is published as a raw selector'))
        except ValueError as error:
            raise ValueError(f"{path}: {error}") from error
        if problems:
            failed += 1
            for line, column, message in problems[:8]:
                print(f"{path}:{line}:{column}: {message}")
            if len(problems) > 8:
                print(f"{path}: {len(problems) - 8} more affected clusters")
    print(f"Checked {checked} eligible changed files; {failed} failed.")
    return 1 if failed else 0


def safe_path(root, name):
    path = root / name
    resolved = path.resolve()
    if root.resolve() not in resolved.parents or path.is_symlink():
        raise ValueError("path must be a regular file inside this repository")
    relative = resolved.relative_to(root.resolve()).as_posix()
    if not included(relative, policy(root)):
        raise ValueError(f"path is outside the dogfooding scope: {relative}")
    return resolved


def write_atomic(path, text):
    mode = path.stat().st_mode & 0o777 if path.exists() else 0o644
    with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", newline="", dir=path.parent, delete=False) as stream:
        temporary = Path(stream.name)
        try:
            stream.write(text)
            stream.flush()
            os.fsync(stream.fileno())
            os.chmod(temporary, mode)
            os.replace(temporary, path)
        finally:
            temporary.unlink(missing_ok=True)


def parser():
    result = argparse.ArgumentParser(description=__doc__)
    commands = result.add_subparsers(dest="command", required=True)
    check = commands.add_parser("check", help="check changed prose against a Git base")
    check.add_argument("--base", default="HEAD")
    check.add_argument("--preserve-only", action="store_true", help="allow unmarked new contributions; validate existing marks and new declarations")
    target = check.add_mutually_exclusive_group()
    target.add_argument("--head", help="check a committed revision rather than working files")
    target.add_argument("--staged", action="store_true", help="check the Git index")
    for command in ("edit", "create"):
        edit = commands.add_parser(command, help="write prose with a declared origin")
        edit.add_argument("path")
        edit.add_argument("--state", required=True, choices=textprov.GENERATED_STATES)
        if command == "edit":
            old = edit.add_mutually_exclusive_group(required=True)
            old.add_argument("--old")
            old.add_argument("--old-file", type=Path)
        new = edit.add_mutually_exclusive_group(required=True)
        new.add_argument("--new")
        new.add_argument("--new-file", type=Path)
        edit.add_argument("--dry-run", action="store_true", help="write the proposed result to stdout")
    return result


def main(argv=None):
    args = parser().parse_args(argv)
    try:
        root = Path(git(Path.cwd(), "rev-parse", "--show-toplevel").decode().strip())
        if args.command == "check":
            return check_repository(root, args.base, args.head, args.staged, not args.preserve_only)
        path = safe_path(root, args.path)
        replacement = read_text(args.new_file) if args.new_file else args.new
        if args.command == "create":
            if path.exists():
                raise ValueError("create refuses to overwrite an existing file; use edit")
            source, start, end = "", 0, 0
        else:
            source = read_text(path)
            old = read_text(args.old_file) if args.old_file else args.old
            plain = textprov.strip_marks(source)
            if not old or plain.count(old) != 1:
                raise ValueError("--old must match exactly once in the unmarked file; include more context")
            start, end = plain.index(old), plain.index(old) + len(old)
        result = mark_edit(path, source, start, end, replacement, args.state)
        if path.relative_to(root).as_posix().startswith('src/content/docs/'):
            if args.state != 'ai':
                raise ValueError('docs authoring records AI edits only; human contributors edit normally and preserve existing marks')
            metadata = markdown_info([result])[0]
            if not metadata['hasFrontmatter']:
                raise ValueError('docs need YAML frontmatter; start from a page template')
            if metadata['textprov'] is False:
                raise ValueError('this document explicitly opts out of TextProv')
            if metadata['hasTextprov'] and metadata['textprov'] is not True:
                raise ValueError('textprov must be a YAML boolean')
            if metadata['textprov'] is not True:
                newline = '\r\n' if result.startswith('---\r\n') else '\n'
                result = result.replace('---' + newline, '---' + newline + 'textprov: true' + newline, 1)
                if markdown_info([result])[0]['textprov'] is not True:
                    raise ValueError('could not enroll document without changing its YAML metadata')
        if args.dry_run:
            sys.stdout.buffer.write(result.encode("utf-8"))
        else:
            write_atomic(path, result)
            print(f"Wrote {path.relative_to(root)} with declared {args.state} edits.")
        return 0
    except (ValueError, OSError, UnicodeError, subprocess.CalledProcessError) as error:
        print(f"dogfood: {error}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
