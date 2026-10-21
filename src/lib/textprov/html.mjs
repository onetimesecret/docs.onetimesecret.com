import { parse } from 'parse5';
import textprov from '../../../vendor/textprov/textprov.cjs';

const escape = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const candidate = /[\u{E0101}\u{100000}-\u{10FFFF}]/u;
const excluded = new Set(['script', 'style', 'code', 'pre', 'textarea', 'svg', 'math',
  'noscript', 'iframe', 'noembed', 'noframes', 'xmp', 'plaintext', 'template']);
const references = new Set(['aria-labelledby', 'aria-describedby', 'aria-controls', 'aria-owns',
  'aria-flowto', 'aria-activedescendant', 'aria-details', 'aria-errormessage', 'for', 'list', 'headers', 'form']);
const labels = new Set(['aria-label', 'title', 'alt']);

// This integration reads only recorded AI marks in opted-in docs. In particular,
// U+E0100 remains untouched: 辻 + U+E0100 is a real ideographic variation sequence.
// TextProv's baseline is experimental; these values are not a private namespace.
export function aiRuns(text) {
  return textprov.runs(text).map(run => ({
    state: run.state === 'ai' ? 'ai' : null,
    text: run.state === 'ai'
      ? textprov.runs(run.text, { strip: true }).map(part => part.text).join('')
      : run.text,
  }));
}

export const clean = (text) => candidate.test(text) ? aiRuns(text).map(run => run.text).join('') : text;

// Rewrite only affected source ranges, preserving the rest of Astro's HTML
// byte-for-byte (including islands, scripts, attributes, entities, and doctype).
// Runs during prerender, before Starlight builds its Pagefind index, and in dev.
export function renderProvenance(html, { requireEnrollment = false } = {}) {
  if (!candidate.test(html) && !html.includes('&#')) return html;
  const tree = parse(html, { sourceCodeLocationInfo: true });
  const edits = [];
  const ids = [];
  let enrolled = false;
  function collectIds(node) {
    const attrs = node.attrs ?? [];
    if (attrs.some(a => a.name === 'class' && a.value.split(/\s+/).includes('textprov-controls')) &&
        attrs.some(a => a.name === 'data-textprov-document' && a.value === 'true')) enrolled = true;
    const id = node.attrs?.find(a => a.name === 'id');
    if (id) ids.push(id.value);
    for (const child of node.childNodes ?? []) collectIds(child);
  }
  collectIds(tree);
  if (requireEnrollment && !enrolled) return html;
  // The slugger sees the original selectors and can consider marked/unmarked
  // versions of the same heading different. Keep existing clean IDs stable,
  // allocate unique IDs for the decoded ones, and remap their TOC links.
  const usedIds = new Set(ids.filter(id => clean(id) === id));
  const idMap = new Map();
  for (const id of ids) {
    const base = clean(id);
    if (base === id) continue;
    let value = base, suffix = 1;
    while (usedIds.has(value)) value = `${base}-${suffix++}`;
    usedIds.add(value);
    idMap.set(id, value);
  }
  function visit(node, prose = false, blocked = false) {
    const attrs = node.attrs ?? [];
    prose ||= attrs.some(a => a.name === 'class' && a.value.split(/\s+/).includes('sl-markdown-content'));
    blocked ||= excluded.has(node.tagName);
    if (blocked) return;
    if (node.nodeName === '#text' && candidate.test(node.value)) {
      const runs = aiRuns(node.value);
      if (runs.some(run => run.state === 'ai')) {
        const location = node.sourceCodeLocation;
        if (location) edits.push([location.startOffset, location.endOffset, runs.map(run =>
          prose && run.state === 'ai'
            ? `<span class="textprov-ai" data-textprov="ai">${escape(run.text)}</span>`
            : escape(run.text)
        ).join('')]);
      }
    }
    // Heading IDs, TOC fragments, and accessible labels can derive from marked
    // headings. Clean them too so deep links and accessibility text stay usable.
    for (const attr of attrs) {
      // Never rewrite serialized island props, event handlers, or other opaque
      // attributes. Only derived text labels and actual ID references belong here.
      if (attr.name !== 'id' && attr.name !== 'href' && !references.has(attr.name) &&
          !labels.has(attr.name) && !(node.tagName === 'meta' && attr.name === 'content')) continue;
      let value = attr.value;
      if (attr.name === 'href' && !value.startsWith('#')) continue;
      if (attr.name === 'href' && value.startsWith('#')) {
        try { value = decodeURI(value); } catch { /* Keep malformed legacy URLs. */ }
      }
      const plain = attr.name === 'id'
        ? (idMap.get(value) ?? clean(value))
        : attr.name === 'href' && value.startsWith('#')
          ? '#' + (idMap.get(value.slice(1)) ?? clean(value.slice(1)))
          : references.has(attr.name)
            ? value.replace(/\S+/g, id => idMap.get(id) ?? clean(id))
          : clean(value);
      if (plain !== value) {
        const location = node.sourceCodeLocation?.attrs?.[attr.name];
        if (location) edits.push([location.startOffset, location.endOffset,
          `${attr.name}="${escape(plain).replaceAll('"', '&quot;')}"`]);
      }
    }
    // Inert template contents (node.content) deliberately remain untouched.
    for (const child of node.childNodes ?? []) visit(child, prose, blocked);
  }
  visit(tree);
  for (const [start, end, value] of edits.sort((a, b) => b[0] - a[0])) html = html.slice(0, start) + value + html.slice(end);
  return html;
}
