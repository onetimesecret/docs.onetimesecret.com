---
title: Changing your email address
description: Your email address is your login, so changing it is a two-step confirmation that ends every session and cannot be undone from the app — this is what it moves, what it leaves behind, and how to do it.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret/apps/api/account/logic/account/request_email_change.rb:120-121 (24-hour TTL set once, at request time); onetimesecret/lib/onetime/mail/views/email_change_confirmation.rb:21,56-57 (the mail always states 24 hours); onetimesecret/apps/api/account/logic/account/resend_email_change_confirmation.rb:82-90 (a re-send reuses the same secret and does not refresh its expiry)
---

Your email address is your account name, so changing it changes how you sign
in. The change is confirmed from the **new** address and takes effect only when
that confirmation is opened. Nothing about your account moves before then.

Read the consequences below before you start. There is no undo in the app: to
go back you would run the same process again in the other direction, and that
needs access to the address you just left.

## What the change does

**The old address stops being your login.** Once confirmed, the new address is
the one you sign in with, and the old one is no longer attached to the account.

**It signs you out on every device**, including the browser that opened the
confirmation link. You land on the sign-in page and sign in again with the new
address and your existing password.

**You are not asked to verify anything afterwards.** Opening the confirmation
link *is* the proof that you control the new address, so the account keeps its
verified status and no second verification email follows.

**The old address is told it happened.** When the change lands, a *"Your email
address has been changed"* message goes to the address you just left.

## What it leaves alone

**Your credentials.** Only the address on the account changes. Your password,
two-factor authentication, recovery codes, passkeys and any connected identity
providers are attached to the account itself, not to the address, and none of
them are reset or re-registered. See
[Two-factor authentication and passkeys](/en/account/two-factor-and-passkeys)
and [Sessions and connected identities](/en/account/sessions-and-identities).

**Single sign-on keeps working.** A provider you have already connected is
matched to your account by the identity the provider issues, not by the email
address it reports, so it still signs you in after the change. Connecting a
*new* provider is unchanged too: a provider whose address happens to match an
existing account is still never linked automatically.

**Your secrets, links, receipts and history.** These are keyed to the account,
not to the address. Links you have already shared keep working exactly as
before — they expire, burn or get viewed on their own schedule, unaffected by
anything on this page. Messages already delivered to recipients are not
rewritten and will still name the old address.

**Your place in an organization.** Membership joins your account to the
organization, so you stay a member with the same role.

**Addresses used for billing.** Those are held separately from the account
address, on purpose, and this change does not rewrite them.

## What it strands

**A pending invitation sent to your old address can no longer be accepted.** An
invitation is addressed to a specific email address, and accepting one requires
the accepting account to hold that address. Changing your address deliberately
does not rewrite invitations that are already out — rewriting them would let an
address change redirect somebody else's invitation. If you are waiting on an
invitation, accept it *before* you change your address, or ask the person who
sent it to invite the new one. See
[Inviting members](/en/organizations/inviting-members).

**Mail-delivery blocks follow the address, not the account.** If the new
address has previously bounced or been marked as undeliverable, that block
travels with the address and can silence the very messages this process depends
on. If nothing arrives at the new address at any step, that is one of the
reasons.

## Before you start

- **You need to be an owner or admin of your organization.** Members are not
  offered this at all: the menu entry is not shown to them, and the page cannot
  be reached by going to its address directly. If you are a member and need a
  different address, ask an owner or admin to invite you again at the new one.
  See [Inviting members](/en/organizations/inviting-members).
- **You need your current password.** The request will not proceed without it,
  and an account created through an identity provider has no password and is
  not offered the option. Whether you can add one depends on how your account
  was set up — see [Signing in](/en/account/signing-in).
- **You need to be able to read mail at the new address.** The confirmation
  goes there and nowhere else.
- **The new address must not already have an account here.** If it does, you
  get a deliberately vague *"This email cannot be used"* rather than
  confirmation that the address is taken.

## Change your address

### 1. Request the change

Go to Settings → Profile → **Change Email**. Enter the new address and your
current password.

You are told a verification email has been sent and to check the new inbox. At
this point nothing about the account has changed.

### 2. Open the link sent to the new address

The message has the subject **"Verify your new email address"**, a **Confirm
Email Change** button, the same link in plain text so you can copy it, and the
line *"This link will expire in 24 hours."* That is the real window: **24
hours** from when you requested the change. A re-sent message repeats the same
24-hour wording, but the clock does not restart — it is still counting from the
original request. Once it runs out, request the change again.

At the same moment, the **old** address receives an *"Email change requested"*
notice naming the requested new address and saying, correctly, that no changes
have been made yet and that ignoring it is safe.

### 3. Sign in again

Opening the link completes the change and ends every session on the account,
including that browser. You are sent to the sign-in page.

## Verify it worked

Sign in with the **new** address and your existing password. Your dashboard,
receipts and organizations are all where you left them. The address you left
should also have a *"Your email address has been changed"* message.

A failure on the confirmation page usually means the change did not happen —
but not always. Try signing in with the old address; if that no longer works,
the change landed despite the error. Contact support either way rather than
requesting the change again.

## While a change is pending

Nothing has moved yet. You still sign in with the old address, and the old
address still receives everything.

- **Only one change can be pending at a time.** Requesting another one replaces
  it, and the earlier link stops working — opening it afterwards is reported as
  an invalid or expired link.
- **The confirmation can be re-sent** if it did not arrive — but only from the
  page you requested it on, and only before you navigate away. There is no
  pending-change banner elsewhere to come back to. If you have already left
  that page, request the change again instead; the new request replaces the old
  one.
- **A pending request expires on its own** when its 24 hours run out, and the
  account is left exactly as it was.
- **There is no cancel button.** If you have changed your mind, the simplest
  ending is to let the link expire — but see below if the request was not
  yours.
- **Requests are capped per day.** If you have tried repeatedly, you are told
  the limit and when you can try again.

## If you did not request a change

The *"Email change requested"* notice arriving at your address unprompted means
someone submitted an email change on your account — and because the request
needs your current password, it means your password is likely known to someone
else.

Act while the confirmation is still unopened:

1. **Change your password immediately.** This signs out every other session on
   the account. See [Signing in](/en/account/signing-in).
2. **Make the pending request useless.** Requesting your own change, to an
   address you control, replaces the pending one and invalidates its link.
3. **Contact support.** There is no self-service way to withdraw a request that
   is already in flight, and support should know about a compromised password
   in any case.

If the change has already completed — you received *"Your email address has
been changed"* and can no longer sign in — contact support straight away, from
the address you had. You cannot recover the account yourself once the login has
moved.

## Troubleshooting

**"Current password is incorrect."** The request is refused before anything
happens. If you cannot remember the password, reset it first; see
[Signing in](/en/account/signing-in).

**"This email cannot be used."** The address is not available. The message is
kept vague on purpose so the form cannot be used to find out which addresses
have accounts here.

**"New email must be different from current email."** The address you entered
is the one already on the account.

**"This verification link is invalid or has expired."** Usually the 24 hours
ran out, or you requested another change afterwards and this is the older link;
in either case ask for the change again from Settings. The confirmation page
shows this same message for every kind of failure, though, so check which
address signs you in before you conclude nothing moved — see
[Verify it worked](#verify-it-worked).

**The confirmation never arrived.** Check the junk folder and any quarantine
your organization runs. If you are still on the page you made the request from,
use the re-send option there; otherwise request the change again. If it still
does not arrive, the address may be blocked from delivery — try an address you
know receives mail from us.

**You are in the wrong region.** Regions are separate systems and an account
belongs to the one it was created in. An address change applies to the account
you are signed in to, in that region only. See
[Changing your region](/en/account/change-your-region).

## Related

- [Signing in](/en/account/signing-in) — password resets, and what happens when
  a sign-in stops working.
- [Sessions and connected identities](/en/account/sessions-and-identities) —
  what is signed in right now, and the providers linked to your account.
- [Closing your account](/en/account/close-your-account) — the other
  irreversible account change.
- [Changing your region](/en/account/change-your-region) — why an account
  exists in one region only.

## Questions or need support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
