---
textprov: true
title: Email sender
description: Send secret-link and incoming-secret emails for your custom domain from your own address, and add the DNS records that verify it.
plan: Identity Plus
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret at 145c1e7cfa — lib/onetime/models/custom_domain/mailer_config.rb:58-101,168-189,270-272 (fields; DNS and provider checks; a new From address resets verification); apps/api/domains/logic/sender_config/base.rb:31-79 (custom_mail_sender, ORGS_CUSTOM_MAIL_ENABLED, From address forced onto the custom domain without flexible_from_domain); lib/onetime/mail/mailer.rb:85-90 (used only when enabled and verified; From address and Reply-To only); apps/api/domains/logic/sender_config/send_test_email.rb:20-33,96-106 (test email, 10 an hour, works before enabling); src/apps/workspace/domains/DomainEmail.vue:157-167, components/domains/DomainEmailConfigForm.vue:105-109 and DomainEmailDnsRecords.vue with locales/content/en/workspace-domains.json and 00-common.json (labels; Update saves; From Name and the local part required in the form); lib/onetime/domain_validation sender strategies (DKIM, return-path or MX/SPF, optional DMARC)
---

By default, emails about your domain's secrets come from the service's own
address. With an email sender, they come from an address you choose, such as
`secrets@example.com`.

The sender is used for two kinds of email on this domain:

- secret links sent by email when someone creates a secret;
- notifications to [incoming-secret](/en/custom-domains/homepage-and-incoming#incoming-secrets)
  recipients.

Sign-in, account and other service emails still come from the service's
address.

## Before you start

- Your organization is on **Identity Plus** or **Team Plus**.
  - On Identity Plus, the address must be on the custom domain itself: you
    choose the part before the `@`.
  - On Team Plus, the address can be on any domain you control.
- You are the organization's **owner**.
- T󠄁h󠄁e󠄁 d󠄁o󠄁m󠄁a󠄁i󠄁n󠄁 h󠄁a󠄁s󠄁 b󠄁e󠄁e󠄁n󠄁 v󠄁e󠄁r󠄁i󠄁f󠄁i󠄁e󠄁d󠄁,󠄁 a󠄁n󠄁d󠄁 y󠄁ou can add DNS records for the sending
  domain.
- **Configure Email** appears on the domain's page. If it does not, custom
  email sending is not turned on for the service you use.

## Set up the sender

1. Open the user menu, choose **Domains**, then **Manage** next to the domain.
2. Under **Features**, choose **Configure Email**.
3. Fill in:
   - **From N󠄁a󠄁m󠄁e󠄁**:󠄁 r󠄁e󠄁q󠄁u󠄁i󠄁r󠄁e󠄁d󠄁 b󠄁y󠄁 t󠄁h󠄁e󠄁 f󠄁o󠄁r󠄁m󠄁;󠄁 s󠄁e󠄁e󠄁 t󠄁h󠄁e󠄁 n󠄁o󠄁t󠄁e󠄁 b󠄁e󠄁l󠄁o󠄁w󠄁.󠄁
   - **F󠄁r󠄁o󠄁m󠄁 Address**: the sending address.
   - **Reply-To Address** (optional): where replies go.
4. Choose **U󠄁p󠄁d󠄁at󠄁e**.
5. Under **DNS Records**, add each record shown to your DNS. They include DKIM
   records and a return-path or SPF record, depending on the mail provider the
   service uses. A record marked **Recommended**, such as DMARC, is optional.
6. Choose **Re-validate**. Two checks run, **DNS** and **Provider**. When both
   pass, the status reads **Domain verified**.
7. Under **Test email delivery**, choose **Send test** to send yourself a test
   email. This works before the sender is turned on, up to 10 times an hour.
8. Turn on **Enable** and choose **U󠄁p󠄁d󠄁at󠄁e**.

Until the sender is both enabled and verified, emails for the domain come from
the service's address. Changing the From address starts verification again.

:::note
The **From Name** appears on the test email. Secret-link and incoming-secret
emails show the From address without it.
:::

## Related

- [Homepage and incoming secrets](/en/custom-domains/homepage-and-incoming) —
  the form whose notifications use this sender.
- [Branding your domain](/en/custom-domains/branding) — the pages your emails
  link to.
- [Compare plans](/en/pricing/compare-plans) — which plans include a custom
  sender.

## Questions or need support?

Email [support@onetimesecret.com](mailto:support@onetimesecret.com) or use the
[feedback form](https://onetimesecret.com/feedback).
