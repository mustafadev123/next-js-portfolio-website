import Image from "next/image"
import { ArrowUpRight, Github, Play } from "lucide-react"
import { ProjectImageFallback } from "@/components/project-image-fallback"
import { cn } from "@/lib/utils"
import { getProjectLinks, type Project } from "@/lib/content"

// Building blocks shared by the home Selected Work section and the Projects page.

const LinkIcon = ({ kind }: { kind: "live" | "video" | "code" }) =>
  kind === "code" ? (
    <Github aria-hidden="true" className="h-3.5 w-3.5" />
  ) : kind === "video" ? (
    <Play aria-hidden="true" className="h-3.5 w-3.5" />
  ) : (
    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
  )

export function ProjectMedia({
  project,
  priority,
  sizes = "(min-width: 1024px) 40vw, 100vw",
}: {
  project: Project
  priority?: boolean
  sizes?: string
}) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top"
        />
      ) : (
        <ProjectImageFallback project={project} />
      )}
    </div>
  )
}

export function ProjectLinks({ project }: { project: Project }) {
  const links = getProjectLinks(project)
  if (!links.length) return null
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${l.label}: ${project.title}`}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
            l.kind === "code"
              ? "border border-border hover:border-foreground"
              : "bg-foreground text-background hover:bg-signal",
          )}
        >
          <LinkIcon kind={l.kind} />
          {l.label}
        </a>
      ))}
    </div>
  )
}

export function ProjectContribution({ project }: { project: Project }) {
  if (!project.caseStudy?.contribution) return null
  return (
    <p className="text-pretty text-sm leading-relaxed">
      <span className="eyebrow mr-2 text-signal">My part</span>
      {project.caseStudy.contribution}
    </p>
  )
}

export function ProjectImpact({ project }: { project: Project }) {
  const impact = project.caseStudy?.impact ?? []
  if (!impact.length) return null
  return (
    <ul className="grid gap-2 border-l border-signal/60 pl-4">
      {impact.map((item) => (
        <li key={item} className="text-sm font-medium">
          {item}
        </li>
      ))}
    </ul>
  )
}

export function ProjectStack({ project }: { project: Project }) {
  return (
    <ul aria-label="Stack" className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-faint">
      {project.technologies.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}
