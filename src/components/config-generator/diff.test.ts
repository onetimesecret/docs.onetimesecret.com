// src/components/config-generator/diff.test.ts
//
// Unit coverage for the line-change detection behind the output highlights.

import { describe, expect, it } from 'vitest';
import { changedLines, splitLines } from './diff';
import { defaultSelections, generate } from './generate';

describe('splitLines', () => {
  it('drops the empty entry after the final newline', () => {
    expect(splitLines('a\nb\n')).toEqual(['a', 'b']);
    expect(splitLines('a\nb')).toEqual(['a', 'b']);
  });
});

describe('changedLines', () => {
  it('flags nothing when the content is unchanged', () => {
    expect(changedLines('a\nb\n', 'a\nb\n')).toEqual([false, false]);
  });

  it('flags a rewritten line', () => {
    expect(changedLines('mode: simple\n', 'mode: full\n')).toEqual([true]);
  });

  it('flags inserted lines and leaves the rest alone', () => {
    expect(changedLines('a\nc\n', 'a\nb1\nb2\nc\n')).toEqual([false, true, true, false]);
  });

  it('reports nothing for removed lines', () => {
    expect(changedLines('a\nb\nc\n', 'a\nc\n')).toEqual([false, false]);
  });

  it('tells repeated lines apart by position', () => {
    const before = generate(defaultSelections()).configYaml;
    const after = generate({ ...defaultSelections(), regions_enabled: true }).configYaml;
    const lines = splitLines(after);
    const flagged = lines.filter((_, i) => changedLines(before, after)[i]);
    // Only the regions toggle, not the identical-looking domains line above it.
    expect(flagged).toEqual(['    enabled: true']);
    expect(lines[lines.indexOf('  regions:') + 1]).toBe('    enabled: true');
  });
});
