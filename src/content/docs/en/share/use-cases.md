---
title: Use cases
description: Use one-time links to deliver credentials, Wi-Fi passwords, license keys, and recovery codes without treating the link as storage or access control.
audience: end-user
pageType: concept
sourceOfTruth: onetimesecret at 145c1e7cfa — lib/onetime/models/secret/features/secret_state_management.rb (single retrieval and deletion); apps/api/v2/logic/secrets/show_secret.rb (bearer-link access and confirmation); apps/api/v2/logic/secrets/actor_attribution.rb and access_telemetry.rb (account and network context)
---

Use a secret link when you need to deliver sensitive text without pasting the
text into a persistent conversation. Each link permits one successful reveal;
create separate secrets if each recipient needs their own reveal.

A recipient can save or share the content afterwards. The examples below reduce
copies in message history; they do not control what someone does with a password,
key, or document after reading it.

## Share a password or API key

Send a credential to a colleague or client through a secret link. Choose a short
practical lifetime and send any passphrase through a different channel. The
recipient should save the value in its intended location before leaving the
reveal page.

For ongoing shared access, use your organization's credential-management process.
If access needs to end, revoke or rotate the credential in the issuing system.
Burning a link cannot revoke a credential someone has already read.

## Give a guest a Wi-Fi password

Send a guest-network password through a link rather than leaving the password
in a chat history. After reveal or expiry, the old link cannot retrieve it.
The guest can still keep or share the password, and the network's own settings
determine who can connect and for how long.

## Deliver a software license key

Send an activation key to the person who needs to install the software. They
should save the key if their license permits later reuse or reactivation.
The link controls retrieval of the shared copy; it does not enforce license
terms or prevent copying the key.

## Hand over recovery codes

A secret link can deliver recovery codes to their intended account holder.
They must save the codes in a durable, protected place before leaving the
reveal page. Do not use the link itself as a backup: it can expire unread and
cannot be retrieved again after reveal.

For your Onetime Secret account, follow the
[recovery-code guidance](/en/account/two-factor-and-passkeys#your-recovery-codes).

## Request sensitive information

Ask someone to send you a secret link, or provide an incoming form on your
custom domain. See [Request a secret](/en/share/request-secret).

## Sensitive disclosures and anonymity

Sharing without an account does not guarantee anonymity. Activity records can
include masked network context, and signed-in requests can include an account
identifier. Delivery channels, networks, and infrastructure operators may have
other records. See
[What the sender learns about you](/en/share/what-recipients-see#what-the-sender-learns-about-you).

For a disclosure that could put someone at risk, follow the receiving
organization's designated secure reporting process. A one-time secret link
alone is not an anonymous reporting channel.

## Next steps

- [Send your first secret](/en/start/send-your-first-secret) — create and
  send a link
- [Your receipt](/en/share/your-receipt) — status and early destruction
- [Security best practices](/en/security/best-practices) — check the recipient
  and send passphrases separately
