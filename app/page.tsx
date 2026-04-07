import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Header
        variant="home"
        brand={{ label: "LD" }}
        links={[
          { href: "/apps", label: "Apps" },
          { href: "/newbold", label: "Newbold" },
        ]}
      />

      <main>
        {/* ───────────────────────── Hero ───────────────────────── */}
        <section
          className="relative grain min-h-dvh flex items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #7BA7C2 0%, #6B8F5E 55%, #4A3F35 100%)",
          }}
        >
          {/* Soft horizon glow */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-1/2 h-64 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(244,246,242,0.18), transparent 70%)",
            }}
          />

          <div className="relative z-10 text-center px-6">
            <h1
              className="font-display font-bold text-cloud leading-none tracking-tight"
              style={{ fontSize: "clamp(80px, 14vw, 160px)" }}
            >
              LD
            </h1>
            <p className="mt-6 font-body text-cloud/80 text-sm md:text-base tracking-[0.3em] uppercase">
              Lipshaw Digital
            </p>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cloud/60">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-[bounce_2.4s_ease-in-out_infinite]"
              aria-hidden
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </section>

        {/* ──────────────────── Three cards ──────────────────── */}
        <section className="bg-earth py-24 md:py-32">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <ScrollReveal>
              <p className="font-body text-cloud/50 text-xs tracking-[0.25em] uppercase mb-3">
                Three arms
              </p>
              <h2 className="font-display text-cloud text-3xl md:text-4xl max-w-xl">
                One company. Three things we do well.
              </h2>
            </ScrollReveal>

            <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
              <ScrollReveal delay={0.05}>
                <Card href="/apps" accent="#3B6B8A">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-3xl text-cloud">
                      LD
                    </span>
                    <span className="font-display text-xl text-cloud/70">
                      Apps
                    </span>
                  </div>
                  <p className="mt-10 text-cloud/70 text-sm">
                    Consumer apps &amp; products
                  </p>
                  <p className="mt-1 text-cloud/40 text-xs">
                    GeoHunter and more →
                  </p>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.12}>
                <Card href="/newbold" accent="#5A7C5A">
                  <div>
                    <div className="font-display font-bold text-3xl text-cloud">
                      Newbold
                    </div>
                    <div className="text-cloud/60 text-xs mt-1 tracking-wide">
                      Website Development
                    </div>
                  </div>
                  <p className="mt-9 text-cloud/70 text-sm">
                    Websites for small businesses
                  </p>
                  <p className="mt-1 text-cloud/40 text-xs">See our work →</p>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.19}>
                <Card
                  href="https://zaclippy.github.io"
                  external
                  accent="#A07A4F"
                >
                  <div className="font-display font-bold text-3xl text-cloud">
                    Zac
                  </div>
                  <p className="mt-10 text-cloud/70 text-sm">
                    Personal portfolio
                  </p>
                  <p className="mt-1 text-cloud/40 text-xs">
                    External site ↗
                  </p>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="dark" />
    </>
  );
}
