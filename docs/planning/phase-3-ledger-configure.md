# Phase 3 verification ledger — the Configure sub-tree

Verified against `onetimesecret@75ce160` (2026-08-10) on branch `claude/phase-3-install-group`.
Every line number below was re-read at that commit. Where a Phase-2 ledger row or a
Phase-3 planning document pinned a different line, the drift is called out in the row.

All paths are APP-relative (`/Users/d/Projects/dev/onetimesecret/onetimesecret`).

**Scope.** The factual spine for eight pages: `configure/index`, `configure/secrets-and-keys`,
`configure/authentication`, `configure/sso`, `configure/email`, `configure/secret-options`,
`configure/sessions-and-cookies`, `configure/security-headers`. It does not cover the
`install/` or `features/` sub-trees.

**Hosted vs self-hosted.** The repo ships no production config. `git ls-files etc/` returns only
`etc/.gitignore`, `etc/defaults/{auth,config,logging}.defaults.yaml` and `etc/examples/*` — there
is no tracked `etc/config.yaml`, `etc/auth.yaml` or `etc/billing.yaml`. (This working copy has
untracked symlinks at `etc/auth.yaml`, `etc/billing.yaml`, `etc/logging.yaml`, `etc/puma.rb`
pointing into `~/.config/onetimesecret-dev/`; those are one developer's local dev config and
arbitrate nothing.) So every value below sourced from `etc/defaults/*.yaml`,
`lib/onetime/config.rb` `DEFAULTS`, or `.env.reference` is the **self-hosted shipped default**.
Behaviour that lives in a code path rather than a config value is labelled **STRUCTURAL** and is
safe to state without a "by default" hedge.

**Value labels used in the Verdict column.**
`shipped default` — a value in a defaults file or the `DEFAULTS` hash; an operator can change it.
`STRUCTURAL` — a code path; no config key changes it.
`hardcoded` — a literal in code that *looks* like a setting but has no key or env var.

**Billing gate.** No plan-tier, seat, entitlement or price claim is asserted here. Rows record
only that gates exist, where, and — per the governing fact — that they do not bind on a stock
self-hosted install.

---

## 0. The governing fact, re-pinned to HEAD

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 0.1 | Standalone (self-hosted) mode grants `STANDALONE_ENTITLEMENTS` — the full set — whenever billing is disabled, no plan is assigned, or the entitlements array is empty. | verified (STRUCTURAL) | `lib/onetime/models/organization/features/with_plan_entitlements.rb:48-56` (the constant), `:23-32` (the fail-open contract, verbatim: "Result: STANDALONE_ENTITLEMENTS (full access), limits return Float::INFINITY"), `:199-200` (`unless billing_enabled? → return STANDALONE_ENTITLEMENTS.dup`) and `:295-296` (same in the limits path). **Re-pin note:** the prep/handoff docs cite `:44-62`; at HEAD the constant body is `:48-56` and `:32` is unchanged. No semantic change. |
| 0.2 | Billing is off unless a billing config turns it on, and the production `etc/billing.yaml` ships in neither repo. | verified | `lib/onetime/billing_config.rb:41-53` — comment at `:41-47` ("Returns false if file doesn't exist or enabled is not set"), `enabled?` at `:48-53`. **Re-pin: identical line range at HEAD.** `git ls-files etc/` shows no `billing.yaml`. |
| 0.3 | `BILLING_ENABLED` overrides the file and raises `Onetime::ConfigError` on any value other than `true/1/false/0`; a blank value counts as explicitly off. | verified | `billing_config.rb:43-47` (comment), `:49-50` (`strict_bool!`) |
| 0.4 | On a stock self-hosted instance every entitlement is granted, every limit is infinite, and **role is the whole answer**. Entitlements are not an operator-tunable knob. | verified (STRUCTURAL) | 0.1 + 0.2 together. There is no config key that sets an entitlement list; the only inputs are `billing_enabled?` and the plan cache. |
| 0.5 | `manage_sso` is a member of `STANDALONE_ENTITLEMENTS`, so the SSO entitlement gate never binds on a stock self-hosted install. | verified | `with_plan_entitlements.rb:55` (`… custom_signin_config custom_signup_validation manage_sso manage_org manage_billing`) |

**Consequence for every Configure page:** describe entitlements only as *hosted* gates, or not at
all. An operator page that tells a self-hoster to "enable the SSO entitlement" is wrong.

---

## A. Secrets and keys

### A.1 The root SECRET

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| A1 | `SECRET` is the single root key. YAML path `site.secret`; env override `SECRET`. Shipped default is **nil**. | verified — shipped default (nil) | `etc/defaults/config.defaults.yaml:12` (`secret: <%= ENV['SECRET'] \|\| nil %>`); `lib/onetime/config.rb:39` (`'secret' => nil` in `DEFAULTS`) |
| A2 | The app **refuses to boot** with no `SECRET`. The literal string `CHANGEME` counts as unset. | verified (STRUCTURAL) | `lib/onetime/config.rb:962-963` (`CHANGEME` normalised to nil), `:965-969` (`raise OT::ConfigError, 'Global secret cannot be nil - set SECRET env var or site.secret in config'`) |
| A3 | The refusal has one escape hatch: `development.allow_nil_global_secret` (env `ALLOW_NIL_GLOBAL_SECRET`), which downgrades the boot failure to a loud multi-line warning. | verified — shipped default `false` | `lib/onetime/config.rb:961` reads the key, `:971-983` prints the warning banner; `etc/defaults/config.defaults.yaml:1492` (`allow_nil_global_secret: <%= ENV['ALLOW_NIL_GLOBAL_SECRET'] == 'true' \|\| false %>`). The key sits under `development:`, and `config.rb:940-942` forces it back to `false` when `development.enabled` is false. |
| A4 | There is **no** minimum length, entropy or format requirement on `SECRET`. The only validation is "not nil, not `CHANGEME`". | verified (absence) | `lib/onetime/config.rb:961-984` is the entire validation. No length check, no charset check, no entropy estimate anywhere in the boot path. |
| A5 | The generator mints 64 random bytes (128 hex characters). | verified — generator behaviour, not an enforced minimum | `lib/tasks/init.rake:146` (`secret = SecureRandom.hex(64)`), reported to the operator at `:194` ("64 bytes entropy (128 hex chars)") |
| A6 | The command is `rake ots:secrets`. It is idempotent: an existing non-`CHANGEME` `SECRET` is preserved and only child keys are re-derived, unless `FORCE=1`. | verified | `lib/tasks/init.rake:125-131` (task + doc string), `:137-146` (the `has_secret` / `derive` / `force` ladder) |

### A.2 Key derivation

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| A7 | Four keys are HKDF-SHA256-derived from `SECRET` with distinct `info` strings and a fixed salt `onetimesecret-v1`: session (64 bytes → `SESSION_SECRET`), verifiable-id (32 → `IDENTIFIER_SECRET`), familia-enc (32, runtime only), key-verifier (32, runtime only). | verified (STRUCTURAL) | `lib/onetime/key_derivation.rb:26` (`SALT`), `:36-47` (`PURPOSES`), `:55-67` (`OpenSSL::KDF.hkdf`), and the ASCII tree at `:19-23` |
| A8 | Three secrets are **independent** — generated with `SecureRandom`, not derived from `SECRET`, and must be backed up separately: `AUTH_SECRET`, `ARGON2_SECRET`, `ACCOUNT_ID_SECRET` (32 bytes each). | verified | `lib/tasks/init.rake:13` (`INDEPENDENT_SECRETS`), `:15` (`INDEPENDENT_SECRET_BYTES = 32`), `:158-165` (never overwritten if already set) |
| A9 | `FEDERATION_SECRET` is a fifth category: a generated 5-word passphrase, shared across instances. | verified | `lib/tasks/init.rake:167-175` |
| A10 | `IDENTIFIER_SECRET` is optional: when absent or blank the app derives a stable per-deployment value from `site.secret` using the same `:identifier` purpose `init.rake` writes, so installs that ran `rake ots:secrets` and installs that did not converge on the same key. | verified (STRUCTURAL) | `lib/onetime/initializers/configure_familia.rb:123-133` (rationale), `:141-145` (the derivation and `ENV['VERIFIABLE_ID_HMAC_SECRET'] \|\|= …`) |
| A11 | `ARGON2_SECRET` is an optional pepper folded into password hashes. Unset means argon2id with no pepper — not an error. | verified — shipped default nil | `etc/defaults/auth.defaults.yaml:151-155`; `lib/onetime/auth_config.rb:71-75` |
| A12 | `AUTH_SECRET` is Rodauth's HMAC key. TOTP raises without it. | verified | `lib/onetime/utils/totp.rb:81-84` (`raise 'AUTH_SECRET environment variable must be set'`) |
| A13 | Secret content is encrypted at rest with a v2 HKDF-derived key (`:familia_enc`). The pre-2026-07-18 unsalted-SHA-256 v1 fallback has been **retired**. | verified (STRUCTURAL) | `lib/onetime/initializers/configure_familia.rb:26-31` and `:48-56` |

### A.3 Changing SECRET, and what breaks

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| A14 | Changing `SECRET` under existing data makes every pre-rotation ciphertext undecryptable. The app says so in its own shipped config comment. | verified (STRUCTURAL) | `etc/defaults/config.defaults.yaml:7-11` ("After setting the secret, it should not be changed… Changing the secret can lead to… not being able to decrypt existing secrets. See docs/runbooks/secret-rotation.md"); `lib/onetime/initializers/check_secret_verifier.rb:46-51` |
| A15 | Boot detects the condition rather than failing silently: an HKDF-derived verifier is stored in the datastore at first boot and compared on every subsequent boot. Four outcomes: `adopted` / `ok` / `mismatch` / `unavailable`. | verified (STRUCTURAL) | `lib/onetime/secret_verifier.rb:15-23` (the contract), `:33` (`VERIFIER_KEY = 'onetime:secret_verifier'`), `:68-92` (`check!`, `SET NX` adoption at `:75`); wired at `lib/onetime/initializers/check_secret_verifier.rb:35-62` |
| A16 | The policy knob is `site.secret_verifier_mode` / `SECRET_VERIFIER_MODE`, with three values `warn` \| `enforce` \| `off`. **Shipped default `warn`** — log loudly, keep booting. | verified — shipped default | `etc/defaults/config.defaults.yaml:13-20`; `lib/onetime/secret_verifier.rb:35` (`MODES`), `:54-60` (unset **or unrecognised** falls back to `warn`, deliberately: "halting by default would brick running deploys on their first upgrade") |
| A17 | `enforce` refuses to boot on mismatch; `off` skips the check entirely. | verified | `check_secret_verifier.rb:31-33` (`should_skip?` on `off`), `:58-61` (`raise Onetime::SecretVerifierMismatch`) |
| A18 | A decrypt that cannot succeed does **not** consume the secret — reveals fail safe across a bad rotation. | verified (STRUCTURAL) | `check_secret_verifier.rb:55` states it verbatim; mechanism is the claim-rollback at `lib/onetime/models/secret/features/secret_state_management.rb` (Phase-2 ledger row 56) |
| A19 | Rotation is supported through `SECRET_PREVIOUS`: a **comma-separated, OLDEST-first** list of prior secrets, registered decrypt-only so pre-rotation envelopes keep opening. New writes use a content-addressed tag derived from the current `SECRET`. | verified (STRUCTURAL) | `lib/onetime/initializers/configure_familia.rb:33-45` (the rule, including "append the outgoing SECRET on each rotation"), `:49-69` (`build_encryption_keys`), `:73-77` (`content_tag`), consumed at `:117-119` |
| A20 | After an intentional rotation the operator re-stamps the verifier with `CONFIRM=yes bundle exec rake ots:secrets:adopt`; `rake ots:secrets:verify` reports without adopting (exit 0 ok / 1 mismatch / 2 never adopted / 3 unreachable). | verified | `lib/tasks/init.rake:232-259` (`verify`), `:260-270+` (`adopt`); `lib/onetime/secret_verifier.rb:94-106` (`status`), `:108-118` (`adopt!`) |
| A21 | The operator-facing runbook is `docs/runbooks/secret-rotation.md` in the app repo. | verified (exists) | `ls docs/runbooks/` lists `secret-rotation.md`; referenced from `etc/defaults/config.defaults.yaml:11` and `configure_familia.rb:34` |
| A22 | `SESSION_SECRET` is optional: unset falls back to `site.secret`. | verified | `etc/defaults/config.defaults.yaml:371-372`; `lib/onetime/boot.rb:362-363` (`result['secret'] \|\|= conf&.dig('site','secret')`); `lib/onetime/session.rb:93-101` (second fallback inside the middleware, with `ArgumentError` if both are missing) |

---

## B. Authentication

### B.1 Simple vs full — what the code actually says

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| B1 | The mode key is the **top-level `mode:` in `etc/auth.yaml`**, env `AUTHENTICATION_MODE`. Shipped default `simple`. There is no `authentication.mode` key. | verified — shipped default | `etc/defaults/auth.defaults.yaml:6-8`; read at `lib/onetime/auth_config.rb:36-41`. **Correction owed:** `self-hosting/simple-or-full-auth.md:70` tells the reader to "switch `authentication.mode` to `full`". No such path exists. |
| B2 | `mode` has exactly **two** accepted values, `simple` and `full`. Anything else — including the literal `disabled` — silently resolves to `simple`. | verified (STRUCTURAL) | `lib/onetime/auth_config.rb:36-41`: `return config['mode'] if config['mode'].match?(/\A(?:simple\|full)\z/)` then `'simple'`. **Correction owed:** `simple-or-full-auth.md:8-9` says the instance "runs its authentication in one of three modes: disabled, simple, or full". Setting `AUTHENTICATION_MODE=disabled` gives you simple mode, not a disabled one. |
| B3 | Turning authentication **off** is a different axis: `site.authentication.enabled` / `AUTH_ENABLED`. Shipped default **true**. | verified — shipped default | `etc/defaults/config.defaults.yaml:281-283` |
| B4 | When `site.authentication.enabled` is not exactly `true`, **every** key under `site.authentication` is force-set to `false` — a blanket cascade, not a per-key rule. | verified (STRUCTURAL, and a footgun worth stating) | `lib/onetime/config.rb:466-474`. Note the collateral: `allowed_signup_domains` becomes the boolean `false`, not `[]`. |
| B5 | Simple mode is Redis/Valkey-only. Full mode loads the Rodauth app; simple mode does not — Core serves `/auth/*` instead. | verified (STRUCTURAL) | `lib/onetime/application/registry.rb:157-160` (`filepaths.reject! { \|f\| f.include?('web/auth/') }` unless `full_enabled?`), `:170-175` (the mode banner) |
| B6 | MFA, WebAuthn, magic links, remember-me, lockout, password requirements, active-session tracking and SSO are **full-mode only**, by one shared mechanism: every feature predicate returns `false` unless `full_enabled?`. | verified (STRUCTURAL) | `lib/onetime/auth_config.rb:420-424` (`feature_enabled?` → `return false unless full_enabled?`); consumers at `:94-148` |
| B7 | Full mode's database default is **SQLite** (`sqlite://data/auth.db`), not PostgreSQL. | verified — shipped default | `etc/defaults/auth.defaults.yaml:36` (`database_url: "<%= ENV['AUTH_DATABASE_URL'] \|\| 'sqlite://data/auth.db' %>"`); `lib/onetime/auth_config.rb:61-63` repeats the same fallback. **Correction owed:** `simple-or-full-auth.md:35,41` states Full requires "PostgreSQL 17+". It does not; PostgreSQL is a choice, SQLite is the default, and the config comment at `auth.defaults.yaml:32-33` warns that in containers the SQLite file must be on a mounted volume. |
| B8 | Background jobs are **not** required by full mode. `jobs.enabled` ships `false`, and `jobs.fallback_to_sync` ships `true`. | verified — shipped defaults | `etc/defaults/config.defaults.yaml:1113` (`enabled: <%= ENV['JOBS_ENABLED'] == 'true' \|\| false %>`), `:1131` (`fallback_to_sync: <%= ENV['JOBS_FALLBACK_SYNC'] != 'false' %>`), `:1109-1110` ("When disabled, email delivery falls back to synchronous mode"). **Correction owed:** `simple-or-full-auth.md:36,41` lists "RabbitMQ 4.3+" as required infrastructure for Full. It is optional in both modes. |
| B9 | Organizations are **not** gated on auth mode. `features.organizations.enabled` / `ENABLE_ORGS` controls the org switcher UI only; the config's own comment says organizations always exist under the hood. Shipped default `false`. | verified — shipped default; the *absence* of an auth-mode gate is verified only for app loading | `etc/defaults/config.defaults.yaml:845-850`; `lib/onetime/application/registry.rb:157-165` skips only `web/auth/` and `web/billing/`, so `apps/api/organizations` loads in simple mode. **Open question (see §H):** whether the org UI is *usable* in simple mode is not settled by these lines. `simple-or-full-auth.md:39` claims "Organizations / teams: Simple ❌". Do not repeat that on an operator page until it is settled at runtime. |
| B10 | The Simple → Full migration command exists. | verified (exists) | `lib/onetime/cli/customers/sync_auth_accounts_command.rb:56` (`unless Onetime.auth_config.full_enabled?` guard); `apps/web/auth/migrator.rb:121` |

### B.2 Signup, signin, verification, domains

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| B11 | `site.authentication.signup` / `AUTH_SIGNUP` — shipped default **true**. Disable to stop new account creation while keeping signin. | verified — shipped default | `etc/defaults/config.defaults.yaml:284-288` |
| B12 | `site.authentication.signin` / `AUTH_SIGNIN` — shipped default **true**. | verified — shipped default | `etc/defaults/config.defaults.yaml:289-292` |
| B13 | `site.authentication.autoverify` / `AUTH_AUTOVERIFY` — shipped default **false**, i.e. new accounts must verify their email before signing in. | verified — shipped default | `etc/defaults/config.defaults.yaml:293-298`; `lib/onetime/config.rb:116` |
| B14 | `site.authentication.required` / `AUTH_REQUIRED` — shipped default **false**. When true the homepage secret form requires a login; the header and navigation stay visible. | verified — shipped default | `etc/defaults/config.defaults.yaml:299-304` |
| B15 | In full mode, Rodauth's own `verify_account` feature is a **separate** switch: `AUTH_VERIFY_ACCOUNT_ENABLED`, default on except in `RACK_ENV=test`. | verified — shipped default | `etc/defaults/auth.defaults.yaml:74-75` (`ENV['AUTH_VERIFY_ACCOUNT_ENABLED'] != 'false' && ENV['RACK_ENV'] != 'test'`); `lib/onetime/auth_config.rb:118-120` |
| B16 | Signup can be restricted to an email-domain allowlist: `site.authentication.allowed_signup_domains`, env `ALLOWED_SIGNUP_DOMAIN` (**singular**, comma-separated). Shipped default `[]` = no restriction. | verified — shipped default | `etc/defaults/config.defaults.yaml:309-317`; `lib/onetime/config.rb:117` |
| B17 | Matching is exact and case-insensitive on the full domain — no subdomain wildcarding. An empty or absent list allows every domain. | verified (STRUCTURAL) | `lib/onetime/signup_validation.rb:71-91` (`normalized_domains.include?(email_domain)`) |
| B18 | A per-custom-domain `SignupConfig` takes precedence over the global list when one exists and is enabled. | verified (STRUCTURAL) | `lib/onetime/signup_validation.rb:11-14` (resolution order), `:51-65` |
| B19 | A rejected signup domain returns the generic "Is that a valid email address?" rather than naming the allowlist — deliberately, to prevent enumerating which domains are allowed. | verified (STRUCTURAL) | `apps/api/account/logic/account/create_account.rb:74-81` and the comment at `:75-76` |
| B20 | Email shape is validated against a pattern that mirrors the PostgreSQL `accounts.valid_email` CHECK, so SQLite installs get the same rejection. | verified (STRUCTURAL) | `lib/onetime/signup_validation.rb:20-44` |

### B.3 Password rules

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| B21 | Simple mode enforces a **6**-character minimum password. Hardcoded — no config key, no env var. | verified (hardcoded) | `apps/api/account/logic/account/create_account.rb:83-88` (`return if password.size >= 6`) |
| B22 | Full mode enforces an **8**-character minimum. Also hardcoded. | verified (hardcoded) | `apps/web/auth/config/features/account_management.rb:104` (`auth.password_minimum_length 8`) |
| B23 | Full mode's extra strength checks are a feature toggle, `AUTH_PASSWORD_REQUIREMENTS_ENABLED`, default **on**; it enables Rodauth's `login_password_requirements_base`. | verified — shipped default | `etc/defaults/auth.defaults.yaml:65-66`; `apps/web/auth/config/features/password_requirements.rb:11-13`; predicate at `lib/onetime/auth_config.rb:100-102` |
| B24 | Password confirmation is **not** required — the UI sends one field. | verified (STRUCTURAL) | `apps/web/auth/config/features/account_management.rb:108-110` |
| B25 | The "same as current password" error is deliberately genericised on the reset flow, to close a credential-reuse oracle. | verified (STRUCTURAL) | `apps/web/auth/config/features/account_management.rb:112-125` |
| B26 | Brute-force lockout is a full-mode feature toggle, `AUTH_LOCKOUT_ENABLED`, default **on**. | verified — shipped default | `etc/defaults/auth.defaults.yaml:62-63`; `lib/onetime/auth_config.rb:94-96` |

### B.4 Colonel (site admin)

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| B27 | Colonel accounts are managed **via the CLI**: `bin/ots customers role promote \| demote \| list`. | verified | `etc/defaults/config.defaults.yaml:305-308` (the defaults file documents exactly these three); `lib/onetime/cli/customers/role_command.rb:9-12`, valid roles at `:39-40` |
| B28 | Valid customer roles are `colonel`, `admin`, `staff`, `customer`. | verified | `lib/onetime/cli/customers/create_command.rb:38` (`VALID_ROLES = %w[colonel admin staff customer]`) |
| B29 | A `site.authentication.colonels` config key is **read by code** but has no entry in any shipped defaults file and no env interpolation. Treat it as vestigial; do not document it as a supported knob. | verified (existence and absence) | Read at `lib/onetime/models/customer/features/colonel_assignment.rb:44`; its comment at `:39-40` describes a `COLONEL=a@x.com,b@y.com` env pattern, but no `ENV['COLONEL']` read exists anywhere at HEAD, and `grep -n colonels etc/defaults/*.yaml` returns nothing. |
| B30 | The colonel surfaces (`/colonel` and `/api/colonel`) can optionally be network-isolated with `site.admin.allowed_cidrs` / `ADMIN_ALLOWED_CIDRS`. Shipped default `[]` = **no-op**. Out-of-range requests get **404**, not 403. | verified — shipped default | `etc/defaults/config.defaults.yaml:614-639`; `lib/onetime/config.rb:119-127` |
| B31 | That allowlist resolves the client IP through the trusted-proxy layer, so behind a reverse proxy `site.network.trusted_proxy` must also be configured or every request resolves to the proxy hop. A raw `X-Forwarded-For` cannot bypass it. | verified | `etc/defaults/config.defaults.yaml:633-637` |

### B.5 Anti-abuse limiters on the auth surface

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| B32 | Reset-password requests are rate-limited in **every** auth mode. Shipped defaults: enabled, 10/IP, 30/email, 3600s window, 3600s lockout. Env: `RESET_REQUEST_RATE_LIMIT_{ENABLED,MAX_PER_IP,MAX_PER_EMAIL,WINDOW,LOCKOUT}`. | verified — shipped defaults | `etc/defaults/config.defaults.yaml:318-338` |
| B33 | Unauthenticated account creation is rate-limited in both modes. Shipped defaults: enabled, 10/IP, 3600s window, 3600s lockout. Env: `CREATE_ACCOUNT_RATE_LIMIT_{ENABLED,MAX_PER_IP,WINDOW,LOCKOUT}`. Single-tier by necessity — every request in the abuse pattern carries a fresh address. | verified — shipped defaults | `etc/defaults/config.defaults.yaml:339-364` |
| B34 | The signup IP bucket is a whole **/24** because the IP is masked upstream, so behind an unconfigured reverse proxy it is the entire deployment. The config says raise it for dense-NAT populations. | verified | `etc/defaults/config.defaults.yaml:353-358` |

---

## C. SSO

**Short version for the page:** SSO is real, built and shipping — four OmniAuth providers, two
surfaces (platform and per-custom-domain), off by default, full mode only. It is *not* SAML.

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| C1 | SSO exists and is implemented via OmniAuth + `rodauth-omniauth`. Four providers: generic **OIDC**, **Microsoft Entra ID**, **Google**, **GitHub**. | verified | `apps/web/auth/config/features/omniauth.rb:18-21` (the four gems), `:51-54` (the four `configure_*_provider` calls); `Gemfile.lock:382` pins `rodauth-omniauth (0.6.2)` |
| C2 | There is **no SAML support** at HEAD. | verified (absence) | Only the four OmniAuth strategies above are registered. No SAML gem in `Gemfile`/`Gemfile.lock`, no SAML strategy in `apps/web/auth/`. |
| C3 | The master switch is `full.features.sso` in `etc/auth.yaml`, env `AUTH_SSO_ENABLED`. Shipped default **false**. | verified — shipped default | `etc/defaults/auth.defaults.yaml:86-92`; `lib/onetime/auth_config.rb:145-148` |
| C4 | SSO is **full-mode only**. In simple mode `sso_enabled?` is false regardless of the env var. | verified (STRUCTURAL) | `lib/onetime/auth_config.rb:146-147` → `feature_enabled?` → `:420-424` |
| C5 | Legacy config key `omniauth` is still accepted as a synonym for `sso`, and `omniauth_enabled?` is an alias of `sso_enabled?`. | verified | `lib/onetime/auth_config.rb:143-152` |
| C6 | A provider registers only when **all** its required env vars are present and non-empty. Required sets: OIDC = `OIDC_ISSUER`, `OIDC_CLIENT_ID`. Entra = `ENTRA_TENANT_ID`, `ENTRA_CLIENT_ID`, `ENTRA_CLIENT_SECRET`. Google = `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`. GitHub = `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`. | verified | `lib/onetime/auth_config.rb:440-483` (`provider_definitions`), `:324-336` (`sso_providers` gate); mirrored in the registration path at `apps/web/auth/config/features/omniauth.rb:326`, `:389`, `:425`, `:459` |
| C7 | `OIDC_CLIENT_SECRET` is optional — PKCE flows may have none; the secret is only added to `client_options` when non-empty. PKCE is on for OIDC. | verified | `apps/web/auth/config/features/omniauth.rb:323`, `:350-352`, `:362` (`pkce: true`) |
| C8 | **`OIDC_REDIRECT_URI` / `ENTRA_REDIRECT_URI` / `GOOGLE_REDIRECT_URI` / `GITHUB_REDIRECT_URI` are not read by any code at HEAD.** The redirect URI is derived at request time from the request host. | verified (absence) — **highest-value row in this section** | `grep -rl` across `lib apps etc/defaults src bin docker .env.reference` finds each name in exactly one file: a spec fixture (`apps/web/auth/spec/config/features/omniauth_providers_spec.rb:84,227,331`) or an old notes file (`apps/web/auth/docs/0314-sso-rough-convo-notes.txt:320`). Nothing reads `ENV['*_REDIRECT_URI']`. The real mechanism: `apps/web/auth/config/features/omniauth.rb:348-349` ("redirect_uri is omitted here — the omniauth_setup hook injects it at runtime from the request host") and `apps/web/auth/config/hooks/omniauth_tenant.rb:78-89` (`redirect_uri = strategy.full_host + strategy.callback_path`). **Correction owed:** `self-hosting/environment-variables.md:232,237,241,245,250,253,258,261` lists all four as *Required* with example values. |
| C9 | Route names are configurable and default to the provider slug: `OIDC_ROUTE_NAME` (`oidc`), `ENTRA_ROUTE_NAME` (`entra`), `GOOGLE_ROUTE_NAME` (`google`), `GITHUB_ROUTE_NAME` (`github`). The route name is also the value stored in `account_identities.provider`. | verified — shipped defaults | `apps/web/auth/config/features/omniauth.rb:324`, `:386`, `:422`, `:456`; the identity-column consequence spelled out at `:367-373`; defaults duplicated at `lib/onetime/auth_config.rb:444-445,456-457,465-466,475-476` |
| C10 | Routes are `POST /auth/sso/:provider` and `GET /auth/sso/:provider/callback`. | verified | `apps/web/auth/config/features/omniauth.rb:29-30` (`auth.omniauth_prefix '/sso'`) |
| C11 | Display names default per provider: Entra → `Microsoft`, Google → `Google`, GitHub → `GitHub`, OIDC → `SSO`. Overridable with `*_DISPLAY_NAME`. | verified — shipped defaults | `lib/onetime/auth_config.rb:446-447,458-459,467-468,477-478` |
| C12 | `SSO_DISPLAY_NAME` still exists but is **deprecated** — it survives only as the OIDC fallback for single-provider setups. | verified | `etc/defaults/auth.defaults.yaml:115-119`; `lib/onetime/auth_config.rb:228-239`, fallback wired at `:447` |
| C13 | SSO accounts are **auto-created** and **auto-verified** on first login. | verified (STRUCTURAL) — and worth flagging to operators | `apps/web/auth/config/features/omniauth.rb:38-40` (`omniauth_verify_account? true`), `:42-47` (`omniauth_create_account? true`, with the shipped caveat "allows any IdP user to create accounts"). Domain restriction is the operator's job — see B16/B18. |
| C14 | An SSO identity whose email matches an existing account is **refused** by default, not auto-linked. Opt in per provider with `OIDC_TRUST_EMAIL_FOR_LINKING` / `ENTRA_…` / `GOOGLE_…` / `GITHUB_…`, or globally (deprecated) with `SSO_TRUST_EMAIL_FOR_LINKING`. Shipped default **false**. | verified — shipped default | `etc/defaults/auth.defaults.yaml:134-149`; precedence implemented at `lib/onetime/auth_config.rb:269-282` (per-provider env wins over the global fallback) |
| C15 | That flag is safe only when the operator controls **both** OTS and the IdP — the config says so in as many words, and it has no effect on the multi-tenant surface by construction. | verified | `etc/defaults/auth.defaults.yaml:136-146`; `lib/onetime/auth_config.rb:249-257` |
| C16 | Login can be restricted to a single method with `restrict_to` (`password` \| `email_auth` \| `webauthn` \| `sso`), driven by `AUTH_PASSWORD_ONLY` / `AUTH_EMAIL_AUTH_ONLY` / `AUTH_WEBAUTHN_ONLY` / `AUTH_SSO_ONLY`. Setting **more than one** yields `nil` (no restriction). | verified — shipped default nil | `etc/defaults/auth.defaults.yaml:94-107` (the `.then { f.length == 1 && f.first \|\| nil }` fold); `lib/onetime/auth_config.rb:19` (`RESTRICT_TO_VALUES`), `:179-199` |
| C17 | `restrict_to: sso` additionally disables password-based account management (destroy account, change password, change email), and is ignored unless SSO is enabled **and** at least one provider is configured. | verified | `etc/defaults/auth.defaults.yaml:100-105`; `lib/onetime/auth_config.rb:189-196`, `:201-207` |

### C.2 Per-domain (org-level) SSO — the second surface

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| C18 | A second, independent surface lets each custom domain carry its own `CustomDomain::SsoConfig`, with credentials injected per request instead of from env. Its switch is `features.organizations.sso_enabled` / `ORGS_SSO_ENABLED`, shipped default **false**. | verified — shipped default | `etc/defaults/config.defaults.yaml:849-851`; `lib/onetime/auth_config.rb:154-166`; hook at `apps/web/auth/config/hooks/omniauth_tenant.rb:61-100` |
| C19 | When `ORGS_SSO_ENABLED=true` but platform credentials are absent, provider routes still register — with **placeholder** credentials — so tenant credentials can be injected at request time. | verified (STRUCTURAL) | `apps/web/auth/config/features/omniauth.rb:8-12`, `:327-339` (OIDC), `:390-400` (Entra), `:426-435` (GitHub), `:460-470` (Google) |
| C20 | The per-domain SSO **API** is gated on the `manage_sso` entitlement plus organization ownership plus the `sso_enabled` feature flag. | verified (gate existence only) | `apps/api/domains/logic/sso_config/base.rb:13-18` (the five-step authorization model), `:27-30` (`config_entitlement` = `manage_sso`), `:36-39` (`config_feature_flag` = `sso_enabled`) |
| C21 | **That entitlement gate does not bind on a stock self-hosted install** — `manage_sso` is in `STANDALONE_ENTITLEMENTS`. What actually gates it self-hosted is `ORGS_SSO_ENABLED` and org ownership. | verified | Row 0.5 + C20. Do **not** write "requires the manage_sso entitlement / upgrade your plan" on an operator page; that string (`sso_config/base.rb:34`) is the hosted-tier message. |
| C22 | Custom domains without their own `SsoConfig` may fall back to the platform env credentials only when `SSO_ALLOW_PLATFORM_FALLBACK=true`. Shipped default **false**. | verified — shipped default | `etc/defaults/auth.defaults.yaml:121-132`; `lib/onetime/auth_config.rb:241-247` |
| C23 | **GitHub and Google are refused on the tenant surface**, by design. They carry no issuer, so their `(provider, '', uid)` row is shared across surfaces; the callback is rejected before any identity lookup. OIDC and Entra are unaffected. | verified (STRUCTURAL, security-critical) | `apps/web/auth/config/features/omniauth.rb:79-94` (the reasoning), `:165-167` (`refuse_issuerless_on_tenant?`), `:271-280` (the wired refusal → `redirect '/signin?auth_error=sso_not_configured'`) |
| C24 | Identities are keyed on `(provider, issuer, uid)`, not `(provider, uid)`, to prevent cross-tenant account takeover. | verified (STRUCTURAL) | `apps/web/auth/config/features/omniauth.rb:60-98`, `:175-198` (`lookup_identity`); migration `apps/web/auth/migrations/008_issuer_scoped_identities.rb` |
| C25 | Enabling SSO widens the CSP `form-action` directive with the active IdP origins, automatically. `SSO_FORM_ACTION_ORIGINS` (space-separated) is the manual override for sovereign clouds and org-level SSO. | verified | `lib/onetime/auth_config.rb:338-371`, override parsing at `:528-543`; applied at `apps/web/core/application.rb:127-135`. Cross-reference from `configure/security-headers`. |
| C26 | Entra's IdP origin is hard-pinned to `https://login.microsoftonline.com`; there is no sovereign-cloud authority env var. Use `SSO_FORM_ACTION_ORIGINS`. | verified | `lib/onetime/auth_config.rb:436-439`, `:460` |

---

## D. Email

### D.1 Transport

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| D1 | Delivery transport is `emailer.mode` / `EMAILER_MODE`. Shipped default **`smtp`**. Accepted values: `smtp`, `ses`, `sendgrid`, `lettermint`, `logger`, `disabled`/`none`. | verified — shipped default | `etc/defaults/config.defaults.yaml:937`; the dispatch table at `lib/onetime/mail/mailer.rb:292-311` |
| D2 | Because `mode` ships as a non-empty `smtp`, the documented credential **auto-detection** ladder never runs unless an operator explicitly blanks `mode`. | verified (STRUCTURAL) | `lib/onetime/mail/mailer.rb:196-221`: `return mode if mode && !mode.empty?` precedes the whole ladder. State the ladder as a fallback, not as the normal path. |
| D3 | In `RACK_ENV=test` the transport is forced to `logger`. | verified | `lib/onetime/mail/mailer.rb:202` |
| D4 | An unknown provider name falls back to `logger` with an error log — mail is silently not delivered rather than the boot failing. | verified (STRUCTURAL) | `lib/onetime/mail/mailer.rb:307-310` |
| D5 | SMTP settings: `emailer.host` / `SMTP_HOST` (default `smtp.provider.com`), `emailer.port` / `SMTP_PORT` (**587**), `emailer.user` / `SMTP_USERNAME`, `emailer.pass` / `SMTP_PASSWORD`, `emailer.auth` / `SMTP_AUTH` (nil), `emailer.tls` / `SMTP_TLS` (nil). | verified — shipped defaults | `etc/defaults/config.defaults.yaml:947-953` |
| D6 | The SMTP backend raises `ArgumentError` at construction if no host resolves. The default `smtp.provider.com` is a placeholder that satisfies that check and then fails at send time. | verified | `lib/onetime/mail/delivery/smtp.rb:70-73` |
| D7 | SMTP errors are classified transient vs fatal, and the classification decides whether a retry is attempted. | verified | `lib/onetime/mail/delivery/smtp.rb:25-41` (the two lists), `:61-66` (`classify_error`) |

### D.2 Sender identity

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| D8 | The from-address is `emailer.from`, env `FROM_EMAIL` with legacy alias `FROM`. **Shipped default `CHANGEME@example.com`.** | verified — shipped default | `etc/defaults/config.defaults.yaml:944` |
| D9 | Nothing validates or refuses that placeholder at boot. Unlike `SECRET` (A2) and the datastore URI, a `CHANGEME` from-address boots clean and sends broken mail. | verified (absence) | `grep -rn CHANGEME lib apps bin --include=*.rb` returns only `config.rb:963` (the SECRET check), `configure_familia.rb:93-94` and `check_redis_url.rb:23-25`. No emailer check. **This is the single most important "you must set this" row on `configure/email`.** |
| D10 | The from-name is `emailer.from_name` / `FROM_NAME`, default **`Support`**. The legacy key `fromname` is still read and logs a deprecation. There is no `FROMNAME` env var. | verified — shipped default | `etc/defaults/config.defaults.yaml:945`; `lib/onetime/mail/mailer.rb:127-136`. **Correction owed:** `environment-variables.md` lists `FROMNAME`; no such env var exists at HEAD. |
| D11 | Reply-to is `emailer.reply_to` / `REPLYTO_EMAIL`, falling back to `FROM_EMAIL`, then nil. | verified — shipped default | `etc/defaults/config.defaults.yaml:946` |
| D12 | A second `from_address` fallback lives in code (`noreply@example.com`) and is reached only when `emailer.from` and `FROM_EMAIL` are both absent. | verified (STRUCTURAL) | `lib/onetime/mail/mailer.rb:121-124` |
| D13 | Feedback mail goes to `emailer.feedback_to` / `FEEDBACK_TO_EMAIL`; unset routes it to the first colonel in the database. | verified — shipped default nil | `etc/defaults/config.defaults.yaml:954-957`; colonel lookup at `lib/onetime/models/customer/features/role_index.rb:34-37` |
| D14 | `emailer.show_logo` / `EMAILER_SHOW_LOGO` ships **false**, deliberately — a broken image looks less trustworthy than none. | verified — shipped default | `etc/defaults/config.defaults.yaml:958-961` |

### D.3 Sender-domain provisioning (a separate axis from transport)

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| D15 | Custom **sender domain** provisioning (DNS/DKIM/SPF) is decoupled from delivery transport: `emailer.sender_provider` / `CUSTOM_MAIL_PROVIDER`. Unset falls back to `mode`. So an operator can send over SMTP while provisioning through SES. | verified — shipped default nil | `etc/defaults/config.defaults.yaml:938-942`; the rationale at `lib/onetime/mail/mailer.rb:148-158`, resolution at `:175` |
| D16 | SES provisioning has its own credential pair, independent of SMTP: `CUSTOM_MAIL_SES_ACCESS_KEY_ID` / `CUSTOM_MAIL_SES_SECRET_ACCESS_KEY`, falling back to `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`. Region `CUSTOM_MAIL_SES_REGION`, default `us-east-1`. Fixed: 3 DKIM selectors, SPF include `amazonses.com`. | verified — shipped defaults | `etc/defaults/config.defaults.yaml:975-997` |
| D17 | Without those dedicated keys, SES provisioning silently reuses `emailer.user`/`pass` — i.e. the SMTP login as an AWS key. | verified (STRUCTURAL footgun, stated in the shipped comment) | `etc/defaults/config.defaults.yaml:983-991` |
| D18 | SendGrid: `CUSTOM_MAIL_SENDGRID_SUBDOMAIN` default `em`, DKIM selectors `s1`/`s2`, SPF include `sendgrid.net`. | verified — shipped defaults | `etc/defaults/config.defaults.yaml:1000-1009` |
| D19 | Lettermint uses **two** tokens with different auth: `LETTERMINT_API_TOKEN` (sending) and `LETTERMINT_TEAM_TOKEN` (domain provisioning). Base URL `LETTERMINT_BASE_URL`, default `https://api.lettermint.co/v1`. SPF CNAME defaults `lm-bounces` → `bounces.lmta.net`. | verified — shipped defaults | `etc/defaults/config.defaults.yaml:1019-1036` |
| D20 | **`EMAIL_PROVIDERS_SES_REGION`, `EMAIL_PROVIDERS_SENDGRID_SUBDOMAIN`, `EMAIL_PROVIDERS_LETTERMINT_SPF_INCLUDE` do not exist at HEAD.** | verified (absence) | Zero hits across `lib apps etc/defaults src bin docker .env.reference`. The real names are the `CUSTOM_MAIL_*` set in D16–D19. **Correction owed:** all three appear in `self-hosting/environment-variables.md`. |

### D.4 Address validation, bounces and suppression

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| D21 | A `mail.truemail` block is **mandatory**: boot raises `OT::ConfigError, 'No TrueMail config found'` if it is absent. | verified (STRUCTURAL) | `lib/onetime/config.rb:986-988` |
| D22 | Truemail's shipped default validation type is `:regex` — cheap and offline. `mx` / `smtp` are opt-in. `verifier_email` ships `CHANGEME@example.com` and is required only for `:smtp` validation. Resolver defaults are `1.1.1.1`, `8.8.4.4`, `208.67.220.220`. | verified — shipped defaults | `etc/defaults/config.defaults.yaml:1039-1043` (`default_validation_type`, `verifier_email`), `:1073-1076` (`dns`), `:1054` (`allowed_domains_only: false`) |
| D23 | `VERIFIER_DOMAIN` is present in the defaults file only as a **commented-out** line; setting it has no effect. | verified | `etc/defaults/config.defaults.yaml:1044` (`#:verifier_domain: …`). `environment-variables.md` documents it as live. |
| D24 | Outbound sends check a suppression list first: an address with a recorded bounce or complaint is skipped, logged as `suppressed`, and nothing is dispatched. The check **fails open** on error. | verified (STRUCTURAL) | `lib/onetime/mail/delivery/base.rb:49-58` (the guard), `:153-164` (`suppressed_recipient?`, `rescue → false`) |
| D25 | Suppression comes from ESP feedback ingestion, **not** from a single synchronous failure. A synchronous SMTP 5xx is recorded as an event only. | verified (STRUCTURAL) | `lib/onetime/mail/delivery/base.rb:166-174` |
| D26 | There is no operator config key for the suppression list — it is datastore state, not configuration. | verified (absence) | No `suppression` key in `etc/defaults/config.defaults.yaml`; the only reference is the model lookup at `base.rb:154-157`. |

### D.5 What email config a working install actually needs

Required: `emailer.from` (D8/D9 — the placeholder is the trap) and, for the shipped
`EMAILER_MODE=smtp`, a real `SMTP_HOST` (D6). Everything else in §D is optional. A `mail.truemail`
block must exist, but the defaults file supplies one (D21/D22).

---

## E. Secret options

Rows E1–E12 re-verify the Phase-2 `secret-lifecycle` ledger at HEAD. **One row has changed
behaviour — E9. Read it before writing anything about TTL caps.**

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| E1 | `site.secret_options.ttl_options` / `TTL_OPTIONS` is a **space-separated string of integer seconds** — not CSV, not YAML. | verified | `etc/defaults/config.defaults.yaml:221-224`; `lib/onetime/config.rb:476-486` (`split(/\s+/)` when String, then `map(&:to_i)`). Re-pin: prep cited `config.rb:471-479`; at HEAD it is `:476-486`, same logic. |
| E2 | Leaving `TTL_OPTIONS` unset does not empty the list: `nil` means "not specified" and the built-in array survives the merge. Setting it to an empty string *would* wipe it. | verified (STRUCTURAL) | `lib/onetime/config.rb:1280-1296` (`deep_merge`, `elsif v2.nil? then v1 # nil in loaded config = "not specified" → keep default`). Re-pin: prep cited `:1173-1188`; at HEAD `:1280-1296`. |
| E3 | The built-in list is 11 entries: 60s, 5m, 30m, 1h, 4h, 12h, 1d, 3d, 7d, 14d, 30d. | verified — shipped default | `lib/onetime/config.rb:48-60`. Re-pin: was `:46-57`. |
| E4 | Default lifetime with no `ttl` supplied is **7 days**; `site.secret_options.default_ttl` / `DEFAULT_TTL`. | verified — shipped default | `lib/onetime/config.rb:41`; `etc/defaults/config.defaults.yaml:218-220`; applied at `apps/api/v2/logic/secrets/base_secret_action.rb:114-115` |
| E5 | The anonymous ceiling is `site.secret_options.ttl_max_anonymous` / `TTL_MAX_ANONYMOUS`, default **7 days**, bounded to `[1, 365 days]`. `PLAN_TTL_ANONYMOUS` is the **deprecated alias**, read in exactly one place. | verified — shipped default | `etc/defaults/config.defaults.yaml:225-238` (the alias note at `:233-237`); `lib/onetime/config.rb:61-65`; `lib/onetime/models/features/with_entitlements.rb:72` (`ANONYMOUS_MAX_TTL = 604_800`), `:87-104` (`configured_anonymous_max_ttl`, clamps to `[1, MAX_TTL]`, falls back on garbage) |
| E6 | The effective anonymous ceiling is the **lowest** of the configured anonymous ceiling and the `ttl_options` maximum. | verified (mechanism) | `apps/api/v2/logic/secrets/base_secret_action.rb:192-205` |
| E7 | The anonymous over-ceiling TTL is **silently clamped**, not rejected; the design note says so and calls it deliberate. | verified (STRUCTURAL) | `apps/api/v2/logic/secrets/base_secret_action.rb:165-182` |
| E8 | For authenticated callers in an org, a TTL above the free ceiling raises a loud entitlement error (`extended_default_expiration`) rather than being silently shortened. On a stock self-hosted install this gate never fires — `extended_default_expiration` is in `STANDALONE_ENTITLEMENTS`. | verified (mechanism + non-binding self-hosted) | `apps/api/v2/logic/secrets/base_secret_action.rb:121-126`; `with_plan_entitlements.rb:50` |
| E9 | **The hard 30-day global cap is gone.** The absolute safety bound is now `MAX_TTL` = **365 days**. The real ceilings (plan limit, anonymous cap, `ttl_options` max) are enforced by the min/max clamp beneath it. | verified (STRUCTURAL) — **changed since the Phase-2 ledger** | `apps/api/v2/logic/secrets/base_secret_action.rb:128-135` (`safety_max = …WithEntitlements::MAX_TTL`; the comment names the change: "A hardcoded 30-day clamp here used to override all of those ceilings; see #4008"), `:137-139` (min/max clamp); `lib/onetime/models/features/with_entitlements.rb:43` (`MAX_TTL = 365 * 24 * 60 * 60`). **Correction owed:** Phase-2 `ledger/secret-lifecycle.md` row 29 asserts "a hard 30-day global cap is applied before the per-caller ceiling". That is false at HEAD. |
| E10 | Secret body size ceiling: `site.secret_options.content.maximum_length` / `SECRET_MAX_LENGTH`, default **10,000**, measured in **bytes**, and oversized content is rejected, not truncated. | verified — shipped default; byte measurement STRUCTURAL | `etc/defaults/config.defaults.yaml:251-256`; `lib/onetime/config.rb:72-78`; enforcement at `lib/onetime/logic/base.rb:184-193` (Phase-2 row 9/11, unchanged) |
| E11 | Passphrase settings: `required` **false**, `minimum_length` **4**, `maximum_length` **128**, `enforce_complexity` **false**. Env: `PASSPHRASE_REQUIRED`, `PASSPHRASE_MIN_LENGTH`, `PASSPHRASE_MAX_LENGTH`, `PASSPHRASE_ENFORCE_COMPLEXITY`. | verified — shipped defaults | `etc/defaults/config.defaults.yaml:239-250`; `lib/onetime/config.rb:66-71` |
| E12 | `generated_value_display_ttl` / `GENERATED_VALUE_DISPLAY_TTL` ships **60** seconds. It bounds *when* the one-shot generated-password display may happen, not how many times. `0` disables the receipt-page display. | verified — shipped default | `etc/defaults/config.defaults.yaml:257-259`; semantics at `apps/api/v2/logic/secrets/show_receipt.rb` (Phase-2 rows 44–48, re-confirmed unchanged in behaviour) |
| E13 | Generated-password defaults: length **12**, ceiling **128**, length options `[8,12,16,20,24,32]`, upper/lower/numbers on, ambiguous characters excluded. | verified — shipped defaults | `etc/defaults/config.defaults.yaml:260-279`; `lib/onetime/config.rb:79-93` |
| E14 | The YAML default for generated-password `symbols` is **true**, while the Ruby `DEFAULTS` hash says **false**. The YAML wins, because `deep_merge` only preserves `DEFAULTS` on `nil`. | verified (a real internal disagreement — state the YAML value) | `etc/defaults/config.defaults.yaml:277` (`ENV['PASSWORD_GEN_SYMBOLS'] != 'false'` → true when unset) vs `lib/onetime/config.rb:90` (`'symbols' => false`); merge rule at `lib/onetime/config.rb:1286-1292` |
| E15 | An operator can disable anonymous secret operations individually: `site.interface.api.guest_routes.{conceal,generate,reveal,burn,show,receipt}` with a global `enabled` above them. All ship **true**. Env: `API_GUEST_ROUTES_ENABLED`, `API_GUEST_CONCEAL`, `API_GUEST_GENERATE`, `API_GUEST_REVEAL`, `API_GUEST_BURN`, `API_GUEST_SHOW`, `API_GUEST_RECEIPT`. | verified — shipped defaults | `etc/defaults/config.defaults.yaml:204-215` |
| E16 | The whole API can be switched off with `site.interface.api.enabled` / `API_ENABLED`; `/api/*` then returns 404. Ships **true**. | verified — shipped default | `etc/defaults/config.defaults.yaml:200-203` |
| E17 | Burn/reveal *semantics* — one-time reveal, atomic claim, destroy-on-reveal, indistinguishable terminal states — are **STRUCTURAL**. No config key changes them. An operator can only remove the anonymous route (E15), never the semantics. | verified (absence of any knob) | No key under `site.secret_options` touches state transitions; the transitions live in `lib/onetime/models/secret/features/secret_state_management.rb` (Phase-2 rows 51–56, 67–70) |

---

## F. Sessions and cookies

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| F1 | Sessions are **server-side, datastore-backed**, not cookie-stored. The cookie carries only a 64-char hex session id; the payload lives at `session:<id>` in the datastore, JSON → AES-256-GCM → Base64 → HMAC. | verified (STRUCTURAL) | `lib/onetime/session.rb:18-49` (the security model and storage layout), class declaration at `:60` (`< Rack::Session::Abstract::PersistedSecure`) |
| F2 | The session secret does **not** hide the session id — it protects the payload's integrity and confidentiality. The app states this explicitly. | verified (STRUCTURAL) | `lib/onetime/session.rb:35-40` |
| F3 | Session handling is auth-mode agnostic — identical in simple and full mode. Session config was deliberately moved out of `auth.yaml` into `site.session`. | verified | `etc/defaults/auth.defaults.yaml:10-11`; `etc/defaults/config.defaults.yaml:367-370`; `lib/onetime/auth_config.rb:57-58` |
| F4 | `site.session.secret` / `SESSION_SECRET` — falls back to `site.secret` when unset (see A22). | verified — shipped default (empty → falls back) | `etc/defaults/config.defaults.yaml:371-372`; `lib/onetime/boot.rb:362-363` |
| F5 | `site.session.expire_after` — **86400** (24h). **No env var.** YAML-only. | verified — shipped default, YAML-only | `etc/defaults/config.defaults.yaml:373-374` (a literal, no ERB); `lib/onetime/boot.rb:88` (`SESSION_DEFAULTS`) |
| F6 | `site.session.key` (the cookie name) — **`onetime.session`**. **No env var.** Chosen over Rack's `rack.session` to blunt session fixation. | verified — shipped default, YAML-only | `etc/defaults/config.defaults.yaml:375-376`; `lib/onetime/boot.rb:89`; rationale at `lib/onetime/session.rb:106-108` |
| F7 | `site.session.same_site` — **`lax`**. **No env var.** `strict` is documented as breaking Stripe/OAuth redirects. | verified — shipped default, YAML-only | `etc/defaults/config.defaults.yaml:385-387`; `lib/onetime/boot.rb:90` |
| F8 | `site.session.httponly` — **`true`**. **No env var.** | verified — shipped default, YAML-only | `etc/defaults/config.defaults.yaml:388-389`; `lib/onetime/boot.rb:91` |
| F9 | `site.session.secure` is **derived, not independently set**. The defaults file emits the key *only* when `ENV['SSL'] == 'true'`; when the key is absent, boot fills it from `ssl_enabled?` — which is `site.ssl` **or** `RACK_ENV == 'production'`. So a production deploy gets `secure: true` without setting anything. | verified (STRUCTURAL) — the most easily mis-documented row in §F | `etc/defaults/config.defaults.yaml:377-384` (the `<% if ENV['SSL'] == 'true' %>` guard and the comment: "OMIT the key entirely when SSL env is not 'true' so boot.rb's ssl_enabled? fallback can default this to true"); `lib/onetime/boot.rb:365-366` (`result['secure'] = ssl_enabled? if result['secure'].nil?`), `:402-404` (`ssl_enabled?`) |
| F10 | **There is no cookie `domain` option.** The middleware is handed exactly five keys — `secret`, `expire_after`, `key`, `secure`, `same_site` — so the cookie is host-only. | verified (absence) | `lib/onetime/application/middleware_stack.rb:431-438` |
| F11 | If `secure` is on and the app sees the request as non-SSL, Rack **silently drops the cookie**. The app converts that into a throttled warning (once per ~5 min per process) naming the fix: forward `X-Forwarded-Proto: https` or set `ASSUME_HTTPS=true`. | verified (STRUCTURAL) | `lib/onetime/session.rb:75-79` (`SECURE_COOKIE_WARN_INTERVAL = 300`), `:235-249` (`security_matches?`), `:261-272` (the warning text verbatim) |
| F12 | `ASSUME_HTTPS` (`site.network.assume_https`) ships **false**. It is the escape hatch for F11. | verified — shipped default | `etc/defaults/config.defaults.yaml:612` |
| F13 | `site.session.skip_paths` lists anonymous probe endpoints that must not mint a persisted session: `/health`, `/health/advanced`, `/auth/health`, `/api/v1/status`, `/api/v2/status`, `/api/v3/status`. Matching is **exact string equality** on the full external path. | verified — shipped default | `etc/defaults/config.defaults.yaml:390-407`; `lib/onetime/boot.rb:92-100` |
| F14 | An operator-defined `skip_paths` **replaces** the shipped list wholesale — it does not merge. Boot logs the resolved list. | verified (STRUCTURAL) | `lib/onetime/boot.rb:79-86` (states it verbatim), logged at `:235` |
| F15 | Never add `/api/v*/secret/*/status` to `skip_paths` — the shipped config says so, because those are capability-token data reads, not probes. | verified | `etc/defaults/config.defaults.yaml:398-400` |
| F16 | Session HMAC and encryption keys are HKDF sub-keys of the session secret (`session-hmac`, `session-encryption`), so one secret yields two independent keys. | verified (STRUCTURAL) | `lib/onetime/key_derivation.rb:79-95` (`derive_session_subkey`); used by `Onetime::SessionCodec` (`lib/onetime/session.rb:126-129`) |

---

## G. Security headers

**The shape to write the page around:** exactly one header is a config toggle owned by OTS (CSP,
on/off). Six more are on/off toggles over `Rack::Protection` middleware. The header *values* —
CSP directives, HSTS max-age, referrer policy — are owned by the `otto` and `rack-protection`
gems and are **not configurable from OTS config**.

### G.1 CSP

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| G1 | CSP is **on by default**: `site.security.csp.enabled` / `CSP_ENABLED`, disable with `CSP_ENABLED=false`. This is the only OTS-owned CSP knob. | verified — shipped default | `etc/defaults/config.defaults.yaml:452-467`; the gate at `apps/web/core/middleware/request_setup.rb:98-102` |
| G2 | CSP is nonce-based. A fresh 16-byte base64 nonce is minted per request into `env['onetime.nonce']`, and views stamp it onto `<script>`/`<link>` tags. | verified (STRUCTURAL) | `apps/web/core/middleware/request_setup.rb:35-44`; enabled at `apps/web/core/application.rb:123-124` (`router.enable_csp_with_nonce!`); consumed at `lib/onetime/application/request_helpers.rb:140-143` and `lib/onetime/initializers/configure_rhales.rb:24,46` |
| G3 | The header is emitted **only on HTML responses**, in `:backstop` mode — it never overrides a policy a route already set. | verified (STRUCTURAL) | `apps/web/core/middleware/request_setup.rb:72-111` |
| G4 | The directive set lives in the `otto` gem (pinned `~> 2.8`, locked `2.8.0`), not in OTS config. Production directives: `default-src 'none'`, `script-src 'nonce-…'`, `style-src 'self' 'unsafe-inline'`, `connect-src 'self' wss: https:`, `img-src 'self' data:`, `font-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'`. | verified — gem-owned, not operator-configurable | `Gemfile:24`, `Gemfile.lock:278`; directives at `otto-2.8.0/lib/otto/security/csp/policy.rb:254-265`. Development mode swaps in a looser set (`:230-241`) and is selected by `development.enabled` (`request_setup.rb:109`). |
| G5 | The only directive OTS mutates is `form-action`, widened with the active SSO IdP origins. No-op when no provider is configured. | verified | `apps/web/core/application.rb:126-135`; source of origins at `lib/onetime/auth_config.rb:338-371` |
| G6 | **CSP reporting is not enabled.** No `report-uri` or `report-to` directive is emitted, and there is no config key for one. | verified (absence) | `grep -rn "enable_csp_reporting!\|csp_report_uri" apps lib --include=*.rb` returns nothing outside `auth_config.rb` comments. The gem supports it (`otto-2.8.0/lib/otto/security/core.rb:219-222`) but OTS never calls it. |
| G7 | `frame-ancestors 'none'` in the CSP is stricter than the `X-Frame-Options: SAMEORIGIN` in G9. Modern browsers honour `frame-ancestors`, so embedding is blocked outright when CSP is on. | verified (STRUCTURAL) | `otto-2.8.0/lib/otto/security/csp/policy.rb:265` vs `rack-protection-4.2.1/lib/rack/protection/frame_options.rb:22` |

### G.2 The Rack::Protection toggles

All under `site.middleware.*`, each with a `MIDDLEWARE_*` env var. Missing from
`self-hosting/environment-variables.md` entirely (see §I).

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| G8 | Ten toggles exist. **Default ON:** `static_files`, `utf8_sanitizer`, `authenticity_token`, `frame_options`, `path_traversal`, `strict_transport`. **Default OFF:** `http_origin`, `xss_header`, `cookie_tossing`, `ip_spoofing`. | verified — shipped defaults | `etc/defaults/config.defaults.yaml:411-451` (the ON set uses `!= 'false'`, the OFF set uses `== 'true'`) |
| G9 | `frame_options` emits `X-Frame-Options: SAMEORIGIN`, and only on HTML responses. The value is the gem default; OTS passes no options. | verified — gem default, not operator-configurable | `lib/onetime/middleware/security.rb:221-224` (registered with no `options:`); `rack-protection-4.2.1/lib/rack/protection/frame_options.rb:22-33` |
| G10 | `strict_transport` emits `Strict-Transport-Security: max-age=31536000` — **one year, no `includeSubDomains`, no `preload`**. Those are gem defaults and OTS exposes no knob for them. | verified — gem default, not operator-configurable | `lib/onetime/middleware/security.rb:245-248`; `rack-protection-4.2.1/lib/rack/protection/strict_transport.rb:23-31` |
| G11 | Five toggles are treated as security-critical: turning off `frame_options`, `path_traversal`, `strict_transport`, `authenticity_token` or `utf8_sanitizer` logs a warning. The four that ship OFF stay quiet by design. | verified | `lib/onetime/middleware/security.rb:37-47` (`SECURITY_CRITICAL_KEYS`), warning at `:90-97` |
| G12 | `Rack::Protection::EscapedParams` is **deliberately excluded** — uniform escaping would corrupt passwords and secret bodies. Field-aware sanitization is used instead. | verified (STRUCTURAL) | `lib/onetime/middleware/security.rb:209-213` |
| G13 | CSRF uses the `shrimp` parameter (or `X-CSRF-Token`), with documented bypasses for `/auth/sso/*` (OAuth `state` is the protection) and for API routes carrying no authenticated session cookie. | verified | `lib/onetime/middleware/security.rb:128-148` (the rule, stated as shipped comment), registration at `:149-160` |

### G.3 Headers with no OTS knob at all

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| G14 | `Referrer-Policy: strict-origin-when-cross-origin`, `X-Content-Type-Options: nosniff` and `X-XSS-Protection: 1; mode=block` are emitted per route by the `otto` gem's default header set. **OTS never overrides them and exposes no config key.** | verified — gem-owned | `otto-2.8.0/lib/otto/security/config.rb:905-911` (`default_security_headers`), applied at `otto-2.8.0/lib/otto/route.rb:189` and `otto-2.8.0/lib/otto/route_handlers/base.rb:150`. `grep -rn "security_headers" lib apps --include=*.rb` finds no OTS caller. |
| G15 | The referrer policy is *also* set as an HTML meta tag. | verified | `apps/web/core/templates/partials/head-base.rue:7` (`<meta name="referrer" content="strict-origin-when-cross-origin">`) |
| G16 | There is **no** `Permissions-Policy` header emitted by the Ruby stack at HEAD, despite a template README claiming one was added. | verified (absence) — flag, do not repeat the README | `apps/web/core/templates/partials/README.md:48` claims it; no `permissions-policy` string exists in `otto-2.8.0/lib/` or in OTS `lib/`/`apps/`. Settle with a live header capture before writing anything about it. |
| G17 | API v1 emits no CSP and no nonce, deliberately — it serves JSON only and is never executed by a browser. | verified | `apps/api/v1/controllers/helpers.rb:24-25` |

---

## H. Open questions — stop and ask rather than infer

1. **Organizations in simple mode (B9).** `registry.rb:157-165` skips only `web/auth/` and
   `web/billing/`, so the organizations API loads in simple mode, and `ENABLE_ORGS` carries no
   auth-mode gate. But the published `simple-or-full-auth.md:39` says organizations are
   full-mode-only. Settling this needs a runtime check (boot simple mode, `ENABLE_ORGS=true`, hit
   the org endpoints), not another read. Until then `configure/authentication` must not restate
   either claim.
2. **`Permissions-Policy` (G16).** README claims it; nothing in the Ruby stack emits it. A live
   response-header capture settles it in one request.
3. **Emitted CSP in production** — G4's directive list is the gem's source. A live capture would
   confirm no intermediary rewrites it. Same class of gap the Phase-2 ledger flagged for
   `Cache-Control`.
4. **`site.authentication.colonels` (B29).** Code reads it; nothing writes it and no env var
   feeds it. Is it a live-but-undocumented knob or dead code? Worth an app-repo issue rather than
   a docs decision.

---

## I. Docs-vs-HEAD drift

Recorded, **not fixed**. Two published pages are in scope: `src/content/docs/en/self-hosting/configuration.md`
and `…/environment-variables.md`.

### I.1 Documented but does not exist at HEAD

| Key | Where documented | Reality at HEAD |
|---|---|---|
| `OIDC_REDIRECT_URI`, `ENTRA_REDIRECT_URI`, `GOOGLE_REDIRECT_URI`, `GITHUB_REDIRECT_URI` | `environment-variables.md:232,237,241,245,250,253,258,261` — listed as **Required** | Read by no code. Redirect URI is derived per request (C8). |
| `EMAIL_PROVIDERS_SES_REGION`, `EMAIL_PROVIDERS_SENDGRID_SUBDOMAIN`, `EMAIL_PROVIDERS_LETTERMINT_SPF_INCLUDE` | `environment-variables.md` | Zero hits. Real names are `CUSTOM_MAIL_SES_REGION`, `CUSTOM_MAIL_SENDGRID_SUBDOMAIN`, `CUSTOM_MAIL_LETTERMINT_SPF_CNAME_{PREFIX,TARGET}` (D20). |
| `FROMNAME` | `environment-variables.md` | No such env var. `FROM_NAME` is the env var; `fromname` survives only as a deprecated **YAML** key (D10). |
| `VERIFIER_DOMAIN` | `environment-variables.md` | Present only inside a commented-out line, `config.defaults.yaml:1044`. Setting it does nothing (D23). |
| `ABOUT_EXTERNAL`, `PRIVACY_EXTERNAL`, `STATUS_EXTERNAL`, `TERMS_EXTERNAL` | `environment-variables.md` | Zero hits anywhere in the app. |
| `PRICING_URL`, `PUBLIC_STRIPE_API_KEY`, `VITE_API_BASE_URL` | `environment-variables.md` | Present only in `.env.reference` (`:944`, `:808`, `:1947`); no code reads them. |
| `PLAN_TTL_ANONYMOUS` documented **without** `TTL_MAX_ANONYMOUS` | `environment-variables.md` | Backwards. `TTL_MAX_ANONYMOUS` is the live name; `PLAN_TTL_ANONYMOUS` is the deprecated alias read in exactly one place (E5). |
| `LOGO_URL`, `LOGO_ALT`, `SITE_NAME` | `environment-variables.md` | Not gone, but **deprecated with a boot warning**; `BRAND_LOGO_URL` / `BRAND_LOGO_ALT` / `BRAND_PRODUCT_NAME` supersede them (`lib/onetime/config.rb:259-265`, `:266-272`, `:273-280`). |

### I.2 Wrong value or wrong shape

| Claim | Where | Reality at HEAD |
|---|---|---|
| `session.secure: <%= ENV['SSL'] == 'true' \|\| false %>` | `configuration.md:257` | The defaults file wraps `secure: true` in `<% if ENV['SSL'] == 'true' %>` **so the key can be absent**, letting boot default it from `ssl_enabled?`. The docs' unconditional form emits `secure: false` in production without `SSL=true` — the exact outcome the shipped comment exists to prevent (F9). |
| `session:` block shown without `skip_paths` | `configuration.md:248-261` | `skip_paths` ships with six entries and an operator value **replaces** the list wholesale (F13/F14). |
| "three modes: disabled, simple, full"; "switch `authentication.mode` to `full`" | `simple-or-full-auth.md:8-9,70` | Two values only, top-level `mode:` in `auth.yaml` / `AUTHENTICATION_MODE`. `disabled` silently resolves to `simple` (B1/B2). |
| Full mode requires "PostgreSQL 17+" | `simple-or-full-auth.md:35,41` | Default is SQLite at `data/auth.db` (B7). |
| Full mode requires "RabbitMQ 4.3+" | `simple-or-full-auth.md:36,41` | `jobs.enabled` ships false, `fallback_to_sync` ships true (B8). |
| "Organizations / teams: Simple ❌" | `simple-or-full-auth.md:39` | Not settled — see §H item 1. |

### I.3 Exists at HEAD, omitted by both pages

Grouped by Configure page. Every name below was confirmed present in
`etc/defaults/*.yaml` or code, and absent from `environment-variables.md`.

- **secrets-and-keys:** `SECRET_PREVIOUS`, `SECRET_VERIFIER_MODE`, `ACCOUNT_ID_SECRET`
- **secret-options:** `TTL_MAX_ANONYMOUS`, `SECRET_MAX_LENGTH`, `PASSPHRASE_REQUIRED`,
  `PASSPHRASE_MIN_LENGTH`, `PASSPHRASE_MAX_LENGTH`, `PASSPHRASE_ENFORCE_COMPLEXITY`,
  `GENERATED_VALUE_DISPLAY_TTL`, `PASSWORD_GEN_LENGTH`, `PASSWORD_GEN_MAX_LENGTH`,
  `PASSWORD_GEN_{UPPERCASE,LOWERCASE,NUMBERS,SYMBOLS,EXCLUDE_AMBIGUOUS}`,
  `API_GUEST_ROUTES_ENABLED`, `API_GUEST_{CONCEAL,GENERATE,REVEAL,BURN,SHOW,RECEIPT}`
- **authentication:** `AUTH_REQUIRED`, `AUTH_REMEMBER_ME_ENABLED`, `ALLOWED_SIGNUP_DOMAIN`,
  `ADMIN_ALLOWED_CIDRS`, `RESET_REQUEST_RATE_LIMIT_*` (5), `CREATE_ACCOUNT_RATE_LIMIT_*` (4)
- **sso:** `SSO_TRUST_EMAIL_FOR_LINKING`, `OIDC_TRUST_EMAIL_FOR_LINKING`,
  `ENTRA_TRUST_EMAIL_FOR_LINKING`, `GOOGLE_TRUST_EMAIL_FOR_LINKING`,
  `GITHUB_TRUST_EMAIL_FOR_LINKING`, `SSO_ALLOW_PLATFORM_FALLBACK`, `SSO_FORM_ACTION_ORIGINS`
- **email:** `REPLYTO_EMAIL`, `FEEDBACK_TO_EMAIL`, `EMAILER_SHOW_LOGO`, `CUSTOM_MAIL_PROVIDER`,
  `CUSTOM_MAIL_SES_REGION`, `CUSTOM_MAIL_SES_ACCESS_KEY_ID`, `CUSTOM_MAIL_SES_SECRET_ACCESS_KEY`,
  `CUSTOM_MAIL_SENDGRID_SUBDOMAIN`, `CUSTOM_MAIL_LETTERMINT_SPF_CNAME_PREFIX`,
  `CUSTOM_MAIL_LETTERMINT_SPF_CNAME_TARGET`
- **sessions-and-cookies:** `ASSUME_HTTPS`. (Note: `expire_after`, `key`, `same_site` and
  `httponly` have **no** env var — they are YAML-only, F5–F8.)
- **security-headers:** all ten `MIDDLEWARE_*` toggles — `MIDDLEWARE_STATIC_FILES`,
  `MIDDLEWARE_UTF8_SANITIZER`, `MIDDLEWARE_AUTHENTICITY_TOKEN`, `MIDDLEWARE_HTTP_ORIGIN`,
  `MIDDLEWARE_XSS_HEADER`, `MIDDLEWARE_FRAME_OPTIONS`, `MIDDLEWARE_PATH_TRAVERSAL`,
  `MIDDLEWARE_COOKIE_TOSSING`, `MIDDLEWARE_IP_SPOOFING`, `MIDDLEWARE_STRICT_TRANSPORT`

`configuration.md` carries some of these inside its single 596-line YAML fence
(`PASSPHRASE_*`, `PASSWORD_GEN_*`, `GENERATED_VALUE_DISPLAY_TTL`, `AUTH_REQUIRED`,
`ALLOWED_SIGNUP_DOMAIN`, `REPLYTO_EMAIL`) but `environment-variables.md`, which is the page an
operator searches, does not.

---

## Do not claim

- **"Enable the SSO entitlement" / "SSO requires an upgraded plan" on any operator page.**
  `manage_sso` is in `STANDALONE_ENTITLEMENTS` (`with_plan_entitlements.rb:55`), so on a stock
  self-hosted install it is already granted. The string "SSO management requires the manage_sso
  entitlement. Please upgrade your plan." (`apps/api/domains/logic/sso_config/base.rb:34`) is the
  hosted-tier message. Self-hosted, the real gates are `AUTH_SSO_ENABLED`, full mode, provider
  credentials, and — for the per-domain surface — `ORGS_SSO_ENABLED` plus org ownership.
- **Any per-page statement that entitlements or limits are something the operator configures.**
  There is no config key that sets an entitlement list. Row 0.4.
- **"Set `OIDC_REDIRECT_URI` to your callback URL."** No code reads it (C8). Tell the operator to
  register `https://<host>/auth/sso/<route-name>/callback` **at the IdP** and note the app derives
  its own value from the request host.
- **"Full mode requires PostgreSQL and RabbitMQ."** SQLite is the shipped auth-database default
  (B7) and jobs ship disabled with a synchronous fallback (B8). Say what each service buys, not
  that it is required.
- **"There are three authentication modes."** Two (B2). `AUTHENTICATION_MODE=disabled` silently
  gives you simple mode; disabling auth is `AUTH_ENABLED=false`, a different key.
- **"Secrets are capped at 30 days."** Not at HEAD. The absolute bound is 365 days
  (`MAX_TTL`); the practical ceiling is the `ttl_options` maximum, which ships at 30 days but is
  operator-settable. Row E9 — and correct the Phase-2 ledger row 29 rather than copying it.
- **"HSTS max-age is configurable."** It is not. `MIDDLEWARE_STRICT_TRANSPORT` is on/off only; the
  one-year value with no `includeSubDomains` and no `preload` comes from `rack-protection`
  (G10). Same for `X-Frame-Options`' `SAMEORIGIN` (G9) and the referrer policy (G14).
- **"Configure the Content-Security-Policy directives."** OTS exposes `CSP_ENABLED` and nothing
  else; the directive set is `otto`'s (G4). The single exception is `form-action`, widened
  automatically by SSO (G5) and by `SSO_FORM_ACTION_ORIGINS`.
- **"CSP violations are reported to …"** Reporting is never enabled (G6).
- **"Set a cookie domain."** There is no such option (F10).
- **"Set `session.secure` to match your TLS setup."** It is derived. Writing the key at all can
  make a production deploy *worse* than leaving it absent (F9). Tell the operator to set `SSL` /
  `site.ssl`, or rely on `RACK_ENV=production`.
- **"`SECRET` must be at least N characters / must be hex."** No such requirement exists (A4).
  Recommend `rake ots:secrets` and its 64 random bytes; do not invent a rule the code does not
  enforce.
- **"Changing `SECRET` is safe if you keep a backup."** Changing it under existing data makes
  pre-rotation ciphertext unreadable until it is restored or `SECRET_PREVIOUS` carries the old
  value (A14/A19). The verifier only *detects* this, and only warns by default (A16).
- **"Set `emailer.from` — optional."** It is the one email value with a placeholder default that
  nothing validates (D9). Treat it as required.
- **A `Permissions-Policy` claim.** The template README says one was added; nothing emits it
  (G16).
- **Anything about what onetimesecret.com has configured.** Every value here comes from
  `etc/defaults/`. There is no production config in this repo.
- **Any plan-tier, seat or price statement.** Hard stop per the billing gate, unchanged.
