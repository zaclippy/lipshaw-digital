"use client";

import { useId, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { games } from "@/lib/games";
import { Arrow } from "./SiteShell";
import GlobeCategories from "./GlobeCategories";

const GeoHunterMiniDemo = dynamic(
  () =>
    import("@/components/mini-demo").then((module) => module.GeoHunterMiniDemo),
  {
    loading: () => (
      <p className="ld-demo-loading" role="status">
        Loading demo…
      </p>
    ),
  },
);

function GameArtwork({ theme }: { theme: string }) {
  if (theme === "higher")
    return (
      <div className="ld-comparison" aria-hidden="true">
        <span className="ld-country ld-country-japan">
          <span>🇯🇵</span>Japan
        </span>
        <span className="ld-compare-symbol">
          ↑<br />↓
        </span>
        <span className="ld-country ld-country-brazil">
          <span>🇧🇷</span>Brazil
        </span>
      </div>
    );
  if (theme === "votes")
    return (
      <div className="ld-ballots" aria-hidden="true">
        {["🇫🇷", "🇮🇳", "🇺🇸", "🇧🇷", "🇯🇵", "🇿🇦", "🇬🇧", "🇨🇦"].map((flag) => (
          <span key={flag}>
            {flag}
            <i />
          </span>
        ))}
      </div>
    );
  return (
    <svg
      className="ld-tube-map"
      viewBox="0 0 360 220"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M-20 165h110l100-100h190"
        stroke="#db5c58"
        strokeWidth="13"
        strokeLinejoin="round"
      />
      <path
        d="M60-20v70l140 140h180"
        stroke="#3457b6"
        strokeWidth="13"
        strokeLinejoin="round"
      />
      <path
        d="M-10 55h125l100 100v85"
        stroke="#e5b83c"
        strokeWidth="13"
        strokeLinejoin="round"
      />
      {[
        [45, 165],
        [120, 135],
        [175, 80],
        [265, 65],
        [60, 40],
        [120, 110],
        [250, 190],
        [315, 190],
      ].map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="8"
          fill="#fffdf7"
          stroke="#243149"
          strokeWidth="3"
        />
      ))}
      <circle
        cx="145"
        cy="110"
        r="16"
        fill="#fffdf7"
        stroke="#243149"
        strokeWidth="3"
      />
      <circle cx="145" cy="110" r="6" fill="#243149" />
    </svg>
  );
}

export default function GameCollection() {
  const [showDemo, setShowDemo] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();

  function openDemo() {
    setShowDemo(true);
    dialogRef.current?.showModal();
  }

  return (
    <div className="ld-game-collection">
      <div className="ld-games-grid">
        {games.map((game) => (
          <article
            className={`ld-game-card ld-game-${game.theme}`}
            id={game.id}
            key={game.id}
          >
            <div className="ld-game-art">
              {game.id === "geohunter" ? (
                <GlobeCategories />
              ) : (
                <a
                  className="ld-game-art-link"
                  href={game.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Play ${game.name}`}
                >
                  <GameArtwork theme={game.theme} />
                </a>
              )}
              <span className="ld-card-daily">Daily</span>
            </div>
            <div className="ld-game-card-content">
              <a
                className="ld-game-details-link"
                href={game.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Play ${game.name}`}
              >
                <span className="ld-game-category">{game.category}</span>
                <div className="ld-game-title">
                  <h3>
                    {game.id === "higher-or-lower" ? (
                      <>
                        GeoHigher
                        <wbr />
                        OrLower
                      </>
                    ) : (
                      game.name
                    )}
                  </h3>
                  <span className="ld-game-open">
                    <Arrow diagonal />
                  </span>
                </div>
                <p>{game.description}</p>
              </a>
              {game.id === "geohunter" && (
                <button
                  className="ld-card-demo"
                  onClick={openDemo}
                  aria-haspopup="dialog"
                  aria-controls={dialogId}
                >
                  Try demo <span aria-hidden="true">+</span>
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
      <dialog
        className="ld-demo-dialog"
        ref={dialogRef}
        id={dialogId}
        aria-labelledby={`${dialogId}-title`}
        onClose={() => setShowDemo(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="ld-demo-dialog-header">
          <h2 id={`${dialogId}-title`}>GeoHunter demo</h2>
          <button
            onClick={() => dialogRef.current?.close()}
            aria-label="Close demo"
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="ld-demo-container">
          {showDemo && <GeoHunterMiniDemo />}
        </div>
      </dialog>
    </div>
  );
}
