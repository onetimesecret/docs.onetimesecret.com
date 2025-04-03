import starlight from "@astrojs/starlight";
import markdoc from "@astrojs/markdoc";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import type { AstroIntegration } from "astro";
import { starlightConfig } from "./starlight";

export function createIntegrations(): AstroIntegration[] {
  return [
    markdoc(),
    vue(),
    starlight(starlightConfig),
    tailwind({
      applyBaseStyles: false,
      nesting: true,
      configFile: "tailwind.config.ts",
    }),
  ];
}
