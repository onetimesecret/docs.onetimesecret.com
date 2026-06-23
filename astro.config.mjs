// @ts-check
import { defineConfig } from "astro/config";
import { createIntegrations } from "./config/integrations.mjs";
import { createViteConfig, createAllowedHosts } from "./config/vite.mjs";
import { createRedirectsConfig } from "./config/redirects.mjs";

export default defineConfig({
  // Canonical site URL. Defaults to production; the staging deploy overrides
  // it via SITE_URL (e.g. https://docs.onetimesecret.dev) so canonicals,
  // sitemap, and absolute links match the domain being served.
  site: process.env.SITE_URL || "https://docs.onetimesecret.com",
  redirects: createRedirectsConfig(),
  integrations: createIntegrations(),
  vite: createViteConfig(),
  server: {
    // Use the same allowedHosts logic as Vite for consistency
    // Set via VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS environment variable
    allowedHosts: createAllowedHosts(),
  },
});
