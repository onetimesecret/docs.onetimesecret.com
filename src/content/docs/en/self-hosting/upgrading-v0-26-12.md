---
title: Upgrading to v0.26.12
description: "Upgrade Onetime Secret to v0.26.12: a session-token disclosure fix, and Rodauth's active-session table becomes load-bearing on every authenticated request in full authentication mode. No database migration is required."
sidebar:
  order: 9
---

v0.26.12 fixes a session-token disclosure present since the v0.25 line, and makes
Rodauth's active-session table load-bearing on every authenticated request in `full`
authentication mode. There is no schema migration and no dependency change, so rollback is
a tag swap.

Upgrading from a release earlier than v0.26.11? Work forward through the guides for the
releases you are skipping, then return here. From v0.22 or v0.23, start with
[v0.24.0](./upgrading-v0-24). From anywhere in the v0.26 line, complete
[v0.26.6](./upgrading-v0-26) and then [v0.26.11](./upgrading-v0-26-11). Each of those
carries configuration work this guide assumes is already done.

## Before You Start

1. Back up Redis/Valkey and, in `full` mode, the authentication database.
2. Record your current tag: `docker compose exec app ots version` (or your `OTS_IMAGE_TAG`).
3. Note your `AUTHENTICATION_MODE`. Most of this guide applies only to `full` (see
   [Simple or Full](./simple-or-full-auth) if you are unsure which mode you run).
4. In `full` mode, note how your authentication database is reached — direct, pooler, or
   failover pair — and who is paged when it goes down. Step 1 depends on it.

## What Changes

| Area | Change | Action required? |
| --- | --- | --- |
| Response headers | Router `404`/`500` fallbacks no longer replay other requests' `Set-Cookie` | Yes — decide on a session sweep |
| Full-mode sessions | Every authenticated request checks the active-session row; an unreachable authdb refuses the request | Yes — verify authdb availability |
| Session deadlines | Inactivity 24h → 72h, now enforced per request; 30-day lifetime enforced per request | No, but expect sign-outs |
| Account deletion | Full-mode Settings deletion posts to `/auth/close-account` | Only if you filter paths at a proxy |
| Colonel API | `details.cache` removed, `refresh=1` ignored, `pagination.capped` added | Only if you script the Colonel API |
| Audit log | Preview and no-change rows carry `dry_run: true` and `outcome: 'no_change'` | Only if you consume `LOG_AUDIT_SYSLOG` |
| New config | `RODAUTH_ADMIN_URL` (optional, outbound links only) | No |

## The Upgrade Checklist

Steps 1 and 2 are ordered by dependency: an authdb that cannot answer will refuse every
signed-in request, which looks like the site being down, so establish that first.

1. **Only in `full` mode — confirm the authentication database is highly available.**
   Every authenticated request now runs one indexed `SELECT` on
   `account_active_session_keys`, plus a throttled `last_use` write at most once per 300
   seconds per session. When the database cannot answer, the request is refused. Before
   this release an authdb outage left existing sessions working from Redis; it no longer
   does. Check connection-pool headroom for your request rate, and add an alert on
   `[active_session_gate] authdb unreachable`.

   :::caution
   Setting `AUTH_ACTIVE_SESSIONS_ENABLED=false` removes this dependency, but it also
   disables per-request revocation enforcement — a revoked session keeps working until it
   expires on its own. Do not use it as an availability workaround.
   :::

2. **Pull `v0.26.12` and restart.** No migration runs. Existing sessions signed in before
   v0.26.10 carry no join key, are deliberately exempt from the new gate, and age out on
   their own, so nobody is mass-logged-out on deploy.

3. **Decide whether to revoke sessions.** Before this release, a `404` or `500` served by
   the router fallback could return session cookies committed on earlier requests, to
   whoever hit that miss. Your access logs hold the fallback-response volume that tells you
   how exposed you were. To clear it: `ots sessions revoke-all <customer>` per account, or
   have users sign out everywhere.

4. **Only if a proxy, WAF, or path allowlist sits in front of the app:** confirm
   `POST /auth/close-account` reaches it. Full-mode account deletion moved there;
   `/api/account/destroy` remains the simple-mode path.

5. **Only if you script the Colonel API:** the Organizations list no longer sends a
   `details.cache` block and accepts `refresh=1` without acting on it. Treat a response
   carrying `pagination.capped: true` as "there may be more", not as a complete list.

6. **Only if you consume the audit syslog stream:** exclude rows carrying `dry_run: true`
   or `outcome: 'no_change'` from operator-action counts. These markers are now applied
   uniformly; `email/sync_provider_feedback` previews carry `dry_run` for the first time.

## Verify

1. Sign in, then revoke that session from `/account/settings/security/sessions` in another
   browser. The first browser should be signed out on its next request, not at expiry.
2. In `full` mode, stop the authentication database on a staging tier. Requests should be
   refused and the log should read `authdb unreachable ... (fail closed)`, not a
   revocation. Start it again; the same browser should work without signing in.
3. `curl -sI https://<host>/definitely-not-a-route` twice from two different clients.
   Neither response should carry a `Set-Cookie` belonging to the other.
4. If you set `RODAUTH_ADMIN_URL`, open a customer in the Colonel console — the Rodauth
   account should render as a link rather than plain text.

## Config Mapping Reference

**New configuration**

```bash
# Base URL of the standalone Rodauth Admin instance. Optional, credential-free,
# and never requested from — the Colonel console only renders outbound links.
# Only meaningful in full auth mode; unset renders those links as plain text.
RODAUTH_ADMIN_URL=http://127.0.0.1:9292
```

**Changed behavior**

```bash
# Unchanged default (on). What changed is its reach: this flag now also controls
# whether session revocation is enforced on every request, not just whether the
# Active Sessions card is shown.
#
# Parsed as ENV['AUTH_ACTIVE_SESSIONS_ENABLED'] != 'false' — only the exact
# lowercase string 'false' disables it. 'False', '0', 'no' and 'off' leave it ON.
AUTH_ACTIVE_SESSIONS_ENABLED=true
```

The 72-hour inactivity deadline and the 30-day lifetime deadline are constants in
`Onetime::ActiveSessionGate`. There is no environment variable for either.

## Troubleshooting

### Every signed-in user is refused, and sign-in fails too

The authentication database is unreachable. Look for
`[active_session_gate] authdb unreachable`. This is the fail-closed path, not a
revocation. Restore the database; sessions are honored again without a re-login.

### Users are signed out after a weekend away

The 72-hour inactivity deadline is now enforced on every request rather than swept on the
sessions page. Expected. The 30-day lifetime deadline behaves the same way.

### Session revocation still doesn't take effect

`AUTH_ACTIVE_SESSIONS_ENABLED` is set to `false`, or the mode is not `full`.

### Account deletion from Account Settings still fails

In `full` mode it now posts to `/auth/close-account`. Confirm that path reaches the app
through your proxy.

### The Organizations list shows fewer rows than expected

Search is bounded now. Check `pagination.capped` in the response — `true` means the result
stopped short deliberately. Narrow the search rather than paging for the rest.

### Log lines about `last_use refresh on active-session row failed`

The write that keeps a session alive is failing. If it persists, live sessions will be
signed out at the 72-hour deadline. Treat it as a database write-path problem, not a
session problem.

## Rollback

There is no migration, so rolling back is pinning `OTS_IMAGE_TAG=v0.26.11` and restarting.
`RODAUTH_ADMIN_URL` is inert on the older tag and can be left set.

:::caution
v0.26.11 and earlier contain the response-header replay described above. Roll back only as
a short-lived measure.
:::
