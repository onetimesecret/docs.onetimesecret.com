# Phase 5 preparation — drift prevention

**Prepared:** 2026-10-29. **Status:** investigation complete; implementation waits for the Phase 4 handoff.

This is the readiness assessment and implementation plan for [Phase 5 of the documentation audit](./documentation-audit-2026-08.md#sequencing). It is not authorization to change the reference pipeline while Phase 4 is running.

## 1. Isolation and evidence boundary

- Docs baseline: `862a5ab5504dadf3e1e167ee17aee25d138f8405`; the working tree was clean at the start of investigation.
- Phase 4 is active, as reported by the user. Its output is not assumed complete or frozen. The audit's August status table is historical, not the current execution state.
- The only preparation deliverable is this file. Leave the audit, Phase 4 content, draft flags, sidebar, redirects, generators, workflows, dependency files and existing planning documents unchanged.
- Do not regenerate references, refresh schemas, install dependencies, start servers, build into shared `dist/`, or rewrite `.astro/`. Implementation and build-based validation require an isolated checkout or coordination after Phase 4 finishes.
- Application source inspected through public HTTP is pinned to `onetimesecret@f42fdedc54afcb5973460358c65e3aef363dd5cd`. No application code or upstream tests were executed. The authenticated GitHub tool returned `401`; public source retrieval succeeded. GitHub required-check settings and actual workflow-run results were not inspected.
- Historical Phase 3 research is not fresh application evidence. Its [recovery disposition](./phase-3-research-recovery-disposition.md) remains authoritative about its limitations.

**Readiness verdict:** enough evidence exists to scope Phase 5. Reference-gate implementation is blocked on the final Phase 4 input/output contract, tracked application revision and refresh owner. Checker work can be designed now, but must not overlap the active Phase 4 write set.

## 2. What already exists

The original Phase 5 text says to add navigation, orphan and frontmatter checks and describes tests as config-generator-only. That is no longer the starting point. Preserve and extend these guards rather than create replacements.

| Surface | Current evidence | Remaining Phase 5 work |
| --- | --- | --- |
| Sidebar targets and labels | [check-nav.mjs](../../bin/check-nav.mjs), [nav helpers/tests](../../bin/lib/nav.test.mjs) | Test checker decisions, not only helper functions; check published destination coverage. |
| Orphans | [check-orphans.mjs](../../bin/check-orphans.mjs): English inventory, direct sidebar links, one-hop same-directory hub links, reasoned exceptions and stale-exception rejection | Distinguish authoring inventory from usable published discovery paths. |
| Metadata and anchors | [check-frontmatter.mjs](../../bin/check-frontmatter.mjs), [frontmatter helpers](../../bin/lib/frontmatter.mjs): YAML syntax, enums, citations/default heuristic, reciprocal links and redirect fragments | Final Phase 4 tree/owner policy, parsed YAML values, evaluator and rendered-anchor regressions. |
| Locales | [check-locales.mjs](../../bin/check-locales.mjs): configured directories, explicit exceptions, warning-only missing bundle keys | Regression tests and validation of supplied labels/registration, not translation parity. |
| Malformed source links | [check-malformed-links.sh](../../bin/check-malformed-links.sh) | Fixtures for its defined syntax, supported extensions and scanner error exits. |
| PR validation | [ci.yml](../../.github/workflows/ci.yml): guards, types, Vitest, Python tests, build and TextProv checks | Published-route validation and same-revision enforcement before deployment. |
| Cross-repository freshness | [env-reference-drift.yml](../../.github/workflows/env-reference-drift.yml): environment page vs app `main`, PR path filter, nightly schedule and manual dispatch | Reconcile with the final Phase 4 paths and all generated inputs; this is not the D7 two-input snapshot gate. |
| Browser config generator | [schemas/README.md](../../src/components/config-generator/schemas/README.md): two vendored JSON schemas, documented at app `v0.26.18` / `a4f02e8` | Explicitly decide freshness coverage for schemas and the curated ENV mappings in [presets.ts](../../src/components/config-generator/presets.ts). |

### Observed read-only baseline

Commands executed from the docs root during preparation:

| Command | Observed result |
| --- | --- |
| `node bin/check-nav.mjs` | Passed: 76 links, 13 groups, 89 English label keys, 0 warnings. |
| `node bin/check-orphans.mjs` | Passed: 94 English pages, 76 sidebar-linked, 19 hub-linked, 0 allowlisted orphans. Counts overlap; do not add them. |
| `node bin/check-frontmatter.mjs` | Passed: 94 English pages, 38 in mandatory-metadata trees, 8 contracted anchors, 243 redirect fragments. Reciprocal checks reported 0 active hosted/operator pages, 10 relationships awaiting pages and 4 explicitly staged. |
| `node bin/check-locales.mjs` | Passed: 17 configured locales, 9 allowlisted content-only directories. All 16 non-English bundles warned about 15 missing keys each. This is permitted translation lag. |
| `node --check` on the four checker scripts above; `bash -n bin/check-malformed-links.sh` | Passed syntax checks only; the malformed-link scan was not executed. |

These are observations of the active checkout, not Phase 4 acceptance results or evidence that future deliberate defects fail. Re-run after the handoff. No Vitest, Python suite, production build, built-site provenance check or live link scan was run for this investigation.

## 3. Reference generation: resolve the actual contract first

### Environment reference already has an app-owned generator

At the docs baseline, [the environment page](../../src/content/docs/en/self-hosting/environment-variables.md) contains `BEGIN GENERATED: .env.reference` / `END GENERATED: .env.reference` sentinels and names `bin/envref docs` as its producer. The existing drift workflow checks out app `main`, installs its managed Python runtime tooling and invokes that command with `--check`.

Upstream evidence, pinned to the application SHA above:

- [bin/envref](https://github.com/onetimesecret/onetimesecret/blob/f42fdedc54afcb5973460358c65e3aef363dd5cd/bin/envref#L14-L37) starts `uv run --locked --project …/tools/envref --quiet envref`.
- [docsgen.py source/target contract](https://github.com/onetimesecret/onetimesecret/blob/f42fdedc54afcb5973460358c65e3aef363dd5cd/tools/envref/src/envref/docsgen.py#L18-L61) names `.env.reference` as input and `src/content/docs/en/self-hosting/environment-variables.md` as destination, under the docs-root argument.
- [docsgen.py command implementation](https://github.com/onetimesecret/onetimesecret/blob/f42fdedc54afcb5973460358c65e3aef363dd5cd/tools/envref/src/envref/docsgen.py#L456-L560) compares without writing the destination in `--check` mode: 0 for agreement, 1 with a diff for drift; handled invalid inputs exit 2. `--dry-run` prints the proposed page. `--init` is a destructive bootstrap, not a validation flag. There is no destination-filename override in that signature.
- [docsgen.py input reads](https://github.com/onetimesecret/onetimesecret/blob/f42fdedc54afcb5973460358c65e3aef363dd5cd/tools/envref/src/envref/docsgen.py#L491-L512) do not read `config.defaults.yaml`. Environment-page equality therefore does not establish YAML-default freshness.
- [Upstream regression-test rationale](https://github.com/onetimesecret/onetimesecret/blob/f42fdedc54afcb5973460358c65e3aef363dd5cd/tools/envref/tests/test_docsgen.py#L1-L14) distinguishes generated equality from correct output. A bad generator can agree with its own bad output.

The target-file no-write property does not imply that `uv` creates no environments or caches. Do not invoke the app tool against the shared checkout during Phase 4.

**Consequence:** do not build a second environment renderer merely to reproduce August's D7 stub. Conversely, do not declare D7 complete because `bin/envref docs --check` exists. The two-input snapshot requirement and browser-schema freshness are separate questions. No `.env.reference` or `config.defaults.yaml` snapshot was found in the inspected docs tree at this baseline.

**Relocation hazard:** moving the environment page to `reference/environment-variables` without updating the app-owned target contract makes the current checker read the retired destination. Updating only the workflow's path filter cannot fix that. Phase 4 must provide a compatible app-side contract, retain a deliberate generated source plus deterministic relocation, or document another supported arrangement. Phase 5 tests the chosen arrangement, not an invented CLI option.

### Phase 4 handoff checklist — required before reference work starts

Record these in the Phase 4 handoff; do not fill them by guessing from August's proposed tree:

1. **Final inventory:** generated pages/sections and their exact destinations, inputs, producers and marker formats. Include CLI, jobs and health reference if Phase 4 generates them; prose-only pages need no artificial generator.
2. **Source identity:** exact app SHA/tag per artifact, source paths and content hashes where snapshots exist; tool/dependency versions; compatible regeneration commands and their working directory.
3. **Tracked target:** app `main`, a release line or a release tag, and why it matches what this documentation publishes. Current workflow follows `main`; changing that policy needs an explicit decision, not a silent pin.
4. **Vendoring decision:** whether D7 remains applicable to YAML inputs; where any snapshot and manifest are stored; which defaults files are in scope. Do not assume `.env.reference` alone covers auth/logging/billing configuration.
5. **Output ownership:** final default-owning pages, generated/prose boundaries, surviving anchors and redirect mappings. Confirm no generated command overwrites authored wrappers or TextProv attribution.
6. **Refresh owner:** a named person/team, expected response to nightly drift, review path and recovery instructions. A role suggestion in this prep is not an accepted assignment.
7. **Exceptions:** intentional release lag, omitted/inert variables and source-side annotation defects, with reason, responsible reviewer and review/expiry condition. Do not publish a removed-variable inventory to satisfy D8.
8. **Acceptance evidence:** final Phase 4 docs/app SHAs and exact check results, including draft/locale fallback behavior. Reconcile pending reciprocal relationships rather than treating the current zero-active count as coverage.

If a required contract remains unavailable, the reference-gate task stays blocked. Independent checker tests need not wait, provided they run outside the active write set.

## 4. Findings and disposition ledger

IDs retain the read-only reviewers' numbering. “Planned” means a finite implementation task is specified, not that a defect has been repaired. Evidence references are to the baseline above; recheck ranges after Phase 4.

| ID | Finding and concrete risk | Evidence | Disposition |
| --- | --- | --- | --- |
| C1 | The August Phase 5 starting point duplicates shipped guards. | Audit lines 472–474, 563–569; `package.json:11–24`; `ci.yml:54–97`. | Addressed in this prep's §2. Leave the shared audit unchanged during Phase 4; reconcile its status at Phase 5 launch. |
| C2 | Helper tests do not exercise the complete navigation verdict; dead targets/duplicate labels can regress independently. Custom-route locale redirect coverage checks source-key presence rather than terminal destination. | `bin/check-nav.mjs:109–188`; `bin/lib/nav.test.mjs`; `bin/lib/sidebar.test.mjs`. | Planned: B and D. Preserve the current warning/failure policy unless explicitly revised. |
| C3 | The orphan check reads whole hub sources and the authoring sidebar. Frontmatter or malformed link-shaped text can count; a draft hub can make a live sibling appear discoverable. | `bin/check-orphans.mjs:31–70`; `bin/lib/nav.mjs:185–203`; `config/sidebar.mjs:374–375`. | Planned: B. Test source inventory separately from published reachability; retain one-hop/same-directory filing policy. |
| C4 | Required metadata covers only four trees; YAML syntax is parsed but assertions use a different scalar parser. Phase 4 pages can bypass the intended policy; valid comments/block scalars can be misread. | `bin/lib/frontmatter.mjs:28–43,99–126`; `bin/check-frontmatter.mjs:183–187,213–299`; `src/content.config.ts:29–51`. | Planned: C. Use parsed YAML values and final Phase 4 paths/owners. Do not globally make legacy optional fields mandatory. |
| C5 | Handwritten heading extraction can disagree with rendered IDs for comments, fence length, heading syntax and mixed duplicate collisions. A redirect can pass without a real anchor. | `bin/lib/frontmatter.mjs:186–214`; `bin/lib/frontmatter.test.mjs:157–248`; `bin/check-frontmatter.mjs:303–325,412–456`. | Planned: C/D. Add independent rendered-anchor fixtures, including TextProv; support the syntax actually rendered rather than an unlimited Markdown rewrite. |
| C6 | Locale directory checks have no dedicated evaluator suite; key presence does not establish usable non-English sidebar labels or registration. | `bin/check-locales.mjs:33–90`; `config/sidebar.mjs:20–87`. | Planned: B, after core nav/orphan regressions. Keep missing translations warning-only; do not expand into page parity or unused-key removal. |
| C7 | Malformed-link lint scans only `.md`/`.mdoc`, is heuristic and has no subprocess regression suite. Scanner errors already fail closed but lack regression tests; `.mdx`/`.markdown` are outside the scan. | `bin/check-malformed-links.sh:41–68,74–104`; `bin/lib/nav.mjs:12–13`. | Planned: B. Define supported syntax/extensions, test genuine prose defects versus code/comments and exit 2. A general-purpose Markdown linter is deferred as unnecessary scope. |
| C8 | Source link checks are not production-route checks; live-to-draft links and terminal redirects to absent pages can pass source existence checks. | `ci.yml:90–97`; `check-links.yml:79–97`; `bin/check-frontmatter.mjs:412–415`; `bin/check-links.sh:86–122`. | Planned: D. Validate the same isolated build's routes and fragments, including custom pages and locale fallback. |
| C9 | Deploy independently builds/uploads on push or manual dispatch; no workflow dependency proves these guards passed for that SHA. Repository protection may mitigate this but was not inspected. | `ci.yml:12–22`; `deploy.yml:38–41,68–83`. | Planned: D. Prefer local deterministic gates before credentialed upload; verify repository settings separately. Do not make an upstream network outage a production deployment dependency. |
| C10 | External link steps use `fail: false`, but the notification depends on job failure; the manual Boolean input is not read by the job condition. | `check-links.yml:117,122–157,175–176`. | Deferred: separate external-rot reporting fix. It is not necessary to deliver the audit's local/reference drift gate; do not promise alerts work. |
| C11 | Existing env drift CI targets the legacy page and only one upstream input, not D7's proposed snapshot comparison. | `env-reference-drift.yml:46–54,68–99`; audit lines 563–569. | Planned: A, contingent on Phase 4 handoff. No parallel replacement workflow. |
| U1 | App-owned managed generator exists; assuming it is still missing creates duplicate engineering work. | Pinned `bin/envref:14–37`, `tools/envref/pyproject.toml:1–15`. | Addressed in §3's evidence; reuse the supported contract in A. |
| U2 | Generator target and sentinels are fixed; a page move can invalidate freshness checking. | Pinned `docsgen.py:18–61,107–120`. | Planned: A; Phase 4 must supply the relocation arrangement. |
| U3 | `--check` is destination-read-only, not a runtime-wide no-write guarantee; `--init` can replace authored content. | Pinned `docsgen.py:456–560`, `bin/envref:14–37`. | Addressed in §3 and validation constraints; A must prove checker no-write behavior with fixtures. |
| U4 | Environment generation does not cover YAML defaults. | Pinned `docsgen.py:491–512`; `paths.py:37–41`. | Planned: A's complete input manifest; no false two-input coverage assertion. |
| U5 | Equality does not verify source semantics or release annotations. | Pinned `.env.reference:13–18`; `test_docsgen.py:1–14`; existing environment-page release annotation note. | Omitted from automation scope: source/default/release accuracy still needs upstream tests and human review. Document this limit in the maintenance runbook. |
| U6 | D7 is partly superseded for environment rendering, not automatically for YAML snapshots. | Pinned `docsgen.py:10–16,78–92`; docs workflow and schema README. | Planned: A's recorded contract decision. Do not rewrite the settled audit decision before Phase 4 reports its implementation. |

No finding is silently dropped. The material open items are implementation work, not unresolved factual assertions in this preparation document. C10 and the general-linter expansion of C7 are deferred; U5 is explicitly outside equality automation.

## 5. Implementation plan after the handoff

### A — Reference reproducibility, upstream freshness and refresh workflow

**First dependency:** §3's completed handoff. **Write scope:** existing env-drift workflow, agreed new reference-check helper/tests and manifest, plus package-script integration assigned to the coordinator. Generator/snapshot/content changes remain with Phase 4 until handed over.

Use two distinct checks, with different trust and failure boundaries:

1. **Deterministic PR/deploy gate:** recorded inputs/revision plus the supported producer reproduce the committed artifacts. For vendored files, verify hashes and output together. Detect edited output, missing inputs, missing/duplicate sentinels, missing files and incompatible generator contracts. Run any writing producer in a private scratch tree and compare; validation must not refresh the checkout. A pinned upstream checkout must execute separately from deployment credentials.
2. **Upstream freshness monitor:** resolve the chosen upstream target once per run, print the resolved SHA and compare every tracked input with its recorded revision/snapshot. Retain nightly and manual execution; run on relevant PR changes. Report additions/removals/content drift, including comment/default changes that affect reference output. Fetch failures, missing tools and incompatible contracts are failures with distinct messages, never a clean result. This monitor must not silently become warning-only. Moving upstream freshness is separate from deterministic deployment readiness.

A permanent pin alone is not freshness. A moving upstream render alone is not reproducibility. If Phase 4 retains direct app-owned generation instead of snapshots, record that D7 adaptation explicitly and test its equivalent input/output coverage. Do not fabricate a snapshot layer solely to satisfy old wording.

For browser schemas, compare the two rendered schema artifacts against their recorded app revision in isolation, or document a justified Phase 5 exception with an owner. The curated `presets.ts` ENV mappings are not represented in JSON Schema: add focused fixtures for mapped/fallback paths against agreed authoritative inputs, with manual review for semantic changes. Matching a schema hash does not validate those mappings.

Preserve the existing cross-repository trust boundary: read-only permissions, no secrets, no persisted checkout credentials; never run untrusted app code in a credentialed deploy job. Update PR path filters for every final source/manifest/output/checker/workflow path. Confirm final status names in required-check settings; path-filtered workflows can otherwise leave required checks pending. Produce one actionable refresh report and route repeated nightly failures to the accepted owner without opening duplicate issues.

**Acceptance:** positive/negative fixtures prove output drift, upstream-only drift, each input changing independently, schema drift, missing input/markers, offline failure and deterministic repeatability. The recorded refresh recipe produces a reviewable diff; no check mode changes tracked files. No usable secrets or production billing catalog enter fixtures or artifacts.

### B — Navigation, orphan, locale and malformed-link regression harness

**Dependencies:** baseline inventory and draft policy; no dependency on reference internals. **Write scope:** `bin/check-nav.mjs`, `bin/check-orphans.mjs`, `bin/check-locales.mjs`, `bin/check-malformed-links.sh`, `bin/lib/nav.mjs` and their existing/new `bin/` tests. New helper filenames are chosen at implementation, not presumed present.

Separate evaluation from filesystem discovery only where needed to exercise complete checker verdicts. Use pure inputs or disposable fixtures, not edits to live content. Test dead targets, duplicate/fallback labels, empty groups, missing English keys, stale/reasonless exceptions, same-directory one-hop reachability and rejected cross-directory/two-hop links. Add malformed/frontmatter-only inbound-link and draft-hub cases.

Keep draft pages in the authoring inventory. For published discovery, remove draft sources as well as draft destinations; a live page cannot rely on a draft hub. Preserve configured locale fallback and test BCP-47 sidebar codes separately from lowercase directory names. Missing translations remain warnings; provided labels must be usable. Exercise malformed-link scanner error paths and each agreed content extension. Do not turn code examples into mandatory live links.

**Acceptance:** each deliberate defect fails the appropriate complete evaluator/CLI; each supported exception passes. Scanner/import errors cannot produce success. The real post–Phase 4 tree passes without adding exceptions merely to quiet new failures.

### C — Typed metadata and stable anchor contracts

**Dependencies:** final Phase 4 trees/default owners; coordinate with A on generated boundaries. **Write scope:** `bin/check-frontmatter.mjs`, `bin/lib/frontmatter.mjs`, `bin/lib/frontmatter.test.mjs` and focused new policy tests. No sidebar/content rewrites in this stream.

Use the existing `yaml` dependency's parsed values for policy assertions, retaining body offsets for useful errors. Validate types and trimmed strings, including comments, quoted values and block scalars. Extend mandatory `audience`/`pageType` and operator-citation policy only to the agreed new trees; do not impose metadata backfill on unrelated legacy locales/pages. Replace legacy default-owner exemptions with the final reference owner inventory. Decide whether the deferred reference-link half of D-4.1 is useful now; a citation alone still cannot prove current behavior.

Test complete policy decisions and contracted anchors. Include hidden comments, code fences of unequal lengths, supported heading forms, mixed duplicate collisions and marked/unmarked versions of the same heading. Use independently rendered IDs in D to detect divergence from the source parser. Keep existing reciprocal-link/pending-exception checks and their stale-entry failures.

**Acceptance:** dropping metadata from a newly governed operator page fails; valid YAML does not fail because of scalar spelling; each required redirect fragment resolves to the rendered heading. Generated references do not acquire inappropriate prose-citation requirements.

### D — Published routes and enforcement before deployment

**Dependencies:** A's local deterministic interface, B/C policy outputs and final Phase 4 routes. **Write scope:** `ci.yml`, `check-links.yml`, `deploy.yml`, a built-route validator or adapted link script, isolated route/workflow tests. Only A edits `env-reference-drift.yml`; the coordinator owns shared package/runbook edits.

Reuse a single isolated production build for published-link and TextProv validation. Account for custom Astro pages, English fallback under configured locales, draft omissions, retired URLs and terminal redirect targets. Validate fragment IDs against HTML, not source filename existence. Audit ignore rules for the built artifact: source-specific exclusions must not conceal the routes being tested. If reusing lychee, prove its pinned version/options actually check fragments and redirects as required; invoking the current local script alone is not acceptance.

Keep malformed-source lint alongside built links: text that never parses as a link remains invisible to an HTML link checker. Enforce the deterministic guard/test/build sequence for the exact SHA before upload on push and manual deployment. A reusable validation workflow or same-SHA verified artifact is acceptable; preserve deployment environment flags and provenance merge-base behavior. Verify branch protection separately rather than assuming a green source file defines repository policy.

**Acceptance:** live-to-draft, missing custom page, missing redirect terminal and missing rendered fragment fail; valid locale fallback and intentional redirects pass. Failing a guard prevents upload. No secret-bearing upload job executes upstream/fork code. External availability checks are not a new per-deploy network dependency.

### E — Maintenance handoff and audit closure

**Dependencies:** A–D. **Coordinator-only scope:** audit status, canonical maintenance guide, contributor/check documentation and shared package commands where needed. Link from existing onboarding rather than inventing another documentation hierarchy.

Record accepted owners, tracked revision policy, exact refresh/check commands, failure categories, no-write/overwrite behavior, rollback limits, exception review and alert handling. Explain that references can match incorrect source and that `sourceOfTruth` is evidence for review, not semantic proof. Retain the billing-catalog exclusion and English-only scope. If published prose changes, use the shared TextProv workflow; do not attribute copied human or generated text to AI.

**Acceptance:** another maintainer can diagnose and refresh a simulated stale input from the guide; all findings above have final implementation or explicit deferral evidence. Update the audit's historical Phase 5 description only once the actual delivered scope is known.

### Scheduling and write ownership

Launch A only after the reference contract is settled. B and C can run in parallel in separate checkouts after Phase 4 ownership is released; serialize changes to shared `nav.mjs` helpers through B. D integrates their interfaces; E closes the work. Package scripts, content/config changes and maintenance prose have one coordinator, not overlapping agents.

Treat the audit's 3–4 weeks as an unrevised historical estimate. Size work after the handoff and fixture design; do not expand it into a general Markdown parser, translation completion project, billing audit or deployment redesign.

## 6. Validation and exit checklist

### Preparation-only validation

This file is internal planning prose, outside published TextProv marking scope. The source checks in §2 are the executed baseline. Additional preparation validation:

- A read-only Node/remark AST check resolved all 15 relative Markdown links in this file, including the audit's `#sequencing` fragment. No missing target was found.
- A file-content whitespace check found no trailing whitespace and confirmed the final newline. A scoped `git diff --check` emitted no errors, but this file was untracked, so that command alone was not its whitespace validation.
- Read-only finding reconciliation covered C1–C11 and U1–U6. It requested a narrower C7 statement (scan errors already fail closed) and the exact `bin/envref docs --check` spelling; both corrections were applied.
- A later status read showed concurrent edits to the main audit and a new Phase 4 plan. Those files were not edited or reverted by this session. The initial SHA is an evidence baseline, not exclusive ownership of the checkout.

Shared `pnpm test`, Python suites, `pnpm run check:types`, `pnpm build`, `check:textprov` and `check:links` are intentionally not run here: this session must not compete with Phase 4 or overwrite its outputs. Do not reuse someone else's `dist/` as evidence. This is not a commit-readiness or Phase 4 completion report.

### Implementation validation — isolated checkout/CI only

Start with the new targeted fixtures, then the real final tree. Existing commands to retain:

```sh
python3 tools/dogfood.py check --base HEAD
python3 -m unittest discover -s tools/tests
pnpm test
pnpm run check:frontmatter
pnpm run check:nav
pnpm run check:orphans
pnpm run check:locales
pnpm run check:links:malformed
pnpm run check:contrast
pnpm run check:types
pnpm build
pnpm run check:textprov
```

Activate the pinned Python environment per [TextProv guidance](../TEXTPROV.md). Record the starting base SHA before edits; use that SHA instead of `HEAD` after commits. For a combined human/agent diff, use preservation-only checking and report the attribution boundary. Add A's agreed deterministic/freshness checks and D's built-route check only after their actual commands exist. The current `pnpm run check:links` needs lychee and builds again; coordinate that cost or use a tested same-build entry point.

Phase 5 exits only when:

- [ ] Final Phase 4 paths, inputs, producers, revisions and default owners are reconciled; no shadow environment renderer exists.
- [ ] Deterministic regeneration and upstream-only drift have independent negative tests; every agreed input is covered or explicitly excepted.
- [ ] Complete checker decisions, not just parsers, have regression fixtures and useful failure messages.
- [ ] Published routes/anchors, draft isolation, custom routes and locale fallback are checked against the same build being accepted.
- [ ] PR and pre-upload validation cover the intended branches/events/SHA; required-check settings are confirmed by someone with access.
- [ ] Refresh and alert owners accept their responsibilities; one refresh/recovery exercise is recorded.
- [ ] Existing tests/provenance checks pass without deleting attribution, loosening policy or adding unexplained exceptions.
- [ ] C1–C11 and U1–U6 have final dispositions; deferred external-link reporting and semantic-review limits remain explicit.

No Phase 5 implementation is performed by this preparation document.
