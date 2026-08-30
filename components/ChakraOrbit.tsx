'use client';

import { useEffect, useRef, useState } from 'react';
import { CHAKRAS } from '@/lib/chakras';

/** the pair of words shown under whichever disc is in front */
const KEYWORDS: Record<string, string> = {
  muladhara: 'Grounded | Safe',
  svadhishthana: 'Creative | Flowing',
  manipura: 'Confident | Willing',
  anahata: 'Open | Compassionate',
  vishuddha: 'Honest | Expressive',
  ajna: 'Intuitive | Clear',
  sahasrara: 'Aware | Connected',
};

const N = CHAKRAS.length;
const STEP = (Math.PI * 2) / N;
const AUTO = 0.0032;      // radians per frame of ambient drift
const DRAG_K = 0.007;     // radians per pixel dragged
const SETTLE = 0.055;     // how quickly a flick eases back into the drift

/* How much bigger the disc at the front is than the one at the back. The curve
   is eased rather than linear so the front disc pulls clear of its neighbours
   instead of the whole arc growing evenly. */
const SCALE_MIN = 0.4;
const SCALE_MAX = 1.2;
const SCALE_EASE = 1.35;

/**
 * The seven discs ride a circle seen from slightly above, so they read as an
 * arc: whichever is nearest the front sits lowest, largest and brightest, and
 * the ones behind shrink and fade away toward the top.
 *
 * It turns on its own, takes a drag, carries a flick, and brings any disc you
 * tap round to the front. Whatever ends up in front names itself underneath —
 * so the label is never out of step with the wheel.
 */
export default function ChakraOrbit() {
  const stage = useRef<HTMLDivElement>(null);
  const discs = useRef<(HTMLButtonElement | null)[]>([]);
  const [front, setFront] = useState(0);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');

    let angle = 0;          // rotation of the whole wheel
    let vel = -AUTO;        // current speed; rests at the ambient drift
    let target: number | null = null;  // set while easing a tapped disc to the front
    let held = false;
    let moved = 0;
    let lastX = 0;
    let pressed: number | null = null;  // the disc under the pointer when it went down
    let w = el.clientWidth;
    let raf = 0;
    let shownFront = -1;

    const ro = new ResizeObserver(() => { w = el.clientWidth; });
    ro.observe(el);

    const draw = () => {
      const R = w * 0.425;    // how far the discs swing left and right
      const Ry = w * 0.155;   // how far they rise and fall — the tilt of the ring
      const base = w * 0.215; // diameter of a disc at the very front

      let bestDot = -Infinity;
      let bestIdx = 0;

      for (let i = 0; i < N; i++) {
        const node = discs.current[i];
        if (!node) continue;
        const a = angle + i * STEP;
        const depth = Math.cos(a);              // 1 at the front, -1 at the back
        const t = (depth + 1) / 2;              // 0..1
        const scale = SCALE_MIN + (SCALE_MAX - SCALE_MIN) * Math.pow(t, SCALE_EASE);

        node.style.transform =
          `translate(-50%, -50%) translate(${(R * Math.sin(a)).toFixed(2)}px, ${(Ry * depth).toFixed(2)}px) scale(${scale.toFixed(3)})`;
        node.style.opacity = (0.46 + 0.54 * t).toFixed(3);
        node.style.zIndex = String(Math.round(t * 100));
        node.style.width = `${base}px`;
        node.style.height = `${base}px`;

        if (depth > bestDot) { bestDot = depth; bestIdx = i; }
      }

      if (bestIdx !== shownFront) { shownFront = bestIdx; setFront(bestIdx); }
    };

    const tick = () => {
      if (target !== null) {
        // ease the tapped disc round to the front, then hand back to the drift
        const d = target - angle;
        angle += d * 0.12;
        if (Math.abs(d) < 0.0015) { angle = target; target = null; vel = -AUTO; }
      } else if (held) {
        // the pointer owns the wheel; let any carried speed die while it rests
        // so pausing before you let go doesn't fling it
        vel *= 0.9;
      } else {
        // Whatever speed the wheel is carrying eases back toward the ambient
        // drift rather than toward zero — so a flick slows into the autoscroll
        // instead of stopping dead and waiting for a timer to release it.
        const rest = calm.matches ? 0 : -AUTO;
        vel += (rest - vel) * SETTLE;
        angle += vel;
      }

      draw();
      raf = requestAnimationFrame(tick);
    };

    const onDown = (e: PointerEvent) => {
      held = true;
      moved = 0;
      lastX = e.clientX;
      vel = 0;
      target = null;
      // capture retargets every later event to the stage, so the disc that was
      // actually pressed has to be recorded now or the tap is lost
      const hit = (e.target as HTMLElement | null)?.closest?.('[data-i]') as HTMLElement | null;
      pressed = hit ? Number(hit.dataset.i) : null;
      // a throw here would otherwise leave `held` true and freeze the wheel
      try { el.setPointerCapture(e.pointerId); } catch { /* no capture, the window fallback covers it */ }
      el.classList.add('is-held');
    };

    const onMove = (e: PointerEvent) => {
      if (!held) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      moved += Math.abs(dx);
      angle += dx * DRAG_K;
      vel = dx * DRAG_K;
    };

    const onUp = (e: PointerEvent) => {
      if (!held) return;
      held = false;
      el.classList.remove('is-held');
      try {
        if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      } catch { /* already gone */ }

      // a tap, not a drag: bring that disc round to the front the short way
      if (moved < 6 && pressed !== null) {
        const want = -pressed * STEP;
        target = want + Math.round((angle - want) / (Math.PI * 2)) * Math.PI * 2;
      }
      pressed = null;
    };

    /* three ways the press can end, so none of them can strand the wheel */
    const release = () => {
      if (!held) return;
      held = false;
      pressed = null;
      el.classList.remove('is-held');
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', release);
    el.addEventListener('lostpointercapture', release);
    window.addEventListener('pointerup', release);

    draw();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', release);
      el.removeEventListener('lostpointercapture', release);
      window.removeEventListener('pointerup', release);
    };
  }, []);

  const active = CHAKRAS[front];

  return (
    <div className="orbit">
      <div className="orbit-stage" ref={stage}>
        {CHAKRAS.map((c, i) => (
          <button
            className="orbit-disc"
            type="button"
            key={c.id}
            data-i={i}
            ref={(n) => { discs.current[i] = n; }}
            aria-label={`${c.name} — ${c.english} chakra`}
            aria-pressed={i === front}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.file} alt="" draggable={false} />
          </button>
        ))}
      </div>

      <div className="orbit-label">
        <span className="orbit-pill">
          <i aria-hidden="true">{active.bija}</i>
          {active.english}
        </span>
        <strong className="orbit-name">{active.name}</strong>
        <span className="orbit-keys">{KEYWORDS[active.id] ?? active.english}</span>
      </div>

      <p className="orbit-hint">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v4h-4" />
        </svg>
        Drag to explore · tap a chakra · {N} discs
      </p>
    </div>
  );
}
