// Unit tests for the config/redirects.mjs invariants, so a regression there
// fails a fast test rather than only a full `astro build`.
import { describe, expect, it } from "vitest";

import { i18nConfig } from "../../config/i18n.mjs";
import {
  assertNoChainedRedirects,
  assertNoDuplicateSources,
  createRedirectsConfig,
  isOffsiteTarget,
} from "../../config/redirects.mjs";

describe("assertNoChainedRedirects", () => {
  it("accepts a table whose targets are all terminal", () => {
    expect(() =>
      assertNoChainedRedirects({
        "/en/old": "/en/new/",
        "/en/older": "/en/new/",
      }),
    ).not.toThrow();
  });

  it("throws when a target is itself a redirect key", () => {
    expect(() =>
      assertNoChainedRedirects({
        "/en/a": "/en/b/",
        "/en/b": "/en/c/",
      }),
    ).toThrow(/chained redirect/);
  });

  it("normalizes trailing slashes and fragments before comparing", () => {
    // /en/a targets /en/b#x — still a chain even though the key has no
    // trailing slash and the target carries a fragment.
    expect(() =>
      assertNoChainedRedirects({
        "/en/a": "/en/b/#x",
        "/en/b": "/en/c/",
      }),
    ).toThrow(/chained redirect/);
  });

  it("exempts off-site targets — they leave the build", () => {
    expect(() =>
      assertNoChainedRedirects({
        "/en/gone": "https://example.com/en/also-a-key/",
        "/en/also-a-key": "/en/kept/",
      }),
    ).not.toThrow();
  });
});

describe("assertNoDuplicateSources", () => {
  it("accepts distinct sources", () => {
    expect(() =>
      assertNoDuplicateSources([
        { from: "a", to: "x" },
        { from: "b", to: "x" },
      ]),
    ).not.toThrow();
  });

  it("throws on a duplicate `from` instead of silently keeping the last", () => {
    expect(() =>
      assertNoDuplicateSources([
        { from: "a", to: "x" },
        { from: "a", to: "y" },
      ]),
    ).toThrow(/duplicate/);
  });
});

describe("isOffsiteTarget", () => {
  it.each(["https://example.com/", "mailto:x@example.com", "web+foo:bar"])(
    "treats %s as off-site",
    (target) => expect(isOffsiteTarget(target)).toBe(true),
  );

  it.each(["/en/start/", "en/start", "#fragment"])(
    "treats %s as on-site",
    (target) => expect(isOffsiteTarget(target)).toBe(false),
  );
});

describe("the live table", () => {
  it("builds without tripping its own invariants", () => {
    // createRedirectsConfig runs both assertions internally; calling it is
    // the regression test for the real movedPages data.
    const redirects = createRedirectsConfig();
    expect(Object.keys(redirects).length).toBeGreaterThan(600);
  });
});

describe("the Phase 4 configuration cutover", () => {
  const redirects = createRedirectsConfig();

  it("sends every locale's retired configuration page to the precedence reference", () => {
    for (const locale of ["en", "da", "mi", "pt-br", "sv", "tr", "uk", "zh-cn", "fr"]) {
      expect(redirects[`/${locale}/self-hosting/configuration`]).toBe(
        `/${locale}/reference/configuration-files-and-precedence/`,
      );
    }
  });

  it("leaves the English generator URL out of the table, because it is still a page", () => {
    // src/pages/en/self-hosting/configuration-generator.astro forwards with the
    // query string and fragment intact; a redirect stub cannot. No source URL
    // may be both a page and a redirect.
    expect(redirects["/en/self-hosting/configuration-generator"]).toBeUndefined();
  });

  it("sends the other locales' generator URL straight to the new route", () => {
    for (const locale of ["da", "fr", "zh-cn"]) {
      expect(redirects[`/${locale}/self-hosting/configuration-generator`]).toBe(
        "/en/reference/generator/",
      );
    }
  });

  it("no longer redirects through the retired English generator route", () => {
    for (const target of Object.values(redirects)) {
      expect(target).not.toContain("/self-hosting/configuration-generator");
    }
  });
});

describe("the data-protection retirement (2026-10-30 audit, batch 1)", () => {
  const redirects = createRedirectsConfig();

  it("sends every configured locale's page to Data minimization in the same locale", () => {
    for (const locale of Object.keys(i18nConfig.locales)) {
      expect(redirects[`/${locale}/security/data-protection`]).toBe(
        `/${locale}/security/our-principles/#data-minimization`,
      );
    }
  });
});

describe("the deleted v0.23 and v0.24 upgrade guides (2026-10-30 audit, batch 1)", () => {
  const redirects = createRedirectsConfig();

  // The v0.24.0 GitHub release notes link the v0.24 guide, so this URL must keep resolving.
  it("sends every configured locale's guide URL to the upgrade guide index", () => {
    for (const locale of Object.keys(i18nConfig.locales)) {
      for (const slug of ["upgrading-v0-23", "upgrading-v0-24"]) {
        expect(redirects[`/${locale}/self-hosting/${slug}`]).toBe(`/${locale}/self-hosting/upgrade-guides/`);
      }
    }
  });
});
