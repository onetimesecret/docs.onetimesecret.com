// Custom font plugin for Tailwind CSS
export default function (options = {}) {
  return {
    handler: ({ addBase }) => {
      addBase({
        "@font-face": [
          {
            fontFamily: "Zilla Slab",
            src: "url('./fonts/zs/ZillaSlab-Regular.woff2') format('woff2'), url('./fonts/zs/ZillaSlab-Regular.woff') format('woff')",
            fontWeight: "400",
            fontStyle: "normal",
            fontDisplay: "fallback",
          },
          {
            fontFamily: "Zilla Slab",
            src: "url('./fonts/zs/ZillaSlab-Bold.woff2') format('woff2'), url('./fonts/zs/ZillaSlab-Bold.woff') format('woff')",
            fontWeight: "700",
            fontStyle: "normal",
            fontDisplay: "fallback",
          },
          {
            fontFamily: "Zilla Slab",
            src: "url('./fonts/zs/ZillaSlab-Italic.woff2') format('woff2'), url('./fonts/zs/ZillaSlab-Italic.woff') format('woff')",
            fontWeight: "400",
            fontStyle: "italic",
            fontDisplay: "fallback",
          },
          {
            fontFamily: "Zilla Slab",
            src: "url('./fonts/zs/ZillaSlab-BoldItalic.woff2') format('woff2'), url('./fonts/zs/ZillaSlab-BoldItalic.woff') format('woff')",
            fontWeight: "700",
            fontStyle: "italic",
            fontDisplay: "fallback",
          },
        ],
      });
    },
  };
}
