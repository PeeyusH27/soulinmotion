/** §5 — heart chakra wash; the brand's own colour instead of a stock photo. */
export default function Quote() {
  return (
    <section
      className="sec quote-band tint"
      id="shift"
      style={{ '--tint': 'var(--heart)', '--tint-x': '50%', '--tint-y': '50%' } as React.CSSProperties}
    >
      <div className="wrap reveal">
        <span className="kicker">One simple shift can change everything</span>
        <blockquote>
          “Freedom begins when you stop trying to fix your life and start seeing the patterns that
          create it.”
        </blockquote>
      </div>
    </section>
  );
}
