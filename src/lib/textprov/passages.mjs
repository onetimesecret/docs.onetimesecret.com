// These ranges are display context, not attribution. Offsets use UTF-16, like
// Intl.Segmenter and String.slice, so they can be projected back into DOM text.
const MAX_GAP_WORDS = 2;
const MAX_GAP_CHARACTERS = 32;
const segmenters = new Map();

function forLocale(locale) {
  if (!segmenters.has(locale)) {
    let words, sentences;
    try {
      words = new Intl.Segmenter(locale, { granularity: 'word' });
      sentences = new Intl.Segmenter(locale, { granularity: 'sentence' });
    } catch (error) {
      if (!(error instanceof RangeError)) throw error;
      words = new Intl.Segmenter('en', { granularity: 'word' });
      sentences = new Intl.Segmenter('en', { granularity: 'sentence' });
    }
    segmenters.set(locale, { words, sentences });
  }
  return segmenters.get(locale);
}

/**
 * Expand exact AI ranges to words and bridge small gaps within a sentence.
 * No sentence/paragraph expansion or density-based attribution is performed.
 * @param {string} text
 * @param {{ start: number, end: number }[]} exact Sorted, non-overlapping ranges.
 * @param {string} [locale]
 * @returns {{ start: number, end: number }[]}
 */
export function passageRanges(text, exact, locale = 'en') {
  if (!exact.length) return [];
  const { words, sentences } = forLocale(locale);
  const result = [];
  let markIndex = 0;
  for (const sentence of sentences.segment(text)) {
    let previous = null;
    for (const word of words.segment(sentence.segment)) {
      const start = sentence.index + word.index;
      const end = start + word.segment.length;
      while (markIndex < exact.length && exact[markIndex].end <= start) markIndex++;
      for (let i = markIndex; i < exact.length && exact[i].start < end; i++) {
        // Punctuation-only edits stay exact; don't expand them to a whole
        // whitespace/punctuation segment or an unrelated neighboring word.
        const range = word.isWordLike
          ? { start, end }
          : { start: Math.max(start, exact[i].start), end: Math.min(end, exact[i].end) };
        const gap = previous ? text.slice(previous.end, range.start) : '';
        const nearby = previous && Array.from(gap).length <= MAX_GAP_CHARACTERS &&
          Array.from(words.segment(gap)).filter(part => part.isWordLike).length <= MAX_GAP_WORDS;
        if (previous && (range.start <= previous.end || nearby)) {
          previous.end = Math.max(previous.end, range.end);
        } else {
          previous = range;
          result.push(range);
        }
      }
    }
  }
  return result;
}
