---
title: DNS validation
description: What Onetime Secret checks before it serves your custom domain, what each domain status means, and how to fix a failed check.
audience: end-user
pageType: how-to
sourceOfTruth: onetimesecret at 145c1e7cfa — lib/onetime/operations/verify_domain.rb:203-216,479-481 (TXT decides ownership; a definite miss demotes the domain); lib/onetime/operations/verify_domain/confirmation_window.rb:40,101-112 (inconclusive checks keep the state for up to 7 days); lib/onetime/models/custom_domain/serving_policy.rb:42-58 and lib/onetime/middleware/domain_strategy.rb:368-384 (served only when ownership is verified, otherwise "This domain is not configured"); apps/api/domains/logic/domains/add_domain.rb:114-166 (certificate requested when the domain is added, by the configured strategy); apps/internal/acme/application.rb:144-157 (caddy_on_demand issues only after verification); lib/onetime/domain_validation/strategy.rb:38-75 and passthrough_strategy.rb:29-35 (one strategy per installation); lib/onetime/jobs/scheduled/domain_refresh_job.rb:62-194 (background re-checks); src/shared/composables/useDomainStatus.ts:89-101 and locales/content/en/00-common.json (status labels)
---

After you add a custom domain and create its DNS records, Onetime Secret checks
the records before it serves the domain. For creating the records, see
[Setting up a custom domain](/en/custom-domains/setup-guide).

## What is checked

Four things have to be in place before your domain works. They are checked
separately:

| Stage | What decides it | What you see until it is done |
|---|---|---|
| **Ownership** | The TXT ownership record is found with the right value | The status shows **Pending Verification** or **Inactive**, and secrets cannot be created on the domain |
| **Routing** | Your CNAME or A record points at the target shown on the Domains page | Visitors do not reach Onetime Secret; the status shows **DNS Incorrect** or **Inactive** |
| **Certificate** | The service obtains a TLS certificate for the domain | The status can show **Certificate pending** |
| **Serving** | Ownership is verified | Visitors who do reach the service get "This domain is not configured" |

Only the TXT record decides verification. A correct CNAME or A record without
the TXT record never verifies. A certificate is not proof of ownership either:
depending on how the service is set up, a certificate can be requested as soon
as you add the domain, but the domain is still not served until the TXT record
is verified.

## When checks run

- **Verify Domain** on the domain's verification page checks it immediately.
  There is a short pause before you can use the button again.
- The service also re-checks domains in the background on a schedule. A check
  can finish without you doing anything.

DNS changes can take time to propagate: often minutes, up to 24–48 hours.

## Domain statuses

The Domains tab shows one status for each domain:

| Status | Meaning |
|---|---|
| **Active** | Ownership is verified, the domain resolves to the service, and it is ready to use. |
| **Pending Verification** | The domain resolves to the service, but the TXT ownership record has not been verified, or it was verified and has since gone. Create or restore the TXT record. |
| **Certificate pending** | Ownership is verified and the domain resolves; the first certificate has not been issued yet. Nothing to do. |
| **DNS Incorrect** | The routing record does not point at the expected target. |
| **Unverified** | The last status check failed, so the current state is unknown. Choose **Verify Domain** to try again. |
| **Inactive** | No check has found the domain resolving to the service yet. Check the routing record. |

## If the TXT record is removed later

Verification is repeated after the domain is active.

- When a check gets a clear answer that the TXT record is missing or wrong, the
  domain is no longer verified and stops being served at once. It is served
  again after a check finds the record.
- When a check gets no clear answer, for example because a DNS server did not
  respond, the domain keeps its current state for up to 7 days.

## Troubleshooting

- **Wrong or missing record:** compare the record type, host and value with the
  ones on the Domains page.
- **Missing TXT record:** a correct CNAME or A record alone never verifies.
  Copy the TXT record's host and value from the Domains page.
- **Host entered twice:** some DNS providers add the zone to the host you
  enter. If the record resolves at a name such as
  `_onetime-challenge-abc1234.example.com.example.com`, enter only the label.
- **Conflicting records:** remove other A, AAAA or CNAME records for the same
  host. Never remove the TXT ownership record.
- **Apex domain:** an apex domain cannot use a CNAME record. Use an A record.
- **Propagation delay:** wait and choose **Verify Domain** again.

If the problem persists, including any certificate error, contact support.

:::note
**Self-hosting this yourself?** Each installation uses one validation strategy,
set with `DOMAINS_VALIDATION_STRATEGY`. With `approximated` or
`caddy_on_demand`, a domain is served only after its TXT record is verified,
unless `DOMAINS_SERVE_UNVERIFIED` is set; with `caddy_on_demand`, the
certificate is also issued only after verification.
With `passthrough`, the default, there is no DNS check: a domain is served once
it is added, and certificates are handled outside the application. See
[Environment variables](/en/self-hosting/environment-variables).
:::

## Related

- [Setting up a custom domain](/en/custom-domains/setup-guide) — add the domain
  and create its DNS records.
- [Custom domains](/en/custom-domains) — plans, roles, and where the domain is
  served.
- [Where your data lives](/en/security/where-your-data-lives) — the regional
  sites and their targets.

## Questions or need support?

Email [support@onetimesecret.com](mailto:support@onetimesecret.com) or use the
[feedback form](https://onetimesecret.com/feedback).
