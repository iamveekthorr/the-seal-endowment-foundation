import { defineField, defineType } from 'sanity'
import { NumberIcon } from '@sanity/icons/Number'

export const stat = defineType({
  name: 'stat',
  title: 'Stat',
  type: 'object',
  icon: NumberIcon,
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'Kept as text (not a number) so "1,240" and "1998" both render exactly as typed.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' },
  },
})
