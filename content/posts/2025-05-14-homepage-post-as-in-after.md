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


## Our `.com` Domain: Separating Merch and Fate

*   **Argument:** Previously the apex domain operated like an alias for eu.onetimesecret.com b/c historically, before regional domains, onetimesecret.com was hosted in the EU. We continued that for legacy usage (existing integrations after 10+ years online) and avoiding any more confusion than necessary. 
* But now our apex domain is a separate codebase, specifically static marketing site. This distinguishes our example.com to an imposters example.org and for us the benefits are being able to have a proper homepage separate from our development release cycle. It will improve the onetime secret opensourc eproject codebase as well at long last -- removing marketing content and making it more straightforward for supporting properly brandable features for others' self hosted installations.
*   **Why this is important:**
    *   **Clarity and Trust:** Users can confidently identify official resources. Where the `*` in `*.onetimesecret.com` is a specific region. 
    *   **Operational Cohesion:** Streamlines SSL, DNS, and branding.
    *   **SEO Benefits:** Consolidates authority. SEO is usually less important to communicate to the customer audience about but in this case, staying prominent in results -- despite attack atetempts via mimicry, buying google adwords to appear above, consistently. We were not able to do this effectuively with the single codebase. And it costs us rankings, making us vulnerable to this tomfoolery.

This unified approach minimizes ambiguity, making it harder for malicious actors to create convincing imitations on other TLDs.

## Our `.dev`: A True Non-Production Mirror

*   **Argument:** `.dev` TLDs are *exclusively* for non-production environments, providing a clear and robust separation.
*   **Key points to emphasize (as per your notes):**
    *   **No Rigid Conventions for `.dev`:** "While the `.dev` TLD is popular for development, there aren't universally strict conventions for its application. We've seen it used in various ways, from individual developer sandboxes to more structured staging environments. This flexibility allowed us to define a `.dev` strategy tailored to our specific needs for quality and reliability."
    *   **Clear Prod/Non-Prod Distinction:** "Our primary use of `.onetimesecret.dev` (or a similar internal `.dev` structure) is to create an unmistakable boundary between our production environment (`*.onetimesecret.com`) and all non-production activities (development, staging, testing)."
    *   **Elevating Development with Apex Mirroring:** "Crucially, we leverage `.dev` to mirror our production apex domain structure (e.g., `app.onetimesecret.dev` corresponding to `onetimesecret.com`, or `onetimesecret.dev` itself if you use the apex directly for the app in dev). This allows our development and testing environments to replicate production DNS configurations and behaviors with high fidelity, including the nuances of apex domains versus subdomains (like `www`). This approach significantly reduces 'works on my machine' issues that can arise from differences between staging (e.g., `staging.example.com`) and production (e.g., `example.com`) setups."
    *   **Benefits (from your existing draft, still relevant):** Strict origin separation (HSTS preload), clean cookie jar, clear visual/technical distinction.
*   **Keep internal details brief:** "Internally, this might manifest as `feature-branch.project.onetimesecret.dev`, but the key principle is the TLD-level separation."

This avoids the subtle but sometimes problematic differences that can arise when non-production environments are subdomains of the production TLD, ensuring a cleaner separation of concerns and configurations.

## Our Domain Structure (Largely as-is, but ensure it reflects the emphasis)

*   **`onetimesecret.com`**: Main application, marketing site, and the root for all public-facing services.
*   **`eu.onetimesecret.com`**, `us.onetimesecret.com`, etc: Main application, share nothing architecture, data sovereignty, harder to phish, no ambiguity about where the data is stored, operationally more scalable.
* Supporting domains:
  *   **`docs.onetimesecret.com`**: Comprehensive documentation.
  *   **`blog.onetimesecret.com`**: Product updates and engineering insights.
  * status.onetimesecret.com

both the `.com` consolidation *and* the `.dev` strategy contribute to the overall goals. For example, `.com` provides clarity for users, while `.dev` ensures robustness of the development pipeline, leading to a more secure and reliable servic

*   **`*.onetimesecret.dev`**: Exclusively and entirely for non-production environments, mirroring production structure where applicable. Can be used for customer/user sandbox and their own testing etc. No ambiguity about the environment, ensuring clear separation from production.

**Conclusion:**
Reiterate how this clear separation and consolidation under `.com` enhances security, trust, and usability, while the `.dev` strategy improves development and testing quality.

Also reiterate the importance of the separate codebases.
