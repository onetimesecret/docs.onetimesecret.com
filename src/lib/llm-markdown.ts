// Renderer for the per-page Markdown route that starlight-llm-actions
// publishes (config/starlight.mjs).
//
// The plugin's `'simple'` preset renders each page to HTML in an Astro
// container and flattens that HTML to Markdown, which is what makes the
// data-driven MDX reference pages and the Markdoc pages useful as text. The
// container does not run Astro middleware, so TextProv's marks survive the
// round trip where the published HTML would have had them decoded
// (src/lib/textprov/middleware.ts). This wrapper strips them for the same
// pages the middleware decodes: those enrolled with `textprov: true`. Other
// pages are published as they are, since U+E0101 has real uses in text that
// was never enrolled (src/lib/textprov/html.mjs). Unlike the HTML path,
// `clean` also strips marks inside code; no enrolled page records marks there.
//
// bin/check-textprov.mjs checks the built `.md` twins of enrolled pages.
import type { MarkdownRenderer } from 'starlight-llm-actions';
import renderSimpleMarkdown from 'starlight-llm-actions/internal/simple-markdown';
import { recordRenderFailure } from './llm-markdown-failures.mjs';
import { clean } from './textprov/html.mjs';

// Pages the container cannot render: it registers only the MDX renderer, so a
// page that mounts a framework island throws. Each of these gets its source
// instead, which for the generator is the intro and the setup steps. Any other
// page that fails is a regression (an Astro, Starlight or plugin change), so
// it is recorded and rethrown: the plugin still emits that page's raw source
// with a warning, and config/llm-markdown.mjs then fails the build.
const SOURCE_FALLBACK = new Set(['en/reference/generator']);

const render: MarkdownRenderer = async (entry, context) => {
  let markdown: string;
  try {
    markdown = await renderSimpleMarkdown(entry, context);
  } catch (error) {
    if (!SOURCE_FALLBACK.has(entry.id) || entry.body === undefined) {
      recordRenderFailure(entry.id, error);
      throw error;
    }
    markdown = entry.body;
  }
  return entry.data.textprov === true ? clean(markdown) : markdown;
};

export default render;
