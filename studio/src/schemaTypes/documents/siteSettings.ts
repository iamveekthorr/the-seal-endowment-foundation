import { defineField, defineType, defineArrayMember } from 'sanity'
import { CogIcon } from '@sanity/icons/Cog'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'brand', title: 'Brand' },
    { name: 'nav', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
    { name: 'contact', title: 'Contact' },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      group: 'brand',
      initialValue: 'THE SEALS',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'siteNameSub',
      title: 'Site name — subtitle',
      type: 'string',
      group: 'brand',
      initialValue: 'Endowment Foundation',
    }),
    defineField({
      name: 'logoInitials',
      title: 'Logo mark initials',
      type: 'string',
      group: 'brand',
      initialValue: 'SEF',
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'navLinks',
      title: 'Header navigation',
      type: 'array',
      group: 'nav',
      of: [defineArrayMember({ type: 'navLink' })],
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer tagline',
      type: 'text',
      rows: 2,
      group: 'footer',
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer columns',
      type: 'array',
      group: 'footer',
      of: [defineArrayMember({ type: 'footerColumn' })],
      validation: (rule) => rule.max(3).warning('The footer lays out best with up to 3 columns.'),
    }),
    defineField({
      name: 'legalName',
      title: 'Legal name for copyright line',
      type: 'string',
      group: 'footer',
      initialValue: 'The Seals Endowment Foundation',
    }),
    defineField({
      name: 'contactAddress',
      title: 'Address',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Phone',
      type: 'string',
      group: 'contact',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
