# Phase 4 implementation plan

**Status:** execution-ready plan; implementation not started by this document.
**Prepared:** 2026-10-29.
**Docs baseline:** `862a5ab5504dadf3e1e167ee17aee25d138f8405` on `chore/phase4`.
**Application baseline:** not selected or inspected in this planning pass. Selecting and verifying it is task P0, not an implied result of this plan.

## Goal and authority

Phase 4 delivers a maintainable generated Reference, the operator Day-2 layer, and symptom-led troubleshooting. It replaces parallel copies of configuration facts with traceable, revision-scoped records while preserving existing upgrade guidance and URLs.

The [summer audit](./documentation-audit-2026-08.md#sequencing) defines scope. Its [D7 decision](./documentation-audit-2026-08.md#d7--generator-ownership) assigns reference generation to this repository using vendored application inputs. The [Phase 3 decisions](./documentation-audit-2026-08-phase-3-decisions.md) add operator ownership transfer and require operator pages to use the new reference once available. The [research recovery disposition](./phase-3-research-recovery-disposition.md) supersedes older research about auth gates, sessions, ownership transfer, SSO and upgrades.

This document selects implementation architecture and delivery order. It does not establish current application behavior. Historical ledgers and existing pages are research inputs, not substitutes for application verification.

## 1. Baseline and corrections to the summer plan

| Verified repository state | Consequence |
| --- | --- |
| No English `reference/`, `operate/`, `troubleshoot/` or `upgrades/` content directory exists. | These are new destination trees, not existing groups to rename. |
| `self-hosting/environment-variables.md` contains a generated region attributed to app-side `bin/envref docs`. | Preserve its useful section structure and annotations. Reconcile generator ownership instead of treating the whole page as hand-maintained. |
| `.github/workflows/env-reference-drift.yml:68–99` checks out app `main` and executes its generator. | Replace competing output ownership atomically. Retain upstream freshness visibility without executing floating upstream code. |
| No tracked raw `.env.reference`, `config.defaults.yaml`, or reference input manifest exists. | Acquire pinned inputs before asserting generated coverage. Ignored local examples are not acceptable substitutes. |
| The interactive wizard uses schemas pinned to v0.26.18 / `a4f02e8`; schema coverage and preset fallbacks are incomplete. | Reuse the component and schema-vendoring pattern, not its preset values as authority for application defaults. |
| All 17 English Configure files are `draft: true`, including the SSO index and nine provider recipes. | Dependency publication is a tracked work item. A green source-navigation check does not establish production reachability. |
| One published upgrade index and ten release guides already exist. | Preserve their URLs and index-based discovery; add only the general migration workflow. |
| The audit's Operate list says ten but enumerates eleven destinations; ownership transfer adds one more. | Implement twelve Operate destinations, not ten. |
| Legacy environment and configuration pages exist in `da`, `en`, `mi`, `pt-br`, `sv`, `tr`, `uk`, `zh-cn`. | Retirement includes sixteen old files and an explicit translation recovery record, not just two English deletions. |

The August source counts and defect lists are historical. Do not assert a fixed variable count or repeat an old defect without checking the selected application revision.

## 2. Scope and content ownership

The destination manifest contains **27 pages: 12 Reference + 12 Operate + 3 troubleshooting/migration**. These are destination counts, not a claim that every page is wholly new prose. Configure prerequisite publication and changes to existing pages are additional work.

### Reference: twelve destinations

All paths in the following tables are relative to `src/content/docs/en/`. Use `docs/templates/reference.md` for reference content; select the appropriate existing template for other pages.

| Destination | Canonical responsibility | Publication boundary |
| --- | --- | --- |
| `reference/index` | How to read the reference, source version, default/example distinctions, links to task guides and refresh policy. | Ship a minimal real index with the first environment reference; expand as later references publish. No dead links or placeholder cards. |
| `reference/environment-variables` | Supported variables, applicability, source-declared defaults versus examples, derived values and stable per-variable IDs. | First substantive reference to ship. Every extracted assignment has a recorded disposition; unsupported variables are not offered as settings. |
| `reference/cli` | Commands, arguments, write gates, output modes, privileges and version scope. | Pinned registrations/help plus implementation review; never execute mutating commands to discover help. |
| `reference/scheduled-jobs` | Job inventory, schedule/trigger, enablement, dependencies and side effects. | Verify registration and implementation; do not infer schedules from variable names. |
| `reference/health-endpoints` | Paths, access policy, status codes, payload meaning and subsystem coverage. | Verify routes and responses; distinguish static status from dependency readiness. |
| `reference/configuration-files-and-precedence` | File inventory, resolution/merging, environment overrides, strict/deprecation behavior and source ownership. | Configuration resolver and normalization evidence; main YAML alone does not establish precedence. |
| `reference/generator` | Content-backed wrapper for the existing interactive configuration wizard. | Normal collection metadata, search/prev-next participation, hydration, URL-state compatibility and a visible version/coverage boundary. |
| `reference/site-and-interface` | Site and interface configuration key records. | File-qualified keys, types, conditions and citations, including YAML-only keys. |
| `reference/features-and-branding` | Feature switches and branding key records. | Separate configuration availability from hosted-plan entitlement. |
| `reference/datastore-and-queues` | Datastore, job/broker and pool key records. | Distinguish endpoint aliases, logical stores, process controls and per-job switches. |
| `reference/email-and-delivery` | SMTP/provider/delivery key records. | Separate auth-mail paths, delivery modes and retry configuration. |
| `reference/auth-logging-and-billing-files` | File structures and configuration contracts for the separate auth, logging and billing files. | Additional pinned sources required. Billing example structure is not the production catalog or plan matrix. |

### Operate: twelve destinations

Reference pages own factual inventories; Operate pages own decisions, procedures, verification and recovery. Do not duplicate full default tables in task guides.

| Destination | Reuse and boundary | Completion evidence |
| --- | --- | --- |
| `operate/datastore` | Reuse `install/linux`, `install/docker` and auth-mode guidance. Explain Valkey/Redis as system of record, separate SQL account storage, persistence, disk retention and eviction/capacity risks. | Pinned storage/persistence evidence and restart/restore observations. No flush-as-cache-repair advice. |
| `operate/backup-and-key-rotation` | Reuse Configure keys guidance and release-specific backup cautions. Separate datastore/SQL backups, independent keys, old-key fallback, verifier adoption, rotation and re-encryption. | Isolated restore rehearsal, pre-change encrypted fixtures, key/data pairing and rollback limits. Never imply rotation rewrites existing ciphertext. |
| `operate/health-and-monitoring` | Extend `install/verify`, keeping install-time checks there. Cover liveness, readiness, functional signals, workers/scheduler, alerts and data-integrity evidence. | Endpoint contract checks and synthetic subsystem checks. A successful HTTP response is not proof of queue, mail or restore health. |
| `operate/admin-console` | Reuse overview, verification and release guidance. Explain system Colonel versus organization admin, host/network gates, authentication, elevation and action confirmation. | Allowed/denied access matrix for browser and API, including anonymous and ordinary users. Verify actual UI inventory; do not freeze the August section count. |
| `operate/background-jobs` | Reuse service/docker setup and email diagnostics. Separate publisher, broker, worker, scheduler, supervisor and per-job enablement. | Normal work, broker outage, retries, restart/drain and actual synthetic delivery checks; record deployment-specific differences. |
| `operate/queues-and-dlq` | Queue topology, observation, retries, dead letters and recovery. Keep release-specific queue deletion in its release guide. | State whether inspection acknowledges/removes messages; test synthetic replay and duplicate behavior. Require explicit queue/vhost scope before purge/delete/replay. Reverify historical auth-only rescue/non-auth discard. |
| `operate/scheduled-and-maintenance-jobs` | Scheduling, repair versus reporting, conflict avoidance and external effects. Link to the generated job inventory. | Verified switches, overlap behavior, repair/backfill coordination, stopped-process requirements and postconditions. |
| `operate/scale-and-tune` | Workload-first sizing and process/pool relationships. Reuse tuning variable records rather than inventing recommended values. | Connection budget across replicas/processes, datastore/authdb constraints and representative load evidence. No unmeasured throughput guarantee. |
| `operate/logging-and-error-tracking` | Bounded diagnostics, retention, redaction and backend/frontend/worker tracking. Distinguish system logs, auth audit, Secret Activity and Colonel audit. | Synthetic redaction test, debug rollback steps and audit-failure semantics. Do not promise complete PII scrubbing. |
| `operate/rate-limits-and-network-access` | Proxy attribution, network policy, limiter scopes and targeted recovery. Separate health/admin/proxy allowlists. | Verified identities, storage and reset commands. Diagnose incorrect client IPs before raising limits; no broad key deletion. |
| `operate/ownership-transfer` | Move the operator procedure out of `self-hosting/index`; keep a summary and reciprocal link there and in the end-user ownership page. | Selected-version CLI/API evidence, membership preconditions, demotion, interruption recovery and postchecks. No universal `--dry-run`, `--yes` or `--apply` assumption; API writes may be immediate. |
| `operate/harden-your-deployment` | New pre-production checklist using installation/security procedures, not a wholesale move of `security/best-practices`. Preserve its end-user guidance. | Check TLS/origin isolation, persistence/backup policy, keys, service permissions, network/admin access and diagnostic exposure with rejection tests. Distinguish infrastructure controls from application features. |

### Troubleshoot and upgrade: three additions

| Destination | Responsibility | Acceptance |
| --- | --- | --- |
| `troubleshoot/boot-failures` | Symptom → evidence → scoped remedy → verification. Compose interpolation, config parsing, keys, datastores, assets, authdb and migration gates. | Reproduce representative failures at the selected version. Distinguish config migration, data migration and auth-schema work. No generic key regeneration or migration-bypass remedy. |
| `troubleshoot/sign-in-and-signup-problems` | Diagnose by installed version, hostname, auth mode, method and response/log evidence. Policy gates, cookies, proxy origin, email, rate limits, authdb and IdP failures. | Canonical/custom-host matrix and relevant auth methods; link only to published dependencies. No generic advice to weaken cookies, CSRF or session enforcement. |
| `upgrades/data-migrations` | Select the intended mechanism and operation; preview where supported, back up, apply, verify and recover. | Per-command/version write, preview, external-effect and rollback contract. Do not equate `CONFIG_MIGRATE`, `bin/ots migrate`, one-off migrations and auth-schema runners. |

Preserve `self-hosting/upgrade-guides` and its ten guides: `upgrading-v0-23`, `upgrading-v0-24`, `upgrading-v0-26`, `upgrading-v0-26-11`, `upgrading-v0-26-12`, `upgrading-v0-26-14`, `upgrading-v0-26-15`, `upgrading-v0-26-17`, `upgrading-v0-26-18`, `upgrading-v0-26-19`. The existing `upgrading-v0-26` covers v0.26.5–v0.26.6, not all v0.26 releases. Audit missing release actions against release notes for the selected target; do not interpret every historical gap as a reason to add another guide.

### Explicit exclusions

- Rewriting all locales, imposing translation parity, or adding product routes to unconfigured locale directories.
- Recreating or relocating the existing upgrade tree merely for directory symmetry.
- Generating production prices, plan entitlements or a plan matrix from examples or local catalog copies.
- Executing application boot, Ruby/ERB or shell during reference extraction.
- A public graveyard of removed variables. Internal coverage reports may record exclusions and reasons; supported-reference tables do not present inactive names as copyable settings.
- A general code/documentation crawler or a second interactive configuration wizard.
- Claiming source inspection is operational testing, or declaring the whole phase shipped while pages remain drafts.

## 3. Architecture decisions

### A1. One docs-owned pipeline, pinned inputs, offline output

Implement `bin/reference/` modules and a `bin/reference.mjs` entry point using the existing Node ESM, `yaml` and Vitest stack. These are proposed paths, not existing files. Use `vendor/onetimesecret/` for byte-preserved public source snapshots and `vendor/onetimesecret/manifest.json` for provenance. Add a narrow `.gitignore` exception for its `.env.reference`; do not unignore all `.env.*` files.

The manifest records upstream repository, full application commit SHA, release label if applicable, original source paths, per-file SHA-256, input role, extractor format version and refresh owner. All semantic inputs must belong to the same verified application revision, or explicitly declare and justify their separate revision. Validate paths and hashes before parsing; reject missing inputs and unintended files. Never vendor credentials, production configuration or customer data.

Minimum inputs are `.env.reference` and the actual main defaults file at the chosen revision. Extend with auth/logging defaults, matching schemas, public billing example and selected public registrations/resolvers/routes as required. Obtain actual paths in P0; names cited by older ledgers are acquisition leads, not proof that files still exist.

Network access is confined to an explicit maintainer refresh operation. Generation, equality checks, tests and production builds run without an app checkout or network. Commit generated content so reviewers can inspect output changes. Provide `reference:generate` and a non-writing `reference:check`; ordinary builds check rather than silently regenerate tracked files.

### A2. Static extraction with explicit uncertainty

Produce a normalized record model before rendering pages:

- Environment name and/or file-qualified configuration path; source line range and raw expression.
- Source prose, topic, annotations, supported/inert/removed/conditional classification and applicability.
- Separate example value, declared default, static fallback, schema default and effective-default status.
- Environment dependencies, precedence evidence, unresolved conflicts and page/anchor ownership.

Never rename an assignment's example to “Default”. Unset, empty, null, omitted, derived and runtime-dependent are distinct. Ruby empty strings are truthy, and `== 'true'` differs from `!= 'false'`. Schema defaults and preset fallbacks do not overrule implementation behavior. Conflicts enter a review report; blocking conflicts need resolution or an explicit documented limitation before the affected reference ships.

Parse `.env.reference` as text without sourcing it. Preserve quoted `#`/`=`, comments, sections, multiline values, release annotations and original citations. Diagnose duplicate names, malformed assignments and ambiguous comment attachment. Account for every recognized assignment as published, intentionally excluded or unresolved; do not hard-code historical totals.

Tokenize ERB spans before parsing YAML with inert placeholders. Preserve offsets, mappings, sequences, block scalars and comments. Reject duplicate keys and unsafe tags; bound aliases. Recognize only a tested small grammar for literal environment reads, literal fallbacks, ordered alternatives and boolean comparisons. Preserve unsupported expressions as runtime-defined with citations. Structural ERB that prevents reliable key discovery blocks that configuration section until reviewed; it does not block the first environment-reference release if that release labels values accurately and has independent evidence for every published fact. Defer complete YAML discovery to P3. Do not strip statements and invent unconditional YAML. No `eval`, ERB interpreter, filesystem predicates or application execution.

### A3. Generate facts; author procedures and explanations

Reference inventories and key tables are generated; indexes, introductions, precedence explanation and operational procedures are authored. Each record has one owning reference destination and deterministic explicit ID. Use lower-case `env-` IDs for variables and file-qualified `config-` IDs for keys, with a checked escaping rule and collision detection. Repeated prose headings are not an anchor contract.

Prefer separate generated data consumed by collection-backed wrappers, or narrowly bounded generated regions where existing tooling supports them; make the representation choice in P1 after a fixture proves Markdoc, search, TextProv and fragment behavior. Do not exempt the whole Reference tree from attribution checks. Purely generated/copied source material retains its source attribution. All newly authored published prose, including record descriptions, safety explanations and renderer-introduced text, needs an explicit attribution path; generating a table does not turn authored text into copied source. Prefer keeping authored explanations in collection-backed prose edited through `docs/TEXTPROV.md` and the shared authoring commands. If authored prose must enter through records, implement and test mark-preserving generation before publishing it. A regeneration fixture must distinguish verbatim source text, newly AI-authored record prose and existing marks, preserving their separate attribution byte-for-byte across repeated generation. Update the old path-specific generated-page policy in `tools/dogfooding.json` as part of cutover.

CLI, job and health facts need their own revision-scoped adapters. Use explicit structured records with evidence when static extraction cannot reliably capture semantics; do not pretend flags, permissions, preview or readiness guarantees can be inferred from help strings. Validate records against pinned registrations and record reviewed exceptions. Keep the adapter/override surface small and inspectable.

### A4. Preserve the existing wizard; repair its content integration

Place `reference/generator` in the documentation collection, preferably a `.mdoc` wrapper using a registered Astro component that hydrates the existing Vue island. Reuse `src/components/config-generator/`, its URL state and tests. Do not change behavior merely to move the route. Audit preset/schema compatibility against the selected application baseline; either refresh with verification or state the narrower supported version clearly. Never relabel old v0.26.18 inputs as current.

Verify search indexing, prev/next, metadata, no-JavaScript explanation, keyboard use, hydration and copy/download behavior. Preserve query parameters and `#apply-configuration` compatibility at the old route. If the deployment's redirect implementation cannot preserve them, retain a narrowly scoped compatibility redirect mechanism with tests rather than discard bookmarked selections.

### A5. Publication quality takes priority over draft removal

For every dependency choose: verify and publish it, use an adequate published alternative, or keep the dependent page draft. Removing `draft: true` alone is not completion. The SSO index's provider links require resolving its nine draft recipes. P0 records which of the 17 Configure files each Phase 4 page actually needs; do not enlarge scope into an unrelated rewrite of every draft.

Use task-focused pages with prerequisites, normal path, observable success, failure handling and recovery limits. For every mutating command record target scope, privilege, preview semantics, external effects, write gate, partial-failure behavior and rollback. Previews may still contact external services. Never run destructive examples against production while verifying documentation.

### A6. Separate reproducibility from upstream freshness

The required PR gate is generated output versus pinned inputs. A separate scheduled/manual freshness check compares the manifest's public inputs with a declared upstream release/channel, resolved to a SHA before comparison. Report upstream unavailability separately from actual divergence. Routine docs builds do not depend on floating app `main`.

When the environment reference cuts over, replace the current app-executing workflow with a docs-owned data comparison; do not silently delete its nightly protection. Keep read-only permissions and no credentials available to upstream code, since no upstream code needs execution. A release-oriented baseline must compare against an explicit release/channel policy rather than treating every unreleased `main` change as a shipped default.

Phase 5 may expand automation, but Phase 4 exits with a working refresh runbook, local reproducibility gate, functioning replacement for existing freshness coverage, and an accountable named maintainer. The docs repository maintainer is the accountable role; a real handle and backup reviewer must be recorded before P1 merges. No personal assignment is presumed by this plan.

## 4. Execution and branch plan

Keep this planning change on existing `chore/phase4`. Use the following short-lived branches when implementation begins; do not create all branches or long-lived full-phase forks in advance. Branch each independent slice from the latest integrated base. P0/P1/P2 are sequential; later branches may run in parallel only with disjoint write sets. Shared navigation, redirects, package scripts, provenance policy and CI are edited by the integration owner, not independently by every author.

A branch is review-ready only with its evidence and tests. No branch or commit is created automatically by this plan.

| Task / proposed branch | Dependencies | Work and concrete acceptance |
| --- | --- | --- |
| **P0 — evidence and dependency inventory** / `docs/phase4-evidence` | None | Select supported app release/full SHA and record why; acquire read-only sources; establish the 27-page manifest, Configure dependency matrix, command safety matrix and existing-fragment inventory. Use a Phase 4 ledger with page, assertion, source revision/path/lines, source-only versus runtime status, test and unresolved decision. Verify release-guide coverage against selected release notes. No publication based on August research alone. |
| **P1 — input contract and extraction foundation** / `build/phase4-reference-inputs` | P0 | Add tracked snapshots/manifest, refresh instructions, environment parser fixtures, normalized records and non-writing equality checks. Account for every environment assignment, resolve facts needed by the first release, and establish stable IDs and provenance representation. Use targeted source review where a default cannot be extracted safely; label unresolved values rather than guess. Full YAML key discovery and subject coverage belong to P3, not this gate. Test changed working directory, unrelated environment values and malicious inert expressions. Record named refresh owner/reviewer. Output must be reproducible from a clean checkout without app/network. |
| **P2 — environment first release** / `docs/phase4-environment-reference` | P1 | Ship environment reference and a minimal honest Reference index. Add English sidebar keys/group; retire old environment family with direct configured-locale redirects and recovery inventory. Preserve supported old topic fragments where possible, update direct links, reconcile generated-page policy and replace the app-executing drift workflow. Merge only with local equality, source inventory and production URL/fragment checks. |
| **P3 — configuration subjects and wizard** / `docs/phase4-configuration-reference` | P2 | Complete static YAML/ERB extraction and main/ancillary key coverage, generate configuration references, author precedence explanation, integrate the wizard wrapper and refresh/qualify schemas. Cut over old configuration and generator routes atomically; update component help/fallback links and existing reference owners. All keys have an owning page or reviewed disposition. No live route/redirect overlap, chains or lost query-state behavior. |
| **P4 — CLI/job/health contracts** / `docs/phase4-runtime-reference` | P1; publish after P2 | Produce pinned CLI, scheduled-job and health inventories with command-specific safety/access contracts. Review registrations and implementations, not only environment names. Add Reference index/sidebar links only when pages publish. This slice owns those adapters/records and three pages, not P3's config extractor. |
| **P5 — publication prerequisites** / `docs/phase4-configure-readiness` | P0; facts link to P2/P3/P4 when available | Resolve each required Configure draft through source review and appropriate checks; publish only verified dependency closures, including provider recipes needed by the SSO index. Repair published-to-draft links, including Docker's keys link. Update limited inline defaults to canonical reference links when available; retain behavioral source citations. Record remaining drafts and their dependent-page impact. |
| **P6 — operational safety foundation** / `docs/phase4-operate-foundations` | P0; publication needs relevant P3/P4/P5 outputs | Write datastore, backup/key rotation, health/monitoring and admin-console pages. Complete isolated restore, old-ciphertext and access-control matrices. Source-reviewed prose without the required operational evidence is not reported as a verified runbook. |
| **P7 — job operations** / `docs/phase4-operate-jobs` | P4, P6 recovery contracts; P5 email dependency | Write background jobs, queues/DLQ and scheduled/maintenance pages. Test synthetic failure/retry/replay and process coordination. Distinguish observation, repair, replay and deletion. Do not inherit historical inert-switch instructions. |
| **P8 — tuning, diagnostics and hardening** / `docs/phase4-operate-diagnostics` | P3/P4/P6; P5 for auth/session/header dependencies | Write scale/tune, logging/error tracking, rate limits/network access and deployment hardening. Establish measured-versus-advisory boundaries, redaction/rejection checks and bounded diagnostic steps. Preserve end-user security material rather than moving it wholesale. |
| **P9 — ownership, diagnosis and migration** / `docs/phase4-troubleshoot-and-migrations` | P3–P7 and required P5 closure | Write ownership transfer plus two diagnosis pages and general data migrations. Repoint overview/end-user ownership links; link workflow from existing upgrade index. Reproduce representative failures and safe synthetic transfer/migration cases; preserve release-specific procedures. No universal write/preview/rollback recipe. |
| **P10 — integration and phase exit** / `docs/phase4-finalization` | P2–P9 | Reconcile shared nav/redirect/provenance/CI changes, source references and all 27 publication statuses; run full acceptance and review generated diffs. Verify all configured locale routes, release inventory, fragments, search and generator state. Record exact executed validation, omissions and outstanding maintenance work. Update the summer audit status only after this gate passes. |

**Parallel work after P2:** P3 and P4 may proceed independently with shared-module changes coordinated by one owner. P5 source research can run alongside both. P6–P9 research/drafting may overlap, but destructive-procedure publication waits for the relevant reference, prerequisite and recovery contracts. P7/P8/P9 write disjoint content files; integration owns common files.

Do not attach a speculative completion date to the old 7–9 week estimate. Re-estimate after P0 identifies source availability, required draft closures and operational test environments.

## 5. Navigation, retirement and compatibility

### Information architecture

Add Reference as the eighth top-level group between API & SDKs and Trust & security. Add Operate under Self-hosting. Add a **Troubleshoot and upgrade** subgroup containing both diagnosis pages, `upgrades/data-migrations` and the unchanged upgrade index. This is an intentional exception to the current directory-per-subgroup comment; edit that comment, not eleven working upgrade URLs.

Give the cross-directory migration page a direct sidebar entry. The existing orphan checker permits hub reachability only for absolute `/en/...` links from a sidebar-linked page in the same directory; an index link alone will not make it reachable under that rule. Do not add an orphan allowlist entry to bypass this.

Keep new sidebar keys English-only unless translation is separately requested. Use normal Starlight content fallback at configured locale paths. Preserve lower-case `pt-br`/`zh-cn` route conventions and existing BCP-47 label overrides. Review the header section-highlighting helper for the new operator prefixes without unnecessarily redesigning navigation.

### Terminal route mapping

| Retired family | Final destination | Cutover |
| --- | --- | --- |
| `self-hosting/environment-variables` | `reference/environment-variables` | P2 |
| `self-hosting/configuration` | `reference/configuration-files-and-precedence` | P3 |
| `self-hosting/configuration-generator` | `reference/generator` | P3 |

Use `movedPages` fan-out for the 17 configured locales. Reconcile physical old-route files at the same time. Record each superseded translated file, its final Git revision, replacement and recovery command in a Phase 4 retirement inventory before deleting it; do not rewrite translations as incidental English work.

Remove the generator's special redirect fan-out when its moved-page mapping replaces it. Otherwise its later spread can override mappings or redirect through the retired English route. Remove the old custom Astro route only when the new wrapper and compatibility tests pass. No source URL may remain both a page and a redirect.

Inventory inbound links and old IDs across all locales, Markdoc and custom routes. Preserve safe old topic IDs on the final page where feasible; update repository links to canonical destinations. A path redirect cannot dispatch on an incoming URL fragment, which is not sent to the server. Do not invent server-side `#fragment` source mappings. Keep compatibility IDs or an explicit tested client-side mechanism where necessary.

Update `.lycheeignore` legacy exclusions during retirement. Do not hide new Reference failures with broad exclusions. Verify deployment actually publishes replacement redirect artifacts; source configuration alone does not demonstrate deployed behavior.

## 6. Validation implementation

Extend existing helpers/tests rather than create a second navigation model:

| Check area | Existing integration | Required addition |
| --- | --- | --- |
| Reference equality | `package.json`, `.github/workflows/ci.yml`, `.github/workflows/deploy.yml` | `reference:check` before production build/upload, including every generated artifact and manifest hash. Check mode is read-only; no app/network dependency. |
| Metadata/default ownership | `bin/lib/frontmatter.mjs`, `bin/check-frontmatter.mjs`, `bin/lib/frontmatter.test.mjs` | Gate `reference`, `operate`, `troubleshoot`, `upgrades`; replace legacy `REFERENCE_OWNERS` with explicit new owners. Reference links supplement, not erase, behavioral citations. |
| Redirect integrity | `config/redirects.mjs`, `bin/lib/redirects.test.mjs` | Validate normalized sources before object merging; reject duplicate sources across tables, redirect/content/custom-route collisions, duplicate slugs and chains; verify terminal targets exist and publish. |
| Production reachability | `bin/lib/nav.test.mjs`, `bin/lib/sidebar.test.mjs`, new post-build checker | Test recursive draft pruning and published sidebar/body/redirect targets against built output. Include live-to-draft negative fixtures, locale fallback and explicit IDs. Source existence is insufficient. |
| Upgrade preservation | Existing upgrade index and orphan tests | Protect exact index/ten-guide inventory; deleting both a guide and index row must still fail the regression. |
| Anchors/state | New reference fixtures and built HTML checks | Unique explicit IDs, source/default links, retained old fragments, TextProv-decoded headings and generator query/fragment preservation. Cover translated fallback routes. |
| Provenance | `tools/dogfooding.json`, `tools/tests`, `bin/check-textprov.mjs` | Move only generated exclusions actually needed; test wrappers, record descriptions and renderer-introduced prose without whole-tree exemptions. Regeneration preserves source attribution, new AI marks and old marks separately; do not mark copied human text as AI. |
| Freshness | `.github/workflows/env-reference-drift.yml` | Docs-owned hash comparison against declared upstream policy, read-only token scope, explicit divergence versus network-failure diagnostics and documented refresh operation. |

New reference fixtures cover commented/active assignments, quotes, embedded `#`/`=`, multiline strings/ERB, release annotations, duplicate names/keys, nested sequences, aliases/tags, boolean polarity, unset/blank/null, ordered fallbacks, unsupported expressions, Markdown/HTML escaping and stable anchor collisions. Include an expression that would be malicious if executed and prove it remains inert. Repeated generation must be byte-identical; input changes must produce a reviewable diff or explicit failure.

### Operational evidence contract

Use isolated deployments with fictional fixtures and non-deliverable/test mail routing. Record app SHA, image/variant, auth mode, persistence backend, enabled jobs, command and expected/observed result. Do not record usable links, passwords, private keys or live customer identifiers.

For recovery, verify pre-change fixtures after restore/rotation, not only newly created data. For queue tests, distinguish inspecting from acknowledging and replaying. For migrations and ownership transfer, record partial writes and audit failures separately from successful/failed exit status. For health and admin, test denial as well as success. Source-only rows remain labeled source-only; missing runtime evidence is a publication blocker for procedures that depend on it, not a passing test.

## 7. Merge and phase-exit acceptance

Each implementation slice runs focused tests, its source/coverage/equality reports and affected page/route checks before wider validation. Before final acceptance, run from the repository root using the pinned pnpm and an environment with the pinned TextProv SDK:

```sh
python3 tools/dogfood.py check --base 862a5ab5504dadf3e1e167ee17aee25d138f8405
python3 -m unittest discover -s tools/tests
pnpm test
pnpm run check:frontmatter
pnpm run check:nav
pnpm run check:orphans
pnpm run check:locales
pnpm run check:contrast
pnpm run check:links:malformed
pnpm run check:types
pnpm build
pnpm run check:textprov
./bin/check-links.sh --skip-build
```

Use each branch's recorded pre-edit base for its own review and the actual PR merge base for cumulative preservation. The baseline above identifies this plan's starting point; it does not replace future branch/PR bases. If a combined diff includes human edits, preserve them and report the preservation-only validation boundary.

Also run the proposed `reference:check` and post-build publication/fragment checks once implemented. The existing built-link script does not by itself establish complete fragment compatibility. Resolve the baseline type-check and link-wrapper blockers recorded below before a clean phase-exit sign-off; do not suppress application errors or broadly exclude new Reference routes to obtain a green result. Report external source access, runtime testing and deployed URL checks separately from local builds.

Phase 4 is complete only when:

- [ ] All 27 destinations have a recorded disposition and publish; no planned page is silently omitted, placeholder-only or draft while the phase is called complete.
- [ ] Every required Configure dependency closure is published or replaced with a verified published alternative.
- [ ] Reference outputs reproduce offline from pinned public inputs with no guessed defaults or unaccounted assignments/keys.
- [ ] Old reference/tool routes redirect directly, translated retirements are recoverable, and required fragments/query state remain usable.
- [ ] Existing upgrade index and all ten guide URLs remain published and discoverable.
- [ ] Every destructive/recovery procedure has source evidence, a bounded safety contract and the required isolated operational checks.
- [ ] Navigation, defaults ownership, production links, provenance, type/tests/build and generated equality gates pass; residual warnings are explained precisely.
- [ ] Named snapshot owner and backup reviewer, tested refresh runbook and replacement freshness coverage are in place.
- [ ] Phase 5 receives concrete automation follow-ups, not an unowned promise to prevent drift later.

## 8. Planning-pass validation boundary

This pass inspects the documentation repository, existing configuration/generator code, workflows, metadata and historical research. It does not acquire an application snapshot, verify application behavior, execute operational procedures, publish drafts or implement the generation pipeline.

No branch or commit was created. Both changed documents were reviewed in context; the plan's full destination/task coverage, branch dependencies and publication boundaries were independently checked. The build below was newly executed, not inferred from an old `dist/`.

### Review disposition

| ID | Finding | Disposition and verification |
| --- | --- | --- |
| F1 — material | P1's complete key inventory could block the environment-first release on full YAML extraction. | Addressed in A2 and P1/P3: full configuration discovery moves to P3; published environment facts still require sufficient independent evidence. Independent final review confirmed no task cycles and all 27 destinations accounted for. |
| F2 — material | Authored descriptions in generated records lacked an explicit provenance path. | Addressed in A3 and the provenance test contract: all authored published prose is covered, with a fixture distinguishing copied text, new AI prose and existing marks across regeneration. Independent final review confirmed closure. |

### Executed checks

- `pnpm test`: **355 tests / 18 files passed**.
- `pnpm build`: **1,324 pages built**; Pagefind completed.
- `pnpm run check:frontmatter`, `pnpm run check:nav`, `pnpm run check:orphans`, `pnpm run check:links:malformed`, `pnpm run check:contrast`: passed.
- `pnpm run check:locales`: passed with existing missing-key warnings for all 16 non-English bundles.
- `.venv/bin/python tools/dogfood.py check --base 862a5ab5504dadf3e1e167ee17aee25d138f8405`: passed; **0 eligible published files changed**. Planning prose is outside published-content marking scope.
- `.venv/bin/python -m unittest discover -s tools/tests`: **66 tests passed**. Initial system-Python attempts failed because they found TextProv 0.1.0 rather than required 0.3.0; using the existing repository virtual environment resolved that environment mismatch.
- `pnpm run check:textprov`: passed, **1,009 enrolled output pages**, one marker each and no raw selectors.
- Local Markdown AST links/fragments across both complete changed documents: **35 local links, including 17 fragment links, passed**. No new external URL was introduced. The audit's historical PR/issue URLs were not network-verified.
- `git diff --check`, `git diff --cached --check` and an equivalent no-index whitespace check for the untracked plan: passed.

### Baseline validation blockers and limits

- **V1 — type check:** `pnpm run check:types` failed with 22 errors in the existing ignored application checkout's `tmp/envref-source/eslint.config.ts`, `vite.config.local.ts` and `vite.config.ts`. This pass did not create or change those files. Reconcile local research-checkout placement or the intended type-check scope before implementation sign-off; do not discard meaningful source to silence diagnostics.
- **V2 — built-link wrapper:** `./bin/check-links.sh --skip-build` failed before link inspection because its constructed root argument included literal quotes. A direct equivalent command with a literal absolute root passed: `lychee --config lychee.toml --no-progress --root-dir /Users/d/Projects/ops/sites/docs.onetimesecret.com/dist --offline 'dist/**/*.html'` reported **115,389 OK, 0 errors, 36,447 excluded**. This uses existing exclusions and is not proof of complete fragment or draft-dependency coverage. Repair the wrapper in a focused implementation/checker change.
- No application-source acquisition, operational testing, browser interaction, upstream freshness execution or deployed-route verification was performed. These remain explicit implementation tasks, not validation results of this planning change.

The implementation plan is complete; an entirely green repository validation sign-off is not established because V1 and V2 remain outside this planning-only diff.
