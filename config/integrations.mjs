import starlight from "@astrojs/starlight";
import markdoc from "@astrojs/markdoc";
import vue from "@astrojs/vue";
import { starlightConfig } from "./starlight.mjs";

export function createIntegrations() {
  return [markdoc(), vue(), starlight(starlightConfig)];
}
