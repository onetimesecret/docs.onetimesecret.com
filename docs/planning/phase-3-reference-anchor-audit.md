# Phase 3 — reference anchor audit: can D-4.1 actually be executed?

**What this is:** the linkability audit that decision D-4.1 depends on. D-4.1 says operator pages do not
restate defaults; they link to `self-hosting/environment-variables` and `self-hosting/configuration` and
carry a `sourceOfTruth`. That only works if those two pages expose anchors at the granularity the 12
upcoming `install/` and `configure/` pages need. This measures what they actually expose.

Measured 2026-08-10 in-repo. App citations re-pinned to `onetimesecret@75ce160` (2026-08-10) by reading
each file at HEAD; every line number below was read, not carried forward from the prep documents.

**Verdict up front: D-4.1 does not hold as written and needs a stated exception.** Nine of the twelve
target pages have no anchor to link to. Details in §3 and §5.

---

## 0. Two prep-document figures are wrong, and the correction is the finding

The prep doc §1 records `environment-variables.md` as "157 headings" and `configuration.md` as "12
headings total". Both counts come from `grep '^#'`, which counts YAML and shell comment lines inside
fenced code blocks. The real counts, computed with the repo's own slugifier — `bin/lib/frontmatter.mjs`
`headings()` at `:143-172`, which tracks fence state at `:146-155` and skips fenced lines — are:

| Page | Lines | grep `^#` | **Real markdown headings** |
|---|---|---|---|
| `environment-variables.md` | 498 | ~157 | **14** |
| `configuration.md` | 636 | 14 | **3** |

That is the whole audit in one row. These pages are not 157 documented settings with 157 anchors; they
are **17 anchors total across 1,134 lines**, and most of the content sits inside code fences where no
anchor can ever be generated.

---

## 1. Full anchor inventory — `environment-variables.md`

Path: `/Users/d/Projects/ops/sites/docs.onetimesecret.com/src/content/docs/en/self-hosting/environment-variables.md`
(498 lines). Slugs computed by `headings()` / `slugifyHeading()` in `bin/lib/frontmatter.mjs`, so they
match what Starlight emits and what `check-frontmatter.mjs` asserts against.

**All 14 anchors:**

| Line | Depth | Slug | Section |
|---|---|---|---|
| 14 | h2 | `#environment-variables` | Environment Variables |
| 18 | h3 | `#v025` | v0.25 |
| 359 | h3 | `#v024` | v0.24 |
| 363 | h3 | `#core-application-settings` | Core Application Settings |
| 374 | h3 | `#database--storage` | Database & Storage |
| 382 | h3 | `#authentication--security` | Authentication & Security |
| 396 | h3 | `#user-interface--features` | User Interface & Features |
| 411 | h3 | `#branding--content` | Branding & Content |
| 429 | h3 | `#sending-emails` | Sending Emails |
| 445 | h3 | `#secrets--ttl` | Secrets & TTL |
| 457 | h3 | `#validating-email-addresses` | Validating Email Addresses |
| 468 | h3 | `#internationalization` | Internationalization |
| 475 | h3 | `#development--debugging` | Development & Debugging |
| 486 | h3 | `#monitoring--error-tracking` | Monitoring & Error Tracking |

Note the ampersand slugs collapse to a **double hyphen** (`#database--storage`, not
`#database-storage`). Any hand-written link that guesses the single-hyphen form resolves to nothing, and
nothing in the build catches it — `check-frontmatter.mjs`'s fragment assertion (`:212-263`) validates
fragments that appear in `config/redirects.mjs`, not fragments in page prose.

### 1.1 The structural problem: eleven of the fourteen anchors point at the superseded stack

`### v0.25` (line 18) opens a code fence at line 20 and it does not close until line 355. **335 lines,
one fence, zero headings inside it.** Every variable in the current stack — 116 distinct names — lives
under the single anchor `#v025`.

The eleven topic-shaped anchors (`#core-application-settings` … `#monitoring--error-tracking`) are all
children of `### v0.24` at line 359. They index the **superseded** stack, whose contents are in several
places wrong at HEAD (§4).

So the file's granularity is exactly inverted from what D-4.1 needs: topic anchors exist only for the old
variable set, and the current variable set has one anchor covering everything from `SECRET` to
`WORKER_HEARTBEAT_INTERVAL`.

### 1.2 Variables by topic, with the anchor that reaches them

Line ranges are within the v0.25 fence unless the row says v0.24.

| Topic | Variables | Lines | Reachable anchor |
|---|---|---|---|
| **Secrets & crypto** | `SECRET`, `SESSION_SECRET`, `IDENTIFIER_SECRET`, `AUTH_SECRET`, `ARGON2_SECRET`, `FEDERATION_SECRET` | 24–54 | `#v025` only |
| **Deployment / site identity** | `HOST`, `SSL`, `RACK_ENV`, `NODE_ENV` | 71–81 | `#v025` only |
| | v0.24: `SECRET`, `PORT`, `HOST`, `SSL`, `SERVER_TYPE`, `RACK_ENV` | 365–372 | `#core-application-settings` |
| **Redis / Valkey** | `REDIS_URL`, `VALKEY_URL` | 61–63 | `#v025` only |
| | v0.24: `REDIS_URL` + the `VALKEY_` prefix note | 376–380 | `#database--storage` |
| **Postgres / RabbitMQ (full auth)** | `AUTH_DATABASE_URL`, `AUTH_DATABASE_URL_MIGRATIONS`, `RABBITMQ_URL` | 65–68 | `#v025` only |
| **Secret TTL** | `TTL_OPTIONS`, `DEFAULT_TTL`, `PLAN_TTL_ANONYMOUS` | 84–100 | `#v025` only |
| | v0.24: `DEFAULT_TTL`, `TTL_OPTIONS`, `DEFAULT_DOMAIN`, `ALLOW_NIL_GLOBAL_SECRET` | 447–454 | `#secrets--ttl` |
| **Email (transport)** | `EMAILER_MODE`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_AUTH`, `SMTP_TLS`, `FROM_EMAIL`, `FROM_NAME`, `EMAILER_REGION`, `VERIFIER_EMAIL`, `VERIFIER_DOMAIN` | 103–120 | `#v025` only |
| | v0.24: same set plus `FROM`, `FROMNAME` | 431–443 | `#sending-emails` |
| | v0.24: `VERIFIER_DOMAIN`, `VERIFIER_EMAIL` + Truemail note | 461–466 | `#validating-email-addresses` |
| **Email provider DNS** | `EMAIL_PROVIDERS_SES_REGION`, `EMAIL_PROVIDERS_SENDGRID_SUBDOMAIN`, `LETTERMINT_API_TOKEN`, `LETTERMINT_TEAM_TOKEN`, `LETTERMINT_BASE_URL`, `EMAIL_PROVIDERS_LETTERMINT_SPF_INCLUDE` | 180–218 | `#v025` only |
| **Auth** | `AUTHENTICATION_MODE`, `AUTH_ENABLED`, `AUTH_SIGNUP`, `AUTH_SIGNIN`, `AUTH_AUTOVERIFY`, `AUTH_EMAIL_AUTH_ENABLED`, `AUTH_LOCKOUT_ENABLED`, `AUTH_MFA_ENABLED`, `AUTH_WEBAUTHN_ENABLED`, `AUTH_PASSWORD_REQUIREMENTS_ENABLED`, `AUTH_ACTIVE_SESSIONS_ENABLED`, `AUTH_VERIFY_ACCOUNT_ENABLED`, `AUTH_PASSWORD_ONLY`, `AUTH_EMAIL_AUTH_ONLY`, `AUTH_WEBAUTHN_ONLY`, `AUTH_SSO_ONLY` | 123–154 | `#v025` only |
| | v0.24: `AUTH_ENABLED`, `AUTH_SIGNUP`, `AUTH_SIGNIN`, `AUTH_AUTOVERIFY`, `AUTHENTICATION_MODE`, `AUTH_DATABASE_URL`, `FEDERATION_SECRET` + the colonel note (`:394`) | 384–394 | `#authentication--security` |
| **SSO / OmniAuth** | `AUTH_SSO_ENABLED`, `SSO_DISPLAY_NAME`, `OIDC_*` (5), `ENTRA_*` (6), `GITHUB_*` (5), `GOOGLE_*` (5) | 221–263 | `#v025` only |
| **Organizations** | `ENABLE_ORGS`, `ORGS_SSO_ENABLED`, `ORGS_CUSTOM_MAIL_ENABLED`, `ORGS_INCOMING_SECRETS_ENABLED` | 156–178 | `#v025` only |
| **Custom domains** | `DOMAINS_ENABLED`, `DEFAULT_DOMAIN`, `DOMAINS_VALIDATION_STRATEGY`, `APPROXIMATED_*` (5) | 275–290 | `#v025` only |
| **Feature flags** | `REGIONS_ENABLED`, `JURISDICTION`, `I18N_ENABLED`, `I18N_DEFAULT_LOCALE`, `INCOMING_ENABLED`, `INCOMING_RECIPIENT_1`, `FOOTER_LINKS`, `PRICING_URL`, `TERMS_URL`, `PRIVACY_URL`, `STATUS_URL`, `ABOUT_URL`, `CONTACT_URL`, `WORKSPACE_*` (3) | 293–318 | `#v025` only |
| **UI / homepage / branding** | `UI_HOMEPAGE_MODE`, `UI_HOMEPAGE_MATCHING_CIDRS`, `UI_HOMEPAGE_MODE_HEADER`, `LOGO_URL`, `SITE_NAME`, `LOGO_SHOW_NAME` | 321–343 | `#v025` only |
| | v0.24: `UI_ENABLED`, `API_ENABLED`, `CSP_ENABLED`, `HEADER_ENABLED`, `HEADER_NAV_ENABLED`, `HEADER_PREFIX`, `DOMAINS_ENABLED`, `REGIONS_ENABLED` | 398–409 | `#user-interface--features` |
| | v0.24: `LOGO_URL`, `LOGO_ALT`, `LOGO_LINK`, `FOOTER_LINKS`, `ABOUT_URL`, `ABOUT_EXTERNAL`, `CONTACT_URL`, `PRIVACY_URL`, `PRIVACY_EXTERNAL`, `TERMS_URL`, `TERMS_EXTERNAL`, `STATUS_URL`, `STATUS_EXTERNAL` | 413–427 | `#branding--content` |
| **Jobs** | `JOBS_ENABLED`, `SNEAKERS_PID_PATH`, `SCHEDULER_PID_PATH`, `WORKER_HEARTBEAT_INTERVAL` | 346–353 | `#v025` only |
| **Billing** | `STRIPE_API_KEY`, `PUBLIC_STRIPE_API_KEY`, `STRIPE_WEBHOOK_SIGNING_SECRET` | 266–272 | `#v025` only |
| **i18n** | `I18N_ENABLED`, `I18N_DEFAULT_LOCALE` (v0.25 :300-301; v0.24 :471-472) | — | `#v025` / `#internationalization` |
| **Debug / monitoring** | v0.24: `ONETIME_DEBUG`, `LOG_HTTP_REQUESTS`, `STDOUT_SYNC`, `DIAGNOSTICS_ENABLED`, `FRONTEND_HOST`, `VITE_API_BASE_URL` | 477–484 | `#development--debugging` |
| | v0.24: `SENTRY_*` (7) | 490–498 | `#monitoring--error-tracking` |
| **Proxy / TLS / client IP** | **none** | — | **no anchor, no content** |
| **Sessions / cookies** | `SESSION_SECRET` only, and it appears under "SECRETS & CRYPTOGRAPHY" | 33–34 | `#v025` only |
| **Security headers** | `CSP_ENABLED` only, in the v0.24 block | 401 | `#user-interface--features` |

### 1.3 The dangling proxy cross-reference

Lines **331–333**, inside the v0.25 fence:

```
# Proxy trust is configured globally, not per feature. See TRUSTED_PROXY_ENABLED,
# TRUSTED_PROXY_MODE, TRUSTED_PROXY_DEPTH and TRUSTED_PROXY_HEADER in
# Installation & Deployment.
```

Three problems, all load-bearing for `install/reverse-proxy-and-tls`:

1. **None of the four variables is documented anywhere in this file, or in `configuration.md`.** The only
   place any of them is explained in the EN tree is `installation.md:265-267` — the Phase 1 correction —
   and that is prose about an nginx snippet, not a variable reference.
2. **"Installation & Deployment" is the `title` of `installation.md`** (`installation.md:2`), the page
   Phase 3 splits five ways. The moment stream B lands the split, this pointer names a page that no
   longer exists. It is inside a code fence, so `check:nav` cannot see it and the build stays green.
3. It is a bare sentence, not a link, so nothing in the redirect table will repoint it.

At HEAD the four variables are real and documented upstream:
`etc/defaults/config.defaults.yaml:485` (`trusted_proxy:` block), `:499`
(`enabled: <%= ENV['TRUSTED_PROXY_ENABLED'] == 'true' %>`, default **false**), `:503-511` (filter is the
default mode and ignores the `header` setting), and `lib/onetime/config.rb:211-217`, where the old
per-feature `UI_HOMEPAGE_TRUSTED_PROXY_DEPTH` is a registered deprecation pointing at
`site.network.trusted_proxy`.

---

## 2. The real structure of `configuration.md`

Path: `/Users/d/Projects/ops/sites/docs.onetimesecret.com/src/content/docs/en/self-hosting/configuration.md`
(636 lines).

```
 15  ## Configuration Files            → #configuration-files
 24  ## Main Configuration             → #main-configuration
 36  ### Key Configuration Sections    → #key-configuration-sections
 40  ```yaml  ────────────────────────────┐
                                          │  595 lines, no headings
636  ```      ────────────────────────────┘
```

**Three anchors. The fence opens at line 40 and closes at line 636 — 595 content lines, 93.5% of the
file, one block.** The prep doc's "one 596-line YAML fence from 40 to 636" is right; its "12 headings" is
the `grep '^#'` artefact (lines 359, 396 and 430–438 are YAML comments *inside* the fence, not headings).

### Verdict: it is a link to a wall

`#key-configuration-sections` is the last anchor in the file. Linking to it lands the reader at line 36,
four lines above a 595-line unbroken YAML block, with no in-page navigation, no table-of-contents entry
for anything inside it, and no way for a link to say *which* of the 118 `ENV[...]` references it means.
Starlight's right-hand ToC will show three entries for the entire page.

**A link to `configuration.md` is a link to a 595-line wall.** There is no anchor granularity here and
none can be added without restructuring the page, which is Phase 4's job. For D-4.1 purposes,
`configuration.md` offers exactly one usable destination — the page itself — and it is useful only as a
"the full YAML lives here" pointer, never as the target of a claim about a specific value.

Two further facts about that fence, both relevant to whether it should be linked at all:

- **It is a partial, drifted copy.** `etc/defaults/config.defaults.yaml` at HEAD is **1,543 lines** and
  references **225 distinct** `ENV[...]` names. The fence reproduces **118**. It is not a reference; it is
  a 39% excerpt of one.
- **The drift is demonstrable, not theoretical.** `configuration.md:257` reproduces
  `secure: <%= ENV['SSL'] == 'true' || false %>` under `site.session`. At HEAD the key is *omitted
  entirely* unless SSL is set, precisely so a production fallback can default it to true —
  `etc/defaults/config.defaults.yaml:378-384`, whose comment says emitting `null` fails schema
  validation. And `configuration.md:417-418` runs `mode:` straight into `region:`, missing
  `sender_provider: <%= ENV['CUSTOM_MAIL_PROVIDER'] || nil %>` which sits between them at HEAD
  (`etc/defaults/config.defaults.yaml:942`).

---

## 3. THE GAP LIST

For each upcoming operator page: what D-4.1 can link to, and what it cannot.

Legend — **LINKABLE**: a topic-scoped anchor exists. **WALL**: content exists but only `#v025` or
`#key-configuration-sections` reaches it, so the link cannot identify the value. **ABSENT**: the
reference does not document the subject at all.

### Install group

| Page | Subject | Status | Detail |
|---|---|---|---|
| `install/docker` | `SECRET`, `REDIS_URL`/`VALKEY_URL`, `HOST`, `SSL`, `RACK_ENV`, `AUTHENTICATION_MODE`, `JOBS_ENABLED` | **WALL** | all inside the v0.25 fence; only `#v025` |
| | `ACCOUNT_ID_SECRET`, `ARGON2_SECRET` sizing, `OTS_IMAGE_TAG`, `VALKEY_PASSWORD`, `RABBITMQ_USER`/`RABBITMQ_PASS`, `DOMAIN`, `CERTIFICATE_EMAIL` | **ABSENT** | none documented in either page. `ACCOUNT_ID_SECRET` is required in production full auth — `apps/web/auth/config/base.rb:22-27`, `docker/README.md:69`. The rest are compose-only vars: `docker/README.md:73-76`, `docker/compose/docker-compose.full.yml:70,77` |
| `install/linux` | `SECRET`, `HOST`, `SSL`, `REDIS_URL` | **WALL** | `#v025` |
| | `PORT`, `SERVER_TYPE` | **LINKABLE but stale** | `#core-application-settings` reaches them; both are misdescribed at HEAD (§4) |
| | `bin/setup --init`, `.env.example` provenance | **ABSENT** | mentioned in passing at `environment-variables.md:21-22`, no section |
| `install/run-as-a-service` | systemd units, `SNEAKERS_PID_PATH`, `SCHEDULER_PID_PATH`, `WORKER_HEARTBEAT_INTERVAL`, `JOBS_ENABLED` | **WALL** | the four jobs vars are at `:346-353`, inside the fence, `#v025` only. systemd itself has no heading anywhere — `installation.md:185-189`, per the handoff §5 |
| `install/reverse-proxy-and-tls` | `TRUSTED_PROXY_ENABLED`, `TRUSTED_PROXY_MODE`, `TRUSTED_PROXY_DEPTH`, `TRUSTED_PROXY_HEADER` | **ABSENT** | §1.3. The reference *names* them and points at a page that Phase 3 deletes |
| | `SSL`, `HOST` | **WALL** | `#v025` |
| | `MIDDLEWARE_STRICT_TRANSPORT` (HSTS) | **ABSENT** | `etc/defaults/config.defaults.yaml:450`, default on |
| `install/verify` | health checks, `bin/ots` doctor commands, boot-time secret verification (`SECRET_VERIFIER_MODE`) | **ABSENT** | nothing in either reference page. `SECRET_VERIFIER_MODE` exists upstream (`.env.reference:26-30`) and is documented in neither docs page |

### Configure group

| Page | Subject | Status | Detail |
|---|---|---|---|
| `configure/secrets-and-keys` | `SECRET`, `SESSION_SECRET`, `IDENTIFIER_SECRET`, `AUTH_SECRET`, `ARGON2_SECRET`, `FEDERATION_SECRET` | **WALL** | `environment-variables.md:24-54`, `#v025` only. The derivation model (HKDF from `SECRET`, which are independent) is stated there and nowhere else |
| | `ACCOUNT_ID_SECRET`, `SECRET_PREVIOUS`, `SECRET_VERIFIER_MODE` | **ABSENT** | all three exist at HEAD and are undocumented here. `.env.example:23,87`; `.env.reference:26-38` |
| `configure/authentication` | the 16 `AUTH_*` variables, `AUTHENTICATION_MODE` | **WALL** | `:123-154`, `#v025` only. The v0.24 anchor `#authentication--security` reaches a 7-variable subset with a wrong `AUTHENTICATION_MODE` line |
| | `AUTH_REQUIRED`, `ALLOWED_SIGNUP_DOMAIN`, `AUTH_REMEMBER_ME_ENABLED` | **ABSENT from `environment-variables.md`** | `AUTH_REQUIRED` and `ALLOWED_SIGNUP_DOMAIN` appear only inside `configuration.md`'s fence at `:228` and `:241` — i.e. inside the wall. `AUTH_REMEMBER_ME_ENABLED` (`etc/defaults/auth.defaults.yaml:72`, default on) is in neither page |
| `configure/sso` | `AUTH_SSO_ENABLED`, `OIDC_*`, `ENTRA_*`, `GITHUB_*`, `GOOGLE_*`, `SSO_DISPLAY_NAME` | **WALL** | `:221-263`, `#v025` only. This is the single best-documented block in the file and it has no anchor of its own |
| | `ORGS_SSO_ENABLED`, `restrict_to` semantics | **WALL / partial** | `ORGS_SSO_ENABLED` at `:168`; `restrict_to` is explained only as the four `AUTH_*_ONLY` vars at `:145-154`. Upstream: `etc/defaults/auth.defaults.yaml:107` |
| `configure/email` | `EMAILER_MODE`, `SMTP_*`, `FROM_EMAIL`, `FROM_NAME`, `VERIFIER_*` | **WALL for current; LINKABLE for v0.24** | `#sending-emails` and `#validating-email-addresses` reach the v0.24 forms, which include the dead `FROMNAME` (§4) |
| | `EMAIL_PROVIDERS_*`, `LETTERMINT_*` | **WALL** | `:180-218`, `#v025` only |
| | `CUSTOM_MAIL_PROVIDER`, `REPLYTO_EMAIL` | **ABSENT** | `etc/defaults/config.defaults.yaml:942,946`; in neither docs page |
| `configure/secret-options` | `DEFAULT_TTL`, `TTL_OPTIONS` | **LINKABLE, and both are stale** | `#secrets--ttl` reaches them at `:447-454`; the ceiling story changed (§4) |
| | `PASSPHRASE_REQUIRED`, `PASSPHRASE_MIN_LENGTH`, `PASSPHRASE_MAX_LENGTH`, `PASSPHRASE_ENFORCE_COMPLEXITY`, `GENERATED_VALUE_DISPLAY_TTL`, `PASSWORD_GEN_*` (6), `UI_CAPABILITIES_*` (4), `API_GUEST_*` (7) | **ABSENT from `environment-variables.md`; WALL in `configuration.md`** | 21 variables that shape the secret-creation form, none named in the env-var reference. They exist only inside `configuration.md`'s fence: `:62-65`, `:156-163`, `:176-203`. This is the largest single gap in the audit |
| `configure/sessions-and-cookies` | `SESSION_SECRET` | **WALL, and misfiled** | `:33-34`, filed under "SECRETS & CRYPTOGRAPHY" |
| | `session.expire_after`, `session.key`, `session.same_site`, `session.httponly`, `session.secure` | **ABSENT / WALL** | no env vars exist for these; they are YAML-only (`etc/defaults/config.defaults.yaml:370-389`). `configuration.md:249-262` shows them inside the wall, **and its `secure:` line is stale** (§2) |
| | `MIDDLEWARE_COOKIE_TOSSING` | **ABSENT** | `etc/defaults/config.defaults.yaml:442` |
| `configure/security-headers` | `CSP_ENABLED` | **LINKABLE (v0.24 only)** | `#user-interface--features` reaches `:401`; the stated default (`true`, only literal `'false'` disables) is **correct** at HEAD — `etc/defaults/config.defaults.yaml:463-465` |
| | `MIDDLEWARE_STRICT_TRANSPORT`, `MIDDLEWARE_IP_SPOOFING`, `MIDDLEWARE_COOKIE_TOSSING` | **ABSENT** | `etc/defaults/config.defaults.yaml:442,446,450`. Zero occurrences of `MIDDLEWARE_` anywhere in `src/content/docs/en/`. The page's entire subject beyond CSP is undocumented |

### Summary

| Outcome | Pages |
|---|---|
| **At least one usable topic anchor** (3) | `configure/secret-options`, `configure/security-headers`, `install/linux` — and in all three the reachable anchor belongs to the v0.24 block |
| **Wall only** (5) | `install/docker`, `install/run-as-a-service`, `configure/secrets-and-keys`, `configure/authentication`, `configure/sso`, `configure/email` |
| **Nothing to link to at all** (2) | `install/reverse-proxy-and-tls`, `install/verify` |

Coverage arithmetic, for the record: `environment-variables.md` names **146** distinct variables (**116**
in the current v0.25 block); `configuration.md`'s fence names **118**; the app's own `.env.reference`
documents **361** and its CI ratchet (`scripts/check-env-reference.sh:5-17`) fails the app build if a
consumed variable is missing from it.

---

## 4. Staleness — 15 variables spot-checked against `onetimesecret@75ce160`

Wrong or missing, worst first. Every citation below was read at HEAD.

### 4.1 `JOBS_ENABLED` — documented default is inverted

`environment-variables.md:350` states `JOBS_ENABLED=true`.

At HEAD the default is **false**:
- `etc/defaults/config.defaults.yaml:1113` — `enabled: <%= ENV['JOBS_ENABLED'] == 'true' || false %>`
- `docker/README.md:75` — the env table gives Default `false`
- `docker/README.md:81-83` — "Off by default. With `JOBS_ENABLED` unset or `false`, the `worker-email` and `scheduler` services sit idle and the web app sends email synchronously in-process"
- `docker/compose/docker-compose.full.yml:89,208,251` — `JOBS_ENABLED=${JOBS_ENABLED:-false}`

This lands squarely on `install/docker` and `install/run-as-a-service`.

### 4.2 `AUTHENTICATION_MODE` — v0.25 block contradicts both the app and its own v0.24 block

`environment-variables.md:129` shows `AUTHENTICATION_MODE=full`. HEAD default is **`simple`** —
`etc/defaults/auth.defaults.yaml:8`, `mode: <%= ENV['AUTHENTICATION_MODE'] || 'simple' %>`. The v0.24
block at `:389` says `simple` and is correct. `docker/README.md:67` records it as set per stack by the
compose files, not by a shipped default.

### 4.3 `PLAN_TTL_ANONYMOUS` — renamed, and the described mechanism no longer exists

`environment-variables.md:96-100` documents `PLAN_TTL_ANONYMOUS` as the anonymous/free-tier maximum.

At HEAD the variable is **`TTL_MAX_ANONYMOUS`**; the old name survives only as a read-only alias:
- `etc/defaults/config.defaults.yaml:238` — `ttl_max_anonymous: <%= ENV['TTL_MAX_ANONYMOUS'] || ENV['PLAN_TTL_ANONYMOUS'] || nil %>`
- `lib/onetime/config.rb:499-501` — "whenever `TTL_MAX_ANONYMOUS` (or the legacy `PLAN_TTL_ANONYMOUS` alias resolved in config.defaults.yaml) is set"
- `.env.example:59-62` — documents `TTL_MAX_ANONYMOUS` only
- `changelog.d/20260730_111500_claude_anon_ttl_single_source.rst` — "`TTL_MAX_ANONYMOUS` replaces `PLAN_TTL_ANONYMOUS` throughout. The old name implied a coupling to plan and billing state that no longer exists… it is no longer read anywhere else"

The doc's framing ("Maximum TTL for anonymous/free tier users") describes the removed plan coupling. The
changelog's self-hosted note is the fact an operator page needs: the ceiling now defaults to 7 days
**whether or not billing is enabled**, which is a behaviour change on upgrade for billing-off
deployments that previously got the `ttl_options` maximum.

### 4.4 `WORKER_HEARTBEAT_INTERVAL` — wrong number

`environment-variables.md:353` states `600`. HEAD default is **300**:
`lib/onetime/cli/worker_command.rb:222` — `ENV.fetch('WORKER_HEARTBEAT_INTERVAL', 300).to_i # 5 minutes default`.
(`:223` adds that `0` disables it, which the docs do not mention.) The two sibling paths on the same
lines are correct: `SNEAKERS_PID_PATH` → `tmp/pids/sneakers.pid` (`worker_command.rb:307`),
`SCHEDULER_PID_PATH` → `tmp/pids/scheduler.pid` (`scheduler_command.rb:77`).

### 4.5 `I18N_ENABLED` — documented default is inverted

`environment-variables.md:300` and `:471` both show `I18N_ENABLED=true`. HEAD:
`etc/defaults/config.defaults.yaml:1290` — `enabled: <%= ENV['I18N_ENABLED'] == 'true' || false %>`,
i.e. **off unless explicitly `true`**. This is the `== 'true'` (opt-in) pattern, not the `!= 'false'`
(opt-out) pattern; the file uses both and the docs do not distinguish them anywhere.

### 4.6 `AUTH_EMAIL_AUTH_ENABLED` — documented default is inverted

`environment-variables.md:137` shows `AUTH_EMAIL_AUTH_ENABLED=true`. HEAD:
`etc/defaults/auth.defaults.yaml:81` — `email_auth: <%= ENV['AUTH_EMAIL_AUTH_ENABLED'] == 'true' %>`,
annotated "(default: OFF)". The four neighbouring toggles the docs list are correct
(`AUTH_LOCKOUT_ENABLED` on `:63`, `AUTH_PASSWORD_REQUIREMENTS_ENABLED` on `:66`,
`AUTH_ACTIVE_SESSIONS_ENABLED` on `:69`, `AUTH_VERIFY_ACCOUNT_ENABLED` on `:75`,
`AUTH_MFA_ENABLED` off `:78`, `AUTH_WEBAUTHN_ENABLED` off `:84`), so this is a single-line error, not a
systematic one.

### 4.7 `REDIS_URL` — the example points at a port that exists nowhere

`environment-variables.md:62` — `REDIS_URL='redis://maindb:5212/0?timeout=5'`.

`maindb` is a real compose service name (`docker/compose/docker-compose.full.yml:119-121`) but it listens
on **6379**: `docker/compose/docker-compose.full.yml:70` —
`VALKEY_URL=redis://:${VALKEY_PASSWORD:?…}@maindb:6379/0`. `.env.example:28` gives
`redis://127.0.0.1:6379/0`. The string `5212` occurs nowhere in the app outside Stripe VCR cassette
fixtures under `apps/web/billing/spec/fixtures/`. Copied verbatim, this value fails to connect.

The v0.24 note at `environment-variables.md:380` — `REDIS_` variables may use the `VALKEY_` prefix — is
still true (`etc/defaults/config.defaults.yaml:884-888` gives the full precedence order:
`VALKEY_URL` / `REDIS_URL`, then `IN_DOCKER=1`, then `AUTO_DETECT_DOCKER=1`, then
`redis://CHANGEME@127.0.0.1:6379`). `IN_DOCKER` and `AUTO_DETECT_DOCKER` are documented in neither docs
page.

### 4.8 `FROMNAME` — dead

`environment-variables.md:436` lists `FROMNAME` as the sender display name. It is **read nowhere** at
HEAD: `git grep FROMNAME` over tracked files returns exactly two hits, both non-consuming —
`docs/architecture/decision-records/adr-030-config-layering-by-scope.md:126` ("`FROM`/`FROMEMAIL`/`FROMNAME`
surfaced as legacy aliases of `FROM_EMAIL`/`FROM_NAME`, candidates for removal") and
`spec/integration/all/initializers/boot_part1_spec.rb:240`, which sets it to nil. The live keys are
`etc/defaults/config.defaults.yaml:945` — `from_name: <%= ENV['FROM_NAME'] || 'Support' %>`. `FROM` is
still read as a fallback (`:944`); `FROMNAME` is not.

### 4.9 `SERVER_TYPE` and `PORT` — exist, but not as the page describes

`environment-variables.md:370` — "`SERVER_TYPE=puma` # Web server type: puma". At HEAD `SERVER_TYPE` is
consumed only by the container entrypoint (`docker/entrypoints/entrypoint.sh:41`,
`SERVER_TYPE=${SERVER_TYPE:-puma}`; `Dockerfile:307,419`). It is not read by the Ruby application. Value
and default are right; the scope is wrong, which matters because `install/linux` will describe a
non-Docker install where the variable does nothing.

`environment-variables.md:367` — "`PORT=3000` # Port for the web server to listen on". At HEAD, when a
puma config file is in play the CLI **deletes** Host and Port from its config hash and lets the puma
config file own binding via `ENV['PORT']` — `lib/onetime/cli/server_command.rb:118-122`. Correct in
effect, misleading about the mechanism.

### 4.10 `SSO_DISPLAY_NAME` — the deprecation marker is correct

`environment-variables.md:228-229` marks it `[deprecated]`. Confirmed:
`etc/defaults/auth.defaults.yaml:116-119` — "DEPRECATED: Each provider now carries its own display name
via `OIDC_DISPLAY_NAME`, `ENTRA_DISPLAY_NAME`, `GOOGLE_DISPLAY_NAME`, etc. Retained for backward
compatibility with single-provider OIDC setups." Note `OIDC_DISPLAY_NAME` is named upstream but is the
one per-provider display name the docs page omits (`:238` gives `OIDC_ROUTE_NAME` only, while Entra,
GitHub and Google each get a `_DISPLAY_NAME` line).

### 4.11 Confirmed correct

`SECRET` (`etc/defaults/config.defaults.yaml:12`) · `HOST` (`:4`) · `SSL` default false (`:6`) ·
`AUTH_ENABLED` opt-out (`:283`) · `CSP_ENABLED` opt-out (`:463-465`) · `DOMAINS_ENABLED` opt-in (`:771`)
· `DOMAINS_VALIDATION_STRATEGY` default `passthrough` (`:817`) · `EMAILER_MODE` default `smtp` (`:937`) ·
`SMTP_PORT` default 587 (`:948`) · `ALLOW_NIL_GLOBAL_SECRET` default false (`:1492`) · `DEFAULT_TTL`
604800 (`lib/onetime/config.rb:41`, `7.days`).

One caveat on `SSL`: the v0.25 block writes `SSL=true` at `environment-variables.md:77` where the shipped
default is false. That block is presented as a `.env` file body, not as a default table, so it is not
strictly a wrong default — it is the ambiguity that the format creates, and it is the reason the same
variable reads `true` at `:77` and `false` at `:369` in one page.

### 4.12 One source conflict that is upstream's, not the docs'

`TTL_OPTIONS`. `environment-variables.md:451` gives `"300 1800 3600 86400"`; `.env.example:56` says the
default is `300 3600 86400 604800`. Neither matches the code: `lib/onetime/config.rb:48-60` is the
effective default when `TTL_OPTIONS` is unset — an eleven-element array from `60.seconds` to `30.days` —
and `:45-47` states "The max here (30.days) becomes the global TTL ceiling". Any operator page stating a
TTL ceiling must cite `lib/onetime/config.rb:48-60`, not either `.env` file. The docs page's own warning
at `:449-450` (a comma-separated list is silently reduced to its first value) is consistent with
`lib/onetime/config.rb:481-482`, which splits on `/\s+/` only.

### 4.13 Two prep-document pins that moved

- `docker-compose.full.yml:253` (prep §5, D2) is now **`docker/compose/docker-compose.full.yml:253`** —
  the compose files moved into `docker/compose/`. Line 253 still carries the
  `JOBS_SCHEDULER_ENABLED=true` comment. `docker/README.md:90` is unchanged and still correct.
- **`JOBS_FALLBACK_SYNC` no longer exists anywhere in the app.** `git grep` over tracked files returns
  zero hits. The D2 constraint on `install/docker` is now a one-variable constraint
  (`JOBS_SCHEDULER_ENABLED`), not two.

---

## 5. Verdict on D-4.1

**D-4.1 does not hold as stated. It needs an explicit exception, and the exception is the majority case.**

The decision assumes the two surviving pages are a reference with addressable parts. They are two large
code blocks with 17 anchors between them, eleven of which index a superseded variable set. Nine of the
twelve target pages have no anchor that identifies the value they need to talk about, and two have no
content to link to at all.

Applying D-4.1 literally produces links like "see
[environment-variables](/en/self-hosting/environment-variables/#v025)" attached to a claim about
`AUTH_SSO_ENABLED`, dropping the reader at the top of a 335-line block with no highlight and no way to
tell which of 116 variables was meant. That is worse than the inline value it replaced, because it also
looks verified.

Three concrete consequences for how Phase 3 should proceed. I am not deciding these — they are the
decisions this audit has made necessary.

1. **State the exception.** D-4.1 should read: operator pages link to the surviving reference *where a
   topic anchor exists*, and otherwise state the value inline with a `sourceOfTruth` citation pointing at
   app source. Per §3 that is 3 pages linking and 9 pages citing. The `sourceOfTruth` format already in
   use (`billing/index.md:6`) carries `repo/path:lines (what it proves)` triples and is the right vehicle.

2. **Extending `check-frontmatter.mjs` assertion 4 to `audience: operator` still works, but the
   assertion has to accept a `sourceOfTruth` citation as satisfying it, not only a link.** As drafted in
   prep §4.1 ("must link to the page that owns it") it would fail 9 of 12 new pages on day one with no
   correct fix available. The check as written today already reads `statedDefaults` and gates on
   `sourceOfTruth` for end-user pages (`bin/check-frontmatter.mjs:37-42`); re-scoping it to operator
   pages with the same gate is the change that is actually executable.

3. **The upstream reference already exists, and Phase 4 should generate from it rather than rewrite by
   hand.** `onetimesecret@75ce160` carries `.env.reference` — 1,995 lines, 361 variables, 26 topic
   sections including the four this audit found missing (`REVERSE PROXY / CLIENT IP` at `:1116`,
   `MIDDLEWARE` at `:1276`, `SECRET OPTIONS` at `:248`, `API ACCESS` at `:995`) — plus a CI ratchet at
   `scripts/check-env-reference.sh` that fails the app build when a consumed variable is undocumented
   (`:5-17`) and an explicit exemption list at `scripts/env-reference-ignore.txt`. The docs page's v0.25
   block is a truncated snapshot of an older revision of that file: identical banner style, identical
   `[derived]` convention, 116 of 361 variables. Phase 4's `reference/*` has a generator source it does
   not know about.

Item 3 does not gate Phase 3 and I am flagging it, not proposing it. Items 1 and 2 do gate stream D and
stream E respectively.
