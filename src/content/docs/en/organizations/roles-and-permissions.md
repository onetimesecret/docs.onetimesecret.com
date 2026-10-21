---
title: Roles and permissions
description: The three organization roles, what each one can do, and why a feature your plan includes can still be unavailable to you.
audience: end-user
pageType: concept
sourceOfTruth: onetimesecret at 145c1e7cfa — lib/onetime/models/organization_membership.rb:72-106 (the three role templates and their nesting); lib/onetime/models/organization_membership/features/with_materialized_entitlements.rb:13-18 (a member gets what both the plan and the role allow); apps/api/organizations/logic/members/update_member_role.rb:29,45,156-191 (owner-only role changes, member and admin only); apps/api/organizations/logic/members/remove_member.rb:160-205 (who can remove whom); apps/api/organizations/logic/invitations/create_invitation.rb (member counts are logged, not enforced)
---

Every person in an [organization](/en/organizations) has a role. The role
decides what they can do, within what the organization's plan includes. A
feature is available to you only when your plan includes it **and** your role
allows it.

## The three roles

Each role includes everything the role below it can do.

| Role | What it covers |
|---|---|
| **Owner** | Everything an admin can do, plus billing, organization settings, role changes, single sign-on, custom-domain sign-in and sign-up settings, and email sender settings. |
| **Admin** | Everything a member can do, plus member invites and removals, custom domains, homepage and incoming secrets, domain branding, privacy defaults, and Secret Activity. |
| **Member** | Creating secrets, viewing receipts, API access, and longer default expiration. |

Organization settings open only for owners and admins. A member uses the
organization's shared resources but does not administer them.

## When a feature is unavailable

There are two reasons, and the app tells them apart:

- **The plan does not include it.** An owner or admin sees an upgrade prompt.
  Changing the plan fixes this; see
  [Managing your subscription](/en/billing/managing-your-subscription).
- **Your role does not allow it.** The control is hidden or disabled, or you
  are told it is for owners and admins. Upgrading does not change this; ask the
  owner to change your role.

[Secret Activity](/en/organizations/audit-trail) shows both: an admin on a plan
without it sees an upgrade prompt, and a member on a plan that includes it is
told the tab is for owners and admins.

:::note
Your organization's settings list what its plan includes under **Plan
Features**. That list is the answer for your organization; see
[How plans work](/en/billing).
:::

## Who can change what

- **Changing roles.** Only the owner can change someone's role, and only
  between Member and Admin. Nobody can be made owner this way, and the owner's
  role cannot be changed; see
  [Ownership and transfer](/en/organizations/ownership-and-transfer).
- **Inviting.** Owners and admins invite people as members or admins, never as
  owners. Identity Plus offers the Member role only; see
  [Inviting members](/en/organizations/inviting-members).
- **Removing.** The owner can remove admins and members. An admin can remove
  members but not other admins. A member can remove nobody. Nobody can remove
  the owner, or themselves.

## Memberships limited to one domain

A membership can be limited to a single [custom domain](/en/custom-domains)
rather than the whole organization. This happens when someone joins by signing
in through [SSO](/en/organizations/sso) on that domain. A member limited to one
domain works within that domain and cannot invite or remove anyone, whatever
their role.

## Member counts

Paid plans do not set a fixed limit on the number of members. The Members tab
shows how many members and pending invitations the organization has.

:::note
**Self-hosting this yourself?** When billing is disabled, the usual standalone
configuration, every feature is treated as included in the plan; roles still
apply. See [Self-hosting](/en/self-hosting).
:::

## Related

- [Organizations](/en/organizations) — what an organization is and who administers it.
- [Inviting members](/en/organizations/inviting-members) — adding people to your organization.
- [Ownership and transfer](/en/organizations/ownership-and-transfer) — who the owner is, and how ownership moves.
- [How plans work](/en/billing) — what a plan applies to and how to read yours.

## Questions or Need Support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
