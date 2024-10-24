---
layout: post
title: Onetime Secret v0.16.0 Release - Modern UI and Enhanced Development
date: 2024-07-29
authors:
  - name: Delano
    to: https://blog.onetimesecret.com/about
    avatar:
      src: /img/portait-profile-pic-delano-2024.jpeg
image:
  src: /img/blog/2024/release-0.16.svg
badge:
  label: Release
readingTime: 5
---


This major update brings significant modernization to Onetime Secret's technology stack and user interface, while maintaining its core functionality as a secure, one-time sharing platform for sensitive information.

## Key Updates

1. Frontend Modernization:
   - Migrated from Bootstrap to Tailwind CSS for improved styling flexibility
   - Integrated Vue.js 3 for enhanced interactivity and performance
   - Implemented dark mode for better user experience across lighting conditions

2. API Improvements:
   - Moved existing API to v1 subdirectory, preparing for future v2 API development
   - This change ensures backwards compatibility while allowing for future enhancements

3. Development Workflow Enhancements:
   - Introduced new development settings for easier local setup
   - Updated build process using pnpm for dependency management

4. Security and Performance:
   - Updated session ID generation method for improved security
   - Various backend improvements and dependency updates

5. User Experience Refinements:
   - Consistent renaming to "Onetime Secret" across the platform
   - Improved SVG rendering and icon alignment
   - Refactored account page as a Vue component for better interactivity

## For Developers and Administrators:

- Template files have been renamed from .mustache to .html
- New build steps are required for frontend assets
- Configuration file updates are necessary for development environments

This release represents a significant step forward in Onetime Secret's technical capabilities while maintaining its core mission of secure, one-time sharing of sensitive information.

For a complete list of changes and technical details, visit our [GitHub repository](https://github.com/onetimesecret/onetimesecret/releases/tag/v0.16.0).
