"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as Dialog from "@radix-ui/react-dialog"
import { ArrowUpRight, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { navItems, profile, socials } from "@/lib/content"

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)

export function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  // Solid background once scrolled; slide away while scrolling down, return on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 160 && y > lastY.current)
      lastY.current = y
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[transform,background-color,border-color] duration-500 ease-out-expo",
        scrolled ? "border-rule bg-background/85 backdrop-blur-md" : "border-transparent bg-transparent",
        hidden && !open && "-translate-y-full",
      )}
    >
      <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-6">
        <Brand />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item, i) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex items-baseline gap-1.5 rounded px-3 py-2 text-sm transition-colors",
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span className={cn("font-mono text-[0.625rem]", active ? "text-signal" : "text-faint")}>
                      0{i + 1}
                    </span>
                    {/* Label rolls up to reveal a secondary hint on hover */}
                    <span className="relative block h-[1.25em] overflow-hidden">
                      <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full group-focus-visible:-translate-y-full">
                        {item.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-full block text-signal transition-transform duration-500 ease-out-expo group-hover:-translate-y-full group-focus-visible:-translate-y-full"
                      >
                        {item.hint}
                      </span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-1.5 rounded-full border border-border px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] transition-colors hover:border-signal hover:text-signal sm:inline-flex"
          >
            Résumé
            <ArrowUpRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
          <ThemeToggle />
          <MobileMenu open={open} onOpenChange={setOpen} pathname={pathname} />
        </div>
      </div>
    </header>
  )
}

function Brand() {
  return (
    <Link href="/" aria-label={`${profile.name}, home`} className="group flex items-center gap-2.5">
      <span aria-hidden="true" className="relative grid h-7 w-7 place-items-center">
        <span className="absolute inset-0 rounded-full border border-foreground/30 transition-transform duration-700 ease-out-expo group-hover:scale-110" />
        <span className="h-2 w-2 rounded-full bg-signal transition-transform duration-500 ease-out-expo group-hover:scale-150" />
      </span>
      <span className="font-display text-[1.0625rem] font-semibold tracking-tight">{profile.name}</span>
    </Link>
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {/* Both icons render; CSS picks one so server and client markup match */}
      <Sun aria-hidden="true" className="hidden h-4 w-4 dark:block" />
      <Moon aria-hidden="true" className="h-4 w-4 dark:hidden" />
    </button>
  )
}

function MobileMenu({
  open,
  onOpenChange,
  pathname,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  pathname: string
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded-full border border-border px-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] md:hidden"
        >
          Menu
          <span aria-hidden="true" className="flex w-3.5 flex-col gap-[3px]">
            <span className="h-px w-full bg-current" />
            <span className="h-px w-2/3 bg-current" />
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 md:hidden"
        >
          <Dialog.Title className="sr-only">Site menu</Dialog.Title>
          <div className="shell flex h-[var(--nav-h)] shrink-0 items-center justify-between">
            <Brand />
            <Dialog.Close className="flex h-9 items-center gap-2 rounded-full border border-border px-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em]">
              Close
              <span aria-hidden="true" className="relative h-3 w-3">
                <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
              </span>
            </Dialog.Close>
          </div>

          <nav aria-label="Primary" className="shell flex-1 pt-10">
            <ul className="border-t border-rule">
              {navItems.map((item, i) => {
                const active = isActive(pathname, item.href)
                return (
                  <li key={item.href} className="border-b border-rule">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => onOpenChange(false)}
                      className="flex items-baseline justify-between py-5"
                    >
                      <span className="reveal-line" style={{ ["--i" as string]: i }}>
                        <span
                          className={cn(
                            "font-display text-[clamp(2.5rem,12vw,4rem)] font-semibold leading-none tracking-[-0.04em]",
                            active && "text-signal",
                          )}
                        >
                          {item.name}
                        </span>
                      </span>
                      <span className="eyebrow">
                        0{i + 1} / {item.hint}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="shell grid gap-6 pb-10 pt-12">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-full bg-signal px-6 py-4 font-mono text-xs uppercase tracking-[0.14em] text-background"
            >
              Download résumé <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target={s.id === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="eyebrow inline-flex items-center gap-1 text-foreground"
                  >
                    {s.label} <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="eyebrow">{profile.location}</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
