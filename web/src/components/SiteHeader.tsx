'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageValue } from './SanityImage'

export type NavLink = { _key: string; label: string; href: string }

export function SiteHeader({
  siteNameSub,
  logoInitials,
  logo,
  navLinks,
}: {
  siteName?: string
  siteNameSub?: string
  logoInitials?: string
  logo?: SanityImageValue
  navLinks?: NavLink[]
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  // Exact match, or a parent of the current path (so a future nested route
  // like /programmes/some-programme still lights up "Programmes") — but
  // never for "/" itself, which would otherwise match everything.
  const isActive = (href: string) =>
    href !== '/' && (pathname === href || pathname?.startsWith(`${href}/`))
  const links = navLinks?.length
    ? navLinks
    : [
        { _key: 'about', label: 'About', href: '/about' },
        { _key: 'programmes', label: 'Programmes', href: '/programmes' },
        { _key: 'impact', label: 'Projects & Impact', href: '/projects-impact' },
        { _key: 'news', label: 'News & Events', href: '/news-events' },
        { _key: 'leadership', label: 'Leadership', href: '/leadership' },
        { _key: 'contact', label: 'Contact', href: '/contact' },
      ]

  return (
    // STYLE-GUIDE.md §5 Navigation: "1px bottom border. Not sticky."
    <header className="border-b border-divider bg-bg">
      <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-4.5 py-3 tablet:px-6 desktop:px-10 desktop:py-3.5">
        <Link href="/" className="mr-auto flex items-center gap-2.5">
          {/* Official logo — the mark already spells out "The SEALS", so the
              text lockup alongside it only needs the org's full-name
              qualifier, not a second "THE SEALS" line. Falls back to the
              initials badge if no logo is set in Site Settings. */}
          {logo?.asset ? (
            <Image
              src={urlFor(logo).width(200).auto('format').url()}
              alt={logo.alt || 'The Seals Endowment Foundation'}
              width={logo.asset.metadata?.dimensions?.width || 396}
              height={logo.asset.metadata?.dimensions?.height || 400}
              priority
              className="h-9 w-auto shrink-0 tablet-up:h-11"
            />
          ) : (
            <span
              className="blueprint flex h-[30px] w-[30px] shrink-0 items-center justify-center tablet-up:h-[34px] tablet-up:w-[34px]"
              style={{ borderColor: 'var(--color-accent)' }}
            >
              <span className="font-display text-xs tracking-[0.06em] text-accent">{logoInitials || 'SEF'}</span>
            </span>
          )}
          <span className="text-[8px] tracking-[0.18em] text-neutral-700 uppercase tablet-up:text-[9.5px] tablet-up:tracking-[0.22em]">
            {siteNameSub || 'Endowment Foundation'}
          </span>
        </Link>

        <nav className="flex shrink-0 items-center gap-2 tablet:gap-4 desktop:gap-[22px]">
          <div className="hidden desktop:flex desktop:gap-[22px]">
            {links.map((link) => {
              const active = isActive(link.href)
              return (
                <a
                  key={link._key}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={
                    active
                      ? 'text-sm font-semibold text-accent-700'
                      : 'text-sm text-text hover:text-accent-700'
                  }
                >
                  {link.label}
                </a>
              )
            })}
          </div>
    <Link href="/support" aria-current={isActive('/support') ? 'page' : undefined} className="btn btn-primary">
           Support the Endowment
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-neutral-300 tablet:h-10 tablet:w-10 desktop:hidden"
          >
            &#9776;
          </button>
        </nav>
      </div>

      {open && (
        <div className="border-t border-divider bg-bg px-4.5 py-4 tablet:px-6 desktop:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => {
              const active = isActive(link.href)
              return (
                <a
                  key={link._key}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={
                    active
                      ? 'py-2 text-[15px] font-semibold text-accent-700'
                      : 'py-2 text-[15px] font-medium text-text hover:text-accent-700'
                  }
                >
                  {link.label}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
