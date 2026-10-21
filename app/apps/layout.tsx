import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LDGames",
  alternates: { canonical: "https://ldapps.site/games" },
  robots: { index: false, follow: true },
};

export default function LegacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
