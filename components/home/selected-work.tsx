import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { Reveal } from "@/components/reveal"
import {
  ProjectAwards,
  ProjectContribution,
  ProjectImpact,
  ProjectLinks,
  ProjectMedia,
  ProjectStack,
  ProjectTagline,
} from "@/components/project-parts"
import { cn } from "@/lib/utils"
import { featuredProjects, getProjectLinks, projects, spotlightProjects, type Project } from "@/lib/content"

const num = (n: number) => String(n).padStart(2, "0")

/** Full showcase for a flagship project: large media beside what it does and what I built. */
function Flagship({ project, n, flip }: { project: Project; n: number; flip: boolean }) {
  const primary = getProjectLinks(project)[0]
  const media = (
    <div className="group overflow-hidden rounded-md border border-rule">
      <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]">
        <ProjectMedia project={project} sizes="(min-width: 1024px) 56vw, 100vw" />
      </div>
    </div>
  )

  return (
    <Reveal as="li" className="grid items-center gap-x-14 gap-y-8 lg:grid-cols-12">
      <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
        {primary ? (
          // Mouse shortcut; the title link is the keyboard/screen-reader target, so skip it in tab order
          <a
            href={primary.href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            aria-label={`${primary.label}: ${project.title} (opens in a new tab)`}
          >
            {media}
          </a>
        ) : (
          media
        )}
      </div>

      <article className={cn("min-w-0 space-y-5 lg:col-span-5", flip && "lg:order-1")}>
        <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-signal">{num(n)}</span>
          <span>{project.category}</span>
          {project.caseStudy?.team && <span className="normal-case tracking-normal">{project.caseStudy.team}</span>}
        </p>
        <h3 className="text-balance font-display text-display-md font-semibold">
          {primary ? (
            <a href={primary.href} target="_blank" rel="noopener noreferrer" className="group/t">
              {project.title}
              <ArrowUpRight
                aria-hidden="true"
                className="ml-2 inline h-[0.55em] w-[0.55em] align-baseline text-signal opacity-0 transition-opacity group-hover/t:opacity-100"
              />
              <span className="sr-only"> ({primary.label}, opens in a new tab)</span>
            </a>
          ) : (
            project.title
          )}
        </h3>
        <ProjectAwards project={project} />
        <ProjectTagline project={project} />
        {/* What it does, always visible */}
        <p className="text-pretty text-lg leading-relaxed text-foreground/85">{project.summary ?? project.description}</p>
        <ProjectContribution project={project} />
        <ProjectImpact project={project} />
        <ProjectStack project={project} />
        <ProjectLinks project={project} />
      </article>
    </Reveal>
  )
}

/** Compact row for the rest of the featured work. */
function IndexRow({ project, n }: { project: Project; n: number }) {
  return (
    <Reveal as="li" className="border-t border-rule">
      <div className="grid items-center gap-x-6 gap-y-4 py-6 md:grid-cols-[8.5rem_minmax(0,1fr)_auto] lg:py-7">
        <div className="hidden overflow-hidden rounded border border-rule md:block">
          <ProjectMedia project={project} sizes="136px" />
        </div>
        <div className="min-w-0">
          <p className="eyebrow mb-2">
            <span className="text-signal">{num(n)}</span> · {project.category}
          </p>
          <h4 className="text-balance font-display text-2xl font-semibold tracking-tight">{project.title}</h4>
          <p className="mt-2 line-clamp-2 max-w-[72ch] text-pretty text-sm leading-relaxed text-muted-foreground">
            {project.summary ?? project.description}
          </p>
        </div>
        <div className="md:justify-self-end">
          <ProjectLinks project={project} />
        </div>
      </div>
    </Reveal>
  )
}

export function SelectedWork() {
  const rest = featuredProjects.filter((p) => !p.spotlight)
  if (!spotlightProjects.length && !rest.length) return null

  return (
    <section id="work" aria-labelledby="work-title" className="shell scroll-mt-24 pt-24 lg:pt-32">
      <SectionHeader
        index="01"
        label="Selected work"
        id="work-title"
        title="Things I've built"
        aside={`${spotlightProjects.length} flagship · ${projects.length} total`}
      />

      <ol className="space-y-24 lg:space-y-32">
        {spotlightProjects.map((p, i) => (
          <Flagship key={p.title} project={p} n={i + 1} flip={i % 2 === 1} />
        ))}
      </ol>

      {rest.length > 0 && (
        <div className="mt-24 lg:mt-32">
          <h3 className="eyebrow mb-6">More work</h3>
          <ol className="border-b border-rule">
            {rest.map((p, i) => (
              <IndexRow key={p.title} project={p} n={spotlightProjects.length + i + 1} />
            ))}
          </ol>
        </div>
      )}

      <div className="mt-10 flex justify-end">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-3 font-display text-xl font-semibold tracking-tight"
        >
          <span className="link-draw">Browse all {projects.length} projects</span>
          <ArrowRight
            aria-hidden="true"
            className="h-5 w-5 text-signal transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  )
}
