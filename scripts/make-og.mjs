/**
 * Generates public/og.jpg — the 1200x630 card WhatsApp, Facebook and X show
 * when this page is shared. `lib/site.ts` points OG_IMAGE at that file, so
 * without it every share renders with no picture at all.
 *
 *   npm run og
 *
 * Deliberately carries NO date. It is a picture with text baked into it, so a
 * date here goes stale silently — nothing fails, nothing looks wrong locally,
 * and the card simply keeps advertising a session that already happened to
 * everyone the link is forwarded to. Since the sessions repeat, that is a trap
 * with no tripwire. Everything on the card is true of every run, so it is
 * generated once and then left alone. The live date is on the page itself,
 * one click away, where it comes from lib/event.ts and cannot be stale.
 *
 * Rendered through headless Chrome rather than drawn by hand: the card then
 * uses the real Fraunces/Manrope/JetBrains Mono and the real palette, so it
 * cannot drift away from the page it is advertising. Same approach, and the
 * same Chrome path, as scripts/shots.mjs.
 */
import { spawn } from 'node:child_process';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = resolve(ROOT, 'public/og.jpg');
const W = 1200, H = 630;

/* A fixed port and a shared profile dir mean a second run collides with any
   Chrome still holding the first one, and the capture then hangs forever
   rather than failing. Both are per-run, and the profile is cleaned up. */
const PORT = 9400 + Math.floor(Math.random() * 500);
const PROFILE = mkdtempSync(resolve(tmpdir(), 'og-render-'));

/* lib/event.ts is TypeScript, so it cannot just be imported here. These are
   plain string literals, and reading them beats duplicating them. Only the
   facts that hold for every run are read — the date deliberately is not. */
const eventSrc = readFileSync(resolve(ROOT, 'lib/event.ts'), 'utf8');
const pick = (key) => (eventSrc.match(new RegExp(`${key}:\\s*'([^']*)'`)) || [, ''])[1];
const WHERE = pick('where') || 'Live on Zoom';
const DURATION = pick('durationLabel') || '90 minutes';

const emblem = readFileSync(resolve(ROOT, 'public/brand/emblem.png')).toString('base64');

/* Two deliberate lines. On one line this overflows the copy column and wraps
   wherever it lands, which leaves a dangling separator at the break. */
const META_1 = [DURATION, WHERE].filter(Boolean).join('  ·  ');
/* the page's own microcopy, and true of every session */
const META_2 = 'Free  ·  No card needed';

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,400&family=Manrope:wght@400;700;800&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0}
  html,body{width:${W}px;height:${H}px;overflow:hidden}
  body{
    position:relative;background:#1D2117;color:#F3EEE3;
    font-family:Manrope,-apple-system,sans-serif;
    display:flex;align-items:center;isolation:isolate;
  }
  /* §1's three orbs, so the card and the hero share a sky */
  .glow{position:absolute;inset:0;z-index:-1;pointer-events:none}
  .glow i{position:absolute;border-radius:50%;filter:blur(90px);display:block}
  .glow i:nth-child(1){width:620px;height:620px;right:-60px;top:-220px;background:#D6A24A;opacity:.34}
  .glow i:nth-child(2){width:560px;height:560px;left:-160px;top:60px;background:#C9684B;opacity:.26}
  .glow i:nth-child(3){width:520px;height:520px;left:38%;bottom:-320px;background:#7F8C6C;opacity:.16}

  .copy{flex:1;padding:64px 0 64px 72px;display:grid;gap:22px;justify-items:start}

  .pill{
    display:inline-flex;align-items:center;gap:10px;
    padding:9px 20px 9px 16px;border-radius:999px;background:#D6A24A;color:#2A1E08;
    font-family:'JetBrains Mono',monospace;font-size:17px;font-weight:500;
    letter-spacing:.14em;text-transform:uppercase;
  }
  .pill b{width:9px;height:9px;border-radius:50%;background:#8E1D0B;display:block}

  h1{
    font-family:Fraunces,Georgia,serif;font-size:66px;font-weight:600;
    line-height:1.02;letter-spacing:-.028em;
    font-variation-settings:"SOFT" 50,"opsz" 144;max-width:15ch;
  }
  h1 em{display:block;color:#E8A88F;font-style:italic;font-weight:400}

  .rule{width:120px;height:2px;background:rgba(243,238,227,.28)}

  .meta{
    font-family:'JetBrains Mono',monospace;font-weight:500;
    letter-spacing:.05em;text-transform:uppercase;display:grid;gap:7px;
  }
  .meta .when{font-size:21px;color:#E8C980}
  .meta .what{font-size:17px;color:#C9C4B6}

  .by{display:flex;align-items:center;gap:14px;margin-top:4px}
  .by img{width:46px;height:46px;border-radius:50%}
  .by span{display:block}
  .by .n{font-size:21px;font-weight:800;letter-spacing:-.01em}
  .by .r{font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:.14em;
         text-transform:uppercase;color:#C9C4B6;margin-top:3px}

  .art{width:470px;height:100%;display:grid;place-items:center;position:relative}
  .art::before{
    content:"";position:absolute;width:460px;height:460px;border-radius:50%;
    background:radial-gradient(circle,rgba(214,162,74,.34),rgba(201,104,75,.14) 46%,transparent 70%);
    filter:blur(34px);
  }
  .art img{width:410px;height:410px;position:relative}
</style></head><body>
  <span class="glow"><i></i><i></i><i></i></span>

  <div class="copy">
    <span class="pill"><b></b>Free live session</span>
    <h1>The patterns running your life.<em>And how to interrupt them.</em></h1>
    <span class="rule"></span>
    <p class="meta"><span class="when">${META_1}</span><span class="what">${META_2}</span></p>
    <div class="by">
      <img src="data:image/png;base64,${emblem}" alt="">
      <span>
        <span class="n">Soul in Motion</span>
        <span class="r">with Shradha Saha</span>
      </span>
    </div>
  </div>

  <div class="art"><img src="data:image/png;base64,${emblem}" alt=""></div>
</body></html>`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`,
  `--window-size=${W},${H}`, 'about:blank',
], { stdio: 'ignore' });

let ws, id = 0;
const pending = new Map();
/* every call is bounded — a wedged Chrome should fail the script, not wedge it */
const send = (method, params = {}, ms = 20000) => new Promise((res, rej) => {
  const i = ++id;
  const timer = setTimeout(() => { pending.delete(i); rej(new Error(`${method} timed out after ${ms}ms`)); }, ms);
  pending.set(i, { res: (v) => { clearTimeout(timer); res(v); }, rej: (e) => { clearTimeout(timer); rej(e); } });
  ws.send(JSON.stringify({ id: i, method, params }));
});

try {
  let target;
  for (let i = 0; i < 60 && !target; i++) {
    try {
      const list = await fetch(`http://127.0.0.1:${PORT}/json/list`).then((r) => r.json());
      target = list.find((t) => t.type === 'page')?.webSocketDebuggerUrl;
    } catch { /* chrome not up yet */ }
    if (!target) await sleep(300);
  }
  if (!target) throw new Error('headless Chrome did not start — set CHROME to its path');

  ws = new WebSocket(target);
  await new Promise((r) => ws.addEventListener('open', r));
  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data);
    const p = pending.get(m.id);
    if (p) { pending.delete(m.id); m.error ? p.rej(new Error(m.error.message)) : p.res(m.result); }
  });

  await send('Page.enable');
  // 2x, then downscale — text renders far crisper than shooting straight at 1x
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 2, mobile: false });
  await send('Page.navigate', { url: `data:text/html;charset=utf-8,${encodeURIComponent(html)}` });
  await sleep(4000); // webfonts

  const shot = await send('Page.captureScreenshot', {
    format: 'png', clip: { x: 0, y: 0, width: W, height: H, scale: 2 },
  });

  await sharp(Buffer.from(shot.data, 'base64'))
    .resize(W, H, { fit: 'fill' })
    .jpeg({ quality: 86, chromaSubsampling: '4:4:4', mozjpeg: true })
    .toFile(OUT);

  const kb = (readFileSync(OUT).length / 1024).toFixed(0);
  console.log(`  wrote public/og.jpg  ${W}x${H}  ${kb} KB`);
  console.log(`  card reads: ${META_1}  |  ${META_2}`);
  console.log('  no date on it by design — evergreen, generate once.');
} finally {
  chrome.kill('SIGKILL');
  rmSync(PROFILE, { recursive: true, force: true });
}
process.exit(0);
