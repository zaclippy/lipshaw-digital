import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ──────────────────────────────────────────────────────────
   Hero icons — hand-drawn line SVG, ~64px square.
   No fills; stroke uses currentColor so we can tint via CSS.
   ────────────────────────────────────────────────────────── */

function PhoneIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="20" y="6" width="24" height="52" rx="5" />
      <line x1="28" y1="11" x2="36" y2="11" />
      <circle cx="32" cy="52" r="1.2" />
    </svg>
  );
}

function DesktopIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="6" y="12" width="52" height="34" rx="3" />
      <line x1="24" y1="54" x2="40" y2="54" />
      <line x1="32" y1="46" x2="32" y2="54" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="32" cy="22" r="9" />
      <path d="M14 56c2-10 9-16 18-16s16 6 18 16" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────
   IconLink — wraps an icon in an accessible link with a
   hover glow tinted to the destination's accent colour.
   ────────────────────────────────────────────────────────── */

type IconLinkProps = {
  href: string;
  external?: boolean;
  accent: string;
  /** Verbose label for screen readers / aria-label */
  label: string;
  /** Short visible caption that fades in on hover */
  caption: string;
  children: React.ReactNode;
};

function IconLink({
  href,
  external,
  accent,
  label,
  caption,
  children,
}: IconLinkProps) {
  const className =
    "group relative inline-flex h-20 w-20 md:h-24 md:w-24 items-center justify-center text-cloud transition-transform duration-300 ease-out hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-cloud/70 rounded-full";

  const inner = (
    <>
      {/* Hover glow — radial gradient in the accent colour */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(closest-side, ${accent}55, transparent 75%)`,
        }}
      />
      <span className="relative">{children}</span>

      {/* Hover caption — small letterspaced label below the icon */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 transition-all duration-300 ease-out font-body text-[10px] md:text-xs uppercase tracking-[0.25em] text-cloud/85 whitespace-nowrap"
      >
        {caption}
      </span>

      <span className="sr-only">{label}</span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        className={className}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={label} className={className}>
      {inner}
    </Link>
  );
}

/* ──────────────────────────────────────────────────────────
   Homepage
   ────────────────────────────────────────────────────────── */

export default function Home() {
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
        className="grain relative flex min-h-dvh items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #7BA7C2 0%, #6B8F5E 55%, #4A3F35 100%)",
        }}
      >
        {/* Soft horizon glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 h-72 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(244,246,242,0.18), transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <h1
            className="font-display font-bold leading-none tracking-tight text-cloud"
            style={{ fontSize: "clamp(72px, 11vw, 112px)" }}
          >
            LD
          </h1>
          <p className="mt-5 font-body text-xs md:text-sm uppercase tracking-[0.3em] text-cloud/75">
            Lipshaw Digital
          </p>

          <nav
            aria-label="Primary"
            className="mt-14 md:mt-20 flex items-center justify-center gap-6 md:gap-12"
          >
            <IconLink
              href="/apps"
              accent="#3B6B8A"
              label="LD Apps"
              caption="Apps"
            >
              <PhoneIcon />
            </IconLink>
            <IconLink
              href="/newbold"
              accent="#5A7C5A"
              label="Newbold Web Studio"
              caption="Websites"
            >
              <DesktopIcon />
            </IconLink>
            <IconLink
              href="/zac"
              accent="#A07A4F"
              label="Zac — about"
              caption="Zac"
            >
              <PersonIcon />
            </IconLink>
          </nav>
        </div>
      </main>

      <Footer variant="dark" />
    </>
  );
}
