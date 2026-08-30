'use client';

import { useEffect } from 'react';

/** Scroll reveals and the header shadow. Mounted once. */
export default function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const header = document.getElementById('header');
    const revealables = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    let io: IntersectionObserver | null = null;

    // content is only hidden once JS is in charge of showing it again
    document.documentElement.classList.add('has-motion');
    // and anything near the viewport the observer somehow missed is shown after a beat
    const fallback = window.setTimeout(() => {
      revealables.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 1.5) el.classList.add('is-in');
      });
    }, 1800);

    if ('IntersectionObserver' in window && !reduce) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-in'); io?.unobserve(e.target); }
        }),
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
      );
      revealables.forEach((el) => io?.observe(el));

      // anything already on screen at load reveals on the first frame
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

    const onScroll = () => header?.classList.toggle('is-stuck', window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // lets the screenshot helper size a full-page capture
    document.documentElement.dataset.pageHeight = String(document.body.scrollHeight);



    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener('scroll', onScroll);
      io?.disconnect();
    };
  }, []);

  return null;
}
