# Docs translation review protocol (docs.onetimesecret.com)

You are reviewing one locale's newly re-synced documentation pages. This is a
REVIEW, not a translation pass. Do not edit any file except your own report.

Each locale was re-synced in one commit on branch `i18n/latest-content`
(HEAD `d30489ac`). The English pages did not change in these commits; the
English page at HEAD is the source of truth for meaning and structure.

## Paths

- `$S` = <scratch>
- `$REPO` = the docs repo, read-only for you (the orchestrator fills in the path)
- `$APP` = the application repo, read-only (the orchestrator fills in the path)
- Report: `$REPO/docs/planning/i18n-review-2026-10-21/<LOCALE>.md` (the only file you write)

## Inputs

Read these, not the repo copies. Repo files carry an invisible U+E0101
provenance mark after almost every character; the copies below have the marks
stripped. Line numbers in the clean copies match the repo files.

- `$S/<LOCALE>/files.txt` — the pages in scope (17 or 18).
- `$S/en/<page>` — English source, clean.
- `$S/<LOCALE>/clean/<page>` — translation under review, clean.
- `$S/<LOCALE>/structure.md` — machine parity check (headings, code blocks,
  links, Markdoc tags, frontmatter keys, length ratio). Heading, code block, and
  link parity already pass everywhere unless listed. Confirm any listed item
  before reporting it. Length ratios for ja/ko/zh-cn are naturally 0.4–0.75.
- `$S/<LOCALE>/locale-tree.txt` — page slugs that exist in this locale.

Guidance, read once before reviewing:

1. `$S/guidance/brand-terms.md`, `secret-concept.md`, `password-passphrase.md`, `voice-and-tone.md`
2. `$REPO/src/content/docs/<LOCALE>/translations/glossary.md` and `_language-notes.md`
3. `$APP/generated/i18n/.resolved/<APP_LOCALE>.json` — app governance: register,
   bound glossary renderings, rules, declined decisions.
4. `$APP/locales/guides/SECURITY-TRANSLATION-GUIDE.md`
5. `$S/prior/glossary-<LOCALE>.md` — term decisions the translating agents made
   and conflicts they already flagged. Treat as context, not as authority.
6. `$S/prior/known-english-issues.md` — English problems already reported.

Product facts, consult as needed (grep, do not bulk-read):

- Shipped app UI strings: `$APP/locales/content/<APP_LOCALE>/*.json`, English
  keys in `$APP/locales/content/en/*.json`. When a page names a button, tab,
  field, status, or message, find the English string, take its key, and compare
  the shipped localized string with what the translation tells the reader to
  look for. A reader must be able to find the named control in the localized app.
- Application source cited in the English page's `sourceOfTruth` frontmatter, under `$APP`.
- Plan catalog: `$REPO/billing.yaml.txt` (parse with `python3 -c 'import yaml…'`,
  do not count by eye).

Context budget: one page at a time (English, then translation). Do not glob or
bulk-read directories. Do not read other locales.

## What to check

Per page, compare the translation against the English:

- **Accuracy**: meaning changed, softened, strengthened, or reversed. Security
  claims are highest priority: what is encrypted, what is stored, who can see a
  secret, when it is deleted, what a passphrase does, one-time view semantics.
- **Omission / addition**: sentences, list items, table rows, caveats, notes,
  or examples dropped or invented.
- **Product aberrations**: anything that makes the translated page wrong about
  Onetime Secret: plan names (Free, Identity Plus, Team Plus stay in English
  unless the glossary says otherwise), prices, limits, regions and hostnames
  (eu/us/ca/nz/uk), TTLs, DNS records, CLI flags, env var names, API paths, UI
  labels that do not match the shipped localized app, brand name "Onetime Secret"
  altered or translated.
- **Terminology**: inconsistency within the locale (same English term, several
  renderings across pages) and conflicts with the docs glossary or app governance.
  Key terms: secret, secret link, receipt, burn, reveal, passphrase, password,
  custom domain, branding, workspace/organization, region, self-hosting.
- **Register**: consistent with `_language-notes.md` and the app governance
  (formal/informal address, politeness level). Flag every break.
- **Fluency**: calques, literal English syntax, unnatural word order, wrong
  grammar or agreement, untranslated English left in prose (UI labels kept in
  English on purpose are fine when the shipped app has no localized string).
- **Typography and markup**: locale punctuation conventions (quotes, spacing
  before `:;!?` in French, CJK full-width punctuation), broken Markdown emphasis
  (CJK: `**` directly after CJK punctuation, closing `**` followed by a particle),
  broken links or anchors, `/en/` links whose target exists in `locale-tree.txt`,
  translated text inside code blocks other than comments, frontmatter
  `title`/`description` quality.
- **House rules**: no body H1; no notes about the page's own completeness
  ("see the English version", "translation pending"); no release version numbers
  added that the English does not have.

Also note English source or general problems you meet along the way: errors,
ambiguities, contradictions between pages, English text that conflicts with the
app, and issues that affect every locale (sidebar labels, shared components,
link targets). Check `known-english-issues.md` first: for an already-known
issue, add one line referencing it rather than re-describing it. Do not
investigate the English beyond what reviewing your locale requires.

## Severity

- **critical**: reader would be misled about security or product behaviour, or the page is broken (markup, frontmatter, links to nowhere).
- **major**: mistranslation, omission/addition, wrong or unfindable UI label, register break, plan/price/limit error.
- **minor**: fluency, style, typography, terminology inconsistency without meaning change.

Report only problems you can quote. No praise, no padding. If a page has no
findings, list it under "Clean pages".

## Report format

Write `$REPO/docs/planning/i18n-review-2026-10-21/<LOCALE>.md`:

```markdown
# <Language name> (<LOCALE>) translation review

- Commit: <sha> — <N> pages
- English base: HEAD d30489ac
- Register expected: <from language notes / governance>; observed: <consistent | breaks listed below>
- Findings: <n> critical, <n> major, <n> minor

## Verdict

<2–4 sentences: overall quality, the main pattern of problems, whether it can ship after the critical/major fixes.>

## Findings

### <page path>

| Sev | Category | Line | Translation (quote) | Issue | Suggested fix |
|---|---|---|---|---|---|
| major | accuracy | 42 | «…» | English says "…"; translation says … | «…» |

(one section per page with findings; quote exactly; keep the English quote short)

## Clean pages

- <page path>, …

## Terminology consistency

| English term | Renderings found (pages) | Expected (source) | Action |
|---|---|---|---|

## App UI label mismatches

| Page:line | Docs text | Shipped app string (key) | Note |
|---|---|---|---|

## English source and general issues

- [new] <page>:<line> — <issue, with English quote>
- [known] <one line referencing known-english-issues.md>

## Not checked

<anything you could not verify and why; omit the section if empty>
```

Use `|` escaping (`\|`) inside table cells when needed. Keep quotes short
enough to locate the text; the line number does the rest.

## Final message

When the report is written, reply with: the report path, the severity counts,
and the three most important findings in one line each. Nothing else.
