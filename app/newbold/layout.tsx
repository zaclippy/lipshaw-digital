import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newbold Web Studio",
  description:
    "Newbold Web Studio builds fast, custom, mobile-first websites for small businesses. Professional design, SEO-ready, ongoing support. Projects start from £1,200.",
  openGraph: {
    title: "Newbold Web Studio · Lipshaw Digital",
    description:
      "Custom, fast, SEO-ready websites for small businesses. Projects start from £1,200.",
    url: "https://ldapps.site/newbold",
    type: "website",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Newbold Web Studio" }],
  },
};

export default function NewboldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
