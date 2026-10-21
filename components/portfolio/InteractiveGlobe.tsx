"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { geoGraticule, geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import type { Topology } from "topojson-specification";
import type { KeyboardEvent, PointerEvent } from "react";

type Rotation = [number, number];
type World = FeatureCollection<Geometry, { name: string }>;
const initialRotation: Rotation = [-12, -12];
const graticule = geoGraticule10();
const wireframe = geoGraticule().step([45, 30])();
let worldRequest: Promise<World> | undefined;

function loadWorld() {
  worldRequest ??= fetch("/data/countries-110m.json")
    .then((response) => {
      if (!response.ok) throw new Error("Map unavailable");
      return response.json() as Promise<Topology>;
    })
    .then(
      (topology) =>
        feature(topology, topology.objects.countries) as unknown as World,
    )
    .catch((error) => {
      worldRequest = undefined;
      throw error;
    });
  return worldRequest;
}

export default function InteractiveGlobe({
  variant = "land",
  className = "",
  label = "Interactive globe",
}: {
  variant?: "land" | "wireframe";
  className?: string;
  label?: string;
}) {
  const [world, setWorld] = useState<World | null>(null);
  const [rotation, setRotation] = useState<Rotation>(initialRotation);
  const [dragging, setDragging] = useState(false);
  const rotationRef = useRef<Rotation>(initialRotation);
  const frameRef = useRef<number | null>(null);
  const dragRef = useRef<{ x: number; y: number; rotation: Rotation } | null>(
    null,
  );

  useEffect(() => {
    if (variant !== "land") return;
    let active = true;
    loadWorld()
      .then((data) => {
        if (active) setWorld(data);
      })
      .catch(() => {
        // The globe remains rotatable as a wireframe if the map cannot load.
      });
    return () => {
      active = false;
    };
  }, [variant]);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const paths = useMemo(() => {
    const projection = geoOrthographic()
      .translate([120, 120])
      .scale(100)
      .rotate([rotation[0], rotation[1], 0])
      .precision(0.7);
    const path = geoPath(projection);
    return {
      sphere: path({ type: "Sphere" }) ?? "",
      grid: path(variant === "wireframe" ? wireframe : graticule) ?? "",
      land: world ? (path(world) ?? "") : "",
    };
  }, [rotation, world, variant]);

  function rotate(next: Rotation) {
    rotationRef.current = [
      ((((next[0] + 180) % 360) + 360) % 360) - 180,
      Math.max(-80, Math.min(80, next[1])),
    ];
    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(() => {
        setRotation(rotationRef.current);
        frameRef.current = null;
      });
    }
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      rotation: [...rotationRef.current],
    };
    setDragging(true);
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag) return;
    const speed = 180 / event.currentTarget.getBoundingClientRect().width;
    rotate([
      drag.rotation[0] + (event.clientX - drag.x) * speed,
      drag.rotation[1] - (event.clientY - drag.y) * speed,
    ]);
  }

  function stopDrag(event: PointerEvent<HTMLDivElement>) {
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    const [longitude, latitude] = rotationRef.current;
    const changes: Record<string, Rotation> = {
      ArrowLeft: [longitude - 12, latitude],
      ArrowRight: [longitude + 12, latitude],
      ArrowUp: [longitude, latitude + 12],
      ArrowDown: [longitude, latitude - 12],
      Home: initialRotation,
    };
    if (changes[event.key]) {
      event.preventDefault();
      rotate(changes[event.key]);
    }
  }

  return (
    <div
      className={`ld-interactive-globe ld-globe-${variant} ${dragging ? "is-dragging" : ""} ${className}`}
      role="group"
      aria-roledescription="interactive globe"
      aria-label={label}
      aria-description="Drag to rotate. You can also use the arrow keys. Press Home to reset."
      tabIndex={0}
      data-longitude={rotation[0]}
      data-latitude={rotation[1]}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
      onLostPointerCapture={() => {
        dragRef.current = null;
        setDragging(false);
      }}
      onKeyDown={handleKey}
    >
      <svg viewBox="0 0 240 240" aria-hidden="true" fill="none">
        <path className="ld-globe-sphere" d={paths.sphere} />
        <path className="ld-globe-grid" d={paths.grid} />
        {variant === "land" && (
          <path className="ld-globe-land" d={paths.land} />
        )}
        <ellipse
          className="ld-globe-orbit"
          cx="120"
          cy="120"
          rx="118"
          ry="34"
          transform="rotate(-35 120 120)"
        />
      </svg>
    </div>
  );
}
