"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  href: string;
  external?: boolean;
  accent: string; // CSS color
  children: ReactNode;
};

export default function Card({ href, external, accent, children }: Props) {
  const inner = (
    <motion.div
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full rounded-2xl border border-cloud/15 bg-cloud/[0.04] backdrop-blur-sm p-8 md:p-10 overflow-hidden"
      style={{
        boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset",
      }}
    >
      {/* Accent bar */}
      <span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-[3px] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out"
        style={{ background: accent }}
      />
      {/* Hover wash */}
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(120% 80% at 0% 0%, ${accent}22, transparent 60%)`,
        }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cloud/60 rounded-2xl"
      >
        {inner}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cloud/60 rounded-2xl"
    >
      {inner}
    </Link>
  );
}
