# The Seals Endowment Foundation

The live site: a Next.js frontend (Direction A, pixel-matched to the approved
mockup) wired to a standalone Sanity Studio for content, with donations
handled by Cyberpay's hosted cashier.

```
seals-endowment-foundation/
├── homepage-a.html, homepage-b.html, css/    ← the original static mockups (kept for reference)
├── cms-comparison.md                          ← CMS options considered before choosing Sanity
├── studio/                                    ← Sanity Studio (content editing)
└── web/                                       ← Next.js site (what visitors see)
```

## Why this shape

- **React + Next.js (App Router)**, not a plain SPA — this is a donor-facing
  nonprofit site, so pages need to be server-rendered for SEO and fast first
  paint (see the senior-architect Frontend Architecture guide's SSR/SSG/ISR
  matrix — a client-only SPA would hide every page's content from search
  engines and social-share previews until JS runs).
- **Sanity as a standalone Studio**, not embedded inside the Next.js app —
  this is Sanity's own recommended pattern: the Studio and the website
  deploy, scale and version independently.
- **Tailwind CSS v4**, configured with the exact design tokens (colours,
  fonts, spacing) from the approved mockup's `css/styles.css`, so the
  rebuilt pages are visually identical rather than "inspired by."
- **Cyberpay** for donations, via its hosted-cashier flow: the donor is
  redirected to a Cyberpay-hosted payment page (card, bank transfer, etc.)
  and back; a webhook confirms the payment server-side rather than trusting
  the browser redirect.

## One-time setup

You'll do this part yourself — the environment this was built in has no
access to the npm registry or to Sanity's login flow, so nothing below has
been `pnpm install`-ed or run yet. Everything is hand-written and should
work, but treat the first `pnpm install` + `pnpm dev` as the real first test.

### 1. Node via fnm, and pnpm

```bash
# if you don't have fnm yet: https://github.com/Schniz/fnm#installation
cd studio && fnm use   # reads studio/.node-version (22)
corepack enable        # gives you the pnpm version pinned in package.json
```

Repeat `fnm use` in `web/` too (same `.node-version`).

### 2. Create the Sanity project

```bash
cd studio
pnpm dlx sanity@latest init --env
```

Choose "Create new project", name it "Seals Endowment Foundation", dataset
`production`. This writes `studio/.env` with `SANITY_STUDIO_PROJECT_ID` and
`SANITY_STUDIO_DATASET` — `sanity.cli.ts` and `sanity.config.ts` already
read those. Grab the project ID from there for step 4.

Then, still in `studio/`:

```bash
pnpm install
pnpm dev       # Studio at http://localhost:3333
```

### 3. Create a Sanity API token

In [sanity.io/manage](https://sanity.io/manage) → your project → API →
Tokens, create two tokens:
- **Viewer** rights — this is `SANITY_API_READ_TOKEN` in `web/.env.local`.
- **Editor** rights — this is `SANITY_API_WRITE_TOKEN` in `web/.env.local`
  (used by `pnpm seed` and by the donate/webhook routes to log donations).

### 4. Configure the web app

```bash
cd web
cp .env.local.example .env.local
```

Fill in:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` — from step 2
- `SANITY_API_READ_TOKEN` / `SANITY_API_WRITE_TOKEN` — from step 3
- `CYBERPAY_API_KEY` / `CYBERPAY_BASE_URL` — from your Cyberpay merchant
  dashboard; use the `*.test.cyberpay.link` key while developing
- `CYBERPAY_SIGNATURE_KEY` — the webhook *signature* secret (Cyberpay
  dashboard → Webhooks), not the API key
- `NEXT_PUBLIC_SITE_URL` — `http://localhost:3000` for local dev

Then:

```bash
pnpm install
pnpm seed      # uploads the Unsplash photos + writes the approved copy into Sanity
pnpm dev       # site at http://localhost:3000
```

### 5. Point Cyberpay's webhook at your site

In the Cyberpay dashboard, set the payment webhook URL to
`{NEXT_PUBLIC_SITE_URL}/api/donate/webhook`. In local dev that needs a
public tunnel (ngrok or similar) since Cyberpay can't reach `localhost`.

## Content model (Sanity Studio)

| Type | Kind | Purpose |
|---|---|---|
| Homepage | Singleton | Hero, vision/mission, 9 areas of focus, stats band |
| Site Settings | Singleton | Brand, nav links, footer, contact details |
| Donate Settings | Singleton | Donate panel heading/body/suggested amounts |
| Programme | List | Programme cards (education, healthcare, culture, …) |
| News | List | News & updates items |
| Event | List | Upcoming events |
| Donation | List, system-written | Payment log — created by `/api/donate`, updated by the Cyberpay webhook. Not meant to be hand-authored. |

Singletons are locked to one document each via the Studio's custom
Structure (`studio/src/structure/index.ts`) rather than a schema option —
see the Sanity Studio Structure guide for why.

## Donations flow

1. Donor picks/enters an amount and email in the `DonatePanel` component and
   submits.
2. `POST /api/donate` creates a Cyberpay hosted-cashier session
   (`POST /payment-session`), logs a `donation` document in Sanity with
   status `pending`, and returns the cashier URL.
3. The browser redirects to Cyberpay's hosted cashier to complete payment.
4. Cyberpay redirects the donor back to `/donate/thank-you?ref=…` — but the
   page shown there reads its status from Sanity, not from the redirect
   itself (redirects aren't a trustworthy payment confirmation).
5. Cyberpay also calls `POST /api/donate/webhook` server-to-server; after
   verifying the `X-Signature` header (HMAC-SHA256 with
   `CYBERPAY_SIGNATURE_KEY`), that route updates the `donation` document's
   status to `completed` / `declined` / `refunded`. This webhook call is the
   authoritative confirmation.

## Visual Editing

`studio/sanity.config.ts` includes the Presentation tool, and
`web/src/app/layout.tsx` renders `<VisualEditing />` in draft mode, so
editors can click into content directly from a live preview of the site.
Requires `web`'s dev server running at the URL in
`SANITY_STUDIO_PREVIEW_URL` (defaults to `http://localhost:3000`).

## Re-skinning

The accent colour and fonts are still centralised, now as Tailwind v4
`@theme` tokens in `web/src/app/globals.css` (ported 1:1 from the original
`css/styles.css`). Swap `--color-accent` / `--color-accent-dark` for one of
the alternate palettes documented in that file's comments to re-skin without
touching component code.

## Images

The photographs seeded by `pnpm seed` are the same five free, Nigerian-
photographer-credited Unsplash images used in the original mockup — see
`cms-comparison.md`'s sibling, the original `README.md`'s credit table, for
the photographer names and links. The seed script uploads them into Sanity's
own asset pipeline (so they're properly hosted, resized and served from
Sanity's CDN) rather than hotlinking `images.unsplash.com` the way the
static mockup did.

## What's still a placeholder

- **Cyberpay keys** — you'll need a real merchant account; the code targets
  the documented hosted-cashier + webhook API but hasn't been exercised
  against live credentials.
- **Package versions** — every `package.json` here was hand-written (no
  `npm install` was possible in the environment this was built in), pinned
  to what was confirmed as current at build time. Run `pnpm outdated` after
  your first install and bump anything newer.
- **Email receipts** — the webhook has a `TODO` where a donor receipt email
  would send once an email provider is wired up.
