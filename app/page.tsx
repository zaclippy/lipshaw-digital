import type { Metadata } from "next";
import Link from "next/link";
import GameCollection from "@/components/portfolio/GameCollection";
import {
  Arrow,
  AtlasMark,
  SiteHeader,
  SiteFooter,
  WorkTogether,
} from "@/components/portfolio/SiteShell";

export const metadata: Metadata = {
  title: { absolute: "Zac Lipshaw — Developer & creator of LDGames" },
  description:
    "Zac Lipshaw, full-stack developer and creator of LDGames. Explore LDGames: GeoHunter, GeoHigherOrLower, Eight Votes and Eight Stops. Available for projects, collaborations and frontend / full-stack contracts.",
  alternates: { canonical: "https://ldapps.site/" },
  openGraph: {
    title: "Zac Lipshaw — Developer & creator of LDGames",
    description:
      "Daily geography games, websites and full-stack development by Zac Lipshaw.",
    url: "https://ldapps.site/",
    siteName: "Lipshaw Digital",
  },
};

export default function Home() {
  return (
    <div className="ld-site">
      <a className="ld-skip" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <section className="ld-hero ld-wrap">
          <div className="ld-hero-heading">
            <div className="ld-hero-intro">
              <span className="ld-hello">Developer · UK</span>
              <span className="ld-location">
                Open to projects & 3-month contracts.
              </span>
            </div>
            <h1>Zac Lipshaw.</h1>
            <div className="ld-hero-bottom">
              <p>I build games and websites.</p>
              <Link className="ld-text-link" href="/zac">
                About me <Arrow diagonal />
              </Link>
            </div>
          </div>
          <div className="ld-hero-stamp">
            <AtlasMark />
          </div>
        </section>
        <section
          className="ld-games-section ld-wrap"
          aria-labelledby="games-heading"
        >
          <div className="ld-section-heading">
            <div>
              <Link href="/games" className="ld-games-brand">
                <img src="/logo.png" alt="LD" width="44" height="40" />
                <span>Games</span>
              </Link>
              <h2 id="games-heading">Daily geography games.</h2>
            </div>
            <p>Four games. A new puzzle every day.</p>
          </div>
          <GameCollection />
        </section>
        <WorkTogether />
      </main>
      <SiteFooter />
    </div>
  );
}
