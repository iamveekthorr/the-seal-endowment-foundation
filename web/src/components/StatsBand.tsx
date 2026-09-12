export type Stat = { _key: string; value: string; label: string }

export function StatsBand({ items }: { items?: Stat[] }) {
  if (!items?.length) return null

  return (
    // Steel field: the second of the design system's three permitted
    // background treatments (STYLE-GUIDE.md §2 — accent-900 reversed).
    // No registration marks here — the mockup (1a) leaves the homepage stat
    // band plain; the blueprint-framed stat variant belongs to the type-led
    // direction (1b) we did not choose.
    <section className="bg-accent-900">
      <div className="mx-auto max-w-[1280px] px-4.5 py-8 tablet:px-6 desktop:px-10 desktop:py-[52px]">
        <div className="grid grid-cols-2 gap-6 tablet-up:gap-8 desktop:grid-cols-4">
          {items.map((stat) => (
            <div key={stat._key}>
              <div className="font-display text-[34px] leading-none tablet-up:text-[46px] text-bg">
                {stat.value}
              </div>
              <div className="mt-1.5 font-body text-[11.5px] font-semibold uppercase tracking-[0.14em] text-accent-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
