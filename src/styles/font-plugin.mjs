// Custom font plugin for Tailwind CSS
export default function (options = {}) {
  return {
    handler: ({ addBase }) => {
      addBase({
        "@font-face": [
          {
            fontFamily: "Zilla Slab",
            src: "url('../fonts/zs/ZillaSlab-Regular.woff2') format('woff2'), url('../fonts/zs/ZillaSlab-Regular.woff') format('woff')",
            fontWeight: "400",
            fontStyle: "normal",
            fontDisplay: "swap",
          },
          {
            fontFamily: "Zilla Slab",
            src: "url('../fonts/zs/ZillaSlab-Bold.woff2') format('woff2'), url('../fonts/zs/ZillaSlab-Bold.woff') format('woff')",
            fontWeight: "700",
            fontStyle: "normal",
            fontDisplay: "swap",
          },
          {
            fontFamily: "Zilla Slab",
            src: "url('../fonts/zs/ZillaSlab-Italic.woff2') format('woff2'), url('../fonts/zs/ZillaSlab-Italic.woff') format('woff')",
            fontWeight: "400",
            fontStyle: "italic",
            fontDisplay: "swap",
          },
          {
            fontFamily: "Zilla Slab",
            src: "url('../fonts/zs/ZillaSlab-BoldItalic.woff2') format('woff2'), url('../fonts/zs/ZillaSlab-BoldItalic.woff') format('woff')",
            fontWeight: "700",
            fontStyle: "italic",
            fontDisplay: "swap",
          },
          {
            fontFamily: "Zilla Slab",
            src: "url('../fonts/zs/ZillaSlab-Medium.woff2') format('woff2'), url('../fonts/zs/ZillaSlab-Medium.woff') format('woff')",
            fontWeight: "500",
            fontStyle: "normal",
            fontDisplay: "swap",
          },
          {
            fontFamily: "Zilla Slab",
            src: "url('../fonts/zs/ZillaSlab-MediumItalic.woff2') format('woff2'), url('../fonts/zs/ZillaSlab-MediumItalic.woff') format('woff')",
            fontWeight: "500",
            fontStyle: "italic",
            fontDisplay: "swap",
          },
          {
            fontFamily: "Zilla Slab",
            src: "url('../fonts/zs/ZillaSlab-SemiBold.woff2') format('woff2'), url('../fonts/zs/ZillaSlab-SemiBold.woff') format('woff')",
            fontWeight: "600",
            fontStyle: "normal",
            fontDisplay: "swap",
          },
          {
            fontFamily: "Zilla Slab",
            src: "url('../fonts/zs/ZillaSlab-SemiBoldItalic.woff2') format('woff2'), url('../fonts/zs/ZillaSlab-SemiBoldItalic.woff') format('woff')",
            fontWeight: "600",
            fontStyle: "italic",
            fontDisplay: "swap",
          },
          {
            fontFamily: "Zilla Slab",
            src: "url('../fonts/zs/ZillaSlab-Light.woff2') format('woff2'), url('../fonts/zs/ZillaSlab-Light.woff') format('woff')",
            fontWeight: "300",
            fontStyle: "normal",
            fontDisplay: "swap",
          },
          {
            fontFamily: "Zilla Slab",
            src: "url('../fonts/zs/ZillaSlab-LightItalic.woff2') format('woff2'), url('../fonts/zs/ZillaSlab-LightItalic.woff') format('woff')",
            fontWeight: "300",
            fontStyle: "italic",
            fontDisplay: "swap",
          },
          {
            fontFamily: "Zilla Slab Highlight",
            src: "url('../fonts/zs/ZillaSlabHighlight-Regular.woff2') format('woff2'), url('../fonts/zs/ZillaSlabHighlight-Regular.woff') format('woff')",
            fontWeight: "400",
            fontStyle: "normal",
            fontDisplay: "swap",
          },
          {
            fontFamily: "Zilla Slab Highlight",
            src: "url('../fonts/zs/ZillaSlabHighlight-Bold.woff2') format('woff2'), url('../fonts/zs/ZillaSlabHighlight-Bold.woff') format('woff')",
            fontWeight: "700",
            fontStyle: "normal",
            fontDisplay: "swap",
          },
        ],
      });
    },
  };
}
