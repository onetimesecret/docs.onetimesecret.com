---
title: Data Protection
description: What Onetime Secret stores, how long it's kept, where it's processed, and how this supports your compliance obligations.
---

# Data Protection

This page describes how Onetime Secret handles your data: what is stored, for
how long, where it lives, and how that supports your own compliance program.

## What we store, and for how long

- **Secret content** is encrypted and intended for a single retrieval. Once a
  secret is viewed — or reaches its expiration — it is permanently destroyed.
- **Expiration is built in.** Every secret has a lifetime (configurable within
  your plan's limits); nothing is intended to live indefinitely.
- **Minimal metadata.** In keeping with our [Data Minimization](/en/principles/data-minimization)
  principle, we aim to keep only the metadata needed to operate the service.

## Encryption

Secrets are **encrypted in transit and at rest** on every plan. Transport is
protected with TLS, and for custom domains we manage SSL/TLS certificate
issuance and renewal automatically.

For especially sensitive material you can add defense in depth by enabling a
**passphrase**, splitting information across multiple secrets, and choosing the
shortest practical expiration — see [Security Best Practices](/en/security-best-practices).

## Where your data is processed (residency)

You can choose the region where your data is processed and stored — currently
the EU, UK, US, CA, and NZ. This lets you keep data close to your users and
within a jurisdiction that fits your requirements. See
[Data Center Regions](/en/regions) for details and endpoints.

## Compliance

Onetime Secret is designed to support your compliance efforts; it does not
replace your own controls, policies, and legal review.

- **GDPR / data protection.** Regional data residency, short-lived data, and
  data minimization are designed to help you meet data-protection obligations.
  In most deployments you act as the data controller and Onetime Secret as a
  processor for the limited data involved.
- **HIPAA.** As noted in our [use cases](/en/custom-domains/use-cases), Onetime
  Secret can provide a more secure channel than email for exchanging initial
  access credentials, but it should be used as a stopgap rather than a permanent
  system of record for PHI. Pair it with a dedicated compliant system for
  ongoing PHI workflows.
- **Certifications, DPAs, and specific frameworks.** For questions about
  certifications, a Data Processing Agreement, or a specific regulatory
  framework, contact **support@onetimesecret.com**.

For organizations with strict data-control requirements, [self-hosting](https://github.com/onetimesecret/onetimesecret)
keeps everything within your own infrastructure.

## Questions or Need Support?

We're here to help.

- General: support@onetimesecret.com
- Security issues: security@onetimesecret.com ([disclosure policy](/en/security/vulnerability-disclosure))
