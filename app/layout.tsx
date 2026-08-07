import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ldapps.site"),
  title: {
    default: "Lipshaw Digital",
    template: "%s · Lipshaw Digital",
  },
  description:
    "Lipshaw Digital is a UK product studio building consumer apps and games — including GeoHunter — alongside select client websites through Newbold Web Studio.",
  openGraph: {
    title: "Lipshaw Digital",
    description:
      "A UK product studio building consumer apps and games, including GeoHunter. Websites via Newbold Web Studio.",
    url: "https://ldapps.site",
    siteName: "Lipshaw Digital",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Lipshaw Digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lipshaw Digital",
    description:
      "A UK product studio building consumer apps and games, including GeoHunter.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
