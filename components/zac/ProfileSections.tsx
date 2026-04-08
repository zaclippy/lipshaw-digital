"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { GeoHunterMiniDemo } from "@/components/mini-demo/GeoHunterMiniDemo";
import { CollapsibleRow, LinkRow } from "./rows";

/**
 * Lazy-load the world map only when the Travel Map row is opened.
 * The topojson + d3-geo bundle is ~140KB and never needed unless
 * the user interacts with that row.
 */
const TravelMap = dynamic(() => import("./TravelMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[320px] items-center justify-center text-cloud/60 font-body text-sm">
      Loading map…
    </div>
  ),
});

type SectionId = "geohunter" | "travel" | "experience" | null;

export default function ProfileSections() {
  const [open, setOpen] = useState<SectionId>(null);

  const toggle = (id: Exclude<SectionId, null>) =>
    setOpen((cur) => (cur === id ? null : id));

  return (
    <div className="mt-12 md:mt-16">
      <CollapsibleRow
        label="GeoHunter Demo"
        isOpen={open === "geohunter"}
        onToggle={() => toggle("geohunter")}
      >
        <div className="flex justify-center px-2">
          <GeoHunterMiniDemo />
        </div>
      </CollapsibleRow>

      <CollapsibleRow
        label="Travel Map"
        isOpen={open === "travel"}
        onToggle={() => toggle("travel")}
      >
        <TravelMap />
      </CollapsibleRow>

      <CollapsibleRow
        label="Experience"
        isOpen={open === "experience"}
        onToggle={() => toggle("experience")}
      >
        <ExperienceLinks />
      </CollapsibleRow>

      {/* Trailing rule so the last row gets a bottom border too. */}
      <div className="border-t border-cloud/15" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */

type ExperienceLink = {
  label: string;
  sub: string;
  href: string;
};

const experienceLinks: ExperienceLink[] = [
  {
    label: "LinkedIn",
    sub: "Roles, projects, and the longer story",
    href: "https://www.linkedin.com/in/zaclipshaw",
  },
  {
    label: "GitHub",
    sub: "Code, repos, and side projects",
    href: "https://github.com/zaclippy",
  },
  {
    label: "University Dissertation",
    sub: "NLP for cancer diagnosis — BSc final project portfolio",
    href: "https://zaclippy.github.io/nlp-cancer-diagnosis-portfolio/index.html",
  },
];

function ExperienceLinks() {
  return (
    <ul className="flex flex-col gap-1">
      {experienceLinks.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between gap-6 rounded-lg px-4 py-4 transition-colors hover:bg-cloud/[0.06]"
          >
            <div className="min-w-0">
              <div className="font-display text-lg text-cloud">
                {item.label}
              </div>
              <div className="mt-0.5 font-body text-sm text-cloud/65">
                {item.sub}
              </div>
            </div>
            <span
              aria-hidden
              className="text-cloud/55 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cloud"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
