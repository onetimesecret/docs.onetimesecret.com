---
title: Changing Your Region
---

Onetime Secret uses a [share-nothing architecture](/en/regions) across all five regions (CA, EU, NZ, UK, US). Each region operates as a completely separate system with its own database, accounts, and secrets. We do not transfer data between regions under any circumstances.

This means changing your region is less of a "migration" and more of setting up fresh in your preferred region. The good news: it takes about two minutes, and your subscription carries over automatically.

## Free Accounts

Navigate directly to your preferred region (see [Available Regions](/en/regions#available-regions) for the full list) and create a new account with the same email address. That's it — your new account is ready to use immediately.

## Paid Accounts (Identity Plus)

The process is the same as free accounts, with one extra step:

1. Go to your preferred region's URL (see [Available Regions](/en/regions#available-regions))
2. Create an account using the same email address associated with your subscription
3. Log in and navigate to your Account page
4. Your subscription status will be recognized automatically through Stripe

You may need to refresh the page once for the subscription to sync up. This works because we keep data separate between regions while your billing relationship is managed through Stripe, which recognizes your email address across regions.

## What Happens to Your Old Account

Your previous region account remains fully functional:

- Any existing secret links continue to work until they are viewed or expire
- Your account stays active in case you need to reference anything
- No action is required on the old account unless you want to close it

## Custom Domain Migration

If you have a custom domain configured on your current region, the process requires a bit more planning. Because your existing secret links use your custom domain's DNS records, you can't simply point the domain at the new region without breaking links that haven't been viewed yet.

### Step-by-step

1. **Add a temporary subdomain** to your new region account. For example, if your current domain is `secrets.example.com`, add something like `secrets-new.example.com` or `secrets-us.example.com`.

2. **Create a CNAME record** for the temporary subdomain pointing to the appropriate regional identity endpoint (e.g., `identity.us.onetime.co` for the US region). See the [Custom Domain Setup Guide](/en/custom-domains/setup-guide) for DNS configuration details.

3. **Start using the temporary subdomain** for new secrets right away.

4. **After 30 days**, any secrets created on the old domain will have expired. You can then:
   - Remove the custom domain from your old region account
   - Add your preferred subdomain (e.g., `secrets.example.com`) to your new region account
   - Update the CNAME record to point to the new region's endpoint
   - Verify the domain in your account dashboard

5. **Clean up** the temporary subdomain once your preferred domain is active and verified.

### Why 30 days?

The maximum time-to-live (TTL) for a secret is 30 days. Waiting this period ensures that all secrets created under the old region's DNS configuration have either been viewed or expired, so updating the CNAME record won't break any outstanding links.

If you know that all your existing secrets have shorter TTLs or have already been viewed, you can make the switch sooner.

## Accounts Without Custom Domains

If you don't use a custom domain, the switch is immediate. Your old links (using the regional onetimesecret.com URLs like `eu.onetimesecret.com/secret/abcd1234`) will continue to resolve correctly regardless of which region your active account is in.

## Multiple Regions

You can maintain accounts in multiple regions simultaneously. All accounts using the same email address share the same subscription status. This can be useful if you serve users in different geographic areas and want to minimize latency or meet data residency requirements.

## Global Elite

Global Elite customers on dedicated instances should contact us at [dedicated@onetimesecret.com](mailto:dedicated@onetimesecret.com) for region changes, as dedicated infrastructure requires manual reconfiguration. You can also reach us through the [feedback page](https://onetimesecret.com/feedback).
