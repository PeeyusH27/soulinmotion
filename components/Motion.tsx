'use client';

import { useEffect } from 'react';

/**
 * Scroll reveals, icon line-drawing, layered parallax, the flow rails that
 * fill as they arrive, and the testimonial card stack. Mounted once.
 */
export default function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const header = document.getElementById('header');

    /* ---------- reveals ---------- */
    const revealables = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    let io: IntersectionObserver | null = null;

    if ('IntersectionObserver' in window && !reduce) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-in'); io?.unobserve(e.target); }
        }),
        { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
      );
      revealables.forEach((el) => io?.observe(el));

      // safety net: anything already on screen at load reveals on the first
      // frame, so a missed observer callback can never leave content invisible
      requestAnimationFrame(() => {
        revealables.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight * 0.94 && r.bottom > 0) {
            el.classList.add('is-in');
            io?.unobserve(el);
          }
        });
      });
    } else {
      revealables.forEach((el) => el.classList.add('is-in'));
    }

    /* ---------- scroll-driven ---------- */
    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('.parallax'));
    const rails = Array.from(document.querySelectorAll<HTMLElement>('.flow-rail'));
    const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'));
    const stackStage = document.querySelector<HTMLElement>('.stack-stage');
    const stack = document.getElementById('cardStack');
    const cards = stack ? Array.from(stack.querySelectorAll<HTMLElement>('.stack-card')) : [];

    const runParallax = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.speed || '0');
        const r = el.getBoundingClientRect();
        el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - vh / 2) * speed).toFixed(2)}px, 0)`;
      });
    };

    /* the image settles: 1.18 → 1.02 scale, 3deg → 0 skew, as the band crosses */
    const runScenes = () => {
      const vh = window.innerHeight;
      scenes.forEach((el) => {
        const r = el.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
        el.style.setProperty('--s', (1.2 - 0.18 * p).toFixed(4));
        el.style.setProperty('--k', `${(3.4 - 3.4 * p).toFixed(2)}deg`);
      });
    };

    const fillRails = () => {
      const vh = window.innerHeight;
      rails.forEach((rail) => {
        const r = rail.getBoundingClientRect();
        const p = (vh * 0.86 - r.top) / (vh * 0.34);
        rail.style.setProperty('--fill', String(Math.max(0, Math.min(1, p))));
      });
    };

    /* on mobile the outcome cards pile up: each shrinks a touch once it sticks */
    const shiftCards = Array.from(document.querySelectorAll<HTMLElement>('.shift-card'));
    const shiftGrid = document.querySelector<HTMLElement>('.shift-grid');

    const shiftHead = document.querySelector<HTMLElement>('.shift-head');

    const layoutShifts = () => {
      if (!shiftGrid || !shiftCards.length) return;
      if (window.innerWidth > 760) {
        shiftCards.forEach((c) => { c.style.transform = ''; });
        return;
      }
      // park the cards just under whatever the pinned heading actually needs
      const headBottom = 72 + (shiftHead?.offsetHeight ?? 116) - 10;
      shiftGrid.style.setProperty('--head', `${headBottom}px`);

      const gridTop = shiftGrid.getBoundingClientRect().top;
      shiftCards.forEach((card, i) => {
        const stuckAt = headBottom + i * 8;
        const natural = gridTop + card.offsetTop;
        const p = Math.max(0, Math.min(1, (stuckAt - natural) / 420));
        card.style.transform = `scale(${(1 - p * 0.06).toFixed(4)})`;
      });
    };

    const layoutStack = () => {
      if (!stackStage || !stack || !cards.length) return;
      if (window.innerWidth <= 640) {
        cards.forEach((c) => { c.style.transform = ''; c.style.zIndex = ''; });
        return;
      }
      const rect = stackStage.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const p = Math.max(0, Math.min(1, scrollable > 0 ? -rect.top / scrollable : 0));
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const spread = Math.max(60, Math.min(215, (stack.clientWidth - cards[0].offsetWidth) / 4));
      const centre = (cards.length - 1) / 2;

      cards.forEach((card, i) => {
        const off = i - centre;
        const x = off * (10 + (spread - 10) * e);
        const y = Math.abs(off) * (5 + 13 * e);
        const rot = off * (1.4 + 3.1 * e);
        const scale = 1 - Math.abs(off) * 0.035 * e;
        card.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        card.style.zIndex = String(50 - Math.round(Math.abs(off) * 10));
      });
    };

    let ticking = false;
    const onScroll = () => {
      header?.classList.toggle('is-stuck', window.scrollY > 24);
      if (!reduce) { runParallax(); runScenes(); fillRails(); layoutShifts(); layoutStack(); }
      ticking = false;
    };
    const requestTick = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    };

    // lets the screenshot helper size a full-page capture
    document.documentElement.dataset.pageHeight = String(document.body.scrollHeight);

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', requestTick);
      window.removeEventListener('resize', onScroll);
      io?.disconnect();
    };
  }, []);

  return null;
}
