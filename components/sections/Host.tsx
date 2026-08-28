const SPECIALISMS = ['Energy Work', 'NLP', 'Chakra Healing', 'Conscious Living'];

export default function Host() {
  return (
    <section className="host-band" id="host">
      <div className="wrap host-wrap">
        <div className="host-arch reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/host.png" alt="Shradha Saha" />
          <span className="ring-deco" aria-hidden="true" />
        </div>

        <div className="host-copy reveal" data-delay="1">
          <div className="host-id">
            <span className="kicker host-kicker">Who is your host?</span>
            <h2 className="host-name-xl">Shradha Saha</h2>
          </div>

          <div className="host-meta">
            <div className="host-meta-row">
              <span className="host-meta-k">Role</span>
              <span className="host-meta-v">Flow &amp; Movement Coach</span>
            </div>

            <div className="host-meta-row">
              <span className="host-meta-k">Specializing in</span>
              <span>
                <span className="host-tags">
                  {SPECIALISMS.map((tag) => (
                    <span className="chip" key={tag}>{tag}</span>
                  ))}
                </span>
                <span className="host-meta-note">
                  Chakra healing covers meditations and breathwork techniques.
                </span>
              </span>
            </div>

            <div className="host-meta-row">
              <span className="host-meta-k">Focus</span>
              <span className="host-meta-v">Exploring human potential</span>
            </div>
          </div>
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="host-watermark" src="/brand/emblem.png" alt="" aria-hidden="true" />
    </section>
  );
}
