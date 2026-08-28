import Headline from '../Headline';
import {
  ClarityHeadIcon, LotusIcon, OverthinkIcon, ThoughtLoopIcon, TransformIcon,
} from '../Icons';
import ChakraRing from './ChakraRing';

const ITEMS = [
  { Icon: ThoughtLoopIcon, text: 'You feel stuck in repeating patterns' },
  { Icon: OverthinkIcon, text: 'You overthink, doubt or feel lost often' },
  { Icon: ClarityHeadIcon, text: 'You want clarity, inner peace and emotional freedom' },
  { Icon: LotusIcon, text: 'You are curious about chakras, energy & self-awareness' },
  { Icon: TransformIcon, text: 'You are ready to transform your life from within' },
];

/**
 * On wide screens the rows scroll past a chakra ring that stays put beside
 * them. Below that the two stack back into ordinary full-width sections.
 */
export default function Patterns() {
  return (
    <section className="sec pair" id="about">
      <div className="wrap pair-grid">
        <div className="pair-left">
          <div className="sec-head reveal">
            <span className="kicker">Recognise yourself</span>
            <Headline text="This webinar is for you if…" mark={['you']} />
          </div>

          {/* the wash sweeps in from the left on hover */}
          <div className="rows">
            {ITEMS.map(({ Icon, text }, i) => (
              <div
                className="row-item reveal"
                data-delay={i + 1}
                style={{ '--from': i % 2 ? '46px' : '-46px' } as React.CSSProperties}
                key={text}
              >
                <span className="row-n">{String(i + 1).padStart(2, '0')}</span>
                <p className="row-text">{text}</p>
                <span className="row-mark">
                  <Icon />
                </span>
              </div>
            ))}
          </div>

          <p className="pair-note reveal">
            Each of these lives somewhere in the body’s seven centres — which is where the ninety
            minutes begin.
          </p>
        </div>

        <div className="pair-right">
          <ChakraRing variant="panel" />
        </div>
      </div>
    </section>
  );
}
