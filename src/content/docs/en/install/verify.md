---
title: Verify your install
description: Which post-install checks actually prove your instance works, which prove nothing, and what a failed boot looks like.
audience: operator
pageType: how-to
sourceOfTruth: onetimesecret/apps/api/v2/logic/meta.rb:34-39 (GET /api/v2/status returns a static "nominal" with no probes); onetimesecret/scripts/install-tests/proof-of-life.sh:3,9-21,26-27,33-36,60-106,110-122 (the smoke assertion every install lane runs, its base-URL argument, why the asset round-trip exists, and the opt-in POL_CREATE_ACCOUNT step); onetimesecret/apps/web/core/controllers/health.rb:12-19,23-42,102-125 (what /health and /health/advanced each check, the not_configured drop, and the SECRET verifier report); onetimesecret/lib/onetime/middleware/health_access_control.rb:29-36,107-118 (both health paths return 403 outside private/loopback ranges or HEALTH_TRUSTED_CIDR, matched on the normalized path); onetimesecret/bin/doctor:5,13-20,28 and onetimesecret/bin/setup:690-701,1105-1113 (the three health surfaces, which layer each owns, and that bin/doctor wraps bin/setup --doctor); onetimesecret/lib/onetime/cli/install_command.rb:16-42 and onetimesecret/lib/onetime/cli/status_command.rb:6-20,40-56 (bin/ots install check and the bin/ots status header and flags); onetimesecret/docker/entrypoints/healthcheck.sh:14-20,51-75 with onetimesecret/docker/compose/docker-compose.simple.yml:54-64 and onetimesecret/docker/compose/docker-compose.full.yml:112-117 (the role-aware container healthcheck and the stacks that wait on it); onetimesecret/lib/onetime/initializers/print_log_banner.rb:56,62-90 (the successful-boot banner); onetimesecret/lib/onetime/initializers/check_redis_url.rb:13-31 with onetimesecret/etc/defaults/config.defaults.yaml:884-888,896-903 (the two named datastore-URL errors, and the shipped fallback URL that carries CHANGEME when no VALKEY_URL or REDIS_URL is set); onetimesecret/lib/onetime/boot.rb:276-282 and onetimesecret/config.ru:45-50 (what an unreachable datastore does at boot); onetimesecret/lib/onetime/config.rb:961-969 and onetimesecret/etc/defaults/config.defaults.yaml:13-20 (a missing SECRET is fatal, a wrong one only warns); onetimesecret/lib/onetime/cli/customers/create_command.rb:8-10,22-35,80-89,188 with onetimesecret/docker/README.md:50-58 and onetimesecret/README.md:32-37 (the first-account command, its --role option, the generated password it prints, and the compose and bare forms)
sidebar:
  label: Verify your install
  order: 6
---

## A 200 from the status endpoint proves almost nothing

`GET /api/v2/status` is public and returns a static literal — `success: true`,
`status: "nominal"`, and the default locale — assembled with no probes of any
kind. It proves that Rack is answering. It does not touch the datastore, the
auth database, the job queue, or the frontend build.

That is not a theoretical gap. The project's own smoke assertion adds a
homepage-and-asset round-trip precisely because a `nominal` status once
accompanied an assetless UI. If you take one check away from this page, take
that one.

## Run the assertion the project runs

Every install lane — bare metal, the compose stacks, the published `docker run`
path — finishes with the same script, so running it against your instance is
running exactly what CI runs. It takes the instance's base URL as its one
argument:

```bash
scripts/install-tests/proof-of-life.sh http://127.0.0.1:3000
```

Four steps, in order:

1. `GET /api/v2/status` returns 200.
2. `GET /` returns 200 **and** a `/dist/assets/*.js` file it references also
   returns 200.
3. A secret is created, revealed once with a matching value, and the second
   reveal returns 404 — the at-most-once invariant that is the whole product.
4. Optionally (`POL_CREATE_ACCOUNT=1`) an account with an API token is created
   and an authenticated API call returns 200. The address is randomized per run,
   so this is a test account, not the one you sign in with.

Exit 0 means the instance is alive and the core loop works; any other exit code
names the assertion that failed on stderr.

If you are running a published image rather than a source checkout and do not
have the script to hand, reproduce the second step at least. It is the one that
catches a build-less boot:

```bash
curl -sS http://127.0.0.1:3000/ | grep -oE '/dist/assets/[A-Za-z0-9._-]+\.js' | head -n1
```

No output means the homepage rendered without referencing any built asset. The
UI is assetless and users will see a blank page, whatever the status endpoint
says.

## Create the first account

A fresh instance has no accounts, and the site-operator role is called `colonel`.
It is granted from the CLI only — signing up through the web form produces an
ordinary customer — so this is the step that gives you an account you can
administer the instance with.

On a Compose stack, run it inside the `app` service, which is what that service
is called in both stacks:

```bash
docker compose exec app bin/ots customers create me@example.com --role colonel
```

On a bare-metal install, run the same command from the application directory:

```bash
bin/ots customers create me@example.com --role colonel
```

Either form creates the account already verified, so it does not wait on a
confirmation email, and prints a generated password once. Save it before you
close the terminal — it is not displayed again. Add `--password` if you would
rather set one yourself.

## The two health endpoints, and where to curl them from

`GET /health` is liveness only. It returns static JSON — a fixed `status: "ok"`,
a timestamp and the version — and touches no dependency.

`GET /health/advanced` is the readiness check and the one worth polling. It
probes four things: the Valkey/Redis datastore with a `PING`, the job queue, the
auth database, and the boot-time `SECRET` verifier. It reports `status: "ok"`
only if every *configured* check is ok, and `degraded` otherwise. A check that
comes back `not_configured` is dropped before the verdict is computed, so a
simple-mode instance with no job queue and no auth database still reports `ok`
rather than being permanently degraded. Connection URLs in the payload have
their passwords masked.

**Both `/health` and `/health/*` return 403 to any client that is not on a
private or loopback address**, or inside a range you add via
`HEALTH_TRUSTED_CIDR`. The match is on the normalized path, so `/health/` and
percent-encoded spellings are gated too. Curling from the public internet gets
you an error body, not a health report — run it from the host, from inside the
container, or from a declared trusted range:

```bash
# bare metal, on the host
curl -sS http://127.0.0.1:3000/health/advanced

# compose
docker compose exec app curl -sS http://127.0.0.1:3000/health/advanced
```

## Three surfaces, one owner each

The app deliberately splits health checking three ways, and each layer refuses
to re-implement the others:

**`bin/doctor` owns the environment** — toolchain pins, seeded files, and live
connectivity to services that may be remote. Run it as an operator so it drops
the contributor tooling checks and treats a service that is down as a failure
rather than a warning:

```bash
bin/doctor --operator
```

Add `--bundle` to produce a sanitized archive for a support request; it carries
environment variable **names** only, never their values. The operator context
also warns when `public/web/dist` is missing or empty — the assetless-boot
condition, caught before a user hits it. On a bare-metal install,
`bin/ots install check` exits 0 if the environment has been initialized and 1 if
it has not.

**`/health/advanced` owns the runtime services**, and `bin/ots status` is the
CLI view of the same layer. It takes `--format json`, `--watch SECONDS` and
`--quiet`, and its header line carries the environment, the auth mode, whether
boot succeeded, and a timestamp.

**`bin/healthcheck.sh` owns container liveness** and nothing else. It parses
`/health/advanced`'s top-level status rather than repeating its checks.

## There is no `bin/ots doctor`

`bin/doctor` is a shell wrapper over `bin/setup --doctor` — one code path, two
front doors. The `bin/ots … doctor` forms are something else entirely:
per-domain data-integrity subcommands — `bin/ots org doctor`,
`memberships doctor`, `customers doctor`, `domains doctor` and
`diagnostics sentry doctor` — which inspect stored records, not your install.
Reaching for `bin/ots doctor` after an install will only tell you the command
does not exist.

## What a healthy container means

The app service in both shipped compose stacks carries an explicit healthcheck,
so `docker compose up --wait` blocks until the app is actually serving rather
than merely running. That healthcheck is role-aware: where a `puma` process is
present it curls `/health/advanced` and requires the top-level status to be
exactly `ok`, falling back to plain `/health` only when `/health/advanced` is
unreachable; where a `bin/ots` process is present it TCP-probes RabbitMQ
instead; with neither, it fails.

So a container reported `healthy` in the simple stack has already answered
`/health/advanced` with `ok`. That is a stronger signal than the status endpoint,
and it is free.

## What a good boot looks like in the log

A successful boot writes a banner line of the form
`--- ONETIME <mode> v<version> auth:<mode> billing:<bool> ---------`, followed by
tabulated System, Features, Mail and Authentication sections. Seeing the banner
with the auth mode you expect is the fastest confirmation that config loaded the
way you intended.

## What a failed datastore looks like

A **misconfigured** datastore URL fails before any connection is attempted, with
a named error. An empty URL gives:

```text
Redis/Valkey URI is not configured.
Set REDIS_URL or VALKEY_URL environment variable, or configure redis.uri in etc/config.yaml
```

A URL still carrying the placeholder gives
`Redis/Valkey URI contains placeholder 'CHANGEME'`. This one catches people out:
the shipped fallback URL, used when neither `VALKEY_URL` nor `REDIS_URL` is set
and Docker detection does not apply, itself contains `CHANGEME` — so an instance
that never got a datastore URL fails with the placeholder message rather than
with a connection error.

An **unreachable** datastore logs
`Cannot connect to the database <uri> (Redis::CannotConnectError)` and re-raises.
Under Puma the process then prints
`Application is not ready - goodnight irene` and exits **87**. The app does not
come up in a degraded state; it does not come up at all.

A **missing `SECRET`** is fatal at config load:
`Global secret cannot be nil - set SECRET env var or site.secret in config`.

A **wrong `SECRET`** is the quiet one. The boot-time verifier ships in `warn`
mode, so a mismatch logs loudly and keeps booting. What surfaces it is
`/health/advanced`, which reports
`SECRET does not match the datastore key verifier; existing secrets cannot be decrypted`
and degrades the top-level status. A `degraded` result whose datastore check is
`ok` is the signature of this condition. Setting the verifier to `enforce`
refuses the boot instead; `off` skips the check entirely.

## If it did not work

- **Compose exits before anything starts.** `SECRET` and `VALKEY_PASSWORD` have
  no defaults and both stacks abort when either is empty; the full stack also
  requires `RABBITMQ_USER` and `RABBITMQ_PASS`. See
  [Install with Docker](/en/install/docker).
- **The homepage loads but references no asset.** A bare-metal production
  install has to build the frontend itself — setup deliberately never does. See
  [Install on Linux](/en/install/linux).
- **It ran once and is not running now.** Restart policy, stop timeouts and
  service ordering are on
  [Run it as a service](/en/install/run-as-a-service).
- **Everything works but every request looks like it came from one address.**
  Forwarded headers are ignored until trusted-proxy support is switched on, and
  the switch is off by default. See
  [Reverse proxy and TLS](/en/install/reverse-proxy-and-tls).
- **`/health/advanced` returns 403.** You curled it from outside a private or
  loopback range. Run it from the host, from inside the container, or add your
  range to `HEALTH_TRUSTED_CIDR`.
