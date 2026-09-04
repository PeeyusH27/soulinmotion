import Headline from '../Headline';
import RegisterButton from '../RegisterButton';
import StackMeasure from '../StackMeasure';
import { BrainIcon, EyeIcon, FunnelIcon, LotusIcon, MeditateIcon } from '../Icons';

/* Every card names something you leave with — written down, found, practised
   or kept — rather than a state of mind you are promised you will reach. */
const ITEMS = [
  { Icon: EyeIcon, title: 'Name the pattern you’re actually in', text: 'We map one repeating situation from your own life. On paper, in about ten minutes.' },
  { Icon: FunnelIcon, title: 'Find the question underneath it', text: 'Most patterns are held in place by one question you ask on repeat. You’ll find yours.' },
  { Icon: LotusIcon, title: 'See where your body is holding it', text: 'Which centre carries the pattern — and what that tells you about how to work with it.' },
  { Icon: BrainIcon, title: 'Learn one interruption you can use tomorrow', text: 'A simple NLP pattern-interrupt, practised live on the call rather than described.' },
  { Icon: MeditateIcon, title: 'Close with a guided chakra meditation', text: 'Twenty minutes, root to crown.' },
];

/** §3 — sacral chakra: feeling and flow. Every promise visible at once. */
export default function YouWill() {
  return (
    <section
      className="sec you-will"
      id="you-will"
      style={{ '--tint': 'var(--sacral)', '--tint-x': '100%', '--tint-y': '0%' } as React.CSSProperties}
    >
      <span className="glass-orbs" aria-hidden="true"><i /><i /><i /></span>
      <div className="wrap">
        <StackMeasure />
        <div className="sec-head-row stack-head reveal">
          <div className="sec-head">
            <span className="kicker">In 90 minutes</span>
            <Headline text="What we’ll actually do" mark={['actually']} />
          </div>
        </div>

        <div className="grid grid--3 stack">
          {ITEMS.map(({ Icon, title, text }, i) => (
            <div
              className="card card--glass reveal"
              data-delay={(i % 3) + 1}
              style={{ '--i': i } as React.CSSProperties}
              key={title}
            >
              <Icon />
              <h3 className="d3">{title}</h3>
              <p className="body">{text}</p>
            </div>
          ))}
          <div className="card card--glass card--glass-cta reveal" data-delay="3" style={{ '--i': 5 } as React.CSSProperties}>
            <h3 className="d3">Come and find yours</h3>
            <p className="body">Free, live, and small enough that there’s room for your questions.</p>
            <div style={{ marginTop: 'var(--s-2)' }}>
              <RegisterButton tone="ink">Save my free seat</RegisterButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
