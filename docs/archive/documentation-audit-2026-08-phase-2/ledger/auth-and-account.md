# Phase 2 verification ledger - auth-and-account

Verified against onetimesecret@aafe503 on the Phase 2 branch.

Scope: sign-in, password reset, sign-up + email verification, MFA (TOTP, recovery codes),
WebAuthn/passkeys, MFA lockout, changing the account email address, closing an account.

**Reading this table.** All paths are APP-relative (`/home/user/onetimesecret`). Two structural
caveats apply to every row:

1. **Two auth modes.** `AUTHENTICATION_MODE` selects `simple` (Redis-only, the shipped default in
   `etc/defaults/auth.defaults.yaml:8`) or `full` (Rodauth + SQL). Everything in this ledger
   describes **full mode**, because APP source states production runs it:
   "Production runs AUTHENTICATION_MODE=full, so THIS is the call site that matters for the hosted
   deployment" (`apps/web/auth/config/hooks/create_account.rb:25-29`). That is an in-repo assertion,
   not a hosted config file — see row 3.
2. **The Rodauth gem is NOT vendored in this checkout** (`gem contents rodauth` finds nothing;
   `Gemfile.lock:379` pins `rodauth (2.44.0)`). Any behaviour that lives inside the gem rather than
   in this repo is marked `unverifiable`, even where an APP comment asserts it. Do not upgrade those
   to "verified" without reading rodauth 2.44.0 source.

---

## Auth mode, feature gating, hosted vs self-hosted

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 1 | Accounts, passwords and MFA are handled by Rodauth, mounted at `/auth`; the SPA talks to it as a JSON API (`only_json?`). | verified | `apps/web/auth/config/base.rb:10,61`; router mounts at `/auth` per `apps/web/auth/config/overrides/reset_password_enumeration.rb:18-20` |
| 2 | The shipped self-hosted default auth mode is `simple`; `full` must be turned on with `AUTHENTICATION_MODE=full`. | verified (SELF-HOSTED default) | `etc/defaults/auth.defaults.yaml:8` |
| 3 | onetimesecret.com (hosted) runs `full` mode. | unverifiable | Asserted by APP comment `apps/web/auth/config/hooks/create_account.rb:25-29`. No hosted config file is in any of the three repos. Settled by the production `etc/auth.yaml` / env, which was not supplied. |
| 4 | Brute-force lockout, password strength requirements, active-session tracking, remember-me and email verification are ON by default. | verified (SELF-HOSTED defaults) | `lib/onetime/auth_config.rb:94-120` (`default: true` for each); `etc/defaults/auth.defaults.yaml:63-75` |
| 5 | MFA, magic-link sign-in (`email_auth`), WebAuthn and SSO are OFF by default and must be enabled per install. | verified (SELF-HOSTED defaults) | `lib/onetime/auth_config.rb:124-148` (`default: false` for each); `etc/defaults/auth.defaults.yaml:78-92` |
| 6 | Which of MFA / passkeys / magic links / SSO the hosted service actually has switched on. | unverifiable | Same gap as row 3. The four flags are `AUTH_MFA_ENABLED`, `AUTH_EMAIL_AUTH_ENABLED`, `AUTH_WEBAUTHN_ENABLED`, `AUTH_SSO_ENABLED` (`etc/defaults/auth.defaults.yaml:78-92`). Settled by the hosted env, or by loading onetimesecret.com and reading the bootstrap `features` block the app serves (`apps/web/core/views/serializers/config_serializer.rb:238-248`). |
| 7 | The app tells its own frontend which sign-in methods exist, so the sign-in page only shows what is enabled. | verified | `apps/web/core/views/serializers/config_serializer.rb:238-248`; nav gating `src/apps/workspace/config/settings-navigation.ts:146-196` |
| 8 | An install can be restricted to exactly one sign-in method (`password`, `email_auth`, `webauthn`, or `sso`). | verified (SELF-HOSTED config) | `lib/onetime/auth_config.rb:19,179-199`; `etc/defaults/auth.defaults.yaml:94-107` |

## Sign-in (password)

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 9 | Sign in at `/signin` with email address and password. | verified | `src/apps/session/routes.ts:11-15`; `src/shared/composables/useAuth.ts:345` posts to `/auth/login` |
| 10 | The email address is the account identifier; it is normalised (trimmed, NFC, case-folded) before lookup, so capitalisation does not matter. | verified | `apps/web/auth/config/base.rb:65,75-77` calling `OT::Utils.normalize_email` |
| 11 | Passwords are hashed with argon2id (cost `t=2, m=16, p=1` in non-test environments), optionally with a server-side pepper. | verified | `apps/web/auth/config/features/argon2.rb:21-38`; pepper `lib/onetime/auth_config.rb:73-75` |
| 12 | "Remember me" keeps you signed in across browser restarts for 14 days and is not extended by activity. | verified (Rodauth default, restated in APP) | `apps/web/auth/config/features/remember_me.rb:12-19`; the 14-day figure is also the `account_remember_keys.deadline` column default, `apps/web/auth/migrations/001_initial.rb:111` |
| 13 | A signed-in session is dropped after 24 hours of inactivity and cannot live longer than 30 days regardless of activity. | verified | `apps/web/auth/config/features/active_sessions.rb:20-21` |
| 14 | The session cookie/blob itself expires after 24 hours. | verified (SELF-HOSTED default; hard-coded, not env-overridable) | `etc/defaults/config.defaults.yaml:373-374` (`expire_after: 86400`) |
| 15 | You can see your active sessions and sign other devices out. | verified | `apps/web/auth/routes/active_sessions.rb:8-60`; nav entry `src/apps/workspace/config/settings-navigation.ts:168-172` |
| 16 | The sessions list shows device and IP for each session. | refuted | `apps/web/auth/routes/active_sessions.rb:50-51` hard-codes `ip_address: nil, user_agent: nil` with TODOs. Only created/last-activity/is-current are real. |
| 17 | Every successful sign-in triggers a "New sign-in to your account" email, and a two-factor sign-in produces exactly one such email (not two). | verified | password path `apps/web/auth/config/hooks/login.rb:246-267`; MFA path `apps/web/auth/config/hooks/mfa.rb:210-231`; subject string `locales/content/en/email.json` key `email.new_login_alert.subject` |
| 18 | The sign-in alert email reports the IP address as "location" — there is no geo-IP lookup. | verified | `apps/web/auth/config/hooks/login.rb:246-249,261` ("No geo-IP service is wired, so the request IP is the best available location") |
| 19 | After 5 failed password attempts the account is locked out. | verified | `apps/web/auth/config/features/lockout.rb:15` (`max_invalid_logins 5`) |
| 20 | The lockout expires after 24 hours. | verified (schema default) | `account_lockouts.deadline` defaults to `CURRENT_TIMESTAMP + 1 day`, `apps/web/auth/migrations/001_initial.rb:47-53,122`. The explicit `lockout_expiration_default` override is commented out at `apps/web/auth/config/features/lockout.rb:16`. |
| 21 | A locked-out user can regain access immediately by resetting their password. | unverifiable | The UI offers it (`locales/content/en/session-auth-extended.json` key `web.auth.lockout.try_password_reset`; `src/apps/session/components/LockoutAlert.vue:63`) but whether a successful reset clears `account_lockouts` is rodauth-internal and the gem is not readable here. Settled by reading rodauth 2.44.0 `features/lockout.rb`. |
| 22 | The sign-in page shows "N attempts remaining" and a countdown to unlock. | refuted | The component exists (`src/apps/session/components/LockoutAlert.vue:36-84`, wired at `src/apps/session/components/SignInForm.vue:26,68`) and the schema exists (`src/schemas/api/auth/responses/auth.ts:234-246`), but **no Ruby code ever populates a `lockout` key in an auth response** — a repo-wide grep for `lockout` in `apps/` and `lib/` returns only the feature flag, the Rodauth feature enable, and audit-log wiring. The alert is dead UI today. |
| 23 | Sign-in failures are rate-limited at 5 attempts per email+IP / 30 per email, over a 15-minute window with a 30-minute lockout. | refuted for full mode | Those numbers are `Onetime::Security::LoginRateLimiter` (`lib/onetime/security/login_rate_limiter.rb:57-69`), which is **simple-mode only** — "Simple auth mode verifies credentials in `Core::Logic::Authentication::AuthenticateSession` (there is no Rodauth lockout in this mode)" (`:7-11`). In full mode the gate is Rodauth `lockout` (row 19). |

## Sign-in (other methods)

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 24 | Magic-link ("Send sign-in link") sign-in exists; the link is valid for 15 minutes and cannot be re-sent within 30 seconds. | verified (feature OFF by default) | `apps/web/auth/config/features/email_auth.rb:19-20`; route `/email-login` `:33-34` and `src/apps/session/routes.ts` `/email-login`; UI label `locales/content/en/session-auth.json` key `web.login.send_sign_in_link` |
| 25 | Passkeys / WebAuthn are implemented, cover Face ID, Touch ID, Windows Hello and hardware security keys, and support passwordless sign-in as well as second-factor use. | verified (code ships; feature OFF by default) | `apps/web/auth/config/features/webauthn.rb:9,30-44,55-57`; UI `src/apps/workspace/account/PasskeySettings.vue`, `src/shared/composables/useWebAuthn.ts`; settings tab gated on `isWebAuthnEnabled` `src/apps/workspace/config/settings-navigation.ts:181-185` |
| 26 | "Passkey" is the product's own reader-facing word for this (not just "WebAuthn"). | verified | `locales/content/en/session-auth.json` key `web.login.tab_passkey` = "Passkey"; 20 `web.auth.passkeys.*` strings in `locales/content/en/session-auth-extended.json` (title "Passkeys", "Add Passkey", "{count} passkey registered"). Note the sign-in-method label is `web.auth.methods.webauthn` = "**Biometric**". |
| 27 | The passkey prompt times out after 60 seconds and user verification is "preferred", not required. | verified | `apps/web/auth/config/features/webauthn.rb:27-32` |
| 28 | SSO/OIDC sign-in exists, with built-in support for a generic OIDC provider, Microsoft Entra ID, Google and GitHub. | verified (feature OFF by default) | `lib/onetime/auth_config.rb:440-483`; `etc/defaults/auth.defaults.yaml:86-92` |
| 29 | An SSO sign-in **skips** any second factor configured on the account — the identity provider is trusted to enforce factors. | verified | `apps/web/auth/operations/detect_mfa_requirement.rb:99-101,152-156`; `apps/web/auth/config/hooks/login.rb:141-149` |
| 30 | If an SSO identity's email matches an existing password account, the account is **not** auto-linked; the user must sign in with the existing method and link the provider under Settings → Security → Connected identities. | verified | default `trust_email_for_linking` is false — `lib/onetime/auth_config.rb:269-282`, `etc/defaults/auth.defaults.yaml:134-149`; user-facing string `locales/content/en/session-auth.json` key `web.login.errors.account_exists_link_required` |
| 31 | You can list and disconnect linked SSO identities, but you cannot remove your last remaining sign-in method. | verified | `apps/web/auth/routes/identities.rb:50-66` (list), `:99-141` (delete + `last_credential` 409) |
| 32 | Per-domain (organisation) SSO requires the `manage_sso` entitlement. | verified (entitlement name only — no plan/tier claim made) | `apps/api/domains/logic/sso_config/base.rb:29,34` |

## Sign-up and email verification

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 33 | Sign up at `/signup`; the SPA posts to `/auth/create-account`. | verified | `src/apps/session/routes.ts:31-67`; `src/shared/composables/useAuth.ts:435` |
| 34 | Minimum password length is 8 characters; there is no separate "confirm password" field on signup. | verified | `apps/web/auth/config/features/account_management.rb:104,108` |
| 35 | Signing up sends a verification email; the account is `Unverified` (status 1) until the link is clicked, then `Verified` (status 2). | verified | statuses seeded `apps/web/auth/migrations/001_initial.rb:19`; `apps/web/auth/routes/account.rb:9,51`; hook `apps/web/auth/config/hooks/account.rb:324-346` |
| 36 | The verification email is the "Welcome to {product} - Please verify your email" message and carries a link to `/verify-account?key=…`. | verified | template wiring `apps/web/auth/config/email/verify_account.rb:10-23`; subject `locales/content/en/email.json` key `email.welcome.subject`; SPA route `src/apps/session/routes.ts:145-151` |
| 37 | The verification link does not expire. | verified (schema) | `account_verification_keys` has `key`, `requested_at`, `email_last_sent` and **no `deadline` column** — `apps/web/auth/migrations/001_initial.rb:92-97`. Contrast `account_password_reset_keys` (`:78`) and `account_login_change_keys` (`:104`), which do. |
| 38 | You are not asked to set a password during verification — the password is set at signup. | verified | `apps/web/auth/config/features/account_management.rb:19` (`verify_account_set_password? false`) |
| 39 | You can ask for the verification email again; the resend endpoint answers identically whether or not the address exists, is already verified, or was just throttled. | verified | `apps/api/account/routes.txt:21`; contract + implementation `apps/api/account/logic/account/resend_verify_account.rb:14-29,46-48,98-139` |
| 40 | The verification resend is throttled server-side (Rodauth's `verify_account_skip_resend_email_within`, 300 s). | unverifiable | The 300 s figure appears only in an APP comment (`apps/api/account/logic/account/resend_verify_account.rb:36-37`); the value lives in the gem and is not overridden anywhere in this repo. Settled by rodauth 2.44.0 `features/verify_account.rb`. |
| 41 | Signing up with an address that already has an account returns a generic "Unable to create account" rather than saying the address is taken. | verified | `apps/web/auth/config/hooks/account.rb:67-110` (both the SQL-side and Redis-side conflicts set `create_account_error_flash`); message defined at `apps/web/auth/config/features/account_management.rb:134` |
| 42 | The **same** generic message is used when the address fails signup-domain policy or e-mail validation, so the error does not disclose which rule was hit. | verified | `apps/web/auth/config/hooks/account.rb:53-64` (signup validation), `:154-167` (Truemail check) |
| 43 | Sign-up is rate-limited to 10 attempts per client IP per hour, with a 1-hour lockout. | verified (SELF-HOSTED defaults, config-overridable) | `lib/onetime/security/create_account_rate_limiter.rb:147-153`; enforced ahead of any account lookup at `apps/web/auth/config/hooks/create_account.rb:110-121` |
| 44 | Accepting an organisation invitation skips the verification email, because the invite link already proved control of the address; that signup also logs you straight in. | verified | `apps/web/auth/config/features/account_management.rb:30-83` (suppression, with token validation to stop email squatting), `:87-97` (`create_account_autologin?`) |
| 45 | A new account gets a Customer record and a default personal workspace. | verified | `apps/web/auth/config/hooks/account.rb:176-200` (`CreateCustomer`); `apps/web/auth/operations/create_default_workspace.rb` |

## Password reset

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 46 | Request a reset at `/forgot`; the SPA posts to `/auth/reset-password-request` with the email address. | verified | `src/apps/session/routes.ts:69-90`; `src/shared/composables/useAuth.ts:537-547` |
| 47 | The reset request **always** returns the same "an email has been sent" success, whether the address is unknown, belongs to an unverified/closed account, or was throttled — so the response never reveals whether an account exists. | verified | `apps/web/auth/config/overrides/reset_password_enumeration.rb:124-177` (all three oracle branches overridden to `reset_password_email_sent_response`) |
| 48 | If the address is unknown, **no email is sent** — nothing at all happens beyond the identical response. | verified | `apps/web/auth/config/overrides/reset_password_enumeration.rb:127-140` halts before any key write or email dispatch |
| 49 | If a reset email was sent recently, a second request returns the same success but does **not** re-send. | verified | `apps/web/auth/config/overrides/reset_password_enumeration.rb:168-177` ("Keep the throttle (do NOT resend)") |
| 50 | Reset requests are rate-limited: 10 per client IP per hour and 30 per email address per hour, each with a 1-hour lockout; exceeding it returns HTTP 429 with `retry_after`. | verified (SELF-HOSTED defaults, config-overridable) | `lib/onetime/security/reset_request_rate_limiter.rb:179-191`, raise at `:289-295`; wired at `apps/web/auth/config/hooks/reset_password_request.rb:75-82`; 429 mapping `apps/web/auth/error_translator.rb:36` |
| 51 | The per-IP bucket is a masked network (/24 IPv4, /48 IPv6), not a single address, so neighbours share the budget. | verified | `lib/onetime/security/reset_request_rate_limiter.rb:62-73` |
| 52 | The reset email is "Reset your password ({domain})" and links to `/reset-password?key=…`. | verified | `apps/web/auth/config/email/reset_password.rb:10-23`; subject `locales/content/en/email.json` key `email.password_request.subject`; SPA route `src/apps/session/routes.ts:265-286` |
| 53 | The reset email does **not** state how long the link is valid. | verified | The `email.password_request.*` key set in `locales/content/en/email.json` is subject / title / request_notice / reset_button / copy_link_prompt / ignore_notice / signature / postscript — there is no expiry string. (Contrast `email.email_change_confirmation.expires_notice`, which does exist.) |
| 54 | The reset link is valid for 24 hours. | verified (schema default) | `account_password_reset_keys.deadline` defaults to `CURRENT_TIMESTAMP + 1 day` — `apps/web/auth/migrations/001_initial.rb:47-53,78`. Nothing in this repo sets `reset_password_deadline_interval`; the app's own Rodauth reference also records 86400 (`apps/web/auth/docs/rodauth-reference-2.41+.md:240`). Caveat: whether Rodauth writes the deadline explicitly or lets the column default apply is gem-internal. |
| 55 | The reset link is single-use — it stops working once the password is changed. | unverifiable | APP asserts it: "Rodauth's own `clear_tokens(:reset_password)` already ran inside this transaction" (`apps/web/auth/config/hooks/account.rb:504-508`). The clearing itself is in the gem. Settled by rodauth 2.44.0 `features/reset_password.rb`. |
| 56 | Submitting your *current* password as the new one is rejected — but the error is a generic "invalid password" that does not confirm the guess. | verified | `apps/web/auth/config/features/account_management.rb:110-128` |
| 57 | Completing a reset signs you out of **every** device, including the one you reset from. | verified | `apps/web/auth/config/hooks/account.rb:499-503` ("The user is UNAUTHENTICATED here … revoke them ALL"), inline revoke `:583-598`, async full sweep `:552-563` |
| 58 | The authoritative revocation boundary is a "credential watermark" timestamp on the account — any session that authenticated before the reset is rejected, even if its stored blob was missed. | verified | `apps/web/auth/config/hooks/account.rb:453-461,468-497` (`UpdatePasswordMetadata` → `Customer#last_password_update`) |
| 59 | Changing your password from Settings signs out your *other* sessions but keeps the current one. | verified | `apps/web/auth/config/hooks/account.rb:679` and the `RevokeAllForCustomerExceptCurrent` require at `:9` |
| 60 | A password change sends a "Your password was changed" email. | verified | `apps/web/auth/config/hooks/account.rb:900-917`; subject `locales/content/en/email.json` key `email.password_changed.subject` |
| 61 | An account with no password (created via SSO) can set a first password through the same emailed-link flow used for resets. | verified | `src/apps/workspace/account/settings/SecurityOverview.vue:112-128`; route guard `src/apps/workspace/routes/account.ts:46-57`; strings `web.auth.password_setup_request.*` in `locales/content/en/session-auth.json` |

## MFA — TOTP and recovery codes

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 62 | The second factor on offer is a TOTP authenticator app (Google Authenticator, Authy, 1Password, Microsoft Authenticator). SMS is not offered. | verified | features enabled are `two_factor_base`, `otp`, `recovery_codes` only — `apps/web/auth/config/features/mfa.rb:19-21`. An `account_sms_codes` table exists (`apps/web/auth/migrations/001_initial.rb:201-207`) but the `sms_codes` feature is never enabled. App list in `locales/content/en/session-auth-extended.json` key `web.auth.mfa.benefit_apps`. |
| 63 | The UI calls this "Two-Factor Authentication" / "2FA", not "MFA". | verified (mixed, with a rule) | Settings and emails say two-factor: `web.auth.mfa.title` = "Two-Factor Authentication", `web.auth.mfa.disable_button` = "Disable 2FA", `email.mfa_enabled.subject` = "Two-factor authentication enabled". "MFA" appears only in transient sign-in states (`web.auth.mfa_required` = "MFA verification required"). Prefer "two-factor authentication (2FA)". |
| 64 | Setting up 2FA is a two-step exchange: request setup (server returns the secret + a QR provisioning URI), then confirm with a code from the app. | verified | `apps/web/auth/config/features/mfa.rb:6-11`; provisioning URI emitted at `apps/web/auth/config/hooks/mfa.rb:60-63`; client flow `src/shared/composables/useMfa.ts:10-15,170,244` |
| 65 | The QR code the server emits is authoritative — the app no longer builds the `otpauth://` URI itself. | verified | `apps/web/auth/config/hooks/mfa.rb:36-63` (documents the bug where the client encoded the raw key and scanned codes never matched) |
| 66 | Enabling or disabling 2FA requires your password. | verified | `apps/web/auth/config/features/mfa.rb:35-36` (`two_factor_modifications_require_password?` and `modifications_require_password?` both true); UI `web.auth.mfa.require_password` |
| 67 | Recovery codes are generated automatically when 2FA is enabled and are shown once, in the setup response. | verified | `auto_add_recovery_codes? true` `apps/web/auth/config/features/mfa.rb:50`; returned in the response at `apps/web/auth/config/hooks/mfa.rb:339-341`; "These codes will only be shown once" `web.auth.recovery_codes.warning` |
| 68 | You get **4** recovery codes. | verified | `RECOVERY_CODES_LIMIT = 4` `apps/web/auth/config/features/mfa.rb:14,51`; surfaced to the client `apps/web/auth/routes/account.rb:113`; test constant `apps/web/auth/spec/support/auth_test_constants.rb:16`; UI fallback `src/apps/workspace/account/RecoveryCodes.vue:251` |
| 69 | Each recovery code can be used once. | verified | `account_recovery_codes` has a `used_at` column and PK `[id, code]` — `apps/web/auth/migrations/001_initial.rb:193-198`; user-facing `web.auth.security.recovery_code_used` = "This recovery code has already been used. Each code can only be used once." |
| 70 | A recovery code is a ~13-character base36 string (64 bits of CSPRNG entropy). | verified | `apps/web/auth/config/features/mfa.rb:66-76` (`Familia.generate_trace_id`, documented as base36 of a 64-bit value, e.g. `3w5e11264sgsf`) |
| 71 | You can view your existing recovery codes, or generate a new set; both require your password. | verified | `src/shared/composables/useMfa.ts:344-350,376-386` (POST `/auth/recovery-codes`, `add: 'true'` to regenerate); password requirement per row 66 |
| 72 | Generating new recovery codes invalidates the old ones. | unverifiable | Claimed by the UI (`web.auth.recovery_codes.generate_new_warning`) and by the composable's docstring (`src/shared/composables/useMfa.ts:388-390`). But nothing in this repo overrides Rodauth's `add_recovery_codes`, whose stock behaviour is to *top up* to the limit rather than replace. Settled by rodauth 2.44.0 `features/recovery_codes.rb`. **See "Do not claim" #5.** |
| 73 | The account page reports how many unused recovery codes remain, out of the limit. | verified | `apps/web/auth/routes/account.rb:92-114` returns `recovery_codes_remaining` + `recovery_codes_limit`; UI string `web.auth.recovery_codes.remaining` = "{count} of {limit} recovery codes remaining" |
| 74 | If an account has recovery codes but no TOTP secret, sign-in still demands a second factor (this "orphaned" state is treated as MFA-on). | verified | `apps/web/auth/operations/detect_mfa_requirement.rb:162-165` (`@has_otp_secret || @has_recovery_codes`), reason `recovery_codes_only` at `:190`; the config mitigates it with `auto_remove_recovery_codes? true` (`apps/web/auth/config/features/mfa.rb:53-56`) |
| 75 | Turning 2FA on or off sends a security notification email. | verified | enable `apps/web/auth/config/hooks/mfa.rb:343-359`; disable `:291-307`; subjects `email.mfa_enabled.subject` / `email.mfa_disabled.subject` |
| 76 | Session sync is deferred until the second factor succeeds — a half-completed 2FA sign-in has no real session. | verified | `apps/web/auth/config/hooks/login.rb:152-188` (`PrepareMfaSession`, `awaiting_mfa`), cleared at `apps/web/auth/config/hooks/mfa.rb:264` |
| 77 | The sign-in response tells the client MFA is needed (`mfa_required`, `mfa_auth_url`, `mfa_methods`) and the browser lands on `/mfa-verify`. | verified | `apps/web/auth/config/hooks/login.rb:175-178`; SPA route `src/apps/session/routes.ts:163-183` |

## MFA lockout and recovery

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 78 | After 7 wrong TOTP codes the second factor locks. | verified | `OTP_AUTH_FAILURES_LIMIT = 7` `apps/web/auth/config/features/mfa.rb:15,47`; failure counter column `account_otp_keys.num_failures` `apps/web/auth/migrations/001_initial.rb:181` |
| 79 | That TOTP lock does **not** time out on its own — there is no self-service unlock-after-a-wait. | unverifiable, strongly indicated | The `otp_unlock` feature is NOT in the enable list (`apps/web/auth/config/features/mfa.rb:19-21`); its table exists but unused (`apps/web/auth/migrations/001_initial.rb:185-190`, labelled "Used by the otp_unlock feature"). The config comment says the stock behaviour it is tuning is "5 attempts with permanent lockout" (`apps/web/auth/config/features/mfa.rb:39`). Confirming "permanent" needs rodauth 2.44.0 `features/otp.rb`. |
| 80 | A user who cannot produce a TOTP code can sign in with a recovery code instead ("Use a recovery code instead" on the 2FA screen). | verified | `web.auth.mfa.use_recovery_code` in `locales/content/en/session-auth-extended.json`; client posts to `/auth/recovery-auth` `src/shared/composables/useMfa.ts:445-446`; server hook `apps/web/auth/config/hooks/mfa.rb:455-469` |
| 81 | There is deliberately **no** email-based 2FA reset: email alone can already reset a password, so an email MFA bypass would make 2FA worthless. | verified | `apps/web/auth/docs/mfa-recovery.md:145-164` ("Why No Email Recovery Flow?"), and the changelog records the email recovery flow being removed for that reason (`:270-282`) |
| 82 | A user who has lost both the authenticator and all recovery codes must contact support; recovery is a manual, identity-verified operator action. | verified | `apps/web/auth/docs/mfa-recovery.md:51-140`; the operator tool is console-only and explicitly never exposed as an API — `apps/web/auth/operations/disable_mfa.rb:9-11` |
| 83 | When support disables 2FA, both the TOTP secret and all recovery codes are removed and the user is emailed about it. | verified | `apps/web/auth/operations/disable_mfa.rb:36-40,119-133` (deletes `account_otp_keys` and `account_recovery_codes`), notification `:60-76` |
| 84 | Support can reset 2FA within a stated turnaround (e.g. 1-2 business days). | unverifiable | The 1-2 day window is a template suggestion in an internal runbook (`apps/web/auth/docs/mfa-recovery.md:120-128`), not a published commitment. Settled by the support team / the hosted service's own SLA. Do not publish a turnaround. |

## Changing the account email address

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 85 | You change your email under Settings; it requires your current password. | verified | `apps/api/account/routes.txt:18`; `apps/api/account/logic/account/request_email_change.rb:87,98-100`; nav entry gated on `hasPassword` `src/apps/workspace/config/settings-navigation.ts:116-120` |
| 86 | The change is two-step: a confirmation link goes to the **new** address, and the change only lands when that link is opened. | verified | `apps/api/account/logic/account/request_email_change.rb:138-149` (confirmation to new address); redemption `apps/api/account/logic/account/confirm_email_change.rb:13-33`; route `apps/api/account/routes.txt:19` |
| 87 | The confirmation link is valid for 24 hours, and the email says so. | verified | `apps/api/account/logic/account/request_email_change.rb:119-125` (`secret.default_expiration = 24.hours`); string `email.email_change_confirmation.expires_notice` = "This link will expire in %{hours} hours." |
| 88 | The **old** address is emailed twice: once when the change is requested (before anything happens) and once when it completes. | verified | request-time notice `apps/api/account/logic/account/request_email_change.rb:154-167` + rationale `:5-45`; completion notice is `notify: true` on the operation, `apps/api/account/logic/account/confirm_email_change.rb:84` and `apps/web/auth/operations/customers/change_email.rb:241-243` |
| 89 | The request-time email to the old address explicitly says nothing has changed yet and that ignoring it is safe. | verified | `email.email_change_requested.if_you_initiated` and `.not_you_notice` in `locales/content/en/email.json` |
| 90 | Requesting an email change is capped at 5 attempts per account per rolling 24 hours. | verified | `MAX_REQUESTS = 5` `apps/api/account/logic/account/request_email_change.rb:62,91-96`; 24h counter TTL `:197-213` |
| 91 | If the new address is already in use, you get a deliberately vague "This email cannot be used". | verified | `apps/api/account/logic/account/request_email_change.rb:105-106` |
| 92 | Confirming the change **does not** make you re-verify — the confirmation link is itself the proof, so the account keeps its verified status. | verified | `apps/api/account/logic/account/confirm_email_change.rb:29-32,81` (`require_verification: false`, decision D34); contrast operator-initiated changes at `apps/web/auth/operations/customers/change_email.rb:106-128` |
| 93 | Confirming the change signs you out everywhere, including the browser that opened the link, and sends you to `/signin`. | verified | `apps/api/account/logic/account/confirm_email_change.rb:83` (`revoke_sessions: true`), current-session clear `:88-99,119-124`, redirect `:111` |
| 94 | The old address stops working for sign-in; the new one is the login going forward. | verified | the swap rewrites the Rodauth `accounts.email` row and the Customer hash + email indexes — `apps/web/auth/operations/customers/change_email.rb:17-50` |
| 95 | Your existing secrets, links and history are unaffected by an email change. | verified (by construction) | Everything is keyed on the customer objid / extid, not the email — `apps/web/auth/operations/customers/change_email.rb:17-50` lists exactly what the swap touches (accounts row, Customer hash, email indexes, default workspace `contact_email`); secrets are not among them |
| 96 | Billing email and pending organisation invitations are deliberately **not** rewritten by an account email change. | verified | `apps/web/auth/operations/customers/change_email.rb:130-144` ("Deliberately NOT touched") |
| 97 | An email change may leave the system half-updated. | verified (as an operator-facing edge case, not a user-facing promise) | There is no distributed transaction: `apps/web/auth/operations/customers/change_email.rb:26-56` documents the `:partial` status and the `customers doctor --check auth_email_drift` remediation. A user-facing page should say the change either completes or reports an error, and not describe `:partial`. |
| 98 | Email change is unavailable on SSO-enforced installs. | verified | `require_non_sso_only!` at `apps/api/account/logic/account/request_email_change.rb:67` and `confirm_email_change.rb:45`; policy at `lib/onetime/auth_config.rb:201-207` |

## Closing / deleting an account

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 99 | Close your account from Settings → Advanced → Caution Zone; it requires your password. | verified | nav `src/apps/workspace/config/settings-navigation.ts:284-295`; UI `src/apps/workspace/account/CloseAccount.vue`; endpoint `apps/api/account/routes.txt:12`; password check `apps/api/account/logic/account/destroy_account.rb:22-34,100-124` |
| 100 | Closing the account permanently deletes the sign-in record: password hash, TOTP secret, recovery codes, passkeys, remember-me tokens, pending resets, pending email changes, active-session rows and the auth audit log rows are all deleted, then the account row itself. | verified | `apps/web/auth/operations/close_account.rb:66-88,147-165`; audit-log caveat documented at `:41-43` |
| 101 | Closing the account deletes every stored session immediately, so all devices are signed out. | verified | `apps/web/auth/operations/close_account.rb:109-110,194-234` (Redis session sweep + per-session sidecar purge) |
| 102 | Closing the account is irreversible. | verified for the auth record | The auth account row and all dependent rows are hard-deleted (`apps/web/auth/operations/close_account.rb:147-165`); nothing re-creates them |
| 103 | The Customer record is **not** hard-deleted: it is retained for a 365-day grace period with the password cleared, the API token rotated, verified set to false, and the role changed to `user_deleted_self`. | verified | `apps/api/account/logic/account/destroy_account.rb:70`; `lib/onetime/models/features/right_to_be_forgotten.rb:54-70` |
| 104 | Closing the account permanently deletes all your secrets. | refuted | The user-facing warning says exactly this — `web.auth.close_account.warning` = "This action cannot be undone. All your secrets will be permanently deleted." (`locales/content/en/session-auth.json`, rendered at `src/apps/workspace/account/CloseAccount.vue:69,214`). But the closure path is `DestroyAccount#process` → `CloseAccount` (auth DB only, `apps/web/auth/operations/close_account.rb:66-88`) → `Customer#destroy_requested!` (`lib/onetime/models/features/right_to_be_forgotten.rb:54-70`), and **none of the three touches Secret or Metadata records**. There is no purge job keyed on account closure (repo-wide grep for `destroy_requested` / `user_deleted_self` returns only the feature module and the one call site). Outstanding secret links keep working until their own TTL, burn, or reveal. **See "Do not claim" #1.** |
| 105 | Two different closure code paths exist and they do different things. | verified (operator-facing note) | The user endpoint uses `CloseAccount` + `destroy_requested!` (grace period). Rodauth's own `after_close_account` hook instead calls `DeleteCustomer` → `Customer#destroy!`, a hard delete (`apps/web/auth/config/hooks/account.rb:926-938`; `apps/web/auth/operations/delete_customer.rb:40-46,79-88`). A docs page must describe the **user** path (row 103), not the hook. |
| 106 | A closed account's email address can be reused for a fresh signup. | refuted as stated | `accounts.email` uniqueness is a *partial* index restricted to `status_id in (1,2)`, so a closed row does not block reuse at the SQL level (`apps/web/auth/migrations/001_initial.rb:31-35`) — but the user path deletes the accounts row outright and the retained Customer keeps its `customer:email_index` entry, which `before_create_account` checks (`apps/web/auth/config/hooks/account.rb:92-110`). And `ChangeEmail` treats a closed-account holder as `:email_taken` by default (`apps/web/auth/operations/customers/change_email.rb:52-66`). Net: do not promise reuse. |
| 107 | Account deletion is available on SSO-enforced installs. | refuted | `require_non_sso_only!` at `apps/api/account/logic/account/destroy_account.rb:23`; `lib/onetime/auth_config.rb:201-207` ("password-based account management is disabled (destroy account, change password, change email)") |

## Vocabulary the UI actually uses

| # | Concept | What the UI calls it | Evidence |
|---|---|---|---|
| 108 | Signing in | "Sign In" / "Sign in with password"; tabs are **Password**, **Magic Link**, **Passkey** | `locales/content/en/session-auth.json` keys `web.login.button_sign_in`, `web.login.tab_password`, `web.login.tab_magic_link`, `web.login.tab_passkey` |
| 109 | Magic links | "Send sign-in link" / "Use passwordless sign-in"; the internal feature name is `email_auth` | `web.login.send_sign_in_link`, `web.login.use_passwordless`; feature name `apps/web/auth/config/features/email_auth.rb:15` |
| 110 | WebAuthn credentials | "Passkeys" in settings; "Biometric" as a sign-in method label; "Sign in with Face ID / Touch ID" on the button | `web.auth.passkeys.title`, `web.auth.methods.webauthn`, `web.auth.webauthn.signIn` |
| 111 | Second factor | "Two-Factor Authentication" / "2FA" in settings and emails; "MFA" only in sign-in interstitials | rows 63 |
| 112 | Recovery codes | "Recovery Codes" (not "backup codes") | `web.auth.recovery_codes.title`; note the marketing-free internal doc uses "backup codes" — the UI does not |
| 113 | Linked SSO providers | "Connected identities", under Settings → Security | `web.auth.connections.title`; `src/apps/workspace/config/settings-navigation.ts:192-196` |
| 114 | Closing the account | "Close Account" (button: "Permanently Close Account"), in the "Caution Zone" | `web.auth.close_account.title`, `.button`; `src/apps/workspace/account/settings/CautionZone.vue:42` |
| 115 | Marketing vocabulary for this area | MKTG says almost nothing: the only auth terms in `MKTG/src/i18n/ui/en.json` are "SSO / SAML" and one compliance sentence mentioning SSO. No passkey, 2FA, TOTP or MFA vocabulary exists there. | grep of `MKTG/src/i18n/ui/en.json` |

---

## Do not claim

1. **"Closing your account deletes all your secrets."** The app's own close-account warning string says
   this, and it is not implemented. `DestroyAccount` → `CloseAccount` → `Customer#destroy_requested!`
   deletes the auth record and marks the Customer, and never touches Secret or Metadata keys. Copying
   the UI string into docs would publish a data-handling falsehood. If the page must say something,
   say what row 100/101/103 supports and flag the secrets question to the owner.

2. **"Passkeys are available on onetimesecret.com."** Passkeys are fully implemented (row 25) and are
   the product's own word (row 26) — so the plan's "zero-hit term" flag is wrong about the *code*.
   But `AUTH_WEBAUTHN_ENABLED` defaults to **false** and no hosted config is in any repo. The correct
   statement without the hosted config is "the app supports passkeys where the operator enables them";
   any hosted claim needs the production env or a live check of the bootstrap `features` block.

3. **"You get 10 recovery codes" / "10 wrong codes locks 2FA."** `apps/web/auth/docs/mfa-recovery.md:170-172`
   says both. The live configuration is **4** codes (`apps/web/auth/config/features/mfa.rb:14`) and
   **7** failures (`:15`). That internal doc is stale; it is not evidence.

4. **"Recovery codes are single-use" is safe; "you have N left, then you are locked out" is not.**
   Single-use is schema-backed (row 69). What happens on the *last* code — whether Rodauth
   auto-tops-up, or the account becomes recovery-less — is gem behaviour and unread here.

5. **"Regenerating recovery codes invalidates the old ones."** Asserted by the UI string and the
   frontend docstring only. Nothing in this repo overrides Rodauth's `add_recovery_codes`, and stock
   Rodauth tops up to the limit rather than replacing. Until rodauth 2.44.0 is read, the honest
   wording is "generate a new set" with no claim about the old ones.

6. **"The sign-in page tells you how many attempts you have left / when you unlock."** The component
   and schema exist; no server code populates them (row 22).

7. **"After N failed sign-ins you are locked out for 30 minutes."** Those are simple-mode
   `LoginRateLimiter` numbers (row 23). Full mode uses Rodauth `lockout`: 5 failures, 24-hour
   schema deadline (rows 19-20).

8. **"Your verification link expires in X hours."** The verification-key table has no deadline column
   at all (row 37). The UI string `web.auth.verify.expired_key` exists but is a generic failure
   message, not evidence of an expiry window.

9. **Any tier, seat, member-limit, entitlement or price claim.** Out of scope by the billing gate.
   SSO per-domain configuration is gated by the `manage_sso` entitlement (row 32) — name the
   entitlement if you must, never a plan.

10. **"MFA protects SSO sign-ins."** It does not: an SSO login bypasses the second factor by design
    (row 29). A page that says "turn on 2FA to protect your account" without this caveat is wrong for
    any account that also signs in via an identity provider.

11. **"Support can restore your account / reset your 2FA within 1-2 business days."** That window is a
    suggested template in an internal runbook, not a commitment (row 84).

12. **Screen-by-screen walkthroughs of the settings UI.** Per the D9 decision these pages are
    behaviour-focused reference targets. The nav structure in
    `src/apps/workspace/config/settings-navigation.ts` is included above only so a writer can name the
    right destination in a sentence — not so it can be transcribed as a layout description.

13. **Any exact numeric default restated in prose.** Rows 12-14, 19-20, 24, 27, 34, 43, 50, 54, 68, 78,
    87, 90, 103 are all configurable or version-pinned. Per plan rule 3 these belong in the reference
    page that owns defaults; prose should link, or say "the exact window is shown in the app".
