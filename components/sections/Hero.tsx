import Link from 'next/link';
import HeroMark from '../HeroMark';
import { ArrowRight, CalendarIcon, ClockIcon, GlobeIcon } from '../Icons';

const DETAILS = [
  { Icon: CalendarIcon, label: 'Date · Coming soon' },
  { Icon: ClockIcon, label: '90 minutes' },
  { Icon: GlobeIcon, label: 'Live on Zoom' },
];

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg parallax" data-speed="0.08" />

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="eyebrow reveal">Live webinar</span>

          <h1 className="d1 reveal" data-delay="1">
            <span className="line">See clearly.</span>
            <span className="line">Question deeply.</span>
            <span className="line clay">Live freely.</span>
          </h1>

          <p className="lead reveal" data-delay="2">
            A journey from patterns to awareness through the power of your mind and the wisdom of
            the chakras.
          </p>

          <div className="hero-chips reveal" data-delay="3">
            {DETAILS.map(({ Icon, label }) => (
              <span className="chip chip--glass" key={label}>
                <Icon />
                {label}
              </span>
            ))}
          </div>

          <div className="hero-cta reveal" data-delay="4">
            <Link className="btn" href="#booking">
              Reserve your spot
              <ArrowRight />
            </Link>
            <span className="hero-note">Limited seats only</span>
          </div>
        </div>

        <div className="hero-art reveal" data-delay="2">
          <HeroMark />
        </div>
      </div>
    </section>
  );
}
