/**
 * Everything the crawlers and the share sheets need to know about where this
 * site lives. `SITE_URL` is the one value the rest of the SEO layer is built
 * from — the canonical link, the sitemap, the OG image URL and the Event
 * JSON-LD all resolve against it, so a domain change is a one-line change.
 *
 * It is deliberately not a `NEXT_PUBLIC_` variable. A preview deployment that
 * quietly canonicalises itself to its own vercel.app host is how duplicate
 * copies of a landing page end up in the index; hard-coding the production
 * origin means every deployment points search engines at the real one.
 */
export const SITE_URL = 'https://www.soulinmotion.co.in';

/** The brand as it should read in a share card and in the schema graph. */
export const SITE_NAME = 'Soul in Motion';

/** Who runs the session. Used for the Event's performer and organizer. */
export const HOST_NAME = 'Shradha Saha';
export const HOST_ROLE = 'Flow & Movement Coach';

/**
 * The share card. 1200×630 is the size both Facebook and X crop cleanest to,
 * and WhatsApp — which is where most of this page's traffic is actually passed
 * around — reads the same tag.
 */
export const OG_IMAGE = {
  url: '/og.jpg',
  width: 1200,
  height: 630,
  alt: 'Soul in Motion — a free 90-minute live session with Shradha Saha on the patterns running your life.',
};
