import { JSDOM } from "jsdom";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("../../styles/textprov.css", import.meta.url), "utf8");

// Inspect source rules rather than computed styles: jsdom does not implement
// cascade layers, color-mix(), forced colors, or browser text decoration painting.
function rules(source: string) {
  return Array.from(source.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{([^{}]*)\}/g), (match) => ({
    selector: match[1].trim(),
    declarations: Object.fromEntries(
      match[2]
        .split(";")
        .filter((part) => part.trim())
        .map((part) => {
          const colon = part.indexOf(":");
          return [part.slice(0, colon).trim(), part.slice(colon + 1).trim()];
        }),
    ),
  })).filter((rule) => !rule.selector.startsWith("@"));
}

function block(header: string) {
  const start = css.indexOf(header);
  expect(start, `Missing ${header}`).toBeGreaterThanOrEqual(0);
  const opening = css.indexOf("{", start);
  let depth = 1;
  for (let i = opening + 1; i < css.length; i++) {
    if (css[i] === "{") depth++;
    if (css[i] === "}" && --depth === 0) return css.slice(opening + 1, i);
  }
  throw new Error(`Unclosed ${header}`);
}

const screen = rules(block("@media screen"));
const decoration = screen.filter((rule) => rule.declarations["text-decoration-line"] === "underline");

function fixture(shown = true) {
  const dom = new JSDOM(`<html data-textprov="${shown ? "shown" : "hidden"}"><body>
    <span id="recorded" class="textprov-ai">AI</span><span id="unmarked"> human</span>
    <span id="label" class="textprov-label">Legend</span>
    <a href="/">Link <span id="link-recorded" class="textprov-ai">AI</span></a>
    <a id="link" class="textprov-ai" href="/">AI link</a>
    <span data-prov-decoration="native"><span id="native-decoration" class="textprov-ai">Native</span></span>
    <span id="own-decoration" class="textprov-ai" data-prov-decoration="native">Native</span>
    <span data-prov-background="native"><span id="native-background" class="textprov-ai">Native</span></span>
    <span id="own-background" class="textprov-ai" data-prov-background="native">Native</span>
  </body></html>`);
  const matches = (id: string, rule: { selector: string }) =>
    dom.window.document.getElementById(id)!.matches(rule.selector);
  return { dom, matches };
}

describe("TextProv stylesheet presentation contract", () => {
  it("underlines recorded spans and the legend, not unmarked text or links", () => {
    const { dom, matches } = fixture();
    expect(decoration).toHaveLength(1);
    expect(decoration[0].declarations).toMatchObject({
      "text-decoration-style": "dotted",
      "text-decoration-thickness": "1.5px",
      "text-decoration-skip-ink": "none",
      "text-underline-offset": "5px",
    });
    for (const id of ["recorded", "label"]) expect(matches(id, decoration[0]), id).toBe(true);
    for (const id of ["unmarked", "link"]) expect(matches(id, decoration[0]), id).toBe(false);
    // No other rule may introduce an underline through the shorthand.
    expect(screen.some((rule) => /underline/.test(rule.declarations["text-decoration"] ?? ""))).toBe(false);
    dom.window.close();
  });

  it("gives recorded spans and the legend a fill and glow without styling surrounding text", () => {
    const { dom, matches } = fixture();
    const fills = screen.filter((rule) => rule.declarations.background && rule.declarations.background !== "none");
    expect(fills).toHaveLength(2); // Flat fallback and guarded gradient.
    expect(fills.some((rule) => rule.declarations.background.includes("linear-gradient"))).toBe(true);
    const glows = screen.filter(
      (rule) => rule.declarations["box-shadow"] && rule.declarations["box-shadow"] !== "none",
    );
    expect(glows).toHaveLength(1);
    const dotColors = screen.filter((rule) => rule.declarations["text-decoration-color"]?.includes("color-mix"));
    expect(dotColors).toHaveLength(1);
    for (const id of ["recorded", "label"]) {
      expect(
        fills.every((rule) => matches(id, rule)),
        id,
      ).toBe(true);
      expect(matches(id, glows[0]), id).toBe(true);
      expect(matches(id, dotColors[0]), id).toBe(true);
    }
    expect(screen.some((rule) => matches("unmarked", rule))).toBe(false);
    dom.window.close();
  });

  it("preserves link underline ownership and native annotation opt-outs", () => {
    const { dom, matches } = fixture();
    const noDecoration = screen.filter((rule) => rule.declarations["text-decoration"] === "none");
    for (const id of ["link-recorded", "native-decoration", "own-decoration"]) {
      expect(
        noDecoration.some((rule) => matches(id, rule)),
        id,
      ).toBe(true);
    }
    for (const id of ["recorded", "unmarked", "label"]) {
      expect(
        noDecoration.some((rule) => matches(id, rule)),
        id,
      ).toBe(false);
    }
    const nativeBackground = screen.filter((rule) => rule.selector.includes("data-prov-background"));
    for (const id of ["native-background", "own-background"]) {
      expect(
        nativeBackground.some(
          (rule) =>
            matches(id, rule) && rule.declarations.background === "none" && rule.declarations["box-shadow"] === "none",
        ),
        id,
      ).toBe(true);
    }
    expect(screen.indexOf(noDecoration[0])).toBeGreaterThan(screen.indexOf(decoration[0]));
    dom.window.close();
  });

  it("keeps every presentation rule screen-only and inactive when hidden", () => {
    const presentation = rules(css).filter((rule) =>
      Object.keys(rule.declarations).some((name) => !name.startsWith("--")),
    );
    expect(presentation).toEqual(screen);
    const { dom, matches } = fixture(false);
    for (const id of ["recorded", "unmarked", "label", "link-recorded", "native-background"]) {
      expect(
        screen.some((rule) => matches(id, rule)),
        id,
      ).toBe(false);
    }
    dom.window.close();
  });

  it("removes fills and glows in forced colors without removing recorded underlines", () => {
    const forced = rules(block("@media (forced-colors: active)"));
    expect(forced).toHaveLength(1);
    expect(forced[0].declarations).toEqual({
      background: "none",
      "box-shadow": "none",
      "text-decoration-color": "currentColor",
    });
    const { dom, matches } = fixture();
    for (const id of ["recorded", "label"]) expect(matches(id, forced[0]), id).toBe(true);
    expect(matches("unmarked", forced[0])).toBe(false);
    expect(screen.at(-1)).toEqual(forced[0]);
    dom.window.close();
  });
});
