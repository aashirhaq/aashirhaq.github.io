"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"

/*
 * "Systems in Motion" — the hero scene.
 *
 * A distributed topology rendered as three depth layers of service nodes with
 * links between near neighbours. The structure is cool and static; the only
 * warm elements are the packets travelling the links. Geometry is deliberately
 * tiny (a few hundred triangles total) so this costs almost nothing to draw.
 */

const LAYERS = 3
const NODES_PER_LAYER = 15
const NODE_COUNT = LAYERS * NODES_PER_LAYER
const LINK_DISTANCE = 3.1
const MAX_LINKS = 88
const PACKET_COUNT = 26

const COOL = new THREE.Color("#59626E")
const WARM = new THREE.Color("#E9B872")

interface Topology {
  positions: Float32Array
  links: Array<[number, number]>
}

/** Deterministic pseudo-random so the layout is identical on every load. */
function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

function buildTopology(): Topology {
  const rand = seeded(20260904)
  const positions = new Float32Array(NODE_COUNT * 3)

  for (let layer = 0; layer < LAYERS; layer++) {
    const z = (layer - (LAYERS - 1) / 2) * 2.6
    for (let i = 0; i < NODES_PER_LAYER; i++) {
      const idx = layer * NODES_PER_LAYER + i
      // Spread across a wide, shallow slab so it reads as an architecture
      // layer rather than a ball of particles.
      positions[idx * 3] = (rand() - 0.5) * 15
      positions[idx * 3 + 1] = (rand() - 0.5) * 7.5
      positions[idx * 3 + 2] = z + (rand() - 0.5) * 1.1
    }
  }

  const links: Array<[number, number]> = []
  const a = new THREE.Vector3()
  const b = new THREE.Vector3()

  for (let i = 0; i < NODE_COUNT && links.length < MAX_LINKS; i++) {
    a.fromArray(positions, i * 3)
    for (let j = i + 1; j < NODE_COUNT && links.length < MAX_LINKS; j++) {
      b.fromArray(positions, j * 3)
      if (a.distanceTo(b) < LINK_DISTANCE) links.push([i, j])
    }
  }

  return { positions, links }
}

/** A soft radial sprite, built once on a 64px canvas — no texture to download. */
function makeDotTexture() {
  const size = 64
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, "rgba(255,255,255,1)")
    g.addColorStop(0.35, "rgba(255,255,255,0.55)")
    g.addColorStop(1, "rgba(255,255,255,0)")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function Topology3D() {
  const group = useRef<THREE.Group>(null)
  const packetGeom = useRef<THREE.BufferGeometry>(null)
  const { size } = useThree()

  const topology = useMemo(buildTopology, [])
  const dotTexture = useMemo(makeDotTexture, [])

  /* Static line geometry for every link. */
  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    const verts = new Float32Array(topology.links.length * 6)
    topology.links.forEach(([i, j], k) => {
      verts.set(topology.positions.subarray(i * 3, i * 3 + 3), k * 6)
      verts.set(topology.positions.subarray(j * 3, j * 3 + 3), k * 6 + 3)
    })
    geom.setAttribute("position", new THREE.BufferAttribute(verts, 3))
    return geom
  }, [topology])

  /* Node geometry — points, not meshes. 45 sprites instead of 45 draw calls. */
  const nodeGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    geom.setAttribute("position", new THREE.BufferAttribute(topology.positions, 3))
    return geom
  }, [topology])

  /* Packets: each rides one link, wraps at the end, restarts on another. */
  const packets = useMemo(() => {
    const rand = seeded(77003)
    return Array.from({ length: PACKET_COUNT }, () => ({
      link: Math.floor(rand() * topology.links.length),
      t: rand(),
      speed: 0.18 + rand() * 0.3,
    }))
  }, [topology])

  const packetPositions = useMemo(() => new Float32Array(PACKET_COUNT * 3), [])

  const pointer = useRef({ x: 0, y: 0 })
  const a = new THREE.Vector3()
  const b = new THREE.Vector3()

  useFrame((state, delta) => {
    // Clamp delta so a backgrounded tab does not teleport every packet on
    // resume.
    const dt = Math.min(delta, 0.05)

    if (group.current) {
      // Pointer parallax: the scene leans toward the cursor, it does not
      // follow it. Small angles, heavily damped.
      pointer.current.x += (state.pointer.x * 0.16 - pointer.current.x) * 0.035
      pointer.current.y += (state.pointer.y * 0.1 - pointer.current.y) * 0.035
      group.current.rotation.y = pointer.current.x + state.clock.elapsedTime * 0.021
      group.current.rotation.x = -pointer.current.y
    }

    for (let p = 0; p < packets.length; p++) {
      const packet = packets[p]
      packet.t += packet.speed * dt
      if (packet.t > 1) {
        packet.t = 0
        packet.link = (packet.link + 7) % topology.links.length
      }
      const [i, j] = topology.links[packet.link]
      a.fromArray(topology.positions, i * 3)
      b.fromArray(topology.positions, j * 3)
      a.lerp(b, packet.t)
      packetPositions[p * 3] = a.x
      packetPositions[p * 3 + 1] = a.y
      packetPositions[p * 3 + 2] = a.z
    }

    if (packetGeom.current) {
      const attr = packetGeom.current.getAttribute("position") as THREE.BufferAttribute
      attr.needsUpdate = true
    }
  })

  // Scale point size with viewport so the field reads the same on a laptop and
  // a large display.
  const scale = Math.min(size.width / 1440, 1.2)

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={COOL} transparent opacity={0.42} />
      </lineSegments>

      <points geometry={nodeGeometry}>
        <pointsMaterial
          map={dotTexture}
          color={COOL}
          size={0.5 * scale}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>

      <points>
        <bufferGeometry ref={packetGeom}>
          <bufferAttribute attach="attributes-position" args={[packetPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={dotTexture}
          color={WARM}
          size={0.36 * scale}
          sizeAttenuation
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

export default function SystemFieldScene({ paused }: { paused: boolean }) {
  return (
    <Canvas
      // Cap pixel ratio: beyond 1.75 the visual gain is nil and the cost is real.
      dpr={[1, 1.75]}
      frameloop={paused ? "never" : "always"}
      camera={{ position: [0, 0, 11.5], fov: 46 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      // The scene is decorative; the hero text carries all the meaning.
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      <Topology3D />
    </Canvas>
  )
}
