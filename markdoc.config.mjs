import { defineMarkdocConfig } from "@astrojs/markdoc/config";
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
    card: {
      render: "FeatureCard",
      attributes: {
        title: { type: String, required: true },
        icon: { type: String },
      },
      slots: {
        default: {
          render: "CardContent",
        },
      },
    },
    cardgrid: {
      render: "CardGrid",
      attributes: {
        stagger: { type: Boolean, default: false },
      },
      slots: {
        default: {
          render: "CardGridSlot",
        },
      },
    },
  },
});
