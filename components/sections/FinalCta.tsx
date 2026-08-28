import Headline from '../Headline';
import Link from 'next/link';
import { ArrowRight } from '../Icons';

export default function FinalCta() {
  return (
    <section className="sec--tight">
      <div className="wrap">
        <div className="final on-dark reveal">
          <Headline text="Are you ready to see what’s really creating your reality?" mark={['reality']} className="d2" />
          <p className="sub">Join live. Transform within. Live freely.</p>

          <Link className="btn" href="#booking">
            Yes, I want to join!
            <ArrowRight />
          </Link>

          <div className="final-note">
            <span>Secure your spot now</span>
            <span>Spots are limited to keep the experience powerful</span>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="final-lotus" src="/brand/logo.png" alt="" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
