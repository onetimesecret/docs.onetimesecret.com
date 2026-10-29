// These ranges are display context, not attribution. Offsets use UTF-16, like
// Intl.Segmenter and String.slice, so they can be projected back into DOM text.
const MAX_GAP_WORDS = 2;
const MAX_GAP_CHARACTERS = 32;
// Bounded by the configured locales in practice; keyed by raw lang values.
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

// Each code point is at least one UTF-16 unit, so a gap longer than twice the
// limit in UTF-16 cannot fit; only the remaining gaps are segmented.
function bridgeable(words, gap) {
  if (gap.length > MAX_GAP_CHARACTERS * 2) return false;
  let characters = 0;
  for (const _ of gap) if (++characters > MAX_GAP_CHARACTERS) return false;
  let count = 0;
  for (const part of words.segment(gap)) if (part.isWordLike && ++count > MAX_GAP_WORDS) return false;
  return true;
}

/**
 * Expand exact AI ranges to words and bridge small gaps within a sentence.
 * No sentence/paragraph expansion or density-based attribution is performed.
 * The gap limit applies between neighbours, so a sentence edited every few
 * words becomes one range; a sentence boundary always ends the chain.
 * @param {string} text
 * @param {{ start: number, end: number }[]} exact Sorted, non-overlapping ranges.
 * @param {string} [locale]
 * @returns {{ start: number, end: number }[]} Sorted, non-overlapping, non-adjacent ranges.
 */
export function passageRanges(text, exact, locale = 'en') {
  if (!exact.length) return [];
  const { words, sentences } = forLocale(locale);
  const result = [];
  let previous = null;
  let markIndex = 0;
  for (const sentence of sentences.segment(text)) {
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
        // Touching ranges coalesce even across a sentence boundary, so one
        // recorded run never renders as two adjacent fragments. Gaps are only
        // bridged when the previous range belongs to the same sentence.
        const nearby = previous && previous.end > sentence.index &&
          bridgeable(words, text.slice(previous.end, range.start));
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
