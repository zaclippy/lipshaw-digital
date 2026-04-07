"use client"

import { useDemoStore } from '../lib/store'
import { CLASSIC_CATEGORIES } from '../lib/data'
import { calculateScore } from '../lib/scoring'
import { TOTAL_ROUNDS } from '../lib/types'
import { FlagSpinner } from '../components/FlagSpinner'
import { CategoryButton } from '../components/CategoryButton'

// Layout & styling are a 1:1 port of apps/web/components/game-screen.tsx
// (the live Classic-mode game screen). All Tailwind utilities have been
// converted to plain CSS so the package has zero dependency on a CSS framework.
//
//  ┌────────┐ ┌────────────────────────┐ ┌────┐
//  │  logo  │ │       EASY MODE        │ │ ↻  │
//  │ square │ │           42           │ │    │
//  │        │ │ ───── PERFORMANCE ──── │ │    │
//  │        │ │  • • • ○ ○ ○ ○ ○       │ │    │
//  └────────┘ └────────────────────────┘ └────┘
//  ┌────────────── white panel ──────────────────┐
//  │              ┌──────────┐                   │
//  │              │   flag   │                   │
//  │              └──────────┘                   │
//  │              COUNTRY NAME                   │
//  │   👥  POPULATION                            │
//  │   ⚽  FOOTBALL                              │
//  │   …                                         │
//  └─────────────────────────────────────────────┘

// Per-rank dot colors copied from game-screen.tsx lines 922-934.
function dotClassForRank(rank: number): string {
  if (rank <= 5) return 'g-dot-emerald'
  if (rank <= 15) return 'g-dot-emerald2'
  if (rank <= 30) return 'g-dot-blue'
  if (rank <= 50) return 'g-dot-amber'
  if (rank <= 65) return 'g-dot-orange'
  return 'g-dot-red'
}

export function GameScreen() {
  const countries = useDemoStore(s => s.countries)
  const currentIndex = useDemoStore(s => s.currentIndex)
  const selections = useDemoStore(s => s.selections)
  const usedCategories = useDemoStore(s => s.usedCategories)
  const selectCategory = useDemoStore(s => s.selectCategory)
  const restart = useDemoStore(s => s.restart)

  const country = countries[currentIndex]
  if (!country) return null

  const score = calculateScore(selections)

  const pickedByCategory: Record<string, { rank: number; emoji: string }> = {}
  for (const sel of selections) {
    pickedByCategory[sel.category] = { rank: sel.rank, emoji: sel.country.emoji }
  }

  // Performance bar fill: simple inverse of avg rank (matches "PERFORMANCE" feel)
  const avgRank = selections.length ? score / selections.length : 0
  const fillPercent = selections.length === 0
    ? 0
    : Math.max(0, Math.min(100, 100 - (avgRank / 100) * 100))

  return (
    <div className="g-screen">
      {/* ───── Top header: Logo | Score+Performance | Controls ───── */}
      <div className="g-header">
        {/* Logo square (left) */}
        <div className="g-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/geohunter-logo.png" alt="GeoHunter" className="g-logo-img" />
        </div>

        {/* Score + performance pill (center, flex-1) */}
        <div className="g-score-box">
          <div className="g-score-top">
            <div className="g-score-label">GEOHUNTER</div>
            <div className="g-score-num">{score}</div>
          </div>
          <div className="g-perf-row">
            <div className="g-perf-track">
              <div className="g-perf-fill" style={{ width: `${fillPercent}%` }} />
              <div className="g-perf-text">PERFORMANCE</div>
            </div>
          </div>
          <div className="g-dots">
            {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => {
              let cls = 'g-dot-empty'
              if (i < selections.length) {
                cls = dotClassForRank(selections[i].rank)
              } else if (i === selections.length) {
                cls = 'g-dot-current'
              }
              return <div key={i} className={`g-dot ${cls}`} />
            })}
          </div>
        </div>

        {/* Controls column (right) — restart only */}
        <div className="g-controls">
          <button
            type="button"
            className="g-ctrl-btn"
            onClick={restart}
            aria-label="Restart"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ───── White panel: flag + categories ───── */}
      <div className="g-panel">
        <div className="g-flag-wrap">
          <FlagSpinner
            key={currentIndex}
            targetCountry={country}
            onReveal={() => { /* no-op */ }}
          />
        </div>

        <div className="g-cat-list">
          {CLASSIC_CATEGORIES.map(cat => {
            const picked = pickedByCategory[cat.id]
            return (
              <CategoryButton
                key={cat.id}
                category={cat}
                disabled={usedCategories.includes(cat.id)}
                onClick={() => selectCategory(cat.id)}
                pickedRank={picked?.rank}
                pickedEmoji={picked?.emoji}
              />
            )
          })}
        </div>
      </div>

      <style>{`
        .g-screen {
          flex:1;
          display:flex;
          flex-direction:column;
          gap:6px;
          min-height:0;
        }

        /* ─── Top header row ─── */
        /* matches: flex items-stretch gap-2.5 mt-1 mb-1.5 px-2 */
        .g-header {
          display:flex;
          align-items:stretch;
          gap:10px;
          padding:0 8px;
          margin:4px 0 6px;
          flex-shrink:0;
        }

        /* Logo: w-24 aspect-square bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl */
        .g-logo {
          width:78px;
          aspect-ratio:1;
          flex-shrink:0;
          display:flex;
          align-items:center;
          justify-content:center;
          background:rgba(255,255,255,0.10);
          backdrop-filter:blur(4px);
          -webkit-backdrop-filter:blur(4px);
          border:1px solid rgba(255,255,255,0.15);
          border-radius:16px;
          padding:4px;
          overflow:hidden;
        }
        .g-logo-img {
          width:100%;
          height:100%;
          object-fit:contain;
          filter:drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        }

        /* Score box: flex-1 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-3.5 py-2.5 */
        .g-score-box {
          flex:1;
          display:flex;
          flex-direction:column;
          justify-content:center;
          background:rgba(255,255,255,0.10);
          backdrop-filter:blur(4px);
          -webkit-backdrop-filter:blur(4px);
          border:1px solid rgba(255,255,255,0.15);
          border-radius:16px;
          padding:8px 14px;
        }
        .g-score-top {
          text-align:center;
          margin-bottom:6px;
          position:relative;
        }
        /* text-[9px] tracking-wide font-bold uppercase text-yellow-300, letterSpacing 1.5px */
        .g-score-label {
          font-size:9px;
          font-weight:700;
          text-transform:uppercase;
          color:#FCD34D;
          letter-spacing:1.5px;
        }
        /* text-4xl font-black text-yellow-300 drop-shadow-sm leading-none, textShadow 0 2px 8px rgba(0,0,0,.3) */
        .g-score-num {
          font-size:34px;
          font-weight:900;
          color:#FCD34D;
          line-height:1;
          text-shadow:0 2px 8px rgba(0,0,0,0.3);
          margin-top:1px;
        }

        /* Performance bar row: w-[70%] min-w-[120px] max-w-[220px] h-3.5 bg-white/20 rounded-full */
        .g-perf-row {
          display:flex;
          justify-content:center;
          width:100%;
        }
        .g-perf-track {
          position:relative;
          width:80%;
          min-width:120px;
          max-width:220px;
          height:14px;
          background:rgba(255,255,255,0.20);
          border-radius:999px;
          overflow:hidden;
        }
        .g-perf-fill {
          position:absolute;
          inset:0 auto 0 0;
          background:#facc15; /* yellow-400 — matches Classic accent */
          transition:width .5s ease;
        }
        /* text-[8px] tracking-wider font-semibold text-white/65 */
        .g-perf-text {
          position:absolute;
          inset:0;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:8px;
          font-weight:600;
          letter-spacing:0.06em;
          color:rgba(255,255,255,0.65);
          text-transform:uppercase;
        }

        /* Dot row: gap-1 mt-1.5, each w-2.5 h-2.5 rounded-full border */
        .g-dots {
          display:flex;
          align-items:center;
          justify-content:center;
          gap:4px;
          margin-top:6px;
        }
        .g-dot {
          width:10px;
          height:10px;
          border-radius:50%;
          border:1px solid rgba(255,255,255,0.20);
          background:rgba(255,255,255,0.20);
        }
        .g-dot-current {
          background:rgba(255,255,255,0.30);
          border-color:rgba(255,255,255,0.40);
          animation: g-pulse 1.4s ease-in-out infinite;
        }
        .g-dot-emerald  { background:#4ade80; border-color:rgba(74,222,128,0.6); }
        .g-dot-emerald2 { background:#34d399; border-color:rgba(52,211,153,0.6); }
        .g-dot-blue     { background:#60a5fa; border-color:rgba(96,165,250,0.6); }
        .g-dot-amber    { background:#fbbf24; border-color:rgba(251,191,36,0.6); }
        .g-dot-orange   { background:#fb923c; border-color:rgba(251,146,60,0.6); }
        .g-dot-red      { background:#f87171; border-color:rgba(248,113,113,0.6); }
        @keyframes g-pulse {
          0%,100% { opacity:1; }
          50% { opacity:0.5; }
        }

        /* Controls column: flex flex-col bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-2 w-12 gap-2 */
        .g-controls {
          width:42px;
          flex-shrink:0;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          gap:8px;
          background:rgba(255,255,255,0.10);
          backdrop-filter:blur(4px);
          -webkit-backdrop-filter:blur(4px);
          border:1px solid rgba(255,255,255,0.15);
          border-radius:16px;
          padding:8px;
        }
        /* w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 */
        .g-ctrl-btn {
          width:30px;
          height:30px;
          border-radius:8px;
          background:rgba(255,255,255,0.10);
          color:rgba(255,255,255,0.85);
          border:none;
          display:flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
          transition:all .15s ease;
          padding:0;
        }
        .g-ctrl-btn:hover {
          background:rgba(255,255,255,0.20);
          color:#ffffff;
          transform:scale(1.05);
        }
        .g-ctrl-btn:active { transform:scale(0.95); }

        /* ─── White panel ─── */
        /* w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl px-5 pt-4 pb-5 */
        .g-panel {
          flex:1;
          background:#ffffff;
          border-radius:24px;
          box-shadow:
            0 20px 25px -5px rgba(0,0,0,0.18),
            0 8px 10px -6px rgba(0,0,0,0.10);
          padding:14px 16px 16px;
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:10px;
          min-height:0;
          overflow:hidden;
          font-family:'Inter','Segoe UI',Arial,sans-serif;
        }
        .g-flag-wrap {
          display:flex;
          justify-content:center;
          margin-bottom:4px;
        }
        .g-cat-list {
          /* w-full space-y-1.5 */
          width:100%;
          display:flex;
          flex-direction:column;
          gap:6px;
          flex:1;
          overflow-y:auto;
        }
        .g-cat-list::-webkit-scrollbar { width:0; }
      `}</style>
    </div>
  )
}
