import { defineField, defineType } from 'sanity'
import { RocketIcon } from '@sanity/icons/Rocket'

/**
 * Singleton — just the intro copy for the full Programmes listing page.
 * The listing itself queries every `programme` document directly; the
 * category filter tags on the page are derived from those documents'
 * `category` field rather than duplicated here.
 */
export const programmesPage = defineType({
  name: 'programmesPage',
  title: 'Programmes Page',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Programmes',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Nine areas of intervention.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro paragraph',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Programmes Page' }),
  },
})
