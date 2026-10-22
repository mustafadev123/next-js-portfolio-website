import type { ReactNode } from "react"
import { Reveal } from "@/components/reveal"

// Numbered section header shared by every home section: index + label on the
// left, display title in the middle, optional aside on the right.
export function SectionHeader({
  index,
  label,
  title,
  id,
  aside,
}: {
  index: string
  label: string
  title: ReactNode
  id: string
  aside?: ReactNode
}) {
  return (
    <Reveal as="header" className="mb-12 grid gap-x-8 gap-y-5 border-t border-rule pt-6 lg:mb-20 lg:grid-cols-12">
      <p className="eyebrow flex items-center gap-3 lg:col-span-3">
        <span className="text-signal">{index}</span>
        <span aria-hidden="true" className="h-px w-6 bg-rule" />
        {label}
      </p>
      <h2 id={id} className="text-balance font-display text-display-lg font-semibold lg:col-span-6">
        {title}
      </h2>
      {aside && <div className="eyebrow self-end lg:col-span-3 lg:text-right">{aside}</div>}
    </Reveal>
  )
}
