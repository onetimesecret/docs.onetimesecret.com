import { parse } from 'yaml';

// Shared by the authoring CLI's parser bridge and Vale preparation. YAML owns
// booleans, spacing, comments, and block delimiters; source bytes stay intact.
export function frontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)^(?:---|\.\.\.)\s*(?:\r?\n|$)/m);
  if (!match || match.index !== 0) return null;
  const data = parse(match[1]);
  if (data !== null && (typeof data !== 'object' || Array.isArray(data))) throw new Error('frontmatter must be a YAML mapping');
  return data ?? {};
}
