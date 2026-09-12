import { defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons/Link'

/**
 * A single call-to-action button/link. Kept deliberately simple (label + href)
 * rather than an internal/external reference toggle — this is a one-page site
 * where every link is either an in-page anchor (#donate) or a mailto/tel link,
 * so a reference resolver would be complexity with nothing to pay its rent.
 */
export const ctaLink = defineType({
  name: 'ctaLink',
  title: 'Button / link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'An in-page anchor (e.g. #donate), a path, or a full URL.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
})
