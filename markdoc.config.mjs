import { component, defineMarkdocConfig, Markdoc } from "@astrojs/markdoc/config";
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
    message: {
      attributes: {
        speaker: { type: String, required: true, matches: ["User", "Assistant"] },
      },
      transform(node, config) {
        const { speaker } = node.transformAttributes(config);
        return new Markdoc.Tag(
          "div",
          {
            class: "transcript-message",
            "data-speaker": speaker,
            role: "group",
            "aria-label": `${speaker} message`,
          },
          [
            new Markdoc.Tag("p", { class: "transcript-message__speaker" }, [speaker]),
            new Markdoc.Tag(
              "div",
              { class: "transcript-message__body" },
              node.transformChildren(config),
            ),
          ],
        );
      },
    },
    details: { render: "details" },
    summary: {
      render: "summary",
      transform(node, config) {
        // Block tags wrap their text in paragraphs; summary requires phrasing content.
        const children = node
          .transformChildren(config)
          .flatMap((child) =>
            Markdoc.Tag.isTag(child) && child.name === "p" ? child.children : [child],
          );
        return new Markdoc.Tag("summary", {}, children);
      },
    },
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
