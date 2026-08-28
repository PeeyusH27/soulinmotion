'use client';

import { useEffect, useRef } from 'react';

/**
 * The emblem is the sphere. Its disc is the ball's surface, so spinning it has
 * to move the whole body: the shell tilts with the pose, the specular highlight
 * slides the other way across the glass, and the ground shadow shifts under it.
 *
 * Ambient drift is CSS, so `prefers-reduced-motion` already silences it through
 * the stylesheet. Dragging is user-initiated, so it stays available either way —
 * bailing out here would leave phones with Reduce Motion on with a dead image.
 */
export default function HeroMark() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');

    /* pose */
    let rx = 0;   // pitch
    let ry = 0;   // yaw
    let rz = 0;   // spin
    let vz = 0;   // spin velocity
    let held = false;
    let claimed = false;
    /* where a passing mouse wants the ball to lean, and whether one is over it.
       Kept apart from the pose so the idle unwind can't fight the cursor. */
    let tx = 0, ty = 0;
    let hover = false;
    let startX = 0, startY = 0, lastX = 0, lastY = 0;
    let raf = 0;

    const apply = () => {
      el.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
      el.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
      el.style.setProperty('--rz', `${rz.toFixed(2)}deg`);
      /* the light stays put while the ball turns under it, so the highlight
         and the shadow both travel opposite the pose */
      el.style.setProperty('--lx', `${(-ry * 0.55).toFixed(2)}%`);
      el.style.setProperty('--ly', `${(rx * 0.55).toFixed(2)}%`);
      el.style.setProperty('--spin', `${(-rz * 0.5).toFixed(2)}deg`);
    };

    const tick = () => {
      if (!held) {
        if (Math.abs(vz) > 0.02) {
          // carry the flick
          rz += vz;
          vz *= 0.972;
        } else {
          // then unwind all the way back to where it started
          vz = 0;
          rz += (0 - rz) * 0.045;
          if (Math.abs(rz) < 0.05) rz = 0;
        }
        /* while a mouse is over it the ball follows the cursor; once the
           pointer leaves, the target is 0 and this same easing walks it home */
        rx += (tx - rx) * 0.09;
        ry += (ty - ry) * 0.09;
        if (!hover) {
          if (Math.abs(rx) < 0.02) rx = 0;
          if (Math.abs(ry) < 0.02) ry = 0;
        }
      }
      apply();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    /* ---------- shared drag maths ---------- */
    const begin = (x: number, y: number, touch: boolean) => {
      held = true;
      claimed = !touch;          // a touch has to prove it means to spin
      vz = 0;
      startX = lastX = x;
      startY = lastY = y;
      hover = false;
      tx = ty = 0;
      el.classList.add('is-held');
    };

    /** returns true once the gesture belongs to us */
    const move = (x: number, y: number) => {
      if (!held) return false;

      if (!claimed) {
        const adx = Math.abs(x - startX);
        const ady = Math.abs(y - startY);
        if (adx < 6 && ady < 6) return false;      // too small to judge
        if (ady > adx) { end(); return false; }     // that is a page scroll
        claimed = true;
      }

      const dx = x - lastX;
      const dy = y - lastY;
      lastX = x;
      lastY = y;

      ry = Math.max(-38, Math.min(38, ry + dx * 0.4));
      rx = Math.max(-30, Math.min(30, rx - dy * 0.35));
      rz += dx * 0.34;
      vz = dx * 0.34;            // whatever it was doing at release is the flick
      apply();
      return true;
    };

    const end = () => {
      held = false;
      claimed = false;
      el.classList.remove('is-held');
    };

    /* ---------- touch: the fallback that always fires ---------- */
    const onTouchStart = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      begin(t.clientX, t.clientY, true);
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      if (move(t.clientX, t.clientY) && e.cancelable) e.preventDefault();
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', end);
    el.addEventListener('touchcancel', end);

    /* ---------- mouse and pen ---------- */
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;       // handled above
      begin(e.clientX, e.clientY, false);
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      move(e.clientX, e.clientY);
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      if (el.hasPointerCapture?.(e.pointerId)) el.releasePointerCapture(e.pointerId);
      end();
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);

    /* ---------- a mouse also makes it lean as it passes ---------- */
    const onHover = (e: PointerEvent) => {
      if (held || e.pointerType !== 'mouse' || calm.matches) return;
      const r = el.getBoundingClientRect();
      /* how far the cursor is from the middle, in half-widths: 0 at the centre,
         1 at the edge. Past the reach it stops pulling entirely. */
      const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      const reach = 1.9;
      if (Math.abs(nx) > reach || Math.abs(ny) > reach) {
        hover = false;
        tx = ty = 0;
        return;
      }
      hover = true;
      ty = Math.max(-1, Math.min(1, nx)) * 15;
      tx = -Math.max(-1, Math.min(1, ny)) * 15;
    };
    if (fine.matches) window.addEventListener('pointermove', onHover);

    /* the cursor can also leave through the window edge, which fires no move */
    const onLeave = () => { hover = false; tx = ty = 0; };
    if (fine.matches) document.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', end);
      el.removeEventListener('touchcancel', end);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      if (fine.matches) {
        window.removeEventListener('pointermove', onHover);
        document.removeEventListener('pointerleave', onLeave);
      }
    };
  }, []);

  return (
    <div className="hero-mark" ref={wrap}>
      <span className="hero-aura" aria-hidden="true" />
      <span className="hero-cast" aria-hidden="true" />
      <span className="hero-float">
        {/* the ball: emblem surface, then the glass that sits on top of it */}
        <span className="hero-ball">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/emblem.png" alt="Soul in Motion" draggable={false} />
          <span className="hero-shade" aria-hidden="true" />
          <span className="hero-spec" aria-hidden="true" />
          <span className="hero-gloss" aria-hidden="true" />
          <span className="hero-rim" aria-hidden="true" />
        </span>
      </span>
      <span className="hero-halo" aria-hidden="true" />
    </div>
  );
}
