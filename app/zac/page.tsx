import type { Metadata } from "next";
import {
  AtlasMark,
  SiteHeader,
  SiteFooter,
} from "@/components/portfolio/SiteShell";
import ProfileSections from "@/components/zac/ProfileSections";

export const metadata: Metadata = {
  title: "Zac Lipshaw",
  description:
    "Zac Lipshaw — Full Stack Developer, BSc Computer Science. Founder of Lipshaw Digital, creator of GeoHunter (150,000 downloads and 1M+ web players), and NVIDIA Omniverse / digital-twin developer at JLR (showcased at NVIDIA GTC 2025).",
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
    <div className="ld-site ld-about-site">
      <a className="ld-skip" href="#main">
        Skip to content
      </a>
      <SiteHeader active="about" />
      <main id="main" className="ld-profile ld-wrap">
        <section className="ld-page-intro">
          <div>
            <h1>Zac Lipshaw.</h1>
            <p>
              Creator of GeoHunter.
              <br />
              Previously digital innovation at JLR. BSc Computer Science.
            </p>
          </div>
          <AtlasMark />
        </section>
        <ProfileSections />
      </main>
      <SiteFooter />
    </div>
  );
}
