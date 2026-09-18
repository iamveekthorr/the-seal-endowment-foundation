import { sanityFetch } from '@/sanity/lib/live'
import { ABOUT_PAGE_QUERY, HOME_PAGE_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/queries'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { PageIntro } from '@/components/PageIntro'
import { SanityImage } from '@/components/SanityImage'

export const metadata = { title: 'About — The Seals Endowment Foundation' }

export default async function AboutPage() {
  const [{ data: aboutPage }, { data: homePage }, { data: siteSettings }] = await Promise.all([
    sanityFetch({ query: ABOUT_PAGE_QUERY }),
    sanityFetch({ query: HOME_PAGE_QUERY }),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ])

  const aims = aboutPage?.aims || []
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

  return (
    <>
      <SiteHeader
        siteName={siteSettings?.siteName}
        siteNameSub={siteSettings?.siteNameSub}
        logoInitials={siteSettings?.logoInitials}
        logo={siteSettings?.logo}
        navLinks={siteSettings?.navLinks}
      />

      <PageIntro eyebrow={aboutPage?.eyebrow} heading={aboutPage?.heading} intro={aboutPage?.intro} headingMaxCh={20} introMaxCh={70} />

      {aboutPage?.storyImage?.asset && (
        <div className="relative h-[180px] border-b border-divider tablet-up:h-[260px]">
          <SanityImage image={aboutPage.storyImage} sizes="100vw" className="duotone object-cover" />
        </div>
      )}

      {!!aboutPage?.storyParagraphs?.length && (
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-4.5 py-10 tablet:px-6 desktop:grid-cols-[280px_1fr] desktop:gap-14 desktop:px-10 desktop:py-14">
          <div className="text-[11px] tracking-[0.18em] text-neutral-700 uppercase">{aboutPage.storyHeading || 'Our story'}</div>
          <div className="flex max-w-[70ch] flex-col gap-4">
            {aboutPage.storyParagraphs.map((paragraph: string, i: number) => (
              <p key={i} className={i === 0 ? 'text-[15px] leading-[1.75] desktop:text-base' : 'text-[14px] leading-[1.75] text-neutral-800'}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="bg-accent-900">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 tablet-up:grid-cols-2">
          <div className="px-4.5 py-10 text-bg tablet-up:px-11 tablet-up:py-13">
            <p className="mb-3.5 text-[11px] tracking-[0.2em] text-accent-400 uppercase">Vision</p>
            <p className="font-display text-[22px] leading-[1.26] tablet-up:text-[27px]">&ldquo;{homePage?.visionStatement}&rdquo;</p>
          </div>
          <div className="bg-bg px-4.5 py-10 tablet-up:px-11 tablet-up:py-13">
            <p className="eyebrow mb-3.5">Mission</p>
            <p className="text-[15px] leading-[1.75] text-neutral-800">&ldquo;{homePage?.missionStatement}&rdquo;</p>
          </div>
        </div>
      </div>

      {!!aims.length && (
        <div className="mx-auto max-w-[1280px] px-4.5 py-10 tablet:px-6 desktop:px-10 desktop:py-14">
          <h2 className="mb-1.5 font-display text-2xl font-bold leading-[1.05] tracking-[-0.01em]">
            {aboutPage?.aimsHeading || 'Aims and objectives'}
          </h2>
          {aboutPage?.aimsIntro && <p className="mb-5 text-sm text-neutral-700">{aboutPage.aimsIntro}</p>}
          <div className="grid grid-cols-1 gap-px border border-divider bg-divider tablet-up:grid-cols-2">
            {aims.map((aim: string, i: number) => {
              const isLast = i === aims.length - 1
              const spansTwo = isLast && aims.length % 2 === 1
              return (
                <div
                  key={i}
                  className={`flex gap-4 bg-bg p-5 desktop:p-6 ${spansTwo ? 'tablet-up:col-span-2' : ''}`}
                >
                  <span className="font-display text-[13px] text-accent">{romanNumerals[i] || i + 1}</span>
                  <span className="text-[15px]">{aim}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

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
