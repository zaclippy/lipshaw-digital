"use client"

import type { ReactNode } from 'react'

interface PhoneFrameProps {
  children: ReactNode
}

// iOS-style frame. Inner screen background matches the real GeoHunter Classic
// mode flat lavender purple from the live app screenshot.
export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="ghmd-phone">
      <div className="ghmd-phone-bezel">
        <div className="ghmd-phone-screen">
          <div className="ghmd-status-bar">
            <span className="time">9:41</span>
            <div className="notch" />
            <div className="icons">
              <span className="signal">●●●</span>
              <span className="wifi">📶</span>
              <span className="battery">▮</span>
            </div>
          </div>
          <div className="ghmd-screen-content">{children}</div>
        </div>
      </div>
      <style>{`
        .ghmd-phone {
          display:inline-flex;
          align-items:center;
          justify-content:center;
          font-family:'Inter','Segoe UI',-apple-system,BlinkMacSystemFont,Arial,sans-serif;
          color:#0f172a;
        }
        .ghmd-phone-bezel {
          width:330px;
          height:680px;
          background:linear-gradient(160deg,#1c1c1e,#0a0a0a);
          border-radius:54px;
          padding:14px;
          box-shadow:
            0 30px 60px -20px rgba(0,0,0,0.5),
            0 0 0 2px #2c2c2e,
            inset 0 0 0 1px rgba(255,255,255,0.04);
          position:relative;
        }
        .ghmd-phone-screen {
          width:100%;
          height:100%;
          /* Real GeoHunter Classic background — exact gradient from
             apps/web/components/game-screen.tsx getCustomStyles().
             linear-gradient(135deg, lighten(#9c62b3,0.2), #9c62b3 35%, darken(#9c62b3,0.15)) */
          background:linear-gradient(135deg, #cf95e6 0%, #9c62b3 35%, #763c8d 100%);
          border-radius:42px;
          overflow:hidden;
          position:relative;
          display:flex;
          flex-direction:column;
        }
        .ghmd-status-bar {
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:10px 22px 6px;
          font-size:13px;
          font-weight:600;
          color:#ffffff;
          position:relative;
          flex-shrink:0;
        }
        .ghmd-status-bar .time { z-index:2; text-shadow:0 1px 2px rgba(0,0,0,0.25); }
        .ghmd-status-bar .icons {
          display:flex;
          gap:6px;
          align-items:center;
          font-size:11px;
          z-index:2;
          text-shadow:0 1px 2px rgba(0,0,0,0.25);
        }
        .ghmd-status-bar .signal { letter-spacing:-1px; }
        .ghmd-status-bar .battery { font-size:18px; line-height:0; }
        .ghmd-status-bar .notch {
          position:absolute;
          left:50%;
          top:6px;
          transform:translateX(-50%);
          width:96px;
          height:26px;
          background:#0a0a0a;
          border-radius:18px;
          z-index:1;
        }
        .ghmd-screen-content {
          flex:1;
          display:flex;
          flex-direction:column;
          overflow:hidden;
          padding:10px 12px 14px;
          position:relative;
        }
        @media (max-width: 440px) {
          .ghmd-phone-bezel {
            width: 92vw;
            max-width: 330px;
            height: calc(92vw * 2.06);
            max-height: 680px;
          }
        }
      `}</style>
    </div>
  )
}
