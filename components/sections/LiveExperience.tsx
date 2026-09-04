import Headline from '../Headline';
import RegisterButton from '../RegisterButton';
import { Check, Cross } from '../Icons';

/**
 * §6 — this slot used to restate §3's promises in weaker words. It now does the
 * two jobs the page was missing: it kills the biggest unspoken objection in
 * free-webinar marketing (am I about to sit through a sales pitch?), and it
 * replaces four feelings with four things you can hold up afterwards.
 */
const NOT = [
  'Not a 90-minute advertisement. Nothing is sold on the call.',
  'Not a lecture. You’ll be writing, and you’ll be asked questions.',
  'Not a fix. You leave with a way of seeing, and one practice.',
  'Not group therapy. Cameras optional; you share only if you want to.',
  'Not beginners-only. Bring experience if you have it and it’ll go further.',
];

const KEEP = [
  'One pattern of yours, written down and mapped.',
  'The question that’s been holding it in place.',
  'A pattern-interrupt you can run in under a minute.',
];

export default function LiveExperience() {
  return (
    <section className="sec" id="live">
      <div className="wrap split">
        <div style={{ '--tint': 'var(--throat)' } as React.CSSProperties}>
          <div className="sec-head reveal">
            <span className="kicker">Before you decide</span>
            <Headline text="What this is not" mark={['not']} />
          </div>
          <ul className="check-list check-list--no">
            {NOT.map((text, i) => (
              <li className="reveal" data-delay={i + 1} key={text}>
                <span className="ck ck--no"><Cross /></span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ '--tint': 'var(--sage-d)' } as React.CSSProperties}>
          <div className="sec-head reveal">
            <span className="kicker">Afterwards</span>
            <Headline text="What you leave with" mark={['leave']} />
          </div>
          <ul className="check-list">
            {KEEP.map((text, i) => (
              <li className="reveal" data-delay={i + 1} key={text}>
                <span className="ck"><Check /></span>
                {text}
              </li>
            ))}
          </ul>
          <div className="reveal" data-delay="5" style={{ marginTop: 'var(--s-3)' }}>
            <RegisterButton>Save my free seat</RegisterButton>
          </div>
        </div>
      </div>
    </section>
  );
}
