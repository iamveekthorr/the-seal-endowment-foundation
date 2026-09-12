import { defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons/Link'

export const navLink = defineType({
  name: 'navLink',
  title: 'Nav link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'href', title: 'Link', type: 'string', validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
})
