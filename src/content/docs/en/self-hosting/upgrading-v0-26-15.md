---
title: Upgrading to v0.26.15
description: The application now reads the public host only from a single X-Forwarded-Host or Host, forwarded scheme headers need a trusted proxy, SVG domain images are refused, and rolling back needs a datastore step.
audience: operator
pageType: how-to
sourceOfTruth: onetimesecret/lib/middleware/detect_host.rb (public host is a single X-Forwarded-Host from a trusted proxy, then Host; a comma-separated value is skipped with the "[DetectHost] Ignoring X-Forwarded-Host" WARN; Apx-Incoming-Host, X-Original-Host and Forwarded are never selected; the "Discarding forwarded host headers" WARN only without proxy trust configured); onetimesecret/lib/onetime/middleware/strip_forwarded_host.rb (X-Forwarded-Proto, -Scheme and -SSL deleted unless the connecting peer is trusted); onetimesecret/lib/onetime/session.rb ("[Session] cookie NOT written" WARN); onetimesecret/lib/onetime/middleware/assume_https.rb (ASSUME_HTTPS); onetimesecret/lib/onetime/middleware/admin_network_isolation.rb (the /colonel 404 and "forwarded host from an untrusted peer" WARN); onetimesecret/lib/onetime/middleware/public_host_rewrite.rb and onetimesecret/lib/onetime/application/middleware_stack.rb (Host rewritten after DomainStrategy, only for config value true); onetimesecret/etc/defaults/config.defaults.yaml (PUBLIC_HOST_REWRITE == 'true', emailer.ssl from SMTP_SSL, SMTP_PORT default 587, VALKEY_DBS_CUSTOM_DOMAIN or REDIS_DBS_CUSTOM_DOMAIN); onetimesecret/docs/operations/proxy-authority-header.md and onetimesecret/etc/examples/Caddyfile-example (proxy contract, header removal, remote_ip source match); onetimesecret/lib/onetime/image_content.rb, apps/api/domains/logic/domains/update_domain_image.rb, get_image.rb, get_domain_image.rb and apps/web/core/logic/page/get_favicon.rb (MIME from the stored bytes, raster only, SVG refused on upload and answered 404, favicon fallback); onetimesecret/lib/onetime/models/custom_domain.rb and custom_domain/chores/migrate_ownership_verified.rb (ownership_verified written, legacy verified only read; the rollback EVAL is the reverse copy); onetimesecret/lib/onetime/mail/delivery/smtp.rb and lib/onetime/utils/strings.rb (SMTP_SSL turns STARTTLS off and keeps the port; boolean vocabulary); onetimesecret/lib/onetime/initializers/setup_loggers.rb and etc/defaults/logging.defaults.yaml (20-line console backtraces in production, BACKTRACE_LINES=0 unlimited, destinations validated at boot); onetimesecret/apps/web/auth/config/hooks/omniauth_tenant.rb (ten-minute tenant SSO window); onetimesecret/changelog.d/20260930_100500_delano_4220_remove_domain_context_override.rst (DOMAIN_CONTEXT_ENABLED and DOMAIN_CONTEXT removed)
sidebar:
  order: 15
---

v0.26.15 reads the host a visitor asked for from two places only: a single
`X-Forwarded-Host` from a trusted proxy, then `Host`. Proxies that carried the
public host in `Apx-Incoming-Host` or `X-Original-Host` must change **before** the
upgrade. No database migration runs, but **rolling back needs a datastore step**
(see [Rollback](#rollback)).

Coming from v0.26.13 or earlier, read the [v0.26.14 upgrade guide](./upgrading-v0-26-14) first.

## Before You Start

1. Back up the Redis/Valkey datastore.
2. Record your current tag.
3. Note what sits in front of the application: which layer terminates TLS, from
   which address it connects, and which header carries the public hostname when
   something rewrites `Host` (Approximated does, into `Apx-Incoming-Host`).

## What Changes

| Area | Change | Action required? |
| :--- | :--- | :--- |
| Public host | Only a single `X-Forwarded-Host` from a trusted proxy, then `Host` | If a proxy rewrites `Host` or appends to `X-Forwarded-Host` |
| Scheme | `X-Forwarded-Proto` and related headers read only from a trusted proxy | If the proxy that connects to the application has a public address |
| Domain images | SVG logos and icons refused on upload and no longer served | If customers uploaded SVGs |
| Email | Delivery is at-least-once; a replay after a provider timeout can send twice | None |
| Logs and CLI | Production backtraces capped at 20 lines; `bin/ots` prints info lines on stderr | Only if you parse them |
| SSO | A tenant SSO sign-in must finish within ten minutes | None |

## The Upgrade Checklist

1. **Only if a proxy in front of the application rewrites `Host`:** make the proxy
   nearest the application overwrite `X-Forwarded-Host` with the public hostname,
   and remove `Apx-Incoming-Host`, `X-Original-Host` and `Forwarded`. Behind
   Approximated, copy `Apx-Incoming-Host` into `X-Forwarded-Host` for requests from
   Approximated's egress range; `etc/examples/Caddyfile-example` has the block.
   v0.26.14 already reads `X-Forwarded-Host` first, so deploy this proxy change
   and confirm custom domains still render branded **before** upgrading. Match the
   source with Caddy's `remote_ip`, not `client_ip`. Behind a TCP load balancer,
   `remote_ip` is Approximated's address only if Caddy honors the balancer's PROXY
   protocol header; otherwise no request matches and every custom domain falls
   back to the canonical site.

   :::caution
   If you skip this, every custom domain is served as the canonical site after the
   upgrade, and nothing in the log says why. The v0.26.14 example Caddyfile's
   Approximated variant (pass `Apx-Incoming-Host` through for Approximated's range,
   remove `X-Forwarded-Host`) is this layout.
   :::

2. **Only if one proxy forwards to another that appends to `X-Forwarded-Host`**
   (Apache `mod_proxy` does): have the proxy nearest the application overwrite it
   with one host. A comma-separated value is now ignored.

3. **Only if TLS ends at a proxy or load balancer that connects to the application
   from a public address:** set `TRUSTED_PROXY_ENABLED=true` and add its ranges to
   `TRUSTED_PROXY_CIDRS`, or set `ASSUME_HTTPS=true`. Otherwise every request is
   `http`, the `Secure` session cookie is not written, and sign-in fails.

4. **Only if customers uploaded SVG logos or icons:** list them, and ask the owners
   to upload PNG or WebP instead. Stored SVGs are kept but no longer served. The
   check reads the stored bytes, since earlier releases stored whatever type the
   browser declared:

   ```bash
   URL="${VALKEY_URL:-$REDIS_URL}"; URL="${URL%%\?*}"   # add -n <db> if you set VALKEY_DBS_CUSTOM_DOMAIN or REDIS_DBS_CUSTOM_DOMAIN
   for k in $(valkey-cli -u "$URL" --scan --pattern 'custom_domain:*:logo') \
            $(valkey-cli -u "$URL" --scan --pattern 'custom_domain:*:icon'); do
     valkey-cli -u "$URL" HGET "$k" encoded | tr -d '"' | head -c 400 | base64 -d 2>/dev/null \
       | head -c 200 | tr -d '\0' | grep -aqiE '<(\?xml|svg|!--)' && echo "$k"
   done
   ```

5. **Only if you set `SMTP_SSL=true`** (new, implicit TLS): also set
   `SMTP_PORT=465`. `SMTP_SSL` does not change the port, and it turns STARTTLS off,
   so `SMTP_TLS` no longer applies.

6. **Only if you parse logs or `bin/ots` output:** production console backtraces
   end after 20 lines with `... (N more lines)` (`BACKTRACE_LINES=0` for full);
   `bin/ots` writes info lines to stderr; secret and receipt paths in request logs
   read `[REDACTED]`.

7. **Only if your development setup sets `DOMAIN_CONTEXT_ENABLED`, `DOMAIN_CONTEXT`
   or `development.domain_context_enabled`:** remove them. They are ignored without
   a warning. Send the custom domain as the request host instead.

## Verify

1. A custom domain renders branded, and its sign-in page shows its own settings.
2. Sign in on the canonical host and reload; the session persists. The log has no
   `[Session] cookie NOT written` line.
3. The application log has no `[DetectHost] Ignoring X-Forwarded-Host` or
   `[DetectHost] Discarding forwarded host headers` WARN lines. The Discarding line
   appears only when `TRUSTED_PROXY_ENABLED` is not set; with it set, rely on check 1.
4. `/colonel` loads on the canonical host.

## Config Mapping Reference

| Setting | Status | Default | Notes |
| :--- | :--- | :--- | :--- |
| `PUBLIC_HOST_REWRITE` (`site.network.public_host_rewrite`) | New | `false` | Behind a proxy that rewrites `Host`, sets `Host` to the detected public host before the applications run. Only lowercase `true` enables it. See `docs/operations/proxy-authority-header.md`. |
| `SMTP_SSL` (`emailer.ssl`) | New | off | Implicit TLS. Boolean vocabulary (`true`, `1`, `yes`, `on`, `y`, `t`, any case); an unrecognized value is off, without an error. |
| `BACKTRACE_LINES` | Changed | `20` in production | Applies to console output. `0` means unlimited. |
| Logging `destinations` | New | console only | Optional log file with its own level and formatter. A bad value or an unopenable file stops boot. |
| `DOMAIN_CONTEXT_ENABLED`, `DOMAIN_CONTEXT` | Removed | | Ignored. |

## Troubleshooting

### Custom domains show the canonical site

The tenant hostname is not arriving in `X-Forwarded-Host`. See checklist step 1.

### Sign-in succeeds but the next page is signed out

The log shows `[Session] cookie NOT written` with `untrusted_scheme_headers`. The
proxy terminating TLS is not trusted. See checklist step 3.

### `/colonel` returns 404 from the canonical host

The log shows `Admin surface access denied: forwarded host from an untrusted peer`.
A proxy still sends `Apx-Incoming-Host`, `X-Original-Host`, `Forwarded` or a
comma-separated `X-Forwarded-Host` naming a different host. Remove them at the proxy
and send one `X-Forwarded-Host`.

### A domain's logo disappeared

It is an SVG. Upload a raster image.

### A user received the same email twice

A delivery was accepted by the provider but reported as failed, then replayed
from the dead letter queue. This is expected under at-least-once delivery.

## Rollback

v0.26.15 stores custom-domain verification in `ownership_verified`; v0.26.14
reads only `verified`. Stop every v0.26.15 process, copy the field back, then start
v0.26.14:

```bash
URL="${VALKEY_URL:-$REDIS_URL}"; URL="${URL%%\?*}"   # add -n <db> if you set VALKEY_DBS_CUSTOM_DOMAIN or REDIS_DBS_CUSTOM_DOMAIN
for k in $(valkey-cli -u "$URL" --scan --pattern 'custom_domain:*:object'); do
  valkey-cli -u "$URL" EVAL \
    "local v = redis.call('HGET', KEYS[1], 'ownership_verified') if v then redis.call('HSET', KEYS[1], 'verified', v) end return 0" \
    1 "$k" > /dev/null
done
```

Without it, domains verified or added on v0.26.15 read as unverified or stale on
v0.26.14. The proxy changes from steps 1 and 2 work unchanged on v0.26.14.
