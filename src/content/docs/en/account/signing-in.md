---
title: Signing in and resetting your password
description: How to sign in, how to reset a password you cannot remember, and what to do when the reset email does not arrive.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret/apps/web/auth/migrations/001_initial.rb:47-53,78 (account_password_reset_keys.deadline — a reset link is good for 24 hours)
---

This page is about getting into your account: signing in, resetting a password
you no longer have, and the handful of reasons either one fails. You do not
need to be signed in to follow any of it.

## Sign in

Your email address is your account name, and capitalisation does not matter —
the address is normalised before it is looked up. Everything else about it
does matter: a different alias or a different domain is a different account.

Onetime Secret can offer more than one way in — a password, a single-use
sign-in link sent to your address, a passkey, or your organisation's identity
provider. Not all of them are turned on everywhere. The sign-in page shows
only the methods enabled for the service you are using, so if you do not see
one, it is not available to you. Some installations are deliberately
restricted to a single method.

"Remember me" keeps you signed in after you close the browser. It does not
last indefinitely — it has its own expiry, after which you sign in again.
Separately from that, a session ends after a stretch of inactivity and has a
maximum life however active you are; both windows are set out on
[Sessions and connected identities](/en/account/sessions-and-identities).

If two-factor authentication is on for your account, sign-in stops and asks
for a code before you are signed in. Until the second step succeeds the
browser holds nothing that can reach your account — there is no
partly-signed-in state that grants access.

Every successful sign-in sends you a **"New sign-in to your account"** email.
Its "location" is a network address rather than a city: there is no
geo-location lookup, and the address is masked for privacy before it is
recorded. A value that looks unfamiliar may therefore just be your network.
If a sign-in was not you, reset your password (below): completing a reset ends
every other session on the account.

:::note
Regions are separate systems, and an account belongs to the region it was
created in. The same address can have an account in one region and none in
another, so if your details are not recognised at all, check that you are on
the right regional site. See
[Changing your region](/en/account/change-your-region).
:::

## If your account uses single sign-on

Signing in through an identity provider does not involve your Onetime Secret
password — the provider decides whether you get in. Four consequences are
worth knowing:

- **An SSO sign-in skips any second factor set on the account here.** The
  identity provider is trusted to enforce its own factors instead. Turning on
  two-factor authentication therefore does not, by itself, protect an account
  that can also be signed in through a provider — the protection has to be
  configured at the provider.
- **Matching addresses are not linked for you.** If a provider offers an
  address that already has a password account, the two are not joined
  automatically. Sign in with the method you already have, then connect the
  provider under Settings → Security → Connected identities.
- **An account created through a provider may have no password at all.** You
  can add one from Settings → Security: the service emails you a link to set
  it, using the same emailed-link flow as a reset. After that, either method
  signs you in.
- **You cannot remove your only remaining way in.** Removing a connected
  identity is refused when it is the last credential on the account.

Where a service is configured for single sign-on only, password sign-in and
password reset are not offered at all. For setting up SSO for an organisation,
see [Single sign-on](/en/organizations/sso).

## Reset a forgotten password

### 1. Ask for a reset link

From the sign-in page, follow **"Forgot your password?"** and enter the
address on the account.

### 2. Expect the same answer either way

You get the same confirmation — *"An email has been sent to you with a link to
reset the password for your account"* — whether or not that address has an
account. It is not a signal that the account exists. (Why: see below.)

### 3. Open the link in the email

The message has the subject **"Reset your password"**, a **Reset Password**
button, the same link in plain text so you can copy it, and a closing line
naming the address it was sent to. It does not tell you how long it is good
for: the answer is **24 hours** from when it was sent. If the reset page says
the key is invalid or missing, ask for a new link. Requests are rate limited,
so ask once and wait for the mail rather than retrying in a loop.

### 4. Choose a new password

Enter the new password twice. Your current password is not accepted as the new
one, and the rejection is a generic invalid-password message that does not
confirm whether the guess was right.

### What a completed reset does

Completing a reset signs out **every** session on the account, including the
browser you reset from. That is the point: anyone else who was signed in loses
access at that moment. The account also records when the password changed, and
any session that signed in before that moment is rejected — so a session that
was somehow missed still cannot be used. You are returned to the sign-in page
and sign in with the new password.

## Why the reset page never says whether an address is registered

If the answers differed — "we sent it" for a real account, "no such account"
for anything else — anyone could type addresses into the form and learn which
ones have Onetime Secret accounts. That would be a fact about our users, given
away to whoever asked. So every ending is worded identically: an unknown
address, an address whose account is not open, and an address that was sent a
link moments ago all produce the same confirmation.

For an unknown address, nothing happens beyond that message. No reset record
is created and no email is sent — the response is the whole of it.

The same reasoning shows up elsewhere: signing up with an address that already
has an account returns a generic "unable to create account" rather than saying
the address is taken.

## When the reset email doesn't arrive

**The address has no account here.** Nothing was sent. Check for typos, and
for the other addresses you might have signed up with — work and personal, or
an alias.

**The account was never verified, or has been closed.** No reset email is sent
for an account that is not open. If you signed up and never opened the welcome
email, use the verification link in it — that link does not expire, so an old
welcome email still works — or ask for a new verification email.

**You already asked a moment ago.** A second request inside the resend window
returns the same confirmation *without* sending a second email. Look for the
first one before asking again.

**Too many requests.** Reset requests are rate limited per address and per
network, and the network side counts a range of addresses rather than yours
alone — so a shared office, campus or VPN connection can reach the limit
through other people's requests. This is the one case that does look
different: you get a "too many attempts" message instead of the usual
confirmation. Wait, then try once more.

**It is in spam, or held by a filter.** Check the junk folder and any
quarantine your organisation runs before concluding nothing was sent.

## Other reasons sign-in fails

**Repeated wrong passwords lock the account.** After several failed attempts,
sign-in stops accepting that account and the correct password will not work
either. The lock is temporary and clears on its own; the sign-in page will not
tell you how many attempts remain or when it lifts. Requesting a password
reset does not require signing in, so you can start one while locked out — and
if sign-in still fails immediately afterwards, wait a while and try again.

**You have lost your second factor.** Sign in with one of your recovery codes
instead of a code from your authenticator app. If you have neither the
authenticator nor an unused recovery code, contact support: there is
deliberately no email-based way around two-factor authentication, because
email can already reset a password, so an email bypass would make the second
factor worthless. Restoring access is a manual, identity-checked action. See
[Two-factor authentication and passkeys](/en/account/two-factor-and-passkeys).

**Your email address changed.** Once an email change is confirmed, the old
address stops working for sign-in and the new one is the login. See
[Changing your email address](/en/account/change-your-email).

**The account was closed.** Closing an account permanently deletes its sign-in
record — password, second factor, passkeys and all. It cannot be restored. See
[Closing your account](/en/account/close-your-account).

## Related

- [Two-factor authentication and passkeys](/en/account/two-factor-and-passkeys)
  — adding a second factor, and what it does and does not cover.
- [Sessions and connected identities](/en/account/sessions-and-identities) —
  what is signed in right now, and signing other devices out.
- [Changing your email address](/en/account/change-your-email) — the two-step
  confirmation and what it signs out.
- [Security best practices](/en/security/best-practices) — including how to
  handle a sign-in alert you did not expect.

## Questions or need support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
