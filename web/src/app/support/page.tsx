import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY } from '@/sanity/queries'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { SupportForm } from '@/components/SupportForm'

export const metadata = { title: 'Support the Endowment — The Seals Endowment Foundation' }

export default async function SupportPage() {
  const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS_QUERY })

  return (
    <>
      <SiteHeader siteName={siteSettings?.siteName} siteNameSub={siteSettings?.siteNameSub} logoInitials={siteSettings?.logoInitials} navLinks={siteSettings?.navLinks} />
      <main className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4.5 py-10 tablet:px-6 desktop:grid-cols-[0.85fr_1.15fr] desktop:gap-14 desktop:px-10 desktop:py-14">
        <div>
          <p className="eyebrow mb-3">Support the Endowment</p>
          <h1 className="mb-4 font-display text-[34px] font-bold leading-[1.05] desktop:text-[50px]">Help shape what comes next.</h1>
          <p className="max-w-[48ch] text-[15px] leading-[1.7] text-neutral-800">The strongest work begins with people who care enough to share an idea, offer their time, or point us toward a need. Tell us where your concern lies and how you would like to contribute.</p>
        </div>
        <SupportForm />
      </main>
      <SiteFooter siteName={siteSettings?.siteName} footerTagline={siteSettings?.footerTagline} footerColumns={siteSettings?.footerColumns} legalName={siteSettings?.legalName} contactAddress={siteSettings?.contactAddress} contactEmail={siteSettings?.contactEmail} contactPhone={siteSettings?.contactPhone} />
    </>
  )
}