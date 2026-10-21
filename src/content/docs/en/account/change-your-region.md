---
title: Changing your region
description: Regions are separate services that do not exchange data, so changing region means creating an account in the new one. This page covers the new account, paid plans, your old account, and moving a custom domain without breaking outstanding links.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret/lib/onetime/utils/email_hash.rb:46-55 and onetimesecret/apps/web/billing/operations/webhook_handlers/subscription_federation.rb (cross-region plan recognition by email hash, for organizations without their own Stripe customer); onetimesecret/apps/web/auth/operations/ensure_default_workspace.rb:181-195,409-529 (a pending cross-region subscription is applied only to the account's own default workspace); onetimesecret/lib/onetime/models/receipt.rb:163-167,292 (a receipt lasts twice the secret's lifetime); onetimesecret/apps/api/v2/logic/secrets/show_receipt.rb:365-368 (receipt links use the share domain)
---

Onetime Secret runs each region (CA, EU, NZ, UK, US) as a separate service with
its own database, accounts and secrets. See
[Where your data lives](/en/security/where-your-data-lives). Data is not
transferred between regions, so changing region means creating an account in
the new region and using it from then on.

## Create an account in the new region

Go to the new region's site (see
[Available regions](/en/security/where-your-data-lives#available-regions)) and
create an account. You can use the same email address as your existing account.

The new account starts empty. Secrets, receipts, settings, organizations,
members and custom domains from the old region are not copied.

## Paid plans

A subscription belongs to an organization in the region where it was bought.
For Identity Plus and Team Plus:

- **The plan can be applied to your own workspace in the new region** when your
  new account uses the email address the subscription was bought with. This
  applies only to the workspace you own, not to organizations you join by
  invitation, and it may not take effect immediately.
- **Check the plan before you rely on it.** Open your workspace's settings in
  the new region and check the plan shown there. If it is missing, contact
  support. Do not buy a second subscription.
- **Members are not moved.** For Team Plus, each member needs an account in the
  new region. Invite them again from the new organization; see
  [Inviting members](/en/organizations/inviting-members).

See [Managing your subscription](/en/billing/managing-your-subscription) for
who can change a subscription.

## Your old account

Your account in the previous region keeps working:

- Secret links you created there work until they are revealed, burned or
  expire.
- You can still sign in to check receipts.
- Nothing is required unless you want to close it; see
  [Closing your account](/en/account/close-your-account).

## Links without a custom domain

Links created on a regional site, such as
`eu.onetimesecret.com/secret/abcd1234`, keep working, whichever region you use
from now on. You can start using the new region immediately.

## Moving a custom domain

Existing links on your custom domain point at the old region. If you point the
domain at the new region while those links are outstanding, they stop working.
Use a temporary subdomain until they have expired.

1. **Add a temporary subdomain** to your organization in the new region. For
   example, if your domain is `secrets.example.com`, add
   `secrets-new.example.com`.
2. **Create a CNAME record** for the temporary subdomain that points to the new
   region's endpoint, for example `identity.us.onetime.co` for the US region.
   See [Setting up a custom domain](/en/custom-domains/setup-guide).
3. **Create new secrets on the temporary subdomain** from now on.
4. **Wait until the last secret created on the old domain has expired.** That is
   the longest secret lifetime on your plan, counted from the last secret you
   created on the old domain; see [Compare plans](/en/pricing/compare-plans).
   Receipt pages for those secrets also use the old domain and last twice as
   long as each secret's lifetime. If you need those receipts, wait until they
   have expired too.
5. **Move the domain.** Remove it from your organization in the old region, add
   it to your organization in the new region, update its CNAME record to point
   to the new region's endpoint, and verify it.
6. **Remove the temporary subdomain** once the domain is verified in the new
   region.

If every secret on the old domain has already been revealed, burned or expired,
and you do not need their receipts, you can move the domain without waiting.

## Accounts in several regions

You can keep accounts in more than one region, for example to serve people in
different places or to meet data residency requirements. Each account is
separate and is used only on its own regional site.

## Dedicated instances

For a region change on a dedicated instance, contact
[dedicated@onetimesecret.com](mailto:dedicated@onetimesecret.com), because
dedicated infrastructure is reconfigured manually. You can also reach us through
the [feedback page](https://onetimesecret.com/feedback).
