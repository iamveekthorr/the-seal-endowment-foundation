import { defineField, defineType, defineArrayMember } from 'sanity'
import { HomeIcon } from '@sanity/icons/Home'

/**
 * Singleton — locked to a single document via the Studio structure
 * (see src/structure/index.ts), so there is exactly one "Homepage" to edit.
 *
 * Programmes, news items and events are deliberately NOT embedded here:
 * they're independent document types (see programme.ts / newsItem.ts /
 * event.ts) because the mockup already implies future list pages for each
 * ("All programmes", "All news", "Full calendar") and because editors should
 * be able to add a news item without touching the homepage document.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'about', title: 'Vision & mission' },
    { name: 'focus', title: 'Areas of focus' },
    { name: 'stats', title: 'Stats' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'heroSection',
      group: 'hero',
    }),
    defineField({
      name: 'visionEyebrow',
      title: 'Vision label',
      type: 'string',
      group: 'about',
      initialValue: 'Our Vision',
    }),
    defineField({
      name: 'visionStatement',
      title: 'Vision statement',
      type: 'text',
      rows: 4,
      group: 'about',
      description: 'The Foundation’s verbatim vision statement.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'missionEyebrow',
      title: 'Mission label',
      type: 'string',
      group: 'about',
      initialValue: 'Our Mission',
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission statement',
      type: 'text',
      rows: 4,
      group: 'about',
      description: 'The Foundation’s verbatim mission statement.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'missionNote',
      title: 'Mission supporting line',
      type: 'text',
      rows: 2,
      group: 'about',
      description: 'e.g. "Founded in 1998, the Foundation today connects six chapters…"',
    }),
    defineField({
      name: 'missionCta',
      title: 'Mission link',
      type: 'ctaLink',
      group: 'about',
    }),
    defineField({
      name: 'focusAreas',
      title: 'Areas of focus (01–09)',
      type: 'array',
      group: 'focus',
      of: [defineArrayMember({ type: 'focusArea' })],
      validation: (rule) => rule.min(1).max(9),
    }),
    defineField({
      name: 'stats',
      title: 'Stats band',
      type: 'array',
      group: 'stats',
      of: [defineArrayMember({ type: 'stat' })],
      validation: (rule) => rule.max(4).warning('The stats band lays out best with 4 figures.'),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage' }),
  },
})
