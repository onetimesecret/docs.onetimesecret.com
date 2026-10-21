---
title: "Simple or Full: choosing your authentication mode"
description: Which authentication mode to run, what each one changes about the services you operate, and why switching authentication off entirely is a different setting.
audience: operator
pageType: concept
sourceOfTruth: onetimesecret/etc/defaults/auth.defaults.yaml:6-8 (auth.mode accepts simple or full, ships as simple, and is read from AUTHENTICATION_MODE); onetimesecret/lib/onetime/auth_config.rb:78-85 (only full_enabled? and simple_enabled? predicates exist); onetimesecret/etc/defaults/config.defaults.yaml:281-283 (site.authentication.enabled / AUTH_ENABLED is a separate off switch, on unless set to false); onetimesecret/apps/web/auth/application.rb:19-23 (the Rodauth application at /auth skips loading unless the mode is full); onetimesecret/etc/defaults/auth.defaults.yaml:18-36 and onetimesecret/lib/onetime/auth_config.rb:60-63 (the full-mode database URL defaults to sqlite://data/auth.db); onetimesecret/etc/defaults/auth.defaults.yaml:32-33 and onetimesecret/Dockerfile:59 (a SQLite file in a container must sit in a mounted volume directory or the data is lost on restart; the application directory is /app, so the default relative path resolves to /app/data/auth.db); onetimesecret/docker/README.md:110-117 and onetimesecret/docker/compose/docker-compose.full.yml:71,104-109,234,265,272-274 (the full stack keeps the SQLite auth.db in the onetime_app_data named volume, mounted at /app/data on the app, worker-email and scheduler services); onetimesecret/docker/compose/docker-compose.simple.yml:51-53 (the simple stack has no /app/data mount); onetimesecret/docker/compose/docker-compose.simple.yml:36 and onetimesecret/docker/compose/docker-compose.full.yml:75 (each shipped stack sets AUTHENTICATION_MODE to its own name as an overridable default — ${AUTHENTICATION_MODE:-simple} and ${AUTHENTICATION_MODE:-full}); onetimesecret/etc/defaults/config.defaults.yaml:1113 and onetimesecret/docker/README.md:79-84 (JOBS_ENABLED is off unless set to the string true, and is what makes RabbitMQ necessary); onetimesecret/bin/setup:614-621,629-631 (the PostgreSQL-only schema step, and the queue-init warning in full mode); onetimesecret/docker/compose/docker-compose.full.yml:120,166 (the service versions the shipped full stack pins)
---

## Two settings, not three modes

`auth.mode` — set by the `AUTHENTICATION_MODE` environment variable — takes
`simple` or `full`, and nothing else. It ships as `simple`, and the application
carries predicates for exactly those two values.

Switching authentication off altogether is a separate setting that lives in a
different file and a different section: `site.authentication.enabled`, set by
`AUTH_ENABLED`. It is on unless you set it to `false`, and disabling it disables
API authentication along with everything else. If your instance sits behind a VPN
or a proxy that already authenticates people, that is the setting you want, and
the mode stops mattering.

## What the mode changes

Simple mode keeps accounts in the Valkey/Redis datastore your instance already
runs for secrets. It adds no service and no file.

Full mode brings up the Rodauth-based authentication application, mounted at
`/auth`, and stores accounts in a SQL database. The mode gate sits on the
application itself: it skips loading entirely unless the mode is `full`, so in
simple mode nothing it serves exists.

## The full-mode database

`AUTH_DATABASE_URL` defaults to `sqlite://data/auth.db`, and the code falls back
to that same value when the configuration is silent. PostgreSQL is a supported
target, not a requirement — the shipped full stack runs SQLite.

That database is a single file, and the default path resolves inside the
application directory — `/app/data/auth.db` in a container. It has to sit in a
mounted volume directory. Written anywhere else it lives in the container's own
writable layer, so every account it holds is gone the moment the container is
replaced. The full stack mounts the `onetime_app_data` named volume at
`/app/data` on all three services that open the file: the app, the email worker
and the scheduler. The simple stack has no `/app/data` mount at all, because
simple mode stores nothing there — which is the one thing to fix if you run full
mode on the simple stack.

If you point `AUTH_DATABASE_URL` at PostgreSQL on a bare-metal install, one step
is yours rather than the installer's: the Rodauth schema SQL has to be run
against the database as a PostgreSQL superuser. The installer prints the exact
command when it detects full mode, and says in the same breath that SQLite needs
none of it.

## RabbitMQ is a background-jobs decision, not an auth-mode one

Neither mode decides whether background jobs run. That is `JOBS_ENABLED`, which
is off unless it is set to the literal string `true`, and turning it on is what
makes a broker necessary — full mode on its own does not.
[Run as a service](/en/install/run-as-a-service) covers what the worker and the
scheduler do, and when you need to start them at all.

Expect one misleading warning on the way: in full mode the installer tries to
declare the job queues and warns, rather than fails, when RabbitMQ is not
reachable. That warning is not evidence that full mode needs the broker.

## What the project tests against

No minimum version of any backing service is declared anywhere in the project.
The shipped full stack pins Valkey 8.1 and RabbitMQ 4.2 by digest and uses SQLite
for the auth database; that is what the project builds and tests against, not a
supported floor.

## Deciding

The mode determines where accounts live, so decide it before the instance has
accounts in it. Simple mode's store is the datastore you are already operating.
Full mode's is a separate SQL database — a second store, not a second view of the
first.

The two shipped Compose stacks are named after the mode each one defaults to,
but the mode is a variable rather than a property of the stack: both files set
`AUTHENTICATION_MODE` to their own name only as a default, and setting the
variable overrides it either way. What a stack does fix is the set of services
it brings up alongside the application.

Then install. [Install with Docker](/en/install/docker) covers the two Compose
stacks, and [Install on Linux](/en/install/linux) covers a bare-metal install on
Debian or Ubuntu. On both paths the mode comes from `AUTHENTICATION_MODE` in the
environment the application boots with.
