# Content & Internal-Linking Plan — Topical Authority

Goal: build durable topical authority around the AWGP entity and its core Vedic
practices so the site ranks for both the **brand/local** terms ("Gayatri Pariwar
Bangalore", "AWGP Bengaluru", "Gayatri Chetna Kendra") and the **practice** terms
("Yagya Bangalore", "Pragya Yoga", "free meditation classes", "Bal Sanskar Shala").

This uses the **pillar + cluster** model: a small number of comprehensive *pillar*
pages, each surrounded by supporting *cluster* articles that link up to the pillar,
and the pillar links down to each cluster. Search engines read the dense internal
linking as a signal of subject-matter depth.

---

## 1. A note on two meanings of "pillar"

The site already has a **Four Pillars** section — *Sadhana, Swadhyay, Sanyam, Seva* —
which is the AWGP philosophy of self-refinement. Keep these; they are excellent
*philosophy* pillars and already have pages (`/sadhana`, `/swadhyay`, `/sanyam`,
`/seva`).

For **SEO topical authority** we layer a second, search-driven set of pillars on top.
Some already exist as pages; some are **content gaps** to fill. They are not in
conflict — the philosophy pillars are *who we are*, the SEO pillars are *what people
search for*.

---

## 2. The five SEO pillars (and their status)

| # | SEO Pillar | Target head terms | Pillar page | Status |
|---|-----------|-------------------|-------------|--------|
| 1 | **Gayatri Mantra & Sadhana** | Gayatri Mantra meaning, Gayatri Sadhana | `/activities/sadhana` (+ `/sadhana` philosophy) | ✅ exists — **enrich** with a "What is the Gayatri Mantra" lead section |
| 2 | **Yagya / Havan** | Yagya Bangalore, Havan, Agnihotra | `/programs/yagya-events` | ✅ exists — FAQ added; **add** a standalone `/yagya` explainer later |
| 3 | **Meditation & Pragya Yoga** | free meditation Bangalore, Pragya Yoga | `/activities/meditation`, `/activities/yoga` | ✅ exists — FAQ added |
| 4 | **Sanskar** | 16 Sanskars, Bal Sanskar Shala, Namkaran | `/sanskars` (+ 30 detail pages) | ✅ strong — FAQ added |
| 5 | **Vedic Wisdom & Literature** | Akhand Jyoti, Pandit Shriram Sharma books | `/literature`, `/blog` | ✅ exists |

**Recommended new pillar page (content gap):** a dedicated **`/gayatri-mantra`**
explainer — "What is the Gayatri Mantra?", the 24 syllables, meaning, benefits, how to
chant, scientific perspective. This is the single highest-intent informational query in
the niche and currently has no home. Build it on the existing `PillarPage` component;
it will absorb a large volume of AI-overview and featured-snippet traffic and funnel to
`/activities/meditation` and `/programs/yagya-events`.

---

## 3. Cluster map (pillar → supporting articles)

Existing pages already form most clusters. The blog is the engine for net-new clusters.

### Pillar 1 — Gayatri Mantra & Sadhana → hub: `/activities/sadhana` (or new `/gayatri-mantra`)
- `/sadhana` (philosophy) · `/blog/the-science-of-gayatri-sadhana`
- New articles: *"Gayatri Mantra: meaning of the 24 syllables"*, *"How to start a daily japa practice"*, *"Anushthan explained"*, *"Brahma Muhurta & the ideal time for sadhana"*

### Pillar 2 — Yagya → hub: `/programs/yagya-events`
- `/programs/festivals` · `/programs/akhand-jap`
- New articles: *"What is Yagya? A beginner's guide"*, *"Health & environmental benefits of Havan"*, *"Yagya for family occasions (birthday, griha pravesh)"*

### Pillar 3 — Meditation & Pragya Yoga → hub: `/activities/meditation`
- `/activities/yoga`
- New articles: *"Pragya Yoga: the 14 asanas"*, *"Meditation for beginners in Bangalore"*, *"Jap, Tap, Dhyan — the three stages"*

### Pillar 4 — Sanskar → hub: `/sanskars`
- 30 detail pages (`/sanskars/*`) · `/programs/bal-sanskar-shala`
- New articles: *"Why Namkaran matters"*, *"Planning a Vidyarambh / Annaprashan in Bangalore"*

### Pillar 5 — Vedic Wisdom & Literature → hub: `/literature`
- `/blog`, `/media/news`
- New articles: book reviews, *"Akhand Jyoti: what's inside"*, Gurudev's teachings series

---

## 4. Internal-linking rules

1. **Every cluster article links up** to its pillar page with descriptive anchor text
   (e.g. "part of our [Yagya programs](/programs/yagya-events)"), and **the pillar links
   down** to each cluster. This bidirectional linking is what creates the topical graph.
2. **Cross-pillar links where natural** — a Yagya article naturally references the
   Gayatri Mantra pillar; a Sanskar page references Yagya. Don't force it.
3. **Local intent on every practice page** — link to `/contact` and `/chetna-kendra`
   with anchors like "visit our Gayatri Chetna Kendra in Begur" to reinforce the
   local entity.
4. **Breadcrumbs** are now emitted on inner pages (Home → Section → Page), giving
   crawlers an explicit hierarchy in addition to the nav/footer links.
5. **Descriptive anchor text, never "click here."** Use the target's primary keyword.
6. **Footer + nav** already provide site-wide links to the hubs — keep the hubs in the
   primary nav so they accrue the most internal PageRank.

### Priority anchor-text targets (use naturally, no stuffing)

| Page | Preferred inbound anchors |
|------|--------------------------|
| `/` | AWGP Bengaluru, Gayatri Pariwar Bangalore |
| `/chetna-kendra` | Gayatri Chetna Kendra, Gayatri consciousness centre Bangalore |
| `/programs/yagya-events` | Yagya in Bangalore, Havan |
| `/activities/meditation` | free meditation classes Bangalore |
| `/activities/yoga` | Pragya Yoga Bangalore |
| `/sanskars` | 16 Sanskars, Shodash Sanskar |
| `/about` | Shri Ram Sharma Acharya, Shantikunj Haridwar |

---

## 5. AI-search (AEO) guidelines for new content

The FAQ blocks and lead-sentence pattern already model this. For every new page/article:

- **Open with a direct answer.** First sentence defines the term: *"Yagya is the
  ancient Vedic fire ritual in which…"* AI engines lift these as the answer.
- **Use a semantic H1 → H2 → H3 hierarchy** (one H1 per page — already enforced by the
  shared `HeroSection`/`PageHeader` H1).
- **Entity-rich prose** — name the people and places (Gurudev Shri Ram Sharma Acharya,
  Mata Bhagwati Devi Sharma, Shantikunj Haridwar, Dev Sanskriti Vishwavidyalaya) so the
  page reinforces the knowledge graph.
- **Add a FAQ block** (`getFaqs` + `<FaqSection>`) targeting the conversational/voice
  variants ("where can I…", "is it free…", "how do I reach…").
- **Keep copy in plain server-rendered text** — no JS-gated content. (The site already
  server-renders; the `<details>` FAQ is crawlable.)
- **Cover both spellings** — "Bangalore" and "Bengaluru" appear naturally across the
  site; never stuff.
