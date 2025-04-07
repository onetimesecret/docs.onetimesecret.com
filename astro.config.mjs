// @ts-check
import { defineConfig } from "astro/config";
import { createIntegrations } from "./config/integrations.mjs";
import { createViteConfig } from "./config/vite.mjs";
import { createRedirectsConfig } from "./config/redirects.mjs";

export default defineConfig({
  site: "https://docs.onetimesecret.com",
  redirects: createRedirectsConfig(),
  integrations: createIntegrations(),
  vite: createViteConfig(),
});
