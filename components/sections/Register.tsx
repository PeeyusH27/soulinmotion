'use client';

import { useState } from 'react';
import Headline from '../Headline';
import { EventBadges } from '../Badge';
import RegisterButton from '../RegisterButton';
import { CAN_EMBED, EMBED_URL, HAS_FORM } from '@/lib/register';

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
    a: 'No. The full ninety minutes is the session. If you want to work with me afterwards you’re welcome to ask, but nothing is sold on the call.',
  },
  {
    q: 'Will it be recorded?',
    a: 'Yes — everyone who registers is sent the full recording afterwards, including the closing chakra meditation. So register even if you already know you can’t make it live.',
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
    q: 'Is this a meditation or a learning session?',
    a: 'Both. You’ll understand the concepts behind your mind and patterns, practise a basic NLP technique live, and then move into a guided chakra meditation.',
  },
  {
    q: 'What should I bring?',
    a: 'An open mind, a quiet space where possible, a notebook and pen — and one real-life pattern or situation you’re curious about.',
  },
  {
    q: 'What if I can’t make it live?',
    a: 'Register anyway. The recording goes to everyone on the list, and you’ll hear about the next live session first.',
  },
];

/** §8 — the Google Form. Button first, embed underneath, questions alongside. */
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
          <h3 className="d3">Yes, save my seat</h3>
          <RegisterButton size="lg" block>Save my free seat</RegisterButton>
          <p className="form-fine">Free · No card needed · Unsubscribe any time</p>

          {CAN_EMBED && <div className="form-or">or fill it in right here</div>}

          {CAN_EMBED ? (
            <iframe
              className="form-embed"
              src={EMBED_URL}
              title="Soul in Motion webinar registration"
              loading="lazy"
            >
              Loading…
            </iframe>
          ) : HAS_FORM ? null : (
            <div className="form-missing">
              <b>Registration form not connected yet.</b>
              <span>
                Add the Google Form share link as <code>NEXT_PUBLIC_REGISTER_URL</code> in{' '}
                <code>.env.local</code>. Every register button on the page then opens it and the
                form appears here.
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
