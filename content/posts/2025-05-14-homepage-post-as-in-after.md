---
layout: post
title: "Homepage update: Strengthening Security with a Clearer Domain Strategy"
date: 2025-05-14
authors:
  - name: Delano
    to: https://blog.onetimesecret.com/about
    avatar:
      src: /img/portrait-profile-pic-delano-2024.jpeg
image:
  src: /img/blog/2025/20250514-homepage-update-post-as-in-after.svg
badge:
  label: Engineering
readingTime: 5
draft: true
---



A recent phishing attempt exposed users to an impostor site that mirrored our interface but actually exposed the created secrets. While we were able to get this particular site shut down through Cloudflare's efforts, the incident highlighted a broader concern: users can struggle to distinguish legitimate from fraudulent services (see [Which one of these is the real onetimesecret?](https://github.com/onetimesecret/onetimesecret/issues/1233)). This reinforced the importance of having unmistakable markers of authenticity in our domain strategy, regardless of whether a specific threat is currently active.

Sollowing our [recent homepage update](/content/posts/2025-05-05-homepage-update-going-regional) emphasizing regional domains, this post details how our domain structure bolsters security through clarity and consistency—a vital consideration for a service handling sensitive information. While regionalization supports data sovereignty and compliance, our domain strategy equally focuses on providing unambiguous markers of authenticity.

## Our `.com` Domain: Separation of Concerns

![Domain Strategy Diagram](/img/blog/2025/ots-domain-strategy.svg)

* **Strategic Change:** We've moved from having our apex domain (onetimesecret.com) function as an alias for eu.onetimesecret.com to making it a completely separate codebase with static content.

* **Technical Benefits:**
  * **Distinctive User Experience:** Creates a clear visual and functional difference from impostor sites
  * **Streamlined Application Codebase:** Removing marketing content makes our open-source project simpler for self-hosted installations
  * **Independent Release Cycles:** Marketing site changes no longer require application deployments
  * **SEO Protection:** Consolidates domain authority to maintain search ranking visibility against sites using similar keywords and paid advertisements


## Domain Strategy Evolution: Before vs. After

[include 2 screenshots]

**Before Our Update:**
- Our apex domain (`onetimesecret.com`) functioned as an alias to `eu.onetimesecret.com`
- The same application codebase served both marketing and application content
- Regional instances were available but not emphasized
- Users had difficulty distinguishing legitimate sites from impostor sites

**After Our Update:**
- Apex domain (`onetimesecret.com`) is now a separate, static marketing site with distinct visual design
- All legitimate secret-creation services use consistent regional subdomains (e.g., `nz.onetimesecret.com`)
- Clear visual distinction between marketing site and application interface
- All official subdomains follow consistent naming patterns (docs, blog, status)

This evolution creates multiple visual and functional "trust markers" that make legitimate Onetime Secret services immediately recognizable to users and more difficult for impostors to replicate convincingly.


## How This Protects Our Users

Our domain strategy directly helps users verify they're using an authentic Onetime Secret service:

* **Consistent Domain Pattern**: All legitimate Onetime Secret services use the `*.onetimesecret.com` domain pattern - if you see a service on `onetimesecret.org`, `1timesecret.com`, or similar variations, it's not our legitimate service
  
* **Visual Distinction**: Our marketing site now has a distinctly different appearance from our application interface - impostors typically copy just one look, making inconsistencies easier to spot

* **Regional Clarity**: Users can confirm they're connected to their chosen regional instance (e.g., `eu.onetimesecret.com`) - phishing sites rarely implement the complete regional architecture

* **Official Subdomain Consistency**: All legitimate services follow the same subdomain pattern (docs, blog, status) - be suspicious of unusual subdomains that don't match our established pattern


## Conclusion: Security Through Clarity

Our domain strategy serves multiple purposes:

1. **Security Reinforcement:** Clear domain patterns and visual distinctions make it harder for malicious actors to create convincing imitations
2. **User Confidence:** Consistent patterns make it easier for users to verify they're on legitimate sites
3. **Technical Robustness:** Separate codebases for marketing and application improve development velocity and maintainability
4. **Data Sovereignty:** Regional domains ensure data stays in the chosen jurisdiction
5. **Development Quality:** Our .dev environment mirrors production structure, ensuring higher reliability

This approach represents security by design - building protection directly into our infrastructure rather than as an afterthought. By consolidating all legitimate services under *.onetimesecret.com and creating distinct experiences between our marketing site and application interface, we're significantly raising the bar for potential phishing attempts.

Our next post will provide a detailed verification guide to help users ensure they're always using an authentic Onetime Secret service.


---


## Addendum: Quick Reference

::callout{type="info" icon="i" title="Quick Reference: Technical Terms"}
* **Apex domain**: The "root" domain of a website (e.g., `example.com` without any prefixes).
* **Top-Level Domain** (TLD): - the last segment of a domain name (e.g., .com, .dev, .org).
* **HSTS preload**: A security feature that forces browsers to always use secure HTTPS connections. See [hstspreload.org](https://hstspreload.org/?domain=onetimesecret.com).
* **Origin separation**: Technical isolation between different website domains for security purposes.
* **Cookie jars**: Storage areas in browsers where websites store small bits of data.
::
