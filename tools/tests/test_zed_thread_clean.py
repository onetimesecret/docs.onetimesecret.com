"""Regression tests for the standalone Zed Markdown export cleaner."""

import runpy
import subprocess
import sys
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[2] / "bin" / "zed-thread-clean.py"
clean_thread = runpy.run_path(str(SCRIPT))["clean_thread"]


class CleanThreadTests(unittest.TestCase):
    def test_default_matches_explicit_markdown(self):
        source = "## User\n\nHello\n\n## Assistant\n\nAnswer\n"
        self.assertEqual(clean_thread(source), source)
        self.assertEqual(clean_thread(source, output_format="markdown"), source)

    def test_markdoc_wraps_both_roles(self):
        source = (
            "## User (checkpoint)\n\n<thinking>example</thinking>\n"
            "**Tool Call: example**\n\n## Assistant\n\nAnswer\n"
        )
        self.assertEqual(
            clean_thread(source, output_format="markdoc"),
            '{% message speaker="User" %}\n\n<thinking>example</thinking>\n'
            "**Tool Call: example**\n\n{% /message %}\n\n"
            '{% message speaker="Assistant" %}\n\nAnswer\n\n{% /message %}\n',
        )

    def test_invalid_output_format(self):
        with self.assertRaises(ValueError):
            clean_thread("", output_format="html")

    def test_tools_thinking_and_empty_turns(self):
        source = """## User

Question

## Assistant

I will check.

**Tool Call: Read file `example.md`**
Status: Completed

```md
## User
Not a real turn
```

**Tool Call: Search**
Status: Completed

No matches found

## Assistant

<thinking>
Private reasoning
</thinking>

**Tool Call: command**
Status: Completed

Terminal:
```
output
```

## Assistant

Answer

## User (checkpoint)

Next question
"""
        self.assertEqual(
            clean_thread(source),
            "## User\n\nQuestion\n\n## Assistant\n\nI will check.\n\nAnswer\n\n## User\n\nNext question\n",
        )
        self.assertEqual(
            clean_thread(source, output_format="markdoc"),
            '{% message speaker="User" %}\n\nQuestion\n\n{% /message %}\n\n'
            '{% message speaker="Assistant" %}\n\nI will check.\n\nAnswer\n\n{% /message %}\n\n'
            '{% message speaker="User" %}\n\nNext question\n\n{% /message %}\n',
        )

    def test_retains_conversation_code_and_nested_fences(self):
        source = """## Assistant

Example:

````md
## User
**Tool Call: literal example**
<thinking>literal example</thinking>
{% message speaker="User" %}
{% /message %}
```python
print("hello")
```
````

After code.
"""
        self.assertEqual(clean_thread(source), source)
        self.assertEqual(
            clean_thread(source, output_format="markdoc"),
            '{% message speaker="Assistant" %}\n\n'
            + source.removeprefix("## Assistant\n\n").rstrip("\n")
            + "\n\n{% /message %}\n",
        )

    def test_inline_thinking(self):
        self.assertEqual(
            clean_thread(
                "## Assistant\n\nBefore <thinking>secret</thinking>after\n"
            ),
            "## Assistant\n\nBefore after\n",
        )

    def test_thinking_with_fences(self):
        source = "## Assistant\n<thinking>\n```\nsecret\n</thinking>\nAnswer\n"
        self.assertEqual(clean_thread(source), "## Assistant\n\nAnswer\n")

    def test_user_metadata_examples_are_untouched(self):
        source = (
            "## User\n\n<thinking>example</thinking>\n**Tool Call: example**\n"
        )
        self.assertEqual(clean_thread(source), source)

    def test_tilde_fences_in_tool_output(self):
        source = "## Assistant\n**Tool Call: example**\n~~~md\n## User\n~~~\n## Assistant\nAnswer\n"
        self.assertEqual(clean_thread(source), "## Assistant\n\nAnswer\n")

    def test_empty_and_metadata_only(self):
        for source in (
            "",
            "## Assistant\n<thinking>secret</thinking>\n",
            "## Assistant\n**Tool Call: example**\noutput\n",
        ):
            for output_format in ("markdown", "markdoc"):
                with self.subTest(source=source, output_format=output_format):
                    self.assertEqual(
                        clean_thread(source, output_format=output_format), ""
                    )

    def test_stdin_cli(self):
        result = subprocess.run(
            [sys.executable, str(SCRIPT)],
            input="## User\n\nHello\n",
            text=True,
            capture_output=True,
            check=True,
        )
        self.assertEqual(result.stdout, "## User\n\nHello\n")
        self.assertEqual(result.stderr, "")

    def test_markdoc_cli(self):
        result = subprocess.run(
            [sys.executable, str(SCRIPT), "--format", "markdoc"],
            input="## User\n\nHello\n\n## Assistant\n\nAnswer\n",
            text=True,
            capture_output=True,
            check=True,
        )
        self.assertEqual(
            result.stdout,
            '{% message speaker="User" %}\n\nHello\n\n{% /message %}\n\n'
            '{% message speaker="Assistant" %}\n\nAnswer\n\n{% /message %}\n',
        )
        self.assertEqual(result.stderr, "")

    def test_cli_rejects_invalid_format(self):
        result = subprocess.run(
            [sys.executable, str(SCRIPT), "--format", "html"],
            input="## User\n\nHello\n",
            text=True,
            capture_output=True,
        )
        self.assertEqual(result.returncode, 2)
        self.assertEqual(result.stdout, "")
        self.assertIn("invalid choice: 'html'", result.stderr)
        self.assertIn("markdown", result.stderr)
        self.assertIn("markdoc", result.stderr)


if __name__ == "__main__":
    unittest.main()
