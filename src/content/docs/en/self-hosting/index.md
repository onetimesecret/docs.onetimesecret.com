---
textprov: true
title: Self-Hosting Overview
description: What running your own Onetime Secret instance involves, which authentication mode to pick first, and where the installation and operator instructions live.
audience: operator
pageType: concept
sourceOfTruth: onetimesecret/etc/defaults/auth.defaults.yaml:6-8 (the authentication mode defaults to simple, which is Redis-only) and :36 (full mode's account database defaults to sqlite://data/auth.db — PostgreSQL is an option, not a requirement) and :32-33 (a SQLite file in a container must sit in a mounted volume directory); onetimesecret/docker/README.md:9-15 (the deployment stacks the project ships); onetimesecret/scripts/install-tests/run.sh:14-21,46-48 and onetimesecret/.github/workflows/installer.yml:47-65 (the clean-room install lanes cover Debian only); onetimesecret/etc/examples/puma.example.rb:38 and onetimesecret/Dockerfile:449 (the app binds plain HTTP and exposes one port — it never terminates TLS); onetimesecret/lib/onetime/cli/org/transfer_ownership_command.rb:14-17,19-21,23-32,66-78 (the ownership transfer command, its options and its automatic plan pass) and onetimesecret/lib/onetime/operations/org/transfer_ownership.rb:34-50,68-76,115-117 (the forced promote-then-demote ordering, the deliberate omissions, and the demotable roles); onetimesecret/apps/api/colonel/routes.txt:94 and apps/api/colonel/logic/colonel/transfer_organization_ownership.rb:44-90 (the Colonel API transfer, which needs the colonel role and the organization name as confirmation and has no dry run); the hardware sizing figures below are maintainer confirmation of 2026-08-10 and have no repo source
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
U󠄁s󠄁e󠄁 t󠄁h󠄁e󠄁 c󠄁o󠄁m󠄁m󠄁a󠄁n󠄁d󠄁 b󠄁e󠄁l󠄁o󠄁w󠄁.󠄁 F󠄁o󠄁r󠄁 a󠄁u󠄁t󠄁o󠄁m󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 t󠄁h󠄁e󠄁 C󠄁o󠄁l󠄁o󠄁n󠄁e󠄁l󠄁 A󠄁P󠄁I󠄁 e󠄁x󠄁p󠄁o󠄁s󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 s󠄁a󠄁m󠄁e󠄁
o󠄁p󠄁e󠄁r󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 a󠄁t󠄁 `POST /api/colonel/organizations/:org_id/transfer-ownership`;󠄁 i󠄁t󠄁
r󠄁e󠄁q󠄁u󠄁i󠄁r󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 c󠄁o󠄁l󠄁o󠄁n󠄁e󠄁l󠄁 r󠄁o󠄁l󠄁e󠄁,󠄁 t󠄁a󠄁k󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁'󠄁s󠄁 n󠄁a󠄁m󠄁e󠄁 a󠄁s󠄁 c󠄁o󠄁n󠄁f󠄁i󠄁r󠄁m󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 a󠄁n󠄁d󠄁
a󠄁p󠄁p󠄁l󠄁i󠄁e󠄁s󠄁 i󠄁m󠄁m󠄁e󠄁d󠄁i󠄁a󠄁t󠄁e󠄁l󠄁y󠄁 w󠄁i󠄁t󠄁h󠄁 n󠄁o󠄁 p󠄁r󠄁e󠄁v󠄁i󠄁e󠄁w󠄁.

```bash
bin/ots org transfer-ownership ORG NEW_OWNER
```

`ORG` is t󠄁h󠄁e󠄁 organization'󠄁s󠄁 p󠄁u󠄁b󠄁l󠄁i󠄁c󠄁 I󠄁D󠄁 (󠄁`extid`,󠄁 t󠄁h󠄁e󠄁 I󠄁D󠄁 t󠄁h󠄁e󠄁 C󠄁L󠄁I󠄁 p󠄁r󠄁i󠄁n󠄁t󠄁s󠄁)󠄁 or i󠄁t󠄁s󠄁
i󠄁n󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 I󠄁D󠄁 (󠄁`objid`)󠄁. `NEW_OWNER` is an email address, a
customer extid, or a Rodauth account ID, and **they must already be an active
member** — the command never creates a customer, so run
`bin/ots memberships add ORG CUSTOMER` first if they are not.

Run it without `--yes` and it plans the transfer before touching anything,
printing who loses ownership, how many owner memberships would be demoted and to
what, then asking you to confirm. Answering `n` is how you preview a transfer.
The options are `--demote-to ROLE` (any membership role except `owner`, default
`admin`), `--yes` (also `-y` and `-f`), and `--json`.

The outgoing owner is demoted, not removed. The operation promotes the new owner
before demoting the old one — the sole-owner guard refuses every other ordering —
so for the length of those two writes the organization h󠄁as two owner
memberships and `bin/ots org doctor` reports check 4 (`membership_role_sync`) as
a warning. If a transfer is interrupted inside that window, re-run the t󠄁r󠄁a󠄁n󠄁s󠄁f󠄁e󠄁r󠄁
command,󠄁 n󠄁o󠄁t `org doctor`.󠄁 T󠄁h󠄁e󠄁 t󠄁r󠄁a󠄁n󠄁s󠄁f󠄁e󠄁r󠄁 is idempotent and demotes every other
owner;󠄁 `org doctor` marks that check `repairable: false` and d󠄁o󠄁e󠄁s󠄁 not fix it.

The end-user side of this is
[Ownership and transfer](/en/organizations/ownership-and-transfer), which is what
your users will have read before they ask you.

## Getting help

- [The GitHub repository](https://github.com/onetimesecret/onetimesecret) for
  the source, the release notes and the shipped Compose stacks.
- [The issue tracker](https://github.com/onetimesecret/onetimesecret/issues)
  for bugs, with the release tag and the relevant log lines.
- [Contact us](https://onetimesecret.com/feedback) directly for anything else.
