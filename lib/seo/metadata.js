/**
 * Reusable metadata builder for Next.js App Router `generateMetadata`.
 *
 * Produces a fully-formed `Metadata` object with canonical URL, hreflang
 * alternates (en/hi/kn + x-default), Open Graph and Twitter cards — derived
 * from a single call. Pages stay declarative:
 *
 *   export async function generateMetadata({ params }) {
 *     const { locale } = await params;
 *     return buildMetadata({
 *       locale,
 *       path: '/about',
 *       title: { en: 'About Us', hi: '…', kn: '…' },
 *       description: { en: '…', hi: '…', kn: '…' },
 *     });
 *   }
 *
 * @typedef {import('next').Metadata} Metadata
 * @typedef {{ en: string, hi?: string, kn?: string }} Localized
 */

import { SITE_URL, HREFLANG, LOCALES, DEFAULT_LOCALE, siteConfig } from './siteConfig';

/**
 * Resolve a localized value (or pass through a plain string).
 * @param {Localized | string | undefined} value
 * @param {string} locale
 * @returns {string}
 */
export function pick(value, locale) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return value[locale] ?? value[DEFAULT_LOCALE] ?? '';
}

/**
 * Build a locale-prefixed, site-absolute URL.
 * @param {string} locale
 * @param {string} [path] route path without locale prefix, e.g. '/about'
 * @returns {string}
 */
export function localeUrl(locale, path = '') {
  const clean = path === '/' ? '' : path.replace(/^\/+|\/+$/g, '');
  return `${SITE_URL}/${locale}${clean ? `/${clean}` : ''}`;
}

/**
 * hreflang alternates map for a given path across every locale, plus the
 * x-default pointing at the default locale.
 * @param {string} path
 * @returns {Record<string, string>}
 */
export function languageAlternates(path = '') {
  /** @type {Record<string, string>} */
  const languages = {};
  for (const loc of LOCALES) {
    languages[HREFLANG[loc] || loc] = localeUrl(loc, path);
  }
  languages['x-default'] = localeUrl(DEFAULT_LOCALE, path);
  return languages;
}

/** Open Graph locale codes. */
const OG_LOCALE = { en: 'en_IN', hi: 'hi_IN', kn: 'kn_IN' };

/**
 * Apply the brand title template to a bare page title — used for Open Graph /
 * Twitter titles, which (unlike the document <title>) are NOT auto-templated
 * by Next.js. Keeps social cards consistently branded.
 * @param {string | undefined} title
 * @param {boolean} absolute
 */
function templatedTitle(title, absolute) {
  if (!title) return siteConfig.defaultTitle;
  if (absolute) return title;
  return siteConfig.titleTemplate.replace('%s', title);
}

/**
 * @param {object} opts
 * @param {string} opts.locale
 * @param {string} [opts.path] route path without locale prefix (default '/')
 * @param {Localized | string} [opts.title] page title (template suffix is added by the root layout)
 * @param {Localized | string} [opts.description]
 * @param {Array<{ url: string, width?: number, height?: number, alt?: string }> | string[]} [opts.images]
 * @param {'website' | 'article' | 'profile'} [opts.type]
 * @param {boolean} [opts.noIndex] emit a noindex,nofollow robots directive
 * @param {boolean} [opts.absoluteTitle] use the title as-is (skip the brand template) — for the homepage
 * @param {string | string[]} [opts.keywords]
 * @param {object} [opts.openGraph] extra Open Graph fields (e.g. article:publishedTime) merged in
 * @returns {Metadata}
 */
export function buildMetadata({
  locale = DEFAULT_LOCALE,
  path = '/',
  title,
  description,
  images,
  type = 'website',
  noIndex = false,
  absoluteTitle = false,
  keywords,
  openGraph: extraOg,
} = {}) {
  const resolvedTitle = title ? pick(title, locale) : undefined;
  const resolvedDesc = description
    ? pick(description, locale)
    : pick(siteConfig.description, locale);
  const canonical = localeUrl(locale, path);
  const socialTitle = templatedTitle(resolvedTitle, absoluteTitle);

  const ogImages = normalizeImages(images);

  /** @type {Metadata} */
  const meta = {
    title: resolvedTitle ? (absoluteTitle ? { absolute: resolvedTitle } : resolvedTitle) : undefined,
    description: resolvedDesc,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      type,
      siteName: siteConfig.name,
      locale: OG_LOCALE[locale] || 'en_IN',
      url: canonical,
      title: socialTitle,
      description: resolvedDesc,
      images: ogImages,
      ...extraOg,
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: resolvedDesc,
      images: ogImages.map((i) => i.url),
    },
  };

  if (keywords) meta.keywords = keywords;
  if (noIndex) meta.robots = { index: false, follow: false };

  return meta;
}

/**
 * Normalise an images arg into Open Graph image objects, defaulting to the
 * site share image. Relative paths are kept relative — `metadataBase`
 * (set in the root layout) resolves them to absolute URLs.
 * @param {Array<{ url: string, width?: number, height?: number, alt?: string }> | string[] | undefined} images
 */
function normalizeImages(images) {
  if (!images || images.length === 0) {
    return [
      {
        url: siteConfig.ogImage,
        width: siteConfig.ogImageWidth,
        height: siteConfig.ogImageHeight,
        alt: siteConfig.name,
      },
    ];
  }
  return images.map((img) =>
    typeof img === 'string'
      ? { url: img, width: siteConfig.ogImageWidth, height: siteConfig.ogImageHeight, alt: siteConfig.name }
      : img
  );
}

export default buildMetadata;
