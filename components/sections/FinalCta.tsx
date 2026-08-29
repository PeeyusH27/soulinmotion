import Headline from '../Headline';
import RegisterButton from '../RegisterButton';
import { CHAKRAS } from '@/lib/chakras';

const CROWN = CHAKRAS[6];

/** §9 — crown on ink. The largest button on the page. */
export default function FinalCta() {
  return (
    <section className="sec final on-ink" id="join">
      <div className="wrap reveal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="disc" src={CROWN.file} alt="" aria-hidden="true" />
        <Headline text="Are you ready to see what’s really creating your reality?" mark={['reality?']} />
        <p className="lead">Join live. Transform within. Live freely.</p>
        <RegisterButton size="lg">Yes, I want to join!</RegisterButton>
        <p className="final-note">Secure your spot now · Spots are limited to keep the experience powerful</p>
      </div>
    </section>
  );
}
