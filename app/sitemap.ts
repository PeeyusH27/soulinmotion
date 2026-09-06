import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * A single-page site has a single URL. It is still worth serving: it gives
 * Search Console something to verify coverage against, and it states the
 * canonical host explicitly.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
