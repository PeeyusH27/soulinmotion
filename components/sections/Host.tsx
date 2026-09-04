import RegisterButton from '../RegisterButton';

const SPECIALISMS = ['Energy work', 'NLP', 'Chakra healing', 'Breathwork', 'Conscious living'];

/**
 * A sceptical reader looks for one anchor and currently finds none — no
 * training body, no year, no count. Fill any of these in and the line appears;
 * leave them empty and it stays hidden rather than inventing credentials.
 */
const CREDENTIALS: string[] = [
  // 'Certified NLP Practitioner',
  // 'Teaching since 2019',
  // '500+ sessions held',
];

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
          <span className="kicker">Your host</span>
          <h2 className="d2">Shradha Saha</h2>
          <p className="host-role">Flow &amp; Movement Coach</p>

          <div className="chips">
            {SPECIALISMS.map((tag) => <span className="chip" key={tag}>{tag}</span>)}
          </div>

          <p className="body">
            I spent years as an architect and set designer in Mumbai, building worlds for films. I
            know exactly how much structure sits behind something that looks effortless on screen —
            and how little of it I had in my own life. Stress and anxiety took me into yoga,
            meditation, NLP, chakra work and Vedanta, and I tested every one of them on myself
            before I taught any of it to anyone. <b>I still design structures. They’re just
            internal now.</b>
          </p>

          {CREDENTIALS.length > 0 && (
            <p className="host-creds">{CREDENTIALS.join(' · ')}</p>
          )}

          <div style={{ marginTop: 'var(--s-1)' }}>
            <RegisterButton>Save my free seat</RegisterButton>
          </div>
        </div>
      </div>
    </section>
  );
}
