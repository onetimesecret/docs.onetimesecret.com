# Phase 3 verification ledger — install & deploy

Verified against `onetimesecret@75ce160` (2026-08-10, "Remove manual .env sourcing in bin/console"),
read fresh at HEAD. **Every line number below was re-pinned by reading the file at HEAD**; the
`6af1fe3` pins in the prep, handoff and re-verification documents are superseded wherever they
disagree. Format follows
[`ledger/secret-lifecycle.md`](../archive/documentation-audit-2026-08-phase-2/ledger/secret-lifecycle.md).

All paths are APP-relative to `/Users/d/Projects/dev/onetimesecret/onetimesecret`.

## Scope

This is the factual spine for eight pages: `UPD self-hosting/index`,
`UPD self-hosting/simple-or-full-auth`, `NEW install/images-and-variants`, `SPL install/docker`,
`SPL install/linux`, `SPL install/run-as-a-service`, `SPL install/reverse-proxy-and-tls`,
`NEW install/verify`. **Nothing may be written on those pages that is not a row here.**

**Self-hosted shipped default vs structural.** This repo carries no production config: `etc/` holds
only `defaults/` and `examples/`. Every value sourced from `etc/defaults/*.defaults.yaml`,
`.env.reference`, `.env.example` or a compose file is therefore the **self-hosted shipped default**,
and is labelled as such. Behaviour that lives in a code path rather than a config value is labelled
**STRUCTURAL** and is safe to state without qualification. Values pinned in `docker/compose/*.yml`
are a third thing — *compose-file defaults*, which an operator overrides in `.env` — and are labelled
that way, because they are not what the app itself defaults to.

**Decisions already taken (do not relitigate).** Per D-4.1 these eight pages do **not** restate
defaults inline; they link to `self-hosting/environment-variables` and `self-hosting/configuration`
and carry `sourceOfTruth`. The values in this ledger exist so the prose is *correct*, not so it can
be copied onto the page. Per D-4.2 there is no ownership-transfer page in Phase 3; rows 97–99 are the
short verified subsection `self-hosting/index` gets instead.

**Billing gate.** Untouched. No row asserts a tier, seat count, price or entitlement.

---

## A. Images and variants

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 1 | The project builds **four** images from this repo: the main single-process image, an S6 multi-process variant, an all-in-one `lite` variant, and a Caddy TLS proxy. | verified | `docker/bake.hcl:110-112` (`group "all" = main, s6, lite, caddy`); targets at `:145-159`, `:162-176`, `:179-192`, `:195-204` |
| 2 | Only **three** of the four are published by the release workflow. The Caddy proxy image is not — it is in bake group `all` but the workflow builds group `ci`. | verified | `docker/bake.hcl:114-116` (`group "ci" = main, s6, lite`); `.github/workflows/build-and-publish-oci-images.yml:261-264` (`targets: ci`) |
| 3 | Each image is pushed to **two** registries under matching names: GHCR and Docker Hub. | verified | `docker/bake.hcl:27-33` (`REGISTRY = ghcr.io/onetimesecret`, `DOCKERHUB_REPO = onetimesecret/onetimesecret`), `:85-97` (both concatenated) |
| 4 | Repository names are the base name plus a suffix: `onetimesecret` · `onetimesecret-s6` · `onetimesecret-lite` · `onetimesecret-caddy`. | verified | `docker/bake.hcl:153,170,186,198` (`tags("")`, `tags("-s6")`, `tags("-lite")`, `tags("-caddy")`) and the suffix interpolation at `:81-96` |
| 5 | **The image a reader should pick is the main one** — `onetimesecret/onetimesecret` — which is the default bake target and the one both compose stacks and the README quick start name. | verified | `docker/bake.hcl:106-108` (`group "default" = main`); `Dockerfile:353-356` ("the default build target when no `--target` is specified", `AS final`); `README.md:29`; `docker/compose/docker-compose.simple.yml:22`; `docker/compose/docker-compose.full.yml:59,194,237` |
| 6 | Immutable release tags are `vX.Y.Z`; moving tags are `latest` (a release), `next` (an `-rc` tag or a `develop` push), `edge` + the sanitized branch name (any branch push), `nightly` (the 03:00 UTC cron), `dev` (a manual dispatch with no version input). | verified | `.github/workflows/build-and-publish-oci-images.yml:148-196`; cron at `:48-50` |
| 7 | Images are built for **linux/amd64 and linux/arm64**. | verified as workflow default | `.github/workflows/build-and-publish-oci-images.yml:206-209,258` (`inputs.platforms \|\| 'linux/amd64,linux/arm64'`). Bake's own fallback is amd64-only (`docker/bake.hcl:67-69`), so a local `bake` build is single-arch unless `PLATFORMS` is set |
| 8 | The project **recommends pinning a specific `vX.Y.Z`** rather than `latest`, because pre-1.0 releases can break between minor versions. | verified | `docker/README.md:96-100`; the same wording in both stack headers (`docker-compose.simple.yml:7-11`, `docker-compose.full.yml:7-11`) |
| 9 | A CI guard fails the build if the compose files' `${OTS_IMAGE_TAG:-…}` default drifts from the README quick-start pin, and rejects a moving tag as that default. | verified | `scripts/check-version-pins.sh:16-27`; wired at `.github/workflows/build-and-publish-oci-images.yml:105-112` |
| 10 | The **main** image is single-process: Puma only, started by `bin/entrypoint.sh`, `EXPOSE 3000`, running as non-root uid/gid 1001 (`appuser`), with a baked `HEALTHCHECK`. | verified (STRUCTURAL) | `Dockerfile:356` (`AS final`), `:388-389` (uid/gid 1001), `:415-421` (`RACK_ENV=production`, `SERVER_TYPE=puma`, `BUNDLE_WITHOUT="development:test:optional"`), `:449` (`EXPOSE 3000`), `:451-452` (`HEALTHCHECK … CMD bin/healthcheck.sh`), `:455` (`USER appuser`) |
| 11 | The **S6** variant exists for multi-process supervision (web + worker + scheduler in one container) using s6-overlay 3.2.0.2. | verified | `Dockerfile:208-212` (`AS final-s6`, `ARG S6_OVERLAY_VERSION=3.2.0.2`); service definitions `docker/s6/services/{web,worker,scheduler,redis-ready,config-check}` |
| 12 | The **lite** variant bundles Redis inside the app image and is **ephemeral by design** — all data is lost when the container stops, and it stays root because `redis-server` needs write access. Not for production. | verified | `docker/variants/README.md:5-9,31`; `docker/variants/lite.dockerfile:25` (`FROM main`), `:37-38` (installs `redis-server`), `:104` (`ENV REDIS_URL=redis://localhost:6379/0`), `:110` ("Lite stays as root"), `:112` (`CMD ["/onetime.sh"]`) |
| 13 | The **Caddy** variant is a custom Caddy build carrying plugins stock `caddy:2` does not have — `caddy-ratelimit`, `caddy-security`, `transform-encoder`, and a configurable `caddy-dns/*` module. It must be built locally; the full stack builds it rather than pulling it. | verified | `docker/variants/README.md:33-79`; `docker/compose/docker-compose.full.yml:22-28` (`build:` + `dockerfile: docker/variants/caddy.dockerfile`, with the "Custom Caddy build required" comment at `:23-25`) |
| 14 | A brand pack can be baked into the image at build time (`--build-arg BRAND_PACK=<name>`) **or** selected at runtime (`BRAND_PACK` / `BRAND_ASSETS_DIR`) with no rebuild. | verified | `docker/README.md:160-167`; `Dockerfile:173` (`ARG BRAND_PACK=`), `:180-188` (overlay copy, hard failure if the pack is missing) |

### Corrections owed by A

| # | Docs currently say | HEAD says | Evidence |
|---|---|---|---|
| 15 | **CORRECTION.** `self-hosting/index.md:39` and `installation.md:37` both name image tag `v0.26.2`. | The repo's own pin is **v0.26.1** in three places kept in lockstep by a CI guard, and the newest git tag is **v0.26.4**. `v0.26.2` is neither. Because D-4.1 forbids restating values, the split pages should name **no tag at all** and link to the release list. | `README.md:29`; `docker/compose/docker-compose.simple.yml:22`; `docker/compose/docker-compose.full.yml:59`; `scripts/check-version-pins.sh:16-27`; `git tag --sort=-creatordate` → `v0.26.4` newest |
| 16 | **CORRECTION.** `installation.md:18-27` sends readers to `github.com/onetimesecret/docker-compose` and tells them to clone it. | That repository is **archived as of v0.24**. All compose configuration is maintained in the app repo. | `docker/README.md:3-5` |

---

## B. Docker run and Compose

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 17 | There are **two** deployment stacks. Simple = app + Valkey. Full = Caddy + app + Valkey + RabbitMQ + email worker + scheduler. The root `docker-compose.yml` is only an `include` wrapper and defaults to simple. | verified | `docker/README.md:9-15` (table); `docker-compose.yml:25-27` |
| 18 | Switching stacks is done by editing the `include` in the root file or by pointing Compose at a stack directly. These are **not** Compose profiles — no `--profile` flag exists. | verified | `docker/README.md:22-40` |
| 19 | The simple stack publishes **one** port: `3000:3000`. Valkey is `expose`-only and is not reachable from the host. | verified as compose-file default | `docker/compose/docker-compose.simple.yml:48-49` (app `ports`), `:99-100` (`maindb` `expose: 6379`) and the comment at `:93-98` |
| 20 | The full stack publishes **80 and 443** (Caddy) and nothing else. App, Valkey, RabbitMQ are all `expose`-only on the internal `onetime-network` bridge. | verified as compose-file default | `docker/compose/docker-compose.full.yml:44-46` (proxy ports), `:48-49` (2019 exposed only), `:100-101` (app), `:153-154` (maindb), `:180-182` (rabbitmq), `:267-270` (network) |
| 21 | **`SECRET` has no default and both stacks abort if it is empty.** | verified (STRUCTURAL — compose `:?` interpolation) | `docker/compose/docker-compose.simple.yml:34`; `docker/compose/docker-compose.full.yml:72`; app-side hard failure at `lib/onetime/config.rb:965-969` (`raise OT::ConfigError, 'Global secret cannot be nil - set SECRET env var or site.secret in config'`) |
| 22 | **`VALKEY_PASSWORD` also has no default and both stacks abort if it is empty** — it is interpolated into `VALKEY_URL` and into the datastore's `--requirepass`. | verified (STRUCTURAL) | `docker/compose/docker-compose.simple.yml:33,73,83`; `docker/compose/docker-compose.full.yml:70,126,136,205,248` |
| 23 | The full stack additionally requires **`RABBITMQ_USER` and `RABBITMQ_PASS`**, with no defaults, on the app, both workers, and the broker. | verified (STRUCTURAL) | `docker/compose/docker-compose.full.yml:85,169-170,207,250`; `docker/README.md:74` |
| 24 | Every other secret is either derived or optional: `SESSION_SECRET` and `IDENTIFIER_SECRET` are HKDF-derived from `SECRET` unless set; `AUTH_SECRET` / `ACCOUNT_ID_SECRET` / `ARGON2_SECRET` matter only in full auth mode; `FEDERATION_SECRET` only for multi-region. | verified | `docker/README.md:66-72` (table); `.env.example:79-92` (the derived / independent / federation groupings) |
| 25 | Both stacks read a **repo-root `.env`** via `env_file: ../../.env`, and that file must exist even when every value is supplied through the shell. | verified (STRUCTURAL — a Compose semantics trap) | `docker/compose/docker-compose.simple.yml:27-28`; `docker/compose/docker-compose.full.yml:64-65,201-202,244-245`; the reason spelled out at `.github/workflows/compose-smoke.yml:73-80` (interpolation reads the shell + project-dir `.env`, *not* a service's `env_file`) |
| 26 | The app service carries an explicit **healthcheck** — `bin/healthcheck.sh`, 10s interval, 10s timeout, 5 retries, 60s start period — so `docker compose up --wait` blocks until the app is actually serving. | verified as compose-file default | `docker/compose/docker-compose.simple.yml:59-64` with the rationale at `:54-58`; `docker/compose/docker-compose.full.yml:112-117` |
| 27 | The datastore is **Valkey 8.1**, digest-pinned, in both stacks. Its healthcheck is `valkey-cli ping`, authenticated via `REDISCLI_AUTH`. | verified as compose-file default | `docker/compose/docker-compose.simple.yml:67,69-73,104-109`; `docker/compose/docker-compose.full.yml:120,122-126,158-163` |
| 28 | The shipped Valkey command turns **persistence on**: AOF with `appendfsync everysec` writing `onetime.aof`, plus an effectively-disabled RDB snapshot rule (`--save 157680000 1`), into the `onetime_maindb_data` named volume. | verified as compose-file default | `docker/compose/docker-compose.simple.yml:74-87` (command), `:102-103,111-113` (volume); identical at `docker/compose/docker-compose.full.yml:127-140,156-157,275-276` |
| 29 | **Secrets are written to disk under the shipped compose defaults.** AOF persistence is on, so the ciphertext of live secrets lands in the volume. | verified (consequence of row 28) | same evidence as row 28 |
| 30 | Valkey is not published to the host in either stack and is password-protected; host-side debugging goes through `docker compose exec maindb valkey-cli`. | verified | `docker/compose/docker-compose.simple.yml:93-100`; `docker/README.md:137-154` |
| 31 | The **full** stack keeps `/app/data` (the SQLite `auth.db`) in the `onetime_app_data` named volume, shared by app, worker and scheduler. The **simple** stack has no `/app/data` mount at all. | verified | `docker/README.md:110-117`; `docker/compose/docker-compose.full.yml:103-109,232-234,263-265,273-274`; simple's explicit absence at `docker/compose/docker-compose.simple.yml:51-53` |
| 32 | If an operator swaps the named volume for a host directory, on Linux they must `chown` it to **uid 1001** first, because the container runs as that uid. | verified | `docker/README.md:119-126`; `Dockerfile:388-389`, `:439-447` (`/usr/bin/install -d -o appuser -g appuser data`, with the reason at `:440-443`) |
| 33 | Background jobs are **off by default**: with `JOBS_ENABLED` unset or `false`, the `worker-email` and `scheduler` services idle and the web process sends email synchronously in-process. The full stack works without touching it. | verified as compose-file default | `docker/README.md:79-91`; `docker/compose/docker-compose.full.yml:86-89,208,251`; config default `etc/defaults/config.defaults.yaml:1113` (`ENV['JOBS_ENABLED'] == 'true' \|\| false`); consumed at `lib/onetime/jobs/publisher.rb:437` |
| 34 | The worker service consumes exactly one queue and the queue name is the literal Sneakers queue, not an alias: `./bin/ots worker --queues email.message.send --concurrency 5 --environment production`. | verified as compose-file default | `docker/compose/docker-compose.full.yml:209-223` |
| 35 | The scheduler service runs `./bin/ots scheduler --environment production`. | verified as compose-file default | `docker/compose/docker-compose.full.yml:252-254` |
| 36 | RabbitMQ is **4.2**, digest-pinned, with vhost `/`. | verified as compose-file default | `docker/compose/docker-compose.full.yml:166,171` |
| 37 | The first admin account is created from the CLI, not the web form: `docker compose exec app bin/ots customers create me@example.com --role colonel`. | verified | `docker/README.md:53-55`; `README.md:36`; command registered at `lib/onetime/cli/customers/create_command.rb:188`, `--role` option at `:22` |
| 38 | The published README `docker run` path is CI-verified nightly, verbatim, including the `--add-host=host.docker.internal:host-gateway` flag that makes `host.docker.internal` resolve on Linux. | verified | `.github/workflows/compose-smoke.yml:302-350`; the README source at `README.md:14-30` |
| 39 | CI brings the simple stack up on every relevant PR, waits on the app healthcheck, and runs the full proof-of-life assertion including first-account creation. | verified | `.github/workflows/compose-smoke.yml:65-136` |

### Corrections owed by B

| # | Docs currently say | HEAD says | Evidence |
|---|---|---|---|
| 40 | **CORRECTION.** `installation.md:31-60` publishes a hand-written compose file with `version: '3.8'`, a `redis:bookworm` service, and `./etc:/app/etc` + `./logs:/app/logs` bind mounts. | None of this matches the shipped stacks: no `version:` key, Valkey not Redis, no `etc`/`logs` bind mounts, and the datastore is password-protected and unpublished. `install/docker` should point at the shipped compose files rather than ship a competing one. | `docker/compose/docker-compose.simple.yml` in full; `docker/README.md:9-20` |
| 41 | **CORRECTION.** `self-hosting/index.md:33-40` gives a two-command `docker run` quick start with **no** `--add-host`, no `HOST`, and no `SSL`. | On Linux `host.docker.internal` does not resolve without `--add-host=host.docker.internal:host-gateway`; the CI-verified form carries it plus `HOST` and `SSL`. | `README.md:22-29`; `.github/workflows/compose-smoke.yml:335-346` |
| 42 | **GAP, not a correction.** `docker/README.md`'s own Quick Start (`:44-48`) tells operators to `cp .env.example .env`, append `SECRET`, and `docker compose up`. | That sequence **fails**: `.env.example` contains no `VALKEY_PASSWORD`, and both stacks abort on it. CI seeds both values explicitly. `install/docker` must state both required values, or it will reproduce a quick start that does not work. | `docker/README.md:44-48` vs `.env.example` (whole file — no `VALKEY_PASSWORD`) and `docker/compose/docker-compose.simple.yml:33,73,83`; CI's workaround at `.github/workflows/compose-smoke.yml:81-90` and `scripts/install-tests/seed-compose-env.sh:31-53` |

---

## C. Manual / Linux install

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 43 | **Ruby must be an exact version, currently 3.4.10** — not "3.4 or newer". `bin/install` refuses to proceed on any other patch level, with the message `need exactly <version>`. | verified (STRUCTURAL) | `.ruby-version:1` (`3.4.10`); `Gemfile:13` (`ruby file: '.ruby-version'`); the gate at `scripts/setup/lib.sh:30-51` (`check_version_exact`), called from `bin/setup:601`; CI asserts the refusal at `scripts/install-tests/run.sh:119-142` |
| 44 | Node is checked by **major version only** — currently 22. pnpm is pinned to 11.10.0 by `packageManager`. | verified | `.node-version:1` (`22`); `scripts/setup/lib.sh:53-57` (`check_version_major`), called from `bin/setup:602`; `package.json:6` (`"packageManager": "pnpm@11.10.0"`) |
| 45 | The Debian-family system package set a bare-metal install needs is: `build-essential libssl-dev libffi-dev libyaml-dev libsqlite3-dev libpq-dev libsodium23 pkg-config git curl ca-certificates python3 procps` plus a Valkey/Redis server, Node 22 and pnpm. | verified — this is the clean-room list CI installs and nothing else | `scripts/install-tests/run.sh:50-68` ("mirrored from `docker/base.dockerfile` … no more, no less"); the build-stage counterpart at `docker/base.dockerfile:42-56`; runtime shared libraries at `Dockerfile:367-377` |
| 46 | `libsodium` is a **runtime** requirement, not a build one — `rbnacl` binds to the shared library. | verified | `Gemfile:109-116` ("Requires the libsodium shared library at runtime"); `Dockerfile:372` installs `libsodium23` in the final stage; `docker/base.dockerfile:42-56` does not install a `-dev` counterpart |
| 47 | **`bin/install` is the operator front door** for a bare-metal install. It is a thin wrapper over `bin/setup --init`, idempotent, and it reconciles instead of re-initializing when it detects an existing environment — so it never regenerates a live `SECRET`. | verified (STRUCTURAL) | `bin/install:3-9,43-47`; `bin/setup:5-18` (lane table), `:590-597` (`cmd_init` → `cmd_reconcile` when `is_initialized`) |
| 48 | What `bin/setup --init` actually does: exact-Ruby and major-Node checks → `bundle install` (frozen) → `pnpm install --frozen-lockfile` → seed `etc/*` from `etc/defaults/*` and `etc/puma.rb` from the example → `rake ots:env:setup` → `rake ots:secrets` → `chmod 600 .env` → `bin/ots install mark`. | verified | `bin/setup:599-648`; `scripts/setup/lib.sh:168-187` (`seed_configs`), `:196-213` (`install_gems`), `:219-227` (`install_node`) |
| 49 | Gem and Node installs are **frozen** — setup never rewrites `Gemfile.lock` or `pnpm-lock.yaml`. | verified (STRUCTURAL) | `scripts/setup/lib.sh:191-194` (the contract), `:204-207`, `:221-224` |
| 50 | `bin/setup` deliberately does **not** build frontend assets. A bare-metal production install must run `pnpm run build` itself. | verified (STRUCTURAL) | `bin/setup:301-308,331`; the operator-context doctor warning at `bin/setup:1105-1113` ("bare-metal production serves prebuilt assets"); the bare-metal lane runs it as a separate step at `scripts/install-tests/baremetal-boot.sh:101-107` |
| 51 | Built assets land in **`public/web/dist/`** and are served at URL prefix `/dist`. | verified (STRUCTURAL) | `vite.config.ts:241` (`base: '/dist'`), `:243` (`publicDir: 'public/web'`), `:248` (`outDir: '../public/web/dist'`); asserted at `scripts/install-tests/baremetal-boot.sh:105-106` |
| 52 | The production process invocation is **`bundle exec puma -C etc/puma.rb`**, with the environment loaded as `set -a; source .env; set +a`. | verified (STRUCTURAL) | `Procfile.production:13,20`; `bin/setup:653-655,662-663`; `etc/examples/systemd/onetimesecret-web.service:30`; the clean-room reproduction at `scripts/install-tests/baremetal-boot.sh:110-124` |
| 53 | `etc/puma.rb` is created automatically by `bin/setup` (and baked into the image); the example is usable verbatim. | verified | `scripts/setup/lib.sh:181-186`; `Dockerfile:437` (`cp --preserve --update=none etc/examples/puma.example.rb etc/puma.rb`); `Procfile.dev.example:14` |
| 54 | Puma binds **plain HTTP on `0.0.0.0:$PORT`** (default 3000) and runs cluster mode with 2 workers and 1–16 threads in production. | verified as self-hosted shipped default (the bind itself is STRUCTURAL) | `etc/examples/puma.example.rb:24-39` (`bind "tcp://0.0.0.0:#{port}"`), `:27-35` (worker/thread defaults), `:70-85` (production branch) |
| 55 | A Procfile runner is supported for bare metal: `foreman start -f Procfile.production` (or hivemind/goreman). Only the `web` line is uncommented; worker and scheduler are commented out and labelled full-auth-mode-only. | verified | `Procfile.production:15-24`; `bin/setup:669` |
| 56 | `RACK_ENV` defaults to `production` when the app is started through `config.ru`. | verified (STRUCTURAL) | `config.ru:21` |
| 57 | Clean-room install lanes cover **Debian only** — `ruby:3.4.10-slim` (baremetal), the same under an empty POSIX locale, and `ruby:3.3-slim` as an asserted-failure lane — plus macOS for the dev lane. **No RHEL-family lane exists.** | verified (absence) | `scripts/install-tests/run.sh:14-21,46-47,145-150`; `.github/workflows/installer.yml:47-64` (`matrix.lane: [baremetal, posix, ruby-old]`), `:66-72` (macOS) |
| 58 | The full-auth bare-metal path needs one manual database step that setup will not do for you: running the Rodauth schema SQL as a PostgreSQL superuser (SQLite needs nothing). | verified | `bin/setup:614-623` |

### Corrections owed by C

| # | Docs currently say | HEAD says | Evidence |
|---|---|---|---|
| 59 | **CORRECTION.** `installation.md:76-78,94-96,120-126` says "Ruby 3.4+" and instructs `rbenv install 3.4 && rbenv global 3.4`. | The gate is **exact-match**. `rbenv install 3.4` resolving to any patch other than 3.4.10 makes `bin/install` die. `install/linux` must say "the exact version in `.ruby-version`". | `scripts/setup/lib.sh:43-48`; `scripts/install-tests/run.sh:119-142` |
| 60 | **CORRECTION.** `installation.md:86` installs `build-essential git libssl-dev libreadline-dev zlib1g-dev`. | That is a `ruby-build` prerequisite list, not the app's. It **omits** `libffi-dev`, `libyaml-dev`, `libsqlite3-dev`, `libpq-dev`, `pkg-config`, `python3`, `procps`, `ca-certificates` and `libsodium23`. Bundle install fails on the missing headers; boot fails on missing libsodium. | `scripts/install-tests/run.sh:56-63` vs `installation.md:86` |
| 61 | **CORRECTION.** `installation.md:166,175` says `source .env.sh  # exports .env vars into the current shell`. | **`.env.sh` does not exist in the repo.** Every shipped invocation uses `set -a; source .env; set +a`. | absence of `.env.sh`; `Procfile.production:13`; `etc/examples/systemd/onetimesecret-web.service:30`; `bin/setup:654,662`; `.env.example:5` |
| 62 | **CORRECTION.** `installation.md:152` runs `bundle install --without development test`. | The shipped path is `BUNDLE_FROZEN=true bundle install` with no `--without`; the image sets `BUNDLE_WITHOUT="development:test:optional"` as an env var instead. Bundler 2's `--without` writes persistent local config and is not what any lane does. | `scripts/setup/lib.sh:204-207`; `Dockerfile:421` |
| 63 | **CORRECTION (redundancy, not error).** `installation.md:156` and `:172-173` tell the reader to copy `config.defaults.yaml` → `etc/config.yaml` and `puma.example.rb` → `etc/puma.rb` **after** running `bin/setup --init`. | `bin/setup --init` already does both, and so does the image build. The manual copies are dead steps that invite a reader to clobber a seeded file. | `scripts/setup/lib.sh:168-187`, invoked from `bin/setup:607`; `Dockerfile:430-437` |
| 64 | **GAP.** `installation.md` never mentions building frontend assets. | A bare-metal production install that skips `pnpm run build` boots and answers `/api/v2/status` with 200 while serving an **assetless UI**. The proof-of-life asset probe exists specifically because the status endpoint does not catch this. | `bin/setup:301-308`; `scripts/install-tests/proof-of-life.sh:10-14,75-78` |

---

## D. Run as a service

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 65 | **The repo ships three systemd unit files**, as examples: `onetimesecret-web.service`, `onetimesecret-worker.service`, `onetimesecret-scheduler.service`. | verified — this contradicts the handoff's expectation that `install/run-as-a-service` is new writing; the source material exists | `etc/examples/systemd/` (three files) |
| 66 | The documented install is `sudo cp etc/examples/systemd/onetimesecret-*.service /etc/systemd/system/` → `systemctl daemon-reload` → `systemctl enable --now …`. | verified | `etc/examples/systemd/onetimesecret-web.service:3-6`; identical blocks at `onetimesecret-worker.service:6-9` and `onetimesecret-scheduler.service:6-9` |
| 67 | The units assume: app at `/var/lib/onetimesecret`, a dedicated `onetime` user and group, Ruby on that user's PATH, `.env` sourced from the working directory, and Redis/Valkey already running. | verified | `etc/examples/systemd/onetimesecret-web.service:8-13,25-27` |
| 68 | Each unit's `ExecStart` sources `.env` through a login shell — `/bin/bash -lc 'set -a; source .env; set +a; exec …'` — rather than relying on `EnvironmentFile`. | verified (STRUCTURAL) | `onetimesecret-web.service:30`; `onetimesecret-worker.service:24`; `onetimesecret-scheduler.service:24` |
| 69 | `EnvironmentFile=-/etc/default/onetimesecret` is present but **optional** (the leading `-`), and is a second, additive source. | verified | `onetimesecret-web.service:39`; `onetimesecret-worker.service:32`; `onetimesecret-scheduler.service:31` |
| 70 | The units carry hardening: `NoNewPrivileges=true`, `ProtectSystem=strict`, `ProtectHome=true`, `PrivateTmp=true`, plus `StateDirectory=onetimesecret/tmp onetimesecret/log`. | verified | `onetimesecret-web.service:42-46` and the same block in the other two |
| 71 | Restart policy is `on-failure` with `RestartSec=5` and a start-limit of 5 attempts per 60s. Stop timeouts differ deliberately: 30s for web and scheduler, **60s for the worker**, to let in-flight jobs drain. | verified | `onetimesecret-web.service:20-21,33,36-37`; `onetimesecret-worker.service:15-16,26-30`; `onetimesecret-scheduler.service:15-16,26-29` |
| 72 | Ordering: web is `After=network.target redis-server.service valkey.service`; worker and scheduler additionally come after `onetimesecret-web.service`. | verified | `onetimesecret-web.service:18-19`; `onetimesecret-worker.service:14`; `onetimesecret-scheduler.service:14` |
| 73 | Worker and scheduler are **not needed** for a simple-mode install. | verified | `onetimesecret-worker.service:3`; `onetimesecret-scheduler.service:3`; `Procfile.production:6-10` |
| 74 | For non-systemd hosts, any Procfile runner works — foreman, hivemind, goreman. | verified | `Procfile.production:15-18` |
| 75 | In containers, process supervision is provided by the **S6 variant**, not by the main image (which runs one process). | verified | `docker/bake.hcl:162-176`; `docker/s6/services/{web,worker,scheduler}` ; `docker/variants/README.md:84` |

### Correction owed by D

| # | Docs currently say | HEAD says | Evidence |
|---|---|---|---|
| 76 | **CORRECTION (inherited from app source).** `installation.md:195-197` — and the shipped unit files themselves — describe worker and scheduler as required for "full authentication mode (PostgreSQL + RabbitMQ)". | Full auth mode requires **a SQL database, defaulting to SQLite**, not PostgreSQL; and RabbitMQ is only needed when `JOBS_ENABLED=true`. See rows 88–90. The unit comments carry the same error, so `install/run-as-a-service` must not copy them. | `etc/defaults/auth.defaults.yaml:36`; `lib/onetime/auth_config.rb:60-63`; `docker/README.md:79-84`; against `onetimesecret-worker.service:3` and `onetimesecret-scheduler.service:3` |

---

## E. Verify

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 77 | There are **three** health surfaces with one owner each: `bin/setup --doctor` (environment: pins, files, connectivity), `GET /health/advanced` and its CLI twin `bin/ots status` (runtime services), and `bin/healthcheck.sh` (container liveness only). | verified (STRUCTURAL, and stated as a contract in three places) | `bin/setup:691-700`; `lib/onetime/cli/status_command.rb:21-27`; `docker/entrypoints/healthcheck.sh:14-20` |
| 78 | `GET /health` is a **liveness** check: static JSON `{status: "ok", timestamp, version}`. It touches no dependency. | verified (STRUCTURAL) | `apps/web/core/controllers/health.rb:12-19`; route at `apps/web/core/routes.txt:11` |
| 79 | `GET /health/advanced` is the **readiness** check. It probes four things — the Valkey/Redis datastore (`PING`), the job queue, the auth database, and the boot-time `SECRET` verifier — and reports `status: "ok"` only if every *configured* check is ok, otherwise `degraded`. | verified (STRUCTURAL) | `apps/web/core/controllers/health.rb:23-42`; checks at `:46` (keydb), `:63` (jobqueue), `:102` (secret_verifier), `:127` (authdb); route at `apps/web/core/routes.txt:12` |
| 80 | Unconfigured services do not degrade the result: a check that returns `not_configured` is excluded before the verdict is computed. | verified (STRUCTURAL) | `apps/web/core/controllers/health.rb:31-33` |
| 81 | **Both `/health` and `/health/*` are restricted to private and loopback addresses** and return **403** to anyone else. An operator curling from the public internet gets 403, not a health report. Extra ranges are allowed via `HEALTH_TRUSTED_CIDR`. | verified (STRUCTURAL) | `lib/onetime/middleware/health_access_control.rb:29-36`, `:45-64`, `:107-110` (normalized-path match, so `/health/` and `%2F` spellings are gated too), `:112-118` (403 body) |
| 82 | Connection URLs in the health payload are **password-masked**. | verified | `apps/web/core/controllers/health.rb:151` (`def mask_url`) |
| 83 | `GET /api/v2/status` is **public** and returns `{success: true, status: "nominal", locale}` — a static literal. It proves the Rack app is answering and nothing more. `GET /api/v2/version` likewise returns the version. | verified (STRUCTURAL) | `apps/api/v2/logic/meta.rb:34-39` (`status: :nominal`, no probes), `:44-50`; routes at `apps/api/v2/routes.txt:42-43` |
| 84 | The project's own smoke assertion is four steps, and it is the right shape for `install/verify`: (1) `GET /api/v2/status` → 200; (2) `GET /` → 200 **and** a `/dist/assets/*.js` it references → 200; (3) create a secret, reveal it once with a matching value, confirm the second reveal is 404; (4) optionally create the first account and prove an authenticated call. | verified | `scripts/install-tests/proof-of-life.sh:9-21` (contract), `:60-64`, `:66-81`, `:83-106`, `:122-140` |
| 85 | Step 2 exists **because the status endpoint reported "nominal" while the UI was assetless** — a status 200 does not prove the install is usable. | verified | `scripts/install-tests/proof-of-life.sh:10-14` |
| 86 | The container healthcheck is role-aware: if a `puma` process is present it curls `/health/advanced` and requires top-level `status == "ok"` (falling back to `/health` only if `/health/advanced` is unreachable); if a `bin/ots` process is present it TCP-probes RabbitMQ; otherwise it fails. | verified (STRUCTURAL) | `docker/entrypoints/healthcheck.sh:51-64`, `:66-71`, `:73-75` |
| 87 | `bin/doctor` is the support front door and takes `--operator` (production checks only, a down service is a failure) and `--operator --bundle` (a sanitized archive carrying env var **names** only, never values). | verified | `bin/doctor:3-4,13-23,30`; context parsing at `bin/setup:1338-1340`; the "why `--operator` matters" note at `bin/setup:670-676` |
| 88 | `bin/ots status` is the CLI view of the runtime service layer, supports `--format json`, `--watch N` and `--quiet`, and prints a header line carrying environment, auth mode, boot success and timestamp. | verified | `lib/onetime/cli/status_command.rb:6-20`, `:41-56`, `:562` |
| 89 | Data-integrity checks are separate, per-domain `doctor` subcommands: `bin/ots org doctor`, `memberships doctor`, `customers doctor`, `domains doctor`, `diagnostics sentry doctor`. **There is no top-level `bin/ots doctor`.** | verified (including the absence) | `lib/onetime/cli/org/doctor_command.rb:41,538`; `memberships/doctor_command.rb:27,527`; `customers/doctor_command.rb:36,308`; `domains/doctor_command.rb:64,818`; `diagnostics/sentry/doctor_command.rb:244` |
| 90 | `bin/ots install check` exits 0 if the environment has been initialized and 1 if not; `bin/ots install mark` is what sets that state during init. | verified | `lib/onetime/cli/install_command.rb:16-42`; called from `bin/setup:641` |
| 91 | On a **successful boot** the app writes a banner line of the form `--- ONETIME <mode> v<version> auth:<mode> billing:<bool> ---------` followed by tabulated System / Features / Mail / Authentication sections. | verified | `lib/onetime/initializers/print_log_banner.rb:56` (the banner), `:62-90` (the sections); the auth-mode box at `lib/onetime/application/registry.rb:169-179` |
| 92 | A **misconfigured** datastore URL fails before any connection attempt, with a named error: empty → "Redis/Valkey URI is not configured. Set REDIS_URL or VALKEY_URL…"; containing `CHANGEME` → "Redis/Valkey URI contains placeholder 'CHANGEME'". | verified (STRUCTURAL) | `lib/onetime/initializers/check_redis_url.rb:13-31` |
| 93 | An **unreachable** datastore logs `Cannot connect to the database <uri> (Redis::CannotConnectError)` and re-raises — the app does not come up. Under Puma the process then exits **87** after printing `Application is not ready - goodnight irene`. | verified (STRUCTURAL) | `lib/onetime/boot.rb:276-282`; `config.ru:45-50` |
| 94 | A **wrong `SECRET`** does not stop the boot by default: the verifier ships in `warn` mode. `/health/advanced` reports it as an error — "SECRET does not match the datastore key verifier; existing secrets cannot be decrypted" — which degrades the top-level status. `enforce` refuses to boot; `off` skips the check. | verified as self-hosted shipped default (`warn`); the health surfacing is STRUCTURAL | `etc/defaults/config.defaults.yaml:13-20`; `apps/web/core/controllers/health.rb:102-125` (error string at `:113`) |
| 95 | A **missing `SECRET`** is fatal: `Global secret cannot be nil - set SECRET env var or site.secret in config`. The nil-secret escape hatch is only honoured when development mode is also on. | verified (STRUCTURAL) | `lib/onetime/config.rb:936-941`, `:961-969` |
| 96 | An operator-context doctor run warns when `public/web/dist` is missing or empty — the assetless-boot condition from row 85, caught before a user hits it. | verified | `bin/setup:1105-1113` |

---

## F. Reverse proxy and TLS

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 97 | **The app never terminates TLS.** Puma binds `tcp://0.0.0.0:$PORT` and there is no SSL bind, no certificate path, no ACME client in the app. A reverse proxy is assumed for HTTPS. | verified (STRUCTURAL) | `etc/examples/puma.example.rb:38` (the only `bind`); `Dockerfile:450` (`EXPOSE 3000` only); the full stack's TLS lives entirely in Caddy (`docker/compose/docker-compose.full.yml:22-54`) |
| 98 | **`TRUSTED_PROXY_ENABLED` defaults to `false`.** While it is false, forwarded headers are ignored entirely and the client IP is `REMOTE_ADDR` — so behind any proxy, every request is attributed to the proxy. `mode`, `cidrs`, `header` and `depth` do nothing until it is true. | verified as self-hosted shipped default; the "do nothing" part is STRUCTURAL | `etc/defaults/config.defaults.yaml:486-499`; `.env.reference:1126-1137`; the gate at `lib/onetime/application/middleware_stack.rb:245`, `:357-359` (`trusted_proxy_enabled?` requires `== true`) |
| 99 | **`TRUSTED_PROXY_MODE` accepts exactly two values, `filter` and `depth`, and defaults to `filter`.** Any value that is not the literal `depth` takes the filter branch. | verified as self-hosted shipped default; the two-way branch is STRUCTURAL | `etc/defaults/config.defaults.yaml:534`; `.env.reference:1139-1171`; the only branch in code is `if mode == 'depth'` (`lib/onetime/application/middleware_stack.rb:262`) with the filter branch at `:302-311` |
| 100 | `filter` walks the forwarded chain **left to right** and returns the first entry that is not a trusted proxy — so the **leftmost non-proxy entry wins**. The trusted set is RFC1918/loopback/link-local (`PRIVATE_PROXY_RANGES`) plus every range in `TRUSTED_PROXY_CIDRS`. | verified | `etc/defaults/config.defaults.yaml:503-511`; `lib/onetime/application/middleware_stack.rb:182-185` and the registration at `:305-310`; `.env.reference:1140-1145` |
| 101 | **Therefore the edge proxy MUST OVERWRITE `X-Forwarded-For` with the real peer address in filter mode.** If it appends instead, a client-supplied entry is returned as the client IP and IP rate limits, bans and audit attribution become spoofable. This is the Phase 1 correction and it survives verbatim at HEAD. | verified (STRUCTURAL security property, stated as such in the source) | `etc/defaults/config.defaults.yaml:513-519`; `.env.reference:1147-1154`; `etc/examples/Caddyfile-example:240-246` |
| 102 | The nginx form of that overwrite is `proxy_set_header X-Forwarded-For $remote_addr;`. | verified | `etc/defaults/config.defaults.yaml:516`; `.env.reference:1150` |
| 103 | The Caddy form is `header_up X-Forwarded-For {client_ip}` — and the **shipped** Caddyfile uses exactly that, alongside `header_up X-Real-IP {client_ip}`. | verified | `etc/examples/Caddyfile-example:268-269`; `.env.reference:1151` |
| 104 | `{client_ip}` honours Caddy's own `trusted_proxies`: with none declared it equals the direct peer (`{remote_host}`); with a CDN's ranges declared it resolves the real visitor. The shipped Caddyfile declares `trusted_proxies static private_ranges`. | verified | `.env.reference:1152-1154`; `etc/examples/Caddyfile-example:247-251`, `:63-64` |
| 105 | `depth` counts positions **from the right** of the chain, skipping N hops, so extra leftmost entries — forged or upstream — never shift the selection. Use it when the edge appends and you cannot change that, or when the proxy has a public IP. | verified | `etc/defaults/config.defaults.yaml:521-532`; `.env.reference:1163-1170`; `lib/onetime/application/middleware_stack.rb:186-192` |
| 106 | **The overwrite and depth mode are compatible only at `TRUSTED_PROXY_DEPTH=1`.** The overwrite leaves exactly one attested entry, which depth 1 selects. At depth ≥ 2 the collapsed chain is shorter than the count, resolution falls back to the peer, and attribution silently lands on the proxy. | verified — **this is a sharpening of the Phase 1 correction that the current docs do not carry** | `.env.reference:1155-1159`; `etc/examples/Caddyfile-example:253-267` |
| 107 | `TRUSTED_PROXY_DEPTH` defaults to 1, is clamped to 1–10, and maps directly to Otto's `trusted_proxy_depth` with no off-by-one. Depth mode is **mutually exclusive** with CIDR registration. | verified as self-hosted shipped default; the mapping is STRUCTURAL | `etc/defaults/config.defaults.yaml:563-568`; `lib/onetime/application/middleware_stack.rb:262-274` |
| 108 | `TRUSTED_PROXY_HEADER` is **depth-mode only** and its accepted set is closed: `X-Forwarded-For` (default), `Forwarded`, or `Both`. Any other value **fails the boot**. Filter mode ignores it and reads the X-Forwarded-For family (`X-Forwarded-For`, `X-Real-IP`, `X-Client-IP`). | verified as self-hosted shipped default; the closed set and boot failure are STRUCTURAL | `etc/defaults/config.defaults.yaml:536-556`; `.env.reference:1173-1194`; `lib/onetime/application/middleware_stack.rb:194-202`, `:249-250,260` |
| 109 | Vendor client-IP headers — `CF-Connecting-IP`, `True-Client-IP` and friends — are **never** read for client-IP resolution and are not selectable. An edge that only sets one of those must write the chain into `X-Forwarded-For`. | verified (STRUCTURAL) | `etc/defaults/config.defaults.yaml:548-555`; `.env.reference:1184-1193` |
| 110 | Listing a range in `TRUSTED_PROXY_CIDRS` is a **full infrastructure-trust grant**, not just client-IP trust: requests from those ranges also have their forwarded *host* headers honoured for custom-domain detection. A pass-through proxy therefore lets a client pick the tenant domain the app renders. | verified | `.env.reference:1196-1208` |
| 111 | Private and loopback client IPs are masked **even when no proxy is declared**, so direct-connect deployments do not leak raw RFC1918 addresses into sessions, rate-limit keys and logs. | verified (STRUCTURAL) | `lib/onetime/application/middleware_stack.rb:204-206`, `:212-218` |
| 112 | `SSL` / `site.ssl` defaults to **false** and governs whether generated links use `https` — it is a link-generation switch, not a transport switch. `SSL=true` additionally **forces** the session cookie `secure` flag on. **`SSL` unset does NOT mean the cookie is not `Secure`** — see row 140, which corrects the second half of this row. | verified as self-hosted shipped default; the cookie half **superseded by row 140** | `etc/defaults/config.defaults.yaml:5-6`; the `SSL=true` branch at `:382-383`; `.env.example:33-34` |
| 113 | `ASSUME_HTTPS` / `site.network.assume_https` defaults to **false**, is independent of trusted-proxy settings, and is upgrade-only: it marks non-HTTPS-looking requests as HTTPS before any consumer reads the scheme. It exists for TLS-terminating proxies that do **not** forward `X-Forwarded-Proto` (e.g. Cloudflare Tunnel). Standard nginx/Caddy/ALB setups do not need it, and it must never be set on a directly reachable origin. | verified as self-hosted shipped default; the constraints are STRUCTURAL and stated in source | `etc/defaults/config.defaults.yaml:598-612`; ordering at `lib/onetime/application/middleware_stack.rb:368-374` |
| 114 | Pairing `assume_https: true` with `site.ssl: false` produces a **mixed-content downgrade of generated URLs** — share links and emails emit `http://` while clients use `https`. | verified | `etc/defaults/config.defaults.yaml:606-611` |
| 115 | `HOST` defaults to `localhost:3000` and is the deployment's public hostname (port included when non-standard). | verified as self-hosted shipped default | `etc/defaults/config.defaults.yaml:4`; `.env.example:31-32` |
| 116 | In the full stack, TLS is Caddy's job: `DOMAIN` (default `localhost`) and `CERTIFICATE_EMAIL` (default `admin@example.com`) drive Let's Encrypt issuance; certificates persist in the `onetime_caddy_data` volume. | verified as compose-file default | `docker/compose/docker-compose.full.yml:34-35,51-54,279-282`; `docker/README.md:73`; the ACME block at `etc/examples/Caddyfile-example:17-21`, `:379-392` |
| 117 | Geo headers (`CF-IPCountry` and friends) are honoured **only** in filter mode with trusted-proxy enabled and the CDN's ranges declared. Depth mode never trusts them and resolves country to `'**'` unless a local MaxMind DB is configured; the app warns once at boot when that combination is set. | verified | `etc/defaults/config.defaults.yaml:570-596`; `lib/onetime/application/middleware_stack.rb:276-300` |

### Corrections owed by F

| # | Docs currently say | HEAD says | Evidence |
|---|---|---|---|
| 118 | **CORRECTION.** `installation.md:232-237` serves `/dist/` from nginx with `root /app/public;`, and `:330-335` aliases `/dist` to `/app/public/dist` in Apache. | Built assets live at **`public/web/dist/`**, so `/app/public/dist` does not exist — those blocks serve 404s. More importantly the shipped design is that **the app container serves its own built assets** and the proxy proxies everything; the reference Caddy image ships `PUBLIC_DIR` **empty** for exactly that reason. `install/reverse-proxy-and-tls` should drop the static-file blocks. | `vite.config.ts:243,248`; `lib/onetime/middleware/static_files.rb:146-148` (`Rack::Static, urls: ['/dist'], root: File.join(Onetime::HOME, 'public', 'web')`); `docker/variants/caddy.dockerfile:111-118` (ADR-025, "PUBLIC_DIR ships empty") |
| 119 | **SHARPENING, not a contradiction.** `installation.md:267` says: with `TRUSTED_PROXY_MODE=depth`, keep the append and set `TRUSTED_PROXY_DEPTH` to your hop count. | True for depth ≥ 2, and **incomplete for depth = 1**, where the overwrite is not merely tolerable but is the *safest* single-proxy configuration. The shipped Caddyfile relies on that. `install/reverse-proxy-and-tls` must carry the depth-1 case explicitly. | `.env.reference:1155-1159`; `etc/examples/Caddyfile-example:253-267` |

---

## G. `self-hosting/simple-or-full-auth` — the auth-mode rows

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 120 | `AUTHENTICATION_MODE` / `auth.mode` defaults to **`simple`**. Simple is Redis-only; full requires a SQL database. | verified as self-hosted shipped default | `etc/defaults/auth.defaults.yaml:6-8` |
| 121 | **Full mode's SQL database defaults to SQLite at `sqlite://data/auth.db`**, and that is what the shipped full compose stack actually uses. PostgreSQL is a supported option, not a requirement. | verified as self-hosted shipped default | `etc/defaults/auth.defaults.yaml:18-36`; `lib/onetime/auth_config.rb:60-63`; `docker/compose/docker-compose.full.yml:71,206,249` (`AUTH_DATABASE_URL=sqlite://data/auth.db`) |
| 122 | In an OCI container the SQLite file **must** sit in a mounted volume directory or it is lost on restart. | verified | `etc/defaults/auth.defaults.yaml:32-33`; `docker/README.md:113-117` |
| 123 | The Rodauth auth application is mounted **only** when the mode is `full`. | verified (STRUCTURAL) | `apps/web/auth/application.rb:23` |
| 124 | Turning authentication off entirely is a **separate switch** from the mode: `site.authentication.enabled` / `AUTH_ENABLED`, default on. | verified as self-hosted shipped default | `etc/defaults/config.defaults.yaml:281-283`; `.env.example:64-65` |
| 125 | The boot banner recognises a third mode string, `disabled`, in addition to `simple` and `full`. | verified — but see the "do not claim" list; only `simple` and `full` are documented in the shipped config, and nothing else in the codebase branches on `'disabled'` | `lib/onetime/application/registry.rb:170-174`; against `etc/defaults/auth.defaults.yaml:6-8` and `lib/onetime/auth_config.rb:78-84` (only `full?`/`simple?` predicates exist) |
| 126 | RabbitMQ is **not** required for full auth mode. It is required only when `JOBS_ENABLED=true`; otherwise email is sent synchronously in-process. | verified | `docker/README.md:79-84`; `etc/defaults/config.defaults.yaml:1113`; `apps/web/core/controllers/health.rb:65` (job-queue check returns `not_configured` when `jobs.enabled` is falsey). Caveat: `bin/setup:629-632` does run `bin/ots queue init` in full mode, and warns rather than failing when the broker is absent |
| 127 | Pinned service versions in this repo, where a version is pinned at all: Valkey **8.1**, PostgreSQL **17**, RabbitMQ **4.2**. | verified as pinned-image facts, not as minimum-version requirements | `docker/compose/docker-compose.simple.yml:67`; `docker/compose/docker-compose.full.yml:120,166`; `compose.test.yml:36,48,69` |

### Corrections owed by G

| # | Docs currently say | HEAD says | Evidence |
|---|---|---|---|
| 128 | **CORRECTION.** `simple-or-full-auth.md:20,35,41,57-59,69-70,79` and `self-hosting/index.md:14` state that full mode's account store is **PostgreSQL**. | It is a SQL database, **defaulting to SQLite**, which is what the shipped full stack runs. PostgreSQL is one supported target. | rows 121–122 |
| 129 | **CORRECTION.** `simple-or-full-auth.md:36,41,59` states RabbitMQ is required for full mode. | It is required for background jobs (`JOBS_ENABLED=true`), not for full auth. | row 126 |
| 130 | **CORRECTION.** `simple-or-full-auth.md:41` states infrastructure minimums "Redis 7+, PostgreSQL 17+, RabbitMQ 4.3+". | **No minimum version is declared anywhere in the repo.** The pinned images are Valkey 8.1, PostgreSQL 17, RabbitMQ **4.2** — so "RabbitMQ 4.3+" is above what the project itself ships. Per D-4.1 the page should not restate versions at all. | row 127; grep for a declared floor returns nothing |
| 131 | **CORRECTION.** `simple-or-full-auth.md:8-13,27-29` frames the choice as "three modes: disabled, simple, or full" and gives the off-switch as `authentication.enabled: false`. | Two independent settings are being conflated. `auth.mode` is `simple` or `full`; the off-switch is `site.authentication.enabled` (env `AUTH_ENABLED`) and is nested under `site:`. | rows 120, 124, 125 |

---

## H. Ownership transfer — the short subsection `self-hosting/index` gets (D-4.2)

| # | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|
| 132 | The command is `bin/ots org transfer-ownership ORG NEW_OWNER`. `ORG` is an org extid or objid; `NEW_OWNER` is an email, customer extid, or Rodauth account ID. | verified | `lib/onetime/cli/org/transfer_ownership_command.rb:7-16`, `:55-64` |
| 133 | **The new owner must already be an active member.** The command never creates a customer; add them with `bin/ots memberships add ORG CUSTOMER` first. | verified (STRUCTURAL, ADR-023) | `lib/onetime/cli/org/transfer_ownership_command.rb:14-17` |
| 134 | **Without `--yes` the command runs a dry run first** and prints the plan — who loses ownership, how many owner memberships are demoted, and to what — before prompting. Answering `n` is how you preview a transfer. | verified | `lib/onetime/cli/org/transfer_ownership_command.rb:19-21`, `:80-92`, `:125-133` |
| 135 | Flags are `--demote-to ROLE` (default `admin`), `--yes` / `-y` / `-f`, and `--json`. **There is no `--dry-run` flag** — this corrects the Phase 3 handoff. | verified (including the absence) | `lib/onetime/cli/org/transfer_ownership_command.rb:66-78`, against handoff §3 |
| 136 | `--demote-to` accepts any valid membership role except `owner`. | verified | `lib/onetime/operations/org/transfer_ownership.rb:115-117` (`DEMOTABLE_ROLES = SetRole::VALID_ROLES - ['owner']`), enforced at `:187` |
| 137 | The operation **promotes before demoting** — it has no choice, the sole-owner guard refuses every other ordering — so there is a window in which the org has two owner memberships and `bin/ots org doctor` reports check 4 (`membership_role_sync`) as a warning. | verified (STRUCTURAL) | `lib/onetime/cli/org/transfer_ownership_command.rb:23-32` |
| 138 | **Recovery from an interrupted transfer is to re-run the command, not the doctor.** A re-run is idempotent and demotes every other owner; `org doctor` marks check 4 `repairable: false` and will not fix it. | verified | `lib/onetime/cli/org/transfer_ownership_command.rb:29-32` |
| 139 | There is no REST endpoint for this; the CLI is the only surface. | verified (absence, and filed) | `lib/onetime/cli/org/transfer_ownership_command.rb:34-36` ("a colonel endpoint is filed separately, D33") |

---

## I. Addenda

Rows added after the first pass, when adversarial verification found page content resting on no row.
Numbering continues from 139 rather than reflowing the tables above; each row names the section it
extends. **These rows were read and pinned at `onetimesecret@4cbd421`**, which is ahead of the
`75ce160` the rows above were pinned at; where a line number here disagrees with one above, this
section is the later reading. Rows 141 and 142 cite the repo's vendored gems under `.gems/`, which is
app-relative like every other path in this file.

| # | Extends | Claim a docs page may make | Verdict | Evidence |
|---|---|---|---|---|
| 140 | F (corrects the second half of row 112) | **In production the session cookie is `Secure` whether or not `SSL` is set.** The shipped config emits `site.session.secure` **only** when `ENV['SSL'] == 'true'`, deliberately omitting the key otherwise so that the boot-time fallback supplies it; the fallback is `site.ssl` **OR** `RACK_ENV == 'production'`. The published image and both Compose stacks run `RACK_ENV=production`, and `OT.env` itself defaults to `production` when `RACK_ENV` is unset. So `SSL`'s real scope is link generation plus *forcing* `secure: true`; it is not what makes the cookie `Secure` on a normal deployment. | verified (STRUCTURAL) | `etc/defaults/config.defaults.yaml:377-384` — the comment at `:378-381` says the omission is deliberate ("OMIT the key entirely when SSL env is not 'true' so boot.rb's `ssl_enabled?` fallback can default this to true in production"), the branch at `:382-383`; `lib/onetime/boot.rb:87-102` (`SESSION_DEFAULTS`, no `secure` key), `:353-367` (`result['secure'] = ssl_enabled? if result['secure'].nil?` at `:366`), `:402-404` (`ssl_enabled?` = `conf&.dig('site','ssl') \|\| env == 'production'`), `:128` (`OT.env = ENV['RACK_ENV'] \|\| 'production'`); consumed at `lib/onetime/application/middleware_stack.rb:436` (`secure: session_config['secure']`); `RACK_ENV=production` at `Dockerfile:303,415`, `docker/compose/docker-compose.simple.yml:30`, `docker/compose/docker-compose.full.yml:67` |
| 141 | F | **A `Secure` session cookie over a request the app sees as plain HTTP is silently dropped, and the app logs it.** Rack's `security_matches?` returns false when the cookie is `secure` and neither `request.ssl?` nor `assume_ssl` holds, and `commit_session` then returns early — the session is never persisted, the response looks normal, and sign-in appears to succeed while the user is never signed in. The app overrides `security_matches?` for observability only (it does not change the decision) and emits, verbatim on one line: `[Session] cookie NOT written: secure cookie over a request the app sees as non-SSL. Behind a TLS-terminating proxy, forward X-Forwarded-Proto: https or set ASSUME_HTTPS=true.` The warning is throttled to one per `SECURE_COOKIE_WARN_INTERVAL` per process, so one log line can stand for every failed sign-in. | verified (STRUCTURAL); log string confirmed verbatim at HEAD | `.gems/gems/rack-session-2.1.1/lib/rack/session/abstract/id.rb:371-374` (`security_matches?`), `:350-356` (`commit_session?`), `:390` (the early return); the app's override at `lib/onetime/session.rb:246-249` ("observability-only … we deliberately do NOT change the decision") and `:261-272`, with the log string at `:271` and the throttle constant at `:75-80` (`SECURE_COOKIE_WARN_INTERVAL = 300`) |
| 142 | F | **The app sets its own response security headers, so a reverse proxy does not need to add them.** `Strict-Transport-Security` (`MIDDLEWARE_STRICT_TRANSPORT`) and `X-Frame-Options` (`MIDDLEWARE_FRAME_OPTIONS`) are both **on** unless explicitly set to `false`, and both are in the app's `SECURITY_CRITICAL_KEYS` list, so disabling either is logged at warn level. This is why the new proxy blocks carry none of the header directives the retired `installation.md` had. **Do not extend this to `X-Content-Type-Options`**: the HTTP header comes from `Rack::Protection::XSSHeader`, which is gated on `MIDDLEWARE_XSS_HEADER` and ships **off**; the app emits `nosniff` as a `<meta http-equiv>` tag instead. | verified as self-hosted shipped default; the criticality list is STRUCTURAL | `etc/defaults/config.defaults.yaml:433-434` (`frame_options`, default true), `:447-450` (`strict_transport`, default true), `:429-430` (`xss_header`, default **false**); `lib/onetime/middleware/security.rb:41-47` (`SECURITY_CRITICAL_KEYS`), `:215-217` (`XSSHeader`), `:221-223` (`FrameOptions`), `:244-248` (`StrictTransport`); `.gems/gems/rack-protection-4.2.1/lib/rack/protection/xss_header.rb:19-24` (the `nosniff` header lives there); `apps/web/core/templates/partials/head-base.rue:8,10` (the meta tag, and the note that `X-Frame-Options` is a header not a meta tag) |
| 143 | E | `proof-of-life.sh` takes the instance's **base URL as its one positional argument** and dies with a usage message when it is missing — `scripts/install-tests/proof-of-life.sh http://127.0.0.1:3000`. | verified | `scripts/install-tests/proof-of-life.sh:3` (the header form), `:26-27` (the Usage block), `:33-36` (`BASE="${1:-}"` and the empty-argument guard) |
| 144 | E (sharpens row 84 step 4) | Step 4 is **strictly opt-in via `POL_CREATE_ACCOUNT=1`** and its account is a **throwaway**: the address defaults to a randomized `pol-$$-${RANDOM}@example.com` and must be fresh per run. It also uses `bin/ots apitoken EMAIL --create --role colonel`, not `customers create`, and proves the credentials against `GET /api/v2/receipt/recent` (basicauth-only, anonymous asserted non-200 first). **A docs page must not present this step as creating the operator's sign-in account** — that is row 146. `POL_EXEC` is the optional command prefix that reaches a shell where `bin/ots` works. | verified | `scripts/install-tests/proof-of-life.sh:18-21` (the contract), `:110-121` (the env vars and the freshness constraint), `:122-131` (the opt-in gate and the `apitoken` invocation), `:133-144` (the anonymous-then-authenticated assertion) |
| 145 | E (sharpens row 92) | **The shipped fallback datastore URL itself contains `CHANGEME`.** When neither `VALKEY_URL` nor `REDIS_URL` is set and neither `IN_DOCKER=1` nor a positive `AUTO_DETECT_DOCKER` check applies, `redis.uri` resolves to `redis://CHANGEME@127.0.0.1:6379` — so an instance that never got a datastore URL fails with the **placeholder** message from row 92, not with a connection error. | verified (STRUCTURAL) | `etc/defaults/config.defaults.yaml:884-888` (the documented precedence, naming the default), `:896-903` (the ERB fallback chain, `'redis://CHANGEME@127.0.0.1:6379'` at `:902`); the raising branch at `lib/onetime/initializers/check_redis_url.rb:23-28` |
| 146 | B and E (completes row 37) | **The first sign-in account is created from the CLI in both install lanes, and `colonel` is the site-operator role.** Compose form: `docker compose exec app bin/ots customers create me@example.com --role colonel` — the service is named `app` in both stacks. Bare-metal form: the same command without the exec prefix, from the application directory. `--role` accepts `customer` (the default), `colonel`, `admin` or `staff`; `--verified` defaults to **true**, so the account does not wait on a confirmation email; and when `--password` is not given the command **generates a 20-character password and prints it once** ("Save this password - it will not be displayed again"). The web signup form produces an ordinary customer — no role above `customer` is reachable from it. | verified | `lib/onetime/cli/customers/create_command.rb:8-10` (both usage forms), `:22-35` (`--role`, `--password`, `--verified` defaults), `:37-38` (`VALID_ROLES`), `:40` (`role: 'customer'` default), `:68-69` and `:180-184` (the generated password), `:82-89` (what it prints), `:188` (`register 'customers create'`); `docker/README.md:50-58` (the compose form and the service name); `README.md:32-37` (the `docker exec` form and the word "colonel"); promotion of an existing account is a separate command, `lib/onetime/cli/customers/role_command.rb` |

---

## Do not claim

- **`JOBS_SCHEDULER_ENABLED` does anything.** *(The prep doc's §5 constraint, re-verified and re-pinned at HEAD.)*
  `docker/README.md:89-91` still tells operators "Scheduled jobs additionally require
  `JOBS_SCHEDULER_ENABLED=true`", and `docker/compose/docker-compose.full.yml:252-253` still carries
  the same instruction as a comment. **Both line numbers are unchanged from the prep doc's pins and
  both instructions are still wrong.** The config key exists
  (`etc/defaults/config.defaults.yaml:1146-1147`, `jobs.scheduler.enabled`) but **no Ruby code reads
  it** — a repo-wide grep for `'jobs', 'scheduler'` and `jobs.scheduler` over `lib/`, `apps/`, `bin/`
  and `spec/` returns only `try/unit/config/jobs_config_defaults_try.rb:47`, which asserts the parsed
  value and nothing more. `lib/onetime/cli/scheduler_command.rb:41-67` boots and calls
  `load_scheduled_jobs` unconditionally, and `:85-104` registers every discovered job class with no
  config gate. The app's own reference file says so in as many words:
  `.env.reference:1788-1793` — *"The docker compose full stack documents setting this to 'true' …
  but no Ruby code currently reads this config path."* **`install/docker` must not repeat the
  instruction**, and must not present the flag as a knob.
- **`JOBS_FALLBACK_SYNC` does anything.** Same class of defect, same issue
  ([onetimesecret#3993](https://github.com/onetimesecret/onetimesecret/issues/3993)). The key is
  parsed at `etc/defaults/config.defaults.yaml:1131` and `.env.reference:1781-1786` states plainly
  that *"the key is currently only recorded in config — delivery code chooses its fallback per call
  (default `:async_thread`), so this setting is not read at runtime."* No compose file or README
  instructs setting it, so unlike `JOBS_SCHEDULER_ENABLED` this is a "do not introduce it" rather
  than a "do not inherit it".
- **A specific image tag on any of the eight pages.** Three in-repo pins are held in lockstep by
  `scripts/check-version-pins.sh` and bumped at release; a fourth number in the docs is a fourth
  thing to drift. Link to the release list. (And the published docs' `v0.26.2` is already wrong in
  both directions — see rows 15, 41.)
- **`OTS_IMAGE_TAG=v0.25.11` from `.env.example:70`.** It is stale relative to the compose defaults
  and the README, and `check-version-pins.sh` does not scan `.env.example` — its guard covers
  `docker/compose/*.yml` against the README only (`scripts/check-version-pins.sh:22-28`).
- **A minimum Redis/Valkey, PostgreSQL or RabbitMQ version.** None is declared anywhere in the
  repo. The pinned images (row 127) are what CI runs, not a floor. Say "the version the compose
  files pin" or say nothing.
- **`redis:bookworm` as the recommended datastore.** It is what the README's minimal `docker run`
  uses (`README.md:16`), but every compose stack ships digest-pinned **Valkey 8.1** with a password
  and AOF persistence (rows 27–28). Do not present the README's bare Redis container as a
  deployment posture.
- **"The lite image is a deployment option."** It bundles Redis, runs as root, and loses all data on
  stop — `docker/variants/README.md:31` calls it "Not for production" outright.
  `install/images-and-variants` should name it as a demo/testing artifact only.
- **"`GET /api/v2/status` proves the instance is healthy."** It returns a static
  `status: "nominal"` with no probes (row 83). It proves Rack is answering. The app's own smoke
  assertion adds the asset round-trip precisely because a "nominal" status accompanied an assetless
  UI (`scripts/install-tests/proof-of-life.sh:10-14`). `install/verify` must not present it as a
  readiness check.
- **"Curl `/health/advanced` to check your instance."** Not from anywhere public: the health
  middleware returns **403** to any client that is not private/loopback or inside
  `HEALTH_TRUSTED_CIDR` (row 81). Any verify instruction must run from the host, from inside the
  container, or from a declared trusted range.
- **`bin/ots doctor` as a command.** It does not exist. `bin/doctor` is a shell wrapper over
  `bin/setup --doctor`; the `bin/ots … doctor` forms are all per-domain data-integrity subcommands
  (row 89).
- **"Full authentication mode requires PostgreSQL and RabbitMQ."** Wrong on both counts (rows 121,
  126) — and note the **app repo's own shipped systemd unit comments repeat the error**
  (`etc/examples/systemd/onetimesecret-worker.service:3`,
  `etc/examples/systemd/onetimesecret-scheduler.service:3`). Read the config, not the unit comments.
- **A number taken from `.env.example` for `TTL_OPTIONS`.** `.env.example:56-57` still claims the
  default is `300 3600 86400 604800`; the code default is the 11-entry list. Carried forward from
  the Phase 2 ledger and **still true at HEAD**.
- **Nginx/Apache static-file blocks for `/dist/`.** See row 118. The shipped architecture is that the
  app serves its own assets and the proxy proxies everything.
- **"`SSL=true` makes the app serve HTTPS."** It governs link generation and forces the session
  cookie's `secure` flag on (row 112). Transport TLS is always someone else's job (row 97).
- **"With `SSL` off, the session cookie is not `Secure`."** Backwards on any production deployment:
  the flag falls back to `site.ssl` **OR** `RACK_ENV=production`, and the image and both stacks run
  `production` (row 140). `install/docker` and `install/reverse-proxy-and-tls` must not present the
  dropped-`Secure`-cookie failure (row 141) as conditional on `SSL`.
- **"Set `TRUSTED_PROXY_MODE` and you're done."** `TRUSTED_PROXY_ENABLED` defaults to `false` and
  gates every other trusted-proxy setting (row 98). A page that documents the mode without the
  master switch documents an inert value — which is exactly the failure class this ledger's
  `JOBS_*` rows exist to prevent.
- **"Overwrite `X-Forwarded-For` in every mode" or "never overwrite it in depth mode."** Both are
  wrong at the edges. Filter: always overwrite. Depth 1: overwrite is correct and safest. Depth ≥ 2:
  do not overwrite (row 106).
- **Anything about what onetimesecret.com has configured.** Every value in this ledger comes from
  `etc/defaults/`, `.env.reference`, `.env.example`, a compose file or a CI script. There is no
  production config in this repo.
- **Any plan, tier, seat or entitlement statement.** Billing gate, unchanged. Note the operator-tree
  finding that governs adjacent pages: on a stock self-hosted instance billing is off, so
  `STANDALONE_ENTITLEMENTS` grants everything and limits are infinite — an operator page that
  presents entitlements as an operator-tunable knob would be wrong. That row belongs to the
  Configure/Features ledgers, not this one; it is noted here only so the install pages do not
  reach for it.
