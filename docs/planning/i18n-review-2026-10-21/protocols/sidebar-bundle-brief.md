# Sidebar bundle translation brief

Repo: `$REPO` (Astro/Starlight docs for Onetime Secret). `$APP` is the application repo, read-only; the orchestrator fills in the path for both.
Each locale's UI/sidebar bundle is `src/content/i18n/<locale>.json`. Missing keys fall back to English, so the
sidebar currently shows English for the labels listed in your todo file.

## Your task
Translate every entry in `<scratch>/<locale>.todo.json` (fields: key, en, context, optional existing_page_title)
into your locale. Write ONLY the file `<scratch>/<locale>.json`: a flat JSON object `{"<key>": "<translation>", ...}`
with exactly the keys from the todo file. Do not edit any file in the repo. Do not commit.

## Sources to consult before translating (in this order of authority)
1. The shipped app strings for product terms: `$APP/locales/content/<app_locale>/*.json`
   (grep for the English term in the `en` folder next to it to find the key, then read your locale's value).
   Product terms to align: secret, passphrase, receipt, recipient, custom domain, organization, member, role, owner,
   plan, subscription, billing, region, dashboard, preferences, sign in, two-factor, passkey, session, identity, secret activity / audit trail.
2. The existing bundle `src/content/i18n/<locale>.json`: match its register (formal/informal address), capitalisation and existing terms
   (for example whatever it already uses for `sidebar.customDomains`, `sidebar.selfHosting`, `sidebar.securityTrust`, `sidebar.translations`).
3. The locale's docs glossary and notes: `src/content/docs/<locale>/translations/glossary.md`, `_language-notes.md`,
   and the terminology table in `docs/planning/i18n-review-2026-10-21/<locale>.md` (decisions made this week take precedence over older glossary rows).
4. Titles of translated pages in `src/content/docs/<locale>/` (grep `^title:`). When a sidebar link points at a page that exists in your locale,
   the label should read naturally next to that page title but may be shorter (the English sidebar label is often shorter than the page title).
   Ignore the invisible U+E0101 characters in those files.

## Rules
- These are navigation labels: short, noun-phrase style, no trailing period, capitalisation per your language's UI norms (match the existing bundle).
- Keep untranslated: Onetime Secret, SSO, DNS, TLS, Docker, Linux, API, SDK, REST, TextProv. In `sidebar.translatingSecret` the quoted word “Secret” is the
  English term being discussed on that page; keep it in English inside the quotes your language uses.
- `sidebar.hostingChoice` ("Self-hosting vs. hosted") contrasts running your own instance with using onetimesecret.com.
- `sidebar.authModeChoice` ("Simple or full mode") is about two sign-in configurations for self-hosters: simple (no accounts) vs full.
- `sidebar.secretActivity` is the organization audit trail feature; use the app's term if it has one.
- `sidebar.yourReceipt` is the page the sender sees after creating a secret (the app calls it a receipt; use the app's word).
- `sidebar.developerOnRamp` means an onboarding guide for contributors.
- `textprov.help` is one or two short sentences.
- Do not invent product features; when unsure between two terms, prefer the one the shipped app uses and say so in your final report.

## Final report
Reply with: the path you wrote, the number of keys, and a short list of any term choices worth a human look
(for example where the app and the docs glossary disagree). Nothing else.
