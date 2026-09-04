import ChakraOrbit from '../ChakraOrbit';
import RegisterButton from '../RegisterButton';
import { ArrowLine } from '../Icons';
import { DATE_LABEL, DATE_VALUE, EVENT, TIME_VALUE } from '@/lib/event';

/* the practical detail, on one hairline under the buttons */
const META = [
  { k: 'Date', v: DATE_VALUE },
  { k: 'Time', v: TIME_VALUE },
  { k: 'Where', v: EVENT.where },
  { k: 'Cost', v: 'Free' },
];


const STEPS = [
  'Life as we experience it',
  'Patterns we repeat',
  'Questions we ask',
  'Filters & conditioning',
  'Perception & energy',
  'Awareness & choice',
  'Chakra meditation',
];

/**
 * The banner runs on ink because the seven discs are jewel-toned — they only
 * glow on a dark ground. The wheel is the subject: it turns on its own, takes
 * a drag, and names whichever chakra is in front. Everything else is quiet so
 * the one moving thing is the one worth watching.
 */
export default function Hero() {
  return (
    <section className="hero" id="home">
      <span className="hero-glow" aria-hidden="true"><i /><i /><i /></span>

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow reveal">
            <span className="hero-live"><i aria-hidden="true" />Free live session</span>
            <span className="hero-when">{DATE_LABEL}</span>
          </p>

          <h1 className="hero-title reveal" data-delay="1">
            <span className="hero-line hero-line--headline">
              Struggling with relationships, health or money?
            </span>
            <span className="hero-line hero-line--accent">
              Your patterns need an exchange program.
            </span>
            <span className="hero-line hero-line--accent hero-line--identity">
              And you need a new identity.
            </span>
          </h1>

          <div className="hero-actions reveal" data-delay="2">
            <div className="hero-buttons">
              <RegisterButton size="lg" tone="gold">Save my free seat</RegisterButton>
              <a className="hero-link" href="#flow">
                See what we cover
                <ArrowLine />
              </a>
            </div>
            <p className="hero-note">
              First session free · Recording sent to everyone who registers
            </p>
          </div>

          <dl className="hero-meta reveal" data-delay="3">
            {META.map(({ k, v }) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

        </div>

        <div className="hero-art">
          <span className="hero-aura" aria-hidden="true" />
          <ChakraOrbit />
        </div>
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...STEPS, ...STEPS].map((step, i) => (
            <span key={i}>
              <em>{String((i % STEPS.length) + 1).padStart(2, '0')}</em>
              {step}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
