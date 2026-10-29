#!/usr/bin/env python3
"""Strip Zed's 'View Thread as Markdown' export down to conversation text.

Usage:
    python3 bin/zed-thread-clean.py thread.md > conversation.md
    pbpaste | python3 bin/zed-thread-clean.py > conversation.md

Tool records run from '**Tool Call: ...**' to the next role heading.
Fenced code in retained messages is preserved, including marker-like text.
"""

import argparse
import re
import sys
from pathlib import Path

ROLE = re.compile(r"^## (User|Assistant)(?: \(checkpoint\))?\s*$")
TOOL = re.compile(r"^\*\*Tool (?:Call|Result|Response):.*\*\*\s*$")
FENCE = re.compile(r"^ {0,3}(`{3,}|~{3,})(.*)$")
THINKING = re.compile(r"</?thinking>")


def clean_thread(text: str) -> str:
    messages = []
    role = None
    body = []
    fence = None
    thinking = False
    tool = False

    def finish_message():
        content = "\n".join(body).strip("\n")
        if not content.strip():
            return
        if role == "Assistant" and messages and messages[-1][0] == role:
            messages[-1] = (role, messages[-1][1] + "\n\n" + content)
        else:
            messages.append((role, content))

    for line in text.splitlines():
        if fence is not None:
            if not tool:
                body.append(line)
            if re.fullmatch(
                r" {0,3}"
                + re.escape(fence[0])
                + r"{"
                + str(len(fence))
                + r",}\s*",
                line,
            ):
                fence = None
            continue

        # Thinking is metadata only in assistant messages, never in user input.
        if role == "Assistant" and not tool:
            visible = []
            start = 0
            was_thinking = thinking
            for match in THINKING.finditer(line):
                if not thinking:
                    visible.append(line[start : match.start()])
                thinking = match.group() == "<thinking>"
                start = match.end()
            if not thinking:
                visible.append(line[start:])
            line = "".join(visible)
            if not line and (was_thinking or thinking):
                continue

        match = ROLE.fullmatch(line)
        if match and not thinking:
            finish_message()
            role = match.group(1)
            body = []
            tool = False
            continue

        if role is None or thinking:
            continue
        if role == "Assistant" and TOOL.fullmatch(line):
            tool = True
        match = FENCE.fullmatch(line)
        if match:
            fence = match.group(1)
        if not tool:
            body.append(line)

    finish_message()
    return "\n\n".join(
        f"## {speaker}\n\n{content}" for speaker, content in messages
    ) + ("\n" if messages else "")


def main():
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "input",
        nargs="?",
        default="-",
        help="UTF-8 export file, or - for stdin (default)",
    )
    args = parser.parse_args()
    try:
        text = (
            sys.stdin.read()
            if args.input == "-"
            else Path(args.input).read_text(encoding="utf-8-sig")
        )
    except (OSError, UnicodeError) as error:
        parser.exit(1, f"{parser.prog}: {error}\n")
    sys.stdout.write(clean_thread(text))


if __name__ == "__main__":
    main()
