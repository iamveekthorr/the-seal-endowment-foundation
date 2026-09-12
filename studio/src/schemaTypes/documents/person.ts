import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons/User'

export const person = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g. "Chairman, Board of Trustees", "Treasurer"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'group',
      title: 'Group',
      type: 'string',
      options: {
        list: [
          { title: 'Board of Trustees', value: 'trustees' },
          { title: 'Executive Council', value: 'executive' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Portrait',
      type: 'creditedImage',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first within the group.',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Group, then order',
      name: 'groupOrder',
      by: [
        { field: 'group', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})
