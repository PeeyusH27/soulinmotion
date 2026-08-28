'use client';

import Headline from '../Headline';
import Script from 'next/script';
import { CalendarIcon, ChatIcon, ClockIcon, GlobeIcon, MailIcon, SeatIcon } from '../Icons';

/* Set NEXT_PUBLIC_CALENDLY_URL to the event's scheduling link. Until it is
   set, the panel says so rather than rendering an empty widget. */
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

const THEME = new URLSearchParams({
  hide_gdpr_banner: '1',
  background_color: 'FFFDF9',
  text_color: '262E20',
  primary_color: 'B96F4F',
}).toString();

/* Replace with the real handles before launch. */
const CONTACT = [
  { Icon: MailIcon, k: 'Email', v: 'add your email address' },
  { Icon: ChatIcon, k: 'WhatsApp', v: 'add your WhatsApp number' },
  { Icon: GlobeIcon, k: 'Instagram', v: 'add your handle' },
];

const DETAILS = [
  { Icon: CalendarIcon, k: 'Date', v: 'Coming soon' },
  { Icon: ClockIcon, k: 'Duration', v: '90 minutes' },
  { Icon: GlobeIcon, k: 'Where', v: 'Live on Zoom' },
  { Icon: SeatIcon, k: 'Seats', v: 'Limited seats only' },
];

export default function Booking() {
  return (
    <section className="sec" id="booking">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="kicker">Reserve your spot</span>
          <Headline text="Pick a slot and join us live" mark={['live']} />
        </div>

        <div className="booking" style={{ marginTop: 'clamp(30px, 4vw, 48px)' }}>
          <aside className="booking-aside reveal">
            <span className="kicker kicker--sage">The details</span>
            <ul className="contact-list">
              {DETAILS.map(({ Icon, k, v }) => (
                <li key={k}>
                  <Icon />
                  <span>
                    <span className="contact-k">{k}</span>
                    <br />
                    <span className="contact-v">{v}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 30 }}>
              <span className="kicker">Questions before you join?</span>
              <ul className="contact-list">
                {CONTACT.map(({ Icon, k, v }) => (
                  <li key={k}>
                    <Icon />
                    <span>
                      <span className="contact-k">{k}</span>
                      <br />
                      <span className="contact-v mute">{v}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="calendly-frame reveal" data-delay="1">
            {CALENDLY_URL ? (
              <>
                <div
                  className="calendly-inline-widget"
                  data-url={`${CALENDLY_URL}?${THEME}`}
                  style={{ minWidth: 320, height: 680 }}
                />
                <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
              </>
            ) : (
              <div className="calendly-fallback">
                <CalendarIcon />
                <h3 className="d3">Slot booking opens here</h3>
                <p className="body-sm mute" style={{ maxWidth: '48ch' }}>
                  Add your Calendly scheduling link as <code>NEXT_PUBLIC_CALENDLY_URL</code> in{' '}
                  <code>.env.local</code> and the live booking calendar replaces this panel.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
