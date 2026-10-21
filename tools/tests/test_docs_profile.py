from pathlib import Path
import sys
import unittest

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
