"use client";

type Props = {
  url: string;
  label: string;
  year: string;
};

/**
 * SitePreview
 * ───────────
 * A flush cell for the unified portfolio grid on /newbold. We hit Microlink's
 * REST API with `embed=screenshot.url` so the API endpoint itself redirects
 * straight to the binary PNG — meaning we can use it as a plain <img src>
 * with no JS client, no card chrome, no reserved layout slots.
 *
 * Microlink edge-caches each URL, so for our 2 portfolio sites this is
 * effectively two static CDN images.
 */

function screenshotUrl(target: string) {
  const params = new URLSearchParams({
    url: target,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    "viewport.width": "1280",
    "viewport.height": "800",
  });
  return `https://api.microlink.io/?${params.toString()}`;
}

export default function SitePreview({ url, label, year }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col bg-newbold-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-newbold-accent"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-newbold-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={screenshotUrl(url)}
          alt={`${label} website screenshot`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-baseline justify-between px-7 py-5">
        <div className="font-display text-lg text-newbold-text">{label}</div>
        <div className="text-newbold-muted text-xs">{year}</div>
      </div>
    </a>
  );
}
