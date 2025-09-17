---
title: Self-Hosting Overview
description: Complete guide to running your own Onetime Secret instance
sidebar:
  order: 1
---

# Self-Hosting Onetime Secret

Run your own private instance of Onetime Secret with full control over your data, security, and deployment.

## Why Self-Host?

Self-hosting Onetime Secret gives you:

- **Complete data control** - All secrets remain on your infrastructure
- **Custom security policies** - Configure authentication, encryption, and access controls
- **Network isolation** - Run entirely within your private network
- **Compliance** - Meet regulatory requirements for data handling
- **Custom branding** - White-label the interface for your organization

## Quick Start Options

Choose the deployment method that best fits your environment:

### Docker (Recommended)
The fastest way to get started with minimal configuration.

```bash
# Basic setup with Docker Compose
git clone https://github.com/onetimesecret/onetimesecret.git
cd onetimesecret
docker-compose up -d
```

Access your instance at `http://localhost:7143`

### Manual Installation
For production environments requiring custom configurations.

See our [Installation & Deployment](./installation) guide for detailed steps.

## What's Included

Your self-hosted instance includes:

- **Web interface** - Full-featured UI for creating and sharing secrets
- **REST API** - Programmatic access for integrations
- **Admin dashboard** - User management and system monitoring
- **Multi-language support** - Available in 12+ languages
- **Custom domains** - Use your own domain and branding

## System Requirements

**Minimum:**
- 1 CPU core
- 512MB RAM
- 1GB disk space
- Ruby 3.2+ or Docker

**Recommended:**
- 2+ CPU cores
- 2GB+ RAM
- 10GB+ disk space
- Redis for session storage
- PostgreSQL for data persistence

## Next Steps

1. **[Getting Started](./getting-started)** - Step-by-step setup guide
2. **[Installation & Deployment](./installation)** - Detailed deployment options
3. **[Configuration Reference](./configuration)** - Complete settings documentation

## Support

- **Documentation** - Comprehensive guides and API references
- **Community** - GitHub discussions and issue tracker
- **Enterprise** - Professional support and consulting available

Ready to get started? Follow our [Getting Started](./getting-started) guide.
