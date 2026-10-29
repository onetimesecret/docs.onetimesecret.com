---
title: Features and branding configuration
description: "Key records for the feature switches, secret options, sign-in switches and branding sections of the Onetime Secret configuration file."
audience: operator
pageType: reference
sourceOfTruth: "onetimesecret/etc/defaults/config.defaults.yaml:1-2102 (vendored at v0.26.19 and rendered by bin/reference.mjs)"
---

This reference reflects Onetime Secret v0.26.19 (`e98a88c9`).

## config file: site

### config: site.secret_options.default_ttl

```
Default Time-To-Live (TTL) for secrets in seconds
This value is used if no specific TTL is provided when creating a secret
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `DEFAULT_TTL` | no value | not annotated | `etc/defaults/config.defaults.yaml:255` |

### config: site.secret_options.ttl_options

```
Available TTL options for secret creation (in seconds)
These options will be presented to users when they create a new secret
Format: String of integers representing seconds
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `TTL_OPTIONS` | no value | not annotated | `etc/defaults/config.defaults.yaml:259` |

### config: site.secret_options.ttl_max_anonymous

```
Maximum TTL for secrets created without an account (anonymous callers).
Default: 604800 (7 days) — a sane default, not a hard limit. Self-hosted
deployments may raise or lower it; the effective ceiling is the lower of
this value and the ttl_options maximum, bounded by 365 days. When billing
is enabled the free-tier plan limit applies as well, so the anonymous
grant never exceeds what an authenticated free-tier user receives.

PLAN_TTL_ANONYMOUS is the deprecated alias, read only here — this line is
the single place the old name survives. The ceiling itself is read from
the resolved config key (site.secret_options.ttl_max_anonymous) via
WithEntitlements.configured_anonymous_max_ttl, never from the env var.
Organization.free_tier_limits does read ENV['TTL_MAX_ANONYMOUS'] directly
for its secret_lifetime fallback, and does not honour the alias.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `TTL_MAX_ANONYMOUS`, `PLAN_TTL_ANONYMOUS` | no value | v0.26.3 | `etc/defaults/config.defaults.yaml:273` |

### config: site.secret_options.passphrase.required

```
Require users to enter a passphrase when creating secrets
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | `PASSPHRASE_REQUIRED` | `false` | not annotated | `etc/defaults/config.defaults.yaml:277` |

### config: site.secret_options.passphrase.minimum_length

```
Minimum number of characters required for passphrases
Default to 4 chars to prevent trivially guessable passphrases while
maintaining backward compatibility with existing integrations.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `4` | `PASSPHRASE_MIN_LENGTH` | the value above | not annotated | `etc/defaults/config.defaults.yaml:281` |

### config: site.secret_options.passphrase.maximum_length

```
Maximum number of characters allowed for passphrases
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `128` | `PASSPHRASE_MAX_LENGTH` | the value above | not annotated | `etc/defaults/config.defaults.yaml:283` |

### config: site.secret_options.passphrase.enforce_complexity

```
Enforce complexity requirements (uppercase, lowercase, numbers, symbols)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | `PASSPHRASE_ENFORCE_COMPLEXITY` | `false` | not annotated | `etc/defaults/config.defaults.yaml:285` |

### config: site.secret_options.content.maximum_length

```
Maximum number of characters allowed in a secret's body. Enforced
server-side on secret creation and used as the single source of
truth for the client-side textarea limit.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `10000` | `SECRET_MAX_LENGTH` | the value above | v0.26.0 | `etc/defaults/config.defaults.yaml:291` |

### config: site.secret_options.generated_value_display_ttl

```
How long (in seconds) a generated password remains visible on the
receipt page after creation. Set to 0 to disable receipt-page display.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `60` | `GENERATED_VALUE_DISPLAY_TTL` | the value above | v0.24.0 | `etc/defaults/config.defaults.yaml:294` |

### config: site.secret_options.create_rate_limit.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `SECRET_CREATE_RATE_LIMIT_ENABLED` | `true` | v0.26.11 | `etc/defaults/config.defaults.yaml:310` |

### config: site.secret_options.create_rate_limit.max_per_ip

```
Anonymous creations permitted per window from a single masked client IP.
The bucket is a whole /24 (office, campus NAT), and behind an
unconfigured reverse proxy it is the entire deployment — so this is
deliberately loose (10x the signup/reset caps) because secret creation is
the core product action. Raise it for dense-NAT populations; a too-tight
value here is an outage of secret creation for a whole neighborhood.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `500` | `SECRET_CREATE_RATE_LIMIT_MAX_PER_IP` | the value above | v0.26.11 | `etc/defaults/config.defaults.yaml:317` |

### config: site.secret_options.create_rate_limit.window

```
Counting window in seconds (1 hour).
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `3600` | `SECRET_CREATE_RATE_LIMIT_WINDOW` | the value above | v0.26.11 | `etc/defaults/config.defaults.yaml:319` |

### config: site.secret_options.create_rate_limit.lockout

```
Lockout duration in seconds once the cap is hit (1 hour).
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `3600` | `SECRET_CREATE_RATE_LIMIT_LOCKOUT` | the value above | v0.26.11 | `etc/defaults/config.defaults.yaml:321` |

### config: site.secret_options.password_generation.default_length

```
Default length for generated passwords
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `12` | `PASSWORD_GEN_LENGTH` | the value above | not annotated | `etc/defaults/config.defaults.yaml:325` |

### config: site.secret_options.password_generation.maximum_length

```
Server-enforced ceiling on requested generated-password length.
Rejects oversized `length` values before allocation (DoS guard);
matches the frontend Zod max so the two limits stay in lockstep.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `128` | `PASSWORD_GEN_MAX_LENGTH` | the value above | v0.26.0 | `etc/defaults/config.defaults.yaml:329` |

### config: site.secret_options.password_generation.character_sets.uppercase

```
Include uppercase letters (A-Z)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `PASSWORD_GEN_UPPERCASE` | `true` | not annotated | `etc/defaults/config.defaults.yaml:333` |

### config: site.secret_options.password_generation.character_sets.lowercase

```
Include lowercase letters (a-z)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `PASSWORD_GEN_LOWERCASE` | `true` | not annotated | `etc/defaults/config.defaults.yaml:335` |

### config: site.secret_options.password_generation.character_sets.numbers

```
Include numbers (0-9)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `PASSWORD_GEN_NUMBERS` | `true` | not annotated | `etc/defaults/config.defaults.yaml:337` |

### config: site.secret_options.password_generation.character_sets.symbols

```
Include symbols (!@#$%^&*()_+-=[]{}|;:,.<>?)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `PASSWORD_GEN_SYMBOLS` | `true` | not annotated | `etc/defaults/config.defaults.yaml:339` |

### config: site.secret_options.password_generation.character_sets.exclude_ambiguous

```
Exclude ambiguous characters (0, O, l, 1, I) to prevent confusion
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `PASSWORD_GEN_EXCLUDE_AMBIGUOUS` | `true` | not annotated | `etc/defaults/config.defaults.yaml:341` |

### config: site.authentication.enabled

```
Can be disabled altogether, including API authentication.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `AUTH_ENABLED` | `true` | not annotated | `etc/defaults/config.defaults.yaml:345` |

### config: site.authentication.signup

```
Allow users to create accounts. This can be disabled if you plan
to create accounts manually or enable during setup when accounts
can be created and then disabled to prevent any new users from
creating accounts.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `AUTH_SIGNUP` | `true` | not annotated | `etc/defaults/config.defaults.yaml:350` |

### config: site.authentication.signin

```
Generally if you allow registration, you allow signin. But there
are circumstances where it's helpful to turn off authentication
temporarily.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `AUTH_SIGNIN` | `true` | not annotated | `etc/defaults/config.defaults.yaml:354` |

### config: site.authentication.autoverify

```
By default, new accounts need to verify their email address before
they can sign in. This is a security measure to prevent spamming
and abuse of the system. If you're running a private instance or
an instance for your team or company, you can disable this feature
to make it easier for users to sign in.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | `AUTH_AUTOVERIFY` | `false` | not annotated | `etc/defaults/config.defaults.yaml:360` |

### config: site.authentication.required

```
When enabled, the homepage secret form is not available unless
the user is logged in. Similar to a disabled homepage, but still
shows the header with logo and navigation links. This allows for
a more restrictive mode where only authenticated users can create
secrets while maintaining site navigation and branding.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `AUTH_REQUIRED` | `false` | not annotated | `etc/defaults/config.defaults.yaml:366` |

### config: site.authentication.allowed_signup_domains

```
Colonel (admin) accounts are managed via the CLI:
  bin/ots customers role promote user@example.com
  bin/ots customers role demote user@example.com
  bin/ots customers role list
Restrict account creation to specific email domains while allowing
secret-sharing with any email address. When set, only email addresses
from the listed domains can create accounts. This is useful for
organizations that want to limit signups to their own domains while
still allowing secrets to be shared with anyone.
Format: List of domain names (e.g., example.com, company.org)
If empty or not set, signups are allowed from any domain (default).
Environment variable: ALLOWED_SIGNUP_DOMAIN (comma-separated list)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string |  | `ALLOWED_SIGNUP_DOMAIN` | the value above | not annotated | `etc/defaults/config.defaults.yaml:379` |

### config: site.authentication.reset_request_rate_limit.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `RESET_REQUEST_RATE_LIMIT_ENABLED` | `true` | v0.26.3 | `etc/defaults/config.defaults.yaml:390` |

### config: site.authentication.reset_request_rate_limit.max_per_ip

```
Requests permitted per window from a single client IP.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `10` | `RESET_REQUEST_RATE_LIMIT_MAX_PER_IP` | the value above | v0.26.3 | `etc/defaults/config.defaults.yaml:392` |

### config: site.authentication.reset_request_rate_limit.max_per_email

```
Higher backstop cap per submitted login (catches IP rotation).
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `30` | `RESET_REQUEST_RATE_LIMIT_MAX_PER_EMAIL` | the value above | v0.26.3 | `etc/defaults/config.defaults.yaml:394` |

### config: site.authentication.reset_request_rate_limit.window

```
Counting window in seconds (1 hour).
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `3600` | `RESET_REQUEST_RATE_LIMIT_WINDOW` | the value above | v0.26.3 | `etc/defaults/config.defaults.yaml:396` |

### config: site.authentication.reset_request_rate_limit.lockout

```
Lockout duration in seconds once a tier's cap is hit (1 hour).
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `3600` | `RESET_REQUEST_RATE_LIMIT_LOCKOUT` | the value above | v0.26.3 | `etc/defaults/config.defaults.yaml:398` |

### config: site.authentication.email_login_request_rate_limit.enabled

```
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `EMAIL_LOGIN_REQUEST_RATE_LIMIT_ENABLED` | `true` | not annotated | `etc/defaults/config.defaults.yaml:412` |

### config: site.authentication.email_login_request_rate_limit.max_per_ip

```
Requests permitted per window from a single masked client IP. Looser
than the reset-request cap: a magic link is a sign-in method, and a
whole /24 (an office NAT) shares this bucket.
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `30` | `EMAIL_LOGIN_REQUEST_RATE_LIMIT_MAX_PER_IP` | the value above | not annotated | `etc/defaults/config.defaults.yaml:416` |

### config: site.authentication.email_login_request_rate_limit.max_per_email

```
Backstop cap per submitted login (catches IP rotation). Keep
max_per_email >= 2 * max_per_ip AND lockout >= window: a single IP
timing its requests around its own window boundary lands up to
2 * max_per_ip - 2 requests in one login's window, and with a shorter
lockout it is free again inside that window, so one source could lock
a victim out of magic-link sign-in from every IP. The defaults
(30/90, 3600/3600) satisfy both. Rodauth's resend window already caps
the mail an account receives.
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `90` | `EMAIL_LOGIN_REQUEST_RATE_LIMIT_MAX_PER_EMAIL` | the value above | not annotated | `etc/defaults/config.defaults.yaml:425` |

### config: site.authentication.email_login_request_rate_limit.window

```
Counting window in seconds (1 hour).
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `3600` | `EMAIL_LOGIN_REQUEST_RATE_LIMIT_WINDOW` | the value above | not annotated | `etc/defaults/config.defaults.yaml:427` |

### config: site.authentication.email_login_request_rate_limit.lockout

```
Lockout duration in seconds once a tier's cap is hit (1 hour). Keep it
>= window (see max_per_email).
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `3600` | `EMAIL_LOGIN_REQUEST_RATE_LIMIT_LOCKOUT` | the value above | not annotated | `etc/defaults/config.defaults.yaml:430` |

### config: site.authentication.create_account_rate_limit.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `CREATE_ACCOUNT_RATE_LIMIT_ENABLED` | `true` | v0.26.3 | `etc/defaults/config.defaults.yaml:446` |

### config: site.authentication.create_account_rate_limit.max_per_ip

```
Signups permitted per window from a single masked client IP. The bucket
is a whole /24 (office, campus NAT), and behind an unconfigured reverse
proxy it is the entire deployment — so this is deliberately loose
relative to the one signup a person needs. Raise it for dense-NAT
populations; a too-tight value here is a signup-funnel outage.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `10` | `CREATE_ACCOUNT_RATE_LIMIT_MAX_PER_IP` | the value above | v0.26.3 | `etc/defaults/config.defaults.yaml:452` |

### config: site.authentication.create_account_rate_limit.window

```
Counting window in seconds (1 hour).
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `3600` | `CREATE_ACCOUNT_RATE_LIMIT_WINDOW` | the value above | v0.26.3 | `etc/defaults/config.defaults.yaml:454` |

### config: site.authentication.create_account_rate_limit.lockout

```
Lockout duration in seconds once the cap is hit (1 hour).
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `3600` | `CREATE_ACCOUNT_RATE_LIMIT_LOCKOUT` | the value above | v0.26.3 | `etc/defaults/config.defaults.yaml:456` |

## config file: brand

### config: brand.primary_color

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `BRAND_PRIMARY_COLOR` | no value | v0.26.0 | `etc/defaults/config.defaults.yaml:1080` |

### config: brand.product_name

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `BRAND_PRODUCT_NAME` | no value | v0.26.0 | `etc/defaults/config.defaults.yaml:1081` |

### config: brand.product_domain

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `BRAND_PRODUCT_DOMAIN` | no value | v0.26.0 | `etc/defaults/config.defaults.yaml:1082` |

### config: brand.support_email

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `BRAND_SUPPORT_EMAIL` | no value | v0.26.0 | `etc/defaults/config.defaults.yaml:1083` |

### config: brand.corner_style

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `BRAND_CORNER_STYLE` | no value | v0.26.0 | `etc/defaults/config.defaults.yaml:1084` |

### config: brand.font_family

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `BRAND_FONT_FAMILY` | no value | v0.26.0 | `etc/defaults/config.defaults.yaml:1085` |

### config: brand.button_text_light

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `BRAND_BUTTON_TEXT_LIGHT` | no value | v0.26.0 | `etc/defaults/config.defaults.yaml:1086` |

### config: brand.logo_url

```
Masthead/email logo. An absolute http(s) URL works everywhere; a brand pack
can instead carry its own brand-logo.svg / brand-logo.png and set this to the
served path (e.g. "/brand-logo.svg", #3774). A root-relative value renders in
the web UI but is omitted from emails (which need an absolute URL).
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `BRAND_LOGO_URL` | no value | v0.26.0 | `etc/defaults/config.defaults.yaml:1091` |

### config: brand.logo_dark_url

```
Dark-theme variant of the masthead logo, shown when the app's dark mode is
active. Web UI only (emails always use logo_url). A pack can carry it as
brand-logo-dark.svg / brand-logo-dark.png and set this to the served path.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `BRAND_LOGO_DARK_URL` | no value | v0.26.3 | `etc/defaults/config.defaults.yaml:1095` |

### config: brand.logo_alt

```
Accessible name for the brand logo. Unset falls back to an i18n string
derived from the product name.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `BRAND_LOGO_ALT` | no value | v0.26.0 | `etc/defaults/config.defaults.yaml:1098` |

### config: brand.favicon_url

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `BRAND_FAVICON_URL` | no value | v0.26.0 | `etc/defaults/config.defaults.yaml:1099` |

### config: brand.apple_touch_icon_url

```
URL overrides for the mobile/social variety pack served in the HTML head.
When unset, neutral bundled defaults (public/web) are used; replacing the
files via the brand directory is the alternative to these URL overrides.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `BRAND_APPLE_TOUCH_ICON_URL` | no value | v0.26.0 | `etc/defaults/config.defaults.yaml:1103` |

### config: brand.og_image_url

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `BRAND_OG_IMAGE_URL` | no value | v0.26.0 | `etc/defaults/config.defaults.yaml:1104` |

### config: brand.totp_issuer

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `BRAND_TOTP_ISSUER` | no value | v0.26.0 | `etc/defaults/config.defaults.yaml:1105` |

### config: brand.signature_name

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| JSON string | no value | `BRAND_SIGNATURE_NAME` | no value | v0.26.0 | `etc/defaults/config.defaults.yaml:1106` |

## config file: features

### config: features.regions.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | `REGIONS_ENABLED` | `false` | v0.24.0 | `etc/defaults/config.defaults.yaml:1110` |

### config: features.regions.current_jurisdiction

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `JURISDICTION` | no value | v0.24.0 | `etc/defaults/config.defaults.yaml:1111` |

### config: features.regions.jurisdictions

```
Available jurisdictions for regional deployment

Environment Variable Format:
  JURISDICTIONS=ID:domain,ID:domain,...
  where ID is the jurisdiction identifier (e.g., EU, CA, US)
  and domain is the hostname for that jurisdiction

Examples:
  JURISDICTIONS=EU:eu.example.com,CA:ca.example.com
  JURISDICTIONS=US:us.onetimesecret.com,EU:eu.onetimesecret.com,APAC:apac.onetimesecret.com
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `""` | `JURISDICTIONS` | the value above | v0.25.5 | `etc/defaults/config.defaults.yaml:1123` |

### config: features.incoming.enabled

```
Enable or disable the incoming secrets feature.

This flag governs the CANONICAL domain only. Per-domain incoming on
custom domains is gated by the org's incoming_secrets entitlement plus a
ready IncomingConfig, NOT by this flag (see the canonical/custom split in
RecipientResolver / CustomDomain::HomepageConfig#incoming_available?). To
emergency-disable incoming on custom domains, revoke the incoming_secrets
entitlement or set ORGS_INCOMING_SECRETS_ENABLED=false.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | `INCOMING_ENABLED` | `false` | not annotated | `etc/defaults/config.defaults.yaml:1136` |

### config: features.incoming.memo_max_length

```
Maximum character length for the memo/subject field
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `50` | `INCOMING_MEMO_MAX_LENGTH` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1138` |

### config: features.incoming.default_ttl

```
Default TTL for incoming secrets in seconds (7 days = 604800)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `604800` | `INCOMING_DEFAULT_TTL` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1140` |

### config: features.incoming.default_passphrase

```
Optional default passphrase for all incoming secrets (nil = no passphrase)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `INCOMING_DEFAULT_PASSPHRASE` | no value | not annotated | `etc/defaults/config.defaults.yaml:1142` |

### config: features.incoming.rate_limit.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `INCOMING_RATE_LIMIT_ENABLED` | `true` | v0.26.0 | `etc/defaults/config.defaults.yaml:1149` |

### config: features.incoming.rate_limit.max_per_ip

```
Submissions permitted per window from a single client IP.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `10` | `INCOMING_RATE_LIMIT_MAX_PER_IP` | the value above | v0.26.0 | `etc/defaults/config.defaults.yaml:1151` |

### config: features.incoming.rate_limit.max_per_recipient

```
Higher backstop cap per recipient hash (catches IP-rotating spam).
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `30` | `INCOMING_RATE_LIMIT_MAX_PER_RECIPIENT` | the value above | v0.26.0 | `etc/defaults/config.defaults.yaml:1153` |

### config: features.incoming.rate_limit.window

```
Counting window in seconds (1 hour).
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `3600` | `INCOMING_RATE_LIMIT_WINDOW` | the value above | v0.26.0 | `etc/defaults/config.defaults.yaml:1155` |

### config: features.incoming.rate_limit.lockout

```
Lockout duration in seconds once a tier's cap is hit (1 hour).
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `3600` | `INCOMING_RATE_LIMIT_LOCKOUT` | the value above | v0.26.0 | `etc/defaults/config.defaults.yaml:1157` |

### config: features.incoming.recipients[0]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `INCOMING_RECIPIENT_1` | no value | not annotated | `etc/defaults/config.defaults.yaml:1172` |

### config: features.incoming.recipients[1]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `INCOMING_RECIPIENT_2` | no value | not annotated | `etc/defaults/config.defaults.yaml:1173` |

### config: features.incoming.recipients[2]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `INCOMING_RECIPIENT_3` | no value | not annotated | `etc/defaults/config.defaults.yaml:1174` |

### config: features.incoming.recipients[3]

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `INCOMING_RECIPIENT_4` | no value | not annotated | `etc/defaults/config.defaults.yaml:1175` |

### config: features.domains.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | `DOMAINS_ENABLED` | `false` | v0.24.0 | `etc/defaults/config.defaults.yaml:1177` |

### config: features.domains.require_verified

```
When true, secret creation rejects an unverified custom share_domain
with a form error, under every validation strategy. When false
(default), creation still requires the domain to be served (see
serve_unverified below). Canonical domains are unaffected.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | `DOMAINS_REQUIRE_VERIFIED` | `false` | v0.25.2 | `etc/defaults/config.defaults.yaml:1182` |

### config: features.domains.serve_unverified

```
Under a validation_strategy that checks ownership (approximated,
caddy_on_demand), a registered custom domain is served only once its
ownership is verified, by its TXT record or an operator override.
Until then its host answers 404 for every path, and the domain is not
offered for links. Under passthrough, registration by the owning
organization is enough. A domain record with no organization is never
served.

When true, every registered custom domain that has an organization
is served whatever its ownership state, and a warning is logged at
boot. Only the value true enables it.
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | `false` | `DOMAINS_SERVE_UNVERIFIED` | `false` | not annotated | `etc/defaults/config.defaults.yaml:1194` |

### config: features.domains.default

```
The default domain used for link URLs. When not set or empty,
site.host is used.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `DEFAULT_DOMAIN` | no value | v0.24.0 | `etc/defaults/config.defaults.yaml:1197` |

### config: features.domains.link_domains

```
LINK_DOMAINS — comma-separated hosts offered in the link-domain
picker. For installs whose canonical host is an internal platform
address (e.g. ge-abcd123.eu.otshosted.com) that must keep serving
the app but must never be offered to customers as a link domain.

Three-way semantics — all deliberate:
  unset          -> the picker offers the canonical domain
                    (every pre-existing install is unchanged)
  set            -> the picker offers exactly these hosts; the
                    canonical domain appears only if listed
  set-but-empty  -> boot error naming LINK_DOMAINS
                    (Onetime::Config.validate_link_domains!)

A set list that names only UNPARSEABLE hosts is the same boot
error: there is no safe fallback for it. Offering the canonical
domain instead would contradict the request (hiding that host is
the whole point), and offering nothing leaves the picker empty, so
the typo has to fail loud. A list that mixes good and bad entries
boots — the bad one is dropped and logged.

This is NOT a UI-only setting: every entry joins the canonical
host set, so requests to these hosts are classified :canonical and
serve the app instead of being rejected as :invalid.

The `&.` chain is load-bearing — it is what keeps unset (nil) and
set-but-empty ([]) distinguishable through ERB+YAML. Do NOT copy
the `|| nil` idiom used by `default:` above; it collapses the two.
`link_domains` is also deliberately absent from Config::DEFAULTS —
deep_merge restores the default for any nil in loaded config,
which would make set-but-empty undetectable.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `LINK_DOMAINS` | no value | v0.26.5 | `etc/defaults/config.defaults.yaml:1229` |

### config: features.domains.validation_strategy

```
Domain validation and certificate management strategy
Options:
  - passthrough: No validation or cert management
  - approximated: Use approximated.app API for SSL certs and validation (requires cluster config)
  - caddy_on_demand: Use Caddy's on-demand TLS (requires internal ACME endpoint).
    Ownership is checked with our own DNS lookup of the domain's TXT
    challenge record; Caddy issuing a certificate does not verify a domain.
    Resolving and SSL status come from our own A/AAAA lookup and a TLS
    handshake to the domain on port 443, so the application host needs
    outbound DNS and outbound TCP 443.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `passthrough` | `DOMAINS_VALIDATION_STRATEGY` | the value above | v0.24.0 | `etc/defaults/config.defaults.yaml:1241` |

### config: features.domains.approximated.api_key

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `APPROXIMATED_API_KEY` | no value | v0.24.0 | `etc/defaults/config.defaults.yaml:1245` |

### config: features.domains.approximated.proxy_ip

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `APPROXIMATED_PROXY_IP` | no value | v0.24.0 | `etc/defaults/config.defaults.yaml:1246` |

### config: features.domains.approximated.proxy_host

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `APPROXIMATED_PROXY_HOST` | no value | v0.24.0 | `etc/defaults/config.defaults.yaml:1247` |

### config: features.domains.approximated.proxy_name

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `APPROXIMATED_PROXY_NAME` | no value | v0.24.0 | `etc/defaults/config.defaults.yaml:1248` |

### config: features.domains.approximated.vhost_target

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | no value | `APPROXIMATED_VHOST_TARGET` | no value | v0.24.0 | `etc/defaults/config.defaults.yaml:1249` |

### config: features.domains.acme.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `ACME_ENDPOINT_ENABLED` | `false` | v0.24.0 | `etc/defaults/config.defaults.yaml:1264` |

### config: features.domains.acme.listen_address

```
IP address to bind to in standalone mode (should always be localhost)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `127.0.0.1` | `ACME_LISTEN_ADDRESS` | the value above | v0.24.0 | `etc/defaults/config.defaults.yaml:1266` |

### config: features.domains.acme.port

```
Port for standalone mode (Caddy's ask directive points here)
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `12020` | `ACME_PORT` | the value above | v0.24.0 | `etc/defaults/config.defaults.yaml:1268` |

### config: features.organizations.enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `ENABLE_ORGS` | `false` | v0.25.0 | `etc/defaults/config.defaults.yaml:1274` |

### config: features.organizations.sso_enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `ORGS_SSO_ENABLED` | `false` | v0.25.0 | `etc/defaults/config.defaults.yaml:1275` |

### config: features.organizations.custom_mail_enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `ORGS_CUSTOM_MAIL_ENABLED` | `false` | v0.25.0 | `etc/defaults/config.defaults.yaml:1276` |

### config: features.organizations.incoming_secrets_enabled

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `ORGS_INCOMING_SECRETS_ENABLED` | `false` | v0.25.0 | `etc/defaults/config.defaults.yaml:1277` |

### config: features.organizations.homepage_network_rules_ui_enabled

```
Lets organizations with the homepage_network_rules entitlement edit
their custom domains' homepage network rules (allowed/denied CIDRs).
Default OFF. Turning it off stops edits only: rules already stored
stay enforced, the same as after a plan downgrade, so the switch never
opens a homepage a tenant restricted.
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `ORGS_HOMEPAGE_NETWORK_RULES_UI_ENABLED` | `false` | not annotated | `etc/defaults/config.defaults.yaml:1283` |

### config: features.organizations.base_domain_signup_enabled

```
Lets organizations with the base_domain_signup entitlement admit their
custom domain's own base domain to its sign-up allowlist automatically
(secrets.acme.com admits @acme.com). Also checked when a sign-up is
validated, so turning it off stops a saved setting from admitting
anyone.
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `ORGS_BASE_DOMAIN_SIGNUP_ENABLED` | `false` | not annotated | `etc/defaults/config.defaults.yaml:1289` |

### config: features.organizations.audit_logs_enabled

```
Gates exposure (UI + list API) of the organization secret-activity
trail; pairs with the `audit_logs` entitlement. Defaults ON, unlike
the sibling flags above, because the trail ships working out of the
box — this is an opt-out exclusion (ORGS_AUDIT_LOGS_ENABLED=false),
not an opt-in feature. Does not stop event collection.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `ORGS_AUDIT_LOGS_ENABLED` | `true` | v0.26.4 | `etc/defaults/config.defaults.yaml:1295` |

### config: features.organizations.sso_diagnostics_rate_limit.enabled

```
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `SSO_DIAGNOSTICS_RATE_LIMIT_ENABLED` | `true` | not annotated | `etc/defaults/config.defaults.yaml:1304` |

### config: features.organizations.sso_diagnostics_rate_limit.max_per_customer

```
Runs permitted per window for one customer, across all their domains.
A run is deterministic (the same stored record gets the same verdict
until the record or the IdP changes), so ten covers several full
edit-save-check cycles.
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `10` | `SSO_DIAGNOSTICS_RATE_LIMIT_MAX_PER_CUSTOMER` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1309` |

### config: features.organizations.sso_diagnostics_rate_limit.window

```
Counting window in seconds (1 hour).
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `3600` | `SSO_DIAGNOSTICS_RATE_LIMIT_WINDOW` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1311` |

### config: features.organizations.sso_diagnostics_rate_limit.lockout

```
Lockout duration in seconds once the cap is hit (1 hour).
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `3600` | `SSO_DIAGNOSTICS_RATE_LIMIT_LOCKOUT` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1313` |

### config: features.organizations.sso_metadata_fetch_rate_limit.enabled

```
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `SSO_METADATA_FETCH_RATE_LIMIT_ENABLED` | `true` | not annotated | `etc/defaults/config.defaults.yaml:1322` |

### config: features.organizations.sso_metadata_fetch_rate_limit.max_per_customer

```
Fetches permitted per window for one customer, across all their
domains. Enough for an admin iterating on a metadata URL.
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `30` | `SSO_METADATA_FETCH_RATE_LIMIT_MAX_PER_CUSTOMER` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1325` |

### config: features.organizations.sso_metadata_fetch_rate_limit.window

```
Counting window in seconds (1 hour).
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `3600` | `SSO_METADATA_FETCH_RATE_LIMIT_WINDOW` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1327` |

### config: features.organizations.sso_metadata_fetch_rate_limit.lockout

```
Lockout duration in seconds once the cap is hit (1 hour).
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `3600` | `SSO_METADATA_FETCH_RATE_LIMIT_LOCKOUT` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1329` |

### config: features.organizations.sender_test_email_rate_limit.enabled

```
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `SENDER_TEST_EMAIL_RATE_LIMIT_ENABLED` | `true` | not annotated | `etc/defaults/config.defaults.yaml:1338` |

### config: features.organizations.sender_test_email_rate_limit.max_per_customer

```
Test sends permitted per window for one customer, across all their
domains.
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `10` | `SENDER_TEST_EMAIL_RATE_LIMIT_MAX_PER_CUSTOMER` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1341` |

### config: features.organizations.sender_test_email_rate_limit.window

```
Counting window in seconds (1 hour).
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `3600` | `SENDER_TEST_EMAIL_RATE_LIMIT_WINDOW` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1343` |

### config: features.organizations.sender_test_email_rate_limit.lockout

```
Lockout duration in seconds once the cap is hit (1 hour).
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `3600` | `SENDER_TEST_EMAIL_RATE_LIMIT_LOCKOUT` | the value above | not annotated | `etc/defaults/config.defaults.yaml:1345` |

### config: features.secret_activity.collect

```
When false, event recording pauses; existing events stay readable.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `SECRET_ACTIVITY_COLLECT` | `true` | v0.26.4 | `etc/defaults/config.defaults.yaml:1353` |

### config: features.secret_activity.max_events

```
Newest events retained per organization (floor: 100). Lowering this
deletes (not hides) each org's oldest events on its next write.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| string | `10000` | `SECRET_ACTIVITY_MAX_EVENTS` | the value above | v0.26.4 | `etc/defaults/config.defaults.yaml:1356` |

### config: features.secret_activity.geo_country_enabled

```
Country-level geo capture on Secret Activity events (#3989). A distinct
axis from `collect`: gates ONLY the net_country attribute, pending
counsel review of org-tier geo exposure (ADR-021 Decision 4 open
question; ADR-022 does not yet cover this attribute). Defaults OFF
(opt-in) — the inverse polarity of the sibling flags — because this is
the not-yet-reviewed surface, not an already-approved one.
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `SECRET_ACTIVITY_GEO_COUNTRY_ENABLED` | `false` | v0.26.5 | `etc/defaults/config.defaults.yaml:1363` |

### config: features.markdown.enabled

```
Since unreleased
```

| Shape | Value | Environment variables | When unset | Since | Source |
| --- | --- | --- | --- | --- | --- |
| boolean | no value | `MARKDOWN_ENABLED` | `false` | not annotated | `etc/defaults/config.defaults.yaml:1372` |
