import Headline from '../Headline';
import RegisterButton from '../RegisterButton';
import StackMeasure from '../StackMeasure';
import { BrainIcon, EyeIcon, FunnelIcon, LotusIcon, MeditateIcon } from '../Icons';
import { CHAKRAS } from '@/lib/chakras';

const ITEMS = [
  { Icon: EyeIcon, title: 'See how your mind creates your reality', text: 'Recognise the thoughts and beliefs that keep repeating in your life.' },
  { Icon: BrainIcon, title: 'Understand the patterns that keep you stuck', text: 'Move from automatic reactions toward more conscious choices.' },
  { Icon: FunnelIcon, title: 'Discover your mental filters and beliefs', text: 'See the conditioning behind how you perceive yourself and others.' },
  { Icon: LotusIcon, title: 'Experience the wisdom of chakras & inner energy', text: 'A framework for self-awareness, balance and inner exploration.' },
  { Icon: MeditateIcon, title: 'Practice awareness that brings clarity, freedom & flow', text: 'A guided chakra meditation to close the session.' },
];

const SACRAL = CHAKRAS[1];

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
            <Headline text="In this webinar you will…" mark={['will…']} />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SACRAL.file} alt="" aria-hidden="true" />
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
            <h3 className="d3">Ready to see it for yourself?</h3>
            <p className="body">Seats are limited so the session stays intimate.</p>
            <div style={{ marginTop: 'var(--s-2)' }}>
              <RegisterButton tone="ink">Save my seat</RegisterButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
