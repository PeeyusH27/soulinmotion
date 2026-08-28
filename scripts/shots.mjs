/**
 * Captures the running page in one tall pass, then slices it into readable
 * chunks. Dev helper only — not part of the site.
 *
 * Run: node scripts/shots.mjs [url] [outDir] [width] [sliceHeight]
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL = process.argv[2] || 'http://localhost:3111/';
const OUT = resolve(process.argv[3] || 'shots');
const W = Number(process.argv[4] || 1440);
const SLICE = Number(process.argv[5] || 2200);

mkdirSync(OUT, { recursive: true });
const chrome = (...a) => execFileSync(CHROME,
  ['--headless', '--disable-gpu', '--hide-scrollbars', ...a],
  { encoding: 'utf8', maxBuffer: 1024 * 1024 * 64, stdio: ['ignore', 'pipe', 'ignore'] });

/* how tall is the document? */
const dom = chrome('--virtual-time-budget=9000', '--dump-dom', `--window-size=${W},1000`, URL);
const m = dom.match(/data-page-height="(\d+)"/);
const height = m ? Number(m[1]) : 12000;
const full = join(OUT, 'full.png');

chrome(`--screenshot=${full}`, `--window-size=${W},${Math.min(Math.round(height * 1.2) + 1200, 16000)}`,
  '--virtual-time-budget=12000', URL);

/* slice it up so each piece is legible */
const n = Math.ceil(height / SLICE);
for (let i = 0; i < n; i++) {
  const page = join(OUT, `_slice${i}.html`);
  writeFileSync(page, `<!doctype html><meta charset="utf-8"><style>
   html,body{margin:0}
   div{width:${W}px;height:${SLICE}px;background-image:url("file://${full}");
       background-position:0 -${i * SLICE}px;background-repeat:no-repeat}
  </style><div></div>`);
  chrome(`--screenshot=${join(OUT, `slice-${String(i + 1).padStart(2, '0')}.png`)}`,
    `--window-size=${W},${SLICE}`, '--virtual-time-budget=2500', `file://${page}`);
}
console.log(`page ${W}x${height} → ${n} slices in ${OUT}`);
