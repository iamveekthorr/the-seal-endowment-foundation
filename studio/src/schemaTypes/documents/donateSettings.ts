import { defineField, defineType, defineArrayMember } from 'sanity'
import { HeartFilledIcon } from '@sanity/icons/HeartFilled'

export const donateSettings = defineType({
  name: 'donateSettings',
  title: 'Donate Settings',
  type: 'document',
  icon: HeartFilledIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Give to the endowment',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'note',
      title: 'Small print',
      type: 'string',
      description: 'e.g. "Bank transfer, card and diaspora giving supported."',
    }),
    defineField({
      name: 'currency',
      title: 'Currency code',
      type: 'string',
      initialValue: 'NGN',
      options: { list: [{ title: 'Nigerian Naira (NGN)', value: 'NGN' }] },
    }),
    defineField({
      name: 'suggestedAmounts',
      title: 'Suggested amounts',
      type: 'array',
      of: [defineArrayMember({ type: 'number' })],
      validation: (rule) => rule.min(1).max(6),
      initialValue: [10000, 50000, 250000],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Donate Settings' }),
  },
})
