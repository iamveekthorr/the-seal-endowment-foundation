export function VisionMission({
  visionEyebrow,
  visionStatement,
  missionEyebrow,
  missionStatement,
  missionNote,
  missionCta,
}: {
  visionEyebrow?: string
  visionStatement?: string
  missionEyebrow?: string
  missionStatement?: string
  missionNote?: string
  missionCta?: { label?: string; href?: string } | null
}) {
  return (
    <section id="about" className="pt-14 pb-10 tablet-up:pt-24 tablet-up:pb-16">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4.5 tablet:px-6 desktop:px-10 tablet-up:grid-cols-2 tablet-up:gap-14">
        <div>
          {visionEyebrow && <p className="eyebrow mb-3.5">{visionEyebrow}</p>}
          {/* Mockup 1a: the Vision quote is set in the display face at
              26px/1.25 — larger and visually distinct from the Mission
              paragraph, which is plain body copy (see below). Regular
              weight, not medium/bold. */}
          <p className="font-display text-[26px] font-normal leading-[1.25] text-text">
            &ldquo;{visionStatement}&rdquo;
          </p>
        </div>
        <div>
          {missionEyebrow && <p className="eyebrow mb-3.5">{missionEyebrow}</p>}
          {/* Mission is ordinary body copy (Barlow, not Barlow Condensed) —
              confirmed against the mockup, which sets no font-family
              override here at all. */}
          <p className="text-[15px] leading-[1.7] text-neutral-800">&ldquo;{missionStatement}&rdquo;</p>
          {missionNote && <p className="mt-3 text-sm text-neutral-700">{missionNote}</p>}
          {missionCta?.label && (
            <a href={missionCta.href || '/about'} className="btn btn-ghost mt-1">
              {missionCta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
