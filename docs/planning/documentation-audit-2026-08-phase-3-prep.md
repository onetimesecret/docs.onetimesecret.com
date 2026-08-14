# Phase 3 preparation — the operator install and configure tree

**What this is:** the readiness assessment for Phase 3 of
[`documentation-audit-2026-08.md`](./documentation-audit-2026-08.md), written after Phase 2 shipped as
[#405](https://github.com/onetimesecret/docs.onetimesecret.com/pull/405). It follows the shape of the
Phase 2 assessment, which moved out of this directory when that phase closed. It, the Phase 2
verification ledgers and the deleted-file index are kept at
[`docs/archive/documentation-audit-2026-08-phase-2/`](../archive/documentation-audit-2026-08-phase-2/) —
[`prep.md`](../archive/documentation-audit-2026-08-phase-2/prep.md),
[`deleted-files.md`](../archive/documentation-audit-2026-08-phase-2/deleted-files.md) and
[`ledger/`](../archive/documentation-audit-2026-08-phase-2/ledger/).

It does not restate the plan. It records the state Phase 3 starts from, the four problems Phase 3 has
that Phase 2 did not, and what has to be true before it opens.

**Amended.** §4.1's recommendation and §4.2's split framing were both overturned by the research pass on
2026-08-10 — the reference pages it proposes linking to are wrong in fourteen places, and the page it
proposes splitting is wrong in twenty-seven. The answers to §4.1, §4.2 and §7 item 2, and the corrections
owed to §5's assumptions, are in
[`…-phase-3-decisions.md`](./documentation-audit-2026-08-phase-3-decisions.md).

---

## 1. Verified starting state

Re-measured in-repo on 2026-08-09, not taken from the plan or from #405's description. Two columns:
the state Phase 2 left, and the state after the six-page tail closed (§2) later the same day.

| | At #405 | Now |
|---|---|---|
| `pnpm check:nav` | OK — 58 links / 14 groups, 1 warning | OK — **64** links / 14 groups, same warning |
| `pnpm check:orphans` | OK — 57 EN pages, **0** allowlisted orphans | OK — **63** EN pages, **0** allowlisted orphans |
| `pnpm check:frontmatter` | OK — 57 EN pages (35 end-user), 8 contracted anchors, 277 redirect fragments | OK — **63** EN pages (**40** end-user), 8 anchors, 277 fragments |
| `pnpm check:locales` | OK — 17 configured locales, 9 allowlisted content-only directories | unchanged |
| `pnpm test` | 86 passed | 86 passed |
| `pnpm build` | clean, 984 pages | clean, **1086** pages |
| Nav warning | `self-hosting/configuration-generator` is served from `src/pages`, so non-EN locales 404 unless redirected — **pre-existing, and now Phase 3's to fix**, since that page sits in the Configure group Phase 3 rebuilds | unchanged |

The six new pages are English-only and add no locale directories; the 102-page build delta is
6 × 17 locales falling back to English, which is the Phase 2 pattern rather than a new one.

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

Phase 2 closed with six of §3's 30 pages unwritten. **All six now exist as shortened pages**, written
after the phase closed rather than carried into Phase 3 — a gap that lives only in a planning document
is a gap nobody reviews.

| Page | What shipped | Still owed |
|---|---|---|
| `organizations/roles-and-permissions` | the three role templates, the plan ∩ role rule, who may change what, domain-scoped memberships, the member limit as a mechanism | screen-level steps for a role change |
| `organizations/ownership-and-transfer` | why the owner cannot be demoted, removed or promoted-to from inside the app; what to send support | the exact support process |
| `share/receiving-secrets` | the choice between asking for a link and running an incoming form; the withheld share link on an incoming receipt | incoming-form setup steps (on the custom-domains page, also short) |
| `billing/index` | a plan applies to an organization, **Plan Features** is authoritative, role gates the rest | the merge of `pricing/index` + `compare-plans` — **blocked**, billing catalog |
| `billing/managing-your-subscription` | where the subscription lives, owner-only, what a plan change does to everyone | payment, invoicing, cancellation — **blocked**, billing catalog |
| `contribute/developer-on-ramp` | the docs-repo on-ramp in full: setup, the four page types, every check and why each exists, the redirect rule | the app-repo half — needs the app repo in hand (`bin/dev`, `bin/setup --test`, the containerized test lanes, the 32 ADRs) |

**What the billing gate turned out to bind.** Three of these were listed as blocked. Re-read against
[D3](./documentation-audit-2026-08.md#d3--billing-catalog), the gate forbids *asserting the catalog* —
not writing about billing. A page can say a plan belongs to an organization, that effective permissions
are plan ∩ role, and that the in-app **Plan Features** panel is the authoritative answer, without
naming a single tier's contents. All three do exactly that and none names one. `pricing/index` and
`pricing/compare-plans` stay as they are: the merge is what the catalog gates.

`features/billing-and-entitlements` remains genuinely blocked — its whole subject is the catalog.

**The cost of that decision, named.** Adding the two billing pages without merging the pricing pages
puts four entries in one sidebar group (`config/sidebar.mjs:262-267`: How plans work · Managing your
subscription · Plans and pricing · Compare plans), and the first and third cover adjacent ground.
`billing/index` describes the mechanism — a plan belongs to an organization, **Plan Features** is
authoritative, role gates the rest — while `pricing/index` lists tier contents, which is the half the
catalog gates. A reader looking for "what do I get" can reasonably land on either. That is the honest
state rather than an oversight: the alternative was withholding the mechanism until the catalog
arrives, and the mechanism is what the rest of the end-user tree needs to link to. It resolves when
the merge happens, which is the same held-out sixth stream (§6) — not a separate cleanup.

**One dangling reference is now closed.** `organizations/audit-trail` had shipped leaning on the
plan ∩ role rule with no page to link to; a reader hitting "your plan includes this but your role
refuses it" had nowhere to go. `organizations/roles-and-permissions` is that page.

Two published pages still carry claims nothing in any repo can confirm — `pricing/compare-plans`'s
four-column matrix, and `custom-domains/access-and-privacy`, where three `**Plan:**` lines were removed
before commit rather than corrected. Both wait on the catalog.

**Where these pages got their facts.** The Phase 2 ledgers, not fresh verification against app source —
`vocabulary-and-orgs` §9 and §10 carry the role templates, the nesting, the endpoint limits and the
plan ∩ role formula with `file:line` evidence, and its "do not claim" list is what kept the tier
contents out. That is the ledgers earning their archive. It also means these six inherit the ledgers'
staleness: they were verified against `onetimesecret@aafe503` in August 2026, and stream A should
re-verify the rows these pages rest on rather than treating them as settled. That pass is scoped in
§6 as A's first work, ahead of its own research.

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

### The billing finding, restated

Phase 2's [assessment](../archive/documentation-audit-2026-08-phase-2/prep.md) carried a two-source
cross-reference that is the reason the billing gate is shut. It is restated here — anyone re-opening
the question needs the evidence in front of them, not a pointer to another file:

The docs publish a four-column matrix in `pricing/compare-plans.md` — including `Member Invites: ✅`
and `Members per organization: Up to 50` for Identity Plus, and `Up to 100` plus SSO, Teams & Shared
Dashboard and Workspace Branding for Team Plus.

- **Marketing repo.** Defines exactly two tiers, `tier-free` and `tier-identity`
  (`productTiers.ts:54,80`); `regionPricing.ts` prices those two and no others in any region. The
  string "Team Plus" occurs nowhere in its `src/`, and its comparison table carries no member, invite,
  seat or organization row at all.
- **App repo example catalog.** `etc/examples/billing.example.yaml` defines two active plans,
  `free_v1:192` and `identity_plus_v1:234`, with the team tier present only as a commented-out block
  (`:293-330`). `identity_plus_v1`'s entitlements do **not** include `manage_members` — the entitlement
  exists at `:145` but appears only inside the commented team block at `:317` — and its limits are
  `total_members_per_org: 1`, `role_members_per_org: 0`, `role_admins_per_org: 0`, `organizations: 1`.
  (Line numbers re-pinned to `onetimesecret@6af1fe3` by the
  [re-verification pass](./documentation-audit-2026-08-phase-3-reverification.md#7-correction-owed-to-the-prep-document);
  the file gained 10 lines above every citation, so all five shifted +10 with no content change.
  That pass also found the commented team block's own `total_members_per_org` is **5**, against the
  published matrix's "Up to 50" and "Up to 100" — the example disagrees with the docs even where it
  is most generous.)

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

Phase 2's [ledgers](../archive/documentation-audit-2026-08-phase-2/ledger/) cover the end-user surface —
vocabulary, secret lifecycle, auth and account, account surfaces. **They do not cover the operator
surface**, so Phase 3 builds its own. Their value here is threefold: as a format precedent, as the place
to check a reader-facing term before an operator page renames it, and as the evidence behind the six
tail pages in §2, which were written from them rather than from fresh verification.

---

## 4. Five problems Phase 3 has that Phase 2 did not

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
Phase 2 used ([`deleted-files.md`](../archive/documentation-audit-2026-08-phase-2/deleted-files.md) is
the template: family, copy count, merge target, then one line per file). Name the cost
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

**Four more pairs arrived with the §2 tail.** Each of these hosted pages already carries its operator
aside; the operator half is Phase 3's or Phase 4's to write, and until it exists the aside points at
`self-hosting/index`, which is honest but thin. They are listed here so the count is nine plus four
rather than nine plus a surprise:

| Hosted page (shipped) | Operator page | Phase |
|---|---|---|
| `share/receiving-secrets` | `features/incoming-secrets` | 3 |
| `organizations/roles-and-permissions` | `features/billing-and-entitlements` | 3, blocked |
| `billing/index` | `features/billing-and-entitlements` | 3, blocked |
| `billing/managing-your-subscription` | `features/billing-and-entitlements` | 3, blocked |

Three of the four converge on one operator page, which makes the asymmetry the rule rather than the
exception — further reason to assert reachability rather than pairing. `organizations/ownership-and-transfer`
is a fifth candidate: it tells a self-hosted reader that ownership transfer is an operator action,
and the operator page that documents the command does not exist in any phase's scope yet.

**And the command turns out to exist.** The re-verification pass found
`bin/ots org transfer-ownership ORG NEW_OWNER` — a 371-line operation at
`lib/onetime/operations/org/transfer_ownership.rb` with a CLI wrapper, `--dry-run`, a `--demote-to`
choice for the outgoing owner, and documented decisions about what it does *not* do (it does not add
the new owner if they are not already a member, and does not remove the outgoing one). The REST
endpoint is unbuilt and the operation's own comment says the UI already tells users to transfer
ownership, "so the gap is real". This is a page Phase 3 should write and no stream currently owns —
see [the pass](./documentation-audit-2026-08-phase-3-reverification.md#61-the-ownership-transfer-command-exists-and-it-is-substantial)
for the behaviour an operator page has to state. It fits Configure or Operate, and Operate is Phase 4,
so it needs a placement call alongside §4.1.

### 4.5 On a stock self-hosted instance, the plan half of plan ∩ role is not a constraint

The finding with the widest reach over the 26 pages, and the one most likely to produce a wrong
operator page if it is missed.

`with_plan_entitlements.rb:44-62` defines `STANDALONE_ENTITLEMENTS` as the *full* entitlement set,
granted whenever billing is disabled or the plan cache is empty; `:32` adds that limits return
`Float::INFINITY` in that mode. And billing is off unless a billing config turns it on
(`billing_config.rb:41-53` — "Returns false if file doesn't exist or enabled is not set"), while the
production `etc/billing.yaml` ships in neither repo. So the stock self-hosted state is: every
entitlement granted, every limit infinite, **role is the whole answer.**

Three consequences for Phase 3:

1. This is **structural** to standalone mode, not a shipped default an operator tunes. An operator
   page that presents entitlements as something the operator configures would be wrong in the
   direction the audit exists to prevent.
2. It narrows the billing gate over the *operator* tree specifically. Operator pages do not need the
   catalog to say what a self-hosted operator gets, because a self-hosted operator with billing off
   gets everything. The gate still binds every claim about hosted tiers.
3. The hosted framing does not transfer. `organizations/roles-and-permissions` is built on "a feature
   you are paying for can still be refused"; its operator counterpart has to invert it. Every
   reciprocal aside in the table above crosses that boundary, so this is a per-page hazard, not a
   one-page correction.

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

Plus two cheap items that belong to this phase because they are in the tree it touches: backfill
`audience: operator` on the seven inherited self-hosting pages, and fix the
`self-hosting/configuration-generator` locale-404 warning. (Clearing the Phase 2 tail was a third; it
is done — see §2.)

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
([`ledger/secret-lifecycle.md`](../archive/documentation-audit-2026-08-phase-2/ledger/secret-lifecycle.md)
is the clearest example: a table of claim → verdict → evidence, with a scope note and a "do not claim"
list). Nothing in stream D may state a
default or a behaviour that is not in a ledger. Every value it records must be labelled
**self-hosted shipped default** unless a code path makes it structural — the distinction Phase 2's
ledgers drew, and the one that keeps hosted claims out of operator pages.

**A also owes one backward-looking pass.** The six §2 tail pages were written from the Phase 2 ledgers
rather than from fresh reads, so they carry those ledgers' pin to `onetimesecret@aafe503`. Once the app
source is cloned, re-verify the rows they rest on against `HEAD` before the phase's own research
starts — it is the cheapest moment to do it, the clone is already in hand, and a drifted row propagates
into the operator pages that link to these. Concretely, from
[`ledger/vocabulary-and-orgs.md`](../archive/documentation-audit-2026-08-phase-2/ledger/vocabulary-and-orgs.md)
§9 and §10: the three role templates and what each may change, the plan ∩ role formula,
domain-scoped memberships, the member limit as a mechanism, the owner-cannot-be-demoted invariants,
the endpoint limits, and the three `sourceOfTruth` citations on `billing/index` (entitlement grant,
the **Plan Features** panel, billing being switchable off). Record the result as a diff against the
archived rows — confirmed, moved, or gone — rather than a new ledger; anything that moved is a
correction to a published page, not a note.

**Done — see [`…-phase-3-reverification.md`](./documentation-audit-2026-08-phase-3-reverification.md).**
No claim on any of the six pages is wrong at HEAD. One `sourceOfTruth` range was mis-aimed and has
been repointed (`billing/index`), §3's example-catalog line numbers have been corrected above, and
the pass turned up two scope findings: the ownership-transfer CLI command exists and is unscoped
(§4.4 below), and standalone mode grants every entitlement with infinite limits, which is the
governing fact for the operator tree (§4.5).

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

**Held out of the fan-out:** `features/billing-and-entitlements`. Appended as a sixth stream when the
catalog arrives, along with the merge of the pricing pages into `billing/index` and the correction of
`pricing/compare-plans` and `custom-domains/access-and-privacy` — not designed around now.

---

## 7. What has to be true before launch

1. ~~**App source cloned**~~ — **done.** `onetimesecret@6af1fe3` (2026-08-08), fully unshallowed,
   157 commits past the ledgers' `aafe503` pin. Its first use was the re-verification pass over the
   six §2 tail pages, which is [complete](./documentation-audit-2026-08-phase-3-reverification.md).
2. **§4.1 answered** — where do numbers go while the Reference does not exist? A one-line call, and
   the thing most likely to decide whether Phase 3 output ages well. Gates stream D.
3. ~~**onetimesecret#3993 read**~~ — **done, and nothing has moved.** Read 2026-08-09: still open,
   filed 2026-08-04 as "Four operator-facing surfaces contradict the code", no comment activity. All
   four defects stand as §5 assumes, so the three constrained pages are constrained exactly as
   written. The issue's fourth defect — the DLQ consumer silently discarding non-auth templates
   (`dlq_email_consumer_job.rb:151-155`) — is not in §5's list and belongs to Phase 4's Operate
   group; noted so it is not lost.
4. **The production `etc/billing.yaml` requested** — still outstanding from Phase 2. Its reach is now
   narrower than it looked: it gates `features/billing-and-entitlements` outright, the merge of the
   pricing pages into `billing/index`, the completion of `billing/managing-your-subscription`'s payment
   and cancellation sections, and the correction of `pricing/compare-plans` and
   `custom-domains/access-and-privacy`. It does not gate writing about billing (§2).

Items 3 and 4 gate named pages only. Item 1 gates content. **Item 2 is the only one that gates the
shape of the work**, and it is cheap to answer.

Streams B and C block on nothing and are where the work should start.
