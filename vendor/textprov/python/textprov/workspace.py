"""Provider-neutral marking operations for a Git workspace.

A caller supplies a root and operation IDs; no provider events, environment
variables, or process-wide state are required. Prompt logs contain the supplied
prompt text, so callers should account for its local persistence.
"""

import hashlib
import json
import re
import shlex
import subprocess
import time
from pathlib import Path

from . import mark, segments
from .editing import (
    HUMAN_MIN_WORDS,
    finalize,
    human_shingles,
    merge,
    plain_map,
    raw_span,
    remark,
    rewrite_edit,
)

SUFFIXES = (".md", ".markdown")
# Hand-built samples whose marks are the content; never touch them.
EXCLUDED = ("experiments/baseline/", "site/public/", "site/dist/", "node_modules/")
PROMPT_LOG_TAIL = 300
SNAPSHOT_MAX_AGE = 24 * 3600

GIT_MOVES_TREE = frozenset(
    {
        "checkout",
        "switch",
        "merge",
        "pull",
        "rebase",
        "stash",
        "reset",
        "restore",
        "cherry-pick",
        "revert",
        "apply",
        "am",
        "worktree",
        "bisect",
    }
)
_GIT_VALUE_OPTIONS = {
    "-C",
    "-c",
    "--git-dir",
    "--work-tree",
    "--namespace",
    "--config-env",
}
# Keep operators distinct from quoted arguments before shlex removes quotes.
_SHELL_TOKEN = re.compile(
    r"(?P<space>[ \t\r]+)|(?P<continuation>\\\n)|(?P<comment>\#[^\n]*)"
    r"|(?P<redirect>\d*(?:&>>?|[<>][<>]?&?|<>))"
    r"""|(?P<word>(?:\\[\s\S]|"(?:\\[\s\S]|[^"\\])*"|'[^']*'|[^\s"'\\;&|()<>])+)"""
    r"|(?P<separator>[;&|()\n]+)"
)
_ASSIGNMENT = re.compile(r"[A-Za-z_][A-Za-z_0-9]*=", re.ASCII)
_SHELL_CONTROL = {
    "if",
    "then",
    "else",
    "elif",
    "fi",
    "while",
    "until",
    "for",
    "do",
    "done",
    "case",
    "esac",
    "function",
    "{",
    "}",
}


def _active_substitution(word):
    """Recognize substitutions without treating single-quoted text as executed."""
    quote = None
    index = 0
    while index < len(word):
        char = word[index]
        if quote == "'":
            if char == "'":
                quote = None
        elif char == "\\":
            index += 2
            continue
        elif char == "'" and quote is None:
            quote = "'"
        elif char == '"':
            quote = None if quote == '"' else '"'
        elif char == "`" or word.startswith("$(", index):
            return True
        index += 1
    return False


def _shell_commands(command):
    """Read command positions and transfer uncertainty, not shell execution.

    Gates and control structures do not establish that a transfer ran. Keep
    that uncertainty instead of flattening every command into a certain source.
    Heredocs and active substitutions are deliberately unresolved.
    """
    commands, words = [], []
    offset = 0
    redirected = False
    conditional = controlled = False
    while offset < len(command):
        token = _SHELL_TOKEN.match(command, offset)
        if token is None:
            return None
        offset = token.end()
        kind = token.lastgroup
        if kind == "separator":
            separator = token.group()
            if "(" in separator and conditional:
                controlled = True
            gated = "&" in separator or "|" in separator
            if words:
                commands.append((words, conditional or controlled))
                conditional = gated
            elif gated:
                conditional = True
            words = []
            redirected = False
        elif kind == "redirect":
            if token.group().lstrip("0123456789").startswith("<<"):
                return None
            redirected = True
        elif kind == "word":
            raw = token.group()
            # Unquoted $( starts across the word/operator boundary.
            inspected = raw + (
                "(" if command[offset : offset + 1] == "(" else ""
            )
            if _active_substitution(inspected):
                return None
            if not words and raw in _SHELL_CONTROL:
                controlled = True
            try:
                word = shlex.split(raw, comments=False)[0]
            except (ValueError, IndexError):
                return None
            if redirected:
                redirected = False
            else:
                words.append(word)
    if words:
        commands.append((words, conditional or controlled))
    return commands


def _executable(words):
    index = 0
    while index < len(words):
        word = words[index]
        if _ASSIGNMENT.match(word) or word in {
            "!",
            "{",
            "if",
            "then",
            "else",
            "elif",
            "while",
            "until",
            "do",
        }:
            index += 1
        elif word in {"command", "exec"} or Path(word).name == "env":
            wrapper = Path(word).name
            index += 1
            while index < len(words) and words[index].startswith("-"):
                option = words[index]
                index += 1
                if wrapper == "command" and option in {"-v", "-V"}:
                    return []
                if wrapper == "exec" and option == "-a":
                    index += 1
                if wrapper == "env":
                    if option.startswith(("-S", "-C")) or option.split("=", 1)[
                        0
                    ] in {"--split-string", "--chdir"}:
                        return None
                    if option in {"-u", "--unset"}:
                        index += 1
        elif Path(word).name == "nice":
            index += 1
            while index < len(words) and words[index].startswith("-"):
                option = words[index]
                index += 1
                if option == "--":
                    break
                if option in {"--help", "--version"}:
                    return []
                if option in {"-n", "--adjustment"}:
                    if index == len(words) or not re.fullmatch(
                        r"[+-]?[0-9]+", words[index]
                    ):
                        return None
                    index += 1
                elif not re.fullmatch(
                    r"-n[+-]?[0-9]+|-[+-]?[0-9]+|--adjustment=[+-]?[0-9]+",
                    option,
                ):
                    return None
        else:
            break
    return words[index:]


def _executed_commands(command, depth=0):
    """Also inspect literal sh/bash -c and eval payloads, but not ordinary args."""
    if depth > 8:
        return None
    commands = _shell_commands(command)
    if commands is None:
        return None
    result = []
    for words, uncertain in commands:
        words = _executable(words)
        if words is None:
            return None
        if not words:
            continue
        # A variable executable or Git subcommand may resolve to a tree move.
        if "$" in words[0]:
            return None
        name = Path(words[0]).name
        if name == "git":
            args, _ = _git_command(words)
            # Global-option expansion can supply or shift the subcommand too.
            prefix = words[1 : len(words) - len(args) + 1]
            if any("$" in word for word in prefix):
                return None
        payload = None
        if name in {"sh", "bash"}:
            index = 1
            while index < len(words) and words[index].startswith("-"):
                option = words[index]
                index += 1
                if not option.startswith("--") and "c" in option:
                    if index < len(words):
                        payload = words[index]
                    break
                if option in {"-o", "-O"}:
                    index += 1
        elif name == "eval":
            args = words[2:] if words[1:2] == ["--"] else words[1:]
            payload = " ".join(args)
        if payload is None:
            result.append((words, uncertain))
        else:
            # Interpolation anywhere in executable code can introduce commands,
            # even when the unexpanded payload starts with a literal executable.
            if "$" in payload:
                return None
            nested = _executed_commands(payload, depth + 1)
            if nested is None:
                return None
            result.extend(
                (inner, uncertain or inner_uncertain)
                for inner, inner_uncertain in nested
            )
    return result


def _git_command(words):
    """Return the subcommand/args and literal -C directories after global options."""
    index, directories = 1, []
    while index < len(words) and words[index].startswith("-"):
        option = words[index]
        index += 1
        if option == "--":
            break
        if option in _GIT_VALUE_OPTIONS:
            if index == len(words):
                return [], directories
            if option == "-C":
                directories.append(words[index])
            index += 1
        elif option.startswith("-C"):
            directories.append(option[2:])
    return words[index:], directories


def git_moves_tree(command):
    """Detect tree moves, including shell execution too uncertain to exclude."""
    commands = _executed_commands(command)
    # An unparseable command cannot safely establish agent-authored additions.
    if commands is None:
        return True
    for words, _ in commands:
        if Path(words[0]).name == "git":
            args, _ = _git_command(words)
            if args and args[0] in GIT_MOVES_TREE:
                return True
    return False


def read_text(path):
    try:
        with open(path, encoding="utf-8", newline="") as handle:
            return handle.read()
    except (OSError, UnicodeDecodeError):
        return None


def write_text(path, text):
    with open(path, "w", encoding="utf-8", newline="") as handle:
        handle.write(text)


def _remark_candidates(baselines, text, shingles, min_words):
    """Mark only additions shared by every possible pre-command baseline."""
    original = text
    plain, original_index = plain_map(original)
    added = [True] * len(plain)
    for baseline in baselines:
        # Retain merge's removal of inherited marks on truncated clusters.
        text, flags = merge(baseline, text, carry=False)
        _, positions = plain_map(text)
        added = [
            previous and flags[position]
            for previous, position in zip(added, positions)
        ]
    _, index = plain_map(text)
    flags = [False] * len(text)
    for offset, start in enumerate(index):
        end = index[offset + 1] if offset + 1 < len(index) else len(text)
        flags[start:end] = [added[offset]] * (end - start)
    marked = finalize(text, flags, True, shingles, min_words)
    _, marked_index = plain_map(marked)
    out, start = [], 0
    for cluster in segments(plain):
        end = start + len(cluster)
        # Without shared additions, keep the cluster's supplied provenance.
        out.append(
            raw_span(marked, marked_index, start, end)
            if any(added[start:end])
            else raw_span(original, original_index, start, end)
        )
        start = end
    return "".join(out)


class Workspace:
    """Apply the prose-marking policy within an explicitly selected Git root.

    Relative file paths resolve under root, independently of the caller's cwd.
    State defaults to root/.textprov; separate instances do not share globals.
    """

    def __init__(
        self, root, *, state_dir=None, human_min_words=HUMAN_MIN_WORDS
    ):
        if human_min_words < 1:
            raise ValueError("human_min_words must be positive")
        self.root = Path(root).resolve()
        state_path = (
            Path(state_dir) if state_dir is not None else Path(".textprov")
        )
        self.state_dir = self.resolve(state_path)
        self.prompt_log = self.state_dir / "prompts.jsonl"
        self.snapshots = self.state_dir / "snapshots"
        self.human_min_words = human_min_words

    def resolve(self, path):
        path = Path(path)
        return (path if path.is_absolute() else self.root / path).resolve()

    def git(self, *args):
        return subprocess.run(
            ["git", "-C", str(self.root), *args],
            capture_output=True,
            text=True,
            encoding="utf-8",
            check=False,
        )

    def relative(self, path):
        try:
            return self.resolve(path).relative_to(self.root).as_posix()
        except ValueError:
            return None

    def suffix_in_scope(self, rel):
        return (
            rel is not None
            and rel.lower().endswith(SUFFIXES)
            and not rel.startswith(".git/")
            and not any(part in rel for part in EXCLUDED)
        )

    def in_scope(self, path):
        rel = self.relative(path)
        if not self.suffix_in_scope(rel):
            return False
        return self.git("check-ignore", "-q", "--", rel).returncode != 0

    def scoped_files(self):
        listing = self.git("ls-files", "-co", "--exclude-standard", "-z").stdout
        return [
            rel
            for rel in listing.split("\0")
            if self.suffix_in_scope(rel)
            and self.suffix_in_scope(self.relative(rel))
        ]

    def head(self, suffix=""):
        return self.git(
            "rev-parse", "--verify", "-q", "HEAD" + suffix
        ).stdout.strip()

    def committed_on(self, base):
        """Distinguish a single new commit from a checkout of its revision."""
        return self.head("^") == base and self.git(
            "reflog", "-1", "--format=%gs"
        ).stdout.startswith("commit: ")

    def load_shingles(self):
        try:
            with open(self.prompt_log, encoding="utf-8") as handle:
                entries = handle.readlines()[-PROMPT_LOG_TAIL:]
        except OSError:
            return set()
        texts = []
        for entry in entries:
            try:
                text = json.loads(entry)["text"]
            except (ValueError, KeyError, TypeError):
                continue
            if isinstance(text, str):
                texts.append(text)
        return human_shingles(texts, self.human_min_words)

    def record_prompt(self, prompt, session=None):
        """Append human-marked prompt text to the local JSONL log."""
        if not isinstance(prompt, str) or not prompt.strip():
            return
        self.state_dir.mkdir(parents=True, exist_ok=True)
        entry = {
            "time": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
            "session": session,
            "text": mark(prompt, state="human"),
        }
        with open(self.prompt_log, "a", encoding="utf-8") as handle:
            handle.write(json.dumps(entry, ensure_ascii=False) + "\n")

    def prepare_write(self, path, content):
        """Return marked content, or None when the file is outside scope."""
        if not self.in_scope(path):
            return None
        return remark(
            read_text(self.resolve(path)) or "",
            content,
            shingles=self.load_shingles(),
            min_words=self.human_min_words,
        )

    def prepare_edit(self, path, old_string, new_string, replace_all=False):
        """Return a mark-aware replacement pair; ambiguous edits raise Ambiguous."""
        snapshot = self._prepare_edit_snapshot(
            path, old_string, new_string, replace_all
        )
        return snapshot[2] if snapshot is not None else None

    def _prepare_edit_snapshot(self, path, old_string, new_string, replace_all):
        if not self.in_scope(path):
            return None
        target = self.resolve(path)
        raw = read_text(target)
        if raw is None:
            return None
        result = rewrite_edit(
            raw,
            old_string,
            new_string,
            replace_all,
            shingles=self.load_shingles(),
            min_words=self.human_min_words,
        )
        return (target, raw, result) if result is not None else None

    def has_marks(self, path):
        """Report whether an in-scope file carries provenance marks."""
        if not self.in_scope(path):
            return False
        raw = read_text(self.resolve(path))
        return raw is not None and plain_map(raw)[0] != raw

    def apply_edit(self, path, old_string, new_string, replace_all=False):
        """Apply a mark-aware replacement and return how many places changed.

        For callers that cannot have their own edit rewritten by prepare_edit.
        Returns 0 when the file is out of scope or old_string is absent;
        ambiguous edits raise Ambiguous and leave the file alone. Preparation
        and replacement share one raw snapshot; this is not a locked write.
        """
        snapshot = self._prepare_edit_snapshot(
            path, old_string, new_string, replace_all
        )
        if snapshot is None:
            return 0
        target, raw, (old, new) = snapshot
        count = raw.count(old)
        if not replace_all:
            count = min(count, 1)
        if old != new:
            write_text(target, raw.replace(old, new, count))
        return count

    def snapshot_path(self, operation_id):
        # Provider IDs may contain separators, or differ only by case on macOS.
        name = hashlib.sha256(
            (operation_id or "none").encode("utf-8")
        ).hexdigest()
        return self.snapshots / f"{name}.json"

    def _command_sources(self, command, files):
        """Match only explicit literal file transfers, never similar new prose.

        Conflicting sources are left unresolved rather than choosing a history.
        Conditional transfers retain both the destination and source baselines;
        text is new only if every possible history agrees.
        """
        commands = _executed_commands(command)
        if commands is None or any(words[0] == "cd" for words, _ in commands):
            return {}
        sources = {}
        for words, uncertain in commands:
            name = Path(words[0]).name
            cwd = self.root
            args = words[1:]
            if name == "git":
                args, directories = _git_command(words)
                if not args or args[0] != "mv":
                    continue
                for directory in directories:
                    cwd = cwd / directory
                args = args[1:]
            elif name not in {"cp", "mv"}:
                continue
            while args and args[0] in {
                "-f",
                "--force",
                "-p",
                "-v",
                "--verbose",
            }:
                args = args[1:]
            if args and args[0] == "--":
                args = args[1:]
            if len(args) != 2 or any(
                arg.startswith(("-", "~")) or any(c in arg for c in "$`*?[")
                for arg in args
            ):
                continue
            source_path, destination = (cwd / arg for arg in args)
            source = self.relative(source_path)
            if destination.is_dir():
                destination /= source_path.name
            target = self.relative(destination)
            source = sources.get(source, source)
            candidates = source if isinstance(source, list) else [source]
            if not self.suffix_in_scope(target):
                continue
            if source is not None and any(
                candidate and candidate not in files for candidate in candidates
            ):
                if not uncertain:
                    continue
                source = None
            if source is not None and (uncertain or "" in candidates):
                # An empty source may not exist, so a later copy may fail too.
                source = list(
                    dict.fromkeys(
                        [target if target in files else "", *candidates]
                    )
                )
            if target in sources and sources[target] != source:
                sources[target] = None
            else:
                sources[target] = source
        return sources

    def before_command(self, command, operation_id):
        """Snapshot eligible files unless Git moves or shell execution is unresolved."""
        if git_moves_tree(command):
            return
        self.snapshots.mkdir(parents=True, exist_ok=True)
        now = time.time()
        for stale in self.snapshots.glob("*.json"):
            if now - stale.stat().st_mtime > SNAPSHOT_MAX_AGE:
                stale.unlink()
        files = {}
        for rel in self.scoped_files():
            text = read_text(self.root / rel)
            if text is not None:
                files[rel] = text
        self.snapshot_path(operation_id).write_text(
            json.dumps(
                {
                    "head": self.head(),
                    "files": files,
                    "sources": self._command_sources(command, files),
                }
            ),
            encoding="utf-8",
        )

    def after_command(self, operation_id):
        """Mark changed files against the matching snapshot, then consume it.

        A revision change is ignored unless it was exactly one new commit.
        Literal copies/moves use their source snapshot even after modification.
        Conflicting sources are skipped; conditional transfers mark only shared
        additions across possible baselines. Unchanged copies are not new writing.
        """
        path = self.snapshot_path(operation_id)
        if not path.exists():
            return
        snapshot = json.loads(path.read_text(encoding="utf-8"))
        path.unlink()
        if snapshot["head"] != self.head() and not self.committed_on(
            snapshot["head"]
        ):
            return
        before = snapshot["files"]
        sources = snapshot.get("sources", {})
        known = None
        shingles = None
        for rel in self.scoped_files():
            text = read_text(self.root / rel)
            if text is None or text == before.get(rel):
                continue
            source = sources.get(rel, rel)
            if source is None:
                continue
            if rel not in before and rel not in sources:
                if known is None:
                    known = {plain_map(old)[0] for old in before.values()}
                if plain_map(text)[0] in known:
                    continue
            if shingles is None:
                shingles = self.load_shingles()
            if isinstance(source, list):
                marked = _remark_candidates(
                    (before.get(candidate, "") for candidate in source),
                    text,
                    shingles,
                    self.human_min_words,
                )
            else:
                marked = remark(
                    before.get(source, ""),
                    text,
                    carry=False,
                    shingles=shingles,
                    min_words=self.human_min_words,
                )
            if marked != text and self.in_scope(rel):
                write_text(self.root / rel, marked)
