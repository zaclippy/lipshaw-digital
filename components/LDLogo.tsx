import type { SVGProps } from "react";

/**
 * LDLogo — SVG recreation of the Lipshaw Digital "LD" monogram.
 *
 * The source is `logo.png` (410×332, purple gradient). This is a
 * single-fill silhouette using `currentColor`, so you can tint it to
 * any palette colour via CSS (`text-cloud`, `text-earth`, etc.).
 *
 * Geometry:
 *  - Italicised L (vertical arm + horizontal foot)
 *  - Italicised D (vertical stem + semicircular bowl)
 *  - The L's foot passes through the D's stem, producing the
 *    characteristic interlock. Because both letters share a fill,
 *    the overlap reads as one continuous mark.
 *
 * Both letters sit inside a single <g> with a `skewX(-10)` transform
 * to give the italic posture from the source file.
 */
export default function LDLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 260 180"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Lipshaw Digital"
      {...props}
    >
      <g fill="currentColor" transform="translate(30 0) skewX(-10)">
        {/* L — vertical arm */}
        <rect x="0" y="10" width="38" height="150" rx="3" />
        {/* L — horizontal foot (extends under the D stem) */}
        <rect x="0" y="123" width="112" height="37" rx="3" />

        {/* D — vertical stem */}
        <rect x="88" y="10" width="38" height="150" rx="3" />
        {/* D — bowl: semicircle bulging to the right of the stem */}
        <path d="M 126 10 a 75 75 0 0 1 0 150 z" />
      </g>
    </svg>
  );
}
