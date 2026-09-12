# The Seals Endowment Foundation — Style Guide

The visual and editorial standard for the SEF website. Read this before building
any page, including pages not in the mockup. Where this guide and the Industry
design system disagree, Industry wins — this guide only narrows Industry's choices
to the ones SEF uses.

Companion files:

- `BUILD-SPEC.md` — what to build, page by page, and the verbatim Foundation copy.
- `Seals Endowment Foundation.dc.html` — the mockups. Authoritative for layout.
- `_ds/industry-55bbef6d-e9eb-4eb5-9a61-075f6ca2d883/styles.css` — the tokens.
  The source of truth for every value below.

---

## 1. Character

A wireframe of an institution. The site should read like a well-drawn technical
document: steel blue on light grey paper, condensed headings, hairline rules,
registration marks at the corners of every framed object. Composed and durable,
not energetic. The Foundation is nearly thirty years old and its members are adults
in mid to late career; the site should look like it will still be correct in ten
years.

Nothing decorative. Structure does the work — grid, rule, whitespace, and one
accent colour used sparingly.

### Never

Gradients as backgrounds · drop shadows on cards · rounded corners · emoji ·
a second accent colour · italic display type · all-caps body copy · centred
paragraphs · carousels · parallax · scroll-triggered reveals · animated counters ·
stock-photo "diverse team pointing at a laptop" imagery · icons at heavy stroke
weights · more than two typefaces · full-width hero video.

---

## 2. Colour

### Tokens

| Token             | Value            | Use                                            |
| ----------------- | ---------------- | ---------------------------------------------- |
| `--color-bg`      | `#f2f2f3`        | The page ground. Every page.                   |
| `--color-surface` | `#e9e9ea`        | Rarely. Prefer a bordered box on the ground.   |
| `--color-text`    | `#1d1f20`        | Headings and emphasised text.                  |
| `--color-divider` | `#1d1f20` at 16% | Every hairline, every card border, every rule. |
| `--color-accent`  | `#5980a6`        | Links, arrows, icons, active states, chrome.   |

### Neutral ramp — text and rules

| Step                  | Value     | Use                                                |
| --------------------- | --------- | -------------------------------------------------- |
| `--color-neutral-300` | `#d4d4d7` | Text on the dark footer.                           |
| `--color-neutral-700` | `#5d5d60` | Meta, captions, dates, section labels, form hints. |
| `--color-neutral-800` | `#424244` | Body paragraphs.                                   |
| `--color-neutral-900` | `#2b2b2d` | Reserved.                                          |

Do not use 400–600 for text on the light ground — they fail 4.5:1.

### Accent ramp

| Step                 | Value     | Use                                                              |
| -------------------- | --------- | ---------------------------------------------------------------- |
| `--color-accent-100` | `#eef6ff` | Tinted panels (newsletter box, callouts). Sparingly.             |
| `--color-accent-300` | `#b5d9fd` | Labels and captions **on** accent-900 fields.                    |
| `--color-accent-400` | `#94bce3` | Kickers on accent-900; hover state on dark.                      |
| `--color-accent-500` | `#749dc4` | Footer column labels.                                            |
| `--color-accent-600` | `#597ea3` | Pressed state on light.                                          |
| `--color-accent-700` | `#416180` | **Accent text at body size.** Eyebrows, large numerals on paper. |
| `--color-accent-900` | `#1d2d3d` | Reversed fields: stat bands, the vision panel, the footer.       |

### The three grounds

The site has exactly three background treatments. Do not invent a fourth.

1. **Paper** — `--color-bg`. The default. Most of every page.
2. **Steel field** — `--color-accent-900`, text `#f2f2f3`, labels
   `--color-accent-300`. Used for statistic bands, the vision statement, and
   the footer. At most two steel fields per page.
3. **Solid accent band** — `--color-accent`, text `#f2f2f3`. Reserved for the
   donate call to action, and only in the type-led homepage direction.

### Contrast rules

- Body text: 4.5:1 minimum. Headline-scale type (28px+): 3:1 minimum.
- `--color-accent` on paper is 3:1 — fine for links, arrows, icons, active nav
  and large type; **not** for paragraphs. Use `--color-accent-700`.
- Never set type in a `color-mix()` or alpha-reduced colour. Pick a ramp step.
- On the steel field, type is full-opacity `#f2f2f3`, never a tinted white.

---

## 3. Typography

Two families, both loaded by the stylesheet.

- **Barlow Condensed** (`--font-heading`), weight 600 — all headings, plus
  numerals, dates, project refs, event day numbers and card kickers. Condensed
  type is the system's signature; use it anywhere a short label or a number
  needs to sit tight.
- **Barlow** (`--font-body`), weight 400/500/700 — body copy, form fields,
  navigation, buttons, table cells.

### Scale as used on this site

| Role                | Size        | Family    | Notes                                                         |
| ------------------- | ----------- | --------- | ------------------------------------------------------------- |
| Hero headline       | 46–74px     | Condensed | `line-height: 0.98–1.05`. 74px only on the type-led homepage. |
| Page h1             | 50–56px     | Condensed | `max-width: 18–22ch`.                                         |
| Section h2          | 26–34px     | Condensed |                                                               |
| Pull quote / vision | 27–29px     | Condensed | `line-height: 1.24–1.26`.                                     |
| h3                  | 25px        | Condensed |                                                               |
| Card title / h4     | 19–21px     | Condensed | `line-height: 1.15–1.2`.                                      |
| Big numeral         | 30–46px     | Condensed | `line-height: 1`.                                             |
| Lead paragraph      | 16px        | Barlow    | `line-height: 1.7`, `max-width: 60–70ch`.                     |
| Body                | 14.5–15.5px | Barlow    | `line-height: 1.7–1.75`.                                      |
| Card body / table   | 13–14px     | Barlow    |                                                               |
| Meta, date, caption | 12–13px     | Barlow    | `--color-neutral-700`.                                        |
| Eyebrow / kicker    | 11px        | Barlow    | Uppercase, `letter-spacing: .18–.20em`.                       |
| Wordmark subline    | 9.5px       | Barlow    | Uppercase, `letter-spacing: .22em`. Wordmark only.            |

Nothing below 11px, and 9.5px only in the wordmark lockup.
Add `text-wrap: pretty` to headings. Never justify text. Never centre a paragraph
longer than one line.

---

## 4. Layout

- **Design width** 1280px. Fluid below: `max-width`, not fixed `width`;
  `minmax(0,1fr)` tracks; no fixed heights on boxes holding text.
- **Gutter** 40px desktop, 24px tablet, 18px mobile.
- **Section padding** 52–72px vertical desktop, 26–32px mobile.
- **Spacing** from `--space-1`…`--space-8` (3.4 / 6.8 / 10.2 / 13.6 / 20.4 / 27.2px)
  for component-internal spacing. Section-scale spacing uses the numbers above.
- **Gaps** 28–32px between cards, 48–56px between major columns.
- **Column splits** in use: `1fr 1fr`, `1.15fr 1fr`, `1.4fr 1fr`, `1.5fr 1fr`,
  `1.55fr 1fr`, and `280px 1fr` for a label column beside text.
- **Hairline grids** — for cell blocks (focus areas, aims, giving levels), put
  `gap: 1px` on a `--color-divider` background with a 1px outer border so cells
  share single rules rather than doubling them.
- **Breakpoints** — 1024px: four-up grids become two-up, side-by-side columns
  stack. 768px: three-up becomes two-up, nav collapses to a hamburger with the
  Donate button still visible. 480px: everything single column except the
  two-up focus grid and the 2×2 stat band.
- Always lay out sibling groups with flex/grid and `gap`. Never inline-flow
  spacing, never per-element margins for rhythm.

---

## 5. Components

Use the design system's classes. Do not write parallel ones.

### Blueprint frame

`.blueprint` + four `<i class="corner tl|tr|bl|br">` children. 1px border,
square corners, transparent. Applied to: primary content cards, framed
photographs, form panels, event cards, stat plates.

Full four-mark treatment on anything 200px or larger. Two marks (`tl` + `br`)
are permitted on small figures and thumbnails. Zero marks on a bordered element
is wrong — use a plain 1px border and no `.blueprint` class instead.

### Buttons

| Class                | Use                  | Rule                                                                     |
| -------------------- | -------------------- | ------------------------------------------------------------------------ |
| `.btn.btn-primary`   | Donate, form submit  | The only solid object on the page. One per view, plus the header Donate. |
| `.btn.btn-secondary` | Outlined alternative | "About the Foundation", "Older stories", "Full calendar".                |
| `.btn.btn-ghost`     | Inline text action   | "Read our story →". Zero left padding when it sits under a paragraph.    |
| `.btn.btn-block`     | Full width           | Mobile, and inside narrow panels.                                        |

Padding as used: 10–13px vertical, 20–22px horizontal. Mobile buttons 44px
minimum height. Arrow suffix `→` on "read more" style links; never a chevron icon.

### Tags

`.tag-accent` for the active filter and "Ongoing" status. `.tag-neutral` for
"Completed". `.tag-outline` for inactive filters and unselected amount chips.
7–9px vertical / 14–16px horizontal padding, 12.5–13px. Do not use `.tag-accent-2`
— this is a mono palette.

### Cards

`.card` with `.card-kicker` / `.card-title` / `.card-body` / `.card-meta`.
Transparent, hairline border, corner marks. Never `.elev-*` on a content card —
elevation is for dialogs only.

### Forms

`.field` + `label`, `.input`, `.radio` + `.dot`, `.seg` + `.seg-opt`. Every field
gets a visible label above it, 11px uppercase or 13px sentence case — consistent
within a form. Forms live inside a `.blueprint` panel. In DC templates use
`defaultChecked="{{ true }}"`, not `checked`.

### Tables

`.table`. Right-align nothing except numeric columns. Ref and year columns get
fixed widths; the name column flexes. Status as a tag in the last column.

### Index rows

The type-led homepage's list pattern: a grid of `52px 300px 1fr 24px` —
condensed accent number, condensed title, Barlow description, accent arrow —
with a 1px bottom border and 15px vertical padding. Use this instead of a card
grid when a list is long and its items are text-only.

### Navigation

Header: bordered 34px `SEF` mark, wordmark lockup, 14px link row, Donate button.
Current page link in `--color-accent`. 1px bottom border. Not sticky.

### Footer

`--color-accent-900`. Four columns on desktop: wordmark + description, Foundation,
Work, Contact. Column labels 11px uppercase `--color-accent-500`. Links
`--color-accent-2-400`. A top rule above the copyright line.

---

## 6. Imagery

- Every content photograph goes through `.duotone` — desaturated and washed into
  the accent. No full-colour photographs anywhere.
- Framed square with a hairline border and registration marks. Never rounded,
  never circular, never soft-clipped, never feathered into the background.
- Aspect ratios in use: hero 1280×620, wide strip 1280×180, section band 1280×260,
  card 1fr×170–190, featured project 1fr×240, portrait 1fr×230 (≈3:4),
  news thumbnail 150×92.
- Subjects: real members, real events, real projects. People doing something, not
  posed groups. Where no photograph exists, keep the labelled placeholder — an
  honest placeholder is better than a stock image.
- Every image needs alt text describing the subject, not the composition.

---

## 7. Icons

Lucide, stroke-width 1.5, `currentColor`, 16–20px at interface sizes. Icons
support labels; they do not replace them. No icon-only buttons except a
hamburger and a close. Never an icon inside a heading. Never a decorative icon
beside a section title.

---

## 8. Interaction

- **Links** — `--color-accent`, no underline in navigation and cards, underline
  on hover; underlined inline in body copy. Define `a` and `a:hover` colours
  explicitly so nothing renders browser blue.
- **Hover** — a tint one step past the base (`--color-accent-600` on light,
  `--color-accent-400` on dark) or a `color-mix()` tint on outlined variants.
  Row hovers get an `--color-accent-100` background. No lift, no scale, no shadow.
- **Pressed** — one further step down the ramp.
- **Focus** — `outline: 2px solid var(--color-accent); outline-offset: 2px` on
  `:focus-visible`. Never removed, never replaced with a colour change alone.
- **Disabled** — 45% opacity, `cursor: not-allowed`.
- **Transitions** — 120–160ms `ease` on colour and border only. Never on
  transform, size or position.
- **Motion** — none beyond the above. Honour `prefers-reduced-motion` if any
  transition is ever added.

---

## 9. States

Every page that loads data needs these, styled as bordered panels on the paper
ground, never as illustrations.

- **Empty** — a condensed heading stating what is absent ("No events scheduled"),
  one 14px line of explanation, and a secondary button to the nearest useful page.
- **Loading** — a hairline-bordered block at the content's height with a
  `--color-surface` fill. No spinners, no shimmer animation.
- **Error** — a bordered panel, heading, one line, and a retry secondary button.
  No red unless the error is destructive.
- **Form validation** — inline below the field, 12px, `--color-accent-700`, with
  the field border switching to the same colour. Validate on blur, not on keystroke.
- **Success** — replace the form with a bordered confirmation panel; do not use a
  toast.
- **404** — the standard header and footer, a condensed h1, one line, and links to
  the four most-used pages.

---

## 10. Editorial

### Voice

Plain, factual, unhurried. State what the Foundation does and has done. Write for
a member reading carefully, not a visitor skimming.

### Rules

- Sentence case for headings and buttons. Title Case only for proper nouns and
  formal body names (Board of Trustees, Executive Council).
- No marketing superlatives, no rhetorical questions, no "imagine", no
  "we're excited to", no exclamation marks, no em-dash-heavy constructions,
  no "this, not that" antithesis.
- Buttons name the action: "Donate", "Send enquiry", "Continue to payment".
  Never "Submit", "Click here", "Learn more" as a standalone button.
- Nigerian English. Spell out "the Foundation" on first mention per page, "SEF"
  thereafter. "Ika" is never abbreviated.
- Dates: `12 Aug 2026` in lists and meta; `14 SEP` split across two lines on event
  cards; `12 August 2026` in body copy.
- Currency: `₦10,000` with the naira sign and thousands separators. Large sums
  as `₦186m`. No decimals.
- Numbers: figures for quantities and statistics, words for one to nine in prose.
- Never state a statistic, name, date or amount that has not been confirmed by
  the Foundation. Use a visible placeholder instead.

### Length limits

Eyebrow ≤ 6 words · page h1 ≤ 8 words · section h2 ≤ 5 words · card title
≤ 6 words · card description ≤ 20 words · lead paragraph ≤ 45 words ·
news standfirst ≤ 25 words.

---

## 11. Accessibility and performance

- One h1 per page; heading levels in order with none skipped.
- Landmarks: `header`, `nav`, `main`, `footer`. Skip link to `main`.
- Every form control has a programmatically associated label. Radio groups in a
  `fieldset` with a `legend`.
- All functionality reachable by keyboard in a sensible tab order.
- 44px minimum hit targets on touch.
- Alt text on every content image; `alt=""` on anything decorative.
- Target: usable on a 3G connection. Photographs compressed and lazy-loaded
  below the fold; no web fonts beyond the two Barlow families; no JavaScript
  required to read any page.
- Support current Chrome, Safari, Firefox and Edge, and Safari on iOS 16+.

---

## 12. Quick check

- [ ] Industry stylesheet and bundle loaded; no hard-coded value a token carries.
- [ ] Three grounds only — paper, steel field, accent band.
- [ ] Square corners; cards transparent and hairline-bordered; no card shadows.
- [ ] Every `.blueprint` has its corner marks.
- [ ] Barlow Condensed headings and numerals, Barlow body, nothing else.
- [ ] Body-size accent text uses `--color-accent-700`.
- [ ] One solid primary button per view, plus the header Donate.
- [ ] Photographs duotoned, square, framed — or honest labelled placeholders.
- [ ] Focus ring themed and present on every interactive element.
- [ ] Copy follows §10; no unconfirmed figures, names or dates.
- [ ] Reflows cleanly 1280 → 390 with nothing overlapping.
- [ ] No motion beyond 120–160ms colour transitions.
