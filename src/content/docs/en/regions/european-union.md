---
title: European Union (EU)
description: Onetime Secret's European Union data center region, located in Nuremberg, Germany.
---

## Infrastructure

- **Location**: Nuremberg, Germany
- **URL**: [eu.onetimesecret.com](https://eu.onetimesecret.com)
- **Hosting provider**: <a href="https://www.hetzner.com" target="_blank" rel="noopener noreferrer nofollow">Hetzner</a>
- **Custom domain CNAME**: `identity.eu.onetime.co`
- **Default region**: Secrets created on `onetimesecret.com` without a subdomain are stored in this region

## Custom Domain DNS

To point a custom domain at this region, create a CNAME record:

| Record type | Host                  | Value                    |
| ----------- | --------------------- | ------------------------ |
| CNAME       | `secrets.example.com` | `identity.eu.onetime.co` |

See the [Custom Domain Setup Guide](/en/custom-domains/setup-guide) for full instructions.

## Regulatory Environment

The EU region operates under the **General Data Protection Regulation (GDPR)**, one of the most comprehensive data protection frameworks in the world. Germany, as the hosting country, also applies the **Bundesdatenschutzgesetz (BDSG)** which supplements the GDPR.

Key aspects relevant to this region:

- GDPR provides strong rights for data subjects including access, rectification, erasure, and portability
- Data processing requires a lawful basis (e.g., consent, legitimate interest, contractual necessity)
- The German Federal Commissioner for Data Protection and Freedom of Information (BfDI) serves as a supervisory authority
- Strict rules on international data transfers outside the EU/EEA

## When to Consider This Region

- Your organization or users are primarily based in the EU or EEA
- You need to comply with GDPR requirements
- You want data residency within the European Union
- You serve customers who expect EU-level data protection standards
