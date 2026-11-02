import { RefObject } from 'react'
import { useScroll, useSpring } from 'framer-motion'

/** Scroll progress (0..1) of a tall element, smoothed by a spring so motion
 *  eases with scroll speed instead of snapping. */
export function useSmoothScroll(target: RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end end'] })
  return useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })
}
