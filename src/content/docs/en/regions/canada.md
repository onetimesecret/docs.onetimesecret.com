---
title: Canada (CA)
description: Onetime Secret's Canadian data center region, located in Toronto.
---

## Infrastructure

- **Location**: Toronto, Canada
- **URL**: [ca.onetimesecret.com](https://ca.onetimesecret.com)
- **Hosting provider**: <a href="https://www.digitalocean.com" target="_blank" rel="noopener noreferrer nofollow">DigitalOcean</a>
- **Custom domain CNAME**: `identity.ca.onetime.co`

:::note
We are a Canadian company and are actively looking for a suitable Canadian-owned hosting provider for this region. If you have suggestions, we'd love to hear from you via our [feedback form](https://onetimesecret.com/feedback).
:::

## Custom Domain DNS

To point a custom domain at this region, create a CNAME record:

| Record type | Host                  | Value                    |
| ----------- | --------------------- | ------------------------ |
| CNAME       | `secrets.example.com` | `identity.ca.onetime.co` |

See the [Custom Domain Setup Guide](/en/custom-domains/setup-guide) for full instructions.

## Regulatory Environment

Canada's federal privacy legislation, the **Personal Information Protection and Electronic Documents Act (PIPEDA)**, governs the collection, use, and disclosure of personal information in the course of commercial activity. Several provinces also maintain their own privacy legislation that may apply.

Key aspects relevant to this region:

- PIPEDA requires meaningful consent for data collection and use
- The Office of the Privacy Commissioner of Canada oversees compliance
- Canada holds an adequacy decision from the European Commission, facilitating data transfers with the EU
- Provincial laws (e.g., Alberta's PIPA, Quebec's Law 25) may impose additional requirements

## When to Consider This Region

- Your organization or users are primarily based in Canada
- You need to comply with PIPEDA or provincial privacy legislation
- You want data residency within Canadian borders
- You serve customers in North America and want a geographically central option
