// Renderer for the per-page Markdown route and the llms.txt bundles that
// starlight-llm-actions publishes (config/starlight.mjs).
//
// The plugin's `'simple'` preset renders each page to HTML in an Astro
// container and flattens that HTML to Markdown, which is what makes the
// data-driven MDX reference pages and the Markdoc pages useful as text. The
// container does not run Astro middleware, so TextProv's marks survive the
// round trip where the published HTML would have had them decoded
// (src/lib/textprov/middleware.ts). This wrapper strips them the same way.
import type { MarkdownRenderer } from 'starlight-llm-actions';
import renderSimpleMarkdown from 'starlight-llm-actions/internal/simple-markdown';
import { clean } from './textprov/html.mjs';

// The container registers only the MDX renderer, so a page that mounts a
// framework island (reference/generator) throws. The plugin's own fallback
// would emit the raw source with its marks intact; this one cleans it.
const render: MarkdownRenderer = async (entry, context) => {
  try {
    return clean(await renderSimpleMarkdown(entry, context));
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(`[llm-markdown] rendering ${entry.id} failed (${reason}); emitting its cleaned source instead`);
    return clean(entry.body ?? '');
  }
};

export default render;
