/**
 * OPTIONAL vector fallback. The live assets are cropped from the source
 * plate by scripts/crop-chakras.mjs — run this only if you want
 * resolution-independent redraws instead.
 *
 * Generates the seven chakra yantras as standalone SVG assets.
 *
 * Each disc is drawn as vector geometry — petal rings, yantra figure,
 * bija mantra and label — over a watercolour-style wash built from
 * layered fractal-noise filters, matching the reference plate.
 *
 * Run: node scripts/gen-chakras.mjs
 */
import { writeFileSync } from 'node:fs';

const S = 240;          // viewBox
const C = S / 2;        // centre
const R = 118;          // disc radius

/* ---------- geometry helpers ---------- */

const rad = (deg) => (deg * Math.PI) / 180;
const px = (n) => Math.round(n * 100) / 100;

/** point on a circle of radius r at angle deg (0 = right, clockwise) */
const pt = (r, deg) => [px(C + r * Math.cos(rad(deg))), px(C + r * Math.sin(rad(deg)))];

const ring = (r, sw = 1, extra = '') => `<circle cx="${C}" cy="${C}" r="${r}" stroke-width="${sw}" ${extra}/>`;

/** classic almond lotus petal: pointed at base and tip, widest at mid */
function petalPath(r1, r2, w) {
  const base = C - r1;
  const tip = C - r2;
  const h = r2 - r1;
  return [
    `M${C} ${px(base)}`,
    `C${px(C + w)} ${px(base - h * 0.24)} ${px(C + w * 0.82)} ${px(base - h * 0.8)} ${C} ${px(tip)}`,
    `C${px(C - w * 0.82)} ${px(base - h * 0.8)} ${px(C - w)} ${px(base - h * 0.24)} ${C} ${px(base)}`,
    'Z',
  ].join(' ');
}

/**
 * A ring of `count` petals seated on a thin circle at r1. Petal width is
 * derived from the ring circumference so neighbours always meet edge to
 * edge however many petals a chakra carries; `spread` nudges that fit.
 */
function petalRing({ count, r1, r2, offset = 0, inner = true, sw = 1.1, spread = 1, seat = true }) {
  const rMid = r1 + (r2 - r1) * 0.45;
  const w = px((Math.PI * rMid) / count * spread);
  const outer = petalPath(r1, r2, w);
  const innerPath = petalPath(r1 + (r2 - r1) * 0.14, r2 - (r2 - r1) * 0.18, w * 0.55);
  const step = 360 / count;

  let out = seat ? `\n      ${ring(r1, 0.7, 'opacity=".5"')}` : '';
  for (let i = 0; i < count; i++) {
    out += `\n      <g transform="rotate(${px(offset + i * step)} ${C} ${C})">`;
    out += `<path d="${outer}" stroke-width="${sw}"/>`;
    if (inner) out += `<path d="${innerPath}" stroke-width="${px(sw * 0.55)}" opacity=".5"/>`;
    out += `</g>`;
  }
  return out;
}

/** equilateral triangle inscribed in radius r; dir 'down' puts a vertex at the bottom */
function triangle(r, dir = 'down') {
  const angles = dir === 'down' ? [90, 210, 330] : [270, 30, 150];
  return `<path d="M${angles.map((a) => pt(r, a).join(' ')).join(' L')} Z"/>`;
}

/** small filled dot */
const dot = (r, deg, size = 2) => {
  const [x, y] = pt(r, deg);
  return `<circle cx="${x}" cy="${y}" r="${size}" fill="currentColor" stroke="none"/>`;
};


/* ---------- the seven ---------- */

const CHAKRAS = [
  {
    id: 'muladhara',
    name: 'Muladhara',
    english: 'Root',
    bija: 'लं',
    petals: 4,
    light: '#C7462F', mid: '#951F1A', deep: '#480D0C',
    seed: 3,
    yantra: () => `
      ${petalRing({ count: 4, r1: 60, r2: 101, offset: 45, spread: .78, seat: false })}
      <rect x="${C - 43}" y="${C - 43}" width="86" height="86" stroke-width="1.4"/>
      <rect x="${C - 35}" y="${C - 35}" width="70" height="70" stroke-width=".7" opacity=".55"/>
      ${[0, 90, 180, 270]
        .map((a) => `<g transform="rotate(${a} ${C} ${C})"><path d="M${C - 10} ${C - 43} L${C - 10} ${C - 53} L${C + 10} ${C - 53} L${C + 10} ${C - 43}" stroke-width="1.1"/></g>`)
        .join('')}
      ${triangle(33, 'down')}
      ${[0, 90, 180, 270].map((a) => dot(43, a, 1.7)).join('')}`,
  },
  {
    id: 'svadhishthana',
    name: 'Svadhishthana',
    english: 'Sacral',
    bija: 'वं',
    petals: 6,
    light: '#E8792A', mid: '#BE5216', deep: '#6A2606',
    seed: 11,
    yantra: () => `
      ${petalRing({ count: 6, r1: 50, r2: 99, offset: -90, spread: .74 })}
      ${ring(48, 1.4)}
      ${ring(40, .7, 'opacity=".55"')}
      <path d="M${C - 31} ${C + 21} A 38 38 0 0 0 ${C + 31} ${C + 21}" stroke-width="1.3" opacity=".9"/>
      ${[0, 60, 120, 180, 240, 300].map((a) => dot(54, a - 60, 1.6)).join('')}`,
  },
  {
    id: 'manipura',
    name: 'Manipura',
    english: 'Solar Plexus',
    bija: 'रं',
    petals: 10,
    light: '#F2C93B', mid: '#C89310', deep: '#684004',
    seed: 23,
    yantra: () => `
      ${petalRing({ count: 10, r1: 52, r2: 97, offset: -90, spread: .98 })}
      ${triangle(46, 'down')}
      ${triangle(38, 'down').replace('/>', ' stroke-width=".7" opacity=".5"/>')}
      ${Array.from({ length: 10 }, (_, i) => dot(50, i * 36 - 90, 1.3)).join('')}`,
  },
  {
    id: 'anahata',
    name: 'Anahata',
    english: 'Heart',
    bija: 'यं',
    petals: 12,
    light: '#74B440', mid: '#3F7C23', deep: '#173A0F',
    seed: 37,
    yantra: () => `
      ${petalRing({ count: 12, r1: 56, r2: 97, offset: -90, spread: 1 })}
      ${ring(52, .8, 'opacity=".65"')}
      ${triangle(50, 'down')}
      ${triangle(50, 'up')}
      ${Array.from({ length: 12 }, (_, i) => dot(52, i * 30 - 75, 1.3)).join('')}`,
  },
  {
    id: 'vishuddha',
    name: 'Vishuddha',
    english: 'Throat',
    bija: 'हं',
    petals: 16,
    light: '#42A2CA', mid: '#2170A0', deep: '#0D3352',
    seed: 53,
    yantra: () => `
      ${petalRing({ count: 16, r1: 58, r2: 97, offset: -90, spread: 1.02 })}
      ${triangle(50, 'down')}
      ${ring(29, 1.3)}
      ${ring(23, .7, 'opacity=".55"')}
      ${Array.from({ length: 16 }, (_, i) => dot(52, i * 22.5 - 78.75, 1.1)).join('')}`,
  },
  {
    id: 'ajna',
    name: 'Ajna',
    english: 'Third Eye',
    bija: 'ॐ',
    petals: 2,
    light: '#7259AE', mid: '#4A3782', deep: '#1F1544',
    seed: 71,
    yantra: () => `
      ${petalRing({ count: 2, r1: 8, r2: 101, offset: 90, spread: .62, seat: false })}
      ${ring(38, 1.5)}
      ${ring(31, .7, 'opacity=".55"')}
      ${dot(56, -90, 3.2)}${dot(56, 90, 3.2)}
      ${dot(72, -90, 1.7)}${dot(72, 90, 1.7)}`,
  },
  {
    id: 'sahasrara',
    name: 'Sahasrara',
    english: 'Crown',
    bija: 'ॐ',
    petals: 24,
    light: '#AE80C8', mid: '#7B4FA0', deep: '#3A2054',
    seed: 97,
    yantra: () => `
      ${petalRing({ count: 24, r1: 76, r2: 103, offset: -90, inner: false, sw: .9, spread: 1.04, seat: false })}
      ${petalRing({ count: 16, r1: 54, r2: 84, offset: -78.75, spread: 1.02, seat: false })}
      ${petalRing({ count: 8, r1: 32, r2: 60, offset: -90, spread: 1 })}
      ${ring(32, 1.4)}
      ${Array.from({ length: 8 }, (_, i) => dot(70, i * 45 - 67.5, 1.4)).join('')}`,
  },
];

/* ---------- assembly ---------- */

function svg(ch, mark = false) {
  const u = mark ? `${ch.id}-m` : ch.id; // ids are namespaced so several discs can be inlined together
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}" role="img" aria-labelledby="t-${u}">
  <title id="t-${u}">${ch.name} — ${ch.english} chakra</title>
  <defs>
    <radialGradient id="wash-${u}" cx="42%" cy="36%" r="78%">
      <stop offset="0" stop-color="${ch.light}"/>
      <stop offset="52%" stop-color="${ch.mid}"/>
      <stop offset="100%" stop-color="${ch.deep}"/>
    </radialGradient>
    <linearGradient id="gold-${u}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F6E2B0"/>
      <stop offset="45%" stop-color="#DCB871"/>
      <stop offset="100%" stop-color="#B98F45"/>
    </linearGradient>
    <radialGradient id="vig-${u}" cx="50%" cy="50%" r="50%">
      <stop offset="55%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity=".42"/>
    </radialGradient>
    <filter id="cloud-${u}" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.013" numOctaves="5" seed="${ch.seed}"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <filter id="mottle-${u}" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="${ch.seed * 5}"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <filter id="ink-${u}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1" stdDeviation="1.1" flood-color="#2A1204" flood-opacity=".55"/>
    </filter>
    <filter id="grain-${u}" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" seed="${ch.seed * 3}"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <clipPath id="disc-${u}">
      <circle cx="${C}" cy="${C}" r="${R}"/>
    </clipPath>
  </defs>

  <!-- watercolour disc -->
  <g clip-path="url(#disc-${u})">
    <circle cx="${C}" cy="${C}" r="${R}" fill="url(#wash-${u})"/>
    <rect width="${S}" height="${S}" filter="url(#cloud-${u})" opacity=".46" style="mix-blend-mode:soft-light"/>
    <rect width="${S}" height="${S}" filter="url(#mottle-${u})" opacity=".22" style="mix-blend-mode:overlay"/>
    <rect width="${S}" height="${S}" filter="url(#grain-${u})" opacity=".14" style="mix-blend-mode:overlay"/>
    <circle cx="${C}" cy="${C}" r="${R}" fill="url(#vig-${u})"/>
  </g>

  <!-- gold work -->
  <g fill="none" stroke="url(#gold-${u})" stroke-linecap="round" stroke-linejoin="round" color="#DCB871" filter="url(#ink-${u})">
    <circle cx="${C}" cy="${C}" r="${R - 1}" stroke-width="${mark ? 2.4 : 1.6}"/>
    ${mark ? '' : `<circle cx="${C}" cy="${C}" r="${R - 10}" stroke-width=".7" stroke-dasharray="1 7" opacity=".75"/>`}
    <g stroke-width="${mark ? 1.7 : 1}">${ch.yantra()}</g>
  </g>

  <!-- bija mantra -->
  <text x="${C}" y="${C}" text-anchor="middle" dominant-baseline="central"
        font-family="'Noto Serif Devanagari','Tiro Devanagari Sanskrit','Kohinoor Devanagari',serif"
        font-size="${(ch.bija === 'ॐ' ? 40 : 42) * (mark ? 1.18 : 1)}" fill="url(#gold-${u})">${ch.bija}</text>

  <!-- name -->
  ${mark ? '' : `<text x="${C}" y="${S - 21}" text-anchor="middle"
        font-family="Georgia,'Times New Roman',serif" font-size="11" letter-spacing="3.8" fill="#F2DCAE" opacity=".85">${ch.name.toUpperCase()}</text>`}
</svg>
`;
}

for (const ch of CHAKRAS) {
  const n = String(CHAKRAS.indexOf(ch) + 1).padStart(2, '0');
  writeFileSync(`public/chakras/${n}-${ch.id}.svg`, svg(ch));
  writeFileSync(`public/chakras/${n}-${ch.id}-mark.svg`, svg(ch, true));
}

writeFileSync(
  'public/chakras/manifest.json',
  JSON.stringify(
    CHAKRAS.map((c, i) => ({
      order: i + 1,
      id: c.id,
      name: c.name,
      english: c.english,
      bija: c.bija,
      petals: c.petals,
      file: `/chakras/${String(i + 1).padStart(2, '0')}-${c.id}.svg`,
      mark: `/chakras/${String(i + 1).padStart(2, '0')}-${c.id}-mark.svg`,
      colors: { light: c.light, mid: c.mid, deep: c.deep },
    })),
    null,
    2,
  ) + '\n',
);

console.log(`generated ${CHAKRAS.length * 2} vector chakra assets (plate + mark)`);
