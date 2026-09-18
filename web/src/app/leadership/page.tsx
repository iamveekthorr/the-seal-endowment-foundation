import { sanityFetch } from '@/sanity/lib/live'
import { LEADERSHIP_PAGE_QUERY, PEOPLE_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/queries'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { PageIntro } from '@/components/PageIntro'
import { SanityImage, type SanityImageValue } from '@/components/SanityImage'

export const metadata = { title: 'Leadership — The Seals Endowment Foundation' }

type PersonItem = { _id: string; name: string; role: string; group: string; photo?: SanityImageValue }

function PersonGrid({ people }: { people: PersonItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 tablet:grid-cols-3 desktop:grid-cols-4">
      {people.map((person) => (
        <div key={person._id}>
          <div className="blueprint relative h-[180px] overflow-hidden bg-surface tablet-up:h-[230px]">
            <SanityImage image={person.photo} sizes="(min-width: 980px) 25vw, (min-width: 640px) 33vw, 50vw" className="duotone object-cover" />
          </div>
          <h4 className="mt-3.5 mb-0.5 font-display text-base font-semibold">{person.name}</h4>
          <div className="text-[12.5px] text-neutral-700">{person.role}</div>
        </div>
      ))}
    </div>
  )
}

export default async function LeadershipPage() {
  const [{ data: leadershipPage }, { data: people }, { data: siteSettings }] = await Promise.all([
    sanityFetch({ query: LEADERSHIP_PAGE_QUERY }),
    sanityFetch({ query: PEOPLE_QUERY }),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ])

  const trustees = (people || []).filter((p) => p.group === 'trustees')
  const executives = (people || []).filter((p) => p.group === 'executive')

  return (
    <>
      <SiteHeader
        siteName={siteSettings?.siteName}
        siteNameSub={siteSettings?.siteNameSub}
        logoInitials={siteSettings?.logoInitials}
        logo={siteSettings?.logo}
        navLinks={siteSettings?.navLinks}
      />

      <PageIntro eyebrow={leadershipPage?.eyebrow} heading={leadershipPage?.heading} intro={leadershipPage?.intro} introMaxCh={66} />

      <div className="mx-auto max-w-[1280px] px-4.5 py-10 tablet:px-6 desktop:px-10 desktop:py-14">
        {!!trustees.length && (
          <div className="mb-11">
            <p className="mb-4 border-b border-divider pb-2.5 text-[11px] tracking-[0.18em] text-neutral-700 uppercase">
              Board of Trustees
            </p>
            <PersonGrid people={trustees} />
          </div>
        )}
        {!!executives.length && (
          <div>
            <p className="mb-4 border-b border-divider pb-2.5 text-[11px] tracking-[0.18em] text-neutral-700 uppercase">
              Executive Council
            </p>
            <PersonGrid people={executives} />
          </div>
        )}
        {!trustees.length && !executives.length && (
          <p className="text-sm text-neutral-700">Leadership profiles are coming soon.</p>
        )}
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
