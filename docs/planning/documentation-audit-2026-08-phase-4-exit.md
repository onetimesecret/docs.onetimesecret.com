# Phase 4 integration and exit record

**Status:** P0 through P9 implemented and integrated. **Phase 4 is not complete.** Section 7's exit conditions are not all met; the open items are in section 6 below.
**Prepared:** 2026-10-29.
**Docs baseline:** `bd7c212538b21c0bfb4d9305398476b060ed399e` (`develop` at the start of implementation).
**Application baseline:** v0.26.19, `e98a88c9b5832bbae249f38885aa28bd78a5db4d`, tagged 2026-10-24.
**Integration branch:** `docs/phase4-integration`.

The plan is [the Phase 4 implementation plan](./documentation-audit-2026-08-phase-4-plan.md). Supporting records are [the evidence inventory](./documentation-audit-2026-08-phase-4-evidence.md), [the Configure readiness record](./documentation-audit-2026-08-phase-4-configure-readiness.md) and [the configuration retirement inventory](./documentation-audit-2026-08-phase-4-configuration-retirement.md).

## 1. Application baseline selection

v0.26.19 was selected as the latest tagged release. `main` carried unreleased changes at `f42fdedc` and is not a release boundary, which is the error the retired drift workflow made by comparing against it. Every semantic input belongs to that one revision.

The local application checkout sat on an unrelated branch (`fix/billing-ui`, `f7794a98`) throughout. Four Configure pages cited that commit in `sourceOfTruth` before this phase; one still does and is listed in section 6. Nothing in this phase reads that checkout at build time: all inputs are vendored under `vendor/onetimesecret/` and hashed in its manifest.

## 2. Destination publication status

All 27 destinations exist. Thirteen publish. Fourteen carry `draft: true` because the plan's completion evidence for them requires operational checks this environment could not perform.

| Group | Destinations | Live | Draft |
| --- | --- | --- | --- |
| Reference | 12 | 12 | 0 |
| Operate | 12 | 1 | 11 |
| Troubleshoot and upgrade | 3 | 0 | 3 |

Live: the whole Reference tree, plus `operate/ownership-transfer`. That one publishes because its procedure moved out of `self-hosting/index`, and both that page and the end-user ownership page link it; a link to a draft page returns 404 in production.

Draft: the other eleven Operate pages, both diagnosis pages and `upgrades/data-migrations`. Their sidebar links stay in place. Production builds prune links to English draft pages while the navigation checks still see the pages, so each one needs only its frontmatter flag removed once its evidence exists.

## 3. Reference generation

One docs-owned pipeline, pinned inputs, offline output.

| Artifact | Count |
| --- | --- |
| Vendored inputs | 5 |
| Environment variables published | 445 |
| Environment assignments excluded | 17 |
| Environment assignments unresolved | 0 |
| Configuration keys extracted | 677 |
| Configuration key records published | 533 |
| Configuration keys with no owner | 0 |
| CLI command records | 188 |
| Scheduled job records | 17 |
| Health endpoint records | 9 |

Coverage sums are asserted rather than hard-coded. The environment parser throws when published plus excluded plus unresolved plus prose mentions plus malformed does not equal the recognized-line count, and the configuration renderer throws when any key has no owning page.

`pnpm run reference:generate` writes eight artifacts. `pnpm run reference:check` regenerates to memory, compares byte for byte and verifies every input hash. Both run offline with no application checkout. CI and the deploy workflow run the check before building.

Labelling decisions worth preserving:

- An example line is never renamed a default. The environment reference shows the raw source line including its leading comment marker, so the active and commented distinction is carried by source text rather than renderer prose.
- Declared defaults come only from a literal `Default:` statement, or a `(default)` marker whose value matches the variable's own example. Five ambiguous cases became diagnostics and carry no default.
- Five configuration expressions are classified as determined at run time and show their source verbatim.
- Two structural conditional blocks are named rather than flattened. `site.session.secure` has three branches and no unconditional default; the workspace Feedback footer link is conditional on a variable.
- Unset, empty string, null, empty mapping, empty sequence and absent are distinct states on both reference families.

## 4. Routes, retirement and compatibility

| Retired family | Destination | Locale copies deleted |
| --- | --- | --- |
| `self-hosting/environment-variables` | `reference/environment-variables` | 8 |
| `self-hosting/configuration` | `reference/configuration-files-and-precedence` | 8 |
| `self-hosting/configuration-generator` | `reference/generator` | 0, an English-only route |

All 25 section fragments the environment page published are preserved on its replacement and pinned by a test, so an old deep link resolves after the hop. The one intentional loss is the development-only section, whose variables the plan excludes from a supported reference.

A static Astro redirect emits a fixed URL and cannot forward a query string or a fragment. The English generator route is therefore a client-side forwarder with a noscript fallback and its own tests, and only the other sixteen locales redirect. The `#apply-configuration` fragment survives by trimming its heading.

Per-variable anchors are the variable name lowercased with underscores preserved. Configuration record anchors drop the dots and colons from the key path. This stack supports no custom heading identifier syntax, so record identifiers and page fragments are deliberately different strings and `bin/reference/ids.mjs` records why.

The ten release guides and their URLs are untouched, and the upgrade index still lists all ten.

## 5. Executed validation

Run on the integrated tree from the repository root.

| Check | Result |
| --- | --- |
| `pnpm run reference:check` | OK, two unassigned-owner warnings |
| `pnpm test` | 547 tests, 26 files |
| `pnpm run check:frontmatter` | OK, 119 English pages, 63 gated |
| `pnpm run check:nav` | OK, 100 links, 16 groups |
| `pnpm run check:orphans` | OK, 0 orphans, 0 allowlisted |
| `pnpm run check:locales` | OK, 16 bundles missing keys as warnings |
| `pnpm run check:contrast` | OK |
| `pnpm run check:links:malformed` | OK |
| `pnpm run check:types` | OK |
| `pnpm build` | 1,596 pages |
| `pnpm run check:textprov` | OK, 1,206 enrolled pages |
| `./bin/check-links.sh --skip-build` | 181,542 OK, 0 errors |
| `python3 -m unittest discover -s tools/tests` | 66 tests |
| `tools/dogfood.py check --preserve-only --base <phase base>` | 58 files, 0 failed |

The built output was inspected directly for the redirect stubs, the preserved fragments, the hydrated generator island with its search and navigation metadata, and the pruning of draft Operate pages from production.

Both baseline blockers the plan recorded are resolved. The type check excludes `tmp/` and `vendor/`; all 22 prior errors were in an ignored research checkout. The built-link wrapper passes its arguments as an array, so the root directory no longer arrives with literal quote characters.

### Validation boundaries

- **No runtime evidence of any kind.** No application code was executed, no endpoint was called, no command was run, no browser was driven. Every operator procedure in this phase is source-reviewed. The plan's operational evidence contract is unsatisfied for every Operate and troubleshooting page, which is why fourteen of them are draft.
- **Strict provenance checking fails on one file.** `reference/generator.mdoc` carries prose verbatim out of the retired Astro route, which never sat inside the marking contract. Labelling copied human text as AI is forbidden, so only the one newly authored sentence is marked. The combined diff is validated with preservation-only checking, which is what the repository guidance prescribes for a diff containing pre-existing unmarked human text, and what CI enforces.
- **`pnpm run check:links` with external URLs was not run.** The offline built-link check was.
- The generator's schema artifacts were not regenerated, because that requires executing application code. Every input to the two vendored JSON schemas is byte-identical between the previous release and this one, which is what justifies the page stating this release while the schema readme keeps recording where the artifacts came from.

## 6. Open items before Phase 4 can be called complete

| ID | Item | Why it blocks |
| --- | --- | --- |
| X1 | `refreshOwner` and `backupReviewer` in `vendor/onetimesecret/manifest.json` are `unassigned`. | Plan A6 makes a named owner and backup reviewer an exit condition. `reference:check` warns about it. The detection is wired and the response is not. This needs a decision, not more work. |
| X2 | Fourteen destinations are draft pending operational evidence. | Plan section 7's first condition. The highest-value missing checks are an isolated restore rehearsal verified against pre-change encrypted fixtures, a synthetic dead-letter replay, a log redaction test, and the admin access matrix tested for denial as well as success. |
| X3 | Twelve Configure files remain draft: the index, secret-options, the SSO index and nine provider recipes. | Plan section 7's second condition. No Phase 4 page depends on them; operator pages link the published `organizations/sso` instead. |
| X4 | `configure/secret-options.md` cites an unrelated application commit in `sourceOfTruth`. | Carried over from before this phase. It is one of the twelve files left draft, so nothing publishes with that citation, but it should be re-anchored when the page is reviewed. |
| X5 | Consolidation ledger dispositions are recorded but not all executed. | Plan A7 and section 7's third condition. Executed: the ownership-transfer move, both reference retirements, and the inventory delegation from every Operate page to a Reference page. Outstanding: the advanced self-hosted security section of `security/best-practices`, which is operator content on an end-user page and has drifted. The proposal is to reduce it to a short pointer at `operate/harden-your-deployment` and keep only the product-specific note. |
| X6 | `install/verify` asserts that a diagnostic command does not exist, which the pinned CLI records contradict. | A factual conflict between a published page and this phase's records. Needs a check by whoever owns that page. |
| X7 | 81 of 188 CLI records carry an unverified partial-failure behaviour. | The Operate runbooks need that column. It is the largest remaining research gap and the obvious follow-up for the slices that publish those procedures. |

## 7. Findings for the application repository

Recorded here rather than acted on, because they are upstream of this repository.

- `jobs.scheduler.enabled` and `jobs.fallback_to_sync` have no reader in the application at this release, yet the application's own Docker readme and full Compose file still instruct operators to set the first one.
- `apps/web/auth/migrations/README.md` documents a `SKIP_AUTH_MIGRATIONS` switch that does not exist in code.
- `CONFIG_MIGRATE` appears nowhere at this release, in code, configuration or the environment reference, despite being named in older documentation research.
- `jobs.dlq_monitor_enabled` and `jobs.heartbeat_enabled` have no entry in the shipped defaults, so their effective default is a code behaviour rather than a documented one.
- `queue dlq replay` declares no confirmation and no preview, while its sibling verbs both gate. The underlying operation supports a dry run the command does not expose.
- A placeholder datastore password surfaces as an unrelated "Redis URI not configured" error.
- The simple Compose file pins a default image tag that trails the current release.
- A comment in the environment reference states a count of destructive administrative routes that is one short of the registered set.

## 8. Tooling defects found while implementing

- `dogfood.py edit` and `dogfood.py check` disagree on a wholesale paragraph replacement. The edit command's intra-paragraph character diff reuses character identity across a rewrite, leaving genuinely new prose unmarked, while the check command's base diff finds coincidental alignment and reports both unmarked new prose and marked unchanged legacy text. Reproducible against `--base HEAD`, so it is not the cumulative-base issue. The workaround is to decompose a consolidation move into a deletion plus small anchored edits. This will affect every author doing a consolidation move and deserves a fix or a documented recipe.
- A worktree-local `.venv` symlink was committed, because `.gitignore` carried only the directory spelling. Merging it materialised a symlink pointing at itself and destroyed the shared environment for every worktree. Both spellings are now ignored.
- Text written by an agent's file-writing tool arrives carrying variation selectors, which the authoring command correctly refuses. Authors must strip marks before creating a page from such a file.
- A `sourceOfTruth` value containing a colon followed by a space breaks the frontmatter parse and must be quoted.

## 9. Phase 5 follow-ups

Concrete, not a promise to prevent drift later.

1. Assign X1, then make the freshness workflow's finding actionable. It reports a changed input and names the refresh runbook, but nobody is on the hook for it.
2. Close the operational evidence gaps in X2 against an isolated deployment, and publish the fourteen draft pages as each closes.
3. Resolve the Configure SSO closure in X3 as one unit, since the index depends on all nine recipes.
4. Fix or document the authoring tool defect in section 8 before the next consolidation pass.
5. File the application findings in section 7 upstream.
