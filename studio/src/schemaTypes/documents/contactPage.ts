import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons/Envelope'

/**
 * Singleton. The main address/email/phone shown under "Enquiries" reuse
 * `siteSettings` (contactAddress/contactEmail/contactPhone) rather than
 * duplicating them here — this document only holds what's specific to the
 * Contact page: the intro copy and the extra routed inboxes the mockup
 * calls out (Scholarships, Partnerships).
 */
export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Contact',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Get in touch',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro paragraph',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'secretariatAddress',
      title: 'Secretariat address',
      type: 'text',
      rows: 3,
      description: 'Shown under "Secretariat" — one line per address line.',
    }),
    defineField({
      name: 'scholarshipsEmail',
      title: 'Scholarships email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'partnershipsEmail',
      title: 'Partnerships email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'mapImage',
      title: 'Map image',
      type: 'creditedImage',
      description: 'A static map image/screenshot of the secretariat location.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact Page' }),
  },
})
