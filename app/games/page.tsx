import type { Metadata } from "next";
import GameCollection from "@/components/portfolio/GameCollection";
import {
  SiteHeader,
  SiteFooter,
  AtlasMark,
} from "@/components/portfolio/SiteShell";

export const metadata: Metadata = {
  title: "LDGames — Daily geography games",
  description:
    "Four daily games by Zac Lipshaw. Play GeoHunter, GeoHigherOrLower, Eight Votes and Eight Stops. Geography, geopolitics and the London Underground.",
  alternates: { canonical: "https://ldapps.site/games" },
  openGraph: {
    title: "LDGames — Daily geography games",
    description: "Four daily games by Zac Lipshaw.",
    url: "https://ldapps.site/games",
  },
};

export default function GamesPage() {
  return (
    <div className="ld-site">
      <a className="ld-skip" href="#main">
        Skip to content
      </a>
      <SiteHeader active="games" />
      <main id="main">
        <section className="ld-page-intro ld-wrap">
          <div>
            <span className="ld-games-brand">
              <img src="/logo.png" alt="LD" width="44" height="40" />
              <span>Games</span>
            </span>
            <h1>Daily games.</h1>
            <p>
              Geography, geopolitics and the London Underground. A new puzzle
              every day.
            </p>
          </div>
          <AtlasMark />
        </section>
        <section className="ld-wrap" aria-label="Daily games">
          <GameCollection />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
