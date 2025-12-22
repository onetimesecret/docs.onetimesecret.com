import starlight from "@astrojs/starlight";
import markdoc from "@astrojs/markdoc";
import vue from "@astrojs/vue";
import react from "@astrojs/react";
import { starlightConfig } from "./starlight.mjs";

export function createIntegrations() {
  return [markdoc(), vue(), react(), starlight(starlightConfig)];
}
