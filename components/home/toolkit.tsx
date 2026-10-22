import { SectionHeader } from "@/components/section-header"
import { Reveal } from "@/components/reveal"
import { TechSlider } from "@/components/ui/tech-slider"
import { profile, skills } from "@/lib/content"

export function Toolkit({ index = "03", marquee = true }: { index?: string; marquee?: boolean }) {
  return (
    <section id="toolkit" aria-labelledby="toolkit-title" className="shell scroll-mt-24 pt-24 lg:pt-32">
      <SectionHeader
        index={index}
        label="Toolkit"
        id="toolkit-title"
        title="What I work with"
        aside={profile.education.map((e) => e.shortSchool).join(" · ")}
      />

      {/* Full-bleed: cancel the shell gutter so logos run edge to edge */}
      {marquee && (
        <Reveal className="-mx-[var(--gutter)] mb-16 lg:mb-24">
          <TechSlider />
        </Reveal>
      )}

      {/* Spec-sheet rows: label on the left, skills flowing across the full width */}
      <div>
        {skills.map((group, i) => (
          <Reveal
            key={group.category}
            delay={Math.min(i * 0.05, 0.2)}
            className="group/row grid gap-x-8 gap-y-4 border-t border-rule py-7 lg:grid-cols-12 lg:py-9"
          >
            <div className="flex items-baseline justify-between gap-4 lg:col-span-3 lg:block">
              <h3 className="eyebrow transition-colors group-hover/row:text-foreground">{group.category}</h3>
              <span className="font-mono text-xs text-faint lg:mt-3 lg:block">
                {String(group.items.length).padStart(2, "0")}
              </span>
            </div>
            <ul className="flex flex-wrap items-baseline gap-x-7 gap-y-3 lg:col-span-9 lg:gap-x-10">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="font-display text-[clamp(1.25rem,1rem+1vw,2rem)] font-medium leading-tight tracking-tight text-foreground/90 transition-colors duration-300 hover:text-signal"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
