---
title: Glossary
description: The Onetime Secret words that get confused most often — receipt, passphrase, organization, plan feature, burn — each with the distinction that actually matters.
audience: end-user
pageType: reference
sourceOfTruth: onetimesecret/lib/onetime/models/receipt.rb:286-288 (a receipt is created with twice the secret's lifetime)
---

Some of the words on this service mean something specific, and a few of them
mean something different from what they mean elsewhere. This page defines the
ones that actually cause trouble.

Each entry gives the word the app shows you, the retired or internal synonym you
may still run into, and the page that covers the behaviour in full.

## Secrets, links and receipts

Creating a secret produces two records, not one, with two different addresses.
Most of the vocabulary trouble on this service starts here.

| Term | What it means here |
|------|--------------------|
| **Secret** | The encrypted content itself, held as its own record. It is destroyed the moment it is read. |
| **Secret link** | The address you send to your recipient — the `/secret/…` URL. This is the one that gives up the content, once. |
| **Receipt** | Your own record of the share — the `/receipt/…` URL. It reports what happened to the secret and lets you destroy it early. The app titles the page "Secret Receipt" and lists them under "Receipts". See [Your receipt](/en/share/your-receipt). |
| **Metadata** | The retired name for the receipt. It survives only in the version 1 API, where `/api/v1/metadata/:key` is kept as a deprecated alias of `/api/v1/receipt/:key` and responses carry `metadata_url` alongside `receipt_url`. A `/metadata/…` browser address is not served — the app answers on `/receipt/…`. *Receipt* is the current word. |
| **Private link** | Ambiguous — worth avoiding. It appears in shipped copy with two different meanings: on the home page it means a link you paste in *as* the secret, and in some older receipt-page copy it means the receipt URL itself. |

The receipt is deliberately given twice the secret's own lifetime, so you can
still answer "what happened to it?" after the secret is gone.

Neither address is checked against an account. Whoever holds the secret link can
consume the secret, and whoever holds the receipt link can burn it — supplying
the passphrase as well, if one was set.

A receipt does not carry the secret's own content, but it is not empty of text
either. Three things sit close enough to that line to be worth naming:

- **A generated password.** The receipt shows it to you at most once, and only if
  you open the receipt promptly — see [Your receipt](/en/share/your-receipt).
- **A memo**, if you attached one yourself. The app offers "Add memo" against
  each entry in your receipts list.
- **The recipient address**, stored in obscured form, when you had the secret
  delivered by email rather than copying the link yourself.

## Passphrase and password

| Term | What it means here |
|------|--------------------|
| **Passphrase** | An optional gate on a single secret. Set one and your recipient must type it before the secret will open. It controls *who may open or burn* the secret; it is not the key the content is encrypted with. It is stored only as a hash, so nobody — including Onetime Secret — can look it up or recover it for you. |
| **Password** (account) | The password you sign in with. It has nothing to do with any secret. See [Signing in](/en/account/signing-in). |
| **Password** (generated) | A random value the service mints for you to share, instead of you typing content yourself. This is the sense in "Generate Password" and "Password Generator". |

"Password" in this product never means the passphrase, and the passphrase is
never your account password. When a colleague asks for "the password for the
link", they mean the passphrase.

## Reveal, burn, expire — and where "delete" fits

A secret ends in exactly one way, and each way has its own word.

| Term | What it means here |
|------|--------------------|
| **Reveal** | The recipient confirms and reads the secret. The content is handed over once and the secret is destroyed at that moment. The button says "Click to reveal". |
| **Burn** | You destroy the secret yourself, from your receipt, before anyone has read it. It is permanent, there is no undo, and it only works while the secret is still unread. If you set a passphrase, burning asks for it, exactly as revealing does. |
| **Expire** | The lifetime you chose ran out with nobody reading it. No application code runs at that moment; the stored secret simply ceases to exist. |
| **Orphaned** | The uncommon fourth outcome: the secret is gone, but none of the three above was recorded against it. Your receipt reports it rather than leaving the record blank. |
| **Delete** | Not a word you will meet as an end user. In the app's own copy it is the plain-English gloss of burning or reading — "burning a secret will delete it before it has been read" — and separately it is the word for [closing your account](/en/account/close-your-account). There is a real delete, but it is an operator action: whoever runs the instance can destroy a secret outright, and that is the usual reason a receipt reports *orphaned*. |

Fetching is not revealing. Loading a secret link is a safe read: it does not
consume the secret, and only an explicit confirmation does. A mail scanner or a
chat preview can therefore open the link without spending it, and your receipt
counts those fetches separately from the reveal. See
[When a secret link doesn't work](/en/share/when-a-link-doesnt-work).

## Organizations, workspaces and teams

| Term | What it means here |
|------|--------------------|
| **Organization** | The shared container that owns members, custom domains and activity. It is the object the product actually models. See [Organizations](/en/organizations). |
| **Workspace** | The same thing. Both words are on screen, sometimes on adjacent screens: the settings area is titled "Workspaces" while an individual one is titled "Organization Settings". The organization the app creates for you automatically is named "Default Workspace". |
| **Team** | Not an object in this product. The word survives in an older URL the app still understands, in the entitlement named `manage_teams` that can appear in your "Plan Features" list, in the `teams_used` and `teams_limit` fields of your subscription — drawn as a usage meter in Organization Settings — and in loose prose here and there. In every one of those places, read "organization". The product does not use the word *seat* either. |
| **Member** | Someone who belongs to an organization — and also the name of the least-privileged organization role, below. |

## Roles: two different ladders

Two independent sets of roles exist and they share words. One is your role
inside an organization. The other is a role on the whole instance.

| Term | What it means here |
|------|--------------------|
| **Owner** | An organization role, the highest one. Only an owner can change organization-wide settings such as [single sign-on](/en/organizations/sso). |
| **Admin** (organization) | An organization role below owner: can manage members and most organization settings. |
| **Member** (role) | An organization role covering ordinary use — creating secrets, viewing receipts, API access. |
| **Colonel** | The instance-wide superuser: what other products call a site administrator. This is a word you see, not just an internal one — the operator console lives under `/colonel` and the navigation reads "Colonels Only". The first colonel is established on the server — from a command-line tool, or by naming the account in the instance's configuration — and an existing colonel can then grant the role to other accounts from that console. It belongs to whoever runs the instance; an end user of the hosted service never has it. |
| **Admin / staff** (system) | Two further instance-level roles that exist in the hierarchy but are not distinct roles in the product today; only *colonel* is actually checked. A system admin is not an organization admin. |

The three organization roles nest: an owner can do anything an admin can, and an
admin anything a member can. Managing members is limited to owners and admins —
see [Inviting members](/en/organizations/inviting-members).

## Plan features, entitlements and permissions

| Term | What it means here |
|------|--------------------|
| **Plan feature** | What the app calls a named capability a plan can include. Your organization's are listed by name under "Plan Features". |
| **Entitlement** | The internal name for the same thing, and the word the operator console uses. If "entitlement" turns up in an error message or an administrative screen, read "plan feature". |
| **Permission** | Not a modelled concept here. It appears only in refusal messages — "You do not have permission to manage members" — where the actual cause is a role, a plan feature, or both. |
| **Capability** | Not product vocabulary. It carries no special meaning here. |

Whether you can do something is decided by two things at once: what your
organization's plan includes, and what your role allows. Both have to permit it.
A role never adds a feature the plan does not include, and a plan never grants a
feature to a role that does not carry it. That is why the same refusal can
appear as an upgrade prompt in one place and as a "you do not have permission"
notice in another.

## Secret Activity and Audit Log

| Term | What it means here |
|------|--------------------|
| **Secret Activity** | Your organization's record of what happened to its secrets: creation, the status and link fetches, reveals, burns, expiry and the uncommon outcomes. Each kind has its own on-screen label, and [Secret Activity](/en/organizations/audit-trail) lists them all. You will find it under the organization's Activity tab; it is limited to organization owners and admins. |
| **Audit logs** | The feature name for Secret Activity. Same record, second name — which is why you may meet it under either. |
| **Audit Log** | A different record entirely: every mutating administrative action across a whole instance. Only an instance operator — a colonel — can read it. |

Secret Activity covers secrets only. Sign-ins, single sign-on changes and other
account events do not appear in it; for those, see
[Sessions and connected identities](/en/account/sessions-and-identities).

It is bounded by a number of events rather than by a time window. There is no
retention period after which entries drop off; instead, the oldest entries are
eventually displaced by newer ones.

"Security Events" is not a name this product uses for anything. The two records
above are the two you are likely to meet, rather than a complete list — the
sign-in system keeps its own per-account log of authentication events, such as
sign-ins, password changes and multi-factor setup, and that one is readable only
by an instance operator.

## Custom domains and the default domain

| Term | What it means here |
|------|--------------------|
| **Custom domain** | A domain you own, pointed at Onetime Secret, so your secret links carry your name instead of ours. See [Custom domains](/en/custom-domains). |
| **Default domain** | The service's own address — what a secret link uses when you have not set up a custom domain. Code and internal writing call this the *canonical* domain; that word does not appear in the app. |
| **Cluster** | Not user-facing vocabulary. It is a key in API responses carrying a domain's proxy details. |

A custom domain cannot overlap the default domain, including a subdomain of it.
Setting one up means proving you own the name with a TXT record, then pointing
the name at the service — a CNAME for a subdomain, an A record for a root
domain — and waiting for DNS to propagate. The exact values are specific to your
domain and to the instance you are on, so take them from the screen rather than
from any example. See
[Setting up a custom domain](/en/custom-domains/setup-guide).

## See also

- [Send your first secret](/en/start/send-your-first-secret) — the terms above,
  in the order you meet them
- [Your receipt](/en/share/your-receipt) — the secret/receipt distinction at
  length
- [Organizations](/en/organizations) — organizations, members and roles in
  practice
- [Translation glossary](/en/translations/glossary) — the same terms across
  languages
