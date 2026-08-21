---
title: Upgrading to v0.26.6
description: Guide for upgrading Onetime Secret to v0.26.6 — Host-rewriting proxy auth fixes and billing federation, plus the v0.26.5 default-deny admin host gating and trusted-proxy hardening it builds on
sidebar:
  order: 7
---

This page covers the two most recent v0.26.x releases together, because
**v0.26.6 builds directly on config v0.26.5 introduced** — in particular, both
depend on `TRUSTED_PROXY_ENABLED`.

- Already running **v0.26.5**? Skip straight to
  [Upgrading to v0.26.6](#upgrading-to-v0266-from-v0265) — the v0.26.5 section
  below is only needed if you're still on v0.26.4 or earlier.
- Coming from **v0.25.x or earlier**? Work through the
  [Upgrading to v0.24.0](./upgrading-v0-24) guide first, then apply both
  sections below in order.

**v0.26.6** is a follow-up to v0.26.5. It fixes three ways a **Host-rewriting
proxy** (Approximated ingress, and any origin-target rewriter) broke
custom-domain authentication: tenant SSO never resolved, SSO `redirect_uri`s
named a host the IdP had never seen, and transactional email links pointed at
the canonical host instead of the domain the recipient signed in from. It also
closes a billing federation gap and rebuilds the CI path that was supposed to
be delivering frontend sourcemaps to Sentry and never had.

**v0.26.5** tightened several **default-deny** security boundaries. Most
installs upgraded with no config change; the ones that didn't found `/colonel`
returning 404, or the boot refusing to start, until the config it introduced
was in place.

Neither release has a **data migration**. `bin/ots migrate` is not required
for either, and rollback for either is a container/tag swap.

:::note[Scope]
This guide covers the operator-visible changes in **v0.26.5** (from v0.26.4)
and **v0.26.6** (from v0.26.5). If you are coming from v0.25.x or earlier,
work through the [Upgrading to v0.24.0](./upgrading-v0-24) guide first. The
v0.26.0–v0.26.4 release notes in
[`CHANGELOG.rst`](https://github.com/onetimesecret/onetimesecret/blob/main/CHANGELOG.rst)
list changes not repeated here.
:::

:::caution[Read this before you upgrade to v0.26.6, not after]
The v0.26.6 auth fixes are **inert unless your proxy is trusted** — they read
the host `TRUSTED_PROXY_ENABLED` and friends resolve, so if that's not set up
(see v0.26.5 step 3 below), nothing in v0.26.6 changes for you. And the
**example Caddyfile changed for security reasons** in v0.26.6: one of its
changes will break custom domains if you copy it verbatim while running
behind Approximated. Read [step 2](#2-only-if-your-proxy-config-came-from-the-example-apply-the-header-hygiene)
of the v0.26.6 checklist before you paste.
:::

## Before You Start

1. **Back up your datastore.** `redis-cli BGSAVE` or equivalent. Keep the RDB
   file somewhere safe. Neither release has a migration to undo, but there's
   no substitute for a backup either.
2. **Record the tag/image you're on.** Rollback for either release is pinning
   it again.
3. **Know the hostname you use to reach `/colonel`.** v0.26.5 step 1 depends
   on it, and getting it wrong locks you out of the admin surface.
4. **Know whether a reverse proxy sits in front of the app, and whether it
   rewrites `Host`** (Approximated does; a plain reverse proxy that passes
   `Host` through does not) **or forwards the original hostname in a header.**
   This single fact decides both the v0.26.5 admin-gate steps and every
   v0.26.6 auth fix.
5. If you're already on v0.26.5 with proxy trust configured, also gather:
   whether any tenant in your install uses **custom-domain SSO**, and which
   callback URLs are registered at their IdP; whether your Caddyfile (or
   equivalent) came from `etc/examples/Caddyfile-example`; whether
   **cross-region billing federation** is enabled.

## Upgrading to v0.26.5 (from v0.26.4)

### What Changed in v0.26.5

| Area | Change | Action required? |
|---|---|---|
| Admin host gate | `/colonel` and `/api/colonel` are now restricted to the canonical host by default (#4062, #4127) | **Yes**, if admin is served on any other hostname |
| Admin CIDR gate | An `ADMIN_ALLOWED_CIDRS` allowlist with no valid entries now fails closed (#4062) | **Yes**, if you set it |
| Forwarded-host trust | Admin gate refuses a forwarded host unless the proxy is proven via `TRUSTED_PROXY_CIDRS` (#4062, #4127) | **Yes**, if behind a header-forwarding proxy |
| Client IP in depth mode | The `+1` remap that double-counted the connecting peer is gone (#4024) | **Yes**, if you compensated for it |
| Proxy mode validation | `TRUSTED_PROXY_MODE` is validated at boot; invalid values fall back to `filter` with a warning (#4087) | No — but check the warning |
| Geo header | `GEO_HEADER` is honored in `filter` mode only; ignored under `depth` (#4024, #4068) | **Yes**, if depth + `GEO_HEADER` |
| Auth policy resolution | Sign-in policy reads now fail closed, and global auth defaults require positive operator classification (#4155, #4157, #4161) | No — verify sign-in after upgrade |
| Boolean flags | `RABBITMQ_VERIFY_PEER`, `BILLING_ENABLED`, `STRIPE_AUTOMATIC_TAX` share one parser; unrecognized tokens now fail the boot (#4156, #4160) | **Yes**, if any is set to a typo'd value |
| WebAuthn env names | `WEBAUTHN_*` → `AUTH_WEBAUTHN_*`; old names ignored (warned at boot) | **Yes**, if the old names are set |
| Link domains | New `LINK_DOMAINS` operator pool (#4063) | No — opt-in |
| Social cards | `BRAND_OG_IMAGE_URL=none` disables; custom domains no longer inherit the install's image (#4150) | No — opt-in |

### v0.26.5 Upgrade Checklist

Work through these **in order** before starting the new image. Steps 1–3
compound: an install running Colonel on a secondary hostname behind a
header-forwarding proxy hits all three at once, and the symptom for each is
the same 404.

#### 1. Set the admin hostname

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

#### 2. Check the admin CIDR allowlist

If you set `ADMIN_ALLOWED_CIDRS`, confirm every entry parses as a CIDR. A list
that is set but contains no valid entry now **fails closed** — previously it
degraded to "no network restriction."

```bash
ADMIN_ALLOWED_CIDRS=10.0.0.0/8,192.168.1.0/24
```

Leaving it unset is still the default and still means "no network gate." The
host gate (step 1) and the network gate are independent; a request must pass
every gate that is active.

#### 3. Prove your proxy, if you have one

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

This same flag is what the v0.26.6 auth fixes below depend on — set it up
correctly here and every v0.26.6 fix works with no further config.

:::caution
`filter` mode with no explicit `TRUSTED_PROXY_CIDRS` trusts
every private-network peer as a proxy, which restores exactly the
forwarded-host spoofing the provenance rule exists to block. Name your
ranges.
:::

#### 4. Restore your real proxy depth

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

#### 5. Move geo resolution off the header, under depth

Only if `TRUSTED_PROXY_MODE=depth` **and** `GEO_HEADER` is set.

`GEO_HEADER` is now honored in `filter` mode only, and is ignored under
`depth`. Depth-mode deployments that want country data should use a local
MaxMind database instead:

```bash
GEO_DB_PATH=/path/to/GeoLite2-Country.mmdb   # requires the maxmind-db gem
```

Otherwise country resolves to `**`. `GEO_DB_PATH` works in all modes.

#### 6. Normalize your boolean flags

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

Two behavior changes to check for:

- **`RABBITMQ_VERIFY_PEER` defaults ON and was previously read as
  `== 'true'`.** Any other token — `1`, `TRUE`, `yes`, or a typo — silently
  disabled TLS peer verification. If you set this flag, confirm its value now.
  It will either work correctly or fail the boot; it will no longer fail open.
- **`BILLING_ENABLED` and `STRIPE_AUTOMATIC_TAX` accept more tokens than
  before.** `yes`/`on`/`y`/`t` previously raised at boot and now mean true.
  This is a widening, not a flip.

#### 7. Rename the WebAuthn flags

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

`AUTH_WEBAUTHN_VERIFY_ACCOUNT` additionally requires `AUTHENTICATION_MODE=full`
(see [Simple or Full Auth](./simple-or-full-auth) if you are unsure which mode
you run). Custom domains cannot be restricted to passkey-only sign-in.

#### 8. Optional: new features

Neither is required to upgrade.

```bash
# Operator-controlled pool of link domains offered in the switcher (#4063).
# Set-but-empty is a boot error naming LINK_DOMAINS.
LINK_DOMAINS=links.example.com,short.example.net

# Disable social cards entirely (#4150). Custom domains no longer inherit
# the install's social image regardless of this setting.
BRAND_OG_IMAGE_URL=none
```

#### 9. Start and verify

```bash
docker compose pull && docker compose up -d
```

### Verify v0.26.5

Run all five. Steps 1–3 fail identically (404), so check them separately.

1. **Boot log is clean.** No `ConfigError`, and no warning about
   `TRUSTED_PROXY_MODE` falling back to `filter`, a blank
   `ADMIN_ALLOWED_HOSTS`, or an ignored `WEBAUTHN_*` variable.
2. **Admin reachable.** Load `/colonel` on the hostname you expect — the
   canonical host, its `www.` sibling, or an `ADMIN_ALLOWED_HOSTS` entry — from
   a network inside `ADMIN_ALLOWED_CIDRS` if you set one. A 404 here means step
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

## Upgrading to v0.26.6 (from v0.26.5)

### What Changed in v0.26.6

| Area | Change | Action required? |
|---|---|---|
| Tenant SSO on custom domains | Credential lookup keys on the request's resolved public host, not the raw `Host:` the proxy rewrote | **Yes** behind a Host-rewriting proxy — the IdP must have the custom-domain callback URL registered |
| SSO `redirect_uri` / `callback_url` | Built from the public host for every strategy family (OIDC reads `client_options.redirect_uri`; OAuth2 builds `callback_url` itself) | **Yes**, same as above — this is the value the IdP compares |
| Transactional email links | Magic-link, password-reset, account-verification, verify-login-change and unlock emails point at the domain the recipient used, and the branding line matches | No, unless something downstream assumed a single link host |
| Proxy trust | Unchanged, but now **load-bearing for auth**: an untrusted proxy leaves all of the above resolving to the canonical host | **Yes** if you want the fixes to take effect |
| Example Caddyfile | Now strips client-supplied `X-Forwarded-Host`, `Forwarded`, and `Apx-Incoming-Host` | **Yes** if you derived your config from it — see the caution in step 2 |
| New diagnostic route | `GET /api/colonel/system/proxy-headers` reports what Caddy received and what Rack resolved. Declares `network=admin`: 404 unless **both** admin allowlists are explicitly set and admit the request | Optional — only if you want the diagnostic |
| Billing federation | `customer.subscription.created` is now handled; a purchase in one region propagates to the buyer's orgs in other regions immediately instead of at the next subscription event | **Yes** on federated installs — enable the event at Stripe |
| Federation no-match logging | Both federation paths now emit a greppable `federation.no_match` warning carrying region, email hash, Stripe customer and subscription | No — worth an alert rule |
| `SENTRY_DIST` | Removed from `.env.reference`. Nothing ever read it; the dist tag is a build-time literal | No — delete it from your `.env` when convenient |
| `SENTRY_FRONTEND_PROJECT` | New **optional CI secret** (default `frontend`) naming the project sourcemaps upload to | Only if you build your own images and ship telemetry |
| Sourcemap delivery | The build now extracts the frontend from the pushed image, asserts before upload, and queries Sentry after it | Only if you build your own images |

### v0.26.6 Upgrade Checklist

Ordered by dependency. Proxy trust decides whether the auth fixes do anything
at all, so it comes first; the header hygiene in step 2 decides whether they
resolve the *right* host.

#### 1. Confirm proxy trust, or the rest of this release is a no-op

`Rack::DetectHost` accepts a forwarded host **only** when the request arrived
via trusted infrastructure (`otto.via_trusted_proxy`) or from a private peer.
Everything in this release that fixes a host — tenant SSO resolution, the SSO
`redirect_uri`, and every minted email link — reads that resolution.

```bash
TRUSTED_PROXY_ENABLED=true
TRUSTED_PROXY_MODE=filter            # or depth
TRUSTED_PROXY_CIDRS=10.0.0.0/8       # filter mode: your proxy/CDN ranges
```

:::caution
`TRUSTED_PROXY_MODE`, `TRUSTED_PROXY_CIDRS` and `TRUSTED_PROXY_DEPTH` are
inert unless `TRUSTED_PROXY_ENABLED=true`, and `filter` mode with no CIDRs
trusts nothing. Either state leaves forwarded hosts discarded, which means
custom-domain SSO and email links keep resolving to the canonical host
exactly as they did in v0.26.5.
:::

If you are behind Approximated, watch for this line at `WARN` after
upgrading — it is the precise signature of the failure this release fixes,
still happening:

```
[DetectHost] Discarding forwarded host headers (Apx-Incoming-Host) from untrusted
source; Apx-Incoming-Host present — matches the 2026-08-05 Approximated-ingress
incident signature
```

#### 2. Only if your proxy config came from the example: apply the header hygiene

`etc/examples/Caddyfile-example` previously passed the client's
`X-Forwarded-Host` and `Apx-Incoming-Host` straight through. `Rack::DetectHost`
takes the first syntactically valid hostname it finds in precedence order
(`X-Forwarded-Host` > `Apx-Incoming-Host` > `X-Original-Host` > `Forwarded` >
`Host`) and does **not** check that the domain belongs to this install.
Passing those headers through therefore lets any visitor who can reach the
site block choose the detected host.

```caddyfile
header_up Host {http.request.host}
header_up -X-Forwarded-Host
header_up -Forwarded
header_up -Apx-Incoming-Host          # see the caution — NOT if Approximated fronts you
header_up X-Original-Host {http.request.host}
```

:::caution[Do not blanket-strip Apx-Incoming-Host if Approximated fronts this deployment]
That header is what carries the visitor's hostname while `Host:` holds the
origin target; strip it unconditionally and every custom domain falls back to
the canonical host. Gate it on source instead, using the ingress ranges from
your Approximated dashboard. `header_up` does not accept matchers, so the
strip goes in the enclosing `handle` block:

```caddyfile
@not_apx not remote_ip 198.51.100.0/24
request_header @not_apx -Apx-Incoming-Host
```
:::

Two failure modes, worth knowing apart:

- An **unknown** injected host: `DomainStrategy` rejects it, falls back to the
  canonical host, and that tenant's SSO stops resolving.
- **Another tenant's registered** host: it is known, so it is honoured end to
  end — SSO resolution, sign-in gating and every minted link keyed to the
  wrong tenant.

Do not "fix" this by pinning `X-Forwarded-Host` to `{http.request.host}`
either. That outranks and masks `Apx-Incoming-Host`, which is the first
failure mode by a different route.

#### 3. Only if you use custom-domain SSO: register the custom-domain callback at the IdP

Before this release, behind a Host-rewriting proxy, the `redirect_uri` handed
to the IdP was built from the rewritten authority — the origin target. It now
names the domain the visitor is actually on:

```
https://<custom-domain>/auth/sso/<provider>/callback
```

For every tenant with SSO on a custom domain, confirm that exact URL is in the
IdP application's allowed redirect URIs. Both phases (authorize and callback)
run the same resolution, so the two agree — but an IdP that only knows the old
origin target will reject the authorize request outright.

Deployments **not** behind a Host-rewriting proxy see no change here: the
authority already was the custom domain.

#### 4. Only if billing federation is enabled: turn on the Stripe event

Federation previously ran on `customer.subscription.updated`, `.deleted`,
`.paused` and `.resumed`. There was no handler for
`customer.subscription.created` at all, so a purchase in region B by someone
who already had an organization in region A did not propagate until some
later event on that subscription fired.

Add `customer.subscription.created` to the events your Stripe webhook
endpoint sends. Without it the handler never runs and nothing changes.

The handler is a no-op when federation is off, and on the purchasing region's
own organization it deliberately writes nothing — `checkout.session.completed`
owns that write path and compares the stored subscription id against the
incoming one to catch a replacement that would orphan a live subscription.

#### 5. Optional: enable the proxy header diagnostic

`GET /api/colonel/system/proxy-headers` returns a fixed allowlist of
proxy-related fields — what Caddy observed before proxying, and what Rack
resolved after its proxy/IP middleware ran. It is the fastest way to answer
"is my forwarded host actually being trusted?" after steps 1 and 2.

The route declares `auth=sessionauth role=colonel` **and** `network=admin`.
The network requirement is stricter than the ordinary Colonel posture: both
allowlists must be explicitly configured and must admit the request. The
canonical-host fallback that ordinary Colonel routes accept does **not**
satisfy it — see [Set the admin hostname](#1-set-the-admin-hostname) and
[Check the admin CIDR allowlist](#2-check-the-admin-cidr-allowlist) above.

```bash
ADMIN_ALLOWED_HOSTS=admin.example.com
ADMIN_ALLOWED_CIDRS=100.64.0.0/10
```

Add a dedicated Caddy handler ahead of the normal dynamic reverse-proxy
handler, so a caller cannot forge Caddy's own snapshots:

```caddyfile
@proxy_header_debug path /api/colonel/system/proxy-headers
handle @proxy_header_debug {
    header_up -X-Ots-Proxy-Debug-Peer
    header_up -X-Ots-Proxy-Debug-Host
    header_up -X-Ots-Proxy-Debug-Received-X-Forwarded-For
    header_up -X-Ots-Proxy-Debug-Received-Forwarded
    header_up -X-Ots-Proxy-Debug-Received-Apx-Incoming-Host

    header_up X-Ots-Proxy-Debug-Peer {remote_host}
    header_up X-Ots-Proxy-Debug-Host {http.request.host}
    header_up X-Ots-Proxy-Debug-Received-X-Forwarded-For {http.request.header.X-Forwarded-For}
    header_up X-Ots-Proxy-Debug-Received-Forwarded {http.request.header.Forwarded}
    header_up X-Ots-Proxy-Debug-Received-Apx-Incoming-Host {http.request.header.Apx-Incoming-Host}

    reverse_proxy 127.0.0.1:7143
}
```

Full detail in [Proxy header diagnostic](https://github.com/onetimesecret/onetimesecret/blob/main/docs/operations/proxy-header-diagnostic.md).

#### 6. Only if you build your own images: reconcile the Sentry project

Frontend stack traces have never symbolicated on any build produced by this
repo's workflow. The upload ran `sentry-cli sourcemaps upload ./public/web/dist`
on the runner, but the frontend is compiled *inside* the image and that
directory never existed at that point — and `sentry-cli` treats an empty
directory as a successful upload of zero artifacts, so every build reported
green.

If you build your own images and ship telemetry:

```
SENTRY_FRONTEND_PROJECT=<project>     # optional, default "frontend"
```

It must be one of `SENTRY_PROJECTS`, or the release and its artifact bundles
land in different projects and symbolication silently fails again. The new
preflight reports that mismatch explicitly rather than passing quietly.

Delete `SENTRY_DIST` from your `.env`. Nothing in `lib/`, `apps/` or `src/`
ever read it; it read like a knob that could change the dist tag while
offering no way to set it.

### Verify v0.26.6

Work down this list — each check assumes the ones above it passed.

1. **Proxy trust is real.** Boot the new tag and grep the log for
   `[DetectHost] Discarding forwarded host headers`. Any hit naming
   `Apx-Incoming-Host` means step 1 is not done and steps 3–5 cannot work.
2. **Host resolution is correct.** With the diagnostic enabled, from an
   allowed admin host and network:

   ```bash
   curl -s https://admin.example.com/api/colonel/system/proxy-headers \
     -H 'Cookie: sess=<session-id>' | jq
   ```

   Confirm `rack.via_trusted_proxy` is true and `rack.detected_host` is the
   hostname a visitor types, not the origin target.
3. **A custom-domain email link names the custom domain.** Request a password
   reset from a tenant custom domain and read the delivered link. It must
   point at that domain, and the branding line in the body must name the same
   host.
4. **Tenant SSO completes.** Start SSO from a custom domain. Before this
   release the symptom was a `302` to `/signin?auth_error=sso_not_configured`;
   if you now get an IdP-side "unregistered redirect URI" error instead, step
   3 of the checklist above is outstanding, not this release.
5. **A test subscription federates.** With federation on, create a
   subscription in one region for an email that owns an org in another, and
   confirm the remote org picks up `subscription_federated_at` without
   waiting for a later event. Watch for `federation.no_match` warnings while
   you are there.

## Config Mapping Reference

### Renamed

| Old | New | Note |
|---|---|---|
| `WEBAUTHN_AUTOFILL` | `AUTH_WEBAUTHN_AUTOFILL` | Old name ignored; warns at boot (v0.26.5) |
| `WEBAUTHN_VERIFY_ACCOUNT` | `AUTH_WEBAUTHN_VERIFY_ACCOUNT` | Old name ignored; warns at boot (v0.26.5) |

Nothing renamed in v0.26.6.

### New

| Variable | Scope | Default | Notes |
|---|---|---|---|
| `ADMIN_ALLOWED_HOSTS` | Runtime (`site.admin.allowed_hosts`) | Canonical anchor hosts + `www.` sibling | v0.26.5 |
| `LINK_DOMAINS` | Runtime (`features.domains.link_domains`) | Unset | v0.26.5 |
| `AUTH_WEBAUTHN_ENABLED` | Runtime (`auth: full.features.webauthn`) | `false` | v0.26.5 |
| `SENTRY_FRONTEND_PROJECT` | **CI secret**, not runtime | `frontend` | v0.26.6. Must be one of `SENTRY_PROJECTS` |

No new runtime environment variables in v0.26.6.

### Removed

| Variable | Notes |
|---|---|
| `SENTRY_DIST` | v0.26.6. Removed from `.env.reference`. Never read by application code; the dist tag is a build-time literal applied by the CI upload steps. Leaving it set is harmless |

### Changed behavior

| Variable | Config path | Change |
|---|---|---|
| `ADMIN_ALLOWED_CIDRS` | `site.admin.allowed_cidrs` | v0.26.5: set with no valid entry now fails closed |
| `TRUSTED_PROXY_MODE` | `site.network.trusted_proxy.mode` | v0.26.5: validated at boot; invalid → `filter` + warning |
| `TRUSTED_PROXY_DEPTH` | `site.network.trusted_proxy.depth` | v0.26.5: `+1` peer remap removed; set the true hop count |
| `GEO_HEADER` | `site.network.geo.header` | v0.26.5: `filter` mode only; ignored under `depth` |
| `RABBITMQ_VERIFY_PEER` | — | v0.26.5: shared boolean parser; no longer fails open on a typo |
| `BILLING_ENABLED` | `billing.yaml: enabled` | v0.26.5: accepts `yes`/`on`/`y`/`t` (previously raised) |
| `STRIPE_AUTOMATIC_TAX` | `billing.yaml: automatic_tax` | v0.26.5: accepts `yes`/`on`/`y`/`t` (previously raised) |
| `BRAND_OG_IMAGE_URL` | `brand.og_image_url` | v0.26.5: accepts `none`; custom domains no longer inherit |
| `TRUSTED_PROXY_ENABLED` and friends | `site.network.trusted_proxy.*` | v0.26.6: no parsing or default change, but now also determines whether custom-domain SSO and transactional email links resolve the visitor's host |
| `ADMIN_ALLOWED_HOSTS` + `ADMIN_ALLOWED_CIDRS` | `site.admin.*` | v0.26.6: unchanged for existing routes, but a route declaring `network=admin` (the new proxy-headers diagnostic) requires **both** to be explicitly set and active — the canonical-host fallback does not count |

## Troubleshooting

### `/colonel` returns 404 after upgrade

Three independent gates produce this, in this order of likelihood:

1. **Host gate.** Your admin hostname isn't `DEFAULT_DOMAIN`/`HOST` or a `www.`
   sibling. Set `ADMIN_ALLOWED_HOSTS`. See v0.26.5 step 1.
2. **Unusable allowlist.** `ADMIN_ALLOWED_HOSTS` is set but contains no
   matchable entry (an IP, a `*.` pattern, a non-ASCII name). The boot log
   names this.
3. **Unproven forwarded host.** Your proxy forwards the hostname in a header
   and `TRUSTED_PROXY_CIDRS` doesn't cover the proxy. See v0.26.5 step 3.

The boot log distinguishes cases 2 and 3. See
[Admin surface isolation](https://github.com/onetimesecret/onetimesecret/blob/main/docs/operations/admin-network-isolation.md)
for the full decision table.

### Boot fails with `Onetime::ConfigError` naming a boolean flag

A flag is set to something outside the vocabulary in v0.26.5 step 6. The
message gives the flag name, the value's length, and a short SHA-256 tag —
not the value itself. Match the tag against the host's config to find the
typo. Fix the token or unset the variable to take the default.

### Every request appears to come from one address

`TRUSTED_PROXY_ENABLED` is `false` (the default), so forwarded headers are
ignored and the client IP is `REMOTE_ADDR` — your proxy. Set it to `true` and
configure `mode` and `cidrs`. See v0.26.5 step 3.

### Client IP is off by one hop

You are in `depth` mode and `TRUSTED_PROXY_DEPTH` still carries the `+1` you
added to work around the old double-count. Set it to the real number of proxy
hops. See v0.26.5 step 4.

### Country resolves to `**`

Expected under `depth` mode — it never trusts geo headers. Configure
`GEO_DB_PATH`, or switch to `filter` mode with `TRUSTED_PROXY_CIDRS` naming
your CDN's ranges. See v0.26.5 step 5.

### A sign-in method disappeared

Auth policy resolution now fails closed: an unreadable or ambiguous tenant
policy renders the narrowest surface rather than inheriting global defaults.
Check the domain's `restrict_to` setting and its SSO connection state. A
dormant credential is now flagged rather than silently used.

### `/api/colonel/system/proxy-headers` returns 404

Ambiguous by design — a rejected gate and a mistyped path look identical to
the client. Check the application log for
`Route network requirement not satisfied` from `NetworkRequirements` to
confirm a gate refused it, then work through, in order: is
`ADMIN_ALLOWED_HOSTS` set explicitly (not falling back to canonical)? Is
`ADMIN_ALLOWED_CIDRS` set with at least one parseable entry? Does your source
address match one of them? Are you signed in as a colonel?

### Custom-domain SSO still 302s to `/signin?auth_error=sso_not_configured`

The host is still not being resolved. v0.26.6 step 1, then step 2. Confirm
with the diagnostic that `rack.detected_host` is the custom domain.

### Custom-domain SSO now fails at the IdP with an unregistered redirect URI

Expected if v0.26.6 step 3 is outstanding. The `redirect_uri` correctly names
the custom domain now; the IdP application still lists only the old origin
target.

### Every custom domain fell back to the canonical host right after a proxy config change

You stripped `Apx-Incoming-Host` unconditionally while running behind
Approximated. Source-gate the strip — see the caution in v0.26.6 step 2.

### One tenant's users are landing in another tenant's context

Stop and check `X-Forwarded-Host` and `Forwarded` handling at the edge before
anything else. A pass-through of either lets a client name a *known* domain,
which is honoured end to end.

### Email links still point at the canonical host

Either proxy trust is not established (v0.26.6 step 1), or your deployment
does not rewrite `Host` at all — in which case nothing changed for you and
the links were already correct.

### Frontend stack traces in Sentry are still unsymbolicated

Two halves must both be true, and v0.26.6 ships only one of them. CI now
uploads with `--dist=frontend`; the frontend must put the matching
`dist: 'frontend'` on its own events in
`src/plugins/core/enableDiagnostics.ts`. Until that lands, the preflight
reports the mismatch as an explicit dist-tag warning on every run instead of
staying silent.

## Rollback

Neither release has a schema migration or a bulk data transform, so rollback
for either is pinning the previous tag and restarting.

### Rolling back v0.26.6 → v0.26.5

```bash
docker pull ghcr.io/onetimesecret/onetimesecret:v0.26.5
```

Nothing you configure while on v0.26.6 becomes invalid on v0.26.5:
`SENTRY_FRONTEND_PROJECT` is a CI-only secret, the admin allowlists behave the
same on both, and `TRUSTED_PROXY_*` is unchanged. The Caddyfile header
hygiene from v0.26.6 step 2 is a strict improvement and should stay in place
regardless of which tag you run — it is not a v0.26.6 requirement, it is a
spoofing fix.

The one thing that does not survive this rollback is the behaviour itself: on
v0.26.5 the SSO `redirect_uri` reverts to the origin target, so an IdP entry
you added in step 3 stops being the one used. Leave both URLs registered
while you have rollback in reach.

### Rolling back v0.26.5 → v0.26.4

```bash
# Pin the previous tag
OTS_IMAGE_TAG=v0.26.4
docker compose up -d
```

Config added for v0.26.5 (`ADMIN_ALLOWED_HOSTS`, `LINK_DOMAINS`) is inert on
v0.26.4 and can be left in place. If you changed `TRUSTED_PROXY_DEPTH` in step
4, revert that too — the old code needs the old value.
