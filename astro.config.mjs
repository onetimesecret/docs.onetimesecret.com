// @ts-check
import { defineConfig } from "astro/config";
import { createIntegrations } from "./config/integrations.mjs";
import { createViteConfig } from "./config/vite.mjs";

export default defineConfig({
  site: "https://docs.onetimesecret.com",
  redirects: {
    "/docs": "/en/",
    "/blog": "https://blog.onetimesecret.com/",
  },
  // base: process.env.VITE_BASE_URL || "/",
  integrations: createIntegrations(),
  vite: createViteConfig(),
});
