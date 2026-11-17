import type { SkillGroup, SocialLink } from "./types"

// Single source for personal details, synced with public/Mustufa_Resume.pdf.
// See docs/content-notes.md for open questions.

export const profile = {
  name: "Muhammad Mustufa",
  shortName: "Mustufa",
  initials: "MM",
  role: "Software Engineer · Backend Systems & Applied AI",
  /** Hero hook, split into lines for the staggered reveal. `accent` marks the highlighted phrase. */
  headline: [
    { text: "I build the systems" },
    { text: "that make" },
    { text: "AI useful.", accent: true },
  ],
  tagline:
    "From multi-agent analytics to real-time computer vision, I connect AI capabilities with reliable backends and usable interfaces to solve practical problems.",
  /** Résumé-backed proof points shown under the hero. */
  proof: [
    { value: "GSoC '25", label: "Google DeepMind · Gemma 2 embeddings in KerasHub" },
    { value: "16M+", label: "citizens served by the CLICK backend I engineered" },
    { value: "10K+", label: "vehicle records a day through my real-time CV pipeline" },
    { value: "5 wins", label: "across 10+ hackathons" },
  ],
  /** Short focus labels used as annotations around the hero figure. */
  focusAreas: ["Backend systems", "LLM infrastructure", "Computer vision"],
  location: "Atlanta, Georgia",
  timeZone: "America/New_York",
  email: "mustufashadab123@gmail.com",
  phone: "+1 (470) 819-7646",
  website: "https://muhammadmustafa-portfolio.vercel.app",
  resume: "/Mustufa_Resume.pdf",
  availability: [
    { label: "Open to SWE internships / full-time roles", status: "open" },
    { label: "Open to collaboration", status: "open" },
    { label: "MS Computer Science at Georgia State", status: "busy" },
  ],
  education: [
    {
      school: "Georgia State University",
      shortSchool: "Georgia State",
      degree: "MS, Computer Science",
      period: "2026 – Present",
      location: "Atlanta, Georgia",
    },
    {
      school: "Lahore University of Management Sciences (LUMS)",
      shortSchool: "LUMS",
      degree: "BSc, Computer Science",
      period: "Sep 2022 – Jun 2026",
      gpa: "3.70",
      location: "Lahore, Pakistan",
      coursework: [
        "Deep Learning",
        "Topics in LLMs",
        "Machine Learning",
        "Data Structures and Algorithms",
        "Operating Systems",
        "Databases",
        "Machine Learning Operations (MLOps)",
        "Software Engineering",
      ],
    },
  ],
  bio: [
    "I'm a software engineer who builds the systems that make AI useful: backends, data pipelines, and LLM infrastructure that hold up in production. I'm currently pursuing an MS in Computer Science at Georgia State University, where I'm also a teaching assistant for software engineering, after a BSc in Computer Science from LUMS.",
    "As a contract machine learning engineer for a fintech company in the MENA region, I shipped a production text-to-SQL pipeline built on agentic RAG, reaching 95%+ query accuracy. In parallel, as a Google Summer of Code contributor with Google DeepMind, I built batching pipelines for Gemma 2 embedding generation in KerasHub. Before that I engineered Laravel backends for the World Bank–funded CLICK platform serving 16M+ citizens of Karachi, and a real-time OpenCV vehicle-detection pipeline for the Sindh Smart Surveillance System.",
    "My projects span multi-agent analytics, a Raft-based distributed key-value store, RAG assistants deployed in hospitals, and explainable medical imaging. I care about the full path from model to backend to an interface people can actually use.",
  ],
} as const

export const currentEducation = profile.education[0]

export const socials: SocialLink[] = [
  { id: "email", label: "Email", href: `mailto:${profile.email}`, handle: profile.email },
  { id: "github", label: "GitHub", href: "https://github.com/mustafadev123", handle: "mustafadev123" },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-mustufa-02a108230/",
    handle: "muhammad-mustufa",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/14708197646?text=Hi%20Muhammad%2C%20I%20visited%20your%20portfolio%20website%20and%20I'm%20interested%20in%20discussing%20a%20potential%20project%20or%20opportunity.",
  },
]

export const getSocial = (id: SocialLink["id"]) => socials.find((s) => s.id === id)!

export const skills: SkillGroup[] = [
  { category: "Languages", items: ["Go", "Python", "C++", "Java", "JavaScript", "SQL"] },
  {
    category: "Frameworks & Databases",
    items: ["Node.js", "Next.js", "Spring Boot", "Laravel", "React", "PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    category: "DevOps & Cloud",
    items: ["Docker", "Kubernetes", "CI/CD", "AWS (Lambda, EC2, S3)", "Azure", "Databricks"],
  },
  {
    category: "ML/AI Systems",
    items: ["PyTorch", "TensorFlow", "LangChain", "RAG", "LLMs", "OpenCV", "Scikit-learn", "Pandas"],
  },
  { category: "Core Concepts", items: ["OOP", "Design Patterns", "SOLID", "REST APIs", "Microservices"] },
]

/**
 * Logos shown in the Toolkit marquee, in display order. Names must match a key in
 * STACK_ICONS (components/ui/tech-slider.tsx); unknown names are skipped.
 */
export const stack = [
  "Python",
  "Go",
  "Java",
  "C++",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Spring Boot",
  "Laravel",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Docker",
  "Kubernetes",
  "AWS",
  "Databricks",
  "PyTorch",
  "TensorFlow",
  "LangChain",
  "OpenCV",
  "Scikit-learn",
  "Pandas",
]

export const navItems = [
  { name: "Home", href: "/", hint: "Start" },
  { name: "About", href: "/about", hint: "Story" },
  { name: "Projects", href: "/projects", hint: "Work" },
  { name: "Contact", href: "/contact", hint: "Talk" },
]
