import { type SchemaTypeDefinition } from 'sanity'

// Objects (no _type document of their own — embedded inside documents)
import { ctaLink } from './objects/ctaLink'
import { navLink } from './objects/navLink'
import { footerColumn } from './objects/footerColumn'
import { stat } from './objects/stat'
import { focusArea } from './objects/focusArea'
import { creditedImage } from './objects/creditedImage'
import { heroSection } from './objects/heroSection'

// Documents
import { homePage } from './documents/homePage'
import { siteSettings } from './documents/siteSettings'
import { donateSettings } from './documents/donateSettings'
import { programme } from './documents/programme'
import { newsItem } from './documents/newsItem'
import { event } from './documents/event'
import { donation } from './documents/donation'
import { aboutPage } from './documents/aboutPage'
import { project } from './documents/project'
import { projectsImpactPage } from './documents/projectsImpactPage'
import { person } from './documents/person'
import { leadershipPage } from './documents/leadershipPage'
import { contactPage } from './documents/contactPage'
import { donatePage } from './documents/donatePage'
import { programmesPage } from './documents/programmesPage'
import { newsEventsPage } from './documents/newsEventsPage'
import { newsletterSubscriber } from './documents/newsletterSubscriber'
import { enquiry } from './documents/enquiry'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  homePage,
  siteSettings,
  donateSettings,
  programme,
  newsItem,
  event,
  donation,
  aboutPage,
  project,
  projectsImpactPage,
  person,
  leadershipPage,
  contactPage,
  donatePage,
  programmesPage,
  newsEventsPage,
  newsletterSubscriber,
  enquiry,
  // Objects
  ctaLink,
  navLink,
  footerColumn,
  stat,
  focusArea,
  creditedImage,
  heroSection,
]

// Singleton document types — see src/structure/index.ts, which locks each of
// these to a single fixed-ID document and excludes them from the generic
// document-type list.
export const SINGLETON_TYPES = new Set([
  'homePage',
  'siteSettings',
  'donateSettings',
  'aboutPage',
  'projectsImpactPage',
  'leadershipPage',
  'contactPage',
  'donatePage',
  'programmesPage',
  'newsEventsPage',
])
