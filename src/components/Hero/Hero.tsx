import { motion, MotionValue, useTransform } from 'framer-motion'
import styles from './Hero.module.css'

export default function Hero({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.08], [1, 0])
  const y = useTransform(progress, [0, 0.08], [0, -50])
  const filter = useTransform(progress, [0, 0.08], ['blur(0px)', 'blur(6px)'])

  return (
    <motion.div className={styles.hero} style={{ opacity, y, filter }}>
      <h1>Something is coming…</h1>
      <div className={styles.rule} />
      <p>scroll down ↓</p>
    </motion.div>
  )
}