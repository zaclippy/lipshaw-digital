"use client"

import { useDemoStore } from '../lib/store'
import { calculateScore } from '../lib/scoring'

// Matches the real GeoHunter final-score screen: white card on purple bg,
// huge gradient score number, tier badge, primary CTA + store badges.

const WEB_URL = 'https://geohuntergame.com'
// TODO: replace with real store URLs when available
const IOS_URL = 'https://apps.apple.com/app/geohunter/id0000000000'
const ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.geohunter.app'

interface Tier {
  label: string
  gradient: string
}
function getTier(score: number): Tier {
  if (score === 8)   return { label: 'PERFECT',      gradient: 'linear-gradient(135deg,#fbbf24,#ec4899,#a855f7)' }
  if (score < 50)    return { label: 'EXPERT',       gradient: 'linear-gradient(135deg,#facc15,#f59e0b)' }
  if (score < 100)   return { label: 'ADVANCED',     gradient: 'linear-gradient(135deg,#a855f7,#6366f1)' }
  if (score < 200)   return { label: 'INTERMEDIATE', gradient: 'linear-gradient(135deg,#3b82f6,#06b6d4)' }
  return { label: 'BEGINNER', gradient: 'linear-gradient(135deg,#64748b,#475569)' }
}

export function EndScreen() {
  const selections = useDemoStore(s => s.selections)
  const restart = useDemoStore(s => s.restart)
  const score = calculateScore(selections)
  const tier = getTier(score)

  return (
    <div className="ghmd-end">
      <div className="card">
        <div className="label">FINAL SCORE</div>
        <div className="score">{score}</div>
        <div className="tier" style={{ background: tier.gradient }}>{tier.label}</div>

        <a className="cta primary" href={WEB_URL} target="_blank" rel="noopener noreferrer">
          ▶ PLAY THE FULL GAME
        </a>

        <div className="store-row">
          <a className="store-btn" href={IOS_URL} target="_blank" rel="noopener noreferrer">
            <span className="store-icon"></span>
            <div className="store-text">
              <span className="store-small">Download on the</span>
              <span className="store-big">App Store</span>
            </div>
          </a>
          <a className="store-btn" href={ANDROID_URL} target="_blank" rel="noopener noreferrer">
            <span className="store-icon">▶</span>
            <div className="store-text">
              <span className="store-small">Get it on</span>
              <span className="store-big">Google Play</span>
            </div>
          </a>
        </div>

        <button className="again" onClick={restart}>↻ Play Again</button>
      </div>

      <div className="picks">
        <div className="picks-title">YOUR PICKS</div>
        {selections.map((s, i) => (
          <div key={i} className="pick-row">
            <span className="pick-emoji">{s.country.emoji}</span>
            <span className="pick-name">{s.country.name}</span>
            <span className="pick-rank">#{s.rank}</span>
          </div>
        ))}
      </div>

      <style>{`
        .ghmd-end {
          flex:1;
          display:flex;
          flex-direction:column;
          gap:10px;
          overflow-y:auto;
          position:relative;
          z-index:2;
          padding:2px;
        }
        .card {
          background:#ffffff;
          border-radius:24px;
          padding:18px 20px 16px;
          box-shadow:0 20px 50px -20px rgba(0,0,0,0.5);
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:6px;
        }
        .label {
          font-size:10px;
          font-weight:800;
          letter-spacing:1.5px;
          color:#64748b;
        }
        .score {
          font-size:72px;
          font-weight:900;
          line-height:1;
          background:linear-gradient(135deg,#7c3aed,#5b21b6);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          letter-spacing:-2px;
        }
        .tier {
          padding:6px 18px;
          border-radius:999px;
          color:#ffffff;
          font-size:12px;
          font-weight:900;
          letter-spacing:1px;
          margin-top:2px;
          box-shadow:0 6px 16px -6px rgba(0,0,0,0.3);
        }
        .cta.primary {
          display:block;
          width:100%;
          margin-top:10px;
          padding:13px 16px;
          background:linear-gradient(135deg,#7c3aed,#5b21b6);
          color:#ffffff;
          text-align:center;
          text-decoration:none;
          font-size:14px;
          font-weight:900;
          letter-spacing:1px;
          border-radius:12px;
          box-shadow:0 10px 24px -8px rgba(124,58,237,0.6);
        }
        .cta.primary:hover { filter:brightness(1.08); }
        .store-row {
          display:flex;
          gap:8px;
          width:100%;
          margin-top:8px;
        }
        .store-btn {
          flex:1;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:6px;
          padding:8px 6px;
          background:#0f172a;
          color:#ffffff;
          text-decoration:none;
          border-radius:10px;
          font-size:10px;
        }
        .store-btn:hover { background:#1e293b; }
        .store-icon { font-size:16px; line-height:1; }
        .store-text { display:flex; flex-direction:column; line-height:1.1; text-align:left; }
        .store-small { font-size:8px; opacity:0.75; }
        .store-big { font-size:12px; font-weight:700; }
        .again {
          margin-top:6px;
          padding:6px 16px;
          background:transparent;
          color:#64748b;
          border:1px solid #cbd5e1;
          border-radius:999px;
          font-size:11px;
          font-weight:700;
          cursor:pointer;
          font-family:inherit;
        }
        .again:hover { background:#f1f5f9; }
        .picks {
          background:rgba(255,255,255,0.10);
          backdrop-filter:blur(8px);
          -webkit-backdrop-filter:blur(8px);
          border:1px solid rgba(255,255,255,0.18);
          border-radius:14px;
          padding:10px 12px;
        }
        .picks-title {
          font-size:9px;
          font-weight:800;
          letter-spacing:1.5px;
          color:rgba(255,255,255,0.75);
          margin-bottom:6px;
        }
        .pick-row {
          display:flex;
          align-items:center;
          gap:10px;
          padding:4px 0;
          font-size:11px;
          border-bottom:1px solid rgba(255,255,255,0.10);
        }
        .pick-row:last-child { border-bottom:none; }
        .pick-emoji { font-size:16px; }
        .pick-name { flex:1; color:#ffffff; font-weight:600; }
        .pick-rank { font-weight:900; color:#FCD34D; }
      `}</style>
    </div>
  )
}
