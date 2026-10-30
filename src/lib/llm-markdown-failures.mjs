// Registry of pages whose Markdown twin fell back to source unexpectedly.
//
// starlight-llm-actions catches whatever its renderer throws, warns, and emits
// the page's raw source, so a renderer cannot fail the build on its own. The
// renderer (src/lib/llm-markdown.ts) records the page here and the integration
// in config/llm-markdown.mjs fails the build from its `astro:build:done` hook.
//
// The two run in one process but in different module graphs (the renderer in
// the build's SSR bundle, the integration at config time), so a module-level
// Map would be two Maps. The registry lives on globalThis under a shared key.
const KEY = Symbol.for('docs.llm-markdown.failures');

/** @returns {Map<string, string>} entry id -> reason */
function registry() {
  return (globalThis[KEY] ??= new Map());
}

/**
 * @param {string} id
 * @param {unknown} error
 */
export function recordRenderFailure(id, error) {
  registry().set(id, error instanceof Error ? error.message : String(error));
}

/** @returns {Map<string, string>} a copy, entry id -> reason */
export function renderFailures() {
  return new Map(registry());
}

export function clearRenderFailures() {
  registry().clear();
}
