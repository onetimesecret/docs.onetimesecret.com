---
title: Sessions and connected identities
description: What a signed-in session is, how long it lasts, what ends it, and what an identity provider linked to your account does and does not do.
audience: end-user
pageType: reference
sourceOfTruth: onetimesecret/lib/onetime/application/auth_strategies/base_session_auth_strategy.rb:29-88 (the per-request gate that decides whether a signed-in browser is admitted); onetimesecret/lib/onetime/session.rb:696-697 (session lifetime refreshed on every write)
---

Two things are recorded about how you reach your account: the sessions that are
signed in right now, and the identity providers linked to it. Both live under
Settings → Security. This page states what each one is, what changes it, and
what it does and does not tell you.

## What a session is

A session is one signed-in browser on one device.

More than one session can be signed in at once. Signing in somewhere new does
not sign you out anywhere else, and nothing caps how many sessions an account
may have open.

On an account with a second factor, the browser cannot use the account until the
code is accepted. A sign-in stopped at the code prompt is held in a state that
every request refuses, so nothing can be done with it.

The session identifiers held for the Active Sessions list are hashed rather than
kept in the clear, so an entry is matched against a fingerprint rather than
against anything reusable.

## How long a session lasts

A signed-in browser stays signed in while it keeps being used, and is dropped
after a stretch of not being used.

What holds it open is an encrypted session record on the server. Every request
re-saves that record and pushes its expiry further out, so the window is a
rolling one: it runs from the last request, not from the sign-in. Stop making
requests for longer than the window and the record expires, and the browser is
signed out.

Only requests move that window; whether a tab is left open or closed makes no
difference in itself. The length of the window is a property of the service
rather than something you can change from your account — it is the
`session.expire_after` setting documented on
[Configuration](/en/self-hosting/configuration).

"Remember me" is a separate mechanism with its own fixed life and is described
on [Signing in](/en/account/signing-in).

## What ends a session

| Event | What it ends |
|-------|--------------|
| Signing out | That session |
| Going long enough without being used | That session |
| Changing your password from settings | Every **other** session; the one you changed it from continues |
| Completing a password reset | **Every** session, including the browser you reset from |
| Confirming a change of email address | **Every** session, including the browser that opened the confirmation link |
| Closing your account | Every session, immediately |

Revocation after a password change is not best-effort. The account records the
moment its password last changed, and any session that authenticated before that
moment is refused — so a session that was somehow missed by the sweep still
cannot be used. That makes changing your password the dependable way to shut a
browser out, and it is the action to reach for when you need certainty.

## Seeing and ending sessions

**Settings → Security → Active Sessions** shows the session you are using on its
own, and the account's other sessions in a list below it. Each entry gives the
time the session was recorded, and a time labelled as its last activity. That
second time only moves when that browser itself opens this page, so for most
entries it stays close to when the sign-in happened rather than tracking use.

Other entries carry a Remove control. The one you are using does not — ending
that one means signing out. **Logout All Other Sessions** clears every other
entry in one step.

:::caution
Remove and **Logout All Other Sessions** clear entries from this list. They do
not delete the other browser's session record, which is held separately and is
what actually admits its requests. If you need to be certain a device can no
longer reach your account, change your password — that deletes the session
records themselves, and the account then refuses anything that authenticated
before the change.
:::

The list does not show which device, browser, network or place a session came
from. There is no origin column, and every entry is headed **Unknown Browser**
whichever browser it belongs to, so the heading tells you nothing about it. If
an entry you cannot account for is listed, do not try to identify it from here:
remove it, and change your password.

Every successful sign-in also sends a **"New sign-in to your account"** email,
and that email — not this list — is where the origin of a sign-in is reported.
It reports the identification string the browser sent, under **Device**, and the
IP address the sign-in came from, under **Location** — no geo-IP lookup is
performed, so **Location** is the address itself rather than a place. See
[Security best practices](/en/security/best-practices).

## What a connected identity is

A connected identity is a record that a particular account at a particular
identity provider is you. It holds three things: which provider, which issuer
that provider identified itself as, and the opaque identifier the provider knows
you by — shown masked, since the full value is never needed to manage it. It
holds nothing else, and it carries no connection date, because the record has no
date on it.

**Settings → Security → Connected Identities** lists them. The section only
appears where single sign-on is switched on for the service you are using. You
can only ever see or remove your own identities; there is no path to another
account's, and an identifier that belongs to someone else resolves to nothing.

One consequence is worth stating plainly: **signing in through an identity
provider skips any second factor configured here.** The provider is trusted to
enforce its own. See
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

The second path above is offered on the main service. Where the sign-in runs on
an organisation's own custom domain, an address that already has an account is
refused instead, with a message telling you to sign in with your existing method
and link the provider from your settings.

:::note
A self-hosted operator who controls both the service and the identity provider
can declare a provider trusted, which links a matching address on sign-in
without the proof step. It is off unless deliberately switched on, and it is not
available to a custom domain's own single sign-on.
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

Withdrawing a provider — an organisation deleting the single sign-on
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

:::note
Session tracking and connected identities are both part of the full
authentication mode. On a self-hosted install running the simpler mode, the
whole Security section is absent and neither surface exists. See
[Simple or full authentication](/en/self-hosting/simple-or-full-auth).
:::

## Related

- [Signing in](/en/account/signing-in) — the methods available, and what an
  identity provider changes about signing in.
- [Two-factor authentication and passkeys](/en/account/two-factor-and-passkeys)
  — what a second factor covers, and what it does not.
- [Single sign-on](/en/organizations/sso) — configuring a provider for an
  organisation.
- [Changing your email address](/en/account/change-your-email) — a confirmed
  change signs out everything.
- [Closing your account](/en/account/close-your-account) — what is deleted and
  what is kept.

## Questions or need support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
