"use client"

import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import * as THREE from "three"
import { MechSphere } from "./mech-sphere"

// Light colour at each scroll stop (0 → 1 of the page). White, red, blue, yellow.
const LIGHT_STOPS: [number, string][] = [
  [0, "#ffffff"],
  [0.33, "#ff3a1f"],
  [0.66, "#2f6bff"],
  [1, "#ffc21a"],
]
const MODEL_RADIUS = 1.2

const stopColors = LIGHT_STOPS.map(([at, hex]) => [at, new THREE.Color(hex)] as const)
function sampleStops(p: number, out: THREE.Color) {
  for (let i = 0; i < stopColors.length - 1; i++) {
    const [a, ca] = stopColors[i]
    const [b, cb] = stopColors[i + 1]
    if (p <= b) return out.copy(ca).lerp(cb, (p - a) / (b - a))
  }
  return out.copy(stopColors[stopColors.length - 1][1])
}

const cssHsl = (name: string) => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim() // e.g. "80 11% 5%"
  const [h, s, l] = raw.split(/\s+/)
  return new THREE.Color(`hsl(${h}, ${s}, ${l})`)
}

/** Keeps the scene background equal to the page background, across theme switches. */
function ThemeBackground() {
  const scene = useThree((s) => s.scene)
  useEffect(() => {
    const apply = () => {
      scene.background = cssHsl("--background")
    }
    apply()
    const mo = new MutationObserver(apply)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] })
    return () => mo.disconnect()
  }, [scene])
  return null
}

function Rig({ compact, onReady }: { compact: boolean; onReady: () => void }) {
  const group = useRef<THREE.Group>(null)
  const tilt = useRef<THREE.Group>(null)
  const key = useRef<THREE.DirectionalLight>(null)
  const rim = useRef<THREE.DirectionalLight>(null)
  const ambient = useRef<THREE.AmbientLight>(null)
  const coreLight = useRef<THREE.PointLight>(null)
  const openRef = useRef(0)
  const idle = useRef(0)
  const ready = useRef(false)
  const tint = useMemo(() => new THREE.Color(), [])
  const rimTint = useMemo(() => new THREE.Color(), [])

  useFrame((state, delta) => {
    const { viewport, pointer } = state
    const vw = window.innerWidth
    const vh = window.innerHeight
    const scrollY = window.scrollY
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh)
    const progress = THREE.MathUtils.clamp(scrollY / maxScroll, 0, 1)

    // 1. Scroll → shell opening. A light damp keeps it in step with the scrollbar without jitter.
    openRef.current = THREE.MathUtils.damp(openRef.current, progress, 10, delta)

    // 2. Scroll → light colour
    sampleStops(openRef.current, tint)
    sampleStops(Math.min(1, openRef.current + 0.2), rimTint)
    key.current?.color.copy(tint)
    ambient.current?.color.copy(tint)
    rim.current?.color.copy(rimTint)
    if (coreLight.current) coreLight.current.intensity = 1.2 + openRef.current * 8

    // 3. Placement: start on the hero figure, dock to the side once past the hero
    const docked = compact
      ? { x: vw * 0.86, y: vh * 0.62, r: Math.min(vw * 0.3, vh * 0.2) }
      : { x: vw * 0.9, y: vh * 0.58, r: vh * 0.17 }
    let { x, y, r } = docked
    const anchor = document.querySelector<HTMLElement>("[data-core-anchor]")
    if (anchor) {
      const rect = anchor.getBoundingClientRect()
      const start = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, r: rect.width * 0.27 }
      const h = THREE.MathUtils.smoothstep(scrollY, 0, vh * 0.9)
      x = THREE.MathUtils.lerp(start.x, docked.x, h)
      y = THREE.MathUtils.lerp(start.y, docked.y, h)
      r = THREE.MathUtils.lerp(start.r, docked.r, h)
    }
    const unitsPerPx = viewport.height / vh
    if (group.current) {
      group.current.position.set((x / vw - 0.5) * viewport.width, -(y / vh - 0.5) * viewport.height, 0)
      group.current.scale.setScalar((r * unitsPerPx) / MODEL_RADIUS)
    }

    // 4. Idle spin + cursor tilt
    idle.current += delta * 0.18
    if (tilt.current) {
      tilt.current.rotation.x = THREE.MathUtils.damp(tilt.current.rotation.x, -pointer.y * 0.3, 3, delta)
      tilt.current.rotation.y = THREE.MathUtils.damp(
        tilt.current.rotation.y,
        idle.current + pointer.x * 0.45,
        3,
        delta,
      )
    }

    if (!ready.current) {
      ready.current = true
      onReady()
    }
  })

  return (
    <>
      <ambientLight ref={ambient} intensity={0.45} />
      {/* Neutral sky/ground fill so the metal plates read without an env map */}
      <hemisphereLight args={["#ffffff", "#1a1a18", 0.9]} />
      <directionalLight ref={key} position={[4, 5, 6]} intensity={2.4} />
      <directionalLight ref={rim} position={[-5, 2, -4]} intensity={1.6} />
      <group ref={group}>
        <pointLight ref={coreLight} color="#ff3a10" distance={3} decay={2} />
        <group ref={tilt}>
          <MechSphere openRef={openRef} detail={compact ? 0.7 : 1} />
        </group>
      </group>
    </>
  )
}

export default function CoreScene({ onReady }: { onReady: () => void }) {
  const compact = typeof window !== "undefined" && window.innerWidth < 1024
  const bloom = !compact

  return (
    <Canvas
      dpr={[1, compact ? 1.5 : 2]}
      camera={{ fov: 35, position: [0, 0, 9] }}
      gl={{ antialias: !compact, powerPreference: "high-performance" }}
      // Pointer is tracked over the whole page so the canvas can stay pointer-events: none
      eventSource={document.body}
      eventPrefix="client"
    >
      <ThemeBackground />
      <Rig compact={compact} onReady={onReady} />
      {bloom && (
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={0.9} luminanceThreshold={1} luminanceSmoothing={0.25} />
        </EffectComposer>
      )}
    </Canvas>
  )
}
