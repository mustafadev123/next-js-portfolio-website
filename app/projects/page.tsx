import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ProjectsIndex } from "@/components/projects/projects-index"
import { featuredProjects, projects } from "@/lib/content"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Everything Muhammad Mustufa has built: multi-agent analytics, distributed systems, accessibility tech, applied ML research, and web platforms.",
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        index="03"
        label="Projects"
        aside={`${featuredProjects.length} featured · ${projects.length} total`}
        title={[{ text: "Everything" }, { text: "I've built.", accent: true }]}
        intro="Systems, AI, and the interfaces around them: analytics agents, consensus protocols, accessibility tech, research, and production web work. Search by name or technology, or filter by area."
      />
      <ProjectsIndex />
    </>
  )
}
