/**
 * Build the scroll-sequence frames.
 *
 * Reads the original 1920x1080 JPEG frames, drops frames that are byte-for-byte
 * identical to the previous one, resizes to 1280 wide and writes AVIF + WebP
 * pairs to public/frames/. Also writes src/frames.json with the frame count
 * and the phase boundaries remapped to the deduplicated numbering.
 *
 * Usage:
 *   npm i --no-save sharp
 *   node scripts/build-frames.mjs [source-dir]   (default: frames-src)
 *
 * The original JPEGs are not kept in the deployed public/ folder. To restore
 * them into frames-src/ from history:
 *   git show 634e80c:public/ezgif-frame-001.jpg > frames-src/ezgif-frame-001.jpg  (etc.)
 */
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const SRC = process.argv[2] || 'frames-src';
const OUT = 'public/frames';
const WIDTH = 1280;

// Phase boundaries in the ORIGINAL 300-frame numbering.
const PHASES = [
  { key: 'hardware',  label: 'Hardware',        start: 1,   end: 80  },
  { key: 'explosion', label: 'Deconstruction',  start: 81,  end: 150 },
  { key: 'vmware',    label: 'Virtualization',  start: 151, end: 210 },
  { key: 'azure',     label: 'Cloud',           start: 211, end: 270 },
  { key: 'security',  label: 'Security',        start: 271, end: 300 },
];

const files = readdirSync(SRC).filter(f => /^ezgif-frame-\d{3}\.jpg$/.test(f)).sort();
if (!files.length) throw new Error(`No ezgif-frame-NNN.jpg files in ${SRC}`);

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const oldToNew = new Array(files.length + 1);
let lastHash = null, next = 0, bytesAvif = 0, bytesWebp = 0, bytesSrc = 0;

for (let i = 0; i < files.length; i++) {
  const buf = readFileSync(join(SRC, files[i]));
  bytesSrc += buf.length;
  const hash = createHash('md5').update(buf).digest('hex');
  if (hash !== lastHash) {
    next++;
    const base = sharp(buf).resize({ width: WIDTH });
    const name = String(next).padStart(3, '0');
    const [avif, webp] = await Promise.all([
      base.clone().avif({ quality: 45, effort: 4 }).toBuffer(),
      base.clone().webp({ quality: 68 }).toBuffer(),
    ]);
    writeFileSync(join(OUT, `${name}.avif`), avif);
    writeFileSync(join(OUT, `${name}.webp`), webp);
    bytesAvif += avif.length; bytesWebp += webp.length;
    lastHash = hash;
  }
  oldToNew[i + 1] = next;
}

const manifest = {
  count: next,
  width: WIDTH,
  phases: PHASES.map(p => ({ key: p.key, label: p.label, start: oldToNew[p.start], end: oldToNew[p.end] })),
};
writeFileSync('src/frames.json', JSON.stringify(manifest, null, 2) + '\n');

const mb = n => (n / 1048576).toFixed(1) + ' MB';
console.log(`${files.length} source frames (${mb(bytesSrc)}) -> ${next} unique frames`);
console.log(`AVIF total ${mb(bytesAvif)} · WebP total ${mb(bytesWebp)}`);
console.log('phases:', manifest.phases.map(p => `${p.label} ${p.start}-${p.end}`).join(', '));
