import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons/Users'

export const leadershipPage = defineType({
  name: 'leadershipPage',
  title: 'Leadership Page',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Leadership',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Board of Trustees & Executive Council',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro paragraph',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Leadership Page' }),
  },
})
