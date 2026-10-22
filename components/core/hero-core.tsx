"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { openChatbot } from "@/components/chatbot-events"

// Interactive shell around the core figure. Today it hosts the static SVG;
// the WebGL core will mount here later and keep the SVG as its fallback.
// Clicking the core opens the AI assistant, which gives the figure a job.
export function HeroCore({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null)

  // Subtle pointer tilt on fine pointers only, skipped for reduced motion
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const finePointer = window.matchMedia("(pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!finePointer || reduced) return

    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5
        const y = e.clientY / window.innerHeight - 0.5
        el.style.setProperty("--tilt-y", `${(x * 14).toFixed(2)}deg`)
        el.style.setProperty("--tilt-x", `${(-y * 14).toFixed(2)}deg`)
      })
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
    }
  }, [])

  return (
    <button
      ref={ref}
      type="button"
      onClick={openChatbot}
      aria-label="Open the AI assistant to ask about my work"
      className={`core-tilt group relative block aspect-square w-full cursor-pointer rounded-full ${className ?? ""}`}
    >
      {children}
    </button>
  )
}
