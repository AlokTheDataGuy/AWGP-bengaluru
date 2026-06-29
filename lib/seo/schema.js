/**
 * JSON-LD (schema.org) builders. Each function returns a plain object ready to
 * be serialised inside a <script type="application/ld+json"> tag via the
 * <JsonLd> component (components/seo/JsonLd.jsx).
 *
 * Validated against Google's Rich Results expectations for Organization,
 * LocalBusiness, Event, FAQPage, BreadcrumbList and Article.
 *
 * Stable @id values let nodes cross-reference each other (e.g. an Event's
 * organizer points at the Organization @id) so search engines resolve a single
 * connected entity graph rather than disconnected snippets.
 *
 * @typedef {import('./metadata').Localized} Localized
 */

import { SITE_URL, siteConfig } from './siteConfig';
import { localeUrl, pick } from './metadata';

/** Stable node identifiers. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const PLACE_ID = `${SITE_URL}/#localbusiness`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Absolute URL for an asset/path. */
function abs(path) {
  if (!path) return undefined;
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

function postalAddress() {
  const { nap } = siteConfig;
  return {
    '@type': 'PostalAddress',
    streetAddress: nap.streetAddress,
    addressLocality: nap.addressLocality,
    addressRegion: nap.addressRegion,
    postalCode: nap.postalCode,
    addressCountry: nap.addressCountry,
  };
}

function openingHoursSpecification() {
  return siteConfig.openingHours.map((slot) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: slot.days,
    opens: slot.opens,
    closes: slot.closes,
  }));
}

/**
 * Organization / NGO node — founders, parent org, sameAs, logo, contact point.
 * @param {string} [locale]
 */
export function organizationSchema(locale = 'en') {
  return {
    '@type': ['NGO', 'Organization'],
    '@id': ORG_ID,
    name: siteConfig.legalName,
    alternateName: siteConfig.alternateNames,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: abs(siteConfig.logo),
    },
    image: abs(siteConfig.ogImage),
    description: pick(siteConfig.description, locale),
    foundingDate: siteConfig.foundingDate,
    slogan: siteConfig.tagline,
    founder: siteConfig.founders.map((f) => ({
      '@type': 'Person',
      name: f.name,
      alternateName: f.alternateName,
      url: f.url,
      sameAs: f.sameAs,
    })),
    parentOrganization: {
      '@type': 'Organization',
      name: siteConfig.parentOrganization.name,
      url: siteConfig.parentOrganization.url,
    },
    address: postalAddress(),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.nap.phoneE164,
      email: siteConfig.nap.email,
      contactType: 'customer service',
      areaServed: 'Bengaluru, Karnataka, India',
      availableLanguage: ['English', 'Hindi', 'Kannada'],
    },
    sameAs: siteConfig.sameAs,
  };
}

/**
 * LocalBusiness / Place node — NAP, geo, opening hours, map. Drives local pack
 * and "near me" discovery.
 * @param {string} [locale]
 */
export function localBusinessSchema(locale = 'en') {
  const { geo, nap } = siteConfig;
  const mapQuery = encodeURIComponent(
    `${nap.streetAddress}, ${nap.addressLocality}, ${nap.addressRegion} ${nap.postalCode}`
  );
  return {
    '@type': ['LocalBusiness', 'PlaceOfWorship'],
    '@id': PLACE_ID,
    name: siteConfig.name,
    alternateName: siteConfig.alternateNames,
    url: SITE_URL,
    image: abs(siteConfig.ogImage),
    logo: abs(siteConfig.logo),
    description: pick(siteConfig.description, locale),
    telephone: siteConfig.nap.phoneE164,
    email: siteConfig.nap.email,
    priceRange: 'Free',
    currenciesAccepted: 'INR',
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
    openingHoursSpecification: openingHoursSpecification(),
    parentOrganization: { '@id': ORG_ID },
    sameAs: siteConfig.sameAs,
    areaServed: {
      '@type': 'City',
      name: 'Bengaluru',
    },
  };
}

/**
 * WebSite node — enables sitelinks and ties pages to the publisher entity.
 */
export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: siteConfig.name,
    inLanguage: ['en-IN', 'hi-IN', 'kn-IN'],
    publisher: { '@id': ORG_ID },
  };
}

/**
 * The site-wide entity graph rendered once in the locale layout: Organization,
 * LocalBusiness/Place and WebSite, cross-referenced by @id.
 * @param {string} [locale]
 */
export function siteGraph(locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema(locale), localBusinessSchema(locale), websiteSchema()],
  };
}

/**
 * BreadcrumbList — emit on every inner page for breadcrumb rich results.
 * @param {Array<{ name: string, path: string }>} items ordered root→current; path is locale-less
 * @param {string} locale
 */
export function breadcrumbSchema(items, locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: localeUrl(locale, item.path),
    })),
  };
}

/**
 * FAQPage — for pages carrying a visible FAQ block.
 * @param {Array<{ question: string, answer: string }>} faqs
 */
export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/**
 * Event — for festival / Yagya / program pages with a date.
 * @param {object} e
 * @param {string} e.name
 * @param {string} e.startDate ISO date (YYYY-MM-DD or full ISO)
 * @param {string} [e.endDate]
 * @param {string} [e.description]
 * @param {string} [e.image] path or URL
 * @param {string} [e.url] canonical event/program URL
 * @param {string} [e.locationName]
 * @param {'Scheduled' | 'Cancelled' | 'Postponed' | 'Rescheduled'} [e.status]
 * @param {string} [e.registrationUrl]
 */
export function eventSchema(e) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: e.name,
    startDate: e.startDate,
    eventStatus: `https://schema.org/Event${e.status || 'Scheduled'}`,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    description: e.description,
    image: e.image ? abs(e.image) : abs(siteConfig.ogImage),
    url: e.url,
    location: {
      '@type': 'Place',
      name: e.locationName || siteConfig.name,
      address: postalAddress(),
      geo: {
        '@type': 'GeoCoordinates',
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: siteConfig.legalName,
      url: SITE_URL,
      '@id': ORG_ID,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: e.registrationUrl || e.url,
      validFrom: e.startDate,
    },
    isAccessibleForFree: true,
  };
  if (e.endDate) schema.endDate = e.endDate;
  return schema;
}

/**
 * Article — for blog posts.
 * @param {object} a
 * @param {string} a.headline
 * @param {string} [a.description]
 * @param {string} [a.image]
 * @param {string} [a.datePublished]
 * @param {string} [a.dateModified]
 * @param {string} [a.authorName]
 * @param {string} [a.url]
 * @param {string} [a.section]
 */
export function articleSchema(a) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.headline,
    description: a.description,
    image: a.image ? abs(a.image) : abs(siteConfig.ogImage),
    datePublished: a.datePublished,
    dateModified: a.dateModified || a.datePublished,
    articleSection: a.section,
    inLanguage: 'en-IN',
    mainEntityOfPage: { '@type': 'WebPage', '@id': a.url },
    author: {
      '@type': a.authorName === siteConfig.name ? 'Organization' : 'Organization',
      name: a.authorName || siteConfig.legalName,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.legalName,
      '@id': ORG_ID,
      logo: { '@type': 'ImageObject', url: abs(siteConfig.logo) },
    },
  };
}

export default siteGraph;
