---
title: Changing your email address
description: Change the email address you sign in with. The change is confirmed from the new address and signs out every session; this page covers the prerequisites, the steps, and what changes.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret/apps/api/account/logic/account/request_email_change.rb:120-121 (24-hour TTL set once, at request time); onetimesecret/lib/onetime/mail/views/email_change_confirmation.rb:21,56-57 (the mail always states 24 hours); onetimesecret/apps/api/account/logic/account/resend_email_change_confirmation.rb:82-90 (a re-send reuses the same secret and does not refresh its expiry)
---

Your email address is your account name, so changing it changes how you sign
in. You confirm the change from the **new** address, and nothing about your
account changes until you open that confirmation link.

## Before you start

- **Your role must be owner or admin.** **Change Email** appears only when your
  role in the organization you are currently working in is owner or admin. If
  you have your own workspace, select it with the workspace switcher on your
  dashboard, then reload the page. An account created by accepting an
  invitation, or through single sign-on on an organization's custom domain, has
  no workspace of its own. In that case, ask an owner of the organization to invite your new address, which
  creates a separate account, or contact support.
- **You need your current password.** An account created through an identity
  provider may have no password, and is not offered this option until it has
  one; see [Signing in](/en/account/signing-in).
- **You need to read mail at the new address.** The confirmation link goes there
  only.
- **The new address must not already have an account here.** If it does, you
  see *"This email cannot be used"*. The message does not say whether the
  address has an account.
- **Accept pending invitations first.** An invitation is addressed to a specific
  email address and can be accepted only by an account with that address. After
  the change, an invitation sent to your old address can no longer be accepted.
  Accept it first, or ask the sender to invite your new address. See
  [Inviting members](/en/organizations/inviting-members).

## Change your address

### 1. Request the change

Go to Settings → Profile → **Change Email**. Enter the new address and your
current password.

You are told a verification email has been sent to the new address. Nothing
about the account has changed yet.

At the same time, your **current** address receives an *"Email change
requested"* notice naming the new address. It says no changes have been made
yet.

### 2. Open the link sent to the new address

The message has the subject **"Verify your new email address"**, a **Confirm
Email Change** button, and the same link in plain text. The link works for **24
hours** from your request. A re-sent message does not restart that time. If the
link expires, request the change again.

### 3. Sign in with the new address

Opening the link completes the change and **signs out every session**,
including the browser you opened it in. You are sent to the sign-in page. Sign
in with the new address and your existing password.

Your previous address receives a *"Your email address has been changed"*
message.

## Verify it worked

Sign in with the **new** address and your existing password. Your dashboard,
receipts and organizations are unchanged.

If the confirmation page shows an error, the change usually did not happen. To
check, try signing in with the old address. If that no longer works, the change
completed despite the error. Contact support in either case rather than
requesting the change again.

## What changes and what stays the same

**Changes:**

- The new address is the one you sign in with. The old address is no longer
  attached to the account.
- Every session is signed out.
- You are not asked to verify the new address again; opening the confirmation
  link verified it.

**Stays the same:**

- **Your credentials.** Your password, two-factor authentication, recovery
  codes, passkeys and connected identity providers are not reset. See
  [Two-factor authentication and passkeys](/en/account/two-factor-and-passkeys)
  and [Sessions and connected identities](/en/account/sessions-and-identities).
- **Single sign-on.** A connected provider is matched to your account by the
  identifier it issues, not by the email address it reports, so it still signs
  you in. Linking a new provider whose address matches your account still
  requires proof that the account is yours.
- **Your secrets, links and receipts.** Links you already shared keep working
  until they are revealed, burned or expire. Emails already delivered still name
  the old address.
- **Your organization membership and role.**
- **Billing addresses.** These are stored separately and are not changed.

**Mail-delivery blocks follow the address.** If the new address has bounced
before or was marked undeliverable, messages to it may be blocked, including the
confirmation email.

## Changing back

There is no undo button. To return to your previous address, change your email
again, back to that address. You need access to that inbox, and the address must
not have been used for another account in the meantime.

## While a change is pending

You still sign in with your current address, and it still receives all account
email.

- **Only one change can be pending.** A new request replaces the earlier one,
  and the earlier link stops working; it is reported as invalid or expired.
- **The confirmation can be re-sent** from the page where you made the request,
  but only before you leave that page. If you have left it, request the change
  again; the new request replaces the old one.
- **A pending request expires** after 24 hours, and the account stays as it
  was.
- **There is no cancel button.** To cancel, let the link expire. If you did not
  make the request, see below.
- **Requests are limited per day.** If you reach the limit, you are told when you
  can try again.

## If you did not request a change

An unexpected *"Email change requested"* notice means someone submitted an email
change on your account. The request requires your current password, so your
password is probably known to someone else.

Before the confirmation link is opened:

1. **Change your password.** This signs out every other session on the account.
   See [Signing in](/en/account/signing-in).
2. **Replace the pending request.** Request a change to an address you control.
   This replaces the pending request and invalidates its link.
3. **Contact support.** You cannot withdraw a pending request yourself, and
   support should know about a compromised password.

If the change has already completed (you received *"Your email address has been
changed"* and can no longer sign in), contact support immediately from your
previous address. You cannot recover the account yourself after the sign-in
address has changed.

## Troubleshooting

**"Current password is incorrect."** Nothing was changed. If you cannot remember
the password, reset it first; see [Signing in](/en/account/signing-in).

**"This email cannot be used."** The address is not available. The message does
not say why, so the form cannot be used to find out which addresses have
accounts.

**"New email must be different from current email."** You entered the address
already on the account.

**"This verification link is invalid or has expired."** Usually the 24 hours
have passed, or you made a newer request and this is the older link. Request the
change again from Settings. The confirmation page shows this message for every
kind of failure, so first check which address signs you in; see
[Verify it worked](#verify-it-worked).

**The confirmation never arrived.** Check the junk folder and any quarantine
your organization runs. If you are still on the request page, use its re-send
option; otherwise request the change again. If it still does not arrive, the
address may be blocked from delivery. Try an address you know receives mail
from us.

**You are in the wrong region.** Each region is a separate service. An address
change applies only to the account you are signed in to, in that region. See
[Changing your region](/en/account/change-your-region).

## Related

- [Signing in](/en/account/signing-in) — password resets, and what happens when
  a sign-in stops working.
- [Sessions and connected identities](/en/account/sessions-and-identities) —
  what is signed in right now, and the providers linked to your account.
- [Closing your account](/en/account/close-your-account) — permanently closing
  the account instead.
- [Changing your region](/en/account/change-your-region) — why an account
  exists in one region only.

## Questions or need support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
