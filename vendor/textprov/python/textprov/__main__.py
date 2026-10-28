# python/textprov/__main__.py

"""Command line interface: python3 -m textprov

    textprov mark [--human|--ai] [--mode vs|pua] FILE
    textprov mark-added [--human|--ai] [--mode vs|pua] OLD NEW
    textprov convert --from vs|pua --to vs|pua FILE
    textprov strip FILE
    textprov render [--display passage|exact] [--strip] [--no-merge-whitespace] [--class-prefix P] FILE
    textprov inspect FILE

FILE may be '-' for stdin. Output goes to stdout unless -o/--output is given.
Text is read and written as UTF-8 verbatim; line endings are left alone.
"""

import argparse
import io
import sys

from . import GENERATED_STATES, SPEC_VERSION, __version__, default_mapping
from ._core import strip_marks, to_html
from ._encode import convert, inspect, mark, mark_added

PROG = "textprov"


def read_input(path):
    """Read UTF-8 text verbatim; the locale encoding is never used."""
    if path == "-":
        return io.TextIOWrapper(
            sys.stdin.buffer, encoding="utf-8", newline=""
        ).read()
    with open(path, encoding="utf-8", newline="") as handle:
        return handle.read()


def write_output(text, path):
    """Write UTF-8 text verbatim, keeping any CRLF line endings intact."""
    if path:
        with open(path, "w", encoding="utf-8", newline="") as handle:
            handle.write(text)
        return
    # Write bytes rather than wrapping sys.stdout: a TextIOWrapper around it
    # closes the underlying buffer when it is collected, which breaks any
    # caller that uses main() more than once.
    sys.stdout.buffer.write(text.encode("utf-8"))
    sys.stdout.buffer.flush()


def add_state(parser):
    group = parser.add_mutually_exclusive_group()
    for state in GENERATED_STATES:
        group.add_argument(
            "--" + state,
            dest="state",
            action="store_const",
            const=state,
            help=f"mark as {state}",
        )
    parser.set_defaults(state="ai")
    parser.add_argument(
        "--mode", choices=("vs", "pua"), default="vs", help="encoding to write"
    )


def build_parser():
    parser = argparse.ArgumentParser(
        prog=PROG,
        description="Put provenance marks in text, and read them back out.",
    )
    mapping = default_mapping()
    parser.add_argument(
        "--version",
        action="version",
        version=(
            f"{PROG} {__version__} "
            f"(experiment {SPEC_VERSION}, registry {mapping.version})"
        ),
    )
    parser.add_argument(
        "-o", "--output", help="write to this file instead of stdout"
    )
    subs = parser.add_subparsers(dest="command", required=True)

    p = subs.add_parser("mark", help="mark every unmarked cluster")
    p.add_argument("file")
    add_state(p)

    p = subs.add_parser("mark-added", help="mark only what NEW adds to OLD")
    p.add_argument("old")
    p.add_argument("new")
    add_state(p)

    p = subs.add_parser("convert", help="change the encoding of the ai state")
    p.add_argument("file")
    p.add_argument(
        "--from", dest="from_mode", choices=("vs", "pua"), required=True
    )
    p.add_argument("--to", dest="to_mode", choices=("vs", "pua"), required=True)

    p = subs.add_parser("strip", help="remove every mark")
    p.add_argument("file")

    p = subs.add_parser("render", help="render marked text as HTML spans")
    p.add_argument("file")
    p.add_argument(
        "--strip", action="store_true", help="drop selectors from span text"
    )
    p.add_argument(
        "--no-merge-whitespace",
        dest="merge_whitespace",
        action="store_false",
        default=False,
        help="do not join same-state runs across whitespace",
    )
    p.add_argument("--merge-whitespace", action="store_true", help="legacy exact-output whitespace merging")
    p.add_argument("--class-prefix", default="prov")
    p.add_argument("--display", choices=("passage", "exact"), default="passage")

    p = subs.add_parser("inspect", help="report the states present in the text")
    p.add_argument("file")

    return parser


def main(argv=None):
    args = build_parser().parse_args(argv)
    if args.command == "mark-added":
        out = mark_added(
            read_input(args.old), read_input(args.new), args.state, args.mode
        )
    else:
        text = read_input(args.file)
        if args.command == "mark":
            out = mark(text, args.state, args.mode)
        elif args.command == "convert":
            out = convert(text, args.from_mode, args.to_mode)
        elif args.command == "strip":
            out = strip_marks(text)
        elif args.command == "render":
            out = to_html(
                text,
                strip=args.strip,
                merge_whitespace=args.merge_whitespace,
                class_prefix=args.class_prefix,
                display=args.display,
            )
        else:
            out = inspect(text)
    write_output(out, args.output)
    return 0


if __name__ == "__main__":
    sys.exit(main())
