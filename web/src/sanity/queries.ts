import { defineQuery } from 'groq'

// Shared projection for `creditedImage` fields — includes the LQIP blur data
// and dimensions (needed for next/image placeholder + aspect ratio) plus
// hotspot/crop so cropped renders respect the editor's chosen focal point.
const IMAGE_PROJECTION = /* groq */ `{
  asset->{
    _id,
    url,
    metadata { lqip, dimensions { width, height } }
  },
  alt,
  credit,
  hotspot,
  crop
}`

const CTA_PROJECTION = /* groq */ `{ label, href }`

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "homePage"][0]{
    hero{
      eyebrow,
      heading,
      body,
      image ${IMAGE_PROJECTION},
      primaryCta ${CTA_PROJECTION},
      secondaryCta ${CTA_PROJECTION}
    },
    visionEyebrow,
    visionStatement,
    missionEyebrow,
    missionStatement,
    missionNote,
    missionCta ${CTA_PROJECTION},
    focusAreas[]{ _key, title, description },
    stats[]{ _key, value, label }
  }
`)

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_id == "siteSettings"][0]{
    logo ${IMAGE_PROJECTION},
    siteName,
    siteNameSub,
    logoInitials,
    navLinks[]{ _key, label, href },
    footerTagline,
    footerColumns[]{
      _key,
      heading,
      links[]{ _key, label, href }
    },
    legalName,
    contactAddress,
    contactEmail,
    contactPhone
  }
`)

export const DONATE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_id == "donateSettings"][0]{
    heading,
    body,
    note,
    currency,
    suggestedAmounts
  }
`)

export const FEATURED_PROGRAMMES_QUERY = defineQuery(/* groq */ `
  *[_type == "programme" && featuredOnHome == true] | order(order asc) [0...3]{
    _id,
    title,
    category,
    description,
    image ${IMAGE_PROJECTION}
  }
`)

export const LATEST_NEWS_QUERY = defineQuery(/* groq */ `
  *[_type == "newsItem"] | order(publishedAt desc) [0...3]{
    _id,
    title,
    publishedAt,
    excerpt
  }
`)

export const UPCOMING_EVENTS_QUERY = defineQuery(/* groq */ `
  *[_type == "event" && date >= now()] | order(date asc) [0...2]{
    _id,
    title,
    date,
    location
  }
`)

// ---- About ----

export const ABOUT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "aboutPage"][0]{
    eyebrow,
    heading,
    intro,
    storyImage ${IMAGE_PROJECTION},
    storyHeading,
    storyParagraphs,
    aimsHeading,
    aimsIntro,
    aims
  }
`)

// ---- Programmes (full listing) ----

export const PROGRAMMES_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "programmesPage"][0]{ eyebrow, heading, intro }
`)

export const ALL_PROGRAMMES_QUERY = defineQuery(/* groq */ `
  *[_type == "programme"] | order(order asc){
    _id,
    title,
    category,
    description,
    image ${IMAGE_PROJECTION}
  }
`)

// ---- Projects & Impact ----

export const PROJECTS_IMPACT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "projectsImpactPage"][0]{
    eyebrow,
    heading,
    stats[]{ _key, value, label }
  }
`)

export const FEATURED_PROJECTS_QUERY = defineQuery(/* groq */ `
  *[_type == "project" && featured == true] | order(year desc) [0...2]{
    _id,
    ref,
    title,
    area,
    location,
    year,
    description,
    image ${IMAGE_PROJECTION}
  }
`)

export const ALL_PROJECTS_QUERY = defineQuery(/* groq */ `
  *[_type == "project"] | order(year desc, ref desc){
    _id,
    ref,
    title,
    area,
    location,
    year,
    status
  }
`)

// ---- News & Events (full listing) ----

export const NEWS_EVENTS_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "newsEventsPage"][0]{ heading, newsletterHeading, newsletterBody }
`)

export const ALL_NEWS_QUERY = defineQuery(/* groq */ `
  *[_type == "newsItem"] | order(publishedAt desc){
    _id,
    title,
    publishedAt,
    excerpt
  }
`)

export const ALL_UPCOMING_EVENTS_QUERY = defineQuery(/* groq */ `
  *[_type == "event" && date >= now()] | order(date asc){
    _id,
    title,
    date,
    location
  }
`)

// ---- Donate ----

export const DONATE_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "donatePage"][0]{
    eyebrow,
    heading,
    intro,
    givingTiers[]{ amount, description },
    otherWaysToGive
  }
`)

// ---- Leadership ----

export const LEADERSHIP_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "leadershipPage"][0]{ eyebrow, heading, intro }
`)

export const PEOPLE_QUERY = defineQuery(/* groq */ `
  *[_type == "person"] | order(group asc, order asc){
    _id,
    name,
    role,
    group,
    photo ${IMAGE_PROJECTION}
  }
`)

// ---- Contact ----

export const CONTACT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "contactPage"][0]{
    eyebrow,
    heading,
    intro,
    secretariatAddress,
    scholarshipsEmail,
    partnershipsEmail,
    mapImage ${IMAGE_PROJECTION}
  }
`)
