---
title: Ownership and transfer
description: Who owns an organization, why the owner cannot be removed or demoted from inside the app, and how ownership is transferred when someone leaves.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret/lib/onetime/operations/org/transfer_ownership.rb and onetimesecret/apps/api/colonel/routes.txt:74 (transfer exists only as an operator action — onetimesecret/apps/api/organizations/routes.txt has no transfer route); onetimesecret/lib/onetime/operations/memberships/set_role.rb:40-43,93-96 (the last owner cannot be demoted); onetimesecret/apps/api/organizations/logic/members/remove_member.rb:160-175 (an owner cannot be removed)
---

Every organization has exactly one owner, and the owner is the account that can
manage billing, SSO and the organization's own settings. This page covers what
happens to that role when the person holding it leaves, changes jobs, or hands the
account over.

## You already have an organization

Every signed-in account belongs to an [organization](/en/organizations). If you
never invite anyone, one is created for you the first time you reach a feature that
needs it — it is named **Default Workspace**, you are its owner, and it cannot be
deleted.

Owner here means an *organization* role. It is not a system-administrator role on
the instance, and it grants nothing outside your own organization.

## The owner is deliberately hard to change

Three rules hold together, and they exist so an organization can never end up with
nobody in charge:

- **The last owner cannot be demoted.** If you are the only owner, no role change
  will move you out of it.
- **An owner cannot be removed** from the member list, by anyone, including
  themselves.
- **Nobody can be promoted to owner** through the role-change screen. That screen
  accepts only *member* and *admin*, and it refuses to change an existing owner's
  role at all.

Taken together: ownership cannot be transferred from inside the app. That is by
design, not an oversight — it is the guardrail that stops an organization losing
its only administrator through a single mistaken click.

## How to transfer ownership

**On the hosted service**, contact support. Include:

- The organization's identifier. You can read it out of the address bar while you
  are in organization settings — the URL is `/org/<identifier>/settings`, and the
  identifier is the part in the middle.
- The email address of the current owner.
- The email address of the person who should become the owner. **They must already
  be a member of the organization** — invite them first if they are not.

**On a self-hosted instance**, the operator performs the transfer directly. It is
an operator action with a command-line and an administrative interface, not
something an organization owner can do from their own settings.

:::note
**Self-hosting this yourself?** Ownership transfer is available to you as an
operator action. See [Self-hosting](/en/self-hosting).
:::

## Before you transfer

- **Invite the new owner first.** Transfer moves a role between existing members;
  it does not create one.
- **Check who else has admin.** Admins keep their roles through a transfer, so
  review the member list while you are looking at it.
- **Billing follows the organization, not the person.** A subscription belongs to
  the organization; see
  [Managing your subscription](/en/billing/managing-your-subscription).

## Related

- [Roles and permissions](/en/organizations/roles-and-permissions) — what each role can do.
- [Inviting members](/en/organizations/inviting-members) — adding the new owner to the organization first.
- [Close your account](/en/account/close-your-account) — closing your personal account, which is a different action.

## Questions or Need Support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
