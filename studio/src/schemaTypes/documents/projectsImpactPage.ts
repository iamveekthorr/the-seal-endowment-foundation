import { defineField, defineType, defineArrayMember } from 'sanity'
import { BarChartIcon } from '@sanity/icons/BarChart'

export const projectsImpactPage = defineType({
  name: 'projectsImpactPage',
  title: 'Projects & Impact Page',
  type: 'document',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Projects & impact',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stats',
      title: 'Impact stats band',
      type: 'array',
      of: [defineArrayMember({ type: 'stat' })],
      validation: (rule) => rule.max(4).warning('The stats band lays out best with 4 figures.'),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Projects & Impact Page' }),
  },
})
