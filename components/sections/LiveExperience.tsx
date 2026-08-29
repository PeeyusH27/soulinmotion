import Headline from '../Headline';
import RegisterButton from '../RegisterButton';
import { Check } from '../Icons';

const EXPERIENCE = [
  'Understand your inner system',
  'See your patterns',
  'Explore mind, chakras and body',
  'Exercise to shift your identity',
  'Interactive transformation journey',
];

const WALK_AWAY = [
  'Clarity about your thoughts and patterns',
  'Tools to shift your mindset and emotions',
  'A deeper connection with your inner self',
  'Renewed energy, balance and direction in life',
];

/** §6 — throat (voice, interaction) for the live session; sage for what you keep. */
export default function LiveExperience() {
  return (
    <section className="sec" id="live">
      <div className="wrap split">
        <div style={{ '--tint': 'var(--throat)' } as React.CSSProperties}>
          <div className="sec-head reveal">
            <span className="kicker">On the day</span>
            <Headline text="The live experience" mark={['live']} />
          </div>
          <ol className="check-list">
            {EXPERIENCE.map((text, i) => (
              <li className="reveal" data-delay={i + 1} key={text}>
                <span className="ck">{i + 1}</span>
                {text}
              </li>
            ))}
          </ol>
        </div>

        <div style={{ '--tint': 'var(--sage-d)' } as React.CSSProperties}>
          <div className="sec-head reveal">
            <span className="kicker">Afterwards</span>
            <Headline text="You will walk away with" mark={['walk', 'away']} />
          </div>
          <ul className="check-list">
            {WALK_AWAY.map((text, i) => (
              <li className="reveal" data-delay={i + 1} key={text}>
                <span className="ck"><Check /></span>
                {text}
              </li>
            ))}
          </ul>
          <div className="reveal" data-delay="5" style={{ marginTop: 'var(--s-3)' }}>
            <RegisterButton>Save my seat</RegisterButton>
          </div>
        </div>
      </div>
    </section>
  );
}
