import { describe, expect, it } from 'vitest';
import { passageRanges } from './passages.mjs';

function passages(text: string, marks: string[], locale = 'en') {
  const exact = marks.map(mark => ({ start: text.indexOf(mark), end: text.indexOf(mark) + mark.length }))
    .sort((a, b) => a.start - b.start);
  return passageRanges(text, exact, locale).map(range => text.slice(range.start, range.end));
}

describe('bounded passage context', () => {
  it('expands one character to its word, not its paragraph', () => {
    expect(passages('An unchanged paragraph with one edited word and more original prose.', ['dited']))
      .toEqual(['edited']);
  });

  it('bridges at most two unmarked words without extending the outer edges', () => {
    expect(passages('Before first one two last after.', ['first', 'last']))
      .toEqual(['first one two last']);
    expect(passages('Before first one two three last after.', ['first', 'last']))
      .toEqual(['first', 'last']);
  });

  it('also caps gaps by characters, even for a single very long word or whitespace', () => {
    expect(passages('first extraordinarilylongunchangedterminology last', ['first', 'last']))
      .toEqual(['first', 'last']);
    expect(passages('first                                 last', ['first', 'last']))
      .toEqual(['first', 'last']);
  });

  it('does not bridge sentence boundaries', () => {
    expect(passages('First changed. Next changed.', ['First', 'Next']))
      .toEqual(['First', 'Next']);
    expect(passages('Edited. Changed.', ['Edited.', 'Changed.']))
      .toEqual(['Edited.', 'Changed.']);
  });

  it('keeps punctuation-only edits local', () => {
    expect(passages('Original prose, still unchanged.', [','])).toEqual([',']);
  });

  it('uses locale-aware segmentation for text without spaces', () => {
    const text = 'これは日本語の文章です。';
    const word = [...new Intl.Segmenter('ja', { granularity: 'word' }).segment(text)]
      .find(part => part.segment.includes('本'))!;
    expect(word.segment.length).toBeLessThan(text.length);
    expect(passages(text, ['本'], 'ja')).toEqual([word.segment]);
  });

  it('preserves combining characters and UTF-16 offsets after emoji', () => {
    expect(passages('😀 Original café prose.', ['é'])).toEqual(['café']);
    expect(passages('Original 👩‍💻 prose.', ['👩‍💻'])).toEqual(['👩‍💻']);
  });

  it('falls back deterministically for invalid language tags and ignores unmarked text', () => {
    expect(passages('Original edited prose.', ['edited'], 'not_a_locale')).toEqual(['edited']);
    expect(passageRanges('Entirely original.', [])).toEqual([]);
  });
});
