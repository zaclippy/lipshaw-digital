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
    "Zac Lipshaw designs and builds daily games, websites and useful tools. Explore LDGames or work together on a project, collaboration or frontend / full-stack contract.",
  openGraph: {
    title: "Lipshaw Digital",
    description:
      "Daily games, websites and useful tools, designed and built by Zac Lipshaw.",
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
      "Daily games, websites and useful tools, designed and built by Zac Lipshaw.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Lipshaw Digital",
      alternateName: "LD",
      url: "https://ldapps.site/",
    },
    {
      "@type": "Organization",
      name: "Lipshaw Digital",
      legalName: "Lipshaw Digital Ltd",
      alternateName: "LD",
      identifier: {
        "@type": "PropertyValue",
        propertyID: "Companies House",
        value: "16758000",
      },
      url: "https://ldapps.site/",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
