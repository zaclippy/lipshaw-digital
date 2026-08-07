import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ──────────────────────────────────────────────────────────
   Hero icons — hand-drawn line SVG, sized via `size` prop.
   No fills; stroke uses currentColor so we can tint via CSS.
   ────────────────────────────────────────────────────────── */

function PhoneIcon({ size = 64 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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

function DesktopIcon({ size = 64 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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

function PersonIcon({ size = 64 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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
  /** Short visible caption */
  caption: string;
  /** Primary = large, persistently glowing, caption always shown */
  primary?: boolean;
  children: React.ReactNode;
};

function IconLink({
  href,
  external,
  accent,
  label,
  caption,
  primary = false,
  children,
}: IconLinkProps) {
  const sizeClass = primary
    ? "h-28 w-28 md:h-36 md:w-36 text-cloud"
    : "h-16 w-16 md:h-20 md:w-20 text-cloud/70 hover:text-cloud";

  const className = `group relative inline-flex ${sizeClass} items-center justify-center transition-all duration-300 ease-out hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-cloud/70 rounded-full`;

  const inner = (
    <>
      {/* Glow — persistent for primary, hover-only for secondary */}
      <span
        aria-hidden
        className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
          primary
            ? "opacity-60 group-hover:opacity-100"
            : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
        }`}
        style={{
          background: `radial-gradient(closest-side, ${accent}55, transparent 75%)`,
        }}
      />
      <span className="relative">{children}</span>

      {/* Caption — always shown for primary, fades in on hover for secondary */}
      <span
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-full -translate-x-1/2 font-body uppercase tracking-[0.25em] text-cloud/85 whitespace-nowrap transition-all duration-300 ease-out ${
          primary
            ? "mt-4 opacity-100 text-xs md:text-sm"
            : "mt-3 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 text-[10px] md:text-xs"
        }`}
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Lipshaw Digital"
            className="h-24 md:h-32 w-auto select-none"
            style={{
              filter: "brightness(0) invert(1) drop-shadow(0 2px 12px rgba(0,0,0,0.15))",
            }}
          />
          <p className="mt-6 font-body text-xs md:text-sm uppercase tracking-[0.3em] text-cloud/75">
            Lipshaw Digital
          </p>
          <p className="mt-3 font-body text-sm md:text-base text-cloud/80">
            A product studio. We build apps &amp; games.
          </p>

          {/* Apps central, secondary paths flanking it */}
          <nav
            aria-label="Primary"
            className="mt-14 md:mt-16 flex items-center justify-center gap-10 md:gap-16"
          >
            <IconLink
              href="/newbold"
              accent="#5A7C5A"
              label="Newbold Web Studio"
              caption="Websites"
            >
              <DesktopIcon size={44} />
            </IconLink>

            <IconLink
              href="/apps"
              accent="#3B6B8A"
              label="LD Apps"
              caption="Apps"
              primary
            >
              <PhoneIcon size={84} />
            </IconLink>

            <IconLink
              href="/zac"
              accent="#A07A4F"
              label="Zac — about"
              caption="Zac"
            >
              <PersonIcon size={44} />
            </IconLink>
          </nav>
        </div>
      </main>

      <Footer variant="dark" />
    </>
  );
}
