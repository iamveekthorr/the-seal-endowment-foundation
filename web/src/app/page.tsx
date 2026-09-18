import { sanityFetch } from '@/sanity/lib/live'
import {
  HOME_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  DONATE_SETTINGS_QUERY,
  FEATURED_PROGRAMMES_QUERY,
  LATEST_NEWS_QUERY,
  UPCOMING_EVENTS_QUERY,
} from '@/sanity/queries'
import { SiteHeader } from '@/components/SiteHeader'
import { Hero } from '@/components/Hero'
import { VisionMission } from '@/components/VisionMission'
import { FocusAreas } from '@/components/FocusAreas'
import { StatsBand } from '@/components/StatsBand'
import { Programmes } from '@/components/Programmes'
import { NewsEvents } from '@/components/NewsEvents'
import { DonatePanel } from '@/components/DonatePanel'
import { SiteFooter } from '@/components/SiteFooter'

export default async function HomePage() {
  const [
    { data: homePage },
    { data: siteSettings },
    { data: donateSettings },
    { data: programmes },
    { data: news },
    { data: events },
  ] = await Promise.all([
    sanityFetch({ query: HOME_PAGE_QUERY }),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({ query: DONATE_SETTINGS_QUERY }),
    sanityFetch({ query: FEATURED_PROGRAMMES_QUERY }),
    sanityFetch({ query: LATEST_NEWS_QUERY }),
    sanityFetch({ query: UPCOMING_EVENTS_QUERY }),
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

      <Hero
        eyebrow={homePage?.hero?.eyebrow}
        heading={homePage?.hero?.heading}
        body={homePage?.hero?.body}
        image={homePage?.hero?.image}
        primaryCta={homePage?.hero?.primaryCta}
        secondaryCta={homePage?.hero?.secondaryCta}
      />

      <VisionMission
        visionEyebrow={homePage?.visionEyebrow}
        visionStatement={homePage?.visionStatement}
        missionEyebrow={homePage?.missionEyebrow}
        missionStatement={homePage?.missionStatement}
        missionNote={homePage?.missionNote}
        missionCta={homePage?.missionCta}
      />

      <FocusAreas items={homePage?.focusAreas} />

      <StatsBand items={homePage?.stats} />

      <Programmes items={programmes} />

      <NewsEvents news={news} events={events} />

      <DonatePanel
        heading={donateSettings?.heading}
        body={donateSettings?.body}
        note={donateSettings?.note}
        currency={donateSettings?.currency}
        suggestedAmounts={donateSettings?.suggestedAmounts}
      />

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
