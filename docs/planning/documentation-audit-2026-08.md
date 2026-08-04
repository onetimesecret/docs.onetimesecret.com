# Documentation audit — August 2026

**Question asked:** we have shipped many features with no documentation. Which topics are missing, and
how should the docs site be restructured to hold them?

**Scope:** the product's full configuration surface (`.env.reference`, `etc/defaults/config.defaults.yaml`,
`etc/defaults/auth.defaults.yaml`, `etc/defaults/logging.defaults.yaml`, `etc/examples/`, 194 internal
specs/ADRs/runbooks, `CHANGELOG.rst`, and implementation code where a config comment was ambiguous)
compared against the 61 published English pages and the sidebar in `config/sidebar.mjs`.

**Method:** nine parallel domain surveys, one docs-IA baseline pass (including a study of Kinde, Linear,
Sentry, Stripe, Supabase, Tailscale and Vault), three competing IA proposals, a synthesis, then an
adversarial verifier tasked with *refuting* every claimed gap and a completeness critic tasked with
finding what the surveys missed. Both adversarial passes landed hits; their corrections are applied
below and recorded in Appendix A rather than quietly dropped.

**Status — revised 2026-08-04.** The nine decisions this audit raised have been answered. Eight are
settled; their consequences are applied throughout the plan below and the reasoning is recorded in
[Decisions](#decisions). One — who owns the end-user task layer — remains open and gates five pages in
Phase 2; an interim posture is defined so nothing else waits on it.

---

## Headline numbers

| | |
|---|---|
| Features / behaviours catalogued | **305** |
| Undocumented (absent from `en/` entirely) | **183** |
| Partial (mentioned but not usable from the docs alone) | **121** |
| Published statements that are **factually wrong** | **~25** |
| Env vars in `.env.reference` | **353** |
| Env vars documented on the site | **149**, of which **19** are no longer supported |
| Published English pages | 61, of which **8 are orphaned** (not in the sidebar) |
| Top-level sidebar entries | 14 |

Three findings, in descending order of harm.

---

## Finding 1 — the docs publish statements that are wrong

This outranks the coverage gap. A reader who finds nothing goes looking; a reader who finds a wrong
command follows it. Each of these was verified against source this session:

| Published claim | Reality | Consequence |
|---|---|---|
| `TTL_OPTIONS` is comma-separated (`environment-variables.md:447`) | parser is `ttl_options.split(/\s+/)` (`lib/onetime/config.rb:470`) | operator's whole expiration menu silently collapses to a single 5-minute option |
| `CSP_ENABLED (default: false)` (`configuration.md:275`) | shipped default is `!= 'false'`, i.e. **true** (`config.defaults.yaml:447`) | operators disable CSP believing they are enabling it |
| `SENTRY_SAMPLE_RATE=1.0`, `SENTRY_MAX_BREADCRUMBS=50` | shipped `0.10` and `5` (`config.defaults.yaml:1261`) | 10× Sentry bill for anyone copying the block |
| `rake ots:init`, `./install.sh init\|doctor` | do not exist — real commands are `rake ots:secrets`, `bin/setup --init\|--doctor` | `install.sh` is invoked four times across the docs and is not in the repo |
| `bin/ots doctor`, `bin/ots customer create\|promote` | not registered commands | dead-end for a new operator |
| `:colonels:` auto-promotion (`getting-started.md:93`) | removed from the product | new self-hoster ends up with **no admin account** |
| "no manual step needed" for password migration (`upgrading-v0-24.md:244`) | `bin/ots customers sync-auth-accounts --run` is required | **every pre-existing user locked out** after upgrade |
| nginx snippet uses `$proxy_add_x_forwarded_for` (`installation.md:244,253`) | appends rather than overwrites | resolved client IPs become spoofable |
| three removed `UI_HOMEPAGE_*` vars still published as settable | removed | under the default `DEPRECATED_CONFIG_MODE=strict` a removed key **refuses boot** |
| `team/audit-log.md` says "Status: Planned" | shipped in 0.26.0 and since renamed | advertises an unshipped feature that shipped |

Underneath: `configuration.md` is 636 lines of which **596 are one unbroken YAML fence** with no
headings or anchors, and it is already missing five whole upstream stanzas (`brand:`, `jobs:`,
`diagnostics:`, `development:`, `compatibility:`). `environment-variables.md` stacks a v0.25 dump on a
contradictory v0.24 section. Both are hand-copied forks of files that keep changing. **You cannot fix
copy-drift with better writing, only by deleting the copy** — which is why the plan below ends in a
generated reference.

Two live navigation defects found while mapping: `sidebar.mjs:217` links a path with no backing
content-collection file, and `sidebar.mjs:251` links `translations/universal`, whose landing page is
named `_index.md` — and Astro content collections skip underscore-prefixed files, so the section has no
index to resolve to. Its five sibling guidance pages (`voice-and-tone.md`, `quality-checklist.md`,
`brand-terms.md`, `secret-concept.md`, `password-passphrase.md`) do exist and do build, but the sidebar
links only the unresolvable parent, leaving all five unreachable from navigation.

---

## Finding 2 — 183 features have no page at all

Zero-hit greps across the entire `en/` tree: `TXT` · `passkey` · `DLQ` · `sqlite` · `password reset` ·
`suppress` · `catalog` · `429` · `Retry-After` · `TRUSTED_PROXY` · `HEALTH_TRUSTED_CIDR` ·
`STANDALONE_ENTITLEMENTS`. `BRAND` returns two hits, both a URL constant — so the entire
17-variable branding subsystem plus brand packs is absent.

The `TXT` result is the most expensive single gap on the site: the product UI presents the
`_onetime-challenge-*` TXT ownership record **first**, verification cannot complete without it, and
`custom-domains/setup-guide.md` never mentions it. Every customer following that page exactly sits at
*Pending* forever.

Gap density by domain:

| Domain | Features | Undocumented | Partial | Critical |
|---|---|---|---|---|
| Organizations, teams, entitlements, billing & admin | 35 | 24 | 11 | 9 |
| Background jobs, scheduler & maintenance | 37 | 29 | 8 | 4 |
| Observability, diagnostics & logging | 35 | 23 | 12 | 5 |
| HTTP security, sessions, middleware & network | 29 | 21 | 8 | 5 |
| Branding, interface & internationalization | 34 | 20 | 14 | 3 |
| Email delivery, providers & deliverability | 32 | 19 | 13 | 4 |
| Secrets, cryptography & key management | 32 | 17 | 14 | 6 |
| Custom domains, regions & incoming secrets | 33 | 16 | 17 | 6 |
| Authentication & identity | 38 | 14 | 24 | 6 |

The full topic-by-topic inventory is in
[`documentation-audit-2026-08-topics.md`](./documentation-audit-2026-08-topics.md).

There is also **no task layer**. Across 61 pages there are five genuine how-tos and four of those are
for operators. No page walks an end user through creating a secret, choosing a TTL, setting a
passphrase, using the receipt, or burning a link — the product's core action.
`introduction/index.md` is titled "Getting Started" and contains zero steps.

---

## Finding 3 — the navigation encodes the price list, not the product

`sidebar.mjs:122-142` files pages under the billing tier that unlocks them. Consequences:

- Eleven pages that all live at `/custom-domains/` URLs are scattered across **four** nav groups. The
  file's own comment concedes the URL and the nav path disagree.
- Two of the four "Team Plus" pages advertise features from permanent top-level navigation.
- The taxonomy needed a fudge on its first collision: `audit_logs` belongs to no plan and was parked
  under Team Plus by fiat.
- Repricing rewrites navigation and invalidates every deep link.

Meanwhile seven top-level slots go to Regions, five of which are one 43–47 line template; the whole REST
API is a 30-line redirect notice carrying the same nav weight as all of Self-Hosting; and 378 lines of
SDK examples sit in a one-item group called "Resources".

**Recommendation: billing tier becomes metadata, never navigation** — a `plan:` frontmatter field
rendered as an inline sidebar badge (the badge mechanism already exists and is used for ★ on
`brand-guide` and `sso`), plus one *Plans & billing* section for the commercial mechanics.

---

## Recommended information architecture

**14 top-level entries → 8.** Read as a sequence: evaluate → use → operate → integrate → verify.

```
Home
Start here
Using Onetime Secret ─ Sharing secrets · Your account · Organizations & members
                       Custom domains · Plans & billing
Self-hosting ────────── Install & deploy · Configure · Features · Operate
                       Troubleshoot & upgrade
API & SDKs
Reference
Trust & security
Translations & contributing
```

Five rules govern everything below.

1. **The audience fork is made once, early, and named.** *Start here* ends with a decision page;
   thereafter *Using Onetime Secret* is the hosted surface and *Self-hosting* is the operator surface.
   These are not variants of one tree. For "add a custom domain", the hosted admin reads a five-step
   DNS wizard; the operator chooses among three validation strategies, one of which (`passthrough`,
   the default) performs no ownership check at all. Disjoint procedures, disjoint prerequisites,
   disjoint failure modes.
2. **Shared mechanism is stated once and linked to.** Nine hosted↔operator feature pairs (custom
   domains, SSO, incoming secrets, email sender, sign-in/sign-up config, branding, homepage modes,
   secret options, regions) carry reciprocal `:::note` asides in both directions — assertable in
   `bin/check-links.sh` alongside the existing lychee run.
3. **Reference owns every default and every value.** Prose pages state consequences and link to the
   generated row; they never restate a number. Without this rule the mirrored pages drift straight
   back to the state this plan exists to fix.
4. **Billing tier is metadata, never navigation.**
5. **Titles lead with the reader's words, not internal vocabulary.** "Receipt" and "Secret Activity"
   are terms the product renamed *to*; the page titles seed the synonyms a reader would actually
   search ("private link", "burn a secret", "did they open my link", "audit log").

### The tree

Legend — `NEW` · `UPD` update in place · `MOV` moved · `MRG` merged in · `SPL` split out.

#### 1. Home · 1 page
`UPD` `en/index.mdoc` — route by intent (evaluate / use / integrate / operate) instead of restating the
marketing site. Its current paid CTA points at `pricing/index.md`, which is an orphan.

#### 2. Start here · 5 pages
| | Page | Covers |
|---|---|---|
|`MRG`|`start/index`|absorbs `docs-overview` + `introduction/index` + `introduction/guides`|
|`NEW`|`start/send-your-first-secret` **†**|the product's core action, end to end — gated on [D9](#d9--who-owns-the-end-user-task-layer-open)|
|`MRG`|`start/run-your-own-instance`|absorbs `self-hosting/getting-started`|
|`MOV`|`start/hosted-or-self-hosted`|from `self-hosting/self-hosting-vs-hosted`|
|`NEW`|`start/glossary`|receipt vs private link vs metadata; passphrase vs password; organization vs workspace vs team; colonel vs admin vs staff; entitlement vs permission vs capability; Secret Activity vs Security Events; canonical vs custom domain|

The glossary is the cheapest fix in the plan. A dozen contested terms are currently disambiguated only
inside long pages, reachable only by already knowing which page hides them.

#### 3. Using Onetime Secret · 30 pages

Pages marked **†** are gated on [D9](#d9--who-owns-the-end-user-task-layer-open). Eleven of the twelve
contested end-user pages are in this section — the twelfth, `start/send-your-first-secret`, is in *Start
here* and is also gated — and the seven unmarked ones proceed regardless of how D9 lands. The rule that
separates them is stated after *Your account*.

**Sharing secrets** (7) — `UPD share/index` **†** (rewritten as a procedure) · `NEW share/your-receipt`
(private link, burn, one-time reveal of a generated password, `GENERATED_VALUE_DISPLAY_TTL`) ·
`NEW share/what-recipients-see` · `NEW share/when-a-link-doesnt-work` (the unified "no longer
available" response and the deliberate absence of an existence oracle — highest-volume support
deflection page on the site) · `SPL share/receiving-secrets` · `MOV share/use-cases` ·
`MOV share/why-secret-links`

**Your account** (8) — `NEW account/signing-in` (incl. password reset, absent today) ·
`NEW account/two-factor-and-passkeys` (TOTP, recovery codes, WebAuthn — `passkey` has zero hits) ·
`NEW account/sessions-and-identities` **†** · `NEW account/dashboard-and-recent-secrets` **†** ·
`NEW account/change-your-email` · `NEW account/close-your-account` · `NEW account/preferences` **†** ·
`MOV account/change-your-region`

> Email change and account deletion are both shipped, both irreversible, and both absent. "How do I
> delete my account and my data" is the question a privacy-first product is most expected to answer,
> and the site currently cannot.

**The rule.** In-app guidance can only reach a signed-in user inside a working flow. Everything a
recipient without an account, a user who cannot sign in, or an evaluator who has not signed up needs
must live in the docs, because the product has no way to show it to them. Applying that rule splits the
twelve contested pages cleanly: `share/what-recipients-see` and `share/when-a-link-doesnt-work` serve
recipients who have no account; `account/signing-in` (password reset) and
`account/two-factor-and-passkeys` (recovery codes, MFA lockout) serve users who are locked out by
definition; `account/change-your-email` and `account/close-your-account` are irreversible actions people
research *before* performing; and `share/your-receipt` documents behaviour — burn, one-time reveal,
`GENERATED_VALUE_DISPLAY_TTL` — that no screen states. None of those seven is a duplicate of in-app
guidance under any answer to D9. The five marked **†** are in-flow UI walkthroughs and are the only
genuine duplicate risk.

**Organizations & members** (6) — `MRG organizations/index` (absorbs `team/shared-dashboard`) ·
`NEW organizations/roles-and-permissions` (**the plan ∩ role rule** — why a paid feature is still
refused) · `MOV organizations/inviting-members` · `NEW organizations/ownership-and-transfer` ·
`MOV organizations/sso` · `UPD organizations/audit-trail` (the shipped Secret Activity feature, titled
for what people search)

**Custom domains** (7) — the four tier groups collapse into one. `MRG custom-domains/index` (absorbs
`how-it-works` + `use-cases`) · `UPD custom-domains/setup-guide` (**must gain the missing TXT
ownership step**) · `UPD custom-domains/dns-validation` · `MOV custom-domains/branding` ·
`UPD custom-domains/email-sender` · `MRG custom-domains/homepage-and-incoming` ·
`MRG custom-domains/access-and-privacy`

**Plans & billing** (2) — `MRG billing/index` (de-orphans `pricing/index`, absorbs `compare-plans`) ·
`NEW billing/managing-your-subscription`

> Per [D3](#d3--billing-catalog-settled), the plan matrix is **hand-maintained with a named owner** and
> is explicitly out of the generated reference's scope. Its source of truth is the production
> `etc/billing.yaml`, which lives outside both repos and is requested when a docs task needs it.
> `etc/examples/billing.example.yaml` is an example file and cannot arbitrate what buyers are sold.

#### 4. Self-hosting · 43 pages

**Install & deploy** (8) — `UPD self-hosting/index` · `UPD self-hosting/simple-or-full-auth` ·
`NEW install/images-and-variants` (registry, tag policy, `OTS_IMAGE_TAG`, and the **lite / caddy / s6**
variants — none named anywhere today, though two of them are the intended companions to the next two
pages) · `SPL install/docker` · `SPL install/linux` · `SPL install/run-as-a-service` ·
`SPL install/reverse-proxy-and-tls` · `NEW install/verify`

**Configure** (8) — `UPD configure/index` (file inventory + precedence + `DEPRECATED_CONFIG_MODE`) ·
`NEW configure/secrets-and-keys` · `NEW configure/authentication` · `NEW configure/sso` ·
`NEW configure/email` · `NEW configure/secret-options` · `NEW configure/sessions-and-cookies` ·
`NEW configure/security-headers`

**Features** (10) — `NEW features/custom-domains` · `NEW features/caddy-on-demand-tls` ·
`NEW features/incoming-secrets` · `NEW features/branding` (brand packs, `BRAND_ASSETS_DIR`, all 17
`BRAND_*` vars) · `NEW features/interface-and-homepage` · `NEW features/languages` ·
`NEW features/multi-region` · `NEW features/billing-and-entitlements` · plus two **operator-only**
surfaces with no hosted counterpart, which fell out of the first draft precisely because it was
organised as an audience mirror: `NEW features/feedback-channel` · `NEW features/broadcast-banner`

> `features/caddy-on-demand-tls` must not be written as a working strategy. Per
> [D2](#d2--four-code-vs-docs-defects-settled), `caddy_on_demand` currently issues no certificate at all;
> the page documents the two strategies that work (`passthrough`, `approximated`) and states plainly
> that the third does not, until the app-repo issue closes. `features/custom-domains` carries the same
> caveat where it lists strategy choices, and `operate/queues-and-dlq` documents the DLQ consumer's
> deliberate discard of non-auth mail as shipped behaviour rather than treating it as a defect.

**Operate** (10) — `NEW operate/background-jobs` · `NEW operate/queues-and-dlq` ·
`NEW operate/scheduled-and-maintenance-jobs` · `NEW operate/datastore` (Valkey/Redis is the **system of
record, not a cache** — persistence, `appendonly`, backup semantics) ·
`NEW operate/scale-and-tune` (the entire `SERVER & WORKER TUNING` banner section — `PUMA_WORKERS`,
`PUMA_MIN/MAX_THREADS`, `FAMILIA_POOL_SIZE/TIMEOUT`, `RABBITMQ_CHANNEL_POOL_SIZE`) ·
`NEW operate/health-and-monitoring` · `NEW operate/logging-and-error-tracking` ·
`NEW operate/backup-and-key-rotation` · `NEW operate/rate-limits-and-network-access` ·
`NEW operate/admin-console` (the Colonel and its 14 sections) ·
`SPL operate/harden-your-deployment` (moved **into** the operator tree — a pre-production checklist
belongs one hop from where the operator is working, not in the compliance section)

**Troubleshoot & upgrade** (7) — `NEW troubleshoot/boot-failures` ·
`NEW troubleshoot/sign-in-and-signup-problems` · `NEW upgrades/data-migrations` (`bin/ots migrate` is a
stateful runner with dry-run, status, rollback and a `CONFIG_MIGRATE=check|auto|skip` boot gate; today
it would get one row in a CLI table) · `NEW upgrades/index` · `NEW upgrades/v0-26` (**must include the
CHANGELOG's bolded Action Required migration**, `bin/ots migrate --run 20260703_01_disable_homepage_auth_links`) ·
`UPD upgrades/v0-24` · `MOV upgrades/v0-23`

#### 5. API & SDKs · 5 pages — promoted to top level
`UPD api/index` (base URLs, versions) · `NEW api/authentication` · `NEW api/errors-and-rate-limits`
(429 and `Retry-After`, both zero-hit today) · `NEW api/versions` · `MOV api/client-libraries`

> This is the most-linked developer material on any docs site. Burying it under a reference spine
> nobody browses inherits the wrong navigation behaviour.

#### 6. Reference · 12 pages — generated
`NEW reference/index` (how to read it; **which page owns a default**) ·
`SPL reference/environment-variables` · `NEW reference/cli` (`bin/ots`) ·
`NEW reference/scheduled-jobs` · `NEW reference/health-endpoints` · then *Configuration keys* (7),
**titled by subject rather than by YAML stanza**: `configuration-files-and-precedence` ·
`generator` (moved, given a content wrapper so it stops being an invisible sidebar entry) ·
`site-and-interface` · `features-and-branding` · `datastore-and-queues` · `email-and-delivery` ·
`auth-logging-and-billing-files`

> `reference/deprecated-and-removed` is **cut** per [D8](#d8--removed-and-inert-variables-settled): the
> project is pre-1.0 and the reference documents what the current version reads, nothing else. The two
> jobs that page was carrying still need homes, and both are cheaper than a graveyard inventory. The ~19
> unsupported variables the site publishes today are **deleted outright** in Phase 1, not relocated —
> a variable that is gone should leave no trace to copy. And surviving `DEPRECATED_CONFIG_MODE=strict`
> becomes a troubleshooting path (`troubleshoot/boot-failures`: boot refused on an unrecognised key,
> here is how to find and remove it) plus the precedence section of `configure/index`, which already
> owns the setting. Neither requires publishing an inventory of what older versions read.

#### 7. Trust & security · 8 pages
`UPD security/index` · `NEW security/how-one-time-access-works` · `NEW security/passphrase-protection` ·
`UPD security/data-protection` · `MRG security/where-your-data-lives` (the five region pages) ·
`MOV security/best-practices` · `MRG security/our-principles` (the four principles pages) ·
`security/vulnerability-disclosure`

> The region merge is settled by [D1](#d1--per-region-pages-settled) in favour of reader experience over
> search ranking. One consequence is worth building for rather than accepting: give
> `where-your-data-lives` a stable per-region anchor (`#european-union`, `#canada`, …) and point each
> retired URL at its anchor rather than at the page top. A compliance questionnaire that cites
> `/regions/european-union` then still lands on the EU facts, and the merged page has to carry every
> per-region fact the five templates carried — jurisdiction, data location, operating entity — or the
> merge trades away something real. `regions/switching-regions` is not part of the merge; it moves to
> `account/change-your-region`, where a reader looking for the procedure will be.

#### 8. Translations & contributing · 10 pages
Renamed from "Contribute", which today holds nine pages of translation guidance and no contributor
documentation at all. `NEW contribute/developer-on-ramp` (`bin/dev`, `bin/setup --test`, the
containerized test lanes, the 32 ADRs) plus the nine existing translation pages moved, including the
five currently orphaned under `translations/universal/`.

> This section is guidance *for* translators. It is unaffected by [D5](#d5--translation-policy-settled)
> deferring translation *of* the site: the contributors it serves are the ones the future initiative
> will depend on, so its pages stay in the tree and get fixed in Phase 1.

**Totals: 61 pages → 114. ~62 new, ~20 moved, ~14 merged away, 1 deleted.** Of the 62 new pages, five are
held pending [D9](#d9--who-owns-the-end-user-task-layer-open).

---

## Sequencing

**Phase 1 — stop the bleeding (1–2 weeks).** Corrections in place. No sidebar change, no new
translation keys, no redirects, so it ships independently of every other decision here. Fix the ~25
wrong statements in Finding 1; **delete** the ~19 no-longer-supported variables the site publishes as
settable rather than relocating them (per D8); add the missing TXT step to `setup-guide.md`; publish
`configure/secrets-and-keys` and `share/when-a-link-doesnt-work` early; rename
`translations/universal/_index.md` → `index.md` to fix the live 404; delete
`translations/language-notes.md` (an 11-line unfinished `[placeholder]` table) — **all 26 copies**, one
per locale directory, since every copy is the same unfilled template. That last deletion drops the nine
stub locales from three files to two, which is consistent with [D6](#d6--stub-locales-settled): it
neither completes nor removes them.

Two additions from the decisions: the four code-vs-docs defects are filed as
[onetimesecret#3993](https://github.com/onetimesecret/onetimesecret/issues/3993) (D2) — done, and done
first, because three of the four determine what Phase 3 is allowed to claim; and **stand up
the stub reference generator in this repo** (D7) rather than waiting on app-repo commits — see
*The generated reference* below. The original instruction here was "start the app-repo generator now,
it is the critical path for Phase 4"; D7 removes that dependency from the critical path instead of
resolving it.

**Phase 2 — reshape and build the end-user task layer (5–7 weeks).** 14 top-level entries become 8;
tiers leave navigation; orphans are absorbed; the end-user surface gets its first real how-tos.
Prerequisite: extend `docsSchema()` with `plan`, `audience`, `pageType`, `sourceOfTruth`. (`translate`
is dropped — see D5; `audience` already partitions the tree the way a future translation initiative
would need to select on it, so a second field would only duplicate that partition and start drifting
from it.) Seven of the twelve end-user pages proceed unconditionally; the five marked **†** wait on D9,
and if the answer arrives late they are the phase's tail, not its trunk.

**Phase 3 — the operator install and configure tree (6–8 weeks).** Split `installation.md` (470 lines,
six unrelated jobs) into task pages; write the operator feature pages. Highest per-page research cost
— most require reading implementation to state a default correctly.

**Phase 4 — the generated reference and the Day-2 layer (7–9 weeks, ~3 engineering).** Stand up the
pipeline, retire `configuration.md` and `environment-variables.md`, complete Operate and Troubleshoot.
Ship `reference/environment-variables` first — highest defect density, simplest generator, a straight
replacement. It now runs off the vendored snapshot rather than a live app-repo feed (D7), which lowers
this phase's engineering estimate and removes its external blocker, at the cost of a refresh step that
Phase 5 has to own.

**Phase 5 — drift prevention (3–4 weeks).** Every defect in this audit went unnoticed because nothing
checks for it. Add `check:orphans`, `check:nav`, a frontmatter linter, and a reference-drift CI gate.
Today's only QA scripts are link checkers and a vitest suite covering the config generator alone.
Under D7 the drift gate has one more job: it compares the **vendored snapshot** against upstream
`.env.reference` and `config.defaults.yaml` and fails when they diverge. That is the mechanism that
keeps a stubbed generator honest — without it the snapshot silently becomes the same hand-maintained
copy this plan exists to delete, and the reshape ends up cosmetic.

---

## Implementation mechanics

**`config/sidebar.mjs`** — delete the four tier factories and the 20-line comment block encoding the
filing rule. No helper changes needed for nesting: `createGroup` passes `items` straight through and
Starlight accepts groups as group children. While in the file, fix `createLink("overview", …)` being
used **seven times** (the sidebar renders "Overview" seven times with only group context to
disambiguate), and the two broken links noted in Finding 1.

**`src/content/i18n/en.json`** — ~85 new keys. **All can ship English-only**: `buildTranslations()`
includes a locale only if that bundle already has the key, and omitted locales fall back to the English
label. The file's own comment says this is deliberate. Ten of the 13 dead keys (`coreConfig`,
`systemSettings`, `createSecrets`, …) can be removed; three are reclaimed by the new API group.

**`config/redirects.mjs`** — ~30 families × 26 locale prefixes. Both required patterns already have
precedent (per-locale fan-out for the `principles/trust` merge; many-to-one collapse for the
`/rest-api/v1|v2/*` tree). Generate from a `movedPages` array, don't hand-write. Note the existing
top-level `"/pricing"` entry sends the bare path off-site while `/en/pricing/` is an unnavigable
orphan, and `"/getting-started": "/en/introduction"` will chain into a page that no longer exists.
The region family (D1) is the one case that needs **anchor targets rather than page targets** —
`/regions/european-union` → `/security/where-your-data-lives#european-union`, and likewise for the other
four — so the `movedPages` entries carry an optional fragment.

**Translation.** Measured: no locale is at parity (best 41/61; most 36–40), and nine further directories
hold 3 files each with no i18n bundle and no sidebar entry. The audit proposed a tiered policy —
translate the end-user surface, make the operator and reference trees English-only by construction.
[D5](#d5--translation-policy-settled) replaces that with something simpler and more honest about
sequencing: **English is the only language this plan ships in, and translation is a separate initiative
scoped after the restructure settles.**

The practical difference is larger than it sounds. A tiered policy is a standing obligation that has to
be enforced on every page as it is written, and it has to be negotiated with 16 locale maintainers
before Phase 2 can start. Deferral is neither. Concretely:

- **No new obligations are created.** Today's 976 (61 published pages × 16 locales with i18n bundles) is
  frozen, not grown. Existing locale files stay exactly where they are and keep serving; nothing is
  deleted and no locale is told its content is being dropped.
- **Nothing in Phases 1–5 blocks on a translation decision.** English pages ship as they are written.
  Locales fall back to the English label for any sidebar key their bundle lacks —
  `buildTranslations()` already includes a locale only if that bundle has the key, and the file's own
  comment says this is deliberate.
- **The future initiative gets a cleaner input than it would have now.** Once the tree stops moving, its
  scope is a selection over `audience`, not a hand-curated list: the end-user surface is Home, Start
  here, Using Onetime Secret and Trust & security — 44 pages in the proposed tree, or 39 if D9 goes
  against the five gated walkthroughs. Deciding tiering *now* would mean tiering a tree that Phases 2–4
  are still rewriting.

Do **not** copy the `configuration-generator.astro` escape hatch for English-only pages — it is
English-only but also drops out of Pagefind, prev/next and the content collection, which is exactly why
that sidebar entry currently points at something invisible. English-only is a content decision, not a
rendering one.

**Stub locales.** The nine 3-file directories (`ar`, `ca_ES`, `cs`, `el_GR`, `he`, `hu`, `ru`, `sl_SI`,
`vi`) are left in place per [D6](#d6--stub-locales-settled) and revisited with the translation
initiative. They stay indexed and reachable, which is a knowingly accepted cost: each holds only
translation-contributor guidance, so a reader who lands there finds a real page, not a broken product
doc. If that changes — if the restructure ever routes product content into them — the cheap fix is a
`noindex` on the nine, not a completion project. Note the app ships 30 locales to the docs site's 17
with i18n bundles (26 content directories), so "which locales exist" is itself unsettled and worth
resolving *with* the initiative rather than ahead of it.

**The generated reference.** Sources are already rich enough: `.env.reference` carries 353 variables
across 52 banner sections with per-variable prose, defaults, constraints, `[derived]`/`[independent]`/
`[federation]`/`[deprecated]` markers and explicit `(config.key.path)` back-references;
`config.defaults.yaml` carries ~210 `<%= ENV['X'] %>` key↔var mappings. **Reuse the existing pipeline
rather than inventing a second one** — `src/components/config-generator/schemas/` already vendors JSON
Schemas generated in the app repo by `pnpm run schemas:json:generate`, with env mappings curated in
`presets.ts`. The generator emits to the docs repo; CI fails on drift.

[D7](#d7--generator-ownership-settled) stubs the app-repo half of that pipeline, so the shape changes:
the generator lives **in this repo from the start** and reads a **vendored snapshot** of
`.env.reference` and `config.defaults.yaml` — the same vendoring pattern
`src/components/config-generator/schemas/` already uses, which is why this is a stub and not a new
invention. The input contract is fixed now; swapping the snapshot for a live app-repo feed later is a
change of source, not a rewrite of the generator or of any page it emits.

What this buys and what it costs, stated plainly, because the audit called generator ownership the
plan's highest-risk dependency and stubbing it does not make that risk disappear:

- **Bought:** Phase 4 stops depending on commits to a repo with no named owner and no backlog slot. The
  reference pages are generated-shaped from day one, so they cannot quietly regress into the
  hand-written copies that produced Finding 1.
- **Cost:** a snapshot is a copy, and copies drift. The Phase 5 drift gate — snapshot versus upstream,
  failing CI on divergence — is what converts that copy into a tracked one. **Without the gate, D7
  recreates the exact defect this plan exists to fix, one level down.** The gate is not optional
  polish; it is the other half of the decision.
- **Still unowned:** app-repo stages 1–3. They are no longer on the critical path, but the snapshot
  refresh needs a name against it before Phase 4 exits. Revisit there.

**Out of scope for the generator:** the billing catalog. Per D3 the production `etc/billing.yaml` lives
outside both repos, so the plan matrix cannot be generated and stays hand-maintained with a named owner.
Before Phase 2 publishes `billing/index`, verify `compare-plans.md:19` ("Member Invites" ✅ for Identity
Plus) and `:24` ("Members per organization — Up to 50") against the production catalog and request it
for that check. The in-repo `etc/examples/billing.example.yaml` gives `identity_plus_v1` no
`manage_members` entitlement, `total_members_per_org: 1`, and comments the team tier out entirely — but
it is an *example*, so it establishes that the published claim is unverified, not that it is wrong.

Worth noting: `docs/templates/README.md` already mandates a four-type content model (Concept guide /
How-to / Reference / Architecture note) with a `Source of truth:` field and the rule "GENERATE OR
TABLE-DRIVE reference where possible… rather than hand-maintaining a parallel copy that will drift."
Only two of 61 pages follow it. This plan is largely **making the published tree express the model the
repo already documents.**

---

## Decisions

Nine decisions were raised by the audit. Eight are settled and their consequences are applied
throughout the plan above; one is open. Each entry records the answer as given, then what changed.

### D1 — Per-region pages *(settled)*

**Answer: prioritise developer experience; deprioritise SEO.**

The five 43–47 line templates merge into `security/where-your-data-lives`. Applied: the merge is now
stated as settled rather than conditional; the merged page must carry every per-region fact the
templates carried; and the retired URLs redirect to **per-region anchors**, not to the page top, so a
compliance questionnaire citing `/regions/european-union` still lands on the EU facts. This is the
cheap half of what the SEO argument was protecting, and it costs one fragment per `movedPages` entry.
`regions/switching-regions` is not part of the merge — it moves to `account/change-your-region`.

### D2 — Four code-vs-docs defects *(settled)*

**Answer: file a terse issue in `onetimesecret/onetimesecret`, labelled `documentation`.**

Filed as [onetimesecret/onetimesecret#3993](https://github.com/onetimesecret/onetimesecret/issues/3993).
The defects are code-side, so they leave the docs plan and become app-repo work. All four were
re-verified against source before filing:

| Defect | Evidence | Nature |
|---|---|---|
| `caddy_on_demand` issues no certificate | `caddy_on_demand_strategy.rb:61` returns `is_resolving: nil`; `verify_domain.rb:323` skips the write when nil, so `resolving` — written nowhere else — never becomes `true`, `ready?` never returns true, and `apps/internal/acme` 403s every domain | real defect |
| DLQ consumer discards secret links and expiration warnings | `dlq_email_consumer_job.rb:151-155` nacks any non-`AUTH_TEMPLATES` message | **intended**, per the class comment — but invisible to operators |
| `JOBS_SCHEDULER_ENABLED` / `JOBS_FALLBACK_SYNC` are inert | both map to config keys (`config.defaults.yaml:1035,1051`) that no production code reads, while `docker/README.md:90` and `docker-compose.full.yml:253` instruct operators to set them | doc-vs-code contradiction |
| `features.domains.strict_strategy` is unreachable by config | read at `strategy.rb:39`, present in no file under `etc/`, `.env.reference` or `docker/` | code-only knob |

Applied: `features/caddy-on-demand-tls` is written as *not currently functional* rather than as a
supported strategy, and `features/custom-domains` carries the same caveat. The DLQ row is a docs job
rather than a fix — `operate/queues-and-dlq` documents the discard as shipped behaviour, since silently
dropping a secret link is exactly the kind of thing an operator must be told before they debug it.

### D3 — Billing catalog *(settled)*

**Answer: the product `billing.yaml` is kept separate. Ask for it when needed.**

So the plan matrix **cannot** be generated, and stays hand-maintained with a named owner; the billing
catalog is explicitly out of the generator's scope. Applied under *Plans & billing* and *The generated
reference*, with a Phase 2 precondition: verify `compare-plans.md:19` and `:24` against the production
catalog before `billing/index` ships. One correction to the audit's framing — it called
`etc/examples/billing.example.yaml` "the only catalog in the repo", but an example file cannot arbitrate
what buyers are sold. The published "Member Invites / Up to 50" claim is therefore **unverified**, not
demonstrated wrong, and it does not belong in Finding 1's table of factual errors.

### D4 — The `/audit-events` rename *(settled)*

**Answer: ignore. The previous path was not shipped in a meaningful way, and only for a week.**

No deprecation notice, no migration note, no breaking-change entry. Applied: the docs document
`/secret-activity` only (`apps/api/organizations/routes.txt:20`). `CHANGELOG.rst:57` still names the old
path; it is stale, it is app-repo content, and at one week of exposure it is not worth a correction that
would advertise a path nobody should now use. Unchanged by this: `team/audit-log.md` still says
"Status: Planned" for a feature that shipped in 0.26.0, which remains a genuine Finding 1 error and is
still fixed in Phase 1. The terminology question ADR-021 was raised for — Secret Activity vs Security
Events vs the operator audit log — is not dropped either; it is answered by `start/glossary`, which is
where a reader hits it.

### D5 — Translation policy *(settled)*

**Answer: focus on the primary language. Translation is a future initiative, after the dust settles.**

This supersedes the tiered policy the audit proposed. Applied in full under *Translation*: no new
obligations are created, today's 976 is frozen rather than grown, existing locale files stay and keep
serving, and no phase blocks on a translation decision. The `translate` frontmatter field is dropped
from the Phase 2 schema work — `audience` already partitions the tree the way the future initiative
would select on it. The audit's "63 of 115 pages" framing is moot: it is now 114 of 114.

### D6 — Stub locales *(settled)*

**Answer: ignore; see D5.**

The nine stub directories stay as they are and are revisited with the translation initiative. Applied
under *Stub locales*, with the accepted cost stated (they remain indexed) and the cheap mitigation named
in case it stops being acceptable. **Count correction: nine, not ten.** The audit listed nine locales
"and one sibling"; a directory-by-directory count finds exactly nine holding three files each — `ar`,
`ca_ES`, `cs`, `el_GR`, `he`, `hu`, `ru`, `sl_SI`, `vi` — out of 26 content directories, 17 of which
have i18n bundles.

### D7 — Generator ownership *(settled)*

**Answer: stub for now.**

The generator moves into this repo and reads a vendored snapshot of `.env.reference` and
`config.defaults.yaml`; app-repo stages 1–3 leave the critical path. Applied under *The generated
reference* and in Phases 1, 4 and 5. The honest reading: this converts the plan's highest-risk
dependency from *blocking* to *deferred*, which is an improvement, but it does not remove the risk. A
snapshot is a copy, and the Phase 5 drift gate — snapshot versus upstream, failing CI on divergence —
is what keeps that copy from becoming the next `configuration.md`. The refresh still needs a name
against it before Phase 4 exits.

### D8 — Removed and inert variables *(settled)*

**Answer: focus on current content. The project is still pre-1.0.**

`reference/deprecated-and-removed` is cut; Reference drops to 12 pages and the tree to 114. Applied
under §6 and Phase 1. The two jobs that page carried are rehomed rather than lost: the ~19 unsupported
variables the site publishes are **deleted** in Phase 1 rather than relocated to a graveyard, and
surviving `DEPRECATED_CONFIG_MODE=strict` becomes a `troubleshoot/boot-failures` path plus the
precedence section of `configure/index`. Pre-1.0 also makes the case stronger than "not now": an
inventory of what removed versions read would need maintaining against a deprecation surface that is
still moving.

---

### D9 — Who owns the end-user task layer? *(open)*

**Answer: important — work carefully. The largest single scope swing in the plan.**

Still open, and it should be. Below is what the plan does in the meantime.

**What the swing actually is now.** The audit sized this at "~12 pages plus the entire Tier 1
translation set". D5 removes the second half from the near term — no translation set is being built in
any phase — but does not delete it: when the translation initiative starts, whether these pages exist
determines how large its first tier is. So D9 has one effect on Phases 1–5 and one on the initiative
after them. Applying the reachability rule stated in §3 shrinks the near-term effect further, from
twelve pages to five:

| | Page | Why |
|---|---|---|
|**proceeds**|`share/what-recipients-see`|recipients have no account; the product cannot reach them|
|**proceeds**|`share/when-a-link-doesnt-work`|same, and it is the highest-volume support-deflection page on the site|
|**proceeds**|`account/signing-in`|password reset — a user who cannot sign in cannot read in-app guidance|
|**proceeds**|`account/two-factor-and-passkeys`|recovery codes and MFA lockout, same reason|
|**proceeds**|`account/change-your-email`|irreversible; researched before it is performed|
|**proceeds**|`account/close-your-account`|irreversible, and the question a privacy-first product is most expected to answer|
|**proceeds**|`share/your-receipt`|documents behaviour no screen states — burn, one-time reveal, `GENERATED_VALUE_DISPLAY_TTL`|
|**† held**|`start/send-your-first-secret`|in-flow walkthrough|
|**† held**|`share/index`|in-flow walkthrough|
|**† held**|`account/sessions-and-identities`|in-flow walkthrough|
|**† held**|`account/dashboard-and-recent-secrets`|in-flow walkthrough|
|**† held**|`account/preferences`|in-flow walkthrough|

None of the seven duplicates in-app guidance under *any* answer, because in-app guidance cannot reach
the reader who needs them. The five are the genuine duplicate risk, and they are also the pages that go
stale fastest, since they describe screens rather than behaviour.

**The options.**

1. **Docs own all twelve.** Fastest to the reader, and the only option that guarantees the content
   exists. If in-app guidance later ships, five pages become a second surface describing the same
   screens, and the two drift.
2. **The product owns the layer; docs carry none of it.** Not actually available for the seven —
   choosing it means accepting that recipients, locked-out users and evaluators keep getting nothing,
   which is today's outcome.
3. **Split by reachability** — docs own what the product cannot reach plus durable behaviour; the
   product owns in-flow guidance; the five held pages become short reference targets the app deep-links
   *into* from its empty and error states, rather than walkthroughs that restate screens.

**Recommendation: 3, with a deadline attached.** Build the seven now; hold the five until Phase 2 opens.
If in-app guidance is not funded with a date by then, build the five as well under option 1 — because
"this UI should be self-explanatory" is precisely the assumption that produced zero end-user content in
61 published pages. The failure mode here is not a wrong answer; it is an unowned question staying
unowned while both sides assume the other has it.

**What would settle it:** a yes/no on whether in-app guidance is scheduled inside the Phase 2 window,
and if yes, who writes it. That is a product call, not a docs call. **Needed before Phase 2 opens** —
about five weeks after Phase 1 starts, which is the slack this decision has.

---

## Appendix A — corrections applied during the audit

An adversarial verifier was tasked with refuting every claimed gap. It refuted **20 of them**, and
found one systemic error worth recording:

**The audit's initial scope boundary was wrong.** `src/pages/en/self-hosting/configuration-generator.astro`
is a published page, sits in the sidebar, and is promoted by tip callouts atop *both* big reference
pages — but it is not in `src/content/docs/en/`, so every domain surveyor missed it. Its option manifest
(`src/components/config-generator/presets.ts`) renders user-visible labels and descriptions and emits a
working `.env` starter. Six "zero hits" claims were invalidated outright by it: trusted proxy, AWS SES,
SendGrid, the emailer mode value set, the Sentry master switch, and the `AUTHENTICATION_MODE`→YAML
mapping. Fourteen further claims were softened.

That finding has an operational implication beyond this audit: **the Configuration Generator is
currently the docs site's only accurate published source for several settings whose prose pages are
stale.** Any future coverage check must scope on the sitemap, not the content directory.

The core survey survived. The cryptography domain in particular was not dented: `SECRET_PREVIOUS`,
`SECRET_VERIFIER_MODE`, `ACCOUNT_ID_SECRET`, `AUTH_OLD_SECRET` and the fail-safe-reveal behaviour are
genuinely at zero hits, each independently confirmed against source. Two claims turned out **worse**
than first reported: `install.sh` genuinely does not exist despite four invocations in the docs, and
the `TTL_OPTIONS` separator error is a confirmed silent data-loss defect.

A completeness critic then found **19 features and 13 IA weaknesses** the surveys and the first IA
draft had missed — clustered exactly where no survey domain owned the question (runtime/capacity,
container artifacts, stateful upgrade, account lifecycle, revenue operations). All 19 features and all
13 critiques are folded into the tree above; they account for `operate/scale-and-tune`,
`operate/datastore`, `install/images-and-variants`, `upgrades/data-migrations`,
`account/change-your-email`, `account/close-your-account`, `account/dashboard-and-recent-secrets`,
`start/glossary`, `features/feedback-channel`, `features/broadcast-banner`, the promotion of API to
top level, the relocation of the hardening checklist, the retitling of the config-key pages, and the
"Reference owns every default" rule.

---

## Appendix B — full topic inventory

See [`documentation-audit-2026-08-topics.md`](./documentation-audit-2026-08-topics.md) — all 304
undocumented and partial topics, grouped by domain, tagged with priority, status and the env vars each
covers.
