import { motion, MotionValue, useTransform, easeIn } from 'framer-motion'
import { scene } from '../../config/scene'
import { directionVector } from '../../lib/direction'
import styles from './Meteor.module.css'

export default function Meteor({ progress }: { progress: MotionValue<number> }) {
  const [m0, m1] = scene.phases.meteor
  const v = directionVector(scene.meteorFrom)
  const angle = (Math.atan2(v.y, v.x) * 180) / Math.PI // tail points back towards the origin

  const x = useTransform(progress, [m0, m1], [`${v.x * 70}vw`, '0vw'], { ease: easeIn })
  const y = useTransform(progress, [m0, m1], [`${v.y * 70}vh`, '0vh'], { ease: easeIn })
  const opacity = useTransform(progress, [m0, m0 + 0.03, m1 - 0.02, m1], [0, 1, 1, 0])
  const tail = useTransform(progress, [m0, m1 - 0.08, m1], [1, 1, 0.2])
  const scale = useTransform(progress, [m0, m1], [0.5, 1.15])

  return (
    <motion.div className={styles.meteor} style={{ x, y, opacity, scale }}>
      <motion.div className={styles.tail} style={{ rotate: angle, scaleX: tail }} />
      <div className={styles.head} />
    </motion.div>
  )
}