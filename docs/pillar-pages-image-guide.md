# Four Pillars — Image Generation Guide

Image brief for the four pillar inner pages: **Sadhana**, **Swadhyay**, **Sanyam**, **Seva**
(`/sadhana`, `/swadhyay`, `/sanyam`, `/seva`).

The pages are already built and live. Every image is wired up as a **CSS background
with a warm gradient fallback** — so the pages look finished right now, and each photo
just "drops in" the moment you save it to the path below. Nothing else needs editing.

**Total images: 21** (Sadhana 4 · Swadhyay 4 · Sanyam 7 · Seva 6).

---

## Global art direction (read once, applies to all 21)

Keep one consistent look across every image so the four pages feel like one family.

- **Style:** warm, devotional, semi-realistic **painterly illustration** (think a refined
  digital painting / matte-painting), *not* stocky photography and *not* flat cartoon.
  Soft, luminous, timeless. A faint golden glow as if lit from a single sacred point.
- **Palette (match the site exactly):** deep maroon `#7A2315`, saffron `#F57C00`,
  antique/bright gold `#F9C74F`, warm cream `#FFFDF7`, soft ink `#3A322B`. Warm light only.
- **Mood:** serene, dignified, hopeful, Indian-spiritual. Lamps (diyas), lotus, mandala
  motifs, scriptures, soft incense haze.
- **People:** show devotion through **silhouettes, soft-focus, or back/three-quarter views**.
  Do **not** depict an identifiable Guru/founder face. Generic, gentle, diverse Indian
  faces are fine for community scenes.
- **No text, no logos, no watermarks** baked into any image (the page adds its own type).
- **Composition:** leave the indicated **safe areas** calm/low-detail — the page lays gold
  hairlines and an inset shadow over the edges, and heroes get a dark veil + centered title.
- **Format:** JPG (or WebP), sRGB, high quality. Sizes given per image.

> **Tip for your model:** prepend this base prompt to every image, then add the
> per-image description:
>
> *"Warm devotional painterly illustration in the style of refined Indian spiritual art,
> soft golden single-source light, palette of deep maroon, saffron, antique gold and cream,
> serene and timeless, subtle diya/lotus/mandala motifs, no text, no logos, cinematic soft focus —"*

---

## File map (where each image goes)

```
public/assets/pillars/
├── sadhana/   hero.jpg · meaning.png · why.png · andolan.jpg
├── swadhyay/  hero.jpg · meaning.png · why.png · jnana-yagya.jpg
├── sanyam/    hero.jpg · meaning.png · why.png
│   └── types/ indriya.jpg · vichar.jpg · samay.jpg · arth.jpg
└── seva/      hero.jpg · meaning.png · why.png · gyan-yagya.jpg
    └── types/ samaydaan.jpg · anshdaan.jpg
```

**Aspect ratios by slot type** (keep these so nothing crops oddly):
- **Hero** → `16:9`, **1920×1080** (subject off-center / atmospheric; center & bottom get a dark veil + title)
- **Section (`meaning`, `why`)** → `4:3`, **1200×900**
- **Feature band (`andolan`, `jnana-yagya`, `gyan-yagya`)** → `4:3`, **1200×900** (sits on a dark maroon band)
- **Type cards (`types/*`)** → `16:9`, **1200×675**

---

## 1 · SADHANA — *Self-Refinement* (`/sadhana`)

Theme: refining the self from within through worship, japa, and meditation.

| # | File | Slot | What to show |
|---|------|------|--------------|
| 1 | `sadhana/hero.jpg` | Hero 16:9 | **A single oil-lamp (diya) glowing at dawn**, and just behind it the soft silhouette of a person seated cross-legged in meditation. Temple-at-sunrise haze, saffron-gold rim light. Keep the **center and lower third darker/calmer** for the white title overlay. |
| 2 | `sadhana/meaning.png` | 4:3 | **"What is Sadhana"** — a seeker in serene meditation, a faint warm glow at the heart/chest (inner light awakening), a japa-mala in hand, a lotus nearby. Symbolic self-refinement, quiet and clean. |
| 3 | `sadhana/why.png` | 4:3 | **"Why it matters"** — the daily-bath-of-the-mind metaphor: a pair of cupped hands sheltering a small steady flame; or still, clear water mirroring a calm sky. Conveys daily cleansing and steadiness. |
| 4 | `sadhana/andolan.jpg` | Feature 4:3 (on maroon) | **"Sadhana Andolan"** — many ordinary people of all ages doing **collective Gayatri jap together**, rows of lit diyas receding into warm light; a sense of a vast, shared upliftment / movement. Rich saffron-gold; works against a dark maroon background. |

---

## 2 · SWADHYAY — *Self-Study* (`/swadhyay`)

Theme: daily nourishment of the mind through sacred literature; study of the self.

| # | File | Slot | What to show |
|---|------|------|--------------|
| 1 | `swadhyay/hero.jpg` | Hero 16:9 | **A person reading an open sacred book by warm lamplight**, glowing pages, a diya and mala beside it, soft incense haze, three-quarter/back view. Contemplative. Keep **center & lower third calm/darker** for the title. |
| 2 | `swadhyay/meaning.png` | 4:3 | **"Two meanings"** — an open glowing book whose light rises and becomes a soft **mirror reflecting the reader's own face**: self-study *and* study of the self. Subtle and poetic. |
| 3 | `swadhyay/why.png` | 4:3 | **"Communing with great souls"** — a reader at a book, and from its pages **faint luminous figures of ancient sages/rishis** rise as if in gentle conversation. Gold light, reverent (silhouette/ethereal, no specific identities). |
| 4 | `swadhyay/jnana-yagya.jpg` | Feature 4:3 (on maroon) | **"Jnana Yagya"** — **stacks of books radiating light like a sacred yagya fire**; beside them a simple cloth **jhola (bag) library** carried to share, hands passing a book door-to-door. Knowledge spreading as a fire-offering. Warm against dark maroon. |

---

## 3 · SANYAM — *Self-Restraint* (`/sanyam`)

Theme: not wasting yourself — guarding energy across senses, mind, time, and money.

| # | File | Slot | What to show |
|---|------|------|--------------|
| 1 | `sanyam/hero.jpg` | Hero 16:9 | **Absolute focus & restraint** — a single **tall, unwavering flame shielded from the wind** by a cupped hand; *or* an archer drawing a bow with total concentration. Disciplined, poised, warm. Calm center/lower third for the title. |
| 2 | `sanyam/meaning.png` | 4:3 | **"Saving energy"** — a calm figure at the center holding steady while many faint threads/sparks of distraction pull outward but are gently contained; a well-kept lamp conserving its oil. Restraint as conservation, not suppression. |
| 3 | `sanyam/why.png` | 4:3 | **"Scattered vs concentrated force"** — a **magnifying lens focusing scattered sunlight into one bright point that kindles a flame**. Potential turned into achievement; one clear direction. |
| 4 | `sanyam/types/indriya.jpg` | Card 16:9 | **Restraint of the senses** — a serene face, senses at peace; a simple **sattvic meal** (fruit, a brass plate), symbol of moderation (aswad) and continence. Balanced, healthy. |
| 5 | `sanyam/types/vichar.jpg` | Card 16:9 | **Restraint of the mind** — a still mind as **calm water**, or a flock of scattered birds settling to rest; one focused stream of thought. Concentration / inner quiet. |
| 6 | `sanyam/types/samay.jpg` | Card 16:9 | **Restraint of time** — an elegant **hourglass or sundial with golden sand**, warm light; time as a precious, finite gift. A sense of a well-ordered day. |
| 7 | `sanyam/types/arth.jpg` | Card 16:9 | **Restraint of money** — a few **gold coins placed thoughtfully**, a small earthen savings pot, a hand giving/investing wisely. Frugality and prudent, purposeful use. |

> The four type cards share a grid — keep their framing, light, and palette consistent
> with each other (they sit side by side).

---

## 4 · SEVA — *Selfless Service* (`/seva`)

Theme: worship that takes the shape of giving — time, a share, and above all, wisdom.

| # | File | Slot | What to show |
|---|------|------|--------------|
| 1 | `seva/hero.jpg` | Hero 16:9 | **Open giving hands** — serving food, offering water, or **one person lifting/steadying another**; a warm community scene of selfless service at golden hour. Hopeful. Calm center/lower third for the title. |
| 2 | `seva/meaning.png` | 4:3 | **"Lifting a soul"** — **one hand helping another rise**, or the light of one diya being passed from one person's lamp to another's. Service as worship; raising understanding. |
| 3 | `seva/why.png` | 4:3 | **"The gift of hours"** — ordinary people volunteering: teaching, caring, building together; a subtle clock/day motif suggesting hours given back to society. Repaying the debt to community. |
| 4 | `seva/types/samaydaan.jpg` | Card 16:9 | **Gift of Time (Samaydaan)** — a volunteer **teaching children at a simple night school** by lamplight, or giving an hour to serve; a soft clock motif in the background. Warm, devoted. |
| 5 | `seva/types/anshdaan.jpg` | Card 16:9 | **Gift of a Share (Anshdaan)** — **many hands dropping small coins into one collective golden pot / gullak**, the small shares becoming a great shared river of giving. Generosity woven into daily life. |
| 6 | `seva/gyan-yagya.jpg` | Feature 4:3 (on maroon) | **"Gyan-Yagya — the highest seva"** — an elder/teacher **sharing wisdom with a small circle of listeners around a glowing lamp**, an open book radiating light like a sacred fire. Knowledge as a fire-offering (brahmadaan). Warm against dark maroon. |

---

## Quick checklist before you export

- [ ] Correct **aspect ratio & size** for the slot (hero 16:9 · sections/feature 4:3 · type cards 16:9).
- [ ] **No text/logos** baked in; warm saffron-maroon-gold palette; single soft golden light.
- [ ] Heroes: **center & lower third kept calm/darker** (title + veil sit there).
- [ ] Type cards within a page look like a **matched set**.
- [ ] Saved as JPG/WebP to the exact path in the file map above — that's all; the page picks it up automatically.

*If you'd rather use different filenames or add more images per section, tell me and I'll
rewire the pages to match.*
