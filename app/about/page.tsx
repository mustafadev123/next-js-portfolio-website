import type { Metadata } from "next"
import Link from "next/link"
import { ArrowDownRight, ArrowRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { SectionHeader } from "@/components/section-header"
import { Reveal } from "@/components/reveal"
import { ExperienceTimeline } from "@/components/home/experience-timeline"
import { Toolkit } from "@/components/home/toolkit"
import { currentEducation, profile } from "@/lib/content"

export const metadata: Metadata = {
  title: "About",
  description:
    "Muhammad Mustufa is a software engineer working across backend systems and applied AI, pursuing an MS in Computer Science at Georgia State University.",
}

export default function AboutPage() {
  const status = profile.availability.find((a) => a.status === "open")
  const [lead, ...rest] = profile.bio

  const facts = [
    { term: "Currently", value: `${currentEducation.degree}, ${currentEducation.school}` },
    { term: "Based in", value: profile.location },
    ...(status ? [{ term: "Status", value: status.label }] : []),
  ]

  return (
    <>
      <PageHeader
        index="02"
        label="About"
        aside={profile.location}
        title={[{ text: "Hi, I'm" }, { text: "Muhammad.", accent: true }]}
        intro={profile.role}
      />

      {/* Story + quick facts */}
      <section aria-label="Story" className="shell pb-20 lg:pb-28">
        <div className="grid gap-x-12 gap-y-14 border-t border-rule pt-12 lg:grid-cols-12 lg:pt-16">
          <Reveal className="space-y-6 lg:col-span-7">
            <p className="text-pretty font-display text-[clamp(1.375rem,1.1rem+1vw,2rem)] font-medium leading-snug tracking-tight">
              {lead}
            </p>
            {rest.map((p) => (
              <p key={p} className="max-w-[64ch] text-pretty text-lg leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <dl className="divide-y divide-rule border-y border-rule">
                {facts.map((f) => (
                  <div key={f.term} className="grid grid-cols-[6.5rem_1fr] gap-4 py-4">
                    <dt className="eyebrow pt-1">{f.term}</dt>
                    <dd className="text-sm leading-relaxed">{f.value}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-4">
                  <dt className="eyebrow pt-1">Email</dt>
                  <dd className="text-sm">
                    <a href={`mailto:${profile.email}`} className="link-draw break-all hover:text-signal">
                      {profile.email}
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-4">
                  <dt className="eyebrow pt-1">Phone</dt>
                  <dd className="text-sm">
                    <a href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`} className="link-draw hover:text-signal">
                      {profile.phone}
                    </a>
                  </dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-signal"
                >
                  Download résumé
                  <ArrowDownRight aria-hidden="true" className="h-4 w-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-foreground"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Proof */}
        <dl className="mt-20 grid gap-x-8 gap-y-8 border-t border-rule pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {profile.proof.map((item, i) => (
            <Reveal key={item.value} delay={i * 0.05}>
              <dt className="font-display text-[2.5rem] font-semibold leading-none tracking-tight">{item.value}</dt>
              <dd className="mt-3 text-sm leading-snug text-muted-foreground">{item.label}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Education */}
      <section aria-labelledby="education-title" className="shell py-20 lg:py-28">
        <SectionHeader index="01" label="Education" id="education-title" title="Where I've studied" />
        <ol className="border-b border-rule">
          {profile.education.map((ed, i) => (
            <Reveal
              as="li"
              key={ed.school}
              delay={i * 0.05}
              className="grid gap-x-8 gap-y-4 border-t border-rule py-9 lg:grid-cols-12"
            >
              <div className="lg:col-span-3">
                <p className="font-mono text-xs uppercase tracking-[0.12em]">{ed.period}</p>
                <p className="eyebrow mt-2">{ed.location}</p>
              </div>
              <div className="lg:col-span-5">
                <h3 className="text-balance font-display text-2xl font-semibold leading-tight tracking-tight sm:text-[1.75rem]">
                  {ed.school}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {ed.degree}
                  {"gpa" in ed && ` · GPA ${ed.gpa}`}
                </p>
              </div>
              {"coursework" in ed && (
                <div className="lg:col-span-4">
                  <h4 className="eyebrow mb-3">Coursework</h4>
                  <p className="text-pretty leading-relaxed text-muted-foreground">{ed.coursework.join(" · ")}</p>
                </div>
              )}
            </Reveal>
          ))}
        </ol>
      </section>

      <ExperienceTimeline index="02" detailed />

      <div className="pb-20 lg:pb-28">
        <Toolkit index="03" marquee={false} />
      </div>

      {/* Next steps */}
      <section aria-label="Next" className="shell pb-24">
        <div className="grid gap-6 border-t border-rule pt-10 sm:grid-cols-2">
          <Link href="/projects" className="group block">
            <p className="eyebrow mb-3">Next</p>
            <p className="inline-flex items-center gap-3 font-display text-display-md font-semibold">
              <span className="link-draw">See the work</span>
              <ArrowRight
                aria-hidden="true"
                className="h-[0.7em] w-[0.7em] text-signal transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
              />
            </p>
          </Link>
          <Link href="/contact" className="group block sm:text-right">
            <p className="eyebrow mb-3">Or</p>
            <p className="inline-flex items-center gap-3 font-display text-display-md font-semibold">
              <span className="link-draw">Say hello</span>
              <ArrowRight
                aria-hidden="true"
                className="h-[0.7em] w-[0.7em] text-signal transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
              />
            </p>
          </Link>
        </div>
      </section>
    </>
  )
}
