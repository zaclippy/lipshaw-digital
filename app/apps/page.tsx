"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PromptModal from "@/components/PromptModal";
import { GeoHunterMiniDemo } from "@/components/mini-demo";

export default function AppsPage() {
  const [promptOpen, setPromptOpen] = useState(false);

  return (
    <div className="bg-apps-bg text-apps-text">
      <Header
        variant="light"
        brand={{ label: "LD", sub: "Apps" }}
        links={[
          { href: "/", label: "Home" },
          { href: "/newbold", label: "Newbold" },
        ]}
      />

      <main className="pt-16">
        {/* ────────────────── Hero ────────────────── */}
        <section className="mx-auto max-w-[1200px] px-6 md:px-10 pt-20 md:pt-32 pb-16 md:pb-24">
          <ScrollReveal>
            <p className="text-apps-muted text-xs tracking-[0.25em] uppercase mb-4">
              LD Apps
            </p>
            <h1 className="font-display font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl">
              Apps built for real people.
            </h1>
            <p className="mt-6 max-w-xl text-apps-muted text-base md:text-lg">
              Consumer products, made by a small team in the UK.
            </p>
            <div className="mt-10">
              <button
                type="button"
                onClick={() => setPromptOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-apps-accent text-cloud font-display tracking-wide px-7 py-3.5 text-sm md:text-base hover:opacity-90 transition-opacity"
              >
                Build an app together
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </ScrollReveal>
        </section>

        {/* ──────────── GeoHunter showcase ──────────── */}
        <section className="border-t border-apps-text/10 bg-apps-surface">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-28">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <ScrollReveal>
                <div className="flex justify-center">
                  <GeoHunterMiniDemo />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <p className="text-apps-muted text-xs tracking-[0.25em] uppercase mb-3">
                  Featured
                </p>
                <h2 className="font-display font-bold text-3xl md:text-5xl leading-[1.05] tracking-tight">
                  GeoHunter
                </h2>
                <p className="mt-3 text-apps-muted text-lg">
                  Geography quiz game.
                </p>

                <dl className="mt-8 grid grid-cols-2 gap-6 max-w-sm">
                  <div>
                    <dt className="text-apps-muted text-xs uppercase tracking-wider">
                      Players
                    </dt>
                    <dd className="font-display text-2xl mt-1">60,000+</dd>
                  </div>
                  <div>
                    <dt className="text-apps-muted text-xs uppercase tracking-wider">
                      Platforms
                    </dt>
                    <dd className="font-display text-2xl mt-1">3</dd>
                    <div className="text-apps-muted text-xs mt-1">
                      iOS · Android · Web
                    </div>
                  </div>
                </dl>

                <div className="mt-8 flex flex-wrap gap-3">
                  {/* TODO: replace placeholder URLs with real store listings */}
                  <a
                    href="https://geohuntergame.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-full bg-apps-text text-cloud text-sm font-display tracking-wide hover:opacity-90 transition-opacity"
                  >
                    Play on web
                  </a>
                  <a
                    href="#"
                    className="px-5 py-2.5 rounded-full border border-apps-text/15 text-apps-text text-sm font-display tracking-wide hover:bg-apps-text/[0.04] transition-colors"
                  >
                    App Store
                  </a>
                  <a
                    href="#"
                    className="px-5 py-2.5 rounded-full border border-apps-text/15 text-apps-text text-sm font-display tracking-wide hover:bg-apps-text/[0.04] transition-colors"
                  >
                    Play Store
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ─────────── Future products ─────────── */}
        <section className="mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-28">
          <ScrollReveal>
            <p className="text-apps-muted text-xs tracking-[0.25em] uppercase mb-3">
              Roadmap
            </p>
            <h2 className="font-display text-2xl md:text-3xl">
              What we&rsquo;re building next
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ScrollReveal delay={0.05}>
              <div className="rounded-2xl border border-dashed border-apps-text/15 p-8 h-48 flex items-center justify-center bg-apps-surface">
                <span className="text-apps-muted text-sm">
                  More coming soon
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl border border-dashed border-apps-text/15 p-8 h-48 flex items-center justify-center bg-apps-surface">
                <span className="text-apps-muted text-sm">
                  More coming soon
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="rounded-2xl border border-dashed border-apps-text/15 p-8 h-48 flex items-center justify-center bg-apps-surface">
                <span className="text-apps-muted text-sm">
                  More coming soon
                </span>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer variant="light" />

      <PromptModal
        open={promptOpen}
        onClose={() => setPromptOpen(false)}
        variant="light"
        title="Build an app together"
        placeholder="Tell us about the app you'd like to build."
        submitLabel="Send"
        emailSubject="LD Apps — new app enquiry"
      />
    </div>
  );
}
