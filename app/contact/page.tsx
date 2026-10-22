import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Reveal } from "@/components/reveal"
import { CopyButton } from "@/components/copy-button"
import { LocalTime } from "@/components/home/hero-client"
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon"
import { getSocial, profile } from "@/lib/content"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Muhammad Mustufa by email, phone, LinkedIn, GitHub, or WhatsApp.",
}

export default function ContactPage() {
  const channels = [
    { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/[^\d+]/g, "")}`, external: false },
    { label: "LinkedIn", value: getSocial("linkedin").handle!, href: getSocial("linkedin").href, external: true },
    { label: "GitHub", value: getSocial("github").handle!, href: getSocial("github").href, external: true },
    { label: "WhatsApp", value: profile.phone, href: getSocial("whatsapp").href, external: true, icon: true },
    { label: "Résumé", value: "Download PDF", href: profile.resume, external: true },
  ]

  return (
    <>
      <PageHeader
        index="04"
        label="Contact"
        aside={profile.location}
        title={[{ text: "Let's" }, { text: "talk.", accent: true }]}
        intro="Open to SWE internships and full-time roles, and to collaborating on projects. Reach me through any of the channels below."
      />

      <section aria-label="Contact details" className="shell pb-24 lg:pb-32">
        <div className="grid gap-x-12 gap-y-14 border-t border-rule pt-12 lg:grid-cols-12 lg:pt-16">
          <div className="min-w-0 lg:col-span-8">
            <Reveal>
              <p className="eyebrow mb-4">Write to me</p>
              <a
                href={`mailto:${profile.email}`}
                className="link-draw break-all font-display text-[clamp(1.5rem,0.9rem+2.8vw,3.5rem)] font-medium leading-tight tracking-tight hover:text-signal"
              >
                {profile.email}
              </a>
              <div className="mt-6">
                <CopyButton
                  value={profile.email}
                  label="Copy email"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-foreground"
                />
              </div>
            </Reveal>

            <ul className="mt-16 border-b border-rule">
              {channels.map((c, i) => (
                <Reveal as="li" key={c.label} delay={Math.min(i * 0.04, 0.2)} className="border-t border-rule">
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="group grid grid-cols-[6rem_1fr_auto] items-baseline gap-4 py-6 transition-colors hover:text-signal sm:grid-cols-[9rem_1fr_auto]"
                  >
                    <span className="eyebrow flex items-center gap-2 transition-colors group-hover:text-signal">
                      {c.icon && <WhatsAppIcon className="h-3.5 w-3.5" />}
                      {c.label}
                    </span>
                    <span className="min-w-0 truncate font-display text-xl font-medium tracking-tight sm:text-2xl">
                      {c.value}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-5 w-5 text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                    />
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1} className="lg:col-span-4">
            <div className="space-y-10 lg:sticky lg:top-28">
              <div>
                <h2 className="eyebrow mb-5">Availability</h2>
                <ul className="space-y-4">
                  {profile.availability.map((a) => (
                    <li key={a.label} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${a.status === "open" ? "bg-signal" : "bg-faint"}`}
                      />
                      <span className="leading-snug">{a.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-rule pt-6">
                <h2 className="eyebrow mb-3">Local time</h2>
                <LocalTime
                  timeZone={profile.timeZone}
                  label={profile.location}
                  className="block font-display text-2xl font-semibold tabular-nums tracking-tight [&>span]:text-signal"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
