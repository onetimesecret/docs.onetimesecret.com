---
title: Closing your account
description: What closing your account deletes, what it keeps and for how long, what happens to secret links you have already shared, and how to close it.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret/lib/onetime/models/features/right_to_be_forgotten.rb:54-70 (the retained customer record is set to expire 365 days after closure); onetimesecret/apps/web/auth/operations/create_customer.rb:56-58 (an identity-provider sign-up reuses the retained customer record found by email)
---

Closing your account deletes everything you sign in with and signs out the
devices you were using. It happens the moment you confirm. It is not a
deactivation, and it is not the same thing as deleting your secrets.

Read this page before you start. The two things people most often expect and
do not get are an undo, and the destruction of links they have already shared.

## What closing your account destroys

**Everything you sign in with.** Your password, your two-factor secret and its
recovery codes, any "remember me" tokens, any pending password reset, and the
sign-in record itself are all deleted — along with every other sign-in method
registered on the account and any identity-provider connection linked to it.
Nothing is left to authenticate against. See
[Two-factor authentication and passkeys](/en/account/two-factor-and-passkeys).

**Your sessions.** Stored sessions for the account are deleted as part of the
closure, so devices you were signed in on stop working. See
[Sessions and connected identities](/en/account/sessions-and-identities).

**Your authentication history.** The log of sign-ins, password changes and
second-factor events on your account is deleted along with the account.

**Your API token.** It is replaced with a new value that is never shown to you,
so any token you had in use stops working.

No part of the closure is staged or delayed — the deletion happens when you
confirm, not after a cooling-off period. There is no undo, and signing in again
with a password is not possible: the sign-in record is gone and nothing
re-creates it.

:::caution
**An identity provider can put you back on the record.** Closing deletes the
identity-provider connection along with the sign-in record, but it does not
stop you signing in through that provider again. Doing so creates a fresh
sign-in record — and because the customer record the closure kept is still
found by your email address, the new sign-in is attached to that same closed
record rather than to a new account. Nothing about the closure is reversed by
this: the record is still marked as closed by the account holder. If you want
back in properly, contact support rather than signing in again through the
provider. See [Signing in](/en/account/signing-in).
:::

## What is kept, and for how long

A customer record survives the closure. It is not an account any more: its
password is cleared, its verified status is cleared, its API token has been
replaced, and its role is changed to mark it as closed by the account holder.
You cannot sign in to it with a password, because the thing that let you do
that is gone.

It is kept so that anything still outstanding on the account can be settled
afterwards, and it is set to expire on its own **365 days** after closure.

**Your email address stays claimed.** Signing up again with the same address
and a password is refused, with the same deliberately vague "unable to create
account" message the sign-up form gives for any address it will not accept.
The 365 days applies to the record, not to the claim: releasing the address is
not part of the closure at all, so do not count on it becoming available again
when the record goes. If you expect to want an account on that address again,
contact support rather than closing and re-registering.

**Activity recorded against organizations stays with those organizations.**
Events attributed to you in an organization's activity trail — secrets created,
opened, revealed, burned — are not removed by closing your account. They are
kept by the organization rather than by you, and the trail is trimmed by size
rather than by age, so there is no point at which they age out. See
[Secret Activity](/en/organizations/audit-trail).

## What closing your account does not touch

:::caution
Closing your account does **not** destroy the secrets you have already shared.
A secret link ends when it is viewed, when someone burns it, or when its
lifetime runs out — and closing your account does none of those three things.
:::

**Secret links already out there.** Anything still outstanding when you close
stays outstanding and stays usable by whoever holds the link. Worse, you lose
the ability to find it: the list of what you created is only reachable while
signed in. Burn what you do not want left live *before* you close — see
[Before you start](#before-you-start).

**Organizations you belong to.** Membership is not removed by closing your
account, and closing does not hand your organization to anyone else. If you are
the only owner of an organization, closing your account leaves it with an owner
who can no longer sign in, and ownership cannot be transferred from within the
app. Sort that out first. See [Organizations](/en/organizations).

**Custom domains.** A custom domain belongs to the organization that added it,
not to you personally, so it stays with the organization and keeps working. See
[Custom domains](/en/custom-domains).

## Before you start

- **Burn any secret you do not want to outlive the account.** Open
  [Recent secrets](/en/account/dashboard-and-recent-secrets), open the receipt
  for each link you want gone, and burn it. Burning is permanent and the
  recipient then sees the same "no longer available" page as for any expired
  link. See [Your receipt](/en/share/your-receipt).
- **Copy anything you still need.** There is no data export, and once the
  account is closed you cannot sign in to look anything up.
- **Deal with organizations you own.** Transfer of ownership is not a
  self-service action, so if you own an organization other people use, arrange
  it with support before you close.
- **Have your password ready.** The closure will not proceed without it, and an
  account created through an identity provider may not have one. If yours does
  not, set a password first from Settings → Security; see
  [Signing in](/en/account/signing-in).

## Close your account

### 1. Open the closing screen

Go to Settings → Advanced → **Careful Consideration Zone**, and find **Close
Account**. Before you go further it tells you the same thing this page does:
secrets remain active until they expire, and anything you want removed should
be burned before you continue.

### 2. Confirm with your password

Choose **Permanently Delete Account**. You are asked *"Are you sure you want to
permanently delete your account? This action cannot be undone."* and for your
current password. The password is checked before anything is deleted: a wrong
one stops the closure with the account untouched.

### 3. Confirm the deletion

Choosing **Delete Account** carries out the closure. There is no further
confirmation step, no emailed link to open, and no waiting period.

## Verify it worked

You are signed out and returned to the home page. Signing in with that address
and a password no longer works, and neither does a password reset for it — a
reset request returns the same "an email has been sent" message it returns for
any address, but nothing is sent for an account that is not open.

No confirmation email follows. Its absence does not mean the closure failed.

If the screen reports an error instead, treat the account as still open: sign
in again and check where you stand rather than assuming it went through anyway.

## If you cannot close your account from the app

**The option is not in Settings.** The Careful Consideration Zone is shown only
to people whose role in the organization they are currently working in is owner
or admin. If you joined by invitation as a member, it is not offered to you —
contact support to have the account closed.

**Your account has no password.** An account created through an identity
provider may never have had one, and the closure cannot be confirmed without
it. Set a password first from Settings → Security — the service emails you a
link to set it — then come back. See [Signing in](/en/account/signing-in).

**The service is configured for single sign-on only.** Where sign-in is
restricted to an identity provider, closing the account from the app is not
available at all; the provider owns the account and password-based account
management is switched off.

**"Please check the password."** The closure is refused before anything is
deleted. If you cannot remember the password, reset it first — but note that
completing a reset signs out every session on the account, including yours. See
[Signing in](/en/account/signing-in).

## Related

- [Your receipt](/en/share/your-receipt) — burning a secret before anyone reads
  it, which is what to do before closing.
- [Your dashboard and recent secrets](/en/account/dashboard-and-recent-secrets)
  — finding the links you still have outstanding.
- [Changing your email address](/en/account/change-your-email) — the other
  irreversible account change, and the one to use if you only want a different
  address.
- [Sessions and connected identities](/en/account/sessions-and-identities) — if
  what you actually want is to sign a device out.
- [Signing in](/en/account/signing-in) — password resets, and why a reset for a
  closed account looks like it worked.

## Questions or need support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
