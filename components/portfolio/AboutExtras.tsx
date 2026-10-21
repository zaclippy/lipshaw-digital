"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const TravelMap = dynamic(() => import("@/components/zac/TravelMap"), {
  ssr: false,
  loading: () => <p className="ld-map-loading">Loading the map…</p>,
});

export default function AboutExtras() {
  const [open, setOpen] = useState(false);
  return (
    <details
      className="ld-about-extra"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary>Travel map</summary>
      {open && (
        <div className="ld-travel-panel">
          <TravelMap />
        </div>
      )}
    </details>
  );
}
