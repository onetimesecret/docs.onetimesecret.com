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


Following our [recent homepage update](/content/posts/2025-05-05-homepage-update-going-regional) that emphasized our regional domains (e.g., `eu.onetimesecret.com`, `us.onetimesecret.com`), we want to elaborate on a crucial aspect of our online presence: our domain strategy. While regionalization supports data sovereignty and compliance, an equally vital goal of our domain structure is to provide you with unambiguous markers of authenticity. In an environment where distinguishing official services from imitations is paramount for security, a clear and consistent domain strategy helps ensure you are always interacting with the genuine OnetimeSecret. This is especially important for a tool like ours, frequently used for sensitive tasks.

Recently, we encountered a sophisticated phishing attempt where an impostor site at a similar domain mirrored our interface but captured and exposed all created secrets. Despite the site being shut down through Cloudflare, many users were confused about legitimacy. This incident reinforced the importance of having unmistakable markers of authenticity in our domain strategy.

This post details how our domain structure is designed to bolster your confidence and security.


## Our `.com` Domain: Clear Separation of Concerns

* **Strategic Change:** We've moved from having our apex domain (onetimesecret.com) function as an alias for eu.onetimesecret.com to making it a completely separate codebase with static content.

* **Technical Benefits:**
  * **Distinctive User Experience:** Creates a clear visual and functional difference from imposter sites
  * **Streamlined Application Codebase:** Removing marketing content makes our open-source codebase simpler for self-hosted installations, site changes no longer require application deployments.
  *   **SEO Benefits:** Consolidates authority. SEO is usually less important to communicate to the customer audience about but in this case, staying prominent in results -- despite attack atetempts via mimicry, buying google adwords to appear above, consistently. We were not able to do this effectuively with the single codebase. And it costs us rankings, making us vulnerable to this tomfoolery.

This unified approach minimizes ambiguity, making it harder for malicious actors to create convincing imitations on other TLDs.

## How to Verify Our Authentic Domains

To ensure you're using a legitimate OnetimeSecret service:

1. **Check the Domain Pattern:** All our services use either the apex domain (onetimesecret.com) or regional subdomains (e.g., eu.onetimesecret.com)
2. **Verify SSL Certificate:** Our domains use EV certificates issued to Delano Software Inc.
3. **Look for Regional Indicators:** Legitimate regional domains clearly display their region in the interface
4. **When in Doubt:** If you encounter a site claiming to be OnetimeSecret on any other domain (especially TLDs like .org, .net, etc.), it is NOT affiliated with us

Remember that no legitimate OnetimeSecret service will ever expose created secrets in a directory listing or to third parties.

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

## Conclusion: Security Through Clarity

Our domain strategy serves multiple purposes:

1. **User Security:** Clear domain patterns make it harder for malicious actors to create convincing imitations
2. **Data Sovereignty:** Regional domains ensure your data stays in your chosen jurisdiction
3. **Technical Robustness:** Separate codebases for marketing and application improve development velocity and maintainability
4. **Development Quality:** Our .dev environment mirrors production structure, ensuring higher reliability, avoiding subtle issues related to apex, www., cookies, various DNS records etc AND .dev clearly communicates "this is not production" in a way that "staging.example.com", "staging-eu.example.com" might not.

By creating distinct experiences between our marketing site and application interface, we're making it harder for bad actors to create convincing phishing sites.

We encourage you to bookmark your preferred regional domain and always verify you're on a legitimate onetimesecret.com subdomain before sharing sensitive information.
