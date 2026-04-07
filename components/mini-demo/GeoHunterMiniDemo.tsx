"use client"

import { useDemoStore } from './lib/store'
import { PhoneFrame } from './PhoneFrame'
import { StartScreen } from './screens/StartScreen'
import { GameScreen } from './screens/GameScreen'
import { EndScreen } from './screens/EndScreen'

/**
 * Embeddable, fully self-contained playable preview of GeoHunter Classic.
 *
 * Drop into any React app:
 *   import { GeoHunterMiniDemo } from '@geohunter/mini-demo'
 *   <GeoHunterMiniDemo />
 *
 * No props, no setup, no network calls. ~200KB bundled (mostly the country
 * rankings table). Renders an iPhone-shaped frame containing a complete
 * 8-round Classic game and a CTA back to geohuntergame.com / app stores.
 */
export function GeoHunterMiniDemo() {
  const phase = useDemoStore(s => s.phase)
  return (
    <PhoneFrame>
      {phase === 'start' && <StartScreen />}
      {phase === 'playing' && <GameScreen />}
      {phase === 'done' && <EndScreen />}
    </PhoneFrame>
  )
}
