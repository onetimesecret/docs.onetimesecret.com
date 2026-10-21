---
title: Request a secret
description: Ask someone to send you a one-time secret link, or collect sensitive information through a form on your custom domain.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret at 145c1e7cfa — lib/onetime/models/receipt.rb (incoming source capabilities); lib/onetime/models/receipt/features/safe_dump_fields.rb and apps/api/v2/logic/secrets/show_receipt.rb (incoming receipts omit share links)
---

Ask someone to send you a password, API key, recovery code, or other sensitive
text through a secret link. You can request a link directly or provide an
incoming form on your custom domain.

If you already received a link, see [What recipients see](/en/share/what-recipients-see).
If it does not work, see [When a link doesn't work](/en/share/when-a-link-doesnt-work).

## Ask them to send you a link

1. Ask the sender to open [Onetime Secret](https://onetimesecret.com/) and
   enter the text they want to share.
2. If they set a passphrase, ask them to give it to you through a different
   channel from the link, such as by phone if the link arrives by email.
3. Have them send you the secret link. Open it, then confirm the reveal when
   you are ready to save the content.

Neither of you needs an account. You can send this request:

> Please share the information through a link at onetimesecret.com instead of
> pasting it into this conversation. No account is needed. If you set a
> passphrase, please send it through a different channel.

For the sender's steps, link them to
[Send your first secret](/en/start/send-your-first-secret).

## Give them a form on your domain

If you collect sensitive text regularly, you can enable an incoming form on a
[custom domain](/en/custom-domains). Senders submit the text there without
needing an account. See
[Homepage and incoming secrets](/en/custom-domains/homepage-and-incoming) for
the feature and its configuration.

## What the sender sees afterwards

An incoming submission produces a receipt that reports its recorded status and
lets the sender burn it before reveal, with a passphrase if required. It does
not show the share link, so the sender cannot copy that link from the receipt
and forward it to someone else.

A created receipt is not proof that a notification email was delivered or read.
The sender can check for a **Revealed** status to learn whether a reveal
succeeded; that status does not prove who read it. See
[Your receipt](/en/share/your-receipt).

## Related

- [What recipients see](/en/share/what-recipients-see) — opening and revealing
  a link
- [Sharing secrets](/en/share) — creating and sending a link yourself
- [Why use secret links](/en/share/why-secret-links) — reducing copies in
  conversations

## Questions or need support?

Email [support@onetimesecret.com](mailto:support@onetimesecret.com) or use the
[feedback form](https://onetimesecret.com/feedback).
