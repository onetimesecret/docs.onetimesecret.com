---
title: Receiving secrets
description: How to get a password or other sensitive value sent to you safely — asking for a one-time link, or giving people a form on your own domain to send secrets to you.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret/lib/onetime/models/receipt.rb:93-101 (SOURCE_CAPABILITIES — a secret submitted through an incoming form has shows_share_link false), applied at onetimesecret/lib/onetime/models/receipt/features/safe_dump_fields.rb:66-67,79 and consumed at onetimesecret/apps/api/v2/logic/secrets/show_receipt.rb:322-330
---

:::note
**Status:** Shortened. This page covers the choice between the two ways of
collecting a secret. Step-by-step setup for the incoming form lives on
[Homepage and incoming secrets](/en/custom-domains/homepage-and-incoming) and is
itself still being written up.
:::

Most of Onetime Secret is about sending. This page is the other direction: you need
someone to give *you* a password, an API key, a recovery code, or anything else
that should not sit in an inbox or a ticket.

If someone has already sent you a link, you want
[What recipients see](/en/share/what-recipients-see) instead — or
[When a secret link doesn't work](/en/share/when-a-link-doesnt-work) if it is not
opening.

## Option 1 — ask them to send you a link

The simplest approach, and it needs nothing set up in advance:

1. Ask the person to go to the Onetime Secret homepage and paste the value in.
2. Ask them to set a passphrase and tell you what it is over a different channel —
   if they email you the link, the passphrase should come by phone or chat.
3. They send you the link. You open it once.

Neither of you needs an account for this to work. It is worth saying so when you
ask, because "use this secure link service" often reads as "sign up for something",
and that is what makes people fall back to pasting the value into the email
instead.

Wording that tends to work: *"Please don't email it. Put it in a link at
onetimesecret.com and send me that — it takes a minute and no account."*

## Option 2 — give them a form on your domain

If you have a [custom domain](/en/custom-domains), you can turn its homepage into
an **incoming secrets** form: a page at your own address where anyone can submit a
secret to you, with no account and no instructions needed.

This is the better option when you collect secrets often, or from people outside
your organization — customers, clients, vendors — for whom "go to this third-party
site and paste it there" is a harder ask than "go to `secure.yourcompany.com`".

See [Homepage and incoming secrets](/en/custom-domains/homepage-and-incoming) to
set it up.

## What the sender sees afterwards

Someone who submits through your incoming form gets a receipt for what they sent,
the same as any other secret — with one deliberate difference. **Their receipt does
not carry the share link.** The secret was addressed to you when it was created, so
the app does not hand the sender a link they could pass on to anyone else.

They can still see that it was delivered, and they can still burn it before you
read it.

## Related

- [What recipients see](/en/share/what-recipients-see) — the other side of a link someone sent you.
- [Homepage and incoming secrets](/en/custom-domains/homepage-and-incoming) — setting up the form.
- [Sharing secrets](/en/share) — creating and sending a link yourself.
- [Why use secret links](/en/share/why-secret-links) — what to say when someone asks why email is not fine.

## Questions or Need Support?

We're here to help.

- Email: support@onetimesecret.com
- Feedback form: https://onetimesecret.com/feedback
