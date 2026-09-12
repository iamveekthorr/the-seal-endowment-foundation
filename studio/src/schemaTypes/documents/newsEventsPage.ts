import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons/DocumentText'

/**
 * Singleton — intro heading plus the newsletter sign-up box copy for the
 * full News & Events listing page. The listings themselves query every
 * `newsItem`/`event` document directly.
 */
export const newsEventsPage = defineType({
  name: 'newsEventsPage',
  title: 'News & Events Page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'News & events',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'newsletterHeading',
      title: 'Newsletter box heading',
      type: 'string',
      initialValue: 'Newsletter',
    }),
    defineField({
      name: 'newsletterBody',
      title: 'Newsletter box body',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'News & Events Page' }),
  },
})
