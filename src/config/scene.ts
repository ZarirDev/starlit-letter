import type { Direction } from '../lib/direction'

export type Range = [number, number]

export const scene = {
  scrollLength: 900,
  meteorFrom: 'top-right' as Direction,
  phases: {
    meteor: [0.08, 0.32] as Range,
    open:   [0.36, 0.50] as Range,
    rise:   [0.50, 0.58] as Range,
    read:   [0.58, 0.78] as Range,
    star:   [0.84, 1.00] as Range,
  },
  stars: { count: 1000 },
  galaxies: [
    { x: 18, y: 24,  size: 380, hue: 272, depth: 0.22, tilt: -25 },
    { x: 80, y: 62,  size: 460, hue: 198, depth: 0.4,  tilt: 18  },
    { x: 40, y: 118, size: 320, hue: 322, depth: 0.55, tilt: 40  },
    { x: 66, y: 40,  size: 280, hue: 228, depth: 0.3,  tilt: -8  },
    { x: 10, y: 94,  size: 260, hue: 32,  depth: 0.62, tilt: 55  },
  ],
}