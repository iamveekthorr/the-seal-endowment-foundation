import type { Metadata } from 'next'
import { Barlow_Condensed, Barlow } from 'next/font/google'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import { SanityLive } from '@/sanity/lib/live'
import './globals.css'

// Industry design system: Barlow Condensed for headings, numerals, dates,
// refs and kickers; Barlow for body copy, forms, nav and buttons. Nothing else
// (STYLE-GUIDE.md §3 — "Two families, both loaded by the stylesheet").
const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Seals Endowment Foundation',
  description:
    'A socio-cultural and philanthropic organisation serving people of Ika origin since 1998 — education, healthcare, culture and community development.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isDraftMode = (await draftMode()).isEnabled

  return (
    <html lang="en" className={`${barlowCondensed.variable} ${barlow.variable}`}>
      <body className="font-body antialiased">
        {children}
        <SanityLive />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  )
}
