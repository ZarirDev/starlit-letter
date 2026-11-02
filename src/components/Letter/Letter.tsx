import { motion, MotionValue, useTransform } from 'framer-motion'
import { letter } from '../../config/letter'
import { scene } from '../../config/scene'
import styles from './Letter.module.css'

function Line({ progress, index, total, text, big = false }: {
  progress: MotionValue<number>; index: number; total: number; text: string; big?: boolean
}) {
  const [start, end] = scene.phases.read
  const seg = (end - start) / total
  const a = start + index * seg
  const opacity = useTransform(progress, [a, a + seg], [0, 1])
  const y = useTransform(progress, [a, a + seg], [16, 0])
  return (
    <motion.p className={big ? styles.big : styles.line} style={{ opacity, y }}>
      {text}
    </motion.p>
  )
}

export default function Letter({ progress }: { progress: MotionValue<number> }) {
  const all = [letter.greeting, ...letter.lines, letter.signOff, letter.from]
  return (
    <div className={styles.paper}>
      <span className={styles.stamp}>💌</span>
      {all.map((text, i) => (
        <Line
          key={i}
          progress={progress}
          index={i}
          total={all.length}
          text={text}
          big={i === 0 || i >= all.length - 2}
        />
      ))}
    </div>
  )
}