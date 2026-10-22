import { ArrowUpRight } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { Reveal } from "@/components/reveal"
import { profile, socials } from "@/lib/content"

export function ContactCta() {
  const status = profile.availability.find((a) => a.status === "open")
  const links = [
    ...socials.filter((s) => s.id !== "email"),
    { id: "resume", label: "Résumé", href: profile.resume },
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="shell scroll-mt-24 pb-16 pt-24 lg:pt-32">
      <div className="border-t border-rule pt-6">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-signal">04</span>
          <span aria-hidden="true" className="h-px w-6 bg-rule" />
          Contact
        </p>

        <Reveal>
          <h2
            id="contact-title"
            className="mt-10 text-balance font-display text-display-xl font-semibold [font-variation-settings:'opsz'_96]"
          >
            Let&apos;s build something <span className="text-signal">useful.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <a
              href={`mailto:${profile.email}`}
              className="link-draw break-all font-display text-[clamp(1.4rem,0.9rem+2.6vw,3.25rem)] font-medium leading-tight tracking-tight hover:text-signal"
            >
              {profile.email}
            </a>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <CopyButton
                value={profile.email}
                label="Copy email"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-foreground"
              />
              {status && (
                <span className="eyebrow flex items-center gap-2">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-signal" />
                  {status.label}
                </span>
              )}
            </div>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-lg hover:text-signal"
                >
                  <span className="link-draw">{l.label}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 opacity-60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
