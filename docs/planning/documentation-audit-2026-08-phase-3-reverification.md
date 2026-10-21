# Phase 3 stream A — re-verification of the six tail pages

**What this is:** the backward-looking pass
[`documentation-audit-2026-08-phase-3-prep.md`](./documentation-audit-2026-08-phase-3-prep.md) §6
assigns to stream A as its first work, ahead of its own research.

The six pages written after Phase 2 closed were built from the Phase 2 ledgers rather than from fresh
reads, so they inherit those ledgers' pin to app commit `aafe503`. This re-checks the rows they rest
on against app `HEAD`.

It is a **diff against the archived rows**, not a new ledger. Rows that hold are recorded as holding
so nobody re-does the work; rows that moved are corrections to published pages.

| | |
|---|---|
| Ledger pin | `onetimesecret@aafe503` (`fix(workspace): keep recipient field in generate-password mode (#4010)`) |
| Verified against | `onetimesecret@6af1fe3`, 2026-08-08 |
| Distance | **157 commits** |
| Verified on | 2026-08-09, full unshallowed clone |

**Verdicts used:** `confirmed` (true at HEAD, same `file:line`) · `moved` (true, different `file:line`)
· `changed` (no longer accurate) · `gone` · `unverifiable`.

**Headline: no claim on any of the six pages is wrong.** Every behavioural row holds at HEAD. The
corrections below are citation-level — one mis-aimed `sourceOfTruth` range, and a planning document
whose line numbers have drifted — plus two findings that expand Phase 3's scope rather than contradict
it.

---

## 1. Drift survey

The mechanical question first: of the files the six pages cite, which changed at all between
`aafe503` and `HEAD`?

| File | Changed? |
|---|---|
| `lib/onetime/models/organization_membership.rb` | unchanged |
| `lib/onetime/models/organization.rb` | unchanged |
| `lib/onetime/models/organization/features/with_plan_entitlements.rb` | unchanged |
| `lib/onetime/models/organization_membership/features/with_materialized_entitlements.rb` | unchanged |
| `lib/onetime/operations/org/transfer_ownership.rb` | unchanged |
| `apps/api/organizations/logic/members/*` | unchanged |
| `lib/onetime/models/receipt.rb` | unchanged |
| `lib/onetime/models/receipt/features/safe_dump_fields.rb` | unchanged |
| `apps/api/v2/logic/secrets/show_receipt.rb` | unchanged |
| `src/shared/composables/useEntitlements.ts` | unchanged |
| `locales/content/en/workspace-billing.json` | **+18 lines** |
| `etc/examples/billing.example.yaml` | **+10 lines** |

Only two moved, and neither moved for a reason that touches a documented claim — the locale file
gained yearly-billing-interval and currency-migration-refund strings, the example catalog gained
`automatic_tax` and `payment_method_configuration` keys. Both insertions land *above* every line the
docs cite, which is why the effect is pure line-number shift.

---

## 2. `organizations/roles-and-permissions`

| Claim | Archived evidence | HEAD evidence | Verdict |
|---|---|---|---|
| Three roles, nesting owner ⊃ admin ⊃ member | `organization_membership.rb:72-106` | same — `MEMBER_ENTITLEMENTS:72`, `ADMIN_ENTITLEMENTS:79`, `ROLE_ENTITLEMENTS:102-106` composing them with `\|` | confirmed |
| Effective permission = plan ∩ role | `with_materialized_entitlements.rb:13-18` | same, verbatim: `membership.entitlements = org.materialized_entitlements ∩ ROLE_ENTITLEMENTS[role]` | confirmed |
| Role-change screen accepts **member** and **admin** only | `update_member_role.rb:29,154-192` | same — `VALID_ROLES = %w[member admin]` at `:29`, enforced `:154-162` | confirmed |
| You cannot change an owner's role there | `update_member_role.rb:154-192` | `:163-171`, `cannot_change_owner_role` | confirmed |
| You cannot promote to owner there | `update_member_role.rb:154-192` | `:188-194`, `cannot_promote_to_owner` | confirmed |
| An owner cannot be removed at all | not separately cited | `remove_member.rb:161-166`, `cannot_remove_owner` — unconditional | confirmed, **with an operator caveat, see §6.2** |
| Nobody can remove themselves through the member list | not separately cited | `remove_member.rb:169-175`, `cannot_remove_self` | confirmed |
| The last owner cannot be demoted | not separately cited | `set_role.rb:42-43` → `support.rb:20-24` `sole_owner?` | confirmed |
| A domain-scoped membership is barred from member management whatever its role | not separately cited | `update_member_role.rb:49-50` and `remove_member.rb:48-49`, both `domain_scoped_forbidden`, checked before any role logic | confirmed |

All three `sourceOfTruth` ranges in this page's frontmatter resolve at HEAD and support what they are
attached to. **No correction needed.**

Worth recording for the operator pages: the domain-scope refusal is evaluated *before* the role
check in both endpoints, so it is structural rather than a role consequence. The page's "whatever
their role otherwise" is exactly right.

---

## 3. `organizations/ownership-and-transfer`

| Claim | HEAD evidence | Verdict |
|---|---|---|
| The owner cannot be demoted from inside the app | `set_role.rb:42-43`, sole-owner refusal; `update_member_role.rb:163-171` for the in-app path | confirmed |
| The owner cannot be removed from inside the app | `remove_member.rb:161-166` | confirmed |
| Nobody can be promoted to owner from inside the app | `update_member_role.rb:188-194` | confirmed |
| Ownership transfer is an operator action; contact support | see §6.1 — **the operator action now has a documented command** | confirmed, but understated |

---

## 4. `billing/index`

| Citation as published | Verdict |
|---|---|
| `with_plan_entitlements.rb:48-56` — *"the plan grants capabilities to the organization"* | **mis-cited** — see below |
| `useEntitlements.ts:16-44` + `locales/content/en/workspace-billing.json` — *"the in-app panel is titled Plan Features"* | confirmed |
| `with_entitlements.rb:149-153` — *"billing can be switched off entirely, which is the self-hosted default"* | confirmed |

**The mis-citation.** `with_plan_entitlements.rb:48-56` is stable — the file is byte-identical since
`aafe503` and line 48 is `STANDALONE_ENTITLEMENTS` at both commits. But that constant is the
*standalone-mode full-access set*, not the plan-grant mechanism the page attaches it to. The line
range is right about nothing having moved and wrong about what lives there.

The claim's real evidence is the resolution order at `with_plan_entitlements.rb:181-212`, whose own
comment enumerates it: billing disabled → `STANDALONE_ENTITLEMENTS` (`:181`, `:200`); no planid →
`FREE_TIER_ENTITLEMENTS` (`:183`, `:212`). **Action: repoint the first `sourceOfTruth` clause to
`:181-212`.** The page's prose is correct as written; only the citation needs moving.

**"Plan Features" confirmed and unmoved.** The string is at `workspace-billing.json:59`, and both
hunks of the +18-line diff land at `:396` and `:1037` — far below it. `useEntitlements.ts:16-44` is
the entitlement→label map that populates the panel and is unchanged. The pairing is correct: the map
supplies the rows, the locale file supplies the title.

**"Billing off is the self-hosted default" confirmed, and it is a shipped default, not structural.**
`with_entitlements.rb:149-153` is `billing_enabled?` delegating to
`Onetime::BillingConfig.instance.enabled?`. The default lives one layer down at
`billing_config.rb:41-53`, whose contract is documented in its own comment: *"Returns false if file
doesn't exist or enabled is not set."* Since the production `etc/billing.yaml` ships in neither repo,
a stock self-hosted instance has no billing config and billing is therefore off. `BILLING_ENABLED`
overrides it, and any value other than `true/1/false/0` raises `Onetime::ConfigError` rather than
silently disabling — a detail an operator page will need and no page currently states.

---

## 5. `share/receiving-secrets`

The security-relevant page. All three citations resolve **exactly** at the published line numbers,
and all three files are unchanged since `aafe503`.

| Citation as published | HEAD | Verdict |
|---|---|---|
| `receipt.rb:93-101` — `SOURCE_CAPABILITIES`, incoming ⇒ `shows_share_link: false` | `:93-96` the map, `:98-101` `WITHHELD_CAPABILITIES` | confirmed |
| `safe_dump_fields.rb:66-67,79` | `:66-67` `custid`/`owner_id`, `:79` `secret_identifier` | confirmed |
| `show_receipt.rb:322-330` | `share_path`/`share_url` gated on `link_visible` | confirmed |

The claim is not only true but **defended in depth**, which strengthens rather than qualifies it:

- The default is withholding, not showing — `WITHHELD_CAPABILITIES` catches any unrecognised
  `source` value (`receipt.rb:98-101`), so a typo or an unshipped future source fails closed.
- The `safe_dump` gate at `:79` is load-bearing independently of the logic layer. Its own comment
  says why: the unauthenticated batch endpoint `V3::Logic::Secrets::ShowMultipleReceipts` serializes
  via `safe_dump` and *never runs the logic-layer gate*.

**No correction needed.** If anything the page undersells the guarantee.

---

## 6. Two findings that change Phase 3's scope

### 6.1 The ownership-transfer command exists, and it is substantial

The prep doc (§4.4) records `organizations/ownership-and-transfer` as a reciprocal-aside candidate
whose operator counterpart "does not exist in any phase's scope yet," on the understanding that the
transfer is a support-mediated action.

It is a shipped CLI command: **`bin/ots org transfer-ownership ORG NEW_OWNER`**, implemented in a
371-line operation at `lib/onetime/operations/org/transfer_ownership.rb` with a CLI wrapper at
`lib/onetime/cli/org/transfer_ownership_command.rb`.

The operation's own header documents behaviour an operator page would have to state, and which
nothing in the docs currently does:

- `--demote-to` chooses the outgoing owner's new role, from
  `SetRole::VALID_ROLES - ['owner']` (`:111-116`) — deliberately sourced from `SetRole` rather than
  forked, so the two cannot drift.
- The new owner is **not** auto-added if they are not already an active member (decision D28) —
  the operator must create the membership first.
- The outgoing owner is **not** removed (decision D27); `--demote-to` has no `remove` value.
- The operation is idempotent and demotes **all** other active owners, so a partially-applied
  transfer can be re-run.
- It promotes first and demotes second, because demote-first would trip the sole-owner guard
  (`:36-40`) — the org has a live owner at every instant.
- There is a `--dry-run` (`:137`).
- A transfer transiently fails `bin/ots org doctor` mid-flight (`:43-46`).

The app's own comment at `:19-24` notes the REST endpoint is unbuilt (`(future) POST
/api/colonel/organizations/:org_id/transfer-ownership`) and that the UI "already tells end users to
transfer ownership, so the gap is real."

**Consequences.**

1. `organizations/ownership-and-transfer`'s "what to send support" is correct for hosted readers but
   incomplete for self-hosted ones, who can run the command themselves.
2. Phase 3 gains a page that is in no stream's scope. It fits the Configure or an Operate group;
   Operate is Phase 4, so this needs a placement call.
3. It is a clean reciprocal-aside pair, adding a fifth to §4.4's "nine plus four."

### 6.2 Standalone mode grants every entitlement — including `manage_members`

`with_plan_entitlements.rb:44-47,48-62`: `STANDALONE_ENTITLEMENTS` is the full set, and its comment
states the design — *"When billing is disabled or plan cache is empty, users get full access"*, and
it must include everything in `ROLE_ENTITLEMENTS` (ADR-012) *"so the membership intersection (org ∩
role) doesn't exclude member-level ones."* `:32` adds that limits return `Float::INFINITY` in this
mode.

Combined with §4 — billing off is the stock self-hosted state — this is the single most important
fact for the operator tree, and no page states it:

> On a self-hosted instance with no billing configured, the plan half of plan ∩ role is not a
> constraint. Every entitlement is granted to the organization and every limit is infinite, so a
> member's effective permissions are decided by their role alone.

**Consequences.**

1. It is a **structural** behaviour of standalone mode, not a shipped default an operator tunes.
   Getting this backwards on an operator page is precisely the error the audit exists to prevent.
2. It narrows the billing gate's reach for the operator tree specifically. Phase 3's operator pages
   do not need the catalog to state what a self-hosted operator gets, because a self-hosted operator
   with billing off gets everything. The gate still binds anything about *hosted* tiers.
3. `roles-and-permissions`'s framing — "a feature you are paying for can still be refused" — is a
   hosted framing. Its operator counterpart has to invert it: on a stock self-hosted instance the
   plan never refuses anything, and role is the whole answer.

---

## 7. Correction owed to the prep document

§3 of the prep doc cites `etc/examples/billing.example.yaml` by line number, recorded at `aafe503`.
The file gained 10 lines at `:51-60`, so **every citation below the insertion has shifted by exactly
+10**. Content is unchanged in all cases — verdict `moved`, not `changed`.

| Cited as | Correct at HEAD |
|---|---|
| `manage_members` entitlement defined at `:135` | `:145` |
| `free_v1` at `:182` | `:192` |
| `identity_plus_v1` at `:224` | `:234` |
| commented team block at `:291-318` | `:293-330` (`team_plus_v1` at `:293`) |
| `manage_members` inside the team block at `:307` | `:317` |

The substance of the billing finding is **unaffected and still holds**: the two active plans are
still exactly `free_v1` and `identity_plus_v1`, the team block is still commented out, and
`identity_plus_v1`'s limits are still `total_members_per_org: 1` (`:273`), `role_admins_per_org: 0`
(`:268`), `role_members_per_org: 0` (`:269`).

One detail sharpens the finding rather than changing it: the commented team block's own
`total_members_per_org` is **5** (`:325`), against the published matrix's "Up to 50" and "Up to 100".
The example file disagrees with the docs even where it is most generous. This is still an example
file and still cannot arbitrate what buyers are sold — [D3](./documentation-audit-2026-08.md#d3--billing-catalog)
holds unchanged.

---

## 8. What this pass did not cover

Stated so the gap is visible rather than assumed closed:

- **`billing/managing-your-subscription`** — not re-verified. Its subject is the hosted subscription
  surface, which the billing gate already holds open, and the two facts it turns on (owner-only,
  plan change applies to everyone) are corollaries of rows confirmed in §2.
- **`contribute/developer-on-ramp`** — not re-verified. Its claims are about the *docs* repo, which
  is not pinned to `aafe503`, so the staleness this pass exists to check does not apply. Its owed
  app-repo half is now unblocked (the clone is on disk) but is writing work, not verification.
  Its "32 ADRs" figure is unchecked and should be counted, not repeated.
- **`organizations/roles-and-permissions`'s member-limit rows** — the enforcement path is confirmed
  (`total_members_per_org` and the per-role caps exist and are read), but the *values* were not
  re-derived, because on a self-hosted instance §6.2 makes them infinite and on hosted they are
  catalog-gated. The page states the limit as a mechanism and no number, which remains correct.
