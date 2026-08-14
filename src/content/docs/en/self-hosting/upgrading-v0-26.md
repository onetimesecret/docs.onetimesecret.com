---
title: Upgrading to v0.26.5
description: Guide for upgrading Onetime Secret to v0.26.5 — default-deny admin host gating, trusted-proxy hardening, and boolean flag validation
sidebar:
  order: 7
---

v0.26.5 tightens several **default-deny** security boundaries. Most installs
upgrade with no config change; the ones that don't will find `/colonel`
returning 404, or the boot refusing to start, until the config below is in
place.

There is **no data migration** in this release. `bin/ots migrate` is not
required, and rollback is a container swap.

:::note[Scope]
This guide covers the operator-visible changes introduced in
**v0.26.5** (from v0.26.4). If you are coming from v0.25.x or earlier, work
through the [Upgrading to v0.24.0](./upgrading-v0-24) guide first, then apply
this one. The v0.26.0–v0.26.4 release notes in
[`CHANGELOG.rst`](https://github.com/onetimesecret/onetimesecret/blob/main/CHANGELOG.rst)
list changes not repeated here.
:::

## Before You Start

1. **Back up Redis.** `redis-cli BGSAVE` or equivalent. Keep the RDB file
   somewhere safe. There is no migration to undo, but there is no substitute
   for a backup either.
2. **Record your current image tag.** Rollback for this release is pinning the
   previous tag and restarting.
3. **Know the hostname you use to reach `/colonel`.** Step 1 below depends on
   it, and getting it wrong locks you out of the admin surface.
4. **Know whether a reverse proxy sits in front of the app**, and if so,
   whether it rewrites `Host` or forwards the original hostname in a header.

## What Changes

| Area | Change | Action required? |
|---|---|---|
| Admin host gate | `/colonel` and `/api/colonel` are now restricted to the canonical host by default (#4062, #4127) | **Yes**, if admin is served on any other hostname |
| Admin CIDR gate | An `ADMIN_ALLOWED_CIDRS` allowlist with no valid entries now fails closed (#4062) | **Yes**, if you set it |
| Forwarded-host trust | Admin gate refuses a forwarded host unless the proxy is proven via `TRUSTED_PROXY_CIDRS` (#4062, #4127) | **Yes**, if behind a header-forwarding proxy |
| Client IP in depth mode | The `+1` remap that double-counted the connecting peer is gone (#4024) | **Yes**, if you compensated for it |
| Proxy mode validation | `TRUSTED_PROXY_MODE` is validated at boot; invalid values fall back to `filter` with a warning (#4087) | No — but check the warning |
| Geo header | `GEO_HEADER` is honoured in `filter` mode only; ignored under `depth` (#4024, #4068) | **Yes**, if depth + `GEO_HEADER` |
| Auth policy resolution | Sign-in policy reads now fail closed, and global auth defaults require positive operator classification (#4155, #4157, #4161) | No — verify sign-in after upgrade |
| Boolean flags | `RABBITMQ_VERIFY_PEER`, `BILLING_ENABLED`, `STRIPE_AUTOMATIC_TAX` share one parser; unrecognised tokens now fail the boot (#4156, #4160) | **Yes**, if any is set to a typo'd value |
| WebAuthn env names | `WEBAUTHN_*` → `AUTH_WEBAUTHN_*`; old names ignored (warned at boot) | **Yes**, if the old names are set |
| Link domains | New `LINK_DOMAINS` operator pool (#4063) | No — opt-in |
| Social cards | `BRAND_OG_IMAGE_URL=none` disables; custom domains no longer inherit the install's image (#4150) | No — opt-in |

## The Upgrade Checklist

Work through these **in order** before starting the new image. Steps 1–3
compound: an install running Colonel on a secondary hostname behind a
header-forwarding proxy hits all three at once, and the symptom for each is
the same 404.

### 1. Set the admin hostname

The host gate is active without configuration. Check how you reach `/colonel`:

| Your admin hostname | Result |
|---|---|
| `DEFAULT_DOMAIN` or `HOST` (or their `www.` sibling) | No change needed |
| Anything else — a tenant custom domain, a `LINK_DOMAINS` entry, an internal name | **404 after upgrade.** Set `ADMIN_ALLOWED_HOSTS` |
| No routable hostname (`HOST=localhost:3000`, or reached by bare IP) | No change — the gate self-disables |

```bash
ADMIN_ALLOWED_HOSTS=admin.example.com
```

:::caution
An explicit list containing no *usable* entry — an IP address, a
`*.` pattern, a non-ASCII name — 404s both admin surfaces rather than
quietly serving admin everywhere. The boot log says so. Set it to a real
hostname or leave it unset.
:::

To opt out entirely, set `ADMIN_ALLOWED_HOSTS=*`.

### 2. Check the admin CIDR allowlist

If you set `ADMIN_ALLOWED_CIDRS`, confirm every entry parses as a CIDR. A list
that is set but contains no valid entry now **fails closed** — previously it
degraded to "no network restriction."

```bash
ADMIN_ALLOWED_CIDRS=10.0.0.0/8,192.168.1.0/24
```

Leaving it unset is still the default and still means "no network gate." The
host gate (step 1) and the network gate are independent; a request must pass
every gate that is active.

### 3. Prove your proxy, if you have one

If the app runs behind a reverse proxy that forwards the public hostname in a
header (`X-Forwarded-Host`, `Apx-Incoming-Host`, `X-Original-Host`,
`Forwarded`) rather than rewriting `Host`, you **must** name the proxy's own
address ranges:

```bash
TRUSTED_PROXY_ENABLED=true
TRUSTED_PROXY_CIDRS=10.0.0.0/8
```

Without this the admin gate refuses the forwarded host and both admin surfaces
404. `TRUSTED_PROXY_ENABLED=false` (the default) means `mode`, `cidrs` and
`depth` do nothing at all — forwarded headers are ignored and the client IP is
`REMOTE_ADDR`.

:::caution
`filter` mode with no explicit `TRUSTED_PROXY_CIDRS` trusts
every private-network peer as a proxy, which restores exactly the
forwarded-host spoofing the provenance rule exists to block. Name your
ranges.
:::

### 4. Restore your real proxy depth

Only if `TRUSTED_PROXY_MODE=depth`.

v0.26.5 removes a `+1` remap that double-counted the connecting peer, so
client-IP selection was off by one hop. If you compensated by setting
`TRUSTED_PROXY_DEPTH` one higher than your actual proxy count, **set it back to
the true count now**:

```bash
TRUSTED_PROXY_MODE=depth
TRUSTED_PROXY_DEPTH=1   # number of proxy hops you actually operate
```

Depth mode expresses an explicit trust-at-edge decision. It is correct only
when the origin is reachable *exclusively* through your proxy tier — if a
client can connect to the app directly, depth mode will trust an attacker's
forged chain entry.

### 5. Move geo resolution off the header, under depth

Only if `TRUSTED_PROXY_MODE=depth` **and** `GEO_HEADER` is set.

`GEO_HEADER` is now honoured in `filter` mode only, and is ignored under
`depth`. Depth-mode deployments that want country data should use a local
MaxMind database instead:

```bash
GEO_DB_PATH=/path/to/GeoLite2-Country.mmdb   # requires the maxmind-db gem
```

Otherwise country resolves to `**`. `GEO_DB_PATH` works in all modes.

### 6. Normalise your boolean flags

`RABBITMQ_VERIFY_PEER`, `BILLING_ENABLED` and `STRIPE_AUTOMATIC_TAX` now share
one parser
([ADR-037](https://github.com/onetimesecret/onetimesecret/blob/main/docs/adr/adr-037-boolean-token-vocabulary.md)):

- **Truthy:** `1` `true` `yes` `on` `y` `t`
- **Falsey:** `0` `false` `no` `off` `n` `f`
- Case-insensitive, whitespace-tolerant. Blank or unset takes the documented
  default.
- **Anything else raises `Onetime::ConfigError` at boot**, naming the flag and
  the valid tokens. The rejected value is never echoed — the message carries a
  character count and a short SHA-256 tag instead.

Two behaviour changes to check for:

- **`RABBITMQ_VERIFY_PEER` defaults ON and was previously read as
  `== 'true'`.** Any other token — `1`, `TRUE`, `yes`, or a typo — silently
  disabled TLS peer verification. If you set this flag, confirm its value now.
  It will either work correctly or fail the boot; it will no longer fail open.
- **`BILLING_ENABLED` and `STRIPE_AUTOMATIC_TAX` accept more tokens than
  before.** `yes`/`on`/`y`/`t` previously raised at boot and now mean true.
  This is a widening, not a flip.

### 7. Rename the WebAuthn flags

If `WEBAUTHN_AUTOFILL` or `WEBAUTHN_VERIFY_ACCOUNT` are set, they are now
**ignored** with a boot warning. There is no fallback shim — the features were
not functional under the old names.

```bash
AUTH_WEBAUTHN_ENABLED=true
AUTH_WEBAUTHN_AUTOFILL=true
AUTH_WEBAUTHN_VERIFY_ACCOUNT=true
```

:::note
These three use presence-independent `== 'true'` semantics, **not**
the shared vocabulary from step 6. Only the literal string `true` enables
them. `1`, `yes`, and `on` leave them off, silently.
:::

`AUTH_WEBAUTHN_VERIFY_ACCOUNT` additionally requires `AUTHENTICATION_MODE=full`.
Custom domains cannot be restricted to passkey-only sign-in.

### 8. Optional: new features

Neither is required to upgrade.

```bash
# Operator-controlled pool of link domains offered in the switcher (#4063).
# Set-but-empty is a boot error naming LINK_DOMAINS.
LINK_DOMAINS=links.example.com,short.example.net

# Disable social cards entirely (#4150). Custom domains no longer inherit
# the install's social image regardless of this setting.
BRAND_OG_IMAGE_URL=none
```

### 9. Start and verify

```bash
docker compose pull && docker compose up -d
```

## Verify

Run all five. Steps 1–3 fail identically (404), so check them separately.

1. **Boot log is clean.** No `ConfigError`, and no warning about
   `TRUSTED_PROXY_MODE` falling back to `filter`, a blank
   `ADMIN_ALLOWED_HOSTS`, or an ignored `WEBAUTHN_*` variable.
2. **Admin reachable.** Load `/colonel` on the hostname you expect, from a
   network inside `ADMIN_ALLOWED_CIDRS` if you set one. A 404 here means step
   1, 2 or 3.
3. **Client IP is correct.** Create a secret and confirm the recorded client
   IP is the real client, not your proxy. This is the check that catches a
   wrong `TRUSTED_PROXY_DEPTH`.
4. **Sign-in works on every surface you use** — canonical host, custom
   domains, SSO, invite acceptance, MFA. Auth policy resolution now fails
   closed, so a misconfigured tenant policy presents as an unavailable sign-in
   method rather than an open one.
5. **Secrets create and reveal** on the canonical host and on at least one
   custom domain.

## Config Mapping Reference

### Renamed

| Old | New | Note |
|---|---|---|
| `WEBAUTHN_AUTOFILL` | `AUTH_WEBAUTHN_AUTOFILL` | Old name ignored; warns at boot |
| `WEBAUTHN_VERIFY_ACCOUNT` | `AUTH_WEBAUTHN_VERIFY_ACCOUNT` | Old name ignored; warns at boot |

### New

| Variable | Config path | Default |
|---|---|---|
| `ADMIN_ALLOWED_HOSTS` | `site.admin.allowed_hosts` | Canonical anchor hosts + `www.` sibling |
| `LINK_DOMAINS` | `features.domains.link_domains` | Unset |
| `AUTH_WEBAUTHN_ENABLED` | `auth: full.features.webauthn` | `false` |

### Changed behaviour

| Variable | Config path | Change |
|---|---|---|
| `ADMIN_ALLOWED_CIDRS` | `site.admin.allowed_cidrs` | Set with no valid entry now fails closed |
| `TRUSTED_PROXY_MODE` | `site.network.trusted_proxy.mode` | Validated at boot; invalid → `filter` + warning |
| `TRUSTED_PROXY_DEPTH` | `site.network.trusted_proxy.depth` | `+1` peer remap removed; set the true hop count |
| `GEO_HEADER` | `site.network.geo.header` | `filter` mode only; ignored under `depth` |
| `RABBITMQ_VERIFY_PEER` | — | Shared boolean parser; no longer fails open on a typo |
| `BILLING_ENABLED` | `billing.yaml: enabled` | Accepts `yes`/`on`/`y`/`t` (previously raised) |
| `STRIPE_AUTOMATIC_TAX` | `billing.yaml: automatic_tax` | Accepts `yes`/`on`/`y`/`t` (previously raised) |
| `BRAND_OG_IMAGE_URL` | `brand.og_image_url` | Accepts `none`; custom domains no longer inherit |

## Troubleshooting

### `/colonel` returns 404 after upgrade

Three independent gates produce this, in this order of likelihood:

1. **Host gate.** Your admin hostname isn't `DEFAULT_DOMAIN`/`HOST` or a `www.`
   sibling. Set `ADMIN_ALLOWED_HOSTS`. See step 1.
2. **Unusable allowlist.** `ADMIN_ALLOWED_HOSTS` is set but contains no matchable
   entry (an IP, a `*.` pattern, a non-ASCII name). The boot log names this.
3. **Unproven forwarded host.** Your proxy forwards the hostname in a header
   and `TRUSTED_PROXY_CIDRS` doesn't cover the proxy. See step 3.

The boot log distinguishes cases 2 and 3. See
[Admin surface isolation](https://github.com/onetimesecret/onetimesecret/blob/main/docs/operations/admin-network-isolation.md)
for the full decision table.

### Boot fails with `Onetime::ConfigError` naming a boolean flag

A flag is set to something outside the vocabulary in step 6. The message gives
the flag name, the value's length, and a short SHA-256 tag — not the value
itself. Match the tag against the host's config to find the typo. Fix the
token or unset the variable to take the default.

### Every request appears to come from one address

`TRUSTED_PROXY_ENABLED` is `false` (the default), so forwarded headers are
ignored and the client IP is `REMOTE_ADDR` — your proxy. Set it to `true` and
configure `mode` and `cidrs`.

### Client IP is off by one hop

You are in `depth` mode and `TRUSTED_PROXY_DEPTH` still carries the `+1` you
added to work around the old double-count. Set it to the real number of proxy
hops. See step 4.

### Country resolves to `**`

Expected under `depth` mode — it never trusts geo headers. Configure
`GEO_DB_PATH`, or switch to `filter` mode with `TRUSTED_PROXY_CIDRS` naming
your CDN's ranges. See step 5.

### A sign-in method disappeared

Auth policy resolution now fails closed: an unreadable or ambiguous tenant
policy renders the narrowest surface rather than inheriting global defaults.
Check the domain's `restrict_to` setting and its SSO connection state. A
dormant credential is now flagged rather than silently used.

## Rollback

No data migration ran, so rollback is a version pin and a restart:

```bash
# Pin the previous tag
OTS_IMAGE_TAG=v0.26.4
docker compose up -d
```

Config added for this release (`ADMIN_ALLOWED_HOSTS`, `LINK_DOMAINS`) is
inert on v0.26.4 and can be left in place. If you changed
`TRUSTED_PROXY_DEPTH` in step 4, revert that too — the old code needs the old
value.
