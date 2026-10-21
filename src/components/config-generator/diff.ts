// src/components/config-generator/diff.ts
//
// Line-level change detection for the generated files, so the UI can
// highlight what a selection rewrote. UI only; it has no effect on the
// generated output.

/** The lines of a generated file, without an empty entry for the final newline. */
export function splitLines(content: string): string[] {
  return content.replace(/\n$/, '').split('\n');
}

/**
 * Flags each line of `next` that is outside a longest common subsequence with
 * `prev`: the lines a change added or rewrote. Removed lines have no place in
 * `next` and are not reported. Matching by position rather than by text keeps
 * repeated lines apart (the `enabled: false` under domains and the one under
 * regions). The files are a few dozen lines, so the quadratic table is fine.
 */
export function changedLines(prev: string, next: string): boolean[] {
  const a = splitLines(prev);
  const b = splitLines(next);
  // lcs[i][j]: length of the longest common subsequence of a[i..] and b[j..].
  const lcs = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }
  const changed = new Array<boolean>(b.length).fill(true);
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      changed[j] = false;
      i++;
      j++;
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      i++;
    } else {
      j++;
    }
  }
  return changed;
}
