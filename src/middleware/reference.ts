import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import environment from '../data/reference/environment-variables.json';

export const onRequest = defineRouteMiddleware((context) => {
  const route = context.locals.starlightRoute;
  // Fallback locales use the English entry too. Component headings are not
  // extracted by MDX, so supply the same section ids the component renders.
  if (route.entry.id !== 'en/reference/environment-variables') return;

  route.headings = environment.sections.map(({ heading, anchor }) => ({
    depth: 2,
    text: heading,
    slug: anchor,
  }));
  if (route.toc) {
    route.toc.items.push(...route.headings
      .filter(({ depth }) => depth >= route.toc!.minHeadingLevel && depth <= route.toc!.maxHeadingLevel)
      .map((heading) => ({ ...heading, children: [] })));
  }
});
