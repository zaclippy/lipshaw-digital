import Link from "next/link";
import InteractiveGlobe from "./InteractiveGlobe";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"} />
    </svg>
  );
}

export function AtlasMark({ className = "" }: { className?: string }) {
  return <InteractiveGlobe variant="wireframe" className={className} />;
}

export function SiteHeader({
  active,
}: {
  active?: "games" | "about" | "services";
}) {
  return (
    <header className="ld-header ld-wrap">
      <Link href="/" className="ld-brand" aria-label="Lipshaw Digital, home">
        <img
          className="ld-original-logo"
          src="/logo.png"
          alt="Lipshaw Digital"
          width="52"
          height="47"
        />
        <span>Lipshaw Digital</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link
          href="/games"
          aria-current={active === "games" ? "page" : undefined}
        >
          Games
        </Link>
        <Link
          href="/zac"
          aria-current={active === "about" ? "page" : undefined}
        >
          About
        </Link>
        <Link
          className="ld-nav-contact"
          href="/services"
          aria-current={active === "services" ? "page" : undefined}
        >
          Services <Arrow diagonal />
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="ld-footer ld-wrap">
      <nav aria-label="Footer">
        <a href="mailto:zac@ldapps.site">zac@ldapps.site</a>
        <a href="https://github.com/zaclippy" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/zaclipshaw"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </nav>
    </footer>
  );
}
