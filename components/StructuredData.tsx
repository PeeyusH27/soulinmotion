import { END_AT, EVENT, HAS_START, START_AT } from '@/lib/event';
import { HOST_NAME, HOST_ROLE, OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site';

const abs = (path: string) => new URL(path, SITE_URL).toString();

const DESCRIPTION =
  'A free 90-minute live session with Shradha Saha on the patterns underneath your life — the same argument, the same job, the same 3 a.m. spiral — and the chakra and NLP work that interrupts them.';

/**
 * The Event, the Person behind it and the WebSite, as one @graph so the three
 * can reference each other by @id instead of repeating themselves.
 *
 * The Event node is the one that earns a rich result — Google shows date, time
 * and "Free" straight in the listing for an eligible `Event`. Every field it
 * needs already exists in lib/event.ts, so nothing here is asserted twice: if
 * the date moves, this moves with it.
 */
export default function StructuredData() {
  const eventId = `${SITE_URL}/#event`;
  const personId = `${SITE_URL}/#host`;

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: HOST_NAME,
    jobTitle: HOST_ROLE,
    image: abs('/brand/host.jpg'),
    url: SITE_URL,
    knowsAbout: ['Energy work', 'NLP', 'Chakra healing', 'Breathwork', 'Conscious living'],
  };

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      inLanguage: 'en-IN',
      publisher: { '@id': personId },
    },
    person,
  ];

  /* An Event without a startDate is invalid structured data — Google drops the
     whole node. While the date is still blank the page ships the site and host
     graph only, rather than an Event that would fail validation. */
  if (HAS_START && START_AT) {
    graph.push({
      '@type': 'Event',
      '@id': eventId,
      name: 'Soul in Motion — the patterns running your life',
      description: DESCRIPTION,
      startDate: START_AT.toISOString(),
      ...(END_AT ? { endDate: END_AT.toISOString() } : {}),
      eventStatus: 'https://schema.org/EventScheduled',
      /* Zoom — so this is an online event, and `location` must be a
         VirtualLocation. Marking it a Place is the single most common way an
         online-event rich result gets rejected. */
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      location: {
        '@type': 'VirtualLocation',
        name: EVENT.where,
        url: SITE_URL,
      },
      image: [abs(OG_IMAGE.url)],
      inLanguage: 'en-IN',
      performer: { '@id': personId },
      organizer: { '@id': personId },
      offers: {
        '@type': 'Offer',
        price: EVENT.isFree ? '0' : undefined,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: SITE_URL,
        category: EVENT.isFree ? 'Free' : undefined,
        validFrom: new Date().toISOString(),
      },
      ...(EVENT.seats > 0 ? { maximumAttendeeCapacity: EVENT.seats } : {}),
    });
  }

  const json = { '@context': 'https://schema.org', '@graph': graph };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is not HTML — the only sequence that can break out
      // of a script element is "</", so that is the only one escaped.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, '\\u003c') }}
    />
  );
}
