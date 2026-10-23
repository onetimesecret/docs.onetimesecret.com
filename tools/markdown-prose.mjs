import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import { frontmatter } from './frontmatter.mjs';
import textprov from '../vendor/textprov/textprov.cjs';

const parser = unified().use(remarkParse).use(remarkGfm).use(remarkFrontmatter, ["yaml", "toml"]);
// Normalize AST comparisons using the same VS/legacy-PUA registry as the SDK.
// This never rewrites source; old grapheme encodings are retained by dogfood.py.
const strip = (value) => textprov.runs(value, { strip: true }).map(run => run.text).join('');

function maskDirectives(source) {
  let output = '', cursor = 0;
  while (true) {
    const start = source.indexOf('{%', cursor);
    if (start < 0) return output + source.slice(cursor);
    let end = start + 2, quote = null;
    for (; end < source.length; end++) {
      const char = source[end];
      if (char === '\\' && quote) { end++; continue; }
      if (quote) { if (char === quote) quote = null; }
      else if (char === '"' || char === "'") quote = char;
      else if (source.startsWith('%}', end)) { end += 2; break; }
    }
    output += source.slice(cursor, start) + source.slice(start, end).replace(/[^\r\n]/g, ' ');
    cursor = end;
  }
}

// Starlight asides are container directives (`:::note`, `:::caution[Label]`).
// remark-directive is not loaded here, so a fence parses as paragraph text.
// Its colons, name, label brackets and attributes are syntax; the label text
// stays prose. A mark inside the colons or name stops the fence matching, so
// listing the fences in the shape rejects marks that would break the aside.
const fencePattern = /^((?:[ \t]*>)*[ \t]*)(:{3,}[A-Za-z0-9_-]*)(?:(\[)([^\n]*)\])?(\{[^\n]*\})?[ \t]*\r?$/gm;

function directiveFences(source) {
  const fences = [], spans = [];
  for (const match of source.matchAll(fencePattern)) {
    const [, prefix, marker, open, label, attributes] = match;
    let cursor = match.index + prefix.length;
    spans.push([cursor, cursor += marker.length]);
    if (open) {
      spans.push([cursor, cursor + 1]);
      cursor += 1 + label.length;
      spans.push([cursor, cursor += 1]);
    }
    if (attributes) spans.push([cursor, cursor + attributes.length]);
    fences.push(marker);
  }
  return { fences, spans };
}

function shape(node) {
  if (Array.isArray(node)) return node.map(shape);
  if (node && typeof node === "object") {
    return Object.fromEntries(
      Object.entries(node)
        .filter(([key]) => key !== "position")
        .map(([key, value]) => [key, shape(value)]),
    );
  }
  return typeof node === "string" ? strip(node) : node;
}

function inspect(source) {
  // Markdoc directives are syntax, including their string attributes. Preserve
  // their UTF-16 offsets while exposing only Markdown text nodes to marking.
  const masked = maskDirectives(source);
  const tree = parser.parse(masked);
  const { fences, spans } = directiveFences(source);
  const fenced = new Set(spans.flatMap(([start, end]) => Array.from({ length: end - start }, (_, i) => start + i)));
  const ranges = [];
  const offsets = [0];
  let count = 0;
  for (const char of source) {
    for (let i = 0; i < char.length; i++) offsets.push(count);
    count++;
    offsets[offsets.length - 1] = count;
  }
  // Record a UTF-16 interval as code-point ranges, leaving out fence syntax.
  function push(from, to) {
    for (let i = from; i < to; i++) {
      if (fenced.has(i)) continue;
      let j = i;
      while (j < to && !fenced.has(j)) j++;
      ranges.push([offsets[i], offsets[j]]);
      i = j;
    }
  }
  function walk(node) {
    if (node.type === "text") {
      const start = node.position.start.offset;
      const end = node.position.end.offset;
      const raw = source.slice(start, end);
      // Escapes and entities remain literal source syntax, even in text nodes.
      const protectedSyntax = /\\[!"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~]|&(?:#[xX][0-9a-fA-F]+|#[0-9]+|[a-zA-Z][a-zA-Z0-9]*);/g;
      let cursor = 0;
      for (const match of raw.matchAll(protectedSyntax)) {
        if (cursor < match.index) push(start + cursor, start + match.index);
        cursor = match.index + match[0].length;
      }
      if (cursor < raw.length) push(start + cursor, end);
    }
    // Autolinks have text children but their text is also the destination.
    if (node.type === "link" && node.position) {
      const raw = source.slice(node.position.start.offset, node.position.end.offset);
      if (!raw.startsWith("[")) return;
    }
    // A shortcut or collapsed reference uses its visible label as an ID.
    if (node.type === "linkReference" && node.referenceType !== "full") return;
    for (const child of node.children ?? []) walk(child);
  }
  walk(tree);
  const metadata = frontmatter(source);
  return { ranges, shape: { tree: shape(tree), fences }, hasFrontmatter: metadata !== null,
    hasTextprov: metadata !== null && Object.hasOwn(metadata, 'textprov'), textprov: metadata?.textprov ?? null };
}

let input = "";
for await (const chunk of process.stdin) input += chunk;
try {
  const sources = JSON.parse(input);
  process.stdout.write(JSON.stringify(sources.map(inspect)));
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
