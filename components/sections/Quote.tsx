import { CHAKRAS } from '@/lib/chakras';

const HEART = CHAKRAS[3];

/** §5 — heart chakra wash; the brand's own colour instead of a stock photo. */
export default function Quote() {
  return (
    <section
      className="sec quote-band tint"
      id="shift"
      style={{ '--tint': 'var(--heart)', '--tint-x': '50%', '--tint-y': '50%' } as React.CSSProperties}
    >
      <div className="wrap reveal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="disc" src={HEART.file} alt="" aria-hidden="true" />
        <span className="kicker">One simple shift can change everything</span>
        <blockquote>
          “Freedom begins when you stop trying to fix your life and start seeing the patterns that
          create it.”
        </blockquote>
      </div>
    </section>
  );
}
