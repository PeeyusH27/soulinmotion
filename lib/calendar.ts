import { END_AT, EVENT, START_AT } from './event';

/** 2026-09-06T05:30:00Z → 20260906T053000Z, the only shape both formats accept */
function stamp(d: Date) {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

const TITLE = 'Soul in Motion — the patterns running your life';
const DETAILS =
  'A free 90-minute live session with Shradha Saha on the patterns underneath your life, and the chakra and NLP work that interrupts them. The Zoom link is in your email.';

/**
 * A Google Calendar URL and a self-contained .ics data URL for the session.
 * Returns null when `EVENT.startISO` is blank — the success screen then simply
 * omits the calendar row rather than offering an invite to an unknown time.
 */
export function calendarLinks() {
  if (!START_AT || !END_AT) return null;

  const dates = `${stamp(START_AT)}/${stamp(END_AT)}`;
  const google =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    `&text=${encodeURIComponent(TITLE)}` +
    `&dates=${dates}` +
    `&details=${encodeURIComponent(DETAILS)}` +
    `&location=${encodeURIComponent(EVENT.where)}`;

  // CRLF line endings are not optional in RFC 5545 — Outlook rejects LF-only files
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Soul in Motion//Webinar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:soul-in-motion-${stamp(START_AT)}@soulinmotion`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(START_AT)}`,
    `DTEND:${stamp(END_AT)}`,
    `SUMMARY:${TITLE}`,
    `DESCRIPTION:${DETAILS}`,
    `LOCATION:${EVENT.where}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Soul in Motion starts in 30 minutes',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return { google, ics: `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}` };
}
