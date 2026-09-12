import { defineField, defineType } from 'sanity'
import { CommentIcon } from '@sanity/icons/Comment'

// A server-written log, not editorial content: POST /api/contact creates
// one of these when someone submits the Contact page's enquiry form.
// Editors can view/action the list in the Studio but don't create these by
// hand in normal operation.
export const enquiry = defineType({
  name: 'enquiry',
  title: 'Enquiry',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', readOnly: true }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
      validation: (rule) => rule.required().email(),
    }),
    defineField({ name: 'phone', title: 'Phone', type: 'string', readOnly: true }),
    defineField({
      name: 'topic',
      title: 'Topic',
      type: 'string',
      readOnly: true,
      options: {
        list: [
          { title: 'General enquiry', value: 'general' },
          { title: 'Membership', value: 'membership' },
          { title: 'Scholarships & grants', value: 'scholarships' },
          { title: 'Partnership or sponsorship', value: 'partnership' },
        ],
      },
    }),
    defineField({ name: 'message', title: 'Message', type: 'text', rows: 4, readOnly: true }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: [{ title: 'New', value: 'new' }, { title: 'Actioned', value: 'actioned' }], layout: 'radio' },
      initialValue: 'new',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: 'Submitted, new to old',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'email', topic: 'topic' },
    prepare: ({ title, subtitle, topic }) => ({ title: title || subtitle, subtitle: [subtitle, topic].filter(Boolean).join(' · ') }),
  },
})
