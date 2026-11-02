import { useEffect, useRef } from 'react'
import { MotionValue } from 'framer-motion'
import { scene } from '../../config/scene'

type Star = { x: number; y: number; z: number; r: number; phase: number }

const makeStars = (n: number): Star[] =>
  Array.from({ length: n }, () => ({
    x: Math.random(), y: Math.random(),
    z: 0.1 + Math.random() * 0.9, // depth: 1 = near
    r: Math.random() * 1.1 + 0.4,
    phase: Math.random() * Math.PI * 2,
  }))

export default function StarField({ progress }: { progress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const stars = makeStars(scene.stars.count)
    let w = 0, h = 0, raf = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      w = window.innerWidth; h = window.innerHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t: number) => {
      const p = progress.get()
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        // near stars move further -> parallax; they also fan outwards -> fake 3D fly-through
        const y = (((s.y * h - p * h * 1.6 * s.z) % h) + h) % h
        const x = s.x * w + (s.x - 0.5) * p * w * 0.3 * s.z
        const twinkle = 0.7 + 0.3 * Math.sin(t / 700 + s.phase)
        ctx.globalAlpha = (0.3 + 0.7 * s.z) * twinkle
        ctx.fillStyle = s.z > 0.8 ? '#ffe9f3' : '#dfe8ff'
        ctx.beginPath()
        ctx.arc(x, y, s.r * (0.5 + s.z), 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [progress])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0 }} />
}
