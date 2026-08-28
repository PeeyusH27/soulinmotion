/**
 * Prepares the brand assets: keys the near-white ground out of the logo,
 * trims it to its content box, and writes a transparent PNG.
 *
 * Uses headless Chrome as the image processor — canvas does the pixel work
 * and hands the result back as a data URL, so nothing needs installing.
 *
 * Run: node scripts/prep-brand.mjs [logo.jpg] [host.jpg]
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const CHROME = process.env.CHROME
  || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const LOGO = resolve(process.argv[2]
  || `${process.env.HOME}/Desktop/WhatsApp Image 2026-08-22 at 10.26.39 AM.jpeg`);
const HOST = resolve(process.argv[3]
  || `${process.env.HOME}/Desktop/WhatsApp Image 2026-08-22 at 10.35.48 AM.jpeg`);
const EMBLEM = resolve(process.argv[4]
  || `${process.env.HOME}/Desktop/WhatsApp Image 2026-08-25 at 4.22.06 PM.jpeg`);

/* each source is optional: whatever is present gets rebuilt, the rest is left
   as it is, so re-running after one file moves away is harmless */
const has = { logo: existsSync(LOGO), host: existsSync(HOST), emblem: existsSync(EMBLEM) };
for (const [label, ok] of Object.entries(has)) {
  if (!ok) console.log(`skip ${label} — source not found, keeping the existing asset`);
}
if (!has.logo && !has.host && !has.emblem) process.exit(0);

const tmp = mkdtempSync(join(tmpdir(), 'brand-'));
mkdirSync('public/brand', { recursive: true });

const page = join(tmp, 'key.html');
writeFileSync(page, `<!doctype html><meta charset="utf-8"><pre id="out">pending</pre>
<script>
const img = new Image();
img.onload = () => {
  const N = img.naturalWidth, M = img.naturalHeight;
  const cv = document.createElement('canvas');
  cv.width = N; cv.height = M;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  cx.drawImage(img, 0, 0);
  const im = cx.getImageData(0, 0, N, M);
  const d = im.data;

  // the ground is a flat near-white; fade it out between these two points
  // so the watercolour edges keep their soft falloff instead of stair-stepping
  const KEEP = 214, DROP = 244;
  let x0 = N, y0 = M, x1 = 0, y1 = 0;
  for (let i = 0, p = 0; i < d.length; i += 4, p++) {
    const lo = Math.min(d[i], d[i+1], d[i+2]);
    let a = 255;
    if (lo >= DROP) a = 0;
    else if (lo > KEEP) a = Math.round(255 * (1 - (lo - KEEP) / (DROP - KEEP)));
    d[i + 3] = a;
    if (a > 12) {
      const x = p % N, y = (p / N) | 0;
      if (x < x0) x0 = x; if (x > x1) x1 = x;
      if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
  }
  cx.putImageData(im, 0, 0);

  // trim to the artwork with a little breathing room
  const pad = 6;
  x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad);
  const w = Math.min(N, x1 + pad) - x0, h = Math.min(M, y1 + pad) - y0;
  const out = document.createElement('canvas');
  out.width = w; out.height = h;
  out.getContext('2d').drawImage(cv, x0, y0, w, h, 0, 0, w, h);

  document.getElementById('out').textContent =
    JSON.stringify({ w, h, data: out.toDataURL('image/png') });
};
img.src = ${JSON.stringify(`file://${encodeURI(LOGO)}`)};
</script>`);

const dom = has.logo ? execFileSync(CHROME, ['--headless', '--disable-gpu', '--allow-file-access-from-files',
  '--virtual-time-budget=9000', '--dump-dom', `file://${page}`],
  { encoding: 'utf8', maxBuffer: 1024 * 1024 * 64, stdio: ['ignore', 'pipe', 'ignore'] }) : '';

const { w, h, data } = has.logo ? JSON.parse(dom.match(/<pre id="out">([\s\S]*?)<\/pre>/)[1]
  .replace(/&quot;/g, '"').replace(/&amp;/g, '&')) : { w: 0, h: 0, data: '' };

if (has.logo) {
  writeFileSync('public/brand/logo.png', Buffer.from(data.split(',')[1], 'base64'));
  console.log(`logo  → public/brand/logo.png  ${w}x${h} (transparent, trimmed)`);
}

/* the host shot is landscape and carries another event's banner across the top,
   so crop it to a 4:5 portrait that holds just her */
if (has.host) {
  const CROP = { x: 300, y: 182, w: 723, h: 904 };
  const page = join(tmp, 'host.html');
  writeFileSync(page, `<!doctype html><meta charset="utf-8"><style>
    html,body{margin:0;padding:0}
    .p{width:${CROP.w}px;height:${CROP.h}px;
       background-image:url("file://${encodeURI(HOST)}");
       background-position:-${CROP.x}px -${CROP.y}px;background-repeat:no-repeat}
  </style><div class="p"></div>`);

  execFileSync(CHROME, ['--headless', '--disable-gpu', '--hide-scrollbars',
    `--screenshot=${resolve('public/brand/host.png')}`,
    `--window-size=${CROP.w},${CROP.h}`,
    '--virtual-time-budget=4000', `file://${page}`],
    { stdio: ['ignore', 'pipe', 'ignore'] });

  console.log(`host  → public/brand/host.png  ${CROP.w}x${CROP.h} (portrait crop)`);
}

/* the medallion: crop to its ring and round the black corners away */
if (has.emblem) {
  const EM = { x: 78, y: 78, size: 1098 };
  const page = join(tmp, 'emblem.html');
  writeFileSync(page, `<!doctype html><meta charset="utf-8"><style>
    html,body{margin:0;padding:0;background:transparent}
    .e{width:${EM.size}px;height:${EM.size}px;border-radius:50%;
       background-image:url("file://${encodeURI(EMBLEM)}");
       background-position:-${EM.x}px -${EM.y}px;background-repeat:no-repeat}
  </style><div class="e"></div>`);

  execFileSync(CHROME, ['--headless', '--disable-gpu', '--hide-scrollbars',
    `--screenshot=${resolve('public/brand/emblem.png')}`,
    `--window-size=${EM.size},${EM.size}`,
    '--default-background-color=00000000',
    '--virtual-time-budget=4000', `file://${page}`],
    { stdio: ['ignore', 'pipe', 'ignore'] });

  console.log(`emblem→ public/brand/emblem.png  ${EM.size}x${EM.size} (medallion, round)`);
}
