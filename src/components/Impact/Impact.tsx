import { motion, MotionValue, useTransform } from 'framer-motion'
import styles from './Impact.module.css'

/** Flash + shockwave rings fired at the meteor's landing point. */
export default function Impact({ pulse }: { pulse: MotionValue<number> }) {
  const flash = useTransform(pulse, (v) => Math.pow(v, 3) * 0.95)
  const ringScale = useTransform(pulse, [0, 1], [2.6, 0.12])
  const ringOpacity = useTransform(pulse, (v) => v * 0.9)
  const ring2Scale = useTransform(pulse, [0, 1], [3.6, 0.08])
  const ring2Opacity = useTransform(pulse, (v) => v * v * 0.55)

  return (
    <div className={styles.impact}>
      <motion.div className={styles.flash} style={{ opacity: flash }} />
      <motion.div className={styles.ring} style={{ scale: ringScale, opacity: ringOpacity }} />
      <motion.div className={`${styles.ring} ${styles.ring2}`} style={{ scale: ring2Scale, opacity: ring2Opacity }} />
    </div>
  )
}