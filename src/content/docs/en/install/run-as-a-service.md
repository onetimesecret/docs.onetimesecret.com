---
title: Run as a service
description: Keep a bare-metal install running under systemd with the three unit files the project ships, and decide whether you need more than the web unit.
audience: operator
pageType: how-to
sourceOfTruth: onetimesecret/etc/examples/systemd/onetimesecret-web.service:8-13,18-21,25-30,33,36-37,39,42-46 (the install commands, the assumed path and user, the login-shell .env sourcing, restart and stop policy, the optional EnvironmentFile, the hardening block); onetimesecret/etc/examples/systemd/onetimesecret-worker.service:14,24,27 (the worker's ordering, command, and 60-second drain window); onetimesecret/etc/examples/systemd/onetimesecret-scheduler.service:14,24,26 (the scheduler's equivalents); onetimesecret/docs/specs/install-onboarding/install-onboarding-clean-room-validation.md:112-117 (ProtectHome=true against a Ruby on the onetime user's PATH when that home is under /home); onetimesecret/Procfile.production:13,20-24 (the non-systemd form, and the environment line every shipped invocation uses); onetimesecret/etc/defaults/config.defaults.yaml:1113 and onetimesecret/docker/README.md:79-84 (background jobs are off unless JOBS_ENABLED is true, and RabbitMQ is what the worker consumes from); onetimesecret/apps/web/core/controllers/health.rb:65 (the job-queue health check reports not_configured while jobs are off); onetimesecret/etc/defaults/auth.defaults.yaml:36 (full authentication mode's account store defaults to SQLite, so the auth mode does not imply a job queue)
sidebar:
  label: Run as a service
  order: 4
---

An install started from a shell dies with the shell. The project ships three
systemd unit files under `etc/examples/systemd/` —
`onetimesecret-web.service`, `onetimesecret-worker.service` and
`onetimesecret-scheduler.service` — and installing them unchanged is the
shortest correct way to keep an instance running across restarts.

They assume a finished bare-metal install, so work through
[Install on Linux](/en/install/linux) first.

## Install the units

```bash
sudo cp etc/examples/systemd/onetimesecret-*.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now onetimesecret-web
```

That is the whole job for most instances. `enable --now` both starts the
service and starts it at boot.

## What the units assume

Each unit runs as the user and group `onetime`, with `WorkingDirectory` set to
`/var/lib/onetimesecret`, and expects Valkey or Redis to be up already — the
web unit orders itself `After=network.target redis-server.service
valkey.service`, hedging across both common service names. The worker and
scheduler additionally order themselves after `onetimesecret-web.service`.

The environment comes from `.env` in the working directory, sourced inside
`ExecStart` rather than through systemd's `EnvironmentFile`:

```ini
ExecStart=/bin/bash -lc 'set -a; source .env; set +a; exec bundle exec puma -C etc/puma.rb'
```

The worker and scheduler use the same form around `bin/ots worker` and
`bin/ots scheduler`.

The `-l` in `bash -lc` is load-bearing beyond `.env`. It is what puts a Ruby
installed for the `onetime` user on the service's `PATH` — but only through the
files a login shell actually reads, which are `/etc/profile` and then the first
of `~/.bash_profile`, `~/.bash_login` and `~/.profile`. `~/.bashrc` is not among
them, so a version manager initialized there is invisible here and the unit dies
with `bundle: command not found`. [Install on Linux](/en/install/linux) writes
the rbenv line into `~/.profile` for that reason; if you set Ruby up some other
way, put its initialization in one of those three files, or in an
`/etc/profile.d/` snippet that `/etc/profile` picks up.

Setting `PATH` through systemd's `Environment=` or `EnvironmentFile=` is not a
substitute. Those are applied to the process systemd starts, which here is the
login shell, and `/etc/profile` then runs and sets its own `PATH` over the top.

### If the app is not at /var/lib/onetimesecret

`WorkingDirectory` is a literal path, not a search. An install that sits in the
`onetime` user's home directory, or under `/opt`, will not be found, and
systemd fails the unit before Puma runs. Move the install to
`/var/lib/onetimesecret` rather than editing the units: it is the layout the
shipped files are written against, and it keeps all three of them correct as
delivered. If you keep the app elsewhere, change `WorkingDirectory` in all
three files and keep them identical — the web unit's own header tells you to
adjust it.

`ProtectHome=true` is a second reason to keep the shipped layout. It makes
`/home` inaccessible to the service, so an install — or a version manager —
under a user's home directory in `/home` stays unreachable even once
`WorkingDirectory` points at it. `/var/lib/onetimesecret` is not under `/home`
and is unaffected.

## When you need the worker and the scheduler

The worker and scheduler unit headers say they are required for full
authentication mode with PostgreSQL and RabbitMQ. That is wrong in both halves,
and the real rule is simpler: **background jobs are off unless you set
`JOBS_ENABLED=true`.** While jobs are off, the web process sends email
synchronously in-process, nothing publishes work for the worker to consume, and
both extra services would sit idle. RabbitMQ matters in exactly the same case —
it is the broker the worker consumes from, and nothing needs it until jobs are
on.

Authentication mode does not decide this. Full mode adds a SQL account
database, which defaults to SQLite, not a job queue; a full-mode instance with
jobs off runs on the web unit alone.

`JOBS_ENABLED` is read from the environment, so it goes wherever the units get
their environment from: `.env` in the working directory, or
`/etc/default/onetimesecret`. Set it, then enable both units:

```bash
sudo systemctl enable --now onetimesecret-worker onetimesecret-scheduler
```

While jobs are off, the health endpoint reports the job queue as
`not_configured` rather than as a failure, so an instance running on the web
unit alone does not look broken there.

## What the units already handle

All three restart `on-failure` after 5 seconds, with a start limit of five
attempts per 60 seconds so a genuinely broken instance stops flapping and stays
down where you can see it. Stop timeouts differ deliberately: 30 seconds for
the web and scheduler units, 60 seconds for the worker so in-flight jobs can
drain before it is killed.

Each unit runs with `NoNewPrivileges=true`, `ProtectSystem=strict`,
`ProtectHome=true` and `PrivateTmp=true`, and declares
`StateDirectory=onetimesecret/tmp onetimesecret/log`. Under
`ProtectSystem=strict` the filesystem is read-only apart from what the unit is
granted, so any additional path the app has to write to needs granting
deliberately.

`EnvironmentFile=-/etc/default/onetimesecret` is present in all three units and
optional — the leading `-` means the service starts whether or not that file
exists. It is a second, additive source of environment variables, for values
you would rather keep outside the app directory or vary between hosts.

## Without systemd

`Procfile.production` defines the same processes for any Procfile runner —
foreman, hivemind or goreman. Only the `web` line is uncommented; the worker
and scheduler lines are shipped commented out. Export the environment first,
the same way the units do:

```bash
set -a; source .env; set +a
foreman start -f Procfile.production
```

In a container none of this applies. The main image runs a single process, and
multi-process supervision is the S6 variant's job.

Once the services are running, confirm the instance actually serves:
[Verify your install](/en/install/verify).
