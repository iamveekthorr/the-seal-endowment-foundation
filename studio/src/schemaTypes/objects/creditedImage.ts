import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons/Image'

/**
 * An image field with hotspot cropping plus alt text and an optional
 * photographer credit line — this site launched with photography from named
 * Nigerian photographers (Unsplash License), and the credit line lets that
 * carry through once real photos are uploaded here.
 */
export const creditedImage = defineType({
  name: 'creditedImage',
  title: 'Image',
  type: 'image',
  icon: ImageIcon,
  options: {
    hotspot: true, // lets editors control the focal point when the card/hero crops it
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      validation: (rule) => rule.required().warning('Alt text matters for SEO and screen readers.'),
    }),
    defineField({
      name: 'credit',
      title: 'Photo credit',
      type: 'string',
      description: 'Photographer\'s name only, e.g. "Fatima Yusuf" — the frontend adds the "Photo:" prefix. Optional — leave blank to hide.',
    }),
  ],
})
