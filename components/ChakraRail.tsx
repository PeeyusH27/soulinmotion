'use client';

import { useEffect, useState } from 'react';
import { CHAKRAS } from '@/lib/chakras';

/** Seven segments under the header that light up, root to crown, as the page is read. */
export default function ChakraRail() {
  const [lit, setLit] = useState(0);

  useEffect(() => {
    let ticking = false;
    const run = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setLit(Math.min(7, Math.ceil(p * 7 + 0.001)));
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    run();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="rail" aria-hidden="true">
      {CHAKRAS.map((c, i) => (
        <i key={c.id} className={i < lit ? 'is-lit' : ''} style={{ '--c': c.colors.light } as React.CSSProperties} />
      ))}
    </div>
  );
}
