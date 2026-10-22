"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { SectionHeader } from "@/components/section-header"
import { Reveal } from "@/components/reveal"
import { experience } from "@/lib/content"

/** `detailed` shows full highlights (About page) instead of the condensed summary (home). */
export function ExperienceTimeline({ index = "02", detailed = false }: { index?: string; detailed?: boolean }) {
  const list = useRef<HTMLOListElement>(null)
  // Line grows from the first role to the last as the list scrolls through the viewport
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 75%", "end 55%"] })

  return (
    <section id="experience" aria-labelledby="experience-title" className="shell scroll-mt-24 py-24 lg:py-36">
      <SectionHeader
        index={index}
        label="Experience"
        id="experience-title"
        title="Where I've shipped"
        aside={`${experience.length} roles`}
      />

      <ol ref={list} className="relative">
        {/* Track + progress line */}
        <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-rule lg:left-[calc(25%+5px)]" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: scrollYProgress }}
          // Reduced motion: show the full line instead of a scroll-linked one (CSS keeps SSR and client markup identical)
          className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-signal motion-reduce:![transform:none] lg:left-[calc(25%+5px)]"
        />

        {experience.map((role, i) => (
          <Reveal
            as="li"
            key={`${role.company}-${role.period}`}
            delay={Math.min(i * 0.05, 0.2)}
            className="relative grid gap-x-8 gap-y-3 pb-14 pl-9 last:pb-0 lg:grid-cols-12 lg:pl-0"
          >
            {/* Marker */}
            <motion.span
              aria-hidden="true"
              initial={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
              whileInView={{ backgroundColor: "hsl(var(--signal))", borderColor: "hsl(var(--signal))" }}
              viewport={{ once: true, margin: "0px 0px -45% 0px" }}
              transition={{ duration: 0.4 }}
              className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 lg:left-[25%]"
            />

            <div className="lg:col-span-3 lg:pr-8 lg:text-right">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-foreground">{role.period}</p>
              {role.location && <p className="eyebrow mt-2">{role.location}</p>}
            </div>

            <div className="lg:col-span-4 lg:pl-10">
              <h3 className="text-balance font-display text-2xl font-semibold leading-tight tracking-tight sm:text-[1.75rem]">
                {role.role}
              </h3>
              <p className="mt-2 text-muted-foreground">{role.company}</p>
            </div>

            <ul className="space-y-2.5 lg:col-span-5">
              {(detailed ? role.highlights : (role.summary ?? role.highlights)).map((item) => (
                <li key={item} className="flex gap-3 text-pretty leading-relaxed text-muted-foreground">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
