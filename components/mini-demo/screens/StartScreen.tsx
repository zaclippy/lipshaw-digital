"use client"

import { useDemoStore } from '../lib/store'

// Start screen sits on the same lavender purple background as the game.
// Uses the same translucent-white card pattern + a bold white "PLAY" button.
export function StartScreen() {
  const startGame = useDemoStore(s => s.startGame)
  return (
    <div className="ghmd-start">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo" src="/geohunter-logo.webp" alt="GeoHunter" />
      <h1 className="title">GeoHunter</h1>
      <div className="badge">CLASSIC · EASY MODE</div>
      <p className="tagline">Pick the right category for each country.<br/>Lower score wins.</p>

      <div className="rules">
        <div className="rule"><span>1</span> A flag spins and reveals a country</div>
        <div className="rule"><span>2</span> Pick the category it ranks best in</div>
        <div className="rule"><span>3</span> Aim is to get &lt;200</div>
      </div>

      <button className="play-btn" onClick={startGame}>▶ PLAY CLASSIC</button>

      <style>{`
        .ghmd-start {
          flex:1;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          text-align:center;
          gap:10px;
        }
        .logo {
          width:96px;
          height:96px;
          object-fit:contain;
          filter:drop-shadow(0 6px 14px rgba(0,0,0,0.35));
        }
        .title {
          font-size:38px;
          font-weight:900;
          margin:0;
          color:#ffffff;
          letter-spacing:-1px;
          text-shadow:0 2px 12px rgba(0,0,0,0.3);
        }
        .badge {
          font-size:10px;
          font-weight:900;
          letter-spacing:1.4px;
          color:#5b21b6;
          background:#FCD34D;
          padding:4px 12px;
          border-radius:999px;
          box-shadow:0 4px 10px -4px rgba(0,0,0,0.3);
        }
        .tagline {
          font-size:13px;
          color:rgba(255,255,255,0.92);
          margin:6px 0 0;
          line-height:1.5;
          font-weight:500;
        }
        .rules {
          margin-top:6px;
          display:flex;
          flex-direction:column;
          gap:8px;
          width:100%;
          background:rgba(255,255,255,0.18);
          border:1px solid rgba(255,255,255,0.28);
          border-radius:14px;
          padding:12px 14px;
          backdrop-filter:blur(6px);
          -webkit-backdrop-filter:blur(6px);
        }
        .rule {
          font-size:12px;
          color:#ffffff;
          font-weight:600;
          text-align:left;
          display:flex;
          align-items:center;
          gap:10px;
        }
        .rule span {
          display:inline-flex;
          align-items:center;
          justify-content:center;
          width:20px;
          height:20px;
          border-radius:50%;
          background:#FCD34D;
          color:#5b21b6;
          font-size:11px;
          font-weight:900;
          flex-shrink:0;
        }
        .play-btn {
          width:100%;
          margin-top:8px;
          padding:15px 20px;
          background:#ffffff;
          color:#5b21b6;
          border:none;
          border-radius:16px;
          font-size:16px;
          font-weight:900;
          letter-spacing:1.4px;
          cursor:pointer;
          box-shadow:0 12px 28px -10px rgba(0,0,0,0.4);
          transition:transform .15s ease;
          font-family:inherit;
        }
        .play-btn:hover { transform:translateY(-1px); }
        .play-btn:active { transform:scale(0.98); }
      `}</style>
    </div>
  )
}
