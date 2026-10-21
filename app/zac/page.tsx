import type { Metadata } from "next";
import Link from "next/link";
import {
  Arrow,
  AtlasMark,
  SiteHeader,
  SiteFooter,
  WorkTogether,
} from "@/components/portfolio/SiteShell";
import AboutExtras from "@/components/portfolio/AboutExtras";

export const metadata: Metadata = {
  title: "Zac Lipshaw",
  description:
    "Zac Lipshaw — Full Stack Developer, BSc Computer Science. Founder of Lipshaw Digital, creator of GeoHunter (100k+ downloads), and NVIDIA Omniverse / digital-twin developer at JLR (showcased at NVIDIA GTC 2025).",
  alternates: {
    canonical: "https://ldapps.site/zac",
  },
  openGraph: {
    title: "Zac Lipshaw · Lipshaw Digital",
    description:
      "Founder of Lipshaw Digital, creator of GeoHunter, and NVIDIA Omniverse digital-twin developer at JLR (NVIDIA GTC 2025).",
    siteName: "Lipshaw Digital",
    url: "https://ldapps.site/zac",
    type: "profile",
    images: [
      { url: "/logo.png", width: 1200, height: 630, alt: "Zac Lipshaw" },
    ],
  },
};

export default function ZacPage() {
  return (
    <div className="ld-site">
      <a className="ld-skip" href="#main">
        Skip to content
      </a>
      <SiteHeader active="about" />
      <main id="main">
        <section className="ld-page-intro ld-wrap">
          <div className="ld-about-copy">
            <span className="ld-availability">
              <span /> Full-stack developer
            </span>
            <h1>Zac Lipshaw.</h1>
            <p>
              I built GeoHunter, GeoHigherOrLower, Eight Votes and Eight Stops.
              Previously, I worked on digital twins and computer vision at JLR.
            </p>
            <div className="ld-about-links">
              <a
                className="ld-text-link"
                href="https://www.linkedin.com/in/zaclipshaw"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <Arrow diagonal />
              </a>
              <a
                className="ld-text-link"
                href="https://github.com/zaclippy"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <Arrow diagonal />
              </a>
            </div>
          </div>
          <AtlasMark />
        </section>
        <section
          className="ld-about-detail ld-wrap"
          aria-labelledby="experience-heading"
        >
          <h2 id="experience-heading">Experience.</h2>
          <article className="ld-experience">
            <div>
              <h3>Lipshaw Digital</h3>
              <small>Founder & developer · 2025–present</small>
            </div>
            <div>
              <p>
                Designed, built and launched GeoHunter across web, iOS and
                Android. Now building LDGames: four daily games spanning
                geography, geopolitics and the London Underground.
              </p>
              <Link className="ld-text-link" href="/games">
                Explore the games <Arrow diagonal />
              </Link>
            </div>
          </article>
          <article className="ld-experience">
            <div>
              <h3>JLR</h3>
              <small>Digital Innovation Graduate · 2024–2026</small>
            </div>
            <p>
              Built Python extensions for manufacturing digital twins in NVIDIA
              Omniverse, with work showcased at NVIDIA GTC 2025. Also worked on
              computer vision for automated vehicle inspection.
            </p>
          </article>
          <article className="ld-experience">
            <div>
              <h3>Computer Science</h3>
              <small>BSc · Natural language processing</small>
            </div>
            <div>
              <p>
                Explored natural language processing for cancer diagnosis in my
                final-year project.
              </p>
              <a
                className="ld-text-link"
                href="https://zaclippy.github.io/nlp-cancer-diagnosis-portfolio/index.html"
                target="_blank"
                rel="noreferrer"
              >
                View the project <Arrow diagonal />
              </a>
            </div>
          </article>
          <AboutExtras />
        </section>
        <WorkTogether />
      </main>
      <SiteFooter />
    </div>
  );
}
