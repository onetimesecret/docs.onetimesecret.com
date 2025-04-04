import starlight from "@astrojs/starlight";
import markdoc from "@astrojs/markdoc";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import { starlightConfig } from "./starlight.mjs";

export function createIntegrations() {
  return [
    markdoc(),
    vue(),
    starlight(starlightConfig),
    tailwind({
      applyBaseStyles: false,
      nesting: false,
      configFile: "tailwind.config.mjs",
    }),
  ];
}
