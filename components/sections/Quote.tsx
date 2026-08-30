/**
 * §5 — heart chakra wash. This is the strongest sentence on the site, so it is
 * signed: an unattributed quote in the page's own voice reads as decoration,
 * the same words signed by the host read as a point of view.
 */
export default function Quote() {
  return (
    <section
      className="sec quote-band tint"
      id="shift"
      style={{ '--tint': 'var(--heart)', '--tint-x': '50%', '--tint-y': '50%' } as React.CSSProperties}
    >
      <div className="wrap reveal">
        <span className="kicker">The idea the whole session runs on</span>
        <blockquote>
          “Freedom begins when you stop trying to fix your life and start seeing the patterns that
          create it.”
        </blockquote>
        <cite className="quote-by">Shradha Saha</cite>
      </div>
    </section>
  );
}
