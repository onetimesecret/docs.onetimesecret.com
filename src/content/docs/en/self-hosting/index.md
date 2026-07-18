---
title: Self-Hosting Overview
description: Complete guide to running your own Onetime Secret instance
sidebar:
  order: 1
---

Run your own private instance of Onetime Secret with full control over your data, security, and deployment.

:::tip[Current release: v0.25]
The current stable release is **v0.25** (the `main` branch). It runs in two modes:

- **Simple mode** — the easiest path. Only needs Redis and a couple of environment variables. Accounts work the same as they always have. Start here with the [Quick Start](#quick-start-options) below.
- **Full mode** — adds account features (MFA, SSO, WebAuthn, organizations) backed by PostgreSQL and RabbitMQ.

If you are coming from v0.22 or v0.23, follow the [Upgrading to v0.24+](./upgrading-v0-24) guide, which covers the configuration and data-model changes and how to pick an auth mode.
:::

## Why Self-Host?

Self-hosting Onetime Secret gives you:

- **Complete data control** - All secrets remain on your infrastructure and network
- **Custom security policies** - Configure authentication, privacy options, and access controls
- **Compliance** - Meet regulatory requirements for data handling
- **Custom branding** - Customize the interface for your organization

## Quick Start Options

Choose the deployment method that best fits your environment:

### Docker (Recommended)
```bash
# Start Redis and Onetime Secret
docker run -p 6379:6379 -d redis:bookworm
docker run -p 3000:3000 -d \
  -e REDIS_URL=redis://host.docker.internal:6379/0 \
  -e SECRET="$(openssl rand -hex 32)" \
  onetimesecret/onetimesecret:v0.25.11
```

Access at `http://localhost:3000`.

### Manual Installation
For production environments requiring custom configurations.

See our [Installation & Deployment](./installation) guide for detailed steps.

## What's Included

Your self-hosted instance includes:

- **Web interface** - Full-featured UI for creating and sharing secrets
- **REST API** - Programmatic access for integrations
- **Multi-language support** - Available in 12+ languages
- **Custom domains** - Use your own domain and branding


## System Requirements

**Recommended:**
- 2+ CPU cores
- 2GB+ RAM
- 10GB+ disk space
- Redis for session storage
- Node.js 22+ (for development)

## Next Steps

1. **[Getting Started](./getting-started)** - Step-by-step setup guide
2. **[Installation & Deployment](./installation)** - Detailed deployment options
3. **[Configuration Reference](./configuration)** - Complete settings documentation

---

_Ready to get started? Follow our [Getting Started](./getting-started) guide._
