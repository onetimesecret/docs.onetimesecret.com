import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


class TextProvDependencyTests(unittest.TestCase):
    def run_without_site_packages(self, stub=None):
        with tempfile.TemporaryDirectory() as directory:
            if stub is not None:
                Path(directory, "textprov.py").write_text(
                    stub, encoding="utf-8"
                )
            return subprocess.run(
                [
                    sys.executable,
                    "-S",
                    str(ROOT / "tools/dogfood.py"),
                    "--help",
                ],
                cwd=ROOT,
                env={**os.environ, "PYTHONPATH": directory},
                capture_output=True,
                text=True,
            )

    def test_missing_package_reports_install_command(self):
        result = self.run_without_site_packages()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("TextProv 0.3.0 is required", result.stderr)
        self.assertIn(
            "python3 -m pip install -r tools/requirements.txt", result.stderr
        )
        self.assertNotIn("Traceback", result.stderr)

    def test_wrong_version_reports_found_version_and_install_command(self):
        result = self.run_without_site_packages('__version__ = "0.2.0"\n')
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("TextProv 0.3.0 is required; found 0.2.0", result.stderr)
        self.assertIn(
            "python3 -m pip install -r tools/requirements.txt", result.stderr
        )
        self.assertNotIn("Traceback", result.stderr)

    def test_unversioned_module_is_rejected(self):
        result = self.run_without_site_packages("")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("found unknown", result.stderr)
        self.assertIn(
            "python3 -m pip install -r tools/requirements.txt", result.stderr
        )
