---
title: DNS Validation
description: How Onetime Secret verifies your custom domain's DNS configuration, what each status means, and how to resolve validation failures.
audience: end-user
pageType: how-to
---

## What is DNS validation?

After you add a custom domain and create the required DNS records, Onetime
Secret needs to confirm that you own the domain and that your records point to
the correct region endpoint before it can issue an SSL certificate and start
serving your domain. That confirmation step is **DNS validation**.

This page focuses on the _validation lifecycle_. For creating the records in the
first place — CNAME vs. A records, per-region targets, and apex vs. subdomain
guidance — see the [Setup Guide](/en/custom-domains/setup-guide).

## The validation lifecycle

1. **Records created** — You add the two records shown in your Domain Dashboard: the TXT ownership record, plus the CNAME (subdomain) or A record (apex) for your chosen [region](/en/security/where-your-data-lives). They can be created in either order.
2. **Verification** — Onetime Secret automatically re-checks the domain on a schedule (roughly every 30 minutes), and you can use the **Verify** button to expedite the check; you may need to refresh the page. Every pass checks both the TXT ownership record and your CNAME/A record.
3. **SSL issuance** — Once verification succeeds, SSL certificate generation begins automatically. This usually takes a few minutes.
4. **Active** — When complete, the dashboard shows **Active with SSL**, the target address for your region, an SSL status of **Active**, and an SSL renewal date.

## Reading your domain status

Your Domain Dashboard reflects where the domain is in this lifecycle:

- **Pending / Unverified** — Records have not yet been detected. DNS changes can take time to propagate (often minutes, but up to 24–48 hours).
- **Active with SSL** — Verification succeeded and a certificate has been issued. Your secret links now use the custom domain.
- **Last Monitored** timestamp — Onetime Secret continuously monitors your domain's connectivity. The timestamp confirms the most recent successful check.

## Troubleshooting failed validation

If validation does not succeed, work through the following:

- **Wrong or missing record** — Double-check the record type, host, and target value against the [Setup Guide](/en/custom-domains/setup-guide) for your specific region.
- **Missing TXT record** — Verification checks both the TXT ownership record and your CNAME/A record; a correct CNAME/A with a missing TXT record will never verify, even if SSL has been issued and the domain appears to work. Copy the TXT record's host and value from your Domain Dashboard.
- **Conflicting records** — Remove any existing A, AAAA, or CNAME records for the same host that conflict with the one you added. Never remove the TXT ownership record — it must stay in place before and after verification.
- **Propagation delay** — DNS changes may take up to 24–48 hours to fully propagate. If verification fails initially, wait and try again.
- **Apex domain limitations** — Apex (root) domains cannot use CNAME records and must use A records; confirm you are using the correct record type.
- **Domain ownership** — Make sure you have full control of the domain and its DNS settings.

If problems persist, including any SSL-related errors, contact our support team.

## Related pages

- [Setup Guide](/en/custom-domains/setup-guide) — create the DNS records and choose your region.
- [How Custom Domains Work](/en/custom-domains#how-it-works) — the bigger picture.
- [Where your data lives](/en/security/where-your-data-lives) — choose the right region and its endpoint.

## Questions or need support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
