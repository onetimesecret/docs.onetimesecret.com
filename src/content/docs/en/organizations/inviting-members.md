---
title: Inviting members
description: Invite someone to your organization, follow the invitation until they accept, and change or remove members afterwards.
audience: end-user
pageType: how-to
plan: Identity Plus
sourceOfTruth: onetimesecret at 145c1e7cfa — apps/api/organizations/logic/invitations/create_invitation.rb (manage_members, member/admin roles only, log-only member counts); src/apps/workspace/account/settings/OrganizationSettings.vue and apps/api/account/logic/account/get_permissions.rb#compute_assignable_roles (Members tab, Admin offered only where the plan's role_admins_per_org is not 0); lib/onetime/models/organization_membership.rb (7-day invitation lifetime); apps/api/organizations/logic/invitations/{accept_invite,signup_and_accept,decline_invite,resend_invitation,revoke_invitation}.rb (email match, sign-up from the invitation, three resends, revoke); apps/api/organizations/logic/members/{update_member_role,remove_member}.rb (who can change and remove whom)
---

Owners and admins invite people from the **Members** tab in organization
settings. The person accepts by email and joins with the role you chose.

## Before you invite

- **Your plan includes member invites.** Identity Plus and Team Plus do. On the
  Free plan the Members tab says that member invites require a paid plan; see
  [Compare plans](/en/pricing/compare-plans).
- **You are an owner or an admin** of the organization.
- **You know which role to give.** Choose **Team Member** or **Admin**; see
  [Roles and permissions](/en/organizations/roles-and-permissions). Identity
  Plus offers Team Member only. Team Plus offers both. Nobody can be invited as
  owner.
- **You have the address they will sign in with.** The invitation can be
  accepted only by an account with that exact email address.

## Send an invitation

1. Open your organization's settings and choose the **Members** tab.
2. Choose **Invite Member**.
3. Enter their **Email Address** and choose a **Role**.
4. Choose **Send Invitation**.

The invitation appears under **Pending Invitations** with the time left before
it expires. The service refuses a second invitation to an address that already
has one pending, or to someone who is already a member.

## What the invited person does

They receive an email titled "You've been invited to join" followed by the
organization's name. The link in it works for **7 days**.

1. **Open the link.** The page names the organization and the role.
2. **Sign in, or create an account.**
   - With an existing account, sign in with the invited address. If a different
     account is already signed in, the page says so and offers to continue as
     the invited address.
   - Without an account, create one from the invitation page. The email address
     is fixed to the invited address, and the invitation confirms it, so no
     separate verification email is needed.
3. **Confirm.** Choose **Accept Invitation**, or **Decline Invitation** to turn
   it down. Declining does not require an account.

Joining adds this organization to their account. Their other organizations are
not affected.

## Verify it worked

When the invitation is accepted, it leaves **Pending Invitations** and the
person appears under **Current Members** with the role you chose.

## Resend or revoke an invitation

Both actions are on the invitation under **Pending Invitations**.

- **Resend** sends a new email with a new link. The previous link stops working
  and the 7 days start again. An invitation can be resent up to three times.
- **Revoke** deletes the invitation. Its link stops working.

An invitation that has expired is shown as **Expired**. Resend it, or revoke it
and send a new one.

## Change a role or remove a member

- **Change a role.** Only the owner can change roles, between Member and Admin.
  The owner's own role cannot be changed here; see
  [Ownership and transfer](/en/organizations/ownership-and-transfer).
- **Remove a member.** The owner can remove admins and members. An admin can
  remove members, but not other admins. Nobody can remove the owner, or
  themselves.

Removing someone takes away their access to the organization. It does not close
their account. If they joined through your
[single sign-on](/en/organizations/sso), also remove them at your identity
provider: while the provider still lets them sign in, signing in through your
domain adds them back.

To leave an organization yourself, ask its owner, or an admin if you are a
member, to remove you.

## How many members you can invite

Identity Plus and Team Plus do not set a fixed limit on members. The Members tab
shows how many members and pending invitations the organization has.

## Related

- [Roles and permissions](/en/organizations/roles-and-permissions) — what each role can do.
- [Ownership and transfer](/en/organizations/ownership-and-transfer) — making someone else the owner.
- [Single sign-on (SSO)](/en/organizations/sso) — letting people join by signing in through your identity provider.
- [Compare plans](/en/pricing/compare-plans) — which plans include member invites and the Admin role.

## Questions or Need Support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
