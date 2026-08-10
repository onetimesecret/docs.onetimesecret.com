---
title: Install with Docker
description: How to bring up Onetime Secret from the Compose stacks the project ships, and what has to be set before either stack will start.
audience: operator
pageType: how-to
sourceOfTruth: onetimesecret/docker/README.md:3-5,42-48,62-75,93-108,110-126 (the Compose stacks live in the application repository, the separate docker-compose repository is archived as of v0.24, the quick start that omits VALKEY_PASSWORD, the per-stack requirement table including AUTH_SECRET and ACCOUNT_ID_SECRET, the OTS_IMAGE_TAG default, and where each stack keeps its data); onetimesecret/docker/compose/docker-compose.simple.yml:20-30,66-113 (the pinned OTS_IMAGE_TAG default, env_file ../../.env, the fail-fast SECRET and VALKEY_PASSWORD interpolation, Valkey exposed only to the Compose network, AOF persistence into a named volume); onetimesecret/docker/compose/docker-compose.full.yml:44-46,60-89,100-109,193-265,272-283 (Caddy publishes 80 and 443, RACK_ENV defaults to production, the empty-default AUTH_SECRET and ACCOUNT_ID_SECRET next to the fail-fast SECRET, VALKEY_PASSWORD, RABBITMQ_USER and RABBITMQ_PASS, JOBS_ENABLED defaulting to false, /app/data shared by app, worker-email and scheduler, and the email.message.send queue the worker consumes); onetimesecret/docker-compose.yml:25-27 (the root file is an include wrapper defaulting to the simple stack); onetimesecret/apps/web/auth/config/base.rb:12,22-27 (AUTH_SECRET backs the HMAC secret guard, ACCOUNT_ID_SECRET of at least 32 bytes is required in production and boot raises without it, an unset RACK_ENV fails closed to production, and the two are independent); onetimesecret/scripts/install-tests/seed-compose-env.sh:8-13,31-45 (the six values CI exports for a full-stack up, why AUTH_SECRET and ACCOUNT_ID_SECRET are among them, and the repo-root .env written separately as the env_file target); onetimesecret/.github/workflows/compose-smoke.yml:71-79 (Compose interpolation reads the shell and the project-directory .env, not a service's env_file, and -f docker/compose/<file> shifts the project directory); onetimesecret/scripts/check-version-pins.sh:17-21 (the compose app-image default is held in lockstep with the README quick-start pin); onetimesecret/Procfile.production:13 (set -a; source .env; set +a as the documented way to put .env into the shell); onetimesecret/README.md:22-29 with onetimesecret/.github/workflows/compose-smoke.yml:315-324,336-347 (the documented docker run form, including --add-host, and the CI lane that resolves its image tag from the README and exercises it)
sidebar:
  label: Install with Docker
  order: 2
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

The application repository's own quick start copies `.env.example` and appends
only `SECRET`. That sequence does not work — `.env.example` carries no
`VALKEY_PASSWORD` and both stacks abort on it. Run this instead:

```bash
[ -f .env ] || cp .env.example .env
echo "SECRET=$(openssl rand -hex 32)" >> .env
echo "VALKEY_PASSWORD=$(openssl rand -hex 32)" >> .env
```

For the full stack, add the four it needs on top of those:

```bash
echo "RABBITMQ_USER=ots" >> .env
echo "RABBITMQ_PASS=$(openssl rand -hex 16)" >> .env
echo "AUTH_SECRET=$(openssl rand -hex 32)" >> .env
echo "ACCOUNT_ID_SECRET=$(openssl rand -hex 32)" >> .env
```

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
and CI exercises it against the published image:

```bash
openssl rand -hex 32 > .ots_secret && chmod 600 .ots_secret

docker run -p 3000:3000 -d \
  --name onetimesecret \
  --add-host=host.docker.internal:host-gateway \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(cat .ots_secret)" \
  -e HOST=localhost:3000 \
  -e SSL=false \
  onetimesecret/onetimesecret:$OTS_VERSION
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
