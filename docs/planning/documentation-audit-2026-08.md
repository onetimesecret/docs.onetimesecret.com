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
content-collection file, and `sidebar.mjs:255` links `translations/universal`, whose only file is
`_index.md` — which Astro content collections skip.

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

Meanwhile seven top-level slots go to Regions, six of which are one 43–47 line template; the whole REST
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
|`NEW`|`start/send-your-first-secret`|the product's core action, end to end|
|`MRG`|`start/run-your-own-instance`|absorbs `self-hosting/getting-started`|
|`MOV`|`start/hosted-or-self-hosted`|from `self-hosting/self-hosting-vs-hosted`|
|`NEW`|`start/glossary`|receipt vs private link vs metadata; passphrase vs password; organization vs workspace vs team; colonel vs admin vs staff; entitlement vs permission vs capability; Secret Activity vs Security Events; canonical vs custom domain|

The glossary is the cheapest fix in the plan. A dozen contested terms are currently disambiguated only
inside long pages, reachable only by already knowing which page hides them.

#### 3. Using Onetime Secret · 30 pages

**Sharing secrets** (7) — `UPD share/index` (rewritten as a procedure) · `NEW share/your-receipt`
(private link, burn, one-time reveal of a generated password, `GENERATED_VALUE_DISPLAY_TTL`) ·
`NEW share/what-recipients-see` · `NEW share/when-a-link-doesnt-work` (the unified "no longer
available" response and the deliberate absence of an existence oracle — highest-volume support
deflection page on the site) · `SPL share/receiving-secrets` · `MOV share/use-cases` ·
`MOV share/why-secret-links`

**Your account** (8) — `NEW account/signing-in` (incl. password reset, absent today) ·
`NEW account/two-factor-and-passkeys` (TOTP, recovery codes, WebAuthn — `passkey` has zero hits) ·
`NEW account/sessions-and-identities` · `NEW account/dashboard-and-recent-secrets` ·
`NEW account/change-your-email` · `NEW account/close-your-account` · `NEW account/preferences` ·
`MOV account/change-your-region`

> Email change and account deletion are both shipped, both irreversible, and both absent. "How do I
> delete my account and my data" is the question a privacy-first product is most expected to answer,
> and the site currently cannot.

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

#### 6. Reference · 13 pages — generated, English-only
`NEW reference/index` (how to read it; **which page owns a default**) ·
`SPL reference/environment-variables` · `NEW reference/deprecated-and-removed` (what makes
`DEPRECATED_CONFIG_MODE=strict` survivable) · `NEW reference/cli` (`bin/ots`) ·
`NEW reference/scheduled-jobs` · `NEW reference/health-endpoints` · then *Configuration keys* (7),
**titled by subject rather than by YAML stanza**: `configuration-files-and-precedence` ·
`generator` (moved, given a content wrapper so it stops being an invisible sidebar entry) ·
`site-and-interface` · `features-and-branding` · `datastore-and-queues` · `email-and-delivery` ·
`auth-logging-and-billing-files`

#### 7. Trust & security · 8 pages
`UPD security/index` · `NEW security/how-one-time-access-works` · `NEW security/passphrase-protection` ·
`UPD security/data-protection` · `MRG security/where-your-data-lives` (the five region pages) ·
`MOV security/best-practices` · `MRG security/our-principles` (the four principles pages) ·
`security/vulnerability-disclosure`

#### 8. Translations & contributing · 10 pages
Renamed from "Contribute", which today holds nine pages of translation guidance and no contributor
documentation at all. `NEW contribute/developer-on-ramp` (`bin/dev`, `bin/setup --test`, the
containerized test lanes, the 32 ADRs) plus the nine existing translation pages moved, including the
five currently orphaned under `translations/universal/`.

**Totals: 61 pages → 115. ~63 new, ~20 moved, ~14 merged away, 1 deleted.**

---

## Sequencing

**Phase 1 — stop the bleeding (1–2 weeks).** Corrections in place. No sidebar change, no new
translation keys, no redirects, so it ships independently of every other decision here. Fix the ~25
wrong statements in Finding 1; add the missing TXT step to `setup-guide.md`; publish
`configure/secrets-and-keys` and `share/when-a-link-doesnt-work` early; rename
`translations/universal/_index.md` → `index.md` to fix the live 404; delete
`translations/language-notes.md` (an 11-line unfinished `[placeholder]` table).
*Start the app-repo reference generator now* — it is the critical path for Phase 4.

**Phase 2 — reshape and build the end-user task layer (5–7 weeks).** 14 top-level entries become 8;
tiers leave navigation; orphans are absorbed; the end-user surface gets its first real how-tos.
Prerequisite: extend `docsSchema()` with `plan`, `audience`, `pageType`, `translate`, `sourceOfTruth`.

**Phase 3 — the operator install and configure tree (6–8 weeks).** Split `installation.md` (470 lines,
six unrelated jobs) into task pages; write the operator feature pages. Highest per-page research cost
— most require reading implementation to state a default correctly.

**Phase 4 — the generated reference and the Day-2 layer (7–9 weeks, ~3 engineering).** Stand up the
pipeline, retire `configuration.md` and `environment-variables.md`, complete Operate and Troubleshoot.
Ship `reference/environment-variables` and `reference/deprecated-and-removed` first — highest defect
density, simplest generators, straight replacements.

**Phase 5 — drift prevention (3–4 weeks).** Every defect in this audit went unnoticed because nothing
checks for it. Add `check:orphans`, `check:nav`, a frontmatter linter, and a reference-drift CI gate.
Today's only QA scripts are link checkers and a vitest suite covering the config generator alone.

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

**Translation.** Measured: no locale is at parity (best 41/61; most 36–40), and ten further directories
hold 3 files each with no i18n bundle and no sidebar entry. Proposed policy — translate the 40
end-user pages (Home, Start here, Using Onetime Secret, Trust & security); make Self-hosting, Reference
and Translations English-only by construction, which is already the de facto state.
**40 × 16 = 640 obligations against today's 976 — a 34% reduction in standing liability while English
coverage nearly doubles.** Mechanism: a `translate: z.boolean().default(true)` frontmatter field plus a
check in `bin/translation-pluribus-util`. Do **not** copy the `configuration-generator.astro` escape
hatch — it is English-only but also drops out of Pagefind, prev/next and the content collection, which
is exactly why that sidebar entry currently points at something invisible.

**The generated reference.** Sources are already rich enough: `.env.reference` carries 353 variables
across 52 banner sections with per-variable prose, defaults, constraints, `[derived]`/`[independent]`/
`[federation]`/`[deprecated]` markers and explicit `(config.key.path)` back-references;
`config.defaults.yaml` carries ~210 `<%= ENV['X'] %>` key↔var mappings. **Reuse the existing pipeline
rather than inventing a second one** — `src/components/config-generator/schemas/` already vendors JSON
Schemas generated in the app repo by `pnpm run schemas:json:generate`, with env mappings curated in
`presets.ts`. The generator emits to the docs repo; CI fails on drift.

Worth noting: `docs/templates/README.md` already mandates a four-type content model (Concept guide /
How-to / Reference / Architecture note) with a `Source of truth:` field and the rule "GENERATE OR
TABLE-DRIVE reference where possible… rather than hand-maintaining a parallel copy that will drift."
Only two of 61 pages follow it. This plan is largely **making the published tree express the model the
repo already documents.**

---

## Decisions needed

1. **Per-region pages: merge or keep?** Merging five 43–47 line templates into one comparison page
   kills ~80 translation obligations, but those URLs plausibly carry SEO value ("onetimesecret EU data
   residency") and get cited in compliance questionnaires. Redirects preserve the URLs, but a redirect
   is not a landing page. Marketing/SEO call, not a docs call.
2. **Caddy on-demand TLS: document the limitation, fix it, or remove the option?**
   `caddy_on_demand_strategy.rb:61` returns `is_resolving: nil`, so `ready?` is never true and the ask
   endpoint 403s every domain — no certificate is ever issued. It is currently listed as a supported
   strategy with no warning. Same question for three other flagged defects: the DLQ consumer silently
   discarding secret links and expiration warnings; `JOBS_SCHEDULER_ENABLED` / `JOBS_FALLBACK_SYNC`
   being read by no code while `docker-compose.full.yml` tells operators to set them; and
   `features.domains.strict_strategy` existing in code but in no config file.
3. **Which billing catalog is authoritative?** `compare-plans.md` promises Identity Plus buyers "Member
   Invites, up to 50". The only catalog in the repo gives `identity_plus_v1` no `manage_members`
   entitlement and `total_members_per_org: 1`, with the team tier commented out. Production
   `etc/billing.yaml` is not in the repo. This determines whether the plan matrix can be generated at
   all, or must stay hand-maintained with a named owner.
4. **Is `/audit-events` → `/secret-activity` a supported breaking change?** `CHANGELOG.rst` documents
   the old path for 0.26.0; routes now serve the new one. Anyone who integrated is broken and nothing
   public says so. Related: ADR-021, which settles the terminology, is still `status: proposed`.
5. **Should the operator and reference trees be English-only by policy?** 63 of 115 pages. The
   empirical case is strong, but it formally tells a German-speaking self-hoster their operator docs
   will not be translated. Consult the 16 locale maintainers. Middle position: translate the
   Self-hosting overview and the two decision guides (~5 pages), leave the rest English.
6. **What happens to the ten stub locales?** `ar`, `ca_ES`, `cs`, `el_GR`, `he`, `hu`, `ru`, `sl_SI`,
   `vi` and one sibling hold 3 files each, have no i18n bundle, appear in no sidebar map — and are
   indexed and reachable. Complete or remove? Note the app ships 30 locales to the docs site's 17.
7. **Who owns the app-repo generator?** Stages 1–3 are commits to `onetimesecret`, not to this repo,
   and they gate Phase 4. Without a named owner and a backlog slot, the realistic outcome is Phase 4
   ships hand-written reference pages that drift exactly as the current two have — making the reshape
   cosmetic. **Highest-risk dependency in the plan.**
8. **Does the docs site own the end-user "send a secret" layer, or does the product?** Twelve of the
   highest-traffic proposed pages document a UI that arguably should be self-explanatory. The content
   demonstrably does not exist anywhere today, but if in-app guidance is planned, these pages should be
   scoped as its durable linkable reference rather than a duplicate. Settle before Phase 2 — it
   determines ~12 pages and the entire Tier 1 translation set.

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
