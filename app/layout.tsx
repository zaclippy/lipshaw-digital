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
  metadataBase: new URL("https://lipshaw.digital"),
  title: {
    default: "Lipshaw Digital",
    template: "%s · Lipshaw Digital",
  },
  description:
    "Lipshaw Digital — apps, websites, and digital craft. UK-based.",
  openGraph: {
    title: "Lipshaw Digital",
    description:
      "Lipshaw Digital — apps, websites, and digital craft. UK-based.",
    url: "https://lipshaw.digital",
    siteName: "Lipshaw Digital",
    locale: "en_GB",
    type: "website",
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
