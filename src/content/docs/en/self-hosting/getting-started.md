---
title: Getting Started
description: Quick setup guide to get your self-hosted Onetime Secret instance running
sidebar:
  order: 2
---

This guide will get you up and running with a self-hosted Onetime Secret instance in minutes.

## Prerequisites

- **1GB+ RAM** for optimal performance
- **Redis storage note**: Depending on your Redis configuration, secrets can be stored entirely in memory without ever being written to disk for enhanced security

## Method 1: Docker (Recommended)

The fastest way to get started uses Docker with minimal configuration.

### 1. Start Redis

```bash
docker run -p 6379:6379 -d redis:bookworm
```

### 2. Generate Secret Key

```bash
# Generate and store a persistent secret key
openssl rand -hex 32 > .ots_secret
chmod 600 .ots_secret
echo "Secret key saved to .ots_secret (keep this file secure!)"
```

### 3. Run Onetime Secret

```bash
# Run the container using the secret key
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(cat .ots_secret)" \
  -e HOST=localhost:3000 \
  -e SSL=false \
  -e RACK_ENV=production \
  onetimesecret/onetimesecret:latest
```

### 4. Access Your Instance

Open your browser to:
- **Web Interface**: http://localhost:3000
- **API Endpoint**: http://localhost:3000/api/v2/status

## Method 2: Manual Installation

For those who prefer manual setup, you'll need:

- **Ruby 3.2+** (may not be available in default system packages)
- **Redis 5+** or **Valkey** (Redis alternative)
- **Node.js 22+** and **pnpm** (only required for development and building frontend assets)

You'll need to build the frontend assets with `pnpm install && pnpm run build:local` before running the application.

See [INSTALL.md](https://github.com/onetimesecret/onetimesecret/blob/main/INSTALL.md) for complete manual installation details.

## Verification

1. Navigate to http://localhost:3000
2. Create a test secret to verify everything works
3. Check the API status at http://localhost:3000/api/v2/status

## Admin Setup

To create an admin user, add email addresses to the `:colonels:` section in your config file, then sign up with one of those emails to automatically get admin access.

**Note**: The admin area currently has limited functionality - it's readonly config viewing with no user management. More features are planned for future releases.

## Next Steps

Now that your instance is running:

1. **[Configure your deployment](./installation)** for production use
2. **[Review configuration options](./configuration)** for customization

## Getting Help

- **Documentation**: Browse our [configuration reference](./configuration)
- **Community**: Join discussions on [GitHub](https://github.com/onetimesecret/onetimesecret/discussions)
- **Issues**: Report bugs on our [issue tracker](https://github.com/onetimesecret/onetimesecret/issues)
