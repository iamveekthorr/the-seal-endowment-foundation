import { SanityImage, type SanityImageValue } from './SanityImage'
import { BlueprintCorners } from './BlueprintCorners'

export type Programme = {
  _id: string
  title: string
  category?: string
  description?: string
  image?: SanityImageValue
}

export function Programmes({ items }: { items?: Programme[] }) {
  if (!items?.length) return null

  return (
    <section id="programmes" className="py-10 tablet-up:py-[72px]">
      <div className="mx-auto max-w-[1280px] px-4.5 tablet:px-6 desktop:px-10">
        <div className="mb-7 flex flex-wrap items-baseline justify-between gap-4 border-b border-divider pb-3">
          <h2 className="font-display text-[26px] font-bold leading-[1.05] tracking-[-0.01em] tablet-up:text-[34px]">
            Programmes
          </h2>
          <a href="/programmes" className="link-arrow">
            See all
          </a>
        </div>

        <div className="grid grid-cols-1 gap-7 tablet:grid-cols-2 desktop:grid-cols-3">
          {items.map((programme) => (
            <div key={programme._id}>
              <div className="blueprint relative h-[190px] overflow-hidden bg-surface">
                <BlueprintCorners />
                <SanityImage
                  image={programme.image}
                  sizes="(min-width: 980px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="duotone object-cover"
                />
                {programme.image?.credit && (
                  <span className="absolute right-2.5 bottom-2 bg-accent-900/70 px-[7px] py-[3px] font-body text-[10px] tracking-[0.05em] text-bg">
                    Photo: {programme.image.credit}
                  </span>
                )}
              </div>
              {programme.category && <p className="eyebrow mt-4">{programme.category}</p>}
              <h3 className="mt-1 mb-1.5 font-body text-[19px] font-semibold">{programme.title}</h3>
              {programme.description && <p className="m-0 text-[13px] text-neutral-700">{programme.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
