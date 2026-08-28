'use client';

import { useEffect, useRef, useState } from 'react';
import Headline from '../Headline';

const STEPS = [
  { title: 'Life as We Experience It', text: 'Starting point of our reality', tone: 'a' },
  { title: 'Patterns We Repeat', text: 'What keeps us stuck', tone: 'b' },
  { title: 'Questions We Ask', text: 'Shape the thoughts we think', tone: 'c' },
  { title: 'Filters & Conditioning', text: 'Beliefs, past & perception', tone: 'a' },
  { title: 'Perception & Energy', text: 'How we see shapes how we feel', tone: 'b' },
  { title: 'Awareness & Choice', text: 'The key to creating a new experience', tone: 'd' },
  { title: 'Chakra Meditation', text: 'Align, heal & evolve', tone: 'e' },
] as const;

/**
 * The seven steps ride sideways while the section is pinned: half the scroll
 * the stacked deck needed, and you can jump straight to any step. On touch it
 * becomes an ordinary swipeable track with snap points.
 */
export default function Flow() {
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 901px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    const apply = () => setPinned(wide.matches && !reduce.matches);
    apply();
    wide.addEventListener('change', apply);
    reduce.addEventListener('change', apply);
    return () => {
      wide.removeEventListener('change', apply);
      reduce.removeEventListener('change', apply);
    };
  }, []);

  useEffect(() => {
    if (!pinned) return;
    let raf = 0;
    let ticking = false;

    const run = () => {
      const stageEl = stage.current;
      const trackEl = track.current;
      ticking = false;
      if (!stageEl || !trackEl) return;

      const rect = stageEl.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const p = Math.max(0, Math.min(1, scrollable > 0 ? -rect.top / scrollable : 0));
      const travel = trackEl.scrollWidth - trackEl.clientWidth;

      trackEl.style.transform = `translate3d(${(-p * travel).toFixed(1)}px, 0, 0)`;
      setActive(Math.round(p * (STEPS.length - 1)));
    };

    const onScroll = () => {
      if (!ticking) { ticking = true; raf = requestAnimationFrame(run); }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', run);
    run();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', run);
    };
  }, [pinned]);

  /* clicking a dot scrolls to the point in the pin where that card is centred */
  const goTo = (i: number) => {
    const stageEl = stage.current;
    if (!stageEl) return;
    if (!pinned) {
      track.current?.children[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      return;
    }
    const scrollable = stageEl.offsetHeight - window.innerHeight;
    const top = stageEl.offsetTop + (i / (STEPS.length - 1)) * scrollable;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section className={`flow-stage${pinned ? ' is-pinned' : ''}`} id="flow" ref={stage}>
      <div className="flow-pin">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="kicker">A powerful flow</span>
            <Headline text="How the ninety minutes move" mark={['move']} />
          </div>
        </div>

        <div className="flow-viewport">
          <div className="flow-track" ref={track}>
            {STEPS.map((step, i) => (
              <article
                className={`flow-card flow-card--${step.tone}${i === active ? ' is-active' : ''}`}
                key={step.title}
              >
                <span className="flow-ghost" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="n">Step {String(i + 1).padStart(2, '0')} / 07</span>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="wrap">
          <div className="flow-dots" role="tablist" aria-label="The seven steps">
            {STEPS.map((step, i) => (
              <button
                key={step.title}
                className={`flow-dot${i === active ? ' is-active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={step.title}
                aria-selected={i === active}
                role="tab"
              >
                <span>{String(i + 1).padStart(2, '0')}</span>
              </button>
            ))}
            <span className="flow-progress" aria-hidden="true">
              <i style={{ '--p': active / (STEPS.length - 1) } as React.CSSProperties} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
