import { defineField, defineType } from 'sanity'
import { RocketIcon } from '@sanity/icons/Rocket'

export const programme = defineType({
  name: 'programme',
  title: 'Programme',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. Education, Healthcare, Culture & Heritage — shown as the small label above the title.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: 'image',
      title: 'Photograph',
      type: 'creditedImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredOnHome',
      title: 'Featured on homepage',
      type: 'boolean',
      description: 'Only featured programmes show in the homepage Programmes grid.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first among featured programmes.',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Featured order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
})
