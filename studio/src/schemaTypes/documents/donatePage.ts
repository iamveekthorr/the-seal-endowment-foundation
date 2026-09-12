import { defineField, defineType, defineArrayMember } from 'sanity'
import { HeartFilledIcon } from '@sanity/icons/HeartFilled'

/**
 * Singleton. The standalone /donate page's own donation form (`DonateForm`)
 * is a fuller variant of the same Cyberpay checkout flow used by the
 * homepage's `DonatePanel` banner, still driven by `donateSettings` for
 * currency/suggested amounts/small print — this document only holds the
 * extra marketing copy the standalone /donate page wraps around that form
 * (giving tiers, other ways to give).
 */
export const donatePage = defineType({
  name: 'donatePage',
  title: 'Donate Page',
  type: 'document',
  icon: HeartFilledIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Support the Foundation',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro paragraph',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'givingTiers',
      title: 'Giving tiers',
      type: 'array',
      description: 'e.g. "₦10,000 — funds a term of textbooks for one scholar."',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'givingTier',
          fields: [
            defineField({ name: 'amount', title: 'Amount label', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'string', validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'amount', subtitle: 'description' } },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'otherWaysToGive',
      title: 'Other ways to give',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      initialValue: ['Bank transfer', 'Diaspora giving', 'Corporate partnership', 'Bequests'],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Donate Page' }),
  },
})
