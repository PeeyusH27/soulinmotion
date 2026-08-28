import Headline from '../Headline';
import {
  BodyIcon, EnergyIcon, IdentityIcon, InnerSelfIcon, JourneyIcon,
  PatternIcon, ShiftIcon, SpeechClarityIcon, SystemIcon,
} from '../Icons';

const EXPERIENCE = [
  { Icon: SystemIcon, text: 'Understand your inner system' },
  { Icon: PatternIcon, text: 'See your patterns' },
  { Icon: BodyIcon, text: 'Explore mind, chakras and body' },
  { Icon: IdentityIcon, text: 'Exercise to shift your identity' },
  { Icon: JourneyIcon, text: 'Interactive transformation journey' },
];

const WALK_AWAY = [
  { Icon: SpeechClarityIcon, text: 'Clarity about your thoughts and patterns' },
  { Icon: ShiftIcon, text: 'Tools to shift your mindset and emotions' },
  { Icon: InnerSelfIcon, text: 'A deeper connection with your inner self' },
  { Icon: EnergyIcon, text: 'Renewed energy, balance and direction in life' },
];

export default function LiveExperience() {
  return (
    <section className="sec" id="live">
      <div className="wrap split">
        <div className="reveal">
          <span className="kicker">On the day</span>
          <Headline text="The live experience" mark={['live']} className="d3" />
          <ol className="list-rows">
            {EXPERIENCE.map((item, i) => (
              <li key={item.text}>
                <span className="n">0{i + 1}</span>
                {item.text}
              </li>
            ))}
          </ol>
        </div>

        <div className="reveal" data-delay="1">
          <span className="kicker kicker--sage">Afterwards</span>
          <Headline text="You will walk away with" mark={['walk']} className="d3" />
          <div className="away-grid">
            {WALK_AWAY.map(({ Icon, text }) => (
              <div className="away-tile" key={text}>
                <Icon />
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
