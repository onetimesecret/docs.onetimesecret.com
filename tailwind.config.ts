import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  darkMode: "class",
  safelist: [
    // Add the full class names of the icons you want to force include
    // Color mode icons
    "i-ph-sun",
    "i-ph-sun-dim",
    "i-ph-moon",
    "i-ph-moon-stars",
    "i-heroicons-sun",
    "i-heroicons-moon",
    "i-heroicons-outline-sun",
    "i-heroicons-outline-moon",
    "i-heroicons-solid-sun",
    "i-heroicons-solid-moon",
    // Prose and typography classes
    "prose",
    "text-4xl",
    "text-3xl",
    "text-2xl",
    "text-xl",
    "text-lg",
    "text-base",
    "font-bold",
    "font-semibold",
    "font-medium",
    "font-normal",
    "mb-6",
    "mb-4",
    "mb-3",
    "mb-2",
    "mt-0",
    "mt-8",
    "mt-6",
    "mt-5",
    "mt-4",
    "my-4",
    "my-6",
    "pl-6",
    "pl-4",
    "text-brand-600",
    "hover:text-brand-800",
    "underline",
    "border-l-4",
    "border-gray-300",
    "italic",
    "bg-gray-100",
    "rounded",
    "px-1",
    "py-0.5",
    "text-gray-800",
    "p-4",
    "overflow-auto",
  ],
  theme: {
    fontFamily: {
      serif: defaultTheme.fontFamily.serif,
      sans: defaultTheme.fontFamily.sans,
      /* In CSS: font-family: theme('fontFamily.brand'); */
      brand: ["Zilla Slab", ...defaultTheme.fontFamily.serif],
      mono: defaultTheme.fontFamily.mono,
    },
    typography: {
      DEFAULT: {
        css: {
          "h1, h2, h3, h4, h5, h6": {
            fontFamily: "Zilla Slab, serif",
          },
          h1: {
            fontSize: "2.25rem", // text-4xl
            fontWeight: "700",
            marginTop: "0",
            marginBottom: "1rem",
          },
          h2: {
            fontSize: "1.875rem", // text-3xl
            fontWeight: "700",
            marginTop: "1.5rem",
            marginBottom: "0.75rem",
          },
          h3: {
            fontSize: "1.5rem", // text-2xl
            fontWeight: "600",
            marginTop: "1.25rem",
            marginBottom: "0.5rem",
          },
          h4: {
            fontSize: "1.25rem", // text-xl
            fontWeight: "600",
            marginTop: "1rem",
            marginBottom: "0.5rem",
          },
          h5: {
            fontSize: "1.125rem", // text-lg
            fontWeight: "500",
            marginTop: "1rem",
            marginBottom: "0.5rem",
          },
          h6: {
            fontSize: "1rem", // text-base
            fontWeight: "500",
            marginTop: "1rem",
            marginBottom: "0.5rem",
          },
        },
      },
    },
    extend: {
      colors: {
        // https://javisperez.github.io/tailwindcolorshades/?flamingo=dc4a22&guardsman-red=23b5dd
        brand: {
          50: "#fcf8f2",
          100: "#fcf4e8",
          200: "#f7dec3",
          300: "#f0c39e",
          400: "#e68b5e",
          500: "#dc4a22",
          600: "#c43d1b",
          700: "#a32d12",
          800: "#85200c",
          900: "#631507",
          950: "#400b03",
        },
        branddim: {
          50: "#fcf8f2",
          100: "#faf0e3",
          200: "#f0d7bd",
          300: "#e8bb99",
          400: "#d67e56",
          500: "#c43d1b",
          600: "#b03317",
          700: "#94270f",
          800: "#751b09",
          900: "#591205",
          950: "#380902",
        },
        brandcomp: {
          50: "#f2fbfc",
          100: "#e8fafc",
          200: "#c3f0f7",
          300: "#a0e6f2",
          400: "#5fcfe8",
          500: "#23b5dd",
          600: "#1c9cc7",
          700: "#1478a6",
          800: "#0d5985",
          900: "#073b63",
          950: "#032140",
        },
        brandcompdim: {
          50: "#f2fbfc",
          100: "#e3f7fa",
          200: "#bfebf2",
          300: "#99dae8",
          400: "#57bdd9",
          500: "#1c9cc7",
          600: "#1786b3",
          700: "#0f6594",
          800: "#0a4c78",
          900: "#053359",
          950: "#021e3b",
        },
        midnight: {
          50: "#e9f2f5",
          100: "#d8e7ed",
          200: "#9dbfcf",
          300: "#6f9bb3",
          400: "#2a577a",
          500: "#032140",
          600: "#031e3b",
          700: "#021630",
          800: "#011026",
          900: "#010b1c",
          950: "#000612",
        },
      },
    },
  },
  plugins: [
    forms(),
    typography({
      className: "prose",
    }),
  ],
};
