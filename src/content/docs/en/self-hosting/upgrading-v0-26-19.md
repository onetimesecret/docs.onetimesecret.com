---
title: Upgrading to v0.26.19
description: Export the authentication audit log before upgrading, update bin/ots scripts for --apply, and take the Rodauth 2.48 passkey sign-in security fix.
sidebar:
  order: 19
audience: operator
pageType: how-to
sourceOfTruth: onetimesecret/apps/web/auth/operations/remove_authentication_data.rb (closure deletion); onetimesecret/lib/onetime/cli/customers/prune_closed_accounts_command.rb and finish_closures_command.rb; onetimesecret/lib/onetime/cli/write_gate.rb (the --apply gate); onetimesecret/apps/web/auth/config/base.rb (already_logged_in)
---

v0.26.19 moves the authentication library, Rodauth, from 2.45 to 2.48, which closes an upstream passkey sign-in account takeover. In full mode, closing an account now deletes its sign-in record and its authentication audit log. `bin/ots` verbs that change records are dry runs unless you pass `--apply`. No migration runs and rollback is a tag swap.

If you are upgrading from v0.26.17 or earlier, follow the [v0.26.18 guide](/en/self-hosting/upgrading-v0-26-18) first: it has a migration.

## Before You Start

- Record the tag you are running now.
- Note your `AUTHENTICATION_MODE` (see [Simple or full auth](/en/self-hosting/simple-or-full-auth)) and whether `AUTH_WEBAUTHN_ENABLED=true`. Most steps below apply to full mode only.
- List the scripts, cron jobs and runbooks that call `bin/ots`.

## What Changes

| Area | Change | Action required? |
|---|---|---|
| Passkey sign-in | Rodauth 2.46 fix: a signed-in session could use passkey login to sign in as another account | Upgrade promptly if `AUTH_WEBAUTHN_ENABLED=true` |
| Account closure (full mode) | Deletes the `accounts` row and all of its `account_authentication_audit_logs` rows | Export the audit log before upgrading |
| Closed accounts from earlier versions | New `bin/ots customers prune-closed-accounts` | Optional, later (full mode) |
| `bin/ots` | Writes need `--apply`; no prompts; a piped `y` no longer confirms | Update scripts |
| Sign-in routes | A signed-in browser gets 403 "Already logged in" on sign-in, signup, verify and magic-link routes | None |
| Organization members | Removing a member clears their default organization when it names that organization | Optional cleanup for earlier removals |
| Receipt and burn API | Burn returns the receipt after the burn; `share_url` is `null` once the secret is gone | Only if you script against it |
| Frontend | Routes and languages load as separate chunks; open tabs reload once after the deploy | None |
| Expiration warnings | Now delivered when the job system runs | Only if `expiration_warnings.enabled: true` |
| SAML | An EntityID containing `{…}` is refused | Only if you use one |

:::caution
In full mode with `AUTH_WEBAUTHN_ENABLED=true`, if you cannot upgrade yet, or if you roll back to v0.26.18 later, set `AUTH_WEBAUTHN_ENABLED=false` while you run v0.26.18. Accounts that sign in only with a passkey then use a magic link (`AUTH_EMAIL_AUTH_ENABLED=true`) or a password reset.
:::

## The Upgrade Checklist

1. **Full mode: export the authentication audit log before upgrading.** From v0.26.19 on, each closure deletes that account's rows in the same transaction. The export is also the record you need if you later review past passkey sign-ins. Schedule it from now on if you keep this history.

   ```bash
   psql "$AUTH_DATABASE_URL" -c "\copy account_authentication_audit_logs TO 'auth-audit-$(date +%F).csv' CSV HEADER"
   ```

   On SQLite, export the same table with `sqlite3`.

2. **Update scripts that call `bin/ots`.**

   ```bash
   bin/ots memberships add ORG CUSTOMER --role member --apply   # was organizations add-member --org … --email …
   bin/ots organizations doctor --all                           # was organizations --check
   bin/ots organizations show ORG                               # was organizations --show, --customer, --subscription
   ```

   `--yes`, `-y` and `-f` still write. `echo y | bin/ots …` now previews and exits 0 without writing. On `customers change-email` and `customers role reconcile`, `--yes` and `--force` are ignored: pass `--apply`. `bin/ots memberships remove` exits 1 when the removal succeeds but leaves the member's default organization behind, and prints the repair command. `purge`, `purge-inactive`, `prune-closed-accounts` and `finish-closures` keep their own flags.

3. **Deploy v0.26.19**, backend and frontend together.

4. **Only if a SAML EntityID contains a placeholder such as `{tenantid}`:** replace it with the EntityID your IdP issues for your tenant, in `SAML_IDP_ENTITY_ID` (platform SAML stays off until you do) or in the custom domain's SSO settings.

5. **Only if `expiration_warnings.enabled: true` and the job system runs:** once no v0.26.18 process is left, delete the queue nothing reads.

   ```bash
   rabbitmqctl delete_queue email.message.schedule
   ```

## After the Upgrade: Optional Cleanup

These are not needed for v0.26.19 to work.

- **Default organizations left by earlier member removals.** Read the report before repairing: `--repair` fixes every repairable finding it lists.

  ```bash
  bin/ots customers doctor --all
  bin/ots customers doctor --all --repair
  ```

- **Closed accounts kept by earlier versions (full mode).** If passkeys were ever enabled, wait until you have decided whether to review past passkey sign-ins: this deletes audit rows. Run it only after the export in step 1.

  ```bash
  bin/ots customers prune-closed-accounts            # preview
  bin/ots customers prune-closed-accounts --confirm  # delete
  bin/ots customers finish-closures                  # preview, if the prune reports interrupted closures
  bin/ots customers finish-closures --confirm        # purge
  ```

  :::caution
  These deletions are permanent. Only the export from step 1 keeps the audit rows.
  :::

## Verify

1. Sign in with each method you enable (password, magic link, passkey), sign out, and sign in again.
2. If you enable passkeys and TOTP: sign in with a passkey on an account that also has TOTP, then add a second passkey. Both finish without an error and the session stays signed in.
3. Sign up a throwaway account and verify it from the emailed link in a private window.

## Config Mapping Reference

New variables, all optional. See `.env.reference` for each.

| Variable | Default | Parsing |
|---|---|---|
| `ORGS_HOMEPAGE_NETWORK_RULES_UI_ENABLED` | off | only the literal `true` enables |
| `ORGS_BASE_DOMAIN_SIGNUP_ENABLED` | off | only the literal `true` enables |
| `SSO_METADATA_FETCH_RATE_LIMIT_ENABLED` | on | only the literal `false` disables |
| `SSO_METADATA_FETCH_RATE_LIMIT_MAX_PER_CUSTOMER`, `_WINDOW`, `_LOCKOUT` | 30, 3600 s, 3600 s | integers |

With billing enabled, the two `ORGS_` features also need the `homepage_network_rules` and `base_domain_signup` entitlements on a plan.

## Troubleshooting

### "Already logged in" (403) on a verify or magic link

The browser is signed in to an account. Sign out, or open the link in a private window.

### A `bin/ots` command prints `DRY RUN — nothing was written`

Add `--apply`.

### `bin/ots organizations add-member` is an unknown command

Use `bin/ots memberships add ORG CUSTOMER --apply`.

### `bin/ots memberships remove` exits 1 after removing the member

The member's default organization still names the organization. Run the `customers doctor` command it prints.

### Platform SAML sign-in is gone after the upgrade

`SAML_IDP_ENTITY_ID` contains a `{…}` placeholder. See step 4.

## Rollback

Pin the tag you recorded and restart; no migration ran. If passkeys are enabled, set `AUTH_WEBAUTHN_ENABLED=false` before starting v0.26.18: that version is exposed to the passkey sign-in takeover this release fixes. On v0.26.18, homepage network rules and base-domain sign-up settings are ignored, so a homepage a tenant restricted is public until you return to v0.26.19. Rows deleted by closures or by `prune-closed-accounts` stay deleted. Avoid `bin/ots customers sync-auth-accounts` on v0.26.18 after a rollback: it does not read the closure marker this release writes and may give an interrupted closure a sign-in again.
