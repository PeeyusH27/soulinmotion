import Headline from '../Headline';
import { Check } from '../Icons';

/**
 * Written as scenes rather than diagnoses. Nobody has ever thought "I feel
 * stuck in repeating patterns" about themselves — they think "why do I always
 * do this?". Each line carries a time on the clock or another person in the
 * room, and the last one picks a fight with the category on purpose.
 */
const ITEMS = [
  'You’ve done the courses and read the books — and still had the same argument last week.',
  'You decide things at 2 a.m. that you’ve talked yourself out of by 9.',
  'You can name exactly what you should do, and still don’t do it.',
  'People tell you you’re the calm one. Your body disagrees.',
  'Something shifted once in a meditation and you’ve never found your way back to it.',
  'You’re curious about chakras and tired of being told to just raise your vibration.',
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
            <Headline text="This session is for you if…" mark={['you']} />
          </div>

          <ul className="check-list">
            {ITEMS.map((text, i) => (
              <li className="reveal" data-delay={i + 1} key={text}>
                <span className="ck"><Check /></span>
                {text}
              </li>
            ))}
          </ul>

          {/* exclusion raises desire and pre-qualifies the list */}
          <p className="not-for reveal" data-delay="6">
            <b>And it isn’t for you if</b> you want someone to tell you what to do, or you’re
            after a quick fix you don’t have to practise. Ninety minutes won’t undo a decade —
            but it will show you what you’re actually working with.
          </p>
        </div>

      </div>
    </section>
  );
}
