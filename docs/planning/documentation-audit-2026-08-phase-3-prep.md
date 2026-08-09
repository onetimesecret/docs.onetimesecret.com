# Phase 3 preparation — the operator install and configure tree

**What this is:** the readiness assessment for Phase 3 of
[`documentation-audit-2026-08.md`](./documentation-audit-2026-08.md), written after Phase 2 shipped as
[#405](https://github.com/onetimesecret/docs.onetimesecret.com/pull/405). It follows the shape of the
Phase 2 assessment, which was removed from this directory when that phase closed. It, the Phase 2
verification ledgers and the deleted-file index are in git history at
[`db6fe76`](https://github.com/onetimesecret/docs.onetimesecret.com/commit/db6fe76) —
`git show db6fe76:docs/planning/documentation-audit-2026-08-phase-2-prep.md`,
`…:docs/planning/phase-2-deleted-files.md`, `…:docs/planning/phase-2-ledger/<name>.md`.

It does not restate the plan. It records the state Phase 3 starts from, the four problems Phase 3 has
that Phase 2 did not, and what has to be true before it opens.

---

## 1. Verified starting state

Re-measured in-repo on 2026-08-09, not taken from the plan or from #405's description:

| | |
|---|---|
| `pnpm check:nav` | OK — 58 sidebar links across 14 groups, 1 warning |
| `pnpm check:orphans` | OK — 57 EN pages, **0** allowlisted orphans |
| `pnpm check:frontmatter` | OK — 57 EN pages (35 end-user), 8 contracted anchors, 277 redirect fragments resolved |
| `pnpm check:locales` | OK — 17 configured locales, 9 allowlisted content-only directories |
| `pnpm test` | 86 passed |
| `pnpm build` | clean, 984 pages |
| Nav warning | `self-hosting/configuration-generator` is served from `src/pages`, so non-EN locales 404 unless redirected — **pre-existing, and now Phase 3's to fix**, since that page sits in the Configure group Phase 3 rebuilds |

Phase 2's structural claims spot-checked and confirmed: seven top-level entries, no tier factories in
`config/sidebar.mjs`, `plan` rendered as a badge, `docsSchema()` carrying all four optional fields, and
all twelve contested end-user pages published.

**Read: Phase 2 is closed and its output holds. Phase 3 has not started.**

### The operator tree as Phase 3 inherits it

Seven pages, 2,237 lines, and **not one of them carries `audience`, `pageType` or `sourceOfTruth`** —
the schema Phase 2 added has no operator consumer yet.

| Page | Lines | State |
|---|---|---|
| `self-hosting/installation` | 481 | The six-jobs page. Splits into five. 8 locale copies |
| `self-hosting/configuration` | 636 | Still **one 596-line YAML fence** (lines 40–636) with 12 headings total. Phase 4 retires it. 8 locale copies |
| `self-hosting/environment-variables` | 499 | 157 headings; the v0.25/v0.24 stack. Phase 4 retires it. 8 locale copies |
| `self-hosting/index` | 76 | `UPD` in Phase 3. 17 locale copies |
| `self-hosting/simple-or-full-auth` | 91 | `UPD` in Phase 3. EN only |
| `self-hosting/upgrading-v0-24` | 368 | Phase 4 |
| `self-hosting/upgrading-v0-23` | 86 | Phase 4 |

`installation.md`'s six unrelated jobs, read off its own headings: Docker deployment · manual OS
install (Debian/Ubuntu and RHEL) · systemd services · reverse proxy (nginx, Caddy, Apache) · TLS
certificates (Certbot and custom) · Valkey/Redis configuration and backup.

Phase 1's corrections are intact where Phase 3 will be working — the nginx snippet overwrites
`X-Forwarded-For` with `$remote_addr` and carries the `TRUSTED_PROXY_MODE=depth` exception
(`installation.md:244,253,267`), which is the correction the Phase 1 self-analysis flagged as the one
the audit had got backwards.

---

## 2. What Phase 2 handed over

Six pages from §3's 30 are unwritten. They are Phase 3's tail, not Phase 3's trunk, and two of them
are not operator work at all:

| Page | Why it did not ship | Blocked? |
|---|---|---|
| `organizations/roles-and-permissions` | the plan ∩ role rule — asserts what a tier grants | **yes**, billing catalog |
| `billing/index` | merges `pricing/index` + `compare-plans` | **yes**, billing catalog |
| `billing/managing-your-subscription` | — | **yes**, billing catalog |
| `share/receiving-secrets` | deferred by choice | no |
| `organizations/ownership-and-transfer` | deferred by choice | no |
| `contribute/developer-on-ramp` | deferred by choice | no |

One of these is load-bearing rather than cosmetic: **`organizations/audit-trail` shipped leaning on the
plan ∩ role rule with no page to link to.** A reader who hits "your plan includes this but your role
refuses it" has nowhere to go.

Two published pages also carry claims nothing in any repo can confirm — `pricing/compare-plans`'s
four-column matrix, and `custom-domains/access-and-privacy`, where three `**Plan:**` lines were removed
before commit rather than corrected. Both wait on the same catalog.

---

## 3. Sources

Unchanged from Phase 2, and worth restating because Phase 3 has the highest per-page research cost in
the plan — most of its pages require reading implementation to state a default correctly.

- **`onetimesecret/onetimesecret`** is the only arbiter of app behaviour, defaults, env vars and config
  keys. Public and readable through the session git proxy; **clone it before launching any content
  stream**. The clone is shallow — `git log`, `blame` and `bisect` need `git fetch --unshallow` — and
  read-only, so filing or commenting on app-repo issues needs the repo attached with push access.
- **`onetimesecret.com`** (marketing) arbitrates what buyers are *offered* and reader-facing vocabulary.
  It arbitrates nothing about behaviour.
- **The production `etc/billing.yaml`** is in neither repo and has not been supplied.

### The billing finding, restated because its source document is gone

Phase 2's assessment carried a two-source cross-reference that is the reason the billing gate is shut.
It is recorded here rather than left in git history, because it is the evidence anyone re-opening the
question will need:

The docs publish a four-column matrix in `pricing/compare-plans.md` — including `Member Invites: ✅`
and `Members per organization: Up to 50` for Identity Plus, and `Up to 100` plus SSO, Teams & Shared
Dashboard and Workspace Branding for Team Plus.

- **Marketing repo.** Defines exactly two tiers, `tier-free` and `tier-identity`
  (`productTiers.ts:54,80`); `regionPricing.ts` prices those two and no others in any region. The
  string "Team Plus" occurs nowhere in its `src/`, and its comparison table carries no member, invite,
  seat or organization row at all.
- **App repo example catalog.** `etc/examples/billing.example.yaml` defines two active plans,
  `free_v1:182` and `identity_plus_v1:224`, with the team tier present only as a commented-out block
  (`:291-318`). `identity_plus_v1`'s entitlements do **not** include `manage_members` — the entitlement
  exists at `:135` but appears only inside the commented team block at `:307` — and its limits are
  `total_members_per_org: 1`, `role_members_per_org: 0`, `role_admins_per_org: 0`, `organizations: 1`.

Two independent sources, reached by different routes, agree against both published claims. Neither
settles it: [D3](./documentation-audit-2026-08.md#d3--billing-catalog)'s reasoning holds that an example
file cannot arbitrate what buyers are sold, and the marketing site is another published claim rather
than the catalog. So the honest statement is **stronger than "unverified" and short of "factually
wrong": two independent sources indicate both claims are wrong, and the production catalog is required
to confirm it.**

Separately, and for the marketing repo's owner rather than for this plan: `src/data/product/plans.ts`
still defines a legacy `anonymous` / `basic` / `identity` model with a `$35` identity plan while
`productTiers.ts` uses `tier-free` / `tier-identity` and `Pricing.vue` links `identity_plus_v1`. Three
plan models in one repo.

Phase 2's ledgers (`git show db6fe76:docs/planning/phase-2-ledger/…`) cover the end-user surface —
vocabulary, secret lifecycle, auth and account, account surfaces. **They do not cover the operator
surface**, so Phase 3 builds its own. Their value here is as a format precedent and as the place to
check a reader-facing term before an operator page renames it.

---

## 4. Four problems Phase 3 has that Phase 2 did not

Phase 2 was a reshape: it moved pages that existed and wrote pages nothing contradicted. Phase 3 writes
26 pages into a tree where a competing description of the same settings is still published, and where
the page those settings are supposed to live on does not exist yet.

### 4.1 The Reference does not exist for another phase — decide where numbers go

Rule 3 of the plan — *Reference owns every default and every value; prose pages state consequences and
link to the generated row, they never restate a number* — is the rule that keeps the tree from drifting
back to Finding 1. But `reference/*` is Phase 4. For the length of Phase 3, its 26 pages have nothing to
link to.

`bin/check-frontmatter.mjs`'s fourth assertion is scoped to `audience: end-user` pages on purpose ("the
self-hosting and reference trees state values because stating values is their job"). That scoping was
right for Phase 2. Carried unchanged into Phase 3 it means **26 new operator pages may restate every
default with nothing checking them** — which is precisely how `configuration.md` and
`environment-variables.md` became what they are.

Three ways out, and this needs a call before content starts:

1. **State values inline, cite `sourceOfTruth`.** Fastest to write, and recreates Finding 1's copy at
   26-page scale — one citation per page does not make 26 pages of restated defaults tracked.
2. **Link to the surviving `self-hosting/environment-variables` and `configuration.md`.** They are the
   reference until Phase 4 replaces them, and Phase 4 retires them as `movedPages` families, so the
   links repoint themselves through the redirect table rather than needing a sweep.
3. **Write consequence-only, no numbers.** Cleanest against the rule, and asks a reader to hold a
   question for 6–8 weeks.

**Recommendation: 2, plus extending assertion 4 to operator pages** — an `audience: operator` page that
writes an ALL_CAPS variable next to its value must link to the page that owns it. That is the same
check, re-scoped, and it is what makes option 2 hold rather than decay into option 1.

### 4.2 A split does not carry translations, and this phase splits a page four ways

Phase 2 established the rule: **moves carry translations, merges delete them.** A split does neither.
`self-hosting/installation` has 8 locale copies; splitting it into five English pages means the seven
translated copies have five candidate homes and belong to none.

Keeping them at the old URL is not available — `config/redirects.mjs` asserts that no redirect source
is also a page. Relocating one to a split target ships a translated page whose content no longer
matches its title, which is the "translated-but-wrong" outcome Phase 2 explicitly rejected in favour of
"correct-but-untranslated".

So the precedent applies: **delete, fall back to English, index the deletion** in the same format
Phase 2 used (`git show db6fe76:docs/planning/phase-2-deleted-files.md` for the template: family,
copy count, merge target, then one line per file). Name the cost
rather than discovering it in review — this is 7 locales × a 481-line page, a heavier loss per file
than any single Phase 2 merge, and Phase 4 repeats it twice more at 636 and 499 lines.

### 4.3 Two Phase 2 redirect shims will chain, and the build will say so

`config/redirects.mjs:75-76` carries `start/installation → self-hosting/installation` and
`start/configuration → self-hosting/configuration`. They exist because non-EN copies of
`start/run-your-own-instance` still link relatively to siblings that moved.

Retire either target and `assertNoChainedRedirects` fails the build. That is the checker working. The
fix is to repoint each shim at the final target in the same commit that retires the slug — **not** to
relax the assertion, and not to leave the shim pointing at a redirect.

### 4.4 The reciprocal-aside contract becomes assertable for the first time

Rule 2 — nine hosted↔operator feature pairs carry reciprocal `:::note` asides in both directions — was
unenforceable in Phase 2 because only the hosted half existed. Phase 3 writes the other half, so this
is the phase where the contract becomes real and where a checker can assert it.

| Hosted page (shipped) | Operator page (Phase 3) |
|---|---|
| `custom-domains/index` | `features/custom-domains` |
| `custom-domains/branding` | `features/branding` |
| `custom-domains/email-sender` | `configure/email` |
| `custom-domains/homepage-and-incoming` | `features/incoming-secrets`, `features/interface-and-homepage` |
| `custom-domains/access-and-privacy` | `configure/authentication` |
| `organizations/sso` | `configure/sso` |
| `share/index` | `configure/secret-options` |
| `account/change-your-region`, `security/where-your-data-lives` | `features/multi-region` |

Note the asymmetry in row four: one hosted page pairs with two operator pages. A checker asserting a
1:1 mapping will fail on it, so assert *reachability in both directions*, not pairing.

---

## 5. Scope

26 pages, from §4 of the plan. **Operate (10) and Troubleshoot & upgrade (7) are Phase 4** and are not
listed here.

- **Install & deploy (8)** — `UPD self-hosting/index` · `UPD self-hosting/simple-or-full-auth` ·
  `NEW install/images-and-variants` · `SPL install/docker` · `SPL install/linux` ·
  `SPL install/run-as-a-service` · `SPL install/reverse-proxy-and-tls` · `NEW install/verify`
- **Configure (8)** — `UPD configure/index` · `NEW configure/secrets-and-keys` (named for early
  publication in Phase 1 and never written — it starts here) · `NEW configure/authentication` ·
  `NEW configure/sso` · `NEW configure/email` · `NEW configure/secret-options` ·
  `NEW configure/sessions-and-cookies` · `NEW configure/security-headers`
- **Features (10)** — `NEW features/custom-domains` · `NEW features/caddy-on-demand-tls` ·
  `NEW features/incoming-secrets` · `NEW features/branding` · `NEW features/interface-and-homepage` ·
  `NEW features/languages` · `NEW features/multi-region` · `NEW features/billing-and-entitlements`
  (**blocked**, billing catalog) · `NEW features/feedback-channel` · `NEW features/broadcast-banner`

Plus three cheap items that belong to this phase because they are in the tree it touches: backfill
`audience: operator` on the seven inherited self-hosting pages; fix the
`self-hosting/configuration-generator` locale-404 warning; and clear the Phase 2 tail's three unblocked
pages (§2).

**What D2 constrains.** Three of the four defects in
[onetimesecret#3993](https://github.com/onetimesecret/onetimesecret/issues/3993) decide what Phase 3
pages may claim, so the issue's state has to be read at launch rather than assumed:

- `caddy_on_demand` issues no certificate → `features/caddy-on-demand-tls` documents the two strategies
  that work and states plainly that the third does not. It is not written as a supported strategy.
  `features/custom-domains` carries the same caveat.
- `features.domains.strict_strategy` is unreachable by config → not documented as a knob.
- `JOBS_SCHEDULER_ENABLED` / `JOBS_FALLBACK_SYNC` are inert while `docker/README.md:90` and
  `docker-compose.full.yml:253` instruct operators to set them → `install/docker` inherits that
  contradiction and must not repeat the instruction.

---

## 6. The agent team

Phase 2's five-stream design held: every content claim produced by one agent and attacked by a
different one, every structural change checked by a script rather than a reader. Reused with the
weights changed — Phase 3 is research-heavy where Phase 2 was structure-heavy.

```
  A. Operator ledger ─────────► D. Content: 26 pages ──► E. Adversarial verify
     (26 pages' factual spine)     (3 sub-tree squads)      + checker extension

  B. Split & nav mechanics ───► C. Redirects & shim repoint
     (no app source needed — starts immediately)
```

**A — Verification.** The bulk of this phase. Produces claim → `file:line` ledgers against app source,
one per sub-tree, in the format Phase 2 used
(`git show db6fe76:docs/planning/phase-2-ledger/secret-lifecycle.md` is the clearest example: a table
of claim → verdict → evidence, with a scope note and a "do not claim" list). Nothing in stream D may state a
default or a behaviour that is not in a ledger. Every value it records must be labelled
**self-hosted shipped default** unless a code path makes it structural — the distinction Phase 2's
ledgers drew, and the one that keeps hosted claims out of operator pages.

**B — Split & nav mechanics.** Splits `installation.md`; builds the `install/` and `features/` sidebar
groups; backfills `audience: operator`; fixes the configuration-generator locale warning. Needs no app
source — **can start now.**

**C — Redirects & the split's translation cost.** Extends `movedPages`; repoints the two shims (§4.3);
indexes the deleted locale copies (§4.2). Depends on B.

**D — Content.** Three squads, one per sub-tree, one agent per page. Pages that touch behaviour the
ledger does not cover stop and ask rather than infer.

**E — Adversarial verify + checkers.** Tasked with *refuting* each drafted claim. Extends
`check-frontmatter.mjs` with the reciprocal-aside assertion (§4.4) and the operator-scoped default rule
(§4.1). Depends on D.

**Held out of the fan-out:** `features/billing-and-entitlements` and the three billing-blocked pages
from §2. Appended as a sixth stream when the catalog arrives, not designed around now.

---

## 7. What has to be true before launch

1. **App source cloned** — `onetimesecret/onetimesecret`, unshallowed. Gates streams A, D, E.
2. **§4.1 answered** — where do numbers go while the Reference does not exist? A one-line call, and
   the thing most likely to decide whether Phase 3 output ages well. Gates stream D.
3. **onetimesecret#3993 read** — its current state decides what three Phase 3 pages may claim (§5).
4. **The production `etc/billing.yaml` requested** — still outstanding from Phase 2, and now holding
   four unwritten pages rather than two. Gates `features/billing-and-entitlements`,
   `organizations/roles-and-permissions`, `billing/index`, `billing/managing-your-subscription`, and
   the correction of two published pages.

Items 3 and 4 gate named pages only. Item 1 gates content. **Item 2 is the only one that gates the
shape of the work**, and it is cheap to answer.

Streams B and C block on nothing and are where the work should start.
