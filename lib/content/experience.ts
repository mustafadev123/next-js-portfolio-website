import type { Experience } from "./types"

// `highlights` is the full copy (About page); `summary` is the condensed copy for
// compact placements. GSoC, Synergates and 10Pearls follow the current résumé;
// Gerry's and Netsol are not on the current résumé and keep their earlier site copy.
export const experience: Experience[] = [
  {
    company: "Georgia State University",
    role: "Teaching Assistant, Software Engineering",
    period: "2026 – Present",
    location: "Atlanta, Georgia",
    // Add 1–2 lines about the course and responsibilities when available
    highlights: [],
  },
  {
    company: "Google Summer of Code – Google DeepMind",
    role: "Open Source Contributor (LLM Infrastructure)",
    period: "May 2025 – Aug 2025",
    location: "Remote",
    highlights: [
      "Developed optimized batching pipelines for Gemma 2 embedding generation via KerasHub, implementing dynamic batch size optimization to maximize throughput on datasets up to 10GB without OOM failures.",
      "Contributed embedding infrastructure to the upstream KerasHub open-source repo via an open PR, enabling efficient vector generation from Gemma 2 for downstream ML applications.",
    ],
    summary: [
      "Dynamic batching for Gemma 2 embeddings in KerasHub, up to 10GB datasets without OOM",
      "Upstream embedding infrastructure PR to KerasHub",
    ],
  },
  {
    company: "The Synergates Business Solutions",
    role: "Backend Engineer",
    period: "Jun 2024 – Oct 2024",
    location: "Karachi, Pakistan",
    highlights: [
      "Engineered scalable backend systems using Laravel MVC and REST APIs for the CLICK (Competitive & Livable City of Karachi) platform under the Sindh Local Government & Housing Town Planning Department (World Bank funded), serving 16M+ citizens and reducing load times by 15%.",
      "Built real-time vehicle detection pipeline integrating OpenCV with .NET for the Sindh Smart Surveillance System deployed across provincial highways, processing 10K+ vehicle records daily with automated analytics.",
    ],
    summary: [
      "Laravel + REST backend for the World Bank–funded CLICK platform (16M+ citizens, 15% faster loads)",
      "Real-time OpenCV + .NET vehicle detection, 10K+ records daily",
    ],
  },
  {
    company: "10Pearls Pakistan",
    role: "SWE Intern",
    period: "Jun 2024 – Jul 2024",
    location: "Remote",
    highlights: [
      "Developed backend services using Java Spring Boot with REST APIs and MySQL, improving API reliability and system performance.",
      "Reduced software bugs by 30% through backend testing with JUnit and automated frontend testing using Selenium.",
    ],
    summary: [
      "Spring Boot + MySQL backend services and REST APIs",
      "Reduced bugs by 30% with JUnit and Selenium testing",
    ],
  },
  {
    company: "GERRY'S INFORMATION TECHNOLOGY",
    role: "SWE Intern",
    period: "Jul 2023 – Sep 2023",
    highlights: [
      "Optimized website performance by implementing transitioning hooks, achieving a 30% reduction in page load times.",
      "Designed responsive web interfaces, leading to a 40% increase in mobile traffic and a 25% boost in user engagement.",
      "Collaborated with cross-functional teams to develop scalable front-end solutions for aviation companies and FedEx.",
    ],
    summary: [
      "Optimized aviation & FedEx web apps (30% faster load, 40% more mobile traffic)",
      "Designed responsive UIs and collaborated on scalable front-end solutions",
    ],
  },
  {
    company: "Netsol Pakistan",
    role: "SWE Intern",
    period: "May 2023 – Aug 2023",
    highlights: [
      "Developed Python scripts using Flask to automate testing of Flex calculation engine",
      "Assisted in integrating new calculation modules into Flex API",
      "Contributed to faster processing times and improved scalability",
    ],
    summary: [
      "Automated Flex engine testing with Flask",
      "Improved API scalability for enterprise finance product",
    ],
  },
]
