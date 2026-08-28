'use client';

import Headline from '../Headline';
import { useState } from 'react';

const FAQS = [
  {
    q: 'What is this webinar about?',
    a: 'This is an experiential journey into how your mind, body, patterns and chakras influence the way you experience life. You’ll explore how awareness can help you question old patterns and create the possibility of a deeper identity shift.',
  },
  {
    q: 'Do I need to know anything about chakras or NLP?',
    a: 'Not at all. The webinar is designed for beginners as well as people who already have some experience with energy work, yoga or personal growth.',
  },
  {
    q: 'Is this a meditation or a learning session?',
    a: 'Both, but neither in the conventional sense. You’ll understand the concepts behind your mind and patterns, experience basics of NLP techniques, and then move into a guided chakra meditation to experience the ideas within yourself.',
  },
  {
    q: 'Will this help me with my relationships, health or money?',
    a: 'The webinar helps you explore the patterns, beliefs and ways of perceiving that may influence different areas of your life. It is not about promising to fix a specific problem, but about developing greater awareness of what may be creating your experience.',
  },
  {
    q: 'Will I actually be able to experience a shift during the webinar?',
    a: 'You may experience a shift in perspective, awareness or emotional state, but transformation isn’t something that can be guaranteed in a single session. The intention is to give you an experience and practical tools that you can continue exploring afterwards.',
  },
  {
    q: 'Is this therapy or medical treatment?',
    a: 'No. This is an educational and experiential self-awareness session, not a substitute for medical care, psychotherapy or professional treatment.',
  },
  {
    q: 'What should I bring to the session?',
    a: 'Come with an open mind, a quiet space where possible, and a notebook and pen. Most importantly, bring one real-life pattern or situation you’re curious about.',
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="sec band band-line" id="faq">
      <div className="wrap">
        <div className="sec-head sec-head--center reveal">
          <span className="kicker">Frequently asked questions</span>
          <Headline text="Before you join" mark={['join']} />
        </div>

        <div className="faq">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              /* the reveal lives on a wrapper so React never overwrites its class */
              <div className="reveal" key={item.q}>
                <div className={`faq-item${isOpen ? ' is-open' : ''}`}>
                  <button
                    className="faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="faq-n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="faq-t">{item.q}</span>
                    <span className="faq-pm" aria-hidden="true" />
                  </button>
                  <div className="faq-a">
                    <div>
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
