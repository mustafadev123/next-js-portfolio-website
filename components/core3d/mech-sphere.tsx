"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Procedural mechanical sphere: a glowing core inside a cage, wrapped in armour
// panels that hinge open as `open` goes 0 → 1. It is content-agnostic; the
// scene drives it with scroll progress.
//
// To swap in a rigged .glb later, render it here instead and scrub its clip:
//   mixer.setTime(open * clip.duration)
// keeping the same `openRef` contract so the scene needs no changes.

const RADIUS = 1.2
const BANDS = 4 // latitude rings of panels
const SEGMENTS = 6 // panels per ring
const GAP = 0.035 // radians trimmed off each panel edge

type Panel = {
  geometry: THREE.SphereGeometry
  normal: THREE.Vector3 // direction the panel slides along
  hinge: THREE.Vector3 // axis the panel swings around
  delay: number // stagger, 0..1
}

const smooth = (t: number) => t * t * (3 - 2 * t)

export function MechSphere({ openRef, detail = 1 }: { openRef: { current: number }; detail?: number }) {
  const panelRefs = useRef<(THREE.Mesh | null)[]>([])
  const coreRef = useRef<THREE.Mesh>(null)
  const ringA = useRef<THREE.Mesh>(null)
  const ringB = useRef<THREE.Mesh>(null)
  const cageRef = useRef<THREE.LineSegments>(null)

  const panels = useMemo<Panel[]>(() => {
    const out: Panel[] = []
    const w = Math.max(6, Math.round(10 * detail))
    for (let b = 0; b < BANDS; b++) {
      const thetaStart = (b / BANDS) * Math.PI + GAP
      const thetaLength = Math.PI / BANDS - GAP * 2
      for (let s = 0; s < SEGMENTS; s++) {
        // Offset alternate bands so seams don't line up, like plated armour
        const phiStart = (s / SEGMENTS) * Math.PI * 2 + (b % 2 ? Math.PI / SEGMENTS : 0) + GAP
        const phiLength = (Math.PI * 2) / SEGMENTS - GAP * 2
        const geometry = new THREE.SphereGeometry(RADIUS, w, w, phiStart, phiLength, thetaStart, thetaLength)

        const theta = thetaStart + thetaLength / 2
        const phi = phiStart + phiLength / 2
        // Matches SphereGeometry's parametrisation
        const normal = new THREE.Vector3(
          -Math.cos(phi) * Math.sin(theta),
          Math.cos(theta),
          Math.sin(phi) * Math.sin(theta),
        ).normalize()
        const hinge = new THREE.Vector3().crossVectors(normal, new THREE.Vector3(0, 1, 0))
        if (hinge.lengthSq() < 1e-4) hinge.set(1, 0, 0)
        hinge.normalize()

        // Equatorial bands open first, poles last; segments ripple around
        const fromEquator = Math.abs(b - (BANDS - 1) / 2) / ((BANDS - 1) / 2)
        out.push({ geometry, normal, hinge, delay: fromEquator * 0.35 + (s / SEGMENTS) * 0.12 })
      }
    }
    return out
  }, [detail])

  const cageGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.82, 1)), [])

  const shellMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#77756e",
        metalness: 0.6,
        roughness: 0.38,
        side: THREE.DoubleSide,
      }),
    [],
  )
  const coreMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ff3b10",
        emissive: "#ff2a00",
        emissiveIntensity: 2.6,
        toneMapped: false, // lets the core exceed 1.0 so bloom picks it up
      }),
    [],
  )

  const q = useMemo(() => new THREE.Quaternion(), [])

  useFrame((state, delta) => {
    const open = openRef.current
    const t = state.clock.elapsedTime

    panels.forEach((p, i) => {
      const mesh = panelRefs.current[i]
      if (!mesh) return
      const local = smooth(THREE.MathUtils.clamp((open - p.delay) / (1 - p.delay * 0.9), 0, 1))
      mesh.position.copy(p.normal).multiplyScalar(local * 0.7)
      q.setFromAxisAngle(p.hinge, local * 0.6)
      mesh.quaternion.copy(q)
    })

    if (coreRef.current) {
      // Core breathes and grows brighter as the shell opens
      const pulse = 1 + Math.sin(t * 2.2) * 0.03
      coreRef.current.scale.setScalar((0.5 + open * 0.12) * pulse)
      coreMaterial.emissiveIntensity = 2.2 + open * 2.2 + Math.sin(t * 2.2) * 0.25
    }
    if (cageRef.current) {
      cageRef.current.rotation.y -= delta * 0.25
      cageRef.current.rotation.x += delta * 0.1
      cageRef.current.scale.setScalar(1 + open * 0.15)
    }
    if (ringA.current) {
      ringA.current.rotation.z += delta * 0.35
      ringA.current.scale.setScalar(1 + open * 0.2)
    }
    if (ringB.current) {
      ringB.current.rotation.z -= delta * 0.22
      ringB.current.scale.setScalar(1 + open * 0.3)
    }
  })

  return (
    <group>
      <mesh ref={coreRef} material={coreMaterial}>
        <icosahedronGeometry args={[1, 3]} />
      </mesh>

      <lineSegments ref={cageRef} geometry={cageGeometry}>
        <lineBasicMaterial color="#ff5a1f" transparent opacity={0.35} />
      </lineSegments>

      {panels.map((p, i) => (
        <mesh
          key={i}
          ref={(m) => {
            panelRefs.current[i] = m
          }}
          geometry={p.geometry}
          material={shellMaterial}
        />
      ))}

      <mesh ref={ringA} rotation={[Math.PI / 2.3, 0.2, 0]}>
        <torusGeometry args={[RADIUS * 1.2, 0.012, 8, 160]} />
        <meshStandardMaterial color="#8a8780" metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.8, -0.5, 0]}>
        <torusGeometry args={[RADIUS * 1.32, 0.006, 6, 160]} />
        <meshBasicMaterial color="#ff5a1f" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}
