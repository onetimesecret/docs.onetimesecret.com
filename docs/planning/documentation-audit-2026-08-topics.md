# Documentation audit — full topic inventory

Companion to [`documentation-audit-2026-08.md`](./documentation-audit-2026-08.md). Every catalogued
feature that is **undocumented** or only **partially** documented on the docs site, grouped by the
domain that was surveyed.

Tags: `[priority/status]` — priority is `crit` / `high` / `medi` / `low`; status is `undocu`
(absent from `en/` entirely) or `partia` (mentioned but not usable from the docs alone). Trailing
identifiers are the environment variables the topic covers, truncated to four.

Fully-documented features are omitted. 304 topics follow.

**Decision annotations (2026-08-04).** Priority and status are unchanged by the decisions — a gap is
still a gap. What changed for a handful of topics is *who resolves them and when*, so those lines carry
a trailing marker:

- **[D2]** — a code-side defect, not a writing task. Tracked in
  [onetimesecret#3993](https://github.com/onetimesecret/onetimesecret/issues/3993); the docs describe
  current behaviour and do not claim the feature works.
- **[D3]** — blocked on the production `etc/billing.yaml`, which is kept outside both repos and
  requested when needed. Cannot be written from in-repo sources.
- **[D8]** — no dedicated deprecated/removed reference page; the project is pre-1.0 and the reference
  documents what the current version reads. The marker records where the topic goes instead, which for
  most of these is *nowhere for now*.

Everything unmarked proceeds as the plan describes. See
[`documentation-audit-2026-08.md`](./documentation-audit-2026-08.md#decisions) for the full reasoning.

### Secrets, cryptography & key management
- [crit/partia] SECRET as root input keying material (IKM) — the HKDF key tree — SECRET
- [crit/partia] Three key classes: [derived] vs [independent] vs [federation] — SESSION_SECRET,IDENTIFIER_SECRET,AUTH_SECRET,ARGON2_SECRET
- [crit/undocu] Key generation: `rake ots:secrets` / `bin/setup --init` — ENV_FILE,DERIVE,FORCE
- [crit/undocu] Boot-time SECRET verifier and SECRET_VERIFIER_MODE (warn / enforce / off) — SECRET_VERIFIER_MODE
- [crit/undocu] SECRET_PREVIOUS — decrypt-only key rotation chain — SECRET_PREVIOUS
- [crit/undocu] ACCOUNT_ID_SECRET — account-ID obfuscation (required in production) — ACCOUNT_ID_SECRET
- [high/undocu] Rotation verification tooling: `rake ots:secrets:verify` / `:adopt` — CONFIRM
- [high/undocu] Fail-safe reveal under a wrong or missing key (503 `secret_undecryptable`)
- [high/partia] AUTH_SECRET and AUTH_OLD_SECRET (Rodauth HMAC rotation window) — AUTH_SECRET,AUTH_OLD_SECRET
- [high/partia] ARGON2_SECRET — Argon2id password pepper — ARGON2_SECRET
- [high/partia] ALLOW_NIL_GLOBAL_SECRET — nil-secret recovery escape hatch — ALLOW_NIL_GLOBAL_SECRET
- [high/partia] TTL_OPTIONS — the expiration menu offered to users — TTL_OPTIONS
- [high/partia] TTL_MAX_ANONYMOUS — expiration ceiling for account-less secrets — TTL_MAX_ANONYMOUS,PLAN_TTL_ANONYMOUS
- [high/partia] Passphrase policy: required, minimum/maximum length, complexity — PASSPHRASE_REQUIRED,PASSPHRASE_MIN_LENGTH,PASSPHRASE_MAX_LENGTH,PASSPHRASE_ENFORCE_COMPLEXITY
- [high/undocu] Passphrase brute-force protection (two-tier rate limiting and lockout)
- [high/undocu] Secret content size limit (SECRET_MAX_LENGTH) — SECRET_MAX_LENGTH
- [high/partia] One-time reveal of a generated password on the receipt page (GENERATED_VALUE_DISPLAY_TTL) — GENERATED_VALUE_DISPLAY_TTL
- [high/undocu] The receipt page — the creator's private link and its capabilities — API_GUEST_RECEIPT,UI_CAPABILITIES_RECEIPT
- [medi/partia] SESSION_SECRET — Rack session signing key — SESSION_SECRET
- [medi/partia] IDENTIFIER_SECRET and the VERIFIABLE_ID_HMAC_SECRET fallback chain — IDENTIFIER_SECRET,VERIFIABLE_ID_HMAC_SECRET
- [medi/partia] FEDERATION_SECRET — cross-region shared key — FEDERATION_SECRET
- [medi/undocu] Fail-fast boot when SECRET is missing or 'CHANGEME' — SECRET
- [medi/undocu] Encryption parameter pinning (personalization and HKDF salt)
- [medi/undocu] Passphrase storage: argon2id hashing, unrecoverable by design
- [medi/partia] Password generation settings (length, character sets, ambiguous characters) — PASSWORD_GEN_LENGTH,PASSWORD_GEN_UPPERCASE,PASSWORD_GEN_LOWERCASE,PASSWORD_GEN_NUMBERS
- [medi/undocu] PASSWORD_GEN_MAX_LENGTH — server-side generated-password length ceiling — PASSWORD_GEN_MAX_LENGTH
- [medi/partia] At-most-once reveal guarantee (fail-closed, not fail-open)
- [medi/undocu] Uniform 'no longer available' response — the deliberate absence of an existence oracle
- [medi/undocu] Reads are state-neutral: viewing does not reset expiration or advance state
- [low/undocu] RODAUTH_HMAC_SECRET — deprecated and silently ignored — RODAUTH_HMAC_SECRET **[D8: deferred]**
- [low/undocu] SECRET_VARIABLE_NAMES — routing secrets to Podman/container secret stores — SECRET_VARIABLE_NAMES

### HTTP security, sessions, middleware & network
- [crit/undocu] Trusted proxy configuration / client IP resolution — TRUSTED_PROXY_ENABLED,TRUSTED_PROXY_MODE,TRUSTED_PROXY_HEADER,TRUSTED_PROXY_CIDRS
- [crit/undocu] filter vs depth mode and the X-Forwarded-For overwrite requirement — TRUSTED_PROXY_MODE,TRUSTED_PROXY_DEPTH,TRUSTED_PROXY_CIDRS
- [crit/undocu] ASSUME_HTTPS — origin scheme upgrade behind a non-scheme-forwarding TLS proxy — ASSUME_HTTPS
- [crit/partia] Session cookie Secure flag — production default and silent cookie drop — SSL,SESSION_SECRET
- [crit/undocu] Account-creation rate limiter (signup throttle) — CREATE_ACCOUNT_RATE_LIMIT_ENABLED,CREATE_ACCOUNT_RATE_LIMIT_MAX_PER_IP,CREATE_ACCOUNT_RATE_LIMIT_WINDOW,CREATE_ACCOUNT_RATE_LIMIT_LOCKOUT
- [high/undocu] Password-reset request rate limiter — RESET_REQUEST_RATE_LIMIT_ENABLED,RESET_REQUEST_RATE_LIMIT_MAX_PER_IP,RESET_REQUEST_RATE_LIMIT_MAX_PER_EMAIL,RESET_REQUEST_RATE_LIMIT_WINDOW
- [high/undocu] Non-configurable perimeter rate limiters (login, passphrase, feedback, invite tokens, DNS verification)
- [high/undocu] 429 responses and the Retry-After header
- [high/undocu] Rate-limit inspection and reset (operator recovery from a stuck lockout)
- [high/undocu] Client IP privacy masking (/24 IPv4, /48 IPv6)
- [high/undocu] Colonel admin network isolation (ADMIN_ALLOWED_CIDRS) — ADMIN_ALLOWED_CIDRS
- [high/partia] Health endpoint access control (HEALTH_TRUSTED_CIDR) — HEALTH_TRUSTED_CIDR
- [high/undocu] IP bans (BannedIP middleware, Colonel API and CLI)
- [high/partia] Content-Security-Policy with per-request nonce (CSP_ENABLED) — CSP_ENABLED
- [high/undocu] CSP form-action origins for SSO redirects (SSO_FORM_ACTION_ORIGINS) — SSO_FORM_ACTION_ORIGINS
- [high/partia] CSRF protection (shrimp authenticity token) and the X-CSRF-Token response header — MIDDLEWARE_AUTHENTICITY_TOKEN
- [high/undocu] HSTS / Strict-Transport-Security middleware — MIDDLEWARE_STRICT_TRANSPORT
- [high/undocu] Security middleware toggle matrix (site.middleware.*) — MIDDLEWARE_STATIC_FILES,MIDDLEWARE_UTF8_SANITIZER,MIDDLEWARE_AUTHENTICITY_TOKEN,MIDDLEWARE_HTTP_ORIGIN
- [high/partia] Homepage-mode CIDR matching depends on global trusted-proxy config — UI_HOMEPAGE_MATCHING_CIDRS,UI_HOMEPAGE_MODE,UI_HOMEPAGE_MODE_HEADER
- [medi/undocu] Origin-header CSRF protection (MIDDLEWARE_HTTP_ORIGIN) — MIDDLEWARE_HTTP_ORIGIN
- [medi/partia] Clickjacking protection (X-Frame-Options) — MIDDLEWARE_FRAME_OPTIONS
- [medi/partia] Legacy XSS header and X-Content-Type-Options nosniff (MIDDLEWARE_XSS_HEADER) — MIDDLEWARE_XSS_HEADER
- [medi/undocu] Request sanitization middleware (UTF-8 sanitizer, path traversal, cookie tossing, IP spoofing) — MIDDLEWARE_UTF8_SANITIZER,MIDDLEWARE_PATH_TRAVERSAL,MIDDLEWARE_COOKIE_TOSSING,MIDDLEWARE_IP_SPOOFING
- [medi/undocu] Built-in static asset serving (MIDDLEWARE_STATIC_FILES) — MIDDLEWARE_STATIC_FILES
- [medi/partia] Session store, lifetime and cookie attributes — SESSION_SECRET
- [medi/undocu] Incoming-secrets submission rate limiter — INCOMING_RATE_LIMIT_ENABLED,INCOMING_RATE_LIMIT_MAX_PER_IP,INCOMING_RATE_LIMIT_MAX_PER_RECIPIENT,INCOMING_RATE_LIMIT_WINDOW
- [low/undocu] Request correlation ID (X-Request-Id)
- [low/undocu] Startup readiness gate (503 before the app is configured)
- [low/undocu] Content-Type normalization for malformed clients

### Authentication & identity
- [crit/undocu] ACCOUNT_ID_SECRET (account-id obfuscation) — ACCOUNT_ID_SECRET
- [crit/undocu] Migrating existing Redis accounts into the auth database (bin/ots customers sync-auth-accounts)
- [crit/partia] Auth database backend: SQLite vs PostgreSQL (AUTH_DATABASE_URL) — AUTH_DATABASE_URL
- [crit/partia] TOTP / MFA with recovery codes — AUTH_MFA_ENABLED
- [crit/partia] SSO master switch and platform provider registration (OIDC, Entra ID, Google, GitHub) — AUTH_SSO_ENABLED,OIDC_ISSUER,OIDC_CLIENT_ID,OIDC_CLIENT_SECRET
- [crit/undocu] SSO identity linking policy and the trusted-IdP flag — SSO_TRUST_EMAIL_FOR_LINKING,OIDC_TRUST_EMAIL_FOR_LINKING,ENTRA_TRUST_EMAIL_FOR_LINKING,GOOGLE_TRUST_EMAIL_FOR_LINKING
- [high/partia] Separate migrations connection and least-privilege role split (AUTH_DATABASE_URL_MIGRATIONS) — AUTH_DATABASE_URL_MIGRATIONS
- [high/undocu] Automatic schema migrations on boot
- [high/partia] Authentication mode selection (disabled / simple / full) and where the key actually lives — AUTHENTICATION_MODE,AUTH_ENABLED
- [high/undocu] MFA lockout recovery (operator escape hatch)
- [high/partia] WebAuthn: passkeys, biometrics and security keys — AUTH_WEBAUTHN_ENABLED
- [high/partia] Email auth / magic links — AUTH_EMAIL_AUTH_ENABLED
- [high/partia] Account lockout / brute-force protection — AUTH_LOCKOUT_ENABLED
- [high/partia] ARGON2_SECRET (password pepper) — ARGON2_SECRET
- [high/partia] AUTH_SECRET and rotation via AUTH_OLD_SECRET — AUTH_SECRET,AUTH_OLD_SECRET
- [high/undocu] Connected Identities — user-managed SSO identity linking
- [high/undocu] SSO_FORM_ACTION_ORIGINS — CSP form-action and Chromium-blocked SSO redirects — SSO_FORM_ACTION_ORIGINS,CSP_ENABLED
- [high/partia] Provider route names and the mass re-link hazard — OIDC_ROUTE_NAME,ENTRA_ROUTE_NAME,GOOGLE_ROUTE_NAME,GITHUB_ROUTE_NAME
- [high/partia] Per-domain (tenant) SSO for organizations — ORGS_SSO_ENABLED,SSO_ALLOW_PLATFORM_FALLBACK
- [high/undocu] Account-creation and password-reset rate limiting — RESET_REQUEST_RATE_LIMIT_ENABLED,RESET_REQUEST_RATE_LIMIT_MAX_PER_IP,RESET_REQUEST_RATE_LIMIT_MAX_PER_EMAIL,RESET_REQUEST_RATE_LIMIT_WINDOW
- [high/partia] Auth kill switches: AUTH_ENABLED / AUTH_SIGNUP / AUTH_SIGNIN / AUTH_REQUIRED — AUTH_ENABLED,AUTH_SIGNUP,AUTH_SIGNIN,AUTH_REQUIRED
- [medi/undocu] WebAuthn autofill and passwordless signup (WEBAUTHN_AUTOFILL, WEBAUTHN_VERIFY_ACCOUNT) — WEBAUTHN_AUTOFILL,WEBAUTHN_VERIFY_ACCOUNT
- [medi/partia] Password policy and argon2id hashing — AUTH_PASSWORD_REQUIREMENTS_ENABLED
- [medi/partia] restrict_to — restricting the login page to a single method — AUTH_PASSWORD_ONLY,AUTH_EMAIL_AUTH_ONLY,AUTH_WEBAUTHN_ONLY,AUTH_SSO_ONLY
- [medi/undocu] Remember me (persistent login) — AUTH_REMEMBER_ME_ENABLED
- [medi/partia] Active sessions: view and revoke signed-in devices — AUTH_ACTIVE_SESSIONS_ENABLED
- [medi/partia] Session cookie and lifetime configuration — SESSION_SECRET,SSL
- [medi/partia] Email verification on signup (verify_account) and AUTH_AUTOVERIFY — AUTH_AUTOVERIFY,AUTH_VERIFY_ACCOUNT_ENABLED
- [medi/undocu] First-time SSO sign-in for an existing account: password interstitial and mailbox-proof linking
- [medi/partia] SAML is not supported natively
- [medi/partia] Signup domain allowlist (ALLOWED_SIGNUP_DOMAIN) — ALLOWED_SIGNUP_DOMAIN
- [medi/undocu] Password reset flow and its enumeration hardening
- [medi/partia] Authentication audit logging
- [medi/partia] Simple mode: what it actually supports
- [low/partia] Per-provider SSO display names and the deprecated SSO_DISPLAY_NAME — SSO_DISPLAY_NAME,OIDC_DISPLAY_NAME,ENTRA_DISPLAY_NAME,GOOGLE_DISPLAY_NAME
- [low/partia] TOTP authenticator issuer label (BRAND_TOTP_ISSUER) — BRAND_TOTP_ISSUER,BRAND_PRODUCT_NAME,SITE_NAME
- [low/undocu] AUTH_SERVICE_URL (reserved / inert) — AUTH_SERVICE_URL **[D8: deferred]**
- [low/undocu] Deprecated and inert auth variables (RODAUTH_HMAC_SECRET, GITHUB_KEY/SECRET, GOOGLE_KEY/SECRET) — RODAUTH_HMAC_SECRET,GITHUB_KEY,GITHUB_SECRET,GOOGLE_KEY **[D8: deferred]**

### Email delivery, providers & deliverability
- [crit/partia] Email delivery mode / transport selection (emailer.mode) — EMAILER_MODE
- [crit/partia] Sender identity: From address and From name — FROM_EMAIL,FROM_NAME,FROM
- [crit/undocu] SES sender-domain provisioning credentials — CUSTOM_MAIL_SES_REGION,CUSTOM_MAIL_SES_ACCESS_KEY_ID,CUSTOM_MAIL_SES_SECRET_ACCESS_KEY,AWS_ACCESS_KEY_ID
- [crit/undocu] Email operations CLI (bin/ots email)
- [high/partia] Plain SMTP delivery setup — SMTP_HOST,SMTP_PORT,SMTP_USERNAME,SMTP_PASSWORD
- [high/undocu] AWS SES as the delivery transport — EMAILER_MODE,EMAILER_REGION,SMTP_USERNAME,SMTP_PASSWORD
- [high/undocu] SendGrid as the delivery transport — EMAILER_MODE,SENDGRID_API_KEY,SMTP_PASSWORD
- [high/undocu] Logger delivery mode (write emails to the log instead of sending) — EMAILER_MODE
- [high/undocu] Disabled delivery mode for air-gapped and SSO-only installs — EMAILER_MODE
- [high/undocu] SMTP unauthenticated-retry fallback
- [high/partia] Truemail address validation (install-wide) — VERIFIER_EMAIL,VERIFIER_DOMAIN
- [high/partia] Custom mail sender per organization/domain (feature enablement) — ORGS_CUSTOM_MAIL_ENABLED,ENABLE_ORGS
- [high/undocu] Sender-domain provisioning provider selection (decoupled from transport) — CUSTOM_MAIL_PROVIDER
- [high/partia] Lettermint sender-domain DNS settings and dual-token model — LETTERMINT_TEAM_TOKEN,CUSTOM_MAIL_LETTERMINT_SPF_CNAME_PREFIX,CUSTOM_MAIL_LETTERMINT_SPF_CNAME_TARGET
- [high/undocu] Custom sender DNS records and dual verification flow
- [high/undocu] Email suppression list (send-time recipient blocking)
- [high/undocu] Bounce and complaint event ingestion and ESP feedback sync — AWS_REGION,CUSTOM_MAIL_SES_REGION,LETTERMINT_TEAM_TOKEN
- [high/undocu] Expiration-warning emails
- [high/partia] Asynchronous email delivery, worker tuning and sync fallback — JOBS_ENABLED,JOBS_FALLBACK_SYNC,EMAIL_WORKER_THREADS,EMAIL_WORKER_PREFETCH
- [medi/partia] Lettermint as the delivery transport — EMAILER_MODE,LETTERMINT_API_TOKEN,LETTERMINT_BASE_URL
- [medi/undocu] SMTP HELO domain — SMTP_DOMAIN
- [medi/partia] Reply-To address — REPLYTO_EMAIL
- [medi/undocu] Feedback form recipient routing — FEEDBACK_TO_EMAIL
- [medi/partia] EMAILER_REGION and its misleading default — EMAILER_REGION,AWS_REGION
- [medi/partia] Truemail SMTP-probe verifier identity — VERIFIER_EMAIL,VERIFIER_DOMAIN
- [medi/undocu] Per-domain signup email validation (custom_signup_validation)
- [medi/partia] SendGrid sender-domain DNS settings — CUSTOM_MAIL_SENDGRID_SUBDOMAIN
- [medi/undocu] Colonel deliverability admin API
- [medi/undocu] Secret-revealed notification (owner opt-in)
- [medi/undocu] Transactional email template catalog
- [low/undocu] Email logo display toggle — EMAILER_SHOW_LOGO
- [low/partia] Local development mail capture (Mailpit) — SMTP_HOST,SMTP_PORT,SMTP_AUTH,SMTP_TLS

### Background jobs, scheduler & maintenance operations
- [crit/partia] Background job system master switch — JOBS_ENABLED
- [crit/partia] RabbitMQ broker connection and credentials — RABBITMQ_URL,RABBITMQ_USER,RABBITMQ_PASS,RABBITMQ_VHOST
- [crit/partia] Running background workers in production — SNEAKERS_PID_PATH,RABBITMQ_VHOST
- [crit/partia] Running the scheduler daemon — SCHEDULER_PID_PATH
- [high/undocu] RabbitMQ TLS (amqps) configuration — RABBITMQ_VERIFY_PEER,RABBITMQ_CA_CERTIFICATES
- [high/partia] Queue and exchange provisioning (ots queue init) — RABBITMQ_MANAGEMENT_URL
- [high/undocu] JOBS_SCHEDULER_ENABLED does not gate the scheduler — JOBS_SCHEDULER_ENABLED **[D2]**
- [high/undocu] Fallback delivery when the broker is unavailable — JOBS_FALLBACK_SYNC **[D2]**
- [high/undocu] Dead-letter queue inspection, replay and purge
- [high/undocu] Dead-letter queue 7-day message TTL
- [high/undocu] DLQ email consumer job (auth-email rescue) — non-auth mail, incl. secret links and expiration warnings, is discarded by design **[D2: documented in operate/queues-and-dlq, not fixed]**
- [high/undocu] Queue reset and the immutable-queue-arguments hazard
- [high/undocu] Plan cache refresh job
- [high/undocu] Secret expiration warning emails
- [high/undocu] Data maintenance jobs: master toggle and auto_repair safety model
- [high/undocu] Index rebuild maintenance job
- [high/undocu] Instances rebuild maintenance job
- [high/undocu] Secret count reconciliation job
- [high/undocu] Removal of the 32 JOBS_* tuning environment variables in v0.26 — JOBS_EXPIRATION_WARNINGS_ENABLED,JOBS_DLQ_CONSUMER_ENABLED,JOBS_DOMAIN_REFRESH_ENABLED,JOBS_MAINTENANCE_ENABLED **[D8: → upgrades/v0-26 + troubleshoot/boot-failures]**
- [medi/undocu] Per-worker concurrency and prefetch tuning — EMAIL_WORKER_THREADS,EMAIL_WORKER_PREFETCH,NOTIFICATION_WORKER_THREADS,NOTIFICATION_WORKER_PREFETCH
- [medi/undocu] Publisher channel pool sizing — RABBITMQ_CHANNEL_POOL_SIZE
- [medi/undocu] Queue topology reference
- [medi/undocu] DLQ depth monitor job
- [medi/partia] Job system status and queue depth reporting
- [medi/undocu] Queue smoke test (ots queue ping)
- [medi/undocu] Stripe catalog retry job
- [medi/undocu] Custom-domain refresh job
- [medi/undocu] Custom-domain favicon auto-fetch — FAVICON_FETCH_WORKER_THREADS,FAVICON_FETCH_WORKER_PREFETCH
- [medi/undocu] Phantom cleanup maintenance job
- [medi/undocu] Data consistency audit job
- [medi/undocu] Participation GC maintenance job
- [medi/undocu] Job system log channels — DEBUG_BUNNY
- [low/partia] Worker liveness heartbeat logging — WORKER_HEARTBEAT_INTERVAL
- [low/partia] Daemonize mode and PID files — SNEAKERS_PID_PATH,SCHEDULER_PID_PATH
- [low/undocu] Scheduler heartbeat job
- [low/undocu] Nightly favicon backfill scan
- [low/undocu] Familia housekeeping chores job

### Observability, diagnostics & logging
- [crit/undocu] Sentry PII scrubbing and redaction guarantees
- [crit/undocu] Request/error field allowlist (the one dial for log and Sentry field exposure) — LOG_HTTP_ALLOWED_ERROR_FIELDS
- [crit/undocu] Deprecated-config boot policy (DEPRECATED_CONFIG_MODE) — DEPRECATED_CONFIG_MODE
- [crit/undocu] Health endpoint network gating (HealthAccessControl / HEALTH_TRUSTED_CIDR) — HEALTH_TRUSTED_CIDR
- [crit/undocu] Running without a global secret (ALLOW_NIL_GLOBAL_SECRET) — ALLOW_NIL_GLOBAL_SECRET
- [high/partia] Diagnostics master switch (Sentry error tracking) — DIAGNOSTICS_ENABLED
- [high/partia] Per-process Sentry DSN routing (backend / frontend / workers / shared fallback) — SENTRY_DSN,SENTRY_DSN_BACKEND,SENTRY_DSN_FRONTEND,SENTRY_DSN_WORKERS
- [high/partia] Health and readiness endpoints (/health, /health/advanced, /auth/health)
- [high/partia] Global log level and precedence (DEFAULT_LOG_LEVEL / LOG_LEVEL / ONETIME_DEBUG) — DEFAULT_LOG_LEVEL,LOG_LEVEL,ONETIME_DEBUG
- [high/undocu] Named logger categories and per-category debug flags — DEBUG_LOGGERS,DEBUG_APP,DEBUG_AUTH,DEBUG_BILLING
- [high/undocu] Log output format and destination (LOG_FORMATTER: color | json | default) — LOG_FORMATTER
- [high/undocu] HTTP request capture modes (LOG_HTTP_CAPTURE: minimal | standard | debug) — LOG_HTTP_CAPTURE
- [high/partia] logging.yaml as a first-class config file
- [high/partia] `bin/ots status` — runtime service view
- [high/undocu] `bin/ots diagnostics sentry` — doctor, check-dsn, send-test-event
- [high/undocu] On-demand heap dumps (HEAP_DUMP_ENABLED / HEAP_DUMP_DIR) — HEAP_DUMP_ENABLED,HEAP_DUMP_DIR
- [high/undocu] Secret verifier state as a health signal
- [medi/partia] HTTP request logging toggle and level — LOG_HTTP_REQUESTS,LOG_HTTP_REQUESTS_LEVEL
- [medi/undocu] Request log level escalation and slow-request threshold — LOG_HTTP_SLOW_REQUEST_MS
- [medi/undocu] Error correlation id on error log lines (x-request-id / error_type)
- [medi/undocu] Exception backtrace truncation (BACKTRACE_LEVEL / BACKTRACE_LINES) — BACKTRACE_LEVEL,BACKTRACE_LINES
- [medi/undocu] Datastore and framework command logging (DEBUG_DATABASE, FAMILIA_DEBUG, OTTO_DEBUG, FAMILIA_SAMPLE_RATE) — DEBUG_DATABASE,FAMILIA_DEBUG,FAMILIA_SAMPLE_RATE,OTTO_DEBUG
- [medi/partia] Sentry sampling, breadcrumbs and console error logging — SENTRY_SAMPLE_RATE,SENTRY_MAX_BREADCRUMBS,SENTRY_LOG_ERRORS
- [medi/undocu] Sentry strict trace continuation (SENTRY_ORG_ID) — SENTRY_ORG_ID
- [medi/undocu] Sentry release identity and source-map upload (SENTRY_RELEASE, SENTRY_DIST, SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT, SENTRY_URL) — SENTRY_RELEASE,SENTRY_DIST,SENTRY_AUTH_TOKEN,SENTRY_ORG
- [medi/partia] Frontend diagnostics: browser DSN exposure and Vue component tracking — SENTRY_DSN_FRONTEND,SENTRY_VUE_TRACK_COMPONENTS
- [medi/partia] `bin/ots boot-test` — boot and initializer validation
- [medi/undocu] Startup readiness 503 page (StartupReadiness middleware)
- [medi/undocu] Role-aware container healthcheck script
- [medi/partia] Development mode and the Vite frontend proxy boot guard — RACK_ENV,FRONTEND_HOST,ONETIME_ALLOW_DEV_FRONTEND
- [medi/undocu] Domain context override for persona testing (DOMAIN_CONTEXT_ENABLED) — DOMAIN_CONTEXT_ENABLED,DOMAIN_CONTEXT
- [medi/undocu] Development auth strategies (DEV_BASIC_AUTH / DEV_SESSION_AUTH) — DEV_BASIC_AUTH,DEV_SESSION_AUTH
- [low/undocu] Request-log path ignore list
- [low/undocu] Sentry event tagging (site_host, service, jurisdiction, environment)
- [low/partia] Unbuffered stdout (STDOUT_SYNC) — STDOUT_SYNC

### Custom domains, regions & incoming secrets
- [crit/partia] Domain validation strategy: choosing between passthrough / approximated / caddy_on_demand — DOMAINS_VALIDATION_STRATEGY
- [crit/undocu] passthrough strategy accepts any domain string with zero ownership proof — DOMAINS_VALIDATION_STRATEGY,DOMAINS_REQUIRE_VERIFIED
- [crit/undocu] Require verified domain before secret creation (DOMAINS_REQUIRE_VERIFIED) — DOMAINS_REQUIRE_VERIFIED
- [crit/undocu] caddy_on_demand currently refuses every certificate (ask endpoint returns 403 for all domains) — DOMAINS_VALIDATION_STRATEGY,ACME_ENDPOINT_ENABLED **[D2]**
- [crit/undocu] The TXT ownership challenge record (_onetime-challenge-…)
- [crit/undocu] INCOMING_ENABLED does not gate custom domains (canonical/custom split) — INCOMING_ENABLED,ORGS_INCOMING_SECRETS_ENABLED
- [high/partia] Custom domains master switch (enable the feature at all) — DOMAINS_ENABLED
- [high/partia] Canonical domain selection (DEFAULT_DOMAIN) — DEFAULT_DOMAIN,HOST
- [high/partia] Internal ACME 'ask' endpoint — embedded vs standalone — ACME_ENDPOINT_ENABLED,ACME_LISTEN_ADDRESS,ACME_PORT
- [high/undocu] Blocking the internal ACME endpoint at the reverse proxy — ACME_ENDPOINT_ENABLED
- [high/partia] Approximated provider configuration (API key and vhost target) — APPROXIMATED_API_KEY,APPROXIMATED_VHOST_TARGET
- [high/partia] Cluster proxy settings drive the DNS instructions shown to your customers — APPROXIMATED_PROXY_IP,APPROXIMATED_PROXY_HOST,APPROXIMATED_PROXY_NAME
- [high/undocu] Unknown validation_strategy silently downgrades to passthrough (features.domains.strict_strategy) **[D2]**
- [high/partia] Reverse-proxy requirements for serving tenant hostnames
- [high/partia] Homepage secrets mode: private landing page / create form / incoming form
- [high/partia] Multi-region deployment: REGIONS_ENABLED, JURISDICTION, JURISDICTIONS — REGIONS_ENABLED,JURISDICTION,JURISDICTIONS
- [high/undocu] JURISDICTION also filters the Stripe billing catalog — JURISDICTION
- [high/partia] Incoming secrets on the canonical domain (/incoming) — operator setup — INCOMING_ENABLED,INCOMING_RECIPIENT_1,INCOMING_RECIPIENT_2,INCOMING_RECIPIENT_3
- [high/undocu] Incoming submission rate limiting (INCOMING_RATE_LIMIT_*) — INCOMING_RATE_LIMIT_ENABLED,INCOMING_RATE_LIMIT_MAX_PER_IP,INCOMING_RATE_LIMIT_MAX_PER_RECIPIENT,INCOMING_RATE_LIMIT_WINDOW
- [high/partia] Global default passphrase for incoming secrets (INCOMING_DEFAULT_PASSPHRASE) — INCOMING_DEFAULT_PASSPHRASE
- [high/partia] Per-domain incoming recipients (customer-facing setup)
- [medi/undocu] Shipped Caddyfile example is stale and points the ask directive at the wrong URL
- [medi/undocu] ACME README documents a check_verification=false query parameter that no longer exists
- [medi/partia] Domain verification state machine (unverified → pending → resolving → verified)
- [medi/undocu] Domain refresh background job (jobs.domain_refresh)
- [medi/undocu] Domain context override for local testing (DOMAIN_CONTEXT_ENABLED) — DOMAIN_CONTEXT_ENABLED,DOMAIN_CONTEXT
- [medi/partia] Who may create a secret on a custom domain (domain permission matrix)
- [medi/partia] Cross-region subscription federation (FEDERATION_SECRET) — FEDERATION_SECRET
- [medi/undocu] Deprecated regions/domains config paths (site.regions, site.domains, array-form jurisdictions) **[D8: deferred]**
- [medi/partia] Incoming memo length and TTL — and why custom domains ignore your setting — INCOMING_MEMO_MAX_LENGTH,INCOMING_DEFAULT_TTL
- [medi/partia] Enabling per-domain incoming for organizations (ORGS_INCOMING_SECRETS_ENABLED) — ORGS_INCOMING_SECRETS_ENABLED
- [low/undocu] Approximated DNS widget (auto-detect the customer's DNS provider)
- [low/undocu] Incoming secrets delivered on the custom domain (links and sender identity)

### Branding, interface customization & internationalization
- [crit/undocu] Brand packs for self-hosted white-labelling (BRAND_PACK / BRAND_ASSETS_DIR) — BRAND_PACK,BRAND_ASSETS_DIR
- [crit/partia] Deprecated header.branding config published as current (SITE_NAME / LOGO_URL / LOGO_ALT) — SITE_NAME,LOGO_URL,LOGO_ALT
- [crit/undocu] default_locale not in locales list silently disables all internationalization — I18N_DEFAULT_LOCALE
- [high/undocu] Install-wide brand identity block (brand:) and its precedence chain — BRAND_PRODUCT_NAME,BRAND_PRODUCT_DOMAIN,BRAND_SUPPORT_EMAIL
- [high/undocu] Masthead and email logo (BRAND_LOGO_URL / BRAND_LOGO_DARK_URL / BRAND_LOGO_ALT) — BRAND_LOGO_URL,BRAND_LOGO_DARK_URL,BRAND_LOGO_ALT
- [high/undocu] Favicon, mobile and social icon overrides (BRAND_FAVICON_URL / BRAND_APPLE_TOUCH_ICON_URL / BRAND_OG_IMAGE_URL) — BRAND_FAVICON_URL,BRAND_APPLE_TOUCH_ICON_URL,BRAND_OG_IMAGE_URL
- [high/undocu] Brand-pack resolution diagnostics CLI (bin/ots config brand) — BRAND_PACK,BRAND_ASSETS_DIR
- [high/partia] Homepage mode: internal vs external (UI_HOMEPAGE_MODE + CIDR / header detection) — UI_HOMEPAGE_MODE,UI_HOMEPAGE_MATCHING_CIDRS,UI_HOMEPAGE_MODE_HEADER
- [high/partia] Client IP resolution for homepage CIDR matching (trusted_proxy) — stale removed vars in docs — UI_HOMEPAGE_TRUSTED_PROXY_DEPTH,UI_HOMEPAGE_TRUSTED_IP_HEADER,UI_HOMEPAGE_DEFAULT_MODE,TRUSTED_PROXY_HEADER
- [high/partia] Internationalization master switch (I18N_ENABLED) — I18N_ENABLED
- [high/partia] Restricting or extending the supported locale list
- [medi/undocu] MFA / TOTP authenticator issuer label (BRAND_TOTP_ISSUER) — BRAND_TOTP_ISSUER,BRAND_PRODUCT_NAME
- [medi/undocu] Transactional email branding (signature name, support email, logo, brand colour) — BRAND_SIGNATURE_NAME,BRAND_SUPPORT_EMAIL,BRAND_PRIMARY_COLOR
- [medi/undocu] Brand colour and visual tokens (primary colour, corner style, font family, button text contrast) — BRAND_PRIMARY_COLOR,BRAND_CORNER_STYLE,BRAND_FONT_FAMILY,BRAND_BUTTON_TEXT_LIGHT
- [medi/undocu] brand.yaml pack identity manifest — BRAND_PACK,BRAND_ASSETS_DIR
- [medi/undocu] Brand pack generator and build-time baking (pnpm gen:favicons, --build-arg BRAND_PACK) — BRAND_PACK,MARK_OUT_PUBLIC_DIR
- [medi/undocu] Disabled-homepage landing variants (closed / minimal / v1) and the ?variant= override — DEFAULT_DISABLED_HOMEPAGE_VARIANT,DEFAULT_CUSTOM_DOMAIN_DISABLED_HOMEPAGE_VARIANT
- [medi/undocu] Recipient orientation link on gated homepages (HOMEPAGE_PUBLIC_LINKS_RECIPIENT_INTRO) — HOMEPAGE_PUBLIC_LINKS_RECIPIENT_INTRO
- [medi/partia] Date and time display formats (I18N_DATE_FORMAT / I18N_DATETIME_FORMAT) — I18N_DATE_FORMAT,I18N_DATETIME_FORMAT
- [medi/partia] Locale fallback chains and browser-language detection
- [medi/undocu] End-user language switching in the application
- [medi/undocu] Per-domain recipient instructions and description (custom-domain brand settings)
- [medi/partia] Per-domain Brand Manager editor: token vocabulary and three-path UI
- [medi/partia] Per-domain branding precedence over installation branding — BRAND_LOGO_URL,BRAND_PRIMARY_COLOR
- [medi/partia] Secret-form capability flags (UI_CAPABILITIES_*) — UI_CAPABILITIES_BURN,UI_CAPABILITIES_SHOW,UI_CAPABILITIES_RECEIPT,UI_CAPABILITIES_RECIPIENT
- [medi/partia] Masthead layout controls (HEADER_ENABLED, HEADER_NAV_ENABLED, LOGO_LINK, LOGO_SHOW_NAME, LOGO_PROMINENT) — HEADER_ENABLED,HEADER_NAV_ENABLED,LOGO_LINK,LOGO_SHOW_NAME
- [medi/partia] Public footer links and vendor-URL defaults (FOOTER_LINKS + TERMS/PRIVACY/DOCS/STATUS/ABOUT/CONTACT) — FOOTER_LINKS,TERMS_URL,PRIVACY_URL,DOCS_URL
- [medi/partia] Workspace footer links for authenticated users (WORKSPACE_LINKS and friends) — WORKSPACE_LINKS,WORKSPACE_API_DOCS_URL,WORKSPACE_BRANDING_GUIDE_URL,WORKSPACE_FEEDBACK_URL
- [low/undocu] Per-domain default locale (domain brand locale)
- [low/undocu] Version disclosure in the footer (FOOTER_VERSION_ENABLED) — FOOTER_VERSION_ENABLED
- [low/undocu] Help modal on secret pages (HELP_ENABLED) — HELP_ENABLED
- [low/partia] Web UI master switch (UI_ENABLED) — UI_ENABLED
- [low/undocu] PWA web manifest branding (/site.webmanifest) — BRAND_PRODUCT_NAME,BRAND_PRIMARY_COLOR
- [low/undocu] BRAND_PRODUCT_DOMAIN (stored, currently inert) — BRAND_PRODUCT_DOMAIN **[D8: deferred]**

### Organizations, teams, entitlements, billing & admin (colonel)
- [crit/undocu] The entitlement model (what entitlements are, and the 23-string catalog)
- [crit/undocu] Plan ∩ role intersection: why a paid feature can still be refused
- [crit/undocu] Self-hosted standalone mode grants every entitlement (fail-open) — BILLING_ENABLED
- [crit/undocu] Fail-closed plan resolution: PlanCacheMissError breaks an org — BILLING_ENABLED,STRIPE_API_KEY
- [crit/partia] billing.yaml: the self-hosted billing/plan catalog file — BILLING_ENABLED,BILLING_CURRENCY,CURRENCY,STRIPE_API_KEY
- [crit/partia] Colonel role and how to grant admin access
- [crit/partia] The Colonel admin console and its 14 sections
- [crit/undocu] Colonel network isolation (ADMIN_ALLOWED_CIDRS) and its trusted-proxy dependency — ADMIN_ALLOWED_CIDRS,TRUSTED_PROXY_ENABLED
- [crit/partia] Secret Activity: the shipped organization audit trail
- [high/undocu] Organizations as the tenancy and billing unit — ENABLE_ORGS
- [high/partia] Organizations UI toggle and the org context switcher (ENABLE_ORGS) — ENABLE_ORGS
- [high/undocu] Organization settings surface (general / members / domains / subscription / SSO / activity)
- [high/partia] Organization roles: owner, admin, member
- [high/partia] Member invitations lifecycle (invite, resend, revoke, accept, decline, sign-up-and-accept)
- [high/undocu] Organization ownership transfer
- [high/undocu] Organization and membership integrity tooling (doctor / reconcile)
- [high/undocu] Operator entitlement overrides (org-level and membership-level)
- [high/partia] Per-install org feature kill switches (ORGS_SSO_ENABLED, ORGS_CUSTOM_MAIL_ENABLED, ORGS_INCOMING_SECRETS_ENABLED) — ORGS_SSO_ENABLED,ORGS_CUSTOM_MAIL_ENABLED,ORGS_INCOMING_SECRETS_ENABLED,INCOMING_ENABLED
- [high/undocu] Plan catalog authoring and the push/pull/validate/drift workflow
- [high/undocu] Plan definition schema: tiers, tenancy, entitlements, limits, prices, display
- [high/partia] Stripe integration configuration (keys, webhooks, checkout host, automatic tax, currency) — STRIPE_API_KEY,PUBLIC_STRIPE_API_KEY,STRIPE_WEBHOOK_SIGNING_SECRET,STRIPE_CHECKOUT_HOST
- [high/undocu] Subscription self-service surfaces (plans page, checkout, portal, change/cancel/reactivate, invoices, currency migration)
- [high/undocu] Audit terminology: Secret Activity vs Security Events vs operator audit log
- [medi/undocu] Domain-scoped memberships (SSO just-in-time members)
- [medi/undocu] Free-tier fallback entitlements and the two conflicting limit sources — TTL_MAX_ANONYMOUS,PLAN_TTL_ANONYMOUS
- [medi/partia] Regional catalog isolation (JURISDICTION / region matching) — JURISDICTION,JURISDICTIONS
- [medi/undocu] Payer decoupling: billing account vs organization
- [medi/undocu] Billing background jobs: plan cache refresh, catalog retry, billing worker — BILLING_WORKER_THREADS,BILLING_WORKER_PREFETCH,JOBS_SCHEDULER_ENABLED
- [medi/undocu] System role hierarchy: colonel, admin, staff, customer
- [medi/undocu] Colonel audit trail (ColonelAuditEvent)
- [medi/partia] Plan tier → entitlement mapping shown to buyers — hand-maintained, needs a named owner **[D3]**
- [medi/undocu] Control plane vs data plane: admin surfaces are canonical-domain only (planned) — CANONICAL_DOMAIN,DEFAULT_DOMAIN
- [low/undocu] Colonel plan-preview mode (request-scoped entitlement preview)
- [low/undocu] Complimentary and pro-bono plans
- [low/undocu] Per-customer early-access feature flags
