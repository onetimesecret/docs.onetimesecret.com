"""The optional reveal stylesheet distributed with the package."""

from importlib.resources import files


def stylesheet():
    """Return the shared gradient-mist and dotted-underline CSS as UTF-8 text."""
    return files(__package__).joinpath("textprov.css").read_text(encoding="utf-8")
