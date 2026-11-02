import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useImpactShake } from './hooks/useImpactShake'
import { scene } from './config/scene'
import StarField from './components/StarField/StarField'
import Galaxy from './components/Galaxy/Galaxy'
import Hero from './components/Hero/Hero'
import Meteor from './components/Meteor/Meteor'
import Envelope from './components/Envelope/Envelope'
import StarCard from './components/StarCard/StarCard'
import Impact from './components/Impact/Impact'
import styles from './App.module.css'

export default function App() {
  const ref = useRef<HTMLElement>(null)
  const progress = useSmoothScroll(ref)
  const { x, y, rotate, scale, pulse } = useImpactShake(progress, scene.phases.meteor[1])

  return (
    <main ref={ref} style={{ height: `${scene.scrollLength}vh` }}>
      <div className={styles.stage}>
        <div className={styles.backdrop} />
        <div className={styles.nebula} />

        <motion.div className={styles.world} style={{ x, y, rotate, scale }}>
          <StarField progress={progress} />
          {scene.galaxies.map((g, i) => (
            <Galaxy key={i} progress={progress} {...g} />
          ))}
          <Hero progress={progress} />
          <Meteor progress={progress} />
          <Envelope progress={progress} />
          <StarCard progress={progress} />
          <Impact pulse={pulse} />
        </motion.div>

        <motion.div className={styles.progress} style={{ scaleX: progress }} />
      </div>
    </main>
  )
}