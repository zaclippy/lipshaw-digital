import type { Metadata } from "next";
import Link from "next/link";
import GameCollection from "@/components/portfolio/GameCollection";
import {
  Arrow,
  AtlasMark,
  SiteHeader,
  SiteFooter,
} from "@/components/portfolio/SiteShell";

export const metadata: Metadata = {
  title: { absolute: "Lipshaw Digital — Games & software by Zac Lipshaw" },
  description:
    "Zac Lipshaw, full-stack developer and creator of LDGames. Explore LDGames: GeoHunter, GeoHigherOrLower, Eight Votes and Eight Stops.",
  alternates: { canonical: "https://ldapps.site/" },
  openGraph: {
    title: "Lipshaw Digital — Games & software by Zac Lipshaw",
    description:
      "Daily geography games, websites and full-stack development by Zac Lipshaw.",
    url: "https://ldapps.site/",
    siteName: "Lipshaw Digital",
  },
};

export default function Home() {
  return (
    <div className="ld-site ld-home">
      <a className="ld-skip" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <section className="ld-hero ld-wrap">
          <div className="ld-hero-heading">
            <h1>Zac Lipshaw.</h1>
            <div className="ld-hero-bottom">
              <p>
                Games, websites and software.
              </p>
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
              <h2 id="games-heading">
                <Link href="/games" className="ld-games-brand">
                  <img src="/logo.png" alt="LD" width="44" height="40" />
                  <span>Games</span>
                </Link>
              </h2>
            </div>
            <p>Daily geography games.</p>
          </div>
          <GameCollection />
        </section>
        <section className="ld-home-work ld-wrap" aria-label="Other work">
          <h2>Websites & software.</h2>
          <div>
            <a href="https://arpadis.com" target="_blank" rel="noreferrer">
              Arpadis <Arrow diagonal />
            </a>
            <a
              href="https://nirvaanahostels.com"
              target="_blank"
              rel="noreferrer"
            >
              Nirvaana Hostels <Arrow diagonal />
            </a>
            <Link href="/services">
              Work with me <Arrow diagonal />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
