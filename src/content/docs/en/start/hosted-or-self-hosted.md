---
title: Hosted or self-hosted?
description: Choose between the hosted Onetime Secret service and running your own instance. Compare setup, infrastructure control, and maintenance responsibilities.
audience: end-user
pageType: concept
sourceOfTruth: onetimesecret/etc/defaults/auth.defaults.yaml at 145c1e7cfa (simple authentication default and SQLite default for full mode); onetimesecret/etc/defaults/config.defaults.yaml at 145c1e7cfa (jobs.enabled controls queued background jobs); onetimesecret/docker/README.md at 145c1e7cfa (Compose stack services and RabbitMQ for queued jobs)
---

You can use the **hosted service** at
[onetimesecret.com](https://onetimesecret.com/), or **self-host** Onetime Secret
on infrastructure you manage. Both use the open-source application. The main
choice is who runs and maintains the service.

## The short answer

- Use the **hosted service** if you want to share secrets without running
  servers and one of its [regions](/en/security/where-your-data-lives) meets
  your data-location requirements. You can
  [send a secret without an account](/en/start/send-your-first-secret).
- **Self-host** if you need control over the infrastructure, network access,
  or application configuration, and can maintain the service yourself.

If you are trying Onetime Secret for the first time, the hosted service lets you
start sharing immediately. You can choose to self-host later.

## What actually differs

| | Hosted service | Self-hosted |
|---|---|---|
| Who runs the infrastructure | Onetime Secret | You or your organization |
| Where secrets are stored | The hosted region you choose | Infrastructure you select and manage |
| Setup effort | No account needed for basic sharing; sign up for account features | Install and configure the application and its dependencies |
| Who maintains the service | Onetime Secret | You manage updates, backups, monitoring, and availability |
| Features and access | Your organization's plan and your role determine access | You configure enabled features and access |
| Transport security | HTTPS is managed for you | You configure HTTPS, usually through a reverse proxy |
| Cost | Free sharing, with subscriptions for additional features | Infrastructure and maintenance time |

## Choosing the hosted service

The hosted service provides secret sharing without infrastructure to maintain.
Choose from five [regions](/en/security/where-your-data-lives): Canada, the EU,
New Zealand, the UK, and the US. See [Compare plans](/en/pricing/compare-plans)
for account features such as custom domains, branding, and single sign-on.

Secrets are processed and stored on infrastructure we operate. Review
[Data protection](/en/security/data-protection) and the available regions when
deciding whether the hosted service meets your requirements.

## Choosing to self-host

Self-hosting lets you choose where to run the application and who can reach it.
For example, you can restrict access to an internal network or configure the
service for your organization's needs. You are responsible for securing the
instance, configuring HTTPS, applying updates, managing backups, and monitoring
availability.

Choose an [authentication mode](/en/self-hosting/simple-or-full-auth) before
installing:

- **Simple mode** stores secrets and accounts in Valkey or Redis.
- **Full mode** also uses a SQL database for authentication. SQLite is the
  default; PostgreSQL is an option.

RabbitMQ is needed when you enable queued background jobs; full authentication
mode alone does not require it. The full Docker Compose stack includes RabbitMQ
and additional services. See [Install with Docker](/en/install/docker) for the
stack contents and setup requirements.

Using the same application does not remove these operational responsibilities.
The protection your instance provides also depends on its configuration and how
you run it.

## Can you change your mind later?

Yes. Start creating new secrets on the deployment you want to use. Existing
secret links remain on the deployment where you created them, until they are
revealed, burned, or expire. They are not transferred to the new deployment.

Hosted regions have separate accounts. See
[Changing your region](/en/account/change-your-region) for account, subscription,
and custom-domain considerations when switching between them. A self-hosted
instance is a separate deployment; a hosted subscription does not configure or
maintain it for you.

## Next steps

- Try the service: [Send your first secret](/en/start/send-your-first-secret)
- Compare hosted options: [Compare plans](/en/pricing/compare-plans) and
  [Where your data lives](/en/security/where-your-data-lives)
- Plan your own instance: [Self-hosting overview](/en/self-hosting/) and
  [Simple or full authentication](/en/self-hosting/simple-or-full-auth)
