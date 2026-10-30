import { renderFailures } from '../src/lib/llm-markdown-failures.mjs';

/**
 * Fails the build when a page's Markdown twin fell back to its source without
 * being expected to (src/lib/llm-markdown.ts). starlight-llm-actions only
 * warns in that case and emits the raw source, which after an upgrade that
 * breaks its container would silently degrade every `.md` route to raw MDX
 * imports and Markdoc tags.
 */
export function llmMarkdown() {
  return {
    name: 'docs-llm-markdown',
    hooks: {
      'astro:build:done': () => {
        const failures = renderFailures();
        if (failures.size === 0) return;
        const lines = [...failures].map(([id, reason]) => `  ${id}: ${reason}`);
        throw new Error(
          `[llm-markdown] ${failures.size} page(s) fell back to raw source unexpectedly. ` +
            'Fix the renderer or add the page to SOURCE_FALLBACK in src/lib/llm-markdown.ts.\n' +
            lines.join('\n'),
        );
      },
    },
  };
}
