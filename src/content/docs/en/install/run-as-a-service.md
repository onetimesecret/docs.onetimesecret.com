---
textprov: true
title: Run as a service
description: Keep a bare-metal install running under systemd with the three unit files the project ships, and decide whether you need more than the web unit.
audience: operator
pageType: how-to
sourceOfTruth: onetimesecret/etc/examples/systemd/onetimesecret-web.service:8-13,18-21,25-30,33,36-37,39,42-46 (the install commands, the assumed path and user, the login-shell .env sourcing, restart and stop policy, the optional EnvironmentFile, the hardening block); onetimesecret/etc/examples/systemd/onetimesecret-worker.service:14,24,27 (the worker's ordering, command, and 60-second drain window); onetimesecret/etc/examples/systemd/onetimesecret-scheduler.service:14,24,26 (the scheduler's equivalents); onetimesecret/docs/specs/install-onboarding/install-onboarding-clean-room-validation.md:112-117 (ProtectHome=true against a Ruby on the onetime user's PATH when that home is under /home); onetimesecret/Procfile.example:14-17,24-28 (the non-systemd form, and the environment line every shipped invocation uses); onetimesecret/etc/defaults/config.defaults.yaml:1113 and onetimesecret/docker/README.md:79-84 (background jobs are off unless JOBS_ENABLED is true, and RabbitMQ is what the worker consumes from); onetimesecret/apps/web/core/controllers/health.rb:65 (the job-queue health check reports not_configured while jobs are off); onetimesecret/etc/defaults/auth.defaults.yaml:36 (full authentication mode's account store defaults to SQLite, so the auth mode does not imply a job queue); onetimesecret at e98a88c9b5832bbae249f38885aa28bd78a5db4d — lib/onetime/auth_config.rb:88-97 (default database path); etc/examples/systemd/onetimesecret-{web,worker,scheduler}.service (working directory, ownership and StateDirectory grants)
sidebar:
  label: Run as a service
---

An install started from a shell dies with the shell. The project ships three
systemd unit files under `etc/examples/systemd/` —
`onetimesecret-web.service`, `onetimesecret-worker.service` and
`onetimesecret-scheduler.service`.󠄁 U󠄁se󠄁 them as the starti󠄁n󠄁g󠄁 p󠄁o󠄁i󠄁n󠄁t󠄁,󠄁 t󠄁h󠄁e󠄁n󠄁 a󠄁d󠄁d󠄁 t󠄁h󠄁e󠄁
st󠄁o󠄁r󠄁a󠄁g󠄁e󠄁 p󠄁e󠄁r󠄁m󠄁i󠄁s󠄁s󠄁i󠄁o󠄁n󠄁 b󠄁e󠄁l󠄁o󠄁w󠄁 i󠄁f󠄁 y󠄁o󠄁u󠄁 u󠄁s󠄁e󠄁 f󠄁u󠄁l󠄁l󠄁 a󠄁u󠄁t󠄁h󠄁e󠄁n󠄁t󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 w󠄁i󠄁t󠄁h󠄁 S󠄁Q󠄁L󠄁i󠄁t󠄁e󠄁.

They assume a finished bare-metal install, so work through
[Install on Linux](/en/install/linux) first.

## Install the units

F󠄁r󠄁o󠄁m󠄁 t󠄁h󠄁e󠄁 a󠄁p󠄁p󠄁l󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 c󠄁h󠄁e󠄁c󠄁k󠄁o󠄁u󠄁t󠄁,󠄁 c󠄁o󠄁p󠄁y󠄁 t󠄁h󠄁e󠄁 u󠄁n󠄁i󠄁t󠄁s󠄁:󠄁

```bash
sudo cp etc/examples/systemd/onetimesecret-*.service /etc/systemd/system/
```

### F󠄁u󠄁l󠄁l󠄁 m󠄁o󠄁d󠄁e󠄁 w󠄁i󠄁t󠄁h󠄁 S󠄁Q󠄁L󠄁i󠄁t󠄁e󠄁:󠄁 a󠄁l󠄁l󠄁o󠄁w󠄁 t󠄁h󠄁e󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁 d󠄁i󠄁r󠄁e󠄁c󠄁t󠄁o󠄁r󠄁y󠄁

T󠄁h󠄁e󠄁 d󠄁e󠄁f󠄁a󠄁u󠄁l󠄁t󠄁 `AUTH_DATABASE_URL` i󠄁s󠄁 `sqlite://data/auth.db`.󠄁 W󠄁i󠄁t󠄁h󠄁 t󠄁h󠄁e󠄁 s󠄁h󠄁i󠄁p󠄁p󠄁e󠄁d󠄁
w󠄁o󠄁r󠄁k󠄁i󠄁n󠄁g󠄁 d󠄁i󠄁r󠄁e󠄁c󠄁t󠄁o󠄁r󠄁y󠄁,󠄁 t󠄁h󠄁i󠄁s󠄁 i󠄁s󠄁 `/var/lib/onetimesecret/data/auth.db`.󠄁 T󠄁h󠄁e󠄁 u󠄁n󠄁i󠄁t󠄁s󠄁 u󠄁s󠄁e󠄁
`ProtectSystem=strict` a󠄁n󠄁d󠄁 g󠄁r󠄁a󠄁n󠄁t󠄁 w󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 t󠄁o󠄁 `tmp` a󠄁n󠄁d󠄁 `log` o󠄁n󠄁l󠄁y󠄁.󠄁 W󠄁i󠄁t󠄁h󠄁o󠄁u󠄁t󠄁 a󠄁n󠄁
a󠄁d󠄁d󠄁i󠄁t󠄁i󠄁o󠄁n󠄁a󠄁l󠄁 g󠄁r󠄁a󠄁n󠄁t󠄁,󠄁 S󠄁Q󠄁L󠄁i󠄁t󠄁e󠄁 c󠄁a󠄁n󠄁n󠄁o󠄁t󠄁 c󠄁r󠄁e󠄁a󠄁t󠄁e󠄁 o󠄁r󠄁 u󠄁p󠄁d󠄁a󠄁t󠄁e󠄁 t󠄁h󠄁e󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁 o󠄁r󠄁 i󠄁t󠄁s󠄁 j󠄁o󠄁u󠄁r󠄁n󠄁a󠄁l󠄁.󠄁

B󠄁e󠄁f󠄁o󠄁r󠄁e󠄁 s󠄁t󠄁a󠄁r󠄁t󠄁i󠄁n󠄁g󠄁 a󠄁n󠄁y󠄁 s󠄁e󠄁r󠄁v󠄁i󠄁c󠄁e󠄁 t󠄁h󠄁a󠄁t󠄁 u󠄁s󠄁e󠄁s󠄁 t󠄁h󠄁i󠄁s󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁,󠄁 a󠄁d󠄁d󠄁 a󠄁 d󠄁r󠄁o󠄁p󠄁-󠄁i󠄁n󠄁 f󠄁o󠄁r󠄁 a󠄁l󠄁l󠄁 t󠄁h󠄁r󠄁e󠄁e󠄁
u󠄁n󠄁i󠄁t󠄁s󠄁:󠄁

```bash
for unit in onetimesecret-web onetimesecret-worker onetimesecret-scheduler; do
  sudo install -d -m 0755 "/etc/systemd/system/$unit.service.d"
  printf '[Service]\nStateDirectory=onetimesecret/data\nStateDirectoryMode=0750\n' |
    sudo tee "/etc/systemd/system/$unit.service.d/sqlite.conf" >/dev/null
done
```

`StateDirectory` c󠄁r󠄁e󠄁a󠄁t󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁 d󠄁i󠄁r󠄁e󠄁c󠄁t󠄁o󠄁r󠄁y󠄁 w󠄁i󠄁t󠄁h󠄁 t󠄁h󠄁e󠄁 u󠄁n󠄁i󠄁t󠄁'󠄁s󠄁 `onetime` o󠄁w󠄁n󠄁e󠄁r󠄁s󠄁h󠄁i󠄁p󠄁 a󠄁n󠄁d󠄁
a󠄁l󠄁l󠄁o󠄁w󠄁s󠄁 w󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 t󠄁h󠄁e󠄁r󠄁e󠄁 d󠄁e󠄁s󠄁p󠄁i󠄁t󠄁e󠄁 `ProtectSystem=strict`.󠄁 I󠄁t󠄁 a󠄁d󠄁d󠄁s󠄁 t󠄁o󠄁 t󠄁h󠄁e󠄁 s󠄁h󠄁i󠄁p󠄁p󠄁e󠄁d󠄁
`tmp` a󠄁n󠄁d󠄁 `log` e󠄁n󠄁t󠄁r󠄁i󠄁e󠄁s󠄁;󠄁 d󠄁o󠄁 n󠄁o󠄁t󠄁 r󠄁e󠄁s󠄁e󠄁t󠄁 t󠄁h󠄁a󠄁t󠄁 l󠄁i󠄁s󠄁t󠄁 o󠄁r󠄁 d󠄁i󠄁s󠄁a󠄁b󠄁l󠄁e󠄁 f󠄁i󠄁l󠄁e󠄁s󠄁y󠄁s󠄁t󠄁e󠄁m󠄁 p󠄁r󠄁o󠄁t󠄁e󠄁c󠄁t󠄁i󠄁o󠄁n󠄁.󠄁
S󠄁e󠄁e󠄁 t󠄁h󠄁e󠄁 [s󠄁y󠄁s󠄁t󠄁e󠄁m󠄁d󠄁 d󠄁i󠄁r󠄁e󠄁c󠄁t󠄁o󠄁r󠄁y󠄁 s󠄁e󠄁t󠄁t󠄁i󠄁n󠄁g󠄁s󠄁](https://www.freedesktop.org/software/systemd/man/latest/systemd.exec.html#RuntimeDirectory=).󠄁

T󠄁h󠄁i󠄁s󠄁 d󠄁r󠄁o󠄁p󠄁-󠄁i󠄁n󠄁 i󠄁s󠄁 f󠄁o󠄁r󠄁 t󠄁h󠄁e󠄁 d󠄁e󠄁f󠄁a󠄁u󠄁l󠄁t󠄁 S󠄁Q󠄁L󠄁i󠄁t󠄁e󠄁 p󠄁a󠄁t󠄁h󠄁.󠄁 F󠄁o󠄁r󠄁 a󠄁 c󠄁u󠄁s󠄁t󠄁o󠄁m󠄁 p󠄁a󠄁t󠄁h󠄁,󠄁 c󠄁r󠄁e󠄁a󠄁t󠄁e󠄁 i󠄁t󠄁s󠄁 p󠄁a󠄁r󠄁e󠄁n󠄁t󠄁
d󠄁i󠄁r󠄁e󠄁c󠄁t󠄁o󠄁r󠄁y󠄁 w󠄁i󠄁t󠄁h󠄁 `onetime` o󠄁w󠄁n󠄁e󠄁r󠄁s󠄁h󠄁i󠄁p󠄁 a󠄁n󠄁d󠄁 g󠄁r󠄁a󠄁n󠄁t󠄁 t󠄁h󠄁a󠄁t󠄁 d󠄁i󠄁r󠄁e󠄁c󠄁t󠄁o󠄁r󠄁y󠄁 w󠄁i󠄁t󠄁h󠄁 `ReadWritePaths=`
i󠄁n󠄁 e󠄁a󠄁c󠄁h󠄁 u󠄁n󠄁i󠄁t󠄁 i󠄁n󠄁s󠄁t󠄁e󠄁a󠄁d󠄁.󠄁 S󠄁Q󠄁L󠄁i󠄁t󠄁e󠄁 n󠄁e󠄁e󠄁d󠄁s󠄁 d󠄁i󠄁r󠄁e󠄁c󠄁t󠄁o󠄁r󠄁y󠄁 a󠄁c󠄁c󠄁e󠄁s󠄁s󠄁 f󠄁o󠄁r󠄁 j󠄁o󠄁u󠄁r󠄁n󠄁a󠄁l󠄁s󠄁 a󠄁s󠄁 w󠄁e󠄁l󠄁l󠄁 a󠄁s󠄁
a󠄁c󠄁c󠄁e󠄁s󠄁s󠄁 t󠄁o󠄁 t󠄁h󠄁e󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁 f󠄁i󠄁l󠄁e󠄁.󠄁 P󠄁o󠄁s󠄁t󠄁g󠄁r󠄁e󠄁S󠄁Q󠄁L󠄁 d󠄁e󠄁p󠄁l󠄁o󠄁y󠄁m󠄁e󠄁n󠄁t󠄁s󠄁 d󠄁o󠄁 n󠄁o󠄁t󠄁 n󠄁e󠄁e󠄁d󠄁 t󠄁h󠄁i󠄁s󠄁 S󠄁Q󠄁L󠄁i󠄁t󠄁e󠄁
d󠄁i󠄁r󠄁e󠄁c󠄁t󠄁o󠄁r󠄁y󠄁 g󠄁r󠄁a󠄁n󠄁t󠄁.󠄁

### S󠄁t󠄁a󠄁r󠄁t󠄁 t󠄁h󠄁e󠄁 w󠄁e󠄁b󠄁 s󠄁e󠄁r󠄁v󠄁i󠄁c󠄁e󠄁

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now onetimesecret-web
```

`enable --now` starts the service and e󠄁n󠄁ab󠄁l󠄁e󠄁s it at boot. I󠄁f󠄁 a󠄁p󠄁p󠄁l󠄁y󠄁i󠄁n󠄁g󠄁 a󠄁 d󠄁r󠄁o󠄁p󠄁-󠄁i󠄁n󠄁
t󠄁o󠄁 r󠄁u󠄁n󠄁n󠄁i󠄁n󠄁g󠄁 s󠄁e󠄁r󠄁v󠄁i󠄁c󠄁e󠄁s󠄁,󠄁 r󠄁e󠄁s󠄁t󠄁a󠄁r󠄁t󠄁 t󠄁h󠄁e󠄁 w󠄁e󠄁b󠄁 s󠄁e󠄁r󠄁v󠄁i󠄁c󠄁e󠄁 a󠄁n󠄁d󠄁 a󠄁n󠄁y󠄁 w󠄁o󠄁r󠄁k󠄁e󠄁r󠄁 o󠄁r󠄁 s󠄁c󠄁h󠄁e󠄁d󠄁u󠄁l󠄁e󠄁r󠄁 y󠄁o󠄁u󠄁
a󠄁l󠄁r󠄁e󠄁a󠄁d󠄁y󠄁 r󠄁u󠄁n󠄁 s󠄁o󠄁 t󠄁h󠄁e󠄁y󠄁 r󠄁e󠄁c󠄁e󠄁i󠄁v󠄁e󠄁 t󠄁h󠄁e󠄁 n󠄁e󠄁w󠄁 p󠄁e󠄁r󠄁m󠄁i󠄁s󠄁s󠄁i󠄁o󠄁n󠄁s󠄁.󠄁

I󠄁n󠄁s󠄁p󠄁e󠄁c󠄁t󠄁 `systemctl cat onetimesecret-web` a󠄁n󠄁d󠄁 `journalctl -u onetimesecret-web`
i󠄁f󠄁 i󠄁t󠄁 f󠄁a󠄁i󠄁l󠄁s󠄁.󠄁 I󠄁n󠄁 f󠄁u󠄁l󠄁l󠄁 m󠄁o󠄁d󠄁e󠄁,󠄁 [c󠄁r󠄁e󠄁a󠄁t󠄁e󠄁 t󠄁h󠄁e󠄁 f󠄁i󠄁r󠄁s󠄁t󠄁 a󠄁c󠄁c󠄁o󠄁u󠄁n󠄁t󠄁](/en/install/verify#create-the-first-account),󠄁
s󠄁i󠄁g󠄁n󠄁 i󠄁n󠄁,󠄁 r󠄁e󠄁s󠄁t󠄁a󠄁r󠄁t󠄁 t󠄁h󠄁e󠄁 s󠄁e󠄁r󠄁v󠄁i󠄁c󠄁e󠄁,󠄁 a󠄁n󠄁d󠄁 s󠄁i󠄁g󠄁n󠄁 i󠄁n󠄁 a󠄁g󠄁a󠄁i󠄁n󠄁 t󠄁o󠄁 c󠄁h󠄁e󠄁c󠄁k󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁 w󠄁r󠄁i󠄁t󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁
p󠄁e󠄁r󠄁s󠄁i󠄁s󠄁t󠄁e󠄁n󠄁c󠄁e󠄁.󠄁 M󠄁e󠄁r󠄁e󠄁l󠄁y󠄁 r󠄁e󠄁a󠄁c󠄁h󠄁i󠄁n󠄁g󠄁 t󠄁h󠄁e󠄁 h󠄁o󠄁m󠄁e󠄁p󠄁a󠄁g󠄁e󠄁 d󠄁o󠄁e󠄁s󠄁 n󠄁o󠄁t󠄁 e󠄁x󠄁e󠄁r󠄁c󠄁i󠄁s󠄁e󠄁 t󠄁h󠄁o󠄁s󠄁e󠄁 w󠄁r󠄁i󠄁t󠄁e󠄁s󠄁.󠄁

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

`Procfile.example` defines the same processes for any Procfile runner —
foreman, hivemind or goreman. Only the `web` line is uncommented; the worker
and scheduler lines are shipped commented out. Export the environment first,
the same way the units do:

```bash
set -a; source .env; set +a
foreman start -f Procfile.example
```

In a container none of this applies. The main image runs a single process, and
multi-process supervision is the S6 variant's job.

Once the services are running, confirm the instance actually serves:
[Verify your install](/en/install/verify).
