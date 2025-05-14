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

A recent phishing attempt exposed users to an impostor site that mirrored our interface but actually exposed secrets. While Cloudflare helped shut down this particular site, the incident highlighted a broader concern: user can struggle to distinguish legitimate from fraudulent services (see [Which one of these is the real onetimesecret?](https://github.com/onetimesecret/onetimesecret/issues/1233)).

Following our [recent homepage update](/content/posts/2025-05-05-homepage-update-going-regional) emphasizing regional domains, this post details how our domain structure bolsters security through clarity and consistency—a vital consideration for a service handling sensitive information.

## Our `.com` Domain: Separation of Concerns

**Strategic Change:** We've moved from having our apex domain (onetimesecret.com) function as an alias for eu.onetimesecret.com to making it a completely separate codebase with static content. This is not revolutionary and is how most products, it's just new for us since the site launched over 10 years ago and has always maintained a productive homepage.

![Domain Strategy Diagram](/img/blog/2025/20250514-homepage-update-post-as-in-after.svg)


* **Technical Benefits:**
  * **Distinctive User Experience:** Creates a clear visual and functional difference from impostor sites
  * **Streamlined Application Codebase:** Removing marketing content makes our open-source project simpler for self-hosted installations
  * **Independent Release Cycles:** Marketing site changes no longer require application deployments
  * **SEO Protection:** Consolidates domain authority to maintain search ranking visibility against sites using similar keywords and paid advertisements


## Domain Strategy Evolution: Before vs. After

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <figure class="mb-6">
    <img src="/img/blog/2025/20250514-onetime-homepage-new.jpeg" alt="New Onetime Secret marketing homepage" class="rounded-lg shadow-md w-full">
    <figcaption class="text-sm text-gray-600 mt-2 text-center">Our new marketing homepage at onetimesecret.com</figcaption>
  </figure>
  <figure class="mb-6">
    <img src="/img/blog/2025/20250514-onetime-homepage-project.jpeg" alt="Onetime Secret application interface" class="rounded-lg shadow-md w-full">
    <figcaption class="text-sm text-gray-600 mt-2 text-center">Application interface at regional domains (e.g., eu.onetimesecret.com)</figcaption>
  </figure>
</div>

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

Our domain strategy creates clear verification markers to help users identify authentic Onetime Secret services:

* **Consistent Domain Pattern**: All legitimate services use the `*.onetimesecret.com` pattern - if you see `onetímesecret.org`, `1timesecret.com`, or similar variations, it's not our service.
  
* **Visual Distinction**: Our marketing site now has a distinctly different appearance from our application interface - impostors typically copy just one look.

* **Regional Subdomains**: Legitimate services always use regional identifiers (e.g., `eu.onetimesecret.com`) - phishing sites rarely implement complete regional architecture

* **Official Naming Conventions**: All legitimate subdomains follow consistent patterns (docs, blog, status).



## Conclusion: Security Through Clarity

Beyond user verification benefits, our domain strategy delivers key technical and business advantages:

1. **Security by Design**: Protection is built directly into our infrastructure rather than added as an afterthought
2. **Legal Compliance**: Domain structure ensures compliance and data sovereignty requirements are met
3. **Technical Separation**: Distinct codebases improve development velocity and maintainability
4. **Brand Protection**: Consistent identity strengthens our position against imitators

This strategic approach significantly raises the barrier for potential phishing attempts while improving our development workflow and compliance posture.

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
