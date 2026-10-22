"use client"

import { useCallback, useEffect, useRef, type ReactNode } from "react"
import { profile } from "@/lib/content"
import { INTRO_STORAGE_KEY } from "./intro-script"

// First-visit intro: a matte cube unfolds and its core (the hero sphere) flies
// to its place in the hero. Timeline (seconds):
//   0–0.6   faces hinge open, warm light, the sphere rises out of the box
//   0.6–1.4 camera dives through the opening, panels pass the screen edges,
//           the sphere travels to the hero figure, the hero copy starts revealing
//   1.4–1.8 the page settles; the real hero sphere takes over from this one
//
// Visibility is decided before paint by INTRO_HEAD_SCRIPT (in the root layout),
// which adds `intro-pending` + `intro-hold` to <html> on a first visit to "/".

const DUR = 1.8

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a))
const io = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const inn = (x: number) => x * x * x
const smooth = (x: number) => x * x * (3 - 2 * x)

const FACES = ["front", "back", "left", "right", "top", "bottom"] as const

/** Makes everything except `el` (and its ancestors) inert, like a native modal. Returns an undo. */
function isolate(el: HTMLElement) {
  const changed: Element[] = []
  for (let node: HTMLElement | null = el; node && node !== document.body; node = node.parentElement) {
    for (const sib of Array.from(node.parentElement?.children ?? [])) {
      if (sib !== node && !sib.hasAttribute("inert") && sib.tagName !== "SCRIPT") {
        sib.setAttribute("inert", "")
        changed.push(sib)
      }
    }
  }
  return () => changed.forEach((n) => n.removeAttribute("inert"))
}
type Face = (typeof FACES)[number]

export function CubeIntro({ core }: { core: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const bg = useRef<HTMLDivElement>(null)
  const glow = useRef<HTMLDivElement>(null)
  const v3d = useRef<HTMLDivElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const sphere = useRef<HTMLDivElement>(null)
  const chrome = useRef<HTMLDivElement>(null)
  const faces = useRef<Partial<Record<Face, HTMLDivElement | null>>>({})
  const restore = useRef<() => void>(() => {})
  const state = useRef({ t: -1, playing: false, startAt: 0, tx: 0, ty: 0, tiltX: 0, tiltY: 0, seam: 0.5, hover: 0, raf: 0 })

  const finish = useCallback(() => {
    const html = document.documentElement
    html.classList.remove("intro-pending", "intro-hold")
    if (root.current) root.current.dataset.state = "done"
    restore.current()
    try {
      localStorage.setItem(INTRO_STORAGE_KEY, "1")
    } catch {}
  }, [])

  useEffect(() => {
    const html = document.documentElement
    if (!html.classList.contains("intro-pending")) return
    const s = state.current
    const el = root.current!
    el.dataset.state = "waiting"
    // Keep focus and assistive tech on the intro until it is opened or skipped
    restore.current = isolate(el)
    el.querySelector<HTMLButtonElement>("[data-intro-start]")?.focus({ preventScroll: true })

    const render = (now: number) => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const portrait = vw < vh
      const size = Math.min(vw, vh) * (portrait ? 0.46 : 0.27)
      const half = size / 2
      const persp = vh * 1.7
      const time = now / 1000
      const started = s.t >= 0
      const T = Math.max(s.t, 0)

      s.tiltX += (s.tx - s.tiltX) * 0.08
      s.tiltY += (s.ty - s.tiltY) * 0.08
      s.seam += ((started || s.hover ? 1 : 0.5) - s.seam) * 0.1

      const open = io(seg(T, 0, 0.6))
      const reveal = seg(T, 0.6, 1.4)
      const float = started ? 0 : Math.sin(time * 1.6) * size * 0.03
      const rx = -22 - io(seg(T, 0.25, 1.1)) * 50 + (started ? 0 : s.tiltX)
      const ry = 35 + Math.sin(time * 0.35) * 14 + (started ? io(seg(T, 0, 1)) * 10 : s.tiltY)

      // Cube
      if (v3d.current && scene.current) {
        v3d.current.style.perspective = `${persp}px`
        v3d.current.style.opacity = String(1 - smooth(seg(T, 1.15, 1.4)))
        const sc = scene.current.style
        sc.width = sc.height = `${size}px`
        sc.margin = `${-half}px 0 0 ${-half}px`
        sc.transform = `translateY(${float}px) translateZ(${inn(reveal) * persp * 0.92}px) rotateX(${rx}deg) rotateY(${ry}deg)`
      }
      const a = open * 104
      const f = faces.current
      const set = (k: Face, tr: string) => {
        const node = f[k]
        if (!node) return
        node.style.transform = tr
        node.style.setProperty("--seam", s.seam.toFixed(3))
        node.style.setProperty("--warm", (open * 0.9).toFixed(3))
      }
      set("front", `translateZ(${half}px) rotateX(${-a}deg)`)
      set("back", `rotateY(180deg) translateZ(${half}px) rotateX(${-a}deg)`)
      set("left", `rotateY(-90deg) translateZ(${half}px) rotateX(${-a}deg)`)
      set("right", `rotateY(90deg) translateZ(${half}px) rotateX(${-a}deg)`)
      set("top", `rotateX(90deg) translateZ(${half + open * size * 1.7}px) rotateZ(${open * 28}deg)`)
      set("bottom", `rotateX(-90deg) translateZ(${half}px)`)
      if (f.top) f.top.style.opacity = String(1 - smooth(seg(open, 0.55, 1)))

      // Warm light from inside the box
      if (glow.current) {
        const g = smooth(seg(T, 0.05, 0.6)) * (1 - smooth(seg(T, 1.0, 1.4)))
        const gs = size * (1.1 + io(reveal) * 4)
        const st = glow.current.style
        st.width = st.height = `${gs}px`
        st.margin = `${-gs / 2}px 0 0 ${-gs / 2}px`
        st.opacity = String(g)
      }

      // The core: rises out of the box, then flies to the hero figure
      if (sphere.current) {
        const boxStart = size * 1.15
        const rise = io(seg(T, 0.2, 0.75))
        const startX = vw / 2
        const startY = vh / 2 + float - rise * size * 0.55
        let endX = startX, endY = startY, endSize = boxStart * 1.4, fadeOut = 1
        const anchor = document.querySelector<HTMLElement>("[data-core-anchor]")
        const r = anchor?.getBoundingClientRect()
        // The SVG fills the anchor minus HeroCore's 6% inset
        if (r && r.bottom > 0 && r.top < vh) {
          endSize = r.width * 0.88
          endX = r.left + r.width / 2
          endY = r.top + r.height / 2
          fadeOut = 1 - smooth(seg(T, 1.6, 1.8))
        } else {
          fadeOut = 1 - smooth(seg(T, 1.1, 1.4)) // figure off-screen (phones): dissolve in place
        }
        const travel = io(reveal)
        const x = startX + (endX - startX) * travel
        const y = startY + (endY - startY) * travel
        const d = (boxStart * (0.35 + rise * 0.65)) + (endSize - boxStart) * travel
        const st = sphere.current.style
        st.width = st.height = `${d}px`
        st.transform = `translate(${x - d / 2}px, ${y - d / 2}px)`
        st.opacity = String(smooth(seg(T, 0.12, 0.45)) * fadeOut)
      }

      if (bg.current) bg.current.style.opacity = String(1 - smooth(seg(T, 0.7, 1.25)))
      if (chrome.current) {
        chrome.current.style.opacity = String(1 - smooth(seg(T, 0, 0.25)))
        chrome.current.style.visibility = T >= 0.25 ? "hidden" : ""
      }
      el.style.pointerEvents = T >= 1.2 ? "none" : ""
    }

    const loop = (now: number) => {
      if (s.playing) {
        const prev = s.t
        // Wall-clock time: a slow device drops frames but still finishes on schedule
        if (!s.startAt) s.startAt = now
        s.t = Math.min(DUR, (now - s.startAt) / 1000)
        // Hand the hero copy its entrance once the camera starts moving through
        if (prev < 0.7 && s.t >= 0.7) html.classList.remove("intro-pending")
        // The real sphere fades in as this one lands
        if (prev < 1.6 && s.t >= 1.6) html.classList.remove("intro-hold")
        if (s.t >= DUR) {
          s.playing = false
          render(now)
          finish()
          return
        }
      }
      render(now)
      s.raf = requestAnimationFrame(loop)
    }
    s.raf = requestAnimationFrame(loop)

    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      s.tx = -y * 18
      s.ty = x * 24
      s.hover = 1
    }
    const onLeave = () => {
      s.tx = s.ty = 0
      s.hover = 0
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && s.t < DUR) skip()
    }
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    window.addEventListener("keydown", onKey)
    return () => {
      cancelAnimationFrame(s.raf)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("keydown", onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const start = () => {
    const s = state.current
    if (s.t >= 0) return
    s.t = 0
    s.playing = true
    if (root.current) root.current.dataset.state = "playing"
  }
  const skip = () => {
    cancelAnimationFrame(state.current.raf)
    state.current.playing = false
    finish()
  }

  return (
    <div
      ref={root}
      className="cube-intro"
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-name"
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest("[data-intro-skip]")) start()
      }}
    >
      <div ref={bg} className="cube-intro__bg" />
      <div ref={glow} className="cube-intro__glow" aria-hidden="true" />
      <div ref={v3d} className="cube-intro__v3d" aria-hidden="true">
        <div ref={scene} className="cube-intro__scene">
          {FACES.map((k) => (
            <div
              key={k}
              ref={(n) => {
                faces.current[k] = n
              }}
              className={`cube-intro__face ${k === "top" || k === "bottom" ? "" : "cube-intro__side"}`}
            />
          ))}
        </div>
      </div>
      <div ref={sphere} className="cube-intro__core" aria-hidden="true">
        {core}
      </div>

      <div ref={chrome}>
        <p id="intro-name" className="cube-intro__name">
          {profile.name}
          <small>{profile.role}</small>
        </p>
        <button type="button" data-intro-start className="cube-intro__cta" onClick={start}>
          Click to unfold
        </button>
        <button type="button" data-intro-skip className="cube-intro__skip" onClick={skip}>
          Skip intro
        </button>
      </div>
    </div>
  )
}
