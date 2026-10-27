---
textprov: true
title: Install with Docker
description: How to bring up Onetime Secret from the Compose stacks the project ships, and what has to be set before either stack will start.
audience: operator
pageType: how-to
sourceOfTruth: onetimesecret/docker/README.md:3-5,42-48,62-75,93-108,110-126 (the Compose stacks live in the application repository, the separate docker-compose repository is archived as of v0.24, the quick start that omits VALKEY_PASSWORD, the per-stack requirement table including AUTH_SECRET and ACCOUNT_ID_SECRET, the OTS_IMAGE_TAG default, and where each stack keeps its data); onetimesecret/docker/compose/docker-compose.simple.yml:20-30,66-113 (the pinned OTS_IMAGE_TAG default, env_file ../../.env, the fail-fast SECRET and VALKEY_PASSWORD interpolation, Valkey exposed only to the Compose network, AOF persistence into a named volume); onetimesecret/docker/compose/docker-compose.full.yml:44-46,60-89,100-109,193-265,272-283 (Caddy publishes 80 and 443, RACK_ENV defaults to production, the empty-default AUTH_SECRET and ACCOUNT_ID_SECRET next to the fail-fast SECRET, VALKEY_PASSWORD, RABBITMQ_USER and RABBITMQ_PASS, JOBS_ENABLED defaulting to false, /app/data shared by app, worker-email and scheduler, and the email.message.send queue the worker consumes); onetimesecret/docker-compose.yml:25-27 (the root file is an include wrapper defaulting to the simple stack); onetimesecret/apps/web/auth/config/base.rb:12,22-27 (AUTH_SECRET backs the HMAC secret guard, ACCOUNT_ID_SECRET of at least 32 bytes is required in production and boot raises without it, an unset RACK_ENV fails closed to production, and the two are independent); onetimesecret/scripts/install-tests/seed-compose-env.sh:8-13,31-45 (the six values CI exports for a full-stack up, why AUTH_SECRET and ACCOUNT_ID_SECRET are among them, and the repo-root .env written separately as the env_file target); onetimesecret/.github/workflows/compose-smoke.yml:71-79 (Compose interpolation reads the shell and the project-directory .env, not a service's env_file, and -f docker/compose/<file> shifts the project directory); onetimesecret/scripts/check-version-pins.sh:17-21 (the compose app-image default is held in lockstep with the README quick-start pin); onetimesecret/Procfile.example:14-17 (set -a; source .env; set +a as the documented way to put .env into the shell); onetimesecret/README.md:22-29 with onetimesecret/.github/workflows/compose-smoke.yml:315-324,336-347 (the documented docker run form, including --add-host, and the CI lane that resolves its image tag from the README and exercises it); onetimesecret/.env.example:17,23 (blank SECRET and ACCOUNT_ID_SECRET assignments); onetimesecret/docker/compose/docker-compose.full.yml:76 and etc/defaults/auth.defaults.yaml:189 (optional ARGON2_SECRET password pepper)
sidebar:
  label: Install with Docker
---

Onetime Secret ships two Docker Compose stacks, and both live in the application
repository alongside the code they deploy. The separate
`onetimesecret/docker-compose` repository is archived as of v0.24 — anything you
find there is older than what is described here, so do not clone it.

## Pick a release

Choose a release from
[the releases page](https://github.com/onetimesecret/onetimesecret/releases) and
set it once in your shell:

```bash
export OTS_VERSION=vX.Y.Z          # a release tag from the link above
export OTS_IMAGE_TAG=$OTS_VERSION  # what the Compose files read
```

The Compose files read `OTS_IMAGE_TAG` and already default to a pinned release,
so skipping this still gives you a reproducible stack. For which image to run,
what the variants are and why the tag you pin matters, see
[Images and variants](/en/install/images-and-variants).

## Get the repository

The stacks are files in that repository, so you need a checkout of it. Use the
release you just picked, so the Compose files and the image they start come from
the same one:

```bash
git clone https://github.com/onetimesecret/onetimesecret.git
cd onetimesecret
git checkout "$OTS_VERSION"
```

Every command below runs from that directory. The Compose files carry their own
pinned default image tag, which is not necessarily the release you just checked
out; exporting `OTS_IMAGE_TAG=$OTS_VERSION` above is what makes the two agree.

## The two stacks

The **simple** stack is the application plus Valkey — two containers, one
published port, everything persisted in Valkey. The **full** stack adds a Caddy
TLS proxy in front, RabbitMQ, an email worker and a scheduler.

The root `docker-compose.yml` is an include wrapper and includes the simple
stack. Switch by editing that include, or skip the wrapper and point Compose at
a stack file directly. The two routes are not equivalent — the second one moves
the Compose project directory, which changes where your settings come from. Both
are spelled out below. These are not Compose profiles; there is no `--profile`
flag involved.

## What must be set before either stack starts

`SECRET` and `VALKEY_PASSWORD` have no defaults. Both are interpolated with
Compose's `:?` form, so `docker compose up` aborts with an error rather than
starting a half-configured instance. `SECRET` is the root secret and the HKDF
input for the derived keys, so back it up. The full stack additionally requires
`RABBITMQ_USER` and `RABBITMQ_PASS`, also with no defaults, on the application,
both workers and the broker.

The full stack needs two more that Compose will not stop you on. `AUTH_SECRET`
and `ACCOUNT_ID_SECRET` are interpolated with an empty default instead of the
fail-fast form, so Compose starts the containers happily and the application
then dies at boot, with nothing at the Compose level to explain it. The full
stack runs with `RACK_ENV` set to production, and an unset `RACK_ENV` falls back
to production as well; in production the authentication layer refuses to boot
without both, and `ACCOUNT_ID_SECRET` must be at least 32 bytes. They are
independent secrets — neither is derived from `SECRET`, neither can be
regenerated from it, and rotating one does not invalidate the other. Back them
up alongside `SECRET`.

F󠄁o󠄁r󠄁 a󠄁 n󠄁ew󠄁 i󠄁n󠄁s󠄁t󠄁allation,󠄁 copy󠄁 t󠄁h󠄁e󠄁 t󠄁e󠄁m󠄁p󠄁l󠄁a󠄁t󠄁e󠄁 o󠄁n󠄁l󠄁y󠄁 if `.env` does not a󠄁l󠄁re󠄁a󠄁d󠄁y󠄁
e󠄁x󠄁i󠄁s󠄁t󠄁,󠄁 t󠄁h󠄁en r󠄁es󠄁t󠄁ric󠄁t acc󠄁e󠄁ss󠄁 to it:

```bash
(umask 077; test -e .env || cp .env.example .env)
chmod 600 .env
```

O󠄁p󠄁e󠄁n󠄁 `.env` i󠄁n󠄁 y󠄁o󠄁u󠄁r ed󠄁i󠄁t󠄁o󠄁r󠄁.󠄁 T󠄁h󠄁e󠄁 t󠄁e󠄁m󠄁pl󠄁a󠄁t󠄁e󠄁 a󠄁l󠄁r󠄁e󠄁a󠄁d󠄁y󠄁 c󠄁o󠄁n󠄁t󠄁a󠄁i󠄁n󠄁s󠄁 b󠄁l󠄁a󠄁n󠄁k󠄁 a󠄁s󠄁s󠄁i󠄁g󠄁n󠄁m󠄁e󠄁n󠄁t󠄁s󠄁 s󠄁u󠄁c󠄁h󠄁
a󠄁s󠄁 `SECRET=` and `ACCOUNT_ID_SECRET=`;󠄁 f󠄁i󠄁l󠄁l󠄁 t󠄁h󠄁o󠄁s󠄁e󠄁 l󠄁i󠄁n󠄁e󠄁s󠄁 r󠄁a󠄁t󠄁h󠄁e󠄁r󠄁 t󠄁h󠄁a󠄁n󠄁 a󠄁p󠄁p󠄁end󠄁i󠄁n󠄁g󠄁
d󠄁u󠄁p󠄁l󠄁i󠄁c󠄁a󠄁t󠄁e󠄁 k󠄁e󠄁y󠄁s󠄁.󠄁 A󠄁d󠄁d󠄁 `VALKEY_PASSWORD` i󠄁f󠄁 i󠄁t󠄁 i󠄁s󠄁 a󠄁b󠄁s󠄁e󠄁n󠄁t󠄁.󠄁

G󠄁e󠄁n󠄁e󠄁r󠄁a󠄁t󠄁e󠄁 a󠄁 s󠄁e󠄁p󠄁a󠄁r󠄁a󠄁t󠄁e󠄁 va󠄁l󠄁u󠄁e󠄁 f󠄁o󠄁r󠄁 e󠄁a󠄁c󠄁h󠄁 m󠄁i󠄁s󠄁s󠄁i󠄁n󠄁g󠄁 o󠄁r󠄁 b󠄁l󠄁a󠄁n󠄁k󠄁 s󠄁ecr󠄁e󠄁t󠄁 w󠄁i󠄁t󠄁h󠄁:󠄁

```bash
openssl rand -hex 32
```

F󠄁o󠄁r󠄁 t󠄁h󠄁e󠄁 s󠄁i󠄁m󠄁p󠄁l󠄁e󠄁 s󠄁t󠄁a󠄁c󠄁k󠄁,󠄁 s󠄁e󠄁t󠄁 `SECRET` a󠄁n󠄁d󠄁 `VALKEY_PASSWORD`.󠄁 F󠄁o󠄁r󠄁 t󠄁h󠄁e󠄁 f󠄁u󠄁l󠄁l󠄁 s󠄁t󠄁a󠄁c󠄁k󠄁,󠄁
a󠄁l󠄁s󠄁o󠄁 s󠄁e󠄁t󠄁 `RABBITMQ_USER` (󠄁f󠄁o󠄁r󠄁 e󠄁x󠄁a󠄁m󠄁p󠄁l󠄁e󠄁,󠄁 `ots`)󠄁,󠄁 `RABBITMQ_PASS`,󠄁 `AUTH_SECRET`,󠄁
`ACCOUNT_ID_SECRET` a󠄁n󠄁d󠄁 `ARGON2_SECRET`.󠄁 U󠄁s󠄁e󠄁 a󠄁 f󠄁r󠄁e󠄁s󠄁h󠄁 g󠄁ene󠄁r󠄁a󠄁t󠄁e󠄁d󠄁 v󠄁a󠄁l󠄁u󠄁e󠄁 f󠄁o󠄁r󠄁 e󠄁a󠄁c󠄁h󠄁
s󠄁e󠄁c󠄁r󠄁e󠄁t󠄁.󠄁 S󠄁e󠄁t󠄁 `ARGON2_SECRET` b󠄁e󠄁f󠄁o󠄁r󠄁e󠄁 c󠄁r󠄁e󠄁a󠄁t󠄁i󠄁n󠄁g󠄁 p󠄁a󠄁ssword󠄁s󠄁 a󠄁n󠄁d󠄁 k󠄁e󠄁e󠄁p󠄁 i󠄁t󠄁:󠄁 c󠄁h󠄁a󠄁n󠄁g󠄁i󠄁n󠄁g󠄁 i󠄁t󠄁
p󠄁r󠄁e󠄁v󠄁e󠄁n󠄁t󠄁s󠄁 e󠄁x󠄁i󠄁s󠄁t󠄁i󠄁n󠄁g󠄁 p󠄁a󠄁s󠄁s󠄁w󠄁o󠄁r󠄁d󠄁s󠄁 f󠄁r󠄁o󠄁m󠄁 v󠄁e󠄁r󠄁i󠄁f󠄁y󠄁i󠄁n󠄁g󠄁.󠄁 S󠄁e󠄁e󠄁
[S󠄁e󠄁c󠄁r󠄁e󠄁t󠄁s󠄁 a󠄁n󠄁d󠄁 k󠄁e󠄁y󠄁s󠄁](/en/configure/secrets-and-keys).󠄁

B󠄁e󠄁f󠄁o󠄁r󠄁e󠄁 s󠄁t󠄁a󠄁r󠄁t󠄁i󠄁n󠄁g󠄁,󠄁 c󠄁hec󠄁k󠄁 t󠄁h󠄁a󠄁t󠄁 e󠄁a󠄁c󠄁h󠄁 r󠄁e󠄁q󠄁u󠄁i󠄁r󠄁e󠄁d󠄁 k󠄁e󠄁y󠄁 h󠄁a󠄁s󠄁 e󠄁xa󠄁c󠄁t󠄁l󠄁y󠄁 o󠄁n󠄁e󠄁 a󠄁s󠄁s󠄁i󠄁g󠄁n󠄁m󠄁e󠄁n󠄁t󠄁 a󠄁n󠄁d󠄁 a󠄁
n󠄁o󠄁n󠄁-󠄁e󠄁m󠄁p󠄁t󠄁y󠄁 v󠄁a󠄁l󠄁u󠄁e󠄁.󠄁 K󠄁e󠄁e󠄁p󠄁 `.env` o󠄁u󠄁t󠄁 o󠄁f󠄁 v󠄁e󠄁r󠄁s󠄁i󠄁o󠄁n󠄁 c󠄁o󠄁n󠄁t󠄁r󠄁o󠄁l󠄁 a󠄁n󠄁d󠄁 b󠄁a󠄁c󠄁k󠄁 i󠄁t󠄁 u󠄁p󠄁 s󠄁e󠄁c󠄁u󠄁r󠄁e󠄁l󠄁y󠄁.󠄁

:::caution[Ex󠄁i󠄁s󠄁t󠄁i󠄁n󠄁g󠄁 i󠄁n󠄁s󠄁t󠄁a󠄁l󠄁l󠄁a󠄁t󠄁i󠄁o󠄁n󠄁s󠄁]
P󠄁r󠄁e󠄁s󠄁e󠄁r󠄁v󠄁e󠄁 e󠄁very p󠄁o󠄁p󠄁u󠄁la󠄁t󠄁e󠄁d󠄁 v󠄁a󠄁l󠄁u󠄁e󠄁.󠄁 D󠄁o󠄁 n󠄁o󠄁t󠄁 r󠄁u󠄁n󠄁 k󠄁e󠄁y󠄁 g󠄁e󠄁ner󠄁at󠄁i󠄁o󠄁n󠄁 a󠄁s󠄁 a󠄁 s󠄁t󠄁a󠄁r󠄁t󠄁u󠄁p󠄁 s󠄁t󠄁e󠄁p󠄁 o󠄁r󠄁
r󠄁e󠄁p󠄁l󠄁a󠄁c󠄁e󠄁 a󠄁 v󠄁a󠄁l󠄁u󠄁e󠄁 m󠄁e󠄁r󠄁e󠄁l󠄁y󠄁 be󠄁c󠄁a󠄁u󠄁s󠄁e󠄁 y󠄁ou are r󠄁e󠄁p󠄁e󠄁a󠄁t󠄁i󠄁n󠄁g󠄁 these instr󠄁u󠄁c󠄁t󠄁i󠄁o󠄁n󠄁s󠄁.󠄁 I󠄁f󠄁 a󠄁 k󠄁e󠄁y󠄁
u󠄁s󠄁e󠄁d󠄁 b󠄁y󠄁 an existing installation is missin󠄁g o󠄁r󠄁 b󠄁l󠄁a󠄁nk, restore i󠄁t󠄁 f󠄁r󠄁o󠄁m󠄁 b󠄁a󠄁c󠄁k󠄁u󠄁p󠄁.󠄁
G󠄁e󠄁n󠄁e󠄁r󠄁a󠄁t󠄁i󠄁n󠄁g󠄁 a󠄁 r󠄁e󠄁p󠄁l󠄁a󠄁c󠄁e󠄁m󠄁e󠄁n󠄁t󠄁 do󠄁e󠄁s n󠄁o󠄁t󠄁 r󠄁eco󠄁v󠄁e󠄁r encrypted data󠄁,󠄁 sessions or pass󠄁w󠄁or󠄁ds.
:::

Both stacks declare `env_file: ../../.env`, so a repository-root `.env` has to
exist even when you supply every value through the shell. There is a second trap
in the same area. Compose fills `${...}` from the shell environment and from the
`.env` sitting in the project directory — never from a service's `env_file`,
which only feeds the container at runtime. Pointing Compose at
`-f docker/compose/<stack>.yml` moves the project directory to
`docker/compose/`, so the repository-root `.env` stops feeding interpolation and
every interpolated value has to reach Compose through the shell instead. That is
`SECRET` and `VALKEY_PASSWORD` for the simple stack, and those plus
`RABBITMQ_USER`, `RABBITMQ_PASS`, `AUTH_SECRET` and `ACCOUNT_ID_SECRET` for the
full one — the same six the project's own CI exports before it brings the full
stack up.

Neither stack sets `HOST` or `SSL` in its `environment:` block, so unlike the
values above, those two reach the application only through `.env`. What they
control, and how getting `SSL` wrong silently breaks sessions, is in
[Reverse proxy and TLS](/en/install/reverse-proxy-and-tls).

## Bringing it up

Simple stack, from the repository root:

```bash
docker compose up -d --wait
```

Full stack through the wrapper: edit the `include:` in `docker-compose.yml` to
point at `docker/compose/docker-compose.full.yml`, then run the same command.
The project directory stays at the repository root, so the `.env` you just wrote
feeds interpolation as well as the containers.

Full stack without editing the wrapper: put `.env` into the shell first, so
nothing depends on where the project directory landed.

```bash
set -a; . ./.env; set +a
docker compose -f docker/compose/docker-compose.full.yml up -d --wait
```

## Ports

The simple stack publishes one port, `3000:3000`. Valkey is `expose`-only and is
not reachable from the host at all; debug it from inside the network with
`docker compose exec maindb valkey-cli`, which already has `REDISCLI_AUTH` set.

The full stack publishes only Caddy's `80` and `443`. The application, Valkey
and RabbitMQ are all `expose`-only on the internal `onetime-network` bridge.

## Volumes

Valkey data — stored secrets and sessions — lives in the `onetime_maindb_data`
named volume in both stacks. The shipped Valkey command turns AOF persistence on
with `appendfsync everysec`, so the ciphertext of live secrets is written to
disk. [Install on Linux](/en/install/linux) covers that durability choice and
how to change it; the Compose stacks set the same knobs as `valkey-server` flags
on the `maindb` service rather than in a config file.

The full stack keeps its account database as a SQLite file under `/app/data`, on
the `onetime_app_data` named volume mounted by the application, the email worker
and the scheduler. The simple stack has no `/app/data` mount.
[Simple or Full](/en/self-hosting/simple-or-full-auth) covers what full mode
adds and why it needs a database of its own.

If you replace the named volume with a host directory, on Linux make it writable
by the container user first — the container runs as uid 1001:

```bash
mkdir -p data && sudo chown -R 1001:1001 data
```

## The full stack's worker and scheduler

The full stack adds two services the simple stack does not have: `worker-email`,
which consumes the `email.message.send` queue on RabbitMQ, and `scheduler`. Both
read `JOBS_ENABLED`, which the Compose files default to `false`, so the full
stack works without touching it. [Run as a service](/en/install/run-as-a-service)
covers what the three processes do and what changes once jobs are on.

## Running a single container

To put the application in front of a datastore you already have, a plain
`docker run` works. The form below is the one the project's README documents,
and CI exercises it against the published image.󠄁

F󠄁o󠄁r󠄁 a󠄁 **n󠄁e󠄁w󠄁** i󠄁n󠄁s󠄁t󠄁a󠄁l󠄁l󠄁a󠄁t󠄁i󠄁o󠄁n󠄁,󠄁 c󠄁r󠄁e󠄁a󠄁t󠄁e󠄁 t󠄁h󠄁e󠄁 r󠄁o󠄁o󠄁t󠄁 k󠄁e󠄁y󠄁 o󠄁n󠄁c󠄁e󠄁.󠄁 T󠄁h󠄁e󠄁 s󠄁u󠄁b󠄁s󠄁h󠄁e󠄁l󠄁l󠄁 s󠄁e󠄁t󠄁s󠄁 p󠄁r󠄁i󠄁v󠄁a󠄁t󠄁e󠄁
p󠄁e󠄁r󠄁m󠄁i󠄁s󠄁s󠄁i󠄁o󠄁n󠄁s󠄁 a󠄁n󠄁d󠄁 r󠄁e󠄁f󠄁u󠄁s󠄁e󠄁s󠄁 t󠄁o󠄁 o󠄁v󠄁e󠄁r󠄁w󠄁r󠄁i󠄁t󠄁e󠄁 a󠄁n󠄁 e󠄁x󠄁i󠄁s󠄁t󠄁i󠄁n󠄁g󠄁 f󠄁i󠄁l󠄁e󠄁:

```bash
(umask 077; set -C; openssl rand -hex 32 > .ots_secret)
```

I󠄁f󠄁 t󠄁h󠄁e󠄁 f󠄁i󠄁l󠄁e󠄁 a󠄁l󠄁r󠄁e󠄁a󠄁d󠄁y󠄁 e󠄁x󠄁i󠄁s󠄁t󠄁s󠄁,󠄁 k󠄁e󠄁e󠄁p󠄁 i󠄁t󠄁.󠄁 B󠄁a󠄁ck󠄁 i󠄁t󠄁 u󠄁p󠄁 s󠄁e󠄁c󠄁u󠄁r󠄁e󠄁l󠄁y󠄁;󠄁 i󠄁f󠄁 i󠄁t󠄁 i󠄁s󠄁 e󠄁m󠄁p󠄁t󠄁y󠄁 o󠄁r󠄁 l󠄁o󠄁s󠄁t󠄁
a󠄁f󠄁t󠄁e󠄁r󠄁 t󠄁he󠄁 i󠄁n󠄁s󠄁t󠄁a󠄁n󠄁c󠄁e󠄁 h󠄁a󠄁s󠄁 b󠄁e󠄁e󠄁n󠄁 u󠄁s󠄁e󠄁d󠄁,󠄁 r󠄁e󠄁s󠄁t󠄁o󠄁r󠄁e󠄁 t󠄁h󠄁e󠄁 o󠄁r󠄁i󠄁g󠄁i󠄁n󠄁a󠄁l󠄁 k󠄁e󠄁y󠄁 b󠄁e󠄁f󠄁o󠄁r󠄁e󠄁 s󠄁t󠄁a󠄁r󠄁t󠄁i󠄁n󠄁g󠄁.󠄁

U󠄁s󠄁e󠄁 t󠄁h󠄁e󠄁 s󠄁a󠄁me󠄁 f󠄁i󠄁l󠄁e󠄁 e󠄁v󠄁e󠄁r󠄁y󠄁 t󠄁i󠄁m󠄁e󠄁 y󠄁ou󠄁 c󠄁r󠄁e󠄁a󠄁t󠄁e󠄁 t󠄁h󠄁e󠄁 c󠄁o󠄁n󠄁t󠄁a󠄁i󠄁n󠄁e󠄁r󠄁.󠄁 T󠄁h󠄁i󠄁s󠄁 s󠄁t󠄁a󠄁r󠄁t󠄁u󠄁p󠄁 b󠄁l󠄁o󠄁c󠄁k󠄁
r󠄁e󠄁f󠄁u󠄁s󠄁e󠄁s󠄁 a󠄁 m󠄁i󠄁s󠄁s󠄁i󠄁n󠄁g󠄁 o󠄁r󠄁 e󠄁m󠄁p󠄁t󠄁y󠄁 k󠄁e󠄁y󠄁 f󠄁i󠄁l󠄁e󠄁:󠄁

```bash
if [ -s .ots_secret ]; then
  docker run -p 3000:3000 -d \
    --name onetimesecret \
    --add-host=host.docker.internal:host-gateway \
    -e REDIS_URL=redis://host.docker.internal:6379/0 \
    -e SECRET="$(cat .ots_secret)" \
    -e HOST=localhost:3000 \
    -e SSL=false \
    onetimesecret/onetimesecret:$OTS_VERSION
else
  printf '%s\n' 'Missing or empty .ots_secret; restore the original key before starting.' >&2
  false
fi
```

`--add-host=host.docker.internal:host-gateway` is not optional on Linux. Without
it `host.docker.internal` does not resolve and the container cannot reach a
datastore running on the host. Point `REDIS_URL` at wherever your Valkey or
Redis actually listens; if that address is wrong or unreachable the application
does not come up.

Writing the secret to a file first, rather than generating it inline, is
deliberate — this is the value you have to keep.

## Confirming it came up

`docker compose up --wait` blocks until the containers report `healthy` rather
than returning as soon as they are running — a readiness signal, not merely
"running".

What it does not tell you is that the UI is serving its built assets, or that a
secret can be created and read back exactly once.
[Verify an install](/en/install/verify) checks both, and it is also where the
first account gets created. For the systemd equivalent of all of this, and for
the web, worker and scheduler process model,
[Run as a service](/en/install/run-as-a-service);
[Self-Hosting Overview](/en/self-hosting/) is the map of everything else an
operator needs.
