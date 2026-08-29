'use client';

import { useState } from 'react';
import Headline from '../Headline';
import Badge, { EventBadges } from '../Badge';
import RegisterButton from '../RegisterButton';
import { EMBED_URL, HAS_FORM } from '@/lib/register';

const FAQS = [
  {
    q: 'What is this webinar about?',
    a: 'An experiential journey into how your mind, body, patterns and chakras shape the way you experience life — and how awareness lets you question old patterns and create a deeper identity shift.',
  },
  {
    q: 'Do I need to know anything about chakras or NLP?',
    a: 'Not at all. The webinar is designed for beginners as well as people who already have some experience with energy work, yoga or personal growth.',
  },
  {
    q: 'Is this a meditation or a learning session?',
    a: 'Both. You’ll understand the concepts behind your mind and patterns, experience basic NLP techniques, and then move into a guided chakra meditation.',
  },
  {
    q: 'What if I can’t make the date?',
    a: 'Register anyway. You’ll be the first to hear when the date is announced and about the next session.',
  },
  {
    q: 'What should I bring?',
    a: 'An open mind, a quiet space where possible, a notebook and pen — and one real-life pattern or situation you’re curious about.',
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
            <span className="kicker">Reserve your spot</span>
            <Headline text="Register in under a minute" mark={['under', 'a', 'minute']} />
            <p className="lead">
              Fill in the short Google Form and the Zoom link arrives by email before the session.
            </p>
          </div>

          <div className="badges reveal" data-delay="1">
            <EventBadges />
            <Badge kind="seats">Limited seats only</Badge>
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
          <RegisterButton size="lg" block>Register on Google Form</RegisterButton>
          <p className="form-fine">Opens in a new tab · about 60 seconds</p>

          <div className="form-or">or fill it in right here</div>

          {HAS_FORM ? (
            <iframe
              className="form-embed"
              src={EMBED_URL}
              title="Soul in Motion webinar registration"
              loading="lazy"
            >
              Loading…
            </iframe>
          ) : (
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
