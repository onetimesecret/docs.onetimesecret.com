---
title: "Phase 3 deleted-file index"
description: "Every file removed by the Phase 3 installation split, with its redirect target and recovery pointer."
---

# Phase 3 deleted-file index

The Phase 3 install-group commit on `claude/phase-3-install-group`
(*docs: split self-hosting/installation into the install/ group*) deleted 8
content files — one page family, in every locale that carried it. **No content
is lost** — every file is intact in git history at `863a4e8`, the last commit
before this branch's work. This index exists so nobody has to reconstruct what
was removed, or why, from the diff.

`self-hosting/installation` was a 481-line page doing six jobs at once. It was
not moved and it was not merged: it was **split** into six pages, and the old
page was retired rather than reduced. Its six successors are
[`install/images-and-variants`](/en/install/images-and-variants/),
[`install/docker`](/en/install/docker/),
[`install/linux`](/en/install/linux/),
[`install/run-as-a-service`](/en/install/run-as-a-service/),
[`install/reverse-proxy-and-tls`](/en/install/reverse-proxy-and-tls/) and
[`install/verify`](/en/install/verify/). The prose was not carried across
wholesale — a research pass found 27 defects in the retired page, several of
which made the documented path fail outright, so the successors were written
from a verified ledger and the old text mined only where the ledger confirmed
it.

## Why these files were deleted rather than moved

Phase 2 distinguished **moves** from **merges**. This is the third shape, and
the first two reasons carry over unchanged:

1. *In place*: a real file at `src/content/docs/uk/self-hosting/installation.md`
   would collide with the generated
   `/uk/self-hosting/installation` → `/uk/install/docker` redirect. Note that
   **nothing enforces this** — `config/redirects.mjs` exports
   `assertNoDuplicateSources` and `assertNoChainedRedirects` and neither one
   compares redirect sources against the page tree, and no `bin/check-*.mjs`
   does either. `pnpm build` is the only thing that would notice. Keeping a
   redirect source and a page at the same path is a manual-discipline
   invariant, not a checked one.
2. *Relocated to the merge target*: a stale translation sitting at the new URL
   would show outdated content under a current title.
3. *Relocated to one split target*: a 481-line page that did six jobs has no
   single successor. The translation would sit under a title it no longer
   matches — `install/docker` would carry a translated nginx, Certbot and
   Valkey walkthrough. This is the "translated-but-wrong" outcome Phase 2
   rejected, arriving by a different route.

Deleting them means those routes fall back to the current English page
(Starlight `defaultLocale` fallback), which is correct-but-untranslated rather
than translated-but-wrong.

## What this costs in translation

**2,205 translated lines are deleted, and no re-translation ticket exists for
them.** The loss is not uniform: five near-complete translations of 420-421
lines each (`mi`, `sv`, `tr`, `uk`, `zh-cn`) and two pointer stubs. `da` (65
lines) tells the reader to see the English version of the page and links
`/en/self-hosting/installation` — itself now a redirect. `pt-br` (36 lines)
points instead at the GitHub README and `blob/main/docs/`, and links the
locale's own `/pt-br/self-hosting/getting-started`. Neither carried translated
instructions. The five real translations are the loss; the two stubs are
loss-free.

The six successor pages are English-only. File the re-translation follow-up
rather than relying on this index being noticed.

## Recovering a deleted file

```bash
# Print any deleted file exactly as it was:
git show 863a4e8:src/content/docs/uk/self-hosting/installation.md

# Restore one into the working tree (e.g. to mine for a re-translation):
git checkout 863a4e8 -- src/content/docs/uk/self-hosting/installation.md

# Full history of a deleted file:
git log --follow --oneline -- src/content/docs/uk/self-hosting/installation.md
```

## Deleted families

| Source page (per locale) | Copies | Merged into |
|---|---|---|
| `self-hosting/installation` | 8 | `install/docker` (split; see note) |

8-copy family: EN plus the seven locales that carried a translation (`da`,
`mi`, `pt-br`, `sv`, `tr`, `uk`, `zh-cn`). The other nine configured locales
were already served by the EN fallback for this page.

"Merged into" names the **redirect** target, not the whole successor set. A
`movedPages` row fans one `from` to one `to` — `assertNoDuplicateSources`
forbids a second row for the same slug, and `fragment` only appends an anchor
to the same target — so a 1:6 split has to pick one successor.
`install/docker` is it: the retired page led with Docker, and its five siblings
sit adjacent to it in the same sidebar group. `self-hosting` was rejected as
the target because all sixteen non-EN `self-hosting/index.md` files still carry
relative `./installation` links: from there that resolves to
`/{locale}/self-hosting/installation`, which is a redirect key itself and sends
the reader on to `/{locale}/install/docker/` — a three-hop detour to the same
destination.

## Full index

One line per deleted file: `path → redirect target`, with the line count lost.

```
src/content/docs/da/self-hosting/installation.md -> install/docker (65 lines)
src/content/docs/en/self-hosting/installation.md -> install/docker (481 lines)
src/content/docs/mi/self-hosting/installation.md -> install/docker (421 lines)
src/content/docs/pt-br/self-hosting/installation.md -> install/docker (36 lines)
src/content/docs/sv/self-hosting/installation.md -> install/docker (420 lines)
src/content/docs/tr/self-hosting/installation.md -> install/docker (421 lines)
src/content/docs/uk/self-hosting/installation.md -> install/docker (421 lines)
src/content/docs/zh-cn/self-hosting/installation.md -> install/docker (421 lines)
```

Total: 8 files, 2,686 lines, of which 2,205 are translation.
