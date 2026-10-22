import type { Project } from "./types"

// Single source for every project; array order is display order.
// Optional fields (summary, image, caseStudy, year, slug) can be added per entry
// without layout changes. Entries without an image render a generated fallback.
export const projects: Project[] = [
  {
    title: "Multi-Agent Auto-Analytics System (ContinuumAI)",
    description:
      "AI-driven analytics platform that automatically profiles datasets and generates dashboards and KPIs from natural-language queries using an LLM-powered assistant, with medallion-architecture pipelines across Snowflake, PostgreSQL, and BigQuery.",
    summary:
      "Profiles datasets and turns natural-language questions into dashboards and KPIs through multi-agent orchestration.",
    // Dashboard frame from the demo video (youtube.com/watch?v=rcmeS7pLnzQ)
    image: "/continuumai-dashboard.jpg",
    technologies: ["FastAPI", "Next.js", "PostgreSQL", "Redis", "OpenAI", "Snowflake", "BigQuery"],
    category: "Analytics",
    liveUrl: "https://www.youtube.com/watch?v=rcmeS7pLnzQ&t=27s",
    githubUrl: null,
    featured: true,
    spotlight: true,
    caseStudy: {
      contribution:
        "Built the AI-driven analytics platform: automatic dataset profiling, LLM-generated dashboards and KPIs from natural-language questions, and medallion-architecture pipelines with PostgreSQL and Redis caching.",
      technicalDepth: [
        "Medallion-architecture data pipelines with PostgreSQL and Redis caching",
        "Multi-agent orchestration for automated insight generation",
      ],
      impact: ["90% query success rate", "Sub-10s latency on 1GB datasets"],
    },
  },
  {
    title: "GuideWing",
    description:
      "A conceptual companion for blind and low-vision users. It pairs a smart camera (drone-mounted, fitted to a white cane, or worn as a body cam) with a smartphone and headphones to give immediate obstacle warnings and connect users to human assistance. Help can be requested by camera gesture (an open palm) or voice, responders handle pings from iMessage or a web dashboard, and the user hears spoken confirmation the moment a responder acknowledges. An Unreal Engine environment runs alongside the working camera and web prototype to simulate the hardware.",
    summary:
      "A companion for blind and low-vision users: a smart camera, phone, and headphones for obstacle warnings and hands-free access to human help.",
    // Frame from the Unreal Engine simulation in the demo video
    image: "/guidewing.jpg",
    technologies: ["Computer Vision", "Gesture Detection", "Voice Commands", "iMessage", "Web Dashboard", "Unreal Engine"],
    category: "Accessibility",
    liveUrl: "https://youtu.be/XbiNkC0ZHZ8",
    githubUrl: null,
    featured: true,
    spotlight: true,
    caseStudy: {
      problem:
        "Basic object detection isn't enough: users need to know the system understood them and what happens after they ask for help, and the responder's job has to be accessible too.",
      contribution:
        "Built the responder dispatch, routing distress pings into iMessage and a web dashboard so responders can act from tools they already use.",
      technicalDepth: [
        "Accessible triggers: open-palm gesture detection or voice commands, so a physical button is never required",
        "Frictionless dispatch: responder workflow in iMessage and a web dashboard",
        "Audio confirmation: spoken feedback the moment a responder acknowledges",
        "Unreal Engine visualization running alongside the working camera and web prototype",
      ],
      team: "Team project, built from scratch over a weekend",
    },
  },
  {
    title: "Distributed Key-Value Store",
    description:
      "Fault-tolerant distributed key-value store built on the Raft consensus algorithm, with leader election, log replication, and snapshotting for crash recovery, stress-tested across 5-node clusters.",
    summary: "Raft-based key-value store with leader election, log replication, and snapshotting.",
    image: null,
    technologies: ["Go", "Raft", "gRPC", "Distributed Systems", "Fault Tolerance"],
    category: "Distributed Systems",
    liveUrl: null,
    githubUrl: null,
    featured: true,
    caseStudy: {
      technicalDepth: [
        "Leader election, log replication, and snapshotting for crash recovery",
        "Randomized testing under node crashes, network partitions, and leader failures",
      ],
      impact: ["Correctness validated across 5-node clusters"],
    },
  },
  {
    title: "Screenshot Zero",
    description:
      "A mobile-first productivity app that turns screenshot clutter into actionable items by extracting intent, suggesting next steps, and helping users clear their camera roll to Inbox Zero.",
    // Onboarding screen from the Android app: headline and card stack laid out side by side at native size
    image: "/screenshot_zero.jpg",
    technologies: ["Flutter", "Dart", "Riverpod", "ML Kit", "FastAPI", "OpenAI", "Android"],
    category: "Productivity",
    liveUrl: "https://www.youtube.com/watch?v=rZnx14GW3YI",
    githubUrl: "https://github.com/mustafadev123/screenshot-zero",
    featured: true,
    spotlight: true,
  },
  {
    title: "Simulating Physicians: Persona Effects in Clinical LLMs",
    description:
      "Evaluated persona-conditioned diagnostic reasoning across six LLMs and nine geographic prompts using rubric-based scoring, revealing significant persona-driven performance shifts in clinical reasoning.",
    image: null,
    technologies: ["Python", "LLMs", "Prompt Engineering", "Clinical NLP", "Statistical Analysis"],
    category: "Research",
    liveUrl: null,
    githubUrl: "https://github.com/hashirsalman/simulating_physicians",
    featured: false,
  },
  {
    title: "IntelliLearn - Personalized EdTech Platform",
    description:
      "Personalized learning portal with adaptive LLM-generated quizzes, a course catalog, and RAG-backed chat guidance, deployed end-to-end on AWS. Vector search powers semantic course retrieval and GenAI pipelines generate quizzes tailored to learner progress.",
    summary: "Adaptive LLM-generated quizzes, semantic course search, and RAG-backed guidance, deployed on AWS.",
    image: "/IntelliLearn.png",
    technologies: ["Next.js", "LLM", "Vector Search", "PostgreSQL", "RAG", "AWS"],
    category: "Education",
    liveUrl: "https://intellilearn.netlify.app/",
    githubUrl: null,
    featured: true,
  },
  {
    title: "MindSync - Mental Health Platform",
    description:
      "A comprehensive mental health platform connecting users with therapists, featuring secure authentication and role-based access for both patients and practitioners.",
    image: "/mind_sync.png",
    technologies: [
      "React",
      "Authentication",
      "Healthcare",
      "User Management",
      "Responsive Design",
    ],
    category: "Healthcare",
    liveUrl: "https://sedeploy-2.vercel.app/",
    githubUrl: null,
    featured: false,
    // year: "2024",
  },
  {
    title: "Crop Visualization Platform",
    description:
      "Interactive map with satellite imagery and NDVI overlays for crop-health monitoring using geospatial analysis.",
    image: "/crop_visualization.png",
    technologies: ["React", "Satellite Imagery", "NDVI", "Geospatial Analysis", "Maps"],
    category: "Agriculture",
    liveUrl: "https://satellite-portal-crop.vercel.app/",
    githubUrl: null,
    featured: false,
    // year: "2024",
  },
  {
    title: "Nike Clone E-commerce",
    description:
      "Responsive e-commerce frontend with product gallery, advanced filtering, and interactive cart functionality.",
    image: "/nike_clone.png",
    technologies: ["React", "Tailwind CSS", "E-commerce", "Responsive Design", "Cart Management"],
    category: "E-commerce",
    liveUrl: "https://project-2-delta-mauve.vercel.app/",
    githubUrl: null,
    featured: false,
    // year: "2024",
  },
  {
    title: "Serene Airlines Website",
    description: "Professional airline booking UI with dynamic search widget, booking flow, and responsive design.",
    image: "/serene_pic.png",
    technologies: ["React", "UI/UX", "Booking System", "Dynamic Search", "Travel"],
    category: "Travel",
    liveUrl: "https://sereneair.com/",
    githubUrl: null,
    featured: true,
    // year: "2024",
  },
  {
    title: "Karachi City Guide",
    description:
      "Tourism portal featuring interactive maps, event listings, and comprehensive guide content for Karachi.",
    image: "/khi_pic.png",
    technologies: ["React", "Interactive Maps", "Tourism", "Event Management", "CMS"],
    category: "Tourism",
    liveUrl: "https://www.click.gos.pk/",
    githubUrl: null,
    featured: true,
    // year: "2023",
  },
  {
    title: "Urdu News Classification",
    description:
      "Machine learning pipeline achieving 98% accuracy in classifying Urdu news articles using advanced NLP techniques.",
    image: null,
    technologies: ["Python", "Machine Learning", "NLP", "Multinomial Naive Bayes", "Text Processing"],
    category: "AI/ML",
    liveUrl: null,
    githubUrl: "https://github.com/ha405/Urdu-News-Classification-with-ML",
    featured: false,
    // year: "2023",
  },
  {
    title: "Multimodal TB Detection",
    description:
      "Multimodal tuberculosis detection model using Efficient Vision Transformers, achieving a 94% F1-score with SHAP and Grad-CAM explainability.",
    image: null,
    technologies: ["Python", "Efficient Vision Transformers", "Explainable AI", "SHAP", "Grad-CAM"],
    category: "AI/ML",
    liveUrl: null,
    githubUrl: "https://github.com/mustafadev123/Mutlimodal_tb_detection",
    featured: false,
    caseStudy: { impact: ["94% F1-score"] },
  },
  {
    title: "RAG Diagnostic Assistant",
    description:
      "RAG-based assistant that generates context-aware diagnostic questions, deployed at Aga Khan University Hospital and Shalimar Hospital.",
    image: null,
    technologies: ["RAG", "LLMs", "LangChain", "Python"],
    category: "Healthcare",
    liveUrl: null,
    githubUrl: null,
    featured: false,
  },
  {
    title: "Scalable Agentic RAG Platform",
    description:
      "Agentic RAG platform built on Databricks, Spark, Delta Live Tables, MLflow, and LangChain, enabling multi-agent orchestration and streaming ETL for production-scale analytics.",
    image: null,
    technologies: ["Databricks", "Spark", "Delta Live Tables", "MLflow", "LangChain"],
    category: "AI/ML",
    liveUrl: null,
    githubUrl: null,
    featured: false,
  },
];

export const getProjectSlug = (project: Project) =>
  project.slug ??
  project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

export const featuredProjects = projects.filter((p) => p.featured)
export const spotlightProjects = featuredProjects.filter((p) => p.spotlight)

/** Filter categories in first-seen order, so new categories appear automatically. */
export const projectCategories = ["All", ...new Set(projects.map((p) => p.category))]

/** Labelled outbound links for a project, primary first. Demo videos are labelled as such. */
export function getProjectLinks(project: Project) {
  const links: { label: string; href: string; kind: "live" | "video" | "code" }[] = []
  if (project.liveUrl) {
    const video = /youtube\.com|youtu\.be|vimeo\.com/.test(project.liveUrl)
    links.push({ label: video ? "Watch demo" : "Live site", href: project.liveUrl, kind: video ? "video" : "live" })
  }
  if (project.githubUrl) links.push({ label: "Source code", href: project.githubUrl, kind: "code" })
  return links
}
