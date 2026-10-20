# AGENTS.md

Repository guidance for coding agents working on the Onetime Secret documentation site.

## Project Overview

This is a multilingual documentation site built with Astro and Starlight. Published content lives in `src/content/docs/{lang}/`; internal authoring guides, templates, and plans live in `docs/`.

### Build System

- **Framework**: Astro 7.x with Starlight; see `package.json` for dependency versions.
- **Content**: Markdown (`.md`), Markdoc (`.mdoc`), and existing MDX (`.mdx`) content.
- **Components**: Astro, Vue, and React; integrations are registered in `config/integrations.mjs`.
- **Styling**: Tailwind CSS 4.x through `@tailwindcss/vite`, with CSS-first theme configuration.
- **Package manager**: pnpm; use the version declared in `package.json`.
- **Tests**: Vitest (`vitest.config.ts`).

### Configuration Structure

`astro.config.mjs` assembles the modular configuration in `config/`:

- `integrations.mjs` — Starlight, Markdoc, Vue, and React integrations.
- `starlight.mjs` — Theme, component overrides, custom CSS, and site metadata.
- `i18n.mjs` — Supported locales and default language.
- `sidebar.mjs` — Navigation structure and translated labels.
- `vite.mjs` — Tailwind integration and development/preview host allowlists.
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
pnpm dev                     # Start the development server on all interfaces
pnpm build                   # Build the production site into dist/
pnpm preview                 # Serve the built site locally
pnpm test                    # Run Vitest once
pnpm run check:nav           # Check sidebar targets and English label keys
pnpm run check:orphans       # Check pages missing from navigation
pnpm run check:frontmatter   # Check documentation frontmatter
pnpm run check:locales       # Check locale directories against configuration
pnpm run check:contrast      # Check colour contrast
pnpm run check:links:malformed # Check malformed source links
```

CI runs navigation, orphan, locale, and contrast checks, then tests and the production build. Run checks relevant to the change and report exactly what was executed; do not describe source inspection as a successful build or test run.

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

### Terms and Phrases to Avoid

Do not use these terms or sentence structures in authored prose:

- holds, claims, lands, carries
- "A isn't only B, but also C"

### Navigation and Moved Pages

- Update `config/sidebar.mjs` when adding pages intended for navigation.
- Add moved-page mappings to `config/redirects.mjs`; preserve old URLs and point directly at the final destination rather than another redirect.
- Use `config/nav-orphans.allow` only for intentional navigation exceptions, with a reason.

## Language Support

There are **17 configured locales**, with English (`en`) as the default:

- Bulgarian (`bg`), Danish (`da`), German (`de`), Spanish (`es`), French (`fr`).
- Italian (`it`), Japanese (`ja`), Korean (`ko`), Māori (`mi`), Dutch (`nl`).
- Polish (`pl`), Brazilian Portuguese (`pt-br`), Swedish (`sv`), Turkish (`tr`).
- Ukrainian (`uk`), Simplified Chinese (`zh-cn`).

English content is the source for translations. Translated trees can lag behind English; do not assume file-for-file parity or rewrite all locales for an English-only change. Keep locale work within the requested scope.

### Sidebar Translations

Add new English sidebar keys to `src/content/i18n/en.json` only unless translations are part of the task. `buildTranslations` in `config/sidebar.mjs` omits missing locale values so Starlight falls back to the English label. Translation work fills in the other bundles later; `check:locales` checks locale configuration, not translation-key parity.

Directory and bundle names use lowercase (`pt-br`, `zh-cn`), but sidebar translation overrides use Starlight's BCP-47 codes (`pt-BR`, `zh-CN`).

Some locale bundles retain unused sidebar keys: `sidebar.v1`, `sidebar.v2`, `sidebar.createSecrets`, `sidebar.retrieveSecrets`, and `sidebar.trust`. `sidebar.installationDeployment` remains in all 17 bundles. Do not remove these as incidental cleanup.

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
- Development and preview host allowlists accept comma-separated values from `VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` or `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`.
- Keep theme tokens in CSS `@theme` blocks rather than adding JavaScript theme configuration.
