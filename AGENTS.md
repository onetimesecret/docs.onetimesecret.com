# Documentation agent workflow

Use pnpm and the version in package.json. Published docs live in
`src/content/docs/{locale}`; this site uses Astro, Starlight, Markdown and Markdoc.
Preserve unrelated work and review the final diff. New docs need frontmatter
(title, description, audience, pageType); begin the body at `##` because the
title provides H1. Use existing page templates under `docs/templates/`.

## Record AI agent prose edits with TextProv

This applies to ChatGPT/Codex, Claude CLI, and other agents. Before editing
published `.md` or `.mdoc` prose, read `docs/TEXTPROV.md`. Use the shared
`python3 tools/dogfood.py edit|create --state ai` commands, which preserve old
marks and mark only introduced/changed grapheme clusters. Do not mark entire
legacy paragraphs or infer the origin of existing text. Do not label copied
human text as AI: leave it unchanged or request a human contribution.

Frontmatter, code, inline code, link destinations, HTML syntax, Markdoc tags and
attributes, generated references, and source-code files are outside marking
scope. The tool enrolls edited pages with `textprov: true`. Never remove existing
marks, mark syntax, or strip a whole source file. Unicode variation selectors
also have real language uses: do not apply the decoder to arbitrary content.

Before completing an agent edit, run:

```sh
python3 tools/dogfood.py check --base HEAD
pnpm test
pnpm run check:frontmatter
pnpm run check:nav
pnpm build
```

Compare against the Git base from before your edits (use that SHA after making
commits). If human changes were already present, scope your authoring operations
to your own edits and use preservation-only checking for the combined diff;
do not retroactively label those changes. Report that validation boundary.
Human contributors may edit normally, preserving existing marks. CI checks mark
preservation and syntax; it cannot prove an edit's author or detect undeclared AI.
