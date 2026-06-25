# AWGP Bengaluru — Design System (as-built)

**Version 1.0 · companion to [`awgp-bengaluru-brand-concept-spec.md`](./awgp-bengaluru-brand-concept-spec.md)**

हम बदलेंगे, युग बदलेगा | हम सुधरेंगे, युग सुधरेगा |

This document records the design system **as it is actually implemented in the code** —
the tokens in [`app/globals.css`](../app/globals.css) and the section components under
[`components/`](../components). The brand spec describes the *intended* brand; this describes
the *shipped* system and how to extend it consistently.

> **Source of truth:** [`app/globals.css`](../app/globals.css) `:root`. Restyle the whole
> site by editing tokens there — individual components should consume tokens, never hardcode
> values. Where a component still hardcodes (tracked in §11), migrate it to a token.

---

## 0. ⚠️ Reconciliation with the Brand Concept Spec

The implemented palette and type **do not match** the brand concept spec v1.0. Before any
brand-facing rollout, the team must decide which is canonical and align the other.

| Token | Brand spec v1.0 | As-built (`globals.css`) |
|---|---|---|
| Maroon (primary) | `#8B1E1E` | `#7A2315` |
| Gold (the "light") | `#C9A227` (antique) | `#F9C74F` (bright) |
| Saffron (energy) | `#E8943B` | `#F57C00` |
| Cream (background) | `#F7F1E5` (warm) | `#FFFDF7` (near-white ivory) |
| Ink (text) | `#2B221E` | `#3A322B` |
| Display / headings | Fraunces (serif) | **Reforma 2018 (serif)** — serif-display intent now met; exact face differs |
| UI chrome (nav, buttons) | Plus Jakarta Sans | **Kumbh Sans** (`--font-sans`) |
| Body | Plus Jakarta Sans | **Nunito Sans** |
| Hindi / Sanskrit | Tiro Devanagari Hindi | **Mukta** (body), **Reforma 2018** (mantras) |
| Kannada | *(not specified)* | **Noto Sans Kannada** |

**Recommendation:** the as-built system is internally coherent, accessible, and already
trilingual (the spec didn't cover Kannada). Treat **the code as canonical** and update the
brand spec to v1.1 to match — *or* consciously decide to retrofit Fraunces/Jakarta and the
antique-gold palette. Either way, pick one. This is the single highest-priority design task.

The two systems **do agree** on the important things: maroon-primary, gold-as-precious-accent,
cream-first space, a serif-for-the-sacred + sans-for-the-modern pairing, and the **radiant
"light from a single point" motif** (gold divider with a center diamond `◆`), which the code
implements faithfully across Hero, Mantra, and section heads.

---

## 1. Color tokens

All values from [`app/globals.css`](../app/globals.css). Use the **token**, not the hex.

### Brand

| Token | Hex | Role |
|---|---|---|
| `--gold` | `#F9C74F` | The "light" — eyebrows, dividers, accents (~10% of a layout) |
| `--gold-lt` | `#FBDA7E` | Gold on dark backgrounds, hover highlights |
| `--gold-pale` | `#FFF4D6` | Soft gold wash / tints |
| `--saffron` | `#F57C00` | Primary CTA fill, energy accent |
| `--saffron-lt` | `#FF9800` | Lighter saffron |
| `--saffron-deep` | `#E65100` | CTA hover / pressed |
| `--maroon` | `#7A2315` | Primary devotional color — headings on cream, dark bands |
| `--maroon-dk` | `#5A1A0E` | Gradient depth, shadows |
| `--maroon-lt` | `#A33525` | Lighter maroon |
| `--brown` | `#8D4A1E` | Secondary text on cream (`--text-mid`) |

### Neutral / surface

| Token | Hex | Role |
|---|---|---|
| `--dark` / `--dark-2…4` | `#3A322B` → `#6A5D53` | Charcoal section bands (`--section--dark`) |
| `--cream` | `#FFFDF7` | **Primary background** (the calm) |
| `--cream-2` | `#FFF4D6` | Warm cream band |
| `--cream-3` | `#F5E8C0` | Deeper sand |
| `--white` | `#FFFFFF` | Cards, panels |

### Text & UI

| Token | Value | Role |
|---|---|---|
| `--text-dark` | `#3A322B` | Body text on light (warm near-black — never pure `#000`) |
| `--text-mid` | `#8D4A1E` | Paragraph copy, secondary |
| `--text-muted` | `#A08060` | Captions, subtitles |
| `--text-light` / `--text-light-2` | `rgba(255,255,255,.88 / .60)` | Text on dark bands |
| `--border` | `#E8D9B5` | Hairlines on light |
| `--border-dark` | `rgba(255,255,255,.12)` | Hairlines on dark |

### Usage balance & contrast (AA)

Follow the brand spec's ratio: **~60% cream · 25% maroon · 10% ink text · 5% gold.**

- **Gold/`--gold` fails small-text contrast on cream** — only for display sizes, lines, shapes, icons. Never body copy.
- Text on maroon/dark → `--text-light` or `#fff`.
- Text on cream → `--text-dark`.
- Saffron (`#F57C00`) on white passes AA for large text; verify for any small text use.

---

## 2. Typography

Loaded via `next/font` (Kumbh Sans, Nunito Sans, Mukta, Noto Sans Kannada) + local Reforma
(`@font-face` in `globals.css`). **Roles are tokenized — change a role, restyle the site.**

| Role token | Family | Use |
|---|---|---|
| `--font-heading` | **Reforma 2018 (serif)** | All headings/titles (`h1–h6`, section titles, card titles) — the Samadhi display voice |
| `--font-sans` | Kumbh Sans | UI chrome — nav links, buttons, form labels (the modern-minimal layer) |
| `--font-body` | Nunito Sans | English body copy |
| `--font-body-hi` | Mukta | Hindi body (`body[data-lang="hi"]`) |
| `--font-body-kn` | Noto Sans Kannada | Kannada body (`body[data-lang="kn"]`) |
| `--font-quote` | Reforma 2018 | Mantras, pull-quotes |

**Heading face is the theme typeface (Reforma), pairing a serif display with the sans body/UI
— the editorial premium look.** Because Reforma is Latin-only, `--font-heading` and
`--font-sans` are **re-pointed per language** (`body[data-lang="hi"|"kn"]` → Mukta / Noto Sans
Kannada) so Devanagari/Kannada headings never fall back to broken glyphs. Body font likewise
switches by `data-lang` (see `LangBodySync`). Reforma ships weights 300/400/700 — `font-weight:
500/600` resolve to the real 700 (no faux-bold), so headings stay crisp.

### Type scale (from `globals.css`)

| Level | Size | Weight | Line-height |
|---|---|---|---|
| `h1` | `clamp(2.6rem, 6vw, 5rem)` | 700 | 1.2 |
| `h2` | `clamp(2rem, 4vw, 3rem)` | 600 | 1.2 |
| `h3` | `clamp(1.3rem, 2.5vw, 1.75rem)` | 600 | 1.2 |
| `h4` | `1.1rem` | 600 | 1.2 |
| Body `p` | `1rem` | 400 | 1.75 |
| Lead | `~1.05–1.18rem` | 400 | 1.7 |

### Eyebrow (the tracked label above section titles)

Centralized into tokens so every section reads identically — **always use these, never
hardcode size/tracking** (this was the main drift fixed in the polish pass):

```css
--eyebrow-size:     0.75rem;
--eyebrow-tracking: 0.26em;
--eyebrow-weight:   700;
```

Pattern: `font-family: var(--font-heading); text-transform: uppercase; color: var(--gold)`
(or `--gold-lt` on dark). Used by `.sec-head__eyebrow` and every `*__eyebrow`.

---

## 3. Spacing, layout & grid

| Token / pattern | Value | Use |
|---|---|---|
| `.section` padding | `clamp(64px, 9vw, 110px)` block · `clamp(20px, 5vw, 60px)` inline | Standard vertical rhythm |
| `.section-inner` | `max-width: 1200px; margin: 0 auto` | Content container |
| `.page-content` | `max-width: 1160px` + clamp padding | Inner detail pages |
| `.grid-2 / -3 / -4` | `gap: 2rem` | Card grids |
| Grid breakpoints | 4→2 @1000px · 3→2 @860px · all→1 @640px | Responsive collapse |
| `--nav-h` | `96px` | Navbar height / hero top-padding offset |

**Spacing scale in use** (clamp-based, fluid): section heads `clamp(2.5rem, 5vw, 4rem)`
bottom margin; intra-component gaps mostly `0.5–1rem` small, `1.5–2rem` medium, `2.5–4.5rem`
large. There is no numeric `--space-*` ramp yet — see §11 roadmap.

### Border radius — **square by design**

```css
--radius: 0; --radius-sm: 0; --radius-lg: 0;
```

Square corners are a deliberate, ownable choice site-wide. The only rounding allowed:
**circles** (icon badges, dots, avatars via `border-radius: 50%`) and the gallery's own
rounding. Do not introduce arbitrary rounded rectangles.

### Shadow system

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | `0 2px 12px rgba(58,50,43,.08)` | Resting cards |
| `--shadow-md` | `0 4px 24px rgba(58,50,43,.12)` | Raised panels |
| `--shadow-lg` | `0 8px 48px rgba(58,50,43,.18)` | Card hover lift |
| `--shadow-gold` | `0 4px 20px rgba(245,124,0,.22)` | Saffron CTA hover glow |

---

## 4. Components

### Buttons — `.btn` + variant

| Class | Look | On |
|---|---|---|
| `.btn-primary` | Saffron fill, white text; hover → `saffron-deep` + lift + gold glow | Light & dark |
| `.btn-outline` | Transparent, white 1.5px border; hover → translucent white fill | Dark / image |
| `.btn-outline-dark` | Transparent, `--border` border; hover → gold | Light |
| `.btn-gold-outline` | Saffron border + text; hover → saffron fill | Light/dark |
| `.btn-dark` | Charcoal fill; hover → lighter + gold text | Light |

Base: uppercase, `letter-spacing: .07em`, weight 600, square, `padding: 13px 30px`,
`transition: all .25s`. Hero CTAs (`.hero__cta`) extend these.

### Cards — `.card`

White, `--border` hairline, `--shadow-sm`; hover → `translateY(-5px)` + `--shadow-lg`,
`transition .28s`. Square corners. Pillar/Path/Chetna cards are bespoke variants of this idea.

### Section head — `.sec-head` / `.sec-head__eyebrow / __title / __sub`

Eyebrow (gold, tracked) → title → optional subtitle. `--center` modifier centers and
constrains the subtitle. The canonical heading pattern for new sections.

### Forms — `.form-group`

Stacked label (uppercase, muted) + input. Inputs: `--border` 1.5px, square, focus →
gold border + `0 0 0 3px rgba(200,155,78,.15)` ring. Textareas resize vertical only.

### Other primitives

- **Divider** — `.divider` (48×3px gold bar) and the **gold-diamond divider** motif
  (`line · ◆ · line`) used in Hero & Mantra. The signature radiant device.
- **Link arrow** — `.link-arrow` (uppercase gold label, `→` that widens its gap on hover).
- **Info list** — `.info-list` with a gold `✦` marker.
- **CTA strip** — `.page-cta-strip` (dark band, headline + button, used at page ends).
- **Legacy** — `.section-header` + `.ornament` (gold-divider PNG) power inner pages via the
  `SectionHeader` component. Being phased out (see §11).

### Iconography

Three layers, in order of preference:
1. **`lucide-react`** — all UI icons (nav, social, arrows). Consistent 1.8–2.2 stroke.
2. **Inline SVG** — bespoke decorative marks (hanging diyas, custom arrows) drawn in-component.
3. **PNG** — pillar icons (`/assets/icon/*`) and gold ornament/mandala watermarks.

Avoid **emoji as iconography** — the 4 legacy inner pages still pass emoji ornaments
(🔥🪔🌟…); replace with the gold divider / lucide as they're migrated.

---

## 5. Motion design

Subtle, premium, always with a reduced-motion fallback.

| Primitive | Where | Notes |
|---|---|---|
| `useReveal(threshold)` | [`lib/useReveal.js`](../lib/useReveal.js) | **Shared** reveal-on-scroll hook (extracted in polish). Adds `.is-visible`; CSS animates descendants with staggered `--i` delays. |
| `fadeInUp` / `fadeIn` | `globals.css` (`.anim-fade-up`, `.anim-fade`) | Entrance utilities |
| `heroRise` | Hero | Staggered content entrance (`0.05s`→`0.34s` delays) |
| Ken Burns | Hero bg | `scale(1.04→1.16)` over 7s while active |
| Crossfade | Hero slides | `opacity 1100ms cubic-bezier(.4,0,.2,1)` |
| `mantraSpin` | Mantra mandala ring | 90s linear infinite |
| `diyaSway` | Mantra diyas | Gentle ±1.5° pendulum |
| Image zoom | Path / Chetna tiles | `scale` on hover, `.6–.9s` ease |

**Timing convention:** hovers `.25–.4s`, entrances `.6–.8s`, ambient loops slow (5–90s).
Easing: `cubic-bezier(.16,1,.3,1)` for entrances, `cubic-bezier(.22,1,.36,1)` for image zoom.

**Every animated section ships `@media (prefers-reduced-motion: reduce)`** that forces the
resting/visible state. New scroll-revealed content **must** include this fallback so
motion-sensitive users (and the no-JS case) never see hidden content. `useReveal` documents
this requirement.

---

## 6. Interaction states

- **Hover** — cards lift (`translateY(-5px..-10px)`) + deepen shadow; CTAs lift + glow;
  arrows nudge in their travel direction; images zoom; gold/maroon color shifts on text.
- **Focus** — components pair `:hover` with `:focus-visible` (e.g. Path/Pillars cards) so
  keyboard users get the same reveal. Form inputs show a gold focus ring. Preserve this
  pairing on any new interactive element; never `outline: none` without a visible replacement.
- **Active route** — nav uses `.is-active`; section roots match sub-paths via `isActive()`.

---

## 7. Navigation & footer

- **Navbar** — transparent over heroes, solid (`--scrolled`) after 40px or on hero-less routes
  (`/blog`, `/media`). Logo swaps light/dark with state. Desktop mega-dropdowns; mobile = right
  slide-in panel with accordion sub-menus, locked body scroll, language toggle + Join CTA +
  socials. Trilingual labels.
- **Footer** — link columns (Explore / Practice / Events) · centered brand + socials · contact
  · Akhand Jyoti subscription card · bottom rights bar. All trilingual via `L()` helper.

---

## 8. Internationalization

`next-intl` with `en` / `hi` / `kn`. Two content patterns coexist:
- **Message catalog** — `t('key')` for nav/footer chrome (`messages/*.json`).
- **Inline `L(en, hi, kn)`** or per-locale objects — for page/section content.

`<body data-lang>` drives the body-font swap. Any new user-facing string must supply all three
languages. Keep Devanagari/Kannada in the correct script font (don't force `--font-heading` on
Hindi/Kannada body copy).

---

## 9. Dark mode

There is **no OS `prefers-color-scheme` dark theme**, and none is planned — the site is a
cream-first light experience. "Dark" is a **compositional device**: alternating charcoal
(`--section--dark`) and maroon (`.home-mantra`, `.home-chetna`) bands create rhythm between
cream sections. Tokens for text-on-dark (`--text-light`, `--border-dark`, `--gold-lt`) exist
for exactly this. If a true dark mode is ever requested, the role-token architecture supports
it — add a `[data-theme="dark"]` token block; do not retrofit per-component.

---

## 10. Section composition (homepage rhythm)

Order in [`app/[locale]/page.jsx`](../app/[locale]/page.jsx), alternating tone per the brand's
layer strategy:

`Hero (image)` → `Welcome (cream)` → `Mantra (maroon)` → `Stats` → `Pillars (cream)` →
`Path (dark image cols)` → `Cards` → `Events` → `Chetna (maroon)` → `Gallery` → `CTA` →
`Contact`.

The alternation **cream → accent band → cream** is the "base calm, accent precious" rule made
literal. Keep new sections in this cadence; never stack two dark bands without cream between.

---

## 11. Implementation roadmap

Priority order for bringing the whole site to the level the homepage sets:

1. **Reconcile palette & type with the brand spec (§0).** Decide canonical; update the loser.
   *Blocking for any print/brand collateral.*
2. **Migrate the 17 legacy inner pages** off `HeroSection` / `SectionHeader` / `PageHeader`
   onto the new section system (`.section`, `.sec-head`, the gold-divider motif).
3. **Remove emoji ornaments** (4 pages) — replace with the gold divider / lucide icons; then
   delete the legacy-compat block in `globals.css`.
4. **Adopt the eyebrow token** in the remaining home sections (`HomeCards`, `HomeEvents`,
   `HomeContact` still carry drifted literals) and anywhere new.
5. **Formalize a numeric spacing scale** (`--space-1…8`) to replace ad-hoc clamps, so vertical
   rhythm is enforceable, not eyeballed.
6. **Token-hygiene sweep** — grep for hardcoded hex / font names in component CSS and replace
   with tokens (HomePath's hardcoded `'Reforma2018'` was fixed in the polish pass; audit the rest).
7. **Reduced-motion audit** — confirm every scroll-revealed/animated block has the
   `prefers-reduced-motion` fallback (new ones must, per `useReveal` docs).

---

## 12. Quality checklist (per the brief)

- ✓ Unique identity, not a reference clone — the radiant gold-diamond motif, square corners,
  diyas, and trilingual mantras are ownable.
- ✓ Premium & timeless — cream-first space, restrained gold, refined type.
- ✓ Reflects AWGP's spiritual + community mission — Gayatri Mantra, four pillars, Chetna Kendra.
- ✓ Accessible — AA contrast rules documented; focus states; reduced-motion fallbacks.
- ✓ Responsive — clamp-fluid type/spacing; documented grid breakpoints.
- ⚠ Consistent tokens — eyebrows now centralized; **palette/type vs brand spec still to
  reconcile (§0)** and inner pages to migrate (§11).
- ✓ Feasible in Next.js — already built on Next 15 / React 19 / Tailwind v4 + CSS tokens.

---

*AWGP Bengaluru · Design System v1.0 (as-built) · companion to Brand Concept Spec v1.0*
