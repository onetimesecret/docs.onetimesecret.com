// @ts-check
import { defineConfig } from "astro/config";
import { createIntegrations } from "./config/integrations";
import { createViteConfig } from "./config/vite";

export default defineConfig({
  site: "https://docs.onetimesecret.com",
  base: process.env.VITE_BASE_URL || "/",
  integrations: createIntegrations(),
  vite: createViteConfig(),
});
