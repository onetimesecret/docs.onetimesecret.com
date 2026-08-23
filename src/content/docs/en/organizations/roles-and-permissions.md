---
title: Roles and permissions
description: The three organization roles, what each one can do, and why a capability your plan includes can still be refused — permissions are the intersection of plan and role.
audience: end-user
pageType: concept
sourceOfTruth: onetimesecret/lib/onetime/models/organization_membership.rb:72-106 (the three role templates and their nesting); onetimesecret/lib/onetime/models/organization_membership/features/with_materialized_entitlements.rb:13-18 (effective = plan ∩ role); onetimesecret/apps/api/organizations/logic/members/update_member_role.rb:29,154-192 (the role-change endpoint accepts member and admin only)
---

Every person in an [organization](/en/organizations) holds a role, and that role
decides what they can do. But the role is only half the answer. The other half is
your organization's plan — and a capability is available to someone only when
**both** halves allow it.

That is why a feature you are paying for can still be refused.

## The three roles

An organization has three roles, and they nest: an owner can do everything an
admin can, and an admin can do everything a member can.

| Role | What it covers |
|---|---|
| **Owner** | Everything an admin can do, plus billing, SSO, IP access rules, workspace branding, the email sender settings, and organization settings themselves. |
| **Admin** | Everything a member can do, plus member management, custom domains, homepage and incoming secrets, branding, privacy defaults, and Secret Activity. |
| **Member** | Core use of the organization: creating secrets, viewing receipts, API access, extended expiration, notifications. |

Organization settings are reachable only by owners and admins. A member uses the
organization's shared resources but does not administer them.

## Plan and role, together

Your effective permissions are the **intersection** of two sets: what your
organization's plan grants, and what your role's template allows.

- Your permissions can never exceed your organization's plan.
- Your permissions can never exceed your role.

Both refusals look similar from the outside but mean different things, and the app
distinguishes them. [Secret Activity](/en/organizations/audit-trail) is the
clearest example: an owner or admin whose plan does not include it is shown an
upgrade prompt, while a member of an organization whose plan *does* include it is
told the tab is for owners and admins. Upgrading fixes the first. Only a role
change fixes the second.

Authorization is always read from your **membership**, never from the organization
alone — checking the organization alone would over-grant to members.

:::note
What your organization's plan includes is shown in the app under **Plan Features**,
in your organization's settings. That panel is the authoritative answer for your
organization; see [How plans work](/en/billing).
:::

## Who can change what

Member management is limited to owners and admins, but the limits are finer than
that:

- **Changing someone's role** is an owner-level action. The role-change screen
  accepts only **member** and **admin** — you cannot promote someone to owner
  there, and you cannot change an owner's role there. See
  [Ownership and transfer](/en/organizations/ownership-and-transfer).
- **Inviting people** is role-bearing: you invite someone as a member or as an
  admin, never as an owner.
- **Removing people** follows the hierarchy. An admin can remove members but not
  other admins. A member can remove nobody. An owner cannot be removed at all,
  and nobody can remove themselves through the member list.
- **The last owner cannot be demoted.** An organization always has an owner.

## Memberships scoped to one domain

A membership can be limited to a single [custom domain](/en/custom-domains) rather
than the whole organization. This happens when someone joins through
[SSO](/en/organizations/sso) on that domain. A domain-scoped member works within
that domain and is barred from member management, whatever their role otherwise
allows.

## Member limits

Organizations have a limit on how many members they can hold, counted per role and
in total. **Pending invitations occupy a place against that limit** — an invitation
you sent but nobody accepted still counts. The app shows your current usage against
your limit on the Members tab, and tells you when you have reached it.

The app counts *members*, not seats.

:::note
**Self-hosting this yourself?** When billing is disabled — the usual standalone
configuration — the plan half of the rule is not in play and every capability is
granted; roles still apply. See [Self-hosting](/en/self-hosting).
:::

## Related

- [Organizations](/en/organizations) — what an organization is and who administers it.
- [Inviting members](/en/organizations/inviting-members) — adding people to your organization.
- [Ownership and transfer](/en/organizations/ownership-and-transfer) — who the owner is, and how ownership moves.
- [How plans work](/en/billing) — where the plan half of the rule comes from.

## Questions or Need Support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
