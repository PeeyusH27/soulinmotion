import Headline from '../Headline';
import RegisterButton from '../RegisterButton';
import { CHAKRAS } from '@/lib/chakras';
import { DATE_LABEL, HAS_DATE } from '@/lib/event';

const CROWN = CHAKRAS[6];

/** §9 — crown on ink. The largest button on the page. */
export default function FinalCta() {
  return (
    <section className="sec final on-ink" id="join">
      <div className="wrap reveal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="disc" src={CROWN.file} alt="" aria-hidden="true" />
        <Headline text="Are you ready to see what’s really creating your reality?" mark={['reality?']} />
        <p className="lead">
          Ninety minutes, live, working on one pattern of your own.
          {HAS_DATE ? ` ${DATE_LABEL}.` : ' Register now and you’ll hear the date first.'}
        </p>
        <RegisterButton size="lg">Save my free seat</RegisterButton>
        <p className="final-note">Free · Recording sent to everyone who registers · Nothing to buy</p>
      </div>
    </section>
  );
}
