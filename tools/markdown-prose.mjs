import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";

const parser = unified().use(remarkParse).use(remarkGfm).use(remarkFrontmatter, ["yaml", "toml"]);
const strip = (value) => value.replace(/[\u{E0100}-\u{E0104}]/gu, "");

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
  const ranges = [];
  const offsets = [0];
  let count = 0;
  for (const char of source) {
    for (let i = 0; i < char.length; i++) offsets.push(count);
    count++;
    offsets[offsets.length - 1] = count;
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
        if (cursor < match.index) ranges.push([offsets[start + cursor], offsets[start + match.index]]);
        cursor = match.index + match[0].length;
      }
      if (cursor < raw.length) ranges.push([offsets[start + cursor], offsets[end]]);
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
  return { ranges, shape: shape(tree) };
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
