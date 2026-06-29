/**
 * Dynamic sitemap — every public route across every locale, with hreflang
 * alternates so Google indexes the en/hi/kn variants as one international page.
 *
 * Admin and API routes are intentionally excluded (also blocked in robots.js).
 *
 * @returns {import('next').MetadataRoute.Sitemap}
 */
import { SITE_URL, LOCALES, HREFLANG, DEFAULT_LOCALE } from '../lib/seo/siteConfig';
import programTypes from '../data/program-types.json';
import activities from '../data/activities.json';
import blog from '../data/blog.json';
import sanskars from '../data-json-files/sanskars/sanskars.json';

/** Static, hand-maintained routes (locale-less). */
const STATIC_PATHS = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/initiatives', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/chetna-kendra', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/sadhana', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/swadhyay', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/sanyam', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/seva', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/sanskars', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/activities', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/programs', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/programs/festivals', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/literature', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/media/gallery', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/media/news', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'yearly' },
];

function dynamicPaths() {
  const paths = [];
  for (const p of programTypes) {
    paths.push({ path: `/programs/${p.slug}`, priority: 0.6, changeFrequency: 'monthly' });
  }
  for (const a of activities) {
    paths.push({ path: `/activities/${a.slug}`, priority: 0.6, changeFrequency: 'monthly' });
  }
  for (const s of sanskars.sanskars) {
    paths.push({ path: `/sanskars/${s.id}`, priority: 0.6, changeFrequency: 'yearly' });
  }
  for (const b of blog) {
    paths.push({
      path: `/blog/${b.slug}`,
      priority: 0.5,
      changeFrequency: 'yearly',
      lastModified: b.date,
    });
  }
  return paths;
}

function url(locale, path) {
  const clean = path === '/' ? '' : path.replace(/^\/+|\/+$/g, '');
  return `${SITE_URL}/${locale}${clean ? `/${clean}` : ''}`;
}

export default function sitemap() {
  const all = [...STATIC_PATHS, ...dynamicPaths()];
  const entries = [];

  for (const { path, priority, changeFrequency, lastModified } of all) {
    /** @type {Record<string,string>} */
    const languages = {};
    for (const loc of LOCALES) languages[HREFLANG[loc] || loc] = url(loc, path);
    languages['x-default'] = url(DEFAULT_LOCALE, path);

    for (const loc of LOCALES) {
      entries.push({
        url: url(loc, path),
        lastModified: lastModified ? new Date(lastModified) : new Date(),
        changeFrequency,
        priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}
