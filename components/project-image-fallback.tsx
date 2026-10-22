import type { Project } from "@/lib/content"
import { getProjectSlug } from "@/lib/content"

// Deterministic typographic cover for projects without an image: the category,
// an index-style monogram, and a dot field seeded from the slug, so every
// fallback looks intentional and distinct.
export function ProjectImageFallback({ project, className }: { project: Project; className?: string }) {
  const slug = getProjectSlug(project)
  const seed = [...slug].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7)
  const words = project.title.replace(/\(.*?\)/g, "").split(/[\s-:]+/).filter(Boolean)
  const monogram = words
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  const dots = Array.from({ length: 42 }, (_, i) => {
    const v = (seed >>> (i % 24)) ^ (i * 2654435761)
    return { x: (i % 7) * 16 + 8, y: Math.floor(i / 7) * 16 + 8, on: (v & 7) === 0 }
  })

  return (
    <div
      role="img"
      aria-label={`${project.title} (no preview image)`}
      className={`relative flex h-full w-full items-end justify-between overflow-hidden bg-secondary p-4 ${className ?? ""}`}
    >
      <svg aria-hidden="true" viewBox="0 0 112 96" className="absolute right-3 top-3 h-20 w-24 opacity-80">
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.on ? 3 : 1.2}
            fill={d.on ? "hsl(var(--signal))" : "hsl(var(--foreground) / 0.25)"}
          />
        ))}
      </svg>
      <span aria-hidden="true" className="font-display text-6xl font-semibold leading-none tracking-tighter text-foreground/90">
        {monogram}
      </span>
      <span className="eyebrow">{project.category}</span>
    </div>
  )
}
