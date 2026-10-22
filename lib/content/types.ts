// Shared content types. Everything beyond the core fields is optional so
// entries can be added or trimmed without touching the layouts that render them.

export interface Link {
  label: string
  href: string
}

export interface CaseStudy {
  problem?: string
  contribution?: string
  technicalDepth?: string[]
  impact?: string[]
  role?: string
  team?: string
  links?: Link[]
}

export interface Project {
  title: string
  description: string
  category: string
  technologies: string[]
  /** Shorter copy for compact placements (hero, home teasers). Falls back to `description`. */
  summary?: string
  /** Path under /public. Layouts render a generated fallback when this is missing. */
  image?: string | null
  liveUrl?: string | null
  githubUrl?: string | null
  featured?: boolean
  year?: string
  slug?: string
  caseStudy?: CaseStudy
}

export interface Experience {
  company: string
  role: string
  period: string
  location?: string
  /** Full list, used on the About page. */
  highlights: string[]
  /** Condensed list for compact placements. Falls back to `highlights`. */
  summary?: string[]
}

export interface SocialLink {
  id: "email" | "github" | "linkedin" | "whatsapp"
  label: string
  href: string
  handle?: string
}

export interface SkillGroup {
  category: string
  items: string[]
}
