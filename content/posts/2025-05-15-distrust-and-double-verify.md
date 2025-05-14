---
layout: post
title: "Will the real onetimesecret.com please stand up"
date: 2025-05-15
authors:
  - name: Delano
    to: https://blog.onetimesecret.com/about
    avatar:
      src: /img/portrait-profile-pic-delano-2024.jpeg
image:
  src: /img/blog/2025/20250515-verifying-onetimesecret.svg
badge:
  label: Security
readingTime: 5
---

Following our [domain architecture update](/content/posts/2025-05-14-homepage-post-as-in-after), this guide provides concrete methods to verify authentic OnetimeSecret services and identify impostor sites.

## Visual Verification: Know Our Look

Authentic OnetimeSecret services have consistent visual markers:

- **Regional Domain Pattern**: All application interfaces operate on regional subdomains (`eu.onetimesecret.com`, `nz.onetimesecret.com`)
- **Interface Consistency**: Clean, minimalist design with purple gradient accents
- **Footer Elements**: Every page displays "© 2011-2025 Delano Mandelbaum"
- **Navigation Links**: Consistent header/footer links to official documentation, blog, and status pages

<figure class="mb-6">
  <img src="/img/blog/2025/20250515-verifying-onetimesecret.svg" alt="Verification guide for OnetimeSecret services" class="rounded-lg shadow-md w-full">
  <figcaption class="text-sm text-gray-600 mt-2 text-center">Visual comparison of authentic vs impostor domains</figcaption>
</figure>

## Technical Verification

For technical users, verify these elements:

- **SSL Certificates**: All legitimate domains use certificates issued to "ONETIMESECRET LLC"
- **Domain Registration**: Official domains registered since 2011 (verify via [WHOIS](https://whois.gandi.net/en/results?search=onetimesecret.com))
- **HTTPS Enforcement**: All legitimate services enforce HTTPS with HSTS
- **API Documentation**: Points to api.onetimesecret.com

## Red Flags: Impostor Indicators

Be suspicious of services with:

- **Domain Variations**: Avoid `one-timesecret.com`, `1timesecret.org`, `onetimesecret-secure.com`
- **Character Substitutions**: Like `onetímesecret.com` (note the accent mark)
- **TLD Variations**: Only `.com` is official (not `.org`, `.net`, `.app`)
- **Missing Regional Prefix**: Direct feature access without regional subdomain
- **Design Inconsistencies**: Different color schemes, layouts, or excessive ads
- **Certificate Mismatches**: SSL certificates not issued to "ONETIMESECRET LLC"

## When You Find a Suspicious Site

1. **Do Not Use**: Never enter sensitive information
2. **Document Evidence**: Take screenshots/note the URL
3. **Report Details**: Submit domain and screenshots to security@onetimesecret.com
4. **Warn Others**: Alert colleagues if the site targets your organization

## Verification Chain

To establish trust in our service:

- **GitHub Repository**: [github.com/onetimesecret/onetimesecret](https://github.com/onetimesecret/onetimesecret)
- **Docker Hub**: [hub.docker.com/r/onetimesecret/onetimesecret](https://hub.docker.com/r/onetimesecret/onetimesecret)
- **Internet Archive**: [View our 10+ year history](https://web.archive.org/web/*/onetimesecret.com)
- **Service Status**: [status.onetimesecret.com](https://status.onetimesecret.com)

## Reporting Impostors

Found a suspicious site? Report it:

- Email: security@onetimesecret.com
- Subject: "Impostor Site Report: [domain]"
- Include: URL, screenshots, how you discovered it

Our team works with hosting providers and security organizations to swiftly remove fraudulent services.

---

Remember: Authentic OnetimeSecret services **always** use `*.onetimesecret.com` domains with regional prefixes for application interfaces. When in doubt, check if any of the regional prefixes work as expected.
