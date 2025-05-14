---
layout: post
title: "Homepage update: Security Through Consistency"
date: 2025-05-14
authors:
  - name: Delano
    to: https://blog.onetimesecret.com/about
    avatar:
      src: /img/portrait-profile-pic-delano-2024.jpeg
image:
  src: /img/blog/2025/ots-domain-strategy.svg
badge:
  label: Engineering
readingTime: 5
---

![Domain Strategy Diagram](/img/blog/2025/ots-domain-strategy.svg)

Following our [recent homepage update](/content/posts/2025-05-05-homepage-update-going-regional) that emphasized our regional domains (e.g., `eu.onetimesecret.com`, `us.onetimesecret.com`), we want to elaborate on a crucial aspect of our online presence: our domain strategy. While regionalization supports data sovereignty and compliance, an equally vital goal of our domain structure is to provide unambiguous markers of authenticity.

Recently, we encountered a sophisticated phishing attempt where an impostor site mirrored our interface but actually exposed all created secrets. Despite getting the site shut down through Cloudflare, many users were confused about legitimacy. This incident reinforced the importance of having unmistakable markers of authenticity in our domain strategy.

## Our `.com` Domain: Separation of Concerns

* **Strategic Change:** We've moved from having our apex domain (onetimesecret.com) function as an alias for eu.onetimesecret.com to making it a completely separate codebase with static content.

* **Technical Benefits:**
  * **Distinctive User Experience:** Creates a clear visual and functional difference from impostor sites
  * **Streamlined Application Codebase:** Removing marketing content makes our open-source project simpler for self-hosted installations
  * **Independent Release Cycles:** Marketing site changes no longer require application deployments
  * **SEO Protection:** Consolidates domain authority to maintain search ranking visibility against sites using similar keywords and paid advertisements

This unified approach minimizes ambiguity, making it harder for malicious actors to create convincing imitations on other TLDs.

## Our `.dev`: A True Non-Production Mirror

Our `.dev` TLD serves exclusively for non-production environments, providing clear separation from production systems:

* **Clear Prod/Non-Prod Distinction:** `.onetimesecret.dev` creates an unmistakable boundary between our production environment (`*.onetimesecret.com`) and all non-production activities.

* **Apex Domain Mirroring:** We mirror our production domain structure (e.g., `us.onetimesecret.dev` corresponding to `us.onetimesecret.com`). This allows development environments to replicate production DNS configurations with high fidelity, reducing "works on my machine" issues.

* **Technical Advantages:** This approach provides strict origin separation (HSTS preload), clean cookie jars, and clear visual distinction for developers and testers.

This avoids subtle problems that arise when non-production environments are subdomains of the production TLD, ensuring cleaner separation of concerns.

## Our Domain Structure

* **`onetimesecret.com`**: Marketing site and portal to regional applications
* **Regional domains** (`eu.onetimesecret.com`, `us.onetimesecret.com`, etc): Main application instances with share-nothing architecture, providing data sovereignty and operational scalability
* **Supporting domains**:
  * **`docs.onetimesecret.com`**: Comprehensive documentation
  * **`blog.onetimesecret.com`**: Product updates and engineering insights
  * **`status.onetimesecret.com`**: Service status and incident reporting
* **`*.onetimesecret.dev`**: Exclusively for non-production environments, clearly separated from production

## Conclusion: Security Through Clarity

Our domain strategy serves multiple purposes:

1. **Security Reinforcement:** Clear domain patterns make it harder for malicious actors to create convincing imitations
2. **Data Sovereignty:** Regional domains ensure data stays in the chosen jurisdiction
3. **Technical Robustness:** Separate codebases for marketing and application improve development velocity and maintainability
4. **Development Quality:** Our .dev environment mirrors production structure, ensuring higher reliability

By consolidating all legitimate services under *.onetimesecret.com and creating distinct experiences between our marketing site and application interface, we're making it significantly harder for bad actors to create convincing phishing sites.

A separate post will detail specific verification steps to ensure you're always using an authentic OnetimeSecret service.
