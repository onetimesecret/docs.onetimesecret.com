import contextlib
import io
from pathlib import Path
import sys
import unittest

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

    def test_reports_against_base_and_skips_new_files(self):
        stdout = io.StringIO()
        with contextlib.redirect_stdout(stdout):
            status = textprov_reanchor.main(["HEAD", str(TOOLS.parent / "AGENTS.md"), str(TOOLS / "no-such-file.md")])
        self.assertEqual(status, 0)
        self.assertIn("   0 clusters    0 left", stdout.getvalue())
        self.assertIn("skip (new file) " + str(TOOLS / "no-such-file.md"), stdout.getvalue())

    def test_arguments_are_validated(self):
        for argv in ([], ["main"], ["--wirte", "main", "a.md"]):
            with self.subTest(argv=argv), contextlib.redirect_stderr(io.StringIO()):
                with self.assertRaises(SystemExit):
                    textprov_reanchor.main(argv)

    def test_unknown_base_and_outside_path_fail_loudly(self):
        for argv, error in ((["no-such-ref-xyz", "README.md"], "not a commit"),
                            (["HEAD", "/tmp/elsewhere.md"], "outside the repository")):
            stderr = io.StringIO()
            with self.subTest(argv=argv), contextlib.redirect_stderr(stderr):
                with self.assertRaises(SystemExit):
                    textprov_reanchor.main(argv)
                self.assertIn(error, stderr.getvalue())


if __name__ == "__main__":
    unittest.main()
