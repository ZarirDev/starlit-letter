import { motion, MotionValue, useMotionTemplate, useTransform } from 'framer-motion'
import { scene } from '../../config/scene'
import Letter from '../Letter/Letter'
import styles from './Envelope.module.css'

export default function Envelope({ progress }: { progress: MotionValue<number> }) {
  const { meteor, open, rise, star } = scene.phases
  const m1 = meteor[1]
  const [o0, o1] = open
  const [r0, r1] = rise
  const [s0, s1] = star
  const riseSpan = r1 - r0
  const starSpan = s1 - s0

  const opacity = useTransform(progress, [m1 - 0.04, m1], [0, 1])
  const scale = useTransform(progress, [m1 - 0.04, m1, m1 + 0.04], [0.55, 1.08, 1])

  const bodyOpacity = useTransform(progress, [r0 + riseSpan * 0.02, r0 + riseSpan * 0.3], [1, 0])
  const bodyY = useTransform(progress, [r0, r1], ['0vh', '44vh'])

  const flapRotate = useTransform(progress, [o0, o1], [0, 180])
  const flapZ = useTransform(flapRotate, (r) => (r > 90 ? 1 : 4))

  const paperPeek = useTransform(
    progress,
    [0, o0, o1, r0 + riseSpan * 0.3, r1],
    ['0%', '0%', '-22%', '-22%', '0%'],
  )
  // rises up and out while the star reveals
  const paperExitY = useTransform(progress, [s0, s0 + starSpan * 0.55], ['0vh', '-60vh'])
  const paperY = useMotionTemplate`calc(${paperPeek} + ${paperExitY})`
  const paperExitOpacity = useTransform(progress, [s0, s0 + starSpan * 0.35], [1, 0])

  const paperScale = useTransform(progress, [r0 + riseSpan * 0.3, r1 - 0.02, r1], [0.38, 1.03, 1])
  const paperRotate = useTransform(progress, [o1, r1], [-5, 0])
  const paperClip = useTransform(
    progress,
    [r0 + riseSpan * 0.3, r0 + riseSpan * 0.55],
    ['inset(0 0 55% 0)', 'inset(0 0 0 0)'],
  )

  return (
    <motion.div className={styles.wrapper} style={{ opacity, scale }}>
      <motion.div
        className={`${styles.layer} ${styles.back}`}
        style={{ opacity: bodyOpacity, y: bodyY }}
      />
      <motion.div
        className={styles.flap}
        style={{ rotateX: flapRotate, zIndex: flapZ, opacity: bodyOpacity, y: bodyY }}
      >
        <div className={styles.flapShape} />
        <span className={styles.seal}>❤</span>
      </motion.div>
      <motion.div
        className={styles.paper}
        style={{
          y: paperY,
          scale: paperScale,
          rotate: paperRotate,
          clipPath: paperClip,
          opacity: paperExitOpacity,
        }}
      >
        <Letter progress={progress} />
      </motion.div>
      <motion.div
        className={`${styles.layer} ${styles.pocket}`}
        style={{ opacity: bodyOpacity, y: bodyY }}
      />
    </motion.div>
  )
}