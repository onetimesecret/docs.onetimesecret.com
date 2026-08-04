// bin/lib/contrast.test.mjs
//
// Unit tests for the pure helpers behind the check:contrast drift check. The
// check itself is an executable assertion over the real stylesheet; these cover
// the maths and the parsing edge cases that would otherwise regress silently.
import { describe, expect, it } from "vitest";

import {
  AA_MINIMUM,
  STARLIGHT_BASE,
  contrastRatio,
  luminance,
  mixOver,
  parseColor,
  parseRootBlock,
  parseRules,
  resolveTokens,
  round2,
  toHex,
} from "./contrast.mjs";

describe("parseColor", () => {
  it("reads long and short hex", () => {
    expect(parseColor("#ffffff")).toEqual([255, 255, 255]);
    expect(parseColor("#000")).toEqual([0, 0, 0]);
    expect(parseColor("#dc4a22")).toEqual([220, 74, 34]);
  });

  it("reads hsl(), which is how Starlight writes its stock ramp", () => {
    expect(parseColor("hsl(0, 0%, 100%)")).toEqual([255, 255, 255]);
    expect(parseColor("hsl(0, 0%, 0%)")).toEqual([0, 0, 0]);
    // Starlight's stock --sl-color-black, documented in its source as #17181c.
    expect(toHex(parseColor("hsl(224, 10%, 10%)"))).toBe("#17181c");
  });

  it("rejects syntax it cannot faithfully evaluate", () => {
    expect(() => parseColor("rgb(1 2 3)")).toThrow(/unsupported/);
    expect(() => parseColor("var(--nope)")).toThrow(/unsupported/);
  });
});

describe("luminance / contrastRatio", () => {
  it("matches the WCAG reference extremes", () => {
    expect(luminance("#ffffff")).toBeCloseTo(1, 10);
    expect(luminance("#000000")).toBeCloseTo(0, 10);
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 10);
  });

  it("is 1:1 for a colour against itself, and order-independent", () => {
    expect(contrastRatio("#dc4a22", "#dc4a22")).toBeCloseTo(1, 10);
    expect(contrastRatio("#000", "#fff")).toBeCloseTo(contrastRatio("#fff", "#000"), 10);
  });

  it("agrees with published ratios for known pairs", () => {
    // #767676 on white is the canonical "smallest grey that passes AA".
    expect(round2(contrastRatio("#767676", "#ffffff"))).toBe(4.54);
    // Tailwind blue-600 on white.
    expect(round2(contrastRatio("#2563eb", "#ffffff"))).toBe(5.17);
  });
});

describe("mixOver", () => {
  it("composites a translucent tint onto an opaque backdrop", () => {
    // color-mix(in srgb, #dc4a22 10%, transparent) over white.
    expect(toHex(mixOver("#dc4a22", 10, "#ffffff"))).toBe("#fcede9");
    expect(toHex(mixOver("#c43d1b", 10, "#ffffff"))).toBe("#f9ece8");
  });

  it("returns the backdrop at 0% and the colour at 100%", () => {
    expect(toHex(mixOver("#dc4a22", 0, "#ffffff"))).toBe("#ffffff");
    expect(toHex(mixOver("#dc4a22", 100, "#ffffff"))).toBe("#dc4a22");
  });
});

describe("parseRootBlock", () => {
  it("reads declarations and ignores trailing comments", () => {
    const css = `
      :root {
        --a: #111; /* a note */
        --b: #222;
      }
    `;
    expect(parseRootBlock(css, ":root")).toEqual({ "--a": "#111", "--b": "#222" });
  });

  it("does not let a brace inside a comment end the rule", () => {
    const css = `
      /* prose mentioning a { brace } inside a comment */
      :root { --a: #111; }
    `;
    expect(parseRootBlock(css, ":root")).toEqual({ "--a": "#111" });
  });

  it("keeps :root and :root[data-theme] blocks distinct", () => {
    const css = `
      :root { --a: #111; }
      :root[data-theme="dark"] { --a: #222; }
    `;
    expect(parseRootBlock(css, ":root")["--a"]).toBe("#111");
    expect(parseRootBlock(css, ':root[data-theme="dark"]')["--a"]).toBe("#222");
  });

  it("throws when the block is missing rather than reporting an empty theme", () => {
    expect(() => parseRootBlock("a { color: red; }", ":root")).toThrow(/no ":root" block/);
  });
});

describe("resolveTokens", () => {
  const css = `
    :root {
      --sl-color-text-accent: #c43d1b;
    }
    :root[data-theme="dark"] {
      --sl-color-text-accent: #e8663f;
      --sl-color-accent-low: #85200c;
    }
  `;

  it("layers the dark block over :root, and :root alone for light", () => {
    expect(resolveTokens("light", css)["--sl-color-text-accent"]).toBe("#c43d1b");
    expect(resolveTokens("dark", css)["--sl-color-text-accent"]).toBe("#e8663f");
  });

  it("falls back to Starlight's base values for tokens the sheet leaves alone", () => {
    expect(resolveTokens("light", css)["--sl-color-bg"]).toBe(STARLIGHT_BASE.light["--sl-color-bg"]);
    expect(resolveTokens("dark", css)["--sl-color-bg"]).toBe(STARLIGHT_BASE.dark["--sl-color-bg"]);
  });

  it("follows var() aliases to a literal colour", () => {
    // Starlight's dark --sl-color-text-invert aliases --sl-color-accent-low.
    expect(resolveTokens("dark", css)["--sl-color-text-invert"]).toBe("#85200c");
  });

  it("throws on an alias to a token nothing declares", () => {
    expect(() => resolveTokens("light", ":root { --x: var(--missing); }")).toThrow(/unknown token/);
  });
});

describe("parseRules", () => {
  it("returns each rule's selector and declarations", () => {
    const rules = parseRules(`
      .a { color: red; background: blue; }
      .b, .c { color: green; }
    `);
    expect(rules).toEqual([
      { selector: ".a", decls: { color: "red", background: "blue" } },
      { selector: ".b, .c", decls: { color: "green" } },
    ]);
  });

  it("ignores commented-out rules", () => {
    expect(parseRules("/* .a { color: red; } */ .b { color: green; }")).toEqual([
      { selector: ".b", decls: { color: "green" } },
    ]);
  });
});

// --- Regression: the bug this check exists to prevent ------------------------
//
// Starlight's SidebarSublist.astro pairs
//   color: var(--sl-color-text-invert)  with  background-color: var(--sl-color-text-accent)
// — inverted ink on a SATURATED accent fill. theme-overrides.css replaced that
// background with a 10% tint. Restating the background without the ink stranded
// --sl-color-text-invert on a surface it was never chosen for.
describe("sidebar active link regression", () => {
  it("is unreadable when Starlight's invert ink is left on a 10% tint", () => {
    // Light: --sl-color-text-invert resolves to #ffffff (the ramp inverts, so
    // --sl-color-black is the page background in light mode).
    const lightTint = mixOver("#dc4a22", 10, STARLIGHT_BASE.light["--sl-color-bg-sidebar"]);
    expect(round2(contrastRatio("#ffffff", lightTint))).toBe(1.14);

    // Dark: it resolves to --sl-color-accent-low, #85200c in this theme.
    const darkTint = mixOver("#e8663f", 10, STARLIGHT_BASE.dark["--sl-color-bg-sidebar"]);
    expect(round2(contrastRatio("#85200c", darkTint))).toBe(1.41);
  });

  it("clears AA once the tint carries accent-high as its ink", () => {
    const tokens = { light: resolveTokens("light"), dark: resolveTokens("dark") };

    for (const theme of ["light", "dark"]) {
      const t = tokens[theme];
      const tint = mixOver(t["--sl-color-text-accent"], 10, t["--sl-color-bg-sidebar"]);
      const ratio = contrastRatio(t["--sl-color-accent-high"], tint);
      expect(ratio, `${theme} sidebar active link`).toBeGreaterThanOrEqual(AA_MINIMUM.text);
    }
  });

  it("keeps --sl-color-text-invert readable on the accent surface it inks", () => {
    // SkipLink.astro and FileTree.astro both pair these two directly.
    for (const theme of ["light", "dark"]) {
      const t = resolveTokens(theme);
      const ratio = contrastRatio(t["--sl-color-text-invert"], t["--sl-color-text-accent"]);
      expect(ratio, `${theme} skip link`).toBeGreaterThanOrEqual(AA_MINIMUM.text);
    }
  });
});
