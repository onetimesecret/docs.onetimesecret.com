---
title: Ownership and transfer
description: Who owns an organization, what only the owner can do, and how to have ownership moved to another member.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret at 145c1e7cfa — apps/api/organizations/routes.txt (no owner-facing transfer route); apps/api/organizations/logic/members/update_member_role.rb:156-191 (role changes accept member and admin only and refuse to change an owner); apps/api/organizations/logic/members/remove_member.rb:160-167 (an owner cannot be removed); apps/api/colonel/routes.txt:94 and apps/api/colonel/logic/colonel/transfer_organization_ownership.rb (operator transfer, new owner must already be a member, previous owner demoted to admin by default); lib/onetime/cli/org/transfer_ownership_command.rb (the same transfer from the command line); lib/onetime/operations/memberships/set_role.rb:112-114 (the last owner cannot be demoted)
---

Every organization has one owner. The owner manages billing, organization
settings, role changes, single sign-on, and the sign-in, sign-up and email
sender settings of its custom domains. See
[Roles and permissions](/en/organizations/roles-and-permissions) for the full
list.

## You already have an organization

Every signed-in account belongs to an [organization](/en/organizations). If you
never invite anyone, one is created for you the first time you reach a feature
that needs it. It is named **Default Workspace**, you are its owner, and it
cannot be deleted.

Owner is an *organization* role. It grants nothing outside your own
organization.

## What the app does not let you change

- The owner cannot be removed from the organization.
- The owner's role cannot be changed on the Members tab.
- Nobody can be invited as owner or given the owner role there.

So an organization always has an owner, and moving ownership to someone else is
done for you, as described below.

## Request a transfer

**On the hosted service**, contact support and include:

- **The organization's identifier.** Open organization settings; the address is
  `/org/<identifier>/settings`, and the identifier is the part in the middle.
- **The current owner's email address.**
- **The new owner's email address.** They must already be a member of the
  organization; [invite them](/en/organizations/inviting-members) first if they
  are not.

**On a self-hosted instance**, ask the operator. The operator performs the
transfer with an operator command or the operator API; there is no screen for
it in organization settings. See
[Self-hosting](/en/self-hosting#operator-only-actions).

## What a transfer changes

- The new owner gets the owner role.
- The previous owner stays in the organization as an admin, unless the person
  performing the transfer chooses another role.
- Admins and members keep their roles.
- The subscription stays with the organization; see
  [Managing your subscription](/en/billing/managing-your-subscription).

## Related

- [Roles and permissions](/en/organizations/roles-and-permissions) — what each role can do.
- [Inviting members](/en/organizations/inviting-members) — adding the new owner to the organization first.
- [Close your account](/en/account/close-your-account) — closing your personal account, which is a different action.

## Questions or Need Support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
