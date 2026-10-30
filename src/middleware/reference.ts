import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import configuration from '../data/reference/configuration.json';
import environment from '../data/reference/environment-variables.json';
import { pageHeadings } from '../lib/reference/configuration.mjs';

type Heading = { depth: number; text: string; slug: string };
type TocItem = Heading & { children: TocItem[] };

// Starlight nests a flat heading list by depth (utils/generateToC). The same
// rule here keeps the component-rendered pages' tables of contents shaped like
// a Markdown page's.
function nest(items: TocItem[], item: TocItem): void {
  const last = items.at(-1);
  if (!last || last.depth >= item.depth) items.push(item);
  else nest(last.children, item);
}

// Component-rendered headings are not extracted by MDX, so the pages rendered
// from src/data/reference/ supply the heading ids their components render.
const componentHeadings = new Map<string, Heading[]>([
  [
    'en/reference/environment-variables',
    environment.sections.map(({ heading, anchor }) => ({ depth: 2, text: heading, slug: anchor })),
  ],
  ...configuration.pages.map(
    (page) => [`en/reference/${page.owner}`, pageHeadings(page)] as [string, Heading[]],
  ),
]);

export const onRequest = defineRouteMiddleware((context) => {
  const route = context.locals.starlightRoute;
  // Fallback locales use the English entry too.
  const headings = componentHeadings.get(route.entry.id);
  if (!headings) return;

  route.headings = headings;
  if (route.toc) {
    const { minHeadingLevel, maxHeadingLevel } = route.toc;
    for (const heading of headings) {
      if (heading.depth < minHeadingLevel || heading.depth > maxHeadingLevel) continue;
      nest(route.toc.items as TocItem[], { ...heading, children: [] });
    }
  }
});
