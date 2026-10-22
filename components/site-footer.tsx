import Link from "next/link"
import { ArrowUp } from "lucide-react"
import { navItems, profile } from "@/lib/content"

export function SiteFooter() {
  return (
    <footer className="relative z-[1] border-t border-rule">
      {/* Bottom padding clears the floating assistant button */}
      <div className="shell grid gap-8 py-10 pb-28 sm:pb-10 md:grid-cols-3 md:items-center">
        <p className="eyebrow">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <nav aria-label="Footer" className="md:justify-self-center">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-draw text-muted-foreground hover:text-foreground">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="#main"
          className="eyebrow group inline-flex items-center gap-2 text-foreground md:justify-self-end md:pr-20"
        >
          Back to top
          <ArrowUp aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  )
}
