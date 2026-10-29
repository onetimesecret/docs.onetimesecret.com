---
title: Auth, logging and billing files
description: "Key records and file structures for the separate Onetime Secret authentication, logging and billing configuration files."
audience: operator
pageType: reference
sourceOfTruth: "onetimesecret/etc/defaults/auth.defaults.yaml:1-189; onetimesecret/etc/defaults/logging.defaults.yaml:1-251; onetimesecret/etc/examples/billing.example.yaml:1-391 (vendored at v0.26.19 and rendered by bin/reference.mjs)"
---

This reference reflects Onetime Secret v0.26.19 (`e98a88c9`).

## auth file: top-level keys

### auth: mode

```
Authentication mode: 'simple' (Redis-only) or 'full' (requires SQL db)
Can be overridden with AUTHENTICATION_MODE environment variable
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `simple` | `AUTHENTICATION_MODE` | the value above | v0.24.0 | `etc/defaults/auth.defaults.yaml:10` |

### auth: simple

```
Simple mode settings (Redis-only authentication)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| null | `null` | none | the value above is the shipped default | not annotated | `etc/defaults/auth.defaults.yaml:16` |

## auth file: full

### auth: full.database_url

```
Application Connection

Used at runtime by the application.

e.g. "postgres://user:password@host:port/database"

SQLite paths:
  sqlite::memory: - In-memory, no persistence (dev/test only)
  sqlite://data/auth.db - Relative path from application directory
  sqlite:///data/auth.db - Absolute path from filesystem root
  sqlite:///tmp/auth.db - Temporary, lost on restart

⚠️  In OCI containers: SQLite files MUST be in a mounted volume directory
    (e.g., /app/data or /data) or all data will be lost on container restart.

NOTE: The double quotes prevent YAML issues when parsing `sqlite::memory:`
NOTE: An exported-but-empty AUTH_DATABASE_URL is truthy in Ruby, so it is
      normalized to unset here rather than rendering "" (which reaches
      Sequel.connect as a schemeless URL). AuthConfig#database_url applies
      the same rule for operator config files that do not.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `sqlite://data/auth.db` | `AUTH_DATABASE_URL` | the value above | v0.24.0 | `etc/defaults/auth.defaults.yaml:42` |

### auth: full.database_url_migrations

```
Migrations Connection (PostgreSQL, MySQL, MS SQL Server only)

Used at deployment time to run all Rodauth migrations:
  - Set up the schema with appropriate permissions
  - Create database functions for password verification
  - Grant specific access to the application account as needed

When using this approach, the application account should only have EXECUTE
permission on the password hash verification functions and should not have
SELECT access to the password hash column.

Not needed for SQLite or other databases that don't support this security model.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `AUTH_DATABASE_URL_MIGRATIONS` | no value | v0.24.0 | `etc/defaults/auth.defaults.yaml:57` |

### auth: full.features.lockout

```
Brute force lockout protection (default: ON)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `AUTH_LOCKOUT_ENABLED` | `true` | v0.24.0 | `etc/defaults/auth.defaults.yaml:69` |

### auth: full.features.password_requirements

```
Password strength requirements (default: ON)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `AUTH_PASSWORD_REQUIREMENTS_ENABLED` | `true` | v0.24.0 | `etc/defaults/auth.defaults.yaml:72` |

### auth: full.features.active_sessions

```
Session tracking: view and manage active sessions (default: ON)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `AUTH_ACTIVE_SESSIONS_ENABLED` | `true` | v0.24.0 | `etc/defaults/auth.defaults.yaml:75` |

### auth: full.features.remember_me

```
Remember me: persistent login across browser sessions (default: ON)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `AUTH_REMEMBER_ME_ENABLED` | `true` | v0.24.0 | `etc/defaults/auth.defaults.yaml:78` |

### auth: full.features.verify_account

```
Email verification: require email verification on signup (default: ON, OFF in test)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| runtime-defined | determined at run time | none | determined at run time | v0.24.0 | `etc/defaults/auth.defaults.yaml:81` |

```ruby
ENV['AUTH_VERIFY_ACCOUNT_ENABLED'] != 'false' && ENV['RACK_ENV'] != 'test'
```

### auth: full.features.mfa

```
MFA: TOTP codes and recovery codes (default: OFF)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `AUTH_MFA_ENABLED` | `false` | v0.24.0 | `etc/defaults/auth.defaults.yaml:84` |

### auth: full.features.email_auth

```
Email auth: passwordless login via email links, aka magic links (default: OFF)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `AUTH_EMAIL_AUTH_ENABLED` | `false` | v0.24.0 | `etc/defaults/auth.defaults.yaml:87` |

### auth: full.features.webauthn

```
WebAuthn: biometrics and security keys (default: OFF)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `AUTH_WEBAUTHN_ENABLED` | `false` | v0.24.0 | `etc/defaults/auth.defaults.yaml:90` |

### auth: full.features.webauthn_verify_account

```
WebAuthn passwordless signup: verifying a new account sets up a passkey
instead of a password — Rodauth's webauthn_verify_account feature.
Only meaningful when webauthn is enabled; leave verify_account ON.
(default: OFF)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `AUTH_WEBAUTHN_VERIFY_ACCOUNT` | `false` | v0.26.5 | `etc/defaults/auth.defaults.yaml:96` |

### auth: full.features.webauthn_autofill

```
WebAuthn autofill: passkey autofill (browser conditional UI) on the
login form — Rodauth's webauthn_autofill feature. Only meaningful when
webauthn is enabled. (default: OFF)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `AUTH_WEBAUTHN_AUTOFILL` | `false` | v0.26.5 | `etc/defaults/auth.defaults.yaml:101` |

### auth: full.features.sso

```
SSO: external identity providers via OmniAuth (default: OFF)
Master switch — individual providers are enabled by their own env vars:
  OIDC: OIDC_ISSUER, OIDC_CLIENT_ID
  Entra ID: ENTRA_TENANT_ID, ENTRA_CLIENT_ID, ENTRA_CLIENT_SECRET
  Google: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
  GitHub: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
  GitLab: GITLAB_CLIENT_ID, GITLAB_CLIENT_SECRET
  Apple: APPLE_CLIENT_ID, APPLE_TEAM_ID, APPLE_KEY_ID, APPLE_PRIVATE_KEY
  SAML: SAML_IDP_SSO_SERVICE_URL, SAML_IDP_ENTITY_ID, SAML_IDP_CERT
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `AUTH_SSO_ENABLED` | `false` | v0.24.5 | `etc/defaults/auth.defaults.yaml:112` |

### auth: full.restrict_to

```
──────────────────────────────────────────────────────────────────────
Restrict login page to a single authentication method

Values: password, email_auth, webauthn, sso
Leave blank to show all enabled authentication methods (default).

When set, only the specified method works on the sign-in surface — this
is an access control, not a display preference: every other method's
routes 404 (ADR-034#restrict-to-is-an-access-control-not-a-display-preference).
For sso: also disables password-based account management (destroy
account, change password, change email).

The underlying feature must also be enabled (e.g. restrict_to: sso
requires AUTH_SSO_ENABLED=true and at least one provider configured). If
it is not, boot fails — the restriction is never dropped to re-expose the
methods it was meant to hide. Unavailability that can only be seen after
boot, or on one host, degrades to "sign-in unavailable" instead
(ADR-034#degradation-is-fail-closed).

Set AT MOST ONE of AUTH_PASSWORD_ONLY / AUTH_EMAIL_AUTH_ONLY /
AUTH_WEBAUTHN_ONLY / AUTH_SSO_ONLY. Setting several renders nothing here
(there is no "restricted to two methods"), which on its own would be a
silent fail-open — so the ValidateAuthConfig initializer reads these four
env vars directly at boot and refuses to start, naming each flag set
(ADR-034#conflicting-auth-only-env-flags-are-a-boot-error, #4139). Do not
"fix" that by making this line pick a winner.
──────────────────────────────────────────────────────────────────────
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| runtime-defined | determined at run time | none | determined at run time | v0.25.0 | `etc/defaults/auth.defaults.yaml:141` |

```ruby
[ENV['AUTH_PASSWORD_ONLY'] == 'true' && 'password', ENV['AUTH_EMAIL_AUTH_ONLY'] == 'true' && 'email_auth', ENV['AUTH_WEBAUTHN_ONLY'] == 'true' && 'webauthn', ENV['AUTH_SSO_ONLY'] == 'true' && 'sso'].select { |v| v }.then { |f| f.length == 1 && f.first || nil }
```

### auth: full.sso.sso_display_name

```
SSO display name (shown on "Sign in with X" button)
DEPRECATED: Each provider now carries its own display name via
OIDC_DISPLAY_NAME, ENTRA_DISPLAY_NAME, GOOGLE_DISPLAY_NAME, etc.
Retained for backward compatibility with single-provider OIDC setups.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `""` | `SSO_DISPLAY_NAME` | the value above | v0.24.5 | `etc/defaults/auth.defaults.yaml:153` |

### auth: full.sso.allow_platform_fallback_for_tenants

```
Multi-tenant SSO fallback policy

Controls whether custom domains without their own CustomDomain::SsoConfig
can fall back to platform ENV-based SSO credentials.

When true, any custom domain can piggyback on platform SSO — convenient
for single-tenant deployments but a security concern in multi-tenant setups.
When false, custom domains must have explicit per-domain SSO configuration
or SSO will be unavailable on that domain.

Default: false (require explicit per-domain SSO configuration)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `SSO_ALLOW_PLATFORM_FALLBACK` | `false` | v0.25.0 | `etc/defaults/auth.defaults.yaml:166` |

### auth: full.sso.trust_email_for_linking

```
Email-based account linking trust (deprecated single-OIDC / global default)

The ONE sanctioned exception to the invariant that email may LOCATE an
account but only a demonstrated credential may BIND. When true, an SSO
identity whose email matches an existing account is auto-linked to it,
instead of being refused (the H-3 default). Only enable this when the
operator controls BOTH OTS and the IdP (self-hosted single-tenant, #3836).

This global value applies to the platform (env-configured) provider path
only; it is ignored on the multi-tenant (tenant SsoConfig) surface by
construction. Per-provider overrides (OIDC_TRUST_EMAIL_FOR_LINKING,
ENTRA_TRUST_EMAIL_FOR_LINKING, GOOGLE_*, GITHUB_*, GITLAB_*) take precedence.

Default: false (refuse email-based auto-linking — require explicit,
authenticated linking from account settings)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `SSO_TRUST_EMAIL_FOR_LINKING` | `false` | v0.26.2 | `etc/defaults/auth.defaults.yaml:183` |

### auth: full.argon2_secret

```
Argon2 secret key (pepper) for password hashing defense-in-depth.
Folded into password hashes — if the hash database is compromised,
passwords remain protected unless this secret is also leaked.
Leave unset (nil) to use argon2id without a pepper.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `ARGON2_SECRET` | no value | v0.24.0 | `etc/defaults/auth.defaults.yaml:189` |

## logging file: top-level keys

### logging: default_level

```
Global default log level
Options: trace, debug, info, warn, error, fatal
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `warn` | `DEFAULT_LOG_LEVEL` | the value above | v0.24.0 | `etc/defaults/logging.defaults.yaml:50` |

### logging: formatter

```
Output formatter
Options: color, json, default
- color: Human-readable with ANSI colors, timestamps, PID/thread (recommended)
- json: Structured JSON for production log shipping
- default: Plain text without colors
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `color` | `LOG_FORMATTER` | the value above | v0.24.0 | `etc/defaults/logging.defaults.yaml:57` |

## logging file: loggers

### logging: loggers.App

```
Default application logger  # Since v0.24.0
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `warn` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/logging.defaults.yaml:63` |

### logging: loggers.Auth

```
Authentication/authorization flows  # Since v0.24.0
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `info` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/logging.defaults.yaml:64` |

### logging: loggers.Billing

```
Stripe checkout, payment intents, subscription webhooks, invoices, plan catalog sync  # Since v0.24.0
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `warn` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/logging.defaults.yaml:65` |

### logging: loggers.Boot

```
During initialization  # Since v0.24.0
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `warn` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/logging.defaults.yaml:66` |

### logging: loggers.Bunny

```
RabbitMQ client (heartbeats at debug level)  # Since v0.24.0
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `warn` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/logging.defaults.yaml:67` |

### logging: loggers.Chores

```
Familia::Horreum models housekeeping chores  # Since v0.25.3
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `info` | none | the value above is the shipped default | v0.25.3 | `etc/defaults/logging.defaults.yaml:68` |

### logging: loggers.Ents

```
Entitlement materialization, grants/revokes, plan→permission application  # Since v0.25.6
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `info` | none | the value above is the shipped default | v0.25.6 | `etc/defaults/logging.defaults.yaml:69` |

### logging: loggers.Jobs

```
Job publishing (Publisher.enqueue_email, fallbacks)  # Since v0.25.6
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `info` | none | the value above is the shipped default | v0.25.6 | `etc/defaults/logging.defaults.yaml:70` |

### logging: loggers.CLI

```
Command-line interface operations  # Since v0.24.0
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `info` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/logging.defaults.yaml:71` |

### logging: loggers.Familia

```
Redis/Familia main database operations  # Since v0.24.0
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `info` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/logging.defaults.yaml:72` |

### logging: loggers.HTTP

```
HTTP requests and middleware operations  # Since v0.24.0
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `info` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/logging.defaults.yaml:73` |

### logging: loggers.Org

```
Organization + membership lifecycle (create/destroy/activate/cascade)  # Since v0.25.6
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `info` | none | the value above is the shipped default | v0.25.6 | `etc/defaults/logging.defaults.yaml:74` |

### logging: loggers.Otto

```
Otto framework operations  # Since v0.24.0
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `info` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/logging.defaults.yaml:75` |

### logging: loggers.Rhales

```
Rhales template rendering (suppress unescaped HTML warnings)  # Since v0.24.0
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `error` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/logging.defaults.yaml:76` |

### logging: loggers.Scheduler

```
Scheduled/recurring background jobs  # Since v0.24.0
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `info` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/logging.defaults.yaml:77` |

### logging: loggers.Secret

```
Secret lifecycle (create, view, burn)  # Since v0.24.0
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `info` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/logging.defaults.yaml:78` |

### logging: loggers.Sequel

```
Database queries and operations (SQL logged at :trace level)  # Since v0.24.0
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `warn` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/logging.defaults.yaml:79` |

### logging: loggers.Session

```
Session lifecycle (create, update, destroy)  # Since v0.24.0
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `info` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/logging.defaults.yaml:80` |

### logging: loggers.Workers

```
RabbitMQ worker message processing and orchestration  # Since v0.24.0
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `info` | none | the value above is the shipped default | v0.24.0 | `etc/defaults/logging.defaults.yaml:81` |

## logging file: destinations

### logging: destinations.console.enabled

```
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `true` | none | the value above is the shipped default | not annotated | `etc/defaults/logging.defaults.yaml:125` |

### logging: destinations.console.level

```
trace, debug, info, warn, error or fatal. Unset: every generated event.
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| null | `null` | none | the value above is the shipped default | not annotated | `etc/defaults/logging.defaults.yaml:127` |

### logging: destinations.console.formatter

```
color, json or default. Unset: the top-level `formatter` above in
server modes, color under the CLI. A value here applies in every mode.
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| null | `null` | none | the value above is the shipped default | not annotated | `etc/defaults/logging.defaults.yaml:130` |

### logging: destinations.file.enabled

```
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | none | the value above is the shipped default | not annotated | `etc/defaults/logging.defaults.yaml:133` |

### logging: destinations.file.path

```
Absolute, or relative to the application root. The file is opened in
append mode at boot and is never truncated or rotated by the
application; its directory must already exist. Boot fails if the file
cannot be opened. Several processes may append to the same file.
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| null | `null` | none | the value above is the shipped default | not annotated | `etc/defaults/logging.defaults.yaml:138` |

### logging: destinations.file.level

```
Unset: every generated event.
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| null | `null` | none | the value above is the shipped default | not annotated | `etc/defaults/logging.defaults.yaml:140` |

### logging: destinations.file.formatter

```
Unset: default (plain text, no color codes).
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| null | `null` | none | the value above is the shipped default | not annotated | `etc/defaults/logging.defaults.yaml:142` |

## logging file: audit

### logging: audit.syslog.enabled

```
LOG_AUDIT_SYSLOG=true to enable.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `LOG_AUDIT_SYSLOG` | `false` | v0.26.11 | `etc/defaults/logging.defaults.yaml:172` |

### logging: audit.syslog.url

```
protocol://host:port — 'syslog://localhost' writes to the LOCAL syslog
daemon and needs nothing extra. 'tcp://loghost:514' / 'udp://loghost:514'
ship to a REMOTE syslog server, which SemanticLogger implements with the
third-party `syslog_protocol` gem (plus `net_tcp_client` for tcp://);
neither is bundled here, so a remote URL needs them added to the Gemfile.
Without them the appender is skipped with one warning at boot and the
audit stream still reaches stdout — it is never silently dropped.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `syslog://localhost` | `LOG_AUDIT_SYSLOG_URL` | the value above | v0.26.11 | `etc/defaults/logging.defaults.yaml:180` |

### logging: audit.syslog.level

```
Appender-level floor. Leave at info: the sink emits at info.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `info` | `LOG_AUDIT_SYSLOG_LEVEL` | the value above | v0.26.11 | `etc/defaults/logging.defaults.yaml:182` |

### logging: audit.syslog.facility

```
Syslog facility name (local0..local7, user, daemon, …). Operators
usually give the audit stream its own facility so rsyslog/journald can
route it to a dedicated file or forwarder.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `local0` | `LOG_AUDIT_SYSLOG_FACILITY` | the value above | v0.26.11 | `etc/defaults/logging.defaults.yaml:186` |

## logging file: http

### logging: http.enabled

```
Set LOG_HTTP_REQUESTS=false to disable. Useful when running a reverse proxy
which already logs requests and you consolidate logs into one stream to
avoid redundant information.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `LOG_HTTP_REQUESTS` | `true` | v0.24.0 | `etc/defaults/logging.defaults.yaml:193` |

### logging: http.level

```
Overrides loggers.HTTP level for requests
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `LOG_HTTP_REQUESTS_LEVEL` | no value | v0.24.0 | `etc/defaults/logging.defaults.yaml:195` |

### logging: http.capture

```
Capture mode determines what data is logged per request
Options: minimal, standard, debug
  minimal:  method, path, status, duration
  standard: + request_id, ip
  debug:    + params, headers, session_id
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `minimal` | `LOG_HTTP_CAPTURE` | the value above | v0.24.0 | `etc/defaults/logging.defaults.yaml:202` |

### logging: http.allowed_error_fields

```
Opt-in allowlist of request field names (params or header display names,
e.g. "ttl" or "User-Agent") that may appear in request/error logging
beyond the baseline method/path/status/duration/request_id/ip. This is
the one dial for both:
  - :debug capture mode's params/headers above (empty = neither shows,
    even with LOG_HTTP_CAPTURE=debug)
  - what an unhandled exception / error report (Sentry) may attach from
    the triggering request — see Onetime::ErrorHandler.safe_request_context

Empty by default: a request that raises an unhandled exception is then
logged with exactly the same fields as any other request (method, path,
status) — the query string and request body are never logged. This
mirrors Django's SafeExceptionReporterFilter stance: filtering is
opt-in per field, not opt-out via a blocklist that can lag behind new
sensitive field names.

Header names must use the canonical capitalized-with-hyphens form (e.g.
"User-Agent", "X-Forwarded-For") — each HTTP_ env key is normalized by
capitalizing the parts between underscores, so an all-caps acronym like
HTTP_CF_IPCOUNTRY normalizes to "Cf-Ipcountry", not "CF-IPCountry". If a
header you add here doesn't seem to match, check the normalized form
rather than what a browser or proxy sends on the wire.

RequestLogger reads this list once at boot (its middleware instance is
long-lived) — a change here takes effect on the next process restart,
not a live config reload. Sentry's error-report context
(Onetime::ErrorHandler.safe_request_context) re-reads it on every call,
so the two surfaces can briefly disagree if you edit this without
restarting.

Never add names like password, secret, token, passphrase, api_key,
access_token, refresh_token, Authorization, or Cookie here.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `""` | `LOG_HTTP_ALLOWED_ERROR_FIELDS` | the value above | v0.26.0 | `etc/defaults/logging.defaults.yaml:236` |

### logging: http.slow_request_ms

```
Threshold for logging slow requests as warnings (milliseconds)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `1000` | `LOG_HTTP_SLOW_REQUEST_MS` | the value above | v0.24.0 | `etc/defaults/logging.defaults.yaml:239` |

### logging: http.ignore_paths[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `/api/v1/status` | none | the value above is the shipped default | not annotated | `etc/defaults/logging.defaults.yaml:243` |

### logging: http.ignore_paths[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `/api/v2/status` | none | the value above is the shipped default | not annotated | `etc/defaults/logging.defaults.yaml:244` |

### logging: http.ignore_paths[2]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `/api/v3/status` | none | the value above is the shipped default | not annotated | `etc/defaults/logging.defaults.yaml:245` |

### logging: http.ignore_paths[3]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `/health` | none | the value above is the shipped default | not annotated | `etc/defaults/logging.defaults.yaml:246` |

### logging: http.ignore_paths[4]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `/healthcheck` | none | the value above is the shipped default | not annotated | `etc/defaults/logging.defaults.yaml:247` |

### logging: http.ignore_paths[5]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `/favicon.ico` | none | the value above is the shipped default | not annotated | `etc/defaults/logging.defaults.yaml:248` |

### logging: http.ignore_paths[6]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `/_vite/*` | none | the value above is the shipped default | not annotated | `etc/defaults/logging.defaults.yaml:249` |

### logging: http.ignore_paths[7]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `/assets/*` | none | the value above is the shipped default | not annotated | `etc/defaults/logging.defaults.yaml:250` |

### logging: http.ignore_paths[8]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `/dist/*` | none | the value above is the shipped default | not annotated | `etc/defaults/logging.defaults.yaml:251` |

## billing file: top-level keys

### billing: schema_version

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `1.0` | none | the value above is the shipped default | not annotated | `etc/examples/billing.example.yaml:36` |

### billing: enabled

```
It doesn't make sense to have an enabled flag for turning the billing functionality
on. If the billing.yaml config file exists, we assume it is enabled. Ah, but what if
you want to turn off billing but not delete the file. That's what this flag is for.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `BILLING_ENABLED` | `true` | not annotated | `etc/examples/billing.example.yaml:41` |

### billing: stripe_key

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `nostripekey` | `STRIPE_API_KEY` | the value above | not annotated | `etc/examples/billing.example.yaml:42` |

### billing: webhook_signing_secret

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `nosigningsecret` | `STRIPE_WEBHOOK_SIGNING_SECRET` | the value above | not annotated | `etc/examples/billing.example.yaml:43` |

### billing: stripe_api_version

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `2025-12-15.clover` | none | the value above is the shipped default | not annotated | `etc/examples/billing.example.yaml:44` |

### billing: checkout_host

```
Stripe custom Checkout domain host (bare host, no scheme). Empty unless
this deployment configures a Stripe "custom domain" for Checkout. When set,
the frontend allowlists checkout URLs served from this host.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `""` | `STRIPE_CHECKOUT_HOST` | the value above | not annotated | `etc/examples/billing.example.yaml:49` |

### billing: automatic_tax

```
Enable Stripe automatic tax on checkout sessions ('true' or '1'; anything
else, or unset, disables it). Requires Stripe Tax to be configured in the
Dashboard (tax registrations + product tax codes) first.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `""` | `STRIPE_AUTOMATIC_TAX` | the value above | not annotated | `etc/examples/billing.example.yaml:54` |

### billing: payment_method_configuration

```
Stripe payment method configuration ID (pmc_...) to pin on checkout
sessions instead of the Dashboard default. Leave empty to use the
Dashboard default. Values that don't start with pmc_ fail at boot.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `""` | `STRIPE_PAYMENT_METHOD_CONFIGURATION` | the value above | not annotated | `etc/examples/billing.example.yaml:59` |

### billing: currency

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `cad` | `BILLING_CURRENCY`, `CURRENCY` | the value above | not annotated | `etc/examples/billing.example.yaml:61` |

### billing: app_identifier

```
Product Matching Configuration

region: When set, only Stripe products whose region metadata matches this value
  will be imported into the plan cache. This enables regional catalog isolation
  so NZ and CA deployments sharing the same Stripe account do not overwrite each
  other's plans in Redis (the "last writer wins" collision).

  Set via JURISDICTION env var; leave unset (or empty) for global/single-region
  deployments where all products are visible.

  Example: JURISDICTION=NZ → only products with metadata region=NZ are loaded.

match_fields: Reserved for future composite-key matching. Not read at runtime;
  regional isolation is driven solely by the region field above.
Used in Stripe metadata['app'] matching
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `exampleapplication` | none | the value above is the shipped default | not annotated | `etc/examples/billing.example.yaml:77` |

### billing: region

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `JURISDICTION` | no value | not annotated | `etc/examples/billing.example.yaml:78` |

### billing: match_fields[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `plan_id` | none | the value above is the shipped default | not annotated | `etc/examples/billing.example.yaml:80` |

### billing: match_fields[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `region` | none | the value above is the shipped default | not annotated | `etc/examples/billing.example.yaml:81` |

## billing file: entitlements

The entitlements section of the example file is reproduced here as a structure only: its entries are sample content, not production prices, plan names or entitlement grants.

| Entries | Entry fields | Source |
| --- | --- | --- |
| 25 | `category`, `description` | `etc/examples/billing.example.yaml:90-190` |

## billing file: plans

The plans section of the example file is reproduced here as a structure only: its entries are sample content, not production prices, plan names or entitlement grants.

| Entries | Entry fields | Source |
| --- | --- | --- |
| 2 | `description`, `display_order`, `entitlements`, `features`, `limits`, `name`, `plan_name_label`, `prices`, `region`, `show_on_plans_page`, `tenancy`, `tier` | `etc/examples/billing.example.yaml:204-311` |

## billing file: stripe_metadata_schema

The stripe_metadata_schema section of the example file is reproduced here as a structure only: its entries are sample content, not production prices, plan names or entitlement grants.

| Entries | Entry fields | Source |
| --- | --- | --- |
| 17 | `app`, `created`, `display_order`, `entitlements`, `limit_custom_domains`, `limit_role_admins_per_org`, `limit_role_members_per_org`, `limit_role_owners_per_org`, `limit_secret_lifetime`, `limit_secrets_per_day`, `limit_teams`, `limit_total_members_per_org`, `plan_id`, `region`, `show_on_plans_page`, `tenancy`, `tier` | `etc/examples/billing.example.yaml:373-391` |
