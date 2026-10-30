import contextlib
import io
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest import mock

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import dogfood


class DocsProfileTests(unittest.TestCase):
    def test_editing_legacy_pua_preserves_its_encoding_and_validates_markdown(self):
        legacy = dogfood.textprov.mark('Old', mode='pua')
        source = legacy + ' prose\n'
        result = dogfood.mark_edit(Path('legacy.md'), source, 0, len(dogfood.textprov.strip_marks(source)), 'Old new prose\n', 'ai')
        self.assertTrue(result.startswith(legacy))
        self.assertEqual(dogfood.textprov.strip_marks(result), 'Old new prose\n')
        self.assertEqual(dogfood.check_text(Path('legacy.md'), source, result), [])

    def test_yaml_owns_enrollment_spacing_comments_and_boolean_types(self):
        for newline in ('\n', '\r\n'):
            for field, expected in [('textprov:   true # recorded', True), ('textprov: false', False), ('textprov: "true"', 'true')]:
                source = newline.join(['---', field, 'title: Plain', '---', '', 'Prose'])
                info = dogfood.markdown_info([source])[0]
                self.assertEqual(info['textprov'], expected)
                self.assertTrue(info['hasFrontmatter'])

    def test_markdoc_tags_and_attributes_are_protected(self):
        source = '---\ntitle: Plain title\n---\n\n{% card title="Do not mark" %}\n\nNew **prose**, `code`, and [label](/en/start).\n\n{% /card %}\n'
        result = dogfood.mark_edit(Path('page.mdoc'), '', 0, 0, source, 'ai')
        self.assertIn('{% card title="Do not mark" %}', result)
        self.assertIn('{% /card %}', result)
        self.assertIn('title: Plain title', result)
        self.assertIn('`code`', result)
        self.assertIn('](/en/start)', result)
        self.assertIn(dogfood.textprov.mark('prose'), result)
        self.assertEqual(dogfood.check_text(Path('page.mdoc'), '', result), [])

    def test_human_contributions_need_no_new_declaration_in_ci(self):
        old = dogfood.textprov.mark('AI') + ' legacy'
        new = old + ' human addition'
        self.assertEqual(dogfood.check_text(Path('page.md'), old, new, require_marks=False), [])
        self.assertTrue(dogfood.check_text(Path('page.md'), old, new))
        lost = 'AI legacy human addition'
        self.assertTrue(dogfood.check_text(Path('page.md'), old, lost, require_marks=False))

    def test_existing_genuine_ideographic_variation_sequence_survives_an_edit(self):
        source = '辻\U000e0100 old text'
        result = dogfood.mark_edit(Path('page.md'), source, 0, len(dogfood.textprov.strip_marks(source)), '辻 new text', 'ai')
        self.assertTrue(result.startswith('辻\U000e0100 '))

    def test_unchanged_preserve_only_check_parses_stripped_after(self):
        source = dogfood.textprov.mark("Prose") + " `code`\n"
        plain = dogfood.textprov.strip_marks(source)
        with mock.patch.object(
            dogfood, "markdown_info", wraps=dogfood.markdown_info
        ) as parser:
            self.assertEqual(
                dogfood.check_text(
                    Path("page.md"), source, source, require_marks=False
                ),
                [],
            )
        parser.assert_called_once_with([plain])

    def test_unchanged_preserve_only_check_does_not_skip_parser_failure(self):
        source = dogfood.textprov.mark("Prose")
        plain = dogfood.textprov.strip_marks(source)
        with mock.patch.object(
            dogfood, "markdown_info", side_effect=ValueError("parser failed")
        ) as parser, self.assertRaisesRegex(ValueError, "parser failed"):
            dogfood.check_text(
                Path("page.md"), source, source, require_marks=False
            )
        parser.assert_called_once_with([plain])

    def test_grapheme_eligibility_requires_every_code_point(self):
        plain = "e\u0301"
        (item,) = dogfood.clusters(plain)
        self.assertEqual((item.start, item.end, item.text), (0, 2, plain))
        for offsets in (set(), {0}, {1}, {0, 1}):
            with self.subTest(offsets=offsets):
                eligible = offsets == {0, 1}
                self.assertEqual(dogfood.eligible(item, offsets), eligible)
                profile = lambda text: [
                    i not in offsets for i in range(len(text))
                ]
                for marked in (False, True):
                    with self.subTest(marked=marked):
                        after = (
                            dogfood.textprov.mark(plain) if marked else plain
                        )
                        problems = dogfood.textprov.check_text(
                            "", after, profile=profile
                        )
                        if marked == eligible:
                            self.assertEqual(problems, [])
                        else:
                            message = (
                                "new prose cluster has no supported origin mark"
                                if eligible
                                else "new mark is outside eligible prose or attached to whitespace"
                            )
                            self.assertEqual(problems, [(1, 1, message)])

    def test_changed_repository_check_uses_one_real_markdown_prefetch(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            for args in (
                ("init", "-q"),
                ("config", "user.name", "Test"),
                ("config", "user.email", "test@example.invalid"),
                ("config", "commit.gpgsign", "false"),
                ("config", "core.hooksPath", "/dev/null"),
            ):
                dogfood.git(root, *args)
            (root / "tools").mkdir()
            (root / "tools/dogfooding.json").write_text(
                json.dumps({"include": ["*.md", "*.mdoc"], "exclude": []}),
                encoding="utf-8",
            )
            sources = {}
            for name in ("page.md", "card.mdoc"):
                before = f"Legacy {name} prose.\n"
                after = (
                    before
                    + "\n"
                    + dogfood.textprov.mark("Additional words.")
                    + "\n"
                )
                sources[name] = (before, after)
                (root / name).write_text(before, encoding="utf-8")
            dogfood.git(root, "add", ".")
            dogfood.git(root, "commit", "-qm", "baseline")
            for name, (_, after) in sources.items():
                (root / name).write_text(after, encoding="utf-8")

            with (
                mock.patch.dict(dogfood._MARKDOWN_INFO, clear=True),
                mock.patch.object(
                    dogfood.subprocess, "run", wraps=dogfood.subprocess.run
                ) as run,
                contextlib.redirect_stdout(io.StringIO()) as output,
            ):
                status = dogfood.check_repository(root, "HEAD")
                self.assertEqual(status, 0, output.getvalue())
                self.assertIn(
                    "Checked 2 eligible changed files; 0 failed.",
                    output.getvalue(),
                )
                node = [
                    call
                    for call in run.call_args_list
                    if call.args[0][0] == "node"
                ]
                self.assertEqual(len(node), 1)
                expected = {
                    source
                    for _, after in sources.values()
                    for source in (after, dogfood.textprov.strip_marks(after))
                }
                self.assertCountEqual(
                    json.loads(node[0].kwargs["input"]), expected
                )
                self.assertEqual(set(dogfood._MARKDOWN_INFO), expected)
