import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apps",
  description:
    "LD Apps builds consumer mobile games and products. GeoHunter — our geography quiz game — has 100k+ downloads, 500k+ web players, 3,000 new players a day, and a 4.9★ App Store rating.",
  openGraph: {
    title: "LD Apps · Lipshaw Digital",
    description:
      "Consumer apps and games from Lipshaw Digital. GeoHunter: 100k+ downloads, 500k+ web players, 4.9★, #27 on the App Store.",
    url: "https://ldapps.site/apps",
    type: "website",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "LD Apps" }],
  },
};

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
