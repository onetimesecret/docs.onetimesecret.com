---
title: Glossary
description: Definitions of the terms used when sharing secrets, reading receipts, managing an organization, and choosing where to run Onetime Secret.
audience: end-user
pageType: reference
sourceOfTruth: onetimesecret/lib/onetime/models/secret/features/secret_state_management.rb (reveal and burn); onetimesecret/apps/api/v2/logic/secrets/burn_secret.rb (passphrase required to burn a protected secret); onetimesecret/apps/api/v2/logic/secrets/show_receipt.rb (receipt status and generated-password display); onetimesecret/src/apps/secret/components/receipt/StatusBadge.vue (displayed statuses); onetimesecret/lib/onetime/models/organization_membership.rb (organization roles and plan access); onetimesecret/lib/onetime/models/organization/features/secret_activity.rb (organization activity record)
---

These are the terms you will see in Onetime Secret and its documentation,
grouped by task. Follow the links for instructions and examples.

## Sharing secrets

| Term | Meaning |
|------|---------|
| **Secret** | Sensitive information you share, such as a password, API key or recovery code. Onetime Secret stores it encrypted and deletes its stored copy when it is revealed, burned or expires. |
| **Secret link** | The link you send to your recipient, with `/secret/` in its address. Anyone with the link can reveal the secret once, provided they also enter the passphrase if you set one. |
| **Receipt** | A page where you can check a secret's status or destroy it before it is revealed. Its address contains `/receipt/`. Keep this link private; it does not repeat content you entered. See [Your receipt](/en/share/your-receipt). |
| **Passphrase** | An optional password you set for an individual secret. It is required to reveal that secret or destroy it early. Send it separately from the link and keep it safe: it cannot be recovered. |
| **Expiration (lifetime)** | How long an unread secret remains available after you create it. When that time runs out, the secret is deleted automatically. Revealing or burning it ends its availability sooner. |
| **Generated password** | A random password created by Onetime Secret for you to share. Without a passphrase, it can be displayed once on the receipt shortly after creation; with a passphrase, it is not displayed there. See the [display conditions](/en/share/your-receipt#seeing-a-generated-password-one-look). |
| **Memo** | A short note you add to a receipt to help you recognize it later. The memo is separate from the secret and remains visible on the receipt. See [Dashboard and recent secrets](/en/account/dashboard-and-recent-secrets). |

For the complete sharing process, see
[Send your first secret](/en/start/send-your-first-secret).

## Secret status

Opening a secret link and revealing its content are separate steps. These terms
help you understand what has happened to a secret.

| Term | Meaning |
|------|---------|
| **New** | The secret is available and its link has not yet been previewed. |
| **Previewed** | The secret link has been loaded, but the content has not been revealed. A mail scanner or chat preview can cause this status; it does not prove your recipient opened the link. |
| **Reveal / Revealed** | Revealing displays the content once and deletes the stored secret. A **Revealed** status means this has happened; the link can no longer reveal it again. |
| **Burn / Burned** | Burning permanently destroys an unread secret from its receipt. If you set a passphrase, it is also required to burn the secret. A **Burned** status means the secret was destroyed this way. |
| **Expire / Expired** | The secret's lifetime ended before it was revealed or burned. The content is no longer available. |
| **Orphaned** | The secret is no longer available, but its receipt has no recorded reveal, burn or expiry to explain why. |

See [Your receipt](/en/share/your-receipt) for status details, or
[When a link doesn't work](/en/share/when-a-link-doesnt-work) for help with an
unavailable secret.

## Account access

| Term | Meaning |
|------|---------|
| **Account password** | A password used to sign in to your Onetime Secret account. It is separate from any passphrase you set on a secret. Available sign-in methods depend on the service you use; see [Signing in](/en/account/signing-in). |
| **Single sign-on (SSO)** | Signing in to Onetime Secret through an identity provider, such as your organization's existing sign-in service. The provider verifies your identity. See [Single sign-on](/en/organizations/sso). |
| **API token** | A credential that lets a script or application use the Onetime Secret API with your account. Keep it private, as you would a password. See [API authentication](/en/api#authentication). |

## Organizations and roles

| Term | Meaning |
|------|---------|
| **Organization / Workspace** | A shared space for custom domains, members and organization settings. Both names refer to the same thing in Onetime Secret. See [Organizations](/en/organizations). |
| **Owner** | The organization role with the broadest access, including billing and single sign-on settings. |
| **Admin** | An organization role that can manage members, custom domains and other shared settings, with fewer permissions than an owner. |
| **Member** | Someone who belongs to an organization. **Member** is also the role for using its resources without administering the organization. |
| **Plan feature** | Something your organization can use as part of its plan, such as custom domains or Secret Activity. Your role also determines which included features you can use. See [Compare plans](/en/pricing/compare-plans). |
| **Secret Activity** | The organization's record of events involving its secrets, such as creation, link access, reveals and burns. It does not contain secret content. This feature is called **audit logs** in plan comparisons; see [Secret Activity](/en/organizations/audit-trail). |

See [Inviting members](/en/organizations/inviting-members) for managing access
to an organization.

## Domains and hosting

| Term | Meaning |
|------|---------|
| **Custom domain** | A domain you own, such as `secrets.example.com`, configured to use Onetime Secret for sharing. Your secret links use that address. See [Custom domains](/en/custom-domains). |
| **Incoming Secrets** | A form on your custom domain where other people can send secrets to recipients you configure. Senders do not need an account. See [Incoming Secrets](/en/custom-domains/homepage-and-incoming#incoming-secrets). |
| **Region** | A location where the hosted service stores your secrets and account. Regions operate independently; use the regional site where you created your account to sign in. See [Where your data lives](/en/security/where-your-data-lives). |
| **Hosted service** | The version of Onetime Secret we run and maintain for you, available through [onetimesecret.com](https://onetimesecret.com/) and its regional sites. |
| **Self-hosted instance** | A copy of Onetime Secret that you or your organization run on infrastructure you manage. The operator is responsible for its configuration, maintenance and updates. See [Hosted or self-hosted?](/en/start/hosted-or-self-hosted). |

## Related

- [Send your first secret](/en/start/send-your-first-secret) — use the sharing
  terms in practice
- [Security best practices](/en/security/best-practices) — protect your links,
  passphrases and account
- [Translation glossary](/en/translations/glossary) — terminology across
  languages
