# The Seals Endowment Foundation — Website Build Spec

A single source of truth for building the SEF website exactly as designed in
`Seals Endowment Foundation.dc.html`. Hand this file to Claude (or any developer)
at the start of every session. Re-read it before each change and check work
against the **Definition of done** at the bottom.

---

## 0. How to use this file

1. Open `Seals Endowment Foundation.dc.html` and look at the screen you are building.
   The mockup is authoritative for layout; this file is authoritative for rules.
2. Read `_ds/industry-55bbef6d-e9eb-4eb5-9a61-075f6ca2d883/styles.css` for exact
   token values. Never hard-code a value the tokens already carry.
3. Build one page at a time, in the order given in §3.
4. Do not invent pages, sections, components, colors or copy. If something is
   missing, ask.

---

## 1. What this is

A public website for The Seals Endowment Foundation (SEF) — a socio-cultural and
philanthropic organisation serving people of Ika origin in Nigeria and the diaspora.

**Audiences, in priority order:** existing members · prospective members ·
donors and sponsors · scholarship and grant applicants · the Ika community at large.

**Not in scope:** members-only area, login, member directory, dues payment.
This is a public site only.

**Tone:** mature, composed, institutional. The members are adults in mid to late
career, not elderly. Not flashy. No animation beyond simple hover states, no
parallax, no carousels, no scroll-triggered reveals, no gradients, no emoji.

**Donate is the primary call to action on every page** — it sits in the header bar
of every screen and appears again as a full-width band or panel further down.

---

## 2. Design system — binding

The site is built on the **Industry** design system at
`_ds/industry-55bbef6d-e9eb-4eb5-9a61-075f6ca2d883/`. Load it in every component:

```html
<helmet>
  <link
    rel="stylesheet"
    href="_ds/industry-55bbef6d-e9eb-4eb5-9a61-075f6ca2d883/styles.css"
  />
  <script src="_ds/industry-55bbef6d-e9eb-4eb5-9a61-075f6ca2d883/_ds_bundle.js"></script>
</helmet>
```

### Rules that must not be broken

- **Square corners everywhere.** No `border-radius` on cards, figures, images,
  buttons or inputs beyond what the tokens set.
- **Cards and figures are line drawings** — 1px `var(--color-divider)` border,
  transparent background. No surface fills, no drop shadows on cards.
- **The solid accent primary button is the only filled object** in the content area.
- **Registration marks:** any element wearing `.blueprint` gets four
  `<i class="corner tl">`, `tr`, `bl`, `br` children. Never drop them.
  (Half-marks — `tl` + `br` only — are used on small placeholder figures in the
  mockup; that is the one permitted reduction.)
- **Type:** Barlow Condensed (`var(--font-heading)`) for all headings, numerals,
  dates, refs and kickers. Barlow (`var(--font-body)`) for body copy. Nothing else.
- **One accent only** — steel blue `var(--color-accent)` #5980a6. No second
  decorative colour. Green/red only if a future status genuinely needs it.
- **Accent text at body size must use `var(--color-accent-700)`**, not the base
  accent — the base is only 3:1 on the ground and is reserved for links, icons,
  large type and chrome.
- **Focus:** `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px }`.
  Never a browser-default ring.
- **Dividers, not rules.** Structure comes from 1px borders and whitespace.
  Avoid `.hr`.

### Colour roles as used in the mockup

| Use                                             | Value                                                               |
| ----------------------------------------------- | ------------------------------------------------------------------- |
| Page ground                                     | `var(--color-bg)` #f2f2f3                                           |
| Body text                                       | #1d1f20 (headings), #424244 (paragraphs), #5d5d60 (meta, captions)  |
| Accent / links / row arrows                     | `var(--color-accent)` #5980a6                                       |
| Accent text at body size, big numerals on light | `var(--color-accent-700)`                                           |
| Reversed stat bands, vision panel               | `var(--color-accent-900)`, text #f2f2f3, labels #b5d9fd             |
| Footer                                          | #1d2d3d, text #d4d4d7, links #9ebbd8, labels #749dc4, legal #7e9cb8 |
| Tinted panel (newsletter)                       | `var(--color-accent-100)`                                           |

### Spacing rhythm as used

- Page gutter: 40px desktop, 18px mobile.
- Section padding: 52–72px vertical desktop, 26px mobile.
- Grid gaps: 28–32px between cards, 48–56px between two-column blocks.
- Grid-cell blocks (the 3×3 focus areas, the aims grid) use `gap: 1px` on a
  `var(--color-divider)` background with a 1px outer border, so cells share hairlines.
- Type sizes: page h1 50–56px, hero h1 46–74px, h2 26–34px, h4 ~19px,
  body 14.5–16px, meta 12–13px, kicker/eyebrow 11px at `.18em–.20em` tracking,
  uppercase. Nothing below 11px.

---

## 3. Pages to build

Eight public pages. Build desktop first at a 1280px design width, fluid below.
Mobile follows the mockup's mobile homepage (390px) pattern: single column,
two-up grid for focus areas, stat band 2×2, full-width buttons at 44px minimum
height, hamburger + persistent Donate button in the header.

| #   | Page                          | Mockup id                          | Status              |
| --- | ----------------------------- | ---------------------------------- | ------------------- |
| 1   | Homepage                      | `1a` (photo-led) / `1b` (type-led) | Pick one — see §3.1 |
| 2   | About — Vision, Mission, Aims | `1e`                               | Spec'd              |
| 3   | Programmes / Areas of Focus   | `1f`                               | Spec'd              |
| 4   | Projects & Impact             | `1g`                               | Spec'd              |
| 5   | News & Events                 | `1h`                               | Spec'd              |
| 6   | Donate / Support              | `1i`                               | Spec'd              |
| 7   | Leadership                    | `1j`                               | Spec'd              |
| 8   | Contact                       | `1k`                               | Spec'd              |
| —   | Mobile homepage               | `1c`                               | Spec'd              |

### 3.1 Homepage — two directions

Both put everything on the landing page. Choose one and stay consistent; do not
mix grammars across the site.

**`1a` Photo-led single scroll.** Tall photograph with a bordered text plate
overlapping its bottom-left corner; vision and mission side by side; nine focus
areas as a 3×3 hairline grid of numbered cells; reversed accent-900 stat band;
three programme cards with framed photos; news list plus an events rail; bordered
donate panel with amount chips; four-column dark footer.

**`1b` Type-led spec sheet.** Large condensed headline with a bordered
"Foundation record" 2×2 stat plate beside it; letterboxed photo strip; the nine
focus areas as full-width index rows (`52px` number / `300px` title / description /
arrow); vision reversed on accent-900 beside mission on paper; projects as a
`.table` register with status tags; news and events in two columns; full-bleed
accent donate band; dark footer.

### 3.2 Header — identical on every page

Left: 34px bordered `SEF` mark in accent, then the wordmark — "THE SEALS" at 19px
Barlow Condensed over "ENDOWMENT FOUNDATION" at 9.5px, `.22em` tracking, #5d5d60.
Centre-right: About · Programmes · Projects & Impact · News & Events · Leadership ·
Contact at 14px. The current page's link is `var(--color-accent)`.
Far right: `.btn.btn-primary` "Donate".

### 3.3 Footer

Four columns — wordmark plus one line of description; Foundation (About,
Vision & Mission, Leadership); Work (Programmes, Projects & Impact, Reports);
Contact (address, email, phone). Bottom rule, then the copyright line. Inner
pages in the mockup use a single-row condensed variant; either is acceptable as
long as it is the same on all inner pages.

### 3.4 Page-by-page structure

**About (`1e`)** — eyebrow, h1, intro; full-width photograph; "Our story" in a
280px label column beside a 70ch text column; vision reversed on accent-900 /
mission on paper, side by side; "Aims and objectives" as a seven-cell hairline
grid with Roman numerals, item VII spanning both columns.

**Programmes (`1f`)** — eyebrow, h1, intro, then a filter chip row (All +
the nine areas, `.tag-accent` for the active one, `.tag-outline` for the rest);
3×3 card grid, each card a framed photo placeholder, `NN · Area` kicker, title,
description, "Learn more →".

**Projects & Impact (`1g`)** — h1; four-up reversed stat band (amount disbursed,
scholarships, projects, communities); two featured projects with large framed
photos and `Ref · Location · Year` kickers; the full project register as a
`.table` with columns Ref / Project / Area / Location / Year / Status, status as
`.tag-accent` (Ongoing) or `.tag-neutral` (Completed).

**News & Events (`1h`)** — h1; 1.5fr/1fr split. Left: one lead story with a large
framed photo, then a list of stories as 150px thumbnail + date · category +
headline + standfirst, then an "Older stories" button. Right: three bordered
event cards with a large day numeral over a 3-letter month, title, place and time,
one line of detail; then a tinted newsletter panel with an email field and a
full-width Subscribe button.

**Donate (`1i`)** — 1.15fr/1fr split. Left: eyebrow, h1, intro; a four-cell
hairline grid of giving levels (₦10,000 / ₦50,000 / ₦250,000 / ₦1m+) each with one
line of explanation; "Other ways to give" as a single inline list (bank transfer,
diaspora giving, corporate partnership, bequests). Right: a bordered donation
form — amount chips plus an "other amount" input, a `.seg` Once / Monthly /
Annually control, a designation field, name, email, a card / bank-transfer radio
pair, and a full-width "Continue to payment" button.

**Leadership (`1j`)** — eyebrow, h1, intro; a "Board of Trustees" section label
over a four-up portrait grid; then "Executive Council" over a second four-up grid.
Portraits are 230px framed placeholders; name at h4, role at 12.5px #5d5d60.

**Contact (`1k`)** — two columns. Left: eyebrow, h1, intro, a 2×2 block of
Secretariat / Enquiries / Scholarships / Partnerships details, then a framed map
placeholder. Right: a bordered enquiry form — name, email, phone, a four-option
radio group (general, membership, scholarships & grants, partnership or
sponsorship), message textarea, full-width "Send enquiry".

---

## 4. Copy

### 4.1 Verbatim — do not rewrite, reword or trim

These come from the Foundation's own documents. Reproduce exactly, including the
quotation marks where shown.

**Vision**

> "To build a united, prosperous and enduring community of people of Ika origin,
> where members support one another, preserve their cultural heritage, empower
> future generations, and contribute meaningfully to the development and wellbeing
> of society."

**Mission**

> "To foster unity, mutual support and the socioeconomic wellbeing of people of
> Ika origin, while preserving our cultural heritage, empowering future
> generations, and contributing to the development of our communities and society
> through philanthropy, education and sustainable initiatives."

**Aims and objectives** (seven, in this order, numbered I–VII)

1. To foster the spirit of unity and mutual understanding among members.
2. To promote a harmonious relationship among members of the Foundation and the general public.
3. To encourage and assist the progress of the individual members.
4. To promote and encourage the practice of Ika culture both at home and in the Diaspora.
5. To invest and establish viable businesses within and outside Nigeria.
6. To create an endowment fund for the proper execution of the policies and programmes of the Foundation.
7. To assist Ika land and indigenes in whatever manner deemed expedient.

**The nine areas of focus**, in this order: Education & Scholarships · Youth
Development · Women & Family Development · Healthcare · Community Development ·
Economic Empowerment · Entrepreneurship · Culture & Heritage · Leadership
Development.

### 4.2 Placeholder — must be replaced before launch

Everything else in the mockup is greeked or invented and is a slot, not content:
body paragraphs, news headlines and dates, event names and dates, project names
and refs, statistics (1,240 scholarships / 38 projects / 6 chapters / ₦186m /
founded 1998), leadership names and roles, addresses, phone numbers and email
addresses. Do not ship any of it. Flag each to the client for real copy.

### 4.3 Voice for new copy

Plain, factual, unhurried. State what the Foundation does and has done. No
marketing superlatives, no rhetorical questions, no "imagine a world where",
no em-dash-heavy constructions, no exclamation marks.

---

## 5. Imagery

Every photograph in the mockup is a labelled placeholder. The label says what the
photograph should show — keep the label until a real image arrives.

- Wrap every content photograph in the design system's `.duotone` class so it is
  desaturated and washed into the accent.
- Frame photographs square with a hairline border and registration marks.
  Never rounded, never circular, never soft-clipped.
- Portraits on the Leadership page are the same treatment at 230px tall.
- Needed at minimum: a wide convention/membership photograph for the hero, a group
  portrait for About, nine programme images, two featured-project images, one lead
  news image plus thumbnails, and eight leadership portraits.

---

## 6. Build conventions

- Author as Design Components: one `.dc.html` per page or one file with all
  screens. Inline styles only — no page stylesheets, no CSS classes of your own
  beyond the design system's.
- Lay out sibling groups with flex/grid and `gap`, never inline-flow spacing or
  per-element margins.
- Fluid: `max-width`, not fixed `width`; grid tracks that wrap or use
  `minmax(0,1fr)`; no `nowrap` or fixed heights on boxes holding text.
- React-style attributes in templates: `defaultChecked="{{ true }}"`, not
  `checked`. Every non-void element explicitly closed, every attribute
  double-quoted.
- Define `a` and `a:hover` colours from the palette in `<helmet>` so
  user-added links never render browser blue.
- Accessibility: real heading order (one h1 per page), 4.5:1 contrast for body
  text and 3:1 for headline-scale type, labels on every form field, 44px minimum
  hit targets on mobile.

---

## 7. Definition of done

Check every item before calling a page finished.

- [ ] Industry stylesheet and bundle loaded; no hard-coded value a token carries.
- [ ] No rounded corners; no filled or shadowed cards; the primary button is the
      only solid object.
- [ ] Every `.blueprint` element has its corner marks.
- [ ] Barlow Condensed headings, Barlow body, no third typeface.
- [ ] One accent; body-size accent text uses `--color-accent-700`.
- [ ] Header identical on every page, current page marked, Donate present.
- [ ] Donate appears a second time in the body of the page.
- [ ] Vision, mission and the seven aims are verbatim per §4.1.
- [ ] All greeked copy and invented figures either replaced or explicitly flagged.
- [ ] Photographs duotoned, square, framed, marked — or still labelled placeholders.
- [ ] Reflows cleanly from 1280px down to 390px; nothing overlaps or overflows.
- [ ] Keyboard focus visible and themed; form fields labelled.
- [ ] No animation beyond simple hover and focus states.
