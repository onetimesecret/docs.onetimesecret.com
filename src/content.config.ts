import { defineCollection, z } from "astro:content";
import { docsLoader, i18nLoader } from "@astrojs/starlight/loaders";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";

// Phase 2 frontmatter extension (docs/planning/documentation-audit-2026-08.md).
//
// All four fields are OPTIONAL on purpose. The 60 pages that predate this
// extension carry none of them and must keep building unchanged; Phase 5 owns
// enforcement (making a field required for a given pageType, or failing CI when
// one is missing) once every page has been through the audit. Adding a field
// here is therefore additive and safe — it never invalidates an existing page.
//
// Deliberately NOT added: `translate`. Per D5 this plan ships English only, so a
// per-page translation flag would have no consumer and would encode a decision
// nobody has taken. A future translation initiative selects on `audience`
// instead — "translate every end-user page first" is the shape that request
// takes, and audience is the axis that answers it.
const docsFrontmatterExtension = z.object({
  // Billing tier a reader needs before the page's subject is available to them.
  // Consumed by config/sidebar.mjs, which renders it as a sidebar badge, and by
  // readers deciding whether a page applies to them. Phase 2 carries these
  // across mechanically from the tier group each page already sat under; the
  // production etc/billing.yaml is the source of truth for what the tiers
  // actually contain, and no page may assert an entitlement, seat limit or
  // price that has not been read out of it.
  plan: z.enum(["Free", "Identity Plus", "Team Plus"]).optional(),

  // Who the page is written for. Consumed by a future translation initiative
  // (which selects on it), and by the audit's reachability rule: end-user
  // material must be reachable without an account, operator material assumes a
  // shell on the host. It is also what keeps the hosted and self-hosted trees
  // from silently merging — the same feature gets one page per audience.
  audience: z
    .enum(["end-user", "operator", "developer", "contributor"])
    .optional(),

  // Which of the four content types in docs/templates/README.md this page is.
  // Consumed by the templates (each type has one) and by review: a how-to that
  // spends half its length on concepts is a filing error the type makes visible.
  pageType: z.enum(["concept", "how-to", "reference", "architecture"]).optional(),

  // Where a fact on this page was verified, as a repo-relative path:line into
  // the app source (e.g. "onetimesecret/.env.reference:212"). Required by the
  // "Reference owns every default" rule whenever a prose page states a number
  // rather than linking to the reference page that owns it. Consumed by review
  // and by the drift checks in bin/ — a citation is what makes a restated
  // default auditable instead of a copy that quietly goes stale.
  sourceOfTruth: z.string().optional(),
});

// https://starlight.astro.build/guides/i18n/
// https://docs.astro.build/en/guides/content-collections/
export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({ extend: docsFrontmatterExtension }),
  }),
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema({
      extend: z.object({
        "custom.label": z.string().optional(),
        // Staging banner (StagingBanner.astro). Optional so locales that
        // haven't been translated yet fall back to English per-key.
        "staging.bannerWarning": z.string().optional(),
        "staging.bannerDescription": z.string().optional(),
        "staging.goToProduction": z.string().optional(),
        // Custom 404 page (src/pages/404.astro). Optional so locales that
        // haven't been translated yet fall back to English per-key.
        "notFound.title": z.string().optional(),
        "notFound.message": z.string().optional(),
        "notFound.browseDocs": z.string().optional(),
        "notFound.goToApp": z.string().optional(),
        "notFound.lookingFor": z.string().optional(),
        "notFound.docsTitle": z.string().optional(),
        "notFound.docsDesc": z.string().optional(),
        "notFound.createTitle": z.string().optional(),
        "notFound.createDesc": z.string().optional(),
        "notFound.supportTitle": z.string().optional(),
        "notFound.supportDesc": z.string().optional(),
      }),
    }),
  }),
};
