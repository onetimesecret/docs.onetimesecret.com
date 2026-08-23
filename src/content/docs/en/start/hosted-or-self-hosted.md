---
title: Hosted or self-hosted?
description: A decision guide for choosing between running Onetime Secret yourself and using the hosted service at onetimesecret.com — what each gives you, what each costs to operate, and when to switch.
audience: end-user
pageType: concept
---

There are two ways to run Onetime Secret: use the **hosted service** at
[onetimesecret.com](https://onetimesecret.com), or **self-host** your own
instance. Both run the same open-source application. The difference is who
operates the infrastructure — and that one difference cascades into cost,
compliance, and how much of your day the software asks for.

## The short answer

- Use the **hosted service** if you want secure secret sharing to just work,
  with no servers to run — and a regional deployment already satisfies your data
  requirements.
- **Self-host** if you need secrets to never leave infrastructure you control,
  or you have compliance, air-gap, or deep-customization requirements the hosted
  service can't meet.

If you're unsure, start with the **hosted service**. There's nothing to
provision, the data-protection guarantees are the same, and you can choose a
[region](/en/security/where-your-data-lives) close to your users or your
regulators. Self-hosting is
always available later if your requirements grow.

## What actually differs

| | Hosted service | Self-hosted |
|---|---|---|
| Who runs the infrastructure | Onetime Secret | You |
| Where secrets live | Our regional data centers (you choose the region) | Your own network and storage |
| Setup effort | Sign up | Provision, configure, deploy, maintain |
| Ongoing operations | None | Updates, backups, monitoring, uptime |
| Plan features (branding, SSO, teams) | Via [paid plans](/en/pricing/compare-plans) | Configure yourself |
| Encryption in transit and at rest | ✅ | ✅ |
| Cost model | Free tier + subscriptions | Your infrastructure + your time |

## Choosing the hosted service

The hosted service is the right default for most people and most organizations.
You get secure, expiring secret links with no infrastructure to run, and you can
pick from five [data-center regions](/en/security/where-your-data-lives) — Canada, the EU, New Zealand,
the UK, and the US — to keep data where you need it. Paid
[plans](/en/pricing/compare-plans) layer on unlimited custom domains, branding, SSO, and
team features without any of the operational burden.

The tradeoff: secrets transit and are stored on infrastructure we operate.
They're encrypted in transit and at rest, and a chosen region keeps them within
a specific jurisdiction — but if your requirement is that sensitive data must
*never* touch a third party's systems, that's the line self-hosting exists to
cross.

## Choosing to self-host

Self-hosting keeps every secret on infrastructure you control, start to finish.
Choose it when that's a hard requirement — regulatory constraints, an air-gapped
or internal-only network, data-residency rules a shared region can't satisfy, or
customization that goes beyond what the hosted plans expose.

The cost is real and ongoing: you provision and secure the services, apply
updates, run backups, and own uptime. Depending on the features you need, that's
Redis alone (Simple mode) or Redis plus PostgreSQL and RabbitMQ (Full mode) —
see [Simple or Full](/en/self-hosting/simple-or-full-auth) for that second decision, which only
applies once you've chosen to self-host. Budget for the time, not just the
servers.

## Can you change your mind later?

Yes, in both directions — because there is no data migration between them by
design. Onetime Secret's [share-nothing architecture](/en/security/where-your-data-lives) means
secrets are never transferred between deployments, and that includes moving
between the hosted service and your own instance. Switching isn't a
data-export; it's pointing new secrets at the new deployment going forward.
Existing live secrets simply expire or are read where they were created.

For **paid hosted accounts**, subscription status is recognized across the
hosted regions through Stripe, but it does not extend to a self-hosted instance
— self-hosting is a separate deployment you operate and license yourself.

## Next steps

- Ready to self-host: [Self-Hosting Overview](/en/self-hosting/) and [Run your own instance](/en/start/run-your-own-instance)
- Staying hosted: [Compare plans](/en/pricing/compare-plans) and [where your data lives](/en/security/where-your-data-lives)
- Already self-hosting: decide your [authentication mode](/en/self-hosting/simple-or-full-auth)
