'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CHAKRAS } from '@/lib/chakras';

/**
 * The chakras on a slowly turning ring seen in perspective: whichever disc is
 * at the front sits lowest, largest and fully opaque, and the ones behind
 * shrink, fade and blur away. It loops forever, hovering holds it, dragging
 * spins it with momentum, and clicking a disc turns it to the front.
 */

const N = CHAKRAS.length;
const STEP = (Math.PI * 2) / N;
const TAU = Math.PI * 2;
const SPEED = 0.3;        // radians a second — a lap in about 21s
const DRAG_K = 0.006;     // radians per pixel dragged
const FRICTION = 0.94;

/* a small twelve-petal mandala that frames the bija */
const PETAL_ANGLES = Array.from({ length: 12 }, (_, i) => i * 30);

function Mandala() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30.5" />
      <circle cx="32" cy="32" r="21.5" strokeDasharray="1 5" opacity=".7" />
      {PETAL_ANGLES.map((a) => (
        <path
          key={a}
          d="M32 10.5c3.9 5 3.9 9.2 0 13.4-3.9-4.2-3.9-8.4 0-13.4z"
          transform={`rotate(${a} 32 32)`}
        />
      ))}
    </svg>
  );
}

export default function ChakraRing({ variant = 'band' }: { variant?: 'band' | 'panel' }) {
  const stage = useRef<HTMLDivElement>(null);
  const items = useRef<Array<HTMLButtonElement | null>>([]);
  const angle = useRef(0);
  const target = useRef<number | null>(null);
  const velocity = useRef(0);
  const paused = useRef(false);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const moved = useRef(0);
  const frontRef = useRef(0);
  const [front, setFront] = useState(0);
  const [swapping, setSwapping] = useState(false);

  const layout = useCallback(() => {
    const el = stage.current;
    if (!el) return;
    const rx = el.clientWidth * 0.34;
    const ry = el.clientHeight * 0.29;

    let best = 0;
    let bestDepth = -2;

    items.current.forEach((node, i) => {
      if (!node) return;
      const a = i * STEP - angle.current;
      const depth = Math.cos(a);            // 1 at the front, -1 at the back
      const t = (depth + 1) / 2;
      const scale = 0.3 + 0.7 * t;

      node.style.transform =
        `translate3d(${(Math.sin(a) * rx).toFixed(1)}px, ${(depth * ry).toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      node.style.opacity = (0.14 + 0.86 * Math.pow(t, 1.15)).toFixed(3);
      node.style.zIndex = String(Math.round(t * 100));
      node.style.filter = t > 0.84 ? 'none' : `blur(${((0.84 - t) * 3.4).toFixed(2)}px)`;

      if (depth > bestDepth) { bestDepth = depth; best = i; }
    });

    if (best !== frontRef.current) {
      frontRef.current = best;
      setSwapping(true);
      window.setTimeout(() => { setFront(best); setSwapping(false); }, 190);
    }
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    layout();
    window.addEventListener('resize', layout);
    if (reduce) return () => window.removeEventListener('resize', layout);

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (dragging.current) {
        // the pointer is driving it
      } else if (Math.abs(velocity.current) > 0.0015) {
        angle.current += velocity.current;
        velocity.current *= FRICTION;
      } else if (target.current !== null) {
        let diff = target.current - angle.current;
        diff -= Math.round(diff / TAU) * TAU;
        if (Math.abs(diff) < 0.002) {
          angle.current = target.current;
          target.current = null;
        } else {
          angle.current += diff * Math.min(1, dt * 7);
        }
      } else if (!paused.current) {
        angle.current += SPEED * dt;
      }

      layout();
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', layout);
    };
  }, [layout]);

  /* ---------- drag to spin ---------- */
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    moved.current = 0;
    lastX.current = e.clientX;
    velocity.current = 0;
    target.current = null;
    stage.current?.classList.add('is-dragging');
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    moved.current += Math.abs(dx);
    const delta = -dx * DRAG_K;
    angle.current += delta;
    velocity.current = delta;
    layout();
  };

  const endDrag = (e: React.PointerEvent) => {
    paused.current = false;
    if (!dragging.current) return;
    dragging.current = false;
    stage.current?.classList.remove('is-dragging');
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const current = CHAKRAS[front];

  return (
    <section className={`ring-section${variant === 'panel' ? ' ring-section--panel' : ''}`} id="chakras">
      <div className="wrap ring-head reveal">
        <span className="kicker">Seven centres</span>
        <h2 className="ring-title">The Chakras</h2>
      </div>

      {/* the ring sits between the title and the caption */}
      <div
        className="ring-stage"
        ref={stage}
        onPointerLeave={(e) => { paused.current = false; endDrag(e); }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {CHAKRAS.map((c, i) => (
          <button
            key={c.id}
            ref={(el) => { items.current[i] = el; }}
            className="ring-item"
            aria-label={`${c.name} — ${c.english} chakra`}
            onPointerEnter={() => { if (i === frontRef.current) paused.current = true; }}
            onPointerLeave={() => { paused.current = false; }}
            onClick={() => {
              if (moved.current > 6) return;   // that was a drag, not a click
              velocity.current = 0;
              target.current = i * STEP;
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.file} alt="" draggable={false} />
          </button>
        ))}
      </div>

      <div className={`wrap ring-caption${swapping ? ' is-swapping' : ''}`}>
          <span className="ring-badge swap">
            <span className="ring-mandala">
              <Mandala />
              <b>{current.bija}</b>
            </span>
            {current.petals === 1000 ? 'Thousand petals' : `${current.petals} petals`}
          </span>
          <h3 className="ring-name swap">{current.name}</h3>
          <p className="ring-sub swap">{current.english} centre</p>
          <p className="ring-note swap">{current.note}</p>
      </div>
    </section>
  );
}
