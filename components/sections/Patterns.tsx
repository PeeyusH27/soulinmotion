import Headline from '../Headline';
import { Check } from '../Icons';

const ITEMS = [
  'You feel stuck in repeating patterns',
  'You overthink, doubt or feel lost often',
  'You want clarity, inner peace and emotional freedom',
  'You are curious about chakras, energy & self-awareness',
  'You are ready to transform your life from within',
];

/** §2 — root chakra: the ground you stand on. */
export default function Patterns() {
  return (
    <section
      className="sec tint"
      id="about"
      style={{ '--tint': 'var(--root)', '--tint-x': '0%', '--tint-y': '0%' } as React.CSSProperties}
    >
      <div className="wrap">
        <div>
          <div className="sec-head reveal">
            <span className="kicker">Recognise yourself</span>
            <Headline text="This webinar is for you if…" mark={['you']} />
          </div>

          <ul className="check-list">
            {ITEMS.map((text, i) => (
              <li className="reveal" data-delay={i + 1} key={text}>
                <span className="ck"><Check /></span>
                {text}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
