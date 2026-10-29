import { parse } from 'parse5';
import textprov from 'textprov';

const escape = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const codepoint = (value) => `\\u{${value.toString(16)}}`;
const candidate = new RegExp(`[${codepoint(textprov.mapping.selectors.ai)}${
  textprov.mapping.puaRanges.map(([start, end]) => `${codepoint(start)}-${codepoint(end)}`).join('')
}]`, 'u');
const excluded = new Set(['script', 'style', 'code', 'pre', 'textarea', 'svg', 'math',
  'noscript', 'iframe', 'noembed', 'noframes', 'xmp', 'plaintext', 'template']);
const references = new Set(['aria-labelledby', 'aria-describedby', 'aria-controls', 'aria-owns',
  'aria-flowto', 'aria-activedescendant', 'aria-details', 'aria-errormessage', 'for', 'list', 'headers', 'form']);
const labels = new Set(['aria-label', 'title', 'alt']);

// This integration reads only recorded AI marks in opted-in docs. In particular,
// U+E0100 remains untouched: 辻 + U+E0100 is a real ideographic variation sequence.
// TextProv's baseline is experimental; these values are not a private namespace.
// Human-state selectors are indistinguishable from genuine IVS here, so they are
// deliberately published as-is rather than decoded.
/**
 * @param {string} text
 * @returns {{ state: 'ai' | null, text: string }[]}
 */
export function aiRuns(text) {
  return textprov.runs(text, { merge_whitespace: false }).map(run => ({
    state: run.state === 'ai' ? 'ai' : null,
    text: run.state === 'ai'
      ? textprov.runs(run.text, { strip: true }).map(part => part.text).join('')
      : run.text,
  }));
}

// Context around the first marker, with marks and other invisible code points
// spelled out, so an author can find the offending cluster in the source.
const excerpt = (text) => {
  const at = Math.max(0, text.search(candidate));
  return Array.from(text.slice(Math.max(0, at - 24), at + 24), char =>
    /[\p{M}\p{C}]/u.test(char) ? `<U+${char.codePointAt(0).toString(16).toUpperCase()}>` : char).join('');
};

/** @type {(text: string) => string} */
export const clean = (text) => candidate.test(text) ? aiRuns(text).map(run => run.text).join('') : text;

// github-slugger drops punctuation such as ? , ( ) and quotes but keeps the
// selector that followed it. That selector trails the previous cluster's own
// (or leads the ID), and clean() strips only one per cluster. IDs are never
// displayed, so drop every remaining AI selector from them and their references.
// This intentionally removes U+E0101 even after CJK, where it can be a genuine
// IVS; this extra identifier normalization must not be applied to body text.
const selector = String.fromCodePoint(textprov.mapping.selectors.ai);
/** @type {(id: string) => string} */
const cleanId = (id) => clean(id).replaceAll(selector, '');

// Rewrite only affected source ranges, preserving the rest of Astro's HTML
// byte-for-byte (including islands, scripts, attributes, entities, and doctype).
// Runs during prerender, before Starlight builds its Pagefind index, and in dev.
/**
 * @param {string} html
 * @param {{ requireEnrollment?: boolean, label?: string }} [options] label names
 *   the page in errors, since one bad cluster otherwise fails a whole build anonymously.
 * @returns {string}
 */
// Enrollment is required unless a caller opts out, so a new caller cannot
// decode the whole site by omission.
export function renderProvenance(html, { requireEnrollment = true, label } = {}) {
  /** @type {(message: string) => never} */
  const fail = (message) => { throw new Error(`TextProv: ${message}${label ? ` (${label})` : ''}`); };
  // Numeric entities and percent-encoded local fragments can hide every marker.
  if (!candidate.test(html) && !html.includes('&#') && !html.includes('%')) return html;
  const tree = parse(html, { sourceCodeLocationInfo: true });
  const edits = [];
  const ids = [];
  let enrolled = false;
  function collectIds(node) {
    const attrs = node.attrs ?? [];
    if (attrs.some(a => a.name === 'class' && a.value.split(/\s+/).includes('textprov-document')) &&
        attrs.some(a => a.name === 'data-textprov-document' && a.value === 'true')) enrolled = true;
    const id = node.attrs?.find(a => a.name === 'id');
    if (id) ids.push(id.value);
    for (const child of node.childNodes ?? []) collectIds(child);
  }
  collectIds(tree);
  if (requireEnrollment && !enrolled) return html;
  // The slugger sees the original selectors and can consider marked/unmarked
  // versions of the same heading different. Keep existing clean IDs stable,
  // reject collisions with decoded ones, and remap their local references.
  const usedIds = new Set(ids.filter(id => cleanId(id) === id));
  const idMap = new Map();
  function resolveId(id, attribute) {
    const target = idMap.get(id) ?? cleanId(id);
    if (candidate.test(target)) fail(`malformed AI marker in ${attribute}: "${excerpt(id)}"`);
    if (id && !target) fail(`decoded identifier in ${attribute} is empty: "${excerpt(id)}"; use a non-empty identifier`);
    return target;
  }
  for (const id of ids) {
    const base = cleanId(id);
    if (base === id || idMap.has(id)) continue;
    // A decoded id another element already has cannot be renumbered quietly.
    // This page's own TOC links could be remapped to "base-1", but a link from
    // another page to #base would reach the other heading, and no later check
    // can see that: the fragment never reaches the server. Fail so the author
    // renames one of the headings; a warning scrolls past in a 17-locale build.
    if (usedIds.has(base)) fail(`decoded id "${base}" is already used by another element; rename one of the headings`);
    usedIds.add(base);
    idMap.set(id, base);
  }
  // Display groups do not change exact .textprov-ai spans or source marks.
  // Each text node keeps its original inline formatting/native annotation parent.
  const blocks = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'dt', 'dd',
    'td', 'th', 'figcaption', 'div', 'section', 'article', 'blockquote']);
  const owners = new Map();
  const markedPassages = new Set();
  function collectPassages(node, prose = false, owner = null) {
    if (excluded.has(node.tagName)) return;
    prose ||= node.attrs?.some(a => a.name === 'class' && a.value.split(/\s+/).includes('sl-markdown-content'));
    if (prose && blocks.has(node.tagName)) owner = node;
    if (prose && node.nodeName === '#text') {
      const key = owner ?? node;
      owners.set(node, key);
      if (candidate.test(node.value) && aiRuns(node.value).some(run => run.state === 'ai')) markedPassages.add(key);
    }
    for (const child of node.childNodes ?? []) collectPassages(child, prose, owner);
  }
  collectPassages(tree);
  function visit(node, prose = false, blocked = false) {
    if (blocked) return;
    const attrs = node.attrs ?? [];
    prose ||= attrs.some(a => a.name === 'class' && a.value.split(/\s+/).includes('sl-markdown-content'));
    if (node.nodeName === '#text' && (candidate.test(node.value) || (prose && markedPassages.has(owners.get(node))))) {
      const runs = aiRuns(node.value);
      // Any marker left after decoding is malformed, e.g. a legacy PUA code point
      // followed by a selector, which decodes to the PUA code point and renders as tofu.
      if (runs.some(run => candidate.test(run.text))) fail(`malformed AI marker in managed text: "${excerpt(node.value)}"`);
      const passage = prose && markedPassages.has(owners.get(node));
      if (runs.some(run => run.state === 'ai') || passage) {
        const location = node.sourceCodeLocation;
        if (!location) fail('marked text has no source location');
        const exact = runs.map(run =>
          prose && run.state === 'ai'
            ? `<span class="textprov-ai" data-textprov="ai">${escape(run.text)}</span>`
            : escape(run.text)
        ).join('');
        edits.push([location.startOffset, location.endOffset, passage
          ? `<span class="textprov-passage" data-textprov-passage="ai">${exact}</span>`
          : exact]);
      }
    }
    // Heading IDs, TOC fragments, and accessible labels can derive from marked
    // headings. Clean them too so deep links and accessibility text stay usable.
    for (const attr of attrs) {
      // Never rewrite serialized island props, event handlers, or other opaque
      // attributes. Only derived text labels and actual ID references belong here.
      if (attr.name !== 'id' && attr.name !== 'href' && !references.has(attr.name) &&
          !labels.has(attr.name) && !(node.tagName === 'meta' && attr.name === 'content')) continue;
      const value = attr.value;
      if (attr.name === 'href' && !value.startsWith('#')) continue;
      let plain;
      if (attr.name === 'href') {
        // Look the fragment up decoded, but write it back encoded. The component
        // pair round-trips reserved characters (%23 stays #), unlike decodeURI.
        let fragment = value.slice(1), decoded = false;
        try { fragment = decodeURIComponent(fragment); decoded = true; } catch { /* Keep malformed legacy URLs. */ }
        // Validate decoded text before encoding can hide a residual PUA marker.
        const target = resolveId(fragment, attr.name);
        plain = target === fragment ? value : '#' + (decoded ? encodeURIComponent(target) : target);
      } else {
        plain = attr.name === 'id'
          ? resolveId(value, attr.name)
          : references.has(attr.name)
            ? value.replace(/\S+/g, id => resolveId(id, attr.name))
            : clean(value);
      }
      if (plain !== value) {
        const location = node.sourceCodeLocation?.attrs?.[attr.name];
        if (!location) fail('marked attribute has no source location');
        edits.push([location.startOffset, location.endOffset,
          `${attr.name}="${escape(plain).replaceAll('"', '&quot;')}"`]);
      }
    }
    // An excluded element's own labels and IDs are cleaned above, but nothing
    // inside it is. Inert template contents (node.content) remain untouched.
    for (const child of node.childNodes ?? []) visit(child, prose, excluded.has(node.tagName));
  }
  visit(tree);
  for (const [start, end, value] of edits.sort((a, b) => b[0] - a[0])) html = html.slice(0, start) + value + html.slice(end);
  return html;
}
