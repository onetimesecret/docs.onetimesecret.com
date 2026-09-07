---
title: Upgrading to v0.26.11
description: "Upgrade Onetime Secret to v0.26.11: review proxy, session-cookie, and Colonel authentication changes. No database migration is required."
sidebar:
  order: 8
---

This guide covers upgrades from v0.26.9 or v0.26.10. v0.26.11 does not include a database migration. If you are upgrading from v0.24 or earlier, first complete [the v0.24.0 upgrade guide](./upgrading-v0-24).

Most installations can update the image and restart. Review the checks below before starting the new version if you use a reverse proxy, serve plain HTTP in production, or use SSO-only Colonel accounts.

## Before You Start

1. Back up your datastore and configuration files. No migration runs, but a backup makes rollback safer.
2. Record the image tag currently running:

   ```bash
   docker inspect --format='{{.Config.Image}}' onetimesecret
   ```

3. Review the relevant values in your `.env` file:

   ```bash
   grep -E '^(TRUSTED_PROXY_(ENABLED|MODE|HEADER|CIDRS)|SSL|RACK_ENV|AUTHENTICATION_MODE|AUTH_SSO_ONLY)=' .env
   ```

   If you do not use the listed settings, continue to [Update and restart](#update-and-restart).

## Changes That May Require Configuration Updates

| If your installation… | Review | Required action |
| --- | --- | --- |
| Uses `TRUSTED_PROXY_HEADER` with a value other than `X-Forwarded-For` in filter mode | The application now rejects this configuration at startup. | [Choose a supported proxy mode](#choose-a-supported-proxy-mode). |
| Runs `RACK_ENV=production` over plain HTTP | Production session cookies are now secure by default. | [Set the cookie behavior explicitly](#set-the-cookie-behavior-explicitly). |
| Has Colonel operators who can sign in only through SSO | Destructive Colonel actions now require step-up authentication by default. | [Configure Colonel elevation](#configure-colonel-elevation). |
| Receives the public host or TLS scheme only in RFC 7239 `Forwarded` | The application no longer uses `Forwarded` to select the host. | [Send the supported forwarded headers](#send-the-supported-forwarded-headers). |
| Uses filter mode behind proxies with public IP addresses | `X-Forwarded-Proto` is accepted only from configured proxy CIDRs. | [Trust your proxy ranges](#trust-your-proxy-ranges). |

The release also adds a default anonymous-secret creation limit and bounded Colonel API sessions. Review the [Operational changes](#operational-changes) section if these affect your deployment.

## Prepare Your Configuration

Only complete the sections that match your installation.

### Choose a supported proxy mode

In filter mode, `TRUSTED_PROXY_HEADER` must be `X-Forwarded-For` or unset. A different value now prevents the application from starting.

If you need RFC 7239 hop counting, use depth mode and set the number of proxy hops you operate:

```bash
TRUSTED_PROXY_MODE=depth
TRUSTED_PROXY_HEADER=Forwarded
TRUSTED_PROXY_DEPTH=1  # One reverse proxy between clients and the app
```

Otherwise, remove `TRUSTED_PROXY_HEADER` and remain in filter mode.

> **Caution:** Depth mode does not use CDN-provided country headers. To retain country resolution in depth mode, configure a local MaxMind database with `GEO_DB_PATH`. If you rely on CDN geo headers, use filter mode and configure the CDN ranges in `TRUSTED_PROXY_CIDRS` instead.

### Set the cookie behavior explicitly

In production, the session cookie is secure by default, even when `SSL=false`. This is correct when TLS terminates at a reverse proxy.

If clients really connect to the application over plain HTTP, set:

```bash
SESSION_COOKIE_SECURE=false
```

Use the literal value `false`. Values such as `0`, `no`, and `off` do not disable the secure-cookie setting.

If TLS terminates at your proxy, do not disable secure cookies. Set `SSL=true` so generated links also use HTTPS.

### Configure Colonel elevation

Destructive Colonel actions now require the operator to re-authenticate. This step-up check is enabled by default.

| Operator sign-in method | Action |
| --- | --- |
| Password, or password and SSO | No configuration change. |
| SSO only in full authentication mode | Set `COLONEL_ELEVATION_ENABLED=false`. |
| SSO only in simple authentication mode | Set `COLONEL_ELEVATION_REAUTH_GRACE=300` to allow elevation for five minutes after sign-in. |

The grace period reduces protection for the configured interval. Use it only when operators cannot provide a password for step-up authentication.

### Send the supported forwarded headers

Configure an edge that currently sends only RFC 7239 `Forwarded` to also send `X-Forwarded-Host` and `X-Forwarded-Proto`, or to preserve the public `Host` header.

```nginx
# nginx
proxy_set_header X-Forwarded-Host  $host;
proxy_set_header X-Forwarded-Proto $scheme;
```

```text
# Caddy
header_up X-Forwarded-Host  {host}
header_up X-Forwarded-Proto {scheme}
```

Forwarded headers are used only when the proxy is trusted. Configure `TRUSTED_PROXY_ENABLED=true` and include the proxy ranges in `TRUSTED_PROXY_CIDRS`.

### Trust your proxy ranges

In filter mode, `X-Forwarded-Proto` from a proxy outside `TRUSTED_PROXY_CIDRS` is ignored. Add the CIDRs for any public CDN or load balancer that forwards traffic to the application:

```bash
TRUSTED_PROXY_ENABLED=true
TRUSTED_PROXY_CIDRS=203.0.113.0/24,2001:db8::/32
```

Replace these documentation ranges with your proxy's actual IPv4 and IPv6 ranges. Proxy configuration variables have no effect unless `TRUSTED_PROXY_ENABLED=true`.

## Operational Changes

These changes do not usually require action, but may affect active deployments.

### Anonymous secret creation limit

Anonymous secret creation is limited to 500 requests per hour per privacy-masked network by default. Authenticated callers are not included.

Behind a reverse proxy that is not trusted, all clients can appear to come from the proxy and share one limit. Configure trusted proxy ranges before increasing or disabling the limit:

```bash
SECRET_CREATE_RATE_LIMIT_MAX_PER_IP=2000
SECRET_CREATE_RATE_LIMIT_WINDOW=3600
SECRET_CREATE_RATE_LIMIT_LOCKOUT=3600

# Disable the limit only if you accept the abuse risk.
SECRET_CREATE_RATE_LIMIT_ENABLED=false
```

### Colonel sessions and audit events

Colonel API sessions now expire after one hour of inactivity or twelve hours total. Destructive Colonel actions also fail when their audit event cannot be stored.

If an action reports an audit-write failure, check the target state before retrying: some actions record the audit event after making the change.

## Update and Restart

Update the image reference in your Compose configuration to `onetimesecret/onetimesecret:v0.26.11`, then pull and start the updated service:

```bash
docker compose pull
docker compose up -d
```

## Verify

After the restart, verify the parts of the application that your deployment uses:

1. **Startup:** Review the container log. A startup error mentioning `trusted_proxy.header` indicates an unsupported proxy-header setting. See [Choose a supported proxy mode](#choose-a-supported-proxy-mode).
2. **Sign-in:** Sign in and load another page. An immediate return to the login page usually means the browser will not send a secure cookie over HTTP. See [Set the cookie behavior explicitly](#set-the-cookie-behavior-explicitly).
3. **Proxy behavior:** Confirm that access logs show the client IP rather than the proxy IP. If TLS terminates at the proxy, confirm the application recognizes requests as HTTPS.
4. **Colonel access:** Load `/colonel` from an allowed network and perform a non-production destructive action, such as changing the role of a test account. A re-authentication prompt is expected.
5. **Custom domains:** If used, load a branded page and complete an SSO sign-in on a custom domain.
6. **Anonymous creation:** If enabled, create a secret from an external network.

## Troubleshooting

### The application does not start and the log mentions `trusted_proxy.header`

`TRUSTED_PROXY_HEADER` is set to `Forwarded` or `Both` while `TRUSTED_PROXY_MODE=filter`. Remove the header setting or switch to depth mode. See [Choose a supported proxy mode](#choose-a-supported-proxy-mode).

### Sign-in succeeds, then returns to the login page

The browser is not returning a secure session cookie over HTTP. Configure HTTPS or set `SESSION_COOKIE_SECURE=false` only for a plain-HTTP deployment. See [Set the cookie behavior explicitly](#set-the-cookie-behavior-explicitly).

### `/colonel` returns 404

First verify proxy trust. Then check `ADMIN_ALLOWED_CIDRS` and `ADMIN_ALLOWED_HOSTS`. If your edge forwards the public host, it must send a supported header from a trusted proxy range. See [Send the supported forwarded headers](#send-the-supported-forwarded-headers).

### A destructive Colonel action requires elevation, but the operator cannot re-authenticate

The operator likely uses SSO only. Apply the setting for your authentication mode in [Configure Colonel elevation](#configure-colonel-elevation).

### Custom domains no longer load their branded pages

Your edge may send the public host only in `Forwarded`. Send `X-Forwarded-Host` or preserve `Host`, then confirm the edge is trusted. See [Send the supported forwarded headers](#send-the-supported-forwarded-headers).

### The application treats HTTPS requests as HTTP

Either the edge is sending the scheme only in `Forwarded`, or its public IP range is missing from `TRUSTED_PROXY_CIDRS`. See [Send the supported forwarded headers](#send-the-supported-forwarded-headers) and [Trust your proxy ranges](#trust-your-proxy-ranges).

### Anonymous users reach a rate limit unexpectedly

When an untrusted proxy hides client IPs, all clients share the proxy's limit. Configure proxy trust first, then adjust the limit if needed. See [Anonymous secret creation limit](#anonymous-secret-creation-limit).

## Roll Back

No database migration is required. Restore the previous image tag and the configuration snapshot you made before the upgrade, then restart the service:

```bash
docker compose up -d
```

If you changed proxy mode or cookie settings for this upgrade, restore their previous values as part of the rollback.
