---
textprov: true
title: Homepage and incoming secrets
description: Choose what visitors see on your custom domain's homepage, and set up a form where people send secret text to a recipient you choose.
plan: Free
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret at 145c1e7cfa — lib/onetime/models/custom_domain/homepage_config.rb:31-49,119-120,190-200 (enabled false by default; create or incoming mode; incoming needs an enabled config with a recipient); src/apps/workspace/components/domains/DomainHomepageSelector.vue and locales/content/en/workspace-domains.json (Homepage options, saved on selection); locales/content/en/secret-homepage.json (private landing page text); src/apps/secret/conceal/BrandedHomepage.vue (text-only create form); lib/onetime/models/custom_domain/incoming_config.rb:34-56,141-161,267,282-292 (up to 20 recipients, hashed recipient ids, 7-day expiry, 50-character memo); src/apps/workspace/domains/DomainIncoming.vue:96-117 (recipient and Enable changes saved immediately); apps/api/incoming/logic/create_incoming_secret.rb:55-65,185-213,294-305 (one recipient and one secret per submission, no account, link on the custom domain); apps/api/incoming/routes.txt:22-24 (noauth); lib/onetime/security/incoming_rate_limiter.rb:21-27,51-63 (per network address and per recipient); src/apps/secret/views/disabled/variants/DisabledClosed.vue:5-13 (no sign-in action on the private landing page); apps/api/domains/policies/domain_config_authorization.rb:148-155 (manage_org plus homepage_secrets or incoming_secrets)
---

Every custom domain, such as `secrets.example.com`, has its own homepage. You
choose what it shows: a private landing page, a form for creating secrets, or
an incoming-secrets form where people send secret text to you.

These settings are included on every plan. Only the organization's **owner**
can change them,󠄁 a󠄁f󠄁t󠄁e󠄁r󠄁 t󠄁h󠄁e󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 i󠄁s󠄁 v󠄁e󠄁r󠄁i󠄁f󠄁i󠄁e󠄁d󠄁. Each domain has its own
settings.

## Homepage secrets

### Choose what the homepage shows

1. Open the user menu and choose **Domains**.
2. Choose **Manage** next to the domain.
3. Under **Features**, choose **Homepage** and select one of the options below.

Your choice is saved as soon as you select it.

| Option | What visitors see |
|---|---|
| **Private landing page** (the default) | A notice that the service is for internal use onl󠄁y󠄁. Secret links you share on the domain still work. |
| **Secret creation form** | A form where anyone can create a secret link from text, without an account. There is no file upload. |
| **Incoming secrets form** | The incoming-secrets form described below. Available only after incoming secrets are enabled with at least one recipient. |

If you choose the incoming form and later turn incoming secrets off or remove
every recipient, the homepage shows the private landing page instead.

## Incoming secrets

Incoming secrets let someone without an account send you secret text, for
example a client sending credentials during onboarding. You choose the
recipients by email address. The sender picks one of them for each
submission.

### Set up incoming secrets

1. Open the domain as above and, under **Features**, choose **Configure
   Incoming Secrets**.
2. Under **Recipients**, enter an **Email Address** and a **Display Name**,
   then choose **Add Recipient**. Repeat for up to 20 recipients.
3. Turn on **Enable**.

Each change is saved as soon as you make it. To remove a recipient, choose
**Remove** next to it.

If **Configure Incoming Secrets** does not appear, incoming secrets are not
turned on for the service you use.

### Share the form

The form is at `/incoming` on your domain, for example
`https://secrets.example.com/incoming`. To show it on the homepage itself,
choose **Incoming secrets form** under **Homepage**.

### What senders do

1. Open the form. No account is needed.
2. Under **Send to**, choose a recipient. Senders see display names only, never
   the recipients' email addresses.
3. Enter the text under **Secret Information**, and optionally a **Memo** of up
   to 50 characters.
4. Choose **Send Secret**.

The form accepts text only; it does not accept files. The service limits how
many secrets can be sent in an hour, per n󠄁e󠄁t󠄁w󠄁o󠄁r󠄁k󠄁 a󠄁d󠄁d󠄁r󠄁e󠄁ss󠄁 and per recipient.

### What recipients get

Each submission creates one secret for the one recipient the sender chose. That
recipient receives an email with a secret link on your domain. The link can be
revealed once and expires after 7 days if it is not opened.

The sender gets a receipt that shows the secret's status and lets them burn it
before it is revealed. The receipt does not show the secret link. See
[Request a secret](/en/share/request-secret#what-the-sender-sees-afterwards).

### Test the form

1. Add yourself as a recipient.
2. In a private browser window, open `https://<your domain>/incoming`, choose
   your display name, enter test text and choose **Send Secret**.
3. Check that the email arrives and that its link opens on your domain.

## Related

- [Branding your domain](/en/custom-domains/branding) — the logo and colors on
  these pages.
- [Email sender](/en/custom-domains/email-sender) — send incoming-secret emails
  from an address on your domain.
- [Request a secret](/en/share/request-secret) — other ways to ask someone for
  sensitive information.

## Questions or need support?

Email [support@onetimesecret.com](mailto:support@onetimesecret.com) or use the
[feedback form](https://onetimesecret.com/feedback).
