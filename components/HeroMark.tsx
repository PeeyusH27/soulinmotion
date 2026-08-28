'use client';

import { useEffect, useRef } from 'react';

/**
 * The mark sits in its glass sphere: it breathes on its own, leans toward a
 * mouse, and can be grabbed and spun with a finger. Let go and it eases back
 * to how it started.
 *
 * Note the ambient drift is CSS, so `prefers-reduced-motion` already silences
 * it through the stylesheet. Dragging is user-initiated, so it stays available
 * either way — bailing out here would leave phones with Reduce Motion on with
 * an image that does nothing at all.
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
    let startX = 0, startY = 0, lastX = 0, lastY = 0;
    let raf = 0;

    const apply = () => {
      el.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
      el.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
      el.style.setProperty('--rz', `${rz.toFixed(2)}deg`);
    };

    const tick = () => {
      if (!held) {
        if (Math.abs(vz) > 0.02) {
          // carry the flick
          rz += vz;
          vz *= 0.955;
        } else {
          // then unwind all the way back to where it started
          vz = 0;
          rz += (0 - rz) * 0.055;
          if (Math.abs(rz) < 0.05) rz = 0;
        }
        rx += (0 - rx) * 0.07;
        ry += (0 - ry) * 0.07;
        if (Math.abs(rx) < 0.02) rx = 0;
        if (Math.abs(ry) < 0.02) ry = 0;
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
      rz += dx * 0.22;
      vz = dx * 0.22;            // whatever it was doing at release is the flick
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
      ry = ((e.clientX - r.left) / r.width - 0.5) * 9;
      rx = -((e.clientY - r.top) / r.height - 0.5) * 9;
    };
    if (fine.matches) window.addEventListener('pointermove', onHover);

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
      if (fine.matches) window.removeEventListener('pointermove', onHover);
    };
  }, []);

  return (
    <div className="hero-mark" ref={wrap}>
      <span className="hero-aura" aria-hidden="true" />
      <span className="hero-orb" aria-hidden="true" />
      <span className="hero-gloss" aria-hidden="true" />
      <span className="hero-halo" aria-hidden="true" />
      <span className="hero-float">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo.png" alt="Soul in Motion" draggable={false} />
      </span>
    </div>
  );
}
