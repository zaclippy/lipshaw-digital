"use client";

import Microlink from "@microlink/react";

type Props = {
  url: string;
  label: string;
  year: string;
};

/**
 * SitePreview
 * ───────────
 * Renders a live screenshot/preview card for a client website using
 * Microlink (https://microlink.io). Free CDN-cached previews — no API key
 * needed for low-volume use. The card is wrapped in a link to the live site.
 */
export default function SitePreview({ url, label, year }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-newbold-accent rounded-2xl"
    >
      <div className="rounded-2xl overflow-hidden border border-newbold-text/10 bg-newbold-surface transition-transform duration-300 group-hover:-translate-y-1">
        <Microlink
          url={url}
          size="large"
          media="screenshot"
          lazy={{ threshold: 0.25 }}
          style={{
            border: "none",
            borderRadius: 0,
            background: "#243524",
            fontFamily: "var(--font-body)",
          }}
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <div className="font-display text-lg text-newbold-text">{label}</div>
        <div className="text-newbold-muted text-xs">{year}</div>
      </div>
    </a>
  );
}
