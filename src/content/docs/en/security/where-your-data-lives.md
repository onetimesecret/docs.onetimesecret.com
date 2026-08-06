---
title: Where your data lives
description: Onetime Secret runs five independent regions — Canada, the European Union, Aotearoa New Zealand, the United Kingdom, and the United States. This page lists each region's location, endpoint, hosting provider, custom-domain CNAME, and regulatory environment, and explains how to choose between them.
audience: end-user
pageType: reference
sourceOfTruth: hand-maintained — the region list is deployment configuration, not application source (onetimesecret/etc/defaults/config.defaults.yaml:657-671 defines only the JURISDICTIONS mechanism); CNAME endpoints are mirrored in /en/custom-domains/setup-guide
---

Onetime Secret offers five data center regions: Canada (CA), European Union (EU), Aotearoa New Zealand (NZ), United Kingdom (UK), and United States (US). This guide will help you understand the importance of region selection and how to choose the right one for your needs.

## Why region selection matters

Choosing the right data center region is crucial for several reasons:

1. **Data Sovereignty**: Different regions have different data protection laws and regulations.
2. **Latency**: Choosing a region closer to your primary user base can reduce latency.
3. **Compliance**: Some organizations have specific requirements about where their data can be stored.

## Available regions

| Region | Location | Region URL | Hosting provider | Custom domain CNAME |
| ------ | -------- | ---------- | ---------------- | ------------------- |
| [Canada (CA)](#canada) | Toronto | [ca.onetimesecret.com](https://ca.onetimesecret.com) | DigitalOcean | `identity.ca.onetime.co` |
| [European Union (EU)](#european-union) | Nuremberg | [eu.onetimesecret.com](https://eu.onetimesecret.com) | Hetzner | `identity.eu.onetime.co` |
| [Aotearoa New Zealand (NZ)](#new-zealand) | Porirua | [nz.onetimesecret.com](https://nz.onetimesecret.com) | Catalyst Cloud | `identity.nz.onetime.co` |
| [United Kingdom (UK)](#united-kingdom) | London | [uk.onetimesecret.com](https://uk.onetimesecret.com) | UpCloud | `identity.ingress.onetime.co` |
| [United States (US)](#united-states) | Hillsboro, Oregon | [us.onetimesecret.com](https://us.onetimesecret.com) | Hetzner | `identity.us.onetime.co` |

Each region section below includes details on the local regulatory environment and when that region may be relevant to your use case.

To point a custom domain at a region, create a CNAME record from your chosen host (for example `secrets.example.com`) to that region's custom domain CNAME value. Note that the UK region uses an anycast CNAME rather than a region-specific subdomain. See the [Custom Domain Setup Guide](/en/custom-domains/setup-guide) for full instructions.

## Share-nothing architecture

Onetime Secret employs a share-nothing architecture, ensuring complete data isolation between regions:

- **Separate Accounts**: Creating an account on any regional domain is entirely separate from accounts on other domains, even if you use the same email address.
- **No Cross-Center Operations**: You can't perform operations (like burning a secret) across data centers. Each center maintains its own set of secrets and user data.
- **Consistent Billing for Paid Users**: For paid accounts, while no user data is shared between centers, your subscription status is recognized across regions through our payment provider, Stripe.

## How to choose your region

Consider the following factors when selecting your data center region:

### Without an account

- Requests to onetimesecret.com may be routed to any active data center.
- You can choose a specific region by navigating directly to a regional domain (e.g., [ca.onetimesecret.com](https://ca.onetimesecret.com/)).
- The generated link always identifies the region (e.g., `us.onetimesecret.com/secret/abcd1234`).

### With an account

- When you create an account, you choose a data center region. All plans — free and paid — have access to every region.
- You log in at the same regional domain where you signed up (e.g., if you registered at `eu.onetimesecret.com`, that's where you log in).

### Additional considerations

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

## Canada

Onetime Secret's Canadian data center region (CA), located in Toronto.

- **Location**: Toronto, Canada
- **URL**: [ca.onetimesecret.com](https://ca.onetimesecret.com)
- **Hosting provider**: <a href="https://www.digitalocean.com" target="_blank" rel="noopener noreferrer nofollow">DigitalOcean</a>
- **Custom domain CNAME**: `identity.ca.onetime.co`

:::note
We are a Canadian company and are actively looking for a suitable Canadian-owned hosting provider for this region. If you have suggestions, we'd love to hear from you via our [feedback form](https://onetimesecret.com/feedback).
:::

**Regulatory environment.** Canada's federal privacy legislation, the **Personal Information Protection and Electronic Documents Act (PIPEDA)**, governs the collection, use, and disclosure of personal information in the course of commercial activity. Several provinces also maintain their own privacy legislation that may apply.

**About the hosting provider.** This region is hosted by <a href="https://www.digitalocean.com" target="_blank" rel="noopener noreferrer nofollow">DigitalOcean</a>, a US-based cloud provider headquartered in Broomfield, Colorado, serving millions of developers globally. DigitalOcean complies with GDPR for European customers, supports data portability, and publishes transparency reports detailing government data requests. The company implements robust security controls and publishes audit reports.

**Key regulatory aspects**

- PIPEDA requires meaningful consent for data collection and use
- The Office of the Privacy Commissioner of Canada oversees compliance
- Canada holds an adequacy decision from the European Commission, facilitating data transfers with the EU
- Provincial laws (e.g., Alberta's PIPA, Quebec's Law 25) may impose additional requirements

**When to consider this region**

- Your organization or users are primarily based in Canada
- You need to comply with PIPEDA or provincial privacy legislation
- You want data residency within Canadian borders
- You serve customers in North America and want a geographically central option

## European Union

Onetime Secret's European Union data center region (EU), located in Nuremberg, Germany.

- **Location**: Nuremberg, Germany
- **URL**: [eu.onetimesecret.com](https://eu.onetimesecret.com)
- **Hosting provider**: <a href="https://www.hetzner.com" target="_blank" rel="noopener noreferrer nofollow">Hetzner</a>
- **Custom domain CNAME**: `identity.eu.onetime.co`

**Regulatory environment.** The EU region operates under the **General Data Protection Regulation (GDPR)**, one of the most comprehensive data protection frameworks in the world. Germany, as the hosting country, also applies the **Bundesdatenschutzgesetz (BDSG)** which supplements the GDPR.

**About the hosting provider.** This region is hosted by <a href="https://www.hetzner.com" target="_blank" rel="noopener noreferrer nofollow">Hetzner</a>, a German hosting provider based in Gunzenhausen, operating under EU jurisdiction. Hetzner offers cost-effective cloud solutions with a focus on privacy and data protection under GDPR. Customer personal data is not exposed in public WHOIS records for private customers, and the company operates under strict German and EU data protection laws.

**Key regulatory aspects**

- GDPR provides strong rights for data subjects including access, rectification, erasure, and portability
- Data processing requires a lawful basis (e.g., consent, legitimate interest, contractual necessity)
- The German Federal Commissioner for Data Protection and Freedom of Information (BfDI) serves as a supervisory authority
- Strict rules on international data transfers outside the EU/EEA

**When to consider this region**

- Your organization or users are primarily based in the EU or EEA
- You need to comply with GDPR requirements
- You want data residency within the European Union
- You serve customers who expect EU-level data protection standards

## New Zealand

Onetime Secret's Aotearoa New Zealand data center region (NZ), located in Porirua.

- **Location**: Porirua, Aotearoa New Zealand
- **URL**: [nz.onetimesecret.com](https://nz.onetimesecret.com)
- **Hosting provider**: <a href="https://catalystcloud.nz" target="_blank" rel="noopener noreferrer nofollow">Catalyst Cloud</a>
- **Custom domain CNAME**: `identity.nz.onetime.co`

**Regulatory environment.** New Zealand's data protection framework is governed by the **Privacy Act 2020**, which replaced the Privacy Act 1993. The Act establishes thirteen information privacy principles that apply to agencies handling personal information.

**About the hosting provider.** This region is hosted by <a href="https://catalystcloud.nz" target="_blank" rel="noopener noreferrer nofollow">Catalyst Cloud</a>, a New Zealand-based, owned, and operated cloud provider supporting Aotearoa's digital economy. All customer data is stored locally across three onshore data centers, and data remains in New Zealand, protected by local laws and privacy regulations. Catalyst Cloud is an approved provider for New Zealand Government agencies and holds ISO certifications for information security management.

**Key regulatory aspects**

- The Privacy Act 2020 includes mandatory breach notification requirements
- The Office of the Privacy Commissioner oversees compliance and investigates complaints
- New Zealand holds an adequacy decision from the European Commission, facilitating data transfers with the EU
- The Act applies to overseas agencies that carry on business in New Zealand

**When to consider this region**

- Your organization or users are primarily based in New Zealand or the Pacific region
- You need to comply with the New Zealand Privacy Act 2020
- You want data residency within New Zealand
- You serve customers in Oceania and want a regional presence

## United Kingdom

Onetime Secret's United Kingdom data center region (UK), located in London.

- **Location**: London, United Kingdom
- **URL**: [uk.onetimesecret.com](https://uk.onetimesecret.com)
- **Hosting provider**: <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a> (Helsinki, Finland)
- **Custom domain CNAME**: `identity.ingress.onetime.co` (anycast)

Note that the UK region uses an anycast CNAME rather than a region-specific subdomain.

**Regulatory environment.** The United Kingdom's data protection framework is governed by the **UK General Data Protection Regulation (UK GDPR)** and the **Data Protection Act 2018**. Post-Brexit, the UK maintains its own data protection regime that is closely aligned with the EU GDPR.

**About the hosting provider.** This region is hosted by <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a>, a European cloud infrastructure provider founded in 2011 and headquartered in Helsinki, Finland. As a sovereign European provider, all account-related data is stored exclusively in Finland under Finnish and EU data protection regulations. UpCloud operates data centers across multiple European locations including London, which hosts this region.

**Key regulatory aspects**

- The Information Commissioner's Office (ICO) serves as the independent supervisory authority
- The UK GDPR retains the core principles and rights of the EU GDPR, including data subject rights and lawful basis requirements
- The UK has an adequacy decision from the European Commission, allowing data to flow freely from the EU/EEA
- The Data Protection Act 2018 supplements the UK GDPR with provisions specific to UK law enforcement and intelligence services

**When to consider this region**

- Your organization or users are primarily based in the United Kingdom
- You need to comply with UK GDPR and the Data Protection Act 2018
- You want data residency within the United Kingdom
- You serve customers who require UK-based data processing

## United States

Onetime Secret's United States data center region (US), located in Hillsboro, Oregon.

- **Location**: Hillsboro, Oregon, United States
- **URL**: [us.onetimesecret.com](https://us.onetimesecret.com)
- **Hosting provider**: <a href="https://www.hetzner.com" target="_blank" rel="noopener noreferrer nofollow">Hetzner</a>
- **Custom domain CNAME**: `identity.us.onetime.co`

**Regulatory environment.** The United States does not have a single comprehensive federal data protection law. Instead, data protection is addressed through a combination of federal and state laws that apply to specific sectors or types of data.

**About the hosting provider.** This region is hosted by <a href="https://www.hetzner.com" target="_blank" rel="noopener noreferrer nofollow">Hetzner</a>, a German hosting provider based in Gunzenhausen, operating under EU jurisdiction. Even for its US data center locations, Hetzner maintains its privacy-conscious approach rooted in German and EU data protection standards. Customer personal data is not exposed in public WHOIS records for private customers.

**Key regulatory aspects**

- Federal laws such as HIPAA (health data), GLBA (financial data), and COPPA (children's data) apply to specific sectors
- State-level privacy laws are increasingly significant, notably the **California Consumer Privacy Act (CCPA)** and its amendment the **California Privacy Rights Act (CPRA)**
- Other states including Virginia, Colorado, Connecticut, and Utah have enacted comprehensive privacy legislation
- Oregon, where this data center is located, enacted the **Oregon Consumer Privacy Act** effective July 2024

**When to consider this region**

- Your organization or users are primarily based in the United States
- You need to comply with US federal or state data protection laws
- You want data residency within the United States
- You serve customers in North America and want low-latency access from the western US

## Future plans

We're continuously working to expand our data center options. Future plans include additional data center locations in:

- Australia
- Brazil
- Japan
- Mexico
- Norway
- South Korea

These expansions will provide even more options for data locality, improving performance and compliance capabilities for users in different regions.

## Frequently asked questions

**Q: Can I change my region after setting up my account?**
A: Yes. See [Changing Your Region](/en/account/change-your-region) for step-by-step instructions covering free accounts, paid subscriptions, and custom domain migration.

**Q: Does my choice of region affect the security of my secrets?**
A: No, all regions offer the same high level of security. The choice primarily affects data residency and potential latency.

**Q: Are there price differences between regions?**
A: Pricing is specific to each region — you can pay in your local currency and Stripe handles currency conversion automatically. Identity Plus plans include unlimited custom domains across all data centers under a single subscription. Check our [pricing page](https://onetimesecret.com/pricing) for the most up-to-date information.

## Need help?

If you're unsure about which region to choose or have any questions, don't hesitate to reach out to our support team. We're here to help you make the best decision for your specific needs.

- Email: support@onetimesecret.com
- Feedback form: [https://onetimesecret.com/feedback](https://onetimesecret.com/feedback)

Remember, choosing the right region ensures that you get the best performance and comply with any relevant data regulations while using Onetime Secret.
