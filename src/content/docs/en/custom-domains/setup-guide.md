---
title: Setting up a custom domain
description: Add a custom domain to your organization, create its ownership and routing DNS records, and verify it.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret at 145c1e7cfa — src/apps/workspace/routes/dashboard.ts:63-113 and routes/organizations.ts:42 (Domains tab of the organization settings, owner or admin); src/apps/workspace/components/domains/DomainForm.vue:114-118 and locales/content/en/workspace-domains.json (Add domain, Custom domain, Continue with, Verify Domain, Domain Status fields); apps/api/domains/logic/domains/add_domain.rb:36-39 (no region field); lib/onetime/models/custom_domain.rb:654,688,717-751,819-828,1122 (TXT host and value, generated once); src/apps/workspace/composables/useDomainDnsRecord.ts:129-137 (routing target from the site's configuration); lib/onetime/operations/verify_domain.rb:203-216,479-481 (TXT decides verification); src/shared/composables/useDomainStatus.ts:89-101 (status labels); routing targets checked with dig on 2026-10-21
---

## Before you start

- Your organization's plan includes a custom domain. Free includes one; Identity
  Plus and Team Plus have no fixed limit. See
  [Custom domains](/en/custom-domains#what-each-plan-includes).
- You are the organization's **owner** or an **admin**.
- You can create DNS records for the domain at your registrar or DNS provider.
- You have decided which address to use. A subdomain such as
  `secrets.example.com` is recommended: it uses a CNAME record, which keeps
  working if the service's addresses change. An apex domain such as
  `example.com` needs an A record pointing at a fixed IP address.

## Add the domain

1. Sign in, open the user menu and choose **Domains**. This opens your
   organization's settings on the **Domains** tab. The domain belongs to the
   organization whose settings are open.
2. Choose **Add domain**.
3. In **Custom domain**, enter the address, for example `secrets.example.com`.
   If you enter an apex domain such as `example.com`, you are asked where
   secret links should live: pick one of the **Popular subdomains**, or choose
   **Use my root domain**.
4. Choose **Continue with** _your domain_.

The domain is added to the organization, and the next screen lists the two DNS
records to create. There is no region choice: the records point at the
regional site your organization uses. See
[Where your domain is served](/en/custom-domains#where-your-domain-is-served).

## Create the DNS records

Create both records in your DNS provider. Copy the values from the Domains
page; the examples below only show their form.

### Ownership record (TXT)

This record proves that you control the domain. Verification depends on it.

- **Host:** `_onetime-challenge-` followed by a short identifier for your
  domain. For a subdomain, the subdomain is added after it. For example,
  `_onetime-challenge-abc1234` for `example.com`, or
  `_onetime-challenge-abc1234.secrets` for `secrets.example.com`. Create it in
  the zone of the base domain (`example.com`).
- **Value:** a 32-character hexadecimal code.

Some providers expect only the host label and add the zone for you; others
expect the full name. Either form is fine as long as the record resolves at
`<host>.<your base domain>` and returns the value unchanged.

The value stays the same while the domain is in your organization. If you
remove the domain and add it again, it gets a new host and value.

Keep this record after verification. Verification is repeated in the
background, and a check that no longer finds the record stops the domain
being served.

### Routing record (CNAME or A)

This record sends visitors to Onetime Secret.

- **Subdomain:** a CNAME record from your subdomain (for example `secrets`) to
  the target shown on the Domains page.
- **Apex domain:** an A record for `@` (or a blank host, depending on your
  provider) with the IP address shown on the Domains page.

For reference, these are the targets for each regional site:

| Region | CNAME target | A record address |
|---|---|---|
| Canada | `identity.ca.onetime.co` | As shown on the Domains page |
| European Union | `identity.eu.onetime.co` | `109.105.217.207` |
| Aotearoa New Zealand | `identity.nz.onetime.co` | As shown on the Domains page |
| United Kingdom | `identity.ingress.onetime.co` | As shown on the Domains page |
| United States | `identity.us.onetime.co` | `66.51.126.41` |

Remove any other A, AAAA or CNAME records for the same host. Do not remove the
TXT ownership record; it is not a conflict.

## Verify the domain

1. On the **Domains** tab, open the domain's menu and choose **Verify
   Domain**, or select the domain's status. On the verification page, choose
   **Verify Domain**. The button can be used again after a short pause.
2. The service also re-checks domains in the background, so verification can
   finish without you pressing the button. DNS changes can take up to 24–48
   hours to propagate, although they are usually much faster.

Verification succeeds when the TXT record is found. The domain is then served,
and you can choose it when you create a secret. The routing record and the
certificate are tracked separately; see
[DNS validation](/en/custom-domains/dns-validation) for each stage and the
status labels.

## Check the result

When the domain is ready, its status on the Domains tab reads **Active**.
After a check has run, the domain's verification page shows a **Domain
Status** panel with these fields:

- **Status**: the latest result reported for the domain.
- **Target Address**: where the service routes the domain internally. It is
  not a value to enter in your DNS.
- **DNS Record**: the routing record the service expects.
- **SSL Status**: whether a certificate is active.
- **SSL Renews**: the current certificate's expiry date. The service renews the
  certificate before then; you do not need to do anything.
- **Last Monitored**: when the domain was last checked.

## Use the domain

When you create a secret while signed in, choose the domain you are creating
under. The secret link then uses your domain, for example
`https://secrets.example.com/secret/abc123`.

## Questions or need support?

Email [support@onetimesecret.com](mailto:support@onetimesecret.com) or use the
[feedback form](https://onetimesecret.com/feedback).
