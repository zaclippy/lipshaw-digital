"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const GeoHunterMiniDemo = dynamic(
  () =>
    import("@/components/mini-demo").then((module) => module.GeoHunterMiniDemo),
  {
    loading: () => (
      <p className="ld-demo-loading" role="status">
        Loading the playable preview…
      </p>
    ),
  },
);
import { games } from "@/lib/games";
import { Arrow } from "./SiteShell";

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
  const hunter = games[0];
  return (
    <div className="ld-game-collection">
      <nav className="ld-game-index" aria-label="Choose a daily game">
        {games.map((game) => (
          <a key={game.id} href={game.href} target="_blank" rel="noreferrer">
            <span className={`ld-index-dot ld-index-${game.theme}`} />
            <span>{game.name}</span>
            <Arrow diagonal />
          </a>
        ))}
      </nav>
      <article
        className={`ld-hunter-feature ${showDemo ? "is-playing" : ""}`}
        id={hunter.id}
      >
        <div className="ld-hunter-copy">
          <span className="ld-daily">
            <span /> Daily geography game
          </span>
          <h3>{hunter.name}</h3>
          <p className="ld-feature-description">
            Match countries
            <br />
            to categories.
          </p>
          <p>Eight countries. Eight categories. Lowest score wins.</p>
          <div className="ld-feature-actions">
            <a
              className="ld-button ld-button-white"
              href={hunter.href}
              target="_blank"
              rel="noreferrer"
            >
              Play GeoHunter <Arrow diagonal />
            </a>
            <button
              className="ld-demo-toggle"
              type="button"
              onClick={() => setShowDemo(!showDemo)}
              aria-expanded={showDemo}
              aria-controls="geohunter-preview"
            >
              {showDemo ? "Close preview" : "Try it here"}
              <span aria-hidden="true">{showDemo ? "−" : "+"}</span>
            </button>
          </div>
          <div className="ld-hunter-footnote">
            <span>Web, iOS & Android</span>
            <div>
              <a
                href="https://apps.apple.com/gb/app/geohunter/id6755425765"
                target="_blank"
                rel="noreferrer"
              >
                App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.geohuntergame.mobile&hl=en_GB"
                target="_blank"
                rel="noreferrer"
              >
                Google Play
              </a>
            </div>
          </div>
        </div>
        <div className="ld-hunter-visual" id="geohunter-preview">
          {showDemo ? (
            <div className="ld-demo-container">
              <GeoHunterMiniDemo />
            </div>
          ) : (
            <button
              className="ld-globe-preview"
              onClick={() => setShowDemo(true)}
              aria-label="Open the playable GeoHunter preview"
            >
              <img
                src="/atlas-world.svg"
                alt=""
                width="480"
                height="480"
                className="ld-world-art"
              />
              <span className="ld-map-tag ld-map-tag-one">🇧🇷 Biodiversity</span>
              <span className="ld-map-tag ld-map-tag-two">
                🇯🇵 Life expectancy
              </span>
              <span className="ld-map-tag ld-map-tag-three">🇨🇦 Land area</span>
              <span className="ld-globe-caption">
                <span className="ld-play-icon">▶</span> Play the demo
              </span>
            </button>
          )}
        </div>
      </article>
      <div className="ld-games-grid">
        {games.slice(1).map((game) => (
          <article
            className={`ld-game-card ld-game-${game.theme}`}
            id={game.id}
            key={game.id}
          >
            <a
              href={game.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Play ${game.name} (opens in a new tab)`}
            >
              <div className="ld-game-art">
                <GameArtwork theme={game.theme} />
                <span className="ld-card-daily">Daily</span>
              </div>
              <div className="ld-game-card-content">
                <span className="ld-game-category">{game.category}</span>
                <div className="ld-game-title">
                  <h3>
                    {game.name === "GeoHigherOrLower" ? (
                      <>
                        GeoHigher<span>OrLower</span>
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
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
