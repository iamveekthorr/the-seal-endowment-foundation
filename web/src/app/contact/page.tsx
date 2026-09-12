import { sanityFetch } from '@/sanity/lib/live'
import { CONTACT_PAGE_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/queries'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { ContactForm } from '@/components/ContactForm'
import { SanityImage } from '@/components/SanityImage'

export const metadata = { title: 'Contact — The Seals Endowment Foundation' }

export default async function ContactPage() {
  const [{ data: contactPage }, { data: siteSettings }] = await Promise.all([
    sanityFetch({ query: CONTACT_PAGE_QUERY }),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ])

  return (
    <>
      <SiteHeader
        siteName={siteSettings?.siteName}
        siteNameSub={siteSettings?.siteNameSub}
        logoInitials={siteSettings?.logoInitials}
        navLinks={siteSettings?.navLinks}
      />

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4.5 py-10 tablet:px-6 desktop:grid-cols-2 desktop:gap-14 desktop:px-10 desktop:py-14">
        <div>
          <p className="eyebrow mb-3">{contactPage?.eyebrow || 'Contact'}</p>
          <h1 className="mb-4 font-display text-[34px] font-bold leading-[1.05] tracking-[-0.01em] desktop:text-[50px]">
            {contactPage?.heading || 'Get in touch'}
          </h1>
          {contactPage?.intro && <p className="mb-8 max-w-[52ch] text-[15px] text-neutral-800 desktop:text-[15.5px]">{contactPage.intro}</p>}

          <div className="mb-9 grid grid-cols-1 gap-6 tablet-up:grid-cols-2">
            {contactPage?.secretariatAddress && (
              <div>
                <p className="mb-1.5 text-[11px] tracking-[0.16em] text-neutral-700 uppercase">Secretariat</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactPage.secretariatAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block whitespace-pre-line text-[14.5px] hover:text-accent-700 hover:underline"
                >
                  {contactPage.secretariatAddress}
                </a>
              </div>
            )}
            {(siteSettings?.contactEmail || siteSettings?.contactPhone) && (
              <div>
                <p className="mb-1.5 text-[11px] tracking-[0.16em] text-neutral-700 uppercase">Enquiries</p>
                <p className="text-[14.5px]">
                  {siteSettings?.contactEmail && (
                    <a href={`mailto:${siteSettings.contactEmail}`} className="block hover:text-accent-700 hover:underline">
                      {siteSettings.contactEmail}
                    </a>
                  )}
                  {siteSettings?.contactPhone && (
                    <a
                      href={`tel:${siteSettings.contactPhone.replace(/\s+/g, '')}`}
                      className="block hover:text-accent-700 hover:underline"
                    >
                      {siteSettings.contactPhone}
                    </a>
                  )}
                </p>
              </div>
            )}
            {contactPage?.scholarshipsEmail && (
              <div>
                <p className="mb-1.5 text-[11px] tracking-[0.16em] text-neutral-700 uppercase">Scholarships</p>
                <a
                  href={`mailto:${contactPage.scholarshipsEmail}`}
                  className="block text-[14.5px] hover:text-accent-700 hover:underline"
                >
                  {contactPage.scholarshipsEmail}
                </a>
              </div>
            )}
            {contactPage?.partnershipsEmail && (
              <div>
                <p className="mb-1.5 text-[11px] tracking-[0.16em] text-neutral-700 uppercase">Partnerships</p>
                <a
                  href={`mailto:${contactPage.partnershipsEmail}`}
                  className="block text-[14.5px] hover:text-accent-700 hover:underline"
                >
                  {contactPage.partnershipsEmail}
                </a>
              </div>
            )}
          </div>

          <div className="blueprint relative h-[220px] overflow-hidden bg-surface">
            {contactPage?.mapImage?.asset ? (
              <SanityImage image={contactPage.mapImage} sizes="(min-width: 641px) 50vw, 100vw" className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-[13px] text-neutral-700">
                Map — secretariat location
              </div>
            )}
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>

      <SiteFooter
        siteName={siteSettings?.siteName}
        footerTagline={siteSettings?.footerTagline}
        footerColumns={siteSettings?.footerColumns}
        legalName={siteSettings?.legalName}
        contactAddress={siteSettings?.contactAddress}
        contactEmail={siteSettings?.contactEmail}
        contactPhone={siteSettings?.contactPhone}
      />
    </>
  )
}
