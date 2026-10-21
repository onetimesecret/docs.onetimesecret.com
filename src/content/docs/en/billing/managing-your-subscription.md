---
title: Managing your subscription
description: Start, change or cancel your organization's paid plan, update the billing email, download invoices, and know what a downgrade changes.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret at 145c1e7cfa — src/apps/workspace/account/settings/OrganizationSettings.vue:941-956,1885-1996 (plan label opens /org/:extid/subscription; Change Plan, Manage Billing, View Invoices, Upgrade Plan); src/shared/components/layout/BillingLayout.vue:22-38 and src/apps/workspace/billing/{BillingOverview,PlanSelector,InvoiceList}.vue (Billing Overview, Select a Plan, Billing History); apps/web/billing/controllers/billing.rb:77,291-306,510,592,661-690,783-791,837-854,1136-1138 (owner-only actions, Stripe Checkout for the first subscription, prorated immediate changes, cancellation at period end, reactivation, last 12 invoices, no changes while past due); apps/web/billing/operations/apply_subscription_to_org.rb:102-156 (an ended subscription returns the organization to Free); locales/content/en/workspace-billing.json (labels and cancellation copy)
---

A subscription belongs to an [organization](/en/organizations), not to a
person, and only the organization's **owner** can change it. A change applies
to everyone in the organization.

## Open the subscription

1. Open your organization's settings. If you belong to more than one
   organization, check that you are in the right one; each has its own
   subscription.
2. Choose the plan name shown next to the organization's name, such as
   **Free** or **Identity Plus**.

**Subscription Status** shows the plan, its status (**Active**, **Past Due** or
**Canceled**) and the plan's features, with these actions:

- **Change Plan**, or **Upgrade Plan** on the Free plan, opens **Select a
  Plan**.
- **Manage Billing** opens **Billing Overview**, with the next billing date and
  the billing contact.
- **View Invoices** opens **Billing History**.

Admins can open these pages, but the actions are refused for anyone other than
the owner.

## Start a paid plan

1. Choose **Upgrade Plan**.
2. Choose **Monthly** or **Yearly**, then choose the plan.
3. Pay on the Stripe checkout page. You can enter a promotion code there.

You return to **Billing Overview**, and the new plan applies immediately.

## Change plan

1. Choose **Change Plan**.
2. Choose **Upgrade** or **Downgrade** on the plan you want.
3. Review the prorated amount in the confirmation and confirm.

The change applies immediately. The price difference for the rest of the
billing period is prorated; a downgrade leaves a credit toward later invoices.

To switch between monthly and yearly billing on the same plan, contact support.

## Cancel or reactivate

1. Open **Select a Plan** and choose **Cancel subscription**.
2. Confirm with **Cancel Subscription**.

Cancellation takes effect at the end of the current billing period. Until then
the organization keeps the plan's features, and you are not charged again. When
the period ends, the organization returns to the Free plan.

To keep the subscription, choose **Reactivate Subscription** on **Select a
Plan** before that date.

## Billing email, payment method and invoices

- **Billing email.** Edit it in the **Billing Contact** section of **Billing
  Overview**.
- **Payment method.** There is no control for it in the app; contact support to
  change it.
- **Invoices.** **Billing History** lists the last 12 invoices. Choose
  **Download** to open one.

## When a payment fails

The subscription is shown as **Past Due**. While it is past due, changing,
cancelling and reactivating are not available. Contact support rather than
choosing a plan again, which would start a new checkout.

## What a downgrade changes

- **Nothing is deleted.** Custom domains, members, pending invitations,
  branding, SSO configurations and Secret Activity records stay.
- **Features outside the new plan stop being available to manage.** For
  example, on Free you can no longer invite members, edit domain branding,
  change SSO settings or open Secret Activity. Check what your organization
  relies on first; see [Compare plans](/en/pricing/compare-plans).
- **New secrets follow the new plan's lifetime limit.** Secrets that already
  exist keep their lifetime.
- **Roles do not change.** A plan never grants a member something their role
  does not allow; see [How plans work](/en/billing).

## Regions are separate

Each [region](/en/security/where-your-data-lives) is a separate service with
separate accounts. If you are changing region as well as plan, read
[Change your region](/en/account/change-your-region) first, and ask support what
it means for an existing subscription.

:::note
**Self-hosting this yourself?** A standalone instance runs with billing off by
default: there is no subscription page and every feature is available. See
[Self-hosting](/en/self-hosting).
:::

## Related

- [How plans work](/en/billing) — what a plan applies to and how to read yours.
- [Roles and permissions](/en/organizations/roles-and-permissions) — why a plan alone is not enough.
- [Compare plans](/en/pricing/compare-plans) — what each plan includes.

## Questions or Need Support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
