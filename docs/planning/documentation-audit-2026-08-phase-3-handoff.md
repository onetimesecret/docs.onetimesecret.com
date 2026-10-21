# Phase 3 handoff — picking this up locally

**What this is:** everything you need to continue Phase 3 on your own machine, written 2026-08-09 at
the point where the remote session stopped. It is deliberately concrete: the facts already
established so you do not re-derive them, the decisions still open, and the exact starting points for
the work that has not begun.

**Superseded in places.** Phase 3 resumed locally on 2026-08-10 and the research pass proved six statements
in this document false — including the `--dry-run` flag in §3, the three-bullet range in §5, and the
`configuration-generator` 404 in §6. Read
[`…-phase-3-decisions.md`](./documentation-audit-2026-08-phase-3-decisions.md) §2 before relying on
anything here.

Read alongside — but not instead of —
[`…-phase-3-prep.md`](./documentation-audit-2026-08-phase-3-prep.md) (the plan) and
[`…-phase-3-reverification.md`](./documentation-audit-2026-08-phase-3-reverification.md) (stream A's
completed pass).

---

## 1. Where things stand

| | |
|---|---|
| Branch | `claude/phase-3-docs-audit-prep-mixz90` |
| PR | [#408](https://github.com/onetimesecret/docs.onetimesecret.com/pull/408), draft, base `develop` |
| Last commit | `55dcd55` — stream A re-verification |
| Checks at handoff | `check:frontmatter` 63 EN pages · `check:nav` 64 links, 1 known warning · `check:orphans` 0 · `pnpm test` 86 passing |

Nothing on this branch touches page content except one `sourceOfTruth` line in `billing/index.md`.
Everything else is planning documents. **No pages have been written, split, moved or deleted.**

### Streams, honestly

| Stream | State |
|---|---|
| **A** — operator ledger | Backward pass over the six tail pages **done**. Its own forward research (the factual spine for the 26 pages) **not started**. |
| **B** — split & nav mechanics | **Not started.** §5 below is reconnaissance I gathered for you, not the plan the prep doc asks stream B to produce. |
| **C** — redirects & shim repoint | **Not started.** Depends on B. Inputs in §6. |
| **D** — content, 26 pages | **Not started.** Blocked on the §4.1 decision. |
| **E** — adversarial verify + checkers | **Not started.** Depends on D. |

---

## 2. Local setup

You need the app repo beside the docs repo. Everything in §3 was verified against a specific commit,
so pin to it if you want the line numbers to match exactly:

```sh
git clone https://github.com/onetimesecret/onetimesecret.git
cd onetimesecret && git fetch --unshallow      # blame/log/bisect need full history
git log -1 --format=%H                          # verified against 6af1fe3 (2026-08-08)
```

The docs repo side is just `pnpm install`. The checks you will live in:

```sh
pnpm check:frontmatter   # audience/pageType/sourceOfTruth + the stated-default rule
pnpm check:nav           # sidebar links resolve
pnpm check:orphans       # every page reachable
pnpm check:locales
pnpm test && pnpm build
```

**Vale did not run in the remote session** (`npx vale` fails with `ENOVERSIONS` there). If you have
it locally, run it over the three planning documents — they have not been prose-linted.

---

## 3. Verified facts — do not re-derive these

All against `onetimesecret@6af1fe3`. Full reasoning in the re-verification document; this is the
lookup table.

**Roles and permissions.** Three roles nest owner ⊃ admin ⊃ member, composed at
`organization_membership.rb:102-106` from `MEMBER_ENTITLEMENTS:72` / `ADMIN_ENTITLEMENTS:79` /
`OWNER_ENTITLEMENTS`. Effective permission is a real set intersection —
`with_materialized_entitlements.rb:13-18`, `org.materialized_entitlements ∩ ROLE_ENTITLEMENTS[role]`.

**Owner invariants, and the surface split that matters.** The in-app API refuses removing *any* owner
(`remove_member.rb:161-166`) and refuses self-removal (`:169-175`); the role-change endpoint accepts
only `member` and `admin` (`update_member_role.rb:29`), refuses changing an owner's role (`:163-171`)
and refuses promoting to owner (`:188-194`). **But the CLI/operations layer is more permissive**: it
only refuses the *sole* owner (`memberships/remove.rb:80` → `support.rb:20-24 sole_owner?`). So a
non-sole owner *can* be removed by an operator. The end-user page's "an owner cannot be removed at
all" is correct for its audience and **must not be repeated on an operator page.**

**Domain scoping is structural, not a role consequence.** `update_member_role.rb:49-50` and
`remove_member.rb:48-49` both refuse `domain_scoped?` actors *before* any role logic runs.

**Ownership transfer is a real command.** `bin/ots org transfer-ownership ORG NEW_OWNER` —
`lib/onetime/operations/org/transfer_ownership.rb` (371 lines) plus
`lib/onetime/cli/org/transfer_ownership_command.rb`. Has `--dry-run` and `--demote-to`
(`SetRole::VALID_ROLES - ['owner']`). Does **not** auto-add the new owner if they are not already an
active member (D28); does **not** remove the outgoing owner (D27). Promotes before demoting so the
sole-owner guard never trips. Idempotent. Transiently fails `bin/ots org doctor` mid-flight. REST
endpoint unbuilt.

**The governing fact for the whole operator tree.** `with_plan_entitlements.rb:44-62` —
`STANDALONE_ENTITLEMENTS` is the full set, granted when billing is disabled or the plan cache is
empty; `:32` says limits return `Float::INFINITY`. Billing is off unless a config turns it on
(`billing_config.rb:41-53`: "Returns false if file doesn't exist or enabled is not set"), and the
production `etc/billing.yaml` is in neither repo. **Stock self-hosted = every entitlement granted,
every limit infinite, role is the whole answer.** This is structural to standalone mode, not a knob.
`BILLING_ENABLED` overrides it and raises `Onetime::ConfigError` on any value other than
`true/1/false/0`.

**Receipts.** The withheld-share-link claim is confirmed exactly at its cited lines and fails closed:
`receipt.rb:93-96` maps `incoming ⇒ shows_share_link: false`, `:98-101` withholds for any unrecognised
source. Two independent gates — `safe_dump_fields.rb:79` (load-bearing on its own, because the
unauthenticated batch endpoint never runs the logic layer) and `show_receipt.rb:322-330`.

**Example catalog line numbers** (`etc/examples/billing.example.yaml`, re-pinned +10 from the prep
doc's originals): `manage_members:145` · `free_v1:192` · `identity_plus_v1:234` · commented
`team_plus_v1:293-330` · `manage_members` inside it `:317` · `identity_plus_v1` limits
`role_admins_per_org:268`, `role_members_per_org:269`, `total_members_per_org:273`.

**#3993** is open, filed 2026-08-04, no comment activity as of 2026-08-09. All four defects stand.

---

## 4. Decisions waiting on you

### 4.1 — where numbers go (blocks stream D, the whole content phase)

The prep doc's §4.1 lays out three options and recommends **option 2 + extending assertion 4**:
operator pages link to the surviving `self-hosting/environment-variables` and `configuration.md`
rather than restating values, and `check-frontmatter.mjs`'s assertion 4 is re-scoped so an
`audience: operator` page writing an ALL_CAPS variable next to a value must link to the page that
owns it.

I asked this in the remote session and the prompt returned "recommended option selected", but the
system flagged that no human input had actually been received, so **I did not build on it.** Treat
§4.1 as open.

For what it's worth, §3's standalone-mode finding makes option 2 look stronger than when the doc was
written: on a stock self-hosted instance the entitlement limits are infinite, so an operator page
that states them is stating a hosted-only number on a self-hosted page — the exact error the rule
exists to prevent.

### 4.2 — where the ownership-transfer page goes

New page, in no stream's scope, discovered by the re-verification pass. It is an operator action, so
it fits Configure — but Operate is where it most naturally belongs and Operate is Phase 4. Either
place it in Phase 3's Configure group or defer it to Phase 4 and note the reciprocal aside will point
at `self-hosting/index` until then.

### 4.3 — the production `etc/billing.yaml`

Still outstanding from Phase 2. Its reach is narrower than it looks (prep doc §7 item 4), and §3
above narrows it further for the operator tree specifically.

---

## 5. Stream B — reconnaissance, not the plan

I gathered the following so you are not starting cold. **This is raw material; stream B's actual
deliverable — exact line ranges per target page, leftover accounting, overlap resolution — has not
been produced.**

### `installation.md` structure (481 lines)

```
 10  ## Deployment Options
 12  ### Docker Deployment
 70  ### Manual Installation          (Debian/Ubuntu and RHEL; systemd at 185-189)
200  ## Reverse Proxy Configuration
204  ### Nginx
278  ### Caddy
307  ### Apache
345  ## SSL/TLS Configuration
347  ### Let's Encrypt (Certbot)
376  ### Custom SSL Certificates
391  ### Redis Configuration          ← note: nested under SSL/TLS. Structural bug.
471  ## Next Steps
```

Two things to notice. **`### Redis Configuration` at 391 is nested under `## SSL/TLS Configuration`**,
which is wrong and is part of why the page reads as six unrelated jobs — the split is a chance to fix
it. And **systemd has no heading of its own** (it is 185-189 inside Manual Installation), so
`install/run-as-a-service` is closer to new writing than to moved content.

### The Phase 1 correction that must survive intact

Lines **244** and **253** carry `proxy_set_header X-Forwarded-For $remote_addr;`. The reasoning is at
**266-268** — three bullets covering why the overwrite is required for the default
`TRUSTED_PROXY_MODE=filter`, the `TRUSTED_PROXY_MODE=depth` exception, and the equivalent Caddy
`header_up X-Forwarded-For {client_ip}` (which appears at 294 and 301). All of this lands on
`install/reverse-proxy-and-tls` and none of it may be paraphrased in transit.

### Locale copies — the split's translation cost

**Seven non-EN copies, and the loss is not uniform.** The prep doc §4.2 frames this as "7 locales ×
a 481-line page"; it is actually five near-complete translations and two stubs:

| Locale | Lines |
|---|---|
| `mi`, `tr`, `uk`, `zh-cn` | 421 |
| `sv` | 420 |
| `da` | 65 |
| `pt-br` | 36 |

(EN is 481. The `self-hosting` tree exists in 17 locales; only these 7 carry `installation.md`.)

### One prep-doc assumption that turns out to be false, in your favour

§5 warns that `install/docker` must not inherit the inert `JOBS_SCHEDULER_ENABLED` /
`JOBS_FALLBACK_SYNC` instruction. **`installation.md` does not currently mention either variable** —
I grepped. The contradiction lives only in the app repo (`docker/README.md:90`,
`docker-compose.full.yml:253`). So this is a "do not import it" constraint, not a "strip it out" one.

### Frontmatter backfill — current state of all seven

None carries `audience`, `pageType` or `sourceOfTruth`. All seven have only `title`, `description`,
and a `sidebar.order`. Note the collision to resolve while you are in there: **`self-hosting/index`
and `simple-or-full-auth` both sit at `sidebar.order: 3`**, as does `installation`
(`environment-variables` and `upgrading-v0-23` both claim 5).

---

## 6. Stream C inputs

`config/redirects.mjs:75-76` holds the two shims, with the comment block at `:70-74` explaining they
exist because non-EN copies of `run-your-own-instance` carry relative `./installation` and
`./configuration` links:

```js
{ from: "start/installation",   to: "self-hosting/installation" },
{ from: "start/configuration",  to: "self-hosting/configuration" },
```

Retiring `self-hosting/installation` in the split makes the first one point at a redirect, and
`assertNoChainedRedirects` fails the build. A shim cannot point at five targets, so each must
repoint at one — probably `install/docker`, since that is where a reader following a stale
installation link most likely wants to land, but that is stream C's call to justify.

The locale-404 warning is `src/pages/en/self-hosting/configuration-generator.astro` — an `.astro`
page, so it is outside the content collection by necessity, not by accident. Read it before choosing
between a redirect entry, a move into the collection, and a per-locale route.

---

## 7. Gotchas

**The subagent fan-out is broken in the remote environment, not in the work.** Every workflow agent
hit a harness fault where the permission handler stripped required parameters from every tool call,
so eight agents returned nothing. Stream A above was done solo as a result. This should not affect
you locally — but if you fan out and see `The required parameter X is missing` on otherwise valid
calls, that is the same fault and not something in your prompts.

**The app repo is read-only through the session proxy.** Filing or commenting on `onetimesecret`
issues needs it attached with push access. Relevant if the transfer-ownership REST gap or the #3993
defects are worth commenting on.

**Two published pages still carry unconfirmable claims** — `pricing/compare-plans`'s four-column
matrix and `custom-domains/access-and-privacy` — both waiting on the catalog. Unchanged by this
session's work.

---

## 8. Suggested order

1. Answer §4.1. It is one line and it gates 26 pages.
2. Stream B, then C — they need no app source and the split unblocks the `install/` group.
3. Stream A forward — the operator ledgers, one per sub-tree, in the archived ledgers' format.
   §3 above is the seed for the organizations/entitlements rows.
4. Stream D, then E.

The cheapest early win is the frontmatter backfill in §5 — seven pages, no research needed beyond
choosing a `pageType`, and it makes the operator tree legible to the checkers before any new page
lands.
