---
title: Install on Linux
description: How to install Onetime Secret from a checkout on Debian or Ubuntu — the exact toolchain versions, the system packages, the datastore decision, and what bin/install does for you.
audience: operator
pageType: how-to
sourceOfTruth: onetimesecret/.ruby-version:1 and onetimesecret/scripts/setup/lib.sh:43-48 (Ruby must match .ruby-version exactly — 3.4.10 — the installer dies on any other patch level, and its error message names rbenv and mise); onetimesecret/.node-version:1 and onetimesecret/scripts/setup/lib.sh:53-70 (Node is checked by major version only, 22); onetimesecret/package.json:6 (pnpm is pinned by packageManager); onetimesecret/scripts/install-tests/run.sh:50-60 (the Debian package set the clean-room install lane installs, mirrored from the image build); onetimesecret/scripts/install-tests/run.sh:46-47 (that lane runs inside ruby:3.4.10-slim, so the set assumes a Ruby is already present and is not a ruby-build prerequisite list); onetimesecret/scripts/install-tests/run.sh:14-21,46-48 (the clean-room install lanes are Debian only); onetimesecret/bin/install:3-9,43-47 and onetimesecret/bin/setup:590-597 (bin/install is the operator front door, idempotent, and reconciles rather than re-initializing a live environment); onetimesecret/bin/setup:601-609,626-627,641 and onetimesecret/scripts/setup/lib.sh:168-187,196-213,215-229 (what the installer does — version gates, frozen installs, seeding etc/*, generating .env, chmod 600, install mark); onetimesecret/lib/tasks/init.rake:104-122 (the installer's env step copies .env.example verbatim and skips an existing .env); onetimesecret/lib/tasks/init.rake:129-146 (the secrets step keeps an existing SECRET and only re-derives the child keys); onetimesecret/.env.example:28 (the REDIS_URL the generated .env starts with carries no password); onetimesecret/bin/setup:634-648 (the install mark boots the app with the .env just generated, and warns rather than failing when that boot does not succeed); onetimesecret/scripts/setup/lib.sh:191-194,204-207 (installs are frozen — BUNDLE_FROZEN=true bundle install, no --without); onetimesecret/scripts/setup/lib.sh:239-245 (the installer's locale generation step needs python3); onetimesecret/bin/setup:614-623 (the one manual PostgreSQL schema step, not required for SQLite); onetimesecret/scripts/setup/lib.sh:236-237 and onetimesecret/bin/setup:1105-1113 (setup never runs pnpm run build, and an operator doctor pass warns when public/web/dist is empty); onetimesecret/vite.config.ts:241,243,248 and onetimesecret/lib/onetime/middleware/static_files.rb:146-148 (assets build to public/web/dist and the app serves them itself at /dist); onetimesecret/scripts/install-tests/baremetal-boot.sh:102-124 (the clean-room reproduction of build, env sourcing and boot); onetimesecret/Procfile.production:13,20 and onetimesecret/etc/examples/puma.example.rb:24-25,38 (the start command, the env-sourcing form, and the plain-HTTP bind); onetimesecret/etc/examples/systemd/onetimesecret-web.service:9-13,18,25-27,30 (the layout and datastore service names the shipped units assume, and the /bin/bash -lc login shell their ExecStart runs); onetimesecret/etc/examples/valkey.conf:4-5,7,9-10,14,22-26,30,33 (the shipped datastore example, which enables persistence); onetimesecret/docker/compose/docker-compose.simple.yml:74-87 (the compose stacks set the same knobs as valkey-server flags); onetimesecret/lib/onetime/initializers/check_redis_url.rb:13-29 (an empty or CHANGEME datastore URL fails the boot with a named error); onetimesecret/Gemfile:109-116 (libsodium is a runtime requirement, not a build one)
sidebar:
  label: Install on Linux
  order: 3
---

This page installs Onetime Secret from a source checkout onto a Debian or
Ubuntu host. The project's clean-room install tests run against Debian base
images only, so other distribution families are not covered by them, and the
package and service names below are Debian's.

## System packages

Install the toolchain and the build headers first, as root:

```bash
sudo apt update
sudo apt install -y --no-install-recommends \
  build-essential libssl-dev libffi-dev libyaml-dev libsqlite3-dev \
  libpq-dev libsodium23 pkg-config git curl ca-certificates \
  python3 procps redis-server
```

That list is exactly what the project's clean-room install lane puts into an
empty container before running the install, mirrored from the image build. It
covers the build headers the `pg`, `sqlite3`, `argon2`, `bcrypt` and `puma` gems
compile against, and it includes `redis-server` for the same reason a bare-metal
host needs one: the datastore has to be reachable locally.

Not all of it is build tooling. `libsodium23` is a runtime shared library rather
than a build header — `rbnacl` binds to the shared object, so the application
fails to boot without it even though nothing needs its headers to compile — and
`python3` is what the installer's locale generation step shells out to.

That list also assumes a Ruby is already present, because the clean-room lane
runs inside a Ruby base image. Building Ruby with rbenv, as this page does
further down, needs ruby-build's own prerequisites on top of it:

```bash
sudo apt install -y --no-install-recommends \
  autoconf zlib1g-dev libreadline-dev libgdbm-dev
```

Install these before you run `rbenv install`. A Ruby compiled without zlib
cannot run RubyGems, so `gem install bundler` fails on it.

Node and pnpm are separate. Node is checked by major version only, and the
major is 22:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pnpm
```

`package.json` pins the pnpm version under `packageManager`. If `pnpm --version`
disagrees with that pin, install the pinned version instead.

## The datastore

Onetime Secret stores its data in Valkey or Redis. The two are wire-compatible
and the `valkey-*` and `redis-*` binaries are interchangeable, so the
`redis-server` package installed above is a valid datastore; the shipped
systemd units order themselves after both `redis-server.service` and
`valkey.service` for that reason.

The repository ships a reference configuration at `etc/examples/valkey.conf`,
and it turns persistence on:

```properties
dbfilename onetime.rdb
appendfilename onetime.aof

bind 127.0.0.1
port 6379

save 157680000 1
appendonly yes
appendfsync everysec
```

`save 157680000 1` is not a snapshot schedule — the interval is five years. It
is there so the datastore still writes an RDB file when it receives `SHUTDOWN`.
The durable copy is the append-only file, fsynced once a second.

**Whether to keep that is a decision about your threat model, not a tuning
knob.** With persistence on, the ciphertext of every live secret is written to
`onetime.rdb` and `onetime.aof` and stays on disk until the record expires and
the files are rewritten. That is what lets an instance survive a restart
without losing every unretrieved secret, and it is also what puts secret
material into everything that reads the disk afterwards — backups, volume
snapshots, a recovered disk image. To keep secrets in memory only, set
`save ""` and `appendonly no` instead and accept that a restart loses them all.

Either way, set a password and keep the listener on loopback. The example ships
`requirepass` commented out with a `CHANGEME` placeholder; give it a real value.
The URL that hands that password to the application lives in `.env`, which does
not exist yet — the installer generates it, and setting the password into it is
a step further down this page.

Take the settings from `etc/examples/valkey.conf` rather than copying the file
over the one the package installed — it is written as a standalone
configuration, including `daemonize yes`, which is not what a service-managed
datastore wants. Apply the persistence, bind and password settings to
`/etc/redis/redis.conf`, then start it, still as root:

```bash
sudo systemctl enable --now redis-server
sudo systemctl restart redis-server
```

Under Docker the same knobs are set as `valkey-server` flags on the datastore
service instead of a configuration file — see
[Install with Docker](/en/install/docker).

## Create the service account and fetch the code

The systemd units the repository ships assume a dedicated `onetime` user and
group with the application at `/var/lib/onetimesecret`. Use that layout unless
you intend to edit the units.

```bash
sudo useradd --system --shell /bin/bash --home-dir /var/lib/onetimesecret onetime
sudo git clone https://github.com/onetimesecret/onetimesecret.git /var/lib/onetimesecret
sudo chown -R onetime:onetime /var/lib/onetimesecret
```

Everything from here runs as that user, in a login shell — the same kind of
shell the service will use:

```bash
cd /var/lib/onetimesecret
sudo -u onetime -H bash -l

# Choose a release from https://github.com/onetimesecret/onetimesecret/releases
export OTS_VERSION=vX.Y.Z

git checkout "$OTS_VERSION"
```

`$OTS_VERSION` is a git tag here and the container image tag on the Docker path.
It is the same string in both places.

## Ruby

Ruby must match `.ruby-version` **exactly** — 3.4.10 — and not merely "3.4 or
newer". Bundler enforces the exact version through the `Gemfile`, and the
installer refuses to proceed on any other patch level with
`need exactly <version>`. Read the number out of the checkout rather than
typing it, so a version bump cannot catch you out.

The distribution's own Ruby packages are too old. Use a version manager; the
installer's own error message names rbenv and mise.

```bash
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
git clone https://github.com/rbenv/ruby-build.git "$(~/.rbenv/bin/rbenv root)"/plugins/ruby-build
echo 'eval "$(~/.rbenv/bin/rbenv init - bash)"' >> ~/.profile
source ~/.profile

rbenv install "$(cat .ruby-version)"
rbenv global "$(cat .ruby-version)"
gem install bundler
```

That line goes in `~/.profile`, not `~/.bashrc`, and the difference decides
whether the service can start. The shipped systemd units run the app through
`/bin/bash -lc`, and a bash login shell reads `/etc/profile` and then the first
of `~/.bash_profile`, `~/.bash_login` and `~/.profile` — it never reads
`~/.bashrc`. `useradd --system` creates no home-directory files at all, so
nothing exists to bridge the two: the `~/.profile` above is a new file, and it
is the one the service reads. Put rbenv anywhere else and the unit starts, finds
no `bundle` on `PATH`, and dies — see
[Run as a service](/en/install/run-as-a-service), which is where this decision
takes effect.

## Run the installer

`bin/install` is the front door for a bare-metal install. It is a thin wrapper
over `bin/setup --init`, and it is safe to re-run: when it finds an environment
that has already been initialized it reconciles instead, so it never
regenerates a live `SECRET`.

```bash
bin/install
```

In one pass it checks Ruby against `.ruby-version` and Node against
`.node-version`, installs the gems and the Node packages against the committed
lockfiles, seeds `etc/config.yaml`, `etc/auth.yaml`, `etc/logging.yaml` and
`etc/puma.rb` from the shipped templates, writes `.env` and generates the
secrets in it, sets that file to mode 600, and marks the environment as
installed. That last step boots the app with the `.env` it just generated, so it
succeeds only if the datastore accepts the credentials in that file — which is
the next section.

Two further steps look reasonable and undo work the installer just did. `.env`
is generated rather than copied, so copying `.env.example` over it afterwards
discards the generated `SECRET` and the 600 permissions. And the `etc/*` files
are already seeded from `etc/defaults/` and `etc/examples/`, so there is
nothing to put in place by hand.

Gem and Node installs are frozen: the installer never rewrites `Gemfile.lock` or
`pnpm-lock.yaml`. If you ever run Bundler yourself, use the same form —
`BUNDLE_FROZEN=true bundle install`, with no `--without` flag.

If you are running full authentication mode against PostgreSQL, one step is
left to you: run
`apps/web/auth/migrations/schemas/postgres/initialize_auth_db.sql` as a
PostgreSQL superuser. SQLite, which is the default, needs nothing.

### Point the app at the datastore

The `.env` the installer just wrote starts life as a verbatim copy of
`.env.example`, whose datastore line carries no password:
`REDIS_URL='redis://127.0.0.1:6379/0'`. If you set `requirepass` on the
datastore, that line is now wrong, and nothing in the installer will fix it —
the secrets step rewrites `SECRET` and the keys derived from it, and leaves
every other line alone. Edit `.env` and give the URL the password:

```properties
REDIS_URL=redis://:your-password@127.0.0.1:6379/0
```

Then run `bin/install` again. The second pass leaves the generated `.env` and
its `SECRET` alone — the env step skips a file that already exists, and the
secrets step re-derives the child keys from the `SECRET` it finds rather than
minting a new one — and it records the install mark, which the first pass could
not, because the boot it does to set that mark used the password-less URL and
was refused by the datastore.

`REDIS_URL` and `VALKEY_URL` are both read. A URL that is empty, or that still
contains the literal `CHANGEME`, fails the boot with a named error rather than
an obscure connection failure.

## Build the frontend assets

The installer deliberately does not build the frontend. A production install
has to do it:

```bash
pnpm run build
```

The build writes to `public/web/dist/`, and the application serves that
directory itself at the `/dist` URL prefix. There is no separate static file
server to point at it, and a reverse proxy in front of the app should proxy
those requests like any other.

Skipping this step produces no obvious failure. The app boots, answers requests
and reports itself healthy while serving a UI with no assets.

## Start the app

The environment is loaded by sourcing `.env` with auto-export on. Every shipped
invocation — the Procfile, the systemd units, the installer's own closing
instructions — uses this exact form:

```bash
set -a; source .env; set +a
bundle exec puma -C etc/puma.rb
```

`etc/puma.rb` was seeded by the installer and is usable unmodified. Puma binds
plain HTTP on `0.0.0.0` at `$PORT`, 3000 unless you set it, and takes its
production settings from `RACK_ENV`, which the config treats as `production`
when it is unset.

Puma never terminates TLS. Put a reverse proxy in front of it before the
instance is reachable from anywhere but localhost — see
[Reverse proxy and TLS](/en/install/reverse-proxy-and-tls).

That command holds the shell, and the instance dies with it. To keep it running
across reboots, and for the Procfile form if you would rather not use systemd,
use the units the repository ships:
[Run as a service](/en/install/run-as-a-service). To confirm the install
actually works rather than merely answering,
[Verify your install](/en/install/verify).
