// bin/lib/contrast.mjs
//
// Colour maths and token resolution behind the check:contrast drift check.
// Plain Node ESM, zero dependencies; paths resolve relative to this file so
// the scripts work from any cwd.
//
// The theme tokens are READ OUT of src/styles/theme-overrides.css rather than
// duplicated here, so editing a colour in the stylesheet is what the check
// measures. Only Starlight's own base values (the ones the stylesheet does not
// override) are pinned below.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

export const OVERRIDES_CSS = join(repoRoot, "src", "styles", "theme-overrides.css");

/**
 * The greyscale tokens theme-overrides.css leaves alone, as they actually
 * resolve in a built page.
 *
 * NOT Starlight's stock values. @astrojs/starlight-tailwind rewires Starlight's
 * ramp onto Tailwind's `--color-gray-*` scale from `@layer utilities` (which
 * outranks Starlight's own `@layer starlight.base`), and src/styles/tailwind.css
 * in turn aliases `--color-gray-*` to Tailwind's **neutral** scale. So the greys
 * below are Tailwind neutral, verified against a built page in both themes.
 *
 * Two consequences worth keeping in view:
 *
 *  - The ramp INVERTS in light mode: --sl-color-white is the darkest ink and
 *    --sl-color-black is the page background. That inversion is what makes the
 *    "invert" tokens easy to misread — the class of bug this check exists for.
 *  - In dark mode the sidebar does NOT sit on the page background:
 *    --sl-color-bg-sidebar is neutral-800 while --sl-color-bg is neutral-900,
 *    so sidebar pairs must be measured against the former.
 */
export const STARLIGHT_BASE = {
  light: {
    "--sl-color-bg": "#ffffff", // --sl-color-black → --color-white
    "--sl-color-bg-sidebar": "#ffffff", // → var(--sl-color-bg)
    "--sl-color-bg-nav": "#f5f5f5", // → var(--sl-color-gray-7) → neutral-100
    "--sl-color-text": "#404040", // --sl-color-gray-2 → neutral-700
    "--sl-color-gray-3": "#737373", // → neutral-500
    "--sl-color-white": "#171717", // → neutral-900; darkest ink in light mode
    "--sl-color-text-invert": "#ffffff", // → var(--sl-color-black)
  },
  dark: {
    "--sl-color-bg": "#171717", // --sl-color-black → neutral-900
    "--sl-color-bg-sidebar": "#262626", // → var(--sl-color-gray-6) → neutral-800
    "--sl-color-bg-nav": "#262626", // → var(--sl-color-gray-6) → neutral-800
    "--sl-color-text": "#d4d4d4", // --sl-color-gray-2 → neutral-300
    "--sl-color-gray-3": "#a1a1a1", // → neutral-400
    "--sl-color-white": "#ffffff",
    "--sl-color-text-invert": "var(--sl-color-accent-low)",
  },
};

// --- Colour parsing ---------------------------------------------------------

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  if (h.length !== 3 && h.length !== 6) {
    throw new Error(`unsupported hex colour: #${h}`);
  }
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = (((h % 360) + 360) % 360) / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  const [r, g, b] =
    hp < 1 ? [c, x, 0]
    : hp < 2 ? [x, c, 0]
    : hp < 3 ? [0, c, x]
    : hp < 4 ? [0, x, c]
    : hp < 5 ? [x, 0, c]
    : [c, 0, x];
  const m = l - c / 2;
  return [r + m, g + m, b + m].map((v) => Math.round(v * 255));
}

/** Parse a `#rgb`, `#rrggbb` or `hsl(h, s%, l%)` string to `[r, g, b]` 0-255. */
export function parseColor(color) {
  if (Array.isArray(color)) return color;
  const c = String(color).trim();
  if (c.startsWith("#")) return hexToRgb(c);
  const hsl = c.match(/^hsl\(\s*([\d.]+)[,\s]+([\d.]+)%[,\s]+([\d.]+)%\s*\)$/i);
  if (hsl) return hslToRgb(Number(hsl[1]), Number(hsl[2]), Number(hsl[3]));
  throw new Error(`unsupported colour syntax: ${color}`);
}

/** Format `[r, g, b]` as `#rrggbb`. */
export function toHex(rgb) {
  return "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
}

/**
 * Composite `color-mix(in srgb, <color> <pct>%, transparent)` over an opaque
 * backdrop — i.e. what the eye actually sees where a translucent tint sits on
 * the page. Straight alpha blend; sRGB, matching the `in srgb` colour space
 * the stylesheet asks for.
 */
export function mixOver(color, pct, backdrop) {
  const c = parseColor(color);
  const b = parseColor(backdrop);
  const a = pct / 100;
  return c.map((v, i) => Math.round(a * v + (1 - a) * b[i]));
}

// --- WCAG 2.2 contrast ------------------------------------------------------

/** Relative luminance, WCAG 2.2 definition. */
export function luminance(color) {
  const [r, g, b] = parseColor(color).map((v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Contrast ratio between two colours, 1:1 … 21:1. */
export function contrastRatio(fg, bg) {
  const a = luminance(fg);
  const b = luminance(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Minimum ratio for a pair, per WCAG 2.2.
 *
 * - `text`      SC 1.4.3 Contrast (Minimum), AA — 4.5:1
 * - `large`     SC 1.4.3 for >=24px, or >=18.66px bold — 3:1
 * - `non-text`  SC 1.4.11 Non-text Contrast — 3:1 for UI component boundaries
 *               and meaningful graphics
 */
export const AA_MINIMUM = { text: 4.5, large: 3, "non-text": 3 };

/** Round half-up to 2dp, so a printed "4.50:1" is never a rounded-up 4.497. */
export function round2(n) {
  return Math.round(n * 100) / 100;
}

// --- Token resolution -------------------------------------------------------

/**
 * Extract custom-property declarations from a CSS rule block.
 *
 * Deliberately small: it reads the two flat `:root` blocks at the top of
 * theme-overrides.css, not arbitrary CSS. Trailing `/* … *\/` comments on a
 * declaration are stripped.
 *
 * @param {string} css Full stylesheet text.
 * @param {string} selector Exact selector text to match, e.g. `:root`.
 * @returns {Record<string, string>} Declared custom properties.
 */
export function parseRootBlock(css, selector) {
  // Strip block comments first so a `{` or `}` inside prose cannot end the rule.
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const block = stripped.match(new RegExp(`(?:^|\\})\\s*${escaped}\\s*\\{([^}]*)\\}`));
  if (!block) throw new Error(`no "${selector}" block in stylesheet`);

  const tokens = {};
  for (const decl of block[1].split(";")) {
    const m = decl.match(/^\s*(--[\w-]+)\s*:\s*(.+?)\s*$/);
    if (m) tokens[m[1]] = m[2];
  }
  return tokens;
}

/**
 * Split a flat stylesheet into `{ selector, decls }` rules.
 *
 * Comments are stripped first. theme-overrides.css is deliberately flat — no
 * `@media` or other nesting — so a top-level scan is sufficient; any rule
 * nested inside an at-rule would be skipped, and the check would need
 * extending alongside it.
 *
 * @param {string} css
 * @returns {{selector: string, decls: Record<string, string>}[]}
 */
export function parseRules(css) {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const rules = [];
  for (const [, selector, body] of stripped.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const decls = {};
    for (const decl of body.split(";")) {
      const m = decl.match(/^\s*([\w-]+)\s*:\s*(.+?)\s*$/s);
      if (m) decls[m[1]] = m[2];
    }
    rules.push({ selector: selector.trim().replace(/\s+/g, " "), decls });
  }
  return rules;
}

/**
 * Resolve the effective token table for one theme.
 *
 * Cascade note: theme-overrides.css is loaded through Starlight's `customCss`
 * with no `@layer` wrapper, and unlayered rules beat every layered rule
 * regardless of specificity. Starlight's own props live in
 * `@layer starlight.base`, so anything the stylesheet declares wins outright —
 * and anything it omits falls through to STARLIGHT_BASE.
 *
 * @param {'light'|'dark'} theme
 * @param {string} [css] Stylesheet text; defaults to the repo's own.
 * @returns {Record<string, string>} Token name → literal colour.
 */
export function resolveTokens(theme, css = readFileSync(OVERRIDES_CSS, "utf8")) {
  const declared = {
    ...parseRootBlock(css, ":root"),
    ...(theme === "dark" ? parseRootBlock(css, ':root[data-theme="dark"]') : {}),
  };
  const merged = { ...STARLIGHT_BASE[theme], ...declared };

  // Follow `var(--x)` aliases to a literal. Starlight's own defaults use them;
  // one hop is all its props.css ever needs, but loop defensively. The 8-hop
  // cap is cycle protection, not correctness: a cyclic alias exhausts the loop
  // and leaves a `var(...)` value that parseColor rejects downstream.
  const resolved = {};
  for (const [name, value] of Object.entries(merged)) {
    let v = value;
    for (let hop = 0; hop < 8; hop++) {
      const alias = v.match(/^var\(\s*(--[\w-]+)\s*\)$/);
      if (!alias) break;
      const next = merged[alias[1]];
      if (next === undefined) throw new Error(`${name}: unknown token ${alias[1]}`);
      v = next;
    }
    resolved[name] = v;
  }
  return resolved;
}
