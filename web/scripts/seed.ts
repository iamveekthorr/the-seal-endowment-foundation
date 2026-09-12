/**
 * Seeds Sanity with the approved Direction A copy/content so the site has
 * real content the moment `pnpm dev` is running against a fresh project.
 * Run with `pnpm seed` (needs SANITY_API_WRITE_TOKEN, plus the
 * NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET in .env).
 *
 * Safe to re-run: the three singletons (homePage/siteSettings/
 * donateSettings) are always overwritten via createOrReplace at their fixed
 * IDs; the ordinary documents (programme/newsItem/event) are only created
 * the first time — if any already exist, that section is skipped so
 * re-running the script doesn't duplicate content an editor may have since
 * changed.
 */
import { config } from 'dotenv'
import { createClient, type SanityClient } from '@sanity/client'

// dotenv's zero-config import only looks at `.env` in the current working
// directory, which is already where this project keeps its env file --
// load it explicitly anyway so this keeps working if that ever changes.
config({ path: '.env' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-01'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId) throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env')
if (!token) throw new Error('Missing SANITY_API_WRITE_TOKEN in .env')

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

// Unsplash originals used in the approved static mockup (homepage-a.html) —
// see the project root README for the full photographer credit table.
const IMAGES = {
  hero: {
    url: 'https://images.unsplash.com/photo-1780847614316-c9e933e9a9e0?auto=format&fit=crop&w=1800&q=90',
    credit: 'Omotayo Tajudeen',
    alt: 'A gathering in Ijebu Ode, Nigeria, celebrating community and heritage',
  },
  scholarship: {
    url: 'https://images.unsplash.com/photo-1628198661856-102874fb9d82?auto=format&fit=crop&w=1200&q=90',
    credit: 'Oyemike Princewill',
    alt: 'Students studying together',
  },
  medical: {
    url: 'https://images.unsplash.com/photo-1673280401347-309363111070?auto=format&fit=crop&w=1200&q=90',
    credit: 'Joshua Onadipe',
    alt: 'A medical outreach consultation',
  },
  culture: {
    url: 'https://images.unsplash.com/photo-1716386720732-bb17a526d3d0?auto=format&fit=crop&w=1200&q=90',
    credit: 'Fatima Yusuf',
    alt: 'A cultural festival celebrating Ika heritage',
  },
} as const

async function fetchWithRetry(url: string, attempts = 3, timeoutMs = 30_000): Promise<Response> {
  let lastErr: unknown
  for (let attempt = 1; attempt <= attempts; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const res = await fetch(url, { signal: controller.signal })
      clearTimeout(timer)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res
    } catch (err) {
      clearTimeout(timer)
      lastErr = err
      const reason = err instanceof Error ? err.message : String(err)
      console.warn(`  \u21b3 attempt ${attempt}/${attempts} failed (${reason})`)
      if (attempt < attempts) await new Promise((r) => setTimeout(r, attempt * 2000))
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr))
}

async function uploadImage(key: keyof typeof IMAGES, client: SanityClient) {
  const { url, credit, alt } = IMAGES[key]
  console.log(`Uploading image: ${key}…`)
  const res = await fetchWithRetry(url)
  const buffer = Buffer.from(await res.arrayBuffer())
  const asset = await client.assets.upload('image', buffer, { filename: `${key}.jpg` })
  return { _type: 'image' as const, asset: { _type: 'reference' as const, _ref: asset._id }, alt, credit }
}

async function seedSingletons(client: SanityClient) {
  // Sequential, not Promise.all: easier to see which specific photo is
  // failing if the network to images.unsplash.com is flaky, and avoids
  // opening four connections into a struggling link at once.
  const heroImage = await uploadImage('hero', client)
  const scholarshipImage = await uploadImage('scholarship', client)
  const medicalImage = await uploadImage('medical', client)
  const cultureImage = await uploadImage('culture', client)

  console.log('Writing homePage…')
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    hero: {
      eyebrow: 'Ika Heritage · Fellowship · Philanthropy',
      heading: 'A family connected by heritage, committed to one another.',
      body: 'The Seals Endowment Foundation unites people of Ika origin worldwide in fellowship, mutual support, and the advancement of our shared heritage.',
      image: heroImage,
      primaryCta: { label: 'Support the endowment', href: '/donate' },
      secondaryCta: { label: 'About the Foundation', href: '/about' },
    },
    visionEyebrow: 'Our Vision',
    visionStatement:
      'To build a united, prosperous and enduring community of people of Ika origin, where members support one another, preserve their cultural heritage, empower future generations, and contribute meaningfully to the development and wellbeing of society.',
    missionEyebrow: 'Our Mission',
    missionStatement:
      'To foster unity, mutual support and the socioeconomic wellbeing of people of Ika origin, while preserving our cultural heritage, empowering future generations, and contributing to the development of our communities and society through philanthropy, education and sustainable initiatives.',
    missionNote:
      'Founded in 1998, the Foundation today connects six chapters and over four hundred members across the diaspora.',
    missionCta: { label: 'Read our story', href: '/about' },
    focusAreas: [
      { _key: 'education', title: 'Education & Scholarships', description: 'Tuition support, scholarships and mentoring for students of Ika origin.' },
      { _key: 'youth', title: 'Youth Development', description: 'Leadership training, skills acquisition and mentorship programmes for young people.' },
      { _key: 'women', title: 'Women & Family Development', description: 'Empowerment initiatives supporting women and family welfare across chapters.' },
      { _key: 'healthcare', title: 'Healthcare', description: 'Medical outreaches, health screening and support for community wellbeing.' },
      { _key: 'community', title: 'Community Development', description: 'Infrastructure and welfare projects that strengthen communities in Ika land.' },
      { _key: 'economic', title: 'Economic Empowerment', description: 'Grants, cooperative funds and support for sustainable livelihoods.' },
      { _key: 'entrepreneurship', title: 'Entrepreneurship', description: 'Seed funding and business mentoring for members building new ventures.' },
      { _key: 'culture', title: 'Culture & Heritage', description: 'Preserving the Ika language, customs and cultural practices for future generations.' },
      { _key: 'leadership', title: 'Leadership Development', description: 'Preparing the next generation of leaders within the Ika community.' },
    ],
    stats: [
      { _key: 'scholarships', value: '1,240', label: 'Scholarships awarded' },
      { _key: 'projects', value: '38', label: 'Community projects' },
      { _key: 'chapters', value: '6', label: 'Chapters worldwide' },
      { _key: 'founded', value: '1998', label: 'Founded' },
    ],
  })

  console.log('Writing siteSettings…')
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'THE SEALS',
    siteNameSub: 'Endowment Foundation',
    logoInitials: 'SEF',
    navLinks: [
      { _key: 'about', label: 'About', href: '/about' },
      { _key: 'programmes', label: 'Programmes', href: '/programmes' },
      { _key: 'impact', label: 'Projects & Impact', href: '/projects-impact' },
      { _key: 'news', label: 'News & Events', href: '/news-events' },
      { _key: 'leadership', label: 'Leadership', href: '/leadership' },
      { _key: 'contact', label: 'Contact', href: '/contact' },
    ],
    footerTagline: 'A socio-cultural and philanthropic organisation serving people of Ika origin since 1998.',
    footerColumns: [
      {
        _key: 'foundation',
        heading: 'Foundation',
        links: [
          { _key: 'about', label: 'About', href: '/about' },
          { _key: 'vision', label: 'Vision & Mission', href: '/about' },
          { _key: 'leadership', label: 'Leadership', href: '/leadership' },
        ],
      },
      {
        _key: 'work',
        heading: 'Work',
        links: [
          { _key: 'programmes', label: 'Programmes', href: '/programmes' },
          { _key: 'impact', label: 'Projects & Impact', href: '/projects-impact' },
          // No standalone Reports page exists yet — Projects & Impact's
          // project register is the closest real destination for now.
          { _key: 'reports', label: 'Reports', href: '/projects-impact' },
        ],
      },
    ],
    legalName: 'The Seals Endowment Foundation',
    contactAddress: 'Agbor, Delta State',
    contactEmail: 'info@sealsfoundation.org',
    contactPhone: '+234 000 000 0000',
  })

  console.log('Writing donateSettings…')
  await client.createOrReplace({
    _id: 'donateSettings',
    _type: 'donateSettings',
    heading: 'Give to the endowment',
    body: 'Your support funds scholarships, healthcare outreach and community projects across Ika land and the diaspora.',
    note: 'Bank transfer, card and diaspora giving supported.',
    currency: 'NGN',
    suggestedAmounts: [10000, 50000, 250000],
  })

  return { scholarshipImage, medicalImage, cultureImage }
}

async function seedProgrammes(
  client: SanityClient,
  images: { scholarshipImage: unknown; medicalImage: unknown; cultureImage: unknown },
) {
  const existing = await client.fetch<number>(`count(*[_type == "programme"])`)
  if (existing > 0) {
    console.log(`Skipping programmes — ${existing} already exist.`)
    return
  }
  console.log('Creating programmes…')
  await Promise.all([
    client.create({
      _type: 'programme',
      title: 'The Seals Scholars Programme',
      category: 'Education',
      description: 'Annual scholarships and tuition grants supporting Ika students through secondary and tertiary education.',
      image: images.scholarshipImage,
      featuredOnHome: true,
      order: 1,
    }),
    client.create({
      _type: 'programme',
      title: 'Annual Medical Outreach',
      category: 'Healthcare',
      description: 'Free health screening, consultations and medicine distribution across Ika communities.',
      image: images.medicalImage,
      featuredOnHome: true,
      order: 2,
    }),
    client.create({
      _type: 'programme',
      title: 'Ika Language & Culture Project',
      category: 'Culture & Heritage',
      description: 'Documenting and teaching Ika language, festivals and customs to the next generation.',
      image: images.cultureImage,
      featuredOnHome: true,
      order: 3,
    }),
  ])
}

async function seedNews(client: SanityClient) {
  const existing = await client.fetch<number>(`count(*[_type == "newsItem"])`)
  if (existing > 0) {
    console.log(`Skipping news — ${existing} already exist.`)
    return
  }
  console.log('Creating news items…')
  await Promise.all([
    client.create({
      _type: 'newsItem',
      title: 'Foundation opens 2026 scholarship applications',
      publishedAt: '2026-08-12T09:00:00.000Z',
      excerpt: 'Applications for the annual Seals Scholars Programme are now open to qualifying students of Ika origin.',
    }),
    client.create({
      _type: 'newsItem',
      title: 'Medical outreach reaches Owa-Oyibu community',
      publishedAt: '2026-07-30T09:00:00.000Z',
      excerpt: 'Over 600 residents received free health screening and consultations during the July outreach.',
    }),
    client.create({
      _type: 'newsItem',
      title: "Women's cooperative fund disburses first grants",
      publishedAt: '2026-07-04T09:00:00.000Z',
      excerpt: 'Twelve women-led enterprises received startup grants under the new empowerment fund.',
    }),
  ])
}

async function seedEvents(client: SanityClient) {
  const existing = await client.fetch<number>(`count(*[_type == "event"])`)
  if (existing > 0) {
    console.log(`Skipping events — ${existing} already exist.`)
    return
  }
  console.log('Creating events…')
  await Promise.all([
    client.create({
      _type: 'event',
      title: 'Annual General Meeting',
      date: '2026-09-14T10:00:00.000Z',
      location: 'Agbor, Delta State · 10:00 WAT',
    }),
    client.create({
      _type: 'event',
      title: 'Scholarship Awards Night',
      date: '2026-11-02T18:00:00.000Z',
      location: 'Asaba · By invitation',
    }),
  ])
}

async function main() {
  const images = await seedSingletons(client)
  await Promise.all([seedProgrammes(client, images), seedNews(client), seedEvents(client)])
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
