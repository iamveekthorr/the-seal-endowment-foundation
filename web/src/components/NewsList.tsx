'use client'

import { useState } from 'react'

export type NewsListItem = { _id: string; title: string; publishedAt?: string; excerpt?: string }

function formatDate(iso?: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

const PAGE_SIZE = 4

/** Full News listing: a lead story, then a "load more" list of the rest —
 * client-side since the dataset is small enough not to need real pagination
 * (mockup 1h's "Older stories" button). */
export function NewsList({ items }: { items: NewsListItem[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE)
  const lead = items[0]
  if (!lead) return <p className="text-sm text-neutral-700">No news yet — check back soon.</p>

  const rest = items.slice(1)
  const shown = rest.slice(0, visible)

  return (
    <div>
      <a href="#" className="mb-8 block">
        <div className="blueprint relative h-[220px] bg-surface tablet-up:h-[280px]" />
        <p className="eyebrow mt-4.5">{formatDate(lead.publishedAt)}</p>
        <h2 className="mt-1.5 mb-2 font-display text-2xl font-bold leading-[1.1] desktop:text-[32px]">{lead.title}</h2>
        {lead.excerpt && <p className="text-sm text-neutral-700">{lead.excerpt}</p>}
      </a>

      <div className="border-t border-divider">
        {shown.map((item) => (
          <a key={item._id} href="#" className="block border-b border-divider py-5 text-text hover:text-accent-700">
            <span className="block text-xs text-neutral-700">{formatDate(item.publishedAt)}</span>
            <span className="mt-0.5 block font-display text-[19px] leading-[1.2]">{item.title}</span>
            {item.excerpt && <span className="mt-1 block text-[13.5px] text-neutral-700">{item.excerpt}</span>}
          </a>
        ))}
      </div>

      {visible < rest.length && (
        <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn btn-secondary mt-5">
          Older stories
        </button>
      )}
    </div>
  )
}
