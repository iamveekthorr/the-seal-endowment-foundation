export type FocusArea = { _key: string; title: string; description?: string }

export function FocusAreas({ items }: { items?: FocusArea[] }) {
  if (!items?.length) return null

  return (
    <section className="pb-10 tablet-up:pb-[72px]">
      <div className="mx-auto max-w-[1280px] px-4.5 tablet:px-6 desktop:px-10">
        <div className="mb-7 flex flex-wrap items-baseline justify-between gap-4 border-b border-divider pb-3">
          <div className="flex flex-wrap items-baseline gap-3.5">
            <h2 className="font-display text-[26px] font-bold leading-[1.05] tracking-[-0.01em]">
              Areas of focus
            </h2>
            <span className="text-sm text-neutral-700">Nine areas of intervention</span>
          </div>
          <a href="/programmes" className="link-arrow">
            All programmes
          </a>
        </div>

        {/*
          Hairline grid (STYLE-GUIDE.md §4): gap-px on a divider-coloured
          background plus a 1px outer border, so every cell shares a single
          1px rule with its neighbours. This replaces an earlier nth-child
          border-toggling approach, which combined a custom breakpoint
          variant with an arbitrary-value :nth-child() pseudo-selector and
          reliably crashed the Tailwind v4/Turbopack CSS parser ("Invalid
          token in pseudo element") — the same class of bug documented for
          the custom-variant shorthand form at the top of globals.css.
        */}
        <div className="grid grid-cols-1 gap-px border border-divider bg-divider tablet:grid-cols-2 desktop:grid-cols-3">
          {items.map((item, i) => (
            <div key={item._key} className="bg-bg p-6">
              <span className="font-display text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h4 className="mt-1.5 mb-1.5 font-body text-base font-semibold">{item.title}</h4>
              {item.description && <p className="m-0 text-[13px] text-neutral-700">{item.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
