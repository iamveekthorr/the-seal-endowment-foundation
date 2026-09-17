import { SanityImage, type SanityImageValue } from './SanityImage'
import { BlueprintCorners } from './BlueprintCorners'

export type Cta = { label?: string; href?: string } | null | undefined

export function Hero({
  eyebrow,
  heading,
  body,
  image,
  primaryCta,
  secondaryCta,
}: {
  eyebrow?: string
  heading?: string
  body?: string
  image?: SanityImageValue
  primaryCta?: Cta
  secondaryCta?: Cta
}) {
  return (
    // Mockup 1a (desktop/tablet): a 620px full-bleed photo with the text
    // panel pinned to the bottom of the standard content gutter, overlapping
    // the photo's bottom edge. Mockup 1c (mobile): a 230px photo with the
    // same content flowing normally underneath it, not overlapping.
    <section className="tablet-up:relative">
      <div className="relative h-[230px] tablet-up:absolute tablet-up:inset-0 tablet-up:h-[620px]">
        <SanityImage image={image} sizes="100vw" priority className="duotone object-cover" />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-b from-accent-900/0 from-40% to-accent-900/55 tablet-up:block" />
      </div>

      <div className="mx-auto max-w-[1280px] px-4.5 tablet:px-6 desktop:px-10 tablet-up:relative tablet-up:h-[620px]">
        <div className="blueprint relative bg-bg px-4.5 pt-6 pb-7 tablet-up:absolute tablet-up:bottom-[-1px] tablet-up:left-0 tablet-up:w-[620px] tablet-up:px-9 tablet-up:pt-[34px] tablet-up:pb-[30px]">
          <BlueprintCorners top />
          {eyebrow && <p className="eyebrow mb-2.5 tablet-up:mb-3">{eyebrow}</p>}
          <h1 className="mb-3 font-display text-[34px] font-bold leading-[1.05] tracking-[-0.01em] tablet-up:mb-3.5 desktop:mb-[14px] desktop:text-[46px]">
            {heading}
          </h1>
          {body && (
            <p className="mb-4 max-w-[52ch] text-[14.5px] text-neutral-800 tablet-up:text-[15px]">{body}</p>
          )}
          <div className="flex flex-col gap-2.5 tablet-up:flex-row tablet-up:flex-wrap">
            {primaryCta?.label && (
              <a
                href={primaryCta.label.toLowerCase().includes('support') ? '/support' : primaryCta.href || '/support'}
                className="btn btn-primary w-full tablet-up:w-auto"
              >
                {primaryCta.label}
              </a>
            )}
            {secondaryCta?.label && (
              <a href={secondaryCta.href || '/about'} className="btn btn-secondary w-full tablet-up:w-auto">
                {secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
