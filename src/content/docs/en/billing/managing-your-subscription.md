---
title: Managing your subscription
description: Where an organization's subscription lives, why only the owner can change it, and what changes for everyone else when the plan changes.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret/src/apps/workspace/routes/organizations.ts:42,47 and onetimesecret/src/apps/workspace/account/settings/OrganizationSettings.vue:74-82 (settings live at /org/:extid/:tab, with a subscription tab, and require owner or admin to open); onetimesecret/lib/onetime/models/organization_membership.rb:90-100 (manage_billing sits in the owner template only)
---

A subscription belongs to an [organization](/en/organizations), not to a person.
Changing it changes what everyone in that organization can do.

## Where it lives

Open your organization's settings and choose the **Subscription** tab. Opening
organization settings at all requires you to be an owner or an admin of that
organization.

If you belong to more than one organization, check which one you are in before you
change anything — the URL carries the organization's identifier, and each has its
own subscription.

## Only the owner can change it

Billing is an owner-level capability. An admin can open organization settings and
manage members and domains, but cannot change the subscription. There is exactly
one owner; see
[Ownership and transfer](/en/organizations/ownership-and-transfer) if the person
holding it has left.

## What changes when the plan changes

The plan sets what the organization is entitled to. Each member's effective
permissions are then recomputed as the intersection of that plan and their role, so:

- A plan change reaches everyone in the organization at once.
- It does not change anyone's role, and it will not grant a member something their
  role does not carry.
- Downgrading removes capabilities from everyone, including capabilities in active
  use. Check what your organization is relying on first — custom domains,
  [SSO](/en/organizations/sso) and
  [Secret Activity](/en/organizations/audit-trail) are the ones people notice.

See [How plans work](/en/billing) for the plan-and-role rule in full.

## Regions are separate

Each [region](/en/security/where-your-data-lives) is a separate service with
separate accounts. If you are changing region as well as plan, read
[Change your region](/en/account/change-your-region) first, and ask support what it
means for an existing subscription rather than assuming.

:::note
**Self-hosting this yourself?** A standalone instance runs with billing off by
default: there is no subscription tab and every capability is granted. See
[Self-hosting](/en/self-hosting).
:::

## Related

- [How plans work](/en/billing) — what a plan applies to and how to read yours.
- [Roles and permissions](/en/organizations/roles-and-permissions) — why a plan alone is not enough.
- [Compare plans](/en/pricing/compare-plans) — what the plans are sold as.

## Questions or Need Support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
