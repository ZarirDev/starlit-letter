import { useEffect, useRef } from 'react'
import { MotionValue } from 'framer-motion'
import { scene } from '../../config/scene'
import styles from './StarField.module.css'

type Star = {
  x: number
  y: number
  z: number
  r: number
  phase: number
  tw: number
  tint: number
  spike: boolean
}

const TINTS: [number, number, number][] = [
  [255, 255, 255], // white
  [255, 208, 232], // rose
  [196, 220, 255], // ice
  [255, 232, 184], // gold
  [214, 198, 255], // lilac
]
const TINT_CSS = TINTS.map(([r, g, b]) => `rgb(${r},${g},${b})`)

const makeStars = (n: number): Star[] =>
  Array.from({ length: n }, () => {
    const z = 0.08 + Math.random() * 0.92 // depth: 1 = near
    return {
      x: Math.random(),
      y: Math.random(),
      z,
      r: 0.35 + Math.random() * 1.15,
      phase: Math.random() * Math.PI * 2,
      tw: 0.0006 + Math.random() * 0.0024,
      tint: Math.random() < 0.4 ? 0 : 1 + Math.floor(Math.random() * 4),
      spike: z > 0.86 && Math.random() < 0.22,
    }
  })

/** Pre-render a soft glowing star sprite so we never need shadowBlur per frame. */
function makeSprite([r, g, b]: [number, number, number]) {
  const size = 64
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  const half = size / 2
  const grad = ctx.createRadialGradient(half, half, 0, half, half, half)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.12, `rgba(${r},${g},${b},0.95)`)
  grad.addColorStop(0.32, `rgba(${r},${g},${b},0.35)`)
  grad.addColorStop(0.62, `rgba(${r},${g},${b},0.08)`)
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
  return c
}

export default function StarField({ progress }: { progress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const stars = makeStars(scene.stars.count)
    const sprites = TINTS.map(makeSprite)
    let w = 0
    let h = 0
    let raf = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t: number) => {
      const p = progress.get()
      ctx.clearRect(0, 0, w, h)

      for (const s of stars) {
        // vertical parallax: near stars rush past faster
        const y = ((((s.y * h - p * h * 1.5 * s.z) % h) + h) % h)
        // fan out from the centre as we fly forward + gentle drift
        const x =
          s.x * w +
          (s.x - 0.5) * p * w * 0.35 * s.z +
          Math.sin(t * 0.00025 + s.phase) * 5 * s.z

        const twinkle = 0.7 + 0.3 * Math.sin(t * s.tw + s.phase)
        const alpha = Math.min(1, (0.3 + 0.7 * s.z) * twinkle)
        const size = 4 + s.r * 3.5 + s.z * 15

        ctx.globalAlpha = alpha
        ctx.drawImage(sprites[s.tint], x - size / 2, y - size / 2, size, size)

        // diffraction spikes on the brightest few
        if (s.spike) {
          const len = size * 1.1
          ctx.globalAlpha = alpha * 0.5
          ctx.strokeStyle = TINT_CSS[s.tint]
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(x - len, y)
          ctx.lineTo(x + len, y)
          ctx.moveTo(x, y - len)
          ctx.lineTo(x, y + len)
          ctx.stroke()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [progress])

  // oversized so the camera shake never exposes an empty edge
  return <canvas ref={canvasRef} className={styles.canvas} />
}