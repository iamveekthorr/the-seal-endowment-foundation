/**
 * Shared inner-page intro block (STYLE-GUIDE.md pattern used across About,
 * Programmes, Projects & Impact, Donate, Leadership, Contact — mockup
 * sections 1e–1k): eyebrow, large heading, optional intro paragraph.
 */
export function PageIntro({
  eyebrow,
  heading,
  intro,
  headingMaxCh,
  introMaxCh,
}: {
  eyebrow?: string
  heading?: string
  intro?: string
  headingMaxCh?: number
  introMaxCh?: number
}) {
  return (
    <div className="border-b border-divider">
      <div className="mx-auto max-w-[1280px] px-4.5 pt-10 pb-8 tablet:px-6 desktop:px-10 desktop:pt-14 desktop:pb-10">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        {heading && (
          <h1
            className="mb-4 font-display text-[34px] font-bold leading-[1.05] tracking-[-0.01em] desktop:text-[52px]"
            style={headingMaxCh ? { maxWidth: `${headingMaxCh}ch` } : undefined}
          >
            {heading}
          </h1>
        )}
        {intro && (
          <p
            className="text-[15px] text-neutral-800 desktop:text-[15.5px]"
            style={{ maxWidth: `${introMaxCh ?? 66}ch` }}
          >
            {intro}
          </p>
        )}
      </div>
    </div>
  )
}
