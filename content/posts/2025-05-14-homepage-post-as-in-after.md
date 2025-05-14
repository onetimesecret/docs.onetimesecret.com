---
layout: post
title: "Homepage Update: How we use our domains"
date: 2025-05-05
authors:
  - name: Delano
    to: https://blog.onetimesecret.com/about
    avatar:
      src: /img/portrait-profile-pic-delano-2024.jpeg
image:
  src: /img/blog/2025/20250505-homepage-going-regional-rev2.svg
badge:
  label: Operations
readingTime: 7
---

![Domain Strategy Diagram](/img/blog/2025/ots-domain-strategy.svg)


Following our [recent homepage update](/content/posts/2025-05-05-homepage-update-going-regional) that emphasized our regional domains (e.g., `eu.onetimesecret.com`, `us.onetimesecret.com`), we want to elaborate on a crucial aspect of our online presence: our domain strategy. While regionalization supports data sovereignty and compliance, an equally vital goal of our domain structure is to provide you with unambiguous markers of authenticity. In an environment where distinguishing official services from imitations is paramount for security, a clear and consistent domain strategy helps ensure you are always interacting with the genuine OnetimeSecret. This is especially important for a tool like ours, frequently used for sensitive tasks. This post details how our domain structure is designed to bolster your confidence and security.


## Documentation: Consolidation under the Primary Domain

The question of where to host technical documentation—often `docs.example.com` versus `docs.example.dev`—was carefully considered. We have chosen to consolidate all user-facing documentation under our primary domain, `onetimesecret.com`.

This decision aligns with prevalent industry practice:
-   `docs.stripe.com`
-   `twilio.com/docs`
-   `docs.github.com`

Notably, Google, which administers the `.dev` TLD, redirects `google.dev` to `developers.google.com`, keeping its developer resources within its primary domain structure.

Our technical rationale for this consolidation includes:

1.  **Origin Consistency**: Hosting documentation on the same top-level domain as our main application (`onetimesecret.com`) prevents cross-origin complexities. This is crucial for interactive documentation elements that might require shared context, such as making authenticated API calls from examples or accessing `localStorage`/`sessionStorage` without impediment from browser security policies like Cross-Origin Resource Sharing (CORS).
2.  **Simplified DNS and Operational Management**: A single domain structure reduces the complexity of DNS records, SSL certificate management, and overall operational overhead. This minimizes potential points of failure and streamlines maintenance.
3.  **Clear User Mental Model**: Users intuitively associate `docs.onetimesecret.com` with the authoritative source for our documentation. This consistency reinforces brand trust and simplifies navigation.
4.  **Seamless Authentication and Shared Resources**: Interactive documentation can leverage the same authentication context as the main application, providing a smoother user experience. Shared assets (CSS, JavaScript, fonts) can also be cached more effectively across the application and its documentation.
5.  **Search Engine Optimization (SEO)**: Consolidating content under a single, authoritative domain can strengthen its SEO profile. Search engines can more easily crawl and index content, and domain authority is not diluted across multiple TLDs. Canonical URL management is also simplified.

## Strategic Use of `.dev`: Isolating Non-Production Environments

While documentation resides under our primary domain, we leverage `.dev` TLDs exclusively for non-production environments (e.g., development, staging, testing). This separation offers distinct technical advantages:

1.  **DNS Configuration Parity**: Using `.dev` allows development environments to mirror production DNS configurations closely, including nuances related to apex domains, `www` subdomains, and other record types. This reduces "it works on my machine" discrepancies stemming from DNS behavior differences.
2.  **Strict Origin Separation**: `.dev` domains are on the HSTS (HTTP Strict Transport Security) preload list, meaning browsers automatically enforce HTTPS. This, combined with the different TLD, ensures a strong security boundary, preventing accidental data leakage or interference between production and non-production environments.
3.  **Clean Cookie Jar**: Cookies set on `*.onetimesecret.com` will not be sent to `*.onetimesecret.dev` (or any other `.dev` domain used internally), and vice-versa. This isolation is critical for testing authentication flows and preventing session conflicts.
4.  **Clear Visual and Technical Distinction**: The `.dev` TLD provides an unambiguous signal to developers and automated systems that they are interacting with a non-production environment.

This approach—using the primary domain for all public-facing resources and `.dev` for internal development—provides a robust separation of concerns.

## Our Domain Structure

Our public-facing resources are organized as follows:

-   **`onetimesecret.com`**: Main application and marketing site.
-   **`docs.onetimesecret.com`**: Comprehensive documentation for all users.
-   **`blog.onetimesecret.com`**: Product updates and engineering insights (this platform).
-   **`api.onetimesecret.com`**: Developer-focused API reference and specifications.

Internal development environments utilize subdomains under a privately managed `.dev` structure (e.g., `feature-x.dev-team.onetimesecret.dev`).

This structure provides clarity for users and developers, optimizes for technical requirements such as security and origin policy, and aligns with established best practices observed across the industry.
