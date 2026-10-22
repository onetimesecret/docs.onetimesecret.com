import contextlib
import io
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest import mock

TOOLS = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(TOOLS))
import dogfood

AI = chr(dogfood.MAPPING.selectors["ai"])
HUMAN = chr(dogfood.MAPPING.selectors["human"])
mark = dogfood.textprov.mark
strip = dogfood.textprov.strip_marks


class AuthoringTests(unittest.TestCase):
    def edit(self, old, new, suffix=".txt"):
        return dogfood.mark_edit(Path("document" + suffix), old, 0, len(strip(old)), new, "ai")

    def test_separate_edits_preserve_the_unchanged_middle(self):
        result = self.edit("alpha unchanged omega", "Alpha unchanged Omega")
        self.assertEqual(result, "A" + AI + "lpha unchanged O" + AI + "mega")
        self.assertEqual(dogfood.check_text(Path("a.txt"), "alpha unchanged omega", result), [])

    def test_edit_inside_a_word_preserves_existing_states(self):
        source = mark("cat", state="human")
        result = self.edit(source, "cart")
        self.assertEqual(result, mark("ca", state="human") + mark("r") + mark("t", state="human"))

    def test_deletion_does_not_relabel_survivors(self):
        self.assertEqual(self.edit("aXbc", "abc"), "abc")

    def test_reflow_and_moved_blocks_preserve_marks_and_legacy_text(self):
        old = "legacy paragraph\n" + mark("a different ending", state="human")
        new = "a different\nending\nlegacy paragraph"
        result = self.edit(old, new)
        self.assertEqual(strip(result), new)
        self.assertNotIn(AI, result)
        self.assertEqual(dogfood.check_text(Path("a.txt"), old, result), [])

    def test_graphemes_are_marked_once_and_never_split(self):
        for cluster in ("e\u0301", "👨‍👩‍👧", "🇨🇦", "👍🏽", "❤️"):
            with self.subTest(cluster=cluster):
                self.assertEqual(self.edit("", cluster), cluster + AI)
        with self.assertRaisesRegex(ValueError, "boundaries"):
            dogfood.mark_edit(Path("a.txt"), "e\u0301", 0, 1, "x", "ai")
        with self.assertRaisesRegex(ValueError, "adjacent grapheme"):
            dogfood.mark_edit(Path("a.txt"), "e", 1, 1, "\u0301", "ai")
        self.assertEqual(self.edit("e", "e\u0301"), "e\u0301" + AI)

    def test_utf8_and_crlf_round_trip(self):
        source = "# Café 😀\r\n\r\nNew prose.\r\n"
        result = self.edit("", source, ".md")
        self.assertEqual(strip(result), source)
        self.assertIn("😀" + AI, result)
        self.assertNotIn("\n" + AI, result)
        self.assertEqual(dogfood.check_text(Path("a.md"), "", result), [])

    def test_markdown_syntax_links_code_and_metadata_are_preserved(self):
        source = (
            '---\ntitle: Metadata\n---\n\n# Heading\n\n'
            '**Bold** and _emphasis_ with `code()` and [label](https://example.test "title").\n\n'
            '[full label][ref] and [ref] and [ref][].\n\n'
            '[ref]: https://example.test\n\n'
            'https://example.test and <https://example.test>\n\n'
            '> Quote\n\n- List item\n\n'
            '| Header | Next |\n| --- | --- |\n| Cell | Value |\n\n'
            'Escaped \\* and &amp; stay intact.\n\n'
            '```python\nprint("code")\n```\n\n'
            '    indented_code()\n\n'
            '<div class="x">HTML block</div>\n'
        )
        result = self.edit("", source, ".md")
        self.assertEqual(strip(result), source)
        for protected in (
            'title: Metadata', '`code()`', 'https://example.test', '"title"',
            '[ref]', '[ref][]', '\\*', '&amp;', 'print("code")',
            '    indented_code()', '<div class="x">HTML block</div>',
        ):
            self.assertIn(protected, result)
        self.assertIn('[' + mark('label') + ']', result)
        self.assertIn(mark('Cell'), result)
        self.assertEqual(dogfood.check_text(Path("a.md"), "", result), [])

    def test_aside_fences_are_syntax_but_labels_are_prose(self):
        source = ":::note\nBody text.\n:::\n\n:::caution[Read this]{.wide}\nMore.\n::::\n"
        result = self.edit("", source, ".md")
        self.assertEqual(strip(result), source)
        self.assertTrue(result.startswith(":::note\n" + mark("Body") + " " + mark("text.") + "\n:::\n"))
        self.assertIn(":::caution[" + mark("Read") + " " + mark("this") + "]{.wide}\n", result)
        self.assertTrue(result.endswith(mark("More.") + "\n::::\n"))
        self.assertEqual(dogfood.check_text(Path("a.md"), "", result), [])

    def test_existing_marks_outside_edit_are_byte_preserved(self):
        source = mark("Hello", state="human") + " world"
        result = dogfood.mark_edit(Path("a.txt"), source, 6, 11, "earth", "ai")
        self.assertTrue(result.startswith(mark("Hello", state="human") + " "))
        self.assertEqual(strip(result), "Hello earth")

    def test_legacy_markdown_defect_does_not_force_retrospective_repair(self):
        source = mark("# Legacy heading") + "\n\nold"
        start = len(strip(source)) - 3
        result = dogfood.mark_edit(Path("a.md"), source, start, start + 3, "old X", "ai")
        self.assertEqual(result, source + " " + mark("X"))
        self.assertEqual(dogfood.check_text(Path("a.md"), source, result), [])

    def test_replacement_requires_an_explicit_supported_state(self):
        with self.assertRaisesRegex(ValueError, "origin must"):
            dogfood.mark_edit(Path("a.txt"), "", 0, 0, "text", "unknown")
        with self.assertRaisesRegex(ValueError, "replacement must be unmarked"):
            self.edit("", mark("text"))


class CheckerTests(unittest.TestCase):
    def messages(self, old, new, suffix=".txt"):
        return [message for _, _, message in dogfood.check_text(Path("a" + suffix), old, new)]

    def test_legacy_text_is_not_a_coverage_failure(self):
        self.assertEqual(self.messages("legacy", "legacy"), [])

    def test_new_unmarked_prose_fails(self):
        self.assertIn("new prose cluster has no supported origin mark", self.messages("old", "old X"))

    def test_marks_cannot_be_lost_relabelled_or_backfilled(self):
        for after in ("old", mark("old", state="human")):
            self.assertIn("changed or lost an existing mark", self.messages(mark("old"), after))
        self.assertIn("marked unchanged legacy text", self.messages("old", mark("old")))

    def test_inserted_duplicate_does_not_steal_existing_attribution(self):
        for original in ("same", mark("same", state="human")):
            self.assertEqual(self.messages(original, mark("same") + " " + original), [])
            self.assertEqual(self.messages(original, original + " " + mark("same")), [])

    def test_invalid_new_marks_fail(self):
        for source in ("x" + AI + AI, mark("x", mode="pua"), "x" + chr(0xE0104), " " + AI, AI):
            with self.subTest(source=ascii(source)):
                self.assertTrue(self.messages("", source))

    def test_code_is_excluded_but_new_marks_in_code_fail(self):
        self.assertEqual(self.messages("", '```\nprint("hello")\n```\n', ".md"), [])
        self.assertTrue(self.messages("", '`' + mark('code') + '`', ".md"))

    def test_new_marks_cannot_corrupt_markdown_delimiters(self):
        self.assertTrue(self.messages("", mark("# Heading"), ".md"))

    def test_new_marks_inside_aside_fences_fail(self):
        body = "\n" + mark("Body.") + "\n"
        self.assertTrue(self.messages("", mark(":::note") + body + mark(":::") + "\n", ".md"))
        self.assertTrue(self.messages("", ":::" + mark("note") + body + ":::\n", ".md"))
        self.assertTrue(self.messages("", ":::tip" + mark("[") + "Label]" + body + ":::\n", ".md"))

    def test_removing_marks_from_an_aside_fence_repairs_it(self):
        before = mark(":::note") + "\n" + mark("Body.") + "\n" + mark(":::") + "\n"
        self.assertEqual(self.messages(before, ":::note\n" + mark("Body.") + "\n:::\n", ".md"), [])
        self.assertIn("changed or lost an existing mark", self.messages(before, ":::note\nBody.\n:::\n", ".md"))


class RepositoryTests(unittest.TestCase):
    def setUp(self):
        dogfood._MARKDOWN_INFO.clear()  # Keep call-count assertions order-independent.
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.git("init", "-q")
        self.git("config", "user.name", "Test")
        self.git("config", "user.email", "test@example.invalid")
        self.git("config", "commit.gpgsign", "false")
        self.git("config", "core.hooksPath", "/dev/null")
        (self.root / "tools").mkdir()
        (self.root / "tools/dogfooding.json").write_text('{"include":["*.md","*.txt"],"exclude":{"docs/examples/*":"fixtures"}}' )
        (self.root / "legacy.md").write_text("Legacy prose.\n")
        (self.root / "marked.txt").write_text(mark("known"))
        self.git("add", ".")
        self.git("commit", "-qm", "baseline")

    def git(self, *args):
        return dogfood.git(self.root, *args).decode().strip()

    def check(self, **kwargs):
        with contextlib.redirect_stdout(io.StringIO()) as output:
            status = dogfood.check_repository(self.root, kwargs.pop("base", "HEAD"), **kwargs)
        return status, output.getvalue()

    def command(self, *args):
        return subprocess.run(
            [sys.executable, str(TOOLS / "dogfood.py"), *args],
            cwd=self.root, capture_output=True, text=True,
        )

    def test_untracked_new_prose_fails_but_fixture_is_excluded(self):
        (self.root / "new.txt").write_text("new")
        self.assertEqual(self.check()[0], 1)
        (self.root / "new.txt").unlink()
        (self.root / "docs/examples").mkdir(parents=True)
        (self.root / "docs/examples/unmarked.txt").write_text("fixture")
        self.assertEqual(self.check()[0], 0)

    def test_staged_check_reads_index_not_worktree(self):
        (self.root / "new.txt").write_text(mark("new"))
        self.git("add", "new.txt")
        (self.root / "new.txt").write_text("new")
        self.assertEqual(self.check(staged=True)[0], 0)
        self.assertEqual(self.check()[0], 1)

    def test_committed_comparison_and_rename_preserve_baseline(self):
        base = self.git("rev-parse", "HEAD")
        self.git("mv", "legacy.md", "renamed.md")
        self.git("commit", "-qm", "rename")
        (self.root / "renamed.md").write_text("unsaved unmarked change")
        self.assertEqual(self.check(base=base, head="HEAD")[0], 0)

    def test_create_edit_and_dry_run(self):
        created = self.command("create", "new.md", "--new", "# A new document\n", "--state", "ai")
        self.assertEqual(created.returncode, 0, created.stderr)
        before = (self.root / "new.md").read_text()
        edited = self.command("edit", "new.md", "--old", "new", "--new", "newer", "--state", "human", "--dry-run")
        self.assertEqual(edited.returncode, 0, edited.stderr)
        self.assertIn(mark("new") + mark("er", state="human"), edited.stdout)
        self.assertEqual((self.root / "new.md").read_text(), before)
        self.assertEqual(self.command("create", "new.md", "--new", "oops", "--state", "ai").returncode, 2)

    def test_ambiguous_replacement_is_rejected_without_writing(self):
        path = self.root / "new.txt"
        path.write_text("same same")
        result = self.command("edit", "new.txt", "--old", "same", "--new", "other", "--state", "ai")
        self.assertEqual(result.returncode, 2)
        self.assertEqual(path.read_text(), "same same")

    def test_existing_file_edits_preserve_crlf_and_mode(self):
        path = self.root / "new.txt"
        path.write_bytes(b"old\r\n")
        path.chmod(0o640)
        result = self.command("edit", "new.txt", "--old", "old", "--new", "old X", "--state", "ai")
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(path.read_bytes(), ("old " + mark("X") + "\r\n").encode())
        self.assertEqual(path.stat().st_mode & 0o777, 0o640)

    def test_docs_with_only_legacy_pua_marks_must_enroll(self):
        page = self.root / "src/content/docs/page.md"
        page.parent.mkdir(parents=True)
        page.write_text("---\ntitle: Page\n---\n\n" + mark("Old", mode="pua") + " prose.\n")
        self.git("add", ".")
        self.git("commit", "-qm", "legacy page")
        page.write_text(page.read_text() + "\nHuman addition.\n")
        status, output = self.check(require_marks=False)
        self.assertEqual(status, 1)
        self.assertIn("must opt in with textprov: true", output)

    def test_docs_reject_human_marks_but_keep_genuine_ivs(self):
        page = self.root / "src/content/docs/page.md"
        page.parent.mkdir(parents=True)
        page.write_text("---\ntitle: Page\n---\n\n" + mark("Hand", state="human") + " edit.\n")
        status, output = self.check(require_marks=False)
        self.assertEqual(status, 1)
        self.assertIn("src/content/docs/page.md:5:1: docs record AI edits only", output)
        page.write_text("---\ntitle: Page\n---\n\n辻\U000e0100 is a name.\n")
        self.assertEqual(self.check(require_marks=False)[0], 0)

    def test_check_parses_all_changed_markdown_in_one_node_call(self):
        for name in ("a", "b", "c"):
            (self.root / f"{name}.md").write_text(mark(name.upper()) + " " + mark("prose") + "\n")
        with mock.patch.object(dogfood.subprocess, "run", wraps=subprocess.run) as run:
            self.assertEqual(self.check()[0], 0)
        node = [call for call in run.call_args_list if call.args[0][0] == "node"]
        self.assertEqual(len(node), 1)

    def test_parse_failure_names_the_file(self):
        (self.root / "a.md").write_text(mark("Fine") + "\n")
        (self.root / "bad.md").write_text("---\n- not a mapping\n---\n\n" + mark("Text") + "\n")
        with self.assertRaisesRegex(ValueError, "^bad.md: "):
            self.check()

    def test_symlink_and_out_of_scope_path_are_rejected(self):
        (self.root / "alias.md").symlink_to("legacy.md")
        for path in ("alias.md", "../outside.md", "code.py"):
            with self.subTest(path=path), self.assertRaises(ValueError):
                dogfood.safe_path(self.root, path)


if __name__ == "__main__":
    unittest.main()
