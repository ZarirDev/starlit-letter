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
  stars: { count: 800 },
  galaxies: [
    { x: 18, y: 22, size: 340, hue: 270, depth: 0.25, tilt: -25 },
    { x: 78, y: 62, size: 420, hue: 200, depth: 0.4, tilt: 18 },
    { x: 40, y: 120, size: 300, hue: 320, depth: 0.55, tilt: 40 },
  ],
}
