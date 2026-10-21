"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { GeoHunterMiniDemo } from "@/components/mini-demo/GeoHunterMiniDemo";
import { CollapsibleRow } from "./rows";

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
      {/* Visible credibility content — the CV, front and centre. */}
      <ExperienceTimeline />

      <div className="mt-14 md:mt-20">
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
          label="Links & profiles"
          isOpen={open === "experience"}
          onToggle={() => toggle("experience")}
        >
          <ExperienceLinks />
        </CollapsibleRow>

        {/* Trailing rule so the last row gets a bottom border too. */}
        <div className="border-t border-cloud/15" />
      </div>
    </div>
  );
}

/* ───────────────────────── Experience timeline ───────────────────────── */

type Role = {
  title: string;
  org: string;
  meta: string;
  points: string[];
};

const roles: Role[] = [
  {
    title: "Founder",
    org: "Lipshaw Digital",
    meta: "Oct 2025 – Present · Royal Leamington Spa, UK",
    points: [
      "Independent games and client websites.",
      "Developed 2 client websites end-to-end, from brief to deployment (React).",
      "Monetisation, App Store / Google Play publishing, hosting and SEO across all products.",
    ],
  },
  {
    title: "App Creator",
    org: "GeoHunter",
    meta: "Aug 2025 – Present",
    points: [
      "Designed and built GeoHunter for web, iOS and Android with React and Expo.",
      "Game design, development, store releases, subscriptions and ongoing updates.",
    ],
  },
  {
    title: "Digital Innovation Graduate",
    org: "JLR",
    meta: "Sep 2024 – Aug 2026 · National Automotive Innovation Centre, Warwick, UK",
    points: [
      "Built NVIDIA Omniverse extensions in Python for JLR's manufacturing Digital Twin — showcased at NVIDIA GTC 2025.",
      "Designed JSON data structures modelling material flow through the factory, converting Process Simulate XML to power digital-twin and clash-detection simulations.",
      "Trained a computer-vision model on Google Cloud Vertex AI for an automated inspection system that scans vehicles for manufacturing defects, focused on front-grille detection.",
    ],
  },
];

function ExperienceTimeline() {
  return (
    <section aria-label="Experience">
      <h2 className="font-body text-xs uppercase tracking-[0.28em] text-cloud/60">
        Experience
      </h2>
      <div className="mt-8 flex flex-col gap-10 md:gap-12">
        {[roles[1], roles[2], roles[0]].map((role) => (
          <div
            key={`${role.org}-${role.title}`}
            className="border-l border-cloud/20 pl-6 md:pl-8"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-display text-xl md:text-2xl text-cloud tracking-tight">
                {role.title}
              </h3>
              <span className="font-display text-lg md:text-xl text-cloud/70">
                {role.org}
              </span>
            </div>
            <p className="mt-1 font-body text-xs md:text-sm text-cloud/55">
              {role.meta}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {role.points.map((point, i) => (
                <li
                  key={i}
                  className="relative pl-5 font-body text-sm md:text-[15px] leading-relaxed text-cloud/85"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-cloud/40"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
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
    sub: "Experience and projects",
    href: "https://www.linkedin.com/in/zaclipshaw",
  },
  {
    label: "GitHub",
    sub: "Code and projects",
    href: "https://github.com/zaclippy",
  },
  {
    label: "University Dissertation",
    sub: "NLP for cancer diagnosis — BSc final project",
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
