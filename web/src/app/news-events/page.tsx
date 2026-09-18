import { sanityFetch } from '@/sanity/lib/live'
import { NEWS_EVENTS_PAGE_QUERY, ALL_NEWS_QUERY, ALL_UPCOMING_EVENTS_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/queries'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { NewsList } from '@/components/NewsList'
import { NewsletterForm } from '@/components/NewsletterForm'

export const metadata = { title: 'News & Events — The Seals Endowment Foundation' }

function eventDateParts(iso?: string) {
  if (!iso) return { day: '', mon: '' }
  const d = new Date(iso)
  return {
    day: d.toLocaleDateString('en-GB', { day: '2-digit' }),
    mon: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
  }
}

export default async function NewsEventsPage() {
  const [{ data: newsEventsPage }, { data: news }, { data: events }, { data: siteSettings }] = await Promise.all([
    sanityFetch({ query: NEWS_EVENTS_PAGE_QUERY }),
    sanityFetch({ query: ALL_NEWS_QUERY }),
    sanityFetch({ query: ALL_UPCOMING_EVENTS_QUERY }),
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

      <div className="border-b border-divider">
        <div className="mx-auto max-w-[1280px] px-4.5 pt-10 pb-8 tablet:px-6 desktop:px-10 desktop:pt-14 desktop:pb-10">
          <h1 className="font-display text-[34px] font-bold leading-[1.05] tracking-[-0.01em] desktop:text-[52px]">
            {newsEventsPage?.heading || 'News & events'}
          </h1>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4.5 py-10 tablet:px-6 desktop:grid-cols-[1.5fr_1fr] desktop:gap-14 desktop:px-10 desktop:py-14">
        <NewsList items={news || []} />

        <div>
          <h3 className="mb-3.5 font-display text-lg font-bold">Upcoming events</h3>
          <div className="mb-4.5 flex flex-col gap-4">
            {(events || []).map((event) => {
              const { day, mon } = eventDateParts(event.date)
              return (
                <div key={event._id} className="blueprint relative flex gap-4 p-4.5">
                  <div className="w-14 shrink-0 text-center">
                    <div className="font-display text-[28px] leading-none">{day}</div>
                    <div className="text-[11px] tracking-[0.12em] text-neutral-700">{mon}</div>
                  </div>
                  <div>
                    <div className="font-display text-[19px]">{event.title}</div>
                    {event.location && <div className="text-[12.5px] text-neutral-700">{event.location}</div>}
                  </div>
                </div>
              )
            })}
            {!events?.length && <p className="text-sm text-neutral-700">No upcoming events right now.</p>}
          </div>

          <NewsletterForm heading={newsEventsPage?.newsletterHeading} body={newsEventsPage?.newsletterBody} />
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
