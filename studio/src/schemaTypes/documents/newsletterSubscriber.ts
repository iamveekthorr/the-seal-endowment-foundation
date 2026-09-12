import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons/Envelope'

// A server-written log, not editorial content: POST /api/newsletter creates
// one of these when someone submits the News & Events page's newsletter
// form. Editors can view the list in the Studio but don't create these by
// hand in normal operation.
export const newsletterSubscriber = defineType({
  name: 'newsletterSubscriber',
  title: 'Newsletter Subscriber',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Subscribed',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: 'Subscribed, new to old',
      name: 'subscribedAtDesc',
      by: [{ field: 'subscribedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'email', subtitle: 'subscribedAt' },
  },
})
