import { component, defineMarkdocConfig } from "@astrojs/markdoc/config";
import starlightMarkdoc from "@astrojs/starlight-markdoc";

// https://docs.astro.build/en/guides/integrations-guide/markdoc/
export default defineMarkdocConfig({
  extends: [starlightMarkdoc()],
  variables: {
    environment: process.env.IS_PROD ? "prod" : "dev",
  },
  nodes: {
    // Add custom node types here
  },
  tags: {
    "homepage-ending": {
      render: component("./src/components/HomepageEnding.astro"),
      selfClosing: true,
      attributes: {
        variant: {
          type: String,
          default: "receipt",
          matches: ["quiet", "envelope", "receipt"],
        },
      },
    },
    // Override and extend tags
    // card and cardgrid come from starlightMarkdoc() above. Overriding them
    // with render: "Card" emitted a literal <card>/<cardgrid> HTML tag instead
    // of Starlight's component, so cards had no styling and grids never laid out.
    // The Configuration Generator island, e.g. {% config-generator /%}
    //
    // Phase 4 moved the tool from a custom src/pages route into the
    // documentation collection so it gets normal metadata, search indexing and
    // prev/next. The Vue component is reused unchanged; the wrapper exists
    // because a `client:*` directive has to live in an .astro template.
    "config-generator": {
      render: component("./src/components/ConfigGeneratorIsland.astro"),
      selfClosing: true,
      attributes: {},
    },
    // Regional globe icon, e.g. {% globe name="earth-canada" /%}
    globe: {
      render: component("./src/components/icons/OtsGlobe.astro"),
      selfClosing: true,
      attributes: {
        name: { type: String, required: true },
        size: { type: String },
        label: { type: String },
      },
    },
  },
  components: {},
});
