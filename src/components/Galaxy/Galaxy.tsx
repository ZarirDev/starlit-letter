import { motion, MotionValue, useTransform } from 'framer-motion'
import styles from './Galaxy.module.css'

type Props = {
  progress: MotionValue<number>
  x: number; y: number; size: number; hue: number; depth: number; tilt: number
}

export default function Galaxy({ progress, x, y, size, hue, depth, tilt }: Props) {
  const top = useTransform(progress, [0, 1], [`${y}vh`, `${y - 150 * depth}vh`])
  // slow drift in addition to the continuous CSS spin
  const drift = useTransform(progress, [0, 1], [tilt, tilt + 40 * depth])
  // closer (deeper) galaxies spin faster
  const spinDuration = 65 - 40 * depth

  return (
    <motion.div
      className={styles.galaxy}
      style={{
        left: `${x}vw`, top, width: size, height: size, rotate: drift,
        ['--h' as string]: hue,
      }}
    >
      <div className={styles.halo} />
      <div className={styles.discTilt}>
        <div className={styles.discSpin} style={{ animationDuration: `${spinDuration}s` }} />
      </div>
      <div className={styles.core} />
    </motion.div>
  )
}