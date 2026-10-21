# Self-hosted configuration and SSO documentation

## Scope and evidence

Started from freshly pulled `develop` at `6f55cc3314e74256601895f7a45c4bad603660d3`
on 2026-10-21, in `wip/self-hosted-sso-docs`. The branch incorporates that
commit; the old `docs/phase3-contd` commits are not merged wholesale.

During validation, develop advanced. Fetched and fast-forward merged the latest
`origin/develop` at `15c75c84d7cb3ed55039fb6aebd1ab72b8779126`, including the
content review and configuration-generator updates. Reconciled four overlapping
pages by retaining upstream content and reapplying only the operator links.
The final validation baseline is this newer SHA, not the initial checkout.

Application evidence: fetched `onetimesecret/onetimesecret` `origin/main` at
`5da18791caab8a4cfab4650f613c1804172a6907`. The inspected local application
checkout is `145c1e7cfa693a7b0a55e4a2efc508739d894da0`; the SSO provider,
authentication configuration, and public-host source files have no differences
between those revisions. Configuration defaults were also read from the fetched
reference. Provider instructions use official documentation linked on each page.
These are source-reviewed recipes, not live identity-provider certification.

## Finding disposition

| ID | Finding and reader risk | Disposition | Evidence and final location | Verification |
| --- | --- | --- | --- | --- |
| F1 | Operators encounter references without task guides. | Addressed | Eight `configure` pages and flat sidebar entries. | Navigation and orphan checks; rendered review. |
| F2 | Generic OIDC obscures named providers and button labels. | Addressed | SSO hub, ten named recipes, `OIDC_DISPLAY_NAME`; `lib/onetime/sso_provider/oidc.rb`. | Provider source review and built-page search. |
| F3 | August SSO prose contradicts current SAML, restrictions, callbacks and CSP behavior. | Addressed | Rewrite SSO; provider definitions, `validate_auth_config.rb`, `omniauth_tenant.rb`, `auth_config.rb`. | Compare final text with source. |
| F4 | Hosted pages do not direct instance operators to configuration. | Addressed | Four reciprocal hosted/operator pairs and self-hosting entry links. | All changed-page local links. |
| F5 | Importing the draft would replace flat navigation and newer upgrade guides. | Addressed | Preserve existing sidebar entries, index and URL destinations. | Diff review. |
| F6 | Repeated provider setup could drift or imply ten simultaneous platform IdPs. | Addressed | One shared setup procedure; provider-specific recipes; one generic platform connection. | Final coverage review. |
| F7 | General configuration draft includes outdated security and authentication assertions. | Addressed | Concise task guides checked against current defaults and implementation, without importing the old reference. | Source review; no runtime claim. |
| F8 | New prose must preserve attribution and English-only scope. | Addressed | Template-based pages, TextProv create/edit, English label keys only. | Strict TextProv check against merged baseline and repository checks. |
| F9 | Marked aside syntax and numbered heading fragments render incorrectly. | Addressed | New content uses ordinary Markdown notes and unnumbered action headings. Existing source marks remain intact. | Built-page inspection and browser navigation confirm clean rendering and working fragments. |
| F10 | Link-check wrapper passes literal quotes in its root path and cannot run. | Addressed for this validation | The same lychee configuration was run directly with a correctly quoted root; the wrapper itself is unchanged. | Whole built-site offline check passes. |
| F11 | New untracked pages have extra blank lines at EOF. | Addressed | Trailing-blank-line formatting on the 18 new pages only. | No-index whitespace checks include every untracked file. |
| F12 | Develop advanced during validation and revised four linked pages. | Addressed | Fast-forward merged latest develop; kept upstream rewrites and applied narrow operator links. | Post-merge provenance, tests, diagnostics, build, local links and diff review; remote SHA matches HEAD. |

## Initial validation (before provider review)

Rendered review found two authoring-tool interactions (F9): newly marked
Starlight aside directives printed literally, and numbered heading slugs retained
a selector after the digit. These affect the new content. Use ordinary Markdown
audience notes and unnumbered action headings, then recheck rendered fragment
links. No existing attribution is stripped and no shared tooling is changed.

The repository link-check wrapper fails before checking links because it passes
literal quote characters in its root-directory argument. Invoke lychee directly
with the same configuration and a correctly quoted absolute root (F10); record
the wrapper limitation separately from the link results.

Initial finalization passed F1–F12. The subsequent provider-by-provider review
supersedes that readiness assessment: I1–I6 are now addressed, but V1 still
requires a live compatibility check. The complete draft is not ready for
publication while V1 remains deferred. No application code, translation bundles
other than English, redirects, or upgrade guides changed.

All 18 new pages and all six changed passages in existing pages were re-read after
the substantive corrections. The final coverage pass confirmed the four
reciprocal link pairs, every provider link, distinct navigation labels, flat
sidebar structure, and the existing upgrade index. The sharing page's existing
operator reference now points to the task guide; the other existing pages add
narrow operator links. Upstream rewrites and attribution remain intact.

Commands and results:

- `python3 tools/dogfood.py check --base HEAD` (HEAD is
  `15c75c84d7cb3ed55039fb6aebd1ab72b8779126`):
  24 eligible changed files, zero failures. The isolated worktree started clean;
  no human edits are included, so strict checking applies.
- `python3 -m unittest discover -s tools/tests`: 33 passed.
- `pnpm test`: 175 passed in 11 files.
- `pnpm run check:frontmatter`, `check:nav`, `check:orphans`,
  `check:locales`, `check:links:malformed` and `check:contrast`: passed.
- `pnpm build`: passed, 1,612 pages; Pagefind indexed 2,352 HTML files.
  Vite also emitted an `Unknown at rule: @theme` minification warning; it did
  not fail the build. This task did not establish whether it predates the branch.
- `git diff --check` plus `git diff --no-index --check /dev/null <file>`
  for each new file: passed.
- Direct lychee offline check, using `lychee.toml` and this worktree's absolute
  `dist` as `--root-dir`: 195,210 total, 151,479 OK, 43,731 excluded,
  zero errors. The wrapper invocation failed before checking links, as recorded
  above; the direct invocation provides the result.
- A separate temporary built-HTML inspection checked every article-local path
  and fragment in all 24 changed pages: 338 links, zero problems. It also
  confirmed the new content contains no raw callout directives or marked
  heading IDs.
- Browser preview: visually inspected the SSO setup and JumpCloud recipe at the
  available narrow viewport; clicked the recipe's setup link and confirmed it
  scrolled to the correct shared heading. This is not a full accessibility audit.

The 16 new provider references were consulted using the web tool, including
OneLogin's redirect to its current `/docs/` URLs. The unchanged feedback,
repository and issue-tracker links in adjacent pages were not separately checked
over the network. Provider administrator consoles and live login flows were not
exercised. No SMTP delivery, key rotation, or authentication-policy change was
performed. The examples are source-reviewed, not runtime-tested.

The initial finalization's remote check reported `develop` at `15c75c84`, matching this worktree's
HEAD. At that checkpoint, work was local and uncommitted on
`wip/self-hosted-sso-docs`; no PR or publication had been created. The pre-merge safety stash is retained as
`aa425c6eb30810e54d28cf774bd3593c91c10b13`. The primary checkout's unrelated
`package.json` modification is untouched.

## Provider review follow-up (2026-10-21)

Scope: six provider corrections, a provisional OneLogin notice, and the shared
hub's compatibility wording. Preserve the other provider recipes and existing
navigation. Application source was re-read at `145c1e7cfa`; the provider sources
below were reopened before editing. No live OneLogin test environment or
credentials were supplied for this task.

| ID | Materiality and reader risk | Disposition | Evidence and final location | Verification |
| --- | --- | --- | --- | --- |
| I1 | Material: PingOne can omit needed scopes or remain disabled. | Addressed | `configure/sso/ping.md`, registration: Resources scope editor, scopes and enable toggle, with official references. | Final source re-read and built-text checks confirm both actions. |
| I2 | Material: GitLab can omit email; authentication can be mistaken for group authorization. | Addressed | `configure/sso/gitlab.md`, prerequisites and verification: public email, privacy consideration, missing-email error and no configured group-membership check. GitLab OIDC docs and `omniauth.rb` support the guidance. | Final source re-read; built text includes prerequisite, error and restriction caveat. |
| I3 | Material: Authentik sign-in can succeed with an unverified customer and unavailable system roles. | Addressed | `configure/sso/authentik.md`, registration: 2025.10 email mapping, customer verification, system roles and genuine verification workflow. Authentik docs, `omniauth.rb` and `authorization_policies.rb` support it. | Final source re-read and built-text checks; frontmatter includes the new application sources. |
| I4 | Material: Zitadel application registration does not establish intended access restrictions. | Addressed | `configure/sso/zitadel.md`, registration and verification: both project checks, role assignment and denied-user tests, with official reference. | Final source re-read and built-text checks confirm named controls and negative test. |
| I5 | Material: JumpCloud connector lacks a Login URL distinct from the callback. | Addressed | `configure/sso/jumpcloud.md`, registration: public `/signin` URL, distinct callback and portal-launch explanation. | Final source re-read and built-text checks; JumpCloud connector reference reopened. |
| I6 | Non-material usability: Cognito issuer placeholder lacks discovery-location guidance. | Addressed | `configure/sso/amazon-cognito.md`, issuer section: discovery example, original/updated hostname distinction and exact issuer copy. | Final source re-read and built-text checks; AWS endpoint reference reopened. |
| V1 | Material compatibility uncertainty: OneLogin Basic plus PKCE is not established by provider documentation. | Deferred live verification; caveat added | `configure/sso/onelogin.md` prerequisites and `configure/sso/index.md` provider row explicitly mark the recipe provisional. OneLogin PKCE guide selects None (PKCE), token reference documents Basic; Onetime Secret `oidc.rb` sets `pkce: true`. | Rendered blockquote and hub status checked. Live code exchange and resulting session remain untested; caveat is not proof of compatibility. |

Final coverage: six addressed (I1–I6), one deferred material check (V1); no
rejected, omitted or unclassified findings. All eight changed published files
(seven recipes plus the hub) were re-read in full after editing. The final
rendered HTML contains the corrections, OneLogin caution and provisional table
entry. F1–F12 remain recorded above; this follow-up changes no existing links,
sidebar structure, callbacks, environment examples other than the added Cognito
discovery example, or translations.

Validation after the provider corrections:

- `python3 tools/dogfood.py check --base 15c75c84d7cb3ed55039fb6aebd1ab72b8779126`:
  24 eligible changed files, zero failures. Strict scope includes this task's
  earlier uncommitted edits; no human prose was relabelled.
- `python3 -m unittest discover -s tools/tests`: 33 passed.
- `pnpm test`: 175 tests passed in 11 files.
- `pnpm run check:frontmatter`, `check:nav`, `check:orphans`, `check:locales`,
  `check:contrast` and `check:links:malformed`: passed.
- `pnpm build`: passed, 1,612 pages, 2,352 HTML files indexed. The same
  `Unknown at rule: @theme` minification warning remains.
- Built-HTML local-link inspection: all 338 article-local paths and fragments
  across the full 24-page draft resolve. Sixteen provider-text assertions and
  checks of the OneLogin blockquote and hub row passed. This is HTML inspection,
  not a new visual browser or accessibility audit.
- `git diff --check` and equivalent no-index checks for all 19 untracked files:
  passed; nothing was staged at that validation checkpoint.
- Direct `lychee --config lychee.toml --no-progress --root-dir <worktree>/dist
  --offline 'dist/**/*.html'`: 195,312 total, 151,479 OK, 43,833 excluded,
  zero errors. Used the direct invocation for the unchanged wrapper issue F10.

External references: all six newly added links were opened successfully (two
PingOne, one Authentik, one Zitadel and two OneLogin references). The existing
GitLab OIDC, JumpCloud OIDC and AWS federation-endpoint references were reopened
for the corrections. Other existing external references were not rechecked in
this follow-up. Provider URLs are linked at the relevant step in each recipe.

Finalization status: **Not ready for publication as a complete verified recipe
set**, because V1 remains deferred. To close it, use an authorized OneLogin test
application and self-hosted test instance to verify Basic authentication with
Onetime Secret's PKCE request, token exchange and resulting session. Record the
application version and configuration without secrets, then reconcile the
recipe. No live IdP flows or administrative configuration changes were performed.
At that checkpoint, work was uncommitted on `wip/self-hosted-sso-docs`; no push
or PR had been made.

## Pull request preparation (2026-10-21)

Fetched `origin/develop` again before preparing the commits; it remains at
`15c75c84d7cb3ed55039fb6aebd1ab72b8779126`, the validation baseline above.
The requested pull request targets `develop` and is prepared as a draft because
V1 still requires live verification. The published content is unchanged since
the recorded provider-review validation. Commit groups separate the general
configuration guides, SSO hub and provider recipes, and navigation with this
review ledger. Creating the draft does not change the publication assessment.
