---
title: Upgrading to v0.26.14
description: Full mode adds one auth column at boot and rolling back needs a schema step; the domain refresh job now walks every domain, and caddy_on_demand checks ownership.
audience: operator
pageType: how-to
sourceOfTruth: onetimesecret/apps/web/auth/migrations/011_active_session_remember_until.rb and apps/web/auth/migrator.rb (boot-time migration, Sequel IntegerMigrator refuses a schema version above its files); onetimesecret/lib/onetime/jobs/scheduled/domain_refresh_job.rb (first run 2 minutes after the scheduler starts, paged walk over every domain); onetimesecret/lib/onetime/operations/verify_domain.rb (vhost creation on a missing vhost, dry runs skip only storing); onetimesecret/lib/onetime/domain_validation/caddy_on_demand_strategy.rb (TXT ownership check and the never-confirmed rule); onetimesecret/lib/onetime/models/custom_domain/sso_config.rb (tenant SSO requires a verified domain; SAML is a tenant provider type); onetimesecret/etc/defaults/config.defaults.yaml (site.session.absolute_timeout, jobs.domain_refresh); onetimesecret/lib/onetime/log_scrubber.rb (URI masking)
sidebar:
  order: 14
---

Full [authentication mode](./simple-or-full-auth) adds one nullable column to the auth
database at boot, and **rolling back to v0.26.13 now needs a schema step** (see
[Rollback](#rollback)). The domain refresh job walks every custom domain instead of
the newest 200. SAML sign-in is new and off unless `SAML_ENABLED=true`; see
[per-install SSO](https://github.com/onetimesecret/onetimesecret/blob/v0.26.14/docs/authentication/per-install-sso.md).
The `caddy_on_demand` validation strategy now works: it checks each domain's TXT
record and reports resolving and certificate status itself.

Coming from v0.24 or earlier? Start with the [v0.24.0 upgrade guide](./upgrading-v0-24).
Coming from v0.26.11 or earlier, read the [v0.26.12 upgrade guide](./upgrading-v0-26-12) first.
Coming from v0.26.12 or earlier, also read the
[v0.26.13 release notes](https://github.com/onetimesecret/onetimesecret/releases/tag/v0.26.13);
their rollback line is wrong for full mode, and the [Rollback](#rollback) section
below covers that release too.

## Before You Start

1. Back up the auth database (full mode) and the Redis/Valkey datastore.
2. Record your current tag.
3. Note your `DOMAINS_VALIDATION_STRATEGY` and how many custom domains you serve.
4. Note whether you run `bin/ots scheduler`. The S6 image and
   `docker-compose.full.yml` run it by default, and neither `JOBS_ENABLED` nor
   `JOBS_SCHEDULER_ENABLED` stops it. Its first domain refresh runs 2 minutes after
   it starts.

## What Changes

| Area | Change | Action required? |
| :--- | :--- | :--- |
| Auth schema (full mode) | `remember_until` column added to `account_active_session_keys` at boot | Confirm the migrations role owns the table |
| Domain refresh | Walks every domain, one page of `batch_size` per run | Only past `batch_size` domains on `approximated` |
| Colonel overrides | Now hold through failed checks; overrides set before the upgrade do not | Re-apply |
| `caddy_on_demand` | Checks the TXT record; looks up A/AAAA and completes a TLS handshake on port 443 | Only if you use it |
| Tenant SSO | Offered only on verified custom domains, where the callback can complete | None |
| Sessions | Remember me lasts 14 days from sign-in; every session ends 30 days after sign-in | Simple mode: expect some sign-outs |
| Signup (full mode) | Browser signup works with `AUTH_VERIFY_ACCOUNT_ENABLED=false` | Only if signup should stay closed |
| Verification outages | `503` with `Retry-After: 5` where it was `401` | Update alerts |
| Duplicate session cookies | Refused with `403` by default | None, normally |

## The Upgrade Checklist

1. **Only if you run full mode:** confirm the role behind
   `AUTH_DATABASE_URL_MIGRATIONS` (or `AUTH_DATABASE_URL` when that is unset) owns
   `account_active_session_keys`, or apply migration 011 by hand before starting.
   It runs at boot and a failure stops boot. Without the column, every signed-in
   request answers `401`.

2. **Only if you use `approximated` with more domains than `batch_size` (200):** the
   first walk reaches domains the old job never refreshed. Some may lose verified or
   change resolving status, and missing virtual hosts are created on Approximated.
   When Approximated cannot be reached, the application now looks up the TXT record
   itself, so the host needs working nameservers.

   :::caution
   `bin/ots domains verify --dry-run` under `approximated` still calls the
   Approximated API and can create virtual hosts. It only leaves the domain record
   unchanged.
   :::

3. **Only if you set Colonel verification overrides before this release:** set
   them again after upgrading. Older overrides wrote `verified` only and do not hold.

4. **Only if you use `caddy_on_demand`:** give the application host nameservers in
   `/etc/resolv.conf`, outbound DNS, and outbound TCP 443 to the custom domains it
   serves. Each domain needs its TXT record; `bin/ots domains verify <domain> --dry-run`
   prints the expected host and value, and owners see them on the domain's
   verification page.

   :::caution
   If you made `caddy_on_demand` serve certificates on an earlier release by setting
   domains to resolving in the Colonel console, those domains lose verified on their
   first check unless their TXT record is published, and an unanswered lookup at that
   first check counts against them too. Publish the records, or set the verification
   override after upgrading.
   :::

5. **Only if you are moving from `approximated` to `caddy_on_demand`:** upgrade
   while still on `approximated` and let one full verify pass finish
   (`bin/ots domains verify --all`) before switching. That pass records which
   domains are proven; without it, the first unanswered lookup under
   `caddy_on_demand` withdraws verified. Changing the strategy deletes nothing on
   Approximated. With `approximated.api_key` and `proxy_ip` or `proxy_host` still
   configured, remove the old virtual hosts with:

   ```bash
   # Dry run lists candidates; set the variable to delete
   APPROXIMATED_VHOST_CLEANUP=apply bin/ots housekeeping run Onetime::CustomDomain remove_orphaned_approximated_vhosts
   ```

6. **Only if you run full mode with `AUTH_VERIFY_ACCOUNT_ENABLED=false`:** browser
   signup now works. It failed with `422 "logins do not match"` from v0.24.0
   through v0.26.13, though API clients could sign up. To keep signup closed, set
   `AUTH_SIGNUP=false`. A custom domain allows signup only when its own signup
   setting is enabled, which it is not by default.

7. **Only if you alert on `401`s or front the API with a proxy or CDN:** a request
   whose session cannot be verified (datastore or auth database unreachable) now
   answers `503` with `Retry-After: 5` instead of `401`. Update alerts, and make
   sure the proxy passes origin `503` bodies through; the browser client reads the
   body to tell an outage from a sign-out.

8. **Only if you run simple mode:** sessions signed in more than 30 days ago end on
   their first request after the upgrade. Set `SESSION_ABSOLUTE_TIMEOUT` to change
   the bound.

9. **Only if you parse logs:** URIs anywhere in a log event now read
   `scheme://***@host` and `path?***`. Request `path` fields are unchanged. With
   `LOG_HTTP_CAPTURE=debug`, capture lines containing URLs can lose the fields after
   them or no longer parse as JSON.

10. **Only if you read `had_valid_session` from `GET /bootstrap/me`:** it is gone;
    read `auth_status` instead.

11. **Only if you start processes from `Procfile.production`:** it is now
    `Procfile.example`.

## Verify

1. Full mode: the boot log shows the auth migration reaching version 11. Sign in,
   reload, and the session persists.
2. `bin/ots domains verify <domain>` reports `yes` for a domain with its TXT record.
3. A verified custom domain with organization SSO shows its SSO button on its
   sign-in page.
4. Full mode: sign in with "Remember me" ticked; the sessions page marks the
   session as remembered.

## Config Mapping Reference

| Setting | Status | Default | Notes |
| :--- | :--- | :--- | :--- |
| `SESSION_ABSOLUTE_TIMEOUT` (`site.session.absolute_timeout`) | New | `2592000` (30 days) | Seconds since sign-in. `0` disables. Invalid values use the default. |
| `SAML_ENABLED` | New | `false` | Turns SAML on for the platform and every custom domain. Any value outside the boolean vocabulary fails boot. |
| `SAML_IDP_SSO_SERVICE_URL`, `SAML_IDP_ENTITY_ID`, `SAML_IDP_CERT` and optional `SAML_*` | New | unset | Platform SAML, with `SAML_ENABLED=true`. See `.env.reference`. |
| `MIDDLEWARE_COOKIE_TOSSING` | Changed | on | A request carrying the session cookie twice gets `403` and the cookie is cleared for the host and its parent domains. Only `false` turns it off. |
| `jobs.domain_refresh.dns_propagation_window` | New | `24h` | Re-checks new, not-yet-verified domains with spare capacity. `'0'` disables. |
| `jobs.domain_refresh.rate_limit` | Changed | unset | Unset uses the strategy's pause (0.5 s `approximated`, none otherwise). An explicit `0.5` keeps applying under every strategy. |
| `AUTH_REMEMBER_ME_ENABLED` | Changed | on | Now applies in simple mode too. Only `false` turns it off. |

## Troubleshooting

### Every signed-in request returns 401 after upgrading (full mode)

Migration 011 has not been applied. The log reads
`[active_session_gate] authdb unreachable, active-session row unchecked, Rack session refused`,
with a `remember_until` column error as the reason: the database is reachable and
the column is missing. Apply the migration as the table's owner, then restart.

### A custom domain lost verified status

Run `bin/ots domains verify <domain>`. `no` means the TXT record is missing or
different. `indeterminate` means the lookup got no answer; check the host's resolver
and DNS egress. Either publish the record or set the Colonel override.

### Tenant SSO is not offered on a custom domain

The domain is not verified. The log carries `omniauth_tenant_sso_not_enabled` with
`reason=domain_unverified`. Verify the domain first.

### Users get `403 Forbidden` once and are signed out

The request carried the session cookie more than once. The session cookie is
host-only, so a second copy comes from something on a parent domain setting a
cookie with the same name. The `403` clears both, and the next request starts a
fresh session. If it keeps happening, find what sets the other cookie, or set
`MIDDLEWARE_COOKIE_TOSSING=false`.

### SSO fails when started from a secondary hostname

SSO callback URLs now use `site.host` unless the request is on a verified custom
domain or a configured canonical host. Start sign-in from one of those, or register
`site.host`'s callback at the IdP.

## Rollback

In simple mode, pin the previous tag and restart.

In full mode, v0.26.13 does not boot while the auth schema is at version 11. Stop
every v0.26.14 process (once the column is gone they refuse every signed-in
request), then run as the table owner:

```sql
BEGIN;
ALTER TABLE account_active_session_keys DROP COLUMN remember_until;
UPDATE schema_info SET version = 10;
COMMIT;
```

Rolling v0.26.13 back to v0.26.12 needs the same step: drop `surface_scope` and `rp_id`
from `account_webauthn_keys` and set the version to 8.

After a rollback, Colonel overrides stop holding again, and remembered sessions fall
back to the 24-hour idle lifetime.

:::caution
If you switched to `caddy_on_demand` while running v0.26.14, v0.26.13 marks every
domain verified again on its next check and keeps the resolving status v0.26.14
recorded, so the ACME endpoint authorizes certificates for domains that never proved
ownership.
:::
