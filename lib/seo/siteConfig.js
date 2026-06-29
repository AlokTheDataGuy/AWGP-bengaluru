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
    en: 'All World Gayatri Pariwar (AWGP) Bengaluru — the Gayatri Chetna Kendra in Begur offering free meditation, Yagya, Pragya Yoga, Bal Sanskar Shala and Vedic workshops. A spiritual and community centre rooted in the teachings of Gurudev Shri Ram Sharma Acharya and Shantikunj Haridwar.',
    hi: 'अखिल विश्व गायत्री परिवार (AWGP) बेंगलूरु — बेगूर स्थित गायत्री चेतना केंद्र। नि:शुल्क ध्यान, यज्ञ, प्रज्ञायोग, बाल संस्कार शाला एवं वैदिक कार्यशालाएं। गुरुदेव श्रीराम शर्मा आचार्य एवं शांतिकुंज हरिद्वार की शिक्षाओं पर आधारित आध्यात्मिक एवं सामुदायिक केंद्र।',
    kn: 'ಅಖಿಲ ವಿಶ್ವ ಗಾಯತ್ರಿ ಪರಿವಾರ (AWGP) ಬೆಂಗಳೂರು — ಬೇಗೂರಿನ ಗಾಯತ್ರಿ ಚೇತನ ಕೇಂದ್ರ. ಉಚಿತ ಧ್ಯಾನ, ಯಜ್ಞ, ಪ್ರಜ್ಞಾಯೋಗ, ಬಾಲ ಸಂಸ್ಕಾರ ಶಾಲೆ ಮತ್ತು ವೈದಿಕ ಕಾರ್ಯಾಗಾರಗಳು. ಗುರುದೇವ ಶ್ರೀರಾಮ ಶರ್ಮಾ ಆಚಾರ್ಯ ಮತ್ತು ಶಾಂತಿಕುಂಜ ಹರಿದ್ವಾರದ ಬೋಧನೆಗಳ ಮೇಲೆ ಆಧಾರಿತ ಆಧ್ಯಾತ್ಮಿಕ ಮತ್ತು ಸಾಮುದಾಯಿಕ ಕೇಂದ್ರ.',
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
