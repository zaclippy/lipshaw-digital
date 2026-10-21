import Link from "next/link";

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
  return (
    <svg
      className={className}
      viewBox="0 0 240 240"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="120" cy="120" r="90" />
      <ellipse cx="120" cy="120" rx="44" ry="90" />
      <ellipse cx="120" cy="120" rx="90" ry="35" />
      <path d="M30 120h180M120 30v180" />
      <ellipse
        className="atlas-orbit"
        cx="120"
        cy="120"
        rx="117"
        ry="40"
        transform="rotate(-35 120 120)"
      />
      <circle className="atlas-dot" cx="207" cy="63" r="9" />
    </svg>
  );
}

export function SiteHeader({
  active,
}: {
  active?: "games" | "about" | "services";
}) {
  return (
    <header className="ld-header ld-wrap">
      <Link href="/" className="ld-brand" aria-label="Zac Lipshaw, home">
        <img
          className="ld-original-logo"
          src="/logo.png"
          alt="Lipshaw Digital"
          width="52"
          height="47"
        />
        <span>
          Zac Lipshaw
          <span className="ld-brand-sub">Games & development</span>
        </span>
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
          Work together <Arrow diagonal />
        </Link>
      </nav>
    </header>
  );
}

export function WorkTogether() {
  return (
    <section
      className="ld-work ld-wrap"
      id="work"
      aria-labelledby="work-heading"
    >
      <div className="ld-work-intro">
        <span className="ld-availability">
          <span /> Available for projects & contracts
        </span>
        <h2 id="work-heading">Work with me.</h2>
        <p>Games, websites and frontend / full-stack development.</p>
        <a className="ld-button ld-button-blue" href="mailto:zac@ldapps.site">
          zac@ldapps.site <Arrow diagonal />
        </a>
      </div>
      <div className="ld-work-options">
        <a href="mailto:zac@ldapps.site?subject=Let%E2%80%99s%20build%20something">
          <div>
            <h3>Games & products</h3>
            <p>Design, development or a cofounder conversation.</p>
          </div>
          <Arrow diagonal />
        </a>
        <Link href="/services">
          <div>
            <h3>Small business services</h3>
            <p>Websites, internal tools and automation.</p>
          </div>
          <Arrow diagonal />
        </Link>
        <a href="mailto:zac@ldapps.site?subject=Contract%20opportunity">
          <div>
            <h3>Contract work</h3>
            <p>Frontend / full stack. Open to 3-month contracts.</p>
          </div>
          <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="ld-footer ld-wrap">
      <div className="ld-footer-top">
        <Link href="/" className="ld-footer-name">
          Lipshaw Digital
        </Link>
        <nav aria-label="Footer">
          <a
            href="https://github.com/zaclippy"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/zaclipshaw"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:zac@ldapps.site">
            Email <Arrow diagonal />
          </a>
        </nav>
      </div>
      <div className="ld-footer-legal">
        <span>
          © {new Date().getFullYear()} Lipshaw Digital Ltd · Company no.
          16758000
        </span>
        <span>
          Registered in England and Wales. 1b Portland Street, Leamington Spa,
          CV32 5EZ.
        </span>
      </div>
    </footer>
  );
}
