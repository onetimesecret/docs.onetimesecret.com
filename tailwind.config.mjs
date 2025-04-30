// docs.onetimesecret.com/starlight/tailwind.config.mjs
import starlightPlugin from "@astrojs/starlight-tailwind";
// Removed unused imports: colors, defaultTheme

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mdoc}"],

  // Disable the default base styles (if still applicable in v4):
  applyBaseStyles: false,

  // The 'theme' object is removed as customizations are now in tailwind.css @theme block.

  plugins: [
    // Keep the plugin registration, but remove theme options.
    // Starlight will use the CSS variables defined in @theme.
    starlightPlugin(),
  ],
};
