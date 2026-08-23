---
title: Homepage and Incoming Secrets
description: Control whether visitors can create secrets on your branded custom-domain homepage, or use that homepage to collect secrets sent to you.
plan: Free
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret/lib/onetime/models/custom_domain/homepage_config.rb:33-50
---

When you set up a [custom domain](/en/custom-domains), the address — for example
`secrets.yourbrand.com` — has its own homepage. Two settings decide what that
homepage does: whether it is enabled at all, and which interactive experience it
offers when it is. The two experiences are the classic secret-creation form
(**Homepage Secrets**) and the incoming-secrets form (**Incoming Secrets**).

You manage both from your **Domain Dashboard** at any time. The settings are
domain-specific, so each of your custom domains can behave differently.

## Homepage Secrets

**Homepage Secrets** is the setting that controls whether visitors to your
branded homepage can create and share secrets directly from your interface.

### Allow public secrets

On your Domain Dashboard you can configure the visibility of your branded
homepage. Enabling this feature allows your clients, customers, or team members
to create and share secrets directly from your branded interface.

<img src="/img/docs/custom-domains/guide-brand-admin-5.png" alt="Preview panel showing branded interface" width="400" />

### Disable homepage

If you would rather use your custom domain only for the secret links you
generate yourself — and not present a public secret-creation page — you can
disable the homepage entirely.

<img src="/img/docs/custom-domains/guide-brand-admin-6.png" alt="Homepage disabled view" width="400" />

### Important notes

- Changes process immediately upon saving.
- Allow up to 5 minutes for CDN cache refresh.
- Settings are domain-specific.

## Incoming Secrets

:::note
Step-by-step, screenshot-driven setup for Incoming Secrets is not documented yet.
The behaviour described below is what the product does; the screens are still
being written up.
:::

Most of Onetime Secret is about _sending_ a secret: you create a one-time link
and share it with someone. **Incoming Secrets** flips that direction. It gives
you a destination page on your custom domain where other people — customers,
clients, vendors, or colleagues — can send a secret **to you**, without needing
an account of their own.

This is useful whenever you need to _collect_ sensitive information rather than
distribute it, for example:

- A client sending you credentials, API keys, or account details during onboarding
- A customer submitting a document or value you need to handle securely
- A vendor returning a password or token you provisioned for them

### How it works (overview)

1. You enable an incoming page for your verified custom domain.
2. You configure who receives the submitted secrets (a preconfigured list of recipients).
3. You share the page's address — for example `secrets.yourbrand.com` — with the sender.
4. The sender writes their secret and submits it; it is encrypted and delivered as a one-time link to your configured recipients.

## Related features

- [Brand Guide](/en/custom-domains/branding) — customize the logo and colors shown on this homepage.
- [Access and Privacy](/en/custom-domains/access-and-privacy) — additional controls over what visitors can do.
- [Custom Domains Overview](/en/custom-domains) — the foundation these features build on.

## Questions or Need Support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
