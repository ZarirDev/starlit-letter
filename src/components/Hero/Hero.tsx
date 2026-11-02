import { motion, MotionValue, useTransform } from 'framer-motion'
import styles from './Hero.module.css'

export default function Hero({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.1], [1, 0])
  const y = useTransform(progress, [0, 0.1], [0, -40])

  return (
    <motion.div className={styles.hero} style={{ opacity, y }}>
      <h1>Something is coming…</h1>
      <p>scroll down ↓</p>
    </motion.div>
  )
}
