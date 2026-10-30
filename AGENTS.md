# AGENTS.md

Repository guidance for coding agents working on the Onetime Secret documentation site.

## Project Overview

This is a multilingual documentation site built with Astro and Starlight. Published content lives in `src/content/docs/{lang}/`; internal authoring guides, templates, and plans live in `docs/`.

### Build System

- **Framework**: Astro 7.x with Starlight; see `package.json` for dependency versions.
- **Content**: Markdown (`.md`), Markdoc (`.mdoc`), and existing MDX (`.mdx`) content.
- **Components**: Astro and Vue; integrations are registered in `config/integrations.mjs`.
- **Styling**: Tailwind CSS 4.x through `@tailwindcss/vite`, with CSS-first theme configuration.
- **Package manager**: pnpm; use the version declared in `package.json`.
- **Tests**: Vitest (`vitest.config.ts`).

### Configuration Structure

`astro.config.mjs` assembles the modular configuration in `config/`:

- `integrations.mjs` — Starlight, Markdoc, and Vue integrations.
- `starlight.mjs` — Theme, component overrides, custom CSS, and site metadata.
- `i18n.mjs` — Supported locales and default language.
- `sidebar.mjs` — Navigation structure and translated labels.
- `vite.mjs` — Tailwind integration, the optional dev-only Spotnote plugin (MCP setup in its comment), and development/preview host allowlists.
- `redirects.mjs` — Legacy URL redirects and moved-page mappings.
- `domains.mjs` — Staging banner, watermark, and prerelease-build settings.

Other key files:

- `src/content.config.ts` — Documentation and i18n collection schemas.
- `markdoc.config.mjs` — Markdoc tags, attributes, and components.
- `src/styles/tailwind.css` — Tailwind imports and `@theme` tokens. Make theme changes here rather than in the legacy `tailwind.config.mjs`.
- `src/styles/theme-overrides.css` — Starlight theme overrides.
- `src/components/`, `src/layouts/`, `src/pages/` — Components, layouts, and custom routes.
- `src/assets/`, `src/fonts/`, `public/` — Assets, fonts, and static files.

## Development and Validation

Run commands from the repository root:

```bash
pnpm install                 # Install dependencies
python3 -m pip install -r tools/requirements.txt  # Install the pinned TextProv SDK (use a .venv; see docs/TEXTPROV.md)
pnpm dev                     # Start the development server on all interfaces
pnpm build                   # Build the production site into dist/
pnpm preview                 # Serve the built site locally
pnpm test                    # Run Vitest once
pnpm run check:nav           # Check sidebar targets and English label keys
pnpm run check:orphans       # Check pages missing from navigation
pnpm run check:frontmatter   # Check documentation frontmatter
pnpm run check:locales       # Check locale directories against configuration; warn on bundle key gaps
pnpm run check:contrast      # Check colour contrast
pnpm run check:types         # Type-check .ts sources (astro sync, then tsc)
pnpm run check:links:malformed # Check malformed source links
pnpm run check:textprov      # After a build: every enrolled page in dist/ has one marker and no raw selectors
pnpm run check:llms          # public/llms.txt links resolve to live EN pages; its Last updated stamp is recent and newer than every linked page
```

CI runs the navigation, orphan, locale, contrast, frontmatter, malformed-link, llms.txt, and type checks, then tests, the production build, and the published provenance check. Run checks relevant to the change and report exactly what was executed; do not describe source inspection as a successful build or test run.

`pnpm run check:links` requires **lychee** and builds the site before checking internal links. `pnpm run check:links:external` also checks external URLs. See [the link-checking guide](docs/LINK_CHECKING.md) for options.

## Content Authoring

### Page Types and Frontmatter

Start new pages from [the page templates](docs/templates/README.md), not from a blank file. Choose one purpose: concept/decision guide, how-to, reference, or architecture note.

- Set `title` and `description`, and fill in the template's `pageType` and `audience`.
- Use `sourceOfTruth` to identify application source supporting documented behaviour; omit it for pages that describe no application behaviour.
- Use `plan` only when applicable. The schema accepts `Free`, `Identity Plus`, and `Team Plus`.
- The custom fields are optional in the collection schema for legacy compatibility; that is not a reason to omit applicable metadata from new pages.
- Verify defaults, prices, limits, and entitlements against authoritative application sources. Do not infer them from old prose.

### Headings and Markdoc

Starlight renders the frontmatter `title` as the page H1. Never add a body-level `# Heading`; start body content at `##`. Some legacy pages still violate this rule.

Use standard Markdown in `.md` files and Markdoc syntax in `.mdoc` files. Custom tags in `markdoc.config.mjs` include:

- `card` — Requires `title`; accepts an optional `icon`.
- `cardgrid` — Groups cards; accepts an optional Boolean `stagger`.
- `globe` — Self-closing regional globe icon; requires `name`, with optional `size` and `label`.

### Screenshots

- Store screenshots in `src/assets/screenshots/{topic}/` with matching `-light` and `-dark` variants.
- Capture lossless PNG or WebP when the tool supports it. Crop surrounding whitespace without changing the UI or example content.
- Keep a `README.md` beside the assets recording the capture date, instance, application version (or explicitly unknown), viewport, crop, and regeneration steps. Never record usable secret links or passphrases.
- Use fictional example content, descriptive alt text, and captions. In Markdown pages, use `figure.screenshot` with `screenshot-light` / `screenshot-dark` wrappers alongside Starlight's theme visibility classes; the shared styles add borders, captions, and light images for printing.
- Keep raw HTML captions as plain text; Markdown formatting is not parsed inside `<figcaption>`.

### Terms and Phrases to Avoid

Do not use these terms or sentence structures in authored prose:

- holds, claims, lands, carries
- "A isn't only B, but also C"

### Navigation and Moved Pages

- Update `config/sidebar.mjs` when adding pages intended for navigation.
- Add moved-page mappings to `config/redirects.mjs`; preserve old URLs and point directly at the final destination rather than another redirect.
- A page linked with an absolute `/en/...` link from a sidebar-linked page in the same directory counts as reachable (for example, the version-specific upgrade guides listed on `self-hosting/upgrade-guides`). Add new release guides to that table rather than to the sidebar.
- Use `config/nav-orphans.allow` only for intentional navigation exceptions, with a reason.
- To keep a page off the live site until it is ready, set `draft: true` in its frontmatter; each locale's copy needs its own flag. Keep its sidebar link: production builds omit links to English draft pages, while `pnpm dev` and the `check:*` scripts still see them. Links to a draft from other pages 404 in production; `pnpm run check:links` reports them.

## Language Support

There are **17 configured locales**, with English (`en`) as the default:

- Bulgarian (`bg`), Danish (`da`), German (`de`), Spanish (`es`), French (`fr`).
- Italian (`it`), Japanese (`ja`), Korean (`ko`), Māori (`mi`), Dutch (`nl`).
- Polish (`pl`), Brazilian Portuguese (`pt-br`), Swedish (`sv`), Turkish (`tr`).
- Ukrainian (`uk`), Simplified Chinese (`zh-cn`).

English content is the source for translations. Translated trees can lag behind English; do not assume file-for-file parity or rewrite all locales for an English-only change. Keep locale work within the requested scope.

### Sidebar Translations

Add new English sidebar keys to `src/content/i18n/en.json` only unless translations are part of the task. `buildTranslations` in `config/sidebar.mjs` omits missing locale values so Starlight falls back to the English label. Translation work fills in the other bundles later; `check:locales` lists the gaps as warnings and does not fail on them. `check:nav` fails when two entries in one menu share a label in any locale.

Directory and bundle names use lowercase (`pt-br`, `zh-cn`), but sidebar translation overrides use Starlight's BCP-47 codes (`pt-BR`, `zh-CN`).

Some locale bundles retain unused sidebar keys: `sidebar.v1`, `sidebar.v2`, `sidebar.createSecrets`, `sidebar.retrieveSecrets`, and `sidebar.trust`. Do not remove these as incidental cleanup.

- The old `/{lang}/principles/trust` URLs redirect to `security/our-principles` with the `privacy-first` fragment.
- The old `/{lang}/self-hosting/installation` URLs redirect to `install/docker`.

### Adding a Language

1. Add the locale to `config/i18n.mjs`.
2. Create `src/content/i18n/{code}.json` and `src/content/docs/{code}/`.
3. Translate the required English content.
4. Update `config/sidebar.mjs` to load the bundle and include it in `localeTranslations`, using the appropriate BCP-47 code.
5. Run `pnpm run check:locales`, navigation checks, and `pnpm build`; inspect the result with `pnpm preview`.

`config/unconfigured-locales.allow` records intentional content directories outside the configured locale list. Entries require a reason; do not add one merely to silence a failed check.

## Translation Workflow

The Python 3 utility is `bin/translation-pluribus-util`. It prepares files in a temporary directory and prints a `file_mapping.json` path. It does not use a repository-local `translation_files/` directory.

**Restore overwrites the original file paths recorded during preparation.** For another language, first copy the selected English files into the target locale directory, then prepare that target directory. Do not prepare English files and expect restore to select a different locale.

The following is command syntax: replace every angle-bracket argument with an actual path before running it.

```text
pnpm run translate:prepare <target-locale-directory>
pnpm run translate:combine <printed-mapping-file> [combined-output-file]
pnpm run translate:split <printed-mapping-file> [translated-combined-file]
pnpm run translate:restore <printed-mapping-file>
```

- Reuse the exact mapping path printed by `prepare` for every subsequent step.
- If the optional combined-file argument is omitted, `combine` and `split` use `combined.txt` beside the mapping file.
- Preserve unique file IDs and delimiters during translation. Check split counts and warnings before restoring; review the restored diff.
- Use `python3 bin/translation-pluribus-util --help` for the complete CLI syntax.

## Development Notes

- Resolve filesystem paths relative to the configuration module, using absolute paths where needed for cross-platform compatibility.
- `SITE_URL` overrides the canonical site URL for builds; the
 default is `https://docs.onetimesecret.com`.
- `SHOW_TEXTPROV_TOGGLE=false` hides the TextProv reader toggle at build time; enrolled pages are still decoded. It is shown when unset.
- Development and preview host allowlists accept comma-separated values from `VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` or `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`.
- Keep theme tokens in CSS `@theme` blocks rather than adding JavaScript theme configuration.

## Record AI agent prose edits with TextProv

This applies to ChatGPT/Codex, Claude CLI, and other agents. Before editing
published `.md` or `.mdoc` prose, read `docs/TEXTPROV.md`. Use the shared
`python3 tools/dogfood.py edit|create --state ai` commands, which preserve old
marks and mark only introduced/changed grapheme clusters. Do not mark entire
legacy paragraphs or infer the origin of existing text. Do not label copied
human text as AI: leave it unchanged or request a human contribution.

The authoring tools import the `textprov` package pinned in
`tools/requirements.txt`; `dogfood.py` exits with the install command when the
package is missing or at another version. The npm `textprov` package pinned in
`package.json` decodes enrolled pages at build time. No SDK copies live in this
repository.

Frontmatter, code, inline code, link destinations, HTML syntax, Markdoc tags and
attributes, aside fences (`:::note`), generated references, and source-code
files are outside marking scope. The tool enrolls edited pages with `textprov: true`. Never remove existing
marks, mark syntax, or strip a whole source file. Unicode variation selectors
also have real language uses: do not apply the decoder to arbitrary content.

Before completing an agent edit, run:

```sh
python3 tools/dogfood.py check --base HEAD
python3 -m unittest discover -s tools/tests
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
