---
title: Upgrading to v0.26.11
description: Guide for upgrading Onetime Secret to v0.26.11 — fail-closed proxy, session-cookie, and Colonel step-up hardening, with no database migration
sidebar:
  order: 8
---


v0.26.11 tightens several controls that previously failed open, and one setting that was
previously ignored now refuses to boot. There is **no database migration** — rollback is a
tag swap.

Four changes can stop a working install: a trusted-proxy setting that now raises at boot, a
session cookie that becomes `Secure` on production installs serving plain HTTP, a step-up
re-authentication requirement that locks SSO-only operators out of destructive admin actions,
and the removal of RFC 7239 `Forwarded` from host detection. Each has a one-line remedy, and
the check order below is arranged so you find them in the order they bite.

This guide covers upgrading **from v0.26.10 or v0.26.9**. Coming from v0.24 or earlier,
follow [Upgrading to v0.24](https://docs.onetimesecret.com/en/self-hosting/upgrading-v0-24)
first.

---

## Before You Start

1. **Back up your datastore.** No migration runs, but take the backup anyway.
2. **Record your current tag** so rollback is a single command:
   ```bash
   docker inspect --format='{{.Config.Image}}' onetimesecret
   ```
3. **Gather four facts about your current config.** Every conditional step below keys off one
   of them:
   ```bash
   grep -E '^(TRUSTED_PROXY_HEADER|TRUSTED_PROXY_MODE|TRUSTED_PROXY_ENABLED|SSL|RACK_ENV|AUTH_SSO_ONLY|AUTH_MODE)=' .env
   ```
   - Is `TRUSTED_PROXY_HEADER` set to anything other than `X-Forwarded-For`?
   - Is `RACK_ENV=production` with `SSL=false`?
   - Do your Colonel operators sign in exclusively through SSO?
   - Does your edge send RFC 7239 `Forwarded` **instead of** `X-Forwarded-Host`?

If all four answers are no, this upgrade is a container tag swap and you can skip to
**Verify**.

---

## System Requirements

Unchanged from v0.26.10. Ruby 3.4 and the same datastore requirements apply.

Two dependency notes, neither of which needs operator action on the official images:

- `otto` moved 2.9.0 → 2.10.0. It no longer carries `rack-parser` as a runtime dependency;
  the application declares it directly.
- `syslog` is now named in the Gemfile. It became a bundled gem in Ruby 3.4, and the optional
  audit syslog appender would raise `LoadError` without the declaration.

---

## What Changes

| Area | Change | Action required? |
|---|---|---|
| Trusted proxy | `TRUSTED_PROXY_HEADER` other than `X-Forwarded-For` now **raises at boot** in filter mode, instead of being silently ignored | **Yes**, if you set it |
| Session cookie | In production, `SSL=false` no longer emits a non-`Secure` cookie | **Yes**, if you serve plain HTTP in production |
| Colonel actions | Step-up (sudo) re-authentication required for destructive verbs, **on by default** | **Yes**, if your operators are SSO-only |
| Host detection | RFC 7239 `Forwarded` is no longer read for the application host, and at the default configuration is not read for the TLS scheme either | **Yes**, if your edge sends only `Forwarded` |
| Forwarded TLS scheme | In filter mode, `X-Forwarded-Proto` from a peer outside `TRUSTED_PROXY_CIDRS` is ignored | **Yes**, if your proxy has public IPs |
| Secret creation | Anonymous creation rate-limited to 500/hour per masked network, **on by default** | Only if you expect higher anonymous volume |
| Admin sessions | `/api/colonel` bounded to 1h idle / 12h absolute, replacing the 24h rolling posture | No |
| Colonel API | Four rate-limit buckets, **on by default** | No |
| Colonel console | Destructive actions now require server-side confirmation; session ids shown as opaque handles | No |
| Audit trail | Destructive verbs fail closed when their audit event cannot be stored | No |
| Billing | Stripe invoice and portal URLs require org **owner**, not any member | No |
| Removed | `ots session clean`; Colonel configuration-editor write controls; in-app IP banning | Only if scripted |

---

## The Upgrade Checklist

The order matters: steps 1 and 2 are boot-time failures, step 3 is a first-request failure,
steps 4 and 5 only show up under real traffic.

### 1. Only if `TRUSTED_PROXY_HEADER` is set to anything but `X-Forwarded-For`

Filter mode reads the `X-Forwarded-For` family only and never RFC 7239 `Forwarded`. In
v0.26.10 it quietly ignored a conflicting `header` setting. It now raises at boot.

Pick one:

```bash
# You genuinely need RFC 7239 hop counting — switch to depth mode
TRUSTED_PROXY_MODE=depth
TRUSTED_PROXY_HEADER=Forwarded    # or Both
TRUSTED_PROXY_DEPTH=1             # 1 = single reverse proxy, 2 = CDN → proxy → app

# You don't — remove the header setting entirely
# TRUSTED_PROXY_HEADER=
```

> **Caution.** Depth mode never trusts vendor geo headers such as `CF-IPCountry`; country
> resolves to `**` unless you also set `GEO_DB_PATH` to a local MaxMind `.mmdb`. If you were
> relying on CDN geo, filter mode with the CDN's ranges in `TRUSTED_PROXY_CIDRS` is the
> configuration you want, not depth.

Values are matched case-insensitively and canonicalised. A typo raises rather than resolving
from the wrong header, and the error message names the value you actually wrote.

### 2. Only if you run `RACK_ENV=production` and serve plain HTTP

Previously `SSL=false` emitted `secure: false` on the session cookie in every environment. It
now does so only when `RACK_ENV` is one of `dev`, `development`, `test`, `testing`. Anywhere
else — including `production`, `staging`, an empty value, and typos — the key is left absent
and the runtime forces `secure: true`.

If you actually serve plain HTTP in production, say so explicitly:

```bash
SESSION_COOKIE_SECURE=false
```

> **Caution.** This variable is parsed as a literal string match against `true` or `false`.
> `SESSION_COOKIE_SECURE=0`, `=no` and `=off` do **not** work — they fall through to the old
> `SSL` logic and leave you with the same broken cookie. Use the word `false`.

Most deployments that inherit `SSL=false` from the quick-start terminate TLS at an edge proxy.
For those, the new behaviour is the correct one and no action is needed. Setting `SSL=true` is
the better fix there, since it also corrects generated share and email links.

### 3. Only if your Colonel operators sign in exclusively through SSO

Step-up elevation is on by default. A colonel session alone no longer authorises the tier-1
verbs — purge account, change role, revoke sessions, delete org / domain / secret, DLQ purge.
The operator must re-prove a credential through `POST /api/colonel/elevation` within a
10-minute window. Server-side confirmation applies on top of this, independently.

An SSO-only account has no password to re-prove. The remedy depends on your auth mode:

| Your setup | What to set |
|---|---|
| **Full auth mode**, SSO-only operators | `COLONEL_ELEVATION_ENABLED=false` |
| **Simple auth mode**, SSO-only operators | `COLONEL_ELEVATION_REAUTH_GRACE=300` (seconds after sign-in during which elevation succeeds with no credential) |
| Password or password+SSO operators | Nothing. Elevation works as intended. |

In full auth mode every account counts as password-holding from the logic layer's point of
view, so the `recent_auth` factor is never offered there and the grace window has no effect.
MFA is not implemented as a step-up factor in this release.

> **Caution.** Setting the grace window on a fleet where operators *do* hold passwords makes
> step-up a no-op for the first N seconds after every sign-in. It is available only to accounts
> that cannot satisfy the password factor for exactly that reason.

### 4. Only if your edge sends RFC 7239 `Forwarded`

Host detection precedence is now, in order: `X-Forwarded-Host`, `Apx-Incoming-Host`,
`X-Original-Host`, `Host`. `Forwarded` is observed but never selected.

Two things break for a `Forwarded`-only edge, not one. Custom-domain resolution falls back to
the `Host` header, **and** TLS scheme detection is lost: `Rack::Request.forwarded_priority` is
now pinned to the `X-Forwarded-*` family, so Rack does not read `Forwarded: proto=` at all
unless you are in depth mode with `header: Forwarded`. The app sees `http`, which in turn
affects Secure cookies, HSTS, `HttpOrigin`, CSRF and scheme redirects.

Configure the edge to send both:

```
# nginx
proxy_set_header X-Forwarded-Host  $host;
proxy_set_header X-Forwarded-Proto $scheme;

# Caddy
header_up X-Forwarded-Host  {host}
header_up X-Forwarded-Proto {scheme}
```

or have the edge rewrite `Host` itself. Either way the forwarded header is only honoured
behind configured proxy trust, so `TRUSTED_PROXY_ENABLED=true` with the edge's ranges in
`TRUSTED_PROXY_CIDRS` is a precondition, not an optional extra.

> **Caution.** The admin gate is stricter than host detection. If a request carries a
> `Forwarded` host that disagrees with the `Host`-derived one and the peer is not proven
> trusted, `/colonel` is denied — this is deliberate, and it targets exactly the topology where
> an edge rewrites `Host` to the canonical origin name and carries the tenant host only in
> `Forwarded`.

### 5. Only if your proxy has public IP addresses and you use filter mode

`X-Forwarded-Proto` from a peer outside `TRUSTED_PROXY_CIDRS` is now ignored. Filter mode
always trusts the RFC1918, loopback and link-local ranges; a CDN or load balancer with public
addresses is not in that set.

```bash
TRUSTED_PROXY_ENABLED=true
TRUSTED_PROXY_CIDRS=203.0.113.0/24,2001:db8::/32
```

Without this, forwarded TLS scheme detection is lost: the app sees `http`, which affects
Secure cookies, HSTS, `HttpOrigin`, CSRF and scheme redirects.

### 6. Optional — review the anonymous creation cap

Anonymous secret creation is now capped at 500 per hour per privacy-masked network (`/24` for
IPv4, `/48` for IPv6), enforced ahead of the write. Authenticated callers are not charged.

There is one condition worth knowing: **with `TRUSTED_PROXY_ENABLED=false` behind a reverse
proxy, every request resolves to the proxy's own address, so the entire install shares a single
bucket.** The default cap is deliberately loose for that reason, but a busy public instance
should either configure trusted proxy properly or raise the ceiling:

```bash
SECRET_CREATE_RATE_LIMIT_MAX_PER_IP=2000
SECRET_CREATE_RATE_LIMIT_WINDOW=3600
SECRET_CREATE_RATE_LIMIT_LOCKOUT=3600
# or, to opt out entirely:
SECRET_CREATE_RATE_LIMIT_ENABLED=false
```

Clear a stuck lockout with `bin/ots ratelimit keys create_secret <masked-ip>` piped to
`valkey-cli`, or `POST /api/colonel/ratelimit/reset` with `kind=create_secret` — the latter
records an audit event. The stored subject is the masked address, not the raw one and not the
form shown in the log line.

### 7. Optional — route the audit stream off-box

Operator audit events are emitted to a dedicated `ColonelAudit` log category before storage.
If you need retention beyond the console's caps, route that category to persistent collection,
or enable the syslog appender:

```bash
LOG_AUDIT_SYSLOG=true
LOG_AUDIT_SYSLOG_URL=syslog://localhost
LOG_AUDIT_SYSLOG_FACILITY=local0
LOG_AUDIT_SYSLOG_LEVEL=info
```

`LOG_AUDIT_SYSLOG` is parsed as an exact match against `true` — anything else leaves it off.

### 8. Pull and restart

```bash
docker pull onetimesecret/onetimesecret:v0.26.11
docker compose up -d
```

---

## Verify

Run these in order. Each one fails at a different layer, and the first failure tells you which
step above you skipped.

1. **The container starts.** A boot failure with a message naming
   `site.network.trusted_proxy.header` means step 1.
   ```bash
   docker logs onetimesecret 2>&1 | grep -i 'MiddlewareStack\|ArgumentError'
   ```

2. **Sign in and stay signed in.** If sign-in succeeds and immediately bounces you back to the
   login page, the browser is refusing to return a `Secure` cookie over HTTP — step 2.

3. **The client IP resolves to the real client, not the proxy.** Request from a known exit
   address and confirm it appears in the access log rather than your load balancer's address.
   This is the single check that covers steps 4 and 5 and the otto upgrade at once.

4. **`/colonel` loads** from an address inside `ADMIN_ALLOWED_CIDRS`. A `404` here is the
   admin gate, not a routing error — check `ADMIN_ALLOWED_HOSTS`, `ADMIN_ALLOWED_CIDRS` and
   proxy trust in that order.

5. **A destructive Colonel action completes.** Try a role change on a throwaway account. Being
   asked to re-authenticate is correct. Being *unable* to re-authenticate is step 3.

6. **Custom domains still resolve** to their branded pages, if you run them.

7. **An anonymous secret can be created** from outside your network.

---

## Config Mapping Reference

### New configuration

All of these are optional and default to the values shown.

```bash
# Session cookie
SESSION_COOKIE_SECURE=              # unset; 'true'/'false' only, always wins over SSL

# Anonymous secret creation limit
SECRET_CREATE_RATE_LIMIT_ENABLED=true
SECRET_CREATE_RATE_LIMIT_MAX_PER_IP=500
SECRET_CREATE_RATE_LIMIT_WINDOW=3600
SECRET_CREATE_RATE_LIMIT_LOCKOUT=3600

# Colonel step-up (sudo)
COLONEL_ELEVATION_ENABLED=true
COLONEL_ELEVATION_WINDOW=600
COLONEL_ELEVATION_REAUTH_GRACE=0

# Colonel API rate limits
COLONEL_RATE_LIMIT_ENABLED=true                    # parent switch for all buckets below
COLONEL_ELEVATION_RATE_LIMIT_ENABLED=true
COLONEL_ELEVATION_MAX_ATTEMPTS=5
COLONEL_ELEVATION_RATE_WINDOW=900
COLONEL_ELEVATION_LOCKOUT=900
COLONEL_MUTATION_RATE_LIMIT_ENABLED=true
COLONEL_MUTATION_MAX_ATTEMPTS=120
COLONEL_MUTATION_RATE_WINDOW=300
COLONEL_MUTATION_LOCKOUT=300
COLONEL_DESTRUCTIVE_RATE_LIMIT_ENABLED=true
COLONEL_DESTRUCTIVE_MAX_ATTEMPTS=10
COLONEL_DESTRUCTIVE_RATE_WINDOW=300
COLONEL_DESTRUCTIVE_LOCKOUT=900
COLONEL_HANDLE_RESOLVE_RATE_LIMIT_ENABLED=true
COLONEL_HANDLE_RESOLVE_MAX_ATTEMPTS=60
COLONEL_HANDLE_RESOLVE_RATE_WINDOW=300
COLONEL_HANDLE_RESOLVE_LOCKOUT=300

# Admin surface session bounds (/api/colonel only)
ADMIN_SESSION_LIFETIME_ENABLED=true
ADMIN_SESSION_IDLE_TIMEOUT=3600
ADMIN_SESSION_ABSOLUTE_TIMEOUT=43200

# Audit syslog sink (optional)
LOG_AUDIT_SYSLOG=false
LOG_AUDIT_SYSLOG_URL=syslog://localhost
LOG_AUDIT_SYSLOG_FACILITY=local0
LOG_AUDIT_SYSLOG_LEVEL=info
```

`.env.reference` remains canonical and carries the full commentary for each.

### Changed behaviour

| Variable | v0.26.10 | v0.26.11 |
|---|---|---|
| `TRUSTED_PROXY_HEADER` | Ignored in filter mode | **Raises at boot** in filter mode unless `X-Forwarded-For` |
| `SSL=false` | Emitted `secure: false` in every environment | Emits `secure: false` only in dev/test; production forces `secure: true` |
| `TRUSTED_PROXY_CIDRS` | Affected client-IP resolution | Also gates whether `X-Forwarded-Proto` is honoured in filter mode |
| RFC 7239 `Forwarded` | Could determine the application host | Observed for admin-gate provenance; never selected as the host |
| `ADMIN_ALLOWED_HOSTS` + `ADMIN_ALLOWED_CIDRS` | Network gate on `/colonel` and `/api/colonel` | Also promotes 15 destructive routes from an advisory network requirement to an enforced one. Set **both** or neither. |

### Removed

| Removed | Replacement |
|---|---|
| `ots session clean` | `ots sessions revoke-all <customer>` or `ots session delete` |
| Colonel configuration-editor write controls | The console configuration view is read-only. Edit config on disk. |
| In-app IP banning | Superseded by edge shielding (BunnyCDN Shield or your CDN's equivalent) |
| Stripe invoice URLs for non-owner members | Org **owner** only |

### Boolean parsing, because it bites here

Three parser classes coexist. All the flags added in this release are in the second group.

| Class | Behaviour | Applies to |
|---|---|---|
| `strict_bool!` | `1 true yes on y t` / `0 false no off n f`, case-insensitive; blank uses the documented default; **anything else raises at boot** | `BILLING_ENABLED`, `RABBITMQ_VERIFY_PEER`, `STRIPE_AUTOMATIC_TAX`, `SAFE_BOOT`, mailer provider options |
| `!= 'false'` | Default **on**; only the literal string `false` turns it off. `0`, `no`, `off` leave it **on** | Every new flag in this release, plus the `AUTH_*`, `API_*`, `MIDDLEWARE_*` and `CSP_ENABLED` families |
| `== 'true'` | Default **off**; only the literal string `true` turns it on | `SSL`, `TRUSTED_PROXY_ENABLED`, `ASSUME_HTTPS`, `AUTH_MFA_ENABLED`, `LOG_AUDIT_SYSLOG`, the `AUTH_WEBAUTHN_*` family |

`SESSION_COOKIE_SECURE` is a fourth case of its own: a literal match against `true` **or**
`false`, with anything else falling through to the `SSL` logic rather than raising.

None of these parsers changed in this release. They are listed because the new default-on
flags all sit in the fail-open class, so `COLONEL_ELEVATION_ENABLED=0` does not disable
elevation.

---

## Troubleshooting

### The container will not start, and the log names `trusted_proxy.header`

You have `TRUSTED_PROXY_HEADER` set to `Forwarded` or `Both` while `TRUSTED_PROXY_MODE` is
`filter` (the default). See step 1. The message names both keys and, if you made a typo in
`mode`, names the value you actually wrote rather than the one that resolved.

### Sign-in succeeds, then immediately returns to the login page

The session cookie is being set `Secure` and the browser will not return it over HTTP. See
step 2. Confirm with browser devtools: the cookie will be present in the `Set-Cookie` response
and absent from the next request.

### `/colonel` returns 404 after upgrade

Four independent gates can produce this, and all of them return `404` rather than `403` by
design. Check in this order, because each depends on the one before:

1. **Proxy trust.** If `TRUSTED_PROXY_ENABLED` is false or your proxy's range is missing from
   `TRUSTED_PROXY_CIDRS`, every request resolves to the proxy's address and forwarded hosts are
   not proven. Nothing below can pass reliably until this is right.
2. **`ADMIN_ALLOWED_CIDRS`.** The resolved client IP must be inside it. Matching runs at full
   precision, so `/32` entries work despite privacy masking.
3. **`ADMIN_ALLOWED_HOSTS`.** Exact, ASCII/A-label matching against the detected host.
4. **Forwarded-host provenance (new).** If a `Forwarded` header names a host other than the
   one `Host` alone produces, and the peer is not proven trusted, the request is denied even
   though `Host` itself would have been acceptable. Fix the edge to send `X-Forwarded-Host`, or
   configure proxy trust so the peer is proven.

The boot log names every gate that is active; grep it before changing anything.

### A destructive Colonel action returns "elevation required" and re-authenticating does not work

Your operators are SSO-only. See step 3, and note that the remedy differs between full and
simple auth mode.

### Step-up locked me out after a few failed attempts

`COLONEL_ELEVATION_MAX_ATTEMPTS` defaults to 5 in a 15-minute window, with a 15-minute lockout.
The Rodauth password check behind the elevation endpoint is an internal request and does not
increment Rodauth's own lockout counter, so this limiter is the only backstop there. Clear it
with `POST /api/colonel/ratelimit/reset` (`kind=colonel_elevation`) or the commands
`bin/ots ratelimit keys colonel_elevation <extid>` prints.

> **Caution.** A `colonel_mutation` lockout also blocks `POST /ratelimit/reset`, since that is
> itself a mutation. Clear that one from the CLI.

### The admin console shows an "expired" banner in a tab that was open

Expected. `/api/colonel` is now bounded to 1 hour idle and 12 hours absolute. The SPA shell
still loads; its first API call 401s. Sign in again, or set `ADMIN_SESSION_IDLE_TIMEOUT=0`,
`ADMIN_SESSION_ABSOLUTE_TIMEOUT=0`, or `ADMIN_SESSION_LIFETIME_ENABLED=false`.

### Anonymous users hit a rate limit on a busy instance

Almost always the proxy-collapse condition: `TRUSTED_PROXY_ENABLED` is false, so all traffic
shares one bucket. Configure trusted proxy, or raise
`SECRET_CREATE_RATE_LIMIT_MAX_PER_IP`. See step 6.

### Custom domains stopped resolving to their branded pages

Your edge is sending the host only in `Forwarded`. See step 4.

### The app thinks requests are HTTP even though clients arrive over HTTPS

Two causes, in order of likelihood. Either your edge sends the scheme only in RFC 7239
`Forwarded` and no longer has it read (step 4), or you are in filter mode and your proxy's
public range is missing from `TRUSTED_PROXY_CIDRS` (step 5). Confirm which with the Colonel
`/system/proxy-headers` report, which lists the carriers the edge actually sent, including
ones stripped later in the stack.

### Country shows as `**` everywhere after switching to depth mode

Depth mode never trusts vendor geo headers. Set `GEO_DB_PATH` to a local MaxMind `.mmdb`
(requires the optional `maxmind-db` gem), or return to filter mode with the CDN's ranges in
`TRUSTED_PROXY_CIDRS`.

### A destructive action reported an audit-write failure

Destructive operator actions now fail closed when their audit event cannot be stored. Most
actions write the audit event **after** the mutation, so **reconcile the target** — the action
may well have completed. Check the datastore before retrying.

---

## Rollback

There is no migration in this release, so rollback is a tag swap:

```bash
docker pull onetimesecret/onetimesecret:v0.26.10
# restore your previous image tag in compose, then
docker compose up -d
```

Every variable introduced in v0.26.11 is inert on v0.26.10 — an unrecognised `COLONEL_*` or
`SECRET_CREATE_RATE_LIMIT_*` entry is simply not read. Two exceptions to leave in place:

- `SESSION_COOKIE_SECURE` is not read by v0.26.10 either, so remove it only if you also intend
  to reinstate `SSL=false` behaviour, which v0.26.10 honours natively.
- If you changed `TRUSTED_PROXY_MODE` to `depth` as part of step 1, that **is** read by
  v0.26.10 and changes client-IP resolution. Revert it along with the image if you roll back.
