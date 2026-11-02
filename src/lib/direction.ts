export type Direction =
  | 'top' | 'top-right' | 'right' | 'bottom-right'
  | 'bottom' | 'bottom-left' | 'left' | 'top-left'

const d = Math.SQRT1_2
const vectors: Record<Direction, { x: number; y: number }> = {
  top: { x: 0, y: -1 },
  'top-right': { x: d, y: -d },
  right: { x: 1, y: 0 },
  'bottom-right': { x: d, y: d },
  bottom: { x: 0, y: 1 },
  'bottom-left': { x: -d, y: d },
  left: { x: -1, y: 0 },
  'top-left': { x: -d, y: -d },
}

/** Unit vector pointing from the screen centre towards the given side. */
export const directionVector = (dir: Direction) => vectors[dir]
