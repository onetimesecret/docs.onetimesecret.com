---
title: Data Center Regions
description: Learn about Onetime Secret's data center regions and how to choose the right one for your needs.
---

Onetime Secret offers five data center regions: Canada (CA), European Union (EU), Aotearoa New Zealand (NZ), United Kingdom (UK), and United States (US). This guide will help you understand the importance of region selection and how to choose the right one for your needs.

## Why Region Selection Matters

Choosing the right data center region is crucial for several reasons:

1. **Data Sovereignty**: Different regions have different data protection laws and regulations.
2. **Latency**: Choosing a region closer to your primary user base can reduce latency.
3. **Compliance**: Some organizations have specific requirements about where their data can be stored.

## Available Regions

| Region | Location | URL |
|--------|----------|-----|
| [Canada (CA)](/en/regions/canada) | Toronto | [ca.onetimesecret.com](https://ca.onetimesecret.com) |
| [European Union (EU)](/en/regions/european-union) | Nuremberg | [eu.onetimesecret.com](https://eu.onetimesecret.com) |
| [Aotearoa New Zealand (NZ)](/en/regions/new-zealand) | Porirua | [nz.onetimesecret.com](https://nz.onetimesecret.com) |
| [United Kingdom (UK)](/en/regions/united-kingdom) | London | [uk.onetimesecret.com](https://uk.onetimesecret.com) |
| [United States (US)](/en/regions/united-states) | Hillsboro, Oregon | [us.onetimesecret.com](https://us.onetimesecret.com) |

Each region page includes details on the local regulatory environment and when that region may be relevant to your use case.

## Share-Nothing Architecture

Onetime Secret employs a share-nothing architecture, ensuring complete data isolation between regions:

- **Separate Accounts**: Creating an account on any regional domain is entirely separate from accounts on other domains, even if you use the same email address.
- **No Cross-Center Operations**: You can't perform operations (like burning a secret) across data centers. Each center maintains its own set of secrets and user data.
- **Consistent Billing for Paid Users**: For paid accounts, while no user data is shared between centers, your subscription status is recognized across regions through our payment provider, Stripe.

## How to Choose Your Region

Consider the following factors when selecting your data center region:

### Without an Account

- Requests to onetimesecret.com may be routed to any active data center.
- You can choose a specific region by navigating directly to a regional domain (e.g., [ca.onetimesecret.com](https://ca.onetimesecret.com/)).
- The generated link always identifies the region (e.g., `us.onetimesecret.com/secret/abcd1234`).

### With an Account

- When you create an account, you choose a data center region. All plans — free and paid — have access to every region.
- You log in at the same regional domain where you signed up (e.g., if you registered at `eu.onetimesecret.com`, that's where you log in).

### Additional Considerations

1. **For Individuals**:
   - Personal preference
   - Proximity to your location for potentially faster access
   - Personal data sovereignty concerns

2. **For Businesses**:
   - Legal and regulatory requirements
   - Location of your primary customer base
   - Industry-specific compliance needs

3. **Technical Considerations**:
   - Latency requirements for your application
   - Integration with other services or systems

## Future Plans

We're continuously working to expand our data center options. Future plans include additional data center locations in:

- Australia
- Brazil
- Japan
- Mexico
- Norway
- South Korea

These expansions will provide even more options for data locality, improving performance and compliance capabilities for users in different regions.


## Frequently Asked Questions

**Q: Can I change my region after setting up my account?**
A: Yes. See [Changing Your Region](/en/regions/switching-regions) for step-by-step instructions covering free accounts, paid subscriptions, and custom domain migration.

**Q: Does my choice of region affect the security of my secrets?**
A: No, all regions offer the same high level of security. The choice primarily affects data residency and potential latency.

**Q: Are there price differences between regions?**
A: Pricing is specific to each region — you can pay in your local currency and Stripe handles currency conversion automatically. Identity Plus plans include unlimited custom domains across all data centers under a single subscription. Check our [pricing page](https://onetimesecret.com/pricing) for the most up-to-date information.

## Need Help?

If you're unsure about which region to choose or have any questions, don't hesitate to reach out to our support team. We're here to help you make the best decision for your specific needs.

- Email: support@onetimesecret.com
- Feedback form: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Remember, choosing the right region ensures that you get the best performance and comply with any relevant data regulations while using Onetime Secret.
