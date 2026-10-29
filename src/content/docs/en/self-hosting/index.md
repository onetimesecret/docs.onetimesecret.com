---
textprov: true
title: Self-Hosting Overview
description: What running your own Onetime Secret instance involves, which authentication mode to pick first, and where the installation and operator instructions live.
audience: operator
pageType: concept
sourceOfTruth: onetimesecret/etc/defaults/auth.defaults.yaml:6-8 (the authentication mode defaults to simple, which is Redis-only) and :36 (full mode's account database defaults to sqlite://data/auth.db — PostgreSQL is an option, not a requirement) and :32-33 (a SQLite file in a container must sit in a mounted volume directory); onetimesecret/docker/README.md:9-15 (the deployment stacks the project ships); onetimesecret/scripts/install-tests/run.sh:14-21,46-48 and onetimesecret/.github/workflows/installer.yml:47-65 (the clean-room install lanes cover Debian only); onetimesecret/etc/examples/puma.example.rb:38 and onetimesecret/Dockerfile:449 (the app binds plain HTTP and exposes one port — it never terminates TLS); onetimesecret/lib/onetime/cli/org/transfer_ownership_command.rb:14-17,19-21,23-32,66-78 (the ownership transfer command, its options and its automatic plan pass) and onetimesecret/lib/onetime/operations/org/transfer_ownership.rb:34-50,68-76,115-117 (the forced promote-then-demote ordering, the deliberate omissions, and the demotable roles); onetimesecret/apps/api/colonel/routes.txt:94 and apps/api/colonel/logic/colonel/transfer_organization_ownership.rb:44-90 (the Colonel API transfer, which needs the colonel role and the organization name as confirmation and has no dry run); the hardware sizing figures below are maintainer confirmation of 2026-08-10 and have no repo source; CLI checked at v0.26.19 — lib/onetime/cli/org/transfer_ownership_command.rb and lib/onetime/cli/memberships/add_command.rb (preview default, explicit --apply, no prompt)
---

Run your own instance and every secret, account and log line stays on
infrastructure you control. You decide how accounts are authenticated, whether
the instance is reachable from the public internet at all, and what branding the
interface carries.

## Choose an authentication mode first

The mode decides what else has to be running, so settle it before you install.

`simple` is the shipped default and needs only the Valkey/Redis datastore.
`full` adds a SQL database for accounts, which defaults to SQLite at
`sqlite://data/auth.db`; PostgreSQL is a supported option rather than a
requirement. In a container that file needs a mounted volume to survive a
restart.

[Simple or Full](/en/self-hosting/simple-or-full-auth) covers what each mode
unlocks, where that database has to live, and how hard the mode is to switch
later.

## Pick an installation path

In a hurry, with a Valkey or Redis you already run? The single `docker run`
form in [Install with Docker](/en/install/docker#running-a-single-container)
brings up an instance on port 3000 with a󠄁 generated `SECRET` v󠄁a󠄁l󠄁u󠄁e. Everything else
on this page still applies once it is up.

- [Images and variants](/en/install/images-and-variants) — which of the
  published images to run, and how the release tags work.
- [Install with Docker](/en/install/docker) — the two Compose stacks the project
  ships.
- [Install on Linux](/en/install/linux) — a bare-metal install on Debian or
  Ubuntu. No other distribution family is covered by the project's install
  tests.
- [Run as a service](/en/install/run-as-a-service) — the systemd units the
  repository ships, and the Procfile runner for hosts without systemd.
- [Reverse proxy and TLS](/en/install/reverse-proxy-and-tls) — the application
  never terminates TLS, so a proxy in front of it is assumed. Read this before
  you expose the instance.
- [Verify your install](/en/install/verify) — prove the instance is genuinely
  serving before you hand it to anyone, and
  [create the first account](/en/install/verify#create-the-first-account):
  the site-operator role is granted from the CLI only.

Upgrading an existing install? The [Upgrade Guides](/en/self-hosting/upgrade-guides)
list the available guides, newest first. Start with the first guide after the
release you run now and work forward, and read the release notes for every
intervening release.

## C󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁e󠄁 t󠄁h󠄁e󠄁 i󠄁n󠄁s󠄁t󠄁a󠄁n󠄁c󠄁e󠄁

T󠄁h󠄁e󠄁 [C󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 r󠄁e󠄁f󠄁e󠄁r󠄁e󠄁n󠄁c󠄁e󠄁](/en/self-hosting/configuration) d󠄁esc󠄁r󠄁i󠄁b󠄁e󠄁s󠄁 t󠄁h󠄁e co󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 f󠄁i󠄁l󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 t󠄁h󠄁e󠄁i󠄁r󠄁 m󠄁a󠄁i󠄁n󠄁 s󠄁e󠄁c󠄁t󠄁i󠄁o󠄁n󠄁s󠄁.󠄁 T󠄁h󠄁e󠄁 [C󠄁o󠄁n󠄁f󠄁i󠄁g󠄁u󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 g󠄁e󠄁n󠄁e󠄁r󠄁a󠄁t󠄁o󠄁r󠄁](/en/self-hosting/configuration-generator) b󠄁u󠄁i󠄁l󠄁d󠄁s󠄁 s󠄁t󠄁a󠄁r󠄁t󠄁i󠄁n󠄁g󠄁 f󠄁i󠄁l󠄁e󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 a󠄁 f󠄁e󠄁w󠄁 c󠄁h󠄁o󠄁i󠄁c󠄁e󠄁s󠄁 a󠄁b󠄁o󠄁u󠄁t󠄁 y󠄁o󠄁u󠄁r󠄁 d󠄁e󠄁p󠄁l󠄁o󠄁y󠄁m󠄁e󠄁n󠄁t󠄁,󠄁 a󠄁n󠄁d󠄁 [E󠄁n󠄁v󠄁i󠄁r󠄁o󠄁n󠄁m󠄁e󠄁n󠄁t󠄁 v󠄁a󠄁r󠄁i󠄁a󠄁b󠄁l󠄁e󠄁s󠄁](/en/reference/environment-variables) l󠄁i󠄁s󠄁ts󠄁 e󠄁v󠄁e󠄁r󠄁y󠄁 v󠄁a󠄁r󠄁i󠄁a󠄁b󠄁l󠄁e󠄁,󠄁 g󠄁r󠄁o󠄁u󠄁p󠄁e󠄁d󠄁 b󠄁y󠄁 s󠄁u󠄁b󠄁s󠄁y󠄁s󠄁t󠄁e󠄁m󠄁.󠄁

## System requirements

Recommended for an instance running authentication mode `simple`:

- 2+ CPU cores
- 2GB+ RAM
- 10GB+ disk space

A full-mode deployment that also runs PostgreSQL, the background worker and the
scheduler needs roughly double that.

## Operator-only actions

Some administrative work has no screen in the application and is done from the
instance's command line.

Transferring an organization to a new owner is the main one. O󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁
o󠄁w󠄁n󠄁ers󠄁 h󠄁a󠄁v󠄁e no s󠄁c󠄁r󠄁e󠄁e󠄁n󠄁 o󠄁r󠄁 endpoint for it, so the transfer is yours to perform.󠄁
F󠄁o󠄁r󠄁 a󠄁u󠄁t󠄁o󠄁m󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 t󠄁h󠄁e󠄁 C󠄁o󠄁l󠄁o󠄁n󠄁e󠄁l󠄁 A󠄁P󠄁I󠄁 e󠄁x󠄁p󠄁o󠄁s󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 s󠄁a󠄁m󠄁e󠄁
o󠄁p󠄁e󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 a󠄁t󠄁 `POST /api/colonel/organizations/:org_id/transfer-ownership`;󠄁 i󠄁t󠄁
r󠄁e󠄁q󠄁u󠄁i󠄁r󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 c󠄁o󠄁l󠄁o󠄁n󠄁e󠄁l󠄁 r󠄁o󠄁l󠄁e󠄁,󠄁 t󠄁a󠄁k󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁'󠄁s󠄁 n󠄁a󠄁m󠄁e󠄁 a󠄁s󠄁 c󠄁o󠄁n󠄁f󠄁i󠄁r󠄁m󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 a󠄁n󠄁d󠄁
a󠄁p󠄁p󠄁l󠄁i󠄁e󠄁s󠄁 i󠄁m󠄁m󠄁e󠄁d󠄁i󠄁a󠄁t󠄁e󠄁l󠄁y󠄁 w󠄁i󠄁t󠄁h󠄁 n󠄁o󠄁 p󠄁r󠄁e󠄁v󠄁i󠄁e󠄁w󠄁.

M󠄁e󠄁m󠄁b󠄁e󠄁r󠄁s󠄁h󠄁i󠄁p󠄁 p󠄁r󠄁e󠄁c󠄁o󠄁n󠄁d󠄁i󠄁t󠄁i󠄁o󠄁n󠄁s󠄁,󠄁 t󠄁h󠄁e󠄁 w󠄁r󠄁i󠄁t󠄁e󠄁 g󠄁a󠄁t󠄁e󠄁,󠄁 p󠄁o󠄁s󠄁t󠄁c󠄁h󠄁e󠄁c󠄁k󠄁s󠄁 a󠄁n󠄁d󠄁 r󠄁e󠄁c󠄁o󠄁v󠄁e󠄁r󠄁y󠄁 l󠄁i󠄁m󠄁i󠄁t󠄁s󠄁:󠄁
[t󠄁h󠄁e󠄁 o󠄁p󠄁e󠄁r󠄁a󠄁t󠄁o󠄁r󠄁 t󠄁r󠄁a󠄁n󠄁s󠄁f󠄁e󠄁r󠄁 p󠄁r󠄁o󠄁c󠄁e󠄁d󠄁u󠄁r󠄁e󠄁](/en/operate/ownership-transfer).󠄁

The end-user side of this is
[Ownership and transfer](/en/organizations/ownership-and-transfer), which is what
your users will have read before they ask you.

## Getting help

- [The GitHub repository](https://github.com/onetimesecret/onetimesecret) for
  the source, the release notes and the shipped Compose stacks.
- [The issue tracker](https://github.com/onetimesecret/onetimesecret/issues)
  for bugs, with the release tag and the relevant log lines.
- [Contact us](https://onetimesecret.com/feedback) directly for anything else.
