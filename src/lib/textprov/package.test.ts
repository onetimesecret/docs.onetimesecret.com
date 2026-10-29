import textprov from "textprov";
import { describe, expect, it } from "vitest";
import { aiRuns } from "./html.mjs";

// Package imports replace the local UMD transform. Dev SSR is also checked
// against a running Astro server during dependency upgrades.
describe("TextProv package interop", () => {
  it("exposes the decoder through the package default import", () => {
    expect(typeof textprov.runs).toBe("function");
    expect(typeof textprov.segments).toBe("function");
    expect(textprov.mapping.selectors.ai).toBe(0xe0101);
  });

  it("uses the package decoder in the server renderer", () => {
    expect(aiRuns("A\u{e0101}")).toEqual([{ state: "ai", text: "A" }]);
  });
});
