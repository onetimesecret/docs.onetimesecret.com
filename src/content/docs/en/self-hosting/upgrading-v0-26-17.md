---
title: Upgrading to v0.26.17
description: Under the ownership-checking strategies custom domains are served only once ownership is verified, domains with no organization are no longer served, magic-link requests are rate limited by default, and older custom domains need an index backfill with the application stopped.
audience: operator
pageType: how-to
sourceOfTruth: onetimesecret/lib/onetime/models/custom_domain/serving_policy.rb (served only once ownership_verified under approximated or caddy_on_demand, registration enough under passthrough, a record with no organization never served under any strategy, DOMAINS_SERVE_UNVERIFIED serves records with an organization and logs custom_domain.serve_unverified_enabled once at boot); onetimesecret/lib/onetime/middleware/domain_strategy.rb (404 with "This domain is not configured" and the "[DomainStrategy] custom domain not served" INFO line with reason unverified or orphan, where v0.26.16 served every record it found); onetimesecret/apps/api/v2/logic/secrets/base_secret_action.rb (an unserved share_domain is refused); onetimesecret/lib/onetime/operations/verify_domain.rb (a failed TXT check clears ownership_verified unless a Colonel override holds it, the same on v0.26.16, and records with no organization skipped); onetimesecret/apps/api/colonel/logic/colonel/override_domain_verification.rb (Colonel domain override); onetimesecret/apps/web/auth/lib/public_host.rb (auth links name only a verified custom domain, so links requested on an unverified domain point at the canonical host, whatever DOMAINS_SERVE_UNVERIFIED says); onetimesecret/lib/onetime/cli/domains/list_command.rb, verify_command.rb and orphaned_command.rb (list --unverified, verify --all, verify DOMAIN and orphaned, all present on v0.26.16); onetimesecret/lib/onetime/cli/domains/transfer_command.rb and repair_command.rb (transfer DOMAIN --to-org and repair DOMAIN --org-id adopt a record with no organization); onetimesecret/changelog.d/20261014_090000_claude_custom_domain_served_when_verified.rst and 20261014_060000_claude_orphaned_domain_adoption.rst (keep the TXT record, verify --all after a strategy switch, adding a domain no longer adopts, adoption issues a new TXT value); onetimesecret/docs/runbooks/custom-domain-canonical-index-backfill.md, lib/onetime/cli/domains/backfill_canonical_index_command.rb and lib/onetime/cli/domains/doctor_command.rb (domains registered before v0.26.14, dry run while running, --apply with the application stopped, collision and conflict resolved by hand, auto_repair off during the backfill, canonical_index_* findings); onetimesecret/lib/onetime/models/custom_domain.rb (lookups fall back to the canonical index, and v0.26.16 reads it the same way); onetimesecret/etc/defaults/config.defaults.yaml (DOMAINS_VALIDATION_STRATEGY passthrough, serve_unverified, require_verified, markdown.enabled and redis.require_tls only for the exact value true, email_login_request_rate_limit 30 per IP and 90 per address over 3600 seconds with a 3600-second lockout and on unless exactly false, sso_diagnostics and sender_test_email 10 per customer per hour, config key paths); onetimesecret/.env.reference (trusted proxy filter mode takes the leftmost untrusted entry, RFC 1918, loopback and link-local trusted by default, the edge must overwrite X-Forwarded-For, ratelimit keys only prints commands, the colonel reset, and only new variables, none renamed or removed); onetimesecret/lib/onetime/security/reset_request_rate_limiter.rb and apps/web/auth/config/hooks/email_login_request.rb (per masked client IP and per normalized address before account lookup, the cap-hit line with the site.network.trusted_proxy NOTE and text after it, the log shows the first two octets); onetimesecret/lib/onetime/operations/ratelimit/registry.rb and lib/onetime/cli/ratelimit_command.rb (email_login_request_ip and email_login_request_email kinds, /24 IPv4 and /48 IPv6 subjects, strip plus NFC plus case-fold addresses, Customer database); onetimesecret/changelog.d/20261012_000300_claude_m03_login_request_enumeration.rst and apps/web/auth/config/overrides/login_request_enumeration.rb (same answer whether or not the account exists, no_matching_login and the recently-sent error gone); onetimesecret/changelog.d/20261012_000400_claude_m04_email_login_rate_limit.rst (the POST /auth/login link for an account without a password counts against the limit); onetimesecret/lib/onetime/initializers/configure_familia.rb (warning for a dotted hostname or public IP, info for private, CGNAT or link-local addresses and single-label names, hostnames not resolved, boot refused when TLS is required); onetimesecret/lib/onetime/sso_provider/oidc.rb and lib/onetime/models/custom_domain/sso_config.rb (OIDC_CLIENT_AUTH_METHOD client_secret_basic by default or client_secret_post, an unknown value logged and ignored, token_endpoint_auth_method absent on v0.26.16); onetimesecret/changelog.d/20261012_165455_claude_4764_entra_secret_request_body.rst (Entra ID sends the secret in the request body, AADSTS7000215 with the header); onetimesecret/apps/web/auth/config/hooks/account.rb (account_close_cleanup_partial at error level); onetimesecret/apps/web/auth/operations/customers/purge.rb and lib/onetime/cli/customers/purge_one_command.rb (customer.purge audit with status partial, a purge-one retry finishes); onetimesecret/lib/onetime/jobs/scheduled/maintenance/index_rebuild_job.rb and changelog.d/20261013_221030_claude_index_rebuild_auto_repair.rst (auto_repair moved the customer email, organization contact email and custom domain name indexes, one run of the fixed job moves them back); onetimesecret/lib/onetime/cli/org/doctor_command.rb and lib/onetime/cli/customers/doctor_command.rb (doctor --all --repair); onetimesecret/changelog.d/20261013_140500_claude_sso_diagnostics_follow_ups.rst (self-service actions move to the security audit trail); onetimesecret/docker/base.dockerfile (yq checked by SHA-256 for amd64 and arm64)
sidebar:
  order: 17
---

v0.26.17 adds SSO self-diagnostics for custom domains and closes several security
findings. No migration runs. Three changes can stop traffic if you skip them:
under the `approximated` and `caddy_on_demand` validation strategies, custom
domains whose ownership is not verified stop being served; under every strategy,
custom domain records with no organization stop being served; and magic-link
requests are now rate limited by client IP. Installs with custom domains
registered before v0.26.14 run one step after the upgrade, in a short maintenance
window: a backfill of the custom-domain name index. Rollback is a tag swap, with
the SSO caveats in [Rollback](#rollback).

Coming from v0.26.14 or earlier, read the [v0.26.15 upgrade guide](/en/self-hosting/upgrading-v0-26-15/) first.
Coming from v0.26.15 or earlier, also read the
[v0.26.16 release notes](https://github.com/onetimesecret/onetimesecret/releases/tag/v0.26.16);
their deployment notes cover the simple-mode session ID change and the SSO email repair.

## Before You Start

1. Back up the Redis/Valkey datastore.
2. Record your current tag.
3. Note your `DOMAINS_VALIDATION_STRATEGY` (`passthrough` by default) and how
   many custom domains you serve.
4. Note your [authentication mode](/en/self-hosting/simple-or-full-auth/) (`AUTHENTICATION_MODE`)
   and whether `AUTH_EMAIL_AUTH_ENABLED=true` (magic links).
5. Note whether a reverse proxy sits in front of the application and whether
   `TRUSTED_PROXY_ENABLED=true` is set.

## What Changes

| Area | Change | Action required? |
| :--- | :--- | :--- |
| Custom domains | Under `approximated` or `caddy_on_demand`, a domain is served only once its ownership is verified, and stops being served when a later check cannot find its TXT record; others answer 404 | Verify before upgrading |
| Custom domains | Under every strategy, a domain record with no organization is not served, and adding a domain no longer adopts one | Review before upgrading |
| Custom domains | One-time backfill of the canonical name index | Only for domains registered before v0.26.14; after upgrading, application stopped |
| Magic links | 30/hour per client IP and 90/hour per address, each with a one-hour lockout, on by default; the sign-in link `POST /auth/login` sends to an account without a password counts too | Confirm client IPs resolve |
| Account deletion | Purges stopped by legacy membership references can now finish | Retry any partial purges |
| Auth API | Magic-link and verify-resend requests answer "sent" whether or not the account exists; `no_matching_login` and the "recently sent" error are no longer returned | Only if an API client reads those errors |
| Datastore | A plaintext `redis://` URI logs a warning at boot when its host is a dotted hostname or a public IP | None |
| Audit | Customer self-service actions move to the security audit trail | Only if you read the operator trail for them |
| Container build | `yq` pinned by digest; amd64 and arm64 only | Only for self-built images on other architectures |
| Markdown secrets | Shipped off (`MARKDOWN_ENABLED`) | None |

## The Upgrade Checklist

Steps 1 to 3 run on your current version, before you upgrade.

1. **Only if you serve custom domains:** find the records with no organization. After
   the upgrade they are not served, under any validation strategy.

   ```bash
   bin/ots domains orphaned
   ```

   Adopt each one still in use with `bin/ots domains transfer <domain> --to-org <org>`
   or `bin/ots domains repair <domain> --org-id <org>`. Adoption issues a new TXT
   value; under `approximated` or `caddy_on_demand` the organization verifies the
   domain again before it is served. After the upgrade, a customer who adds a
   domain held by such a record is told it is registered to another organization,
   so adopt it for them.

2. **Only if `DOMAINS_VALIDATION_STRATEGY` is `approximated` or `caddy_on_demand`:**
   record the domains whose TXT record is in place, then list the ones that will
   stop being served.

   ```bash
   bin/ots domains verify --all         # verifies domains whose TXT record is in place, unverifies those whose record is gone
   bin/ots domains list --unverified    # domains that will answer 404
   ```

   A domain whose customer removed the TXT record after verifying has been
   unverified but still served; after the upgrade it answers 404, its existing
   secret links stop opening there, and the API refuses it as `share_domain`. For
   the domains still unverified, ask the customer to restore the TXT record, or
   mark the domain verified through the Colonel domain override. From now on a
   domain stops being served whenever a check no longer finds its TXT record,
   unless the override holds it, so customers must keep the record in place. If
   you later switch `DOMAINS_VALIDATION_STRATEGY`, run
   `bin/ots domains verify --all` before the deployment takes traffic.

   :::caution
   `DOMAINS_SERVE_UNVERIFIED=true` keeps serving every domain that has an
   organization, verified or not, and logs a warning at boot. Only the exact value
   `true` enables it. It never serves a record with no organization, and links in
   account emails requested on an unverified domain still point at the canonical
   host.
   :::

3. **Only if magic links are on and a proxy sits in front of the application:**
   set `TRUSTED_PROXY_ENABLED=true`. Proxies on private, loopback and link-local
   addresses are then trusted. Add the ranges of any proxy that connects to the
   application from a public address, including the one in front of custom
   domains, to `TRUSTED_PROXY_CIDRS`.

   ```bash
   TRUSTED_PROXY_ENABLED=true
   # Only for proxies that connect from a public address:
   TRUSTED_PROXY_CIDRS=203.0.113.0/24
   ```

   The proxy that receives requests from the internet must overwrite
   `X-Forwarded-For` with the address the request came from: nginx
   `proxy_set_header X-Forwarded-For $remote_addr;`, Caddy
   `header_up X-Forwarded-For {client_ip}`. The application takes the leftmost
   entry that is not a trusted proxy, so a proxy that appends lets a client choose
   its own address and get past the per-IP limit. A trusted proxy's
   `X-Forwarded-Host` is read as well; it must follow the rules in step 1 of the
   [v0.26.15 upgrade guide](/en/self-hosting/upgrading-v0-26-15/).

   Without trust, every visitor shares the proxy's address, and after 30
   magic-link requests in an hour everyone gets 429 for the next hour. If you
   cannot trust the proxy yet, raise `EMAIL_LOGIN_REQUEST_RATE_LIMIT_MAX_PER_IP` or
   set `EMAIL_LOGIN_REQUEST_RATE_LIMIT_ENABLED=false`.

4. **Upgrade.**

5. **Only if you have custom domains registered before v0.26.14:** backfill the
   canonical name index, following the
   [canonical index backfill runbook](https://github.com/onetimesecret/onetimesecret/blob/v0.26.17/docs/runbooks/custom-domain-canonical-index-backfill.md).
   The dry run can run
   while the application is up; `--apply` runs with it stopped.

   ```bash
   bin/ots domains backfill-canonical-index          # report only
   # stop the application, snapshot the datastore
   bin/ots domains backfill-canonical-index --apply
   bin/ots domains doctor --all
   ```

   Resolve any `collision` or `conflict` rows by hand as the runbook describes,
   run `--apply` again, then start the application. Keep the index-rebuild job's
   `auto_repair` off during the backfill.

6. **Only if account deletions failed partway on an earlier version:** in full
   mode they log the `account_close_cleanup_partial` auth event at error level;
   operator purges record a `customer.purge` audit entry with status `partial`.
   Retry each with `bin/ots customers purge-one <email>`.

7. **Only if you ever ran the index-rebuild job with `auto_repair: true`:** it
   moved the entries of the customer email, organization contact email and custom
   domain name indexes to keys that lookups never read, so sign-in by email and
   password reset fail for the records it moved. After step 5, either let the
   fixed job run once with `auto_repair` on, which moves all three back, then turn
   it off again; or run `bin/ots org doctor --all --repair` and
   `bin/ots customers doctor --all --repair` (resolve duplicate customers first).
   The doctor commands leave the custom domain name index as it is; domains then
   resolve through the canonical index.

8. **Only if you build your own image on an architecture other than amd64 or
   arm64:** add a case for it, with the release asset's SHA-256, to the `yq` step
   in `docker/base.dockerfile`.

## Verify

1. Open one verified custom domain and confirm it renders branded.
2. Request a magic link on the canonical host and on a custom domain, and confirm
   both arrive.
3. If you ran the backfill, `bin/ots domains doctor --all` reports no
   `canonical_index_*` findings.

## Config Mapping Reference

| Setting | Status | Default | Notes |
| :--- | :--- | :--- | :--- |
| `DOMAINS_SERVE_UNVERIFIED` (`features.domains.serve_unverified`) | New | `false` | Serves custom domains with an organization whatever their ownership state, and logs a warning at boot. Only `true` enables it. |
| `DOMAINS_REQUIRE_VERIFIED` (`features.domains.require_verified`) | Changed | `false` | When `false`, a `share_domain` must still be a served domain. |
| `EMAIL_LOGIN_REQUEST_RATE_LIMIT_ENABLED` (`site.authentication.email_login_request_rate_limit`) | New | on | Magic-link request limiter. Only `false` turns it off; `0`, `no` and `FALSE` leave it on. |
| `EMAIL_LOGIN_REQUEST_RATE_LIMIT_MAX_PER_IP` | New | `30` | Requests per window per client IP. |
| `EMAIL_LOGIN_REQUEST_RATE_LIMIT_MAX_PER_EMAIL` | New | `90` | Requests per window per address. Keep it at least twice the IP cap. |
| `EMAIL_LOGIN_REQUEST_RATE_LIMIT_WINDOW`, `_LOCKOUT` | New | `3600` | Seconds. Keep the lockout at least the window. |
| `SSO_DIAGNOSTICS_RATE_LIMIT_*` (`features.organizations.sso_diagnostics_rate_limit`) | New | 10 per hour per customer | SSO configuration checks. Only `false` turns `_ENABLED` off. |
| `SENDER_TEST_EMAIL_RATE_LIMIT_*` (`features.organizations.sender_test_email_rate_limit`) | New | 10 per hour per customer | Domain "Send test" emails. Only `false` turns `_ENABLED` off. |
| `REDIS_REQUIRE_TLS`, `VALKEY_REQUIRE_TLS` (`redis.require_tls`) | New | `false` | Refuses to boot without `rediss://` or `valkeys://`. Only `true` enables it. |
| `OIDC_CLIENT_AUTH_METHOD` | New | unset (`client_secret_basic`) | Platform OIDC: `client_secret_basic` or `client_secret_post`. An unknown value is logged at boot and treated as unset. |
| `MARKDOWN_ENABLED` (`features.markdown.enabled`) | New | `false` | Markdown secrets. Only `true` enables it. |

`.env.reference` is canonical. Nothing was renamed or removed.

## Troubleshooting

### A custom domain answers "This domain is not configured"

The log shows `[DomainStrategy] custom domain not served` with `reason: unverified`
or `reason: orphan`. For `unverified`, have the customer publish the TXT record
shown on the domain's verification page and run `bin/ots domains verify <domain>`,
or use the Colonel override. For `orphan`, the record has no organization; adopt it
with `bin/ots domains transfer <domain> --to-org <org>` or
`bin/ots domains repair <domain> --org-id <org>`. Adoption issues a new TXT value;
under `approximated` or `caddy_on_demand` the new owner verifies the domain again
before it is served.

### Magic-link requests return 429 for everyone

If the error log line for the cap contains
`NOTE: site.network.trusted_proxy is not enabled`, the limiter is counting the
proxy's address. Follow step 3. To clear the lock now, find the locked entry and
pipe its clear command to `valkey-cli`. The log line shows only the first two
parts of the address; the key names it masked to /24 for IPv4 (such as
`172.18.0.0`) or /48 for IPv6.

```bash
URL="${VALKEY_URL:-$REDIS_URL}"; URL="${URL%%\?*}"   # add -n <db> if you set VALKEY_DBS_CUSTOMER or REDIS_DBS_CUSTOMER
valkey-cli -u "$URL" --scan --pattern 'email_login_request:locked:ip:*'
bin/ots ratelimit keys email_login_request_ip 172.18.0.0 | grep -v '^#' | valkey-cli -u "$URL"
```

`bin/ots ratelimit keys` only prints the commands. A colonel can instead reset the
entry through `POST /api/colonel/ratelimit/reset` with `kind=email_login_request_ip`.

### One user cannot get a magic link for an hour

The per-address tier locks an address for an hour after 90 requests in an hour,
counted across all sources. To clear it, pass the normalized address (trimmed,
NFC-normalized and case-folded) and pipe the output as above:

```bash
bin/ots ratelimit keys email_login_request_email user@example.com | grep -v '^#' | valkey-cli -u "$URL"
```

### Boot logs "Redis/Valkey URI does not use TLS"

The warning appears when the URI's host is a dotted hostname or a public IP. A
private, CGNAT or link-local address, or a single-label name such as `redis`,
logs at info level instead. Hostnames are not resolved, so a dotted name warns
even when it points at a private network. Either is informational unless
`REDIS_REQUIRE_TLS=true` is set. Switch the URI to `rediss://` and set
`REDIS_REQUIRE_TLS=true` to make plaintext a boot failure.

## Rollback

Pin the tag you recorded. No migration ran; earlier releases ignore the data and
variables this release adds, and v0.26.16 reads the backfilled index entries as
before. After a rollback, custom domains that are unverified or have no
organization are served again. Rolling back to v0.26.14 or earlier also needs the
[v0.26.15 datastore step](/en/self-hosting/upgrading-v0-26-15/#rollback).

Two SSO behaviours do not survive the rollback:

- A custom domain whose SSO form sets the token endpoint authentication method to
  `client_secret_post`, and the platform provider with
  `OIDC_CLIENT_AUTH_METHOD=client_secret_post`, send the client secret in the
  `Authorization: Basic` header again. Sign-in fails at an identity provider that
  accepts only the request body.
- Microsoft Entra ID sign-in sends the secret in the header again, so a client
  secret containing `+` or `%` is refused with AADSTS7000215. Rotate such a secret
  before rolling back.

If you turned the index-rebuild job's `auto_repair` on for step 7, turn it off
before rolling back; earlier releases run the broken job.
