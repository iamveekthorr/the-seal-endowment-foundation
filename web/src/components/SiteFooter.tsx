export type FooterColumn = {
  _key: string
  heading: string
  links?: { _key: string; label: string; href: string }[]
}

export function SiteFooter({
  siteName,
  footerTagline,
  footerColumns,
  legalName,
  contactAddress,
  contactEmail,
  contactPhone,
}: {
  siteName?: string
  footerTagline?: string
  footerColumns?: FooterColumn[]
  legalName?: string
  contactAddress?: string
  contactEmail?: string
  contactPhone?: string
}) {
  const year = new Date().getFullYear()
  const hasContactColumn = contactAddress || contactEmail || contactPhone
  const resolvedSiteName = siteName || 'THE SEALS ENDOWMENT FOUNDATION'
  const mobileLine = [contactAddress, contactEmail].filter(Boolean).join(' · ')

  return (
    // Mockup footer's base text colour is neutral-300 (#d4d4d7), not the
    // paper colour — only the site-name line and the copyright line use
    // their own explicit (lighter/dimmer) colours. Nav/contact items below
    // inherit this base rather than carrying their own colour utility.
    <footer id="contact" className="bg-accent-900 text-neutral-300">
      {/*
        Mobile homepage mockup (1c) collapses the footer to three lines —
        name, "address · email", copyright — with no nav columns at all.
        Kept exactly as the mockup shows it below `tablet-up:`; the fuller
        column layout (with all footer nav links) resumes from tablet-up.
        Worth flagging: this does mean footer navigation isn't reachable
        on mobile — say if you'd rather keep the nav links there too.
      */}
      <div className="px-4.5 py-[26px] text-[12.5px] text-accent-400 tablet-up:hidden">
        <div className="mb-2 font-display text-base text-bg">{resolvedSiteName}</div>
        {mobileLine && <div>{mobileLine}</div>}
        <div className="mt-2.5" style={{ color: '#7e9cb8' }}>
          &copy; {year} All rights reserved.
        </div>
      </div>

      <div className="hidden pt-12 pb-8 tablet-up:block">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-8 px-6 desktop:grid-cols-[1.4fr_1fr_1fr_1fr] desktop:gap-10 desktop:px-10">
          <div>
            <div className="font-display text-[20px] text-bg">{resolvedSiteName}</div>
            {footerTagline && <p className="mt-2.5 max-w-[30ch] text-[13px] text-accent-400">{footerTagline}</p>}
          </div>

          {footerColumns?.map((column) => (
            <div key={column._key} className="flex flex-col gap-2 text-[13px]">
              <div className="text-[11px] font-semibold tracking-[0.14em] text-accent-500 uppercase">
                {column.heading}
              </div>
              {column.links?.map((link) => (
                <a key={link._key} href={link.href} className="text-neutral-300 hover:text-bg">
                  {link.label}
                </a>
              ))}
            </div>
          ))}

          {hasContactColumn && (
            <div className="flex flex-col gap-2 text-[13px]">
              <div className="text-[11px] font-semibold tracking-[0.14em] text-accent-500 uppercase">Contact</div>
              {contactAddress && <span>{contactAddress}</span>}
              {contactEmail && (
                <a href={`mailto:${contactEmail}`} className="text-neutral-300 hover:text-bg">
                  {contactEmail}
                </a>
              )}
              {contactPhone && (
                <a href={`tel:${contactPhone.replace(/\s+/g, '')}`} className="text-neutral-300 hover:text-bg">
                  {contactPhone}
                </a>
              )}
            </div>
          )}
        </div>
        <div
          className="mx-auto mt-8 max-w-[1280px] border-t px-6 pt-4 text-xs desktop:px-10"
          style={{ borderColor: 'rgb(255 255 255 / 14%)', color: '#7e9cb8' }}
        >
          &copy; {year} {legalName || 'The Seals Endowment Foundation'}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
