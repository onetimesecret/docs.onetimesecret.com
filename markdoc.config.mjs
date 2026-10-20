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
    // Override and extend tags
    // card and cardgrid come from starlightMarkdoc() above. Overriding them
    // with render: "Card" emitted a literal <card>/<cardgrid> HTML tag instead
    // of Starlight's component, so cards had no styling and grids never laid out.
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
