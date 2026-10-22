// Static, server-rendered "core": a node network on a sphere, projected to SVG.
// It is the poster frame and no-WebGL / reduced-motion fallback for the
// interactive 3D core, so it is deliberately content-agnostic.

const SIZE = 520
const C = SIZE / 2
const R = 196
const COUNT = 300
const ROT_Y = 0.62
const ROT_X = -0.38
const NEIGHBORS = 3

type Node = { x: number; y: number; z: number }

function buildSphere() {
  const golden = Math.PI * (3 - Math.sqrt(5))
  const raw: [number, number, number][] = []
  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const t = golden * i
    raw.push([Math.cos(t) * r, y, Math.sin(t) * r])
  }

  const [sy, cy, sx, cx] = [Math.sin(ROT_Y), Math.cos(ROT_Y), Math.sin(ROT_X), Math.cos(ROT_X)]
  const nodes: Node[] = raw.map(([x, y, z]) => {
    const x1 = x * cy + z * sy
    const z1 = -x * sy + z * cy
    const y2 = y * cx - z1 * sx
    const z2 = y * sx + z1 * cx
    return { x: C + x1 * R, y: C + y2 * R, z: z2 }
  })

  // Link each node to its nearest neighbours on the unit sphere
  const seen = new Set<string>()
  const links: [number, number][] = []
  raw.forEach((a, i) => {
    raw
      .map((b, j) => ({ j, d: (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2 }))
      .filter(({ j }) => j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, NEIGHBORS)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (!seen.has(key)) {
          seen.add(key)
          links.push([i, j])
        }
      })
  })

  // A handful of front-facing "active" nodes joined by a signal path
  const active = nodes
    .map((n, i) => ({ ...n, i }))
    .filter((n, i) => i % 37 === 11 && n.z > 0.15)
    .sort((a, b) => a.y - b.y)
    .slice(0, 6)

  return { nodes, links, active }
}

const { nodes, links, active } = buildSphere()
const depth = (z: number) => (z + 1) / 2
const f = (n: number) => n.toFixed(1)

export function CoreFigure({ className, gradientId = "core-shade" }: { className?: string; gradientId?: string }) {
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      <defs>
        <radialGradient id={gradientId} cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor="hsl(var(--core-node))" stopOpacity="0.07" />
          <stop offset="100%" stopColor="hsl(var(--core-node))" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Orbits */}
      <g className="core-orbit">
        <ellipse cx={C} cy={C} rx={248} ry={62} transform={`rotate(-16 ${C} ${C})`} stroke="hsl(var(--core-node))" strokeOpacity="0.18" strokeDasharray="2 6" />
        <circle cx={C + 238} cy={C - 66} r={3} fill="hsl(var(--signal))" />
      </g>
      <g className="core-orbit-reverse">
        <ellipse cx={C} cy={C} rx={236} ry={104} transform={`rotate(28 ${C} ${C})`} stroke="hsl(var(--core-node))" strokeOpacity="0.1" />
        <circle cx={C - 200} cy={C - 40} r={2} fill="hsl(var(--core-node))" fillOpacity="0.6" />
      </g>

      <g className="core-body">
        <circle cx={C} cy={C} r={R + 2} fill={`url(#${gradientId})`} />
        <circle cx={C} cy={C} r={R} stroke="hsl(var(--core-node))" strokeOpacity="0.12" />

        {links.map(([a, b]) => {
          const d = depth((nodes[a].z + nodes[b].z) / 2)
          if (d < 0.35) return null
          return (
            <line
              key={`${a}-${b}`}
              x1={f(nodes[a].x)}
              y1={f(nodes[a].y)}
              x2={f(nodes[b].x)}
              y2={f(nodes[b].y)}
              stroke="hsl(var(--core-node))"
              strokeOpacity={(0.04 + d * d * 0.22).toFixed(3)}
              strokeWidth={0.75}
            />
          )
        })}

        {nodes.map((n, i) => {
          const d = depth(n.z)
          return (
            <circle
              key={i}
              cx={f(n.x)}
              cy={f(n.y)}
              r={(0.6 + d * 1.7).toFixed(2)}
              fill="hsl(var(--core-node))"
              fillOpacity={(0.12 + Math.pow(d, 1.6) * 0.8).toFixed(3)}
            />
          )
        })}

        {active.length > 1 && (
          <polyline
            points={active.map((n) => `${f(n.x)},${f(n.y)}`).join(" ")}
            stroke="hsl(var(--signal))"
            strokeWidth={1.25}
            strokeLinejoin="round"
            strokeOpacity="0.9"
          />
        )}
        {active.map((n) => (
          <g key={n.i}>
            <circle cx={f(n.x)} cy={f(n.y)} r={7} stroke="hsl(var(--signal))" strokeOpacity="0.5" />
            <circle cx={f(n.x)} cy={f(n.y)} r={3.2} fill="hsl(var(--signal))" />
          </g>
        ))}
      </g>
    </svg>
  )
}
