import { useEffect, useRef } from 'react'
import { MotionValue, animate, useAnimationFrame, useMotionValue } from 'framer-motion'

/** Heavy, decaying camera shake triggered when scroll progress crosses the impact point. */
export function useImpactShake(progress: MotionValue<number>, impactAt: number) {
  const pulse = useMotionValue(0) // 1 right after impact -> decays to 0
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useMotionValue(0)
  const scale = useMotionValue(1)
  const armed = useRef(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    return progress.on('change', (p) => {
      if (p < impactAt - 0.06) {
        armed.current = true
      } else if (armed.current && p >= impactAt) {
        armed.current = false
        pulse.set(1)
        animate(pulse, 0, { duration: 1.15, ease: 'easeOut' })
      }
    })
  }, [progress, impactAt, pulse])

  useAnimationFrame((t) => {
    const p = progress.get()

    // anticipation rumble just before the hit
    const pre = p < impactAt
      ? Math.pow(Math.max(0, 1 - (impactAt - p) / 0.08), 3) * 0.09
      : 0
    const a = Math.max(pulse.get(), pre)

    if (a < 0.002) {
      if (x.get() !== 0) {
        x.set(0)
        y.set(0)
        rotate.set(0)
        scale.set(1)
      }
      return
    }

    const s = t / 1000
    // layered sines = chaotic rumble instead of a clean wobble
    x.set((Math.sin(s * 57) * 14 + Math.sin(s * 23 + 1.7) * 6) * a)
    y.set((Math.cos(s * 61) * 12 + Math.sin(s * 31 + 0.6) * 5) * a)
    rotate.set(Math.sin(s * 19) * 0.7 * a)
    scale.set(1 + 0.035 * a)
  })

  return { x, y, rotate, scale, pulse }
}