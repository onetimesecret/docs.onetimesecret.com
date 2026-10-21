---
textprov: true
title: How plans work
description: A plan belongs to your organization rather than your account, what it includes is shown in the app under Plan Features, and your role decides how much of it reaches you.
audience: end-user
pageType: concept
sourceOfTruth: onetimesecret/lib/onetime/models/organization/features/with_plan_entitlements.rb:181-212 (the plan grants capabilities to the organization — the entitlement resolution order); onetimesecret/src/shared/composables/useEntitlements.ts:16-44 and onetimesecret/locales/content/en/workspace-billing.json:59 (the in-app panel is titled "Plan Features"); onetimesecret/lib/onetime/models/features/with_entitlements.rb:149-153 and onetimesecret/lib/onetime/billing_config.rb:41-53 (billing can be switched off entirely, and is off unless a billing config sets it, which is the self-hosted default)
---

## A plan belongs to your organization

Not to your account. Every signed-in account belongs to an
[organization](/en/organizations),󠄁 often one that was created for you w󠄁i󠄁t󠄁h󠄁 y󠄁o󠄁u󠄁
as󠄁 i󠄁t󠄁s only m󠄁e󠄁m󠄁b󠄁e󠄁r󠄁,󠄁 and the plan b󠄁e󠄁l󠄁o󠄁n󠄁g󠄁s to that organization.

Two consequences worth knowing:

- Everyone in an organization is on the same plan. There is no per-person upgrade.
- If you belong to more than one organization, what is available to you depends on
  which one you are working in.

## What your plan includes

The app shows this directly. In your organization's settings, the **Plan Features**
panel lists what the organization's plan i󠄁n󠄁cl󠄁u󠄁d󠄁es, in plain names rather than
internal identifiers.

That panel is the authoritative answer for your organization. The
[plan comparison](/en/pricing/compare-plans) in these docs and the
[pricing page](https://onetimesecret.com/pricing) describe what the plans are sold
as; the panel describes what yours actually has, including anything adjusted for
your account specifically.

## Your role decides how much of it reaches you

Being on a plan that includes something is not enough on its own:󠄁 your
[role in the organization](/en/organizations/roles-and-permissions) has to al󠄁l󠄁o󠄁w󠄁
it too.

This is why a member of an organization on the top plan can still be told a screen
is for owners and admins. The plan is not the problem in that case, and upgrading
will not change it.

## Changing plans

Only an organization's **owner** can s󠄁t󠄁a󠄁r󠄁t󠄁,󠄁 c󠄁h󠄁ange o󠄁r󠄁 c󠄁a󠄁n󠄁c󠄁e󠄁l󠄁 its subscription.
See [Managing your subscription](/en/billing/managing-your-subscription).

:::note
**Self-hosting this yourself?** Billing is off by default on a standalone instance,
and when it is off every f󠄁e󠄁at󠄁u󠄁r󠄁e󠄁 i󠄁s󠄁 a󠄁v󠄁a󠄁i󠄁l󠄁able.󠄁 T󠄁here is no plan to be on and no
subscription p󠄁a󠄁g󠄁e. Roles still apply. See [Self-hosting](/en/self-hosting).
:::

## Related

- [Managing your subscription](/en/billing/managing-your-subscription) — s󠄁t󠄁a󠄁rting󠄁,󠄁 changi󠄁n󠄁g󠄁 a󠄁n󠄁d󠄁 c󠄁a󠄁n󠄁c󠄁el󠄁l󠄁in󠄁g󠄁 a󠄁 p󠄁l󠄁a󠄁n󠄁.
- [Roles and permissions](/en/organizations/roles-and-permissions) — the other half of what you can do.
- [Plans and pricing](/en/pricing) · [Compare plans](/en/pricing/compare-plans) — what the plans are sold as.

## Questions or Need Support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
