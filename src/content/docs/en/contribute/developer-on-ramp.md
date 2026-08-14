---
title: Developer on-ramp
description: Where the code lives, how to run the documentation site locally, and the checks a change has to pass before it can be merged.
audience: contributor
pageType: how-to
---

Onetime Secret is open source, and contributions arrive in two different
repositories with two different setups. Start by working out which one your change
belongs to.

| You want to change… | Repository |
|---|---|
| The product itself — the app, the API, the CLI | [`onetimesecret/onetimesecret`](https://github.com/onetimesecret/onetimesecret) |
| These documentation pages, or the site that renders them | [`onetimesecret/docs.onetimesecret.com`](https://github.com/onetimesecret/docs.onetimesecret.com) |

Translations are a third path with its own workflow — see
[How translations work](/en/translations).

## The documentation site

The site is [Astro](https://astro.build) with
[Starlight](https://starlight.astro.build), and the package manager is `pnpm`.

```bash
git clone https://github.com/onetimesecret/docs.onetimesecret.com.git
cd docs.onetimesecret.com
pnpm install
pnpm dev
```

That serves the site at `http://localhost:4321`. Pages live under
`src/content/docs/<locale>/`, and English is the source language — every other
locale falls back to it, so an English page is never blocked on a translation.

### Start from a template, not a blank file

Every page on this site is one of four types — concept, how-to, reference, or
architecture note — and the type decides what the page is for. Mixing two into one
page is the most common way a docs change goes wrong. The templates and the
guidance for choosing between them are in `docs/templates/` in the repository.

### Checks a change has to pass

Run these before opening a pull request. Each one exists because something failed
silently without it:

```bash
pnpm test              # unit tests
pnpm build             # the real check — a broken page fails the build
pnpm check:nav         # every sidebar link resolves to a page
pnpm check:orphans     # every page is reachable from the sidebar
pnpm check:frontmatter # titles, descriptions, and the anchors redirects depend on
pnpm check:locales     # locale directories and the language picker agree
```

Two of those are worth understanding rather than just running. `check:orphans`
fails on a new page that no sidebar entry links to — publishing a page nobody can
navigate to is the failure mode it exists to prevent, so adding a page means
editing `config/sidebar.mjs` in the same change. `check:frontmatter` asserts that
the headings inbound redirects point at still exist, which is what keeps an old
URL landing on the right section of a merged page rather than at the top of it.

Link checking runs separately, against a built site, with `pnpm check:links`.

### Moving or removing a page

A published URL is a promise. If your change renames, moves or merges a page, add
the old path to the `movedPages` table in `config/redirects.mjs` rather than
letting it 404. The redirect table is asserted too — it rejects a redirect that
points at another redirect, and it rejects a redirect whose source is still a live
page.

## The application

The application repository is
[`onetimesecret/onetimesecret`](https://github.com/onetimesecret/onetimesecret).
Its README is the current starting point for local setup; a fuller on-ramp
covering the development scripts, the test lanes and the architecture decision
records is in progress and will land here.

If you are self-hosting rather than contributing, you want
[Self-hosting](/en/self-hosting) instead.

## Reporting something instead

Not every contribution is a pull request:

- **A security issue** — do not open a public issue. Follow
  [Vulnerability disclosure](/en/security/vulnerability-disclosure).
- **A documentation error** — open an issue on the docs repository, or use the
  feedback form below. Saying which page and what is wrong is enough; you do not
  have to propose the fix.

## Related

- [How translations work](/en/translations) — the translation contribution path.
- [Style guide](/en/translations/guide) — the writing conventions these pages follow.
- [Vulnerability disclosure](/en/security/vulnerability-disclosure) — the path for security reports.

## Questions or Need Support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
