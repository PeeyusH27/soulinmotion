/**
 * Crops the seven chakra discs out of the source plate.
 *
 * Finds each disc by flood-filling the non-black regions, then renders one
 * circular PNG per chakra (transparent corners) through headless Chrome —
 * no image libraries required. Also samples each disc's real colour and
 * writes the typed manifest.
 *
 * Run: node scripts/crop-chakras.mjs "/path/to/plate.jpg"
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const CHROME = process.env.CHROME
  || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const SOURCE = resolve(process.argv[2]
  || `${process.env.HOME}/Desktop/WhatsApp Image 2026-08-22 at 9.24.42 PM.jpeg`);

if (!existsSync(SOURCE)) {
  console.error(`source plate not found: ${SOURCE}`);
  process.exit(1);
}
if (!existsSync(CHROME)) {
  console.error(`chrome not found: ${CHROME} (set CHROME=/path/to/chrome)`);
  process.exit(1);
}

/* discs read top-left to bottom-right, which is root → crown */
const NAMES = [
  { id: 'muladhara',     name: 'Muladhara',     english: 'Root',         bija: 'लं', petals: 4 note: 'Ground and steady — the base the whole system stands on.' },
  { id: 'svadhishthana', name: 'Svadhishthana', english: 'Sacral',       bija: 'वं', petals: 6 note: 'Feeling and flow — creativity, appetite and emotional movement.' },
  { id: 'manipura',      name: 'Manipura',      english: 'Solar Plexus', bija: 'रं', petals: 10 note: 'Will and fire — confidence, drive and a sense of your own power.' },
  { id: 'anahata',       name: 'Anahata',       english: 'Heart',        bija: 'यं', petals: 12 note: 'Love and connection — where compassion meets the courage to open.' },
  { id: 'vishuddha',     name: 'Vishuddha',     english: 'Throat',       bija: 'हं', petals: 16 note: 'Voice and truth — expression, honesty and being heard.' },
  { id: 'ajna',          name: 'Ajna',          english: 'Third Eye',    bija: 'ॐ',  petals: 2 note: 'Insight and perception — the way you see before you think.' },
  { id: 'sahasrara',     name: 'Sahasrara',     english: 'Crown',        bija: 'ॐ',  petals: 1000 note: 'Awareness and unity — the widest view, beyond the personal.' },
];

const tmp = mkdtempSync(join(tmpdir(), 'chakra-'));
const srcUrl = `file://${encodeURI(SOURCE)}`;
const chrome = (...args) =>
  execFileSync(CHROME, ['--headless', '--disable-gpu', '--hide-scrollbars', ...args],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });

/* ---------- 1. locate the discs ---------- */

const detect = join(tmp, 'detect.html');
writeFileSync(detect, `<!doctype html><meta charset="utf-8"><pre id="out">pending</pre>
<script>
const img = new Image();
img.onload = () => {
  const N = img.naturalWidth, M = img.naturalHeight;
  const cv = document.createElement('canvas');
  cv.width = N; cv.height = M;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  cx.drawImage(img, 0, 0);
  const d = cx.getImageData(0, 0, N, M).data;
  const on = new Uint8Array(N * M);
  for (let i = 0, p = 0; i < d.length; i += 4, p++) {
    if (Math.max(d[i], d[i+1], d[i+2]) > 46) on[p] = 1;
  }
  const seen = new Uint8Array(N * M), boxes = [];
  for (let p = 0; p < on.length; p++) {
    if (!on[p] || seen[p]) continue;
    let x0 = N, y0 = M, x1 = 0, y1 = 0, area = 0, R = 0, G = 0, B = 0;
    const st = [p]; seen[p] = 1;
    while (st.length) {
      const q = st.pop(), x = q % N, y = (q / N) | 0;
      area++;
      R += d[q*4]; G += d[q*4+1]; B += d[q*4+2];
      if (x < x0) x0 = x; if (x > x1) x1 = x;
      if (y < y0) y0 = y; if (y > y1) y1 = y;
      if (x > 0     && on[q-1] && !seen[q-1]) { seen[q-1] = 1; st.push(q-1); }
      if (x < N - 1 && on[q+1] && !seen[q+1]) { seen[q+1] = 1; st.push(q+1); }
      if (y > 0     && on[q-N] && !seen[q-N]) { seen[q-N] = 1; st.push(q-N); }
      if (y < M - 1 && on[q+N] && !seen[q+N]) { seen[q+N] = 1; st.push(q+N); }
    }
    if (area > 20000) boxes.push({
      x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1,
      rgb: [Math.round(R/area), Math.round(G/area), Math.round(B/area)],
    });
  }
  boxes.sort((a, b) => (Math.round(a.y / 120) - Math.round(b.y / 120)) || (a.x - b.x));
  document.getElementById('out').textContent = JSON.stringify(boxes);
};
img.src = ${JSON.stringify(srcUrl)};
</script>`);

const dom = chrome('--allow-file-access-from-files', '--virtual-time-budget=8000',
  '--dump-dom', `file://${detect}`);
const boxes = JSON.parse(dom.match(/<pre id="out">([\s\S]*?)<\/pre>/)[1]);

if (boxes.length !== NAMES.length) {
  console.error(`expected ${NAMES.length} discs, found ${boxes.length}`);
  process.exit(1);
}

/* ---------- 2. crop each disc ---------- */

mkdirSync('public/chakras', { recursive: true });

const hex = ([r, g, b]) =>
  '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('').toUpperCase();
const scale = (rgb, f) => rgb.map((v) => v * f);

const manifest = boxes.map((b, i) => {
  const meta = NAMES[i];
  const n = String(i + 1).padStart(2, '0');
  const out = resolve(`public/chakras/${n}-${meta.id}.png`);
  const page = join(tmp, `crop-${meta.id}.html`);

  // the disc is masked to a circle so the plate's black ground drops away
  writeFileSync(page, `<!doctype html><meta charset="utf-8"><style>
  html,body{margin:0;padding:0;background:transparent}
  .disc{width:${b.w}px;height:${b.h}px;border-radius:50%;
        background-image:url("${srcUrl}");
        background-position:-${b.x}px -${b.y}px;background-repeat:no-repeat}
</style><div class="disc"></div>`);

  chrome(`--screenshot=${out}`, `--window-size=${b.w},${b.h}`,
    '--default-background-color=00000000', '--virtual-time-budget=3000', `file://${page}`);

  return {
    order: i + 1,
    ...meta,
    file: `/chakras/${n}-${meta.id}.png`,
    size: [b.w, b.h],
    colors: {
      light: hex(scale(b.rgb, 1.45)),
      mid: hex(b.rgb),
      deep: hex(scale(b.rgb, 0.45)),
    },
  };
});

/* ---------- 3. typed manifest ---------- */

writeFileSync('lib/chakras.ts', `// Generated by scripts/crop-chakras.mjs — do not edit by hand.

export type Chakra = {
  order: number;
  id: string;
  name: string;
  english: string;
  bija: string;
  petals: number;
  /** circular PNG cropped from the source plate, transparent corners */
  file: string;
  size: [number, number];
  /** sampled from the disc itself — mid is its average colour */
  colors: { light: string; mid: string; deep: string };
};

export const CHAKRAS: Chakra[] = ${JSON.stringify(manifest, null, 2)};
`);

console.log(`cropped ${manifest.length} discs → public/chakras/`);
for (const c of manifest) console.log(`  ${c.file}  ${c.size.join('x')}  ${c.colors.mid}`);
