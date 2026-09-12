'use client'

import { useMemo, useState } from 'react'
import { SanityImage, type SanityImageValue } from './SanityImage'

export type ProgrammeItem = {
  _id: string
  title: string
  category?: string
  description?: string
  image?: SanityImageValue
}

/** Full Programmes listing with a client-side category filter (STYLE-GUIDE.md
 * §5 tags — mockup 1f). Categories are derived from the items themselves
 * rather than hardcoded, so a new programme's category shows up here for
 * free. */
export function ProgrammesGrid({ items }: { items: ProgrammeItem[] }) {
  const categories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category).filter((c): c is string => !!c))),
    [items],
  )
  const [active, setActive] = useState<string | null>(null)
  const filtered = active ? items.filter((item) => item.category === active) : items

  if (!items.length) return null

  return (
    <>
      <div className="mx-auto mb-6 flex max-w-[1280px] flex-wrap gap-2 px-4.5 tablet:px-6 desktop:px-10">
        <button type="button" onClick={() => setActive(null)} className={active === null ? 'tag tag-accent' : 'tag tag-outline'}>
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={active === category ? 'tag tag-accent' : 'tag tag-outline'}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-7 px-4.5 pb-14 tablet:grid-cols-2 tablet:px-6 desktop:grid-cols-3 desktop:px-10">
        {filtered.map((programme, i) => (
          <div key={programme._id}>
            <div className="blueprint relative h-[170px] overflow-hidden bg-surface">
              <SanityImage
                image={programme.image}
                sizes="(min-width: 980px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="duotone object-cover"
              />
            </div>
            {programme.category && (
              <p className="eyebrow mt-4">
                {String(i + 1).padStart(2, '0')} · {programme.category}
              </p>
            )}
            <h3 className="mt-1 mb-1.5 font-body text-[19px] font-semibold">{programme.title}</h3>
            {programme.description && <p className="mb-2 text-[13.5px] text-neutral-700">{programme.description}</p>}
          </div>
        ))}
      </div>
    </>
  )
}
