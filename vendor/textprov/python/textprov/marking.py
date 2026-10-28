"""Automatic chat classification and AI document edits.

Chat classification follows the speaker selected by the host. Existing marks
always survive; ordinary editor changes receive no marks from these functions
unless a caller explicitly submits them as an AI document edit.
"""

import json
import re
import sys

from ._core import segments, strip_marks
from ._encode import mark
from .editing import INLINE, markdown_protected, plain_map, remark


CHAT_SCOPES = ("prose", "all", "off")
_ATX_HEADING = re.compile(r" {0,3}(#{1,6})(?=\s|$)")
_LIST_PREFIX = re.compile(r"(?:[-+*]|\d{1,9}[.)])(?=[ \t])")
_FENCE_MARKER = re.compile(r"(`{3,}|~{3,})")
_LINE_END = r"(?:\r\n|\r(?!\n)|(?<!\r)\n)"
_PARAGRAPH_END = re.compile(_LINE_END + r"[^\S\r\n]*" + _LINE_END)


def _text(value):
    if not isinstance(value, str):
        raise ValueError("text must be a string")
    return value


def _validate_scope(scope):
    if scope not in CHAT_SCOPES:
        raise ValueError("chat scope must be prose, all or off")


def _container_fence(line):
    """Read quote/list prefixes monotonically, avoiding ambiguous regex repeats."""
    position = 0
    while True:
        while position < len(line) and line[position] in " \t":
            position += 1
        if position < len(line) and line[position] == ">":
            position += 1
            continue
        item = _LIST_PREFIX.match(line, position)
        if item:
            position = item.end()
            continue
        return _FENCE_MARKER.match(line, position)


def _quote_content(line):
    position = 0
    while True:
        marker = position
        while marker < len(line) and line[marker] in " \t":
            marker += 1
        if marker >= len(line) or line[marker] != ">":
            return line[position:]
        position = marker + 1
        if position < len(line) and line[position] in " \t":
            position += 1


def _chat_protected(plain):
    """Conservative Markdown exclusions for a complete chat message.

    Reuse document syntax protection, with chat heading prose enabled. Supplement
    it for container fences and unfinished inline code, which are common in chat.
    This is not an executable-content detector or an incremental stream parser.
    """
    lines = plain.splitlines(True)
    # Replacing only heading markers lets the shared helper protect any inline
    # syntax in the heading, while retaining its fence/front-matter/HTML context.
    masked = []
    headings = []
    offset = 0
    for line in lines:
        heading = _ATX_HEADING.match(line)
        if heading:
            start, end = heading.span(1)
            masked.append(line[:start] + "x" * (end - start) + line[end:])
            headings.append((offset + start, offset + end))
            closing = re.search(r"(?<=\s)#+[ \t]*(?:\r\n|\r|\n)?$", line)
            if closing:
                headings.append((offset + closing.start(), offset + closing.end()))
        else:
            masked.append(line)
        offset += len(line)
    masked = "".join(masked)
    protected = markdown_protected(masked)
    # The shared helper protects every backtick delimiter, even an unmatched
    # one. Neutralize backticks to distinguish surrounding literal syntax from
    # that delimiter-only protection when checking unfinished inline spans.
    literal_context = markdown_protected(masked.replace("`", "x"))
    for start, end in headings:
        protected[start:end] = [True] * (end - start)

    # A fenced command can be nested in a list or blockquote. Protect original
    # bytes, including container prefixes, rather than rewriting/dedenting them.
    fence = None
    offset = 0
    for line in lines:
        marker = _container_fence(line)
        quoted = _quote_content(line)
        indentation = quoted[:len(quoted) - len(quoted.lstrip(" \t"))]
        indented = len(indentation.expandtabs(4)) >= 4
        if fence:
            protected[offset:offset + len(line)] = [True] * len(line)
            literal_context[offset:offset + len(line)] = [True] * len(line)
            if (marker and marker.group(1)[0] == fence[0]
                    and len(marker.group(1)) >= len(fence)
                    and not line[marker.end():].strip()):
                fence = None
        elif marker:
            fence = marker.group(1)
            protected[offset:offset + len(line)] = [True] * len(line)
            literal_context[offset:offset + len(line)] = [True] * len(line)
        elif indented:
            # Nested list code has indentation that the document heuristic may
            # interpret as wrapped list prose. Chat errs toward literal bytes.
            protected[offset:offset + len(line)] = [True] * len(line)
            literal_context[offset:offset + len(line)] = [True] * len(line)
        offset += len(line)

    # Closed code spans are already protected. An unprotected backtick run may
    # be an incomplete code span: leave its paragraph alone until it is closed.
    closed_spans = [False] * len(plain)
    for span in INLINE[0].finditer(plain):
        closed_spans[span.start():span.end()] = [True] * (span.end() - span.start())
    literal_until = 0
    for marker in re.finditer(r"`+", plain):
        if marker.start() < literal_until:
            continue
        if (any(literal_context[marker.start():marker.end()])
                or all(closed_spans[marker.start():marker.end()])):
            continue
        boundary = _PARAGRAPH_END.search(plain, marker.end())
        end = boundary.start() if boundary else len(plain)
        protected[marker.start():end] = [True] * (end - marker.start())
        literal_until = end
    return protected


def _chat_clusters(text, role, scope):
    """Yield original graphemes and their insertion-only marked spellings."""
    if role not in ("user", "assistant"):
        raise ValueError("chat role must be user or assistant")
    _validate_scope(scope)
    text = _text(text)
    state = "human" if role == "user" else "ai"
    protected = _chat_protected(plain_map(text)[0]) if scope == "prose" else None
    offset = 0
    for cluster in segments(text):
        end = offset + len(plain_map(cluster)[0])
        literal = scope == "off" or (protected is not None and any(protected[offset:end]))
        yield cluster, cluster if literal else mark(cluster, state=state)
        offset = end


def mark_chat(text, role, scope="prose"):
    """Mark user prose human or assistant prose AI, preserving supplied marks.

    This is a speaker policy, not an inference about pasted text's authorship.
    ``prose`` skips Markdown code/literals, URLs and protected syntax; ``all``
    marks all eligible text; ``off`` returns text unchanged. These operations
    add marks only, so already marked commands require explicit clean export.
    Pass a complete message, never unrelated streaming chunks. Bare commands
    outside Markdown code are not reliably distinguishable from ordinary prose.
    """
    return "".join(marked for _, marked in _chat_clusters(text, role, scope))


def mark_chat_parts(parts, role, scope="prose"):
    """Mark a complete message once, preserving its original text-part boundaries.

    Empty parts and supplied marks remain intact. If a grapheme crosses parts,
    its newly added selector follows its last source scalar in that scalar's
    part. The caller must supply all text parts, not unrelated stream batches.
    """
    if not isinstance(parts, list) or any(not isinstance(part, str) for part in parts):
        raise ValueError("parts must be a list of strings")
    out = [[] for _ in parts]
    part = 0
    position = 0
    # Classify concatenated syntax and segment complete graphemes before mapping
    # source characters and any newly inserted selectors back to their blocks.
    for cluster, marked in _chat_clusters("".join(parts), role, scope):
        for character in cluster:
            while position == len(parts[part]):
                part += 1
                position = 0
            out[part].append(character)
            position += 1
        out[part].append(marked[len(cluster):])
    return ["".join(value) for value in out]


def mark_document(text):
    """Mark new AI document prose, preserving supplied marks and Markdown code."""
    return mark_document_edit("", text)


def mark_document_edit(old_text, new_text):
    """Mark AI additions and replacements, carrying unchanged source marks.

    Uses the existing whole-line/whole-word editing alignment. Existing marks
    in supplied new passages survive. Unchanged raw text is carried from the
    original even when the writer omitted its selectors. Markdown syntax and
    code are protected by the same conservative rules as other document edits.
    No prompt matching or manual claims are required.
    """
    return remark(_text(old_text), _text(new_text), markdown=True,
                  carry=True, shingles=set(), preserve_new_marks=True)


def main(argv=None):
    """Read one JSON request and return its marked text for host adapters."""
    try:
        if argv:
            raise ValueError("supply the request as JSON on stdin")
        request = json.load(sys.stdin)
        if not isinstance(request, dict):
            raise ValueError("request must be an object")
        operation = request.get("operation")
        if operation == "mark-chat":
            result = mark_chat(request["text"], request["role"],
                               scope=request.get("scope", "prose"))
        elif operation == "mark-chat-parts":
            result = mark_chat_parts(request["parts"], request["role"],
                                     scope=request.get("scope", "prose"))
            print(json.dumps({"parts": result}, ensure_ascii=False))
            return 0
        elif operation == "mark-document":
            result = mark_document_edit(request.get("old_text", ""), request["text"])
        elif operation == "strip-marks":
            result = strip_marks(_text(request["text"]))
        else:
            raise ValueError("operation must be mark-chat, mark-chat-parts, mark-document or strip-marks")
        print(json.dumps({"text": result}, ensure_ascii=False))
        return 0
    except (KeyError, ValueError, TypeError) as error:
        print(json.dumps({"error": str(error)}), file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
