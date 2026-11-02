import type { Direction } from '../lib/direction'

export type Range = [number, number]

export const scene = {
  /** Total scroll distance in viewport heights. Bigger = slower animation. */
  scrollLength: 650,
  /** Where the meteor comes from. */
  meteorFrom: 'top-right' as Direction,
  /** Scroll-progress windows (0..1) for each phase. */
  phases: {
    meteor: [0.12, 0.45] as Range,
    open: [0.5, 0.65] as Range,
    rise: [0.65, 0.78] as Range,
    read: [0.78, 0.97] as Range,
  },
  stars: { count: 1000 },
  galaxies: [
    { x: 18, y: 24, size: 380, hue: 272, depth: 0.22, tilt: -25 },
    { x: 80, y: 62, size: 460, hue: 198, depth: 0.4, tilt: 18 },
    { x: 40, y: 118, size: 320, hue: 322, depth: 0.55, tilt: 40 },
    { x: 66, y: 40, size: 280, hue: 228, depth: 0.3, tilt: -8 },
    { x: 10, y: 94, size: 260, hue: 32, depth: 0.62, tilt: 55 },
  ],
}