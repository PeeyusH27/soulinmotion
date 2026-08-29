import HeroMark from '../HeroMark';
import Badge, { EventBadges } from '../Badge';
import RegisterButton from '../RegisterButton';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 className="d1 reveal" data-delay="1">
            <span className="line">See clearly.</span>
            <span className="line">Question deeply.</span>
            <span className="line clay">Live freely.</span>
          </h1>

          <p className="lead reveal" data-delay="2">
            A journey from patterns to awareness through the power of your mind and the wisdom of
            the chakras.
          </p>

          <div className="hero-cta reveal" data-delay="3">
            <RegisterButton size="lg">Reserve your spot</RegisterButton>
          </div>

          <div className="badges reveal" data-delay="4">
            <Badge kind="seats">Limited seats only</Badge>
            <EventBadges />
          </div>

          <p className="hero-fine reveal" data-delay="5">
            Registration takes about a minute · The Zoom link arrives by email
          </p>
        </div>

        <div className="hero-art reveal" data-delay="2">
          <HeroMark />
        </div>
      </div>
    </section>
  );
}
