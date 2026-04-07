"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Variant = "home" | "light" | "dark";

type Props = {
  variant: Variant;
  brand?: { label: string; sub?: string };
  links?: { href: string; label: string; external?: boolean }[];
};

const palettes: Record<
  Variant,
  {
    text: string;
    muted: string;
    bgScrolled: string;
    bgInitial: string;
    border: string;
    logoFilter: string;
  }
> = {
  home: {
    text: "text-cloud",
    muted: "text-cloud/70",
    bgInitial: "bg-transparent",
    bgScrolled: "bg-earth/80 backdrop-blur-md",
    border: "border-cloud/10",
    logoFilter: "brightness(0) invert(1)",
  },
  light: {
    text: "text-apps-text",
    muted: "text-apps-muted",
    bgInitial: "bg-apps-bg/80 backdrop-blur",
    bgScrolled: "bg-apps-bg/95 backdrop-blur-md",
    border: "border-apps-text/10",
    logoFilter: "brightness(0)",
  },
  dark: {
    text: "text-newbold-text",
    muted: "text-newbold-muted",
    bgInitial: "bg-newbold-bg/80 backdrop-blur",
    bgScrolled: "bg-newbold-bg/95 backdrop-blur-md",
    border: "border-newbold-text/10",
    logoFilter: "brightness(0) invert(1)",
  },
};

export default function Header({
  variant,
  brand = { label: "Lipshaw Digital" },
  links = [],
}: Props) {
  const [scrolled, setScrolled] = useState(false);
  const p = palettes[variant];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-40 transition-colors duration-300",
        scrolled ? p.bgScrolled : p.bgInitial,
        scrolled ? `border-b ${p.border}` : "border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 h-16 flex items-center justify-between">
        <Link
          href="/"
          aria-label="Lipshaw Digital"
          className={`inline-flex items-center gap-2 font-display font-bold tracking-tight text-lg md:text-xl ${p.text}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Lipshaw Digital"
            className="h-8 md:h-9 w-auto select-none"
            style={{ filter: p.logoFilter }}
          />
          {brand.label && brand.label !== "LD" && (
            <span className="ml-1">{brand.label}</span>
          )}
          {brand.sub && (
            <span className={`font-body font-normal text-xs ${p.muted}`}>
              {brand.sub}
            </span>
          )}
        </Link>

        <nav className="flex items-center gap-6 md:gap-8">
          {links.map((l) =>
            l.external ? (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={`text-sm ${p.muted} hover:${p.text} transition-colors`}
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm ${p.muted} hover:opacity-100 hover:underline underline-offset-4 transition-colors`}
              >
                {l.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
