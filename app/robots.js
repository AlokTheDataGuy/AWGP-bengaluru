/**
 * robots.txt — allows all public content, blocks admin/API surfaces, and points
 * crawlers (including AI answer engines) at the sitemap.
 *
 * @returns {import('next').MetadataRoute.Robots}
 */
import { SITE_URL } from '../lib/seo/siteConfig';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
