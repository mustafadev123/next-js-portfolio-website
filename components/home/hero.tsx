import Link from "next/link"
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react"
import { CoreFigure } from "@/components/core/core-figure"
import { HeroCore } from "@/components/core/hero-core"
import { AskAssistantButton, LocalTime } from "@/components/home/hero-client"
import { currentEducation, getSocial, profile } from "@/lib/content"

// Callout anchors around the figure, as percentages of the figure box.
// Labels come from profile.focusAreas, so any number of them (up to 3) lays out.
const CALLOUT_POSITIONS = [
  "left-0 top-[12%] flex-row",
  "right-0 top-[48%] flex-row-reverse text-right",
  "left-[6%] bottom-[8%] flex-row",
]

export function Hero() {
  const links = [getSocial("github"), getSocial("linkedin"), getSocial("email")]
  const openStatus = profile.availability.find((a) => a.status === "open")

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-[var(--nav-h)]">
      {/* Backdrop: faint column guides fading out towards the bottom */}
      <div
        aria-hidden="true"
        className="column-guides pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <div className="shell flex min-h-[calc(100svh-var(--nav-h))] flex-col">
        {/* Meta row */}
        <div className="reveal-fade flex items-center justify-between gap-4 border-b border-rule py-4">
          {openStatus && (
            <span className="eyebrow flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              {openStatus.label}
            </span>
          )}
          <span className="eyebrow hidden lg:inline">
            {currentEducation.degree} · {currentEducation.school}
          </span>
          <LocalTime timeZone={profile.timeZone} label={profile.location.split(",")[0]} />
        </div>

        <div className="grid flex-1 grid-cols-1 items-center gap-x-8 gap-y-10 py-10 lg:grid-cols-12 lg:py-12">
          {/* Copy */}
          <div className="min-w-0 lg:col-span-8">
            <p className="eyebrow reveal-fade mb-6 flex items-center gap-3" style={{ ["--i" as string]: 0 }}>
              <span aria-hidden="true" className="h-px w-8 bg-signal" />
              {profile.role}
            </p>

            <h1
              id="hero-title"
              className="text-balance font-display text-display-xl font-semibold [font-variation-settings:'opsz'_96]"
            >
              <span className="sr-only">
                {profile.name}, {profile.role}.{" "}
              </span>
              {profile.headline.map((line, i) => (
                <span key={line.text} className="reveal-line" style={{ ["--i" as string]: i }}>
                  <span className={"accent" in line && line.accent ? "text-signal" : undefined}>{line.text}</span>{" "}
                </span>
              ))}
            </h1>

            <p
              className="reveal-fade mt-8 max-w-[44ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
              style={{ ["--i" as string]: 3 }}
            >
              {profile.tagline}
            </p>

            <div
              className="reveal-fade mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
              style={{ ["--i" as string]: 4 }}
            >
              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 rounded-full bg-foreground py-3.5 pl-6 pr-3.5 text-sm font-medium text-background transition-colors hover:bg-signal"
              >
                View my projects
                <span className="grid h-7 w-7 place-items-center rounded-full bg-background/15 transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </Link>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium transition-colors hover:border-foreground"
              >
                Download résumé
                <ArrowDownRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </a>
              <AskAssistantButton className="inline-flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-signal" />
            </div>

            <ul
              aria-label="Elsewhere"
              className="reveal-fade mt-8 flex flex-wrap items-center gap-x-6 gap-y-2"
              style={{ ["--i" as string]: 5 }}
            >
              {links.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target={s.id === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="eyebrow group inline-flex items-center gap-1 text-foreground hover:text-signal"
                  >
                    <span className="link-draw">{s.label}</span>
                    <ArrowUpRight aria-hidden="true" className="h-3 w-3 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Figure */}
          <figure
            className="reveal-fade relative mx-auto w-full max-w-[min(100%,24rem)] sm:max-w-md lg:col-span-4 lg:max-w-none"
            style={{ ["--i" as string]: 2 }}
          >
            <div data-core-anchor className="relative aspect-square">
              {/* Crop marks */}
              {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map(
                (pos) => (
                  <span key={pos} aria-hidden="true" className={`absolute h-4 w-4 border-foreground/40 ${pos}`} />
                ),
              )}

              <HeroCore className="absolute inset-[6%] w-auto">
                <CoreFigure className="core-fallback h-full w-full transition-[transform,opacity] duration-700 ease-out-expo group-hover:scale-[1.03]" />
              </HeroCore>

              {/* Annotations */}
              <ul aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
                {profile.focusAreas.slice(0, CALLOUT_POSITIONS.length).map((area, i) => (
                  <li key={area} className={`absolute flex items-center gap-2 ${CALLOUT_POSITIONS[i]}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                    <span className="h-px w-6 bg-foreground/30" />
                    <span className="eyebrow whitespace-nowrap rounded-sm bg-background/80 px-1.5 py-1 text-foreground">
                      {area}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-4">
              <span className="eyebrow">Fig. 01 — The core</span>
              <span className="eyebrow text-faint">Click to talk to it</span>
            </figcaption>
          </figure>
        </div>

        {/* Proof strip: résumé-backed numbers */}
        <dl
          className="reveal-fade grid grid-cols-1 gap-x-8 gap-y-6 border-t border-rule py-6 sm:grid-cols-2 lg:grid-cols-4"
          style={{ ["--i" as string]: 5 }}
        >
          {profile.proof.map((item) => (
            <div key={item.value} className="flex items-baseline gap-4 sm:block">
              <dt className="shrink-0 font-display text-3xl font-semibold leading-none tracking-tight sm:mb-2 sm:text-[2rem]">
                {item.value}
              </dt>
              <dd className="text-sm leading-snug text-muted-foreground">{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
