import contextlib
import io
import os
from pathlib import Path
import sys
import tempfile
import unittest
import unittest.mock

TOOLS = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(TOOLS))
import dogfood
import textprov_reanchor

mark = dogfood.textprov.mark
strip = dogfood.textprov.strip_marks
TXT = Path("a.txt")


class ReanchorTests(unittest.TestCase):
    def messages(self, before, after, require_marks=True):
        return [message for _, _, message in dogfood.check_text(TXT, before, after, require_marks)]

    def reanchor(self, before, after, strict=False):
        result, changed, converged = textprov_reanchor.reanchor(TXT, before, after, strict)
        self.assertTrue(converged)
        self.assertEqual(strip(result), strip(after))
        return result, changed

    def test_marked_legacy_text_gets_its_base_bytes_back(self):
        before, after = "legacy text\n", mark("legacy") + " text\nnew\n"
        self.assertIn("marked unchanged legacy text", self.messages(before, after, False))
        result, changed = self.reanchor(before, after)
        self.assertEqual(result, "legacy text\nnew\n")
        self.assertEqual(changed, 6)
        self.assertEqual(self.messages(before, result, False), [])

    def test_lost_marks_are_restored(self):
        before = "kept " + mark("marked", state="human") + "\n"
        result, _ = self.reanchor(before, strip(before))
        self.assertEqual(result, before)
        self.assertEqual(self.messages(before, result), [])

    def test_strict_marks_only_new_eligible_prose(self):
        before, after = "old\n", "old\nnew words\n"
        unchanged, changed = self.reanchor(before, after)
        self.assertEqual((unchanged, changed), (after, 0))
        result, _ = self.reanchor(before, after, strict=True)
        self.assertEqual(result, "old\n" + mark("new") + " " + mark("words") + "\n")
        self.assertEqual(self.messages(before, result), [])

    def test_marks_outside_eligible_prose_are_stripped(self):
        before = "Text\n"
        after = "Text\n\n`" + mark("code") + "` and " + mark("prose") + "\n"
        result, _, converged = textprov_reanchor.reanchor(Path("a.md"), before, after)
        self.assertTrue(converged)
        self.assertEqual(result, "Text\n\n`code` and " + mark("prose") + "\n")

    def test_unsettled_marks_are_reported(self):
        with unittest.mock.patch.object(textprov_reanchor, "fix", side_effect=lambda path, before, after, strict: (after, 1)):
            _, changed, converged = textprov_reanchor.reanchor(TXT, "a", "a")
        self.assertFalse(converged)
        self.assertEqual(changed, textprov_reanchor.MAX_PASSES)

    def test_a_plain_text_change_is_refused(self):
        with unittest.mock.patch.object(textprov_reanchor, "fix", return_value=("changed", 0)):
            with self.assertRaisesRegex(RuntimeError, "plain text"):
                textprov_reanchor.reanchor(TXT, "a", "a")


class CommandTests(unittest.TestCase):
    def setUp(self):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        self.root = Path(temp.name).resolve()
        self.git("init", "-q")
        self.git("config", "user.name", "Test")
        self.git("config", "user.email", "test@example.invalid")
        self.git("config", "commit.gpgsign", "false")
        self.git("config", "core.hooksPath", "/dev/null")
        (self.root / "docs").mkdir()
        self.legacy = self.root / "docs/legacy.txt"
        self.legacy.write_text("legacy text\n")
        self.git("add", ".")
        self.git("commit", "-qm", "base")
        self.legacy.write_text(mark("legacy") + " text\nnew\n")
        self.addCleanup(os.chdir, os.getcwd())
        os.chdir(self.root / "docs")
        patch = unittest.mock.patch.object(dogfood, "ROOT", self.root)
        patch.start()
        self.addCleanup(patch.stop)

    def git(self, *args):
        return dogfood.git(self.root, *args)

    def run_main(self, *argv):
        stdout, stderr = io.StringIO(), io.StringIO()
        with contextlib.redirect_stdout(stdout), contextlib.redirect_stderr(stderr):
            try:
                status = textprov_reanchor.main(list(argv))
            except SystemExit as error:
                status = error.code
        return status, stdout.getvalue(), stderr.getvalue()

    def test_reports_without_writing_and_skips_new_files(self):
        (self.root / "docs/new.txt").write_text("new\n")
        status, out, _ = self.run_main("HEAD", "legacy.txt", "new.txt")
        self.assertEqual(status, 0)
        self.assertIn("   6 clusters    0 left  legacy.txt", out)
        self.assertIn("skip (new file) new.txt", out)
        self.assertEqual(self.legacy.read_text(), mark("legacy") + " text\nnew\n")

    def test_write_resolves_paths_from_a_subdirectory(self):
        status, _, _ = self.run_main("HEAD", "--write", "legacy.txt")
        self.assertEqual(status, 0)
        self.assertEqual(self.legacy.read_text(), "legacy text\nnew\n")

    def test_unsettled_file_is_left_as_it_was(self):
        with unittest.mock.patch.object(textprov_reanchor, "fix", side_effect=lambda path, before, after, strict: (after, 1)):
            status, _, err = self.run_main("HEAD", "--write", "legacy.txt")
        self.assertEqual(status, 1)
        self.assertIn("left as it was", err)
        self.assertEqual(self.legacy.read_text(), mark("legacy") + " text\nnew\n")

    def test_bad_arguments_fail_before_anything_is_written(self):
        for argv, error in (([], "required"),
                            (["--wirte", "HEAD", "legacy.txt"], "unrecognized"),
                            (["no-such-ref", "legacy.txt"], "not a commit"),
                            (["HEAD", "--write", "legacy.txt", "/tmp/elsewhere.md"], "outside the repository")):
            with self.subTest(argv=argv):
                status, _, err = self.run_main(*argv)
                self.assertEqual(status, 2)
                self.assertIn(error, err)
        self.assertEqual(self.legacy.read_text(), mark("legacy") + " text\nnew\n")


if __name__ == "__main__":
    unittest.main()
