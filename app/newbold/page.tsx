"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PromptModal from "@/components/PromptModal";
import SitePreview from "@/components/SitePreview";

const services = [
  {
    title: "Custom design",
    body: "Built for you. Not pulled from a template.",
  },
  {
    title: "Mobile-first",
    body: "Looks right on every device, every time.",
  },
  {
    title: "Fast & SEO-ready",
    body: "Engineered to load quickly and rank.",
  },
  {
    title: "Ongoing support",
    body: "We don't disappear after launch.",
  },
];

const portfolio = [
  { url: "https://arpadis.com", label: "Arpadis", year: "2025" },
  { url: "https://nirvaanahostels.com", label: "Nirvaana Hostels", year: "2025" },
];

export default function NewboldPage() {
  const [promptOpen, setPromptOpen] = useState(false);

  return (
    <div className="bg-newbold-bg text-newbold-text min-h-dvh">
      <Header
        variant="dark"
        brand={{ label: "Newbold Web Studio" }}
        links={[
          { href: "/", label: "Home" },
          { href: "/apps", label: "Apps" },
        ]}
      />

      <main className="pt-16">
        {/* ────────────────── Hero ────────────────── */}
        <section className="mx-auto max-w-[1200px] px-6 md:px-10 pt-20 md:pt-32 pb-16 md:pb-24">
          <ScrollReveal>
            <p className="text-newbold-muted text-xs tracking-[0.25em] uppercase mb-4">
              Newbold Web Studio
            </p>
            <h1 className="font-display font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl">
              A website that works for your business.
            </h1>
            <p className="mt-6 max-w-xl text-newbold-muted text-base md:text-lg">
              Professional, fast, and built to last. We make websites for small
              businesses that need to be taken seriously.
            </p>
            <div className="mt-10 flex items-center gap-5 flex-wrap">
              <button
                type="button"
                onClick={() => setPromptOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-newbold-accent text-newbold-bg font-display tracking-wide px-7 py-3.5 text-sm md:text-base hover:opacity-90 transition-opacity"
              >
                Start your project
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
              <span className="text-newbold-muted text-sm">
                Get a quote in 24 hours
              </span>
            </div>
          </ScrollReveal>
        </section>

        {/* ──────────── What you get ──────────── */}
        <section className="border-t border-newbold-text/10 bg-newbold-surface">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-28">
            <ScrollReveal>
              <p className="text-newbold-muted text-xs tracking-[0.25em] uppercase mb-3">
                What you get
              </p>
              <h2 className="font-display text-2xl md:text-3xl">
                Everything a small business needs.
              </h2>
            </ScrollReveal>

            <div className="mt-12 grid gap-px bg-newbold-text/10 md:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden">
              {services.map((s, i) => (
                <ScrollReveal key={s.title} delay={0.05 * i}>
                  <div className="bg-newbold-surface p-7 h-full">
                    <div className="font-display text-lg mb-2">{s.title}</div>
                    <p className="text-newbold-muted text-sm leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────── Portfolio ──────────── */}
        <section className="mx-auto max-w-[1200px] px-6 md:px-10 py-20 md:py-28">
          <ScrollReveal>
            <p className="text-newbold-muted text-xs tracking-[0.25em] uppercase mb-3">
              Selected work
            </p>
            <h2 className="font-display text-2xl md:text-3xl">
              Recent projects
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-px bg-newbold-text/10 md:grid-cols-2 rounded-2xl overflow-hidden">
            {portfolio.map((p, i) => (
              <ScrollReveal key={p.url} delay={0.05 * i}>
                <SitePreview url={p.url} label={p.label} year={p.year} />
              </ScrollReveal>
            ))}
          </div>

          {/* Pricing signal */}
          <ScrollReveal delay={0.1}>
            <div className="mt-16 flex items-center justify-between flex-wrap gap-4 border-t border-newbold-text/10 pt-10">
              <p className="font-display text-xl md:text-2xl">
                Projects start from £1,200.
              </p>
              <button
                type="button"
                onClick={() => setPromptOpen(true)}
                className="text-sm font-display tracking-wide text-newbold-accent hover:underline underline-offset-4"
              >
                Get a quote →
              </button>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <Footer variant="dark" />

      <PromptModal
        open={promptOpen}
        onClose={() => setPromptOpen(false)}
        variant="dark"
        title="Tell us about your project"
        placeholder="Tell us about your business and what you need."
        submitLabel="Send"
        emailSubject="Newbold — new website enquiry"
      />
    </div>
  );
}
