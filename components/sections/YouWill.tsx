'use client';

import Headline from '../Headline';
import { useEffect, useRef, useState } from 'react';
import { BrainIcon, EyeIcon, FunnelIcon, LotusIcon, MeditateIcon } from '../Icons';

const ITEMS = [
  { Icon: EyeIcon, text: 'See how your mind creates your reality' },
  { Icon: BrainIcon, text: 'Understand the patterns that keep you stuck' },
  { Icon: FunnelIcon, text: 'Discover your mental filters and beliefs' },
  { Icon: LotusIcon, text: 'Experience the wisdom of chakras & inner energy' },
  { Icon: MeditateIcon, text: 'Practice awareness that brings clarity, freedom & flow' },
];

const DWELL = 5200; // ms on each item before it advances

export default function YouWill() {
  const [active, setActive] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const [progress, setProgress] = useState(0);
  const paused = useRef(false);
  const started = useRef<number | null>(null);

  /* advance on a timer, with the bar showing how long is left */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const tick = (now: number) => {
      if (started.current === null) started.current = now;
      if (paused.current) started.current = now - progress * DWELL;

      const p = Math.min((now - started.current) / DWELL, 1);
      setProgress(p);

      if (p >= 1) {
        started.current = now;
        setSwapping(true);
        window.setTimeout(() => {
          setActive((v) => (v + 1) % ITEMS.length);
          setSwapping(false);
        }, 190);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // progress is read through a ref-like pattern; re-running on it would reset the timer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const select = (i: number) => {
    if (i === active) return;
    started.current = null;
    setProgress(0);
    setSwapping(true);
    window.setTimeout(() => { setActive(i); setSwapping(false); }, 160);
  };

  const Current = ITEMS[active].Icon;

  return (
    <section className="sec band band-line" id="experience">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="kicker kicker--sage">Ninety minutes, live</span>
          <Headline text="In this webinar you will…" mark={['will']} />
        </div>

        <div
          className={`show${swapping ? ' is-swapping' : ''}`}
          onPointerEnter={() => { paused.current = true; }}
          onPointerLeave={() => { paused.current = false; }}
        >
          <div className="show-stage reveal">
            <span className="show-ghost" aria-hidden="true">
              {String(active + 1).padStart(2, '0')}
            </span>
            <span className="show-icon show-swap">
              <Current />
            </span>
            <p className="show-text show-swap">{ITEMS[active].text}</p>
          </div>

          <div className="show-list reveal" data-delay="1">
            {ITEMS.map((item, i) => (
              <button
                key={item.text}
                className={`show-row${i === active ? ' is-active' : ''}`}
                onClick={() => select(i)}
                aria-current={i === active}
              >
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <p>{item.text}</p>
                <span className="show-bar" aria-hidden="true">
                  <i style={{ '--p': i === active ? progress : 0 } as React.CSSProperties} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
