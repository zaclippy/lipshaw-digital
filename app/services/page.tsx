import type { Metadata } from "next";
import Link from "next/link";
import {
  Arrow,
  SiteHeader,
  SiteFooter,
} from "@/components/portfolio/SiteShell";

export const metadata: Metadata = {
  title: "Work with Zac",
  description:
    "Games, websites and useful tools, designed and built by Zac Lipshaw. Small-business projects, product collaborations and short frontend or full-stack contracts.",
  alternates: { canonical: "https://ldapps.site/services" },
  openGraph: {
    title: "Work with Zac",
    description:
      "Games, websites, business tools and frontend / full-stack contracts.",
    url: "https://ldapps.site/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="ld-site">
      <a className="ld-skip" href="#main">
        Skip to content
      </a>
      <SiteHeader active="services" />
      <main id="main">
        <section className="ld-page-intro ld-wrap">
          <div>
            <span className="ld-availability">
              <span /> Projects, contracts & collaborations
            </span>
            <h1>Work with me.</h1>
            <p>
              I design and build games, websites and tools for small businesses.
            </p>
            <a
              className="ld-button ld-button-blue"
              href="mailto:zac@ldapps.site"
            >
              Email Zac <Arrow diagonal />
            </a>
          </div>
        </section>
        <section
          className="ld-services ld-wrap"
          aria-label="Ways to work together"
        >
          {[
            {
              title: "Small businesses",
              text: "Websites, internal tools and automation.",
            },
            {
              title: "Games & products",
              text: "Game development, product design and prototypes.",
            },
            {
              title: "Contract work",
              text: "Frontend and full-stack development. Open to 3-month contracts.",
            },
          ].map((item) => (
            <article key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </section>
        <section className="ld-client-work ld-wrap">
          <div>
            <h2>Selected work.</h2>
            <p>Games and client websites.</p>
          </div>
          <div>
            <Link href="/games">
              <span>
                LDGames<small>Four daily geography games</small>
              </span>
              <Arrow diagonal />
            </Link>
            <a href="https://arpadis.com" target="_blank" rel="noreferrer">
              <span>
                Arpadis<small>Client website</small>
              </span>
              <Arrow diagonal />
            </a>
            <a
              href="https://nirvaanahostels.com"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                Nirvaana Hostels<small>Client website</small>
              </span>
              <Arrow diagonal />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
