---
title: Signing in and resetting your password
description: How to sign in, how to reset a password you cannot remember, and what to do when the reset email does not arrive.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret/apps/web/auth/migrations/001_initial.rb:47-53,78 (account_password_reset_keys.deadline — a reset link is good for 24 hours); onetimesecret/etc/defaults/config.defaults.yaml:468-471 and onetimesecret/lib/onetime/session/remember_me.rb:68-69 (session limits); onetimesecret/apps/web/auth/config/hooks/omniauth.rb:300-544 (linking an existing account during an identity-provider sign-in)
---

This page covers signing in, resetting a forgotten password, and fixing common
sign-in problems. You do not need to be signed in to follow it.

## Sign in

1. **Open the sign-in page for your region.** Each region is a separate service,
   and an account exists only in the region where it was created. See
   [Changing your region](/en/account/change-your-region).
2. **Enter your email address.** Capitalization does not matter. A different
   alias or domain is a different account.
3. **Choose a sign-in method.** Depending on the service, the page can offer a
   password, a single-use sign-in link sent by email, a passkey, or your
   organization's identity provider. Only enabled methods are shown, and some
   installations offer only one.
4. **Enter your second factor, if asked.** If two-factor authentication is on,
   enter the code from your authenticator app or a recovery code. You are not
   signed in until this step succeeds.

Select **Remember me** to stay signed in after you close the browser. With the
service defaults:

- Without Remember me, you are signed out after 24 hours without activity.
- With Remember me, you stay signed in for 14 days from sign-in, whether or not
  you use the account.
- Every session ends 30 days after sign-in.

See [Sessions and connected identities](/en/account/sessions-and-identities)
for what counts as activity and what else ends a session.

Each successful sign-in sends a **"New sign-in to your account"** email. Its
location is a country code or a partially masked network address, not a city. If
the sign-in was not you, reset your password (below). Completing a reset ends
every session on the account.

## Reset a forgotten password

1. **Request a reset link.** On the sign-in page, choose **Forgot your
   password?** and enter the address on the account. You see the same
   confirmation whether or not the address has an account, so the message does
   not confirm that an account exists.
2. **Open the email.** The subject is **"Reset your password"**. Select **Reset
   Password**, or copy the link from the message. The link works for **24
   hours** after it was sent; the email does not state this.
3. **Choose a new password.** Enter it twice. Your current password is not
   accepted as the new one.
4. **Sign in with the new password.** Completing a reset signs out **every**
   session on the account, including the browser you reset from. Any session
   that signed in before the reset is refused.

If the reset page says the key is invalid or missing, the link has expired or
was replaced by a newer one. Request a new link.

## If the reset email doesn't arrive

**The address has no account here.** Nothing is sent. Check for typos and try
other addresses you might have used, such as a work address or an alias.

**The account was never verified, or has been closed.** No reset email is sent
for an account that is not open. If you never verified the account, use the
link in your welcome email (it does not expire) or request a new verification
email.

**You requested a link a moment ago.** A second request inside the resend window
shows the same confirmation without sending another email. Look for the first
email before asking again.

**Too many requests.** Reset requests are rate limited by address and by
network. The network limit counts a range of addresses, so other people on a
shared office, campus or VPN connection can contribute to it. In this case you
see a "too many attempts" message instead of the usual confirmation. Wait, then
try once more.

**It is in spam, or held by a filter.** Check the junk folder and any quarantine
your organization runs.

## Other reasons sign-in fails

**Repeated wrong passwords lock the account.** After several failed attempts,
sign-in refuses that account, including with the correct password. The lock
clears on its own; the page does not say how many attempts remain or when it
lifts. You can request a password reset while locked out. If sign-in still
fails immediately afterwards, wait and try again.

**You have lost your second factor.** Enter a recovery code instead of a code
from your authenticator app. If you have neither, contact support. Two-factor
authentication cannot be turned off by email, because email can already reset
your password. Support restores access after checking that the account is yours.
See [Two-factor authentication and passkeys](/en/account/two-factor-and-passkeys).

**Your email address changed.** After an email change is confirmed, sign in with
the new address. See [Changing your email address](/en/account/change-your-email).

**The account was closed.** A closed account cannot be signed in to or reopened.
You can create a new account with the same address. See
[Closing your account](/en/account/close-your-account).

**You are on the wrong regional site.** If your details are not recognized at
all, check that you are signing in to the region where you created the account.

## If your account uses single sign-on

When you sign in through an identity provider, the provider checks who you are;
your Onetime Secret password is not used.

- **A second factor set up here is not requested.** The identity provider is
  expected to enforce its own. To protect that sign-in route with a second
  factor, configure it at the provider.
- **Linking an existing account requires proof.** If the provider gives an
  address that already has an account, the two are not linked automatically.
  On the main service, you can link them during that sign-in by entering the
  account's password, or by opening a link sent to the address if the account
  has no password; a second factor is also required if the account has one. You
  can also sign in with your existing method and connect the provider under
  Settings → Security → Connected Identities. On an organization's custom
  domain, linking during sign-in is not available; see
  [How an identity is added](/en/account/sessions-and-identities#how-an-identity-is-added).
- **An account created through a provider may have no password.** You can add
  one from Settings → Security. The service emails you a link to set it, as in a
  reset. After that, either method signs you in.
- **You cannot remove your only way in.** Removing a connected identity is
  refused when it is the account's last sign-in method.

Where a service is configured for single sign-on only, password sign-in and
password reset are not offered. To set up SSO for an organization, see
[Single sign-on](/en/organizations/sso).

## Related

- [Two-factor authentication and passkeys](/en/account/two-factor-and-passkeys)
  — adding a second factor, and what it does and does not cover.
- [Sessions and connected identities](/en/account/sessions-and-identities) —
  what is signed in right now, and signing other devices out.
- [Changing your email address](/en/account/change-your-email) — the two-step
  confirmation and what it signs out.
- [Closing your account](/en/account/close-your-account) — what closing deletes,
  and using the same address again.

## Questions or need support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
