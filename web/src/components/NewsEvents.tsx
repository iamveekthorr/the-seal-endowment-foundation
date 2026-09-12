import { BlueprintCorners } from './BlueprintCorners'

export type NewsItem = { _id: string; title: string; publishedAt?: string; excerpt?: string }
export type EventItem = { _id: string; title: string; date?: string; location?: string }

function formatNewsDate(iso?: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function eventDateParts(iso?: string) {
  if (!iso) return { day: '', mon: '' }
  const d = new Date(iso)
  return {
    day: d.toLocaleDateString('en-GB', { day: '2-digit' }),
    mon: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
  }
}

export function NewsEvents({ news, events }: { news?: NewsItem[]; events?: EventItem[] }) {
  if (!news?.length && !events?.length) return null

  return (
    // Plain paper ground, same as the rest of the homepage — the mockup
    // gives this section no background of its own.
    <section id="news" className="pb-10 tablet-up:pb-[72px]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4.5 tablet:px-6 desktop:px-10 tablet-up:grid-cols-[1.4fr_1fr] tablet-up:gap-14">
        <div>
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-4 border-b border-divider pb-3">
            <h2 className="font-display text-2xl font-bold leading-[1.05] tracking-[-0.01em]">News &amp; updates</h2>
            <a href="/news-events" className="link-arrow">
              All news
            </a>
          </div>
          {news?.map((item) => (
            <a
              key={item._id}
              href="/news-events"
              className="block border-b border-divider py-4.5 text-text hover:text-accent-700 tablet-up:grid tablet-up:grid-cols-[110px_1fr] tablet-up:gap-5"
            >
              <span className="block text-xs text-neutral-700">{formatNewsDate(item.publishedAt)}</span>
              <span className="block">
                <span className="mt-0.5 block font-display text-[19px]">{item.title}</span>
                {item.excerpt && <span className="mt-1 block text-[13px] text-neutral-700">{item.excerpt}</span>}
              </span>
            </a>
          ))}
        </div>

        <div>
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-4 border-b border-divider pb-3">
            <h2 className="font-display text-2xl font-bold leading-[1.05] tracking-[-0.01em]">Events</h2>
          </div>
          {/* Event cards: .blueprint panels with reduced (tl+br) registration
              marks (STYLE-GUIDE.md §5). */}
          <div className="flex flex-col gap-4">
            {events?.map((event) => {
              const { day, mon } = eventDateParts(event.date)
              return (
                <div key={event._id} className="blueprint relative flex gap-4 p-4.5">
                  <BlueprintCorners reduced />
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
          </div>
          <a href="/news-events" className="btn btn-secondary btn-block mt-5">
            Full calendar
          </a>
        </div>
      </div>
    </section>
  )
}
