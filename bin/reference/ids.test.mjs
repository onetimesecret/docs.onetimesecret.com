// bin/reference/ids.test.mjs
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";

import { parseEnvReference } from "./env-parser.mjs";
import { anchorFor, assertNoCollisions, envId, ENV_ID_PREFIX } from "./ids.mjs";

const here = dirname(fileURLToPath(import.meta.url));

describe("envId", () => {
  it("lower-cases and turns underscores into hyphens", () => {
    expect(envId("SECRET_VERIFIER_MODE")).toBe("env-secret-verifier-mode");
    expect(envId("SECRET")).toBe("env-secret");
    expect(envId("OIDC_CLIENT_ID")).toBe("env-oidc-client-id");
    expect(envId("INCOMING_RECIPIENT_1")).toBe("env-incoming-recipient-1");
  });

  it("uses the prefix the plan specifies", () => {
    expect(envId("SECRET").startsWith(ENV_ID_PREFIX)).toBe(true);
  });

  it("throws on a name outside the checked shape rather than escaping it", () => {
    for (const bad of ["lower", "HAS-HYPHEN", "HAS SPACE", "1LEADING", "HAS.DOT", "", "SÉCRET"]) {
      expect(() => envId(bad), bad).toThrow(/cannot mint an id/);
    }
  });
});

describe("anchorFor", () => {
  it("predicts the fragment this Markdown stack actually produces", () => {
    // Verified against @astrojs/markdown-satteri's heading-ids plugin: the
    // slugger lower-cases, drops punctuation and keeps underscores, so a
    // variable heading's fragment keeps its underscores.
    expect(anchorFor("SECRET_VERIFIER_MODE")).toBe("secret_verifier_mode");
    expect(anchorFor("Secrets & Cryptography")).toBe("secrets--cryptography");
    expect(anchorFor("SSO / OmniAuth")).toBe("sso--omniauth");
    expect(anchorFor("Branding / Private-Label")).toBe("branding--private-label");
  });

  it("matches Astro's installed processor, including literal custom-id syntax", async () => {
    // Resolve Astro's dependency rather than assuming a hoisted Markdown package.
    const astroRequire = createRequire(
      createRequire(import.meta.url).resolve("astro/package.json"),
    );
    const { createSatteriMarkdownProcessor } = await import(
      pathToFileURL(astroRequire.resolve("@astrojs/markdown-satteri")).href
    );
    const processor = await createSatteriMarkdownProcessor({ syntaxHighlight: false });
    const headings = [
      "SECRET_VERIFIER_MODE",
      "Secrets & Cryptography",
      "SSO / OmniAuth",
      "Branding / Private-Label",
      "SECRET_VERIFIER_MODE {#env-secret-verifier-mode}",
    ];
    const { code, metadata } = await processor.render(
      headings.map((text) => `### ${text}`).join("\n\n"),
    );
    expect(metadata.headings.map((heading) => heading.slug)).toEqual(headings.map(anchorFor));
    expect(code).toContain('id="secret_verifier_mode-env-secret-verifier-mode"');
    expect(code).toContain("SECRET_VERIFIER_MODE {#env-secret-verifier-mode}</h3>");
  });
});

describe("assertNoCollisions", () => {
  const record = (name, lineStart) => ({ id: envId(name), name, lineStart });

  it("passes a set with no collision", () => {
    const { ids, anchors } = assertNoCollisions([record("ALPHA", 1), record("BETA", 2)], [
      { heading: "Sample Section" },
    ]);
    expect(ids.size).toBe(2);
    expect(anchors.size).toBe(3);
  });

  it("throws on a repeated record id", () => {
    expect(() => assertNoCollisions([record("ALPHA", 1), record("ALPHA", 9)])).toThrow(
      /id collision on "env-alpha".*line 9.*line 1/s,
    );
  });

  it("throws when a variable's fragment collides with a section's", () => {
    // fixtures/collision.envref is a section called SECRET holding a variable
    // called SECRET: both slug to "#secret".
    const parsed = parseEnvReference(readFileSync(join(here, "fixtures", "collision.envref"), "utf8"));
    const records = parsed.records.map((r) => ({ ...r, id: envId(r.name) }));
    expect(() =>
      assertNoCollisions(records, parsed.sections.map((s) => ({ heading: s.heading }))),
    ).toThrow(/anchor collision on "#secret"/);
  });

  it("throws when two sections slug the same", () => {
    expect(() =>
      // Punctuation is dropped by the slugger, so these two differ on the
      // page and not in the fragment.
      assertNoCollisions([], [{ heading: "Secret Options" }, { heading: "Secret Options!" }]),
    ).toThrow(/anchor collision/);
  });
});
