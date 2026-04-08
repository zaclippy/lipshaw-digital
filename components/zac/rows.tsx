"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Shared shell for a single row on the /zac page.
 * Provides the label, right-side affordance, and the top rule.
 * Siblings stack to give a clean horizontal-ruled list.
 */
function RowShell({
  children,
  onClick,
  as = "button",
  href,
  external,
  ariaExpanded,
}: {
  children: ReactNode;
  onClick?: () => void;
  as?: "button" | "a" | "link";
  href?: string;
  external?: boolean;
  ariaExpanded?: boolean;
}) {
  const className =
    "group flex w-full items-center justify-between gap-6 border-t border-cloud/15 py-6 text-left transition-colors hover:bg-cloud/[0.04] focus:outline-none focus-visible:bg-cloud/[0.06]";

  if (as === "link" && href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  if (as === "a" && href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={ariaExpanded}
      className={className}
    >
      {children}
    </button>
  );
}

function RowLabel({ children }: { children: ReactNode }) {
  return (
    <span className="font-display text-xl md:text-2xl text-cloud tracking-tight">
      {children}
    </span>
  );
}

function ArrowInternal() {
  return (
    <span
      aria-hidden
      className="text-cloud/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cloud"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="13 6 19 12 13 18" />
      </svg>
    </span>
  );
}

function ArrowExternal() {
  return (
    <span
      aria-hidden
      className="text-cloud/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cloud"
    >
      <svg
        width="22"
        height="22"
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
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.span
      aria-hidden
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="text-cloud/60 group-hover:text-cloud"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </motion.span>
  );
}

/* ─────────────────────────────────────────────────────────── */

export function LinkRow({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external?: boolean;
}) {
  return (
    <RowShell
      as={external ? "a" : "link"}
      href={href}
      external={external}
    >
      <RowLabel>{label}</RowLabel>
      {external ? <ArrowExternal /> : <ArrowInternal />}
    </RowShell>
  );
}

export function CollapsibleRow({
  label,
  isOpen,
  onToggle,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div>
      <RowShell onClick={onToggle} ariaExpanded={isOpen}>
        <RowLabel>{label}</RowLabel>
        <Chevron open={isOpen} />
      </RowShell>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
