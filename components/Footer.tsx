import Link from "next/link";

type Variant = "light" | "dark";

const palettes: Record<
  Variant,
  { bg: string; text: string; muted: string; border: string }
> = {
  light: {
    bg: "bg-cloud",
    text: "text-earth",
    muted: "text-earth/60",
    border: "border-earth/10",
  },
  dark: {
    bg: "bg-newbold-bg",
    text: "text-newbold-text",
    muted: "text-newbold-muted",
    border: "border-newbold-text/10",
  },
};

export default function Footer({ variant = "light" }: { variant?: Variant }) {
  const p = palettes[variant];
  const year = new Date().getFullYear();

  return (
    <footer className={`${p.bg} ${p.text} border-t ${p.border}`}>
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-10 grid gap-6 md:grid-cols-3 md:items-center">
        <div className="font-display font-bold tracking-tight">
          <span className={`text-xs font-body font-normal leading-relaxed ${p.muted}`}>
            Lipshaw Digital Ltd · Registered in England and Wales · Company no.
            16758000 · Registered office: 1b Portland Street, Leamington Spa,
            CV32 5EZ, United Kingdom.
          </span>
        </div>

        <nav
          className={`flex gap-6 md:justify-center text-sm ${p.muted}`}
          aria-label="Footer"
        >
          <Link href="/apps" className="hover:underline underline-offset-4">
            Apps
          </Link>
          <Link href="/newbold" className="hover:underline underline-offset-4">
            Newbold
          </Link>
          <a
            href="mailto:zac@ldapps.site"
            className="hover:underline underline-offset-4"
          >
            Contact
          </a>
        </nav>

        <div className={`text-sm md:text-right ${p.muted}`}>
          <a
            href="mailto:zac@ldapps.site"
            className="hover:underline underline-offset-4"
          >
            zac@ldapps.site
          </a>
          <div className="text-xs mt-1">© {year}</div>
        </div>
      </div>
    </footer>
  );
}
