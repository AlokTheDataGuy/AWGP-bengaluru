/**
 * Central SEO / entity configuration — the single source of truth for the
 * organisation's name, address, phone (NAP), geo-coordinates, social profiles,
 * founders and parent organisation.
 *
 * Everything SEO-related (metadata, JSON-LD, sitemap, robots, the off-site
 * checklist) reads from this file. Update facts here once and they propagate
 * everywhere.
 *
 * ASSUMPTIONS (verify before launch — see docs/seo/README.md):
 *  - Canonical origin is https://www.awgpblr.org. Override with the
 *    NEXT_PUBLIC_SITE_URL env var. Whatever you pick MUST match Search Console,
 *    the Google Business Profile website field, and your 301 redirect (www vs
 *    non-www, http→https) or canonical signals will conflict.
 *  - Geo-coordinates are approximate (derived from the embedded map). Replace
 *    with the exact lat/lng from the Google Business Profile pin for best local
 *    ranking.
 *
 * @typedef {{ en: string, hi?: string, kn?: string }} Localized
 */

/** Supported locales, in priority order. Mirrors lib/i18n/routing.js. */
export const LOCALES = /** @type {const} */ (['en', 'hi', 'kn']);
export const DEFAULT_LOCALE = 'en';

/** BCP-47 language tags used for hreflang alternates. */
export const HREFLANG = {
  en: 'en-IN',
  hi: 'hi-IN',
  kn: 'kn-IN',
};

/**
 * Canonical origin, no trailing slash. Env override lets staging/preview
 * builds use a different host without code changes.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.awgpblr.org'
).replace(/\/$/, '');

export const siteConfig = {
  /** Public-facing brand name + the entity aliases we want to rank for. */
  name: 'AWGP Bengaluru',
  legalName: 'All World Gayatri Pariwar — Bengaluru',
  alternateNames: [
    'All World Gayatri Pariwar Bangalore',
    'All World Gayatri Pariwar Bengaluru',
    'Gayatri Pariwar Bangalore',
    'Gayatri Pariwar Bengaluru',
    'Gayatri Chetna Kendra Bengaluru',
    'AWGP Bangalore',
    'Akhil Vishwa Gayatri Pariwar Bengaluru',
  ],
  /** Title template suffix — keeps every page tied to the core keywords. */
  titleTemplate: '%s | AWGP Bengaluru — Gayatri Pariwar Bangalore',
  defaultTitle: 'AWGP Bengaluru — Gayatri Pariwar Bangalore | Gayatri Chetna Kendra',
  tagline: 'Hum Badlenge — Yug Badlega · We change, the era changes',

  description: {
    en: 'AWGP Bengaluru is a branch of All World Gayatri Pariwar, Shantikunj-Haridwar, Uttarakhand. Based in Begur, it offers sanskars, yagya, yoga, dhyan, lectures and workshops, along with community activities like tree plantation, book exhibitions, food & cloth distribution and health camps.',
    hi: 'AWGP बेंगलूरु — अखिल विश्व गायत्री परिवार, शांतिकुंज-हरिद्वार, उत्तराखंड की शाखा। बेगूर स्थित यह केंद्र संस्कार, यज्ञ, योग, ध्यान, प्रवचन एवं कार्यशालाओं के साथ वृक्षारोपण, पुस्तक प्रदर्शनी, अन्न एवं वस्त्र वितरण और स्वास्थ्य शिविर जैसी सामुदायिक गतिविधियां आयोजित करता है।',
    kn: 'AWGP ಬೆಂಗಳೂರು — ಅಖಿಲ ವಿಶ್ವ ಗಾಯತ್ರಿ ಪರಿವಾರ, ಶಾಂತಿಕುಂಜ-ಹರಿದ್ವಾರ, ಉತ್ತರಾಖಂಡದ ಶಾಖೆ. ಬೇಗೂರಿನಲ್ಲಿರುವ ಈ ಕೇಂದ್ರವು ಸಂಸ್ಕಾರ, ಯಜ್ಞ, ಯೋಗ, ಧ್ಯಾನ, ಪ್ರವಚನ ಮತ್ತು ಕಾರ್ಯಾಗಾರಗಳ ಜೊತೆಗೆ ವೃಕ್ಷಾರೋಪಣ, ಪುಸ್ತಕ ಪ್ರದರ್ಶನ, ಆಹಾರ ಮತ್ತು ವಸ್ತ್ರ ವಿತರಣೆ ಹಾಗೂ ಆರೋಗ್ಯ ಶಿಬಿರಗಳಂತಹ ಸಮುದಾಯ ಚಟುವಟಿಕೆಗಳನ್ನು ನಡೆಸುತ್ತದೆ.',
  },

  /** Name, Address, Phone — keep IDENTICAL to every off-site citation. */
  nap: {
    streetAddress: '37, Lakshmi Layout Main Road, Chikka Begur, Begur',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560114',
    addressCountry: 'IN',
    phone: '+91 92437 55613',
    phoneE164: '+919243755613',
    email: 'connect@awgpblr.org',
    whatsapp: '+919243755613',
  },

  /** Approximate — replace with the exact Google Business Profile pin. */
  geo: { latitude: 12.8835, longitude: 77.6219 },

  /** Daily 05:30–21:30 (from the Contact page). */
  openingHours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '05:30',
      closes: '21:30',
    },
  ],

  /** Logo + default social-share image (1200×630 recommended). */
  logo: '/assets/logos/final_logo_light.png',
  ogImage: '/assets/homepage/hero/hero.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,

  /** Authoritative external profiles → `sameAs` for entity disambiguation. */
  sameAs: [
    'https://www.facebook.com/gayatripariwarbangalore',
    'https://www.instagram.com/awgp.bengaluru/',
    'https://www.youtube.com/@AWGPBengaluru',
  ],

  /** Parent / national body — links the local entity to the global AWGP. */
  parentOrganization: {
    name: 'All World Gayatri Pariwar (Shantikunj, Haridwar)',
    url: 'https://www.awgp.org',
  },

  /** Founders — surfaced in Organization JSON-LD for entity recognition. */
  founders: [
    {
      name: 'Pandit Shriram Sharma Acharya',
      alternateName: 'Gurudev Shri Ram Sharma Acharya',
      url: 'https://www.awgp.org/about_us/gurusatta/pandit_shriram_sharma',
      sameAs: 'https://en.wikipedia.org/wiki/Shriram_Sharma_Acharya',
    },
    {
      name: 'Mata Bhagwati Devi Sharma',
      alternateName: 'Vandaniya Mata Bhagwati Devi',
      url: 'https://www.awgp.org/about_us/gurusatta/vandiniya_mata',
      sameAs: 'https://en.wikipedia.org/wiki/Bhagwati_Devi_Sharma',
    },
  ],

  foundingDate: '1958',

  /** Google Search Console verification token — paste when available. */
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
};

export default siteConfig;
