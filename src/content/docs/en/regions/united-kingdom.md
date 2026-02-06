---
title: United Kingdom (UK)
description: Onetime Secret's United Kingdom data center region, located in London.
---

## Infrastructure

- **Location**: London, United Kingdom
- **URL**: [uk.onetimesecret.com](https://uk.onetimesecret.com)
- **Hosting provider**: <a href="https://upcloud.com" target="_blank" rel="noopener noreferrer nofollow">UpCloud</a> (Helsinki, Finland)
- **Custom domain CNAME**: `identity.ingress.onetime.co` (anycast)

## Custom Domain DNS

To point a custom domain at this region, create a CNAME record:

| Record type | Host                  | Value                         |
| ----------- | --------------------- | ----------------------------- |
| CNAME       | `secrets.example.com` | `identity.ingress.onetime.co` |

Note that the UK region uses an anycast CNAME rather than a region-specific subdomain.

See the [Custom Domain Setup Guide](/en/custom-domains/setup-guide) for full instructions.

## Regulatory Environment

The United Kingdom's data protection framework is governed by the **UK General Data Protection Regulation (UK GDPR)** and the **Data Protection Act 2018**. Post-Brexit, the UK maintains its own data protection regime that is closely aligned with the EU GDPR.

Key aspects relevant to this region:

- The Information Commissioner's Office (ICO) serves as the independent supervisory authority
- The UK GDPR retains the core principles and rights of the EU GDPR, including data subject rights and lawful basis requirements
- The UK has an adequacy decision from the European Commission, allowing data to flow freely from the EU/EEA
- The Data Protection Act 2018 supplements the UK GDPR with provisions specific to UK law enforcement and intelligence services

## When to Consider This Region

- Your organization or users are primarily based in the United Kingdom
- You need to comply with UK GDPR and the Data Protection Act 2018
- You want data residency within the United Kingdom
- You serve customers who require UK-based data processing
