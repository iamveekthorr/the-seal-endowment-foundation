import { sanityFetch } from '@/sanity/lib/live'
import {
  PROJECTS_IMPACT_PAGE_QUERY,
  FEATURED_PROJECTS_QUERY,
  ALL_PROJECTS_QUERY,
  SITE_SETTINGS_QUERY,
} from '@/sanity/queries'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { PageIntro } from '@/components/PageIntro'
import { StatsBand } from '@/components/StatsBand'
import { SanityImage } from '@/components/SanityImage'

export const metadata = { title: 'Projects & Impact — The Seals Endowment Foundation' }

export default async function ProjectsImpactPage() {
  const [
    { data: projectsImpactPage },
    { data: featuredProjects },
    { data: allProjects },
    { data: siteSettings },
  ] = await Promise.all([
    sanityFetch({ query: PROJECTS_IMPACT_PAGE_QUERY }),
    sanityFetch({ query: FEATURED_PROJECTS_QUERY }),
    sanityFetch({ query: ALL_PROJECTS_QUERY }),
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
  ])

  return (
    <>
      <SiteHeader
        siteName={siteSettings?.siteName}
        siteNameSub={siteSettings?.siteNameSub}
        logoInitials={siteSettings?.logoInitials}
        navLinks={siteSettings?.navLinks}
      />

      <PageIntro eyebrow={projectsImpactPage?.eyebrow} heading={projectsImpactPage?.heading} headingMaxCh={22} />

      <StatsBand items={projectsImpactPage?.stats} />

      {!!featuredProjects?.length && (
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4.5 py-10 tablet-up:grid-cols-2 tablet:px-6 desktop:px-10 desktop:py-14">
          {featuredProjects.map((project) => (
            <div key={project._id}>
              <div className="blueprint relative h-[240px] overflow-hidden bg-surface">
                <SanityImage image={project.image} sizes="(min-width: 641px) 50vw, 100vw" className="duotone object-cover" />
              </div>
              <p className="eyebrow mt-4.5">
                {project.ref} · {project.location} · {project.year}
              </p>
              <h3 className="mt-1.5 mb-2 font-display text-xl font-bold">{project.title}</h3>
              {project.description && <p className="text-sm text-neutral-700">{project.description}</p>}
            </div>
          ))}
        </div>
      )}

      {!!allProjects?.length && (
        <div className="mx-auto max-w-[1280px] px-4.5 pb-14 tablet:px-6 desktop:px-10">
          <div className="mb-3.5 flex flex-wrap items-baseline gap-4">
            <h2 className="font-display text-2xl font-bold leading-[1.05] tracking-[-0.01em]">Project register</h2>
            <span className="text-[13px] text-neutral-700">All projects, {Math.min(...allProjects.map((p) => p.year))} – {Math.max(...allProjects.map((p) => p.year))}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-divider text-[11px] tracking-[0.1em] text-neutral-700 uppercase">
                  <th className="w-[70px] py-2.5 pr-3 font-semibold">Ref</th>
                  <th className="py-2.5 pr-3 font-semibold">Project</th>
                  <th className="w-[160px] py-2.5 pr-3 font-semibold">Area</th>
                  <th className="w-[160px] py-2.5 pr-3 font-semibold">Location</th>
                  <th className="w-[80px] py-2.5 pr-3 font-semibold">Year</th>
                  <th className="w-[110px] py-2.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {allProjects.map((project) => (
                  <tr key={project._id} className="border-b border-divider">
                    <td className="py-3 pr-3 text-neutral-700">{project.ref}</td>
                    <td className="py-3 pr-3">{project.title}</td>
                    <td className="py-3 pr-3 text-neutral-700">{project.area}</td>
                    <td className="py-3 pr-3 text-neutral-700">{project.location}</td>
                    <td className="py-3 pr-3 text-neutral-700">{project.year}</td>
                    <td className="py-3">
                      <span className={project.status === 'Ongoing' ? 'tag tag-accent' : 'tag tag-neutral'}>{project.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
