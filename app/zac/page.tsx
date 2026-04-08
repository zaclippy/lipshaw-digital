import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileSections from "@/components/zac/ProfileSections";

export const metadata: Metadata = {
  title: "Zac Lipshaw — Lipshaw Digital",
  description:
    "Full Stack Developer · BSc Computer Science. I build web/mobile apps, work with AI/LLMs, and create digital twin extensions.",
};

export default function ZacPage() {
  return (
    <>
      <Header
        variant="home"
        brand={{ label: "LD" }}
        links={[
          { href: "/apps", label: "Apps" },
          { href: "/newbold", label: "Websites" },
        ]}
      />

      <main
        className="grain relative min-h-dvh overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #4A3F35 0%, #3a322b 55%, #2c2620 100%)",
        }}
      >
        {/* Soft top glow echoing the homepage horizon */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-96"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 0%, rgba(160,122,79,0.18), transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[760px] px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <header>
            <h1
              className="font-display font-bold leading-[0.95] tracking-tight text-cloud"
              style={{ fontSize: "clamp(44px, 7vw, 72px)" }}
            >
              Zac Lipshaw
            </h1>
            <p className="mt-4 font-body text-xs md:text-sm uppercase tracking-[0.28em] text-cloud/70">
              Full Stack Developer · BSc Computer Science
            </p>
            <p className="mt-6 max-w-xl font-body text-base md:text-lg leading-relaxed text-cloud/85">
              I build web and mobile apps, work with AI/LLMs, and create
              digital twin extensions.
            </p>
          </header>

          <ProfileSections />
        </div>
      </main>

      <Footer variant="dark" />
    </>
  );
}
