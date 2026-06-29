# AWGP Bengaluru — SEO System

This document explains the on-site SEO implementation: what was built, how to use
the reusable utilities, and the assumptions you must confirm before launch. It is
the index for the two companion docs:

- **[content-and-internal-linking-plan.md](./content-and-internal-linking-plan.md)** — the pillar + cluster topical-authority map and internal-linking plan.
- **[google-business-profile-checklist.md](./google-business-profile-checklist.md)** — the off-site checklist (Google Business Profile, citations, `sameAs`) that **cannot** be done in code.

---

## 1. What was implemented (on-site)

| Area | Where | Notes |
|------|-------|-------|
| Dynamic metadata | `generateMetadata` on every route via `buildMetadata()` | Unique title, description, canonical, hreflang (en/hi/kn + x-default), Open Graph, Twitter card |
| Title template | `app/layout.jsx` | `%s \| AWGP Bengaluru — Gayatri Pariwar Bangalore`; homepage uses an absolute title |
| Organization + NGO JSON-LD | `app/[locale]/layout.jsx` → `siteGraph()` | Founders, parent org (Shantikunj), `sameAs`, logo, contact point — site-wide |
| LocalBusiness / PlaceOfWorship JSON-LD | same `siteGraph()` | NAP, geo, opening hours, map — site-wide |
| WebSite JSON-LD | same `siteGraph()` | Publisher link, multilingual |
| BreadcrumbList JSON-LD | `<Breadcrumbs>` on inner pages | Invisible by default (design-safe); pass `visible` to also render a trail |
| Event JSON-LD | `/programs`, `/programs/festivals`, `/programs/[slug=festivals]` | Dates, `eventStatus`, venue, organizer, free `offers`, registration URL |
| FAQPage JSON-LD + visible FAQ | `<FaqSection>` on home, contact, meditation, yagya, sanskars | Native `<details>` — crawlable, accessible, lead-sentence answers |
| Article JSON-LD | `/blog/[slug]` | Headline, dates, author, publisher, image |
| sitemap.xml | `app/sitemap.js` | All routes × 3 locales with hreflang alternates (141 URLs) |
| robots.txt | `app/robots.js` | Allows all, blocks `/admin` + `/api`, points to sitemap |
| Manifest / icons | `app/layout.jsx`, `public/site.webmanifest` | PWA name, theme colour, icons |
| `<html lang>` | `app/layout.jsx` (static `en`) + `LangBodySync` (per-locale on client) | See assumption #3 |

### Reusable module — `lib/seo/`

```
lib/seo/
  siteConfig.js   ← single source of truth (NAP, URLs, geo, founders, social, locales)
  metadata.js     ← buildMetadata(), localeUrl(), languageAlternates(), pick()
  schema.js       ← organizationSchema, localBusinessSchema, websiteSchema, siteGraph,
                    breadcrumbSchema, eventSchema, faqSchema, articleSchema
  faqs.js         ← multilingual FAQ content + getFaqs(key, locale)
components/seo/
  JsonLd.jsx       ← renders <script type="application/ld+json">
  FaqSection.jsx   ← visible FAQ block + FAQPage JSON-LD
  Breadcrumbs.jsx  ← BreadcrumbList JSON-LD (+ optional visible trail)
```

> **Note on "typed code":** the codebase is JavaScript/JSX, not TypeScript. To stay
> consistent with the existing stack (and avoid a risky TS migration), the SEO module
> is plain JS annotated with **JSDoc `@typedef`/`@param`/`@returns`**, so editors get
> full IntelliSense and type-checking. The `Metadata` return type is imported from
> `next` via JSDoc. If the project later adopts TypeScript, these files convert with
> minimal change.

---

## 2. How to use it

### Add metadata to a new page

```jsx
import { buildMetadata } from '../../lib/seo/metadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/your-route',                 // locale-less; helper adds /{locale}
    title: { en: 'Short Title', hi: '…', kn: '…' },   // brand suffix auto-appended
    description: { en: '…', hi: '…', kn: '…' },        // omit → falls back to site description
    images: ['/assets/your-og-image.jpg'],            // omit → site default OG image
  });
}
```

- Pass `absoluteTitle: true` to skip the brand template (used only by the homepage).
- Pass `type: 'article'` + `openGraph: { publishedTime, authors, section }` for posts.
- Pass `noIndex: true` to emit `noindex,nofollow` (e.g. thank-you pages).

### Add a breadcrumb (recommended on every inner page)

```jsx
import Breadcrumbs from '../../components/seo/Breadcrumbs';

<Breadcrumbs
  locale={locale}
  items={[
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Yagya Events', path: '/programs/yagya-events' },
  ]}
/>
```

### Add a FAQ block (great for AI overviews + voice)

1. Add a set to `FAQ_CONTENT` in `lib/seo/faqs.js` (en/hi/kn, lead-sentence answers).
2. Render it:

```jsx
import FaqSection from '../../components/seo/FaqSection';
import { getFaqs } from '../../lib/seo/faqs';

<FaqSection items={getFaqs('yourKey', locale)} heading="Frequently Asked Questions" id="x-faq" />
```

### Add Event structured data

```jsx
import JsonLd from '../../components/seo/JsonLd';
import { eventSchema } from '../../lib/seo/schema';

<JsonLd data={eventSchema({
  name: 'Guru Purnima',
  startDate: '2026-07-29',
  description: '…',
  url: localeUrl(locale, '/programs/festivals'),
  registrationUrl: localeUrl(locale, '/contact'),
})} />
```

---

## 3. Assumptions to confirm before launch ⚠️

These were inferred from the existing site. **Verify each — they affect ranking.**

1. **Canonical origin = `https://www.awgpblr.org`.**
   Set in `lib/seo/siteConfig.js` (`SITE_URL`), overridable with the
   `NEXT_PUBLIC_SITE_URL` env var. Whatever you choose (www vs non-www) **must match**:
   the live deployment, a 301 redirect from the other variant, Google Search Console,
   and the Google Business Profile website field. Mismatches split ranking signals.

2. **Geo-coordinates are approximate** (`12.8835, 77.6219`, read off the embedded map).
   Replace with the **exact** lat/lng of the Google Business Profile pin in
   `siteConfig.geo` — local ranking and "directions" depend on it.

3. **`<html lang>` is statically `en`**, then corrected to the active locale on the
   client by `LangBodySync`. This is a deliberate trade-off: the root layout
   (`app/layout.jsx`) also wraps the non-localized `/admin` tree, so it can't read the
   locale param. International targeting is driven by the **hreflang alternates** in
   metadata + sitemap (the authoritative signal), so this is sufficient. If you ever
   move `/admin` under `[locale]` (or behind a route group), promote `<html lang={locale}>`
   into `app/[locale]/layout.jsx` for a fully server-rendered lang attribute.

4. **NAP** (name/address/phone) is taken from the Contact page and Footer. It is now
   centralised in `siteConfig.nap`. Keep it **byte-for-byte identical** to every
   off-site citation (see the GBP checklist).

5. **Google Search Console verification token** is read from
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. Paste the token there (or in `siteConfig`)
   once you claim the property; until then the verification meta tag is omitted.

6. **OG share image** defaults to `/assets/homepage/hero/hero.png`. For best results,
   add a purpose-built 1200×630 image and point `siteConfig.ogImage` at it.

---

## 4. Validate after deploy

- **Rich Results Test** — https://search.google.com/test/rich-results — run the home
  page (Organization + LocalBusiness), a `/programs` page (Event), a `/blog/*` page
  (Article), and any FAQ page (FAQPage).
- **Schema Markup Validator** — https://validator.schema.org/
- `https://your-domain/sitemap.xml` and `/robots.txt` resolve and list the right host.
- Submit the sitemap in Google Search Console; set the international targeting.
- **Lighthouse / PageSpeed Insights** for Core Web Vitals (images already use
  `next/image` with lazy-loading + `sizes`).
