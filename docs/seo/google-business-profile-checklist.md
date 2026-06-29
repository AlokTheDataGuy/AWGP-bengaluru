# Off-Site Checklist — Google Business Profile, Citations & `sameAs`

> **This work is OFF-SITE and cannot be done in code.** It is the other half of local
> SEO and AI visibility. The website provides the on-page signals (NAP, LocalBusiness
> JSON-LD, content); the items below provide the *external* corroboration Google and AI
> engines need to trust and rank the entity. Nothing here was — or could be —
> implemented in the repository.

**Canonical facts to use everywhere (must be byte-for-byte identical — this is the NAP):**

```
Name:     All World Gayatri Pariwar — Bengaluru (Gayatri Chetna Kendra)
Address:  37, Lakshmi Layout Main Road, Chikka Begur, Begur, Bengaluru, Karnataka 560114
Phone:    +91 92437 55613
Email:    connect@awgpblr.org
Website:  https://www.awgpblr.org   ← use the SAME variant (www vs non-www) the site deploys on
Hours:    Mon–Sun, 5:30 AM – 9:30 PM
```

> Source of truth: `lib/seo/siteConfig.js`. If any fact changes, update it there **and**
> on every profile below.

---

## 1. Google Business Profile (highest priority)

Create/claim at https://business.google.com.

- [ ] **Claim & verify** the listing (postcard / phone / video verification).
- [ ] **Business name:** exactly as the NAP above — do **not** add keywords ("…meditation centre") to the name; that violates Google's guidelines and risks suspension.
- [ ] **Primary category:** `Religious organization` or `Hindu temple` (choose the closest fit; "Spiritual center" / "Meditation center" are not always available).
- [ ] **Additional categories:** `Meditation center`, `Yoga studio`, `Non-profit organization`, `Cultural association` (add whichever are offered).
- [ ] **Pin the map marker** precisely on the building, then copy the **exact lat/lng** back into `siteConfig.geo` (replaces the current approximate coordinates).
- [ ] **Service area:** Bengaluru + neighbouring localities (Begur, Bommanahalli, HSR, Electronic City, Kudlu).
- [ ] **Hours:** 5:30 AM – 9:30 PM daily; add special hours for festivals (Guru Purnima, Navratri, Gayatri Jayanti).
- [ ] **Description (750 chars):** lead with what it is and where — "The Gayatri Chetna Kendra of All World Gayatri Pariwar in Begur, Bengaluru offers free Yagya, meditation, Pragya Yoga, Bal Sanskar Shala and Vedic workshops…". Mention founders + Shantikunj.
- [ ] **Website link:** the homepage (matching canonical variant). Add UTM if you want to track GBP traffic.
- [ ] **Attributes:** "Identifies as community-led", wheelchair access, free Wi-Fi, etc. as applicable.
- [ ] **Products/Services:** list each program (Yagya, Meditation, Pragya Yoga, Bal Sanskar Shala, Sanskars, Gau Seva) with a short description and link to the matching page.

### Photos (geotagged where possible)
- [ ] Logo (square) and cover photo (the Chetna Kendra building / Yagya).
- [ ] 15–25 photos: exterior, interior/hall, Yagya kund, a Sanskar, meditation session, festival, Gau Seva, volunteers, signage.
- [ ] A short video (30–60s) of a Yagya or the kendra.
- [ ] Refresh monthly — recency is a ranking factor.

### Google Posts (ongoing — strong local + freshness signal)
- [ ] Post **every upcoming event** (Guru Purnima, Raksha Bandhan, Janmashtami, Navratri…) as an **Event post** with date + link to `/programs/festivals` or `/contact`.
- [ ] Weekly/biweekly **What's new** posts (a recent Yagya, a seva drive, a new blog article).
- [ ] Mirror these as `Event` JSON-LD already on the site for consistency.

### Reviews
- [ ] Invite regular attendees to leave Google reviews; respond to **every** review (thank + invite). Volume + recency + responses materially affect local pack ranking.
- [ ] Seed the WhatsApp community with a review link (`https://g.page/r/…`).

### Q&A
- [ ] Pre-seed the GBP Q&A with the same questions used in the on-site FAQ (timings, is it free, how to reach by metro, can I host a Yagya) and answer them from the official profile.

---

## 2. `sameAs` / authoritative profiles (entity corroboration)

These URLs are already in `siteConfig.sameAs` and emitted in Organization JSON-LD. Keep
them live, consistent, and cross-linked. Add the rest as you create them.

Already referenced on-site:
- [ ] Facebook — https://www.facebook.com/gayatripariwarbangalore
- [ ] Instagram — https://www.instagram.com/awgp.bengaluru/
- [ ] YouTube — https://www.youtube.com/@AWGPBengaluru

Recommended additions (then add their URLs to `siteConfig.sameAs`):
- [ ] Google Business Profile public URL (the `g.page` / Maps link)
- [ ] WhatsApp Business catalogue / channel
- [ ] LinkedIn organisation page
- [ ] X (Twitter) handle
- [ ] A Wikidata item for "AWGP Bengaluru" linked to the parent AWGP entity (powerful for AI knowledge graphs)

On each profile: use the **same name, NAP, logo, and website**, and link back to the
site. Consistency across profiles is what lets Google merge them into one entity.

---

## 3. Local citations & directories (NAP consistency)

Create listings with the **identical NAP**. Inconsistent NAP across the web is the #1
local-SEO killer.

General / India:
- [ ] JustDial · Sulekha · IndiaMART (if relevant) · AskLaila
- [ ] Bing Places for Business · Apple Maps (Apple Business Connect)
- [ ] 5 Bengaluru-specific local directories

Non-profit / spiritual:
- [ ] GuideStar India / relevant NGO registries
- [ ] Spiritual & temple directories (e.g. temple/ashram listing sites)
- [ ] AWGP national site — request a "local centre" link from awgp.org / shantikunj.org pointing to https://www.awgpblr.org (a link from the parent org is a strong relevance + authority signal)

After creating each, spot-check the NAP matches exactly (no "Ph:" vs "Phone:", no abbreviations).

---

## 4. Backlinks & PR (authority)

- [ ] Local Bengaluru news coverage of festivals/seva drives (link to `/media/news`).
- [ ] Partner orgs (blood banks for donation camps, schools for Bal Sanskar Shala, gaushalas for Gau Seva) — request a link.
- [ ] University / Dev Sanskriti Vishwavidyalaya alumni or chapter pages.
- [ ] Event-listing sites (AllEvents, Insider, Townscript) for each public program.

---

## 5. Google Search Console & Analytics (measurement)

- [ ] Verify the property in **Google Search Console** (paste the token into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`).
- [ ] Submit `https://www.awgpblr.org/sitemap.xml`.
- [ ] Set **International targeting**; confirm hreflang has no errors.
- [ ] Set the preferred domain via a **301 redirect** (non-www → www or vice-versa) so it matches the canonical in `siteConfig.SITE_URL`.
- [ ] Add **Bing Webmaster Tools** + submit the sitemap (feeds Bing, and ChatGPT search uses Bing's index).
- [ ] Install analytics (GA4 / Plausible) and tag GBP/WhatsApp links to measure conversions (registrations, WhatsApp clicks, direction requests).

---

## 6. Quick monthly cadence

1. 2–4 Google Posts (events + updates).
2. Add 5–10 fresh photos.
3. Invite + respond to reviews.
4. Publish 1–2 cluster blog articles (see the content plan) and interlink them.
5. Re-check NAP on the top 5 citations.
