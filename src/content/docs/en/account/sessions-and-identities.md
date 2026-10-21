---
title: Sessions and connected identities
description: How long a signed-in session lasts, how to see and end sessions, and how identity providers are linked to and removed from your account.
audience: end-user
pageType: reference
sourceOfTruth: onetimesecret/etc/defaults/config.defaults.yaml:468-471 (24-hour inactivity and 30-day maximum session defaults); onetimesecret/lib/onetime/session/remember_me.rb:68-69 (14-day remember-me limit from sign-in); onetimesecret/apps/web/auth/routes/active_sessions.rb:60-137 (Active Sessions fields, Remove and Logout All Other Sessions); onetimesecret/lib/onetime/session/active_session_gate.rb with onetimesecret/lib/onetime/application/auth_strategies/base_session_auth_strategy.rb:32-41 (a removed session is refused on its next request); onetimesecret/apps/web/auth/config/hooks/omniauth.rb:300-544 (linking an existing account at sign-in, and the custom-domain refusal)
---

Settings → Security shows the sessions signed in to your account and the
identity providers linked to it. This page explains how long a session lasts,
how to end one, and how linked identities work.

## What a session is

A session is one signed-in browser on one device.

Several sessions can be signed in at once. Signing in somewhere new does not
sign you out anywhere else, and there is no limit on the number of sessions.

On an account with two-factor authentication, a sign-in that has not passed the
code prompt cannot be used for anything.

## How long a session lasts

A session ends at the first of these limits:

| Limit | Default | Applies to |
|---|---|---|
| Inactivity | 24 hours without a request from that browser | Sessions signed in without **Remember me** |
| Remember me | 14 days after sign-in, however active the session is | Sessions signed in with **Remember me** |
| Maximum length | 30 days after sign-in, however active the session is | Every session |

A session without Remember me continues while you use it at least once every 24
hours, for up to 30 days. A session with Remember me is not signed out for
inactivity, and ends 14 days after sign-in.

Activity means pages and actions you request. Automatic background checks from
an open tab do not count, so leaving a tab open does not keep a session signed
in.

These limits apply to the whole service and cannot be changed from your account.
A self-hosted installation can set different values, and can turn Remember me
off; see [Environment variables](/en/self-hosting/environment-variables).

## What ends a session

| Event | Sessions ended |
|-------|--------------|
| Signing out | That session |
| Reaching a limit in the table above | That session |
| **Remove** in Active Sessions | The removed session |
| **Logout All Other Sessions** | Every session except the one you are using |
| Changing your password from settings | Every **other** session; the one you changed it from continues |
| Completing a password reset | **Every** session, including the browser you reset from |
| Confirming a change of email address | **Every** session, including the browser that opened the confirmation link |
| Closing your account | Every session |

A password change also stops older sessions from being used. The account
records when its password last changed and refuses any session that signed in
before then.

## Seeing and ending sessions

**Settings → Security → Active Sessions** lists the sessions signed in to your
account. The one you are using is marked **Current**. Each entry shows:

- the browser, identified from its user-agent string, with the full string
  under **View user agent**;
- the partially masked network address the session signed in from, and its
  country when known;
- when the session was created and when it was last active;
- whether it was signed in with Remember me.

The browser name is identified from the user-agent string, so it may not be
exact. An entry with no recorded browser details shows **Unknown Browser**.

**Remove** ends that session. The browser is refused on its next request and
must sign in again. **Logout All Other Sessions** does the same for every
session except the one you are using. To end your own session, sign out.

If you do not recognize a session, remove it and change your password. The
password change ends every other session and refuses any session that signed in
before it.

Every successful sign-in also sends a **"New sign-in to your account"** email.
It shows the browser's user-agent string under **Device**. Under **Location** it
shows a country code, or the partially masked network address when no country is
available. If you do not recognize the sign-in, follow the steps above.

:::note
Active Sessions and Connected Identities require the full authentication mode.
Active Sessions also requires session tracking, which is on by default. On a
self-hosted installation without them, these sections are not shown; the time
limits above still apply. See
[Simple or full authentication](/en/self-hosting/simple-or-full-auth).
:::

## What a connected identity is

A connected identity records that an account at an identity provider belongs to
you. It records the provider, the issuer the provider identified itself as, and
the identifier the provider uses for you. The identifier is shown masked.

**Settings → Security → Connected Identities** lists them. The section appears
only where single sign-on is enabled for the service you are using. You can see
and remove only your own identities.

**Signing in through an identity provider skips any second factor configured
here.** The provider is expected to enforce its own. See
[Two-factor authentication and passkeys](/en/account/two-factor-and-passkeys)
and [Single sign-on](/en/organizations/sso).

## How an identity is added

The rule underneath all of the paths below: an email address may **locate** an
account, but only a demonstrated credential may **attach** an identity to it. A
provider asserting an address that already has an account here never, on its
own, links anything.

- **From your settings, while signed in.** Connected Identities offers a Connect
  button for each provider the service offers that you have not already linked.
  Choosing one sends you to the provider and back, and the returning identity
  binds to the account you were already signed in to.
- **At sign-in, by proving the existing account is yours.** When a provider
  offers an address that already has an account, you are asked for that
  account's password first — or, if it has no password, for a single-use link
  sent to the address on file. The identity attaches once you satisfy that step,
  and if the account has a second factor the attachment waits until the second
  factor succeeds.
- **By signing in through a provider for the first time.** Where no account
  exists for the address, one is created and the identity is attached to it as
  part of that first sign-in.

Only providers you have not already linked are offered, so a provider already
present in the list has no Connect button.

Proving ownership at sign-in is available on the main service only. On an organization's
custom domain, a provider sign-in for an address that already has an account is
refused. If you can sign in on that domain another way with an account that
belongs to the organization, do that and connect the provider from Connected
Identities. Otherwise, ask an organization owner to invite that identity, or
contact support.

:::note
A self-hosted operator who controls both the service and the identity provider
can declare a provider trusted, which links a matching address on sign-in
without the proof step. It is off by default, applies only on the main service,
and does not apply when the provider reports the address as unverified.
:::

## How an identity is removed

Removing an identity takes effect for future sign-ins. It does **not** end
sessions that are already signed in; those are untouched, and end only in the
ways listed under [What ends a session](#what-ends-a-session).

There is one refusal. An account whose only way in is a single identity — no
password, one linked provider — cannot remove it; the request is rejected rather
than leaving the account unreachable. Connect a second provider first, or set a
password where password sign-in is available for your account, and then remove
it. An account that has a password may remove any identity, including its last.

## When a provider is no longer offered

Withdrawing a provider — an organization deleting the single sign-on
configuration for its domain, or an operator removing one from the service —
deletes the configuration. It does not delete the identities already linked to
accounts. The identity stays listed, but it is no longer a route in, because a
provider that is not configured is not offered at sign-in.

The refusal described above counts linked identities and whether the account has
a password. It does not check whether a provider still works. An account whose
only sign-in method was a provider that has since been withdrawn is therefore
not handed a replacement automatically.

The practical consequence: add a second way in *before* a provider you depend on
is retired. If you are already locked out that way, contact support — restoring
access is a manual, identity-checked action.

## Related

- [Signing in](/en/account/signing-in) — the methods available, and what an
  identity provider changes about signing in.
- [Two-factor authentication and passkeys](/en/account/two-factor-and-passkeys)
  — what a second factor covers, and what it does not.
- [Single sign-on](/en/organizations/sso) — configuring a provider for an
  organization.
- [Changing your email address](/en/account/change-your-email) — a confirmed
  change signs out everything.
- [Closing your account](/en/account/close-your-account) — what is deleted and
  what is kept.

## Questions or need support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
