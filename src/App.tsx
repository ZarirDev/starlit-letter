import { useRef } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { scene } from './config/scene'
import StarField from './components/StarField/StarField'
import Galaxy from './components/Galaxy/Galaxy'
import Hero from './components/Hero/Hero'
import Meteor from './components/Meteor/Meteor'
import Envelope from './components/Envelope/Envelope'

export default function App() {
  const ref = useRef<HTMLElement>(null)
  const progress = useSmoothScroll(ref)

  return (
    <main ref={ref} style={{ height: `${scene.scrollLength}vh` }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'grid', placeItems: 'center' }}>
        <StarField progress={progress} />
        {scene.galaxies.map((g, i) => (
          <Galaxy key={i} progress={progress} {...g} />
        ))}
        <Hero progress={progress} />
        <Meteor progress={progress} />
        <Envelope progress={progress} />
      </div>
    </main>
  )
}
