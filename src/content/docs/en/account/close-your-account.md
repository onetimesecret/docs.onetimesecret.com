---
title: Closing your account
description: What closing your account deletes and keeps, what happens to shared links and organizations, and how to close it.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret/apps/web/auth/config/hooks/account.rb:1155-1228 (closure preflight, refusal message, and self-service purge); onetimesecret/apps/web/auth/operations/customers/purge_preflight.rb:553-586,636-658,744-752 (memberships removed, empty personal workspace deleted, refusal conditions); onetimesecret/apps/web/auth/operations/remove_authentication_data.rb:100-112,170-196 (credentials removed; a closed sign-in row and its authentication audit log are kept); onetimesecret/apps/web/auth/operations/destroy_customer_record.rb:87-94 (the customer record is deleted); onetimesecret/apps/web/auth/migrations/001_initial.rb:31-32 (a closed row does not reserve its email address)
---

Closing your account deletes your sign-in methods and account record and signs
out every session. It happens as soon as you confirm, and it cannot be undone.

It does **not** delete secret links you have already shared. Burn those first if
you do not want them to remain usable.

## Before you start

- **You need the owner or admin role.** The **Careful Consideration Zone** is
  shown only when your role in the organization you are currently working in is
  owner or admin. If you have your own workspace, select it with the workspace
  switcher on your dashboard, then reload the page. An account created by
  accepting an invitation, or through single sign-on on an organization's custom
  domain, has no workspace of its own; contact support to close it.
- **Burn any secret you do not want to outlive the account.** Open
  [Recent secrets](/en/account/dashboard-and-recent-secrets), open the receipt
  for each link you want gone, and burn it. See
  [Your receipt](/en/share/your-receipt).
- **Copy anything you still need.** There is no data export, and after closure
  you cannot sign in to look anything up.
- **Prepare your own workspace.** Closure is refused if your workspace has other
  members, custom domains, or a subscription that has not ended, or if you own
  any other organization. Remove the other members and custom domains, cancel
  the subscription and wait for it to end, and ask support to transfer ownership
  of other organizations; see
  [Ownership and transfer](/en/organizations/ownership-and-transfer).
- **Have your password ready.** If your account was created through an identity
  provider and has no password, set one first from Settings → Security; see
  [Signing in](/en/account/signing-in).

## Close your account

### 1. Open the closing screen

Go to Settings → Advanced → **Careful Consideration Zone**, and find **Close
Account**. The screen repeats that secrets remain active until they expire, and
that anything you want removed should be burned first.

### 2. Confirm with your password

Choose **Permanently Delete Account**. You are asked *"Are you sure you want to
permanently delete your account? This action cannot be undone."* and for your
current password. A wrong password stops the closure with nothing changed.

### 3. Confirm the deletion

Choose **Delete Account**. There is no further confirmation, emailed link or
waiting period.

## Verify it worked

You are signed out and returned to the home page, and signing in with that
address no longer works. No confirmation email is sent.

If the screen shows an error instead, treat the account as still open. Sign in
again to check.

## What closing deletes

- **Your sign-in methods.** Your password, two-factor secret and recovery codes,
  passkeys, Remember me sessions, pending password-reset and verification links,
  and linked identity providers. See
  [Two-factor authentication and passkeys](/en/account/two-factor-and-passkeys).
- **Your sessions.** Every device signed in to the account is signed out. See
  [Sessions and connected identities](/en/account/sessions-and-identities).
- **Your account record.** Your account, its preferences and its API token.
- **Your own workspace,** with its settings and its
  [Secret Activity](/en/organizations/audit-trail) record.
- **Your memberships** in organizations owned by other people.

## What closing keeps

- **Secret links you already shared.** A link stays usable until it is revealed,
  burned, or expires. After closure you can no longer find or burn it, because
  your list of secrets is available only while signed in.
- **A closed sign-in record.** Your email address and the history of sign-in
  events on the account (sign-ins, password changes and second-factor changes)
  are kept on a sign-in record marked closed. It cannot be used to sign in.
- **Activity in other organizations.** Events attributed to you in the Secret
  Activity record of organizations you were a member of stay with those
  organizations, and are removed only under that record's own retention.

## Using the same address again

After closure, the address can be used for a new account, by signing up with a
password or by signing in through an identity provider. The new account starts
empty: nothing from the closed account is restored, and links you shared from
the closed account do not appear in it.

## If you cannot close your account

**The option is not in Settings.** Your role in the organization you are working
in is member. See the first item under [Before you start](#before-you-start).

**"Account deletion was refused because organization data or membership state
requires attention."** Nothing was changed. Your workspace still has other
members, custom domains or a subscription, or you own another organization.
See [Before you start](#before-you-start). Contact support if you cannot tell
what is blocking the closure.

**"Please check the password."** Nothing was changed. If you cannot remember the
password, reset it first. Completing a reset signs out every session on the
account, including yours. See [Signing in](/en/account/signing-in).

**Your account has no password and sign-in is restricted to single sign-on.**
Password setup uses the reset flow, which is not offered where sign-in is
restricted to single sign-on. Contact support, or the operator of the service
you use, to close the account.

## Related

- [Your receipt](/en/share/your-receipt) — burning a secret before anyone reads
  it, which is what to do before closing.
- [Your dashboard and recent secrets](/en/account/dashboard-and-recent-secrets)
  — finding the links you still have outstanding.
- [Changing your email address](/en/account/change-your-email) — use this
  instead if you only need a different address.
- [Sessions and connected identities](/en/account/sessions-and-identities) —
  if you only want to sign a device out.
- [Signing in](/en/account/signing-in) — password resets and setting a password.

## Questions or need support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
