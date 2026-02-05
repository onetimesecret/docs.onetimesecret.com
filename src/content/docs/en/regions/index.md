---
title: Data Center Regions
description: Learn about Onetime Secret's data center regions and how to choose the right one for your needs.
---

Onetime Secret offers four data center regions: European Union (EU), United States (US), Canada (CA), and Aotearoa New Zealand (NZ). This guide will help you understand the importance of region selection and how to choose the right one for your needs.

## Why Region Selection Matters

Choosing the right data center region is crucial for several reasons:

1. **Data Sovereignty**: Different regions have different data protection laws and regulations.
2. **Latency**: Choosing a region closer to your primary user base can reduce latency.
3. **Compliance**: Some organizations have specific requirements about where their data can be stored.

## Available Regions

### European Union (EU)

- **Location**: The European Union (Nuremberg)
- **URL**: [https://eu.onetimesecret.com](https://eu.onetimesecret.com)
- **Key Features**:
  - Compliant with GDPR and other EU data protection regulations
  - Ideal for European users or those serving primarily European customers

### Canada (CA)

- **Location**: Canada (Toronto)
- **URL**: [https://ca.onetimesecret.com](https://ca.onetimesecret.com)
- **Key Features**:
  - Compliant with PIPEDA and Canadian data protection laws
  - Suitable for Canadian users or those primarily serving Canadian customers

### Aotearoa New Zealand (NZ)

- **Location**: Aotearoa New Zealand (Porirua)
- **URL**: [https://nz.onetimesecret.com](https://nz.onetimesecret.com)
- **Key Features**:
  - Compliant with New Zealand Privacy Act and local regulations
  - Suitable for New Zealand users or those serving Oceania customers

### United States (US)

- **Location**: The United States (Hillsboro, Oregon)
- **URL**: [https://us.onetimesecret.com](https://us.onetimesecret.com)
- **Key Features**:
  - Compliant with US data protection laws
  - Suitable for US-based users or those primarily serving US customers

## Share-Nothing Architecture

Onetime Secret employs a share-nothing architecture, ensuring complete data isolation between regions:

- **Separate Accounts**: Creating an account on any regional domain is entirely separate from accounts on other domains, even if you use the same email address.
- **No Cross-Center Operations**: You can't perform operations (like burning a secret) across data centers. Each center maintains its own set of secrets and user data.
- **Consistent Billing for Paid Users**: For paid accounts, while no user data is shared between centers, your subscription status is recognized across regions through our payment provider, Stripe.

## How to Choose Your Region

Consider the following factors when selecting your data center region:

### For Anonymous Users

- Requests to onetimesecret.com may be routed to any active data center.
- The location of your secret is always clear from the generated link (e.g., `us.onetimesecret.com/secret/abcd1234`).
- You can choose a specific data locality by navigating directly to any regional domain (e.g., [ca.onetimesecret.com](https://ca.onetimesecret.com/)).

### For Authenticated Users

- When creating a new account, you must choose a data center location.
- You'll need to return to the same location to log in.
- Existing accounts and secrets remain in their original data center.

### For All Users

- Secrets created without a subdomain jurisdiction (e.g., onetimesecret.com/secret/efgh5678) will continue to default to our EU data center.
- All users, both paid and free, can choose their preferred data center when creating an account.

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

## Pricing and Plans

Our commitment to data locality extends to our pricing model:

- Charges are based on where you're paying from, not where your account is created.
- Identity Plus plans include unlimited custom domains across all data centers under a single subscription.

## Future Plans

We're continuously working to expand our data center options. Future plans include additional data center locations in:

- Brazil
- Spain
- UK

These expansions will provide even more options for data locality, improving performance and compliance capabilities for users in different regions.

## Setting Up Your Region

When setting up your Onetime Secret account or configuring a custom domain, you'll have the option to choose your preferred region. Here's how:

1. For new accounts: Select your preferred region during the sign-up process.
2. For existing accounts: Contact our support team to discuss region migration options.
3. For custom domains: Specify your chosen region when configuring your DNS settings (refer to our [Custom Domain Setup Guide](/en/custom-domains/setup-guide) for detailed instructions).

## Frequently Asked Questions

**Q: Can I change my region after setting up my account?**
A: Yes, you can change your region by creating a new account with the same email address and navigating to the account screen. If you have an active subscription, your account will update automatically (you may need to refresh the page).

Please note:
- Existing data is not transferred between regions
- Any secret links you've created will continue to function until they are viewed or expire
- For links with custom domains, you'll need to:
  1. Re-add the domain to your new region account
  2. Update the associated DNS records
  3. Use a unique subdomain when re-adding the domain to avoid conflicts with existing links
  4. Later on, you can add your preferred domain (if necessary) so you can start sending new links with your preferred domain

**Q: Does my choice of region affect the security of my secrets?**
A: No, all regions offer the same high level of security. The choice primarily affects data residency and potential latency.

**Q: Are there price differences between regions?**
A: Currently, our pricing is consistent across all regions. Check our [pricing page](https://onetimesecret.com/pricing) for the most up-to-date information.

## Need Help?

If you're unsure about which region to choose or have any questions, don't hesitate to reach out to our support team. We're here to help you make the best decision for your specific needs.

- Email: support@onetimesecret.com
- Feedback form: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Remember, choosing the right region ensures that you get the best performance and comply with any relevant data regulations while using Onetime Secret.
