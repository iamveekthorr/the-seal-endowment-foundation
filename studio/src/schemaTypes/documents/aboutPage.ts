import { defineField, defineType, defineArrayMember } from 'sanity'
import { InfoOutlineIcon } from '@sanity/icons/InfoOutline'

/**
 * Singleton — locked to a single document via the Studio structure. The
 * Vision/Mission statements themselves live on `homePage` (the Foundation's
 * one verbatim wording, reused everywhere) — this document holds the extra
 * copy the About page adds around them: the intro, "Our story", and the
 * constitution's aims and objectives.
 */
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: InfoOutlineIcon,
  groups: [
    { name: 'intro', title: 'Intro' },
    { name: 'story', title: 'Our story' },
    { name: 'aims', title: 'Aims & objectives' },
  ],
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'intro',
      initialValue: 'About the Foundation',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'intro',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro paragraph',
      type: 'text',
      rows: 3,
      group: 'intro',
    }),
    defineField({
      name: 'storyImage',
      title: 'Story photograph',
      type: 'creditedImage',
      group: 'story',
    }),
    defineField({
      name: 'storyHeading',
      title: '"Our story" label',
      type: 'string',
      group: 'story',
      initialValue: 'Our story',
    }),
    defineField({
      name: 'storyParagraphs',
      title: 'Story paragraphs',
      type: 'array',
      group: 'story',
      of: [defineArrayMember({ type: 'text', rows: 3 })],
    }),
    defineField({
      name: 'aimsHeading',
      title: 'Heading',
      type: 'string',
      group: 'aims',
      initialValue: 'Aims and objectives',
    }),
    defineField({
      name: 'aimsIntro',
      title: 'Supporting line',
      type: 'string',
      group: 'aims',
      initialValue: "The seven principles set out in the Foundation's constitution.",
    }),
    defineField({
      name: 'aims',
      title: 'Aims (in order)',
      type: 'array',
      group: 'aims',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
})
