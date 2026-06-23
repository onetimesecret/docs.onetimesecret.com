---
title: Security & Trust
description: How Onetime Secret protects your secrets — the security model, data handling, regional residency, and how to report a vulnerability.
---

# Security & Trust

Onetime Secret exists to move sensitive information from one person to another
without leaving it lying around in inboxes, chat logs, or ticketing systems.
This section explains how the service is built to do that safely and where to
find the details.

## The security model in brief

- **One-time access.** A secret is designed to be viewed once and then
  permanently destroyed. Once it has been read (or has expired), it's gone.
- **Encryption in transit and at rest.** Secrets are encrypted in transit and
  at rest across all plans.
- **Passphrase protection.** You can require a passphrase to view a secret,
  adding a layer the link alone can't unlock.
- **Time-limited by design.** Secrets carry an expiration; choose the shortest
  practical lifetime to minimize exposure.
- **Burn before reading.** If a secret hasn't been viewed yet, you can burn it
  so it can never be read.
- **Data minimization.** We aim to collect and retain only what's necessary —
  see [Data Minimization](/en/principles/data-minimization).

## Explore this section

- **[Data Protection](/en/security/data-protection)** — what we store, for how long, where it lives, and how this maps to compliance needs.
- **[Security Best Practices](/en/security-best-practices)** — practical guidance for sharing secrets safely, including the benefits of Custom Domains.
- **[Vulnerability Disclosure](/en/security/vulnerability-disclosure)** — how to report a security issue responsibly.

## Related

- **[Our Principles](/en/principles)** — Privacy First, Trust, Communication, and Data Minimization.
- **[Data Center Regions](/en/regions)** — choose where your data is processed and stored.
- **[Self-Hosting](https://github.com/onetimesecret/onetimesecret)** — run Onetime Secret on your own infrastructure for full control.

## Reporting a security issue

If you believe you've found a vulnerability, please contact our security team at
**security@onetimesecret.com**. See [Vulnerability Disclosure](/en/security/vulnerability-disclosure)
for what to include and what to expect.
