import starlight from "@astrojs/starlight";
import markdoc from "@astrojs/markdoc";
import vue from "@astrojs/vue";
import { starlightConfig } from "./starlight.mjs";
import { provenance } from "./textprov.mjs";

export function createIntegrations() {
  return [provenance(), markdoc(), vue(), starlight(starlightConfig)];
}
