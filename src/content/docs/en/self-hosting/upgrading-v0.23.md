---
title: Upgrading to v0.23.0
description: Guide for upgrading Onetime Secret to v0.23.0 — maintenance release with config migration
sidebar:
  order: 6
---

v0.23.0 is a maintenance release that converts the main config file (`etc/config.yaml`) from symbol keys to string keys. This is part of a series of changes preparing for the v0.24.0 release.

## Before You Start

1. **Back up your configuration files.** Especially `etc/config.yaml` and any custom `.env` files.
2. **Back up your Redis data.** `redis-cli BGSAVE` or equivalent.

## Migration Required

The app will halt on boot if it detects the old config format. You have three options for handling the migration.

### Option 1: Auto-migrate (recommended)

Set the `CONFIG_MIGRATE=auto` environment variable. The migration runs automatically before the app starts.

```bash
docker run -p 3000:3000 \
    -e SECRET=$SECRET \
    -e REDIS_URL=redis://your-redis-host:6379/0 \
    -e CONFIG_MIGRATE=auto \
    -v $(pwd)/etc/config.yaml:/app/etc/config.yaml \
    onetimesecret/onetimesecret:v0.23.0
```

:::caution
If you mount your config file (e.g. `-v $(pwd)/etc/config.yaml:/app/etc/config.yaml`), it must **not** be mounted read-only (`:ro`) or auto-migration will fail since it needs to write the converted file.
:::

### Option 2: Manual migration

Run the migration script yourself before starting the app:

```bash
bundle exec ruby migrations/20250727-1523_01_convert_symbol_keys.rb --dry-run
```

Review the output, then apply:

```bash
bundle exec ruby migrations/20250727-1523_01_convert_symbol_keys.rb --run
```

### Option 3: Skip (not recommended)

Set `CONFIG_MIGRATE=skip` to bypass the migration check. The app will attempt to start with the old config format, which may cause unexpected behavior.

## What the Migration Does

The migration converts YAML keys in `etc/config.yaml` from Ruby symbol format (`:key`) to plain string format (`key`). No values are changed — only the key syntax is updated. The migration script creates a backup of your original file before making changes.

## Boot Prompt

If you start the app without setting `CONFIG_MIGRATE`, you'll see this:

```
INFO: Running entrypoint.sh...

ERROR: Migrations needed before startup

Pending migrations:
  bundle exec ruby migrations/20250727-1523_01_convert_symbol_keys.rb --dry-run

Options:
  1. Auto-migrate: Restart with CONFIG_MIGRATE=auto
  2. Manual: Run each migration with --run flag
  3. Skip: Set CONFIG_MIGRATE=skip (not recommended)
```

## Verify

After starting, confirm everything is working:

- Create a secret, retrieve it
- If authentication is enabled: sign in, sign out
- Check logs for any warnings about config format

---

If you run into issues not covered here, please open an issue on [GitHub](https://github.com/onetimesecret/onetimesecret/issues).
