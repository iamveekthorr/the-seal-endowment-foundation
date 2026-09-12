import { defineField, defineType } from 'sanity'
import { UlistIcon } from '@sanity/icons/Ulist'

export const focusArea = defineType({
  name: 'focusArea',
  title: 'Focus area',
  type: 'object',
  icon: UlistIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(200).warning('Keep it short — this renders as a compact card.'),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
})
