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


## Visual Verification: Check all the links

Authentic Onetime Secret services have consistent visual markers and all the links will work. Consistent header/footer links to official documentation, blog, and status pages

- **Regional Domain Pattern**: All application interfaces operate on regional subdomains (`eu.onetimesecret.com`, `nz.onetimesecret.com`)
- **Interface Consistency**: Clean, minimalist design with purple gradient accents
- **Navigation Links**: 

<figure class="mb-6">
  <img src="/img/blog/2025/20250515-verifying-onetimesecret.svg" alt="Verification guide for OnetimeSecret services" class="rounded-lg shadow-md w-full">
  <figcaption class="text-sm text-gray-600 mt-2 text-center">Visual comparison of authentic vs impostor domains</figcaption>
</figure>

## Verification Chain

To establish trust in our service:

- **GitHub Repository**: [github.com/onetimesecret/onetimesecret](https://github.com/onetimesecret/onetimesecret)
- **BlueSky**: [@onetimesecret.com](https://bsky.app/profile/onetimesecret.com)
- **Docker Hub**: [hub.docker.com/r/onetimesecret/onetimesecret](https://hub.docker.com/r/onetimesecret/onetimesecret)
- **Internet Archive**: [View our 10+ year history](https://web.archive.org/web/*/onetimesecret.com)
- [One-time Secret: Share passwords etc with URIs that work only once (](https://news.ycombinator.com/item?id=3207489) -- 219 points by delano on Nov 7, 2011 | hide | past | favorite | 104 comments
- **Service Status**: [status.onetimesecret.com](https://status.onetimesecret.com)


## Technical Verification

For technical users, verify these elements:

- **Domain Registration**: Official domains registered since 2011 (verify via [WHOIS](https://whois.gandi.net/en/results?search=onetimesecret.com))
- **HTTPS Enforcement**: All legitimate services enforce HTTPS with HSTS (see [HSTS Preload List](https://hstspreload.org/?search=onetimesecret.com))
- **Create a dummy secret**: Enter some gobbeldygook and view the secret link. Are you able to view the secret more than once?


## Red Flags: Impostor Indicators

Be suspicious of services with:

- **Domain Variations**: Avoid lookalikes such as `one-timesecret.com`, `1timesecret.org`, `onetimesecret-secure.com`, and any domains with subtle character substitutions like `onetímesecret.com` (using the accented letter "í" instead of regular "i")
- **Missing Regional Prefix**: Legitimate services always use regional prefixes (eu., us., etc.). To test any suspicious domain, manually try adding these prefixes (e.g., eu.suspiciousdomain.com) - on genuine sites these will work properly, while impostor sites typically won't have functioning regional subdomains


## Reporting Impostors

Found a suspicious site? Report it:

- Email: security@onetimesecret.com
- Subject: "Impostor Site Report: [domain]"
- Include: URL, screenshots, how you discovered it

Our team works with hosting providers and security organizations to swiftly remove fraudulent services.


---

Remember: Authentic OnetimeSecret services **always** use `*.onetimesecret.com` domains with regional prefixes for application interfaces. When in doubt, check if any of the regional prefixes work as expected.
