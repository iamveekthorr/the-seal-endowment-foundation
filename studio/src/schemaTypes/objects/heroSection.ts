import { defineField, defineType } from 'sanity'
import { ImagesIcon } from '@sanity/icons/Images'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small label above the heading, e.g. "Ika Heritage · Fellowship · Philanthropy".',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Hero photograph',
      type: 'creditedImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary button',
      type: 'ctaLink',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary button',
      type: 'ctaLink',
    }),
  ],
})
