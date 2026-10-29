// src/fonts/provenance.test.ts
//
// Guards the provenance (P+ and P*) webfonts against a plain or mis-patched build
// being copied in. Such a file still builds and renders, so nothing else would
// notice the marker mapping is gone. Reads each WOFF2's cmap directly
// (node:zlib has Brotli), so no font-parsing dependency is needed.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliDecompressSync } from 'node:zlib';
import { beforeAll, describe, expect, it } from 'vitest';
import textprov from 'textprov';

const VS18 = textprov.mapping.selectors.ai; // AI-generated marker, follows the base character.
const PUA_B = 0x100000; // AI-generated form: U+100000 + base code point.

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

// The decoder's PUA registry: printable Latin-1 less the soft hyphen, as
// documented in font-face.css.
const COVERED: number[] = textprov.mapping.puaRanges.flatMap(
  ([start, end]: number[]) => range(start - PUA_B, end - PUA_B)
);

const hex = (cp: number) => `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`;

/** Decompress a WOFF2 file and return a selected raw table. */
function readTable(woff2: Buffer, wanted: string): Buffer {
  if (woff2.readUInt32BE(0) !== 0x774f4632) throw new Error('not a WOFF2 file');
  if (woff2.readUInt32BE(4) === 0x74746366) throw new Error('font collections unsupported');
  const numTables = woff2.readUInt16BE(12);
  const compressedSize = woff2.readUInt32BE(20);

  let pos = 48; // Table directory follows the fixed-size header.
  const base128 = () => {
    let value = 0;
    for (let i = 0; i < 5; i++) {
      const byte = woff2[pos++];
      value = value * 128 + (byte & 0x7f);
      if (!(byte & 0x80)) return value;
    }
    throw new Error('malformed UIntBase128');
  };

  // Tables sit unpadded in the decompressed stream, in directory order.
  let offset = 0;
  let found: { offset: number; length: number } | undefined;
  for (let i = 0; i < numTables; i++) {
    const flags = woff2[pos++];
    const tagIndex = flags & 0x3f;
    const transform = flags >> 6;
    const tag = tagIndex === 63 ? woff2.toString('ascii', pos, pos + 4)
      : ({ 0: 'cmap', 28: 'GSUB' } as Record<number, string>)[tagIndex];
    if (tagIndex === 63) pos += 4; // Arbitrary tag spelled out.
    const origLength = base128();
    // glyf (10) and loca (11) mark "untransformed" as 3; every other table as 0.
    const transformed = tagIndex === 10 || tagIndex === 11 ? transform !== 3 : transform !== 0;
    const length = transformed ? base128() : origLength;
    if (tag === wanted) found = { offset, length };
    offset += length;
  }
  if (!found) throw new Error(`no ${wanted} table`);

  const tables = brotliDecompressSync(woff2.subarray(pos, pos + compressedSize));
  return tables.subarray(found.offset, found.offset + found.length);
}

/** Default glyphs (format 12) and per-selector variant glyphs (format 14). */
function parseCmap(cmap: Buffer) {
  const glyphs = new Map<number, number>();
  const variants = new Map<number, Map<number, number>>();

  const numSubtables = cmap.readUInt16BE(2);
  for (let i = 0; i < numSubtables; i++) {
    const sub = cmap.readUInt32BE(4 + i * 8 + 4);
    const format = cmap.readUInt16BE(sub);

    if (format === 12) {
      const numGroups = cmap.readUInt32BE(sub + 12);
      for (let g = 0; g < numGroups; g++) {
        const at = sub + 16 + g * 12;
        const start = cmap.readUInt32BE(at);
        const end = cmap.readUInt32BE(at + 4);
        const glyph = cmap.readUInt32BE(at + 8);
        for (let cp = start; cp <= end; cp++) glyphs.set(cp, glyph + cp - start);
      }
    } else if (format === 14) {
      const numSelectors = cmap.readUInt32BE(sub + 6);
      for (let s = 0; s < numSelectors; s++) {
        const at = sub + 10 + s * 11;
        const nonDefault = cmap.readUInt32BE(at + 7);
        const mappings = new Map<number, number>();
        if (nonDefault) {
          const table = sub + nonDefault;
          const count = cmap.readUInt32BE(table);
          for (let m = 0; m < count; m++) {
            const entry = table + 4 + m * 5;
            mappings.set(cmap.readUIntBE(entry, 3), cmap.readUInt16BE(entry + 3));
          }
        }
        variants.set(cmap.readUIntBE(at, 3), mappings);
      }
    }
  }
  return { glyphs, variants };
}

const dir = fileURLToPath(new URL('.', import.meta.url));
const fonts = ['zilla-slab-provenance', 'maryheather-provenance'].flatMap((family) =>
  readdirSync(join(dir, family))
    .filter((name) => name.endsWith('.woff2'))
    .map((name) => join(family, name))
);

describe('provenance (P+ and P*) webfonts', () => {
  it('ships eight original P+ faces and eight separate P* faces', () => {
    expect(fonts.filter((name) => name.includes('P+'))).toHaveLength(8);
    expect(fonts.filter((name) => name.includes('PStar'))).toHaveLength(8);
    expect(fonts).toHaveLength(16);
  });

  describe.each(fonts)('%s', (font) => {
    // Parse in a hook so a corrupt font fails its tests rather than collection.
    let glyphs: Map<number, number>;
    let variants: Map<number, Map<number, number>>;
    let marked: Map<number, number>;
    beforeAll(() => {
      ({ glyphs, variants } = parseCmap(readTable(readFileSync(join(dir, font)), 'cmap')));
      marked = variants.get(VS18) ?? new Map<number, number>();
    });

    if (font.includes('PStar')) {
      it('retains the original cmap and adds the contextual bridge feature', () => {
        const data = readFileSync(join(dir, font));
        const original = readFileSync(join(dir, font.replace('PStar', 'P+')));
        expect(readTable(data, 'cmap')).toEqual(readTable(original, 'cmap'));
        const gsub = readTable(data, 'GSUB');
        const list = gsub.readUInt16BE(6);
        const tags = Array.from({ length: gsub.readUInt16BE(list) }, (_, i) =>
          gsub.toString('ascii', list + 2 + i * 6, list + 6 + i * 6));
        expect(tags).toContain('rclt');
      });
    }

    it('has a format 12 cmap and a U+E0101 variation selector record', () => {
      expect(glyphs.size).toBeGreaterThan(0);
      expect(variants.has(VS18)).toBe(true);
    });

    it('maps <char, U+E0101> to a marked glyph distinct from the plain one', () => {
      const unmarked = COVERED.filter((cp) => !marked.has(cp) || marked.get(cp) === glyphs.get(cp));
      expect(unmarked.map(hex)).toEqual([]);
    });

    it('maps U+100000 + char to the same marked glyph', () => {
      const wrong = COVERED.filter(
        (cp) => !glyphs.has(PUA_B + cp) || glyphs.get(PUA_B + cp) !== marked.get(cp)
      );
      expect(wrong.map(hex)).toEqual([]);
    });
  });
});
