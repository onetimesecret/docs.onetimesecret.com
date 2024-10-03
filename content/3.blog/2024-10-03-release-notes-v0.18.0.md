---
layout: post
title: "Onetime Secret v0.18.0: Enjoying the Vue"
date: 2024-10-04
authors:
  - name: Delano
    to: https://docs.onetimesecret.com/about
    avatar:
      src: /img/portait-profile-pic-delano-2024.jpeg
badge:
  label: Release
readingTime: 2
---

Onetime Secret v0.18.0 brings significant improvements to our secure, one-time sharing platform. This release focuses on enhancing performance, security, and user experience.

## Key Updates


### End User Improvements

- Completely redesigned user interface for faster loading and smoother interactions
- Enhanced internationalization support for a better experience across different languages
- Improved error handling for clearer communication during issues



### Developer and System Administrator Changes

- Transition to a Vue-based frontend architecture
- Reorganized API with cleaner separation between v1 and v2 endpoints
- Configuration file moved from `etc/config` to `etc/config.yaml`
- Improved Docker build process with enhanced tagging and manifest generation
- Conversion of locale files from YAML to JSON


## Important Notes

This update includes backwards-incompatible changes. If you're self-hosting Onetime Secret, please review the full release notes for detailed migration instructions.

> [!WARNING]
> **Major, backwards-incompatible file movements between v0.17.3 and v0.18.0:**
> * The main config file `etc/config` is now `etc/config.yaml`
> * Locale files have been converted from YAML to JSON and moved to the front end Vue app. e.g. `etc/locales/en` is now `src/locales/en.json`.
> * HTML template files have been pared down to just a handful for errors and passing settings from the ruby app to vue. The UI is now fully served from the Vue frontend. The `src/views` directory contains the page components which is the closest analogy to the HTML files in `templates/web`.
Thank you for providing the detailed release notes for Onetime Secret v0.18.0. I'll craft an updated summary that aligns with the communication guidelines and highlights the key changes while clearly distinguishing between technical and user-facing updates.


For a complete list of changes and technical details, visit our [GitHub repository](https://github.com/onetimesecret/onetimesecret/releases/tag/v0.18.0).
