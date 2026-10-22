import type { CSSProperties } from "react"
import {
  siAmazonwebservices,
  siCplusplus,
  siDatabricks,
  siDocker,
  siGo,
  siJavascript,
  siKubernetes,
  siLangchain,
  siLaravel,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpencv,
  siOpenjdk,
  siPandas,
  siPostgresql,
  siPython,
  siPytorch,
  siReact,
  siScikitlearn,
  siSpringboot,
  siTensorflow,
  type SimpleIcon,
} from "simple-icons"
import { stack } from "@/lib/content"

// Single-path SVG logos from simple-icons (CC0). They render in currentColor,
// so they are monochrome in both themes without image filters.
const STACK_ICONS: Record<string, SimpleIcon> = {
  Python: siPython,
  Go: siGo,
  Java: siOpenjdk,
  "C++": siCplusplus,
  JavaScript: siJavascript,
  React: siReact,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  "Spring Boot": siSpringboot,
  Laravel: siLaravel,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  MongoDB: siMongodb,
  Docker: siDocker,
  Kubernetes: siKubernetes,
  AWS: siAmazonwebservices,
  Databricks: siDatabricks,
  PyTorch: siPytorch,
  TensorFlow: siTensorflow,
  LangChain: siLangchain,
  OpenCV: siOpencv,
  "Scikit-learn": siScikitlearn,
  Pandas: siPandas,
}

/** Relative luminance (0–1) of a hex colour, used to skip brand colours that would vanish on hover. */
function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const items = stack
  .filter((name) => STACK_ICONS[name])
  .map((name) => {
    const icon = STACK_ICONS[name]
    const l = luminance(icon.hex)
    const brand = `#${icon.hex}`
    return {
      name,
      path: icon.path,
      // Hover colour per theme: brand colour unless it lacks contrast with that background
      onDark: l > 0.07 ? brand : "hsl(var(--foreground))",
      onLight: l < 0.45 ? brand : "hsl(var(--foreground))",
    }
  })

function LogoSet({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      aria-label={duplicate ? undefined : "Technologies I work with"}
      // Trailing padding equals the gap, so each set is exactly one "period" wide
      className="marquee-set flex shrink-0 items-center gap-x-[var(--marquee-gap)] pr-[var(--marquee-gap)]"
    >
      {items.map((item) => (
        <li
          key={item.name}
          title={item.name}
          className="tech-logo shrink-0 text-foreground/65 transition-[color,transform] duration-300 hover:-translate-y-0.5"
          style={{ "--logo-dark": item.onDark, "--logo-light": item.onLight } as CSSProperties}
        >
          <svg
            role="img"
            aria-label={duplicate ? undefined : item.name}
            viewBox="0 0 24 24"
            className="h-8 w-8 sm:h-10 sm:w-10 lg:h-11 lg:w-11"
            fill="currentColor"
          >
            <path d={item.path} />
          </svg>
        </li>
      ))}
    </ul>
  )
}

/**
 * Infinite logo marquee. Two identical sets sit side by side and the track
 * translates by exactly -50%, so the second set lands where the first began:
 * no jump, no trailing gap. Pauses on hover/focus; static and wrapped for
 * reduced motion.
 */
export function TechSlider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`marquee relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] ${className}`}
      style={{ "--marquee-duration": `${items.length * 3.2}s` } as CSSProperties}
    >
      <div className="marquee-track flex w-max">
        <LogoSet />
        <LogoSet duplicate />
      </div>
    </div>
  )
}

export default TechSlider
