import { defineField, defineType } from 'sanity'
import { BlockElementIcon } from '@sanity/icons/BlockElement'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'ref',
      title: 'Reference',
      type: 'string',
      description: 'e.g. "P-024"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'area',
      title: 'Area',
      type: 'string',
      description: 'e.g. Education, Healthcare, Community — matches a Programme category where relevant.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Ongoing', value: 'Ongoing' },
          { title: 'Completed', value: 'Completed' },
        ],
        layout: 'radio',
      },
      initialValue: 'Completed',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Photograph',
      type: 'creditedImage',
      description: 'Only needed for projects featured on the Projects & Impact page.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Projects & Impact',
      type: 'boolean',
      description: 'Featured projects show as the two large photo cards above the project register table.',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Year, newest first',
      name: 'yearDesc',
      by: [
        { field: 'year', direction: 'desc' },
        { field: 'ref', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: { title: 'title', ref: 'ref', year: 'year', media: 'image' },
    prepare: ({ title, ref, year, media }) => ({
      title,
      subtitle: [ref, year].filter(Boolean).join(' · '),
      media,
    }),
  },
})
