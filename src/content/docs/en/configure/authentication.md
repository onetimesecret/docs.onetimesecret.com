---
title: Authentication
description: The two authentication switches, what each mode actually loads, the sign-in and sign-up gates, and what to turn off to run a closed instance.
audience: operator
pageType: reference
sourceOfTruth: onetimesecret/apps/web/auth/application.rb:19,22-24 with onetimesecret/lib/onetime/application/registry.rb:147,157-160,204-224,56,72 (the Auth application declares the /auth prefix, refuses to load outside full mode, and mounts are dispatched longest-prefix-first, so in full mode it owns every path under /auth and Core's seven /auth/* rows at onetimesecret/apps/web/core/routes.txt:29-35 are shadowed); onetimesecret/apps/web/auth/config/features/account_management.rb:9 against :16-17 (Rodauth's create_account is enabled unconditionally while verify_account is wrapped in a config check, so AUTH_SIGNUP is inert for account creation in full mode) and onetimesecret/apps/web/auth/config/base.rb:10 (login and logout likewise, so AUTH_SIGNIN is inert for the credential POST); onetimesecret/apps/web/core/controllers/registration.rb:11,29-31 and onetimesecret/apps/web/core/controllers/authentication.rb:13-15 (the simple-mode gates, on the shadowed rows); onetimesecret/apps/web/auth/router.rb:139-155 with onetimesecret/lib/onetime/models/custom_domain/signin_config.rb:315-318 (AUTH_ENABLED=false returns 404 for every /auth path except /auth/health, before any credential is processed) and onetimesecret/lib/onetime/application/auth_strategies.rb:49-54 (the sessionauth strategy is never registered, so routes requiring it answer 401 from the otto gem, Gemfile.lock:278); onetimesecret/src/router/public.routes.ts:21,36-38,40,46-51,58-68,83-98 with onetimesecret/src/shared/components/layout/TransactionalHeader.vue:61-65 and onetimesecret/src/schemas/contracts/disabled-homepage.ts:23-24,44-48 (AUTH_REQUIRED=true selects the disabled-homepage layout, which sets displayHeader false and so removes the header, masthead and sign-in link, and whose default variant carries no call to action — contradicting the shipped comment at onetimesecret/etc/defaults/config.defaults.yaml:299-303); onetimesecret/docker/compose/docker-compose.full.yml:75 and onetimesecret/docker/compose/docker-compose.simple.yml:36 (the Compose stacks set the mode; the full stack defaults to full); onetimesecret/etc/defaults/auth.defaults.yaml:6-8 (the mode key is the top-level mode in etc/auth.yaml, read from AUTHENTICATION_MODE, shipping as simple) with onetimesecret/lib/onetime/auth_config.rb:36-41 (only simple and full are accepted and anything else resolves to simple); onetimesecret/lib/onetime/application/registry.rb:157-160 (the Rodauth application is skipped unless the mode is full) and :170-179 (the AUTHENTICATION MODE boot box); onetimesecret/lib/onetime/auth_config.rb:420-424 (every full-mode feature predicate returns false in simple mode); onetimesecret/etc/defaults/auth.defaults.yaml:56-59,61-92 (the nine full-mode feature toggles, their env vars and the default-ON/default-OFF polarity convention); onetimesecret/etc/defaults/auth.defaults.yaml:36 with onetimesecret/lib/onetime/auth_config.rb:61-63 (the full-mode database defaults to sqlite://data/auth.db); onetimesecret/apps/web/auth/config/base.rb:11-12,21-25 (AUTH_SECRET and a 32-byte ACCOUNT_ID_SECRET are required in production, boot raises without them, and an unset RACK_ENV fails closed to production) with onetimesecret/lib/onetime/utils/totp.rb:81-85 (the AUTH_SECRET raise text); onetimesecret/etc/defaults/config.defaults.yaml:281-283 (site.authentication.enabled / AUTH_ENABLED ships true) with onetimesecret/lib/onetime/config.rb:466-474 (every key under site.authentication is force-set to false when it is not exactly true); onetimesecret/etc/defaults/config.defaults.yaml:284-304 (signup, signin, autoverify and required, with their env vars and shipped values) and onetimesecret/lib/onetime/config.rb:116 (the autoverify default); onetimesecret/etc/defaults/auth.defaults.yaml:74-75 (AUTH_VERIFY_ACCOUNT_ENABLED is a separate switch, on outside RACK_ENV=test); onetimesecret/etc/defaults/config.defaults.yaml:309-317 (allowed_signup_domains, env ALLOWED_SIGNUP_DOMAIN, shipping empty) with onetimesecret/lib/onetime/signup_validation.rb:71-91 (exact case-insensitive whole-domain matching) and :20-44 (the email pattern mirroring the PostgreSQL accounts.valid_email CHECK); onetimesecret/apps/api/account/logic/account/create_account.rb:208-217, onetimesecret/apps/web/auth/config/hooks/account.rb:45-64 and onetimesecret/apps/web/auth/config/hooks/omniauth.rb:660-671 (the three account-creation paths that enforce the allowlist, the per-domain fallback order, and the SSO rejection redirect); onetimesecret/apps/api/account/logic/account/create_account.rb:74-81 (the deliberately generic rejection message) and :83-88 (the hardcoded six-character simple-mode minimum); onetimesecret/apps/web/auth/config/features/omniauth.rb:38-47 (SSO first login creates and verifies the account); onetimesecret/apps/web/auth/config/features/account_management.rb:104 (the hardcoded eight-character full-mode minimum), :106-108 (no password confirmation) and :110-128 (the genericised same-as-existing-password message); onetimesecret/etc/defaults/config.defaults.yaml:305-308 with onetimesecret/lib/onetime/cli/customers/role_command.rb:9-12 and onetimesecret/lib/onetime/cli/customers/create_command.rb:38 (colonel is granted from the CLI and the four valid roles); onetimesecret/etc/defaults/config.defaults.yaml:614-639 with onetimesecret/lib/onetime/config.rb:119-127 (ADMIN_ALLOWED_CIDRS ships empty, returns 404 out of range, and resolves the client IP through the trusted-proxy layer); onetimesecret/etc/defaults/config.defaults.yaml:499 with onetimesecret/lib/onetime/application/middleware_stack.rb:245,357-359 (TRUSTED_PROXY_ENABLED ships off and gates every other trusted-proxy setting); onetimesecret/etc/defaults/config.defaults.yaml:318-336 (the reset-password limiter) and :337-362 (the account-creation limiter and the /24 signup bucket); onetimesecret/etc/defaults/config.defaults.yaml:203-215 (the global guest-routes toggle and the six per-operation switches) with onetimesecret/lib/onetime/logic/guest_route_gating.rb:41-68,72-81 (the two refusals, their codes, and the anonymous-plus-noauth condition) and onetimesecret/.env.reference:998-1002 (API_ENABLED is surfaced only to the web frontend and does not block /api/* server-side, contradicting the shipped comment at config.defaults.yaml:200-201); onetimesecret/etc/defaults/config.defaults.yaml:944 with onetimesecret/lib/onetime/config.rb:963 (the from-address ships as a placeholder and only SECRET is checked for CHANGEME at boot); onetimesecret/lib/onetime/cli/customers/sync_auth_accounts_command.rb:56 (the simple-to-full migration command and its full-mode guard); onetimesecret/lib/onetime/security/login_rate_limiter.rb:7-13,26-32,57,63,66,69,103-118,130-155,164-176,186-198,221-225 with onetimesecret/apps/web/core/logic/authentication/authenticate_session.rb:15,32-41,78-92,112-116,269-275 (simple mode's own two-tier login lockout, its four hardcoded constants, the refusal message, and the ordering that gates a locked subject ahead of the password comparison); onetimesecret/apps/api/v1/routes.txt:23,29-31,35-37,40-42 with onetimesecret/apps/api/v1/controllers/index.rb:66-67,86-87,106-107,152-154,172-173,191-192 (v1's anonymous receipt and burn routes, their /private and /metadata aliases, and the four handlers the v1 rate limit is actually counted on — receipt and burn call no limiter); onetimesecret/apps/api/invite/routes.txt:19 and onetimesecret/apps/api/invite/auth_strategies.rb:30,33-37 with onetimesecret/apps/api/invite/logic/invites/signup_and_accept.rb:74,221-240, onetimesecret/apps/web/auth/router.rb:127,144 and onetimesecret/apps/web/auth/config/hooks/create_account.rb:60-63 (the noauth invite-signup route creates a Rodauth account through an internal request, which runs the same route block — so the before_create_account allowlist applies — but never passes through the router where the /auth kill switch lives)
---

Authentication has two settings and they are independent. One is the master
switch over the account settings; the other decides where accounts live.
Deciding them in that order is the whole of the setup.

## The two switches

`site.authentication.enabled`, environment variable `AUTH_ENABLED`, ships **on**.
Set it to anything other than exactly `true` and every key under
`site.authentication` is force-set to `false` — sign-in, signup, autoverify, the
homepage gate and the signup-domain allowlist all go with it.

It is also the one key in that section that closes endpoints rather than hiding
controls, and in full mode it is the only one that does — see
[Running a closed instance](#running-a-closed-instance). What it does not do is
override the mode: which application serves `/auth/*` still follows the mode
alone. Nor does it close the anonymous v1 API routes.

The mode, environment variable `AUTHENTICATION_MODE`, ships **`simple`**. It
decides where accounts are stored and which authentication features can exist at
all.

Decide the mode before the instance has accounts in it: the two modes use
different stores, and moving between them is a migration rather than a restart.
[Simple or Full mode](/en/self-hosting/simple-or-full-auth) is the decision
guide. This page is what each setting does.

### Where the mode key lives, and the two values it takes

The mode is the **top-level `mode:`** in `etc/auth.yaml`. It is not a key under
`site.authentication` in the main config file, and there is no
`authentication.mode` — writing one has no effect on anything.

It accepts exactly two values, `simple` and `full`. Any other value, including
the plausible-looking `disabled`, resolves silently to `simple`. A typo here
does not fail the boot; it gives you simple mode with no complaint. There is no
third mode, and switching authentication off is `AUTH_ENABLED`, a different key
in a different file.

Confirm what you actually got from the boot log, which prints one of:

```text
AUTHENTICATION MODE: Simple (Core handles /auth/*)
AUTHENTICATION MODE: Full (Rodauth enabled)
```

## What switching authentication off actually does

When `site.authentication.enabled` is anything other than exactly `true`, every
key under `site.authentication` is force-set to `false` — a blanket loop over
the whole section, not a per-key decision. `allowed_signup_domains` becomes the
boolean `false` rather than an empty list.

So this is not a way to keep the settings below and merely hide the sign-in
form: they all go together.

The cascade is not the whole of what the switch does. Turning it off also
unregisters the session-authentication strategy in every application at boot, so
any route that declares it stops resolving — a request to one gets **401**, not
404, and the refusal comes from the routing library rather than from the
application, which is why no matching error string exists in the source. Public
routes are unaffected; the no-auth strategy is always registered.

In full mode it does one thing more: it darkens the whole `/auth` surface. The
Rodauth router tests `site.authentication.enabled == true` before it processes
anything, and when the test fails it returns 404 for every path under `/auth`
except `/auth/health`, which stays reachable on purpose because it is a monitored
path. No credential is read and no session is minted.

The cascade itself stops at that section. It does not touch the anonymous secret
routes, and in particular it does not close API v1 —
[Running a closed instance](#running-a-closed-instance) is where that limit is
spelled out. `AUTH_ENABLED=false` is the setting for an instance that sits
behind a VPN or a proxy which has already authenticated whoever reaches it.

## What full mode adds

In simple mode the Rodauth application is not loaded at all — it is dropped from
the scan before the app boots, and Core serves `/auth/*` instead. Full mode
loads it and keeps accounts in a SQL database, `sqlite://data/auth.db` unless
`AUTH_DATABASE_URL` says otherwise.

Everything in the table below is full-mode only, through one shared mechanism:
each feature predicate returns false unless the mode is `full`, whatever the
environment variable says. Setting `AUTH_MFA_ENABLED=true` on a simple-mode
instance gets you nothing at all.

| Feature | Environment variable | Ships |
|---|---|---|
| Brute-force lockout | `AUTH_LOCKOUT_ENABLED` | on |
| Password strength requirements | `AUTH_PASSWORD_REQUIREMENTS_ENABLED` | on |
| Active-session tracking | `AUTH_ACTIVE_SESSIONS_ENABLED` | on |
| Remember me | `AUTH_REMEMBER_ME_ENABLED` | on |
| Email verification | `AUTH_VERIFY_ACCOUNT_ENABLED` | on, and off when `RACK_ENV=test` |
| MFA (TOTP and recovery codes) | `AUTH_MFA_ENABLED` | off |
| Magic links | `AUTH_EMAIL_AUTH_ENABLED` | off |
| WebAuthn | `AUTH_WEBAUTHN_ENABLED` | off |
| SSO | `AUTH_SSO_ENABLED` | off |

The two halves of that table read their variables differently, and the shipped
config says so. A feature that ships on is disabled only by the literal string
`false`; a feature that ships off is enabled only by the literal string `true`.
Neither responds to `0`, `no` or an empty value.

`AUTH_SSO_ENABLED` is a master switch and not sufficient on its own: each
provider additionally registers only when every one of its own credentials is
present and non-empty. [Configure SSO](/en/configure/sso) has the four providers
and what each one requires.

### Full mode will not boot without two more secrets

Full mode needs `AUTH_SECRET` and `ACCOUNT_ID_SECRET` — the second at least 32
bytes — and in production the authentication layer raises at boot when either is
missing. An unset `RACK_ENV` fails closed to production, so "I never set
`RACK_ENV`" is not an exemption.

Both are independent of `SECRET` and of each other. Neither is derived from
`SECRET`, neither can be regenerated from it, and rotating one does not
invalidate the other's in-flight tokens. Back them up with `SECRET`.
[Secrets and keys](/en/configure/secrets-and-keys) is where both are generated,
and what else belongs on the backup list.

On the full Compose stack these two are interpolated with an empty default
rather than the fail-fast form, so Compose starts the containers happily and the
application then dies at boot with nothing at the Compose level explaining it.
[Install with Docker](/en/install/docker) covers the six values that stack needs.

A missing `AUTH_SECRET` also surfaces later, from the TOTP path, as:

```text
AUTH_SECRET environment variable must be set
```

### Moving accounts from simple to full

A migration command exists for moving simple-mode accounts into full mode's
database, and it refuses to run unless full mode is enabled. Run it after the
mode switch, not before.

## Sign-in and sign-up gates

Four keys under `site.authentication`, all shipping in the permissive position
except `autoverify`. What each one does depends on the mode, so the mode is a
column rather than a footnote:

| Key | Environment variable | Ships | Simple mode | Full mode |
|---|---|---|---|---|
| `signin` | `AUTH_SIGNIN` | `true` | Set it false and `POST /auth/login` redirects to `/` instead of authenticating. | No effect on the credential POST. Hides the sign-in, forgot-password and MFA routes in the browser. |
| `signup` | `AUTH_SIGNUP` | `true` | Set it false and `POST /auth/create-account` redirects to `/`. Sign-in keeps working. | No effect on account creation. Hides `/signup` in the browser and drops the sign-up link from the masthead. |
| `autoverify` | `AUTH_AUTOVERIFY` | `false` | New accounts must verify their email address before they can sign in. | Not read on the account-creation path. Full mode verifies through `AUTH_VERIFY_ACCOUNT_ENABLED` instead. |
| `required` | `AUTH_REQUIRED` | `false` | Browser-side only: replaces the homepage for a visitor with no session, header and navigation included. | Identical — it has no server-side reader in either mode. See [Running a closed instance](#running-a-closed-instance). |

The two right-hand columns differ for one reason, and it is the same reason in
every row. Core declares `POST /auth/login` and `POST /auth/create-account`, and
those two handlers are where `AUTH_SIGNIN` and `AUTH_SIGNUP` are read. Full mode
mounts the Rodauth application at `/auth`; requests go to the longest matching
mount prefix, so that application receives every path under `/auth` and Core's
rows never run. Rodauth enables its own `login`, `logout` and `create_account`
features unconditionally and consults no key in this table.

`autoverify` shipping off is the one that catches people on a simple-mode
instance. A new account cannot sign in until it has followed a link in an email,
and nothing at boot checks that the instance can send mail — the shipped
from-address is a placeholder and only `SECRET` is validated against `CHANGEME`.
An instance with unconfigured email therefore boots clean, accepts signups, and
strands every one of them at the verification step. Set up
[outbound email](/en/configure/email) before you open signups, or set
`AUTH_AUTOVERIFY=true` and accept unverified addresses.

Full mode does not read that key. Its verification switch is
`AUTH_VERIFY_ACCOUNT_ENABLED`, covering Rodauth's own `verify_account` feature; it
is on unless set to `false`, and off when `RACK_ENV=test`. The email trap is the
same in both modes — verification is on by default either way, so an instance
that cannot send mail strands its signups either way — but the key you reach for
is different.

## Restricting who can get an account

`site.authentication.allowed_signup_domains` limits signups to an email-domain
allowlist. The environment variable is `ALLOWED_SIGNUP_DOMAIN` — **singular**,
comma-separated — while the YAML key is plural. It ships empty, which allows
every domain.

Matching is exact and case-insensitive on the whole domain. There is no
subdomain wildcarding: `example.com` does not admit `mail.example.com`, so list
every domain you mean.

The allowlist is enforced on all three paths that can create an account — the
Core and API signup path, full mode's Rodauth signup, and SSO first login — and
each of the three resolves a per-domain signup configuration first, falling back
to this global list when none applies.

A rejected signup does not say why. It returns the same generic "Is that a valid
email address?" as any other bad address, deliberately, so that the allowlist
cannot be enumerated by trying domains against the form. An SSO login from a
domain that is not on the list is redirected to
`/signin?auth_error=domain_not_allowed`. Expect the support request to arrive
worded as "the signup form is broken".

Email shape is separately validated against a pattern that mirrors the
PostgreSQL `accounts.valid_email` CHECK constraint, so a SQLite install rejects
exactly the same addresses a PostgreSQL one would.

SSO deserves its own note here: first login through an identity provider
**creates and verifies the account automatically**, and the shipped config says
in as many words that this allows any user of that IdP to create an account. The
signup allowlist is the check that runs on that path.

:::note[On the hosted service]
A custom domain carries its own privacy, sign-in and sign-up settings, set from
the Domain Dashboard rather than from configuration, and a per-domain signup
configuration is resolved ahead of the global allowlist described above. See
[Access and Privacy](/en/custom-domains/access-and-privacy).
:::

## Passwords

The minimum length is hardcoded and differs by mode: **6** characters in simple
mode, **8** in full mode. There is no config key and no environment variable for
either — do not go looking for one.

Full mode adds strength checks beyond length through
`AUTH_PASSWORD_REQUIREMENTS_ENABLED`, on unless set to `false`, which enables
Rodauth's `login_password_requirements_base`.

Password confirmation is not required anywhere; the interface sends a single
password field.

On the reset flow the "same as your current password" error is deliberately
genericised to `invalid password`, so the reset form cannot be used as an oracle
for what the existing password is.

Rodauth's brute-force lockout is the `AUTH_LOCKOUT_ENABLED` row above: full mode
only, and on there unless you disable it. Simple mode has a lockout of its own on
the credential path, a two-tier limiter with no configuration key, described
under [rate limits](#rate-limits-on-the-auth-surface) below.

## The site-admin role

The site-operator role is called `colonel`, and it is granted from the CLI only —
signing up through the web form produces an ordinary customer:

```bash
bin/ots customers role promote me@example.com
bin/ots customers role demote me@example.com
bin/ots customers role list
```

The four valid roles are `colonel`, `admin`, `staff` and `customer`. Creating
the very first one on a fresh instance is covered in
[Verify your install](/en/install/verify).

The two colonel surfaces, `/colonel` and `/api/colonel`, can be restricted to a
list of networks with `site.admin.allowed_cidrs`, environment variable
`ADMIN_ALLOWED_CIDRS`. It ships empty, which is a no-op — every network reaches
them. A request from outside the list gets **404**, not 403, so do not diagnose
a locked-out admin as a routing problem.

That allowlist resolves the client IP through the trusted-proxy layer, and that
layer is off until you switch it on: `site.network.trusted_proxy.enabled`,
environment variable `TRUSTED_PROXY_ENABLED`. While it is off, every request
resolves to the proxy hop instead of the real client, so the allowlist is testing
the wrong address. The mode, header, CIDR and depth settings under it do nothing
until that switch is on — [Reverse proxy and TLS](/en/install/reverse-proxy-and-tls)
covers all of them. A forged `X-Forwarded-For` cannot get around the allowlist.

## Rate limits on the auth surface

Three limiters sit here. Two apply in both modes, ship enabled and are tunable.
The third is simple mode's substitute for the full-mode lockout, and none of its
numbers is a setting.

**Reset-password requests**: 10 per IP address and 30 per email address, in a
3600-second window, with a 3600-second lockout. Tunable with
`RESET_REQUEST_RATE_LIMIT_ENABLED`, `…_MAX_PER_IP`, `…_MAX_PER_EMAIL`,
`…_WINDOW` and `…_LOCKOUT`.

**Unauthenticated account creation**: 10 per IP address in a 3600-second window,
with a 3600-second lockout. Tunable with `CREATE_ACCOUNT_RATE_LIMIT_ENABLED`,
`…_MAX_PER_IP`, `…_WINDOW` and `…_LOCKOUT`. There is no per-email tier, by
necessity — every request in the abuse pattern this stops carries a fresh
address.

The IP bucket for account creation is a whole **/24**, because the address is
masked before it is counted. Behind a reverse proxy this is the same
`TRUSTED_PROXY_ENABLED` problem as above and it ships off: until you switch it on
every signup is counted against the proxy's own /24, so ten signups per hour is
the limit for your entire deployment at once. Again,
[Reverse proxy and TLS](/en/install/reverse-proxy-and-tls) is the page for it. The
shipped config also says to raise the ceiling for dense-NAT populations.

**Failed sign-ins, simple mode**: two tiers counted on the same submission. The
tight tier is keyed on the submitted email address *and* the client IP and locks
after **5** failures; the backstop is keyed on the email address alone and locks
after **30**, which is what bounds an attacker rotating through addresses. The
counting window is 900 seconds and a lockout lasts 1800 seconds. A locked-out
submission is refused with `Too many login attempts. Please try again later.`
before the password is compared, and a sign-in with the right password clears
both tiers. None of those four numbers has a config key or an environment
variable. The split is deliberate: a tight lockout keyed on the email address
alone would let anyone lock a chosen account out from every address at once, so
when no client IP is available only the backstop applies.

## Running a closed instance

Start with the mode. It decides which of the settings below close an endpoint and
which only hide a link, and a lockdown instruction that works in simple mode and
silently does nothing in full mode is worse than no instruction at all.

The application default is `simple`, but the **full Compose stack sets
`AUTHENTICATION_MODE=full`**, so an operator who deployed that stack is in full
mode without ever having typed the variable — and that is the operator most
likely to be locking an instance down. Confirm which one you have from the boot
log before using anything here:

```text
AUTHENTICATION MODE: Simple (Core handles /auth/*)
AUTHENTICATION MODE: Full (Rodauth enabled)
```

### In full mode, `AUTH_ENABLED` is the only account setting that binds

Every other key under `site.authentication` is enforced — where it is enforced at
all — by the Core web app, and Core's enforcement lives on the `/auth/*` POST rows
that the Rodauth application shadows in full mode. So on the full stack, "turn off
signups" and "turn off sign-in" are changes to the browser interface, not access
controls. `AUTH_ENABLED=false` is the setting that closes those endpoints, and it
closes all of them at once.

That leaves three server-side instruments a full-mode operator can use to narrow
rather than close: the signup email-domain allowlist, which Rodauth enforces in
its own account-creation hook; the account-creation and reset-password rate
limits described above, enforced in the same hooks; and whatever sits in front of
the application. Each item below says which modes it holds in.

### The instruments that hold in both modes

- **Admit only your own email domains.**
  `ALLOWED_SIGNUP_DOMAIN=example.com,example.org`. Remember it is exact-match and
  singular. It is enforced on all three account-creation paths — the Core and API
  path, full mode's Rodauth signup, and SSO first login — which makes it the one
  signup restriction that behaves the same in either mode.
- **Close the v2 and v3 guest routes.** `API_GUEST_ROUTES_ENABLED=false` closes
  all six anonymous secret operations at once; `API_GUEST_CONCEAL`,
  `API_GUEST_GENERATE`, `API_GUEST_REVEAL`, `API_GUEST_BURN`, `API_GUEST_SHOW` and
  `API_GUEST_RECEIPT` close them one at a time. All ship on. A refused call gets
  `Guest API access is disabled` (code `GUEST_ROUTES_DISABLED`) or
  `Guest <operation> is disabled`. The gate applies only to a caller who is
  anonymous *and* sent no credentials — an authenticated API caller is never
  subject to it. These switches are read by the v2 and v3 secret logic; the gap
  here is the API version, not the mode. **They do not cover v1** — the box below.
- **Fence the admin surface.** `ADMIN_ALLOWED_CIDRS`, plus `TRUSTED_PROXY_ENABLED`
  and the rest of `site.network.trusted_proxy` if anything sits in front of the
  app.

:::danger[The guest-route switches do not cover API v1]
API v1 mounts unconditionally, in both modes. Nothing under `site.interface.api`
keeps it out of the URL map, its secret endpoints opt into anonymous callers in
the controller, and it never calls the guest-route gate. So with
`API_GUEST_ROUTES_ENABLED=false` and every per-operation switch off, an instance
still serves anonymous `POST /api/v1/share`, `POST /api/v1/generate`,
`POST /api/v1/create` and `POST /api/v1/secret/:key` — and the receipt and burn
routes with them: `GET` and `POST /api/v1/receipt/:key`, which read a secret's
receipt, and `POST /api/v1/receipt/:key/burn`, which destroys the secret. Each of
those last three has two deprecated aliases onto the same handler,
`/api/v1/private/…` and `/api/v1/metadata/…`, so a proxy rule written against the
`/receipt/` form alone leaves them reachable.

`AUTH_ENABLED=false` does not close them either: v1's auth-disabled 404 sits
inside its Basic-Auth branch, so a request that sends no credentials never
reaches it.

What v1 applies to some of these callers is its own rate limit — 1000 creations
and 1000 reveals per client IP per 20-minute fixed window, all three numbers
hardcoded. It is counted on the four create-and-reveal handlers only; the receipt
and burn paths are not counted at all. And it is a ceiling, not a gate. If you
need these routes gone, remove `/api/v1` at the reverse proxy in front of the
app.
:::

### Stopping new accounts is a per-mode question

**In simple mode**, `AUTH_SIGNUP=false` does what its name says:
`POST /auth/create-account` redirects to `/` instead of creating anything, and
sign-in keeps working.

**In full mode it does not.** Rodauth serves account creation and enables that
feature unconditionally, so `AUTH_SIGNUP=false` leaves `POST /auth/create-account`
open and serving. What changes is the browser: `/signup` redirects away and the
sign-up link disappears from the masthead. Anyone who posts to the endpoint
directly still gets an account.

There is no configuration setting that stops account creation in full mode while
leaving sign-in working. The three things that come closest:

- **Narrow instead of stopping.** Set `ALLOWED_SIGNUP_DOMAIN` to the domains you
  actually admit. Rodauth checks it in its own `before_create_account` hook, so
  every other address is rejected — including through SSO, where first login
  otherwise creates and verifies an account automatically.
- **Block the routes in front of the app — there are two.** Refusing
  `POST /auth/create-account` at the reverse proxy closes the signup form; in full
  mode that path belongs to Rodauth and nothing else is served from it. It is not
  the only route that creates an account. `POST /api/invite/:token/signup` takes no
  credentials and creates its Rodauth account through an internal request rather
  than an HTTP one, so neither that proxy rule nor `AUTH_ENABLED=false` reaches it
  — the kill switch that darkens `/auth` lives in the router, and an internal
  request never passes through the router. It will only create an account for the
  address a pending organization invitation was sent to, and the request cannot
  name a different one; the signup domain allowlist above still applies to it,
  because Rodauth runs the same `before_create_account` hook on that path. Block
  both, or know that invited addresses can still sign themselves up.
- **Close the whole surface.** `AUTH_ENABLED=false`, below, if you are willing to
  lose sign-in with it.

### Closing the authentication endpoints outright

`AUTH_ENABLED=false` is the blunt instrument, and it is the only one in this
section that closes endpoints in full mode. Everything under
`site.authentication` goes false with it, the session-authentication strategy is
never registered, so routes that require it answer **401**, and in full mode every
path under `/auth` except `/auth/health` answers 404 before any credential is
read.

Use it only where something in front of the instance has already authenticated
whoever reaches it — a VPN, or a proxy that does its own sign-in. It does not
close the v1 routes in the box above.

### Two settings that are not lockdowns

:::danger[`AUTH_REQUIRED` is a user-interface gate, not an access control]
No server-side code reads it, in either mode. It gates no route, no logic class
and no middleware. The value is shipped to the browser inside the bootstrap
config, and the single-page app reads it there to choose which homepage component
to render.

`AUTH_REQUIRED=true` replaces the homepage for a visitor with no session cookie.
It stops nothing at the API, and it is scoped to the canonical site — a custom
domain governs its own homepage.

It also takes more of the page with it than the shipped config comment claims.
The gated homepage drops the entire header band: no masthead logo, no navigation,
and so no Sign In or Sign Up link. The default placeholder variant, `closed`,
carries no call to action at all, so a user landing on a stock instance with
`AUTH_REQUIRED=true` has nothing to click and has to be told to go to `/signin`
directly. Two other variants, `minimal` and `v1`, do carry a sign-in button, but
they are selected per custom domain rather than by an environment variable — the
canonical site gets `closed`.
:::

- **Take the secret form off the homepage.** `AUTH_REQUIRED=true`, same in both
  modes. Browser-side only, per the box above, and it replaces the header and
  navigation along with the form. Anonymous secret creation through the API is
  untouched — that is what the guest-route switches are for.
- **`API_ENABLED=false` is not part of this.** It does not remove `/api/*`, and
  `/api/*` does not begin returning 404. All it does is make the account API
  settings page in the web interface show a disabled notice; the API keeps
  serving everything it served before, in both modes. The shipped config file's
  own comment on this key claims the opposite and is wrong. If you need `/api/*`
  gone, remove it at the reverse proxy in front of the app.
