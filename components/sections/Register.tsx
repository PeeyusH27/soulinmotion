'use client';

import { useState } from 'react';
import Headline from '../Headline';
import { EventBadges } from '../Badge';
import RegisterForm from '../RegisterForm';
import RegisterButton from '../RegisterButton';
import { HAS_FORM, REGISTER_URL, USE_MODAL } from '@/lib/register';

/**
 * Objections first, information second. The five questions that used to be here
 * were all informational — but nobody is blocked on "what is this about" after
 * scrolling the whole page. They are blocked on cost, on being sold to, and on
 * having to turn their camera on.
 */
const FAQS = [
  {
    q: 'Is it really free?',
    a: 'Yes. No card, no trial, and nothing to buy on the call. You register, the Zoom link arrives, you show up.',
  },
  {
    q: 'Will there be a sales pitch at the end?',
    a: 'No. There is no sales pitch in this webinar. I will offer the 7-day chakra meditation series in the session, but there is no pressure to buy anything.',
  },
  {
    q: 'Will it be recorded?',
    a: 'No recordings are provided for the 90-minute webinar, because it is a live experience. If you miss it after registering, you will be provided a link for the next live webinar.',
  },
  {
    q: 'Do I have to be on camera or speak?',
    a: 'No. Cameras are optional and the chat is enough. Nobody is put on the spot, and you share only if you want to.',
  },
  {
    q: 'Do I need to know anything about chakras or NLP?',
    a: 'Not at all. It is built for beginners as well as people who already have some experience with energy work, yoga or personal growth — bring experience if you have it and it will go further.',
  },
  {
    q: 'Is it a meditation?',
    a: 'Both. You’ll understand the concepts and experience the techniques live, and take away things to practice.',
  },
  {
    q: 'What should I bring?',
    a: 'An open mind, a quiet space where possible, a notebook and pen — and one real-life pattern or situation you’re curious about.',
  },
  {
    q: 'What if I can’t make it live?',
    a: 'Register anyway. In case you miss the webinar, you will be provided a link for the next live webinar.',
  },
];

/** §8 — the form itself, in full, with the objections answered alongside it. */
export default function Register() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="sec sec--band" id="register">
      <div className="wrap register">
        <div className="register-aside">
          <div className="sec-head reveal">
            <span className="kicker">Last step</span>
            <Headline text="Save your seat" mark={['seat']} />
            <p className="lead">
              One short form, about 40 seconds. The Zoom link and a calendar invite arrive by
              email straight away.
            </p>
          </div>

          <div className="badges reveal" data-delay="1">
            <EventBadges />
          </div>

          <div className="faq reveal" data-delay="2">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={item.q}>
                  <button className="faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                    <span className="faq-t">{item.q}</span>
                    <span className="faq-pm" aria-hidden="true" />
                  </button>
                  <div className="faq-a"><div><p>{item.a}</p></div></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="form-card reveal" data-delay="1">
          {USE_MODAL ? (
            /* the same component the dialog renders, so the two can never drift */
            <RegisterForm variant="inline" source="register-section" />
          ) : HAS_FORM ? (
            <>
              <h3 className="d3">Yes, save my seat</h3>
              <RegisterButton size="lg" block>Save my free seat</RegisterButton>
              <p className="form-fine">Free · No card needed · Unsubscribe any time</p>
              <iframe
                className="form-embed"
                src={`${REGISTER_URL.replace(/\/viewform.*$/, '')}/viewform?embedded=true`}
                title="Soul in Motion webinar registration"
                loading="lazy"
              >
                Loading…
              </iframe>
            </>
          ) : (
            <div className="form-missing">
              <b>Registration is not connected yet.</b>
              <span>
                Set <code>SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> in{' '}
                <code>.env.local</code> to switch the form on, or set{' '}
                <code>NEXT_PUBLIC_REGISTER_MODE=google</code> to fall back to the Google Form.
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
