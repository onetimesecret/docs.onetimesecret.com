---
layout: post
title: "Domain Strategy Reengineered: Building Verification into Our Architecture"
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
---

A recent phishing attempt exposed users to an impostor site that mirrored our interface but actually exposed secrets. While Cloudflare helped shut down this particular site, the incident highlighted a broader concern: user can struggle to distinguish legitimate from fraudulent services (see [Which one of these is the real onetimesecret?](https://github.com/onetimesecret/onetimesecret/issues/1233)).

Following our [recent homepage update](/content/posts/2025-05-05-homepage-update-going-regional) emphasizing regional domains, this post details how our domain structure bolsters security through clarity and consistency—a vital consideration for a service handling sensitive information.

## Our `.com` Domain: Separation of Concerns

<div class="flex justify-center items-center my-10">
  <a href="https://onetimesecret.com/" class="text-center inline-block">
    <span class="font-brand text-3xl sm:text-4xl md:text-5xl
                 bg-clip-text text-transparent
                 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500
                 animate-flowing-colors
                 hover:animate-bounce
                 transition-all duration-300 ease-in-out
                 transform hover:scale-105
                 rounded-xl
                 dark:border-brand-600">
      onetimesecret.com
    </span>
  </a>
</div>


**Strategic Change:** We've moved our apex domain (onetimesecret.com) from functioning as an alias for eu.onetimesecret.com to a completely separate codebase with static content. While standard practice for most products, this is new for our service which has maintained a functional homepage since launch over 10 years ago.


**Technical Benefits:**
  * **Distinctive User Experience:** Creates a clear visual and functional difference from impostor sites
  * **Streamlined Application Codebase:** Removing marketing content makes our open-source project simpler for self-hosted installations
  * **Independent Release Cycles:** Marketing site changes no longer require application deployments
  * **SEO Protection:** Consolidates domain authority to maintain search ranking visibility against sites using similar keywords and paid advertisements


## Domain Strategy Evolution: Before vs. After

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <figure class="mb-6">
    <strong>New Homepage</strong>
    <img src="/img/blog/2025/20250514-onetime-homepage-new.jpeg" alt="New Onetime Secret marketing homepage" class="rounded-lg shadow-md w-full">
    <figcaption class="text-sm text-gray-600 mt-2 text-center">Our new marketing homepage at onetimesecret.com</figcaption>
  </figure>
  <figure class="mb-6">
    <strong>Application Interface</strong>
    <img src="/img/blog/2025/20250514-onetime-homepage-project.jpeg" alt="Onetime Secret application interface" class="rounded-lg shadow-md w-full">
    <figcaption class="text-sm text-gray-600 mt-2 text-center">Application interface at regional domains (e.g., eu.onetimesecret.com)</figcaption>
  </figure>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <figure class="mb-6">

  
**After Our Update:**
- Apex domain (`onetimesecret.com`) is now a separate, static marketing site with distinct visual design
- All legitimate secret-creation services use consistent regional subdomains (e.g., `nz.onetimesecret.com`)
- Clear visual distinction between marketing site and application interface
- All official subdomains follow consistent naming patterns (docs, blog, status)
  </figure>
  <figure class="mb-6">


**Before Our Update:**
- Our apex domain (`onetimesecret.com`) functioned as an alias to `eu.onetimesecret.com`
- The same application codebase served both marketing and application content
- Regional instances were available but not emphasized
- Users had difficulty distinguishing legitimate sites from impostor sites

  </figure>
</div>


## How This Protects Our Users

Our domain strategy creates clear verification markers to help users identify authentic Onetime Secret services:

* **Consistent Domain Pattern**: All legitimate services use the `*.onetimesecret.com` pattern - if you see `onetímesecret.org`, `1timesecret.com`, or similar variations, it's not our service.
  
* **Visual Distinction**: Our marketing site now has a distinctly different appearance from our application interface - impostors typically copy just one look.

* **Regional Subdomains**: Legitimate services always use regional identifiers (e.g., `eu.onetimesecret.com`) - phishing sites rarely implement complete regional architecture

* **Official Naming Conventions**: All legitimate subdomains follow consistent patterns (docs, blog, status).



## Conclusion: Engineering Security Through Domain Architecture

Our domain restructuring delivers concrete security improvements while enhancing our development workflow:

1. **Clear User Verification**: Consistent domain patterns provide intuitive verification markers
2. **Infrastructure Protection**: Domain separation creates technical barriers against impersonation
3. **Development Efficiency**: Decoupled codebases enable independent release cycles
4. **Compliance Enhancement**: Regional structure supports data sovereignty requirements

This architectural approach transforms our domain strategy from a potential security vulnerability into a defensive asset.

Our next post will provide a detailed verification guide for users to validate authentic Onetime Secret services.


![Domain Strategy Diagram](/img/blog/2025/20250514-homepage-update-post-as-in-after.svg)


---


## Addendum: Quick Reference

::callout{type="info" icon="i" title="Quick Reference: Technical Terms"}
* **Apex domain**: The "root" domain of a website (e.g., `example.com` without any prefixes).
* **Top-Level Domain** (TLD): - the last segment of a domain name (e.g., .com, .dev, .org).
* **HSTS preload**: A security feature that forces browsers to always use secure HTTPS connections. See [hstspreload.org](https://hstspreload.org/?domain=onetimesecret.com).
* **Origin separation**: Technical isolation between different website domains for security purposes.
* **Cookie jars**: Storage areas in browsers where websites store small bits of data.
::
