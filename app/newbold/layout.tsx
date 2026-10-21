import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work with Zac",
  alternates: { canonical: "https://ldapps.site/services" },
  robots: { index: false, follow: true },
};

export default function LegacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
