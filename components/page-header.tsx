import type { ReactNode } from "react"

// Top of every inner page: meta row, staggered display title, intro, optional aside.
export function PageHeader({
  label,
  index,
  title,
  intro,
  aside,
}: {
  label: string
  index: string
  /** Lines of the display title; the last line with `accent` is set in the signal colour. */
  title: { text: string; accent?: boolean }[]
  intro?: ReactNode
  aside?: ReactNode
}) {
  return (
    <header className="relative isolate overflow-hidden pt-[var(--nav-h)]">
      <div
        aria-hidden="true"
        className="column-guides pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
      />
      <div className="shell">
        <div className="reveal-fade flex items-center justify-between gap-4 border-b border-rule py-4">
          <p className="eyebrow flex items-center gap-3">
            <span className="text-signal">{index}</span>
            <span aria-hidden="true" className="h-px w-6 bg-rule" />
            {label}
          </p>
          {aside && <div className="eyebrow text-right">{aside}</div>}
        </div>

        <div className="grid gap-x-8 gap-y-8 pb-16 pt-14 lg:grid-cols-12 lg:pb-24 lg:pt-20">
          <h1 className="text-balance font-display text-display-xl font-semibold [font-variation-settings:'opsz'_96] lg:col-span-8">
            {title.map((line, i) => (
              // Trailing space keeps the heading's text content readable ("Hi, I'm Muhammad.")
              <span key={line.text} className="reveal-line" style={{ ["--i" as string]: i }}>
                <span className={line.accent ? "text-signal" : undefined}>{line.text}</span>{" "}
              </span>
            ))}
          </h1>
          {intro && (
            <div
              className="reveal-fade max-w-[46ch] self-end text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:col-span-4"
              style={{ ["--i" as string]: 3 }}
            >
              {intro}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
