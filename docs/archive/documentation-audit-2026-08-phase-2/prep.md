# Phase 2 preparation — agent-team workflow

> **Archived 2026-08-09**, unchanged except that its four relative links were repointed from
> `./` to `../../planning/` when it moved out of that directory. It describes a state that no
> longer holds; see [the plan](../../planning/documentation-audit-2026-08.md) for what Phase 2
> actually delivered.

**What this is:** the readiness assessment and execution design for Phase 2 of
[`documentation-audit-2026-08.md`](../../planning/documentation-audit-2026-08.md), written after reading that plan,
its [topic inventory](../../planning/documentation-audit-2026-08-topics.md), and the
[Phase 1 self-analysis](../../planning/documentation-audit-2026-08-self-analysis.md).

Phase 1 shipped as #391–#394. This document does not restate the plan; it records the verified state
Phase 2 starts from, the one dependency that blocks it, and how a team of agents should be structured
so that the discipline which made Phase 1 work — verify against source before editing — survives being
run in parallel.

---

## 1. Verified starting state

Re-measured in-repo rather than taken from the plan:

| | |
|---|---|
| `pnpm check:nav` | OK — 54 sidebar links resolve, 1 warning |
| `pnpm check:orphans` | OK — 60 EN pages, 7 allowlisted orphans |
| Nav warning | `self-hosting/configuration-generator` is served from `src/pages`, so non-EN locales 404 unless redirected |
| `src/content.config.ts` | `docsSchema()` **un-extended** — no `plan`, `audience`, `pageType`, `sourceOfTruth` |
| `config/sidebar.mjs` | 257 lines; all four tier factories still present (`customDomains`, `freePlan`, `identityPlus`, `teamPlus`) |

Phase 1 corrections spot-checked and confirmed in place: `CSP_ENABLED` documented as default true;
`TTL_OPTIONS` space-separated; `:colonels:` auto-promotion gone; the `_onetime-challenge-*` TXT step
present in `custom-domains/setup-guide.md`; `install.sh` confined to `upgrading-v0-24.md`, which is
exactly the tag-era exception Appendix A of the self-analysis argued for.

The page count moved 61 → 60 and orphans 8 → 7, consistent with Phase 1 deleting one page and fixing
the `translations/universal/_index.md` defect. Finding 3 is untouched, as intended — Phase 1 changed no
navigation structure.

**Read: Phase 1 is closed and its output holds. Phase 2 has not started.**

---

## 2. The verification lane

The self-analysis is unambiguous on this point:

> The report is a planning document, not a source of truth. […] anyone executing Phases 2–4 from it
> must re-verify against app source per claim, exactly as Phase 1 did.

Every load-bearing claim in Appendix C — the DLQ discard, `JOBS_SCHEDULER_ENABLED` being inert, the
translation-parity counts, the 304-topic totals — is verifiable against `onetimesecret/onetimesecret`
and nowhere else. Neither repo initially attached to this session is that repo: `onetimesecret.com` is
the marketing site, not the application.

**Resolved.** The app repo is public and readable through the session's git proxy, cloned at
`/workspace/onetimesecret/onetimesecret` (`aafe503`). The three sources the audit scoped on are present
and confirmed: `.env.reference`, `etc/defaults/config.defaults.yaml`, `etc/examples/billing.example.yaml`.

Two operating notes for whoever runs the streams below. The checkout is **shallow** — `git log`,
`blame` and `bisect` need `git fetch --unshallow` first. And it is **read-only**: the D2 defects are
tracked in [onetimesecret#3993](https://github.com/onetimesecret/onetimesecret/issues/3993), and filing
or commenting there needs the repo attached with push access, which this session does not hold.

---

## 3. What `onetimesecret.com` can and cannot arbitrate

The marketing repo was attached for cross-referencing. Scoping it precisely matters, because treating it
as an app-source substitute would reintroduce the exact error class this plan exists to remove.

**Usable as a source:**

| Surface | Serves |
|---|---|
| `src/content/changelog/` (14 entries) | shipped-vs-planned status — e.g. the v0.26 admin console and branding releases |
| `src/data/product/productTiers.ts`, `regionPricing.ts` | what buyers are actually offered and at what price, per region |
| `src/data/product/usecases/`, `src/content/useCases/` | inputs for `share/use-cases` |
| `src/i18n/ui/*.json` | reader-facing product vocabulary, for `start/glossary` |

**Not usable as a source:** anything about app behaviour, defaults, env vars, or config keys. The
marketing site publishes claims; it does not implement them.

### A cross-reference finding, from two independent sources

The docs publish a four-column plan matrix in `pricing/compare-plans.md` — Not signed in / Free /
Identity Plus / Team Plus — including `Member Invites: ✅` and `Members per organization: Up to 50` for
Identity Plus, and `Up to 100` plus SSO, Teams & Shared Dashboard and Workspace Branding for Team Plus.

**Source 1 — the marketing site.** It defines exactly two tiers, `tier-free` and `tier-identity`
(`productTiers.ts:54,80`), and `regionPricing.ts` prices those two and no others in any region. The
string "Team Plus" does not occur anywhere in its `src/`. Its comparison table carries no member,
invite, seat or organization row at all.

**Source 2 — the app repo's example catalog.** `etc/examples/billing.example.yaml` defines two active
plans, `free_v1:182` and `identity_plus_v1:224`; the team tier is present only as a commented-out block
(`:291-318`). `identity_plus_v1`'s entitlement list does **not** include `manage_members` — that
entitlement exists (`:135`) but appears only inside the commented team block (`:307`) — and its limits
are `total_members_per_org: 1`, `role_members_per_org: 0`, `role_admins_per_org: 0`, `organizations: 1`.

Two independent sources, reached by different routes, agree against both published claims. That is the
convergence signal the self-analysis named as the one that earns confidence.

What it still does not do is settle the question. D3's reasoning holds exactly as written: an example
file cannot arbitrate what buyers are sold, and the marketing site is another published claim rather
than the catalog. The production `etc/billing.yaml` remains the only arbiter, and it lives outside all
three repos.

So the honest statement is stronger than the audit's "unverified" but short of Finding 1's "factually
wrong": **two independent sources indicate both claims are wrong, and the production catalog is
required to confirm it.** The actionable consequence is firm either way — **`billing/index` cannot ship
in Phase 2 until the production catalog is requested and read**, and the precondition now covers the
whole matrix rather than the two rows D3 named.

One more, worth a separate line because it is a drift defect in the marketing repo rather than a docs
question: `src/data/product/plans.ts` still defines a legacy `anonymous` / `basic` / `identity` model
with a `$35` identity plan, while `productTiers.ts` uses `tier-free` / `tier-identity` and `Pricing.vue`
links `identity_plus_v1`. Three plan models in one repo. Not a Phase 2 blocker — flagged for the
marketing repo's owner.

---

## 4. Phase 2 scope, as gated

From the plan: 14 top-level entries → 8; billing tier becomes metadata; orphans absorbed; the end-user
task layer gets its first how-tos. Prerequisite: extend `docsSchema()`.

Twelve end-user pages, split by the reachability rule:

- **Seven proceed unconditionally** — `share/what-recipients-see`, `share/when-a-link-doesnt-work`,
  `share/your-receipt`, `account/signing-in`, `account/two-factor-and-passkeys`,
  `account/change-your-email`, `account/close-your-account`.
- **Five held on [D9](../../planning/documentation-audit-2026-08.md#d9--who-owns-the-end-user-task-layer)** —
  `start/send-your-first-secret`, `share/index`, `account/sessions-and-identities`,
  `account/dashboard-and-recent-secrets`, `account/preferences`.

D9 is still open and, per the plan, is needed *before Phase 2 opens* — the slack has now been spent.
The plan's own recommendation is option 3 with a deadline: build the seven, hold the five, and if
in-app guidance is not funded with a date by the time Phase 2 opens, build the five as well. **The
workflow below assumes the seven and treats the five as a tail that can be appended without rework.**

---

## 5. The agent team

Five streams. The design principle is taken from the self-analysis's third takeaway — *where two
independent methods agree, confidence is earned; where the audit stood alone, that is where the errors
were* — so every content claim is produced by one agent and attacked by a different one, and every
structural change is checked by a script rather than by a reader.

```
  A. Verification ──────────► D. Content: the 7 pages ──► E. Adversarial verify
     (Appendix C claims)                                     + checker extension

  B. Schema & nav ──────────► C. Redirects & region merge
     (mechanical — no app source needed, starts immediately)
```

**A — Verification.** Re-verifies the Appendix C claims and every Phase 2 page's factual spine against
app source. Produces a claim → `file:line` ledger. Output is a fact table, not prose. Nothing in stream
D may state a default or a behaviour that is not in this ledger.

**B — Schema & navigation.** Extends `docsSchema()` with `plan`, `audience`, `pageType`,
`sourceOfTruth`; deletes the four tier factories from `sidebar.mjs`; collapses 14 top-level entries to
8; renders `plan` as a sidebar badge using the mechanism already used for ★. Fixes the seven identical
`createLink("overview", …)` labels while in the file. Needs no app source — **can start now.**

**C — Redirects & region merge.** Generates `config/redirects.mjs` from a `movedPages` array rather
than hand-writing ~30 families × 26 locale prefixes. Owns the D1 anchor contract: each region heading is
the bare jurisdiction name so the five retired filenames slugify to their own targets. Also clears the
two known trap entries — the top-level `"/pricing"` sending the bare path off-site, and
`"/getting-started": "/en/introduction"` chaining into a page that will no longer exist. Depends on B.

**D — Content.** One agent per page, seven pages. Each drafts only from stream A's ledger and cites
`file:line` for every factual statement. Pages that touch behaviour the ledger does not cover stop and
ask rather than infer. Depends on A.

**E — Adversarial verify.** Tasked with *refuting* each drafted claim, not confirming it — the pass
that caught 20 claims during the audit and four overclaims during Phase 1. Also extends `check:nav` /
`check:orphans` to assert the new invariants: reciprocal `:::note` asides across the nine
hosted↔operator pairs, and the "Reference owns every default" rule, so a prose page restating a number
fails CI instead of drifting. Depends on D.

**Held out of the fan-out:** `billing/index` (blocked on the production catalog, per §3) and the five
D9 pages. Both are appended as a sixth stream when their gate clears, not designed around now.

---

## 6. What has to be true before launch

1. ~~App source available.~~ **Done** — cloned and confirmed (§2).
2. **D9 answered, or its deadline formally taken.** Yes/no on whether in-app guidance ships inside the
   Phase 2 window, and if yes, who writes it. A product call, not a docs call. Gates five pages; the
   other seven proceed regardless.
3. **The production `etc/billing.yaml` requested** — now for the whole plan matrix, not just the two
   rows D3 named, given the convergent evidence in §3. Gates `billing/index` only.

Neither open item blocks streams A, B or C, which together are the bulk of Phase 2 and where the work
should start.
