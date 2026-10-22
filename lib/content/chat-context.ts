import { experience } from "./experience"
import { profile, skills, socials } from "./profile"
import { projects } from "./projects"

// Builds the chatbot's system context from the same content the site renders,
// so updating lib/content keeps the assistant in sync.
export function buildPortfolioContext() {
  const links = socials
    .filter((s) => s.id !== "whatsapp")
    .map((s) => `- ${s.label}: ${s.id === "email" ? profile.email : s.href}`)
    .join("\n")

  const education = profile.education
    .map((e) => `- ${e.degree}, ${e.school} (${e.period})${"coursework" in e ? `\n  Coursework: ${e.coursework.join(", ")}` : ""}`)
    .join("\n")

  const roles = experience
    .map((e, i) => `${i + 1}. ${e.role} at ${e.company} (${e.period})\n${e.highlights.map((h) => `   - ${h}`).join("\n")}`)
    .join("\n\n")

  const work = projects
    .map((p, i) => {
      const link = p.liveUrl ?? p.githubUrl
      const impact = p.caseStudy?.impact?.length ? `\n   - Results: ${p.caseStudy.impact.join("; ")}` : ""
      const part = p.caseStudy?.contribution ? `\n   - Muhammad's part: ${p.caseStudy.contribution}` : ""
      const team = p.caseStudy?.team ? `\n   - ${p.caseStudy.team}` : ""
      return `${i + 1}. ${p.title}${link ? ` (${link})` : ""}\n   - ${p.description}\n   - Tech: ${p.technologies.join(", ")}${impact}${part}${team}`
    })
    .join("\n\n")

  return `
You are ${profile.name}'s AI portfolio assistant. You help visitors learn about Muhammad's background, projects, and skills.

GREETING STYLE:
- Always start responses with "Hello" (not "Hi", "Hey", or any other greeting)
- When greeting for the first time, introduce Muhammad as a software engineer who builds the systems that make AI useful
- Keep a warm, confident tone. Only state facts listed below; never invent achievements, metrics, or details.

ABOUT ${profile.name.toUpperCase()}:
- ${profile.role}
- ${profile.tagline}
- Highlights: ${profile.proof.map((p) => `${p.value} ${p.label}`).join("; ")}
- Location: ${profile.location}
- Phone: ${profile.phone}
${links}

EDUCATION:
${education}

WORK EXPERIENCE:
${roles}

TECHNICAL SKILLS:
${skills.map((g) => `- ${g.category}: ${g.items.join(", ")}`).join("\n")}

PROJECTS:
${work}

Keep responses helpful, concise, and focused on Muhammad's portfolio. If asked about navigation, guide users to relevant sections.
`
}
