import { sanityFetch } from '@/sanity/lib/live'
import { PROGRAMMES_PAGE_QUERY, ALL_PROGRAMMES_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/queries'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { PageIntro } from '@/components/PageIntro'
import { ProgrammesGrid } from '@/components/ProgrammesGrid'

export const metadata = { title: 'Programmes — The Seals Endowment Foundation' }

export default async function ProgrammesPage() {
  const [{ data: programmesPage }, { data: programmes }, { data: siteSettings }] = await Promise.all([
    sanityFetch({ query: PROGRAMMES_PAGE_QUERY }),
    sanityFetch({ query: ALL_PROGRAMMES_QUERY }),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ])

  return (
    <>
      <SiteHeader
        siteName={siteSettings?.siteName}
        siteNameSub={siteSettings?.siteNameSub}
        logoInitials={siteSettings?.logoInitials}
        logo={siteSettings?.logo}
        navLinks={siteSettings?.navLinks}
      />

      <PageIntro
        eyebrow={programmesPage?.eyebrow}
        heading={programmesPage?.heading}
        intro={programmesPage?.intro}
        headingMaxCh={22}
        introMaxCh={66}
      />

      <div className="pt-8">
        <ProgrammesGrid items={programmes || []} />
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
