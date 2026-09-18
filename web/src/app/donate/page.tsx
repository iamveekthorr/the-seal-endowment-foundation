import { sanityFetch } from '@/sanity/lib/live'
import { DONATE_PAGE_QUERY, DONATE_SETTINGS_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/queries'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { DonateForm } from '@/components/DonateForm'

export const metadata = { title: 'Donate — The Seals Endowment Foundation' }

export default async function DonatePage() {
  const [{ data: donatePage }, { data: donateSettings }, { data: siteSettings }] = await Promise.all([
    sanityFetch({ query: DONATE_PAGE_QUERY }),
    sanityFetch({ query: DONATE_SETTINGS_QUERY }),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ])

  const tiers = donatePage?.givingTiers || []
  const otherWays = donatePage?.otherWaysToGive || []

  return (
    <>
      <SiteHeader
        siteName={siteSettings?.siteName}
        siteNameSub={siteSettings?.siteNameSub}
        logoInitials={siteSettings?.logoInitials}
        logo={siteSettings?.logo}
        navLinks={siteSettings?.navLinks}
      />

      {/* Mockup section 1i: page copy + giving tiers on the left, the actual
          donation form beside it on the right (not stacked below) once
          there's room for two columns. */}
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4.5 py-10 tablet:px-6 desktop:grid-cols-[1.15fr_1fr] desktop:gap-14 desktop:px-10 desktop:py-14">
        <div>
          <p className="eyebrow mb-3">{donatePage?.eyebrow || 'Support the Foundation'}</p>
          <h1 className="mb-4 max-w-[18ch] font-display text-[34px] font-bold leading-[1.05] tracking-[-0.01em] desktop:text-[50px]">
            {donatePage?.heading || 'Every gift is added to the endowment.'}
          </h1>
          {donatePage?.intro && <p className="mb-8 max-w-[60ch] text-[15px] text-neutral-800 desktop:text-[15.5px]">{donatePage.intro}</p>}

          {!!tiers.length && (
            <div className="mb-9 grid grid-cols-1 gap-px border border-divider bg-divider tablet-up:grid-cols-2">
              {tiers.map((tier: { amount: string; description: string }, i: number) => (
                <div key={i} className="bg-bg p-5">
                  <div className="font-display text-[26px] leading-none text-accent-700">{tier.amount}</div>
                  <div className="mt-1.5 text-[13.5px] text-neutral-700">{tier.description}</div>
                </div>
              ))}
            </div>
          )}

          {!!otherWays.length && (
            <div className="mb-2">
              <h3 className="mb-2.5 font-display text-lg font-bold">Other ways to give</h3>
              <p className="text-sm text-neutral-800">{otherWays.join(' · ')}</p>
            </div>
          )}
        </div>

        <div className="desktop:self-start">
          <DonateForm
            note={donateSettings?.note}
            currency={donateSettings?.currency}
            suggestedAmounts={donateSettings?.suggestedAmounts}
          />
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
