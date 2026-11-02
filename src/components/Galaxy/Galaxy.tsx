import { motion, MotionValue, useTransform } from 'framer-motion'
import styles from './Galaxy.module.css'

type Props = {
  progress: MotionValue<number>
  x: number; y: number; size: number; hue: number; depth: number; tilt: number
}

export default function Galaxy({ progress, x, y, size, hue, depth, tilt }: Props) {
  // y is in vh; galaxies drift upward at a rate set by their depth
  const top = useTransform(progress, [0, 1], [`${y}vh`, `${y - 150 * depth}vh`])
  const spin = useTransform(progress, [0, 1], [tilt, tilt + 40 * depth])

  return (
    <motion.div
      className={styles.galaxy}
      style={{
        left: `${x}vw`, top, width: size, height: size, rotate: spin,
        ['--h' as string]: hue,
      }}
    />
  )
}
