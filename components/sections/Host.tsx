import RegisterButton from '../RegisterButton';

const SPECIALISMS = ['Energy work', 'NLP', 'Chakra healing', 'Breathwork', 'Conscious living'];

/** §7 — ajna: perception, insight. "Why choose me" lives here as a short story. */
export default function Host() {
  return (
    <section
      className="sec tint"
      id="host"
      style={{ '--tint': 'var(--ajna)', '--tint-x': '0%', '--tint-y': '50%' } as React.CSSProperties}
    >
      <div className="wrap host">
        <div className="reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="host-photo" src="/brand/host.png" alt="Shradha Saha" />
        </div>

        <div className="host-copy reveal" data-delay="1">
          <span className="kicker">Who is your host?</span>
          <h2 className="d2">Shradha Saha</h2>
          <p className="host-role">Flow &amp; Movement Coach · Exploring human potential</p>

          <div className="chips">
            {SPECIALISMS.map((tag) => <span className="chip" key={tag}>{tag}</span>)}
          </div>

          <p className="body">
            I don’t teach transformation from a textbook — <b>I have lived it.</b> I began as an
            architect and set designer in Mumbai, creating worlds for films while living a very
            real, very demanding life of my own. Stress, anxiety and the feeling that something had
            to change led me deep into yoga, meditation, NLP, chakra work, energy practices and
            Vedanta. I didn’t just learn these systems; I tested every one of them on my own life
            first.
          </p>

          <div style={{ marginTop: 'var(--s-1)' }}>
            <RegisterButton>Join Shradha live</RegisterButton>
          </div>
        </div>
      </div>
    </section>
  );
}
