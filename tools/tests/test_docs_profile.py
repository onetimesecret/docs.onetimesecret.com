from pathlib import Path
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import dogfood


class DocsProfileTests(unittest.TestCase):
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
