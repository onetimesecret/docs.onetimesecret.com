# Phase 3 verification ledger — the Features sub-tree

## Recovery boundary (2026-10-29)

**Historical research, not current application guidance.** Recovered from
`docs/phase3-contd@8e83efa2` onto docs base `fe1f61664d305ac9b49ab1f0908aebb197ad18ff`.
The application evidence is pinned to **`onetimesecret@4cbd421`** (`4cbd42149` in the
source); “HEAD”, “now”, “verified”, “shipped” and instructions to write or correct
pages below refer to that historical research context, not today's application or
this recovery branch. Earlier pins remain where the preparation records earlier work.

This recovery did **not** re-verify the roughly 2,300-line Features ledger or every
application citation. It preserves research evidence and open questions, not a new
implementation backlog. Existing implemented documentation, draft flags, navigation,
SSO provider guides and upgrade guides are unchanged. An operator-supplied billing
catalog is evidence of one configuration only, never general product or hosted-plan truth.
See the [recovery disposition](./phase-3-research-recovery-disposition.md) for the
current-documentation pointers and explicit supersessions that take precedence below.

Verified against `onetimesecret@4cbd42149` (2026-08-10) on branch `claude/phase-3-install-group`.
Every line number below was read at that commit by the subject researcher who filed the row. Where a
row's own evidence disagrees with an ADR, a shipped comment, a README or a sibling ledger, the
disagreement is stated in the row rather than smoothed over, and the unresolved ones are collected in
§L.

All paths are APP-relative (`/Users/d/Projects/dev/onetimesecret/onetimesecret`) unless the row says
otherwise. Docs-repo paths are written as `src/content/docs/...`.

**Scope.** The factual spine for **nine** Features pages, in the order an operator meets them, plus
one non-page record (§H) and three absorbed cracks (§N, §O, §P) whose material belongs **outside the
features group** — see the placement block below, and read it before writing anything:

| § | Page | Feature reality at 4cbd42149 |
|---|---|---|
| A | `features/interface-and-homepage` | **partially** — the front-door knobs are real; "homepage mode", the most heavily documented part, is largely inert |
| B | `features/branding` | **fully** — large, mature, entirely operator-facing |
| C | `features/languages` | **fully** — complete, but ships OFF and the locale list has no env var |
| D | `features/broadcast-banner` | **fully** — three operator surfaces over one op layer, no config keys at all |
| E | `features/feedback-channel` | **fully** — but the email half is inert on a stock install |
| F | `features/incoming-secrets` | **fully** — two independent systems (canonical and per-domain) that never intermix |
| G | `features/custom-domains` | **partially** — the machinery is large; the page's actual subject (ownership verification) is not what it appears |
| H | **NO PAGE — record of a non-functional path** | the `caddy_on_demand` strategy returns **403 for every domain** at this pin. §H is retained as the verified record of *why there is no page*, not as a page spine. See the §H head. |
| J | `features/regions-and-federation` | **fully, and it is a real operating practice** — siloed-by-design deployments, plus exactly one thing that crosses (Stripe-mediated billing federation). Renamed from `features/multi-region`; see the §J head for why |
| K | `features/billing-and-entitlements` | **fully, in two halves** — off and irrelevant on a stock install; a real plan system once the operator supplies a catalog. See the catalog provenance note below before citing the catalog |
| N | **NOT A FEATURES PAGE** — Secret Activity (`features.secret_activity` + `features.organizations.audit_logs_enabled`) | **fully, ships ON.** Belongs on `self-hosting/configuration` plus a correction to the published `organizations/audit-trail.md` — see §N head |
| O | **NOT A FEATURES PAGE** — `LINK_DOMAINS` / `DEFAULT_DOMAIN`, which hostname a generated link carries | **fully, and one shipped key does not do what three shipped comments say.** Belongs in the configure group — see §O head |
| P | **NOT A FEATURES PAGE** — upgrades: `bin/ots migrate`, `bin/ots migrations`, auth schema migrations | **fully — three separate systems the docs conflate.** Belongs on its own `self-hosting/upgrading` page — see §P head |

**Page inventory — nine pages, and this is what drives the sidebar, redirects and the reciprocal
allowlist.** `features/interface-and-homepage`, `features/branding`, `features/languages`,
`features/broadcast-banner`, `features/feedback-channel`, `features/incoming-secrets`,
`features/custom-domains`, `features/regions-and-federation`, `features/billing-and-entitlements`.
**Two changes against the earlier plan:** `features/caddy-on-demand-tls` is **dropped — it is not a
page** (§H records why), and `features/multi-region` is **renamed to `features/regions-and-federation`**
(§J head gives the rationale). No redirect is owed: `features/multi-region` was a planned slug that
was never written or published, so there is no URL to redirect from.

> **PLACEMENT RECOMMENDATIONS THAT POINT OUT OF THIS SUB-TREE — read before writing, not after.**
> Three sections below carry material that their researchers say does **not** belong on a Features
> page. Do not create features pages for them:
>
> - **§N (Secret Activity)** → document `SECRET_ACTIVITY_COLLECT`, `ORGS_AUDIT_LOGS_ENABLED` and
>   `SECRET_ACTIVITY_MAX_EVENTS` on **`/en/self-hosting/configuration`** (the link target the published
>   page already points at), plus a self-hosting privacy paragraph, and **correct the plan claim on the
>   existing `organizations/audit-trail.md`**. Do not create `features/secret-activity`.
> - **§O (`LINK_DOMAINS` / `DEFAULT_DOMAIN`)** → the **configure group** (`self-hosting/configuration`,
>   or a short dedicated page), cross-linked from `features/custom-domains`. The researcher named a page
>   *shape* (the decision table) but no group, so the group is a docs-owner decision — §M item 10.
> - **§P (upgrades)** → its **own `self-hosting/upgrading` page**, in neither the features nor the
>   install group.

§K was blocked in the first pass because the plan catalog shipped in neither repo. **That historical research block was
lifted for this operator-specific ledger only**: it was written from an **operator-supplied** catalog, in two halves that must never be
mixed (see the §K head and the citation convention below).

**Order rationale.** A–D are what an operator configures about their own single install's public face
(what visitors see, what it looks like, what language it speaks, how to announce something). E–F are
inbound channels from users. G is multi-tenant hosting; H is the TLS problem it creates, kept as a
record rather than a page. J is multi-deployment topology and the one cross-deployment mechanism. K is
billing, which is last of the page sections because it is the only one whose subject does not exist
until the operator creates it. N, O and P follow the page sections — and precede the conflicts and
open-questions sections — because each is a verified subject whose page lives somewhere else.

**The operator-supplied billing catalog — citation convention, ledger-wide.**

The catalog used by §J, §K, §N, §O and §P is the file at
`/Users/d/Projects/ops/sites/docs.onetimesecret.com/billing.yaml` (docs repo, 402 lines).

- **`sha256 69a96394920fd1777cf23a9bdedee174648f46b54e13c99a1f27b3cdc0a17501`** — recomputed at the
  time of this revision with `shasum -a 256`. If a later pass computes a different digest, **every
  `operator-supplied` row in this ledger must be re-verified.**
- It is **gitignored** in the docs repo (`.gitignore:28`) and tracked in **neither** repo, so it has no
  commit to pin and **a bare line-number citation to it is not reproducible** by a reader or by CI.
- **Therefore: cite it only by key path within the YAML** — `entitlements.custom_domains.category`,
  `plans.free_v1.limits.secret_lifetime`, `match_fields` — never by line number. Rows that read it are
  verdict-labelled `operator-supplied`.
- `/Users/d/Projects/dev/onetimesecret/onetimesecret/etc/billing.yaml` is **not a file and not a copy
  of the shipped example**. It is a symlink resolving, on this machine only, to
  `/Users/d/Projects/_/dotfiles/dotconfig/onetimesecret-dev/billing.yaml` (via
  `~/.config/onetimesecret-dev/`) — one developer's local dev config, in a **third** repository,
  outside both the app repo and the docs repo. It is 420 lines against the docs-repo copy's 402, so
  the two do diverge, but **that divergence is UNSOURCED**: a reader cannot fetch, reproduce or
  verify it, and no commit pins it. **Assert nothing about its contents anywhere in this ledger.**
  Where a divergence must be recorded, cite a **tracked** artefact instead — the shipped example
  `etc/examples/billing.example.yaml` (368 lines at 4cbd42149, sha256 `f72612d1…9826`) or the
  auto-generated `apps/web/billing/docs/plan-definitions.md` (see §N12, §K45).
- **PARSE IT, DO NOT READ IT BY EYE.** A cite-check found four wrong catalog claims and all four came
  from eyeballing the YAML: a 21 that is 19 (N11), a seven-name list that is sixteen (P33), and two
  provenance claims about a symlink nobody resolved (N12, P-h11). **Every enumeration or count taken
  from this file must be produced by `python3 -c "import yaml; …"` against the sha above**, not by
  scrolling. A re-verification pass has since re-derived **all 19 catalog-sourced enumerations** in
  this ledger that way — K2, K14, K38, K39, K40, K41, K42, K44, K45, K46, J42, J43, J44, J45, J46,
  N11, N12, O22, P33. Fifteen held exactly as written; four did not (N11, N12, O22, P33) and are
  corrected in place with the correction called out in the row. **A
  truncated list presented as a full set is worse than no list**, because a writing pass treats a
  ledger row as settled fact and will never re-check it.
- **The catalog is not the governing fact.** On a **stock** self-hosted install billing is off
  (`billing_config.rb` returns false when the file is absent), `STANDALONE_ENTITLEMENTS` grants the
  full set and limits return `Float::INFINITY` — **role is the whole answer there.** The catalog
  describes what an operator gets when they **supply** a billing config, which is a different
  situation. Every row keeps the two apart.

**Hosted vs self-hosted.** The repo ships no production config. `git ls-files etc/` returns only
`etc/.gitignore`, `etc/defaults/{auth,config,logging}.defaults.yaml` and `etc/examples/*` — there is no
tracked `etc/config.yaml`, `etc/auth.yaml` or `etc/billing.yaml`. So every value below sourced from
`etc/defaults/*.yaml`, `lib/onetime/config.rb` `DEFAULTS`, `.env.reference`, `.env.example` or a
compose file is the **self-hosted shipped default** and says nothing about what onetimesecret.com
runs. Behaviour that lives in a code path rather than a config value is labelled **STRUCTURAL** and is
safe to state without a "by default" hedge. A row labelled **hosted-only** describes behaviour that
exists only on the hosted service or only when billing is enabled; it must never be stated flatly on
an operator page.

**Value labels used in the Verdict column.**
`shipped default` — a value in a defaults file, `.env.reference`, or the `DEFAULTS` hash; an operator can change it.
`STRUCTURAL` — a code path; no config key changes it.
`hardcoded` — a literal in code that *looks* like a setting but has no key or env var.
`absence` — the claim is that something does **not** exist; the evidence is an exhaustive search.
`hosted-only` — only true on the hosted service or with billing enabled.
`operator-supplied` — a value read from the operator's billing catalog. **Never STRUCTURAL**: it is one
operator's file, not code, and another operator's catalog may say something else. A value read from
`etc/defaults`, `.env.reference`, a compose file or `billing.yaml` is never structural.

**Billing gate.** No plan-tier, seat, entitlement or price claim is asserted here. Rows record only
that gates exist, where, and — per the governing fact — that they do not bind on a stock self-hosted
install.

---

## 0. The governing fact, as it applies to this sub-tree

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 0.1 | On a stock self-hosted instance billing is off, `STANDALONE_ENTITLEMENTS` grants the full entitlement set, and limits return `Float::INFINITY`. Plan-gating is therefore **not a constraint**, and **role is the whole answer**. | verified (STRUCTURAL) | `lib/onetime/models/organization/features/with_plan_entitlements.rb:48-56` (the constant), `:23-32` (the fail-open contract, verbatim: "Result: STANDALONE_ENTITLEMENTS (full access), limits return Float::INFINITY"); `lib/onetime/billing_config.rb:41-53` (`enabled?` returns false when the file is absent) |
| 0.2 | The five entitlements this sub-tree touches are all members of `STANDALONE_ENTITLEMENTS`: `custom_domains`, `custom_branding`, `incoming_secrets`, `manage_org`, `extended_default_expiration`. | verified | `with_plan_entitlements.rb:48-56`. **Per-name attribution, settled by re-reading `:48-56` at 4cbd42149** (an earlier pass recorded a conflict here; there is none — all four subjects were right): `:49` `create_secrets view_receipt api_access notifications`; `:50` `extended_default_expiration`; `:51` `manage_teams manage_members audit_logs workspace_branding ip_access_rules`; `:52` `custom_domains homepage_secrets incoming_secrets`; `:53` `custom_branding custom_privacy_defaults`; `:54` `custom_mail_sender flexible_from_domain`; `:55` `custom_signin_config custom_signup_validation manage_sso manage_org manage_billing`. 22 names; `manage_orgs` is **not** among them. |
| 0.3 | Effective entitlements are **org ∩ role**, so on a self-hosted install the role set is the binding term. `custom_domains` is an ADMIN-tier role entitlement — an org OWNER or ADMIN can manage domains, a plain MEMBER cannot. | verified (STRUCTURAL) | `lib/onetime/models/organization_membership.rb:80-88` (`ADMIN_ENTITLEMENTS` includes `'custom_domains'`), `:102-106` (role composition) |
| 0.4 | `workspace_branding` is a plan-catalogue entitlement with **zero enforcement anywhere in code**. There is no "workspace branding" feature. | verified (absence) | `git grep workspace_branding 4cbd42149 -- lib apps src` returns only `apps/web/billing/docs/plan-definitions.md:35,225` and VCR cassettes. It is in `STANDALONE_ENTITLEMENTS` (`with_plan_entitlements.rb:51`) and has `locales/content/*/workspace-branding.json` bundles, but nothing checks it. |

**Consequence for every Features page:** describe entitlements only as *hosted* gates, or not at all.
A page that tells a self-hoster to "enable the `custom_domains` entitlement" or calls on-demand TLS,
branding or incoming secrets "a paid feature" is wrong.

---

## A. features/interface-and-homepage

**Feature reality: PARTIALLY.** The front-door knobs (`UI_ENABLED`, `authentication.required`, the
gated-homepage variants, the masthead/footer/capability presentation keys, the per-domain
`HomepageConfig`) are real, correct and worth a page. The part the shipped config file documents most
extensively — **homepage mode** — is largely inert: `mode: internal` does nothing at all, and
`mode: external` does nothing unless CIDRs are set or a proxy injects a header. The app's own in-repo
spec (`docs/specs/homepage-mode-simplify.md:14-18`) recommends deleting the machinery. Write homepage
mode as a short honest section, not a how-to.

### A.1 How the homepage is chosen

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| A1 | The canonical `/` page is a Vue SPA shell; which of four homepage experiences renders is decided **entirely client-side** by `determineComponentMode()` in the router, then dispatched by `Homepage.vue`. The four outcomes are `disabled-ui`, `disabled-homepage`, `BrandedHomepage` (custom domain), `HomepageContent` (normal). | verified (STRUCTURAL) | `src/router/public.routes.ts:21-55`; `src/apps/secret/conceal/Homepage.vue:25-35`. No server-side branch picks the homepage — the server only serializes config. |
| A2 | Precedence inside `determineComponentMode()` is fixed: (1) `ui.enabled === false` wins over everything → `disabled-ui`; (2) a custom domain always → `normal`; (3) canonical only — no session AND (`authentication.required` OR `homepage_mode === 'external'`) → `disabled-homepage`; (4) otherwise `normal`. | verified (STRUCTURAL) | `src/router/public.routes.ts:24-54` |
| A3 | Install-wide `authentication.required` and `homepage_mode` gate the **canonical site only**. A custom domain self-governs via its own `HomepageConfig` record and is never disabled by the install-wide flags. | verified (STRUCTURAL) | `src/router/public.routes.ts:29-37`. Same canonical/custom split the backend enforces in `RecipientResolver` and `CustomDomain#allow_public_secret_creation?`. |

### A.2 Homepage mode — small, and mostly inert

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| A4 | Homepage mode has exactly three config keys, all under `site.interface.ui.homepage`: `mode` (env `UI_HOMEPAGE_MODE`, shipped **nil**), `matching_cidrs` (env `UI_HOMEPAGE_MATCHING_CIDRS`, comma-separated, shipped `[]`), `mode_header` (env `UI_HOMEPAGE_MODE_HEADER`, shipped `O-Homepage-Mode`). | verified — shipped defaults | `etc/defaults/config.defaults.yaml:66-69`; `.env.reference:1359-1367` |
| A5 | Only the literal strings `internal` and `external` are accepted as `mode`. Any other value — including the shipped nil — short-circuits detection to nil before any CIDR or header work. | verified (STRUCTURAL) | `lib/onetime/helpers/homepage_mode_helpers.rb:39-44` |
| A6 | Detection is two-step and CIDR-first: the resolved client IP is tested against the compiled CIDR list; only on no match is the header fallback consulted, and it must equal the configured mode exactly. No match at either step yields nil (default homepage). | verified (STRUCTURAL) | `lib/onetime/helpers/homepage_mode_helpers.rb:53-83`, `:176-189` |
| A7 | CIDR entries carry a privacy floor: IPv4 prefix must be `<= /24`, IPv6 `<= /48`. Narrower blocks are dropped with a warning, unparseable entries with an error — **at request time, in the log only**. Neither fails the boot nor surfaces to the operator. | verified (STRUCTURAL) | `lib/onetime/helpers/homepage_mode_helpers.rb:92-118`, `:131-134`. The compiled list is memoized per controller instance (`@cidr_matchers \|\|=`), so the rejection logs once per instance, not per request. |
| A8 | The client IP used for CIDR matching comes from the global proxy resolution (`Otto::Request#ip` reading `env['otto.client_ip']`, configured from `site.network.trusted_proxy`). Homepage mode has **no proxy settings of its own**; the two former keys are deprecated no-ops that log at boot. | verified (STRUCTURAL) | `lib/onetime/helpers/homepage_mode_helpers.rb:136-148`; `lib/onetime/config.rb:209-227`. Deprecated keys: `site.interface.ui.homepage.trusted_proxy_depth` (`UI_HOMEPAGE_TRUSTED_PROXY_DEPTH`) and `...trusted_ip_header` (`UI_HOMEPAGE_TRUSTED_IP_HEADER`). |
| A9 | **Setting `UI_HOMEPAGE_MODE=external` on its own changes nothing.** With `matching_cidrs` empty there is no CIDR match, and the header fallback only fires if the request actually carries `O-Homepage-Mode: external` — which nothing in the shipped stack sends. Result: `homepage_mode = nil`, normal homepage. | verified (STRUCTURAL) | `lib/onetime/helpers/homepage_mode_helpers.rb:47,54,65,93-94`; `etc/defaults/config.defaults.yaml:68`. No compose file, Caddyfile or proxy sample in the repo sets the header — grep for `O-Homepage-Mode` at the pin hits only config, docs, specs and tests. |
| A10 | **`mode: internal` is inert.** The only consumer of `homepage_mode` anywhere in the frontend tests `=== 'external'`; `internal` and nil render identically. The `useHomepageMode` composable that defines `isInternal` / `showInternalWarning` is imported by **zero** components. | verified (STRUCTURAL, absence of any consumer) | `lib/onetime/helpers/homepage_mode_helpers.rb:39-84` → `apps/web/core/views/serializers/config_serializer.rb:48` → `src/router/public.routes.ts:46-52`; `src/apps/secret/composables/useHomepageMode.ts:1-31`. Independently confirmed in-repo by `docs/specs/homepage-mode-simplify.md:14-18`, which recommends deleting the detection machinery — that is a proposal, not shipped state. |
| A11 | Because non-matching visitors always fall through to the normal homepage, `mode: external` plus CIDRs is a **UI blocklist for the listed networks — not an allowlist**. There is no shipped configuration that shows the form to one network and the gated page to everyone else. | verified (STRUCTURAL) | `lib/onetime/helpers/homepage_mode_helpers.rb:53-83`; `src/router/public.routes.ts:46-52`. `etc/examples/homepage_modes.example.yaml:20-38` ("Example 1: Internal Mode for Office Networks") implies the allowlist reading and is misleading; that example configures a no-op. |
| A12 | The header fallback is client-supplied and unauthenticated: any visitor can send it. It can only select the mode already configured (the value must equal `mode`), so a visitor can opt themselves *into* the gated page but cannot escape it. | verified (STRUCTURAL) | `lib/onetime/helpers/homepage_mode_helpers.rb:176-189` |
| A13 | `homepage_mode` is recomputed on every page render served by the core Page controller and on `/bootstrap/me` and `/colonel`, not only on `/`. | verified (STRUCTURAL) | `apps/web/core/controllers/base.rb:28-36`; `apps/web/core/controllers/page.rb:20-26` |
| A14 | Homepage mode changes **presentation only**. It gates no API endpoint and has no effect on authentication or authorization. The gate for anonymous API callers is `site.interface.api.guest_routes.*` (global `enabled` plus per-operation conceal/generate/reveal/burn/show/receipt), all shipped **true**. | verified (STRUCTURAL) | `etc/defaults/config.defaults.yaml:27-37`, `:204-215`; `lib/onetime/logic/guest_route_gating.rb:32-90`. The shipped config states this in the app's own words at `config.defaults.yaml:33-37`. |

### A.3 The gated ("disabled") homepage

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| A15 | When the canonical homepage is gated, the page rendered is the disabled-homepage dispatcher, with three variants: `closed` (two taglines, no CTA — the frontend default), `minimal` (mark + headline + sign-in CTA), `v1` (full hero + trust strip + optional promo). | verified (STRUCTURAL) | `src/schemas/contracts/disabled-homepage.ts:20-48`; `src/apps/secret/views/disabled/README.md:1-21` |
| A16 | Variant resolution order, highest first: `?variant=` URL query param → per-domain `homepage_config.disabled_homepage_variant` → deployment-wide default **split by context** (custom domains read `ui.homepage.custom_disabled_variant`, the canonical site reads `ui.homepage.disabled_variant`) → the frontend constant `closed`. | verified (STRUCTURAL) | `src/apps/secret/views/disabled/useDisabledConfig.ts:328-356`. The split is deliberate: a custom domain does **not** inherit the canonical `disabled_variant`. This is the fuller reading; the incoming-secrets subject filed the same chain minus the `?variant=` rung (see §L3). |
| A17 | The two deployment-wide variant defaults are `site.interface.ui.homepage.disabled_variant` (env `DEFAULT_DISABLED_HOMEPAGE_VARIANT`, canonical) and `site.interface.ui.homepage.custom_disabled_variant` (env `DEFAULT_CUSTOM_DOMAIN_DISABLED_HOMEPAGE_VARIANT`, custom domains). Both ship **blank**, which resolves to `closed`. | verified — shipped defaults | `etc/defaults/config.defaults.yaml:70-84`; `.env.reference:1374-1392` |
| A18 | An unrecognised variant degrades to `closed` rather than erroring, and does so twice: Zod `.catch(null)` at bootstrap parse, then `coerceDisabledVariant` at dispatch, so a stale or empty stored value cannot blank the page. | verified (STRUCTURAL) | `src/schemas/contracts/bootstrap.ts:182,196`; `src/apps/secret/views/disabled/useDisabledConfig.ts:225-228`. There is **no** server-side validation of the deployment-wide keys — an invalid `DEFAULT_DISABLED_HOMEPAGE_VARIANT` is silently ignored, with no boot warning. |
| A19 | The "What is this link?" affordance on the gated page renders only when `site.interface.ui.homepage.public_links.recipient_intro` (env `HOMEPAGE_PUBLIC_LINKS_RECIPIENT_INTRO`) holds a URL. Shipped default **nil**, so it is hidden on a stock install. | verified — shipped default | `etc/defaults/config.defaults.yaml:85-91`; `src/apps/secret/views/disabled/useDisabledConfig.ts:277-298`; `.env.reference:1369-1372`. This is the one operator-configurable link on the gated page; it exists for recipients who followed a shared link to an install whose front door is closed. |
| A20 | The "promo" affordance on the gated page **never appears on a stock self-hosted install**: auto-detection requires `billing_enabled` true AND a custom domain AND no brand description, and billing is off by default self-hosted. | verified — hosted-only | `src/apps/secret/views/disabled/useDisabledConfig.ts:304-311`; `lib/onetime/billing_config.rb:41-53` |
| A21 | The tri-state affordance overrides `show_promo` and `show_what_is_this` exist **only in the frontend bootstrap contract**. No Ruby code emits a `disabled_homepage` block, and there is no YAML key or env var for them — an operator cannot set them. | verified (absence) | `src/schemas/contracts/disabled-homepage.ts:50-59`; `src/schemas/contracts/bootstrap.ts:577`; absence verified by `git grep -n 'show_promo\|show_what_is_this' 4cbd42149 -- apps/ lib/ etc/` (no hits). Half-built: `src/apps/secret/views/disabled/README.md:32-44,67-69` describes them as operator overrides; they are not reachable at this pin. |
| A22 | An operator can **preview** the gated page without changing config: `GET /disabled` renders the same dispatcher with a "this is a preview" notice, and `?variant=closed\|minimal\|v1` forces a variant on any disabled-homepage URL. | verified (STRUCTURAL) | `apps/web/core/routes.txt:64-67`; `src/router/public.routes.ts:314-348`; `src/apps/secret/views/disabled/useDisabledConfig.ts:28-44`. The route is registered unconditionally and is not linked from navigation. |
| A23 | The `minimal` and `v1` variants render a sign-in CTA; `closed` renders none. When SSO is the only sign-in method and exactly one provider is configured, the CTA POSTs straight to the IdP instead of routing to `/signin`. | verified (STRUCTURAL) | `src/apps/secret/views/disabled/useDisabledConfig.ts:312-326`; `src/apps/secret/views/disabled/README.md:82-97` |

### A.4 The UI kill switch, masthead, footer and capability flags

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| A24 | `site.interface.ui.enabled` (env `UI_ENABLED`, shipped **true**) is the UI kill switch. When false, `/` renders `DisabledUI` — two taglines and nothing else. It does **not** gate any other route and does not gate the API. | verified — shipped default | `etc/defaults/config.defaults.yaml:24-26`; `lib/onetime/config.rb:95-96`; `src/router/public.routes.ts:24-26`; `src/apps/secret/conceal/DisabledUI.vue:15-46`; `.env.reference:1430-1432` |
| A25 | `ui.enabled` has **no server-side enforcement anywhere**. Its only role is to be serialized into the public bootstrap payload and read by the Vue router. | verified (absence) | `apps/web/core/views/serializers/config_serializer.rb:42`; absence verified by `git grep -n "'ui', 'enabled'\|UI_ENABLED" 4cbd42149 -- lib/ apps/` (only a `routes.txt` comment). `.env.reference:1430-1431` says the same in the app's own words: "Does not gate non-homepage routes or API endpoints." |
| A26 | Masthead knobs under `site.interface.ui.header`: `enabled` (`HEADER_ENABLED`, **true** — false collapses the whole `<header>` landmark), `navigation.enabled` (`HEADER_NAV_ENABLED`, **true**), `logo.href` (`LOGO_LINK`, unset = `/`), `logo.show_name` (`LOGO_SHOW_NAME`, unset = auto — shown unless a custom brand logo is configured), `logo.prominent` (`LOGO_PROMINENT`, unset/false keeps the 40px compact logo in authenticated views). | verified — shipped defaults | `etc/defaults/config.defaults.yaml:102-138`; `src/shared/composables/useHeaderEnabled.ts:16-32`; `.env.reference:1408-1440`. All three logo knobs are presentation-only; brand identity (which asset, what the product is called) lives in the `brand:` block and belongs to §B. |
| A27 | The three logo knobs treat an **empty** env var the same as unset (they render YAML nil), so a compose file with a blank assignment does not accidentally pin a value. `logo.href` is JSON-quoted so a URL with YAML-significant characters survives parsing. | verified (STRUCTURAL) | `etc/defaults/config.defaults.yaml:112-134` |
| A28 | The legacy `site.interface.ui.header.branding` nesting and the unprefixed `SITE_NAME` / `LOGO_URL` / `LOGO_ALT` env vars are **soft-deprecated**: they still work through `Config#normalize_brand` fallbacks and only log a warning at boot, even under the strict deprecation policy. | verified (STRUCTURAL) | `lib/onetime/config.rb:264-294`, `:900-912`. Cross-reference §B12/B13. |
| A29 | Public footer links ship **OFF**: `footer_links.enabled` is true only when `FOOTER_LINKS=true`, and `workspace_links.enabled` only when `WORKSPACE_LINKS=true`. `show_version` (`FOOTER_VERSION_ENABLED`) and `help.enabled` (`HELP_ENABLED`) both ship **true**. | verified — shipped defaults | `etc/defaults/config.defaults.yaml:141-143`, `:180-182`, `:195-196`, `:197-199`. The shipped link URLs default to onetimesecret.com properties (docs, status, about, api docs, branding guide). An operator who turns footer links on **inherits those** unless they set `TERMS_URL` / `PRIVACY_URL` / `DOCS_URL` / `STATUS_URL` / `ABOUT_URL` / `CONTACT_URL`. |
| A30 | The four UI capability flags (`burn`, `show`, `receipt`, `recipient`) all ship **true** and compose the interface only. Two gate a whole client-side route by redirecting to NotFound: `show` gates `/secret/*`, `receipt` gates `/receipt/*`. **None gates an endpoint** — that is `guest_routes` (A14). | verified — shipped defaults | `etc/defaults/config.defaults.yaml:93-101`; `src/apps/secret/routes/secret.ts:17-49`; `src/apps/secret/routes/receipt.ts:20`; `.env.reference:1442-1448`. The shipped comment at `config.defaults.yaml:96` states the independence from `guest_routes` explicitly. |

### A.5 The per-domain homepage (custom domains)

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| A31 | On a custom domain the homepage is governed by the per-domain `HomepageConfig` record with three writable fields: `enabled`, `secrets_mode` (`create` \| `incoming`; blank/legacy reads as `create`), `disabled_homepage_variant`. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain/homepage_config.rb:29-50`, `:56-87`, `:106-110`. The site-level `homepage.mode` (internal/external) and the per-domain `secrets_mode` are different things: the first gates WHO sees the interactive homepage, the second selects WHAT it is. The model says so at `:44-48`. |
| A32 | The `enabled` value the frontend receives in bootstrap is the **effective** one (`effectively_enabled?`), not the stored flag. An incoming-mode homepage whose incoming has become unservable **fails closed** to the gated page rather than falling open to the create form the operator did not select. | verified (STRUCTURAL) | `apps/web/core/views/serializers/domain_serializer.rb:120-158`; `lib/onetime/models/custom_domain/homepage_config.rb:178-200`. An unrecognised stored `secrets_mode` (direct Redis write, botched migration) also fails closed — `homepage_config.rb:164-176`, `:192-196`. |
| A33 | `incoming_available?` requires three things: `site.secret` present, an `IncomingConfig` that is `ready?` (enabled with ≥1 recipient), and the owning org holding `incoming_secrets`. It deliberately does **not** consult the install-wide `features.incoming.enabled`, which governs the canonical domain only. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain/homepage_config.rb:202-224`; `etc/defaults/config.defaults.yaml:721-730`. On a stock self-hosted instance the entitlement is granted unconditionally, so the binding conditions reduce to: `SECRET` set, and a ready `IncomingConfig`. |
| A34 | Writing `secrets_mode = 'incoming'` through the tenant API is gated by the `incoming_secrets` entitlement AND `IncomingConfig` readiness, checked only when that request explicitly selects incoming mode. Later drift is not blocked at write time; it is handled fail-closed at read time. | verified (STRUCTURAL) | `apps/api/domains/logic/homepage_config/put_homepage_config.rb:122-177`. On a stock self-hosted instance the entitlement half never binds (`with_plan_entitlements.rb:48-56`; `billing_config.rb:41-53`); the readiness half still binds, and role remains the whole answer for who may call. |
| A35 | A homepage in incoming mode is public but does **not** authorize anonymous secret CREATION. `allow_public_secret_creation?` requires enabled AND a recognised `secrets_mode` AND **not** incoming mode, and it is the gate the secret-creation API consults for anonymous callers on a custom domain. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain.rb:533-562`; `apps/api/v2/logic/secrets/base_secret_action.rb:676-721` (v1 twin at `apps/api/v1/logic/secrets/base_secret_action.rb:616`). Distinct from `allow_public_homepage?` (`custom_domain.rb:523-531`), which only reports whether the homepage record is enabled. |
| A36 | A self-hosted colonel can read and write any domain's homepage config out-of-band: `GET /api/colonel/domains/:extid/configs`, `PUT /api/colonel/domains/:extid/configs/homepage` (fields `enabled`, `secrets_mode`, `disabled_homepage_variant`), `POST .../configs/ensure`, `DELETE .../configs/:kind`. | verified (STRUCTURAL) | `apps/api/colonel/routes.txt:59-63`; `lib/onetime/models/custom_domain/config_registry.rb:58-68`, `:106-112`, `:302-313`. This is the operator-facing lever for a self-hosted install. The colonel PUT deliberately bypasses the entitlement + readiness **write** gate as admin-repair power; read paths still fail closed (`homepage_config.rb:102-105`). |
| A37 | The CLI surfaces homepage state **read-only**: `bin/ots domain info` prints "Allow Public Home"; `verify` prints "Public Homepage" and, in JSON mode, `homepage_config.enabled` (effective) and `homepage_config.secrets_mode`. No CLI command writes homepage config at this pin. | verified (STRUCTURAL) | `apps/api/domains/cli/info_command.rb:79`; `apps/api/domains/cli/verify_command.rb:243`, `:365-368` |
| A38 | If the per-domain `HomepageConfig` record is missing, both `allow_public_homepage?` and `allow_public_secret_creation?` return false and log a repair instruction naming migration `20260417_01_backfill_homepage_config`. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain.rb:523-531`, `:552-562`. `CustomDomain.create!` bootstraps a default-disabled record, so this is a legacy/repair case (`homepage_config.rb:14-18`). |
| A39 | **The entire `site.interface` subtree is copied verbatim into the bootstrap payload served to anonymous visitors** — including `homepage.mode`, `homepage.matching_cidrs` and `homepage.mode_header`. The safe-site whitelist admits `interface` wholesale with no nested filtering. | verified (STRUCTURAL) | `apps/web/core/views/helpers/initialize_view_vars.rb:19-23`, `:298-328`; `apps/web/core/views/serializers/config_serializer.rb:42`. The frontend Zod schema for `homepage` does not declare those three keys (`src/schemas/contracts/bootstrap.ts:167-197`), so they are stripped client-side — but they are still **on the wire** and in the server-rendered `onetime-state` script tag. |

**39 rows.**

### A.6 Gaps — where the evidence runs out

1. **No runtime verification.** Everything in §A is read from source at 4cbd42149; the researcher did not boot the app, render a page, or inspect a real bootstrap payload. The two claims that would most benefit from a runtime check are the `ots-session` cookie mismatch (hazard A-h1) and the on-the-wire exposure of `matching_cidrs` (A39).
2. Could not establish what the gated page's **tagline text** is or whether an operator can change it. `DisabledUI.vue` and `DisabledClosed.vue` render `web.homepage.disabled.tagline1` / `tagline2` from the i18n bundles; whether a self-hoster has a supported override path for locale strings was not traced.
3. Did not establish what `HomepageContent.vue` (the **normal** canonical homepage) exposes as operator-configurable. Nothing in this ledger covers the normal-homepage body.
4. Did not trace `features.incoming.enabled` / the `/incoming` route beyond its interaction with the custom-domain homepage. Source that from §F.
5. The `brand:` block is deliberately out of scope here — it is §B. A26–A28 cover only the masthead **layout** knobs under `site.interface.ui.header`, a different key tier. **The boundary between the two pages is a decision the writing pass has to make explicitly.**
6. Did not verify whether the `?variant=` override survives an SPA navigation (the comment says it is read once at composable-call time and page loads do not preserve query params), nor whether `/disabled` is reachable when `UI_ENABLED=false`.
7. No migration or upgrade note: did not check whether `homepage.mode` existed under a different key in an earlier release, so cannot say what an upgrading operator needs to change.

### A.7 Hazards — do not write these wrong

1. **THE SESSION CHECK IS BROKEN ON A STOCK INSTALL.** The canonical-site gate reads `document.cookie.includes('ots-session')`, but the shipped session cookie is named `onetime.session` and is HttpOnly, so JavaScript can never see it. `hasSession` is therefore always false. Consequence: with `AUTH_REQUIRED=true` (or `homepage_mode === 'external'`), **every** visitor to `/` — including a signed-in one — gets the gated page. Evidence: `src/router/public.routes.ts:40,48,180`; `lib/onetime/boot.rb:87-102` (`'key' => 'onetime.session'`, `'httponly' => true`); `etc/defaults/config.defaults.yaml:376,389`. Verified by code reading only; a docs page must not describe `auth.required` as "signed-in users still see the form on the homepage" until this is confirmed at runtime.
2. `UI_HOMEPAGE_MODE=external` alone is a **no-op**, and `UI_HOMEPAGE_MODE=internal` is a no-op in every configuration. Any page that presents homepage mode as a working three-state control will mislead. The app's own spec (`docs/specs/homepage-mode-simplify.md:14-18`) reaches the same conclusion and proposes replacing the trio with a single `homepage.secret_form: public\|gated` key — so a detailed how-to risks documenting something scheduled for removal.
3. `etc/examples/homepage_modes.example.yaml` ships three examples; Example 1 (`mode: internal` for office networks, "Employees and partners on known networks get full access") configures a **no-op**, and the "Mode Behavior Summary" at `:72-89` describes internal-mode behaviour that does not exist. **Do not quote or link that file as a working recipe.**
4. Operator CIDR ranges configured in `matching_cidrs` are emitted to **every anonymous visitor** in the bootstrap payload. An operator listing internal network ranges is publishing them. A real information-disclosure consideration the page should state (A39).
5. Invalid and too-narrow CIDRs are dropped **silently at request time** — log-only, no boot failure, no health-check signal. A typo yields a working install that silently ignores the entry.
6. The `O-Homepage-Mode` header fallback is **client-spoofable by design**. It can only make a visitor's own experience more restrictive, so it is not privilege escalation — but never describe it as a trusted signal, and an operator terminating TLS at a proxy should strip it inbound rather than rely on it.
7. `src/apps/secret/views/disabled/README.md:42-44,57-59` says "Ruby serializer wiring for the per-domain variant field is TBD". **Stale** at this pin: `put_homepage_config.rb:51,86` accepts it; `domain_serializer.rb:154` and `config_registry.rb:309` serialize it. Do not repeat the README's claim.
8. `apps/web/core/views/helpers/initialize_view_vars.rb:151-153` describes `homepage_mode` as "nil, 'protected'" — a value `determine_homepage_mode` never returns. Stale comment; do not source a claim from it.
9. `show_promo` / `show_what_is_this` are documented in the frontend README as operator overrides but have **no server-side source** at this pin. Writing them up as operator knobs would be wrong.

### A.8 Hosted vs self-hosted

Almost all of §A is operator-side and works identically hosted or self-hosted, because the whole
surface is config-driven with no entitlement gate — `ui.enabled`, `homepage.mode`, the disabled-variant
defaults, `public_links.recipient_intro`, the header/footer/capability knobs are all plain YAML/env
keys with shipped defaults, and the repo carries no production config so every value cited is the
self-hosted shipped default. Three things split. (1) The hosted counterpart page
`custom-domains/homepage-and-incoming` is written for a tenant clicking toggles in the workspace UI;
the operator equivalent for a self-hoster is the colonel API at
`PUT /api/colonel/domains/:extid/configs/homepage` (A36), which additionally bypasses the entitlement
and readiness write gate as admin-repair power. (2) The `homepage_secrets` and `incoming_secrets`
entitlements gate the tenant write path, but on a stock self-hosted instance billing is off and
`STANDALONE_ENTITLEMENTS` grants both, so plan-gating is not a constraint — the binding conditions for
incoming-mode homepages reduce to `SECRET` being set and an `IncomingConfig` being ready, and role is
the whole answer for who may call. (3) The gated homepage's "promo" affordance is structurally
hosted-only (A20): its auto-detection requires `billing_enabled` true, so a self-hoster will never see
it and it must not appear on the operator page as something to turn off.

---

## B. features/branding

**Feature reality: FULLY.** Large, mature and genuinely operator-facing. Three layers, all
self-hosted-reachable with no account, no org, no plan and no billing: a top-level `brand:` config
block driven by 14 `BRAND_*` env vars (all shipping nil), a **brand-pack** mechanism that bundles
static icons plus an optional `brand.yaml` identity manifest as one unit, and a frontend palette
generator that expands one hex into 44 CSS custom properties at runtime. Per-domain (tenant) branding
is a **separate** system and belongs to the hosted `custom-domains/branding` page; it is covered here
only so the operator page can draw the boundary correctly.

### B.1 The layering model and the site-wide `brand:` block

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| B1 | Branding resolves through a three-tier fallback chain, most specific to most generic: per-domain settings in Redis → the site-wide `brand:` config block → the frontend neutral constants. An unbranded install lands on tier 3 and **never shows OTS identity**. | verified (STRUCTURAL) | `docs/architecture/branding.md:12-22`; `src/shared/constants/brand.ts:7-16`. The legacy `site.interface.ui.header.branding` rung is no longer a runtime tier — it is absorbed into tier 2 at boot. |
| B2 | The site-wide brand block is `brand:` at the **top level** of config (not under `site:`), and it exposes exactly **14** `BRAND_*` env vars: `primary_color`, `product_name`, `product_domain`, `support_email`, `signature_name`, `corner_style`, `font_family`, `logo_url`, `logo_dark_url`, `logo_alt`, `favicon_url`, `apple_touch_icon_url`, `og_image_url`, `totp_issuer`. | verified — shipped defaults | `lib/onetime/config.rb:631-646` (`BRAND_ENV`, 14 entries at `:632-645`); `etc/defaults/config.defaults.yaml:673-700` (top-level `brand:` confirmed by `grep -n '^[a-z_]*:'`) |
| B3 | **Every `brand:` key ships as nil.** No brand value ships in YAML — an operator sets `BRAND_*` env vars (or edits `brand:` in their own config file) or gets the neutral theme. | verified — shipped default (nil) | `etc/defaults/config.defaults.yaml:674-700` (each key is `<%= ENV['BRAND_*']&.to_json %>`, which interpolates to nothing when unset); `lib/onetime/models/custom_domain/brand_settings.rb:49-56` (the #3049 rationale, verbatim: "All values default to nil per #3049 (no OTS branding leaks into shipped defaults)") |
| B4 | Each `BRAND_*` var is interpolated into YAML as a JSON-quoted scalar (`&.to_json`) specifically so values with YAML-significant characters survive — a leading `#` in a hex colour would otherwise be read as a comment and dropped to nil, and a leading `&`/`*`/`!`, an embedded `: `, or a newline would abort the whole config document at boot. | verified (STRUCTURAL) | `etc/defaults/config.defaults.yaml:657-665` |
| B5 | `Config#normalize_brand` (run in `after_load`) is the authoritative parser: it re-reads every `BRAND_*` env var in Ruby, trims blanks to nil, and an **env-set value always wins over a YAML-supplied one**. When a var is unset, a value set directly in a YAML config file is left intact. | verified (STRUCTURAL) | `lib/onetime/config.rb:790-803` (`normalize_brand`, the `BRAND_ENV.each` loop); called at `:581` |
| B6 | `BRAND_BUTTON_TEXT_LIGHT` is handled separately from the other 13 and is **default-ON**: only an explicit `false` (env or YAML, whitespace tolerant) disables it. It is nil when nothing is set. | verified — shipped default | `lib/onetime/config.rb:857-868`. It is deliberately absent from `BRAND_ENV`, and therefore also from `BRAND_MANIFEST_KEYS` — **a brand pack cannot set it**. |
| B7 | A logo value ending in `.vue` is rejected from `logo_url` / `logo_dark_url` from **any** source, including an operator-set `BRAND_LOGO_URL`. These are frontend component sentinels, not asset URLs. | verified (STRUCTURAL) | `lib/onetime/config.rb:810-812`; legacy-source variant at `:892-899` (`legacy_brand_value`) |
| B8 | A bare-relative logo path (e.g. `img/logo.svg`) is root-relativized at boot to `/img/logo.svg`, because a bare-relative path resolves against the browser's current route and would 404 on nested routes such as `/receipt/:id`. Absolute URLs and already-root-relative paths pass through untouched. | verified (STRUCTURAL) | `lib/onetime/config.rb:824-835` |
| B9 | A `brand.logo_url` (or `logo_dark_url`) that is **not** an absolute `http(s)://` URL logs a boot CONFIG NOTICE: it renders in the web UI but is **omitted from outbound emails**. This notice is always logged and is not governed by `DEPRECATED_CONFIG_MODE`. | verified (STRUCTURAL) | `lib/onetime/config.rb:846-852` |
| B10 | The email renderer independently gates the logo to an absolute `http(s)` URL: a relative value resolves to nil and the email header degrades to text-only. Emails also require the separate `emailer.show_logo` switch. | verified (STRUCTURAL) | `lib/onetime/mail/views/base.rb:449-454` (the `match?(%r{\Ahttps?://}i) ? candidate : nil` gate), `:477-480`; `lib/onetime/mail/templates/layout.html.erb:43-44` (`if show_logo? && logo_url`) |
| B11 | `emailer.show_logo` / `EMAILER_SHOW_LOGO` ships **false**. An operator who sets `BRAND_LOGO_URL` to a perfect absolute URL still gets text-only email headers until they also turn this on. | verified — shipped default | `etc/defaults/config.defaults.yaml:958-961`. The shipped comment says a broken image looks less trustworthy than none. **The most likely operator surprise on the page** — put it early. |
| B12 | Three legacy unprefixed env vars still work as fallbacks, consulted only when the `brand:` authority left the key nil: `SITE_NAME` → `product_name`, `LOGO_URL` → `logo_url`, `LOGO_ALT` → `logo_alt` (each also has a legacy `site.interface.ui.header.branding` YAML path). | verified (STRUCTURAL) | `lib/onetime/config.rb:666-679` (`LEGACY_BRAND_FALLBACKS`), applied at `:814-820`. Deprecated since #3612; boot warns and names the replacement. Soft deprecations — they never refuse boot. |
| B13 | The three masthead **layout** knobs are **not** deprecated — only their nesting moved to `site.interface.ui.header.logo`, with `link_to` renamed `href`. `LOGO_LINK` / `LOGO_SHOW_NAME` / `LOGO_PROMINENT` are unchanged. | verified (STRUCTURAL) | `lib/onetime/config.rb:684-688` (`LEGACY_HEADER_LOGO_KEYS`), `:901-910` (`normalize_header_layout`); `etc/defaults/config.defaults.yaml:103-132`. **`show_name` changed polarity:** unset now means "show the wordmark unless a custom brand logo is configured". An install that set `LOGO_URL` and relied on the implicit wordmark must now set `LOGO_SHOW_NAME=true` (`config.defaults.yaml:121`, `.env.reference:1412-1418`). |
| B14 | `brand.totp_issuer` (the MFA authenticator label) resolves `totp_issuer` → `product_name` → the literal `'OTS'`. Setting `BRAND_PRODUCT_NAME` alone re-brands **new** MFA enrollments. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain/brand_settings.rb:112`, rationale at `:57-60`. `totp_issuer` is the ONE global default that is not nil — deliberately, because it is baked into already-provisioned authenticator entries. |
| B15 | `brand.signature_name` (`BRAND_SIGNATURE_NAME`) is the email sign-off, deliberately decoupled from `product_name`. Unset falls through to the neutral i18n default "Support Team", not a person's name. | verified — shipped default (nil) | `lib/onetime/models/custom_domain/brand_settings.rb:61-64`, `:72`, `:116` |
| B16 | `brand.allow_public_homepage` and `brand.allow_public_api` are **YAML-only** keys under `brand:` with default `false`. They have **no env var** — absent from `BRAND_ENV` and from the shipped `brand:` block. | verified — shipped default; env var absence verified | `apps/web/core/views/helpers/initialize_view_vars.rb:207-208` (`brand_config.fetch('allow_public_homepage', false)`); absent from `lib/onetime/config.rb:631-646` and from `etc/defaults/config.defaults.yaml:673-700`. Legacy **per-domain** copies of these keys are stripped from the bootstrap payload (`apps/web/core/views/serializers/domain_serializer.rb:91-98`) — `HomepageConfig`/`ApiConfig` are authoritative now. |

### B.2 Brand packs

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| B17 | A brand pack is the single unit of branding: a directory of root-served static assets **plus** an optional `brand.yaml` identity manifest, so one selection ships icons, colours and product name together. | verified (STRUCTURAL) | `etc/defaults/config.defaults.yaml:641-645`; `docs/architecture/branding.md:200-210` |
| B18 | Pack selection uses two keys under `site:`: `site.brand_pack` (`BRAND_PACK`, a bare **NAME**) and `site.brand_assets_dir` (`BRAND_ASSETS_DIR`, an explicit **PATH**). Both ship unset. When both are set, the explicit path wins. | verified — shipped defaults | `etc/defaults/config.defaults.yaml:654-655`; `lib/onetime.rb:129-152` (`resolve_brand_pack_dir` — the `explicit` branch at `:130-140` precedes the name branch at `:142-152`) |
| B19 | Resolution **always lands on a pack**. Unset resolves to the tracked neutral `default` pack; an unknown name or a missing `brand_assets_dir` path warns once and falls back to `default`. nil only if the default pack itself is missing (a broken checkout). | verified (STRUCTURAL) | `lib/onetime.rb:120-152` (contract at `:120-128`; the two warn-and-fall-back arms at `:135-139` and `:147-152`) |
| B20 | A pack NAME is searched across two roots, first existing wins: `etc/branding/<name>` (operator space, checked first) then `public/branding/<name>` (vendor space). Both resolve against `HOME`, not CWD. | verified (STRUCTURAL) | `lib/onetime.rb:90-95` (`brand_pack_roots`), rationale at `:85-89`. `git ls-tree 4cbd42149 -- etc/branding` is **empty**: nothing ships in the operator root; it arrives at runtime via mount or confext. |
| B21 | `BRAND_PACK` is a name, not a path: any value containing a path separator or `..` is rejected outright (traversal guard). | verified (STRUCTURAL) | `lib/onetime.rb:102-110` (the `name.match?(%r{[/\\]\|\.\.})` reject at `:109`) |
| B22 | The repo ships **three** packs under `public/branding/`: the neutral `default`, plus two demonstration vendor packs `linkdepot` (teal `#0D9488`, "LinkDepot") and `vshare` (indigo `#4F46E5`, "VaultShare"). Each carries 8 assets plus `brand.yaml`. | verified — shipped | `git ls-tree -r --name-only 4cbd42149 -- public/branding`; `public/branding/linkdepot/brand.yaml`; `public/branding/vshare/brand.yaml`. An operator can set `BRAND_PACK=linkdepot` and get a fully branded install with **zero** `BRAND_*` vars — a useful worked example. But see hazard B-h4: `.env.reference:1547-1548` claims named packs are "never committed", which these contradict. |
| B23 | The default pack ships a value-free, all-commented `brand.yaml`, so an unconfigured install absorbs **no** brand values from a manifest and `brand.*` stays nil. A drift spec asserts it stays value-free. | verified (STRUCTURAL) | `public/branding/default/brand.yaml:18-24` ("THIS default pack ships NEUTRAL: every key is deliberately COMMENTED OUT"); `lib/onetime/config.rb:724-729` |
| B24 | Precedence for identity scalars is, lowest to highest: **built-in defaults < pack `brand.yaml` < operator `brand:` config < `BRAND_*` env.** `Config#apply_brand_manifest` fills ONLY keys the operator's config left nil, and runs before `normalize_brand`. | verified (STRUCTURAL) | `lib/onetime/config.rb:711-771` (`apply_brand_manifest`; nil-gate at `:749-751`, doc at `:698-710`); invoked at `:571` immediately before `normalize_brand(conf)` at `:581`; `etc/defaults/config.defaults.yaml:667-672` |
| B25 | A pack's `brand.yaml` is whitelisted to the same 14 identity keys as `BRAND_ENV` and read with `YAML.safe_load`, so a pack can **never** reach `site.host`, SMTP credentials, or any non-brand config. Non-String values are rejected, and a malformed manifest is logged and ignored — it never aborts boot. | verified (STRUCTURAL) | `lib/onetime/config.rb:654` (`BRAND_MANIFEST_KEYS = BRAND_ENV.keys`), `:742-748`, `:752-758`, `:768-771` |
| B26 | Six root-served pack assets are **mandatory** and always served from the resolved default pack: `/favicon.svg`, `/safari-pinned-tab.svg`, `/apple-touch-icon.png`, `/icon-192.png`, `/icon-512.png`, `/social-preview.png`. A selected pack mounts an extra `Rack::Static` layer ahead of them, listing only the files that actually exist, so a partial pack falls through. | verified (STRUCTURAL) | `lib/onetime/middleware/static_files.rb:30-33` (`BRAND_PACK_URLS`), `:93-120` (two-layer build, existence filter at `:115`). `/dist` (Vite build output) is never overlaid and still serves from `public/web`. |
| B27 | A pack may also carry an **optional** masthead logo served at `/brand-logo.svg`, `/brand-logo.png`, `/brand-logo-dark.svg` or `/brand-logo-dark.png`. These are existence-filtered on BOTH layers (the neutral default ships no logo), and the file is **inert until `brand.logo_url` points at it**. | verified (STRUCTURAL) | `lib/onetime/middleware/static_files.rb:35-49` (`BRAND_PACK_LOGO_URLS` and the rationale) |
| B28 | The static overlay stack is built **once at boot**. Changing packs, or adding files to a selected pack, requires a restart. | verified (STRUCTURAL) | `lib/onetime/middleware/static_files.rb:105-107` |
| B29 | Static file serving is itself a toggle: `site.middleware.static_files` / `MIDDLEWARE_STATIC_FILES`, shipped **true**. With it off, the brand-pack overlay is never mounted and a reverse proxy must serve the assets. | verified — shipped default | `etc/defaults/config.defaults.yaml:411-414`; `lib/onetime/middleware/static_files.rb:89` |

### B.3 Favicon, webmanifest and head tags

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| B30 | `/favicon.ico` precedence, highest to lowest: (1) the custom domain's uploaded `icon`, (2) its uploaded `logo`, (3) a 302 redirect to `brand.favicon_url` — **but only if it starts with `https://`**, (4) the resolved brand pack's `favicon.ico`, (5) the default pack's, (6) an empty 0-byte body. | verified (STRUCTURAL) | `apps/web/core/logic/page/get_favicon.rb:53-72`, `:74-86` (the `start_with?('https://')` gate at `:77`), `:141-157`; `lib/onetime.rb:173-181`. The `https://` requirement is **stricter** than `BrandSettings.valid_url?` — a root-relative `BRAND_FAVICON_URL` validates elsewhere but is silently ignored by this route. |
| B31 | The neutral SVG favicon `<link>` is emitted **only** on a default install with no `brand.favicon_url`, and is suppressed on custom domains and on installs with a favicon override — otherwise browsers would prefer the neutral SVG and shadow the higher-precedence icon. | verified (STRUCTURAL) | `apps/web/core/views/helpers/initialize_view_vars.rb:229-239` |
| B32 | `/site.webmanifest` is served by a route that resolves the pack's manifest overlay-first (then the default pack, then a built-in `NEUTRAL_FALLBACK`) and overlays `BRAND_PRODUCT_NAME` / `BRAND_PRIMARY_COLOR` onto it — so those two env vars brand the Android install with no file change. | verified (STRUCTURAL); overlay contents attributed to app docs | `apps/web/core/logic/page/get_webmanifest.rb:14`, `:86` (`Onetime.brand_asset_path('site.webmanifest')`); the "overlays product name and theme colour" half comes from `docs/product/branding-favicon.md:74-77`, **not** from reading the method body — see gap B-g4. |
| B33 | `brand.apple_touch_icon_url` and `brand.og_image_url` are the two head-tag overrides that do NOT default to nil at render time: they resolve to the bundled neutral files `/apple-touch-icon.png` and `{baseuri}/social-preview.png`, so the head always emits a valid, brand-agnostic pack. | verified (STRUCTURAL) | `apps/web/core/views/helpers/initialize_view_vars.rb:219-227` |

### B.4 What reaches the browser, and the palette

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| B34 | Eleven brand fields reach the frontend in the bootstrap payload: `brand_primary_color`, `brand_product_name`, `brand_product_domain`, `brand_support_email`, `brand_corner_style`, `brand_font_family`, `brand_button_text_light`, `brand_logo_url`, `brand_logo_dark_url`, `brand_logo_alt`, `brand_favicon_url`. | verified (STRUCTURAL) | `apps/web/core/views/serializers/config_serializer.rb:75-88` |
| B35 | The frontend neutral fallback is `NEUTRAL_BRAND_DEFAULTS`: primary colour `#3B82F6`, product name **"Secure Links"**, `button_text_light: true`, corner `rounded`, font `sans`. The Ruby side keeps the same literals in lockstep (`NEUTRAL_PRODUCT_NAME = 'Secure Links'`). | verified (STRUCTURAL) | `src/shared/constants/brand.ts:51-57`, philosophy note at `:36-49`; `lib/onetime/models/custom_domain/brand_settings.rb:75-81`, `:33-42`. The deprecated `DEFAULT_BRAND_HEX` (`#dc4a22`, OTS orange) is **not** the fallback — it survives only where OTS-orange is specifically intended (`docs/architecture/branding.md:75-80`). |
| B36 | At render time the primary colour is expanded into **44 CSS custom properties** — 4 prefixes (`brand`, `branddim`, `brandcomp`, `brandcompdim`) × 11 shades (50…950) — written to `document.documentElement`. Shade 500 is the supplied colour; lighter shades use a sqrt curve to L_MAX 0.98, darker a linear ramp to L_MIN 0.25. The complement is a 180° hue rotation. | verified (STRUCTURAL) | `src/utils/brand-palette.ts:293-322` (`generateBrandPalette`, prefix loop at `:319-322`), `:26-28`, `:303`, `:212-223` |
| B37 | `useBrandTheme()` writes the palette and the `--radius-brand` variable onto `document.documentElement` and re-applies on brand or primary-colour change, so branding is applied **client-side at runtime**, not baked into the CSS bundle. | verified (STRUCTURAL) | `src/shared/composables/useBrandTheme.ts:38`, `:120-149`, `:230-246` |
| B38 | The install logo is never rendered as the operator's on a tenant custom domain: `installLogoUri` returns null whenever the request is on a custom domain. The dark variant and the install alt text carry the same guard and are additionally inert unless the install logo is the asset being rendered. | verified (STRUCTURAL) | `src/shared/stores/identityStore.ts:251-252`, `:267-268`, `:304-305` |

### B.5 Per-domain (tenant) branding — the boundary

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| B39 | Per-domain branding is a **separate model**: `CustomDomain::BrandSettings`, a Ruby `Data.define` with **25** members, stored as its own Redis hash on the custom domain. | verified — hosted-shaped surface, reachable self-hosted | `lib/onetime/models/custom_domain/brand_settings.rb:169-195` (the 25 members), `:474-478` (`to_h_for_storage`, JSON-encoded, nils excluded). Note the deliberate asymmetry at `:163-168`: `logo_alt` is install-only and a per-domain `logo_alt` is silently dropped by the members slice. |
| B40 | Per-domain defaults applied by `BrandSettings.from_hash`: `font_family` `sans`, `corner_style` `rounded`, `primary_color` `#3B82F6` (overridden by `brand.primary_color` when set), `locale` `en`, `button_text_light` `true`, `default_ttl` nil, `passphrase_required` `false`, `notify_enabled` `false`. All other members default to nil. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain/brand_settings.rb:33-42` (`DEFAULTS`), `:85-90`, `:204-219` |
| B41 | Write-path validation on per-domain brand settings: colours must be 3- or 6-digit hex (normalized to uppercase 6-digit); `font_family` and `heading_font` must be one of `sans serif mono system slab rounded humanist geometric`; `corner_style` one of `rounded square pill`; `border_radius` one of `none sm md lg xl` OR an integer 0–64 px; `logo_url`/`logo_dark_url`/`favicon_url` must be `https://` or `/`-relative, ≤2048 chars, never protocol-relative `//`; `default_ttl` a positive integer. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain/brand_settings.rb:240-257` (`validate!`), `:132` (FONTS), `:136` (CORNERS), `:148-149` (RADII, `RADIUS_MAX=64`), `:352-370`, `:452-467`, `:334-346`. `FONTS` is **eight** values, not the three (`sans\|serif\|mono`) that `docs/architecture/branding.md:280` still lists. `border_radius` is the richer replacement for `corner_style` and takes precedence when both are set (`:138-142`). |
| B42 | **WCAG contrast is NOT enforced on save.** Only hex format is checked. The contrast primitives (`contrast_ratio`, `WCAG_AA_LARGE` 3.0 / `WCAG_AA_NORMAL` 4.5) are retained for advisories only. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain/brand_settings.rb:151-160` ("WCAG contrast is NOT gated on save (product decision 2026-07)"), `:247-250`, `:378-406`. Contradicts `docs/architecture/branding.md:278`, which still says "WCAG-AA ≥3:1 vs white" is enforced at write time. **The code is the authority.** |
| B43 | Six per-domain free-text fields (`product_name`, `footer_text`, `instructions_pre_reveal`, `instructions_reveal`, `instructions_post_reveal`, `description`) are HTML-stripped and truncated to 500 characters at the write boundary. | verified (STRUCTURAL) | `apps/api/domains/logic/domains/update_domain_brand.rb:32-42` (`TEXT_FIELDS`), `:291-297` |
| B44 | Tenant logo and icon uploads are stored as **base64 in Redis hashkeys** on the custom domain (`custom_domain.logo`, `custom_domain.icon`) alongside filename, content_type, width, height, ratio and bytes — no filesystem or object store is involved. | verified (STRUCTURAL) | `apps/api/domains/logic/domains/update_domain_image.rb:112-148`, `:173-176`; class variants at `:179-205`. Because these are their own hash keys, the writes persist without `custom_domain.save` (`:127-132`). |
| B45 | Logo uploads accept `image/jpeg, png, gif, svg+xml, webp, bmp, tiff` up to **2 MB**. Icon uploads additionally accept `image/x-icon` and `image/vnd.microsoft.icon`, but are capped at **512 KB**. | verified (STRUCTURAL) | `apps/api/domains/logic/domains/update_domain_image.rb:14-19` (`IMAGE_MIME_TYPES`, `MAX_IMAGE_BYTES = 2 * 1024 * 1024`), `:105-107`, `:186-204` (`ICON_MIME_TYPES`, `MAX_ICON_BYTES = 512 * 1024`). **The constant is annotated `# 1 MB` but the arithmetic is 2 MB** — see hazard B-h2. |
| B46 | An uploaded tenant logo is served at `/imagine/{domain_extid}/logo.png`, a **no-auth** route. | verified (STRUCTURAL) | `apps/web/core/views/serializers/domain_serializer.rb:214-218`; `apps/web/core/routes.txt:104`; `apps/web/core/controllers/page.rb:28-29` |
| B47 | Favicons derived from a tenant upload are resized to 32×32 PNG and cached in an `encoded_favicon` field. `.ico` uploads pass through unresized. Re-uploading clears the cache and tags the source `user_upload` so the favicon-fetch worker cannot clobber it. | verified (STRUCTURAL) | `apps/web/core/logic/page/get_favicon.rb:31-35`, `:90-134`; `apps/api/domains/logic/domains/update_domain_image.rb:141-145`. **Non-PNG, non-ICO uploads are NOT resized** — the original bytes are served (`get_favicon.rb:103-110`, with an explicit TODO). |
| B48 | Writing per-domain brand settings or uploading a logo requires: the domain exists, the caller is an active member of the owning organization with `manage_org`, the org has `custom_branding`, and the membership can access that domain. Read-only counterparts deliberately skip the `manage_org` check so ordinary members can view the page. | verified (STRUCTURAL) | `apps/api/domains/policies/domain_config_authorization.rb:145-168`, `:109-118`, `:22-26`; `apps/api/domains/logic/domains/update_domain_brand.rb:126-132`; `apps/api/domains/logic/domains/update_domain_image.rb:163-169` |
| B49 | `custom_branding` is a member of `STANDALONE_ENTITLEMENTS`, so on a stock self-hosted instance (billing off) the entitlement gate **never binds** and `manage_org` role is the whole answer. | verified (STRUCTURAL) | `lib/onetime/models/organization/features/with_plan_entitlements.rb:48-56` (`custom_branding` at `:53` per this subject), fail-open contract at `:23-32`. **Governing-fact row** — any prose that calls per-domain branding "plan-gated" must say this. |
| B50 | Custom domains — and therefore per-domain branding — are **off by default self-hosted**: `features.domains.enabled` / `DOMAINS_ENABLED` ships **false**. | verified — shipped default | `etc/defaults/config.defaults.yaml:770-771`; `lib/onetime/config.rb:129-144`. Verified enforcement is at the bootstrap payload — the authenticated user's domain list is only serialized when the flag is on (`apps/web/core/views/serializers/domain_serializer.rb:221-230`). See gap B-g1 and §G6, which resolves it. |
| B51 | A gated per-domain `default_ttl` above the free ceiling requires the `extended_default_expiration` entitlement — also in `STANDALONE_ENTITLEMENTS`, so it does not bind self-hosted. A second gate, `custom_privacy_defaults` on `default_ttl`/`passphrase_required`/`notify_enabled`, is present in the source but **COMMENTED OUT and does not run**. | verified (STRUCTURAL) | `apps/api/domains/logic/domains/update_domain_brand.rb:266-274` (active gate), `:76-77` ("Disabled while we figure out whether we want this entitlement at all"), `:237-245` (the dead method); `lib/onetime/models/organization/features/with_plan_entitlements.rb:50-53` |

### B.6 Operator diagnostics and build-time packs

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| B52 | Operators have a first-class diagnostic: **`bin/ots config brand`** (add `--json`). It prints brand-pack resolution — raw `BRAND_*` env, the frozen boot config snapshot, search roots, the live-resolved directory, a fell-back-to-default flag, on-disk manifest keys, a boot-vs-live mismatch flag, and the overlay assets found. **Exit codes gate a deploy: 2 = default pack itself missing, 1 = fell back to default or boot-vs-live mismatch, 0 = ok.** | verified (STRUCTURAL) | `lib/onetime/cli/config_brand_command.rb:15-18` (exit codes), `:38-48`, `:89-94`, `:191`. Built for the v0.26.0 incident where byte-identical brand files rendered correctly in two regions and fell back to neutral in a third (`:5-9`). **The single best thing this page can hand the reader.** |
| B53 | The same payload is exposed to a colonel over HTTP at `GET /system/brand` (session auth, colonel role, internal scope). It is a thin adapter over `Onetime.brand_pack_diagnostics` — the single source of truth shared with the CLI. | verified (STRUCTURAL) | `apps/api/colonel/routes.txt:41`; `apps/api/colonel/logic/colonel/get_brand_diagnostics.rb:10-40`; `lib/onetime.rb:184-200` |
| B54 | A brand pack can be baked into the image at build time with `--build-arg BRAND_PACK=<name>`; the build **fails hard** if the named pack does not exist. The same pack also works at runtime with no rebuild. | verified — shipped | `Dockerfile:173`, `:180-188`; `docker/README.md:160-167`. Already row 14 of the install-and-deploy ledger; repeated here so the branding page can reference it without re-verifying. |
| B55 | The neutral icon pack is generated from one keyhole glyph by `scripts/branding/mark.mjs`, whose three constants read **generator-only** env vars (`MARK_PRIMARY_COLOR`, `MARK_BACKGROUND_COLOR`, `MARK_PATH`) — deliberately not the runtime `BRAND_*` vars, so an ambient `BRAND_PRIMARY_COLOR` cannot pollute the neutral defaults. `pnpm run gen:favicons` rasterizes a pack. | attributed to app docs, **not line-verified in source** | `docs/architecture/branding.md:264-272`; `docs/product/branding-favicon.md:9-12`. See gap B-g3 — verify before writing, or attribute. |

### B.7 Corrections owed to the published hosted page

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| B56 | **CORRECTION.** `src/content/docs/en/custom-domains/branding.md:11` and `:26` both say uploads must be "PNG or JPG … under 1MB". The server accepts **seven** image types up to **2 MB** for logos, and **nine** (including `.ico`) up to **512 KB** for icons. | verified — correction owed to a published page | `apps/api/domains/logic/domains/update_domain_image.rb:14-19`, `:105-107`, `:186-204` versus `src/content/docs/en/custom-domains/branding.md:11,26` |
| B57 | **CORRECTION.** `src/content/docs/en/custom-domains/branding.md:13` uses `#DC4A22` as the example hex. That is the retired OTS-orange `DEFAULT_BRAND_HEX`, deliberately no longer the product's brand default; the neutral default is `#3B82F6`. | verified — correction owed to a published page | `src/shared/constants/brand.ts:43,52`; `lib/onetime/models/custom_domain/brand_settings.rb:29-36`; `docs/architecture/branding.md:75-80` versus `custom-domains/branding.md:13`. Cosmetic, but the whole #3049 posture is that OTS-orange must not read as the default anywhere. |

**57 rows.**

### B.8 Gaps — where the evidence runs out

1. **B-g1.** Did **not** establish a server-side refusal for `features.domains.enabled = false` on the `/api/domains/*` **write** endpoints. What is verified is that the flag gates the frontend surfacing (`domain_serializer.rb:221-230`) and that `DomainConfigAuthorization#verify_feature_flag!` reads `features.organizations.<flag>` — a **different** subtree — and returns early because `UpdateDomainBrand` does not define `config_feature_flag` (`domain_config_authorization.rb:120-127`, `:185-197`). So a page may say "custom domains are off by default and the UI is not offered"; it may **not** say "the API refuses" from this evidence alone. **Partly resolved by §G6**, which found the same absence on `AddDomain` — see §L5.
2. **B-g2.** `apps/api/v1/logic/base.rb:41-47` reads `site.fetch('domains')` while the config key is `features.domains`. On the shipped config that dig returns nothing and `@domains_enabled` is always false in the v1 logic base. Whether anything downstream is broken, or a compatibility shim mirrors the subtree, was not traced. **Do not build any prose on `domains_enabled` in the v1 API path.**
3. **B-g3.** `scripts/branding/mark.mjs` was read only through the app's own prose. The three generator constants, the `MARK_*` env var names, and the `pnpm run gen:favicons` script name are **not** line-verified in source (B55).
4. **B-g4.** `GetWebmanifest`'s `NEUTRAL_FALLBACK` contents and the exact keys it overlays were not verified — only the `brand_asset_path` call at `get_webmanifest.rb:86` and the doc claim at `:14` (B32).
5. **B-g5.** Did not verify how `heading_font`, `secondary_color`, `background_color`, `text_color` or `border_radius` are **consumed** on the frontend — only that they validate and store. Whether every one of the 25 per-domain members actually renders anywhere is unestablished.
6. **B-g6.** Did not verify the per-domain brand editing UI's route or field set, nor whether all 25 members are exposed in it. `update_domain_brand.rb` accepts any member key; the UI may expose fewer.
7. **B-g7.** Did not verify what `RemoveDomainImage` does, or whether removing a logo also clears the derived favicon cache.
8. **B-g8.** Nothing establishes what happens to a running instance when `brand.yaml` changes on disk without a restart, beyond the diagnostic's `boot_vs_live_mismatch` flag existing. The mount-race detector's exact semantics (`lib/onetime.rb:184-360`) were read only in outline.

### B.9 Hazards — do not write these wrong

1. **B-h1.** `workspace_branding` is a plan-catalogue entitlement with **zero enforcement in code** (row 0.4). **Do not describe a "workspace branding" feature on an operator page; there is no such gate.**
2. **B-h2.** `MAX_IMAGE_BYTES = 2 * 1024 * 1024` is annotated `# 1 MB` (`update_domain_image.rb:18`). The code is **2 MB**. A page that copies the comment will be wrong — and so is the existing hosted page (B56).
3. **B-h3.** The app's own `docs/architecture/branding.md` has drifted from the code in **three** places: (a) `:26` says `BrandSettings` has "22 fields" — it has 25; (b) `:280` lists fonts as `sans \| serif \| mono` — `FONTS` is eight values; (c) `:278` says colour is "WCAG-AA ≥3:1 vs white" validated at write time — contrast is explicitly **not** enforced on save. **Cite the code, never that doc.**
4. **B-h4.** `.env.reference:1547-1548` states named packs are "generator output … never committed", but `public/branding/linkdepot/` and `public/branding/vshare/` are both tracked at this pin. Either the statement is stale or those two are intentional demo packs. **Do not repeat the "never committed" claim.**
5. **B-h5.** `/favicon.ico` honours `BRAND_FAVICON_URL` only when it starts with `https://` (`get_favicon.rb:77`). A root-relative value passes `BrandSettings.valid_url?` and passes `normalize_brand` untouched, then is silently ignored by the route — the operator sees no error, just the pack favicon. **The exact shape of a support ticket.**
6. **B-h6.** `BRAND_LOGO_URL` has **three different acceptance policies** depending on surface, and they disagree by design: `normalize_brand` accepts anything except `*.vue` and root-relativizes bare paths; the web UI renders relative paths fine; the mail renderer nils out anything that is not absolute `http(s)` (`mail/views/base.rb:449-454`). A page that states one rule will be wrong on two surfaces.
7. **B-h7.** `emailer.show_logo` ships **FALSE**. Setting `BRAND_LOGO_URL` to a perfect absolute HTTPS URL still produces text-only email headers. The single likeliest "branding doesn't work" report — put it early on the page.
8. **B-h8.** `LOGO_SHOW_NAME` changed polarity in #3612: unset now means "show the wordmark unless a custom brand logo is configured", where it previously meant always-on. An upgrading install that set `LOGO_URL` and relied on the implicit wordmark **loses it silently**.
9. **B-h9.** Brand-pack changes need a **RESTART** — the `Rack::Static` overlay stack and the existence filter are both resolved once at boot (`static_files.rb:105-107`). An operator who drops a file into a mounted pack and reloads will see nothing change.
10. **B-h10.** `brand.allow_public_homepage` / `brand.allow_public_api` have **no env var at all**. An operator following the `BRAND_*` pattern will try `BRAND_ALLOW_PUBLIC_HOMEPAGE` and it will do nothing. They are YAML-only.
11. **B-h11.** The per-domain `logo_alt` field is accepted by the API's key filter but then intentionally dropped, because `logo_alt` is install-only and a tenant logo takes its accessible name from the domain display name (`brand_settings.rb:163-168`). A write of that field **silently no-ops**.
12. **B-h12.** Non-PNG, non-ICO tenant uploads used as favicons are served at their **original dimensions** — the resize path only handles PNG, with a TODO for the rest (`get_favicon.rb:103-110`). A 2 MB WebP logo becomes a 2 MB favicon.

### B.10 Hosted vs self-hosted

Branding at 4cbd42149 is **two distinct systems that a docs page must not merge.** (1) **Install-wide
branding** — the `brand:` config block (14 `BRAND_*` env vars), the brand-pack mechanism
(`BRAND_PACK` / `BRAND_ASSETS_DIR`), the favicon/webmanifest routes, the email logo/sign-off, and the
frontend palette generator. Entirely operator-facing, works on a stock self-hosted instance with no
account, no org, no plan and no billing, and is the whole substance of an operator branding page.
Every shipped default is nil/neutral by deliberate policy (#3049): an unbranded install renders
neutral blue `#3B82F6` and product name `Secure Links`, never OTS identity. (2) **Per-domain (tenant)
branding** — `CustomDomain#brand`, the 25-field `BrandSettings` in Redis, edited through
`PUT /api/domains/:extid/brand` and the logo/icon upload endpoints. This is the hosted-shaped surface
documented at `custom-domains/branding`; it is reachable self-hosted but only after
`DOMAINS_ENABLED=true` (ships false) and only for a user with `manage_org` in the owning org. Its
`custom_branding` entitlement is in `STANDALONE_ENTITLEMENTS`, so on a stock self-hosted instance it
never binds — role is the whole answer. A third name, `workspace_branding`, appears in the plan
catalogue and is enforced **nowhere**; treat it as a hosted billing label only.

---

## C. features/languages

**Feature reality: FULLY.** Locale support is real and complete. The single most important operator
fact is that **it ships OFF**, and the second is that **the locale list is the one i18n setting with
no environment variable** — restricting it requires editing or mounting a YAML file. Thirty locales
ship with a complete 44-file content tree each.

### C.1 The master switch and the shipped list

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| C1 | Internationalization **ships OFF**. Key `internationalization.enabled`, env `I18N_ENABLED`, shipped default **false**. Nothing multilingual happens until an operator turns it on. | verified — shipped default | `etc/defaults/config.defaults.yaml:1289-1290` (`enabled: <%= ENV['I18N_ENABLED'] == 'true' \|\| false %>`); `lib/onetime/config.rb:157-162` (`'enabled' => false`). Only the literal string `true` enables it — the ERB is an equality test, so `I18N_ENABLED=1` or `=yes` leaves it off. |
| C2 | When i18n is off, the entire shipped locale list is **discarded**: supported locales collapse to `['en']`, default locale to `'en'`, fallback chain to `nil`. The `locales:` list is read and then thrown away. | verified (STRUCTURAL) | `lib/onetime/initializers/load_locales.rb:29-30`, `:37`, `:39-48`, `:51-55` |
| C3 | The shipped `.env.reference` sets `I18N_ENABLED=true` as an **active, uncommented line** — contradicting the YAML/DEFAULTS default of false. | verified — shipped (conflicting) defaults | `.env.reference:932-933` (`I18N_ENABLED=true`, `I18N_DEFAULT_LOCALE=en`). **A docs page must not state a single "the default is X" without naming which file the reader started from.** `.env.example` contains no I18N keys at all. |
| C4 | **Thirty** locales ship in the default list: `ar bg ca_ES cs da_DK de de_AT el_GR en eo es fr_CA fr_FR he hu it_IT ja ko mi_NZ nl pl pt_BR pt_PT ru sl_SI sv_SE tr uk vi zh`. Codes use POSIX **underscores**, not BCP-47 hyphens. | verified — shipped default | `etc/defaults/config.defaults.yaml:1336-1366`. This is the list at 4cbd42149. **Do not carry over any remembered count** — the docs site's own 12-language figure describes the docs site, not the app. |
| C5 | Each of the 30 locales has a complete source tree in the repo: `locales/content/<code>/` with **44** namespace JSON files apiece, English included. | verified | `git ls-tree --name-only 4cbd42149 locales/content/` → 30 directories; each `<code>/` → 44 files. **File-count parity is not key-level parity** — see gap C-g1. |
| C6 | The default locale key is `internationalization.default_locale`, env `I18N_DEFAULT_LOCALE`, shipped default `en`. | verified — shipped default | `etc/defaults/config.defaults.yaml:1291`; `lib/onetime/config.rb:159`; read at `lib/onetime/initializers/load_locales.rb:86` |
| C7 | Setting `default_locale` to a code that is **not in** the `locales:` list **silently disables i18n entirely** — the instance drops to English-only. It logs one error line and boots normally. | verified (STRUCTURAL) | `lib/onetime/initializers/load_locales.rb:42-47`, `:51-55`. Same outcome if an operator sets `locales: []` with i18n enabled: the list's `.first` is nil, default resolves to `en`, `en` is not in the empty list, and i18n turns itself off. |
| C8 | Restricting the enabled set means **replacing** `internationalization.locales` in `etc/config.yaml`. YAML arrays replace rather than merge, so a shorter operator list wins outright over the shipped 30. | verified (STRUCTURAL) | `lib/onetime/utils/enumerables.rb:36-46` (merger proc: hashes recurse, everything else is `v2`); `lib/onetime/config.rb:329-361` |
| C9 | **There is no environment variable for the locale list.** The only i18n env vars are `I18N_ENABLED`, `I18N_DEFAULT_LOCALE`, `I18N_DATE_FORMAT`, `I18N_DATETIME_FORMAT`. Restricting the set requires editing/mounting a YAML file. | verified (absence) | `git grep -n I18N 4cbd42149 -- .env.example .env.reference docker/ etc/` returns only those four; `etc/defaults/config.defaults.yaml:1290,1291,1306,1307`. **The single biggest practical constraint on the page.** |
| C10 | In the Docker image `etc/config.yaml` is a byte copy of `etc/defaults/config.defaults.yaml`, created at build time with `--update=none`. So the locale list is present and editable at `/app/etc/config.yaml`, and a bind-mounted file of the operator's own is preserved. | verified — shipped | `Dockerfile:423-436`. The repo tracks no `etc/config.yaml`: `git ls-files etc/` returns only `.gitignore`, `defaults/*`, `examples/*`. |

### C.2 Per-request locale resolution

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| C11 | Per-request locale resolution order is: `?locale=` query parameter → `session['locale']` → `Accept-Language` header → the configured default. Each candidate must be a member of the available-locale map or it is skipped. | verified (STRUCTURAL, gem-owned) | `lib/onetime/application/middleware_stack.rb:455-466` (mounts `Otto::Locale::Middleware`); the chain itself is **otto 2.8.0** gem `lib/otto/locale/middleware.rb:71-88` and `:193-196`. Cite it as a **dependency**, not as app code (`Gemfile:24`, `Gemfile.lock:278`). |
| C12 | `Accept-Language` is parsed with RFC 2616 q-values and sorted by preference, not first-tag-wins. Each tag resolves in order: exact underscore match (`fr-FR`→`fr_FR`) → lowercase → BCP-47 canonical → the configured fallback chain → bare primary language code. | verified (STRUCTURAL, gem-owned) | otto 2.8.0 `lib/otto/locale/middleware.rb:108-132`, `:143-167`, `:173-187` |
| C13 | A supported regional code also registers its bare primary code in the available map — `it_IT` makes `it` resolvable — but only if no locale with that primary code is already present. Display names come from a hardcoded 30-entry map in the app. | verified (STRUCTURAL) | `lib/onetime/application/middleware_stack.rb:100-131` (the `locale_names` literal), `:133-147` (alias at `:144-145`) |
| C14 | A locale code added to config but absent from that hardcoded name map still works — it is registered with its raw code as its display name. | verified (STRUCTURAL) | `lib/onetime/application/middleware_stack.rb:140` |
| C15 | The signed-in account's stored locale is **not** part of the otto resolution chain. It reaches the request by being copied into the session at signin. | verified (STRUCTURAL) | `apps/web/auth/operations/sync_session.rb:294`; `apps/api/invite/logic/invites/signup_and_accept.rb:289`. No other writer of `session['locale']` exists besides C16. |
| C16 | The language picker POSTs `/api/account/update-locale`, which is **unauthenticated** (`auth=noauth`). An anonymous visitor's choice writes `session['locale']` only; a signed-in user's choice writes both the session and `cust.locale`. | verified (STRUCTURAL) | `apps/api/account/routes.txt:15`; `apps/api/account/logic/account/update_locale.rb:49-58`, `:18` |
| C17 | That endpoint rejects anything outside the effective supported set with a form error — it is the enforcement point for a restricted list. | verified (STRUCTURAL) | `apps/api/account/logic/account/update_locale.rb:41-43`, `:60-62` |
| C18 | A new account's locale is stored as the **empty string**, not the request locale. Until the user picks a language, every email to them uses the instance default locale. | verified (STRUCTURAL) | `lib/onetime/models/customer.rb:167`, `:205-209`; consumers use `OT.default_locale if locale.to_s.strip.empty?` — e.g. `apps/api/account/logic/authentication/reset_password_request.rb:128`, `apps/api/organizations/logic/invitations/create_invitation.rb:102` |
| C19 | An unresolvable or non-available locale never errors at request time: `Middleware::I18nLocale` validates against `I18n.available_locales` and silently substitutes the default before scoping the request. | verified (STRUCTURAL) | `lib/middleware/i18n_locale.rb:32-49` |

### C.3 Fallbacks, build artifacts and verification

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| C20 | An untranslated key renders in the **default locale**, not as a raw key: ruby-i18n is configured with the Fallbacks backend and a fallback root of the configured default locale. | verified (STRUCTURAL) | `lib/onetime/initializers/setup_i18n.rb:30-31`, `:35-38` |
| C21 | The locale compile step does **not** backfill missing keys from English. `generated/<locale>.json` contains only the keys that locale actually has; the English fill happens at **lookup** time, not build time. | verified (STRUCTURAL) | `locales/scripts/i18n/commands/content.py:318-389`, `:452-472` |
| C22 | The runtime locale files `generated/locales/*.json` are **not in git**. They are build output from `pnpm run locales:sync` (a Python CLI), also reachable as `rake locales:sync`. | verified | `generated/.gitignore`; `git ls-tree -r 4cbd42149 -- generated/` returns only 4 placeholder files; `package.json:9`, `:24-28`; `lib/tasks/locales.rake:16-40` |
| C23 | The Docker image bakes them in: the build stage runs `pnpm run build` (whose `prebuild` compiles locales) and both the main and s6 final stages copy `generated/` into the image. **An operator using the published image needs no locale build step.** | verified (STRUCTURAL) | `Dockerfile:146-151`, `:278`, `:398` |
| C24 | A **source** install must generate them explicitly — `bin/setup` does it, and `bin/doctor` warns when they are missing because i18n-dependent code fails without them. Needs `python3` on the build host. | verified (STRUCTURAL) | `scripts/setup/lib.sh:239-246`; `bin/setup:311`, `:427`, `:1091-1095`; `lib.sh:245` for the python3 requirement |
| C25 | The frontend bundles **every** generated locale file eagerly at build time via `import.meta.glob`. Restricting the config list does not shrink the JS bundle — but it also means restricting the list needs **no frontend rebuild**, because the frontend reads the effective set from the bootstrap payload at runtime. | verified (STRUCTURAL) | `src/i18n.ts:24-38`, `:46`, `:82` |
| C26 | The backend likewise loads every file in `generated/locales/` into the ruby-i18n load path regardless of the supported list. `I18n.available_locales` is the only thing narrowing it. | verified (STRUCTURAL) | `lib/onetime/initializers/setup_i18n.rb:60-74`, `:35` |
| C27 | A locale code left in the config list with **no matching** `generated/<code>.json` does not fail the boot. It logs `[i18n] Missing locale file`, stays selectable, and every string in it falls back to the default locale. | verified (STRUCTURAL) | `lib/onetime/initializers/load_locales.rb:98-115` |
| C28 | The effective set is readable at runtime **without auth**: `GET /api/v2/supported-locales` and `GET /api/v3/supported-locales` return `{locales, default_locale, locale}`. The correct way for an operator to confirm what a restriction actually did. | verified (STRUCTURAL) | `apps/api/v3/logic/meta.rb:26-34`; `apps/api/v3/routes.txt:38`; `apps/api/v2/logic/meta.rb:20-28`; `apps/api/v2/routes.txt:41` |
| C29 | The boot log banner reports whether i18n is on and, when on, the loaded locale codes — a second confirmation path. | verified (STRUCTURAL) | `lib/onetime/initializers/print_log_banner.rb:113-124`, `:126-130` |
| C30 | The `fallback_locale` map ships in YAML with **BCP-47 hyphen** keys (`fr-CA`, `pt-BR`, …) plus a `default: [en]` entry. The app normalizes those keys to underscores before handing them to the otto middleware. | verified — shipped default | `etc/defaults/config.defaults.yaml:1308-1329`; `lib/onetime/application/middleware_stack.rb:150-159`, `:461`. **But only for otto** — see hazard C-h3. |
| C31 | Date and time display format are separate i18n keys: `internationalization.date_format` / `datetime_format`, env `I18N_DATE_FORMAT` / `I18N_DATETIME_FORMAT`, shipped default `locale` (browser-native). Presets: `locale, iso8601, us, eu, eu-dot, uk, long` — or any raw date-fns pattern. | verified — shipped defaults | `etc/defaults/config.defaults.yaml:1292-1307`; `lib/onetime/initializers/load_locales.rb:60-63`; `apps/web/core/views/serializers/i18n_serializer.rb:24-25`. **These two are NOT gated by `internationalization.enabled`** — `LoadLocales` reads them outside the enabled branch (`load_locales.rb:62-63`). |

### C.4 Locale on custom domains, in email, and in the UI

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| C32 | A custom domain carries its own brand locale (`BrandSettings.locale`, member default `'en'`), surfaced as `domain_branding.locale` / `domain_locale`. On a custom-domain page it beats the visitor's browser language — but loses to the account's locale and to an explicit in-session pick. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain/brand_settings.rb:33-42`, `:191`; `apps/web/core/views/serializers/domain_serializer.rb:78-87`; `src/shared/stores/languageStore.ts:106-110`, `:111-118`, `:120-128`, `:130-137`. Custom domains are themselves off by shipped default (`config.defaults.yaml:771`). |
| C33 | Email locale is the recipient's stored locale, falling back to the instance default when blank. In full auth mode Rodauth's own mails resolve account → session → request param → `I18n.default_locale`. | verified (STRUCTURAL) | `apps/web/auth/config/email/helpers.rb:12-17`; `lib/onetime/mail/views/base.rb:28-29`, `:85-93`; call sites at `apps/api/organizations/logic/invitations/create_invitation.rb:102`, `apps/api/account/logic/authentication/reset_password_request.rb:128` |
| C34 | Every language-picker surface is gated on the `i18n_enabled` bootstrap flag, so turning i18n off **removes the picker** rather than leaving a one-item menu. | verified (STRUCTURAL) | `apps/web/core/views/serializers/i18n_serializer.rb:23`; consumed at `src/shared/components/layout/ManagementFooter.vue:230`, `TransactionalFooter.vue:123`, `src/apps/secret/components/layout/BrandedFooter.vue:61,83`, `SecretFooterControls.vue:21`, `src/shared/components/modals/settings/GeneralTab.vue:77`, `src/apps/workspace/account/settings/ProfileSettings.vue:217` |
| C35 | The **v1 API does not use the otto chain.** It runs its own order — explicit argument → `?locale=` → `cust.locale` → `env['rack.locale']` — and validates against `I18n.available_locales`, writing `env['ots.locale']`. | verified (STRUCTURAL) | `apps/api/v1/controllers/helpers.rb:104-143` (note `req.env['rack.locale']` at `:122`, **not** `otto.locale`). A second, divergent resolution path — **do not describe one unified chain.** |
| C36 | `Runtime.internationalization.locales` — the merged hash where every locale is overlaid on the default locale's definitions — is consumed by **exactly one caller: the boot log banner**. It is not the user-facing fallback mechanism. | verified (STRUCTURAL, vestigial) | `lib/onetime/initializers/load_locales.rb:92-96`, `:117-128`; sole consumer at `lib/onetime/initializers/print_log_banner.rb:126-130`; accessor at `lib/onetime/deprecated_methods.rb:48-50`. The comment at `load_locales.rb:120-122` describes user-facing fallback behaviour, but the actual runtime fallback comes from ruby-i18n (C20) and vue-i18n. |

**36 rows.**

### C.5 Gaps — where the evidence runs out

1. **C-g1. Per-locale translation coverage.** All 30 locales have all 44 content files, but **key-level completeness was not measured.** The compile step prints per-locale percentages (`locales/scripts/i18n/commands/content.py:452-480`) but was not run. **No page may state that any locale is "complete" or "partial", or name which ones lag.**
2. **C-g2.** Whether `?locale=` persists past the request. No code path writes `session['locale']` from the URL parameter — the only three writers are `update_locale.rb:52`, `sync_session.rb:294`, `signup_and_accept.rb:289` — so it appears per-request only server-side, with the browser separately persisting a pick in `sessionStorage` (`languageStore.ts:154`). Not confirmed at runtime; state it as a mechanism, not a guarantee.
3. **C-g3. RTL handling.** `ar` and `he` ship, but nothing was traced about `dir="rtl"`, mirrored layout, or RTL-aware components. **Do not claim RTL support either way.**
4. **C-g4.** Adding a genuinely **new** locale (a code not among the 30). The pieces are traceable — a `locales/content/<code>/` tree, the config list, the hardcoded name map at `middleware_stack.rb:100-131`, and `localeCodes` in `src/sources/languages.ts` — but there is no operator-facing procedure in the repo and it requires a source build. **Do not present this as a supported operator task.**
5. **C-g5.** Whether the vue-i18n fallback chain actually fires. The frontend receives `fallback_locale` with hyphen keys (hazard C-h3) and passes it verbatim; whether a given chain resolves for a given current locale was not verified at runtime.
6. **C-g6.** Whether the effective locale list changes anything about served asset size or memory. Both the frontend glob and the backend load path are unfiltered (C25/C26), so restriction is a **policy** control, not a resource control — but neither was measured.
7. **C-g7.** Locale behaviour for background jobs and the scheduler. Job payloads carry an explicit `locale` (e.g. `dispatch_notification.rb:186` defaults to `'en'`), but the worker's own I18n setup was not traced.
8. **C-g8.** Whether `internationalization.enabled` is on for the hosted service. The repo carries no production config, so this is unknowable from source.

### C.6 Hazards — do not write these wrong

1. **C-h1. The `.env.reference` / YAML default contradiction.** `config.defaults.yaml:1290` and `lib/onetime/config.rb:158` both default i18n to **false**; `.env.reference:932` sets `I18N_ENABLED=true` as a **live line**. A page that says "i18n is on by default" or "off by default" without naming the starting file will be wrong for half its readers.
2. **C-h2.** The frontend bootstrap contract defaults `i18n_enabled` to **true** when the key is absent (`src/schemas/contracts/bootstrap.ts:672`), the **opposite** of the backend default. Only bites if the key is missing from the payload, but the two halves of the app disagree about the default.
3. **C-h3. `fallback_locale` reaches the frontend with hyphen keys.** `normalize_fallback_keys` (`middleware_stack.rb:153-159`) converts them to underscores **for otto only**; `I18nSerializer` sends `OT.fallback_locale` raw (`i18n_serializer.rb:21`), and `src/i18n.ts:47,77` hands that straight to vue-i18n as `fallbackLocale`. Entries keyed `fr-CA` / `pt-BR` / `da-DK` **will not match** a current locale of `fr_CA` / `pt_BR` / `da_DK`. The unregioned keys (`de`, `fr`, `it`, `pt`, `sv`, …) and `default: [en]` are unaffected. **Do not describe frontend fallback chains as working per-region.**
4. **C-h4.** A custom domain's brand locale is **not validated server-side** against the supported set. `UpdateDomainBrand` slices params against `BrandSettings.members` only (`update_domain_brand.rb:52-63`) and `BrandSettings` has no locale validator. An unsupported value is stored and then silently ignored by the frontend guard at `languageStore.ts:124`.
5. **C-h5.** The v1 API's separate chain reads `env['rack.locale']` while the mounted middleware writes `env['otto.locale']` (C35). Treat v1 locale resolution as its own thing.
6. **C-h6.** The English-overlay merge in `LoadLocales` **looks like** the user-facing fallback mechanism and is commented as such (`load_locales.rb:120-122`), but its only consumer is the boot banner (C36). Describing the overlay as what users experience would be wrong.
7. **C-h7.** A misconfigured `default_locale` disables i18n **silently** — one `OT.le` line, then a normal boot in English-only mode (C7). An operator will see "my restriction turned off all languages" with no obvious cause. **Deserves explicit treatment on the page.**
8. **C-h8.** Locale codes are POSIX underscore (`pt_BR`, `zh`), not BCP-47 hyphen, and `zh` has no region suffix while `pt` has two. Any example or table copied from a hyphenated source will produce a code the app rejects.
9. **C-h9.** The locale list is the one i18n setting with **no env var** (C9). A page that presents i18n as env-configurable alongside `I18N_ENABLED` will mislead every container operator who never mounts a config file.

### C.7 Hosted vs self-hosted

No row here is hosted-only, and nothing about locale support is plan- or entitlement-gated:
`OT.supported_locales` is read straight from boot-time config (`load_locales.rb:66-74`), and the
`update-locale` endpoint is `auth=noauth` — no role check, no entitlement check, no limit. On a stock
self-hosted instance the whole feature is decided by two config values, neither of which is a billing
surface. The one adjacent gate is custom domains: the per-domain brand locale needs `DOMAINS_ENABLED`
(ships false) and the brand-editing endpoint additionally checks `custom_branding` plus `manage_org` —
and on a stock self-hosted instance that entitlement does not bind, so role is the whole answer and
the real prerequisite is simply turning the domains feature on. The one thing that genuinely cannot be
stated for the hosted service is whether it runs with i18n enabled.

---

## D. features/broadcast-banner

**Feature reality: FULLY.** Complete and larger than the page name implies: one site-wide HTML string
in the datastore (`global_banner`, DB 0) plus an audience sidecar (`global_banner:scope`), with
**three** operator surfaces over one shared op layer. **There is no config key and no env var for it**
— it is pure runtime state, so nothing in `etc/defaults/*` or `.env.reference` mentions it.

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| D1 | The banner is a single site-wide string held in the datastore at key `global_banner` in logical **DB 0**, with a sidecar key `global_banner:scope` holding its audience. There is no per-organization, per-domain or per-locale banner — one string, one instance. | verified (STRUCTURAL) | `lib/onetime/operations/banner.rb:23-49` (`KEY`, `SCOPE_KEY`, `VALID_SCOPES`, `DEFAULT_SCOPE`, `DB=0`). The scope was deliberately split into a sidecar so `global_banner` stays a bit-for-bit plain HTML string readable by any external client (`:29-33`). |
| D2 | **There is NO config file key and NO environment variable for the banner.** It is runtime state only — an operator sets it with a command or the admin UI, never by editing config. | verified (absence) | `git grep -i banner 4cbd42149 -- etc/ .env.reference .env.example docker/` returns only unrelated "boot banner" comments (`.env.reference:171,177,183,190,196`). **Consequence: a banner cannot be baked into an image or a compose file; it must be published against a running datastore.** |
| D3 | Three operator surfaces set the same banner and are thin adapters over one shared op layer (`Onetime::Operations::{GetBanner,SetBanner,ClearBanner}`): the `bin/ots banner` CLI, the colonel HTTP API, and the admin console screen. | verified (STRUCTURAL) | `lib/onetime/operations/banner.rb:154-358`; `lib/onetime/cli/banner/set_command.rb:175-183`, `clear_command.rb:53-57`, `show_command.rb:41-49`; `apps/api/colonel/logic/colonel/set_banner.rb:68-79`, `get_banner.rb:26-29`, `clear_banner.rb:33-36` |
| D4 | CLI surface: `bin/ots banner` (shows current banner + usage), `bin/ots banner show [--json]`, `bin/ots banner set <content> [--file PATH\|-] [--ttl SECONDS] [--scope SCOPE] [--apply]`, `bin/ots banner clear [--apply]`. | verified (STRUCTURAL) | `lib/onetime/cli/banner_command.rb:34-60`; `banner/show_command.rb:33-49`; `banner/set_command.rb:44-64`; `banner/clear_command.rb:34-39`. `--file -` reads content from stdin; `--file` takes precedence over the positional argument (`set_command.rb:53-56`, `:99-113`). |
| D5 | The CLI is **dry-run by default** for both mutating verbs. `set` without `--apply` prints an ASCII page preview and the exact SET commands it would run; `clear` without `--apply` prints the DEL. Nothing is written until `--apply`. | verified (STRUCTURAL) | `lib/onetime/cli/banner/set_command.rb:49-52`, `:88-94`, `:158-173`; `banner/clear_command.rb:34-38`, `:53-68` |
| D6 | HTTP surface: `GET /api/colonel/banner` (read), `POST /api/colonel/banner` (publish/update), `DELETE /api/colonel/banner` (clear). All three are session-auth, `role=colonel`, internal scope. | verified (STRUCTURAL) | `apps/api/colonel/routes.txt:101-104` |
| D7 | Admin console surface: the screen lives at `/colonel/banner` under the "communications" nav group. Publishing is behind a one-click confirm; clearing is behind a **typed** confirmation (the operator retypes the literal word `clear`). The form can be prefilled from the live banner. | verified (STRUCTURAL) | `src/apps/admin/views/AdminBanner.vue:46-49`, `:113-118`, `:147-164`; `src/apps/admin/routes.ts:192-202`; `src/apps/admin/sections.ts:173-180` |
| D8 | Lifetime: a banner with **no TTL is persistent until explicitly cleared**. `--ttl N` (CLI) or `ttl` (API) writes content and scope with the SAME expiry in one MULTI/EXEC, so the scope can never outlive the banner. | verified (STRUCTURAL) | `lib/onetime/operations/banner.rb:251-265`; `lib/onetime/cli/banner/set_command.rb:186-191` |
| D9 | Reads normalise the datastore's TTL sentinels: a persistent or absent banner reports a **null** TTL rather than -1/-2. | verified (STRUCTURAL) | `lib/onetime/operations/banner.rb:179-188` |
| D10 | Audience scope has exactly three values — `all` \| `no_recipient` \| `workspace` — and anything absent, blank or unrecognised collapses to `no_recipient`. | verified (STRUCTURAL) | `lib/onetime/operations/banner.rb:36-46`, `:76-79`. `no_recipient` is the default precisely so pre-existing string-only banners (written before the sidecar existed) stay off recipient pages and custom domains without a migration (`:43-46`). |
| D11 | What each scope shows, as enforced in the frontend: **on a custom domain the banner appears ONLY for scope `all`.** Otherwise `all` = every page; `no_recipient` = every page except secret-reveal (recipient) pages; `workspace` = authenticated workspace pages only. | verified (STRUCTURAL) | `src/shared/utils/banner-visibility.ts:32-52`; consumed at `src/shared/layouts/BaseLayout.vue:33-47` |
| D12 | Page audience is declared per layout: reveal surfaces are `recipient`, workspace/account/management surfaces are `workspace`, and everything else (homepage, secret creation, auth) defaults to `public`. | verified (STRUCTURAL) | `src/apps/secret/layouts/SecretRevealLayout.vue:25`; `src/apps/workspace/layouts/WorkspaceLayout.vue:56`; `src/shared/layouts/AccountLayout.vue:16`; `ManagementLayout.vue:37`; default at `BaseLayout.vue:14-16`; type at `src/types/ui/layouts.ts:63-66` |
| D13 | Content is stored **verbatim as raw HTML**. Neither the CLI nor the API sanitizes on write (the API only trims surrounding whitespace), so what a CLI operator writes and what a UI operator writes render identically. | verified (STRUCTURAL) | `lib/onetime/operations/banner.rb:200-204`, `:242-265`; `apps/api/colonel/logic/colonel/set_banner.rb:18-22`, `:34-37` |
| D14 | Sanitization happens **at render, in the browser**: DOMPurify permits only `<a>` elements with `href/target/rel/class`. Link schemes are limited to http, https, mailto and relative URLs; any `target` other than `_blank` is stripped; `rel="noopener noreferrer"` is forced onto every anchor. All other markup is reduced to its text. | verified (STRUCTURAL) | `src/shared/components/ui/GlobalBroadcast.vue:49-89`. Content is HTML-entity-decoded before sanitizing (`:43-47`, `:88`), so entity-encoded markup is unescaped first and then stripped. |
| D15 | Length limit: the colonel API/UI caps published content at **2000 characters**. The CLI imposes **no length limit at all**. | verified (STRUCTURAL) | `apps/api/colonel/logic/colonel/set_banner.rb:27-30`, `:52-57`; mirrored client-side at `src/apps/admin/views/AdminBanner.vue:108-111`; no length check anywhere in `lib/onetime/cli/banner/set_command.rb:66-95` |
| D16 | Empty content is refused on every path: the CLI exits 1, the API raises a form error, and the op itself raises `ArgumentError` as a backstop. An invalid scope is refused the same way. | verified (STRUCTURAL) | `lib/onetime/cli/banner/set_command.rb:70-86`; `apps/api/colonel/logic/colonel/set_banner.rb:50`, `:63-65`; `lib/onetime/operations/banner.rb:242-249` |
| D17 | Cross-process propagation is **bounded, not instant**. The process handling the write updates immediately; every other Puma worker, container and process re-reads the datastore at most once per **30 seconds** and converges within that window. Clearing propagates the same way. | verified (STRUCTURAL) | `lib/onetime/operations/banner.rb:51-58` (`CACHE_TTL = 30`), `:94-107`, `:117-131`, `:267-272`, `:342-345`; accessors at `lib/onetime/deprecated_methods.rb:86-94`. **The CLI's own success text is stale/understated:** it says "Other running processes will pick it up on next boot or re-read" (`set_command.rb:193-194`, `clear_command.rb:61-62`). The re-read is the 30s TTL — **a restart is NOT required.** |
| D18 | The banner survives restarts because it lives in the datastore, and is re-read at boot by the `CheckGlobalBanner` initializer. That initializer is **optional and fail-soft**: an unreachable datastore logs and leaves the banner unset rather than failing boot. | verified (STRUCTURAL) | `lib/onetime/initializers/check_global_banner.rb:16-42`; fail-soft rescue at `lib/onetime/operations/banner.rb:128-131`; registered at `lib/onetime/initializers.rb:37` and `lib/onetime/boot.rb:207`. Durability across a datastore restart therefore depends on datastore persistence — see the install ledger rows on AOF in the shipped compose files. |
| D19 | The banner reaches the browser through the page bootstrap payload: `global_banner` and `global_banner_scope` are serialized on **every** page render, for anonymous visitors as well as signed-in users. | verified (STRUCTURAL) | `apps/web/core/views/serializers/messages_serializer.rb:16-38`; wire contract at `src/schemas/contracts/bootstrap.ts:682-691`; runtime state at `lib/onetime/runtime/features.rb:20-53` |
| D20 | Dismissal is **per-browser, not per-account**: clicking the X writes `banner-gb-<first 8 hex chars of the SHA-256 of the banner content>` into localStorage. There is no server-side dismissal state. | verified (STRUCTURAL) | `src/shared/composables/useDismissableBanner.ts:56-72`, `:99-159`; wired at `src/shared/components/ui/GlobalBroadcast.vue:37-40` |
| D21 | A dismissed banner **reappears after 7 days**, and editing the banner's text makes it reappear immediately for everyone (the dismissal key is derived from the content, so new content is a new key). | verified (STRUCTURAL) | `src/shared/layouts/BaseLayout.vue:70-75` (`:expiration-days="7"`); expiry arithmetic at `useDismissableBanner.ts:139-150`. The component's own default is `expirationDays: 0` = permanent (`GlobalBroadcast.vue:32`), but `BaseLayout` — the only production caller — overrides it to 7. **Document 7.** |
| D22 | Who can publish: the API and admin console require the **colonel** role, enforced twice (router `role=colonel` and `verify_one_of_roles!(colonel: true)` in each logic class). **The CLI performs NO role check** — shell access to `bin/ots` is the whole requirement, and its audit actor is the literal string `cli`. | verified (STRUCTURAL) | `apps/api/colonel/routes.txt:102-104`; `apps/api/colonel/logic/colonel/set_banner.rb:47-48`, `get_banner.rb:22-24`, `clear_banner.rb:29-31`; CLI actor at `lib/onetime/cli/banner/shared.rb:14-17`. No billing, plan or entitlement check exists anywhere in the banner path — role is the whole answer, hosted and self-hosted alike. |
| D23 | Every successful publish and clear writes exactly one admin audit event (verbs `banner.set` / `banner.clear`), attributed to the acting colonel's public id or to `cli`. The set event records the banner **content**, TTL, scope and length. Reads audit nothing; clearing when nothing is set audits nothing. Trail capped at 10,000 events. | verified (STRUCTURAL) | `lib/onetime/operations/banner.rb:211-221`, `:274-286`, `:305-316`, `:328-356`, `:154-157`; `lib/onetime/models/colonel_audit_event.rb:63-68`, `:116`. Failures record one `result: :failure` event and re-raise (`banner.rb:212-221`, `:314-316`). |
| D24 | Clearing is **idempotent and not an error**: `DELETE /api/colonel/banner` with no banner set returns 200 with `cleared: false`, deliberately not a 404, so a banner whose TTL expired between read and confirm is not surfaced as a failure. The CLI short-circuits with "No banner is currently set. Nothing to clear." | verified (STRUCTURAL) | `apps/api/colonel/logic/colonel/clear_banner.rb:18-22`, `:38-48`; op status at `lib/onetime/operations/banner.rb:328-333`; `lib/onetime/cli/banner/clear_command.rb:45-48` |
| D25 | The banner has **no severity, level, colour or dismissible/non-dismissible option, and no per-locale variant.** It is one HTML string plus an optional TTL and a scope; the rendered banner always carries a dismiss button. | verified (absence) | `src/apps/admin/views/AdminBanner.vue:37-40` ("the banner has no severity/level concept"); Result shapes at `lib/onetime/operations/banner.rb:166`, `:225`; dismiss button at `src/shared/components/ui/GlobalBroadcast.vue:174-186` |
| D26 | On a stock self-hosted install both admin surfaces (`/colonel` and `/api/colonel`) are reachable, because `site.admin.allowed_cidrs` ships **empty** and the network-isolation middleware is then a strict no-op. If an operator sets the allowlist, the banner UI and API return **404** from outside the allowed networks — `bin/ots banner` is unaffected. | verified — shipped default | `lib/onetime/config.rb:119-127`; `lib/onetime/middleware/admin_network_isolation.rb:14-27`, `:52-76` |
| D27 | The admin console shell itself is served only to colonel-role sessions: `GET /colonel` and `GET /colonel/*` carry `auth=sessionauth role=colonel`. | verified (STRUCTURAL) | `apps/web/core/routes.txt:96-101` |

**27 rows.**

### D.5 Gaps — where the evidence runs out

1. **D-g1. Multi-region behaviour is not established.** The banner is a key in one datastore, so each region presumably carries its own banner, but nothing at 4cbd42149 states this — `docs/architecture/regions.md:70` mentions only the *boot log* banner, an unrelated thing. **Do not claim region-wide or cross-region behaviour.** (Cross-reference §J: each region is a wholly separate install.)
2. **D-g2.** Rate limiting on the colonel banner endpoints was not investigated; no row asserts one exists or does not.
3. **D-g3.** Whether the hosted service publishes banners by this mechanism cannot be established from the repo. No hosted-only behaviour was found in the banner path at all.
4. **D-g4.** The exact invocation of the CLI inside a container (`docker compose exec app bin/ots banner ...`) is not re-verified here; it follows the pattern established in the install & deploy ledger (row 37). **Cite that ledger, not this one.**
5. **D-g5.** Banner content is not localized and no per-locale mechanism was found, but the absence was not exhaustively proven outside the ops/CLI/API/frontend files read here.
6. **D-g6.** Whether a banner can be shown on non-Vue surfaces (email templates, error pages, the `/disabled` page) is not established. All render evidence found is `BaseLayout`-mediated.
7. **D-g7.** No evidence was gathered on how the banner interacts with brand packs / branded custom-domain theming beyond the scope-based custom-domain suppression in `banner-visibility.ts`.

### D.6 Hazards — do not write these wrong

1. **D-h1. STALE CLI HINT — do not repeat it.** Both `bin/ots banner` and `bin/ots banner show` print "Branded surfaces with `displayGlobalBroadcast=false` hide the banner" (`lib/onetime/cli/banner_command.rb:59`; `banner/show_command.rb:87-88`). At 4cbd42149 **no** production layout or route sets `displayGlobalBroadcast: false` — the only occurrence in the tree is a unit test (`src/tests/shared/layouts/BaseLayout.spec.ts:197`); `App.vue:35` defaults it to true for every layout. Custom-domain suppression is now done by the **scope** mechanism (D11). A page that repeats the CLI hint describes a knob operators cannot reach.
2. **D-h2. TTL 0 / negative diverges between surfaces.** The API treats zero/absent `ttl` as persistent and rejects a negative one with a form error (`set_banner.rb:59-61`, `:73`). The CLI validates neither: `--ttl 0` and `--ttl -5` pass straight through, and `if @ttl` is truthy for 0, so `SetBanner` issues SETEX with a non-positive expiry and the datastore errors (`banner.rb:257-260`; no ttl check in `set_command.rb:66-95`). **Tell operators to pass a positive number of seconds or omit `--ttl`.**
3. **D-h3. Dismissal id degrades outside a secure context.** The localStorage key comes from `crypto.subtle.digest` (`src/shared/composables/useHash.ts:31-43`); on failure `generateHash` returns null and the id falls back to the constant `gb-fallback` (`useDismissableBanner.ts:66-71`). On a plain-HTTP self-hosted deployment reached by IP or LAN hostname, `crypto.subtle` is unavailable, so **all** banners share one dismissal key — dismissing one suppresses every later banner for that browser, and the "edit the text to re-show it" behaviour stops working.
4. **D-h4.** Brief flash of an already-dismissed banner. The banner id starts as the placeholder `gb-initial` and is replaced only when the async SHA-256 resolves, at which point stored state is re-read (`useDismissableBanner.ts:86-97`, `:131-136`).
5. **D-h5. Sanitization is client-side only.** The server stores whatever a colonel (or anyone with shell access to `bin/ots`) writes, verbatim, with no server-side sanitize step (`banner.rb:200-204`). The safety property depends entirely on `GlobalBroadcast.vue`'s DOMPurify pass. **Do not describe the stored value as "sanitized".**
6. **D-h6.** The banner content is written into the admin audit trail **in full** (`banner.rb:277-283`). Justified in-code because the banner is public anyway — but do not tell operators the audit detail is content-free.
7. **D-h7.** `GlobalBroadcast.vue` carries a prop default of "Welcome to the Global Broadcast!" (`:29`). Unreachable in production because `BaseLayout` only mounts the component when a banner exists and always passes content. **Do not document it as a fallback message.**
8. **D-h8.** The banner key sits at logical **DB 0** and is not namespaced by any prefix. `.env.reference:169-198` notes the per-model `VALKEY_DBS_*` mapping is currently informational and all models connect to the DB in the connection URL, but the banner ops call `Familia.dbclient(0)` **explicitly** (`banner.rb:48-49`, `:118`, `:170`, `:251`, `:329`). A deployment whose connection URL points at a non-zero DB would still have its banner in DB 0. **Do not give a `valkey-cli` recipe without re-checking** — see §M4.

### D.7 Hosted vs self-hosted

Nothing in this feature is hosted-only. The whole path — ops, CLI, colonel API, admin screen — is
present in the self-hosted repo and carries no billing, plan or entitlement check (verified by grep
across `lib/onetime/operations/banner.rb`, the three colonel logic classes,
`lib/onetime/cli/banner/`, and `src/apps/admin/views/AdminBanner.vue`). So the governing fact applies
cleanly: role is the whole answer. Two role facts matter and they differ: the API and admin console
require colonel; **`bin/ots banner` performs no role check whatsoever** — anyone who can run the
binary in the app's environment can publish a site-wide banner, recorded under the audit actor `cli`.
The only shipped-default value in scope is `site.admin.allowed_cidrs = []` (D26). There is no shipped
default for the banner itself, because no config key exists.

---

## E. features/feedback-channel

**Feature reality: FULLY.** Real and complete, but smaller and stranger than the page name suggests:
one unauthenticated endpoint, one Redis sorted set (auto-trimmed to 30 days), one optional email
notification, one hardcoded per-IP rate limiter. **The single most important operator fact: the email
half is wired with `fallback: :none` and `jobs.enabled` ships false — so on a stock self-hosted
instance no feedback email is ever sent, no matter how well SMTP is configured.**

### E.1 Submission and storage

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| E1 | Feedback is submitted to a single endpoint, `POST /api/v3/feedback`, which requires **no authentication** — anonymous visitors and signed-in users use the same route. | verified (STRUCTURAL) | `apps/api/v3/routes.txt:41` (`auth=noauth`); `apps/api/v3/logic/feedback.rb:18`, docstring at `:11-13` |
| E2 | The accepted request body is `msg` (required), plus optional `tz` and `version`. Nothing else is read — **no email field, no subject.** | verified (STRUCTURAL) | `apps/api/v3/logic/feedback.rb:33-37`; `src/apps/secret/components/support/FeedbackForm.vue:129`, `:147-154` |
| E3 | An empty message is rejected with the form error "You can be more original than that!" and never reaches storage or email. | verified (STRUCTURAL) | `apps/api/v3/logic/feedback.rb:40-43` |
| E4 | Every submission is written to a Redis/Valkey **sorted set** via `Onetime::Feedback.add`, and the set is auto-trimmed on **every write** to the most recent **30 days**. Older feedback is gone. | verified (STRUCTURAL) | `lib/onetime/models/feedback.rb:12-16`; called from `apps/api/v3/logic/feedback.rb:69` |
| E5 | The stored line is the message with metadata appended inline: `<msg> [<user id>] [TZ: <tz>] [v<version>]`. No separate record, no join, no structured fields. | verified (STRUCTURAL) | `apps/api/v3/logic/feedback.rb:100-102` |
| E6 | The submitter identifier stored alongside the message is the customer extid for signed-in users, or `anon:` plus the first 8 characters of the session public id for anonymous users. **No IP address is stored with the message.** | verified (STRUCTURAL) | `apps/api/v3/logic/feedback.rb:88-95` |
| E7 | The message is HTML-stripped and entity-decoded before storage, whitespace-normalised, and **silently truncated** at 200,000 characters (`tz` at 64, `version` at 32). | verified (STRUCTURAL) | `apps/api/v3/logic/feedback.rb:26-30`, `:33-37`; `lib/onetime/security/input_sanitizers.rb:73-91` (`result.slice(0, max_length)` at `:90`) |
| E8 | Feedback is stored as sorted-set **members keyed on the formatted message string**, so two byte-identical submissions collapse into one entry with the score updated to the later timestamp rather than producing two rows. | verified (STRUCTURAL) | `lib/onetime/models/feedback.rb:12-16` (ZADD with the message as member); scores are unix timestamps, proven by the trim at `:15` and the time-range reads at `:24-28`. The appended `[user id] [TZ] [v…]` suffix makes exact collision unlikely across users, but two identical submissions from the same session in the same timezone/version **will** collapse. |

### E.2 Reading feedback

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| E9 | An operator with the **colonel** role reads feedback on the admin dashboard, bucketed into today (last 24h), yesterday (24–48h) and older (up to 14 days), with a total count. | verified (STRUCTURAL) | `apps/api/colonel/logic/colonel/get_colonel_info.rb:73-91`, `:152-169`; `apps/api/colonel/routes.txt:10`; `src/apps/admin/views/AdminOverview.vue:162-187`, `:375-402` |
| E10 | The colonel dashboard shows at most **14 days** of feedback even though the store retains **30**. Anything between 14 and 30 days old is in Redis but not on the dashboard. | verified (STRUCTURAL) | `get_colonel_info.rb:77` vs `lib/onetime/models/feedback.rb:15` |
| E11 | There is **no API** for an operator to read, export, delete or reply to feedback other than the colonel dashboard payload — the colonel routes table has no feedback endpoints and no CLI command touches the store. | verified (absence) | `apps/api/colonel/routes.txt` (no feedback route at the pin; the only feedback data is embedded in `GET /info` per `get_colonel_info.rb:152-169`); `lib/onetime/models/feedback.rb:11-33` exposes only `add/all/recent/count` with no CLI caller |

### E.3 The email half — inert on a stock install

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| E12 | Feedback also triggers a notification email — but only as a **best-effort side channel**. Storage happens regardless; every email failure is rescued and logged, and the submitter always gets a success response. | verified (STRUCTURAL) | `apps/api/v3/logic/feedback.rb:45-76` (`begin` `:49`, `rescue` `:61`, `end` `:65`, storage at `:69`, `success_data` at `:75`), plus the inner publish `begin/rescue` at `:150-162` |
| E13 | The feedback email is published with **`fallback: :none`**. When the RabbitMQ channel pool is absent, the publisher logs "Fallback disabled, email not sent" and returns false — it does **NOT** fall back to inline or threaded delivery the way other emails do. | verified (STRUCTURAL) | `apps/api/v3/logic/feedback.rb:150-157` — **corrected at 4cbd42149**; the earlier citation `:143-147` pointed at the Reply-To comment block, not the publish. The construct is `begin` at `:150`, `Onetime::Jobs::Publisher.enqueue_email(` at `:153`, `:feedback_email` `:154`, `email_data` `:155`, `fallback: :none,` at **`:156`**, `)` at `:157`, `rescue StandardError` at `:158`. Plus `lib/onetime/jobs/publisher.rb:171-175`, `:546-560` (`when :none` → log, clear state, return false), `:525-527` (`jobs_enabled?` is just `!$rmq_channel_pool.nil?`) |
| E14 | Background jobs ship **OFF**: `jobs.enabled` defaults to false unless `JOBS_ENABLED=true`. Combined with E13, **a stock self-hosted instance delivers NO feedback email at all** — feedback exists only in Redis and on the colonel dashboard. | verified — shipped default | `etc/defaults/config.defaults.yaml:1111-1113`; consequence via `publisher.rb:171-175`, `:556-559`. **The biggest operator-facing surprise on the page.** Feedback email requires `JOBS_ENABLED=true`, a reachable RabbitMQ, AND a worker consuming `email.message.send`. The config comment at `config.defaults.yaml:1109-1110` ("When disabled, email delivery falls back to synchronous mode") is true for other mail and **false for feedback specifically**. |
| E15 | The email recipient is resolved in two steps: `emailer.feedback_to` (env `FEEDBACK_TO_EMAIL`) wins if set and non-blank; otherwise the **first colonel by join date**. If neither exists, the email step is skipped and only the Redis copy is written. | verified (STRUCTURAL) | `apps/api/v3/logic/feedback.rb:174-179` — **corrected at 4cbd42149**; the earlier citation `:157-176` began inside the previous method's rescue block and ended mid-docstring. `feedback_recipient_email` is `def` at `:174`, the configured read at `:175`, the non-blank return at `:176`, `find_first_colonel&.email` at `:178`, `end` at `:179`, `private` at `:180`; the three-rung precedence is documented in its own docstring at `:165-173`. Plus `:56-63`; `lib/onetime/models/customer/features/role_index.rb:33-38` |
| E16 | `emailer.feedback_to` ships **unset (nil)**. Env `FEEDBACK_TO_EMAIL`; YAML path `emailer.feedback_to`. | verified — shipped default | `etc/defaults/config.defaults.yaml:917`, `:954-957`; `.env.reference:350` |
| E17 | Colonels are created and promoted with the CLI: `bin/ots customers create EMAIL --role colonel` or `bin/ots customers role promote EMAIL`. `bin/ots customers role list` lists them. | verified (STRUCTURAL) | `lib/onetime/cli/customers_command.rb:28`, `:31`, `:33`. The in-code comment at `apps/api/v3/logic/feedback.rb:53` writes this as `bin/ots customers role promote email --role colonel`; the CLI help text shows no `--role` flag on `role promote`. **Cite the CLI file, not the comment.** |
| E18 | The feedback email body shows an **obscured** form of the submitter's address, not the verbatim one; the real address rides on **Reply-To**, and only for authenticated submitters. Anonymous submissions carry no Reply-To and display as "anonymous". | verified (STRUCTURAL) | `apps/api/v3/logic/feedback.rb:121-126`, `:144-148`; `lib/onetime/utils/strings.rb:186-198` (`obscure_email`); `src/apps/secret/components/support/FeedbackForm.vue:157-165` (the anonymous "no reply" notice shown to submitters) |
| E19 | The email an operator receives contains: from (obscured), submitter id, display domain plus domain strategy, timezone, client version, and the message body. Missing optional fields render as `-`. | verified (STRUCTURAL) | `lib/onetime/mail/templates/feedback_email.txt.erb:1-16`; `lib/onetime/mail/views/feedback_email.rb:38`, `:51-61`, `:103-111` |
| E20 | The feedback email deliberately omits the standard plaintext support footer, because the recipient IS support. | verified (STRUCTURAL) | `lib/onetime/mail/views/feedback_email.rb:28-33` |

### E.4 Rate limiting

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| E21 | Rate limiting is per client IP: **10 submissions per 20-minute window, then a 20-minute lockout.** Exceeding it returns HTTP 429 with a `Retry-After` header and error key `api.feedback.errors.rate_limit_exceeded`. | verified (STRUCTURAL) | `lib/onetime/security/feedback_rate_limiter.rb:28-34` (`MAX_SUBMISSIONS 10`, `RATE_WINDOW 1200`, `LOCKOUT_DURATION 1200`), `:64-93`; `lib/onetime/application/otto_hooks.rb:75`; `lib/onetime/middleware/retry_after_header.rb:12-22`, `:43-45`, `:79` |
| E22 | The rate-limit thresholds are **hardcoded Ruby constants**. There is no YAML key and no environment variable that changes them. | verified (hardcoded) | `lib/onetime/security/feedback_rate_limiter.rb:26-34` — the module reads no config; the entire file references `OT` only for logging (`:91`, `:114`) |
| E23 | Quota is only consumed by submissions that **actually got stored**: the check runs in `raise_concerns`, and the counter is incremented AFTER storage, so empty/rejected messages do not burn quota. | verified (STRUCTURAL) | `apps/api/v3/logic/feedback.rb:40-43`, `:71-73`; `lib/onetime/security/feedback_rate_limiter.rb:37-56` (the atomic Lua INCR/EXPIRE/SETEX script) |
| E24 | When the IP cannot be resolved (blank), the rate limiter is a **no-op in both directions** — the submission is neither checked nor counted. | verified (STRUCTURAL) | `lib/onetime/security/feedback_rate_limiter.rb:65`, `:101`; `apps/api/v3/logic/feedback.rb:76-86` |
| E25 | Rate-limit state lives in two Redis keys on the Feedback shard: `feedback:submissions:{ip}` (counter) and `feedback:locked:{ip}` (lockout). An operator inspects or clears them with `bin/ots ratelimit keys feedback <ip>`, which **emits valkey-cli commands rather than touching Redis itself**. | verified (STRUCTURAL) | `lib/onetime/security/feedback_rate_limiter.rb:13-15`, `:135-141`, `:159-161`; `lib/onetime/operations/ratelimit/registry.rb:41-45`; `lib/onetime/cli/ratelimit_command.rb:9-19`, `:43-72` |
| E26 | Rate-limit logging never records the full client address: IPv4 is truncated to the /16, IPv6 to the first nine characters. | verified (STRUCTURAL) | `lib/onetime/security/feedback_rate_limiter.rb:143-153`, used at `:91` and `:114` |

### E.5 Surfaces, and what an operator can and cannot turn off

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| E27 | **There is NO config key that disables the feedback endpoint.** `site.interface.api.enabled` (`API_ENABLED`) claims in its own comment to 404 all of `/api/*`, but **nothing in `lib/` or `apps/` reads it** — it only feeds the frontend bootstrap payload. | verified (absence) — **CONFLICTS with the Configure ledger row E16, see §L1** | `etc/defaults/config.defaults.yaml:200-203` (the comment and `enabled: <%= ENV['API_ENABLED'] != 'false' %>`); the ONLY consumer repo-wide is `apps/web/core/views/serializers/config_serializer.rb:44`; the app's own spec note states it: `docs/specs/install-onboarding/install-onboarding-work-chunks.md:500` ("API_ENABLED is UI-advisory only"). Verified by exhaustive `git grep` for `API_ENABLED` at the pin: only `.env.reference:1003`, the defaults file, and that spec doc. |
| E28 | `WORKSPACE_FEEDBACK_ENABLED` (default **true**) only controls whether the Feedback link appears in the authenticated workspace footer. It does **not** disable the endpoint or the modal. The workspace footer links are themselves off unless `WORKSPACE_LINKS=true`. | verified — shipped default | `etc/defaults/config.defaults.yaml:190-194`, `:182`, `:193`; `.env.reference:971-973` |
| E29 | The public footer "Contact" link points at `/feedback` by default (`CONTACT_URL`), so the feedback page is the shipped contact route for an unbranded install. | verified — shipped default | `etc/defaults/config.defaults.yaml:175-177`; `.env.reference:949` |
| E30 | There is a standalone page at `GET /feedback` (served by the SPA) and a modal reachable from a `FeedbackToggle` button; both post to the same `/api/v3/feedback` endpoint with a CSRF token. | verified (STRUCTURAL) | `apps/web/core/routes.txt:10`; `src/apps/secret/support/Feedback.vue`; `src/shared/components/ui/FeedbackToggle.vue:20-28`, `:56`; `src/shared/components/forms/FeedbackModalForm.vue:30`; `src/apps/secret/components/support/FeedbackForm.vue:73-75`, `:98-101` |
| E31 | `redis.dbs.feedback` (`VALKEY_DBS_FEEDBACK` / `REDIS_DBS_FEEDBACK`) defaults to **0** and is **informational only** — the shipped comment states all models connect to the database in the connection URL regardless. | verified — shipped default | `etc/defaults/config.defaults.yaml:909-914`; `.env.reference:181-185` |

**31 rows.**

### E.6 Gaps — where the evidence runs out

1. **E-g1.** The exact Redis key string for the feedback sorted set is **not written literally anywhere in app source** at 4cbd42149. `Onetime::Feedback` declares no `class_sorted_set :instances` — `instances` comes from `Familia::Horreum`, an external gem not read. The prefix is registered as `feedback` (`lib/onetime/jobs/maintenance_job.rb:57`) and the Familia convention is `<prefix>:instances` (evidenced only by a test fixture, `try/jobs/instances_rebuild_job_try.rb:32`). **Treat `feedback:instances` as probable, not verified — do not print it as fact without reading the Familia gem.**
2. **E-g2.** Whether CSRF (the `shrimp` token) is actually **enforced server-side** on `POST /api/v3/feedback`. The Vue form sends it and the route is `auth=noauth`, but the validating middleware was not traced. **Do not claim anonymous submission requires or does not require a token.**
3. **E-g3.** How `strategy_result.metadata[:ip]` resolves behind a proxy in practice. The runbook (`docs/runbooks/feedback-rate-limit-verification.md`, "Proxy-aware run") says it depends on `TRUSTED_PROXY_ENABLED` / `TRUSTED_PROXY_CIDRS` and `Rack::Request#ip`, but the trusted-proxy configuration path was not read. **An operator behind Cloudflare needs that answer; this research does not supply it.**
4. **E-g4.** Whether any email worker actually consumes the `email.message.send` queue for the `:feedback_email` template in the shipped worker process, and what the worker deployment looks like. Only the publish side is verified.
5. **E-g5.** The mail-provider path taken once a feedback email IS enqueued (SMTP vs SES vs Lettermint selection, from-address, `EMAILER_MODE` interaction). That belongs to `configure/email`.
6. **E-g6.** Whether feedback submission is counted in any metric or audit event. `ReceiveFeedback` writes no `colonel_audit_event` at this pin, but middleware-level auditing was not exhaustively checked.

### E.7 Hazards — do not write these wrong

1. **E-h1. NAMING COLLISION — the single biggest trap on this page.** `lib/onetime/mail/feedback/*`, `lib/onetime/operations/email/sync_provider_feedback.rb`, `lib/onetime/operations/email/ingest_feedback.rb` and `bin/ots email sync-feedback` are **ESP deliverability feedback loops** (bounce and spam-complaint suppression lists pulled from SES/Lettermint). See `lib/onetime/mail/feedback/base.rb:7-25`. They have **nothing** to do with user feedback. A page that mixes them will mislead operators badly.
2. **E-h2.** The docstring at `apps/api/v3/logic/feedback.rb:15-16` says the limiter "locks abusers out for an hour". The code says **20 minutes** (`LOCKOUT_DURATION = 1200`). The app runbook `docs/runbooks/feedback-rate-limit-verification.md` also carries the stale hour figure. **Cite the constant, never the prose.**
3. **E-h3. STORE-WIPING INTERACTION.** `PhantomCleanupJob` iterates `MaintenanceJob::INSTANCE_MODELS` — which includes `Feedback` (`maintenance_job.rb:57`) — and treats each sorted-set member as an object identifier, marking it a phantom when `feedback:<member>:object` does not exist (`phantom_cleanup_job.rb:57-66`, `:118-127`; `maintenance_job.rb:150-152`). Feedback members are raw message strings with no backing hash, so **every entry qualifies**. With `jobs.maintenance.enabled: true` and `jobs.maintenance.phantom_cleanup.auto_repair: true` this would ZREM the entire feedback store. Both ship **false** (`config.defaults.yaml:1246-1255`), so it is latent, not live — **but do not tell an operator to enable `auto_repair` without this caveat.**
4. **E-h4.** The generated request schema `src/schemas/api/v3/requests/receive-feedback.ts:9-14` declares `{ message, email }`. The server reads `msg`, `tz`, `version` and never reads an email field. **The schema — and therefore any generated OpenAPI/API-reference output — is wrong. Document the wire format from the Ruby.**
5. **E-h5.** `FeedbackForm.vue:102-106` posts a hidden `reason` field (e.g. `email_change_unauthorized`). `ReceiveFeedback` never reads it, so that context is **silently dropped**.
6. **E-h6.** The message cap is 200,000 characters and truncation is **silent** server-side. The UI mirrors the constant with a counter and maxlength, but an API client gets a 200 with a truncated stored message. Each stored entry is a single Redis sorted-set member, so a small number of maximal submissions is a real memory consideration.
7. **E-h7.** Do not describe feedback as plan-gated or entitlement-gated — it is not, for anyone. The endpoint is `auth=noauth` and touches no entitlement check. The only role that matters is `colonel`, for **reading**.
8. **E-h8.** **Do not write "configure `FEEDBACK_TO_EMAIL` and feedback will be emailed to you."** That is false on a stock instance. The honest instruction is: set `FEEDBACK_TO_EMAIL` *and* `JOBS_ENABLED=true` with a working RabbitMQ and email worker; otherwise read feedback on the colonel dashboard.

### E.8 Hosted vs self-hosted

Nothing about the feedback channel is hosted-only in code — the same endpoint, limiter, store and
email path run everywhere. The difference is entirely configuration, and it is stark. The hosted
service runs background jobs, so `fallback: :none` publishes successfully and feedback arrives as
email at whatever `emailer.feedback_to` resolves to. A stock self-hosted install ships
`jobs.enabled: false` and `emailer.feedback_to: nil`, so the publish call short-circuits to "Fallback
disabled, email not sent" and the operator's **only** view of feedback is the colonel dashboard at
`GET /api/colonel/info`, which requires promoting an account to colonel via
`bin/ots customers role promote EMAIL`. **Write the page for that operator: Redis is the system of
record, email is an opt-in extra that requires the job system.** The rate limiter, by contrast, is
genuinely structural: hardcoded constants, identical on both, unaffected by any config.

---

## F. features/incoming-secrets

**Feature reality: FULLY.** Fully built and **larger than the page name suggests**. There are **two
independent incoming systems that never intermix**, and the split is the spine of the page:
(1) **CANONICAL** — `features.incoming.enabled` (`INCOMING_ENABLED`, ships false) plus a fixed
recipient list in config, hashed into frozen in-process state at boot, so recipient changes need a
restart; (2) **CUSTOM DOMAINS** — a per-domain `CustomDomain::IncomingConfig` record in Redis,
governed by the domain-owning org's `incoming_secrets` entitlement and its own readiness, and
explicitly **not** by the install-wide flag. Three code sites state that split in their own comments.

### F.1 The surface

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| F1 | The feature exists as a dedicated **anonymous Rack app** mounted at `/api/incoming` with exactly three noauth endpoints: `GET /config`, `POST /secret`, `POST /validate`. | verified (STRUCTURAL) | `apps/api/incoming/routes.txt:22-24`; `apps/api/incoming/application.rb:41-44`. Deliberately separate from the versioned V1/V2/V3 secrets APIs (`application.rb:30-35`). |
| F2 | The public-facing page is the SPA route `/incoming` ("Send a Secret"), with a success page at `/incoming/:receiptKey`. Both are `requiresAuth: false` and render without site navigation. | verified (STRUCTURAL) | `src/apps/secret/routes/incoming.ts:8-45`. `receiptKey` is marked `sentryScrubParams` at `:43`. |
| F3 | The API app is mounted **unconditionally**; the feature flag is enforced inside the logic classes, not at mount time. On a disabled canonical install `GET /api/incoming/config` returns **200 with `enabled:false`**, and the page renders a "feature disabled" panel rather than a 404. | verified (STRUCTURAL) | `lib/onetime/application/registry.rb:143-145`, `:213`; `apps/api/incoming/logic/get_config.rb:40-55`; `lib/onetime/incoming/recipient_resolver.rb:42-45`; `src/apps/secret/conceal/IncomingForm.vue:32-37`, `:60-70` |
| F4 | `POST` to `/api/incoming/*` **bypasses the CSRF authenticity-token check**, because the bypass rule is "any `/api/` request with no authenticated session cookie" and the incoming surface is always anonymous. | verified (STRUCTURAL) | `lib/onetime/middleware/security.rb:170-192` |
| F5 | The guest-route config (`site.interface.api.guest_routes`) does **not** gate incoming. `Incoming::Logic::Base` includes the `GuestRouteGating` concern but no incoming logic class ever calls `require_guest_route_enabled!`. **Turning guest routes off does not turn incoming off.** | verified (absence) | `apps/api/incoming/logic/base.rb:21-23`; verified absence: `git grep -n require_guest_route_enabled 4cbd42149 -- apps/api/incoming` returns nothing |

### F.2 Canonical-domain incoming

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| F6 | On the CANONICAL domain the feature is **off unless the operator turns it on**: `features.incoming.enabled`, env `INCOMING_ENABLED`, shipped default **false**. | verified — shipped default | `etc/defaults/config.defaults.yaml:721-730`; `lib/onetime/config.rb:145-151`; `.env.reference:935-940` |
| F7 | Canonical recipients are a **fixed list in config**: `features.incoming.recipients`, with **four** env slots `INCOMING_RECIPIENT_1..4` in the format `email[,display name]`. When the name is omitted it defaults to the email's local part. | verified — shipped defaults | `etc/defaults/config.defaults.yaml:752-769`; `apps/api/incoming/initializers/setup_incoming_recipients.rb:46-62`. Only four env slots ship; more recipients require editing `etc/config.yaml` directly (`.env.reference:1084-1089`). `.env.reference:941` leaves `INCOMING_RECIPIENT_1=` uncommented and blank. |
| F8 | **Recipient email addresses are never exposed to the sender.** At boot each address is hashed as `SHA256("<email>:<site.secret>")` and only `{ digest, display_name }` is returned by the API; the digest→email table stays in process memory. | verified (STRUCTURAL) | `apps/api/incoming/initializers/setup_incoming_recipients.rb:64-84`, `:92-113` |
| F9 | The canonical recipient list is built **once at boot** into frozen module-level state. Changing `INCOMING_RECIPIENT_*` or `features.incoming.recipients` requires an **application restart**. | verified (STRUCTURAL) | `apps/api/incoming/initializers/setup_incoming_recipients.rb:23-30`, `:82-86`; the ivars are written only there (no other writer of `@incoming_recipient_lookup` / `@incoming_public_recipients` at the pin) |
| F10 | The recipient-setup initializer skips entirely when `features.incoming.enabled` is false, so no hashing work happens on a disabled install. | verified (STRUCTURAL) | `apps/api/incoming/initializers/setup_incoming_recipients.rb:27-29` |
| F11 | Enabling canonical incoming **requires `site.secret` to be set**: the initializer raises `OT::Problem` when it is blank, rather than hashing with a predictable fallback. | verified (STRUCTURAL) | `apps/api/incoming/initializers/setup_incoming_recipients.rb:38-44`. **But see hazard F-h3: the initializer is `@optional`, so the raise is swallowed at boot.** |
| F12 | Canonical policy values: `memo_max_length` **50** characters, `default_ttl` **604800** seconds (7 days), `default_passphrase` **nil**. All three operator-settable via `INCOMING_MEMO_MAX_LENGTH` / `INCOMING_DEFAULT_TTL` / `INCOMING_DEFAULT_PASSPHRASE`. | verified — shipped defaults | `etc/defaults/config.defaults.yaml:731-736`; `lib/onetime/config.rb:145-151`; `.env.reference:1051-1070` |
| F13 | `features.incoming.default_ttl` is coerced to integer seconds at boot, because the ERB default yields a String whenever `INCOMING_DEFAULT_TTL` is set. | verified (STRUCTURAL) | `lib/onetime/config.rb:517-525` |
| F14 | When `features.incoming.default_passphrase` is set, **every** canonical incoming secret is created with that passphrase; it is read from global config only and is never per-domain. | verified — shipped default (nil) | `apps/api/incoming/logic/create_incoming_secret.rb:61-63`, `:205-211`; `.env.reference:1051-1058`. The recipient must be told the passphrase out of band; the notification email only signals `has_passphrase` (`create_incoming_secret.rb:299`). |
| F15 | The size ceiling on incoming secret content is the **global** `site.secret_options.content.maximum_length` (measured in **bytes**, default 10000), not an incoming-specific key. The same value is echoed to the form as `secret_max_length`. | verified (STRUCTURAL) | `lib/onetime/incoming/recipient_resolver.rb:187-195`; `lib/onetime/logic/base.rb:181-194`; `apps/api/incoming/logic/create_incoming_secret.rb:82` |

### F.3 Rate limiting (ships ON)

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| F16 | Anonymous submissions are rate limited **by default**, in two tiers: per edge-masked client IP (**10** per window) and per client-supplied recipient hash (**30** per window), with a 3600s window and 3600s lockout. Opt out with `INCOMING_RATE_LIMIT_ENABLED=false`. | verified — shipped defaults | `etc/defaults/config.defaults.yaml:737-751`; `lib/onetime/security/incoming_rate_limiter.rb:50-63`, `:170-195`. **Unlike most feature flags here this one is protective and defaults ON:** the ERB is `!= 'false'`. |
| F17 | The throttle runs **before** any secret is written, any email is enqueued, and before the resolver performs Redis I/O. | verified (STRUCTURAL) | `apps/api/incoming/logic/create_incoming_secret.rb:85-92` |
| F18 | Each tier's check-and-record is a **single atomic Lua call**, so a concurrent burst cannot overshoot the cap; hitting the cap sets a lockout key and deletes the counter, and the caller receives `Onetime::LimitExceeded` carrying `retry_after`. | verified (STRUCTURAL) | `lib/onetime/security/incoming_rate_limiter.rb:65-95`, `:125-146` |
| F19 | A request with **no resolvable client IP skips the IP tier entirely** and is bounded only by the per-recipient backstop, which all nil-IP callers share. | verified (STRUCTURAL) | `lib/onetime/security/incoming_rate_limiter.rb:26-30`, `:151-158`; `apps/api/incoming/logic/create_incoming_secret.rb:152-158`. The IP comes from the same `StrategyResult` metadata the login limiter uses; a misconfigured reverse proxy therefore weakens this tier. |
| F20 | Rate-limit state lives in Redis under `incoming:attempts:ip:{ip}`, `incoming:locked:ip:{ip}`, `incoming:attempts:rcpt:{hash}`, `incoming:locked:rcpt:{hash}`. **Redis errors propagate and reject the request** rather than silently permitting it. | verified (STRUCTURAL) | `lib/onetime/security/incoming_rate_limiter.rb:31-40`, `:208-213` |

### F.4 The governing split, and per-domain incoming

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| F21 | **THE GOVERNING SPLIT:** `features.incoming.enabled` governs the **CANONICAL domain only**. Incoming on a custom domain is governed by the domain-owning org's `incoming_secrets` entitlement plus a **ready** per-domain `IncomingConfig`, and is unaffected by that flag. The two systems never intermix and there is no fallback between them. | verified (STRUCTURAL) | `lib/onetime/incoming/recipient_resolver.rb:9-13`, `:42-61`, `:151-179`; `etc/defaults/config.defaults.yaml:722-729`; `apps/api/domains/logic/incoming_config/base.rb:81-91`. **The single most load-bearing fact on the page** — three separate code comments state it explicitly. |
| F22 | Per-domain recipients are stored in Redis on `CustomDomain::IncomingConfig` as a JSON array of `{email, name}`, keyed 1:1 by the CustomDomain objid. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain/incoming_config.rb:28-58` |
| F23 | A custom domain accepts **at most 20 recipients**; duplicate addresses are rejected and each address must match a basic email regex at write time (Truemail/DNS validation is deferred to send time to keep config saves fast). | verified (STRUCTURAL) | `lib/onetime/models/custom_domain/incoming_config.rb:34-35`, `:186-195`, `:277-299` |
| F24 | A per-domain config is **"ready" only when it is enabled AND has at least one recipient.** An enabled config with zero recipients reports disabled, because it has nowhere to deliver. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain/incoming_config.rb:84-93`; `lib/onetime/incoming/recipient_resolver.rb:33-47` |
| F25 | Per-domain `memo_max_length` and `default_ttl` are **NOT configurable**. They are hardcoded constants (50 characters, 604800 seconds) shared by every custom domain; only the canonical domain reads those values from YAML. | verified (hardcoded) | `lib/onetime/models/custom_domain/incoming_config.rb:37-43`, `:156-165`; `lib/onetime/incoming/recipient_resolver.rb:157-179`. The model comment says so outright: "Not user-configurable per-domain at this time". |
| F26 | Per-domain recipient digests use the **same construction** as canonical ones — `SHA256("<email>:<site.secret>")` — and the config **fails closed** (raises `Onetime::Problem`, which the resolver converts to an empty list / nil lookup) when `site.secret` is unset. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain/incoming_config.rb:145-154`, `:379-400`; `lib/onetime/incoming/recipient_resolver.rb:51-55`, `:75`, `:81-86`, `:97-103` |
| F27 | Operator-facing management API for a custom domain: `GET` / `PUT` / `DELETE /api/domains/:extid/incoming-config`, **session auth only** (no Basic/API-key auth, unlike the sibling homepage-config routes). | verified (STRUCTURAL) | `apps/api/domains/routes.txt:53-56` (compare `:43-46` for homepage-config, which also allows basicauth) |
| F28 | Writing a domain's incoming config requires the caller to hold `manage_org` in the domain-owning org **AND** that org to hold the `incoming_secrets` entitlement. The install-wide `features.incoming.enabled` flag is explicitly **not** consulted. | verified (STRUCTURAL) | `apps/api/domains/logic/incoming_config/base.rb:62-91`; `apps/api/domains/logic/incoming_config/put_incoming_config.rb:63-64` |
| F29 | On a stock self-hosted instance **both `incoming_secrets` and `manage_org` are members of `STANDALONE_ENTITLEMENTS`**, so the entitlement gates above never bind and org role/ownership is the whole answer. | verified (STRUCTURAL) | `lib/onetime/models/organization/features/with_plan_entitlements.rb:23-32` (fail-open contract), `:48-56` (`incoming_secrets` at `:52`, `manage_org` at `:55` per this subject). **Do not describe incoming as plan-gated without this qualifier.** |
| F30 | `PUT /incoming-config` with the `recipients` key **omitted** toggles only the `enabled` flag and leaves the stored recipient list intact; **sending `recipients` replaces the whole list.** | verified (STRUCTURAL) | `apps/api/domains/logic/incoming_config/put_incoming_config.rb:38-39`, `:109-129` |
| F31 | For anonymous submissions on a custom domain the entitlement is checked against the org that **OWNS the domain**, not the (nil) session org. A domain with no resolvable owning org is rejected with `OT::Forbidden`. | verified (STRUCTURAL) | `lib/onetime/incoming/recipient_resolver.rb:105-149` |
| F32 | Domains configured before the `IncomingConfig` model existed keep their recipients in a legacy `CustomDomain.incoming_secrets` JSON blob, which the resolver **no longer reads**. A housekeeping chore migrates them: `bin/ots housekeeping run Onetime::CustomDomain migrate_incoming_secrets_to_config`. Idempotent; never overwrites an existing `IncomingConfig`. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain/chores/migrate_incoming_secrets_to_config.rb:9-34` (rationale + command), `:36-80` |

### F.5 Interaction with the branded homepage

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| F33 | A custom domain's branded homepage can be pointed at the incoming form: `HomepageConfig.secrets_mode` selects `create` (the classic secret-creation form) or `incoming`. Unset, blank and legacy records read as `create`. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain/homepage_config.rb:36-50`, `:83-86`, `:151-162`, `:299-302` |
| F34 | Setting `secrets_mode=incoming` is **refused at write time** unless the org holds `incoming_secrets` AND the domain's `IncomingConfig` is already ready. An unrecognised mode string is rejected outright rather than silently coerced. | verified (STRUCTURAL) | `apps/api/domains/logic/homepage_config/put_homepage_config.rb:122-177` |
| F35 | Readiness is **re-checked at every read**. If incoming later drifts unready — recipients removed, config disabled or deleted, `site.secret` blank, entitlement lapsed — the branded homepage **fails closed to the non-interactive trust card**. It never falls back to the create form, and the stored `secrets_mode` is preserved so re-readying incoming restores the operator's intent. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain/homepage_config.rb:178-224`; `apps/web/core/views/serializers/domain_serializer.rb:120-158` |
| F36 | `HomepageConfig#incoming_available?` deliberately does **not** consult `features.incoming.enabled` — the same canonical/custom split the resolver enforces — so a custom domain's homepage can serve incoming on an install where the canonical flag is off. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain/homepage_config.rb:202-224` |
| F37 | A stored `secrets_mode` value the app does not recognise (direct Redis write, botched migration, newer app version) **fails closed to the trust card** rather than displaying the create form. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain/homepage_config.rb:163-200` |
| F38 | The page a visitor gets when the homepage is private or incoming has degraded is chosen by `homepage_config.disabled_homepage_variant`, else the deployment-wide `site.interface.ui.homepage.custom_disabled_variant` (`DEFAULT_CUSTOM_DOMAIN_DISABLED_HOMEPAGE_VARIANT`), else the frontend default. **Custom domains do not inherit the canonical site's `disabled_variant`.** | verified — shipped default (nil → `closed`) | `etc/defaults/config.defaults.yaml:77-84`; `lib/onetime/models/custom_domain/homepage_config.rb:74-81`, `:144-149`. Valid ids: `v1`, `minimal`, `closed` (`homepage_config.rb:32`). **§A16 files a fuller chain that adds a `?variant=` rung above these — see §L3.** |
| F39 | Saving an incoming config that leaves it unready **while the homepage points at incoming is deliberately NOT blocked** — the write succeeds, an audit line is logged, and the public homepage silently degrades to the trust card. | verified (STRUCTURAL) | `apps/api/domains/logic/incoming_config/put_incoming_config.rb:131`, `:145-158` |
| F40 | The colonel/admin API can write `secrets_mode` directly, **bypassing the workspace write gate**, as admin-repair power; the read-time gates still fail closed. Routes: `GET`/`POST`-ensure/`PUT`/`DELETE /api/colonel/domains/:extid/configs[/:kind]`, colonel role, internal scope; `incoming` is one of the editable, materializable kinds. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain/homepage_config.rb:92-110`; `lib/onetime/models/custom_domain/config_registry.rb:58-68`, `:324-333`; `apps/api/colonel/routes.txt:59-63` |

### F.6 What a submission actually does

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| F41 | A successful submission creates a linked **Receipt/Secret pair stamped `source='incoming'`**, carrying the memo, the raw recipient email, and the recipient's display name. | verified (STRUCTURAL) | `apps/api/incoming/logic/create_incoming_secret.rb:110-126`, `:197-234`; `lib/onetime/models/receipt.rb:44-49`, `:80-87` |
| F42 | Because `source='incoming'`, the **sender's receipt withholds the share link, custid, owner_id and secret_identifier** — so the sender opening their own receipt cannot spend the secret's single view. Legacy receipts with no source read as `standard` (link shown); any unrecognised source fails closed. | verified (STRUCTURAL) | `lib/onetime/models/receipt.rb:88-101`, `:114-128`; `lib/onetime/models/receipt/features/safe_dump_fields.rb:61-79` |
| F43 | The recipient is notified by email containing a link to `/secret/<key>`. **The memo is shown in the body but deliberately kept OUT of the subject line**, since subjects are visible in inbox list views. | verified (STRUCTURAL) | `lib/onetime/mail/views/incoming_secret.rb:25-49`, `:73-85`; `apps/api/incoming/logic/create_incoming_secret.rb:281-305`. Templates: `lib/onetime/mail/templates/incoming_secret.{html,txt}.erb`. |
| F44 | Email delivery is enqueued through the job publisher and **its failure is caught and logged** — a mail outage does not fail the submission or lose the secret. | verified (STRUCTURAL) | `apps/api/incoming/logic/create_incoming_secret.rb:281-309`. Operator consequence: the sender sees success, the recipient never learns of it. Check worker/queue health. |
| F45 | On a custom domain the receipt, the secret, the generated link and the notification email are all bound to the **Host-header domain** (`share_domain` plus `domain_id`), so nothing renders the canonical host; `domain_id` also selects the per-domain sender identity. | verified (STRUCTURAL) | `apps/api/incoming/logic/create_incoming_secret.rb:197-211`, `:227-231`, `:236-268`, `:284-303` |
| F46 | The resolved recipient address is **re-validated with Truemail in `:regex` mode** (no DNS) on every submission as a corruption guard; failure produces a form error and no secret. | verified (STRUCTURAL) | `apps/api/incoming/logic/create_incoming_secret.rb:100-107` |
| F47 | Every submission increments the global `secrets_created` counter; when the sender happens to be signed in, the receipt is also attached to their account. | verified (STRUCTURAL) | `apps/api/incoming/logic/create_incoming_secret.rb:270-279` |

### F.7 UI exposure and org-less installs

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| F48 | `ORGS_INCOMING_SECRETS_ENABLED` (`features.organizations.incoming_secrets_enabled`) is a **UI-exposure flag**: it controls whether domain owners are shown the per-domain incoming configuration surface in the workspace. Shipped default **false**. | verified — shipped default | `etc/defaults/config.defaults.yaml:849-853`; `.env.reference:607-610`; `apps/web/core/views/serializers/config_serializer.rb:249-260`; `src/utils/features.ts:657-658`; `src/apps/workspace/components/domains/DomainsTable.vue:52`; `src/apps/workspace/domains/DomainDetail.vue:101,218`; `DomainIncoming.vue:66`. Deliberately **NOT** ANDed with `features.incoming.enabled` — see the comment at `config_serializer.rb:253-259`. **See hazard F-h1: it is not a kill switch.** |
| F49 | The workspace UI for per-domain recipients lives at `/org/:orgid/domains/:extid/incoming`. | verified (STRUCTURAL) | `src/apps/workspace/routes/dashboard.ts:248-252` |
| F50 | An operator running with **organizations disabled still gets canonical incoming**: the canonical path uses only YAML config and never touches an org, entitlement or custom domain. | verified (STRUCTURAL) | `lib/onetime/incoming/recipient_resolver.rb:43-45`, `:71-73`, `:93-95`, `:120-121` (`require_domain_entitlement!` returns true immediately unless the strategy is `:custom`) |

**50 rows.**

### F.8 Gaps — where the evidence runs out

1. **F-g1.** No evidence at 4cbd42149 of what the hosted service sets for `INCOMING_ENABLED`, `ORGS_INCOMING_SECRETS_ENABLED`, the recipient list, or the rate-limit values. **The page must not state hosted behaviour as fact.**
2. **F-g2.** **No CLI command for incoming exists.** `git grep -i incoming 4cbd42149 -- lib/onetime/cli bin/` returns only unrelated hits. Per-domain recipients are manageable only via the domains API / workspace UI, or the colonel configs endpoint; canonical recipients only via config/env plus a restart.
3. **F-g3.** Did not establish whether anything **reloads canonical recipients without a process restart**. No reloader, signal handler or admin endpoint writes `@incoming_recipient_lookup` at the pin — but "absence of a writer" is the strongest claim available, not a documented contract.
4. **F-g4.** Did not trace how the **reveal** side treats an incoming secret differently from a normal one (whether the recipient's `/secret/<key>` view has any incoming-specific behaviour). Nothing in the create path suggests it does, but the reveal logic was not read.
5. **F-g5.** Did not verify per-recipient notification preferences, per-recipient enable/disable, or any inbox/queue view of received secrets — none appear to exist, but they were searched for only via the model and API surfaces above.
6. **F-g6.** Did not read the frontend recipient-selection UX in detail (`IncomingRecipientDropdown.vue`, `IncomingSecretFormBody.vue`), so **cannot describe what the sender sees when multiple recipients are configured** beyond "digest + display_name are returned".
7. **F-g7.** The e2e specs (`e2e/all/incoming-secrets.spec.ts`, `e2e/full/domain-incoming-entitlement.spec.ts`) were not read; they may pin behaviours worth citing.
8. **F-g8.** `features.incoming.rate_limit` has **no entry** in `lib/onetime/config.rb` `DEFAULTS` (only `enabled` / `memo_max_length` / `default_ttl` / `default_passphrase` / `recipients` are there, at `:145-151`). The limiter therefore falls back to its own module constants when a config file omits the block — behaviour verified in code, but the asymmetry with the other keys is unexplained anywhere found.

### F.9 Hazards — do not write these wrong

1. **F-h1. CODE CONTRADICTS SHIPPED COMMENT.** Both `etc/defaults/config.defaults.yaml:727-729` and `.env.reference:938-939` tell operators that setting `ORGS_INCOMING_SECRETS_ENABLED=false` is a way to **emergency-disable incoming on custom domains. It is not.** The only Ruby reader of that key at 4cbd42149 is `apps/web/core/views/serializers/config_serializer.rb:260`, which merely publishes it to the frontend bootstrap. Neither `RecipientResolver#enabled?` nor `HomepageConfig#incoming_available?` nor `authorize_domain_incoming!` consults it. Setting it false hides the workspace UI and leaves the `/api/domains/:extid/incoming-config` endpoints and anonymous submissions to already-configured custom domains **fully working**. **The page must not repeat the shipped advice.** The only real kill switches for a custom domain are: revoke the org's `incoming_secrets` entitlement, disable the domain's `IncomingConfig`, or clear its recipients.
2. **F-h2. ASYMMETRIC ENABLE SEMANTICS.** On the canonical domain `RecipientResolver#enabled?` returns the raw config flag and does **NOT** check that any recipient exists (`recipient_resolver.rb:42-45`), whereas custom domains require `IncomingConfig#ready?` (enabled AND ≥1 recipient, `:46-47`). **`INCOMING_ENABLED=true` with no `INCOMING_RECIPIENT_*` therefore serves a live form with an empty recipient list, and every submission dies at "Invalid recipient"** (`create_incoming_secret.rb:94-98`). Setting the flag is not sufficient; the page must tell the operator to configure at least one recipient **and restart**.
3. **F-h3. SILENT BOOT DEGRADATION.** `SetupIncomingRecipients` raises `OT::Problem` when `site.secret` is blank (`setup_incoming_recipients.rb:38-44`), but the initializer sets `@optional = true` (`:24-25`) and `Boot::Initializer#run` re-raises only for non-optional initializers (`lib/onetime/boot/initializer.rb:98-104`). **So the failure is swallowed: the app boots, incoming reports enabled, and the recipient list is empty.** Reachable in practice only via `development.allow_nil_global_secret`, since the boot path otherwise refuses a nil `SECRET`.
4. **F-h4. CANONICAL-ONLY POLICY KEYS.** `INCOMING_MEMO_MAX_LENGTH`, `INCOMING_DEFAULT_TTL` and `INCOMING_DEFAULT_PASSPHRASE` affect the **canonical domain only**. Custom domains use hardcoded constants (50 / 604800) and get **no passphrase at all** — the passphrase is read from global config in `create_incoming_secret.rb:61-63` with the code comment "not per-domain yet". A page that presents these as global knobs will be wrong for anyone running incoming on a custom domain.
5. **F-h5. PARTIALLY BUILT.** `IncomingConfig::FIELD_SPECS` exposes only `enabled` as colonel-writable, with the comment "Recipients stay workspace-managed in v1" (`incoming_config.rb:63-72`), and `DEFAULTS` is annotated "Not user-configurable per-domain at this time" (`:37-43`). Per-domain policy configuration is an **acknowledged v1 limitation** — not an oversight, but also not a stable contract to document as a feature.
6. **F-h6. LEGACY DATA STRANDING.** The resolver no longer reads the legacy `CustomDomain.incoming_secrets` JSON blob. A domain configured before #3095 that has not had the `migrate_incoming_secrets_to_config` chore run against it will **report incoming disabled with no error anywhere the operator would look** (`migrate_incoming_secrets_to_config.rb:9-15`).
7. **F-h7. SENDER CANNOT RETRIEVE.** `source='incoming'` permanently withholds the share link and `secret_identifier` from the sender's own receipt (`receipt.rb:93-101`; `safe_dump_fields.rb:66-79`). **If the notification email fails to deliver, the secret is unreachable by anyone** — the enqueue failure is caught and logged, not surfaced to the sender (`create_incoming_secret.rb:306-309`). Worth stating plainly on an operator page.
8. **F-h8.** The per-IP rate-limit tier depends on a trustworthy edge-masked client IP from `StrategyResult` metadata (`create_incoming_secret.rb:152-158`). Behind a misconfigured reverse proxy the IP tier either collapses to one bucket or is skipped entirely, leaving only the per-recipient backstop (`incoming_rate_limiter.rb:26-30`).

### F.10 Hosted vs self-hosted

Everything material about incoming secrets is self-hostable and none of it is hosted-only: the
`/incoming` form, the `/api/incoming` endpoints, canonical recipients from config, per-domain
recipients on custom domains, the homepage `secrets_mode` switch, and the rate limiter all run on a
self-hosted instance. The only genuinely hosted-flavoured element is the `incoming_secrets`
entitlement, and on a stock self-hosted instance **it does not bind**. Consequence for the page:
describe custom-domain incoming as gated by org ownership/role plus a ready per-domain config, and
mention the entitlement only as a hosted-plan concern — never as something a self-hoster must enable.
Two operator switches ARE genuinely self-hosted shipped defaults and both ship **OFF**:
`INCOMING_ENABLED=false` (canonical form) and `ORGS_INCOMING_SECRETS_ENABLED=false` (workspace UI for
per-domain config). The rate limiter is the inverse — it ships **ON**. The hosted counterpart pages
(`custom-domains/homepage-and-incoming`, `share/receiving-secrets`) describe the custom-domain and
end-user halves; the operator page's distinct contribution is the canonical-domain configuration, the
boot-time recipient hashing and restart requirement, the rate limiter, and the canonical/custom split
itself.

---

## G. features/custom-domains

**Feature reality: PARTIALLY.** The feature is large — a full `CustomDomain` model, an
organization-scoped API, a colonel toolbox, ten CLI verbs, request-time classification middleware, and
three pluggable validation strategies. But **the specific subject of this page, OWNERSHIP
VERIFICATION, is materially smaller than the machinery around it.** A TXT challenge is minted at
registration and shown to the customer, but **on the shipped default strategy it is never checked**.
The only strategy that really checks DNS is `approximated`, a paid third-party service. The third,
`caddy_on_demand`, is a dead end at this commit (see §H).

### G.1 The model, and whether the feature is on

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| G1 | Custom domains are a first-class model: `Onetime::CustomDomain`, a Familia Horreum record keyed by objid with a user-facing extid (`cd%<id>s`), owned by an **ORGANIZATION** (`org_id`), not by a user account. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain.rb:53-97` (class, features, fields), `:122` (`participates_in :Organization, :domains`), `:169-174` (save raises without `org_id`). The file header (`:35-52`) states the extid/objid contract: public surfaces use extid, FKs use objid. |
| G2 | **There is no config file or env var that registers a domain.** Records are created only through the API (`POST /api/domains/add`), the colonel API (`POST /api/colonel/domains`), or the CLI (`bin/ots domains create`). | verified (STRUCTURAL) | `apps/api/domains/routes.txt:12`; `apps/api/colonel/routes.txt:52`; `lib/onetime/cli/domains/create_command.rb:30-118`. `custom_domain.rb:10` says "CustomDomain records can only be created via V2 API" — stale wording, but the point holds: no declarative config path. |
| G3 | The feature is **OFF by default**. `features.domains.enabled` / `DOMAINS_ENABLED` ships as **false** in both the defaults file and the code-level `DEFAULTS` hash. | verified — shipped default | `etc/defaults/config.defaults.yaml:770-771`; `.env.reference:868`; `lib/onetime/config.rb:131-132` |
| G4 | `ConfigureDomains` reads `features.domains` at boot, sets `Runtime.features.domains_enabled`, and **returns immediately when disabled** — the Approximated/validation settings are not even loaded. | verified (STRUCTURAL) | `lib/onetime/initializers/configure_domains.rb:23-31` |
| G5 | With domains disabled, the `DomainStrategy` middleware classifies **every** request `:canonical` and reports the canonical host as the display domain; a request to a registered custom host never resolves to its record. **`DOMAINS_ENABLED=true` is the single prerequisite for a custom host to be served as a custom host.** | verified (STRUCTURAL) | `lib/onetime/middleware/domain_strategy.rb:117-143` (the `if domains_enabled?` gate), `:227-229`, `:517-533`, `:572-573` |
| G6 | **`DOMAINS_ENABLED` gates request classification and the workspace navigation item — it does NOT gate the domains API.** `AddDomain` performs no feature-flag check, so the endpoint still creates records when the feature is off. | verified (absence) | `apps/api/domains/logic/domains/add_domain.rb:43-94` (`raise_concerns` — no `features.domains.enabled` check) and `:96-130`; `src/apps/workspace/layouts/WorkspaceLayout.vue:63,76`. Verified by absence: no `features','domains','enabled` read anywhere in `apps/api/domains/logic`. **This resolves gap B-g1 in the same direction.** |
| G7 | Adding, viewing and removing a domain all require the `custom_domains` entitlement in the target organization (`require_entitlement_in!`). | verified (STRUCTURAL) | `apps/api/domains/logic/domains/add_domain.rb:61-63`; `get_domain.rb:43-46`; `remove_domain.rb:33-37`. `add_domain.rb:65-66` carries a **stale comment** ("Entitlement check removed") directly under the live check. |
| G8 | On a stock self-hosted instance `custom_domains` is always granted at org level (`STANDALONE_ENTITLEMENTS`), so plan tier is not a constraint and **ROLE is the whole answer**: `custom_domains` is an ADMIN-tier role entitlement, so an org OWNER or ADMIN can manage domains and a plain MEMBER cannot. | verified (STRUCTURAL) | `with_plan_entitlements.rb:48-56`, `:23-32`; `lib/onetime/models/organization_membership.rb:80-88`, `:102-106`. Effective entitlements are org ∩ role, so on self-hosted the role set is the binding term. |

### G.2 Registration rules

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| G9 | A domain name is normalised through PublicSuffix into `display_domain` / `base_domain` / `trd` / `sld` / `tld`, and `apex?` is "no subdomain". The **display domain** is what the customer points at the app; the **base domain** is where the ownership TXT record is published. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain.rb:143-150`, `:998-1021`, `:1023-1045`, `:500-502` |
| G10 | Registration input limits: at most **10** dot-separated labels, at most **253** characters, and any ASCII control character is rejected outright. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain.rb:58-61`, `:977-985`, `:1186-1193` |
| G11 | A display domain is **globally unique across the whole instance**. Uniqueness is enforced atomically with `HSETNX` on `display_domain_index`; the caller sees "Domain already registered in your organization" or "Domain is registered to another organization". Two organizations on the same instance cannot both register the same FQDN. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain.rb:130`, `:775-809` |
| G12 | A domain that overlaps the deployment's canonical hosts is **refused**: exact match against `site.host`, `features.domains.default` and every `features.domains.link_domains` entry, plus a base-domain sweep against the two ANCHOR hosts only. Unparseable input **fails closed** (treated as overlap). | verified (STRUCTURAL) | `lib/onetime/models/custom_domain.rb:1087-1155`, `:1157-1184`, `:761-773`; `apps/api/domains/logic/domains/add_domain.rb:48`. Operator consequence: if `site.host=example.com`, a customer cannot register anything under `example.com`, but **CAN** register a sibling of a `LINK_DOMAINS` pool member — deliberate, documented at `:1100-1109`. |
| G13 | A domain record with no `org_id` is **"orphaned"**, and the next registration of that FQDN **CLAIMS** it (WATCH/MULTI) instead of failing. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain.rb:723-729`, `:791-795`, `:898-960`. `bin/ots domains orphaned` lists them; `bin/ots domains repair --org-id` is the only verb that adopts one. |
| G14 | Creating a domain does **five things in one call**: generates the TXT challenge, saves the record, joins it to the organization, creates default-**DISABLED** `HomepageConfig` and `ApiConfig` siblings, and asks the configured validation strategy for a certificate. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain.rb:812-828`, `:879-889`; `apps/api/domains/logic/domains/add_domain.rb:96-146`. **Certificate-request failures are swallowed** (`add_domain.rb:110-116`) — domain creation still succeeds. |

### G.3 The ownership TXT record

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| G15 | The ownership TXT record host is `_onetime-challenge-<first 7 characters of the domain's objid>`, with `.<trd>` appended for a subdomain (e.g. `_onetime-challenge-abc1234.status`). The value is 16 random bytes as **32 lowercase hex characters**. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain.rb:132`, `:606-634` (`SecureRandom.hex(16)` at `:622`). Generated **once, at registration** (called from `create!` at `:813`) — not regenerated on each verify. |
| G16 | The TXT record is published on the **BASE domain, not the display domain**: the FQDN checked is `txt_validation_host + '.' + base_domain`. For `status.example.com` the record lives at `_onetime-challenge-abc1234.status.example.com` in the `example.com` zone. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain.rb:636-645`, `:998-1009` (the comment stating the rule explicitly) |
| G17 | The TXT pair is format-validated before use: host must match `[a-zA-Z0-9._-]+`, value must be exactly 32 hex characters. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain.rb:574-588` |
| G18 | The customer-facing setup screen shows three steps: the TXT record, then an **A record** (apex) or **CNAME** (subdomain), then wait for propagation. The A/CNAME **target values** are read from the cluster payload — `proxy_ip` and `proxy_host` — which come from `APPROXIMATED_PROXY_IP` / `APPROXIMATED_PROXY_HOST`. | verified — shipped defaults (both **EMPTY**) | `src/apps/workspace/components/domains/VerifyDomainDetails.vue:102-164`; `apps/api/domains/logic/domains/get_domain.rb:67-75`; `lib/onetime/domain_validation/features.rb:128-142`, `:90-110`. **On a stock self-hosted instance the A/CNAME step renders with a blank target value.** `Features.load_from_config` reads the approximated block regardless of strategy, so an operator running passthrough *can* set `APPROXIMATED_PROXY_IP`/`APPROXIMATED_PROXY_HOST` purely to populate these instructions — verified by code path, **NOT documented anywhere in the repo as a supported use**. |

### G.4 Verification: the three strategies

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| G19 | Verification is **on-demand, not automatic**: `POST /api/domains/:extid/verify` (session or basic auth) runs `Onetime::Operations::VerifyDomain`, which calls the strategy's `validate_ownership` then `check_status` and persists the outcome. Same op backs the CLI, the colonel endpoint and the scheduled refresh job. | verified (STRUCTURAL) | `apps/api/domains/routes.txt:15`; `apps/api/domains/logic/domains/verify_domain.rb:20-33`; `lib/onetime/operations/verify_domain.rb:137-191` |
| G20 | There are four verification states — `:unverified` (no TXT generated), `:pending` (TXT exists, not resolving), `:resolving` (resolving but TXT not matched), `:verified` — and `ready?` is true **only** in `:verified`, i.e. both the `verified` and `resolving` fields must read `'true'`. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain.rb:647-675` |
| G21 | Persistence is **deliberately partial**: a field is only written when the call that produced it returned authoritative data (`:data` for a live API call, `:mode` for a passive strategy). A failed status fetch stamps `vhost_fetch_failed_at` and leaves `resolving` untouched. | verified (STRUCTURAL) | `lib/onetime/operations/verify_domain.rb:302-340`. Fix for issue #3080 — prevents a transient API failure from flipping a healthy domain red. |
| G22 | `features.domains.validation_strategy` selects one of three strategies — `passthrough` (also accepts `external`), `approximated`, `caddy_on_demand` (also accepts `caddy`). An unrecognised name **silently falls back to passthrough** unless `features.domains.strict_strategy: true`. Shipped default `passthrough`. | verified — shipped default | `lib/onetime/domain_validation/strategy.rb:37-73`; `etc/defaults/config.defaults.yaml:812-817`; `.env.reference:885-886`. **`strict_strategy` has NO defaults-file entry and no env var** — it is read only at `strategy.rb:39`. |
| G23 | **Under the shipped default strategy (`passthrough`) the TXT record is NEVER CHECKED**: `validate_ownership` returns `validated: true` unconditionally, and `check_status` returns `ready`, `has_ssl` and `is_resolving` all true. | verified (STRUCTURAL) — **THE central fact for this page** | `lib/onetime/domain_validation/passthrough_strategy.rb:16-56` (`validate_ownership` `:26-32`, `check_status` `:45-56`). Combined with the persist path (`lib/onetime/operations/verify_domain.rb:316-333`), **the first verify call on a stock instance flips any domain — owned or not — straight to `:verified` / `ready?`.** The repo's own ADR states the consequence verbatim: `docs/architecture/decision-records/adr-017-domain-validation-link-creation-gate.md` (Context section). |
| G24 | Under `caddy_on_demand`, `validate_ownership` also returns true, but `check_status` returns `is_resolving: nil`, so the `resolving` field is never written. A domain therefore stays in `:pending` and **`ready?` never becomes true**. | verified (STRUCTURAL) | `lib/onetime/domain_validation/caddy_on_demand_strategy.rb:29-63` (`is_resolving nil` at `:61`); `lib/onetime/operations/verify_domain.rb:321-329`; `lib/onetime/models/custom_domain.rb:656-675`. Nothing else in the codebase writes `resolving` — verified by grep across `lib/` and `apps/`. |
| G25 | The internal ACME "ask" endpoint answers 200 only for domains where `ready?` is true. Because `caddy_on_demand` can never reach `ready?`, **that endpoint returns 403 for every domain and Caddy never issues a certificate.** | verified (STRUCTURAL) — **HAZARD** | `apps/internal/acme/application.rb:34-57`, `:140-155`; combined with `caddy_on_demand_strategy.rb:55-63`. A closed loop with no escape hatch in code — see G26. **Do not document `caddy_on_demand` as a working self-hosted path without saying this.** Full treatment in §H. |
| G26 | The `check_verification=false` query parameter documented in the ACME README **no longer exists on the HTTP interface** — the handler always verifies. The keyword argument survives only on the internal Ruby method. | verified (absence) — **HAZARD** | `apps/internal/acme/application.rb:46-49` (comment: "The check_verification parameter was removed from the HTTP interface to prevent any local process from bypassing DNS verification via query string") vs `apps/internal/acme/README.md:24-30`, `:81-89`. **The app's own README is stale here. A docs page that copies the README escape hatch would be wrong.** |
| G27 | The ACME app only loads when `features.domains.acme.enabled` is true (default **false**). When enabled it auto-mounts **inside the main Rack process** at `/api/internal/acme`; a `LocalhostOnly` middleware rejects any non-loopback client with 401. | verified — shipped default | `apps/internal/acme/application.rb:112-124`, `:69-94`; `etc/defaults/config.defaults.yaml:839-844`; `.env.reference:895-912`. **`ACME_LISTEN_ADDRESS` (127.0.0.1) and `ACME_PORT` (12020) apply ONLY to a standalone `rackup apps/internal/acme/config.ru` process; they do nothing in the auto-mounted mode.** |
| G28 | Because the ACME endpoint is mounted inside the main app, `/api/internal/acme/*` is **publicly routable through the reverse proxy unless blocked there**; the repo recommends returning 404 for that path at the proxy as defence in depth. Caddy's `on_demand_tls ask` calls the backend directly and bypasses the proxy route rules, so the block is safe. | verified (STRUCTURAL) | `apps/internal/acme/README.md:45-57` |
| G29 | **Only the `approximated` strategy performs a real ownership check**: it POSTs the expected TXT record to `https://cloud.approximated.app/api/dns/check-records-match-exactly` and marks the domain verified when the record matches exactly. It also creates the vhost (port 443) and reads back `has_ssl` / `is_resolving` / `status`. | verified (STRUCTURAL) | `lib/onetime/domain_validation/approximated_strategy.rb:49-84`, `:91-135`, `:142-179`; `lib/onetime/domain_validation/approximated_client.rb:27-31`. Requires an account with a third-party SaaS (approximated.app) plus `APPROXIMATED_API_KEY` and `APPROXIMATED_VHOST_TARGET`; without the key every call short-circuits to an error result. **Both ship empty** (`.env.reference:889-893`). |
| G30 | The DNS-provider widget is **Approximated-only**. `GET /api/domains/dns-widget/token` raises "DNS widget not available" for passthrough and caddy_on_demand, and the frontend renders the widget only when `validation_strategy === 'approximated'`. | verified (STRUCTURAL) | `apps/api/domains/logic/domains/get_dns_widget_token.rb:26-38`; `lib/onetime/domain_validation/passthrough_strategy.rb:75-91`; `src/utils/features.ts:459-461,477-483` |
| G31 | Under passthrough the app does **no TLS work at all**: certificates and validation are the operator's reverse proxy's job (Caddy, nginx, Traefik…). The app only tracks which domains exist. **This is the only self-hostable path that actually works end to end at this commit.** | verified (STRUCTURAL) | `lib/onetime/domain_validation/passthrough_strategy.rb:7-14`, `:37-43` (`request_certificate` returns status `'external'`) |

### G.5 How a request to a custom host is resolved

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| G32 | A request is classified `:custom` purely by **REGISTRATION** — `known_custom_domain?` is an index lookup on `display_domain`. **Verification status plays no part** in whether a custom domain is served with its per-domain branding and config. | verified (STRUCTURAL) | `lib/onetime/middleware/domain_strategy.rb:298-329`, `:446-454`; `lib/onetime/models/custom_domain.rb:1253-1269`. So on a passthrough instance, an unverified (indeed unowned) domain still serves branded pages once DNS points at the app. |
| G33 | An **exact canonical-host match always outranks a custom-domain registration**. If an operator later points `features.domains.default` or a `LINK_DOMAINS` entry at an already-registered custom domain, that tenant's per-domain brand/signin config silently stops applying; boot logs an error-level warning naming the host. Advisory only — never changes classification, never fails boot. | verified (STRUCTURAL) | `lib/onetime/middleware/domain_strategy.rb:315-329`; `lib/onetime/initializers/configure_domains.rb:52-73`, `:75-127` |
| G34 | Every response carries the classification: headers **`O-Domain-Strategy`** and **`O-Display-Domain`**. A useful operator debugging handle — curl a custom host and read the header. | verified (STRUCTURAL) | `lib/onetime/middleware/domain_strategy.rb:163-166` |
| G35 | An **unparseable canonical host disables the whole custom-domains feature at boot** (`@domains_enabled = false`), while an unparseable non-primary canonical host is merely skipped with an error log. Relevant to dev installs with an IP-literal or single-label `site.host`. | verified (STRUCTURAL) | `lib/onetime/middleware/domain_strategy.rb:575-584`, `:618-635` |
| G36 | A scheduled `domain_refresh` job re-runs verification for up to **200** domains every **30 minutes**, 0.5s apart. The defaults file ships it **ENABLED**. | verified — shipped default | `etc/defaults/config.defaults.yaml:1178-1185`; `lib/onetime/jobs/scheduled/domain_refresh_job.rb:23-57`. **CONTRADICTION:** the job's own docstring (`domain_refresh_job.rb:14`) says "Disabled by default", and ADR-018 repeats that. **The shipped defaults file says true.** It also only runs if the scheduler process is running. |

### G.6 Operator tooling, gates and removal

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| G37 | Operator CLI verbs: `bin/ots domains list \| info \| create \| verify \| probe \| transfer \| remove \| orphaned \| repair \| doctor \| migrate-sso`. `verify` supports `--all`, `--dry-run`, `--json` and filters; `probe` makes a real HTTPS request and classifies health (healthy / ssl_error / connection_refused / timeout / dns_error); `doctor` runs eight integrity checks with optional `--repair`. | verified (STRUCTURAL) | `lib/onetime/cli/domains_command.rb:29-40`; `apps/api/domains/cli/verify_command.rb:11-21,32-66`; `lib/onetime/operations/domains/probe.rb:37-99`; `lib/onetime/cli/domains/doctor_command.rb:5-53`. `probe` exits 0 whatever the health verdict; only failing to resolve the record exits 1. |
| G38 | The colonel (admin) API exposes a **cross-organization domain toolbox**: list, create, orphaned, verify, probe, repair, transfer, per-domain config view/upsert/delete/ensure, get, delete — all `role=colonel`. | verified (STRUCTURAL) | `apps/api/colonel/routes.txt:51-66`; `apps/api/colonel/logic/colonel/verify_custom_domain.rb:23-43` (double role enforcement, no ownership gate). The colonel verify response reports the honest post-verification state including any op error (`verify_custom_domain.rb:59-83`). |
| G39 | `features.domains.require_verified` (default **false**) makes secret creation reject an unverified custom `share_domain` with a form error. The check fires whenever a custom `share_domain` resolves to a record and is **NOT gated by `DOMAINS_ENABLED`**; canonical domains are unaffected. It tests the `verified` field only, not `ready?`. | verified — shipped default | `apps/api/v2/logic/secrets/base_secret_action.rb:641-655` (V1 twin at `apps/api/v1/logic/secrets/base_secret_action.rb:574-581`); `etc/defaults/config.defaults.yaml:772-775`; `.env.reference:914-919`; `lib/onetime/config.rb:131-137`. **On a passthrough instance this gate is near-worthless:** passthrough sets `verified=true` on the first verify call regardless of DNS. |
| G40 | Removing a domain asks the strategy to delete the vhost (a no-op for passthrough and caddy_on_demand), deletes the external sender domain, then **cascades**: seven sibling config records, all domain-scoped memberships, the org participation, the owners hashkey and the class indexes. Vhost-deletion failures are logged and swallowed; removal proceeds. | verified (STRUCTURAL) | `apps/api/domains/logic/domains/remove_domain.rb:50-94`; `lib/onetime/models/custom_domain.rb:433-490` |
| G41 | **The workspace status badge for a domain is derived from `vhost.status` in every case except one**, and `vhost.status` is only ever populated by the Approximated strategy. On a passthrough or caddy_on_demand instance **every custom domain renders as "Inactive" with a red icon** — unless a recent vhost-status fetch failure has been recorded, in which case it renders "unverified" instead. Either way the badge says nothing about whether the domain is verified or serving. | verified (STRUCTURAL) — **HAZARD** | **Corrected at 4cbd42149 — the earlier "ONLY from `vhost.status`" overstated it.** `src/shared/composables/useDomainStatus.ts:41-47` (`displayStatus`) checks **`isStale` first** at `:43`, and `isStale` (`:34-39`) reads **`vhost_fetch_failed_at`**, not `vhost.status` — true when that timestamp is inside the staleness window. Only after that do `isActive` (`:16-23`, `vhost?.status` in ACTIVE / ACTIVE_SSL / ACTIVE_SSL_PROXIED) and `isWarning` (`:25`, `=== 'DNS_INCORRECT'`) run, falling through to "inactive" at `:46`. `statusIcon` (`:49-…`) and the colour class branch on `isStale` first too. ADR-016 (accepted 2026-06-30) describes the underlying defect but is **NOT implemented** at this commit. **Do not tell a self-hoster the badge means anything.** |
| G42 | `VALKEY_DBS_CUSTOM_DOMAIN` / `REDIS_DBS_CUSTOM_DOMAIN` do **not** actually place custom-domain records in a separate logical database — the mapping is **informational** (boot banner) and all models use the database in the connection URL. | verified — shipped default | `.env.reference:168-173`. Keeps a docs page from telling operators to isolate domain data by DB number. |

**42 rows.**

### G.7 Gaps — where the evidence runs out

1. **G-g1.** Whether the hosted service runs `approximated` (and with which `proxy_ip`/`vhost_target`) **cannot be established from this repo** — no production config is tracked. The presence of Approximated code proves the capability exists, not that hosted uses it.
2. **G-g2.** **There is NO in-app DNS resolution for the ownership TXT record.** `Resolv` is used only for SENDER-domain records (DKIM/SPF/DMARC/MX) in `lib/onetime/domain_validation/sender_strategies/base_strategy.rb`, for SSRF protection, and in `safe_fetch`. No code path was found that would let a self-hoster verify ownership without Approximated.
3. **G-g3.** Could not establish **what an operator running `passthrough` is supposed to tell customers to point their A/CNAME at**. The only config keys that feed those UI fields live under `features.domains.approximated` (G18). Whether reusing them under passthrough is intended is not stated anywhere in the repo.
4. **G-g4.** What the app actually **SERVES** for a request to an unregistered host (classification `:invalid`) — the middleware sets the header and calls through, but no downstream controller was traced. **Do not claim a 404.**
5. **G-g5.** Per-domain validation strategy (ADR-015) is **accepted-but-unimplemented**: the `CustomDomain` model has no strategy field and `Strategy.for_config` reads only the install-level key. Same for ADR-018's per-domain backoff — the job is still a full sweep.
6. **G-g6.** Rate limiting / abuse controls on the verify endpoint were not examined.
7. **G-g7.** Wildcard-TLS, certificate-renewal and reverse-proxy configuration **for the passthrough path is not described anywhere in the app repo** beyond the one-line strategy docstring.
8. **G-g8.** Domain-scoped membership semantics (`can_access_domain?`, SSO-provisioned users pinned to one domain) were seen at the call sites but not traced to their implementation.
9. **G-g9.** Per-domain SSO / signin / signup / email-sender / incoming / homepage / API / brand configs are each their own subsystem under `apps/api/domains/logic/*` and were deliberately **not** researched here — they belong to other pages (§A, §B, §F, and the Configure ledger §C.2).
10. **G-g10.** Favicon auto-fetch on add and on transition-into-verified (`jobs.favicon_fetch.enabled`) was noted but its default and worker path were not verified.

### G.8 Hazards — do not write these wrong

1. **G-h1. THE BIG ONE.** On the shipped default strategy (`passthrough`) the TXT ownership record is **generated and displayed but never checked**. `validate_ownership` returns `validated: true` unconditionally, so the first verify call marks **any** domain verified and ready. **A page that describes "TXT ownership verification" as a working control on a stock self-hosted instance would be actively wrong.**
2. **G-h2.** `caddy_on_demand` is **effectively non-functional** at this commit: `check_status` returns `is_resolving: nil`, so `resolving` is never written, so `ready?` is never true, so the ACME `ask` endpoint returns 403 for every domain and Caddy never issues a certificate. **Do not present it as a supported self-hosted path without saying so.** Full treatment in §H.
3. **G-h3.** `apps/internal/acme/README.md` is stale in two ways: it documents a `check_verification=false` query parameter that was explicitly removed from the HTTP interface (`application.rb:46-49`), and it describes running the app standalone on port 12020 while noting no runner exists. **Do not copy it.**
4. **G-h4.** The workspace status badge reads only `vhost.status`, so passthrough/caddy domains **permanently display "Inactive"**. Operators will report this as a bug; the page should say what the badge does and does not mean.
5. **G-h5.** The DNS setup screen renders **blank A/CNAME target values** on a stock instance because `proxy_ip`/`proxy_host` come from the Approximated block and ship empty.
6. **G-h6.** `jobs.domain_refresh.enabled` is **`true`** in `etc/defaults/config.defaults.yaml:1179` but the job's own docstring and ADR-018 both say "disabled by default". **State the defaults-file value, not the comment.**
7. **G-h7.** `add_domain.rb:65-66` carries a stale comment claiming the entitlement check was removed, immediately below the live `require_entitlement_in!(…, 'custom_domains')` call at `:63`. **The check is real.**
8. **G-h8.** **ADRs 015–018** in `docs/architecture/decision-records` are marked `status: accepted` but **none of them is implemented at 4cbd42149**. They describe the intended future, not current behaviour — **do not mine them for claims.**
9. **G-h9.** `DOMAINS_ENABLED=false` does **not** disable the domains API, only classification and the nav item (G6). An operator who believes the flag turns the feature off entirely is wrong.
10. **G-h10.** `strict_strategy` exists **only in code** (`strategy.rb:39`) — no defaults entry, no env var. A typo in `DOMAINS_VALIDATION_STRATEGY` **silently degrades to passthrough** with only a log line.

### G.9 Hosted vs self-hosted

The repo ships no production config, so every value here sourced from
`etc/defaults/config.defaults.yaml` or `.env.reference` is the **self-hosted shipped default**: domains
off, validation strategy `passthrough`, `require_verified` false, all five `APPROXIMATED_*` settings
empty, ACME endpoint off. **The split that matters for this page is not hosted-vs-self-hosted config
values but WHICH VALIDATION STRATEGY IS IN PLAY.** Real TXT ownership verification exists in exactly
one strategy, `approximated`, which calls a third-party SaaS (cloud.approximated.app) and needs an API
key plus a vhost target the operator must obtain externally; the two strategies a self-hoster can run
with no third party — `passthrough` (the default) and `caddy_on_demand` — **both return
`validated: true` without looking at DNS.** Which strategy the hosted service runs cannot be
established from the repo, so no row asserts it; the honest operator framing is *"the ownership TXT
record is a display artefact unless you configure the Approximated strategy."* On entitlements the
governing fact applies cleanly: billing is off on a stock self-hosted instance,
`STANDALONE_ENTITLEMENTS` grants `custom_domains`, so plan tier never binds and the whole answer is
the org **ROLE** — owner or admin can manage domains, a member cannot.

---

## H. Caddy on-demand TLS — **NOT A PAGE.** Closed record of a non-functional path

> **DECISION, TAKEN AND CLOSED: there is no `features/caddy-on-demand-tls` page, and no page may be
> drawn from this section. This section is a RECORD OF A NON-FUNCTIONAL PATH, not a page spine, not an
> outline, and not a source of how-to steps. The rows below are titled "Claim a docs page may make"
> only because that is the ledger's table format; at 4cbd42149 there is no page for them to appear on.**
>
> **The blocker, verified at 4cbd42149 — a chain of four reads, not a summary.**
> 1. `lib/onetime/domain_validation/caddy_on_demand_strategy.rb:55-63` — `check_status` returns a hash
>    whose `is_resolving:` is literally `nil` at `:61` (`is_resolving: nil, # Unknown - managed by Caddy`).
> 2. `lib/onetime/operations/verify_domain.rb:316-332` — `persist_changes`, the **only** non-test writer
>    of the `resolving` field in `lib/` and `apps/`, wraps that write in `unless
>    status_result[:is_resolving].nil?` at `:323-325`. A `nil` therefore writes nothing; the field is
>    not set to false, it is left unset (`custom_domain.rb:93`, `field :resolving`, no default).
> 3. `lib/onetime/models/custom_domain.rb:656-664` — `verification_state` returns `:pending` whenever
>    `resolving.to_s != 'true'`. With `resolving` never written it can never leave `:pending`, so it can
>    never reach `:verified`, regardless of TXT ownership (which `caddy_on_demand` grants
>    unconditionally — H19).
> 4. `lib/onetime/models/custom_domain.rb:673-675` — `ready?` is exactly
>    `verification_state == :verified`, and `ready?` is the entire authorization basis of the ask
>    endpoint (`apps/internal/acme/application.rb:140-155`).
>
> **Consequence.** `GET /api/internal/acme/ask?domain=<anything>` returns **403 for every domain**, and
> Caddy never obtains a certificate. The strategy whose only purpose is to serve that endpoint cannot
> get a certificate for a single domain. A page walking an operator into enabling it would send them
> into a closed loop whose only symptom is TLS handshake failures on their customers' domains. CI does
> not catch this: the spec stubs `CustomDomain` doubles with hardcoded `ready?` (H-g6).
>
> **THE ONE CONDITION THAT WOULD MAKE THIS A PAGE AGAIN — the resolving axis must actually be written
> under this strategy.** Concretely, one of: (a) `CaddyOnDemandStrategy#check_status` returns a non-nil
> `is_resolving` (as `passthrough` and `approximated` already do — `passthrough_strategy.rb:54` returns
> `is_resolving: true`), or (b) `VerifyDomain` gains a path that sets `resolving` for this strategy
> without one, or (c) the nil-guard at `verify_domain.rb:323-325` is replaced by something that can
> resolve a `nil` to a decided value. Any of those makes `ready?` reachable, and only then can the ask
> endpoint return 200. **Until a commit does that AND a domain is observed reaching
> `verification_state == :verified` under `caddy_on_demand`, the answer stays NO.** Nothing else changes
> it — not fixing the shipped Caddyfile, not migrating `ask` to `permission http`, not documenting the
> endpoint better, not any config key an operator can set. **The blocker is one `nil` and one guard.**
>
> **Why the 30 rows are retained anyway.** They were expensive to establish, they remain individually
> correct, and they are what stops a later pass from re-deriving a page from first principles and
> getting it wrong. Their permitted use is bounded in H.7.

### H.1 RECORD — the ask endpoint contract (correct in itself, unreachable in practice)

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| H1 | The ask endpoint is **`GET /api/internal/acme/ask?domain=<fqdn>`**. The mount prefix is `/api/internal/acme` and the only route the app defines is `GET /ask`. There is no POST form and no other route. | verified (STRUCTURAL) | `apps/internal/acme/application.rb:113`; `apps/internal/acme/routes.txt:6`. **Do not assume Caddy's documented default path** — the app's path is this one, and the query parameter name is `domain`. |
| H2 | The endpoint answers with four statuses and a bare `text/plain` body: **200 `OK`** (allowed), **400** (`domain` param missing or empty), **401** (caller is not loopback), **403 `Forbidden`** (domain unknown or not verified). | verified (STRUCTURAL) | `apps/internal/acme/application.rb:36-57` (400 at `:38-44`, 200/403 at `:49-56`), `:87-90` (401 body `Unauthorized - localhost only`) |
| H3 | The authorization basis is a **single question**: is this exact display domain registered as a `CustomDomain`, and does that record report `ready?`. Nothing else is consulted — not the owner, not the plan, not the org, not DNS at request time. | verified (STRUCTURAL) | `apps/internal/acme/application.rb:140-155` (`domain_allowed?`: `load_by_display_domain` → nil ⇒ false, else `custom_domain.ready?`) |
| H4 | `ready?` is `verification_state == :verified`, which requires **all three** of: a `txt_validation_value` present, `resolving == 'true'`, and `verified == 'true'`. It is a pure in-memory field read — **no DNS lookup happens inside the ask request**. | verified (STRUCTURAL) | `lib/onetime/models/custom_domain.rb:656-664`, `:673-675` |
| H5 | **BLOCKER.** With `validation_strategy: caddy_on_demand`, the ask endpoint returns **403 for every domain** and Caddy can never obtain a certificate. `CaddyOnDemandStrategy#check_status` returns `is_resolving: nil`; the sole production writer of the `resolving` field is guarded by `unless status_result[:is_resolving].nil?`, so `resolving` is never written, stays nil, `verification_state` caps at `:pending`, and `ready?` is never true. | verified (STRUCTURAL) — **the single most important fact on the page** | `lib/onetime/domain_validation/caddy_on_demand_strategy.rb:55-63` (`is_resolving: nil` at `:61`); `lib/onetime/operations/verify_domain.rb:316-332` (nil-guard at `:323-325`, the only non-test writer of `resolving` in `lib/` and `apps/`); `lib/onetime/models/custom_domain.rb:93` (`field :resolving`, no default), `:656-664`, `:673-675`; corroborated by `docs/architecture/decision-records/adr-016-domain-validation-state-model.md:189-235`. **Re-verified at 4cbd42149, not merely inherited from the ADR.** The ADR cites `custom_domain.rb:656` / `:639-647`; at this pin the ranges are `:656-664` and `:673-675` — line drift only, semantics unchanged. `passthrough` and `approximated` are unaffected (their `check_status` returns a non-nil `is_resolving`). |
| H6 | The `check_verification=false` query parameter documented in the app's own README **does not exist**. It was deliberately removed from the HTTP interface so no local process could bypass DNS verification via a query string; `AskHandler` always calls `domain_allowed?(domain)` with the default `check_verification: true`. | verified (absence) | `apps/internal/acme/application.rb:46-49` (the comment stating the removal), `:49`; `apps/internal/acme/spec/application_spec.rb:72-77` (param present ⇒ still gated). `apps/internal/acme/README.md:24`, `:30`, `:81-89` still documents it, as does the architecture trace at `README.md:139-143`. **The README is stale; the docs page must not repeat it.** Flagged as a known doc-drift item at `adr-016:167-177`. The `check_verification:` keyword still exists on the Ruby method (`application.rb:140,146`) — reachable only in-process, never over HTTP. |
| H7 | The endpoint is protected by a `LocalhostOnly` Rack middleware that rejects any request whose `REMOTE_ADDR` is not a loopback address with **401**. A nil or unparseable address is denied. | verified (STRUCTURAL) | `apps/internal/acme/application.rb:69-94` (`IPAddr.new(remote_addr).loopback?`, rescue leaves `is_loopback` false), registered at `:119` |
| H8 | The endpoint **fails closed on error**. Any exception inside `domain_allowed?` is rescued to `false` ⇒ 403. Separately, the datastore lookup itself fails open to nil on Redis errors, which the handler then treats as 403. | verified (STRUCTURAL) | `apps/internal/acme/application.rb:152-155`; `lib/onetime/models/custom_domain.rb:688-702`. **Operationally: a datastore outage means no new certificates are issued.** Existing certs already in Caddy's storage are unaffected — Caddy only calls ask before obtaining or loading a cert on demand. |
| H9 | The response body is **boolean-only** — the literal strings `OK` and `Forbidden`. The endpoint leaks whether a given domain is registered-and-verified, but never enumerates or lists domains. | verified (STRUCTURAL) | `apps/internal/acme/application.rb:54-56`; noted at `adr-016:253-254` |
| H10 | The app preloads its models at warmup specifically so Caddy's on-demand calls never trigger lazy loading, and the lookup path is an indexed datastore read plus an in-memory boolean — **no DNS query, no outbound HTTP**. | verified (STRUCTURAL) | `apps/internal/acme/application.rb:126-130` (`warmup do require 'onetime/models' end`, rationale at `:127-128`); `lib/onetime/models/custom_domain.rb:688-702`; analysis confirmed at `adr-016:179-187` |

### H.2 RECORD — the two switches, and the port trap

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| H11 | The ask endpoint **does not exist** unless `features.domains.acme.enabled` is true. The application class declares `should_skip_loading?` on that key alone, and the registry drops skipped classes before mounting. | verified (STRUCTURAL) | `apps/internal/acme/application.rb:122-124`; `lib/onetime/application/registry.rb:143-149` |
| H12 | The shipped default for that switch is **OFF**: `features.domains.acme.enabled` is `ENV['ACME_ENDPOINT_ENABLED'] == 'true'`, i.e. false unless the operator sets it. | verified — shipped default | `etc/defaults/config.defaults.yaml:839-844`; `.env.reference:895-912` (`#ACME_ENDPOINT_ENABLED=false`, `#ACME_LISTEN_ADDRESS=127.0.0.1`, `#ACME_PORT=12020`) |
| H13 | When `enabled` is true, the ACME app mounts **INSIDE the main Rack process** and answers on the main app's own port — e.g. `http://127.0.0.1:3000/api/internal/acme/ask`. **`listen_address` and `port` are ignored in this mode**; they apply only to the standalone process. | verified (STRUCTURAL) | `etc/defaults/config.defaults.yaml:827-838` (the config comment states both halves explicitly); `apps/internal/acme/README.md:7-14`. **The trap an operator hits:** setting `ACME_PORT=12020` and pointing Caddy at 12020 while `ACME_ENDPOINT_ENABLED=true` means Caddy talks to nothing. |
| H14 | The alternative is a **standalone process**: `rackup apps/internal/acme/config.ru`, which binds `features.domains.acme.listen_address` and `.port` — shipped defaults `127.0.0.1` and `12020`. `HOST`/`PORT` env vars and rackup `-o`/`-p` override them. That rackup deliberately loads the app class directly, bypassing the registry, so **it works even with `acme.enabled` false**. | verified — shipped defaults | `apps/internal/acme/config.ru:6-19` (usage), `:30-43` (`Onetime.boot! :app`, direct require at `:32-34`, host/port resolution at `:38-39`, `run Internal::ACME::Application.new` at `:43`). 127.0.0.1 and 12020 are shipped defaults, not structural. |
| H15 | **Nothing in the repo supervises that standalone process.** There is no Procfile entry, no s6 service, no `bin/ots` subcommand, and no compose service for the ACME endpoint — an operator who chooses standalone mode must supervise it themselves. | verified (absence) | `git grep -n acme 4cbd42149 -- Procfile* docker/ bin/ lib/tasks/` returns only unrelated hits (`lib/tasks/qa_visual.rake` fixture hostnames, `lib/tasks/spec.rake:121-122`). `Procfile.production` and `docker/s6/services/{web,worker,scheduler}` contain no ACME entry. |
| H16 | The strategy key is `features.domains.validation_strategy` (env `DOMAINS_VALIDATION_STRATEGY`), shipped default **`passthrough`**. The Caddy value is `caddy_on_demand`; `caddy` is accepted as an alias. | verified — shipped default | `etc/defaults/config.defaults.yaml:812-817`; `lib/onetime/domain_validation/strategy.rb:37-50` (`when 'caddy_on_demand', 'caddy'` at `:46`); `.env.reference:885-886` |
| H17 | A typo in the strategy name does **not** fail the boot — it logs an error and **silently falls back to passthrough**. It only raises if `features.domains.strict_strategy` is true. | verified (STRUCTURAL) | `lib/onetime/domain_validation/strategy.rb:39`, `:63-73`. **`strict_strategy` has no entry in `etc/defaults/config.defaults.yaml` and no env var at this pin** — it is a YAML-only key an operator adds by hand. Verify before writing it as a supported setting. |
| H18 | **`validation_strategy: caddy_on_demand` and `acme.enabled: true` are two independent switches.** Setting the strategy does not mount the ask endpoint, and mounting the endpoint does not select the strategy. **Both are required**, and they live in different config subtrees. | verified (STRUCTURAL) | `apps/internal/acme/application.rb:122-124` (skip check reads only `features.domains.acme.enabled`) versus `lib/onetime/domain_validation/strategy.rb:46-47` (strategy selection reads only `validation_strategy`) |
| H19 | Under `caddy_on_demand` the app performs **no validation and manages no certificates itself**: `validate_ownership` returns `validated: true` unconditionally, `request_certificate` returns `status: 'delegated'`, `delete_vhost` is a no-op, the DNS-provider widget is unavailable, and `manages_certificates?` is false. | verified (STRUCTURAL) | `lib/onetime/domain_validation/caddy_on_demand_strategy.rb:29-35`, `:42-48`, `:55-63`, `:70-76`, `:82-88`, `:91-98`; DNS-widget consequence at `apps/api/domains/logic/domains/get_dns_widget_token.rb:19`. `validate_ownership` returning true unconditionally is why `verified` **can** be set under this strategy while `resolving` **cannot** — see H5. |
| H20 | Custom domains are gated by their own master switch `features.domains.enabled` (env `DOMAINS_ENABLED`), shipped default **false**. The ACME app's load check does **not** consult it — `acme.enabled` alone mounts the endpoint. | verified — shipped default | `etc/defaults/config.defaults.yaml:770-771`; `.env.reference:868`; `apps/internal/acme/application.rb:123` |
| H21 | Custom domains are **not plan-gated on a stock self-hosted instance**: `custom_domains` is a member of `STANDALONE_ENTITLEMENTS`, granted in full whenever billing is disabled — the state of a stock install. **Do not describe on-demand TLS as a paid feature.** | verified (STRUCTURAL) | `lib/onetime/models/organization/features/with_plan_entitlements.rb:52` per this subject (see row 0.2 for the line-attribution conflict) |

### H.3 RECORD — the Caddy side, worse than the app side

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| H22 | **HAZARD.** The shipped `etc/examples/Caddyfile-example` does **NOT** configure on-demand TLS. Its `on_demand_tls` block is **commented out**, and the endpoint it names is `http://localhost:3001/ask` — **wrong port and wrong path** (the real path is `/api/internal/acme/ask` on 3000 mounted, or 12020 standalone). Its `@see allowed-domains` reference points at nothing in the file. | verified — shipped example is wrong | `etc/examples/Caddyfile-example:67-70`. An operator who uncomments those three lines gets a Caddy that asks a nonexistent endpoint. **The docs page must give a corrected block, not point at the example file.** |
| H23 | **HAZARD.** The shipped Caddyfile has exactly **one** HTTPS site block, host-scoped to `{$DOMAIN}:443`, plus an HTTP redirect block. **There is no catch-all `https://` site**, so on-demand TLS would have no site to serve arbitrary customer domains from even with the ask block uncommented. The site block also forces `issuer acme { disable_http_challenge }` and `protocols tls1.3`. | verified — shipped example | `etc/examples/Caddyfile-example:379-407` (the only `:443` site), `:417-427` (the `http://` block); no other site block exists in the file. **Adopting on-demand TLS requires the operator to add a catch-all site block. Nothing in the repo shows one.** |
| H24 | **HAZARD.** Caddy has **deprecated the `ask` directive** in favour of `permission http { endpoint … }`, and the app is built entirely around `ask`: the route is literally `/ask`, the handler is `AskHandler`, and there are zero references to `permission` anywhere in `apps/internal/acme/`. The HTTP contract of the two is **identical** (single endpoint, `?domain=` appended, 200 = allowed, anything else = denied, redirects not followed), so the same endpoint serves both forms. | verified — Caddy-side deprecation **attributed to an app-repo ADR**, not to Caddy directly | `docs/architecture/decision-records/adr-016-domain-validation-state-model.md:103-165` (Caddy config-docs quotation at `:110-114`, no-migration finding at `:124-134`, both config forms at `:146-160`); the app side at `apps/internal/acme/routes.txt:6` and `application.rb:34`. **Writing the modern `permission http` form on the docs page is safe; the app needs no change for it.** |
| H25 | When the ACME app is mounted inside the main process, `/api/internal/acme/*` is **publicly routable through the reverse proxy unless explicitly blocked**. The app's own guidance is to block that path at the proxy as defence in depth, and doing so is **safe** because Caddy's on-demand ask call goes to the backend directly and bypasses the proxy's own route rules. | verified (STRUCTURAL) | `apps/internal/acme/README.md:45-57` (Caddyfile snippet `@internal_acme path /api/internal/acme/*` / `respond @internal_acme 404` at `:53-54`); same reasoning at `apps/internal/acme/application.rb:65-68` |
| H26 | There is **no application-level rate limit** on the ask endpoint. The universal middleware stack carries an IP-ban check but no rate limiter, and the shipped Caddyfile's `rate_limit` zones cover **proxied request paths only** — they do not apply to Caddy's own outbound ask call. | verified (absence) | `lib/onetime/application/middleware_stack.rb:361-511` (full `configure` mount list: AssumeHttps, IPPrivacy, IPBan, HealthAccessControl, AdminNetworkIsolation, … — no rate limiter); `etc/examples/Caddyfile-example:102-168`; `apps/internal/acme/README.md:57`. Abuse containment rests entirely on `LocalhostOnly` plus the proxy-level path block. The app's own comment calls the traffic "extremely low… only Caddy calls it" (`application.rb:108-110`). |
| H27 | `LocalhostOnly` reads `REMOTE_ADDR` **after** the universal `IPPrivacyMiddleware` has already rewritten it from forwarded headers — it does not read the raw connecting peer. | verified (STRUCTURAL) | `apps/internal/acme/application.rb:65-68`, `:115-119`; `lib/onetime/application/middleware_stack.rb:388-394`, `:209-218` (`mask_private_ips = true` set unconditionally). **Whether this is spoofable, and whether masking can break genuine loopback detection, could not be settled at this pin — see gaps H-g3/H-g4. Do not write a reassurance the code does not support.** |
| H28 | **Neither shipped compose stack, nor `.env.example`, sets any ACME or domain-strategy variable.** `ACME_ENDPOINT_ENABLED`, `ACME_LISTEN_ADDRESS`, `ACME_PORT` and `DOMAINS_VALIDATION_STRATEGY` are assigned nowhere in `docker/` or `.env.example` — on-demand TLS is entirely opt-in and entirely hand-configured. | verified (absence, narrowed) | **Corrected at 4cbd42149 — the earlier claim of a zero-hit grep was wrong.** `git grep -n -E 'ACME\|DOMAINS' 4cbd42149 -- .env.example docker/` returns **exactly one hit**: `docker/variants/caddy.dockerfile:50`, a prose comment line reading `#   * TLS/SSL certificates - Automatically obtained from Let's Encrypt or other ACME providers`. It is **not a variable assignment** and names none of the four keys. `.env.example` returns nothing. The keys exist only in `.env.reference:885-912`. **State the claim as "no compose file or `.env.example` sets these variables", not as "the string ACME does not appear".** |
| H29 | The repo's Caddy proxy image is a **custom xcaddy build pinned to Caddy v2.11.4** with a configurable `caddy-dns/*` module, and it **must be built locally** — the release workflow does not publish it. On-demand TLS itself needs no plugin; the DNS module matters only for DNS-01 challenges. | verified — shipped | `docker/variants/caddy.dockerfile:1-13`, `:61-70`. The docs/example header at `caddy.dockerfile:5-13` says v2.11.4 while `etc/examples/Caddyfile-example:10,15` still names `onetime-caddy:v2.10.2` in its own run examples — **a stale tag in the example file.** |
| H30 | **Caddy's certificate store must be persisted.** The repo's own guidance: without a persistent `/data`, Caddy re-requests certificates on every container restart and hits Let's Encrypt rate limits (the file cites roughly 5 certificates per domain per week). | verified — shipped guidance | `docker/variants/caddy.dockerfile:49-58`; the `-v onetime_caddy_data:/data` mount at `:25`; `storage file_system { root /data/caddy }` at `etc/examples/Caddyfile-example:31-34`. **Matters far more under on-demand TLS than under a fixed site list, because the certificate set is unbounded.** |

**30 rows.**

### H.4 Gaps — where the evidence runs out

1. **H-g1.** **What Caddy does when the ask endpoint is UNREACHABLE** (connection refused, timeout, TLS error) is not established anywhere in the app at 4cbd42149. The only contract statement in the repo is `adr-016:140-142`, quoting Caddy's config-docs for the `permission http` module: single endpoint URL, `?domain=` appended, 200 OK = allowed, anything else = denied, redirects not followed. That says nothing about transport failure or timeouts. **The writing pass must not state a failure mode for an unreachable endpoint.**
2. **H-g2.** **No `on_demand_tls` rate limiting** (`interval` / `burst`) is configured, documented, or referenced anywhere in the repo at this pin. The abuse surface that Caddy's own on-demand rate limits exist to cover is simply not addressed by the app.
3. **H-g3.** Whether `IPPrivacyMiddleware`'s masking preserves loopback-detectability of `REMOTE_ADDR` **could not be established**. otto 2.8.0 (`Gemfile.lock:278`) is an external gem, not vendored, so the masking implementation is unreadable at the pin. **The app's own comments contradict each other:** `middleware_stack.rb:378-379` says "Private/localhost IPs are automatically exempted for development", while `:212-218` sets `mask_private_ips = true` unconditionally and explains that masking must hold for direct-connect deployments. If loopback is masked to a non-loopback string, `LocalhostOnly` would 401 genuine local Caddy calls. **Unresolved.**
4. **H-g4.** Whether a **spoofed `X-Forwarded-For: 127.0.0.1`** from an untrusted peer can satisfy `LocalhostOnly` is unresolved. `adr-016:237-254` records this explicitly as an enumeration lead, **not an asserted vulnerability**, and states the trust boundary of `IPPrivacyMiddleware` was never traced end-to-end against the trusted-proxy model. The resolution lives in the otto gem.
5. **H-g5.** There is **no documented or discoverable procedure** by which a domain reaches `verification_state == :verified` under `caddy_on_demand`, because the `resolving` axis is never written under that strategy. **So the page cannot tell an operator how to make the ask endpoint return 200.**
6. **H-g6.** The `caddy_on_demand` path has **no end-to-end test**. `apps/internal/acme/spec/application_spec.rb:16-18` stubs `MiddlewareStack.configure` entirely (so `LocalhostOnly`'s real interaction with `IPPrivacy` is never exercised) and `:29-40` uses `CustomDomain` doubles with hardcoded `ready?: true/false` (so the strategy → `check_status` → `persist_changes` → `resolving` path is never exercised). **CI is green on a strategy that returns 403 for everything.**
7. **H-g7.** `features.domains.strict_strategy` (`strategy.rb:39`) has no entry in `etc/defaults/config.defaults.yaml` and no env var at this pin. Whether it is a supported operator setting or an internal/test-only key was not established.
8. **H-g8.** What the hosted service actually runs is not determinable from the repo. No row asserts the hosted strategy.
9. **H-g9.** Caddy's `ask`-vs-`permission` deprecation state is sourced from an ADR (`adr-016:103-165`) quoting Caddy's live config-docs API **as of 2026-06-30**, not from Caddy directly. Whether `ask` still parses in the Caddy version an operator installs today was not independently checked.

### H.5 Hazards — do not write these wrong

1. **H-h1.** **The feature does not work end-to-end at 4cbd42149** (H5), which is why there is no page. State it plainly wherever it is mentioned at all, not softened. See the callout at the head of §H. The hazards below now apply to the **one paragraph `features/custom-domains` owes this subject**, and to the "Do not claim" list — not to a walkthrough, because there is no walkthrough to write.
2. **H-h2.** The shipped `etc/examples/Caddyfile-example` is **actively misleading** on this feature: the `on_demand_tls` block is commented out AND names the wrong port and wrong path (`http://localhost:3001/ask` at `:67-70`). **Do not cite the example file as the configuration to copy. Give the corrected block inline.**
3. **H-h3.** The app's own `apps/internal/acme/README.md` is stale in two places and **must not be used as a source**: the removed `check_verification=false` parameter (`README.md:24,30,81-89` vs `application.rb:46-49`), and its Architecture trace at `:139-143` still showing that parameter in the decision path. **A writer skimming that README will produce a wrong page.**
4. **H-h4.** Two independent switches are easy to conflate (H18). `validation_strategy: caddy_on_demand` does not mount the endpoint; `acme.enabled: true` does not select the strategy. Both are required, and they live in different config subtrees.
5. **H-h5.** **The port question is a live trap.** With `acme.enabled: true` the endpoint answers on the **MAIN app port (3000)**, not on `acme.port`. Every ask-URL example in the repo that names 12020 (`application.rb:16`, `README.md:77,85`, `adr-016:148,157`) is the **standalone** case.
6. **H-h6.** Do not write `ask` as the modern Caddy form without noting it is **deprecated in favour of `permission http { endpoint … }`**. The app supports both unchanged because the HTTP contract is identical; **the docs page should lead with `permission`.**
7. **H-h7.** **Do not assert that `LocalhostOnly` makes the endpoint safe to expose.** The app's dependence on a rewritten `REMOTE_ADDR` is unverified in both directions (spoofability, and masking breaking genuine loopback). The defensible statement is the app's own: block `/api/internal/acme/*` at the proxy as defence in depth.
8. **H-h8.** Do not describe custom domains or on-demand TLS as plan-gated (H21).

### H.6 Hosted vs self-hosted

Everything in this section is operator-facing and self-hosted; **there is no hosted-only row.** The split
that matters is shipped-default versus structural. The three settings an operator touches —
`features.domains.enabled` (`DOMAINS_ENABLED`, default false), `features.domains.validation_strategy`
(`DOMAINS_VALIDATION_STRATEGY`, default `passthrough`), and `features.domains.acme.enabled`
(`ACME_ENDPOINT_ENABLED`, default false) — are all shipped defaults, and all three are OFF/not-Caddy
out of the box. **So on a stock self-hosted install this feature is entirely inert:** the endpoint is
not mounted, and the passthrough strategy is in effect. Neither shipped compose stack nor
`.env.example` wires any ACME variable, so nothing in the supported deployment paths turns it on. The
standalone bind address and port (127.0.0.1:12020) are likewise shipped defaults, not fixed facts. By
contrast the endpoint path, its four status codes, the localhost gate, the fail-closed behaviour, the
`ready?` predicate, and the `caddy_on_demand` 403 blocker are all **structural** — no config key
changes them. What the hosted service runs cannot be determined from this repo. Plan gating is not a
factor either way.

### H.7 The only permitted use of this section

**This section produces no page and no page section. Its rows may be used for exactly three things:**

1. **The one honest paragraph `features/custom-domains` owes this subject** — that `caddy_on_demand`
   exists as a `validation_strategy` value, that it is not the shipped default (`passthrough` is,
   H16), and that it does not work end-to-end at this commit (H5). No configuration steps, no
   Caddyfile block, no ask-endpoint URL.
2. **The "Do not claim" list**, which draws on H5, H6, H21, H22 and H23.
3. **Answering questions** put to a later agent, with the pinned evidence attached.

**It may NOT be used for:** an install or self-hosting page section, a how-to, a troubleshooting entry,
a config-reference row for `ACME_ENDPOINT_ENABLED` / `ACME_PORT` / `ACME_LISTEN_ADDRESS`, a Caddyfile
snippet, or any sentence that implies an operator can turn this on and have it work. **If a writing
pass finds itself drafting steps from §H, it has misread the section — stop and re-read the head.**

---

## J. features/regions-and-federation *(renamed from `features/multi-region`)*

**Feature reality: FULLY — and the earlier pass's conclusion was wrong.** An earlier research pass went
looking for cross-region machinery, found almost none, and proposed folding the page. **Do not fold it.**
Multi-region is a real operating practice: deployments are **siloed**, and data is kept separate for
compliance and data sovereignty. **Nothing replicates BY DESIGN, and saying so is the page's entire job** —
the absence of machinery is the evidence for the page, not against it.

**Rename rationale.** `features/multi-region` was never wrong about scope; it was wrong about *promise*. The
name invites the reader to expect replication, failover and request routing, all three of which are absent
by design. `regions-and-federation` names the two halves the evidence supports, uses the app's own
vocabulary for both (`docs/architecture/terminology.md:16-18` defines "region/jurisdiction" and reserves
"federation" for exactly the cross-region billing linkage documented here), and answers the two questions
that bring people to the page before they open it: *does my data move between regions* (no — the regions
half) and *what happens when one person signs up in two of them* (nothing, except billing — the federation
half). Structure the page in that order: the model, the siloing table, the link menu, then federation as a
clearly-labelled billing-enabled appendix.

**The governing fact still governs.** On a stock self-hosted instance billing is off, `STANDALONE_ENTITLEMENTS`
grants the full set, limits return infinity, and role is the whole answer. The `/account/region/*` pages are
**role**-gated (owner-or-admin), never plan-gated. Federation is inert on a stock install because billing is
off — not because a plan withholds it. All app evidence below is pinned at **4cbd42149**.

### J.1 The model — what a region is

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| J1 | A **region** is one datastore-scoped operating unit: the web workers and background workers sharing one Valkey/Redis and one authdb. Region, environment, deployment and jurisdiction are the same thing viewed from different angles, and **a self-hoster's install is its own single region**. It is the decryption-coupling boundary — "a secret encrypted in Region A never needs decrypting in Region B". | verified — STRUCTURAL | `docs/architecture/terminology.md:17` (region/environment), `:18` (deployment/jurisdiction, incl. "A self-hoster's deployment is its own single region"), `:16` (federation defined as the cross-region layer **only**). **This is the app's own authority and is unusually explicit about the self-hoster case — use it for the page's model section.** |
| J2 | Three environment variables control the entire user-visible feature: `REGIONS_ENABLED` (ships **false**), `JURISDICTION` (ships **empty** — this install's own identifier), `JURISDICTIONS` (ships **empty** — the `ID:domain` list of every region in the group). YAML paths `features.regions.enabled` / `.current_jurisdiction` / `.jurisdictions`. All three must be set for anything to render. | verified — shipped default (self-hosted) | `etc/defaults/config.defaults.yaml:703-717` (`enabled` at `:704`, `current_jurisdiction` at `:705`, `jurisdictions` at `:717`); `.env.reference:927-930` |
| J3 | `JURISDICTIONS` is parsed at boot from `ID:domain,ID:domain,…`. A malformed entry (missing identifier or missing domain) raises `OT::ConfigError` and **the app refuses to boot**. The per-entry split is `split(':', 2)`, so a colon in the domain (a port) lands in the domain half rather than erroring. | verified — STRUCTURAL | `lib/onetime/config.rb:446-464` — **line numbers corrected at 4cbd42149**: entries split at `:448`, per-entry `entry.split(':', 2)` at **`:450`** (not `:451`), raise at `:451-453`, emitted hash literal at **`:455-459`** (not `:456-460`, `display_name_i18n_key` at `:458`), empty/nil → `[]` at `:461-464`. **This is the only boot-fatal failure mode in the whole feature. Everything else fails silently.** |
| J4 | The older YAML array form `features.regions.jurisdictions: [ {identifier:, domain:, …} ]` still parses but is **formally deprecated** in favour of `JURISDICTIONS`, and boot emits a deprecation notice. Do not show the array form as the recommended way. | verified — STRUCTURAL | `lib/onetime/config.rb:244-252` (trigger `value.is_a?(Array)` at `:248`, message at `:249-251`); parse-order comment at `:440-445` |
| J5 | A legacy `site.regions` config path is **ignored outright** — only `features.regions` is read, and boot says so verbatim: *"site.regions is ignored. This config moved to features.regions; only the new path is read."* | verified — STRUCTURAL | `lib/onetime/config.rb:236-243` |

### J.2 The siloing — what does not cross, and why that is the point

> **The spine of the page.** The siloing is not a policy layered on top of a distributed system. It is the
> absence of any distribution at all. **No server-side code path anywhere reads, resolves or contacts a
> sibling region's domain.**

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| J6 | **THE LOAD-BEARING ABSENCE.** There is no middleware, no route, no HTTP client, no API endpoint and no CLI command that talks to another region. An exhaustive grep for `jurisdictions` across `lib` and `apps` at the pin returns only the boot parser, the bootstrap serializer, the boot banner, the config wizard, and one unrelated tax comment. | verified — **absence** — STRUCTURAL | `git grep -n jurisdictions 4cbd42149 -- lib apps` → `lib/onetime/config.rb:245,250,443-463,586-591`; `apps/web/core/views/serializers/config_serializer.rb:56,551-575`; `lib/onetime/initializers/print_log_banner.rb:166-181`; `lib/onetime/config_generator.rb:95`; `apps/web/billing/controllers/plans.rb:180` (a Stripe-tax comment, unrelated) |
| J7 | **ACCOUNTS DO NOT CROSS.** Customer email uniqueness is a Familia `unique_index` **inside the region's own datastore**. The same email address can hold entirely unrelated accounts in every region simultaneously; nothing detects the duplication, nothing links them, and no password, MFA enrolment or profile field is shared. | verified — STRUCTURAL | `lib/onetime/models/customer.rb:144` (`identifier_field :objid`), `:152` (`unique_index :email, :email_index`), `:155` (same index scoped within `Onetime::Organization`) |
| J8 | **ORGANIZATIONS DO NOT CROSS.** Organization identity and `contact_email` uniqueness are likewise per-datastore indexes. One person signing up in two regions gets two unrelated default organizations with two different `objid`s and two different `extid`s. | verified — STRUCTURAL | `lib/onetime/models/organization.rb:60` (`identifier_field :objid`), `:63` (`unique_index :contact_email, :contact_email_index`) |
| J9 | **CUSTOM DOMAINS DO NOT CROSS, and the uniqueness guard does not either.** `unique_index :display_domain` is scoped to one datastore, so the same custom domain can be claimed in two regions independently and neither install knows about the other. Which region actually serves that hostname is decided by **DNS, outside the app**. | verified — STRUCTURAL | `lib/onetime/models/custom_domain.rb:79` (`identifier_field :domainid`), `:130` (`unique_index :display_domain, :display_domain_index`, with the comment "Domain can only exist once" — true **within one region only**) |
| J10 | **SECRETS DO NOT CROSS, and cannot.** The region is the decryption-coupling boundary; encryption keys are per-install, so a secret encrypted in one region is never decryptable by another. | verified — STRUCTURAL | `docs/architecture/terminology.md:17`; corroborated by J6 and by `docs/architecture/regions.md:84` ("Secrets and account data do not sync between regions; each is an independent deployment") |
| J11 | **SESSIONS DO NOT CROSS.** Switching region is a full cross-origin navigation — `window.location.href = "https://{domain}/"` — with no session transfer, no token handoff and no SPA route change. The user lands **logged out** on a different install and must authenticate there. The scheme is hardcoded `https`, so a sibling served over plain HTTP produces a broken link. | verified — STRUCTURAL | `src/shared/components/ui/JurisdictionToggle.vue:72-75` (`navigateToJurisdiction`) |
| J12 | The app already tells users, in shipped locale copy, what the siloing means — align the page with these strings rather than inventing phrasing: *"Each region operates as a completely independent environment with its own infrastructure, encryption keys, and data storage"*; *"Switching to a different region creates a new account. Your data stays in your original region."*; *"You can create accounts in multiple regions, but no data is shared between them."* | verified — shipped default (self-hosted) | `locales/content/en/feature-regions.json`, keys `web.regions.separate_environments_explanation`, `web.regions.switching_creates_new_account`, `web.regions.each_jurisdiction_maintains_separate_legal_compl` (rendered on `/account/region/why` and `/account/region/available`) |
| J13 | **BILLING RECORDS ARE THE ONLY THING THAT CROSSES**, and they cross **through Stripe** rather than between the installs. A subscription webhook delivered to one region can write `subscription_status`, `planid` and `subscription_period_end` onto an organization in a **different** region that shares the same billing email. Nothing else in the system does this. | verified — HOSTED-ONLY (billing-enabled) | `apps/web/billing/operations/webhook_handlers/subscription_federation.rb:212-246` (`process_with_federation`), `:122-141` (`update_federated_org`). Inert on a stock self-hosted install because billing is off (governing fact) **and** because `FEDERATION_SECRET` gates it (J16). |

### J.3 `FEDERATION_SECRET` — the federation on/off switch

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| J14 | `FEDERATION_SECRET` is an HMAC-SHA256 key applied to the **normalized** billing email (strip → Unicode NFC → case-fold downcase), truncated to the first **32 hex characters (128 bits)**. Same email plus same secret yields the same hash in every region — that is how siblings recognise one person **without ever exchanging an email address**. | verified — STRUCTURAL | `lib/onetime/utils/email_hash.rb:29` (`HASH_LENGTH = 32`), `:46-54` (`compute`), `:95-96` (`normalize_email`, NFC + `:fold`), with the in-file warning at `:86-92` that this is a deliberate parallel copy of `OT::Utils.normalize_email` kept in sync by hand |
| J15 | The secret is read from **`ENV['FEDERATION_SECRET']` first**, falling back to config path `site.federation_secret`; when neither is set, `EmailHash.compute` raises `Onetime::Problem('FEDERATION_SECRET not configured')`. **There is no shipped `site.federation_secret` key** — it appears in no defaults file and no config schema. **Document the env var only.** | verified — STRUCTURAL | `lib/onetime/utils/email_hash.rb:107-120` (ENV at `:109`, config fallback at `:113`, raise at `:117`); absence confirmed by `git grep -n federation_secret 4cbd42149 -- etc src/schemas` returning nothing |
| J16 | **`FEDERATION_SECRET` is the federation on/off switch — not merely "required for multi-region".** Four subscription webhook handlers each define `federation_enabled?` as literally *"is `FEDERATION_SECRET` (or `site.federation_secret`) non-empty"*, and when it is empty they fall back to single-org processing by `stripe_customer_id` only. | verified — STRUCTURAL | `apps/web/billing/operations/webhook_handlers/subscription_updated.rb:32-36` (the gate) and `:121-131` (`federation_enabled?`); identical pairs in `subscription_deleted.rb:32-36`,`:86-95`, `subscription_paused.rb:32-36`,`:86-95`, `subscription_resumed.rb:32-36`,`:79-88`. **Reconcile install-ledger row 24, which frames this as "multi-region only" — the variable changes single-region webhook behaviour too.** |
| J17 | **What must be identical:** `FEDERATION_SECRET`, byte for byte, on every region in the group. **What must not be:** it is not derived from `SECRET` and shares no lifecycle with it; `SECRET`, `SESSION_SECRET`, `AUTH_SECRET`, `ARGON2_SECRET`, `ACCOUNT_ID_SECRET` and `IDENTIFIER_SECRET` are per-instance and must **not** be copied between regions. | verified — STRUCTURAL | `.env.reference:56-59` ("Cross-region subscription federation. Must be identical across all regions in a multi-region deploy."); `docs/architecture/decision-records/adr-008-secret-management-architecture.md:21`, `:36`, `:43-53` (the three lifecycle categories: derived / independent per-instance / shared per-federation-group) |
| J18 | **What breaks without it — three failure modes, none fatal, all quiet:** (a) every default-workspace creation attempts an email hash, fails, and logs `[create-default-workspace] Failed to compute email_hash (federation disabled?)`; (b) checkout completion cannot stamp the Stripe customer and logs `Failed to set email_hash in Stripe metadata` without failing the checkout; (c) subscription webhooks skip the federation path entirely. **Nothing a single-region operator needs to fix.** | verified — STRUCTURAL | `apps/web/auth/operations/create_default_workspace.rb:270-278` (rescue + the exact log line); `apps/web/billing/operations/webhook_handlers/checkout_completed.rb:280-288` (rescue `Stripe::StripeError, Onetime::Problem` → error log → nil); `subscription_updated.rb:32-36`. **Name log line (a) verbatim on the page so nobody files a bug about it.** |
| J19 | **`rake ots:secrets` DOES generate `FEDERATION_SECRET`** when it is absent or `CHANGEME` — a five-word passforge passphrase — and preserves any existing non-`CHANGEME` value. **Two shipped documents say the opposite; the code is authoritative.** | verified — STRUCTURAL | `lib/tasks/init.rake:167-175` (generation; `PassForge::Passphrase.generate(words: 5, …)` at `:174`), `:218-220` (summary line `FEDERATION_SECRET  5-word passphrase`). **CONTRADICTED BY** `adr-008-secret-management-architecture.md:53` ("init.rake validates presence but does not generate it") and `.env.reference:58` ("Not auto-generated — set manually and share across instances"). |
| J20 | **The single most useful operational sentence on the page:** a single-region operator who ran the standard `rake ots:secrets` **already has** a `FEDERATION_SECRET`, so if they later enable billing, **federation is ON**. Every subscription webhook then computes email hashes, matches non-owner organizations by hash, and can store `PendingFederatedSubscription` records — with no multi-region deployment anywhere in sight. | verified — STRUCTURAL | `lib/tasks/init.rake:167-175` + `subscription_updated.rb:121-131` + `subscription_federation.rb:212-246` |
| J21 | A locally generated secret is **useless for federation unless copied to every sibling region**. Two regions with different secrets produce different hashes for the same email and never match; the failure is **completely silent** — no error, no warning, federation simply never fires. | verified — STRUCTURAL | `lib/onetime/utils/email_hash.rb:46-54` (the hash is a pure function of secret + normalized email); no cross-region secret comparison exists anywhere (**absence**) |
| J22 | **Rotating `FEDERATION_SECRET` orphans every hash already written.** The `email_hash` in Stripe customer metadata is set once and deliberately never overwritten, so after rotation the locally recomputed hash no longer matches the stored one and federated matching **silently stops** for those customers. The code detects the divergence only as a log warning. | verified — STRUCTURAL | `apps/web/billing/operations/webhook_handlers/checkout_completed.rb:216-240` (immutability guard: an existing `email_hash` is returned unchanged), `:283-295` (`warn_if_email_hash_divergence`, log text "Email hash divergence: Stripe customer and org hashes differ (federation will not match)") |
| J23 | Organizations created **before** `FEDERATION_SECRET` was configured have no `email_hash` and will not federate until backfilled. Two CLI migrations exist: one for local organizations, one for Stripe customer metadata. | verified — STRUCTURAL | `lib/onetime/cli/migrations/backfill_email_hash_command.rb:74-78`, `:220-226`; `lib/onetime/cli/migrations/backfill_stripe_email_hash_command.rb:88-92`, `:276-282` |

### J.4 Cross-region billing — one email, two regions

> **Lead the billing section with J25.** This is the sentence a support engineer needs to answer the call.

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| J24 | **The mechanism, in one paragraph.** When a subscription webhook arrives, the handler retrieves the Stripe customer and takes `email_hash` from its metadata (falling back to computing it from the customer's current email). **Path 1** matches the **owner** organization by `stripe_customer_id`. **Path 2** matches **federated** organizations by `email_hash` — **in the local region's datastore only**. Every matched org gets the subscription's status and plan. If neither path matches, the state is parked as a `PendingFederatedSubscription` keyed by the hash. | verified — HOSTED-ONLY (billing-enabled) | `apps/web/billing/operations/webhook_handlers/subscription_federation.rb:212-246` (`process_with_federation`: hash resolution at `:218-219`, owner path at `:224-228`, federated path at `:231-235`, pending store at `:237-241`, return codes `:243-246`) |
| J25 | **ONE EMAIL, TWO REGIONS — the concrete answer.** The two accounts stay entirely separate: separate customers, separate organizations, separate encryption, separate sessions. What crosses is the paid subscription's **benefit** — the region where the customer did **not** pay gets `subscription_status`, `planid` and `subscription_period_end` applied to its organization, and entitlements materialized from that plan. It does **not** get `stripe_customer_id` or `stripe_subscription_id`; the absence of those is precisely what marks an org as **federated** rather than **owning**. | verified — HOSTED-ONLY (billing-enabled) | `subscription_federation.rb:108-110` (the "Federated orgs do NOT get stripe_customer_id or stripe_subscription_id" contract, in-code), `:122-141` (`update_federated_org`); `lib/onetime/models/organization/features/with_organization_billing.rb:228-236` (`subscription_owner?`), `:244-250` (`subscription_federated?`) |
| J26 | **Federation only ever flows to non-owners, and it can fan out.** `find_federated_by_email_hash` filters out any organization that has its own `stripe_customer_id`, so a customer who bought separately in each region has two owner orgs and neither federates onto the other. But it returns **every** non-owner org in the local datastore matching the hash — a user with several organizations sharing a billing email gets the benefit applied to **all of them at once**. | verified — STRUCTURAL | `with_organization_billing.rb:75` (`multi_index :email_hash, :email_hash_index`), `:92-100` (`find_federated_by_email_hash` → `find_all_by_email_hash` then `select { |org| org.stripe_customer_id.to_s.empty? }`) |
| J27 | **The Stripe customer record is where the cross-region link physically lives.** At `checkout.session.completed` the handler writes three metadata keys onto the Stripe customer — `email_hash`, `email_hash_created_at`, and `region` (from `Billing::Metadata.current_region`) — and **refuses to overwrite an existing `email_hash`**. That immutability is the stated defence against email-swap attacks (change your Stripe email to a victim's and inherit their federation). | verified — HOSTED-ONLY (billing-enabled) | `apps/web/billing/operations/webhook_handlers/checkout_completed.rb:204-214` (the CRITICAL/immutability comment), `:216-240` (retrieve, existing-hash short-circuit, compute), `:246-256` (merged metadata write incl. `region` at `:253`) |
| J28 | **All federating regions must share one Stripe account.** The entire mechanism is Stripe-customer-metadata mediated; there is no region-to-region channel of any kind. A self-hoster with billing off — or with a separate Stripe account per region — has nothing to federate. | verified — HOSTED-ONLY (billing-enabled) | `subscription_federation.rb:84-91` (`get_stripe_email_hash` reads Stripe customer metadata), `:257-266` (`Stripe::Customer.retrieve` is the only cross-region data source); plus J6 |
| J29 | **`PendingFederatedSubscription`:** when a webhook fires and **no** organization in this region matches, the subscription **state** (status, planid, period end, source region, receipt time) is stored keyed by `email_hash` with a **90-day TTL**. It holds **no PII** — no email, no name, no Stripe customer id — and re-storing the same hash overwrites rather than accumulating. | verified — HOSTED-ONLY (billing-enabled) | `apps/web/billing/models/pending_federated_subscription.rb:42` (`prefix :pending_fed_sub`), `:45` (`default_expiration 90.days`), `:48` (`identifier_field :email_hash`), `:55-68` (stored fields), `:97-107` (`store_from_webhook`); called from `subscription_federation.rb:279-288` |
| J30 | The pending record is **claimed at account creation in the other region**: the new org's `email_hash` is computed, a matching pending record is found, its status/plan/period-end are copied onto the org, entitlements are materialized, the org is marked federated, and the pending record is destroyed. If the claim fails for any reason it is logged and **account creation still succeeds**. | verified — HOSTED-ONLY (billing-enabled) | `apps/web/auth/operations/create_default_workspace.rb:255-370` (`apply_pending_federation!` `def` at `:255`; `org.compute_email_hash!` at `:272` inside the `begin` at `:271`, lookup at `:293-295`, benefits applied at `:336-339`, entitlement materialization at `:344-349`, destroy at `:362`, blanket `rescue StandardError` at `:365-369`); invoked at `:129` and `:178` |
| J31 | **The claim is gated on email verification.** On a verify-enabled deployment the claim is deferred until `after_verify_account`. On a **verify-disabled** deployment it proceeds immediately and emits a deliberate audit line: `[create-default-workspace] SECURITY: federated subscription claimed WITHOUT email verification`. Operators running with verification off should know this line exists and what it means. | verified — STRUCTURAL | `apps/web/auth/operations/create_default_workspace.rb:255-265` (the deferral gate), `:216` (`unverified_immediate_claim?`), `:316-334` (the audit branch and its verbatim reason string) |
| J32 | A pending record whose `planid` could not be resolved is deliberately **left unclaimed** rather than applied — claiming it would mark the org federated and show a "subscription synced" notification for a sync that delivered nothing. The next subscription webhook re-syncs the org directly instead. | verified — HOSTED-ONLY (billing-enabled) | `apps/web/auth/operations/create_default_workspace.rb:304-314` (the guard and its log line `[create-default-workspace] Pending federated subscription has no planid; leaving unclaimed`); `pending_federated_subscription.rb:120-145` (`extract_plan_id`: metadata-first, because cross-region price IDs are not in the local catalog by design) |
| J33 | Federation writes an **audit trail back into Stripe**: on every federation event the handler merges `last_federation_region` / `_org` / `_plan` / `_type` / `_at` into the Stripe customer's metadata, so support can read the cross-region history off the customer record in the Stripe dashboard. Failure to write the note never fails the federation. | verified — HOSTED-ONLY (billing-enabled) | `subscription_federation.rb:170-199` (`record_federation_note` `def` at `:170`; note hash built at `:179-185`, `Stripe::Customer.update` at `:189`, `rescue Stripe::StripeError` clause header at `:194`, its body `:196-198`) |
| J34 | The user-visible outcome of federation is a **one-time, dismissible notification** on the receiving organization. It shows while `subscription_federated_at` is set and `federation_notification_dismissed_at` is not. | verified — HOSTED-ONLY (billing-enabled) | `with_organization_billing.rb:252-262` (`mark_subscription_federated!`), `:274-282` (`show_federation_notification?`), `:286-292` (`dismiss_federation_notification!`) |

### J.5 "What region am I?" has four different answers

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| J35 | **Four code paths answer "what region is this deployment" and they do not agree.** `Billing::Metadata.current_region` returns `'global'` when regions are disabled, the jurisdiction when enabled, and **raises** `Onetime::ConfigError` when enabled-but-blank. `BillingConfig#region` returns `nil` or an upcased string from the billing file. `CreateCheckoutLink.detect_region` returns `'LL'`. `Plans#detect_region` returns a hardcoded `'EU'`. | verified — STRUCTURAL | `apps/web/billing/metadata.rb:135-156`; `lib/onetime/billing_config.rb:269-284`; `apps/web/billing/operations/create_checkout_link.rb:189-191` and `apps/web/billing/controllers/base.rb:23`; `apps/web/billing/controllers/plans.rb:349-358`. **Do not let the page imply there is one region value.** |
| J36 | `Plans#detect_region` is an **unfinished stub**: it ignores all configuration and returns the string `'EU'` with the comment "For Phase 1, default to EU". Its value **reaches Stripe** — written into the checkout session's subscription metadata as `checkout_region`, and into two log lines. | verified — STRUCTURAL | `apps/web/billing/controllers/plans.rb:349-358` (the stub), `:46` (call site), `:202-212` (`debug_info` JSON incl. `checkout_region` at `:207`), `:226-232` (log). So checkout via `/billing/plans/:product/:interval` stamps `checkout_region='EU'` **on a US deployment**, while the sibling path `CreateCheckoutLink` stamps `current_jurisdiction \|\| 'LL'`. The comment at `create_checkout_link.rb:168-170` claiming the two surfaces cannot "diverge by surface" covers **tax policy only**; region diverges. |
| J37 | **There are two settings called "region", wired to different files**, and the shipped example wires both to the same `JURISDICTION` env var, which makes them look like one setting. `features.regions.current_jurisdiction` (config.yaml) drives the UI, the Sentry tag and `Billing::Metadata.current_region`. The **top-level `region` in the billing catalog** drives which Stripe products get imported into the plan cache. **Keep them in separate sections.** | verified — OPERATOR-SUPPLIED (catalog side) | `lib/onetime/billing_config.rb:269-284` (`BillingConfig#region`); `etc/defaults/config.defaults.yaml:705` (`current_jurisdiction`); billing catalog key path `region` (rendered from `ENV['JURISDICTION']`), catalog sha256 `69a96394920fd1777cf23a9bdedee174648f46b54e13c99a1f27b3cdc0a17501`. **This is the single most likely error on the page.** |
| J38 | Billing region matching is **fail-closed**, and there is deliberately **no "global" region**. With a deployment region configured, a Stripe product or catalog plan carrying **no** region is **rejected**; with no deployment region configured, everything passes through. Normalization is strip + upcase; blank/whitespace counts as unconfigured. | verified — STRUCTURAL | `apps/web/billing/region_normalizer.rb:14-24` (the "No global Region" design note), `:51-57` (`normalize`), `:76-84` (`match?`) |
| J39 | Region filtering applies **asymmetrically** to catalog plans: a **priced** plan whose region does not match the deployment is skipped outright, while a **price-less (free-tier)** plan that omits `region` **inherits** the deployment region. So a free tier with no region still loads; a paid plan with no region does not. | verified — STRUCTURAL | `apps/web/billing/operations/catalog/config_loader.rb:66-76` (config-only plans: `normalize(plan_def['region']) \|\| configured_region`), `:119-130` (priced plans: no fallback), `:289` (persistence fallback to `OT.billing_config.region`) |
| J40 | **The boot banner is the operator's verification step, and it prints region state twice in two different sections.** The features section prints `Regions: disabled` / `enabled (EU, US, …)` plus a Current row / `enabled (no jurisdictions)`. The billing section separately prints `Region Isolation: enabled (jurisdiction=X)` or `disabled (all jurisdictions synced)`. **Restart and read both.** | verified — STRUCTURAL | `lib/onetime/initializers/print_log_banner.rb:165-180` (features rows); `:295-301` (Region Isolation row, driven by `BillingConfig#region`, **not** by `current_jurisdiction`) |
| J41 | When diagnostics are enabled, the current jurisdiction is attached to every error as a lowercased `jurisdiction` tag, on both server and browser, and omitted when blank. This is how a fleet operator separates one region's errors from another's. | verified — STRUCTURAL | `lib/onetime/initializers/setup_diagnostics.rb:153-165` (server); `src/plugins/core/enableDiagnostics.ts:443-447`, `src/plugins/core/globalErrorBoundary.ts:83-85`, `src/shared/composables/useAsyncHandler.ts:157` (browser). Diagnostics ship **disabled**; this applies only when Sentry is configured. |

### J.6 The billing catalog's region keys — operator-supplied, and two of its comments are wrong

*The catalog is gitignored in the docs repo (`.gitignore:28`) and tracked in neither repo. All rows below
are asserted against the docs-repo copy, sha256 `69a96394920fd1777cf23a9bdedee174648f46b54e13c99a1f27b3cdc0a17501`,
cited by **key path only**. See gap J-g1 on the divergent second copy.*

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| J42 | The catalog carries a top-level `region` key whose own comment states its purpose exactly: **only Stripe products whose `region` metadata matches are imported**, so that (for example) NZ and CA deployments sharing one Stripe account do not overwrite each other's plans in Redis — the "last writer wins" collision. **This is the reason regional catalog isolation exists.** | verified — OPERATOR-SUPPLIED | Catalog key path `region` and the comment block immediately above it (sha256 `69a9…7501`); matched in-repo by the tracked `etc/examples/billing.example.yaml:65-73` (the same region comment, verbatim) and `:78` (the `region` key) |
| J43 | The catalog's own comment on `match_fields` — *"Reserved for future composite-key matching. Not read at runtime"* — is **half wrong**. True of the request path; but `bin/ots billing catalog push` **reads it** and builds composite match keys from it. `bin/ots billing catalog pull` ignores it entirely and always uses `['plan_id']`. | verified — OPERATOR-SUPPLIED (shipped comment contradicted by shipped code) | `apps/web/billing/operations/catalog/push.rb:57` (`catalog['match_fields'] \|\| ['plan_id']`), `:72` (reported to the operator), `:84` (passed to `StripeReader`), `:136-143` (`build_match_key_from_plan`), `:187-201` (`resolve_existing_product`); `apps/web/billing/operations/catalog/stripe_reader.rb:32-56`, `:86-89`; **CONTRAST** `apps/web/billing/operations/catalog/pull.rb:182-185` (`fetch_products` called with no `match_fields` argument, taking the `['plan_id']` default) |
| J44 | The docs-repo catalog sets `match_fields` to `[plan_id, region]`. Both key builders return `nil` if **any** listed field is missing. So on a deployment where `JURISDICTION` is unset, every plan's region renders empty, every match key is `nil`, `catalog push` resolves **no** existing product for any plan, and it proposes **creating duplicates** of products that already exist in Stripe. **Always `catalog push --dry-run` first and read the reported "Match fields" and "Region filter" lines.** | verified — OPERATOR-SUPPLIED | Catalog key paths `match_fields` (= `[plan_id, region]`) and `plans.*.region` (each rendered from `ENV['JURISDICTION']`), sha256 `69a9…7501`; `push.rb:136-143` (`return nil if values.any?(&:nil?)`), `:187-201` (nil key → nil existing → create branch at `:157-164`), `:70-73` (the dry-run report lines); `stripe_reader.rb:86-89` (same nil rule on the Stripe side) |
| J45 | `push` and `pull` also disagree about `app_identifier`: `push` uses the catalog's value, `pull` hardcodes `Billing::Metadata::APP_NAME = 'onetimesecret'`. The docs-repo catalog says `"onetimesecret"` so they agree; **the shipped example says `"exampleapplication"`**, so an operator who copies the example verbatim will push products that `pull` can never find. | verified — OPERATOR-SUPPLIED | `push.rb:54` (`catalog['app_identifier'] \|\| Billing::Metadata::APP_NAME`); `pull.rb:182-184` (hardcoded `APP_NAME`); `apps/web/billing/metadata.rb:13` (`APP_NAME = 'onetimesecret'`); `etc/examples/billing.example.yaml:77` (`app_identifier: "exampleapplication"`); catalog key path `app_identifier` (= `"onetimesecret"`), sha256 `69a9…7501` |
| J46 | The catalog's `stripe_metadata_schema` documents `region` as an **optional** Stripe product metadata field — *"Regional scope (e.g., EU, US, CA); omit for global plans"*. **That advice is unsafe under fail-closed matching:** a product with `region` omitted is rejected by any deployment that has a region configured. | verified — OPERATOR-SUPPLIED (catalog text contradicted by shipped code; **the code wins**) | Catalog key path `stripe_metadata_schema.optional` (the `region` entry), sha256 `69a9…7501`; contradicted by `apps/web/billing/region_normalizer.rb:76-84` and its design note at `:14-24` ("There is intentionally no concept of a global region") |

### J.7 The user-visible surface — a link menu, not a system

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| J47 | When regions are **disabled**, the browser receives only `regions_enabled: false` — the jurisdiction list, including every sibling hostname, is withheld. When **enabled**, the full list is sent **including domains, to anonymous visitors**. **Enabling regions publishes every sibling region's hostname publicly.** | verified — STRUCTURAL | `apps/web/core/views/serializers/config_serializer.rb:52-58` (the gate at `:57-58`), `:547-575` (`transform_regions`; domain emitted at `:562`, doc comment at `:550-551` calls it deliberately public); rendered in the anonymous footer at `src/shared/components/layout/TransactionalFooter.vue:29`,`:44`,`:114` |
| J48 | The region toggle appears in **three** footers — anonymous/transactional, signed-in management, and the branded custom-domain footer — but **only the transactional one carries the `!isCustom` suppression**. The architecture doc's claim that custom domains suppress the toggle holds for one footer out of three. | verified — STRUCTURAL | `src/shared/components/layout/TransactionalFooter.vue:39`,`:44`,`:114`; `ManagementFooter.vue:38`,`:221`; `src/apps/secret/components/layout/BrandedFooter.vue:23`,`:55`; contradicted claim at `docs/architecture/regions.md:76` |
| J49 | There are four region routes — `/account/region` (redirects to current), `/account/region/current`, `/account/region/available`, `/account/region/why` — all requiring authentication and **owner-or-admin role**. They are **information only**: none of them migrates, copies or moves anything. | verified — STRUCTURAL | `src/apps/workspace/routes/account.ts:94-149` (`checkOwnerOrAdminAccess` at `:97`,`:111`,`:125`,`:139`); `src/apps/workspace/account/DataRegion.vue:9-12` (redirect); `src/apps/workspace/account/region/CurrentRegion.vue:20-70`; `AvailableRegions.vue:25-60`. **Role-gated, not plan-gated** — per the governing fact, role is the whole answer on a stock self-hosted install. |
| J50 | The Region entry in the settings navigation is **not** gated on `regions_enabled` — only on full-auth mode and owner-or-admin. A Region section therefore appears in **every full-auth install even with `REGIONS_ENABLED=false`**, rendering the `web.regions.no_region_configured` fallback. **Never write that regions are hidden when disabled.** | verified — STRUCTURAL | `src/apps/workspace/config/settings-navigation.ts:203-234` (`visible: () => f.isFullAuthMode && f.isOwnerOrAdmin` at `:213`), wired at `:287`; fallback at `src/apps/workspace/account/region/CurrentRegion.vue:66-70` |
| J51 | A jurisdiction's **display name comes only from an i18n key** derived from its identifier (`web.regions.jurisdictions.{id-lowercased}.name`); the `JURISDICTIONS` format has **no field** for a display string and none for an icon. The English bundle ships names for exactly **seven** identifiers — EU, US, CA, UK, NZ, AT, APAC — and locale bundles are compiled at build time, so an operator's own identifier (DE, SG) **cannot** be given a friendly name without rebuilding the frontend. Icons degrade to a generic globe; names do not degrade. | verified — STRUCTURAL | `lib/onetime/config.rb:458` and `:584-591`; `apps/web/core/views/serializers/config_serializer.rb:560-567`; `locales/content/en/feature-regions.json` (the seven jurisdiction name keys); `src/sources/jurisdictions.ts:20-33`,`:39-41` (icon map + globe fallback); `src/shared/stores/jurisdictionStore.ts:40-45` (unconditional `t(key)`); `src/i18n.ts:20-38`,`:74-83` (build-time bundling) |
| J52 | `JURISDICTION` **must** be a member of `JURISDICTIONS`, and **nothing on the backend enforces it**. If it is not, the store's `findJurisdiction` throws the moment any component touching it mounts, and the auto-init plugin calls `init()` with no `try/catch`: boot succeeds, the UI breaks. Conversely, setting `REGIONS_ENABLED` and `JURISDICTIONS` but leaving `JURISDICTION` empty produces **silent nothing** — `currentJurisdiction` stays null and the toggle's root `v-if` renders no element. | verified — STRUCTURAL | `src/shared/stores/jurisdictionStore.ts:158-169` (init branch), `:183-193` (`findJurisdiction` throws `createError`); `src/plugins/pinia/autoInitPlugin.ts:107-113` (uncaught `init`); `src/shared/components/ui/JurisdictionToggle.vue:136` (`v-if="currentJurisdiction"`) |
| J53 | The config wizard's "Multi-region / jurisdictions" question writes **only** `features.regions.enabled: true`. It writes neither `current_jurisdiction` nor a jurisdiction list, so answering yes produces the `enabled (no jurisdictions)` state — feature on, nothing to show. **Tell operators the wizard is not sufficient.** | verified — STRUCTURAL | `lib/onetime/config_generator.rb:94-98` (the question), `:212-214` (what it writes) |

**53 rows.**

### J.8 Gaps — where the evidence runs out

1. **J-g1. CATALOG DIVERGENCE NOT ESTABLISHED.** The docs-repo catalog is `/Users/d/Projects/ops/sites/docs.onetimesecret.com/billing.yaml`, 402 lines, sha256 `69a96394920fd1777cf23a9bdedee174648f46b54e13c99a1f27b3cdc0a17501`, gitignored (`.gitignore:28`). `etc/billing.yaml` in the app working tree is **not tracked at 4cbd42149** (`git ls-tree 4cbd42149 -- etc/billing.yaml` returns nothing) and is **not a file**: it is a symlink resolving to `/Users/d/Projects/_/dotfiles/dotconfig/onetimesecret-dev/billing.yaml` (via `~/.config/onetimesecret-dev/`), a developer's local dev config in a **third** repo. It is 420 lines to the docs-repo copy's 402, so a divergence exists, but it is **UNSOURCED — uncitable, unfetchable and unreproducible by any reader or by CI. What the two disagree about is therefore unknown, must not be resolved silently, and must not be asserted from that file.** Every catalog row above is asserted against the 402-line docs-repo copy only; a reader holding the other copy may see different key values. Against the tracked `etc/examples/billing.example.yaml` at the pin, the docs-repo copy is a production-shaped file (`app_identifier: "onetimesecret"`, an "ALL REGIONS (no stripe IDs)" header, dated 2026-07-20) that **lacks** three keys the example has: `checkout_host`, `automatic_tax`, `payment_method_configuration`.
2. **J-g2.** `site.federation_secret` has **no shipped config key anywhere** — not in `etc/defaults`, not in `src/schemas`. Whether an operator-added `site.federation_secret` survives config schema validation, or is stripped/rejected at boot, was **not traced**. **Do not tell operators to use the YAML path** (see J15).
3. **J-g3.** **No rotation procedure for `FEDERATION_SECRET` exists.** `docs/runbooks/secret-rotation.md:31` says only that it is not derived from `SECRET` and must be backed up. Given the Stripe-side immutability guard (J22), what an operator should actually do to rotate it — re-run both backfill migrations? accept permanent divergence? — is not established anywhere in either repo.
4. **J-g4.** Whether the **hosted service** runs this same `features.regions` code path, or something operationally different, is not establishable from these repos. The five hosted regions (CA, EU, NZ, UK, US) appear only in the existing docs page `src/content/docs/en/account/change-your-region.md:8`, never in tracked app config; the `identity.{region}.onetime.co` CNAME targets at `:41` of that page have **no counterpart in the app repo at all**.
5. **J-g5.** **No end-to-end test, CI job or fixture exercises a two-region setup.** Nothing regression-tests the advertise-siblings path, and there is no evidence federation has ever been verified across two real installs. **It cannot be called a supported configuration on the strength of the code alone.**
6. **J-g6.** The severity of the `features.regions.jurisdictions` array deprecation — warn versus abort — depends on `compatibility.deprecated_config_mode`, which was **not traced**. The entry at `lib/onetime/config.rb:244-252` sets no explicit severity, unlike the `:warn` entries below it.
7. **J-g7.** Nothing establishes a recommended or supported **number** of regions, nor any guidance on hostname, DNS or TLS setup for siblings. There is no such content in the app repo. **Do not invent an architecture or sizing section.**
8. **J-g8.** How two regions come to **share one Stripe account** in practice (one live key copied to both? restricted keys? a webhook endpoint per region?) is not in the repo. The code assumes a shared account; the operational setup is undocumented.
9. **J-g9.** Whether the `JurisdictionToggle` is actually reachable on a custom domain depends on which footer that page renders end to end, which was not traced. The three footers gate differently (J48).

### J.9 Hazards — do not write these wrong

1. **J-h1. THE INVERSION — both directions.** Do not repeat the earlier pass's conclusion that this feature is thin; **nothing replicating is the design, not a shortfall**. But do not overcorrect either: enabling `features.regions` does **not** build a multi-region system. It publishes a hostname list and renders a link menu. **The siloing exists whether or not the toggle is on** — it is a property of running two installs, not a property of the config key.
2. **J-h2. `FEDERATION_SECRET` IS NOT "MULTI-REGION ONLY".** Its presence flips federation on for a **single**-region install too, and `rake ots:secrets` sets it by default (J19, J20). The install ledger's row 24 framing is too narrow — **correct it there rather than propagating it**.
3. **J-h3. TWO SHIPPED DOCUMENTS ARE WRONG ABOUT `FEDERATION_SECRET` GENERATION.** `adr-008…:53` and `.env.reference:58` both say it is not auto-generated; `lib/tasks/init.rake:167-175` generates it. **Follow the code and say so explicitly** — an operator who trusts either document will not realise they already have a value.
4. **J-h4. THE SHIPPED UI COPY OVERSTATES THE SILOING SLIGHTLY.** `web.regions.no_data_transfer_policy` says customer data is "never transferred between regions under any circumstances", while federation does propagate subscription status, plan id and period end across regions (never the email itself — only its HMAC). **Do not repeat the absolute phrasing on a page that also documents federation.** Write: *no user content, no credentials and no identity cross; a paid subscription's benefit can, via Stripe, when federation is configured.*
5. **J-h5. `config_serializer.rb:56` CLAIMS JURISDICTION DOMAINS ARE NOT SENT TO THE FRONTEND.** They are (`:562`), to **anonymous** visitors. That comment is stale; **repeating it would make a false privacy claim**.
6. **J-h6. `docs/architecture/regions.md` IS NOT SAFE TO COPY.** Its configuration example (`:29-42`) uses the **deprecated YAML array form** and shows a `display_name:` key the serializer drops; its claim at `:76` that custom domains suppress the toggle holds for one footer of three. Its data-flow section is fine.
7. **J-h7. FOUR DIFFERENT REGION DEFAULTS** (`'global'`, `nil`, `'LL'`, hardcoded `'EU'`) land in the same Stripe account from the same deployment. A support engineer reading `region='LL'` on a checkout session and `region='global'` on the customer is looking at **one** install, not two. **Do not present region as a single value.**
8. **J-h8. `Plans#checkout_redirect` STAMPS `checkout_region='EU'` UNCONDITIONALLY.** If the page tells operators that region metadata on a Stripe subscription reflects their `JURISDICTION`, that is **false for one of the two checkout surfaces**.
9. **J-h9. INTRA-REGION AMPLIFICATION.** `find_federated_by_email_hash` returns **every** non-owner org in the local datastore matching the hash, not just one. **Do not describe federation as one-org-to-one-org.**
10. **J-h10. THE CATALOG'S OWN COMMENT ON `match_fields` IS WRONG for the push path.** Quoting "Not read at runtime" onto the page would tell an operator a key is inert when it directly controls whether `catalog push` creates duplicate Stripe products.
11. **J-h11. ROTATING `FEDERATION_SECRET` SILENTLY BREAKS EXISTING FEDERATION** because the Stripe-side hash is immutable and never recomputed. The only signal is a log warning. **Never present rotation as routine** (and see J-g3 — no procedure exists).
12. **J-h12. DO NOT CALL FEDERATION PLAN- OR ENTITLEMENT-GATED.** It is inert on a stock self-hosted install because billing is off and `FEDERATION_SECRET` may be unset — **not** because a plan withholds it. The `/account/region/*` pages are **role**-gated (owner-or-admin), which per the governing fact is the whole answer on a self-hosted install.
13. **J-h13.** `custom_domain.rb:130`'s comment "Domain can only exist once" reads as a **global** guarantee. It is per-datastore: two regions can each hold the same custom domain, and neither knows about the other.

### J.10 Hosted vs self-hosted

The **regions half is identical everywhere** and mostly structural: one datastore per region, no
replication, no failover, no routing, a link menu when `REGIONS_ENABLED=true`. A self-hoster who runs two
installs already has two regions in the app's own sense (J1) — the config keys only make the second one
*visible* from the first.

The **federation half is billing-enabled only**. On a stock self-hosted instance billing is off, so
`process_with_federation` never runs regardless of secrets. The one thing to warn self-hosters about is J20:
`rake ots:secrets` writes a `FEDERATION_SECRET`, so an operator who later enables billing has federation
**on** by default, with hash computation, non-owner org matching and pending-subscription storage all live
on a single-region install. On the hosted service, five regions (CA, EU, NZ, UK, US) share one Stripe
account, and federation is the mechanism that lets one paid subscription deliver its benefit to the same
person's organization in a region where they never checked out — the accounts themselves stay entirely
separate (J25). **Whether the hosted service runs precisely this code path is not establishable from these
repos — see J-g4.**

---

## K. features/billing-and-entitlements

**Feature reality: FULLY, in two halves that must never be mixed.** §K was blocked in the first pass
because the plan catalog shipped in neither repo. **That blocker is closed** — the catalog is supplied
as an operator artefact at `/Users/d/Projects/ops/sites/docs.onetimesecret.com/billing.yaml`, and the
page can be written, but only with the split below held on every line.

> **THE TWO SITUATIONS — read this before any row.**
>
> 1. **Stock self-hosted (no `etc/billing.yaml`).** Billing is off, the billing application is never
>    loaded, `STANDALONE_ENTITLEMENTS` is returned before any other resolution rung, limits return
>    `Float::INFINITY`, and **role is the whole answer**. There is no entitlement knob of any kind.
>    Org-level entitlement overrides can be written but are **dead letters**. This is §0 of this
>    ledger and is unchanged by the catalog's arrival.
> 2. **The operator supplies a catalog.** Billing turns on by the mere presence of the file. Plans,
>    plan entitlements and plan limits then bind, intersected with role.
>
> **A row about (2) is never a statement about a stock install, and vice versa.** Rung 2
> short-circuits before plans, grants, revokes and limits are ever consulted (K18, K19, K25, K56), so
> every plan sentence on the page needs an explicit *"when the operator supplies a billing catalog"*
> frame.

**Recommended page order — the two halves, in this order, clearly separated.**
**Half one first: the stock self-hosted reality** (K.1–K.3) — billing off, `STANDALONE_ENTITLEMENTS`,
infinite limits, role is the only lever, no entitlement knob exists, overrides are dead letters, the
standalone materialization chore. This half needs no catalog and is the part most operators will read.
**Half two second: what changes when the operator supplies a catalog** (K.4–K.9) — how the file is
loaded and validated, the seven-rung resolution order, plan ∩ role, the override and colonel surfaces,
what does and does not need Stripe. **Do not open the page with the catalog.**

**Row numbering is fixed.** K1–K56 keep the numbers assigned by the research pass because §J43,
§L and §M already cross-reference K16, K29, K35, K40, K45, K46, K55 and K56. The tables below are
grouped by the two halves, so row numbers run out of sequence across sections. **That is deliberate —
do not renumber.**

### Catalog provenance — read this before citing any `catalog:` row

- **`sha256 69a96394920fd1777cf23a9bdedee174648f46b54e13c99a1f27b3cdc0a17501`** — 402 lines, docs repo,
  `/Users/d/Projects/ops/sites/docs.onetimesecret.com/billing.yaml`. **A different digest means every
  `operator-supplied` row must be re-verified.**
- **Gitignored** (`.gitignore:28`) and tracked in neither repo, so **cite it by key path only**
  (`entitlements.custom_domains.category`, `plans.free_v1.limits.secret_lifetime`), **never by line
  number**.
- `/Users/d/Projects/dev/onetimesecret/onetimesecret/etc/billing.yaml` is a **symlink**, resolving on
  this machine only to `/Users/d/Projects/_/dotfiles/dotconfig/onetimesecret-dev/billing.yaml` — a
  developer's local dev config in a **third** repo. 420 lines vs 402, so it diverges, but the
  divergence is **UNSOURCED and uncitable**. **Make no claim about its contents.** The tracked
  artefacts available for a divergence claim are `etc/examples/billing.example.yaml` (368 lines at
  the pin) and `apps/web/billing/docs/plan-definitions.md`.
- **New verdict label: `operator-supplied`.** It marks a fact read from the catalog — one operator's
  configuration, not a product fact and **never STRUCTURAL**. A value from `etc/defaults`,
  `.env.reference`, a compose file or `billing.yaml` is never structural.

---

## Half one — the stock self-hosted install

Everything in K.1–K.3 is true with **no `etc/billing.yaml` present**. None of it depends on the
catalog.

### K.1 What a stock install actually resolves

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| K9 | When billing is off the **billing application is never loaded**: the app registry rejects every file under `apps/web/billing/` before requiring it, and `Billing::Application.should_skip_loading?` is a second gate. `/billing/*` routes, the Stripe SDK and the `Billing::Plan` model **do not exist** on a stock install. | verified (STRUCTURAL) | `lib/onetime/application/registry.rb:162-165`; `apps/web/billing/application.rb:43-45`. `WithPlanEntitlements` guards on `defined?(::Billing::Plan)` for exactly this reason (`with_plan_entitlements.rb:217`). |
| K18 | **Organization entitlements resolve in exactly this order, first match wins:** (1) an active **colonel preview** override; (2) **billing disabled → `STANDALONE_ENTITLEMENTS`** (the full set); (3) **materialized** set (`entitlements_plan ∪ grants − revokes`); (4) no `planid` → `FREE_TIER_ENTITLEMENTS`; (5) plan found in the Redis plan cache → the plan's entitlements; (6) plan found in the catalog → the catalog's entitlements; (7) otherwise **raise `Billing::PlanCacheMissError`** (fail-closed). **On a stock install resolution stops at rung 2 — rungs 3 through 7 never execute.** | verified (STRUCTURAL) | `lib/onetime/models/organization/features/with_plan_entitlements.rb:179-241` (the order is stated in the comment at `:179-186` and implemented immediately below); the rung-2 branch at `:198-201` |
| K19 | The same seven-rung order governs **limits**, with `Float::INFINITY` in place of the full entitlement set at rung 2 and `PlanCacheMissError` at rung 7. **So on a stock install every limit is infinite** — member counts, organization counts, custom domains, secret lifetime. | verified (STRUCTURAL) | `lib/onetime/models/organization/features/with_materialized_limits.rb:56-120`, rung 2 at `:78-79` |
| K56 | **There is no entitlement knob for a self-hoster.** With billing off there is **no config key, no environment variable and no YAML setting** that adds or removes an entitlement — rung 2 returns the full constant, and the two operator override sets are unreachable (K25). **The only lever that binds on a stock install is role.** | verified (absence) + STRUCTURAL | `with_plan_entitlements.rb:48-56,198-201`; `lib/onetime/cli/org/entitlement_command.rb:80-94`; row 0.1 |

### K.2 Role is the whole answer — the three templates

On a stock install a membership's effective set is `STANDALONE_ENTITLEMENTS ∩ ROLE_ENTITLEMENTS[role]`.
The intersection formula (K30) is the same one billing-enabled installs use; only the left operand
changes.

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| K30 | A membership's effective entitlements are `org.entitlements ∩ ROLE_ENTITLEMENTS[role]`, then `+ membership grants − membership revokes`. The role templates **nest**: `member ⊂ admin ⊂ owner`. | verified (STRUCTURAL) | `lib/onetime/models/organization_membership.rb:102-106`; `lib/onetime/models/organization_membership/features/with_materialized_entitlements.rb:13-18,88-113,115-120` |
| K31 | `MEMBER_ENTITLEMENTS` (5): `create_secrets`, `view_receipt`, `api_access`, `extended_default_expiration`, `notifications`. | verified (STRUCTURAL) | `lib/onetime/models/organization_membership.rb:72-78` |
| K32 | `ADMIN_ENTITLEMENTS` (7): `audit_logs`, `manage_members`, `custom_domains`, `homepage_secrets`, `incoming_secrets`, `custom_branding`, `custom_privacy_defaults`. | verified (STRUCTURAL) | `lib/onetime/models/organization_membership.rb:80-88` (`custom_domains` at `:83`) — this also settles §L2 for the ADMIN block |
| K33 | `OWNER_ENTITLEMENTS` (9): `ip_access_rules`, `workspace_branding`, `custom_mail_sender`, `flexible_from_domain`, `custom_signin_config`, `custom_signup_validation`, `manage_sso`, `manage_org`, `manage_billing`. | verified (STRUCTURAL) | `lib/onetime/models/organization_membership.rb:90-100` |
| K34 | **The role templates cover 21 names; the catalog defines 23 and `STANDALONE_ENTITLEMENTS` holds 22.** `manage_teams` and `manage_orgs` appear in **no role template at all**, so the intersection drops them for every role including owner. `manage_orgs` is additionally **absent from `STANDALONE_ENTITLEMENTS`** — it is the one catalog entitlement a stock self-hosted org never holds. | verified (STRUCTURAL) | set arithmetic over `organization_membership.rb:72-100`, `with_plan_entitlements.rb:48-56`, and catalog `entitlements.*` |
| K35 | **Five entitlements have no backend enforcement anywhere:** `workspace_branding`, `ip_access_rules`, `manage_teams`, `manage_orgs`, `manage_billing`. Every occurrence in `lib/` and `apps/` is a constant definition, a comment or a docs file; the only live consumers are frontend display labels. | verified (absence) | per-name `git grep -n '<name>' 4cbd42149 -- lib apps src`, excluding specs/tryouts/docs/locales. Live hits confined to `with_plan_entitlements.rb:51,55`, `organization_membership.rb:91-99`, `src/types/organization.ts:57,67,71-72`, `src/shared/composables/useEntitlements.ts:25,35,38-39`, `src/schemas/contracts/organization.ts:138-147`. **Extends row 0.4** from `workspace_branding` alone to five names. |

### K.3 Operator overrides, the standalone chore, and why the overrides do nothing here

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| K23 | An organization carries two operator-owned sets, `entitlements_grants` and `entitlements_revokes`, consulted at **rung 3**. Every materialization recomputes `materialized = entitlements_plan ∪ grants − revokes`, so **overrides survive plan changes, webhooks and reconciles by construction** — no code path clears those two sets. | verified (STRUCTURAL) | `lib/onetime/models/organization/features/with_materialized_entitlements.rb:75-82,167-193`; `lib/onetime/operations/org/entitlement_override.rb:24-38`; `lib/onetime/operations/org/reconcile.rb:98-105` |
| K24 | The override verb has **one implementation and two adapters**: the CLI `bin/ots org entitlement show\|grant\|revoke\|clear`, and the colonel HTTP routes `POST /api/colonel/organizations/:org_id/entitlements/:action` and `DELETE …/entitlements/overrides`. Grant/revoke are idempotent (`:no_change`); `clear` always applies and always audits. `--dry-run` projects without writing; an applied run needs `--yes`, and `--json` without `--yes` is refused. | verified (STRUCTURAL) | `lib/onetime/cli/org_command.rb:31-34`; `lib/onetime/cli/org/entitlement_grant_command.rb:53-66`; `lib/onetime/cli/org/entitlement_command.rb:40-133`; `lib/onetime/operations/org/entitlement_override.rb:13-17,40-51,204-234`; `apps/api/colonel/routes.txt:77-78` |
| K25 | **On a billing-disabled install an org-level entitlement override is a DEAD LETTER.** It is written and `materialized_entitlements` is recomputed, but **rung 2 returns `STANDALONE_ENTITLEMENTS` before rung 3 is ever reached**, so no `can?` check observes it — while `bin/ots org entitlement show` *does* display it, because that command reads the sets directly. The CLI prints a five-line `!! BILLING IS DISABLED ON THIS INSTALL !!` warning to STDERR; the op returns `standalone: true`. It is **not refused**, so an operator may pre-seed an install that enables billing later. | verified (STRUCTURAL) | `lib/onetime/cli/org/entitlement_command.rb:80-94` (the warning, whose own comment calls it "THE most important line this command prints"); `lib/onetime/operations/org/entitlement_override.rb:60-71` (D17); `with_plan_entitlements.rb:198-201` |
| K26 | Granting an entitlement **not in the catalog warns but is never blocked** — pre-seeding a name that ships in a later catalog is supported. When the catalog cannot be loaded at all, `known_entitlement?` returns true, so a missing config never produces a spurious typo warning. | verified (STRUCTURAL) | `lib/onetime/operations/org/entitlement_override.rb:53-58,171-186`; `lib/onetime/cli/org/entitlement_command.rb:96-102` |
| K27 | `bin/ots org entitlement show` reports plan set, grants, revokes, expected (`plan ∪ grants − revokes`), materialized, the **drift** between expected and materialized, and a tri-state `plan_stale`. It always exits 0 — drift is a fact to look at, not a command failure. | verified (STRUCTURAL) | `lib/onetime/cli/org/entitlement_show_command.rb:14-18,62-114`. **It labels the materialized set "Materialized (what runtime reads)", which is false on a standalone install** — mitigated only by the command's own standalone warning (K25). |
| K28 | `bin/ots org reconcile` has two modes: `stripe_sync` (billing enabled **and** a Stripe subscription id) and `entitlements_only`. **With billing disabled that is checked first** and the op runs `materialize_standalone_entitlements!` plus a membership cascade, returning status `:standalone` — **a leftover subscription id can never send a self-hosted reconcile to Stripe.** | verified (STRUCTURAL) | `lib/onetime/operations/org/reconcile.rb:49-96` |
| K29 | **Membership-level overrides exist and contradict the op's own comment.** `entitlement_override.rb:80-86` states as decision D19 that `OrganizationMembership` has the same three methods with "zero adapters" — but at this pin there are **two**: `bin/ots memberships entitlement show\|grant\|revoke\|clear` and `POST\|DELETE /api/colonel/organizations/:org_id/members/:member_id/entitlements/…`. **Do not repeat D19.** | verified (STRUCTURAL, contradicts a shipped comment) | comment at `lib/onetime/operations/org/entitlement_override.rb:80-86`; contradicted by `lib/onetime/cli/memberships/entitlement_{show,grant,revoke,clear}_command.rb` (registered at `:201`, `:80`, `:75`, `:78`) and `apps/api/colonel/routes.txt:85-87` (labelled "#3907") |
| K48 | The `materialize_standalone_entitlements` chore is a **backfill**, run as `HousekeepingJob.perform('Onetime::Organization', :materialize_standalone_entitlements)`. Three branches: billing enabled → log and skip (the webhook owns materialization); already materialized → **silent** no-op, so an operator's grants/revokes are never clobbered; otherwise materialize `STANDALONE_ENTITLEMENTS` and cascade to every membership. | verified (STRUCTURAL) | `lib/onetime/models/organization/chores/materialize_standalone_entitlements.rb:31-32,46-92` |
| K49 | **New organizations do not need the chore** — `Organization.create!` already calls `materialize_standalone_entitlements!`. The chore exists for orgs created before that wiring, and the runtime rung-2 fallback is retained until the backfill is confirmed in deployed environments. | verified (STRUCTURAL) | `with_plan_entitlements.rb:142-171` (esp. `:158-160`); chore header `:5-29` |
| K50 | `materialize_standalone_entitlements!` is a **no-op returning false when billing is enabled**, and idempotent otherwise — each call re-runs `plan + grants − revokes`. It writes `STANDALONE_ENTITLEMENTS` with `limits: {}` (no limits at all), which is consistent because rung 2 of the limits chain returns `Float::INFINITY` before materialized limits are ever read (K19). | verified (STRUCTURAL) | `with_plan_entitlements.rb:164-171`; `with_materialized_entitlements.rb:144-165`; `with_materialized_limits.rb:78-79` |
| K51 | The chore's membership cascade failures are **logged, not raised** — a failed `rematerialize_all_memberships!` leaves stale memberships behind and the chore still reports success for the org. | verified (STRUCTURAL) | chore `:64-82` |

---

## Half two — when the operator supplies a catalog

Nothing in K.4–K.9 applies to a stock install. Every claim below presupposes `etc/billing.yaml` is in
place and billing is on.

### K.4 How the catalog is loaded, and what turns billing on

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| K1 | The catalog is a **flat** YAML document with **no `billing:` root key**. Root keys at this catalog: `schema_version`, `enabled`, `stripe_key`, `webhook_signing_secret`, `stripe_api_version`, `currency`, `app_identifier`, `region`, `match_fields`, `entitlements`, `plans`, `stripe_metadata_schema`. | verified — operator-supplied | catalog root keys; the reader accessors match one-for-one at `lib/onetime/billing_config.rb:234-289`. `BillingConfig` also exposes `checkout_host`, `automatic_tax?`, `payment_method_configuration` and `payment_links`; **none of those keys are present in this catalog**, so they resolve from ENV or stay unset (gap G10). |
| K2 | The file is **ERB-templated before YAML parse**, so environment variables are interpolated at load. The five interpolations in this catalog are `enabled: <%= ENV['BILLING_ENABLED'] != 'false' %>`, `stripe_key: <%= ENV['STRIPE_API_KEY'] \|\| 'nostripekey' %>`, `webhook_signing_secret: <%= ENV['STRIPE_WEBHOOK_SIGNING_SECRET'] \|\| 'nosigningsecret' %>`, `currency: <%= ENV['BILLING_CURRENCY'] \|\| ENV['CURRENCY'] \|\| nil %>`, `region: <%= ENV['JURISDICTION'] \|\| nil %>` (the last also appears inside each plan's `name` and `region`). | verified — operator-supplied | catalog keys `enabled`, `stripe_key`, `webhook_signing_secret`, `currency`, `region`, `plans.*.region`, `plans.*.name`; ERB evaluation at `lib/onetime/billing_config.rb:340-344`. **Corrections to the research brief:** the key is `stripe_key`, not `stripe_api_key`; `currency` falls back to `ENV['CURRENCY']` as well as `BILLING_CURRENCY`; `stripe_api_version` is the literal `"2025-12-15.clover"`, not interpolated. |
| K3 | **Putting the file in place is what enables billing.** With `BILLING_ENABLED` unset the ERB renders `enabled: true` and `enabled?` falls through to that value. There is no separate "turn billing on" switch. To keep the file but run with billing off, set `BILLING_ENABLED=false`. | verified (STRUCTURAL) + operator-supplied | `lib/onetime/billing_config.rb:48-53` (ENV first, then `config['enabled']`); catalog key `enabled` and its own comment |
| K4 | `BILLING_ENABLED` is parsed **strictly**: `true`/`1`/`false`/`0` (case-insensitive), blank or unset means unset. **Any other value raises `Onetime::ConfigError` and fails the boot** rather than silently disabling billing. | verified (STRUCTURAL) | `lib/onetime/billing_config.rb:48-53`, `:305-313`. The comment at `:43-47` records why: `BILLING_ENABLED=1` used to mean "off". |
| K5 | **A malformed catalog does not fail the boot — it silently disables billing.** Any `StandardError` during load (YAML syntax error, bad ERB, unreadable file) is rescued, `@config` becomes `{}`, and `enabled?` then returns false. The operator's only signal is one `OT.le` log line. | verified (STRUCTURAL) | `lib/onetime/billing_config.rb:315-338` (`rescue StandardError => ex` → `@config = {}`), `:48-53`. **Contrast K4: the env flag fails loud, the file fails silent.** |
| K6 | The loader supports a two-layer merge (`etc/defaults/billing.defaults.yaml` under `etc/billing.yaml`), but **no billing defaults file is tracked**, so in practice the operator's file is the whole config. | verified (absence) | `lib/onetime/billing_config.rb:321-334`; `git ls-tree -r --name-only 4cbd42149 -- etc` returns only `etc/.gitignore`, `etc/defaults/{auth,config,logging}.defaults.yaml` and `etc/examples/*` |
| K7 | Path resolution is `etc/billing.yaml`, except under `RACK_ENV=test` where `spec/billing.test.yaml` then `apps/**/spec/billing.test.yaml` win. **Nothing else is searched** — a catalog anywhere else is not seen. | verified (STRUCTURAL) | `lib/onetime/utils/config_resolver.rb:36-64`; `lib/onetime/billing_config.rb:37` |
| K8 | **Defect:** `BillingConfig#reload!` calls `resolve_config_file`, which is **defined nowhere in the codebase** — the method raises `NoMethodError`. **Any "reload billing config without a restart" story is false; restart the process.** | verified (STRUCTURAL, defect) | `lib/onetime/billing_config.rb:293-298`; `git grep -n 'resolve_config_file' 4cbd42149 -- lib apps` returns exactly that one line — the call site, no definition |
| K10 | The `bin/ots billing …` CLI is registered **regardless** of whether billing is enabled — the CLI auto-discovers `apps/*/*/cli/**/*_command.rb` with no billing gate. **An operator can validate a catalog before turning it on.** | verified (STRUCTURAL) | `lib/onetime/cli.rb:205-218`; the commands themselves at `apps/web/billing/cli/*` |

### K.5 Validating a catalog

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| K11 | `bin/ots billing catalog validate` validates against a **generated** JSON Schema at `generated/schemas/config/billing.schema.json`. That directory is **gitignored** — only `.gitkeep` files are tracked — so **on a fresh checkout the command exits 1 with `Schema file not found`** until `pnpm run schemas:json:generate` has run. **Any how-to that omits that step will send operators into a false "my catalog is broken" loop.** | verified (STRUCTURAL) | `apps/web/billing/operations/catalog/validate.rb:52,58-60`; `git ls-tree -r --name-only 4cbd42149 \| grep generated/` returns only `generated/.gitignore`, `generated/.gitkeep`, `generated/locales/.gitkeep`, `generated/types/.gitkeep`; generator wired at `package.json:32`; the app's own test lane states the prerequisite at `tests/lanes/unit/tasks:4-8` |
| K12 | Validation is three passes: (1) JSON-Schema structure → **errors**; (2) every `plans.*.entitlements` member must exist in the `entitlements` map → **warnings**, not errors; (3) price consistency (a non-free tier with no prices, duplicate intervals) → **warnings**. Warnings fail the command only with `--strict`. | verified (STRUCTURAL) | `apps/web/billing/operations/catalog/validate.rb:70-92,114-165`; `apps/web/billing/cli/catalog_validate_command.rb:22-47` |
| K13 | Plan **ids are constrained by regex**: `^(free\|identity_plus\|team_plus\|legacy_plan)_v\d+$`, or the literal `identity`. **An operator cannot invent `pro_v1`** — the catalog fails schema validation. | verified (STRUCTURAL) | `src/schemas/contracts/config/billing.ts:60-61,297-305` (the plans record's **key** schema) |
| K14 | Entitlement `category` is a closed enum: `core`, `collaboration`, `infrastructure`, `branding`, `advanced`, `support`. This catalog uses five of the six — nothing is categorised `support`. | verified (STRUCTURAL) + operator-supplied | `src/schemas/contracts/config/billing.ts:84-91`; catalog `entitlements.*.category` |
| K15 | Currency is a closed enum (`cad`, `eur`, `gbp`, `nzd`, `usd`) and **defaults to `cad`** when blank or unset. Region is uppercased on read and `nil` when blank — there is deliberately no "global" default. | verified (STRUCTURAL) | `src/schemas/contracts/config/billing.ts:143`; `lib/onetime/billing_config.rb:263-284` |
| K16 | `match_fields` is **read only by `bin/ots billing catalog push`** (to build the Stripe product match key, defaulting to `['plan_id']`). It has **no effect on entitlement resolution.** The catalog's own comment — "Reserved for future composite-key matching. Not read at runtime" — is **wrong about push**, right about the request path. | verified (STRUCTURAL, contradicts the catalog's own comment) | `apps/web/billing/operations/catalog/push.rb:57,84,136-154,187`; catalog comment above key `match_fields`. Cross-reference §J43. |
| K17 | `stripe_metadata_schema` is **informational only** — a description of the Stripe product metadata convention, read by push/validate consistency checks, never by the runtime. | verified (STRUCTURAL) + operator-supplied | `lib/onetime/billing_config.rb:254-257`; `src/schemas/contracts/config/billing.ts:250-260`; catalog key `stripe_metadata_schema` and its own comment |

### K.6 The rungs that only run with a catalog — including colonel preview

The full seven-rung order is stated once at **K18** (entitlements) and **K19** (limits). Rungs 3–7 are
reachable only when billing is on. Rung 1 — preview — is a colonel-only surface.

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| K20 | **Rung 1 (preview) is request-scoped:** a Rack middleware copies three session keys (`entitlement_preview_planid`, `…_grants_key`, `…_revokes_key`) into a Fiber-local at the top of each request and clears it in `ensure`. Both `#entitlements` implementations consult it first, because the standalone and plan-load branches return before reaching `super`. | verified (STRUCTURAL) | `lib/onetime/middleware/entitlement_preview_context.rb:33-56`; `lib/onetime/models/features/with_entitlements.rb:136-183`; `with_plan_entitlements.rb:189-196` |
| K21 | Preview is set by **`POST /api/colonel/entitlement-preview`** with `{planid: …}` (or `{planid: null}` to clear); the plan list comes from **`GET /api/colonel/available-plans`**. Both require the **colonel** role, are session-scoped, clear on logout, **do not touch the subscription**, and each call writes one audit event. | verified — hosted-only | `apps/api/colonel/routes.txt:15-16`; `apps/api/colonel/logic/colonel/set_entitlement_preview.rb:65-137,177-194,242-244`; `get_available_plans.rb:47-69`. Both endpoints reference `::Billing::Plan` **unguarded** while `registry.rb:162-165` prevents that class loading when billing is off — see gap G3. |
| K22 | Preview works by "reset and substitute": the session revoke set is the org's current entitlements and the session grant set is the previewed plan's, reconciled as `materialized − session_revokes + session_grants`. `available-plans` reports `source: "stripe"` when the Redis plan cache is populated and `"local_config"` when it fell back to the catalog. | verified — hosted-only | `set_entitlement_preview.rb:20-27`; `with_materialized_entitlements.rb:195-232`; `get_available_plans.rb:52-68` |

### K.7 plan ∩ role — what the intersection actually does once a plan exists

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| K36 | **`manage_billing` is not what gates the subscription.** Billing-mutating endpoints authorize on the **owner role** — `load_organization(extid, require_owner: true)` → `org.owner?(cust)` → 403 — **not** on `can?('manage_billing')`. The four guarded operations are checkout-session creation, change-plan, currency migration, and the shared cancel/reactivate helper. `overview`, `list_invoices`, `subscription_status` and **`preview_plan_change`** require membership only. | verified (STRUCTURAL) | `apps/web/billing/controllers/base.rb:209-269`; `apps/web/billing/controllers/billing.rb:77,557,941,1100-1101` (`validate_subscription_management`, used by `cancel_subscription:748-750` and `reactivate_subscription:802`); non-owner reads at `:27-28,290-291,378-379,435-436` |
| K37 | Because the two halves refuse for **different reasons**, the app distinguishes them: `check_entitlement` returns `allowed`, `current_plan`, `upgrade_needed` and an `upgrade_to` suggestion — the plan-side refusal. **A role-side refusal produces no upgrade path.** | verified (STRUCTURAL) | `lib/onetime/models/organization/features/with_plan_entitlements.rb:268-282` |

### K.8 What is in this catalog — one operator's configuration, never a product fact

**Every row in this table is `operator-supplied` or depends on a value that is.** State per-plan
contents only as illustrations from one operator's catalog. **Publish no price** (K45) and no per-plan
comparison table.

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| K38 | The catalog defines **23 entitlements** across five categories and **four plans**: `free_v1` (tier `free`), `identity` (tier `single_account`, `legacy: true`, `grandfathered_until: "2029-01-31"`, `show_on_plans_page: false`), `identity_plus_v1` (`single_account`), `team_plus_v1` (`single_team`). All four are `tenancy: multi`. | verified — operator-supplied | catalog `entitlements.*`, `plans.{free_v1,identity,identity_plus_v1,team_plus_v1}` |
| K39 | `free_v1` grants 8 entitlements — `api_access`, `create_secrets`, `custom_domains`, `homepage_secrets`, `incoming_secrets`, `manage_orgs`, `manage_org`, `view_receipt` — and has `prices: []`. A free tier is **still synced to Stripe as a product** (for downgrade flows and discounted plans) but carries no price. | verified — operator-supplied | catalog `plans.free_v1.entitlements`, `plans.free_v1.prices`, and the `plans:` header comment |
| K40 | **`FREE_TIER_ENTITLEMENTS` in code does not match `free_v1`, despite a comment claiming it does.** The constant holds 6 names; `free_v1` holds 8 — the code omits `manage_orgs` and `manage_org`. **The consequence is real:** a billing-enabled org whose `planid` is empty (rung 4) gets **no `manage_org`**, so its owner cannot manage the organization until a plan is assigned. | verified (STRUCTURAL, contradicts a shipped comment) | `with_plan_entitlements.rb:58-70` — the comment at `:62` reads "These match the free_v1 plan in billing.yaml" — against catalog `plans.free_v1.entitlements` |
| K41 | **The hardcoded free-tier *limits* fallback also disagrees with `free_v1`.** Code: `organizations.max 5`, `total_members_per_org.max 0`, `role_owners_per_org.max 1`, `role_admins_per_org.max 0`, `role_members_per_org.max 0`, `teams.max 0`. Catalog `free_v1`: `organizations 10`, `total_members_per_org 1`, `role_members_per_org 1`, `custom_domains 1`. Only `secret_lifetime` agrees (1209600 = 14 days = `DEFAULT_FREE_TTL`), and that one by explicit contract. | verified (STRUCTURAL) + operator-supplied | `with_plan_entitlements.rb:124-134`; `lib/onetime/models/features/with_entitlements.rb:50-54` (the "MUST match `free_v1.limits.secret_lifetime`" contract); catalog `plans.free_v1.limits` |
| K42 | **Catalog limit keys are rewritten before use.** Every key gets a `.max` suffix (`custom_domains` → `custom_domains.max`), and **`-1` *or* `null` both become `unlimited`**, read back as `Float::INFINITY`. So `secrets_per_day: null` on `free_v1` — commented "TBD - not yet enforced" — materializes as **unlimited**, not as zero and not as unset. | verified (STRUCTURAL) | `apps/web/billing/models/plan.rb:482-487`; read side `with_materialized_limits.rb:44-49`; catalog `plans.free_v1.limits.secrets_per_day` |
| K43 | Role sub-caps are enforced **at invitation time**, mapped role → limit key (`owner`→`role_owners_per_org`, `admin`→`role_admins_per_org`, `member`→`role_members_per_org`); `role_admins_per_org` is also read by the permissions endpoint. | verified (STRUCTURAL) | `apps/api/organizations/logic/invitations/create_invitation.rb:24-26`; `apps/api/account/logic/account/get_permissions.rb:252` |
| K44 | **Two limit values in this catalog contradict their own inline comments.** `plans.team_plus_v1.limits.role_owners_per_org` is `50` with the comment "always 1 — explicit for clarity". `plans.identity_plus_v1.limits.role_admins_per_org` is `0` — Identity Plus admits 50 members but **no admins**. | verified — operator-supplied | catalog `plans.team_plus_v1.limits.role_owners_per_org`, `plans.identity_plus_v1.limits.role_admins_per_org` (with their comments) |
| K45 | **Prices in this catalog disagree with the tracked, auto-generated plan reference in the app repo. Publish no price from either source.** Catalog: `identity_plus_v1` 3500 / 35600, `team_plus_v1` 12500 / 120000 (cents). Generated reference at the same pin: $9.00 / $90.00 CAD and $85.00 / $850.00 CAD. The same file also lists `audit_logs` on `team_plus_v1`, which this catalog does not grant, and names the legacy plan "Legacy Plan (Legacy)" where the catalog says "Identity Plus (Legacy)". | verified — operator-supplied, **conflicting** | catalog `plans.*.prices` and `plans.identity.name`; `apps/web/billing/docs/plan-definitions.md:69-70,182-193,205-242` (header at `:1-12` declares it auto-generated from `etc/billing.yaml` and treats staleness as a drift bug). **The two artefacts were generated from different catalogs.** This is the single hardest stop in §K. |
| K46 | `includes_plan` (`identity_plus_v1` includes `free_v1`; `team_plus_v1` includes `identity_plus_v1`) is a **display** relation resolved to a plan name for the pricing UI. It does **not** union entitlements — each plan's `entitlements` array is complete on its own. | verified (STRUCTURAL) + operator-supplied | `apps/web/billing/models/plan.rb:489-491,505-507` (resolves `includes_plan_name` only; `entitlements` copied verbatim); catalog `plans.identity_plus_v1.includes_plan`, `plans.team_plus_v1.includes_plan`. §N13 records the same fact from the other direction. |
| K47 | `region` exists to keep several jurisdictions out of each other's plan cache when they share one Stripe account: only products whose region metadata matches are imported, and config-only plans inherit the deployment region. **Unset means "no regional filtering", not "global".** | verified (STRUCTURAL) + operator-supplied | `lib/onetime/billing_config.rb:270-284`; `apps/web/billing/operations/catalog/config_loader.rb:65-75`; catalog `region` and its comment |

### K.9 What an operator can and cannot do without Stripe

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| K52 | **Without any Stripe account an operator can:** author a catalog, validate it (after generating the JSON Schema, K11), turn billing on by placing the file, and have plans loaded into Redis — boot's Stripe pull fails, is caught, and falls back to `ConfigLoader.load_all_from_config`, which reads the catalog directly. **Plan gating, plan entitlements and plan limits then work end to end.** | verified (STRUCTURAL) | `apps/web/billing/initializers/billing_catalog.rb:34-60`; `apps/web/billing/operations/catalog/config_loader.rb:88-119`; `apps/web/billing/models/plan.rb:443-472` |
| K53 | **Boot does not fail on a missing Stripe key.** `StripeSetup` logs `Stripe API key not configured - billing features disabled` and continues; the catalog's placeholder `nostripekey` is what an operator gets when `STRIPE_API_KEY` is unset. What **does** fail the boot is a malformed `STRIPE_CHECKOUT_HOST`, an unrecognised `STRIPE_AUTOMATIC_TAX`, or a `STRIPE_PAYMENT_METHOD_CONFIGURATION` that is not a `pmc_…` id. | verified (STRUCTURAL) + operator-supplied | `apps/web/billing/initializers/stripe_setup.rb:15-69`; `lib/onetime/billing_config.rb:129-143,157-162,204-218`; catalog `stripe_key` default |
| K54 | **Without Stripe an operator cannot:** push the catalog to Stripe, pull the Stripe-synced cache, run checkout, run the customer portal, receive webhooks, or change/cancel/reactivate a subscription — those paths call Stripe directly and **503** when the key is missing. | verified (STRUCTURAL) | `apps/web/billing/routes.txt:10,17,20,32,36-40`; `apps/web/billing/controllers/billing.rb:1100-1113` (`stripe_api_key_missing?` → 503); `apps/web/billing/operations/catalog/{push,pull}.rb` |
| K55 | **Assigning a plan does not require Stripe.** `bin/ots customers plan set IDENTIFIER PLANID` validates the id against the catalog and sets it; `POST /api/colonel/users/:user_id/plan` is the other adapter over the same operation. **Scope caveat:** this sets the **customer's** `planid`, while entitlements resolve from the **organization's** `planid`, and the propagation path between them was not established (gap G4). **Until G4 closes, do not tell an operator that `customers plan set` changes what an organization is entitled to.** | verified (STRUCTURAL), scope-limited | `lib/onetime/cli/customers/plan_set_command.rb:71-113`; `apps/api/colonel/routes.txt:27` |

---

### K.10 What the three published hosted pages are owed

All three name this operator page as the destination for the plan half of the rule and currently get
nothing back. Against the rows above:

**`src/content/docs/en/organizations/roles-and-permissions.md`**

- **Honoured.** "Permissions are the intersection of plan and role" → K30. The three-role table's
  contents → K31/K32/K33 (including "Secret Activity" as an admin power, `audit_logs` at
  `organization_membership.rb:83`… `:80-88`). "Both refusals look similar but mean different things"
  → K37. Its closing self-hosting note ("every capability is granted; roles still apply") → K18
  rung 2 + K30, with K34's caveat that `manage_orgs` is the one catalog name a stock org never holds.
  Its `sourceOfTruth` line spans are correct at this pin.
- **Wrong in one attribution, and the correction is now five names wide.** The owner row sells "IP
  access rules" and "workspace branding" as owner powers. Both are in `OWNER_ENTITLEMENTS` but
  **enforce nothing** (K35) — as do `manage_teams`, `manage_orgs` and `manage_billing`. Row 0.4
  covered `workspace_branding` alone.
- **GAP the rows cannot close.** The page's "Member limits" section ("organizations have a limit on
  how many members they can hold, counted per role and in total; pending invitations occupy a place")
  is asserted for hosted only. The per-role caps are K43 and the numbers are `operator-supplied`
  (K41, K44); **on a stock install every one of those limits is infinite (K19)** and the page's
  self-hosting note does not say so. The operator page must.

**`src/content/docs/en/billing/index.md`**

- **Honoured.** "A plan belongs to your organization, not your account" and "Plan Features is the
  authoritative answer for your organization, including anything adjusted for your account
  specifically" → that panel serves `org.entitlements`, i.e. the resolved rung, including operator
  grants (K18, K23). "Only an organization's owner can manage its subscription" → K36 (true; see the
  next page for the wrong reason). Its self-hosting note is correct (K18, K19, K56).
- **Stale citation.** Its `sourceOfTruth` pins the resolution order at
  `with_plan_entitlements.rb:181-212`; at 4cbd42149 the order is stated at `:179-186` and implemented
  through `:241` (K18). Widen it.
- **GAP the rows cannot close.** The page's assurance rests on the Plan Features panel, and the
  panel's behaviour on a standalone install was never traced: `build_limits_hash` returns `{}` when
  `org.planid` is empty (gap G9), so it likely renders entitlements with no limits when billing is
  off. **Inferred, not verified — it is not a row.** The operator page may not describe that panel's
  standalone appearance.
- **HAZARD.** It links `/en/pricing/compare-plans` as "what the plans are sold as". The operator page
  must not mirror that table: K45 forbids publishing any price, and the generated plan reference is
  not usable as a fallback source either.

**`src/content/docs/en/billing/managing-your-subscription.md`**

- **Honoured.** "Only the owner can change it" and "an admin can open organization settings … but
  cannot change the subscription" → K36. "A plan change reaches everyone at once / will not grant a
  member something their role does not carry" → K23 + K30. "Downgrading removes capabilities from
  everyone" → K23.
- **Right conclusion, wrong evidence.** Its `sourceOfTruth` cites `organization_membership.rb:90-100`
  ("`manage_billing` sits in the owner template only") as the reason. **Enforcement is the owner
  *role* check in the billing controller, not the `manage_billing` entitlement** (K36), and
  `manage_billing` enforces nothing anywhere (K35). Correct the frontmatter. Also note
  `preview_plan_change` is **not** owner-gated (K36) — an admin can preview a plan change they
  cannot apply.
- **PROMISE THE ROWS CANNOT KEEP.** "There is exactly one owner." Nothing in §K supports a
  single-owner invariant, and the catalog contradicts it:
  `plans.team_plus_v1.limits.role_owners_per_org` is **50**, with an inline comment claiming "always
  1" (K44), and that limit is enforced at invitation time (K43). **The operator page may not repeat
  "exactly one owner."** Whether a single-owner rule exists elsewhere in the app is not established
  at this pin — it belongs in §M, not on a page.
- **Unverified claim.** "Opening organization settings at all requires you to be an owner or an
  admin" rests on a frontend route guard (`OrganizationSettings.vue:74-82`); no §K row covers it.
  The operator page must not restate it as a server-side guarantee.

### K.11 Gaps — where the evidence runs out

Labels **G1–G10 are load-bearing**: §M already cross-references "§K gaps G1 and G4". Do not renumber.

1. **G1.** **The catalog was never run through its own validator.** `bin/ots billing catalog validate`
   was not executed (it needs a generated JSON Schema and an app boot). One specific concern is
   unresolved: with `BILLING_CURRENCY` and `CURRENCY` unset the ERB renders `currency:` as YAML
   **null**, while the contract declares `CurrencyCodeSchema.optional()` — optional accepts *absent*,
   not *null*. **This catalog may fail its own validator on a deployment that sets no currency.** Not
   asserted either way; deliberately not a row.
2. **G2 — RESOLVED AS "PERMANENTLY UNSOURCEABLE".** `/Users/d/Projects/dev/onetimesecret/onetimesecret/etc/billing.yaml`
   is a symlink to `/Users/d/Projects/_/dotfiles/dotconfig/onetimesecret-dev/billing.yaml` — a
   developer's local dev config in a **third** repo, untracked at the pin, 420 lines to the
   docs-repo copy's 402. It was **not read** and **must not be**: even if read, nothing asserted
   from it could be cited, reproduced or verified by a reader. The divergence stays recorded and
   **uncharacterised, permanently**. Any row that turns out to depend on which copy is meant must be
   re-run against a named, tracked artefact — `etc/examples/billing.example.yaml` (368 lines at
   4cbd42149) or `apps/web/billing/docs/plan-definitions.md` are the two that exist.
3. **G3.** **Whether the colonel preview endpoints work at all on a billing-disabled install is
   unverified.** `GET /api/colonel/available-plans` and `POST /api/colonel/entitlement-preview`
   reference `::Billing::Plan` without the `defined?` guard used at `with_plan_entitlements.rb:217`,
   and `registry.rb:162-165` prevents that class loading when billing is off. A `NameError`/500 is
   likely but was not runtime-confirmed, so K21 states preview as **hosted-only** rather than
   asserting a failure mode.
4. **G4.** **The propagation path from a CUSTOMER's `planid` to the ORGANIZATION's `planid` was not
   traced.** `Auth::Operations::Customers::SetPlan` and `Billing::Operations::ApplySubscriptionToOrg`
   were seen only from their call sites. K55 is currently the only actionable "how do I put an org on
   a plan" answer and its scope is unresolved. **Close this before the writing pass.**
5. **G5.** Where `org.planid` is set **outside** the Stripe webhook path was not exhaustively
   established. `apps/web/billing/operations/apply_subscription_to_org.rb:124,215` were identified as
   the materialization call sites, but the file was not read end to end.
6. **G6.** **No runtime capture of any kind.** Every §K row is a code or catalog read at 4cbd42149.
   Nothing was booted, no CLI was run, no endpoint was called.
7. **G7.** ADR-012 (materialization stages) and ADR-020 (preview context) are cited by name in several
   code comments and were **not read**. Where a comment paraphrases an ADR, §K cites the comment, not
   the ADR.
8. **G8.** `schema_version`: the catalog says `"1.0"` and `CATALOG_SCHEMA_VERSION` is `'1.0'`, but **no
   code path was found that compares the two** at load or boot. Whether a version mismatch is detected
   anywhere is unestablished — do not promise version checking.
9. **G9.** The **Plan Features panel's behaviour on a standalone install** was not traced end to end.
   `build_limits_hash` returns `{}` when `org.planid` is empty (`entitlements.rb:221`), so the panel
   likely shows entitlements with no limits when billing is off — **inferred, not verified, and
   therefore not a row.**
10. **G10.** The catalog omits `checkout_host`, `automatic_tax`, `payment_method_configuration` and
    `payment_links`, all of which `BillingConfig` exposes accessors for. Their behaviour with this
    catalog is "unset unless the matching env var is set", which follows from the accessors, but no
    operator-facing consequence was traced (e.g. what checkout looks like under the Stripe Dashboard
    default payment method configuration).

### K.12 Hazards — do not write these wrong

1. **K-h1. Never let a catalog row leak into a self-hosted sentence.** Rung 2 short-circuits before
   plans, grants, revokes and limits are consulted (K18, K19, K25, K56). Every plan statement needs an
   explicit *"when the operator supplies a billing catalog"* frame, and half one must come first.
2. **K-h2. Publish no price.** The operator-supplied catalog and the tracked auto-generated plan
   reference disagree on **every** price at this pin (K45). The divergence also touches
   `team_plus_v1`'s entitlement list and the legacy plan's display name, so **the generated reference
   is not usable as a fallback source either.** No per-plan comparison table.
3. **K-h3. Operator entitlement overrides are a dead letter on a billing-disabled install, and
   `org entitlement show` still displays them** (K25). **A page that presents `bin/ots org entitlement
   grant` as a self-hosting feature would be actively harmful.** The CLI's own five-line STDERR
   warning is the model to follow.
4. **K-h4. A malformed catalog silently disables billing with only a log line** (K5), while the env
   flag by contrast fails the boot loudly (K4). An operator who typos their YAML gets a working site
   with billing quietly off. Say so where the file is introduced.
5. **K-h5. `BillingConfig#reload!` raises `NoMethodError`** (K8). **Do not document any hot-reload
   story for the catalog.** Restarting the process is the only answer.
6. **K-h6. `bin/ots billing catalog validate` exits 1 on a fresh checkout** because its schema lives in
   gitignored `generated/` (K11). Any how-to that omits `pnpm run schemas:json:generate` sends
   operators into a false "my catalog is broken" loop.
7. **K-h7. Six shipped-code-vs-comment contradictions, all in code a docs page would naturally
   trust.** `FREE_TIER_ENTITLEMENTS` "match the free_v1 plan" — they do not (K40); the free-tier limits
   fallback vs `free_v1` (K41); D19 "zero adapters" for membership overrides — there are two (K29);
   `match_fields` "not read at runtime" — push reads it (K16); `free_v1.secrets_per_day` "TBD - not yet
   enforced" — it materializes as **unlimited** (K42); `team_plus_v1.role_owners_per_org: 50` commented
   "always 1" (K44). **Trust the code and the values, not the comments.**
8. **K-h8. Five entitlements enforce nothing** (K35), and the published roles-and-permissions page
   currently sells two of them (`ip_access_rules`, `workspace_branding`) as owner powers. Row 0.4
   covered only `workspace_branding`; the correction is now five names wide.
9. **K-h9. `manage_billing` is not the subscription gate — the owner *role* check is** (K36). The
   published managing-your-subscription page reaches the right conclusion from the wrong evidence and
   its frontmatter `sourceOfTruth` needs correcting. `preview_plan_change` is not owner-gated.
10. **K-h10. Do not write "there is exactly one owner."** The published page says it; no §K row
    supports it and `plans.team_plus_v1.limits.role_owners_per_org` = 50 contradicts it (K44, K43).
11. **K-h11. The catalog is gitignored and untracked in both repos.** A bare citation is not
    reproducible by a reader or by CI. Cite by key path and carry the sha256; **if a later pass finds
    a different digest, every `operator-supplied` row must be re-verified.**
12. **K-h12. The app-repo `etc/billing.yaml` is an UNSOURCED symlink** into a developer's local
    dotfiles repo (420 lines vs the docs-repo copy's 402) — untracked at the pin, uncitable, and
    off-limits as evidence (G2, P-h11). §K uses the docs-repo copy exclusively and says so. The only
    tracked comparison artefacts are `etc/examples/billing.example.yaml` (368 lines) and
    `apps/web/billing/docs/plan-definitions.md`. **Silently picking one — or citing the symlink —
    is the failure mode to avoid.**

---

## N. features/secret_activity + features/organizations/audit_logs_enabled — the Secret Activity trail

> **PLACEMENT — read before writing anything.** This material does **not** belong on a new features
> page. Two of the three switches (`SECRET_ACTIVITY_COLLECT`, `ORGS_AUDIT_LOGS_ENABLED`,
> `SECRET_ACTIVITY_MAX_EVENTS`) are documented **nowhere** in `src/content/docs/` — a repo-wide grep for
> `SECRET_ACTIVITY` / `ORGS_AUDIT` returns exactly one hit, and it is
> `src/content/docs/en/organizations/audit-trail.md:47` **linking to a page that does not carry them**.
> The fix is to document the three keys on **`/en/self-hosting/configuration`** (the existing link
> target), plus a self-hosting privacy paragraph, and to correct the plan claim on the existing
> `audit-trail.md`. **Do not create a `features/secret-activity` page — nobody asked for one and the
> end-user page already exists.**

**Feature reality: FULLY — and shipped ON, which is the whole story.** Both governing flags default to
enabled (`features.secret_activity.collect` and `features.organizations.audit_logs_enabled` are the
**only** opt-out flags in their blocks; the four `features.organizations` siblings all ship false).
Organizations are auto-created for every authenticated user regardless of `ENABLE_ORGS`, so **a stock
self-hosted install is collecting a permanent, TTL-less trail that includes masked network identifiers
about anonymous recipients, and no page in the docs says so.**

**Two findings on a LIVE page, not planning notes:**

1. **`audit-trail.md` frontmatter `plan: Team Plus` and line 16 assert a plan gate that is wrong twice
   over.** On stock self-hosted the plan half never binds (`audit_logs` is in `STANDALONE_ENTITLEMENTS`),
   and the authoritative operator-supplied catalog grants `audit_logs` to **no plan at all**. See N9–N11.
   This is a defect on a published page.
2. **`audit-trail.md:47` is TRUE but omits three qualifications** — a silent floor of 100, boot-time-only
   application, and a **destructive** lazy trim when the value is lowered. See N12–N14. Keep the
   sentence; make the link target earn it.

### N.1 The two shipped-ON switches

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| N1 | `features.secret_activity.collect` (`SECRET_ACTIVITY_COLLECT`) ships **true**. It is an **opt-out**: only the string `false` pauses recording. When paused, no new events come to exist; events already recorded stay readable. | verified — shipped default | `etc/defaults/config.defaults.yaml:860-867` (`collect: <%= ENV['SECRET_ACTIVITY_COLLECT'] != 'false' %>`, block comment "Both default ON; these are opt-out exclusions"); `.env.reference:618-622`; `lib/onetime/models/organization/features/secret_activity.rb:104-110` (early return in `record_secret_activity_event`) |
| N2 | `features.organizations.audit_logs_enabled` (`ORGS_AUDIT_LOGS_ENABLED`) ships **true** — the **only** flag in the `features.organizations` block that does. Its four siblings (`enabled`/`ENABLE_ORGS`, `sso_enabled`, `custom_mail_enabled`, `incoming_secrets_enabled`) all ship false. | verified — shipped default | `etc/defaults/config.defaults.yaml:849-859` (siblings at `:850-853` are `ENV[...] == 'true'`; `:859` is `ENV['ORGS_AUDIT_LOGS_ENABLED'] != 'false'`); `.env.reference:612-616` |
| N3 | The two flags are **independent axes** and an operator must set **both** to fully switch the feature off: `collect` governs whether events **exist** (data minimisation); `audit_logs_enabled` governs whether they are **exposed** (Activity tab + list API). Hiding does not stop collecting; stopping collection does not hide what is already stored. | verified (STRUCTURAL) | `lib/onetime/models/organization/features/secret_activity.rb:28-32` (feature docstring); `etc/defaults/config.defaults.yaml:854-865` (both block comments say so); `apps/api/organizations/logic/organizations/list_secret_activity.rb:58-78` ("Gates exposure only: event collection … is unaffected") |
| N4 | Both off-switches are compared on the **string** form (`.to_s == 'false'` / `!= 'false'`), on backend and bootstrap serializer alike. `false`, `"false"` and an ERB-stringified `'false'` all disable. **Any other falsy-looking value (`0`, `no`, `off`, empty) leaves the feature ON.** | verified (STRUCTURAL) | `apps/api/organizations/logic/organizations/list_secret_activity.rb:65-70`; `lib/onetime/models/organization/features/secret_activity.rb:106-110`; `apps/web/core/views/serializers/config_serializer.rb:261-265`, `:267-272`. The comment at `list_secret_activity.rb:65-69` states why: a strict `== false` would leave the API serving the trail while the UI hid the tab. |
| N5 | Setting `ORGS_AUDIT_LOGS_ENABLED=false` **removes the feature from the product** rather than showing it disabled: the API 403s with "Secret activity is not enabled on this instance", and the frontend **excludes** the Activity tab and panel entirely (unlike the SSO tab, which renders disabled when unentitled). | verified (STRUCTURAL) | `apps/api/organizations/logic/organizations/list_secret_activity.rb:70-78`; `src/apps/workspace/account/settings/OrganizationSettings.vue:128`, `:184`, `:248-252`, `:723` |
| N6 | `features.secret_activity.geo_country_enabled` (`SECRET_ACTIVITY_GEO_COUNTRY_ENABLED`) ships **false** — the inverse polarity of its siblings — and gates **only** the `net_country` attribute, on capture and on display in lockstep. | verified — shipped default | `etc/defaults/config.defaults.yaml:871-877`; `.env.reference:1240-1244`; `apps/api/v2/logic/secrets/access_telemetry.rb:86-100` (`geo_country_enabled?`, `.to_s == 'true'`); `apps/web/core/views/serializers/config_serializer.rb:274-278`; `src/apps/workspace/components/organizations/SecretActivityTable.vue:57-59`, `:150-152` |
| N7 | Collection happens **per organization**, and **every authenticated customer gets an organization whether or not the operator turned organizations on**. `auth_org` lazily creates a default workspace on first entitlement-gated access; `ENABLE_ORGS` only controls whether the org switcher is visible. A stock install with `ENABLE_ORGS` unset is still collecting the trail. | verified (STRUCTURAL) | `lib/onetime/logic/organization_context.rb:63-94` (lazy `CreateDefaultWorkspace`); `etc/defaults/config.defaults.yaml:845-850` ("Organizations always exist under the hood … This flag controls whether users can see and switch between multiple orgs"); `src/apps/workspace/routes/organizations.ts:41-58` (the `/org/:extid/:tab?` route gates on `requiresOrgRole: 'admin'`, **not** on `organizations.enabled`) |
| N8 | The instance's Secret Activity configuration is published to the frontend in the bootstrap payload: `features.organizations.audit_logs_enabled` and `features.secret_activity.{collect_enabled, max_events, geo_country_enabled}`. `max_events` is **re-clamped there** to mirror the backend, so the UI never advertises a cap the backend ignored; the UI uses it to warn when the trail has been trimmed. | verified (STRUCTURAL) | `apps/web/core/views/serializers/config_serializer.rb:119`, `:249-280`, `:283-293` (`resolve_secret_activity_max_events`); `src/utils/features.ts:571-576`, `:595-600`, `:606-623`, `:627-645`; `src/shared/composables/useSecretActivity.ts:65-70` (`isCapped`) |

### N.2 The plan gate — a defect on a published page

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| N9 | Access to the trail is one endpoint, `GET /api/organizations/:extid/secret-activity`, session auth, requiring the `audit_logs` entitlement. `audit_logs` is an **admin-tier role entitlement**, so owners and admins qualify and a plain member does not. | verified (STRUCTURAL) | `apps/api/organizations/routes.txt:18-20`; `apps/api/organizations/logic/organizations/list_secret_activity.rb:47-86` (`verify_authenticated!` … `require_entitlement_in!(@organization, 'audit_logs')`); `lib/onetime/models/organization_membership.rb:80-88` (`ADMIN_ENTITLEMENTS` includes `'audit_logs'` at `:81`), `:102-106` |
| N10 | **On a stock self-hosted instance the plan half of that gate never binds** — `audit_logs` is a member of `STANDALONE_ENTITLEMENTS` — so **role is the whole answer**: any org owner or admin can read the trail; a member cannot. **A self-hosted page must not describe Secret Activity as plan-gated.** | verified (STRUCTURAL) — governing fact §0 | `lib/onetime/models/organization/features/with_plan_entitlements.rb:51` (`manage_teams manage_members audit_logs workspace_branding ip_access_rules` inside `STANDALONE_ENTITLEMENTS`, confirmed by `git grep -n audit_logs 4cbd42149 -- lib/.../with_plan_entitlements.rb`); `lib/onetime/billing_config.rb` `enabled?` false when the file is absent (ledger row 0.1); `lib/onetime/models/organization_membership.rb:80-88` |
| N11 | **In the authoritative operator-supplied catalog, `audit_logs` is defined as an entitlement but granted by NO plan.** It appears in no plan's `entitlements` list — not `team_plus_v1`, not `identity_plus_v1`, not `free_v1`, not the legacy identity plan. With that catalog supplied, a Team Plus organization would **not** hold `audit_logs` and the Activity panel would show the upgrade notice. | verified (OPERATOR-SUPPLIED) — **contradicts the published page** | Operator-supplied catalog `billing.yaml` in the docs repo (sha256 `69a96394920fd1777cf23a9bdedee174648f46b54e13c99a1f27b3cdc0a17501`; gitignored at `.gitignore:28`, tracked in neither repo — cite by key path, never by line). Key path `entitlements.audit_logs` exists (`category: advanced`, description "Access to audit log features"); key path `plans.team_plus_v1.entitlements` lists **19** entitlements — `api_access`, `create_secrets`, `custom_branding`, `custom_domains`, `custom_mail_sender`, `custom_privacy_defaults`, `custom_signin_config`, `custom_signup_validation`, `extended_default_expiration`, `flexible_from_domain`, `homepage_secrets`, `incoming_secrets`, `manage_members`, `manage_org`, `manage_orgs`, `manage_sso`, `manage_teams`, `view_receipt`, `workspace_branding` — and `audit_logs` is **not** among them. Counts and membership re-derived by parsing the file with `yaml.safe_load` (an earlier pass said 21 by eye; the count was wrong, the absence was not). Membership checked independently per plan: `free_v1` 8, `identity` 16, `identity_plus_v1` 15, `team_plus_v1` 19 — `audit_logs` absent from all four. |
| N12 | **DIVERGENCE — state it, do not resolve it, and cite the TRACKED artefact.** A tracked, auto-generated file in the app repo **does** grant `audit_logs` to `team_plus_v1`: `apps/web/billing/docs/plan-definitions.md` lists 20 entitlements for Team Plus, the docs-repo catalog's 19 **plus `audit_logs`**. Its own header declares it auto-generated from `etc/billing.yaml` and treats stale output as a drift bug — so it is evidence that **some** catalog somewhere grants `audit_logs` to Team Plus, and the two artefacts disagree **exactly on the claim `audit-trail.md:16` makes.** Neither is the live hosted authority (see N-g3). | verified — docs-repo catalog OPERATOR-SUPPLIED; the divergent side STRUCTURAL (tracked at the pin) | Docs-repo `billing.yaml` (sha256 above), key path `plans.team_plus_v1.entitlements` (19 names, no `audit_logs`); **against** `apps/web/billing/docs/plan-definitions.md:197-225` (the Team Plus block; `- audit_logs` at `:218`), header at `:1-12`. **CORRECTION — an earlier pass got the provenance wrong.** `etc/billing.yaml` is **not** a symlink to `etc/examples/billing.example.yaml`; it is a symlink to `~/.config/onetimesecret-dev/billing.yaml` → `/Users/d/Projects/_/dotfiles/dotconfig/onetimesecret-dev/billing.yaml`, a developer-local file in a third repo, **unsourced and uncitable — no claim about its contents is made here.** The real `etc/examples/billing.example.yaml` **does** exist at 4cbd42149 (368 lines), and it does **not** support the old claim either: it defines `audit_logs` in `entitlements` but ships only **two** plans, `free_v1` (8 entitlements) and `identity_plus_v1` (11) — there is **no `team_plus_v1` in the example at all**, so the example grants `audit_logs` to no plan, exactly like the docs-repo catalog. |
| N13 | `includes_plan` in the catalog does **not** inherit entitlements — it is a **display string only** ("Includes everything in X"). `team_plus_v1` gains nothing from `includes_plan: identity_plus_v1`, and `identity_plus_v1` gains nothing from `free_v1`. The absence of `audit_logs` from a plan's own list is the whole answer for that plan. | verified (STRUCTURAL) | `apps/web/billing/models/plan.rb:86` (`field :includes_plan  # Plan ID this plan includes (for "Includes everything in X" display)`), `:480-506`; `apps/web/billing/controllers/billing.rb:349-351`, `:1089-1090`; `apps/web/billing/metadata.rb:36`. Catalog key paths `plans.team_plus_v1.includes_plan` = `identity_plus_v1`, `plans.identity_plus_v1.includes_plan` = `free_v1`. |

**Consequence the writing pass must act on:** `src/content/docs/en/organizations/audit-trail.md` frontmatter
`plan: Team Plus` and line 16 ("available on plans that include audit logs (currently Team Plus)") are
hosted-only statements sitting on a page whose Retention note (`:46-48`) addresses self-hosters — and they
are unsupported by the authoritative catalog. Strike the plan claim; say the entitlement is granted
unconditionally on stock self-hosted and that owner/admin vs member is the whole gate.

### N.3 The cap — true, but three qualifications short

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| N14 | **`audit-trail.md:47` is TRUE at the pin.** The key is `features.secret_activity.max_events`, env `SECRET_ACTIVITY_MAX_EVENTS`, shipped value **10000**, applied **per organization** (one capped sorted set per org). | verified — shipped default | `etc/defaults/config.defaults.yaml:860-870` (`max_events: <%= ENV['SECRET_ACTIVITY_MAX_EVENTS'] \|\| 10000 %>`); `.env.reference:624-628`; `lib/onetime/models/organization/features/secret_activity.rb:41` (`DEFAULT_MAX_EVENTS = 10_000`), `:54` (`base.sorted_set :secret_activity_events, max_length: DEFAULT_MAX_EVENTS`) |
| N15 | **Qualification 1 — silent floor and silent fallback.** The configured cap has a floor of **100** and a fallback of **10000**. `SECRET_ACTIVITY_MAX_EVENTS=50` is applied as 100; any non-Integer-able value falls back to 10000. Neither case fails the boot or warns the operator beyond a debug log line. | verified (STRUCTURAL) | `lib/onetime/models/organization/features/secret_activity.rb:43-45` (`MIN_MAX_EVENTS = 100`), `:78-85` (`max = [Integer(max_events), MIN_MAX_EVENTS].max`); `lib/onetime/initializers/configure_secret_activity.rb:32-39` (rescues `ArgumentError`/`TypeError` → `DEFAULT_MAX_EVENTS`, logs at debug) |
| N16 | **Qualification 2 — boot-time only.** The cap mutates the shared Familia field definition at boot, so any organization whose trail accessor already materialised keeps the previous cap. **Changing `SECRET_ACTIVITY_MAX_EVENTS` requires an app restart**; there is no runtime reload and no admin endpoint. | verified (STRUCTURAL) | `lib/onetime/models/organization/features/secret_activity.rb:59-85` ("BOOT-TIME ONLY … Any org whose accessor already ran has memoized a DataType with the old cap and will NOT pick this up"); `lib/onetime/initializers/configure_secret_activity.rb:1-41`; registered at `lib/onetime/initializers.rb:21`. `configure_secret_activity.rb:23-24` records that it mutates `Familia::RelatedFieldDefinition.opts`, not a public gem API (upstream familia#390) — shipped and working, but on a private seam. |
| N17 | **Qualification 3 — lowering the cap DESTROYS data, lazily.** The excess oldest events are **deleted, not hidden**, on each organization's **next recorded event**. There is no sweep that trims quiescent orgs, and `collect: false` prevents the trim from ever firing (no writes, no trim). | verified (STRUCTURAL) | `.env.reference:624-628` verbatim: "LOWERING this value DELETES (not hides) the oldest events past the new cap in each org's trail, applied lazily on that org's next recorded event. Setting SECRET_ACTIVITY_COLLECT=false does not trigger the trim." A retroactive sweep exists in the gem (familia 2.12.0 `lib/familia/features/housekeeping/enforce_collection_caps.rb:9-11`) but **`git grep -n enforce_collection_caps 4cbd42149 -- lib apps bin` returns no app call site**, and no `Onetime::Organization.chore` registers it. |
| N18 | When the cap is hit the trail does **not** refuse new events — it **drops the oldest**. Score is epoch seconds; write and trim happen atomically in one MULTI (`ZREMRANGEBYRANK 0, -(max+1)`), keeping the `max_events` newest members. `audit-trail.md:44` is correct on this. | verified (STRUCTURAL) — trim semantics from an external gem | `lib/onetime/models/organization/features/secret_activity.rb:22-24`, `:118-119` (`secret_activity_events.add(event, at.to_f)`, comment "max_length on the sorted set trims atomically with the write"); familia **2.12.0** pinned at `Gemfile.lock:92`, `lib/familia/data_type/types/sorted_set.rb:9-10`, `:806-824` — **the gem is in neither repo** |
| N19 | The trail has **no time-based expiry**. The cap is the only bound; the org sorted set carries no TTL because organizations are permanent records. Nothing ages out. `audit-trail.md:44` is correct. | verified (STRUCTURAL) | `lib/onetime/models/organization/features/secret_activity.rb:33` ("No TTL: organizations are permanent records; the cap is the bound"); `lib/onetime/models/organization.rb:42-58` (`feature :secret_activity` at `:53`, no `default_expiration`); `docs/architecture/audit-logging.md:195`. Distinct from the per-**receipt** access timeline, which inherits the receipt's TTL (`lib/onetime/models/receipt/features/access_timeline.rb:45-48`, `:93-99`). |
| N20 | The cap is **instance-wide**, not per-org-configurable. One value applies identically to every organization on the install; an operator cannot raise it for one org. "Per organization" describes the **scope of the count**, not the granularity of the setting. | verified (STRUCTURAL) | `lib/onetime/models/organization/features/secret_activity.rb:54`, `:59-85` (the cap is a single shared field definition); `lib/onetime/initializers/configure_secret_activity.rb:1-41` (one boot-time application) |

### N.4 What is stored — and the privacy consequence of `collect: true`

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| N21 | One event stores: `kind`, `at` (epoch float), `nonce`, `receipt` shortid, `secret` shortid, `actor` (`creator\|authenticated_other\|anonymous\|system\|unknown`), `actor_id` (the **full** customer objid, authenticated actors only), plus `domain_id` (8-char) and `domain` (public FQDN) for custom-domain shares, plus — **on fetch events** — `net_ip_partial`, `net_ip_hash`, `net_ua_partial`, and `net_country` when geo is opted in. | verified (STRUCTURAL) | `lib/onetime/models/organization/features/secret_activity.rb:112-119`; `lib/onetime/models/receipt/features/access_timeline.rb:131-168` (domain attrs `:140-149`; canonical shortids `:165-167`); `lib/onetime/security/request_context.rb:66-69`, `:101-121`; `src/schemas/api/organizations/responses/secret-activity.ts:56-68` |
| N22 | **THE PRIVACY CONSEQUENCE OF `collect: true`.** Every fetch of a secret link — **including by an anonymous recipient who is not a user of the instance** — writes a **masked IP** (last IPv4 octet zeroed / last 80 IPv6 bits), a **version-stripped truncated User-Agent**, and a **keyed HMAC-SHA256 correlation token** into the organization's permanent trail, readable by that org's owners and admins. The token is keyed with the app's **global secret** (`site.secret`), which does not rotate, so **the same /24 always yields the same token for the life of the install**. | verified (STRUCTURAL) | `apps/api/v2/logic/secrets/access_telemetry.rb:38-84` (`request_network_context` merged into every fetch event); `lib/onetime/security/request_context.rb:15-48` (privacy stance and the /24 correlation known-issue), `:101-121` (`capture`), `:123-136` (`default_key` = `OT.global_secret`, deliberately **not** Otto's daily-rotating key); `lib/onetime/models/receipt/features/access_timeline.rb:101-107` (fan-out of `context` to the org trail) |
| N23 | Raw IP and full User-Agent are **never** stored, and re-masking is unconditional and idempotent — the design is careful. **The operator-facing point is not that it leaks; it is that it EXISTS BY DEFAULT, forever, about third parties**, on an install where the operator never enabled organizations and made no decision to collect anything. Turn collection off with `SECRET_ACTIVITY_COLLECT=false`. | verified (STRUCTURAL) | `lib/onetime/security/request_context.rb:15-48`, `:101-121`; combined with N1 (ships true), N7 (orgs auto-created), N19 (no TTL) and N-g5 (no purge path established) |
| N24 | The UI table renders **five** columns — Event, Secret, Actor, Country (itself gated), When. `net_ip_partial`, `net_ip_hash` and `net_ua_partial` are **never displayed**, yet they are returned verbatim in the API response body. An operator who audits the feature by looking at the screen will underestimate what is retained. | verified (STRUCTURAL) | `src/apps/workspace/components/organizations/SecretActivityTable.vue:318-340` (the five `<th>`s); `apps/api/organizations/logic/organizations/list_secret_activity.rb:95-108` (`records: events` — raw event hashes, unfiltered); `src/schemas/api/organizations/responses/secret-activity.ts:56-68` (`z.looseObject` declaring the `net_*` fields present on the wire) |
| N25 | **Emails are structurally excluded from the stored trail.** An `actor_id` containing `@` is dropped and logged; `anonymous` and `system` events carry no `actor_id` at all; identity (email/extid) is joined in at **read time** from active org membership only, and actors that no longer resolve render as the bare objid. This supports `audit-trail.md:38` — but note `actor_id` is deliberately the **full** customer objid. | verified (STRUCTURAL) | `lib/onetime/models/receipt/features/access_timeline.rb:174-220` (`normalize_actor_attrs`), `:155-160`; `apps/api/organizations/logic/organizations/list_secret_activity.rb:112-135` (`resolve_actors`, `next unless membership&.active?`) |

### N.5 Where the trail is incomplete

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| N26 | **Only the v2 API links a receipt to an organization.** `receipt.org_id` is stamped in exactly one place, v2-only. Secrets created through the **v1 API never get an `org_id`**, so they produce no "created" event **and** no later lifecycle events — the fan-out no-ops whenever `org_id` is blank. | verified (STRUCTURAL) | `apps/api/v2/logic/secrets/base_secret_action.rb:483-502` (`index_receipt_to_organization`, the sole `receipt.org_id =` assignment — `git grep -n org_id 4cbd42149 -- apps lib/onetime/logic` returns only `:474` and `:489`); `lib/onetime/models/receipt/features/access_timeline.rb:131-133` (`return if organization.nil?`); `git grep -n 'record_org_secret_activity_event\|record_access_event\|org_id' 4cbd42149 -- apps/api/v1/logic/secrets/` returns **nothing** across all 8 v1 secret logic files |
| N27 | **Anonymous secret creation is never recorded.** `index_receipt_to_organization` sits inside an `unless anonymous_user?` guard, so guest-created secrets have no org context and contribute nothing to any trail — including their later reveal or burn. | verified (STRUCTURAL) | `apps/api/v2/logic/secrets/base_secret_action.rb:461-481` (`:469` `unless anonymous_user?`; `:474` `scope_fields << :org_id if index_receipt_to_organization`) |
| N28 | **One hammered link cannot evict an organization's history** — but it also stops being counted. Once a single receipt's own timeline saturates at **100** access events, that receipt's further **fetch** events stop fanning out to the org trail. Lifecycle transitions (revealed/burned/expired/orphaned) are unaffected; they call the org fan-out directly. | verified (STRUCTURAL) | `lib/onetime/models/receipt/features/access_timeline.rb:29-30` (`ACCESS_EVENTS_MAX = 100`), `:77-84` (`saturated` sampled before the append), `:101-107` (`unless saturated`) |
| N29 | Lifecycle events reach the trail from the **model** layer, not from an API version, so `revealed`, `burned`, `expired`, `orphaned` and `reveal_failed_undecryptable` are recorded from any caller — **but still only for receipts that carry an `org_id`**. | verified (STRUCTURAL) | `lib/onetime/models/receipt/features/deprecated_fields.rb:177` (revealed), `:211` (orphaned), `:241` (burned), `:277` (expired); `lib/onetime/models/secret/features/secret_state_management.rb:197-200` (reveal_failed_undecryptable) |
| N30 | Recording is **best-effort and unconditionally non-fatal**: an append failure is logged and swallowed, never breaking secret creation, reads, or state transitions. There is no CAS and no retry, so **a trail gap is possible and invisible**. | verified (STRUCTURAL) | `lib/onetime/models/organization/features/secret_activity.rb:19-21` ("a failed append must never break the calling path"); `lib/onetime/models/receipt/features/access_timeline.rb:169-172` (rescue → `OT.le` → nil); `apps/api/v2/logic/secrets/access_telemetry.rb:22-24`, `:53-55` |

**30 rows (N1–N30).**

### N.6 Gaps — where the evidence runs out

1. **N-g1.** **No runtime verification of anything above.** Everything was read from source at `4cbd42149` (plus the resolved familia 2.12.0 gem and the operator-supplied catalog). The app was not booted, no page rendered, no Redis key inspected. The two claims that would most benefit from a runtime check are the **atomic write+trim** (N18) and the **actual on-the-wire presence of `net_ip_partial`** in a real API response (N24).
2. **N-g2.** Could **not** establish whether the `features` block of the bootstrap payload is served to **anonymous** visitors. `build_feature_flags` runs in `config_serializer.rb:119`, but the safe-site whitelist path was not traced for this key (contrast ledger row A39, which traced it for `site.interface`). **Do not state either way** whether `secret_activity.max_events` / `collect_enabled` reach logged-out visitors.
3. **N-g3.** Could **not** establish what the **hosted** service actually grants. The live catalog is pushed to and pulled from Stripe product metadata (`apps/web/billing/operations/catalog/data_extractor.rb:55` reads `ots_entitlements` from Stripe products), so the YAML is a **push source, not necessarily the running truth**. Which plan grants `audit_logs` on onetimesecret.com today is **unestablished** — the two YAML copies disagree (N12) and neither is the live authority.
4. **N-g4.** Could **not** verify `audit-trail.md:18` ("a plain member on a qualifying plan is told the tab is for owners and admins"). The route meta is `requiresOrgRole: 'admin'` (`src/apps/workspace/routes/organizations.ts:48`), which appears to block a plain member from the Organization Settings page **entirely** rather than showing a message on the Activity tab. `handleOrgRoleRequirement` was not traced. **Treat line 18's second clause as unverified.**
5. **N-g5.** Could **not** establish any **export or purge** path for the trail. No export endpoint, no `bin/ots` command, no per-org purge was found. `apps/web/auth/operations/close_account.rb` matches the token `audit_logs` but was not read, so whether account closure or a GDPR erasure request removes an individual's `actor_id` and `net_*` rows from an org's trail is **unknown**. This matters because the store has no TTL (N19).
6. **N-g6.** Could **not** establish whether a colonel/admin has an out-of-band read path to another org's trail (compare ledger row A36). No colonel route for secret-activity appears in `apps/api/organizations/routes.txt`, but `apps/api/colonel/routes.txt` was not searched for one.
7. **N-g7.** Familia's trim semantics (N18) were read from the resolved gem **outside both repos** (`familia-2.12.0`). The version was matched against `Gemfile.lock:92` but not otherwise pinned; a reader on a different machine may resolve differently.
8. **N-g8.** The i18n bundles for `web.organizations.audit.*` were not checked, so **what the Activity tab literally says** to an unentitled or capped user is not established — only that the strings are keyed.

### N.7 Hazards — do not write these wrong

1. **N-h1. PUBLISHED PLAN CLAIM UNSUPPORTED BY THE AUTHORITATIVE CATALOG.** `audit-trail.md` frontmatter `plan: Team Plus` and line 16 assert Team Plus grants audit logs. The docs-repo catalog (sha256 `69a9639…`) grants `audit_logs` to **no plan**, and neither does the shipped example `etc/examples/billing.example.yaml` (which has no `team_plus_v1` at all); the tracked auto-generated `apps/web/billing/docs/plan-definitions.md:218` **does** grant it to `team_plus_v1` (N12). **Do not paper the divergence over in prose, and do not state the plan gate on a self-hosted page at all** — governing fact §0 already forbids it. Say: granted unconditionally on stock self-hosted; owner/admin vs member is the whole gate.
2. **N-h2. A DEAD POINTER, NOT A FALSE FACT.** `audit-trail.md:47` links to `/en/self-hosting/configuration` for a setting that page does not document. Fixing the link **without documenting `SECRET_ACTIVITY_MAX_EVENTS` on the target** leaves the promise unkept. Document the key; keep the sentence.
3. **N-h3. THE CAP IS INSTANCE-WIDE, NOT PER-ORG-CONFIGURABLE.** "Per organization" in the published sentence describes the **scope of the count**, and is easy to misread as the **granularity of the setting**. Say both.
4. **N-h4. LOWERING `SECRET_ACTIVITY_MAX_EVENTS` SILENTLY DESTROYS DATA.** No warning, no dry run, no confirmation, and the deletion is **lazy** — it happens on each org's next recorded event, so the operator sees nothing at the moment of the change and the loss surfaces later. An operator tuning memory usage will not expect an audit trail to be truncated by an env-var edit.
5. **N-h5. DEFAULT-ON COLLECTION OF THIRD-PARTY NETWORK IDENTIFIERS.** On a stock install, with organizations never enabled, every authenticated user has an auto-created org, and every open of their links by an anonymous recipient writes a masked IP, a stripped UA and a stable HMAC correlation token to a store with **no TTL and no established purge path**. The operator made no decision to do this. **Any self-hosting privacy or GDPR page that omits `SECRET_ACTIVITY_COLLECT` is misleading by omission.**
6. **N-h6. THE `net_*` FIELDS ARE STORED AND API-RETURNED BUT NEVER SHOWN.** An operator auditing the feature from the screen will conclude only Event/Secret/Actor/Country/When are retained. Their DPO would need the API response or the Redis key to see otherwise.
7. **N-h7.** `net_ip_hash` is keyed with the app's **global secret** and deliberately does not rotate, so the correlation token is stable for the life of the install and outlives any individual event. `request_context.rb:39-48` records this as temporary pending otto#192, at which point correlation **upgrades from /24 to per-host** — a future privacy regression relative to today, flagged in shipped code. **Do not describe the current masking as a permanent guarantee.**
8. **N-h8. DO NOT SOURCE ANY PLAN CLAIM FROM ADR-021.** Its header block names "`audit_logs` entitlement, `multi_team_v1` plan gate" (`adr-021…md:18`). **No `multi_team_v1` plan exists** in the authoritative catalog (plans are `free_v1`, legacy `identity`, `identity_plus_v1`, `team_plus_v1`). The ADR's plan reference is stale.
9. **N-h9.** ADR-021's context table (`:33`) states Secret Activity has **no** actor attribution. That is contradicted by shipped code **and by the ADR's own 2026-08-02 status note at `:37-43`**. Anyone reading only the table would document the feature wrongly.
10. **N-h10. THE TRAIL IS NOT A COMPLETE RECORD** and must not be described as one: v1-API-created secrets are absent entirely (N26), anonymous-created secrets are absent entirely (N27), and any single receipt stops contributing fetch events after 100 of them (N28). `audit-trail.md` does not mention this and would be wrong to promise a complete access history.
11. **N-h11.** Turning off **exposure** (`ORGS_AUDIT_LOGS_ENABLED=false`) does **not** delete or stop anything — the events keep accruing invisibly. An operator who wants data minimisation needs `SECRET_ACTIVITY_COLLECT=false`; one who wants both needs both (N3).

### N.8 Hosted vs self-hosted

Nothing about Secret Activity is hosted-only in code: the same collection, the same cap, the same endpoint
and the same role gate run everywhere. The difference is entirely the **plan half of the entitlement
check**. On the hosted service billing is on and `audit_logs` comes from the plan catalog — which plan, this
research could not establish (N-g3), and the two YAML copies disagree (N12). On a stock self-hosted
instance billing is off, `STANDALONE_ENTITLEMENTS` grants `audit_logs` unconditionally, and **role is the
whole answer**. Write the self-hosting material for an operator who has already been collecting this data
since first boot without being told: the three env vars on `/en/self-hosting/configuration`, and a privacy
paragraph saying the trail ships ON, covers every user's auto-created organization even with `ENABLE_ORGS`
off, records masked network identifiers about anonymous recipients, never expires, and is switched off with
`SECRET_ACTIVITY_COLLECT=false` (plus `ORGS_AUDIT_LOGS_ENABLED=false` to also hide what is already stored).

---

## O. `LINK_DOMAINS` / `DEFAULT_DOMAIN` — which hostname a generated secret link carries

> **PLACEMENT RECOMMENDATION — READ FIRST. This is not a Features page either.**
>
> The material is **install-wide config-key shaped**, so its natural home is the **CONFIGURE group**
> (`/en/self-hosting/configuration`, or a short dedicated page), with a cross-link from
> `features/custom-domains`. **The researcher recommended a page SHAPE but named no group**, so the
> group is recorded here as a **docs-owner decision, not as settled** — see §M item 10.
>
> **Write the page around the DECISION TABLE, not around the two keys.** The operator's question is
> *"what hostname does my link carry"*, and the answer is one rule plus one lookup:
>
> ```
> HOST   = (features.domains.enabled AND receipt.share_domain non-empty) ? receipt.share_domain : site.host
> SCHEME = https:// unless site.ssl is explicitly false
> ```
>
> and `receipt.share_domain` is fixed at creation by the table in **O.2**.
>
> **DO NOT SHIP THE PAGE AHEAD OF A DECISION ON O10/O11.** The central finding is that
> `DEFAULT_DOMAIN` **does not put its host into a generated link**, contradicting three shipped
> comments. If that is judged a bug and gets fixed, the page's core table changes. It rests on an
> exhaustive grep, **not an observation** — get the runtime check done first (§M item 11).

### O.1 The two keys as shipped

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| O1 | `features.domains.default` (env `DEFAULT_DOMAIN`) ships **unset**. Both an unset env var **and an empty one** (`DEFAULT_DOMAIN=`, which is what `.env.reference` ships) render as YAML **nil**, because the ERB emits an empty string that YAML reads as nil. | verified — shipped default | `etc/defaults/config.defaults.yaml:776-778` (`default: <%= ENV['DEFAULT_DOMAIN'] \|\| nil %>`); `.env.reference:868-869`. The `\|\| nil` idiom collapses unset and set-but-empty — stated as a deliberate contrast with `link_domains` at `config.defaults.yaml:804-806`. |
| O2 | `features.domains.link_domains` (env `LINK_DOMAINS`) ships **unset** and is **deliberately ABSENT from `Config::DEFAULTS`**. Adding a default there would break the feature: `deep_merge` has a `v2.nil? -> v1` arm, so a default would resolve an unset `LINK_DOMAINS` back to it and make the **set-but-empty** case undetectable. | verified — shipped default | `etc/defaults/config.defaults.yaml:810` (`link_domains: <%= ENV['LINK_DOMAINS']&.split(',')&.map(&:strip) %>`), `:804-809`; `lib/onetime/config.rb:138-143` (the explicit "NO 'link_domains' KEY HERE" comment inside `DEFAULTS['features']['domains']`); `.env.reference:871-883` (the line ships **commented out**, and says why). The `&.` chain is what keeps nil (unset) and `[]` (set-but-empty) distinguishable through ERB+YAML. |
| O3 | `LINK_DOMAINS` has exactly **three states**: **unset** — the picker offers the canonical domain and every pre-existing install is unchanged; **set** — the picker offers exactly the listed hosts, and the canonical domain appears only if listed; **set-but-empty** — **the process refuses to boot.** | verified (STRUCTURAL) | `etc/defaults/config.defaults.yaml:785-791`; `lib/onetime/utils/canonical_hosts.rb:119-137` (`link_pool`: nil → `anchor_hosts.first(1)`, otherwise the configured list verbatim); `lib/onetime/config.rb:1000-1008` (the same three-way table restated over concrete inputs) |
| O4 | **First boot-fatal condition, exact.** `Onetime::Config.validate_link_domains!(raw)` returns immediately when `raw` is nil. Otherwise it strips every entry and rejects the empty ones; if **nothing** is left it raises `Onetime::ConfigError`: *"LINK_DOMAINS (features.domains.link_domains) is set but names no host. It lists the domains offered in the link picker and cannot be blank. List at least one host (LINK_DOMAINS=links.example.com), or unset LINK_DOMAINS entirely to offer the canonical domain."* This is the `LINK_DOMAINS=` and `LINK_DOMAINS="  "` case. | verified (STRUCTURAL) | `lib/onetime/config.rb:1035-1045`. Verbatim message read at the pin; the second sentence is one string built by `\` continuation, so it appears on one line at runtime. |
| O5 | **Second boot-fatal condition.** A `LINK_DOMAINS` that names hosts but **none of them parse** raises `Onetime::ConfigError`: *"LINK_DOMAINS (features.domains.link_domains) [\"…\"] names no parseable domain, so the link picker would have nothing to offer. Check for typos and private/internal hostnames (a host must have a public suffix, e.g. links.example.com). Unset LINK_DOMAINS entirely to offer the canonical domain."* The stripped entry list is echoed via `#inspect` so the typo is visible. | verified (STRUCTURAL) | `lib/onetime/config.rb:1047-1053`. `LINK_DOMAINS=links.internal` is the canonical example — a private hostname with no public suffix. |
| O6 | Parseability at boot is judged by **exactly the test the request-classification middleware applies**: `Onetime::Utils::DomainParser.extract_hostname(host)`, then `PublicSuffix.valid?(hostname, default_rule: nil)`. Any raised error counts as unparseable. **So a host that boots is a host the middleware will serve.** | verified (STRUCTURAL) | `lib/onetime/config.rb:1056-1070`; the contract is asserted at `:1026-1029` |
| O7 | A `LINK_DOMAINS` list that **MIXES** parseable and unparseable hosts **boots successfully**. The bad entry is dropped and logged at error level by `parse_canonical_set` ("[middleware] DomainStrategy: skipping unparseable canonical host: … (remaining canonical hosts unaffected)"), and the pool keeps the survivors. | verified (STRUCTURAL) | `lib/onetime/config.rb:1047` (`return if listed.any? { \|host\| parseable_link_domain?(host) }`); `lib/onetime/middleware/domain_strategy.rb:618-635`; `etc/defaults/config.defaults.yaml:797-798` |
| O8 | **The boot guard fires regardless of `features.domains.enabled`.** It runs inside `Config.raise_concerns`, which `after_load` calls **before any feature gating**, so `DOMAINS_ENABLED=false` does **not** exempt a blank or unparseable `LINK_DOMAINS` from failing the boot. | verified (STRUCTURAL) | `lib/onetime/config.rb:436` (`raise_concerns(conf)` inside `after_load`), `:931`, `:990-993` (the call site plus the comment stating the deliberate placement). Deliberately **not** placed in the `ConfigureDomains` initializer, whose blanket rescue would swallow it — `lib/onetime/initializers/configure_domains.rb:95-97` says so. |

### O.2 The decision — what hostname a link actually carries

**This is the page's central table.** v2/v3 semantics; v1 differs only in the branded-host +
authenticated row (O17).

| Request served on | Caller | `share_domain` in POST | Stored | Link host |
|---|---|---|---|---|
| canonical host | any | absent | nil | `site.host` |
| canonical host | any | `= site.host` or `= DEFAULT_DOMAIN` | nil (dropped as anchor) | `site.host` |
| canonical host | any | `= LINK_DOMAINS` member, domains **ON** | that member | **that member** |
| canonical host | anonymous | a registered custom domain | — | **422** "You do not have permission to use domain" |
| canonical host | authenticated + permitted | a registered custom domain | that domain | that domain |
| canonical host | any | anything else | — | **422** "Unknown domain: `<host>`" |
| branded custom domain | anonymous | anything | `display_domain` | the branded host |
| branded custom domain | authenticated | absent | `display_domain` | the branded host |
| branded custom domain | authenticated | `= LINK_DOMAINS` member | that member (**v1:** branded host) | that member (**v1:** branded host) |
| any | any | any, with `DOMAINS_ENABLED=false` | non-anchors 422; anchors dropped | `site.host` |

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| O9 | **The hostname a generated link carries is: `receipt.share_domain` when `features.domains.enabled` is true and that field is non-empty; otherwise `site.host`.** The scheme is `https://` unless `site.ssl` is explicitly `false`. This single rule governs `share_url`, `receipt_url`/`metadata_url` and `burn_url` on **every** read path. | verified (STRUCTURAL) | `apps/api/v2/logic/secrets/show_receipt.rb:231-241`, `:360-370`; `burn_secret.rb:151-175`; `show_secret.rb:203-210`; `reveal_secret.rb:229-240`; `apps/api/v2/logic/helpers/uris.rb:21-45` (`site_host` = `Onetime.conf['site']['host']`, `base_scheme`, `build_url`); v1 twins at `apps/api/v1/logic/secrets/show_receipt.rb:168-180`, `:273-278` and `burn_secret.rb:84-100`. **v3 inherits**: every `apps/api/v3/logic/secrets.rb` class subclasses its V2 counterpart (`:51,69,89,139,190,207`) and v3 contains no `share_domain` or `share_url` code of its own. |
| O10 | **`features.domains.default` / `DEFAULT_DOMAIN` is NEVER used to build a link URL.** No URL builder anywhere reads that key: the only host sources are `receipt.share_domain` and `site.host`. **Setting `DEFAULT_DOMAIN` on a split deployment (`site.host=app.example.com`, `DEFAULT_DOMAIN=secrets.example.com`) does NOT make links come out on `secrets.example.com`.** | verified (absence, exhaustive) — **THE ROW THE PAGE EXISTS FOR** | `git grep -n "'domains', 'default'\|domains_config\['default'\]" 4cbd42149 -- lib apps src`: the only non-comment reads are `lib/onetime/utils/canonical_hosts.rb:141-143`, `lib/onetime/middleware/domain_strategy.rb:527`, and `lib/onetime/initializers/configure_domains.rb:46-49` — a host-set derivation, a middleware classification input, and two advisory boot warnings. Nothing writes `site.host` either (`git grep "\['site'\]\['host'\] ="` → no hits). Settles the email path too: `lib/onetime/mail/views/base.rb:196-208`, `:466-474` build `site_baseuri` from `site.host`. |
| O11 | **The shipped comment on the key is WRONG.** `etc/defaults/config.defaults.yaml:776-777` reads "The default domain used for link URLs. When not set or empty, site.host is used." **The second sentence is true; the first is not** — when it IS set, `site.host` is still what a link uses. | verified (STRUCTURAL, contradicts a shipped comment) | `etc/defaults/config.defaults.yaml:776-778` versus `apps/api/v2/logic/secrets/show_receipt.rb:231-239` and `apps/api/v2/logic/helpers/uris.rb:29-31`. **A docs page that paraphrases this comment will be wrong.** |
| O12 | **`DEFAULT_DOMAIN` is an ANCHOR host, and `process_share_domain` silently DISCARDS a requested `share_domain` that equals an anchor.** So on a split deployment the picker offers `DEFAULT_DOMAIN` (it is `canonical_domain`), the user selects it, the server nulls it out, and **the link is anchored on `site.host` — the opposite of what the operator configured.** No exception, no warning to the user; only a debug log line. | verified (STRUCTURAL) | `apps/api/v2/logic/secrets/base_secret_action.rb:255-279` (`return` on `default_domain?`, logged only as `result: :default_domain_skipped`); `lib/onetime/models/custom_domain.rb:1077-1085` (`default_domain?` tests `anchor_hosts`); `lib/onetime/utils/canonical_hosts.rb:99-117` (anchors = `features.domains.default` + `site.host`); v1 twin at `apps/api/v1/logic/secrets/base_secret_action.rb:232-247`. The in-code comment at `custom_domain.rb:1064-1076` **anticipates precisely this failure shape** for link-pool hosts and forbids adding them to the anchor set — but does not notice that `features.domains.default` is itself in that set and suffers it. |
| O13 | **`LINK_DOMAINS` members are the only configured hosts that actually change a link's hostname.** A pool member is not an anchor, so `process_share_domain` keeps it, `validate_domain_access` admits it via `link_pool_host?` **without any `CustomDomain` record**, and it is persisted onto both the secret and the receipt — and therefore appears in the URL. | verified (STRUCTURAL) | `base_secret_action.rb:584-632` (`link_pool_host?` and the rationale for admitting a record-less host), `:542-560` (early return on a pool member), `:446` (`domain: share_domain` into `spawn_pair`); `lib/onetime/models/receipt.rb:272-308`; `lib/onetime/utils/canonical_hosts.rb:99-110` (`anchor_hosts` passes `link_hosts: nil`) |
| O14 | **`LINK_DOMAINS` does nothing at all unless `DOMAINS_ENABLED=true`** — except still failing the boot when blank or unparseable (O8). With domains disabled the middleware passes `link_hosts: nil`, the resolved pool is `[site.host]`, `link_pool_host?` returns false for every configured member, and posting one as `share_domain` falls through to the `CustomDomain` lookup and **422s with `Unknown domain: <host>`**. | verified (STRUCTURAL) | `lib/onetime/middleware/domain_strategy.rb:527-533`, `:696-697`, `:732-742`; `base_secret_action.rb:542-560`; v1 twin at `apps/api/v1/logic/secrets/base_secret_action.rb:489-500`. **A key that is validated fatally yet has no effect is genuinely surprising and must be stated, not implied.** |
| O15 | Every `LINK_DOMAINS` entry joins the **canonical host set**, so requests to those hosts classify `:canonical` and **serve the app** instead of being rejected as `:invalid`. **This is not a UI-only setting** — it changes which hostnames the deployment answers on. | verified (STRUCTURAL) | `lib/onetime/middleware/domain_strategy.rb:535-551`, `:578`; `lib/onetime/utils/canonical_hosts.rb:9-53`, `:65-77`; `etc/defaults/config.defaults.yaml:800-802` |
| O16 | A pool member participates in classification by **exact match only**. The `www.` tolerance and the peer/parent/subdomain sweeps run over the **ANCHOR** set (`site.host`, `features.domains.default`) alone, so listing `go.acme.com` does **not** make `www.acme.com` canonical and does not steal a tenant's registered `www.acme.com`. | verified (STRUCTURAL) | `domain_strategy.rb:264-296` (the rationale), `:298-345` (`choose_strategy` with a separate `anchor_domains` sweep set), `:637-668` (`select_anchor_domains`); `lib/onetime/models/custom_domain.rb:1087-1100`. `changelog.d/20260808_210000_claude_4063_link_domains_config.rst` records this as a **FIX**, i.e. earlier builds did steal it. |
| O17 | On a **tenant-branded custom domain** the link is anchored on the branded host, with one exception **that differs by API version**. **v2/v3:** `display_domain` wins only for **ANONYMOUS** callers; an authenticated caller's explicit `share_domain` (e.g. a link-pool member) is honoured. **v1:** `display_domain` wins **unconditionally**, so an authenticated user's selection is silently discarded. | verified (STRUCTURAL) | `apps/api/v2/logic/secrets/base_secret_action.rb:524-540` versus `apps/api/v1/logic/secrets/base_secret_action.rb:475-483`. **A real v1/v2 behavioural divergence, not a refactor.** The frontend knows about it: `src/shared/composables/useDomainContext.ts:113-116`. |
| O18 | An **anonymous** caller may only name a `share_domain` that is a resolved link-pool member or the branded host actually serving the request. Anything else raises a form error `You do not have permission to use domain: <host>` (HTTP **422**). | verified (STRUCTURAL) | `base_secret_action.rb:314-388` (truth table at `:321-334`, `validate_anonymous_share_domain` at `:371-388`); v1 twin at `apps/api/v1/logic/secrets/base_secret_action.rb:289-346` |

### O.3 Exposure, asymmetries and the wrong comments

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| O19 | `link_domains` is emitted into the bootstrap payload **unconditionally** — **not** gated on `features.domains.enabled` the way `custom_domains` is — as `Array<String>`, never null. **The pool is therefore visible to any anonymous visitor who reads the page source.** | verified (STRUCTURAL) | `apps/web/core/views/serializers/domain_serializer.rb:28-41` (with the comment stating the deliberate ungating), `:57-75`. Intended — the picker needs a pool in every mode — but it means an operator's internal link hosts are public, **and the canonical host `LINK_DOMAINS` exists to HIDE is also still on the wire as `canonical_domain`.** |
| O20 | `Utils::CanonicalHosts` reads `features.domains.default` and `features.domains.link_domains` straight from `OT.conf` **with no `features.domains.enabled` gate**. The middleware gates them explicitly at its own call site; `CustomDomain.default_domain?` and `CustomDomain.canonical_hosts` do not. **Consequence:** with `DOMAINS_ENABLED=false` but `DEFAULT_DOMAIN` set, a requested `share_domain` equal to `DEFAULT_DOMAIN` is **still discarded as an anchor**, and domain registration still treats `LINK_DOMAINS` members as canonical collisions. | verified (STRUCTURAL) | `lib/onetime/utils/canonical_hosts.rb:139-151` (private `config_default_host` / `config_link_hosts`, ungated) versus `domain_strategy.rb:527-533` (gated); `lib/onetime/models/custom_domain.rb:1159-1184`. **Asymmetry, not obviously intended.** Invisible on a stock install where both keys are unset. |
| O21 | Two boot-time **ADVISORY** warnings exist and **neither fails boot**: pointing `features.domains.default` at an already-registered custom domain, and listing an already-registered custom domain in `LINK_DOMAINS`. In both cases that host classifies `:canonical` ahead of the custom-domain lookup, so **the tenant's per-domain brand and sign-in configuration silently stops applying.** Both checks are **skipped entirely when `DOMAINS_ENABLED=false`**, and both are wrapped in a blanket rescue that downgrades any failure to a debug line. | verified (STRUCTURAL) | `lib/onetime/initializers/configure_domains.rb:23-50` (early return on disabled), `:52-73` (`warn_if_default_shadows_custom_domain`), `:75-127` (`warn_if_link_pool_shadows_custom_domains`). **Log-only.** An operator who does not read boot logs gets no signal that a tenant's branding has stopped working. |
| O22 | **Neither key is entitlement-gated or plan-gated in any way.** The operator-supplied catalog contains no `link_domains` or `default_domain` entitlement; its `custom_domains` entitlement and the per-plan `custom_domains` limit govern how many `CustomDomain` records a tenant **ORG** may register — **a different mechanism from the install-wide link pool.** | verified — operator-supplied + STRUCTURAL | operator-supplied catalog, key paths `entitlements.custom_domains` (category `infrastructure`, "Can configure custom domains") and `plans.*.limits.custom_domains` (1 on the free plan, -1 elsewhere); absence of any link-domain key verified by parsing the catalog and searching every key path for `link_domains`/`default_domain` (zero matches; the only domain-bearing key paths are the `custom_domains` entitlement, the per-plan `limits.custom_domains`, and the unrelated `flexible_from_domain` entitlement). Per-plan `limits.custom_domains`: `free_v1` 1, `identity` -1, `identity_plus_v1` -1, `team_plus_v1` -1. **The earlier "divergence checked and benign — the 420-line app-repo copy carries the SAME values at an 18-line offset" note is STRUCK**: that file is a developer-local symlink target outside both repos, unsourced and uncitable (P-h11), and no comparison against it is asserted. Per governing fact 0.1, **none of this binds on a stock self-hosted install anyway.** |
| O23 | The comment at `apps/api/v2/logic/secrets/base_secret_action.rb:62` — `share_domain: share_domain, # we return the value, but don't save it` — **is false.** `create_secret_pair` passes `domain: share_domain` into `Receipt.spawn_pair`, which **persists it onto both the Secret and the Receipt.** | verified (STRUCTURAL, contradicts a shipped comment) | `base_secret_action.rb:55-70`, `:446`; `lib/onetime/models/receipt.rb:272-308` (`secret.share_domain = domain` at `:292`, `receipt.share_domain = domain` at `:306`). Harmless on its own, **but it is the field the whole link-hostname decision hangs on**, so a writer trusting the comment would describe the feature backwards. |
| O24 | The frontend comment at `src/shared/composables/useDomainContext.ts:133-136` — "the server reads an empty `share_domain` as 'no request' and anchors the link on whichever host served the page" — **is only true for a branded custom domain.** On a canonical-set host (`site.host`, `DEFAULT_DOMAIN`, or a `LINK_DOMAINS` member) with an empty `share_domain`, the server anchors on **`site.host`** no matter which of those hosts served the page. | verified (STRUCTURAL, contradicts a shipped comment) | `useDomainContext.ts:124-141` versus `base_secret_action.rb:535-540` and `show_receipt.rb:231-239`. **Same family as the `config.defaults.yaml:776-777` error: three separate comments in three languages all assume the link follows the picker/served host, and the URL builder does not.** |

**24 rows.**

### O.4 Gaps — where the evidence runs out

1. **O-g1.** **No runtime verification. This is the important one.** Everything was read from source at 4cbd42149; nothing was booted, no secret created, no `share_url` observed. **The single highest-value check is the central claim (O10):** set `DEFAULT_DOMAIN` to a host different from `site.host`, create a secret with **no** `share_domain`, and read the returned `share_url`. It is asserted on an exhaustive grep, **not an observation**. See §M item 11.
2. **O-g2.** Could not establish whether a **set-but-empty** `LINK_DOMAINS` actually reaches `validate_link_domains!` as `[]` rather than nil through the full ERB+YAML+`deep_merge` path. The code comments (`config.defaults.yaml:804-809`, `config.rb:138-143`) assert the `&.` chain and the `DEFAULTS` omission preserve the distinction, and the guard's own doc table (`config.rb:1006-1007`) lists `[]` and `['']` as raising — **the guard's logic was verified, the pipeline feeding it was not.** If the distinction were lost upstream, the set-but-empty boot error would silently never fire.
3. **O-g3.** Could not establish whether `Onetime::ConfigError` raised from `raise_concerns` is **genuinely fatal** — whether any boot wrapper rescues it and degrades instead. A grep for `ConfigError` handling in the boot path returned nothing, which is suggestive but not the same as reading the process entry point.
4. **O-g4.** Did **not** trace the domain-context session round trip (`sess['domain_context']`, `AccountAPI::Logic::Account::UpdateDomainContext`). Nothing in the secret-creation path injects a session value into `share_domain` (the only `domain_context` reads in the logic layer are `extract_domain_context` at `lib/onetime/logic/base.rb:361-369`, which sets only `@domain_strategy` and `@display_domain`), **so the decision table holds for the API contract** — but **which host the browser UI ends up sending after a page reload was not established**, and that is what an operator actually sees.
5. **O-g5.** Did **not** establish what happens to links **already created** before an operator changes `DEFAULT_DOMAIN` or `LINK_DOMAINS`. `receipt.share_domain` is persisted at creation and the read path applies the **current** `features.domains.enabled` — so turning `DOMAINS_ENABLED` off **appears** to re-anchor every existing link on `site.host`. Read from code; not confirmed on real stored receipts.
6. **O-g6.** Did **not** check `bin/ots` or the colonel API for any surface that reports the **resolved link pool or the effective link anchor**. If one exists it would be the operator's diagnostic for all of the above.
7. **O-g7.** **No claim established about what onetimesecret.com itself runs.** `.env.reference:868-869` shipping `DOMAINS_ENABLED=false` and a bare `DEFAULT_DOMAIN=` says nothing about the hosted service.

### O.5 Hazards — do not write these wrong

1. **O-h1. THE WHOLE `DEFAULT_DOMAIN` STORY IS A TRAP.** **Three** shipped comments (`etc/defaults/config.defaults.yaml:776-777`, `src/shared/composables/useDomainContext.ts:72-74`, and the same file at `:133-136`) describe `DEFAULT_DOMAIN` as **the link domain**. The code does not use it as one. **Any page that paraphrases those comments will be wrong, and wrong about the most operator-visible behaviour in the product.**
2. **O-h2.** **`DEFAULT_DOMAIN` on a split deployment is actively harmful at this pin** (O12): the picker offers it as canonical, selecting it is silently discarded, and the link comes back on `site.host`. **Do not write a how-to that tells an operator to set `DEFAULT_DOMAIN` to change their link hostname.** If a page must mention the key, describe it as what the code makes it — **the primary CANONICAL host for request classification and the default link-pool member** — and say plainly that **it does not appear in generated links.** State that unconditionally; do not soften it to "may not".
3. **O-h3.** **Set-but-empty `LINK_DOMAINS` is a boot failure** (O4), and the shipped `.env.reference` deliberately comments the line out for exactly that reason (`:877-878`). **A docs page that shows `LINK_DOMAINS=` as a template line, or lists it in a copy-paste `.env` block with an empty value, will brick every reader's install.** Show it commented out or omit it.
4. **O-h4.** **`LINK_DOMAINS=links.internal` — an internal hostname with no public suffix, which is precisely the deployment shape the feature is written for — is ALSO a boot failure** (O5). The feature's own motivating example (`config.defaults.yaml:781-783`, an internal platform address) is one keystroke from an unparseable host. **Any example in a docs page must use a host with a real public suffix.**
5. **O-h5.** `LINK_DOMAINS` **silently does nothing without `DOMAINS_ENABLED=true`, but still fails boot when malformed** (O14, O8). That combination is genuinely surprising and must be **stated**, not implied.
6. **O-h6.** Listing a tenant's already-registered custom domain in `LINK_DOMAINS`, or pointing `DEFAULT_DOMAIN` at one, **silently disables that tenant's per-domain branding and sign-in configuration** (O21). The only signal is one error-level boot log line, and it is skipped entirely when domains are disabled. **This deserves a warning callout wherever `LINK_DOMAINS` is documented.**
7. **O-h7.** **File an issue against the app** for the three wrong comments (O11, O23, O24) and for the `DEFAULT_DOMAIN`-is-an-anchor behaviour (O12) before publishing. See §M item 11.

---

## P. self-hosting/upgrading — `bin/ots migrate`, the `migrations/` tree, and the second command group

> **Historical proposal, not today's upgrade inventory (R6).** The “own page”
> placement recommendation, P42's missing-v0.26-page assertion, and the
> missing-version-mapping warning describe the research snapshot. The current
> tree has `self-hosting/upgrade-guides.md`, `upgrading-v0-26.md` and guides through
> `upgrading-v0-26-19.md`. Preserve them; do not replace their release-specific
> instructions with this migration inventory or reopen already corrected defects.
> The eight migrations and their flags below remain evidence at `4cbd421` only.

**Feature reality: FULLY, and absent from every Phase 3 ledger.** There are **three independent
migration systems** at 4cbd42149 and the published docs conflate or ignore all three:
(1) **`bin/ots migrate`** — Familia-backed Redis data migrations under `migrations/<date>/`, eight
files, applied-state tracked in Redis, **manual, never run for the operator**; (2) **`bin/ots
migrations <verb>`** (plural — a different command group, one character apart) — eight one-off
backfill/dedupe commands with **no registry, no status, no applied state**; (3) **Sequel/Rodauth
schema migrations** under `apps/web/auth/migrations/` — eight files, run **automatically at boot** in
full auth mode, transactional and PG-advisory-locked. **The single most consequential finding: the
per-migration invocation form printed in every migration file's own header (`bin/ots migrate <ID>
--run`) bypasses the Runner and never records applied state.** Only the bare `bin/ots migrate --run`
records anything. An operator who follows the shipped instructions ends with every migration still
showing "Pending".

The governing fact is untouched by this section. On a stock self-hosted instance billing is off,
`STANDALONE_ENTITLEMENTS` grants the full set, limits return `Float::INFINITY`, and role is the whole
answer. Exactly one row here (P33) touches the catalog, and it concerns a legacy plan that exists only
when an operator **supplies** a billing config.

> **Placement recommendation — this section gets its own page, not a slot in the install group.**
> Target: `src/content/docs/en/self-hosting/upgrading.md`, titled around **"Upgrading and data
> migrations"**, a **sibling to the two per-version pages** (`upgrading-v0-23.md`, `upgrading-v0-24.md`)
> rather than a member of the `install/*` group.
>
> Reasoning, in order. **(1)** The install group (`docker`, `linux`, `images-and-variants`,
> `reverse-proxy-and-tls`, `run-as-a-service`, `verify`) is first-install shaped; every row below is
> about an instance that **already has data**. Folding a destructive, state-mutating command into a
> getting-started flow buries it. **(2)** The content is version-spanning and belongs to no single
> release: three migration systems, one mandatory environment variable, and a runner whose default
> invocation sees one directory out of five. That is a page, not a section. **(3)** The two existing
> per-version pages are the wrong home — both are factually broken at the pin (P37–P40) and both
> predate the runner as it now exists; **neither mentions `bin/ots migrate` at all** (P42). **(4)**
> Fifteen of the rows below (P8–P22) are pure runner mechanics that no per-version page would repeat.
>
> Suggested shape: the three systems and which one is automatic → how to preview safely (omit `--run`,
> **never** pass `--dry-run`) → the discovery trap and the full-path form as the recommended
> invocation → the applied-state trap → the eight migrations as a "what it changes / what breaks if
> skipped" table → Redis backup as the only rollback. **Do not write an "upgrading to vX requires
> migrations A, B, C" table** — no such mapping exists in the repo (P-g5). State per migration which
> version transition its own header names, and attribute it to the migration.
>
> Alongside the new page, the two existing pages need a **correction pass, not a rewrite**: fix the
> migration path on v0-23 (P39), replace its `sourceOfTruth` line, which currently cites an orphaned
> unshipped script (P37), and fix step 7 on v0-24 to the `git checkout v0.24.5 -- scripts/upgrades/`
> instruction the repo itself now gives (P40). Both should link forward to the new page.

### P.1 The three systems, and the one that runs itself

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| P1 | Onetime Secret has **three** separate migration mechanisms: `bin/ots migrate` (Familia/Redis data migrations, manual), `bin/ots migrations <verb>` (plural — eight standalone backfill/dedupe commands, manual, untracked), and the Rodauth/Sequel **auth schema** migrations (automatic at boot). They share no registry, no status command and no ordering. | verified (STRUCTURAL) | `lib/onetime/cli/migrate_command.rb` (singular, Familia-backed); `lib/onetime/cli/migrations/*_command.rb` (eight files, each `register 'migrations <verb>'`); `apps/web/auth/migrator.rb` + `apps/web/auth/initializers/rodauth_migrations.rb` |
| P2 | The **auth schema migrations run automatically during application boot** when `AUTHENTICATION_MODE=full`, with no operator action. They are transactional (`use_transactions: true`), skip already-applied migrations via the `schema_info` table, and are **skipped entirely** in simple auth mode, in the test environment, and for jobs workers. | verified (STRUCTURAL) | `apps/web/auth/initializers/rodauth_migrations.rb:15-29` (`should_skip?` — simple mode / testing / `ARGV.any?('jobs')`), `:37-44` (`Auth::Migrator.run_if_needed`); `apps/web/auth/migrator.rb:41-73`, `:242-267`; `apps/web/auth/migrations/README.md:3`, `:38-46` |
| P3 | Concurrency contract for the auth schema migrations: on **PostgreSQL** an advisory lock serialises concurrent boots — the loser logs and continues booting, no error. **SQLite has no advisory locks and is single-instance only**: rolling deployments are unsafe, so stop the old instance before starting the new one. A genuine `Sequel::Migrator::Error` is logged and **re-raised**, so a failed auth migration **aborts boot**. | verified (STRUCTURAL) | `apps/web/auth/migrator.rb:12-19` (module header stating both), `:74-82` (`rescue Sequel::AdvisoryLockError` — "Don't raise"), `:83-95` (`rescue Sequel::Migrator::Error` → `raise`); `apps/web/auth/migrations/README.md:48-61` |
| P4 | Auth schema migrations may use a **separate elevated connection**: `AUTH_DATABASE_URL_MIGRATIONS` for migrations (CREATE EXTENSION, grants) while `AUTH_DATABASE_URL` stays the restricted runtime connection. The elevated URL is used only if it is set, **differs** from the runtime URL, **and** uses the same adapter — on adapter mismatch the code warns and silently falls back to `database_url`. | verified — shipped default | `apps/web/auth/migrator.rb:125-135` (`determine_migration_connection`, including the mismatch fallback), `:245-255` (same three-part condition in `run_migrations`); `apps/web/auth/migrations/README.md:24-34` |
| P5 | **PostgreSQL requires a one-time manual bootstrap before first boot; SQLite requires none.** `psql -f apps/web/auth/migrations/schemas/postgres/initialize_auth_db.sql` creates the `onetime_auth` database and the two roles. SQLite creates `data/auth.db` automatically. | verified (STRUCTURAL) | `apps/web/auth/migrations/README.md:7-19`. **Caveat:** the README's own text misspells the role name ("oneitme_migrator"); the `.sql` file itself was not read (P-g11). |
| P6 | **Two of the eight auth migrations are data migrations, not schema-only.** `007` lowercases customer emails in **both** PostgreSQL and Redis (re-keying `customer:email_index`), is idempotent, skips duplicates with a warning, and honours `DRY_RUN=1`. `008` re-keys `account_identities` from `(provider, uid)` to `(provider, issuer, uid)` to close a **cross-tenant SSO account-takeover**, backfilling every pre-existing row to the sentinel issuer `''`. | verified (STRUCTURAL) | `apps/web/auth/migrations/007_normalize_customer_emails.rb:5-24` (scope, safety, `DRY_RUN=1`, the standalone `sequel -m … -M 7` invocation), `:26-32`; `apps/web/auth/migrations/008_issuer_scoped_identities.rb:5-25` (the takeover, the `''` sentinel, the lazy-upgrade read path), `:27-34` (`add_column :issuer, String, null: false, default: ''`). **008 is a security fix delivered as a boot-time migration** (refs #3840 Phase 0 / #3838 item 5). |
| P7 | The repo itself draws the boundary a docs page needs, and a page may quote it: **"Migrations (`bin/ots migrate`): Schema changes via Familia::Migration"** vs **"Upgrades (`scripts/upgrades/`): Bulk data transforms between major versions."** | verified (STRUCTURAL) | `scripts/upgrades/README.md:27-30` |

### P.2 How `bin/ots migrate` actually behaves

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| P8 | `bin/ots migrate` with **no arguments and no flags is read-only**: it prints a status table and exits. It never applies anything. `--status` is the same thing. Writing requires `--run`. | verified (STRUCTURAL) | `lib/onetime/cli/migrate_command.rb:77-78` (`elsif status \|\| (migration_id.nil? && !run)` → `show_status`), `:146-177` (status printer, no writes), `:26-30` (`option :run … default: false … 'Actually apply changes (default is dry run mode)'`) |
| P9 | **Dry-run is the default at both layers.** `Familia::Migration::Base#dry_run?` is `!options[:run]`, and every write in a shipped migration is wrapped in `for_realsies_this_time?`, which returns false unless `--run` was passed. Previewing is always safe. | verified (STRUCTURAL) | familia 2.12.0 gem (`Gemfile.lock:92`, pinned by `Gemfile:93` `gem 'familia', '~> 2.12'`) `lib/familia/migration/base.rb:210-213` (`dry_run?`), `:235-240` (`for_realsies_this_time?`); `lib/onetime/cli/migrate_command.rb:180` (`mode = run ? 'EXECUTE' : 'DRY RUN'`) |
| P10 | **Discovery is directory-scoped, and the default directory is only the lexically newest dated directory — not all of them.** At the pin that is `migrations/2026-07-27/`, so a bare `bin/ots migrate --run` sees exactly **one** of the eight shipped migrations. The other seven are invisible unless the operator passes `--dir migrations/<date>` or a full file path. | verified (STRUCTURAL) | `lib/onetime/cli/migrate_command.rb:88-93` (`Dir.glob(File.join(migrations_root, '20*')).reverse` then `dirs.first`), `:68-69` (`migration_dir = dir \|\| default_migration_dir`), `:48-52` (`option :dir`, `default: nil`); the eight files from `git ls-tree -r --name-only 4cbd42149 -- migrations/`. **The app knows this:** `migrations/2026-07-27/20260727_01_backfill_signin_config.rb:69-70` says verbatim "the bare-ID form only finds migrations in the latest directory". No other migration header says it, and all seven older headers document a bare-ID form that cannot work. |
| P11 | Passing a **path** rather than an ID loads only that file: `bin/ots migrate migrations/2026-04-17/20260417_01_backfill_homepage_config --run` works from any directory and is the only form that reliably reaches an older migration. The `.rb` suffix is optional. **This is the invocation form a docs page should teach.** | verified (STRUCTURAL) | `lib/onetime/cli/migrate_command.rb:59-65` (path detection via `include?('/')`, `.rb` appended, `dir` derived from `File.dirname`), `:111-121` (`specific_file` short-circuit, comment: "avoids class name collisions in legacy migrations") |
| P12 | **Applied state lives in Redis, not on disk**: sorted set `familia:migrations:applied` (member = migration id, score = epoch) plus hash `familia:migrations:metadata` (JSON per migration). Wiping Redis, or pointing the app at a fresh Redis, resets every migration to Pending. | verified (STRUCTURAL) | familia-2.12.0 `lib/familia/migration/registry.rb:12-16` (schema comment), `:154-174` (`record_applied` → ZADD + HSET), `:324-334` (key helpers); `lib/familia/migration.rb:39` (`@migrations_key = 'familia:migrations'`); no override anywhere in the app — `git grep -n 'migrations_key\|Migration.configure' 4cbd42149 -- lib apps bin` returns only `apps/web/auth/config.rb:104`, which is Rodauth password migration, unrelated |
| P13 | **CONTRADICTION — the highest-value row in this section.** `bin/ots migrate <ID> --run`, the per-migration form documented in **every** shipped migration's own header, **never records applied state**. It bypasses the Runner entirely and calls the migration class's own `cli_run`, which has no Registry access. Only the bare `bin/ots migrate --run` (run-all path) writes to `familia:migrations:applied`. An operator who follows the shipped per-file instructions sees every migration still listed as **Pending** afterwards, and a later `--run` executes them a second time. | verified (STRUCTURAL) | `lib/onetime/cli/migrate_command.rb:79-80`, `:203-227` (`run_single_migration` → `migration_class.cli_run(run ? ['--run'] : [])`); familia-2.12.0 `lib/familia/migration/base.rb:99-108` (`cli_run` → `run`), `:130-138` (class-level `run`: `new` / `prepare` / `migration_needed?` / `migrate` — no Registry); contrast `lib/familia/migration/runner.rb:176` (`@registry.record_applied(instance, instance.stats) unless dry_run`), reached only from `run_one`, called only from `Runner#run` (`:127-138`), wired at `migrate_command.rb:82`. **Eight for eight**, every header documents only the per-ID form: `20250727_01:15-16`, `20250727_02:14-15`, `20250727_03:13-14`, `20260417_01:20-21`, `20260606_01:36-37`, `20260703_01:33-34`, `20260703_02:28-29`, `20260727_01:71-72`. |
| P14 | When run **through the Runner**, execution order is a **topological sort over each migration's declared `dependencies`**, not filename or date order. Migrations with no declared dependency keep their load order, which is `Dir.glob(dir, '*.rb').sort` — filename order within the one loaded directory. | verified (STRUCTURAL) | familia-2.12.0 `lib/familia/migration/runner.rb:127-138` (`topological_sort(pending)`), `:248-289` (Kahn's algorithm; the seed queue is `migrations.select { in_degree zero }`, preserving input order); `lib/onetime/cli/migrate_command.rb:123-134` (glob then `.uniq.sort.each { require }`) |
| P15 | **Exactly one shipped migration declares a dependency**: `20250727_03_customer_custom_domain_cleanup` depends on `20250727_02_customer_cleanup`. The other seven declare `dependencies = []`. | verified (STRUCTURAL) | `migrations/2025-07-27/20250727_03_customer_custom_domain_cleanup.rb:25`; `self.dependencies = []` at `20250727_01:37`, `20250727_02:26`, `20260417_01:33`, `20260606_01:48`, `20260703_01:45`, `20260703_02:40`, `20260727_01:86` |
| P16 | An **unmet dependency aborts the whole run with an exception** rather than skipping it. The dependency check runs **before** the begin/rescue in `run_one`, so `DependencyNotMet` propagates out of `Runner#run` and out of the command. Combined with P13, an operator who ran `20250727_02` by ID and then runs `bin/ots migrate --dir migrations/2025-07-27 --run` gets an unhandled `DependencyNotMet` on `20250727_03`. | verified (STRUCTURAL) | familia-2.12.0 `lib/familia/migration/runner.rb:154-160` (dependency raise) vs `:171-184` (the rescue block starts only after `instance.prepare`); `registry.rb:56-58` (`applied?` is a ZSCORE against the set that per-ID runs never populate) |
| P17 | **Failure semantics:** a `StandardError` inside `migrate` is caught, the migration is marked `:failed`, it is **not** recorded as applied, and `Runner#run` **breaks out of the loop** so no later migration runs. There is **no transaction and no automatic undo** — writes already made before the exception persist. Recovery depends entirely on the individual migration's own idempotency. The command exits **1** when any migration failed. | verified (STRUCTURAL) | familia-2.12.0 `lib/familia/migration/runner.rb:171-187` (rescue → `:failed`, `record_applied` skipped), `:132-137` (`break if result[:status] == :failed`); `lib/onetime/cli/migrate_command.rb:193-200` (`exit 1 if failed_count > 0`) |
| P18 | A migration whose `migration_needed?` returns false is reported `:skipped` and is **not** recorded as applied — so it stays "Pending" in `bin/ots migrate --status` **forever**, on every future run. **"Pending" therefore does not mean "has work to do".** | verified (STRUCTURAL) | familia-2.12.0 `lib/familia/migration/runner.rb:172-179` (`record_applied` sits inside the `if instance.migration_needed?` branch only); `lib/onetime/cli/migrate_command.rb:159-171` (status derives purely from the registry) |
| P19 | **Rollback is advertised but unusable.** `bin/ots migrate --rollback ID` requires the migration class to override `down`; `reversible?` tests `method(:down).owner != Familia::Migration::Base`. **None of the eight shipped migrations defines `down`.** Every `--rollback` attempt on a shipped migration exits 1 with "Migration is not reversible". | verified (absence) | `lib/onetime/cli/migrate_command.rb:15` (the usage header advertises `--rollback ID`), `:229-252` (`:not_reversible` → exit 1); familia-2.12.0 `lib/familia/migration/base.rb:195-204` (`down` is an empty hook, `reversible?`); exhaustive check — `grep -c 'def down'` over all eight files under `migrations/` at 4cbd42149 returns 0 for every file |
| P20 | The command's own usage header advertises `bin/ots migrate --dry-run`, but **no `dry_run` option is declared** on the command. The declared options are `--run`, `--status`, `--rollback`, `--validate`, `--dir`, plus the positional `migration_id`. **Teach previewing as "omit `--run`", never as "pass `--dry-run`".** | verified (STRUCTURAL) | `lib/onetime/cli/migrate_command.rb:13` (`#   bin/ots migrate --dry-run           # Preview all pending migrations`) vs `:21-52` (the full option list — no `:dry_run`). Comment contradicts code; what Dry::CLI 1.4.1 does with the undeclared flag was not established (P-g1). |
| P21 | `bin/ots migrate --validate` only checks **dependency integrity** (missing dependency ids, dependency cycles) across the migrations it happened to **load**. Because the default load is one directory (P10), the only real dependency edge in the tree — `20250727_03` → `20250727_02` — is never validated by a default invocation. | verified (STRUCTURAL) | `lib/onetime/cli/migrate_command.rb:73-74`, `:254-270`; familia-2.12.0 `lib/familia/migration/runner.rb:92-117` |
| P22 | `bin/ots migrate` **boots the full application first** (`OT.boot! :cli`), so it requires a reachable Redis and a loadable config. It cannot be run against a stopped stack, and it is not a standalone script. | verified (STRUCTURAL) | `lib/onetime/cli/migrate_command.rb:55` (`boot_application!`); `lib/onetime/cli.rb:27-30` (`def boot_application!; OT.boot! :cli; end`) |

### P.3 The eight shipped Redis migrations — what each changes, what breaks if skipped

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| P23 | **1/8 — `migrations/2025-07-27/20250727_01_convert_symbol_keys.rb`**: rewrites `etc/config.yaml` **in place**, converting Ruby symbol keys (`:key:`) to string keys (`key:`), after writing a timestamped backup. **Config-file only; it does not touch Redis.** Requires a **writable** `etc/` — a `:ro` config mount defeats it. This is the migration the v0.23 upgrade page is about. | verified (STRUCTURAL) | `migrations/2025-07-27/20250727_01_convert_symbol_keys.rb:6-27` (purpose + backup/convert/validate steps), `:39-44` (`@config_file = File.join(@base_path, 'etc', 'config.yaml')`, `@backup_suffix`), tail `:26-30` (a `__FILE__ == $0` block — **this one file is also runnable as `ruby <path>`**) |
| P24 | **2/8 — `20250727_02_customer_cleanup.rb`** (a `Familia::Migration::Pipeline`): **deletes** Customer records whose custid is empty/anon or matches `tryouts*onetimesecret.com`, whose email is empty or matches the same pattern, **or whose `created` is missing or before 2021**. It is destructive data hygiene aimed at the hosted install's test accounts and lands on no documented feature. | verified (STRUCTURAL) | `migrations/2025-07-27/20250727_02_customer_cleanup.rb:6-16` (criteria, verbatim including "created: missing or before 2021 → remove"), `:23-31` (Pipeline subclass, batch 1000), `:34-45` (`execute_update` overridden to `pipe.del dbkey`). **HAZARD — see P-h4. On a long-lived self-hosted install, "created missing or before 2021" can match legitimate accounts.** Only the header criteria were read, not the full predicate body (P-g6). **Never tell a self-hoster to run this blind.** |
| P25 | **3/8 — `20250727_03_customer_custom_domain_cleanup.rb`**: deletes orphaned `customer:*:custom_domain` sorted sets for test users whose Customer object no longer exists. **Depends on migration 2** (P15). It **hardcodes a Redis logical DB** in `prepare` (`Familia.dbclient(6)`) as a stated workaround. | verified (STRUCTURAL) | `migrations/2025-07-27/20250727_03_customer_custom_domain_cleanup.rb:8-14` (purpose), `:22-34` (Model subclass, `@scan_pattern = "#{@model_class.prefix}:*:custom_domain"`, `Familia.dbclient(6)` with the comment "Workaround: Familia::SortedSet ignores redis parameter"). The hardcoded DB 6 **looks like a setting but has no key and no env var**; whether it also redirects the Registry's own connection was not established (P-g3). |
| P26 | **4/8 — `20260417_01_backfill_homepage_config.rb`**: creates a `CustomDomain::HomepageConfig` record for every CustomDomain that has none, carrying the legacy `BrandSettings#allow_public_homepage` value forward. **Required for the v0.24 → v0.25 transition:** the v0.25 UI serializer and API read HomepageConfig with **no fallback**, so a domain toggled ON under v0.24 renders as disabled under v0.25 until this runs. Idempotent — existing records are skipped. Lands on `features/custom-domains` and `features/interface-and-homepage`. | verified (STRUCTURAL) | `migrations/2026-04-17/20260417_01_backfill_homepage_config.rb:8-17` (the regression and the "safe to re-run" claim), `:30-38` (`@config_class = Onetime::CustomDomain::HomepageConfig`), `:40-51` (`migration_needed?` = any domain without a HomepageConfig); refs #3023 at `:23` |
| P27 | **5/8 — `20260606_01_unique_index_json_to_raw.rb`**: rewrites `unique_index` values from Familia 2.9's JSON-quoted form to 2.10's raw form. Without it, `CustomDomain.from_display_domain` self-heals at read time but **warns on every read** and keeps the boot guard flagging the index; **under Familia 2.10.0 exactly it broke silently** (the finder returned nil). Idempotent — already-raw entries untouched. Lands on `features/custom-domains` and, downstream, custom-domain SSO org selection. | verified (STRUCTURAL) | `migrations/2026-06-06/20260606_01_unique_index_json_to_raw.rb:8-27` (the 2.10.0 vs 2.10.1 behaviour split and the idempotency claim), `:45-48` (class), `:50-60` (hardcoded org-scoped index patterns, "Hardcoding is acceptable here because the migration runs once against a known data snapshot"); refs #3347, delano/familia#302 at `:39`. **Stale comment:** the header says "Familia 2.10.1 (the version we run)"; the pin runs **2.12.0** (`Gemfile.lock:92`). Whether the read-time shim survives in 2.12 was not re-verified (P-g7). |
| P28 | **6/8 — `20260703_01_disable_homepage_auth_links.rb`**: flips persisted `HomepageConfig.signup_enabled` / `signin_enabled` from true to false on **every existing custom domain**, so the Create Account / Sign In links on custom-domain homepages default to hidden. A code-only default flip cannot reach existing rows because the stored `true` wins at read time. Idempotent. **After running it, operators must re-enable per domain via `PUT /homepage-config`.** Lands on `features/interface-and-homepage` and `features/custom-domains`. | verified (STRUCTURAL) | `migrations/2026-07-03/20260703_01_disable_homepage_auth_links.rb:9-30` (the reasoning and the "deliberate opt-in is indistinguishable from the historical default" rationale, plus the idempotency claim), `:42-45` (class), `:55-60` (`migration_needed?`) |
| P29 | **7/8 — `20260703_02_backfill_homepage_secrets_mode.rb`**: persists an explicit `secrets_mode: 'create'` onto HomepageConfig records that predate the field. **Cosmetic / data-hygiene only** — the read path already coerces nil to `'create'`, so legacy domains behave correctly **without** it. Idempotent, and it deliberately does not advance `updated`. **This is the one migration a docs page may honestly describe as optional.** Lands on `features/incoming-secrets` and `features/interface-and-homepage`. | verified (STRUCTURAL) | `migrations/2026-07-03/20260703_02_backfill_homepage_secrets_mode.rb:8-25` (verbatim: "legacy domains already behave correctly without this migration"; the not-advancing-`updated` rationale), `:37-45` (class), `:50-55` (`migration_needed?`) |
| P30 | **8/8 — `20260727_01_backfill_signin_config.rb` — the upgrade-breaking one.** It creates an **enabled**, follow-global `CustomDomain::SigninConfig` (`enabled` / `signin_enabled` / `email_auth_enabled` / `sso_enabled` all true) for every domain lacking one. Under v0.26.x a custom domain with no enabled SigninConfig **refuses sign-in entirely**; the v0.25.11 → v0.26.2 release shipped no backfill, so every domain whose users signed in on-domain lost sign-in at upgrade (user-visible as `web.login.signin_disabled_message`). **Nothing is force-enabled** — each resolver still ANDs with the global capability. Lands on `features/custom-domains` and self-hosting auth. | verified (STRUCTURAL) | `migrations/2026-07-27/20260727_01_backfill_signin_config.rb:6-17` (the regression), `:19-42` (why all four booleans, and that a bare `enabled+signin_enabled` would silently narrow SSO and magic-link), `:83-96` (class + `BACKFILL_ATTRS`), `:106-122` (`migration_needed?`); refs ADR-024 / ADR-030 at `:75` |
| P31 | **Migration 8 refuses to apply without an explicit cutoff.** `SIGNIN_BACKFILL_CREATED_BEFORE` (epoch seconds, or any `Time.parse`-able string) is **required** for `--run`; domains created at or after it are skipped. Dry-run still previews without it but prints an unbounded-preview warning. An unbounded apply would create an enabled SigninConfig for post-v0.26 domains that legitimately carry the fail-closed default, **exposing sign-in on domains whose owners never opted in**. An unparseable value raises `Onetime::Problem`. | verified (STRUCTURAL) | `migrations/2026-07-27/20260727_01_backfill_signin_config.rb:51-72` (contract + both invocation forms), `:101` (`parse_cutoff!(ENV['SIGNIN_BACKFILL_CREATED_BEFORE'])`), `:129-138` (`return refuse_unbounded_apply! unless dry_run?`), `:166-189` (the refusal text, including the exact recommended command), `:207-215` (parse + raise), `:219-223` (`created_after_cutoff?` — a blank `created` reads as 0 and is **always** in scope). **This is the only environment variable in the whole subject and it is mandatory. A page that omits it documents a command that exits 1.** |

### P.4 The second command group — `bin/ots migrations` (plural)

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| P32 | A **second, separate command group** exists: `bin/ots migrations <verb>`. Eight verbs: `backfill-email-hash`, `backfill-secret-counts`, `backfill-stripe-email-hash`, `backfill-subscription-status`, `dedupe-instances`, `dedupe-participations`, `dedupe-relationships`, `grant-probono-entitlements`. These are **not** Familia migrations — they are not registered, never appear in `bin/ots migrate --status`, and **their applied state is never recorded anywhere**. They do share the dry-run-by-default / `--run`-to-apply convention. | verified (STRUCTURAL) | registrations at `lib/onetime/cli/migrations/backfill_email_hash_command.rb:231`, `backfill_secret_counts_command.rb:122`, `backfill_stripe_email_hash_command.rb:287`, `backfill_subscription_status_command.rb:264`, `dedupe_instances_command.rb:318`, `dedupe_participations_command.rb:179`, `dedupe_relationships_command.rb:187`, `grant_probono_entitlements_command.rb:241`; each subclasses `Onetime::CLI::Command` (not `Familia::Migration::Base`) — e.g. `backfill_email_hash_command.rb:22-45` (options `--run` default false, `--verbose`, `--help`), `:42-57` (`boot_application!`, `dry_run = !run`) |
| P33 | `bin/ots migrations grant-probono-entitlements` is meaningful **only when the operator supplies a billing config**. It targets legacy customers on the `identity` plan — a plan that exists solely as a catalogue entry in an operator-supplied `billing.yaml`. **On a stock self-hosted install billing is off, there is no catalogue, and there are no identity-plan customers, so the command has nothing to act on.** | verified (OPERATOR-SUPPLIED) | `lib/onetime/cli/migrations/grant_probono_entitlements_command.rb:5-18` (purpose; a thin wrapper over `Billing::Operations::GrantProbonoEntitlements`), `:25-39` (`--run`, `--verbose`, `--force`), `:47-51` (`require 'billing/operations/grant_probono_entitlements'` after boot); catalog key path **`plans.identity`** (`legacy: true`, `plan_id: identity`, `show_on_plans_page: false`, `grandfathered_until: 2029-01-31`, tier `single_account`, `prices: []`). **`plans.identity.entitlements` holds SIXTEEN names, not the seven an earlier pass listed** — the old row printed the first seven alphabetically and presented them as the whole set. The full set, parsed with `yaml.safe_load`: `api_access`, `create_secrets`, `custom_branding`, `custom_domains`, `custom_mail_sender`, `custom_privacy_defaults`, `custom_signin_config`, `custom_signup_validation`, `extended_default_expiration`, `homepage_secrets`, `incoming_secrets`, `manage_billing`, `manage_members`, `manage_org`, `manage_orgs`, `view_receipt`. In shape: the legacy plan is the **most generous single-account plan in the catalog** — it is `identity_plus_v1`'s 15 plus `custom_signup_validation`, and it differs from the 19 of `team_plus_v1` only by lacking the team/SSO block (`manage_sso`, `manage_teams`, `flexible_from_domain`, `workspace_branding`) while retaining `manage_billing`, which `team_plus_v1` does not grant. Docs-repo `billing.yaml` sha256 `69a96394920fd1777cf23a9bdedee174648f46b54e13c99a1f27b3cdc0a17501`. **The same billing-off caveat applies to `backfill-stripe-email-hash` and `backfill-subscription-status`, which call Stripe.** |
| P34 | `bin/ots migrations backfill-email-hash` is **gated on cross-region federation being configured** — it calls `verify_federation_configured!` and returns early if it is not. It backfills an HMAC-SHA256 hash of `billing_email` onto Organization records created before the federation feature existed. | verified (STRUCTURAL) | `lib/onetime/cli/migrations/backfill_email_hash_command.rb:5-16` (purpose, refs #2471), `:42-53` (`return unless verify_federation_configured!`). Adjacent to features ledger §J (multi-region). What `verify_federation_configured!` reads was not traced (P-g9). |

### P.5 What ships, and what runs it — nothing does

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| P35 | **Nothing runs `bin/ots migrate` for you.** The default published image (`main` bake target → Dockerfile `final` stage, untagged suffix) starts via `bin/entrypoint.sh`, which contains **no migration step of any kind**. The `migrations/` tree **is** shipped in the image, so `docker exec <container> bin/ots migrate …` is available — but it is a deliberate operator action. | verified (absence) | `docker/bake.hcl:145-153` (target `main`, `target = "final"`, `tags("")`) vs `:162-170` (target `s6`, `target = "final-s6"`, `tags("-s6")`); `Dockerfile:469` (`CMD ["bin/entrypoint.sh"]`), `:407-408` (entrypoint copied from `docker/entrypoints/`); `git show 4cbd42149:docker/entrypoints/entrypoint.sh \| grep -i migrat` returns nothing across all 142 lines; `Dockerfile:406` (`COPY --chown=appuser:appuser migrations ./migrations`), `:421` (`PATH=${APP_DIR}/bin:$PATH`) |
| P36 | The **only** wired boot-time config gate lives in the **`-s6` image variant, not the default image**, and it is **inert at the pin**: `docker/s6/services/config-check/up` guards its symbol-key check on `test -f /app/migrations/2025-07-27/reorganize_config_structure.rb`, and that file does not exist. Its error message also prints a path that has never matched the tree (`bin/ots migrate 20250727-1523_01_convert_symbol_keys.rb --run`). `config-check` is listed as a dependency of web, worker and scheduler — **in the `-s6` image only**. | verified (STRUCTURAL) | `docker/s6/services/config-check/up:7-8` (the two `if { test -f }` guards), `:10-23` (the grep-based check and the error text), `docker/s6/services/config-check/type` (`oneshot`); `docker/s6/services/{web,worker,scheduler}/dependencies` (each: `redis-ready` + `config-check`); `Dockerfile:295` (`COPY docker/s6/services /etc/s6-overlay/s6-rc.d`, inside the `final-s6` stage beginning at `:208`). Note the first guard also tests for `/app/etc/config.yaml`, which the Dockerfile **does** create from `etc/defaults` at `:430-436`. What a failing s6 oneshot does to its dependents was not established (P-g2). |

### P.6 Corrections owed to the two published upgrade pages

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| P37 | **CONTRADICTION.** `scripts/check-migration-status.sh` — the **sole `sourceOfTruth` cited by the published v0.23 upgrade page** — is **orphaned**. Nothing in the repo invokes it, and it is **not shipped in the runtime image** (the Dockerfile copies only `scripts/setup`, not `scripts/`). Its `MIGRATIONS` array names `migrations/2025-07-27/reorganize_config_structure.rb`, **a file that does not exist at the pin**. `needs_migration` shells `bundle exec ruby <that path> --check` and treats exit 1 as "migration needed"; ruby exits 1 on a missing script file, so the script would report a **phantom pending migration** to anyone who ran it. | verified (STRUCTURAL) | `scripts/check-migration-status.sh:29-32` (the array), `:49-66` (`needs_migration`, `[ $? -eq 1 ]`), `:123-151` (check/auto/skip dispatch, exit 1 in check mode); `git grep -n 'check-migration-status' 4cbd42149` matches only the script's own two self-referential comment lines (`:3`, `:13`); `git ls-tree -r --name-only 4cbd42149 -- migrations/` contains no `reorganize_config_structure.rb`; `Dockerfile:409` (`COPY … scripts/setup ./scripts/setup` — the only `scripts/` copy); docs repo `src/content/docs/en/self-hosting/upgrading-v0-23.md:6`. (`ruby /nonexistent.rb; echo $?` → 1, verified locally.) |
| P38 | The `CONFIG_MIGRATE` environment variable (`check` \| `auto` \| `skip`, default `check`) that the published v0.23 page presents as **the primary upgrade control** is read **only** by that orphaned script. It is not read by the app, the entrypoint, or any compose file. **`-e CONFIG_MIGRATE=auto` on a container does nothing.** | verified (absence) | exhaustive `git grep -n 'CONFIG_MIGRATE' 4cbd42149` → `scripts/check-migration-status.sh:16,17,18,27,110,112,123,125` only; docs repo `src/content/docs/en/self-hosting/upgrading-v0-23.md:22-30`, `:55` (the page teaches `-e CONFIG_MIGRATE=auto`) |
| P39 | **CONTRADICTION.** The published v0.23 page gives a **migration path that does not exist**: `bundle exec ruby migrations/20250727-1523_01_convert_symbol_keys.rb --dry-run` / `--run`. The real path at the pin is `migrations/2025-07-27/20250727_01_convert_symbol_keys.rb` — dated subdirectory, underscore rather than hyphen-plus-time. The file **is** directly runnable (it carries a `__FILE__ == $0` block), but not at the path the page prints. | verified (STRUCTURAL) | docs repo `src/content/docs/en/self-hosting/upgrading-v0-23.md:44`, `:50`, `:71` vs `migrations/2025-07-27/20250727_01_convert_symbol_keys.rb` (path from `git ls-tree`) and its tail `:26-30` (`if __FILE__ == $0 … OT.boot! :cli; exit(Onetime::Migrations::ConvertSymbolKeys.cli_run)`). Note `--dry-run` works there **only by accident**: `cli_run` (familia `base.rb:99-108`) recognises only `--check` and `--run`; any other argument falls through to dry-run. |
| P40 | **CONTRADICTION.** The published v0.24 page's step 7 points at a **deleted directory**. It instructs `./scripts/upgrade/v0.24.0/info.sh` / `upgrade.sh` / `reset.sh`. At the pin `scripts/upgrades/` (**plural**) contains only a README, which states that historical pipelines are no longer carried forward and must be retrieved with `git checkout v0.24.5 -- scripts/upgrades/`. The page has **both the wrong directory name and the wrong version** (v0.24.0 vs v0.24.5). | verified (STRUCTURAL) | docs repo `src/content/docs/en/self-hosting/upgrading-v0-24.md:219-232` vs `scripts/upgrades/README.md:6-16` (the "None currently" table and the checkout instruction); `git ls-tree -r --name-only 4cbd42149 -- scripts/` contains only `scripts/upgrades/README.md` under that path |
| P41 | **What the v0.24 page still gets right at the pin, and a correction pass must not break:** `bin/ots customers sync-auth-accounts` (preview) and `… --run` (execute) exist as written; `bin/ots queues init` exists as written; and the PostgreSQL pointer to `apps/web/auth/migrations/README.md` is the correct destination (P5). | verified (STRUCTURAL) | `lib/onetime/cli/customers/sync_auth_accounts_command.rb:64`, `:176`, `:325`, `:340`, `:343`; `lib/onetime/cli/queue/init_command.rb:265` (`register 'queues init', Queue::InitCommand`); `apps/web/auth/migrations/README.md:7-19`; docs repo `upgrading-v0-24.md:212-213`, `:250-259` |
| P42 | **HISTORICAL — superseded current page inventory (R6).** **Neither existing upgrade page mentions `bin/ots migrate` at all**, and neither mentions any migration under `migrations/2026-*`. The **v0.25 and v0.26 upgrades — the ones that actually require migrations 4 through 8 — have no page.** | verified (absence) | docs repo: `grep -rn 'ots migrate' src/content/docs/en/` → no matches; `src/content/docs/en/self-hosting/` contains only `configuration.md`, `environment-variables.md`, `index.md`, `simple-or-full-auth.md`, `upgrading-v0-23.md`, `upgrading-v0-24.md`; `grep -rn -iE 'bin/ots migrate\|familia:migrations\|migrations/20' docs/planning/phase-3-ledger-*.md docs/planning/phase-3-split-map-installation.md` → no matches. Exhaustive over the `en` tree and all three Phase 3 ledgers. |

**42 rows.**

### P.7 Gaps — where the evidence runs out

1. **P-g1.** Dry::CLI 1.4.1 behaviour on the **undeclared `--dry-run` flag** was not established. The flag is advertised at `migrate_command.rb:13` but no `:dry_run` option is declared. Whether Dry::CLI errors, ignores it, or swallows it into the positional `migration_id` was not determined — no command was executed. **The writing pass must not tell operators to pass `--dry-run`; tell them to omit `--run`.**
2. **P-g2.** What an **s6 `oneshot` `up` script exiting non-zero** does to its dependents was not established. `docker/s6/services/config-check/up` exits on a failing guard for a file that does not exist at the pin. Whether that leaves web/worker/scheduler blocked, or whether s6-rc treats it as a benign no-op, was not verified — no s6 runtime was available. **Affects the `-s6` variant only, not the default image.**
3. **P-g3.** Which **Redis logical DB `familia:migrations:applied` lands in** was not traced. `Registry#client` falls back to `Familia.dbclient` with no argument (familia-2.12.0 `registry.rb:45-47`), and the app's mapping from `REDIS_URL` to Familia's default db index was not followed. Related and unresolved: `20250727_03_customer_custom_domain_cleanup.rb:33` calls `Familia.dbclient(6)` inside `prepare`, which may or may not redirect the Registry's subsequent writes for the rest of that process.
4. **P-g4.** **No command was executed against a live instance.** Every behavioural claim above is read from source at 4cbd42149 plus the pinned familia 2.12.0 gem. The **`bin/ots migrate --status` output shape** is inferred from the printer at `migrate_command.rb:146-177`, not observed. Do not print a sample status table as if it were captured.
5. **P-g5. The single biggest blocker.** There is **no manifest anywhere** tying a target version to the set of migrations it requires. The migration headers name version ranges in prose (v0.24→v0.25 for `20260417_01`, v0.25.11→v0.26.2 for `20260727_01`) but nothing machine-readable exists, and CHANGELOG/release notes were not read. **Any "upgrading to vX requires migrations A, B, C" table would be synthesised, not sourced — do not write one.** State per migration which transition its own header names, and attribute it to the migration.
6. **P-g6.** The **full deletion predicate of `20250727_02_customer_cleanup`** was not read — only its header criteria (`:6-16`) and its `execute_update` override (`:34-45`). Whether the "created before 2021" rule has any guard was not verified. **Do not document this migration as safe.**
7. **P-g7.** Whether the **read-time shim** that `20260606_01_unique_index_json_to_raw` depends on still exists in familia **2.12.0** was not verified. The migration's header reasons about 2.10.0 vs 2.10.1; the pin runs 2.12.0. If the shim was removed, that migration became **mandatory** rather than hygienic. Check before the page states either.
8. **P-g8.** How an operator invokes `bin/ots` **inside the shipped container** was not verified at runtime. `Dockerfile:421` puts `${APP_DIR}/bin` first on PATH and `migrations/` is copied at `:406`, so `docker exec <c> bin/ots migrate …` should work, but it was not run.
9. **P-g9.** `verify_federation_configured!` in `backfill_email_hash_command.rb` was not read; the config keys it requires are unknown.
10. **P-g10.** `apps/web/auth/migrations/001`–`006` were not read individually (only 007 and 008). Their contents are asserted as "schema-only" **by inference** from file names and the `schemas/` SQL sidecars.
11. **P-g11.** `apps/web/auth/migrations/schemas/postgres/initialize_auth_db.sql` itself was not read — only the README's description of it. The README misspells one role name, so **do not transcribe role names from the README**.

### P.8 Hazards — do not write these wrong

1. **P-h1. TOP HAZARD — the per-ID form does not record applied state (P13).** Every one of the eight migration files documents **only** `bin/ots migrate <ID> --run`, which routes through `cli_run` and never touches the Registry. An operator who follows the shipped instructions exactly finds `bin/ots migrate --status` still showing everything Pending, and a subsequent `--run` executes those migrations a **second time**. **The page MUST say which form records state.**
2. **P-h2. Default discovery is one directory (P10).** A bare `bin/ots migrate --run` at the pin loads only `migrations/2026-07-27/`; seven of eight migrations are silently invisible. **A page that says "run `bin/ots migrate --run` to apply pending migrations" would be actively wrong.**
3. **P-h3. `--rollback` is advertised in the command's own help but no shipped migration is reversible (P19).** Do not present rollback as a recovery path. **The real recovery path is a Redis backup taken before the run** — and note P17: there is no transaction, so a mid-migration failure leaves partial writes.
4. **P-h4. `20250727_02_customer_cleanup` deletes customers whose `created` is missing or before 2021.** On a self-hosted install running since 2020 this destroys real accounts. **Never list it as a routine upgrade step.**
5. **P-h5. `20260727_01_backfill_signin_config` refuses `--run` without `SIGNIN_BACKFILL_CREATED_BEFORE` (P31).** A page that prints the command without the environment variable documents a command that exits 1 — and skipping the migration entirely leaves sign-in broken on **every** pre-v0.26 custom domain.
6. **P-h6. NAMING COLLISION.** `bin/ots migrate` (singular — Familia/Redis, tracked) and `bin/ots migrations` (plural — eight unrelated backfills with no state tracking) differ by **one character** and do completely different things. **Any page that mentions one must name both explicitly.**
7. **P-h7. The v0.23 page's only `sourceOfTruth` is an orphaned, unshipped script that names a nonexistent migration file (P37, P38, P39).** Its `CONFIG_MIGRATE` environment variable is read by nothing else, so the page's Docker instructions cannot work. **A false statement on a published upgrade page is worse than a missing one — fix this before the new page ships, not after.**
8. **P-h8. The v0.24 page's step 7 points at `scripts/upgrade/v0.24.0/`** — wrong name (`upgrades`), wrong version (v0.24.5), and deleted from the tree (P40). The pipeline now lives only at the release tag.
9. **P-h9. Three of the eight `bin/ots migrations` verbs** (`grant-probono-entitlements`, `backfill-stripe-email-hash`, `backfill-subscription-status`) are **billing/Stripe-only and inert on a stock self-hosted install**. Listing them on an operator upgrade page without that caveat contradicts the governing fact.
10. **P-h10. Two shipped comment blocks are stale relative to shipped code**: `20260606_01`'s header says "Familia 2.10.1 (the version we run)" when the pin is **2.12.0**, and `apps/web/auth/migrations/README.md:15` misspells the role it tells operators to expect. **Cite the code and the Gemfile.lock, never the prose.**
11. **P-h11. Catalog provenance — CORRECTED.** An earlier pass claimed the app-repo `etc/billing.yaml` was a symlink to `etc/examples/billing.example.yaml` and attributed keys to it on that basis. **Both halves were wrong.** Resolved (`ls -l` then `readlink -f`), `/Users/d/Projects/dev/onetimesecret/onetimesecret/etc/billing.yaml` points at `~/.config/onetimesecret-dev/billing.yaml` → `/Users/d/Projects/_/dotfiles/dotconfig/onetimesecret-dev/billing.yaml`: **a developer's local dev config, in a third repository, outside both the app repo and the docs repo.** It is 420 lines to the docs-repo copy's 402, so a divergence is real, but it is **UNSOURCED** — no reader can fetch it, no commit pins it, and nothing in CI can reproduce it. **No claim about its contents is made anywhere in this ledger, and none may be added.** Separately: `etc/examples/billing.example.yaml` **does** exist at 4cbd42149 (368 lines, sha256 `f72612d1de99423bc819d3f232064b46f8ca2681743d17146614347edc889826`) and is the only tracked, citable comparison artefact. Against it, the docs-repo copy is production-shaped (`app_identifier: "onetimesecret"`, "ALL REGIONS (no stripe IDs)" header, dated 2026-07-20) and **lacks three keys the example carries** — `checkout_host`, `automatic_tax`, `payment_method_configuration` (verified by parsing both top-level key sets). The **docs-repo copy remains authoritative** for this ledger. **Cite by key path and record the sha; never cite either by line number.**

### P.9 Hosted vs self-hosted

Nothing in this section is hosted-only in code — the same runner, the same eight migrations, the same
Registry and the same auth migrator run everywhere. The difference is **who runs them**. The hosted
service applies migrations as part of its own deploy process and holds the operational knowledge of
which release needed which migration; the repo carries **no machine-readable record of that mapping**
(P-g5), so a self-hoster has nothing to consult. That asymmetry is the reason this page needs to
exist: a self-hoster upgrading from v0.24 to current must discover, unaided, that migration 4 is
needed for v0.25, that migration 8 is needed for v0.26 **and requires a mandatory environment
variable**, that the default `bin/ots migrate --run` sees only one directory, and that the
per-migration form printed in every file's own header will leave the status table lying to them.
Two of the eight migrations (P24, P25) were written **for the hosted install's test data** and should
be presented to a self-hoster as "almost certainly not for you", not as upgrade steps. The auth
schema migrations are the one part that genuinely takes care of itself — but only in full auth mode,
and on SQLite only if the operator stops the old instance first (P3).

---

## L. Conflicts between subjects — mark for resolution

**L1 and L2 are SETTLED and closed** — the corrections pass re-verified both at 4cbd42149. They are
retained below only as the record of *how* they were settled and **must not be re-litigated**. **L3–L5
are the live items**: recorded, **not resolved**, and a writing pass must not pick one silently.

### Settled — closed, retained as record. Do not re-open.

**L1. `API_ENABLED` — does it actually gate `/api/*`? — RESOLVED at 4cbd42149. It does not.**
*(cross-ledger; both ledgers updated)*

- **The claim in dispute.** §E27 (feedback-channel subject) said `site.interface.api.enabled` /
  `API_ENABLED` is **UI-advisory only**. Configure-ledger row E16 said "the whole API can be switched
  off … `/api/*` then returns 404", citing the defaults-file comment.
- **Resolution — read at the pin, not inferred.** **§E27 is right; E16 is wrong.**
  1. **No server-side reader exists.** `git grep -n "API_ENABLED" 4cbd42149` returns exactly three
     hits, none of them code: `.env.reference:1003`, `etc/defaults/config.defaults.yaml:203`, and the
     spec note at `docs/specs/install-onboarding/install-onboarding-work-chunks.md:500`.
     `git grep -n "'api', 'enabled'" 4cbd42149 -- lib apps src` returns one non-spec hit:
     `apps/web/core/views/serializers/config_serializer.rb:44`.
  2. **The whole consumer chain is presentational**, end to end:
     `config_serializer.rb:44` → `src/schemas/contracts/bootstrap.ts:230-232` (`apiInterfaceSchema`),
     `:554` → `src/shared/stores/bootstrapStore.ts:184` (`apiConfig` getter) →
     `src/apps/workspace/account/settings/ApiSettings.vue:18`, `:33` (`v-if="!apiConfig.enabled"` — a
     notice on the account API settings page). **That is the only thing it does.**
  3. **The app's own shipped documentation says so, in the app's own words.** `.env.reference:998-1002`
     reads: *"Whether the JSON API is advertised as enabled (site.interface.api.enabled). Only
     surfaced to the web frontend via the bootstrap config (the account API settings page shows a
     disabled notice); it **does NOT block /api/\* requests server-side**."*
- **The source of the error is identified.** `etc/defaults/config.defaults.yaml:200-201` — the sole
  evidence E16 rested on — reads "When disabled, the API is completely disabled. Requests to /api/\*
  will return 404." **That shipped comment is wrong, and it contradicts `.env.reference` in the same
  repo at the same commit.** Two shipped documents disagree; the code has no reader at all, and
  `.env.reference` matches the code.
- **Recorded in both ledgers.** Configure-ledger row E16 has been corrected in place. **No runtime
  capture is needed to state this**; §M item 1 is closed accordingly. The one thing still not
  established is whether `API_ENABLED=false` produces any *other* user-visible effect beyond the
  ApiSettings notice — no other consumer was found, but the frontend was searched by symbol, not
  exhaustively.

**L2 — DELETED. The conflict it recorded does not exist.**

An earlier pass recorded a per-name line-attribution conflict over
`lib/onetime/models/organization/features/with_plan_entitlements.rb:48-56` and asserted that "at most
one attribution can be right". **Re-read at 4cbd42149: all four subjects were right and none of them
disagreed.** The constant spans seven lines and each subject cited the line its own name is on:
`:49` `create_secrets view_receipt api_access notifications`; `:50` `extended_default_expiration`;
`:51` `manage_teams manage_members audit_logs workspace_branding ip_access_rules`;
`:52` `custom_domains homepage_secrets incoming_secrets`;
`:53` `custom_branding custom_privacy_defaults`;
`:54` `custom_mail_sender flexible_from_domain`;
`:55` `custom_signin_config custom_signup_validation manage_sso manage_org manage_billing`.
So `custom_domains` at `:52` (caddy subject) ✓, `incoming_secrets` at `:52` and `manage_org` at `:55`
(incoming subject) ✓, `custom_branding` at `:53` (branding subject) ✓, `workspace_branding` at `:51`
(row 0.4) ✓, and `:51,55` (K35) ✓. **22 names; `manage_orgs` is not among them.** The settled
attribution now lives in row 0.2. **Nothing here is left for the writing pass to re-litigate.**
*(The L-numbering below is unchanged so existing cross-references still resolve.)*

### Open — recorded, not resolved

**L3. The disabled-homepage variant resolution chain — three rungs or four?** *(superset, not a
contradiction)*

- **§A16 (interface subject):** four rungs — `?variant=` query param → per-domain
  `homepage_config.disabled_homepage_variant` → deployment-wide default split by context → frontend
  constant `closed`. Cites `src/apps/secret/views/disabled/useDisabledConfig.ts:328-356`.
- **§F38 (incoming subject):** the same chain **without** the `?variant=` rung. Cites
  `etc/defaults/config.defaults.yaml:77-84` and `homepage_config.rb:74-81,144-149`.

**Assessment:** not a contradiction — §F38 was scoping the per-domain half and did not look at the
query-param override, which §A22 independently verifies as an operator preview mechanism. **Use §A16's
four-rung chain**; §F38's three rungs are a correct subset.

**L4. In-app contradictions the researchers found (not researcher disagreements).** Each is already
recorded in the owning section's hazards; collected here so a writing pass sees them together. In
every case **the code / shipped defaults file is the authority, and the prose is stale**:

| Subject | Shipped default / code says | Comment, ADR or README says | Row |
|---|---|---|---|
| i18n master switch | `config.defaults.yaml:1290` and `config.rb:158` → **false** | `.env.reference:932` sets `I18N_ENABLED=true` as a live line; frontend contract defaults **true** | C3, C-h1, C-h2 |
| `jobs.domain_refresh.enabled` | `config.defaults.yaml:1179` → **true** | `domain_refresh_job.rb:14` and ADR-018 → "disabled by default" | G36, G-h6 |
| `FEDERATION_SECRET` generation | `lib/tasks/init.rake:167-175` **generates** a 5-word passphrase | `adr-008:53` → "validates presence but does not generate it" **and** `.env.reference:58` → "Not auto-generated" — **two shipped sources, both wrong** | J19, J-h3 |
| `API_ENABLED` | **no reader in `lib/`, `apps/` or `src/`** except the bootstrap serializer; `.env.reference:998-1002` → "does NOT block /api/* requests server-side" | `config.defaults.yaml:200-201` → "Requests to /api/* will return 404" | §L1 (resolved), E27, Configure E16 |
| `match_fields` | `catalog push` **reads it** (`push.rb:57,136-143`) and it controls duplicate-product creation | the catalog's own comment → "Reserved for future composite-key matching. Not read at runtime" | J43, K16, J-h10 |
| `stripe_metadata_schema.region` | fail-closed matching **rejects** a product with no region (`region_normalizer.rb:76-84`) | the catalog → "omit for global plans" | J46 |
| `DEFAULT_DOMAIN` | the link host is `receipt.share_domain` or `site.host`; **no URL builder reads this key** | `config.defaults.yaml:776-777` → "The default domain used for link URLs", plus two frontend comments | O10, O11, O-h1 |
| `share_domain` persistence | `Receipt.spawn_pair` **persists** it onto both Secret and Receipt (`receipt.rb:292,306`) | `base_secret_action.rb:62` → "we return the value, but don't save it" | O23 |
| `FREE_TIER_ENTITLEMENTS` | 6 names; `free_v1` in the catalog holds 8 | `with_plan_entitlements.rb:62` → "These match the free_v1 plan in billing.yaml" | K40 |
| membership entitlement overrides | **two** adapters exist (CLI + colonel routes) | `entitlement_override.rb:80-86` decision D19 → "zero adapters" | K29 |
| `bin/ots migrate <ID> --run` | bypasses the Runner and **records no applied state** | every one of the eight migration headers documents only that form | P13, P-h1 |
| `bin/ots migrate --dry-run` | **no `:dry_run` option is declared** on the command | the command's own usage header at `migrate_command.rb:13` advertises it | P20 |
| ADR-021 plan gate | no `multi_team_v1` plan exists in the authoritative catalog | `adr-021…:18` names "`multi_team_v1` plan gate" | N-h8 |
| ADR-021 actor attribution | shipped code stores `actor` and `actor_id` | `adr-021…:33` context table → "no actor attribution" | N-h9 |
| `MAX_IMAGE_BYTES` | `update_domain_image.rb:18` → **2 MB** | the constant's own annotation → `# 1 MB` | B45, B-h2 |
| ACME `check_verification=false` | removed from the HTTP interface (`application.rb:46-49`) | `apps/internal/acme/README.md:24,30,81-89` still documents it | G26, H6 |
| `ORGS_INCOMING_SECRETS_ENABLED` | UI-exposure only (`config_serializer.rb:260` is the sole reader) | `config.defaults.yaml:727-729` and `.env.reference:938-939` call it an emergency kill switch | F48, F-h1 |
| `add_domain` entitlement check | live `require_entitlement_in!` at `add_domain.rb:63` | stale comment at `:65-66` says it was removed | G7, G-h7 |
| per-domain WCAG contrast | **not** enforced on save (`brand_settings.rb:151-160`) | `docs/architecture/branding.md:278` says it is | B42, B-h3 |
| `BrandSettings` field count / fonts | 25 members; 8 fonts | `docs/architecture/branding.md:26,280` say 22 fields, 3 fonts | B39, B41, B-h3 |
| named brand packs | `public/branding/{linkdepot,vshare}` are **tracked** | `.env.reference:1547-1548` says named packs are "never committed" | B22, B-h4 |
| banner propagation | 30-second per-process re-read | CLI success text says "next boot or re-read" | D17, D-h1 |
| banner `displayGlobalBroadcast` | no production caller sets it false | CLI hint says branded surfaces use it | D-h1 |
| feedback lockout | `LOCKOUT_DURATION = 1200` (**20 min**) | docstring and runbook say "an hour" | E21, E-h2 |
| feedback request shape | server reads `msg`/`tz`/`version` | generated schema declares `{message, email}` | E2, E-h4 |
| jurisdiction domains on the wire | `config_serializer.rb:562` **sends** the domain | call-site comment at `:56` says it does not | J47, J-h5 |
| disabled-homepage variant wiring | serialized at `domain_serializer.rb:154`, `config_registry.rb:309` | `src/apps/secret/views/disabled/README.md:42-44,57-59` says "TBD" | A-h7 |
| homepage mode values | `determine_homepage_mode` returns nil / `internal` / `external` | `initialize_view_vars.rb:151-153` says "nil, 'protected'" | A-h8 |

**L5. Resolved by cross-reading (recorded so it is not re-litigated).** The branding subject's gap
B-g1 ("did not establish a server-side refusal for `DOMAINS_ENABLED=false` on `/api/domains/*` write
endpoints") is answered in the same direction by §G6, which verified by absence that `AddDomain`
performs **no** feature-flag check. Both readings agree: **the flag does not gate the domains API.**
Neither subject checked every `/api/domains/*` endpoint, so the safe statement remains "the flag gates
classification and the UI, and at least `AddDomain` does not consult it".

---

## M. Open questions — stop and ask rather than infer

1. **CLOSED — `API_ENABLED=false` does NOT 404 `/api/*`.** (§L1, resolved at 4cbd42149.) No runtime
   capture was needed: there is no server-side reader, the whole consumer chain ends at one Vue notice
   (`ApiSettings.vue:33`), and `.env.reference:998-1002` states outright that it "does NOT block
   /api/* requests server-side". The shipped comment at `config.defaults.yaml:200-201` is the source
   of the error. Both this ledger (§L1) and Configure-ledger row E16 now record the answer. **The one
   residual:** whether the flag has any user-visible effect beyond that notice — no other consumer was
   found, but the frontend was searched by symbol, not exhaustively.
2. **Is the canonical-homepage session check broken on a stock install?** (§A hazard 1.) The gate reads
   a cookie name that does not exist and could not be read even if it did (HttpOnly). If confirmed at
   runtime, `AUTH_REQUIRED=true` shows the gated page to **authenticated** users too — which changes
   what the page must tell operators about `auth.required`. **One browser session settles it.**
3. **Is `LocalhostOnly` on the ACME endpoint spoofable, and can IP masking break genuine loopback?**
   (§H gaps H-g3/H-g4.) The resolution lives in the external otto 2.8.0 gem. Until it is read, the
   only defensible guidance is the app's own: block `/api/internal/acme/*` at the proxy.
4. **Where does the broadcast banner actually live when the connection URL points at a non-zero DB?**
   (§D-h8.) The banner ops call `Familia.dbclient(0)` explicitly while the `VALKEY_DBS_*` mapping is
   documented as informational. **Do not publish a `valkey-cli` recipe until this is checked.**
5. **What is the real Redis key for the feedback sorted set?** (§E-g1.) `feedback:instances` is
   probable but comes from Familia gem convention plus a test fixture, not from app source.
6. **CLOSED — there is no `features/caddy-on-demand-tls` page.** (§H.) Decided: no page, because the
   ask endpoint returns 403 for every domain under its own strategy. §H is retained as the record of a
   non-functional path; `features/custom-domains` owes one honest paragraph. **Reopens only when the
   `resolving` axis is actually written under `caddy_on_demand`** — see the condition stated at the
   head of §H. Nothing else reopens it.
7. **CLOSED — the page is `features/regions-and-federation`.** (§J.) Renamed from
   `features/multi-region`, and the earlier "not a real feature" reading is **withdrawn**: siloed
   deployments are a real operating practice, and billing federation is the one thing that crosses.
   Rationale for the name is stated at the head of §J.
8. **How much of homepage mode should `features/interface-and-homepage` carry?** (§A.) The app's own
   spec proposes deleting the machinery. A short honest section is defensible; a how-to is not.
9. **Where is the §A / §B boundary?** (gap A-g5.) The masthead **layout** knobs sit under
   `site.interface.ui.header`; brand **identity** sits in the top-level `brand:` block. Both pages
   will want the logo. Decide once, explicitly, and cross-link.

**Added by the three out-of-group sections (§N, §O, §P).**

10. **Which group owns `LINK_DOMAINS` / `DEFAULT_DOMAIN`?** (§O.) The researcher recommended a page
    shape (the decision table) but **named no group**. The material is install-wide config-key shaped,
    so the **configure group** is the natural home with a cross-link from `features/custom-domains` —
    but this is a docs-owner decision and §O records it as such, not as settled.
11. **Is `DEFAULT_DOMAIN`'s non-appearance in generated links a bug to be fixed rather than
    documented?** (§O gap O-g1, hazard O-h2.) The central claim rests on an exhaustive grep, **not on
    an observation**. One runtime check settles it: set `DEFAULT_DOMAIN` to a host different from
    `site.host`, create a secret with no `share_domain`, read the returned `share_url`. **If the
    behaviour is judged a bug and gets fixed, §O's core table changes — so no page should ship ahead
    of that decision.**
12. **Which plan grants `audit_logs` on the hosted service today?** (§N gap N-g3.) The authoritative
    operator-supplied catalog grants it to **no plan**, and neither does the shipped
    `etc/examples/billing.example.yaml`; the tracked auto-generated
    `apps/web/billing/docs/plan-definitions.md:218` grants it to `team_plus_v1`; and the live truth
    is Stripe product metadata, not any YAML in either repo. **The published
    `audit-trail.md` asserts Team Plus and cannot be left standing on that evidence.**
13. **Is `bin/ots migrate` ever safe to put in front of an operator without a per-version manifest?**
    (§P gap P-g5.) **No mapping from a target version to the migrations it requires exists anywhere in
    the repo.** Any "upgrading to vX requires A, B, C" table would be synthesised. §P recommends
    stating, per migration, only the version transition its own header names.
14. **Run the catalog through its own validator, and trace customer→organization `planid`
    propagation.** (§K gaps G1 and G4.) K55 is currently the only actionable "how do I put an org on a
    plan" answer and its scope is unresolved. Both should close before the §K page is written.

---

## Do not claim

- **"Enable the `custom_domains` / `custom_branding` / `incoming_secrets` entitlement", or that any
  feature in this sub-tree is plan-gated, for a self-hoster.** All are in `STANDALONE_ENTITLEMENTS`
  and billing is off on a stock install. Row 0.1–0.3.
- **"There is a workspace branding feature."** The entitlement name exists in the plan catalogue and
  is enforced **nowhere** in `lib/`, `apps/` or `src/`. Row 0.4.
- **"TXT ownership verification protects your custom domains."** Not on the shipped default strategy.
  `passthrough`'s `validate_ownership` returns `validated: true` unconditionally, so the first verify
  call marks **any** domain verified and ready (G23, G-h1). The only strategy that checks DNS is
  `approximated`, a paid third-party service.
- **"Set `DOMAINS_ENABLED=false` to turn custom domains off."** It gates request classification and
  the nav item, **not the domains API** (G6, G-h9).
- **"Enable `caddy_on_demand` and Caddy will get certificates for your customers."** It returns 403 for
  every domain at this pin (H5). Do not write the walkthrough without the blocker.
- **"Copy the `on_demand_tls` block from `etc/examples/Caddyfile-example`."** It is commented out and
  names the wrong port and the wrong path, and the file has no catch-all HTTPS site (H22, H23).
- **"Pass `check_verification=false` to the ACME endpoint."** Removed from the HTTP interface; only the
  stale README still documents it (G26, H6).
- **"The workspace domain status badge tells you whether a domain is working."** It reads
  `vhost.status` — which only Approximated populates — except when a recent status-fetch failure makes
  it read "unverified" instead. On passthrough and caddy domains it is permanently "Inactive" or
  "unverified", and means nothing either way (G41, G-h4).
- **"`UI_HOMEPAGE_MODE=internal` restricts the homepage to your office networks."** `internal` is inert
  in every configuration, and `external` alone with no CIDRs is a no-op (A9, A10). Do not quote
  `etc/examples/homepage_modes.example.yaml` as a working recipe (A-h3).
- **"Homepage mode is an allowlist."** It is a **blocklist** for the listed networks; everyone else
  falls through to the normal homepage (A11).
- **"`UI_ENABLED=false` disables the app."** It renders one page differently and gates nothing else —
  not other routes, not the API (A24, A25).
- **"Set `ORGS_INCOMING_SECRETS_ENABLED=false` to disable incoming on custom domains."** The shipped
  config comment says this and it is **false** — the key is UI-exposure only (F48, F-h1).
- **"Set `INCOMING_ENABLED=true` and canonical incoming works."** Without at least one
  `INCOMING_RECIPIENT_*` the form is live and every submission fails, and recipient changes need a
  **restart** (F9, F-h2).
- **"Configure `FEEDBACK_TO_EMAIL` and feedback will be emailed to you."** False on a stock instance:
  `fallback: :none` plus `jobs.enabled: false` means **no feedback email is ever sent** (E13, E14,
  E-h8). Read feedback on the colonel dashboard.
- **Anything that conflates user feedback with ESP deliverability "feedback loops"** (`bin/ots email
  sync-feedback`, `lib/onetime/mail/feedback/*`). Different feature entirely (E-h1).
- **"Set `BRAND_LOGO_URL` and your logo appears everywhere."** Emails need `EMAILER_SHOW_LOGO=true`
  (ships false) **and** an absolute `http(s)` URL; three surfaces enforce three different rules
  (B11, B-h6, B-h7).
- **"Brand-pack changes take effect on reload."** They need a **restart** (B28, B-h9).
- **"Set `BRAND_ALLOW_PUBLIC_HOMEPAGE`."** No such env var — those two keys are YAML-only (B16, B-h10).
- **"Tenant logo uploads must be PNG/JPG under 1MB."** Seven types up to 2 MB for logos; nine up to
  512 KB for icons. The published hosted page is wrong (B45, B56).
- **"`#DC4A22` is the brand default."** It is the retired OTS orange; the neutral default is `#3B82F6`
  (B35, B57).
- **"i18n is on by default"** *or* **"i18n is off by default"** without naming which file the reader
  started from. The YAML/DEFAULTS say false; `.env.reference` sets it true as a live line (C3, C-h1).
- **"Restrict the locale list with an environment variable."** There is none — it is YAML-only (C9,
  C-h9).
- **"Locale X is fully translated."** Key-level coverage was never measured (C-g1).
- **"Turning on regions gives you a multi-region deployment."** It publishes a hostname list and
  renders a link menu. Nothing replicates, syncs or transfers — **and that is the design, not a
  shortfall** (J6, J-h1).
- **"Your subscription follows you between regions"** on an operator page. That is hosted, Stripe-
  mediated federation and requires one shared Stripe account plus a shared `FEDERATION_SECRET`
  (J13, J28). What crosses is the subscription's *benefit* — status, plan id, period end — never user
  content, credentials or identity (J25).
- **"Region domains are not exposed to visitors."** They are, to anonymous visitors, in the bootstrap
  payload — and the in-code comment at `config_serializer.rb:56` claiming otherwise is stale
  (J47, J-h5).
- **"Regions are hidden when `REGIONS_ENABLED=false`."** The settings navigation still shows a Region
  section on any full-auth install (J50).
- **"The banner is sanitized before storage."** It is stored verbatim; sanitization is client-side only
  (D13, D14, D-h5).
- **"Publishing a banner requires the colonel role."** True of the API and admin console; **`bin/ots
  banner` performs no role check at all** (D22).
- **Any price.** Hard stop. The operator-supplied catalog and the tracked auto-generated plan
  reference disagree on every price at this pin (K45). Per-plan entitlements and limits may be stated
  **only** as "in the catalog this install was written against", never as product facts, and never
  from `etc/examples/billing.example.yaml` or `apps/web/billing/docs/plan-definitions.md` (§K).
- **"Enable the `custom_domains` entitlement"** — or any instruction to a self-hoster to configure an
  entitlement. There is no such knob (K56).
- **"`API_ENABLED=false` turns the API off"** or **"`/api/*` returns 404".** It is UI-advisory only;
  the sole effect is a notice on the account API settings page. The shipped comment at
  `config.defaults.yaml:200-201` that says otherwise is wrong (§L1, E27, Configure E16).
- **"Secret Activity / the audit trail is a Team Plus feature."** On a stock self-hosted install
  `audit_logs` is in `STANDALONE_ENTITLEMENTS` and **role is the whole answer**; and the authoritative
  operator-supplied catalog grants `audit_logs` to **no plan at all** (N10, N11, N-h1). The published
  `audit-trail.md` frontmatter and line 16 are wrong on both counts.
- **"The Secret Activity trail is a complete record of your organization's secrets."** v1-API-created
  secrets are absent, anonymous-created secrets are absent, and any single receipt stops contributing
  fetch events after 100 (N26, N27, N28, N-h10).
- **"Secret Activity only records what the table shows."** Fetch events also store a masked IP, a
  stripped User-Agent and a stable HMAC correlation token — never displayed, always returned by the
  API, no TTL, no established purge path, **on by default about anonymous recipients** (N22, N24,
  N-h5).
- **"Lower `SECRET_ACTIVITY_MAX_EVENTS` to save memory."** Not without saying it **deletes** the
  excess, lazily and silently, on each org's next event (N17, N-h4).
- **"Set `DEFAULT_DOMAIN` to change the hostname in your secret links."** It does not appear in
  generated links at all — `site.host` does — and on a split deployment selecting it in the picker is
  **silently discarded** (O10, O12, O-h1, O-h2). Three shipped comments say otherwise; they are wrong.
- **`LINK_DOMAINS=` in any copy-paste `.env` block.** Set-but-empty is a **boot failure**, and so is
  any list whose hosts have no public suffix (`links.internal`) (O4, O5, O-h3, O-h4).
- **"Run `bin/ots migrate --run` to apply pending migrations."** It sees only the newest dated
  directory — one of eight migrations at this pin (P10, P-h2).
- **"Run `bin/ots migrate <ID> --run`"** without saying it **records no applied state**, so `--status`
  still shows Pending and a later run re-executes it (P13, P-h1). Every shipped migration header
  documents only this form.
- **"`bin/ots migrate --dry-run`"** — the flag is advertised in the command's own help but **is not a
  declared option**. Preview by omitting `--run` (P20).
- **"Roll back with `bin/ots migrate --rollback`."** No shipped migration defines `down`; every attempt
  exits 1. The only recovery path is a Redis backup taken first (P19, P-h3).
- **`-e CONFIG_MIGRATE=auto`, or the `migrations/20250727-1523_01_convert_symbol_keys.rb` path, or
  `./scripts/upgrade/v0.24.0/`.** All three are published today and all three are wrong at this pin
  (P37, P38, P39, P40).
- **Any "upgrading to vX requires migrations A, B, C" table.** No such mapping exists anywhere in the
  repo; it would be synthesised (P-g5).
- **Anything about what onetimesecret.com has configured.** Every value here comes from
  `etc/defaults/`, `.env.reference` or code. There is no production config in this repo.
