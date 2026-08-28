import Headline from '../Headline';
import {
  ArrowLine, BodyIcon, BrainIcon, InnerSelfIcon, JourneyIcon,
  LotusIcon, ShiftIcon, SystemIcon, TransformIcon,
} from '../Icons';

const SHIFTS = [
  {
    Icon: BrainIcon,
    title: 'Understand your patterns',
    text: 'Recognise the thoughts, beliefs and emotional patterns that keep repeating in your life.',
    tone: 'a',
  },
  {
    Icon: ShiftIcon,
    title: 'Rewire old responses',
    text: 'Learn to move from automatic reactions toward more conscious choices.',
    tone: 'b',
  },
  {
    Icon: BodyIcon,
    title: 'Connect mind, body & energy',
    text: 'Understand how what you think and feel can show up in your body and energetic experience.',
    tone: 'c',
  },
  {
    Icon: LotusIcon,
    title: 'Release what no longer serves you',
    text: 'Create awareness around emotional patterns and beliefs that you may have been carrying for years.',
    tone: 'd',
  },
  {
    Icon: JourneyIcon,
    title: 'Create new mental pathways',
    text: 'Develop healthier ways of thinking, responding and relating to yourself and others.',
    tone: 'a',
  },
  {
    Icon: SystemIcon,
    title: 'Work with your chakras consciously',
    text: 'Use chakra-based practices as a framework for self-awareness, balance and inner exploration.',
    tone: 'e',
  },
  {
    Icon: InnerSelfIcon,
    title: 'Feel more connected to yourself',
    text: 'Build greater clarity around what you feel, what you need and what you truly want.',
    tone: 'b',
  },
  {
    Icon: TransformIcon,
    title: 'Create a new way of being',
    text: 'Move beyond simply changing habits toward a deeper shift in how you see yourself and experience your life.',
    tone: 'f',
  },
];

/* the transformation, in one line */
const ARC = ['Unconscious patterns', 'Conscious awareness', 'New choices', 'A new experience of life'];

export default function Shifts() {
  return (
    <section className="sec" id="shifts">
      <div className="wrap">
        {/* stays in view while the cards move under it */}
        <div className="shift-head">
          <div className="sec-head reveal">
            <span className="kicker">What actually shifts</span>
            <Headline text="Not information. A different way of seeing." mark={['seeing']} />
          </div>
        </div>

        <div className="shift-grid">
          {SHIFTS.map(({ Icon, title, text, tone }, i) => (
            <article
              className={`shift-card shift-card--${tone} reveal`}
              data-delay={(i % 4) + 1}
              style={{ '--i': i } as React.CSSProperties}
              key={title}
            >
              <div className="shift-top">
                <Icon />
                <span className="shift-n">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h4>{title}</h4>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <div className="arrow-flow reveal">
          <span className="kicker">The transformation in one line</span>
          {ARC.map((step, i) => (
            <span key={step} style={{ display: 'contents' }}>
              {i > 0 && <ArrowLine />}
              <b>{step}</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
