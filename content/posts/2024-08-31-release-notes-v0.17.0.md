---
layout: post
title: "Onetime Secret v0.17.0: Foundation for the Future"
date: 2024-08-31
authors:
  - name: Delano
    to: https://blog.onetimesecret.com/about
    avatar:
      src: /img/portrait-profile-pic-delano-2024.jpeg
image:
  src: /img/blog/2024/release-0.17.svg
badge:
  label: Release
readingTime: 6
---

This release focuses on foundational improvements and technical debt reduction. While maintaining the core functionality and user experience, v0.17.0 introduces substantial backend enhancements that set the stage for future innovations.

## Key Updates:

1. Major Codebase Refactoring:
   - Comprehensive cleanup of Redis persistence code
   - Upgraded to Familia v1.0, enhancing data modeling capabilities
   - Improved separation between data models and persistence layer

2. Performance and Stability:
   - Added caching for Vite manifest to improve load times
   - Increased TTL (Time To Live) for EmailReceipt and StripeEvent
   - Various bug fixes and optimizations

3. Developer Experience:
   - Modularized logic classes for better maintainability
   - Updated build processes and Docker optimization

4. User Experience Refinements:
   - Improved readability by enhancing distinction between letter 'o' and number '0'
   - Fixed dark mode transition issues

5. Security and Compliance:
   - Enhanced email validation
   - Improved handling of custom domains and metadata


For a complete list of changes and technical details, visit our [GitHub repository](https://github.com/onetimesecret/onetimesecret/releases/tag/v0.17.0).
