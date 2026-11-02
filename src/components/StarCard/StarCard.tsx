import { motion, MotionValue, useTransform } from 'framer-motion'
import { scene } from '../../config/scene'
import styles from './StarCard.module.css'

export default function StarCard({ progress }: { progress: MotionValue<number> }) {
  const [s0, s1] = scene.phases.star
  const span = s1 - s0
  const at = (a: number, b: number): [number, number] => [s0 + span * a, s0 + span * b]

  const stageOpacity = useTransform(progress, at(0, 0.10), [0, 1])
  const pointerEvents = useTransform(stageOpacity, (v) => (v > 0.15 ? 'auto' : 'none'))

  const kicker = {
    op: useTransform(progress, at(0.02, 0.14), [0, 1]),
    y:  useTransform(progress, at(0.02, 0.14), [10, 0]),
  }
  const img = {
    op:    useTransform(progress, at(0.04, 0.28), [0, 1]),
    scale: useTransform(progress, at(0.04, 0.28), [0.94, 1]),
  }
  const title = {
    op: useTransform(progress, at(0.22, 0.40), [0, 1]),
    y:  useTransform(progress, at(0.22, 0.40), [12, 0]),
  }
  const sub = {
    op: useTransform(progress, at(0.30, 0.46), [0, 1]),
    y:  useTransform(progress, at(0.30, 0.46), [8, 0]),
  }
  const info = {
    op: useTransform(progress, at(0.40, 0.62), [0, 1]),
    y:  useTransform(progress, at(0.40, 0.62), [14, 0]),
  }
  const link = {
    op: useTransform(progress, at(0.58, 0.76), [0, 1]),
    y:  useTransform(progress, at(0.58, 0.76), [6, 0]),
  }

  return (
    <motion.div className={styles.stage} style={{ opacity: stageOpacity, pointerEvents }}>
      <div className={styles.sunGlow} aria-hidden />

      <div className={styles.content}>
        <motion.p className={styles.kicker} style={{ opacity: kicker.op, y: kicker.y }}>
          and one more thing
        </motion.p>

        <motion.div className={styles.imageWrap} style={{ opacity: img.op, scale: img.scale }}>
          <div className={styles.imageFrame}>
            <img src="/assets/image.png" alt="The star Tathoi" />
          </div>
        </motion.div>

        <div className={styles.titleGroup}>
          <motion.h2 className={styles.name} style={{ opacity: title.op, y: title.y }}>
            Tathoi
          </motion.h2>
          <motion.p className={styles.subtitle} style={{ opacity: sub.op, y: sub.y }}>
            there is now a star that bears your name
          </motion.p>
        </div>

        <motion.div className={styles.infoRow} style={{ opacity: info.op, y: info.y }}>
          <div className={styles.note}>
            <p className={styles.label}>Observation note</p>
            <p className={styles.body}>
              In December, this star can be viewed from Dhaka, Bangladesh in the evening.
              Around 6:20 PM (Bangladesh Standard Time), it can be found at an elevation
              of 60° in the southeast.
            </p>
            <p className={styles.body}>
              Please make sure that no obstacles (such as buildings, mountains, or trees)
              are impeding your view.
            </p>
          </div>

          <a
            className={styles.cert}
            href="/assets/certificate.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the official certificate"
          >
            <div className={styles.certFrame}>
              <img src="/assets/certificate.jpg" alt="Certificate of star registration" />
            </div>
            <div className={styles.certCaption}>
              <span className={styles.certLabel}>The official certificate</span>
              <span className={styles.certOpen}>open ↗</span>
            </div>
          </a>
        </motion.div>

        <motion.a
          className={styles.footerLink}
          href="/assets/certificate.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{ opacity: link.op, y: link.y }}
        >
          View the full certificate <span className={styles.arrow}>↗</span>
        </motion.a>
      </div>
    </motion.div>
  )
}