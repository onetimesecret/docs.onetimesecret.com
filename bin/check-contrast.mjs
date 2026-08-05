#!/usr/bin/env node
//
// check-contrast.mjs — verify the theme's colour pairs meet WCAG 2.2 AA.
//
// Starlight pairs an ink token with a surface token in its own component CSS
// (`@layer starlight.core`). src/styles/theme-overrides.css restyles some of
// those surfaces without restating the ink, so a token can drift out from under
// its partner and produce an unreadable pair that still builds green — the
// active sidebar link once rendered white-on-near-white at 1.14:1 this way.
//
// Every pair below names the rule it mirrors. Token VALUES come from
// theme-overrides.css at run time (see bin/lib/contrast.mjs), so changing a
// colour there is what this check measures.
//
// Fails (exit 1) listing any pair under its WCAG 2.2 minimum.
//
// Usage: pnpm run check:contrast
import { readFileSync } from "node:fs";

import {
  AA_MINIMUM,
  OVERRIDES_CSS,
  contrastRatio,
  mixOver,
  parseColor,
  parseRules,
  resolveTokens,
  round2,
  toHex,
} from "./lib/contrast.mjs";

/**
 * The colour pairs the rendered page actually composes.
 *
 * `fg`/`bg` are either a token name, a literal colour, or a
 * `[token, pct, backdrop?]` tuple meaning
 * `color-mix(in srgb, <token> <pct>%, transparent)` composited over `backdrop`
 * — the tint form used throughout the stylesheet. `backdrop` defaults to
 * --sl-color-bg; the sidebar passes --sl-color-bg-sidebar, which is a
 * different grey in dark mode (neutral-800 vs the page's neutral-900).
 *
 * `kind` picks the WCAG minimum: `text` (4.5:1, SC 1.4.3), `large` (3:1, same
 * SC) or `non-text` (3:1, SC 1.4.11).
 */
const SIDEBAR_BG = "--sl-color-bg-sidebar";

const PAIRS = [
  // --- Sidebar (theme-overrides.css "--- Sidebar ---") ---------------------
  {
    where: ".sidebar a[aria-current=page]",
    what: "active link label on its accent tint",
    fg: "--sl-color-accent-high",
    bg: ["--sl-color-text-accent", 10, SIDEBAR_BG],
    kind: "text",
  },
  {
    where: ".sidebar a[aria-current=page]::before",
    what: "2px accent bar — the state indicator, so it carries the active state on its own",
    fg: "--sl-color-text-accent",
    bg: ["--sl-color-text-accent", 10, SIDEBAR_BG],
    kind: "non-text",
  },
  {
    where: ".sidebar a",
    what: "resting link label on the sidebar background",
    fg: "--sl-color-text",
    bg: SIDEBAR_BG,
    kind: "text",
  },
  {
    where: ".sidebar a:not([aria-current=page]):hover",
    what: "hovered link label on its ink tint (Starlight sets color: --sl-color-white)",
    fg: "--sl-color-white",
    bg: ["--sl-color-text", 6, SIDEBAR_BG],
    kind: "text",
  },

  // --- Header (src/components/starlight/Header.astro) -----------------------
  {
    where: "Header.astro .docs-badge",
    what: "badge ink on a 12% tint of the accent it is coloured with",
    fg: "--sl-color-accent-high",
    bg: ["--sl-color-text-accent", 12, "--sl-color-bg-nav"],
    kind: "text",
  },
  {
    where: "Header.astro .docs-badge:hover",
    what: "badge ink on the 20% hover tint",
    fg: "--sl-color-accent-high",
    bg: ["--sl-color-text-accent", 20, "--sl-color-bg-nav"],
    kind: "text",
  },
  {
    where: "Header.astro .nav-links a",
    what: "resting header nav link",
    fg: "--sl-color-text",
    bg: "--sl-color-bg-nav",
    kind: "text",
  },
  {
    where: "Header.astro .nav-links a:hover",
    what: "hovered header nav link on its 7% ink tint",
    fg: "--sl-color-white",
    bg: ["--sl-color-text", 7, "--sl-color-bg-nav"],
    kind: "text",
  },

  // --- Body content (Starlight markdown.css) -------------------------------
  {
    where: ".sl-markdown-content a",
    what: "body link — Starlight colours every prose link with --sl-color-text-accent",
    fg: "--sl-color-text-accent",
    bg: "--sl-color-bg",
    kind: "text",
  },
  {
    where: ".sl-markdown-content a:hover",
    what: "hovered body link",
    fg: "--sl-color-white",
    bg: "--sl-color-bg",
    kind: "text",
  },
  {
    where: ":not(pre) > code",
    what: "inline code on its 8% ink tint",
    fg: "--sl-color-text",
    bg: ["--sl-color-text", 8],
    kind: "text",
  },
  {
    where: "::selection",
    what: "selected body text on the 25% accent highlight",
    fg: "--sl-color-text",
    bg: ["--sl-color-accent", 25],
    kind: "text",
  },

  // --- Table of contents ---------------------------------------------------
  {
    where: "starlight-toc a[aria-current=true]",
    what: "active table-of-contents entry",
    fg: "--sl-color-text-accent",
    bg: "--sl-color-bg",
    kind: "text",
  },

  // --- Accent-coloured surfaces (Starlight SkipLink.astro, FileTree.astro) --
  // Both pair `color: --sl-color-text-invert` with
  // `background-color: --sl-color-text-accent`.
  {
    where: "SkipLink / FileTree .highlight",
    what: "inverted ink on the accent surface",
    fg: "--sl-color-text-invert",
    bg: "--sl-color-text-accent",
    kind: "text",
  },

  // --- Buttons -------------------------------------------------------------
  {
    where: ".sl-link-button.primary",
    what: "white label on the solid accent fill",
    fg: "#fff",
    bg: "--ots-accent-solid",
    kind: "text",
  },
  {
    where: ".sl-link-button.primary:hover",
    what: "white label on the hovered fill",
    fg: "#fff",
    bg: "--ots-accent-solid-hover",
    kind: "text",
  },
  {
    where: ".sl-link-button.primary",
    what: "button surface against the page — its own boundary",
    fg: "--ots-accent-solid",
    bg: "--sl-color-bg",
    kind: "non-text",
  },

  // --- Focus ---------------------------------------------------------------
  {
    where: ":focus-visible",
    what: "focus ring against the page",
    fg: "--sl-color-text-accent",
    bg: "--sl-color-bg",
    kind: "non-text",
  },
];

/**
 * Resolve a PAIRS entry side to a literal colour for `theme`.
 *
 * A `--token` name that the stylesheet no longer declares is an error, not a
 * colour: silently falling through would let a renamed or deleted token quietly
 * drop its pair out of the audit.
 */
function resolve(side, tokens) {
  const [name, pct, backdrop = "--sl-color-bg"] = Array.isArray(side) ? side : [side, null];
  for (const token of [name, ...(pct === null ? [] : [backdrop])]) {
    if (token.startsWith("--") && !(token in tokens)) {
      throw new Error(
        `${token} is not declared in src/styles/theme-overrides.css (nor a Starlight base token) — ` +
          `update PAIRS in bin/check-contrast.mjs if it was renamed`
      );
    }
  }
  const value = tokens[name] ?? name;
  if (pct === null) return toHex(parseColor(value));
  return toHex(mixOver(value, pct, tokens[backdrop] ?? backdrop));
}

/**
 * Structural guard: a rule that repaints an active-state SURFACE must restate
 * its INK in the same block.
 *
 * The measured pairs above assume the stylesheet declares both. They cannot
 * see the failure mode that caused the original bug — a rule that sets only
 * `background`, leaving Starlight's paired `color` to apply from
 * `@layer starlight.core` against a surface it was never chosen for. Selecting
 * on [aria-current] catches the active nav/ToC states, where Starlight always
 * pairs the two. Pseudo-element rules are decoration, not text, so they are
 * exempt.
 */
function checkRepaintedSurfaces(css) {
  const problems = [];
  for (const { selector, decls } of parseRules(css)) {
    // Drop :not(…) groups first: `a:not([aria-current="page"]):hover` styles the
    // INACTIVE state, where Starlight's own `a:hover` colour is the right one.
    const positive = selector.replace(/:not\([^)]*\)/g, "");
    if (!positive.includes("[aria-current")) continue;
    if (positive.includes("::before") || positive.includes("::after")) continue;
    const paintsSurface = "background" in decls || "background-color" in decls;
    if (paintsSurface && !("color" in decls)) {
      problems.push(selector);
    }
  }
  return problems;
}

const failures = [];
const rows = [];

for (const theme of ["light", "dark"]) {
  const tokens = resolveTokens(theme);

  for (const pair of PAIRS) {
    const fg = resolve(pair.fg, tokens);
    const bg = resolve(pair.bg, tokens);
    const ratio = round2(contrastRatio(fg, bg));
    const minimum = AA_MINIMUM[pair.kind];
    const ok = ratio >= minimum;

    rows.push({ theme, ...pair, fg, bg, ratio, minimum, ok });
    if (!ok) failures.push({ theme, ...pair, fg, bg, ratio, minimum });
  }
}

const pad = (s, n) => String(s).padEnd(n);
console.log(
  `${pad("", 4)} ${pad("theme", 6)} ${pad("ratio", 8)} ${pad("min", 6)} ${pad("fg", 9)} ${pad("bg", 9)} rule`
);
for (const r of rows) {
  console.log(
    `${pad(r.ok ? "ok" : "FAIL", 4)} ${pad(r.theme, 6)} ${pad(`${r.ratio.toFixed(2)}:1`, 8)} ` +
      `${pad(`${r.minimum.toFixed(1)}:1`, 6)} ${pad(r.fg, 9)} ${pad(r.bg, 9)} ${r.where}`
  );
}

const unpaired = checkRepaintedSurfaces(readFileSync(OVERRIDES_CSS, "utf8"));

if (failures.length > 0) {
  console.error(`\n${failures.length} colour pair(s) below WCAG 2.2 AA:\n`);
  for (const f of failures) {
    console.error(
      `  [${f.theme}] ${f.where}\n` +
        `    ${f.what}\n` +
        `    ${f.fg} on ${f.bg} = ${f.ratio.toFixed(2)}:1, needs ${f.minimum.toFixed(1)}:1 (${f.kind})\n`
    );
  }
  console.error("Adjust the tokens in src/styles/theme-overrides.css.");
}

if (unpaired.length > 0) {
  console.error(`\n${unpaired.length} active-state rule(s) repaint a surface without restating ink:\n`);
  for (const selector of unpaired) {
    console.error(
      `  ${selector}\n` +
        `    sets a background but no color, so Starlight's paired\n` +
        `    color: var(--sl-color-text-invert) applies over it — that token is chosen for a\n` +
        `    saturated accent fill and is near-invisible on a tint.\n`
    );
  }
  console.error("Declare an explicit `color` alongside the background.");
}

if (failures.length > 0 || unpaired.length > 0) process.exit(1);

console.log(
  `\nAll ${rows.length} colour pairs meet WCAG 2.2 AA, and every active-state rule pairs ink with its surface.`
);
