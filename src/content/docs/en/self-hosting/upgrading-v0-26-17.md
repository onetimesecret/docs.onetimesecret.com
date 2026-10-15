---
title: Upgrading to v0.26.17
description: Custom domains are served only once ownership is verified, magic-link requests are rate limited by default, and a one-time index backfill runs with the application stopped.
sidebar:
  order: 17
---

v0.26.17 adds SSO self-diagnostics for custom domains and closes several security
findings. No migration runs and rollback is a tag swap. Two changes can stop
traffic if you skip them: custom domains whose ownership is not verified stop being
served, and magic-link requests are now rate limited by client IP. One step runs
after the upgrade, in a short maintenance window: a backfill of the custom-domain
name index.

Coming from v0.26.15 or earlier, read the
[v0.26.16 release notes](https://github.com/onetimesecret/onetimesecret/releases/tag/v0.26.16)
first; from v0.26.14 or earlier, also the [v0.26.15 upgrade guide](./upgrading-v0-26-15).

## Before You Start

1. Back up the Redis/Valkey datastore and record your current tag.
2. Note your `DOMAINS_VALIDATION_STRATEGY` (`passthrough` by default) and how
   many custom domains you serve.
3. Note your `AUTHENTICATION_MODE` and whether `AUTH_EMAIL_AUTH_ENABLED=true`
   (magic links). See [Simple or full auth](./simple-or-full-auth).
4. Note whether a reverse proxy sits in front of the application and whether
   `TRUSTED_PROXY_ENABLED=true` is set.

## What Changes

| Area | Change | Action required? |
| :--- | :--- | :--- |
| Custom domains | Under `approximated` or `caddy_on_demand`, a domain is served only once its ownership is verified; others answer 404 | Verify before upgrading |
| Custom domains | One-time backfill of the canonical name index | After upgrading, application stopped |
| Magic links | 30/hour per client IP and 90/hour per address, each with a one-hour lockout, on by default | Confirm client IPs resolve |
| Account deletion | Purges stopped by legacy membership references can now finish | Retry any partial purges |
| Auth API | Magic-link and verify-resend requests answer "sent" whether or not the account exists | None |
| Datastore | A plaintext `redis://` URI to a remote host logs a warning at boot | None |
| Audit | Customer self-service actions move to the security audit trail | Only if you read the operator trail for them |
| Container build | `yq` pinned by digest; amd64 and arm64 only | Only for self-built images on other architectures |
| Markdown secrets | Shipped off (`MARKDOWN_ENABLED`) | None |

## The Upgrade Checklist

Steps 1 and 2 run on your current version, before you upgrade.

1. **If `DOMAINS_VALIDATION_STRATEGY` is `approximated` or `caddy_on_demand`:**
   find the domains that will stop being served, and re-verify them.

   ```bash
   bin/ots domains list --unverified    # domains that will answer 404
   bin/ots domains verify --all         # records domains whose TXT record is in place
   bin/ots domains orphaned             # records with no organization, never served
   ```

   A domain whose customer removed the TXT record after verifying has been
   unverified but still served; after the upgrade it answers 404, its existing
   secret links stop opening there, and the API refuses it as `share_domain`. For
   the domains still unverified after `verify --all`, ask the customer to restore
   the TXT record, or mark the domain verified through the Colonel domain override.

   :::caution
   `DOMAINS_SERVE_UNVERIFIED=true` keeps serving every domain that has an
   organization, verified or not, and logs a warning at boot. Only the exact value
   `true` enables it. It never serves a record with no organization.
   :::

2. **If magic links are on and a proxy sits in front of the application,** set
   `TRUSTED_PROXY_ENABLED=true` with the ranges of every proxy that forwards to it
   in `TRUSTED_PROXY_CIDRS`, including the one in front of custom domains.

   ```bash
   TRUSTED_PROXY_ENABLED=true
   TRUSTED_PROXY_CIDRS=10.0.0.0/8
   ```

   Without it, every visitor shares the proxy's address, and after 30 magic-link
   requests in an hour everyone gets 429 for the next hour. If you cannot trust the
   proxy yet, raise `EMAIL_LOGIN_REQUEST_RATE_LIMIT_MAX_PER_IP` or set
   `EMAIL_LOGIN_REQUEST_RATE_LIMIT_ENABLED=false`. The password-reset limiter has
   resolved addresses the same way since v0.26.3: if your logs show no reset
   cap-hits ending `NOTE: site.network.trusted_proxy is not enabled`, the canonical
   host is fine.

   :::caution
   Only the exact value `false` turns a limiter off. `0`, `no` and `FALSE` leave it
   on. The same applies to `SSO_DIAGNOSTICS_RATE_LIMIT_ENABLED` and
   `SENDER_TEST_EMAIL_RATE_LIMIT_ENABLED`.
   :::

3. **Upgrade.**

4. **Only if you have custom domains registered before v0.26.14:** backfill the
   canonical name index, following
   `docs/runbooks/custom-domain-canonical-index-backfill.md`. The dry run can run
   while the application is up; `--apply` runs with it stopped.

   ```bash
   bin/ots domains backfill-canonical-index          # report only
   # stop the application, snapshot the datastore
   bin/ots domains backfill-canonical-index --apply
   bin/ots domains doctor --all
   ```

   Resolve any `collision` or `conflict` rows by hand as the runbook describes,
   run `--apply` again, then start the application. Keep the index-rebuild job's
   `auto_repair` off.

5. **Only if account deletions failed partway on an earlier version:** in full
   mode they log the `account_close_cleanup_partial` auth event at error level;
   operator purges record a `customer.purge` audit entry with status `partial`.
   Retry each with `bin/ots customers purge-one <email>`.

6. **Only if you ever ran the index-rebuild job with `auto_repair: true`:** sign-in
   by email and password reset fail for the records it moved. Run
   `bin/ots org doctor --all --repair` and `bin/ots customers doctor --all --repair`
   (resolve duplicate customers first), or let the fixed job run once with
   `auto_repair` on.

7. **Only if you build your own image on an architecture other than amd64 or
   arm64:** add a case for it, with the release asset's SHA-256, to the `yq` step
   in `docker/base.dockerfile`.

## Verify

1. Open one verified custom domain and confirm it renders branded.
2. Request a magic link on the canonical host and on a custom domain, and confirm
   both arrive.
3. If you ran the backfill, `bin/ots domains doctor --all` reports no
   `canonical_index_*` findings.

## Config Mapping Reference

### New configuration

| Variable | Default | Purpose |
| :--- | :--- | :--- |
| `DOMAINS_SERVE_UNVERIFIED` | off | Serve custom domains with an organization whatever their ownership state; only `true` enables it |
| `EMAIL_LOGIN_REQUEST_RATE_LIMIT_ENABLED` | on | Magic-link request limiter |
| `EMAIL_LOGIN_REQUEST_RATE_LIMIT_MAX_PER_IP` | `30` | Requests per window per client IP |
| `EMAIL_LOGIN_REQUEST_RATE_LIMIT_MAX_PER_EMAIL` | `90` | Per address; keep at least twice the IP cap |
| `EMAIL_LOGIN_REQUEST_RATE_LIMIT_WINDOW` / `_LOCKOUT` | `3600` | Seconds; keep lockout at least the window |
| `SSO_DIAGNOSTICS_RATE_LIMIT_*` | 10/hour per customer | SSO configuration checks |
| `SENDER_TEST_EMAIL_RATE_LIMIT_*` | 10/hour per account | Domain "Send test" emails |
| `REDIS_REQUIRE_TLS` / `VALKEY_REQUIRE_TLS` | off | Refuse to boot without `rediss://` or `valkeys://`; only `true` enables it |
| `OIDC_CLIENT_AUTH_METHOD` | `client_secret_basic` | Platform OIDC: `client_secret_basic` or `client_secret_post` |
| `MARKDOWN_ENABLED` | off | Markdown secrets; only `true` enables it |

`.env.reference` is canonical. Nothing was renamed or removed.

## Troubleshooting

### A custom domain answers "This domain is not configured"

The log shows `[DomainStrategy] custom domain not served` with `reason: unverified`
or `reason: orphan`. For `unverified`, have the customer publish the TXT record
shown on the domain's verification page and run `bin/ots domains verify <domain>`,
or use the Colonel override. For `orphan`, the record has no organization; adopt it
with `bin/ots domains transfer <domain> --to-org <org>` or
`bin/ots domains repair --org-id`. Adoption issues
a new TXT value, so the new owner verifies again before the domain is served.

### Magic-link requests return 429 for everyone

If the error log line for the cap ends with
`NOTE: site.network.trusted_proxy is not enabled`, the limiter is counting the
proxy's address. Follow step 2. To clear the lock now, pass the masked address
(the /24 for IPv4, such as `172.18.0.0`) to
`bin/ots ratelimit keys email_login_request_ip 172.18.0.0`, which prints the
`valkey-cli` commands for that entry.

### One user cannot get a magic link for an hour

The per-address tier locks an address for an hour after 90 requests in an hour,
counted across all sources. To clear it, pass the normalized address (trimmed,
lowercased) to `bin/ots ratelimit keys email_login_request_email user@example.com`.

### Boot logs "Redis/Valkey URI does not use TLS"

Informational unless `REDIS_REQUIRE_TLS=true` is set. Switch the URI to
`rediss://` and set `REDIS_REQUIRE_TLS=true` to make plaintext a boot failure.

## Rollback

Pin `v0.26.16`. No migration ran, and v0.26.16 ignores the data and variables this
release adds; it also reads the backfilled index entries as before. After a
rollback, unverified custom domains with an organization are served again.
