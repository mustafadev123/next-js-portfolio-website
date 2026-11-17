"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, X } from "lucide-react"
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
import { getProjectSlug, projectCategories, projects, type Project } from "@/lib/content"

const matches = (p: Project, q: string) =>
  !q ||
  [p.title, p.description, p.category, ...p.technologies].some((field) => field.toLowerCase().includes(q))

function ProjectEntry({ project, number, highlighted }: { project: Project; number: number; highlighted: boolean }) {
  const cs = project.caseStudy
  return (
    <li
      id={`project-${getProjectSlug(project)}`}
      className={cn(
        "scroll-mt-28 border-t border-rule transition-[background-color,box-shadow] duration-700",
        highlighted && "bg-signal/[0.06] shadow-[inset_3px_0_0_hsl(var(--signal))]",
      )}
    >
      <Reveal className="grid gap-x-12 gap-y-8 py-12 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-md border border-rule">
            <ProjectMedia project={project} sizes="(min-width: 1024px) 36vw, 100vw" />
          </div>
        </div>

        <article className="min-w-0 space-y-6 lg:col-span-7" aria-labelledby={`title-${getProjectSlug(project)}`}>
          <div>
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-signal">{String(number).padStart(2, "0")}</span>
              <span>{project.category}</span>
              {project.featured && (
                <span className="rounded-full border border-signal/50 px-2 py-0.5 text-[0.625rem] text-signal">
                  Featured
                </span>
              )}
              {cs?.team && <span className="normal-case tracking-normal">{cs.team}</span>}
            </p>
            <h2
              id={`title-${getProjectSlug(project)}`}
              className="mt-4 text-balance font-display text-display-md font-semibold"
            >
              {project.title}
            </h2>
          </div>

          <ProjectAwards project={project} />
          <ProjectTagline project={project} />

          <p className="max-w-[68ch] text-pretty leading-relaxed text-muted-foreground">{project.description}</p>

          {cs?.problem && (
            <div className="max-w-[68ch]">
              <h3 className="eyebrow mb-2">The problem</h3>
              <p className="text-pretty leading-relaxed">{cs.problem}</p>
            </div>
          )}

          {cs?.technicalDepth && cs.technicalDepth.length > 0 && (
            <div className="max-w-[68ch]">
              <h3 className="eyebrow mb-3">How it works</h3>
              <ul className="space-y-2">
                {cs.technicalDepth.map((item) => (
                  <li key={item} className="flex gap-3 text-pretty leading-relaxed text-muted-foreground">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ProjectContribution project={project} />
          <ProjectImpact project={project} />
          <ProjectStack project={project} />
          <ProjectLinks project={project} />
        </article>
      </Reveal>
    </li>
  )
}

export function ProjectsIndex() {
  const [category, setCategory] = useState("All")
  const [query, setQuery] = useState("")
  const [highlight, setHighlight] = useState<string | null>(null)
  const q = query.trim().toLowerCase()

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: projects.length }
    for (const p of projects) c[p.category] = (c[p.category] ?? 0) + 1
    return c
  }, [])

  const visible = projects.filter((p) => (category === "All" || p.category === category) && matches(p, q))

  // Deep link from the chatbot: /projects?project=<name or slug>
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("project")?.toLowerCase().trim()
    if (!param) return
    const target = projects.find((p) => getProjectSlug(p) === param || p.title.toLowerCase().includes(param))
    window.history.replaceState({}, "", "/projects")
    if (!target) return
    const slug = getProjectSlug(target)
    setHighlight(slug)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    requestAnimationFrame(() =>
      document.getElementById(`project-${slug}`)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }),
    )
    const t = setTimeout(() => setHighlight(null), 3500)
    return () => clearTimeout(t)
  }, [])

  return (
    <section aria-label="All projects" className="shell pb-24 lg:pb-32">
      {/* Filters */}
      <div className="flex flex-col gap-6 border-t border-rule py-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-md">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-faint"
          />
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or technology"
            className="w-full border-b border-border bg-transparent py-3 pl-7 pr-8 text-base outline-none transition-colors placeholder:text-faint focus:border-signal [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-faint hover:text-foreground"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          )}
        </div>

        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {projectCategories.map((c) => {
            const active = c === category
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(c)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
                )}
              >
                {c}
                <span className={cn("font-mono text-[0.625rem]", active ? "text-background/70" : "text-faint")}>
                  {counts[c]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <p aria-live="polite" className="eyebrow pb-2">
        Showing {visible.length} of {projects.length}
        {category !== "All" && ` · ${category}`}
        {q && ` · “${query.trim()}”`}
      </p>

      {visible.length > 0 ? (
        <ol className="border-b border-rule">
          {visible.map((p) => (
            <ProjectEntry
              key={p.title}
              project={p}
              number={projects.indexOf(p) + 1}
              highlighted={highlight === getProjectSlug(p)}
            />
          ))}
        </ol>
      ) : (
        <div className="border-t border-rule py-24 text-center">
          <p className="font-display text-2xl font-semibold">Nothing matches that yet.</p>
          <button
            type="button"
            onClick={() => {
              setCategory("All")
              setQuery("")
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm hover:border-foreground"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  )
}
