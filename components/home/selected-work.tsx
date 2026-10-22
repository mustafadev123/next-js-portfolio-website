"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import {
  ProjectContribution,
  ProjectImpact,
  ProjectLinks,
  ProjectMedia,
  ProjectStack,
} from "@/components/project-parts"
import { cn } from "@/lib/utils"
import { featuredProjects, getProjectLinks, projects, type Project } from "@/lib/content"

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="space-y-5">
      <p className="text-pretty leading-relaxed text-muted-foreground">{project.summary ?? project.description}</p>
      <ProjectContribution project={project} />
      <ProjectImpact project={project} />
      <ProjectStack project={project} />
      <ProjectLinks project={project} />
    </div>
  )
}

export function SelectedWork() {
  const [active, setActive] = useState(0)
  const rows = useRef<(HTMLLIElement | null)[]>([])

  // The row crossing the middle of the viewport drives the pinned preview
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    rows.current.forEach((r) => r && observer.observe(r))
    return () => observer.disconnect()
  }, [])

  const current = featuredProjects[active] ?? featuredProjects[0]
  if (!current) return null

  return (
    <section id="work" aria-labelledby="work-title" className="shell scroll-mt-24 py-24 lg:py-36">
      <SectionHeader
        index="01"
        label="Selected work"
        id="work-title"
        title="Things I've built"
        aside={`${featuredProjects.length} featured · ${projects.length} total`}
      />

      <div className="grid gap-x-12 lg:grid-cols-12">
        <ol className="border-t border-rule lg:col-span-7">
          {featuredProjects.map((project, i) => {
            const isActive = i === active
            const primary = getProjectLinks(project)[0]
            return (
              <li
                key={project.title}
                ref={(el) => {
                  rows.current[i] = el
                }}
                data-index={i}
                onMouseEnter={() => setActive(i)}
                onFocusCapture={() => setActive(i)}
                className="group border-b border-rule"
              >
                <article className="grid grid-cols-[2.25rem_1fr] gap-x-3 py-8 sm:grid-cols-[3rem_1fr] lg:py-10">
                  <span
                    className={cn(
                      "pt-1.5 font-mono text-xs transition-colors duration-500",
                      isActive ? "text-signal" : "text-faint",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="eyebrow mb-3">{project.category}</p>
                    <h3
                      className={cn(
                        "text-balance font-display text-display-md font-semibold transition-[color,transform] duration-500 ease-out-expo",
                        "lg:text-muted-foreground lg:group-hover:text-foreground",
                        isActive && "lg:translate-x-2 lg:!text-foreground",
                      )}
                    >
                      {primary ? (
                        <a
                          href={primary.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-sm outline-offset-4"
                        >
                          {project.title}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="ml-2 inline h-[0.6em] w-[0.6em] align-baseline text-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          />
                          <span className="sr-only"> ({primary.label}, opens in a new tab)</span>
                        </a>
                      ) : (
                        project.title
                      )}
                    </h3>

                    {/* Inline details on small screens; the pinned preview takes over on desktop */}
                    <div className="mt-6 space-y-6 lg:hidden">
                      <div className="overflow-hidden rounded-md border border-rule">
                        <ProjectMedia project={project} />
                      </div>
                      <ProjectDetails project={project} />
                    </div>

                    <p className="mt-4 hidden font-mono text-xs text-faint lg:block">
                      {project.technologies.slice(0, 4).join(" · ")}
                    </p>
                  </div>
                </article>
              </li>
            )
          })}
        </ol>

        <aside aria-label="Project preview" className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28">
            <div className="overflow-hidden rounded-md border border-rule bg-card">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectMedia project={current} />
                  <div className="space-y-5 p-7">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="eyebrow">
                        <span className="text-signal">{String(active + 1).padStart(2, "0")}</span> / {current.category}
                      </p>
                    </div>
                    <ProjectDetails project={current} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-12 flex justify-end">
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
