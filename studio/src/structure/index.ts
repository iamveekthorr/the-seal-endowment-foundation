import type { StructureResolver } from 'sanity/structure'
import type { ComponentType } from 'react'
import { HomeIcon } from '@sanity/icons/Home'
import { CogIcon } from '@sanity/icons/Cog'
import { HeartFilledIcon } from '@sanity/icons/HeartFilled'
import { RocketIcon } from '@sanity/icons/Rocket'
import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { CalendarIcon } from '@sanity/icons/Calendar'
import { InfoOutlineIcon } from '@sanity/icons/InfoOutline'
import { BarChartIcon } from '@sanity/icons/BarChart'
import { UsersIcon } from '@sanity/icons/Users'
import { EnvelopeIcon } from '@sanity/icons/Envelope'
import { BlockElementIcon } from '@sanity/icons/BlockElement'
import { UserIcon } from '@sanity/icons/User'
import { CommentIcon } from '@sanity/icons/Comment'
import { SINGLETON_TYPES } from '../schemaTypes'

// Explicit list items below (plus the singletons) that should NOT also show
// up a second time in the generic "everything else" list at the bottom.
const EXPLICIT_TYPES = new Set([
  ...SINGLETON_TYPES,
  'donation',
  'project',
  'person',
  'newsletterSubscriber',
  'enquiry',
])

// Singletons are enforced via Structure (fixed document ID), not a schema
// option — see the Sanity Studio Structure best-practice guide.
function singleton(
  S: Parameters<StructureResolver>[0],
  typeName: string,
  title: string,
  icon: ComponentType,
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName).title(title))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      singleton(S, 'homePage', 'Homepage', HomeIcon),
      singleton(S, 'aboutPage', 'About Page', InfoOutlineIcon),
      singleton(S, 'programmesPage', 'Programmes Page', RocketIcon),
      singleton(S, 'projectsImpactPage', 'Projects & Impact Page', BarChartIcon),
      singleton(S, 'newsEventsPage', 'News & Events Page', DocumentTextIcon),
      singleton(S, 'donatePage', 'Donate Page', HeartFilledIcon),
      singleton(S, 'leadershipPage', 'Leadership Page', UsersIcon),
      singleton(S, 'contactPage', 'Contact Page', EnvelopeIcon),
      singleton(S, 'siteSettings', 'Site Settings', CogIcon),
      singleton(S, 'donateSettings', 'Donate Settings', HeartFilledIcon),

      S.divider(),

      S.listItem().title('Programmes').icon(RocketIcon).child(
        S.documentTypeList('programme').title('Programmes'),
      ),
      S.listItem().title('Projects').icon(BlockElementIcon).child(
        S.documentTypeList('project').title('Projects').defaultOrdering([
          { field: 'year', direction: 'desc' },
        ]),
      ),
      S.listItem().title('News').icon(DocumentTextIcon).child(
        S.documentTypeList('newsItem').title('News').defaultOrdering([
          { field: 'publishedAt', direction: 'desc' },
        ]),
      ),
      S.listItem().title('Events').icon(CalendarIcon).child(
        S.documentTypeList('event').title('Events').defaultOrdering([
          { field: 'date', direction: 'asc' },
        ]),
      ),
      S.listItem().title('People').icon(UserIcon).child(
        S.documentTypeList('person').title('People').defaultOrdering([
          { field: 'group', direction: 'asc' },
          { field: 'order', direction: 'asc' },
        ]),
      ),

      S.divider(),

      S.listItem().title('Donations').icon(HeartFilledIcon).child(
        S.documentTypeList('donation').title('Donations').defaultOrdering([
          { field: 'createdAt', direction: 'desc' },
        ]),
      ),
      S.listItem().title('Enquiries').icon(CommentIcon).child(
        S.documentTypeList('enquiry').title('Enquiries').defaultOrdering([
          { field: 'submittedAt', direction: 'desc' },
        ]),
      ),
      S.listItem().title('Newsletter subscribers').icon(EnvelopeIcon).child(
        S.documentTypeList('newsletterSubscriber').title('Newsletter subscribers').defaultOrdering([
          { field: 'subscribedAt', direction: 'desc' },
        ]),
      ),

      S.divider(),

      // Anything added to the schema later shows up here automatically,
      // minus the types with an explicit entry above (which would
      // otherwise appear twice).
      ...S.documentTypeListItems().filter(
        (listItem) => !EXPLICIT_TYPES.has(listItem.getId() as string),
      ),
    ])
