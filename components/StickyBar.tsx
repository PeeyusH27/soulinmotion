'use client';

import { useEffect, useState } from 'react';
import RegisterButton from './RegisterButton';
import { DATE_SHORT, HAS_DATE } from '@/lib/event';

/**
 * Mobile only (CSS hides it wider than 900px). Slides up once the hero has
 * scrolled away and hides again while the register section is on screen,
 * so it never sits on top of the form it points to.
 */
export default function StickyBar() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('home');
    const reg = document.getElementById('register');
    if (!hero || !reg || !('IntersectionObserver' in window)) return;

    let pastHero = false;
    let onForm = false;
    const update = () => setOn(pastHero && !onForm);

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) pastHero = !e.isIntersecting && e.boundingClientRect.top < 0;
        if (e.target === reg) onForm = e.isIntersecting;
      });
      update();
    }, { threshold: 0.05 });

    io.observe(hero);
    io.observe(reg);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`sticky-bar${on ? ' is-on' : ''}`} aria-hidden={!on}>
      <span>
        <b>Free · 90 min</b>
        <small>{HAS_DATE ? `${DATE_SHORT} · on Zoom` : 'Live on Zoom'}</small>
      </span>
      <RegisterButton size="sm">Save my seat</RegisterButton>
    </div>
  );
}
