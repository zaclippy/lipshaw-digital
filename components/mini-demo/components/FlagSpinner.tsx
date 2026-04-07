"use client"

// Flag spinner — direct port of apps/web/components/legacy-flag-display.tsx.
// Stripped of: translation, sound effects, USA image-flag mode. The 80ms
// decoy spin and 1–2s reveal animation are preserved exactly. The frame uses
// the legacy GREEN accent (#19944f) — confirmed against the live screenshot.

import { useState, useEffect, useRef } from 'react'
import type { Country } from '../lib/types'

const DECOY_FLAGS = [
  '🇺🇸','🇬🇧','🇨🇦','🇫🇷','🇩🇪','🇮🇹','🇪🇸','🇯🇵','🇰🇷','🇧🇷',
  '🇲🇽','🇦🇺','🇮🇳','🇨🇳','🇷🇺','🇸🇦','🇳🇿','🇳🇱','🇸🇪','🇳🇴',
  '🇩🇰','🇫🇮','🇵🇱','🇨🇭','🇦🇷','🇨🇱','🇨🇴','🇵🇪','🇻🇪','🇿🇦',
  '🇪🇬','🇹🇷','🇮🇱','🇵🇭','🇻🇳','🇮🇩','🇵🇰','🇹🇭','🇲🇦','🇳🇬',
  '🇺🇦','🇷🇴','🇭🇺','🇨🇿','🇷🇸','🇧🇬','🇬🇷','🇵🇹','🇮🇪','🇪🇪',
  '🇱🇻','🇱🇹','🇦🇹','🇧🇪','🇱🇺',
]

const ACCENT = '#19944f'

interface FlagSpinnerProps {
  targetCountry: Country
  onReveal: (country: Country) => void
  showCountryName?: boolean
}

type Phase = 'spinning' | 'transition' | 'ready'

export function FlagSpinner({ targetCountry, onReveal, showCountryName = true }: FlagSpinnerProps) {
  const [phase, setPhase] = useState<Phase>('spinning')
  const [currentFlag, setCurrentFlag] = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const spinIdRef = useRef(0)

  useEffect(() => {
    const mySpinId = ++spinIdRef.current
    setPhase('spinning')

    const spinDuration = 1000 + Math.random() * 1000
    const spinInterval = 80
    let spinCount = 0
    const maxSpins = Math.floor(spinDuration / spinInterval)

    intervalRef.current = setInterval(() => {
      if (spinIdRef.current !== mySpinId) return
      setCurrentFlag(DECOY_FLAGS[Math.floor(Math.random() * DECOY_FLAGS.length)])
      spinCount++

      if (spinCount >= maxSpins) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        timeoutRef.current = setTimeout(() => {
          if (spinIdRef.current !== mySpinId) return
          setPhase('transition')
          setCurrentFlag(targetCountry.emoji)
          timeoutRef.current = setTimeout(() => {
            if (spinIdRef.current !== mySpinId) return
            setPhase('ready')
            onReveal(targetCountry)
          }, 500)
        }, 50)
      }
    }, spinInterval)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetCountry])

  return (
    <div className="ghmd-flag-wrap">
      <div className={`ghmd-flag-card ${phase}`}>
        <div className={`ghmd-flag-frame ${phase}`}>
          <div className={`ghmd-flag-emoji ${phase === 'spinning' ? 'spinning' : ''}`}>
            {currentFlag}
          </div>
        </div>
        {showCountryName && (
          <div className={`ghmd-country-name ${phase === 'ready' ? 'visible' : ''}`}>
            {phase === 'ready' ? targetCountry.name : '\u00A0'}
          </div>
        )}
      </div>
      <style>{`
        .ghmd-flag-wrap { display:flex; align-items:center; justify-content:center; }
        .ghmd-flag-card {
          display:flex; flex-direction:column; align-items:center; gap:6px;
          padding:14px 18px 14px;
          background:linear-gradient(145deg,#f8fafc,#e9edf2);
          border:1px solid #e2e8f0;
          border-radius:24px;
          min-width:170px;
          box-shadow:0 6px 18px -8px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.4);
        }
        .ghmd-flag-frame {
          width:120px; height:74px; border-radius:18px;
          display:flex; align-items:center; justify-content:center;
          background:#fff; position:relative;
          box-shadow:0 0 0 3px ${ACCENT}AA, 0 4px 12px -4px rgba(0,0,0,0.15);
          transition:box-shadow .35s ease, transform .5s cubic-bezier(.68,-0.4,.27,1.55);
        }
        .ghmd-flag-frame.spinning {
          box-shadow:0 0 0 3px ${ACCENT}, 0 4px 14px -2px rgba(0,0,0,0.25);
          animation: ghmdFramePulse .6s linear infinite alternate;
        }
        .ghmd-flag-frame.transition { animation: ghmdFrameReveal .55s cubic-bezier(.68,-0.55,.265,1.55); }
        .ghmd-flag-emoji { font-size:54px; line-height:1; }
        .ghmd-flag-emoji.spinning {
          animation: ghmdFlagSpin .2s linear infinite;
          filter:blur(1px);
          transform:scale(1.08);
        }
        .ghmd-country-name {
          font-size:1.15rem;
          font-family:'Inter','Segoe UI',Arial,sans-serif;
          font-weight:800;
          letter-spacing:0.6px;
          color:#2d3748;
          text-transform:uppercase;
          line-height:1.1;
          text-align:center;
          text-shadow:0 1px 0 #fff, 0 2px 6px rgba(15,23,42,0.10);
          margin-top:4px;
          min-height:1.2em;
          opacity:0;
          transition:opacity .25s ease;
        }
        .ghmd-country-name.visible { opacity:1; }
        @keyframes ghmdFlagSpin {
          0% { transform: rotateY(0deg) scale(1.08); }
          50% { transform: rotateY(180deg) scale(1.18); }
          100% { transform: rotateY(360deg) scale(1.08); }
        }
        @keyframes ghmdFrameReveal {
          0% { transform: scale(.3) rotateY(160deg); opacity:0; filter:blur(6px); }
          60% { transform: scale(1.08) rotateY(15deg); filter:blur(1px); }
          100% { transform: scale(1) rotateY(0deg); opacity:1; filter:blur(0); }
        }
        @keyframes ghmdFramePulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.03); }
        }
      `}</style>
    </div>
  )
}
