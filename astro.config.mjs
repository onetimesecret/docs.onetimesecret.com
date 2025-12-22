// @ts-check
import { defineConfig } from "astro/config";
import { createIntegrations } from "./config/integrations.mjs";
import { createViteConfig, createAllowedHosts } from "./config/vite.mjs";
import { createRedirectsConfig } from "./config/redirects.mjs";

export default defineConfig({
  site: "https://docs.onetimesecret.com",
  redirects: createRedirectsConfig(),
  integrations: createIntegrations(),
  vite: createViteConfig(),
  server: {
    // Use the same allowedHosts logic as Vite for consistency
    // Set via VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS environment variable
    allowedHosts: createAllowedHosts(),
  },
});
