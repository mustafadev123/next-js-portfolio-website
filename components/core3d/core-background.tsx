"use client"

import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import dynamic from "next/dynamic"

// three.js + R3F load only on capable devices, after the page is idle.
const CoreScene = dynamic(() => import("./core-scene"), { ssr: false })

function supportsWebGL() {
  try {
    const c = document.createElement("canvas")
    return !!(c.getContext("webgl2") || c.getContext("webgl"))
  } catch {
    return false
  }
}

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    this.props.onError()
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

/**
 * Fixed, full-screen 3D layer behind the page content. The static SVG core in
 * the hero stays visible until the first WebGL frame renders, and remains the
 * fallback for reduced motion, missing WebGL, or a runtime error.
 */
export function CoreBackground() {
  const [enabled, setEnabled] = useState(false)
  const [ready, setReady] = useState(false)
  const layer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (reduced.matches || saveData || !supportsWebGL()) return

    const start = () => setEnabled(true)
    const idle = window.requestIdleCallback?.(start, { timeout: 2000 }) ?? window.setTimeout(start, 1200)
    const onMotionChange = () => reduced.matches && setEnabled(false)
    reduced.addEventListener("change", onMotionChange)
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
      reduced.removeEventListener("change", onMotionChange)
    }
  }, [])

  // Hand the hero over from the SVG to the live scene
  useEffect(() => {
    const root = document.documentElement
    if (ready && enabled) root.dataset.core = "live"
    else delete root.dataset.core
    return () => {
      delete root.dataset.core
    }
  }, [ready, enabled])

  // Opacity follows the page: full in the hero, faint behind content so copy stays
  // readable, then partly back for the closing section where the shells are fully open
  useEffect(() => {
    if (!enabled) return
    let frame = 0
    const update = () => {
      const el = layer.current
      if (!el) return
      const vh = window.innerHeight
      const clamp = (v: number) => Math.min(1, Math.max(0, v))
      const leaveHero = clamp((window.scrollY - vh * 0.3) / (vh * 0.8))
      const remaining = document.documentElement.scrollHeight - vh - window.scrollY
      const finale = clamp(1 - remaining / (vh * 0.9))
      const floor = window.innerWidth < 1024 ? 0.2 : 0.16
      const base = 1 - leaveHero * (1 - floor)
      const finalePeak = window.innerWidth < 1024 ? 0.3 : 0.5
      el.style.opacity = String(base + finale * (finalePeak - floor))
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [enabled])

  const onReady = useCallback(() => setReady(true), [])
  const onError = useCallback(() => setEnabled(false), [])

  if (!enabled) return null

  return (
    <div ref={layer} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className={`core-layer h-full w-full transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
        <SceneBoundary onError={onError}>
          <CoreScene onReady={onReady} />
        </SceneBoundary>
      </div>
    </div>
  )
}
