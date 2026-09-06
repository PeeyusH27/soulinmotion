import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * One page, all of it public, so the only real work here is pointing crawlers
 * at the sitemap and keeping the Next internals out of the index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
