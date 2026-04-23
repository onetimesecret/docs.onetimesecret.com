---
title: Upgrading to v0.24.0
description: Guide for upgrading Onetime Secret from v0.22 or v0.23 to v0.24.0
sidebar:
  order: 6
---

This guide covers upgrading to v0.24.0 from v0.22 or v0.23. There are significant changes to the authentication system, configuration structure, and data model. You'll need to choose an upgrade path, update configuration files, and possibly run data migrations.

For the full context on what changed and why, see the [v0.24.0 release notes](https://blog.onetimesecret.com/posts/2026-03-04-release-notes-v0.24.0).

## Before You Start

**Coming from v0.22?** Complete the [v0.23 config migration](upgrading-v0-23/) first. The v0.23 release converts config keys from symbol to string format, which v0.24 requires.

1. **Back up your Redis data.** `redis-cli BGSAVE` or equivalent. Keep the RDB file somewhere safe.
2. **Back up your configuration files.** `config.yaml`,`.env`.
3. **Note your current SECRET value.** You'll need it to continue decrypting existing secrets. Only generate a new one if you're certain no unretrieved secrets remain.
4. **Decide your auth mode.** Disabled, simple, or full. This determines your infrastructure requirements (see below).

## System Requirements

### Simple Mode

- Ruby 3.4+
- Redis 7+ (or Valkey)

### Full Mode

Everything from Simple Mode, plus:

- **PostgreSQL 17+** with a dedicated database for OTS auth tables
- **RabbitMQ 4.3+** accessible from the OTS application

## Choose Your Path

There are two upgrade paths. If you don't have critical data or accounts that need to be preserved, **Path A (fresh start)** is significantly easier. Path B covers in-place migration for operators who need to preserve accounts, live secrets, or API integration stability.

---

## Path A: Fresh Start

Use this path if you don't need to preserve existing accounts or live secrets.

### 1. Pull the new version

```bash
docker pull onetimesecret/onetimesecret:v0.24.7
```

Or clone/checkout the v0.24.7 tag if running from source, then run the install script:

```bash
./install.sh
```

This auto-detects a new environment and runs `init`: installs Ruby and Node dependencies, generates derived keys, and prepares the environment. You can also run `./install.sh doctor` to check prerequisites.

### 2. Set up configuration

**Option 1: Config files.** Copy `config.defaults.yaml` and `auth.defaults.yaml` from the repository as your starting point. Edit them with your site-specific values: domain, SMTP settings, branding, plan configuration.

**Option 2: Environment variables.** Copy `.env.example` to `.env`. The new config supports full env var overrides. Review and set each variable.

If you have an existing config with customizations you want to carry forward (branding, SMTP, plan structure), reference your old files while filling in the new ones. The key names have changed — see the [config mapping reference](#config-mapping-reference) below.

### 3. Maintain your SECRET

Copy your existing `SECRET` value into the new config or `.env` file. If this is a truly fresh deployment with no data from a previous instance, you can generate and store a new value:

```bash
openssl rand -hex 32 > .ots_secret
chmod 600 .ots_secret
```

This creates a `.ots_secret` file in your project directory containing the key. The `docker run` command in step 5 reads from this file. Alternatively, set the value directly in your `.env` file or config.

:::caution
Changing the `SECRET` makes all previously encrypted secrets unreadable. If you have any existing secrets from your previous instance, keep your existing `SECRET` value the same — do not generate a new one.
:::


### 4. Configure auth mode

In your config, set the authentication mode:

**Disabled** — No authentication. The application operates in anonymous-only mode. Useful behind a VPN or reverse proxy that handles auth externally.

```yaml
authentication:
  enabled: false
```

**Simple** — The Redis-backed authentication from previous versions. No additional infrastructure required and accounts continue to work as they always have. The functionality is limited and won't be extended with new features going forward (MFA, WebAuthn, and SSO are not available), but it functions well as a basic gating layer for creating secrets.

```yaml
authentication:
  enabled: true
  mode: simple
```

**Full** — Adds Rodauth-based authentication which includes MFA, SSO, WebAuthn, organizations, and background job processing. Account data is stored in PostgreSQL. Background jobs (email delivery, notifications, webhook processing) are handled by RabbitMQ.

```yaml
authentication:
  enabled: true
  mode: full
```

For full mode, also configure your PostgreSQL and RabbitMQ connection details.

### 5. Start the application

**Docker** (simplest — matches the `docker pull` from step 1):

```bash
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(cat .ots_secret)" \
  -e HOST=localhost:3000 \
  -e SSL=false \
  onetimesecret/onetimesecret:v0.24.7
```

**Docker Compose** (for persistent or multi-service deployments):

```bash
cp --preserve --no-clobber .env.example .env
docker compose up -d
```

See `docker-compose.yml` for available profiles (simple vs full stack) and `docker/README.md` for details.

**From source** — see the [Development Guide](https://github.com/onetimesecret/onetimesecret/tree/develop/docs/development) for running with Overmind, separate terminals, or production-style builds.

The application will initialize itself with clean state.

### 6. Verify

- Create a secret, retrieve it
- If auth is enabled: create an account, sign in, sign out
- If full mode: verify MFA enrollment flow, check RabbitMQ queues are being created
- Check `bin/ots status` for system health
- Review logs for any warnings (now via SemanticLogger, structured output)

---

## Path B: Migration

Use this path if you need to preserve accounts, live secrets, or API integration stability.

### 1. Stop the running instance

Cleanly shut down your current OTS instance. Let any in-progress requests complete.

### 2. Back up (again)

Even if you already backed up in the prerequisites. Make a timestamped copy right now, after clean shutdown. Redis RDB, config files, everything.

### 3. Pull the new version

```bash
docker pull onetimesecret/onetimesecret:v0.24.7
```

Or clone/checkout the v0.24.7 tag if running from source. Do not start it yet. Run the install script to update dependencies and re-derive child keys:

```bash
./install.sh
```

This auto-detects an existing environment and runs `reconcile`: installs gems and node packages, re-derives child keys from your existing `SECRET`, and re-applies RabbitMQ policies if in full mode. You can also run `./install.sh doctor` to check your environment.

### 4. Update configuration files

The config structure has changed significantly. The application will not start with outdated configuration.

| v0.23 location | v0.24 location | Notes |
|---|---|---|
| `site.fromname` | `site.from_name` | Renamed |
| `site.domains` | `features.domains` | Moved |
| `site.regions` | `features.regions` | Moved |
| `auth.yaml` session settings | Site config session settings | Moved |
| Auth env vars (various) | `AUTH_*_ENABLED` pattern | Renamed |
| Plan config under `site.plans` | Top-level `billing` section | Restructured |
| Experimental configuration | — | Removed |
| (none) | `logging.yaml` | New file for HTTP request logging |
| (none) | `billing.yaml` | New file |
| (none) | `site.secret_options.generated_value_display_ttl` | New setting (default: 60 seconds) |

The safest approach: start from `config.defaults.yaml` and `auth.defaults.yaml`, then transplant your site-specific values into the new structure. This is more work than editing in place but eliminates the risk of missing a structural change.

#### Environment Variables

Many new environment variables have been added. Review the `.env.example` files for the most common settings. For the most part, environment vars are consumed in the YAML config files at load-time, so the values must be set before starting the application.

### 5. Preserve your SECRET

Your existing `SECRET` must remain the same for migrated data. Existing secrets are encrypted with this value and will be unreadable without it. Verify it's correctly set in your new config or `.env`.

### 6. Configure auth mode

Set your chosen authentication mode (see [Path A, step 4](#4-configure-auth-mode) for the YAML configuration). If staying on simple mode, this is functionally equivalent to v0.23 behavior.

For full mode, you'll also need to set up PostgreSQL and RabbitMQ before proceeding:

- **PostgreSQL:** Run the initial schema setup before starting the application. See [`apps/web/auth/migrations/README.md`](https://github.com/onetimesecret/onetimesecret/tree/develop/apps/web/auth/migrations).
- **RabbitMQ:** Initialize the queues and exchanges with `bin/ots queues init`.

### 7. Run the Familia v1-to-v2 data migration

Familia (the internal Redis ORM used by Onetime Secret) has been rewritten from v1 to v2. This is the core data model upgrade — the migration pipeline transforms your Redis data structures from the v1 format to v2.

The scripts in the `scripts/upgrade/v0.24.0` directory handle this process and are the same files we used to migrate the onetimesecret.com production environments. They can be run in dry-run mode to preview changes before applying them. All scripts support `--help` for usage instructions.

```bash
# Preview what will be migrated
./scripts/upgrade/v0.24.0/info.sh

# Run migration (dry run is default)
./scripts/upgrade/v0.24.0/upgrade.sh

# Apply changes for real
./scripts/upgrade/v0.24.0/upgrade.sh --execute

# Optional: reset if needing to re-run
# ./scripts/upgrade/v0.24.0/reset.sh
```

The `upgrade.sh` orchestration script assumes that both the source (`SOURCE_REDIS_URL`) and target (`TARGET_VALKEY_URL`) Redis connections are configured and available. The dump, transform, and validate scripts can also be run independently if you want to break up the process or re-run specific phases.

Each phase is idempotent and can be re-run if needed. There is a yes/no gate before each phase begins.

The migration pipeline includes validators that check data integrity during the transform. Common issues:

- **Index inconsistencies:** The migration fixes known index bugs from v1. Warnings about reindexing are expected and handled.
- **Legacy plan references:** Old plan identifiers are mapped to the unified plans structure. Review the mapping output to confirm your plans are correctly translated.
- **Orphaned records:** Records referencing deleted accounts or expired entities are logged but don't block migration.

For a system with a few thousand accounts and/or secrets, the migration should complete in about 5 minutes. For larger datasets, it may take longer. Monitor the logs for progress.

### 8. Password migration (full mode only)

For full mode deployments, passwords migrate from Redis to Rodauth's PostgreSQL tables. Users don't need to reset their passwords. On next login, bcrypt hashes are transparently upgraded to argon2id.

This happens automatically on each user's first login after the upgrade. No manual password migration step is required.

### 9. Start the application

**Docker:**

```bash
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://your-redis-host:6379/0 \
  -e SECRET="$YOUR_SECRET" \
  -e HOST=your-domain.com \
  -e SSL=true \
  onetimesecret/onetimesecret:v0.24.7
```

**Docker Compose:**

```bash
docker compose up -d
```

**From source** — see the [Development Guide](https://github.com/onetimesecret/onetimesecret/tree/develop/docs/development) for running with Overmind, separate terminals, or production-style builds.

### 10. Verify

After starting, confirm the application is healthy:

```bash
# Basic health check
curl -v http://localhost:3000/health

# Advanced health (checks PostgreSQL, RabbitMQ dependencies — full mode)
curl -v http://localhost:3000/health/advanced

# Diagnostic tools
bundle exec bin/ots boot-test
bundle exec bin/ots queues status
bundle exec bin/ots doctor
```

Then manually verify:

- Sign in with an existing account
- Verify existing live secrets are accessible and can be received
- If full mode: verify MFA enrollment, check RabbitMQ queue health
- Test any API integrations against the running instance
- Review structured logs for warnings

---

## Config Mapping Reference

### Environment variables

The `.env.example` file documents every supported environment variable. Key patterns:

- `AUTH_SIGNIN_ENABLED=true/false` — controls whether the signin route is active
- `AUTH_SIGNUP_ENABLED=true/false` — controls whether the signup route is active
- `GENERATED_VALUE_DISPLAY_TTL=60` — controls how long generated passwords show on the receipt page (seconds; 0 to disable)

### New configuration files

- `logging.yaml` — configures HTTP request logging verbosity and format
- `auth.defaults.yaml` — provides the default authentication configuration (used as base for both simple and full modes)
- `billing.yaml` — plan and subscription configuration

### Removed configuration

- `support_host` config is removed (was unused)
- Legacy `stathat` integration is removed
- `sysinfo` dependency is removed
- Custom rate limiting replaced with standard implementation

---

## Troubleshooting

### Migration reports validation errors

The Familia v2 migration pipeline runs validators on each record. If validators flag issues:

1. Review the error output. Most validation errors include the record key and the specific field that failed.
2. Common cause: data written by very old versions of OTS (pre-v0.22) with slightly different field shapes. The migration handles known variants, but edge cases exist.
3. If a small number of records fail: the migration logs them and continues. Review the skipped records to determine if they matter (expired secrets, deleted accounts, etc.).
4. If migration fails entirely: restore from backup, report the error output.

### CSRF errors after upgrade

v0.24.0 simplified CSRF handling to Rack::Protection only (removed the old shrimp-based approach). If you see CSRF token errors:

- Clear browser sessions/cookies for your OTS domain
- If using a reverse proxy, ensure it forwards the `Origin` and `Referer` headers

### RabbitMQ connection failures (full mode)

- Verify RabbitMQ 4.3+ is running and accessible
- Check connection credentials in your config
- The application handles connection pool crashes on Puma fork gracefully, but check logs for connection refused errors
- Health check endpoint (`/health/advanced`) reports RabbitMQ status

### Legacy Redis database auto-configuration

v0.24.0 includes auto-configuration for legacy Redis database indexes to prevent data loss. If you see messages about database index migration during startup, this is the system detecting your v0.23 Redis layout and adapting.

---

If you run into issues not covered here, please open an issue on [GitHub](https://github.com/onetimesecret/onetimesecret/issues) or submit feedback at [ca.onetimesecret.com/feedback](https://ca.onetimesecret.com/feedback).
