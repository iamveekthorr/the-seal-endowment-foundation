import { defineField, defineType, defineArrayMember } from 'sanity'
import { UlistIcon } from '@sanity/icons/Ulist'

export const footerColumn = defineType({
  name: 'footerColumn',
  title: 'Footer column',
  type: 'object',
  icon: UlistIcon,
  fields: [
    defineField({ name: 'heading', title: 'Column heading', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [defineArrayMember({ type: 'navLink' })],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { title: 'heading' },
  },
})
