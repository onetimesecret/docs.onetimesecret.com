"""Opt-in, claim-backed Markdown edits for a cooperating local writer.

No watchers, shell snapshots, prompt heuristics, or automatic hooks run here.
Writers using this API serialize per Git root and check the complete raw file
hash. External programs do not honor that lock: callers must use a controlled
edit handoff, not advertise concurrent safety against arbitrary editors.
"""

import argparse
from contextlib import contextmanager
import fcntl
import hashlib
import json
import os
from pathlib import Path
import secrets
import stat
import sys

from . import segments
from .editing import markdown_protected
from .export import restore
from .workspace import Workspace


def content_hash(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


class ProseEditor:
    """Prepare or apply exact native-style replacements without guessing origin."""

    def __init__(self, root):
        self.workspace = Workspace(root)
        self.root = self.workspace.root
        top = self.workspace.git("rev-parse", "--show-toplevel")
        if top.returncode or Path(top.stdout.strip()).resolve() != self.root:
            raise ValueError("root must be the selected Git worktree root")

    @contextmanager
    def _parent(self, path):
        given = Path(path)
        if given.is_absolute() or not given.parts or any(p in (".", "..") for p in given.parts):
            raise ValueError("path must be relative to root without parent traversal")
        if not self.workspace.in_scope(given):
            raise ValueError("path is outside eligible Markdown prose scope")
        flags = os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW
        fd = os.open(str(self.root), flags)
        try:
            for part in given.parts[:-1]:
                child = os.open(part, flags, dir_fd=fd)
                os.close(fd)
                fd = child
            yield fd, given.name
        finally:
            os.close(fd)

    @contextmanager
    def _lock(self):
        root_fd = os.open(str(self.root), os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW)
        folder_fd = lock_fd = None
        try:
            try:
                os.mkdir(".textprov", mode=0o700, dir_fd=root_fd)
            except FileExistsError:
                pass
            folder_fd = os.open(".textprov", os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW,
                                dir_fd=root_fd)
            lock_fd = os.open("prose.lock", os.O_RDWR | os.O_CREAT | os.O_NOFOLLOW,
                              0o600, dir_fd=folder_fd)
            if not stat.S_ISREG(os.fstat(lock_fd).st_mode):
                raise ValueError("prose lock must be a regular file")
            fcntl.flock(lock_fd, fcntl.LOCK_EX)
            yield
        finally:
            if lock_fd is not None:
                os.close(lock_fd)
            if folder_fd is not None:
                os.close(folder_fd)
            os.close(root_fd)

    def _read(self, parent, name):
        fd = os.open(name, os.O_RDONLY | os.O_NOFOLLOW, dir_fd=parent)
        with os.fdopen(fd, "rb") as handle:
            info = os.fstat(handle.fileno())
            if not stat.S_ISREG(info.st_mode) or info.st_nlink != 1:
                raise ValueError("target must be a regular file without hard links")
            raw = handle.read()
        return raw.decode("utf-8"), info

    def edit(self, path, *, expected_content_hash, old_text, replacement,
             replace_all=False, apply=False):
        """Prepare, or explicitly apply, an exact replacement from an export.

        Unchanged bytes are retained verbatim. Replacement text must be a verified
        shared export report. Native-tool callers get exact old/new strings plus
        a full-file precondition; they must enforce their own controlled handoff.
        """
        if not isinstance(old_text, str) or not old_text:
            raise ValueError("old_text must be a nonempty exact raw string")
        if type(replace_all) is not bool or type(apply) is not bool:
            raise ValueError("replace_all and apply must be booleans")
        restore(replacement)  # Verify the companion before using its marked text.
        new_text = replacement["text"]
        with self._lock(), self._parent(path) as (parent, name):
            raw, original = self._read(parent, name)
            if content_hash(raw) != expected_content_hash:
                raise ValueError("stale file content hash")
            boundaries, offset = {0}, 0
            for cluster in segments(raw):
                offset += len(cluster)
                boundaries.add(offset)
            starts, at = [], 0
            while True:
                found = raw.find(old_text, at)
                if found < 0:
                    break
                starts.append(found)
                at = found + len(old_text)
            if not starts:
                raise ValueError("exact old_text not found")
            if len(starts) != 1 and not replace_all:
                raise ValueError("ambiguous edit; choose exact context or replace_all")
            protected = markdown_protected(raw)
            for start in starts:
                end = start + len(old_text)
                if start not in boundaries or end not in boundaries:
                    raise ValueError("edit splits a grapheme cluster")
                if any(protected[start:end]):
                    raise ValueError("edit touches protected Markdown syntax or code")
            desired = raw.replace(old_text, new_text)
            desired_boundaries, offset = {0}, 0
            for cluster in segments(desired):
                offset += len(cluster)
                desired_boundaries.add(offset)
            shift = 0
            for start in starts:
                joined_start = start + shift
                joined_end = joined_start + len(new_text)
                if joined_start not in desired_boundaries or joined_end not in desired_boundaries:
                    raise ValueError("replacement joins a neighboring grapheme cluster")
                shift += len(new_text) - len(old_text)
            report = dict(path=path, expected_content_hash=expected_content_hash,
                          content_hash=content_hash(desired), replacements=len(starts),
                          tool_input=dict(old_string=old_text, new_string=new_text,
                                          replace_all=replace_all), applied=False,
                          coordination="cooperating writers only; external writers require a controlled handoff")
            if not apply or desired == raw:
                return report
            temporary = ".textprov-" + secrets.token_hex(12) + ".tmp"
            fd = None
            try:
                fd = os.open(temporary, os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW,
                             stat.S_IMODE(original.st_mode), dir_fd=parent)
                os.fchmod(fd, stat.S_IMODE(original.st_mode))
                with os.fdopen(fd, "wb") as handle:
                    fd = None
                    handle.write(desired.encode("utf-8"))
                    handle.flush()
                    os.fsync(handle.fileno())
                latest, info = self._read(parent, name)
                if ((info.st_dev, info.st_ino) != (original.st_dev, original.st_ino)
                        or latest != raw):
                    raise ValueError("file changed during preparation")
                os.replace(temporary, name, src_dir_fd=parent, dst_dir_fd=parent)
                os.fsync(parent)
                report["applied"] = True
                return report
            finally:
                if fd is not None:
                    os.close(fd)
                try:
                    os.unlink(temporary, dir_fd=parent)
                except FileNotFoundError:
                    pass


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", required=True)
    args = parser.parse_args(argv)
    try:
        request = json.load(sys.stdin)
        if not isinstance(request, dict):
            raise ValueError("request must be an object")
        print(json.dumps({"result": ProseEditor(args.root).edit(**request)}, ensure_ascii=False))
        return 0
    except (ValueError, TypeError, OSError) as error:
        print(json.dumps({"error": str(error)}), file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
