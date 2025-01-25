---
layout: post
title: "Onetime Secret v0.19.0: Custom Branding & Type Safety"
date: 2025-01-24
authors:
  - name: Delano
    to: https://blog.onetimesecret.com/about
    avatar:
      src: /img/portait-profile-pic-delano-2024.jpeg
image:
  src: /img/blog/2025/release-0.19-sparkle-enhanced.svg
badge:
  label: Release
readingTime: 2
---

Today we're announcing Onetime Secret v0.19.0, a release focused on enhanced type safety, robust error handling, and custom branding capabilities.

## Key Improvements

### Custom Branding for Brands
Secret sharing now adapts to your brand identity with:
- Custom logos and styling
- Branded recipient experiences
- Consistent visual language throughout

### Enhanced Type Safety
We've rebuilt our type system from the ground up:
- Comprehensive TypeScript implementation
- Zod schemas for runtime validation
- Robust error boundaries and type checking
- Improved data integrity across all operations

### Security Framework Enhancements
Critical security improvements include:
- Content Security Policy (CSP) implementation with nonce support
- Enhanced session management
- Improved rate limiting for API access
- Rack middleware freezing in production

### Error Handling
We've significantly improved our error management:
- Client-side exception tracking system
- Enhanced visibility into frontend issues
- Structured error reporting
- Better feedback on system state

## For Developers
Notable improvements for self-hosted instances:
- Standardized database migration system
- Refined Docker implementation
- Enhanced installation documentation

## Looking Forward
These foundational improvements strengthen our commitment to secure, one-time sharing of sensitive information. Each secret link still works exactly once before disappearing forever - now with improved reliability and type safety.

## Getting Started
- Use the hosted service: [onetimesecret.com](https://onetimesecret.com)
- Self-host: [GitHub repository](https://github.com/onetimesecret/onetimesecret)
- Review changes: [Full v0.19.0 release notes](https://github.com/onetimesecret/onetimesecret/releases/tag/v0.19.0)

Thank you to everyone who contributed to making this release possible.


::ImageModal{src="/img/blog/2025/release-0.19-sparkle-enhanced.svg" alt="" width="600"}
::
