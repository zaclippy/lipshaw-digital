"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { Topology } from "topojson-specification";
import { AnimatePresence, motion } from "framer-motion";
import {
  visitedCities,
  visitedNumericIds,
  getCountryFlag,
  type VisitedCity,
} from "@/lib/zac/travelData";

const MAP_WIDTH = 960;
const MAP_HEIGHT = 500;

type CountryFeature = Feature<
  Geometry,
  { name: string }
>;

/**
 * Lightweight world map in SVG. Uses a Natural Earth 1 projection fitted to
 * the fixed viewBox. Visited countries are filled with the LD "grass" token;
 * non-visited countries use a translucent earth tone. City markers are
 * clickable and show a floating info card pinned to the top-right.
 *
 * No map tiles, no tracking, no external runtime calls — topojson is
 * served from /public/data/countries-110m.json.
 */
export default function TravelMap() {
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [selected, setSelected] = useState<VisitedCity | null>(null);
  const [hoverCountry, setHoverCountry] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/data/countries-110m.json")
      .then((r) => r.json())
      .then((topo: Topology) => {
        if (cancelled) return;
        const collection = feature(
          topo,
          topo.objects.countries
        ) as unknown as FeatureCollection<Geometry, { name: string }>;
        // Filter out Antarctica so the map crops nicely.
        const filtered = collection.features.filter(
          (f) => f.properties.name !== "Antarctica"
        );
        setCountries(filtered);
      })
      .catch(() => {
        /* silent — "Loading map…" fallback remains */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const { pathGen, projection } = useMemo(() => {
    // Build a fresh projection each render of countries so fitExtent
    // reflects the actual features we have.
    const proj = geoNaturalEarth1();
    if (countries.length > 0) {
      const fc: FeatureCollection<Geometry, { name: string }> = {
        type: "FeatureCollection",
        features: countries,
      };
      proj.fitExtent(
        [
          [16, 16],
          [MAP_WIDTH - 16, MAP_HEIGHT - 16],
        ],
        fc
      );
    }
    const path = geoPath(proj);
    return { pathGen: path, projection: proj };
  }, [countries]);

  /** Project city coordinates to SVG space. */
  const cityPoints = useMemo(() => {
    if (countries.length === 0) return [];
    return visitedCities
      .map((city) => {
        const p = projection([city.longitude, city.latitude]);
        return p ? { city, x: p[0], y: p[1] } : null;
      })
      .filter((x): x is { city: VisitedCity; x: number; y: number } => x !== null);
  }, [countries, projection]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl border border-cloud/10 bg-earth/40"
    >
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="block h-auto w-full"
        role="img"
        aria-label="World map showing places Zac has visited"
      >
        {/* Subtle ocean wash */}
        <rect
          x="0"
          y="0"
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          fill="rgba(59, 107, 138, 0.18)"
        />

        {/* Country polygons */}
        <g>
          {countries.map((f, i) => {
            const id = (f as Feature & { id?: string }).id ?? "";
            const visited = visitedNumericIds.has(String(id));
            const d = pathGen(f) ?? "";
            const isHover = hoverCountry === String(id);
            return (
              <path
                key={i}
                d={d}
                fill={
                  visited
                    ? isHover
                      ? "#8fb07f"
                      : "#6B8F5E"
                    : isHover
                      ? "rgba(244,246,242,0.10)"
                      : "rgba(244,246,242,0.06)"
                }
                stroke="rgba(244,246,242,0.25)"
                strokeWidth={0.5}
                onMouseEnter={() => setHoverCountry(String(id))}
                onMouseLeave={() => setHoverCountry(null)}
                style={{ transition: "fill 0.2s ease" }}
              >
                <title>{f.properties.name}</title>
              </path>
            );
          })}
        </g>

        {/* City markers */}
        <g>
          {cityPoints.map(({ city, x, y }) => {
            const isSelected =
              selected?.name === city.name && selected?.country === city.country;
            return (
              <g
                key={`${city.name}-${city.country}`}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(city);
                }}
              >
                {/* Pulse ring for selected marker */}
                {isSelected && (
                  <circle
                    r={9}
                    fill="none"
                    stroke="#F4F6F2"
                    strokeWidth={1.2}
                    opacity={0.9}
                  />
                )}
                <circle
                  r={isSelected ? 5 : 3.5}
                  fill="#A07A4F"
                  stroke="#F4F6F2"
                  strokeWidth={1.2}
                  style={{ transition: "r 0.2s ease" }}
                />
                <title>
                  {city.name} — {city.country}
                </title>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Legend */}
      <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-1.5 font-body text-[11px] uppercase tracking-[0.18em] text-cloud/70">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-2.5 w-3.5 rounded-[2px]"
            style={{ background: "#6B8F5E" }}
          />
          Countries visited
        </div>
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 rounded-full border border-cloud"
            style={{ background: "#A07A4F" }}
          />
          Places
        </div>
      </div>

      {/* Count badge */}
      <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-cloud/15 bg-earth/60 px-3 py-1 font-body text-[11px] uppercase tracking-[0.18em] text-cloud/80 backdrop-blur-sm">
        {visitedNumericIds.size + 1} countries
      </div>

      {/* Info card */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={`${selected.name}-${selected.country}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm rounded-xl border border-cloud/15 bg-earth/85 p-4 backdrop-blur-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="font-display text-lg text-cloud truncate">
                  {selected.name}
                </div>
                <div className="mt-0.5 font-body text-xs text-cloud/70">
                  {getCountryFlag(selected.country)} {selected.country}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="-m-2 p-2 text-cloud/70 hover:text-cloud"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            {selected.description && (
              <p className="mt-3 font-body text-sm leading-relaxed text-cloud/85">
                {selected.description}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
