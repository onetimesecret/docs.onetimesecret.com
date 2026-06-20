import { defineCollection, z } from "astro:content";
import { docsLoader, i18nLoader } from "@astrojs/starlight/loaders";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";

// https://starlight.astro.build/guides/i18n/
// https://docs.astro.build/en/guides/content-collections/
export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema({
      extend: z.object({
        "custom.label": z.string().optional(),
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
