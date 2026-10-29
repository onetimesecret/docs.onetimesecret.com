# Phase 3 research recovery disposition

Recovered on 2026-10-29 from `docs/phase3-contd@8e83efa2` onto
`docs/phase3-research-recovery`, starting at `fe1f61664d305ac9b49ab1f0908aebb197ad18ff`.
Application research remains pinned to `4cbd421` (`4cbd42149` in the source).
This is a historical record, not fresh application verification or a publication plan.

## Recovered and reconciled

- **Features:** recovered the missing ledger, including §N Secret Activity,
  §O link-domain selection and §P migration research. Preserved row IDs,
  evidence, gaps, hazards and operator-supplied catalog verdicts.
- **Configure:** recovered evidence corrections and expansions for auth routing,
  anti-abuse, secrets, email failures/retries, API-version bounds, session handling
  and application/proxy header emitters. Preserved base §I's docs-drift inventory
  rather than importing a stale line-number refresh; neither inventory is current.
- **Install:** recovered production auth-secret requirements, Compose interpolation
  pitfalls, persistence/example-config qualifications and locked-gem citations.
- **Preparation:** reconciled reciprocal-aside adjacency (not one-to-one pairing),
  the historical 25-page scope, the regions rename, the dropped Caddy page and
  the ownership CLI flag correction. Earlier launch-state sections remain history.

## Finalization findings

All eight findings are material: without these boundaries the recovered research
could be mistaken for current guidance. “Addressed” refers to recovery safety,
not to re-testing the application behavior described by the old rows.

| ID | Finding / reader consequence | Disposition and evidence | Verification |
| --- | --- | --- | --- |
| R1 | Old pins and docs-drift notes could reopen implemented work. | Addressed: all four documents start with a recovery boundary; Configure §I is preserved and explicitly historical. No published content or implementation is changed. | Source/base diff and final scope review. |
| R2 | Configure M5/M8/M9/M16/B39 describe signup/signin switches as UI-only in full mode. | Addressed: marked superseded at §M and in the rows. Current [authentication guidance](../../src/content/docs/en/configure/authentication.md) cites `signup_enabled.rb` and `signin_enabled.rb` for server-side password/email-link gates; SSO remains separate. | Current page and `sourceOfTruth` inspected; no new app-runtime claim. |
| R3 | Old session rows omit next-request revocation; F20 overstates rake re-run invalidation. | Addressed: §F names revocation separately and F20 requires a changed effective key. Current [Sessions and identities](../../src/content/docs/en/account/sessions-and-identities.md) cites `active_session_gate.rb` and the base session-auth strategy; [operator session guidance](../../src/content/docs/en/configure/sessions-and-cookies.md) distinguishes rolling and absolute bounds. | Current pages inspected; F20 cross-read with deterministic derivation in A6/A7. |
| R4 | “CLI only / no REST endpoint” and the prompt/`--yes` workflow are outdated. | Addressed: Install §H, rows 134/135/139 and prep §4.4 flag supersession. Current [Self-hosting](../../src/content/docs/en/self-hosting/index.md) documents the Colonel transfer API, organization-name confirmation and no API dry run; its v0.26.19 CLI guidance uses preview-and-exit, then `--apply`. [Ownership and transfer](../../src/content/docs/en/organizations/ownership-and-transfer.md) already describes operator API assistance. | Current pages and their source citations inspected; no transfer executed. |
| R5 | Four providers/no SAML and a flat SSO page would replace a newer subtree. | Addressed: Configure §C is historical. Current [SSO index](../../src/content/docs/en/configure/sso/index.md) has nine OIDC provider guides and source citations for the provider registry and native SAML. Existing draft flags are unchanged. | Tracked provider subtree and index inspected. |
| R6 | Features §P says v0.26 has no upgrade page and proposes a new general page. | Addressed: §P and P42 are historical. Preserve the [upgrade-guide index](../../src/content/docs/en/self-hosting/upgrade-guides.md), [v0.26 guide](../../src/content/docs/en/self-hosting/upgrading-v0-26.md) and newer release guides through [v0.26.19](../../src/content/docs/en/self-hosting/upgrading-v0-26-19.md). | Current tracked page inventory and guide index inspected. |
| R7 | An operator catalog could be promoted into general billing truth. | Addressed: its recorded digest and key-path citations remain historical and `operator-supplied`; prep's unblock is limited to that research. No catalog, price, tier or entitlement is newly verified. | Features citation convention and prep §§2/4.4/5/6 cross-read. |
| R8 | Install row 142 could imply `nosniff` is absent whenever the Rack toggle is off. | Addressed: qualified the row using recovered Configure G14/G26/G28, which record Otto’s independent per-route header emitter at the same historical pin. | Cross-ledger consistency review; no live header capture asserted. |

## Deferred work and validation boundary

Current-app re-verification of individual ledger rows, runtime/browser tests,
live header captures, catalog validation and fresh hosted billing assertions are
outside this extraction. Historical open questions remain research questions,
not newly confirmed defects. Published-page enrichment, navigation/checker changes,
SSO rewrites and upgrade instructions are not recovered by this commit.

Validation is recorded in the recovery handoff with exact commands and results.
Local-link validation covers Markdown file/directory and fragment links in all
five changed planning documents, not app-relative backtick citations. Inherited
external references (#405 and #3993) are historical and not newly verified;
no new external URL is introduced. No deployment, migration, credentialed example
or ownership-transfer command is executed.

## Validation results

- `git diff --check` and `git diff --cached --check`: passed on the final staged recovery.
- Shared `.venv` Python: `tools/dogfood.py check --base fe1f61664d305ac9b49ab1f0908aebb197ad18ff`
  passed (0 eligible published files); `-m unittest discover -s tools/tests` passed (66 tests).
- `pnpm run check:frontmatter` and `pnpm run check:nav`: passed.
- Local Markdown AST links/fragments: 34 passed across all five changed files.
- **Earlier location failures (resolved):** under the nested `.git` worktree,
  `pnpm test --cache=false` passed 266 tests but could not load two jsdom suites.
  A Vitest API run with a process-local filesystem-deny adjustment and local caches
  passed all 287 tests / 16 suites. The Astro API production build failed at
  prerender resolving Satteri's native binding from the generated bundle;
  process-local externalization and resolution-hook retries also failed.
- **V1 — resolved by moving the worktree:** the worktree is now at
  `/Users/d/Projects/ops/sites/docs.onetimesecret.com/tmp/phase3-recovery/research`,
  outside `.git`. The earlier test/build failures were location issues; no
  dependency or build-configuration fix was required.
- **Latest normal validation:** the maintainer reports that `pnpm test && pnpm build`
  passed in the moved worktree with no overrides, producing **1,324 pages**.
  The agent then reran normal `pnpm test` there: **287 tests / 16 suites passed**.
  The build was not rerun during this planning-record follow-up; its passing result
  is maintainer-reported, not a new agent build run.
