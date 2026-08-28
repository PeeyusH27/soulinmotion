/**
 * A full-bleed image band. The photograph scales and un-skews as the section
 * crosses the viewport (driven from Motion), with the line set on glass.
 */
export default function Quote() {
  return (
    <section className="scene" id="shift">
      <div className="scene-media" data-scene>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=2000&q=80"
          alt=""
          aria-hidden="true"
        />
      </div>
      <span className="scene-veil" aria-hidden="true" />

      <div className="wrap scene-inner">
        <figure className="glass reveal">
          <span className="kicker">One simple shift can change everything</span>
          <blockquote>
            Freedom begins when you stop trying to fix your life and start seeing the patterns that
            create it.
          </blockquote>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="glass-mark" src="/brand/emblem.png" alt="" aria-hidden="true" />
        </figure>
      </div>
    </section>
  );
}
