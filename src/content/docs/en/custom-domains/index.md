---
textprov: true
title: Custom domains
description: Share secret links from an address you own, such as secrets.example.com, and see which domain settings each plan includes.
audience: end-user
pageType: concept
sourceOfTruth: onetimesecret at 145c1e7cfa — lib/onetime/models/custom_domain.rb:99-161 (a domain belongs to an organization and has no region field); apps/api/domains/logic/domains/add_domain.rb:36-39,64 (add takes only the domain and organization; custom_domains entitlement); lib/onetime/models/organization_membership.rb:80-106 (custom_domains for owners and admins, manage_org for owners); apps/api/domains/policies/domain_config_authorization.rb:148-155 (domain settings need manage_org plus the setting's entitlement); docs billing catalog snapshot (sha256 69a96394…a17501) plans.*.entitlements and plans.*.limits.custom_domains
---

A custom domain lets your organization share secret links from an address you
own, such as `secrets.example.com`, instead of `onetimesecret.com`. A link then
looks like this:

```text
https://secrets.example.com/secret/abc123
```

The secret behaves the same as on the main site: one reveal, then it is
deleted. The domain changes the address, and optionally the look, of the pages
your recipients open. It does not change who can open a link: anyone with the
link can reveal it once, unless you also set a passphrase. See
[What recipients see](/en/share/what-recipients-see).

## What each plan includes

| Feature | Free | Identity Plus | Team Plus |
|---|---|---|---|
| Custom domains | 1 | Unlimited | Unlimited |
| [Homepage and incoming secrets](/en/custom-domains/homepage-and-incoming) | ✅ | ✅ | ✅ |
| [Branding](/en/custom-domains/branding): logo, color, font, reveal instructions | — | ✅ | ✅ |
| [Email sender](/en/custom-domains/email-sender): an address on the custom domain | — | ✅ | ✅ |
| Email sender: an address on any domain | — | — | ✅ |
| [Sign-in settings](/en/custom-domains/access-and-privacy) | — | ✅ | ✅ |
| [Single sign-on (SSO)](/en/organizations/sso) | — | — | ✅ |

See [Compare plans](/en/pricing/compare-plans) for everything else in each plan.

## Who can manage a domain

A domain belongs to an [organization](/en/organizations).

- The **owner** and **admins** can add, verify and remove the organization's
  domains.
- Only the **owner** can save changes to a domain's settings: branding,
  homepage, incoming secrets, email sender and sign-in.

See [Roles and permissions](/en/organizations/roles-and-permissions).

## Where your domain is served

There is no region choice when you add a domain. It is served by the regional
site your organization uses, such as `eu.onetimesecret.com`, and secrets shared
from it are stored in that region. The DNS records the site shows you point
your domain at the󠄁 s󠄁e󠄁r󠄁v󠄁i󠄁c󠄁e󠄁 f󠄁o󠄁r󠄁 t󠄁h󠄁at region. To serve a domain from a different region, see
[Moving a custom domain](/en/account/change-your-region#moving-a-custom-domain)
and [Where your data lives](/en/security/where-your-data-lives).

## Setting up a domain

1. [Add the domain and create its DNS records](/en/custom-domains/setup-guide).
2. Wait for [DNS validation](/en/custom-domains/dns-validation) to confirm
   that you own the domain.
3. Optionally, change how the domain looks and behaves:
   - [Branding your domain](/en/custom-domains/branding)
   - [Homepage and incoming secrets](/en/custom-domains/homepage-and-incoming)
   - [Email sender](/en/custom-domains/email-sender)
   - [Access and privacy](/en/custom-domains/access-and-privacy)

## Your responsibilities

- Keep the domain registered and renewed with your registrar.
- Keep both DNS records in place, including the ownership TXT record after
  verification. If it is removed, the domain stops being served.
- Onetime Secret obtains and renews the domain's TLS certificate. You do not
  need to provide one.

For examples of what to share through a secret link, see
[Use cases](/en/share/use-cases).

## Questions or need support?

Email [support@onetimesecret.com](mailto:support@onetimesecret.com) or use the
[feedback form](https://onetimesecret.com/feedback).
