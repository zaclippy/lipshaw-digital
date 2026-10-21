"use client";

import { useEffect, useState } from "react";
import { CLASSIC_CATEGORIES } from "@/components/mini-demo/lib/data";
import type { Category } from "@/components/mini-demo/lib/types";
import InteractiveGlobe from "./InteractiveGlobe";

type Tag = { category: Category; popping: boolean };

export default function GlobeCategories() {
  const [tags, setTags] = useState<Tag[]>(
    [0, 4, 6].map((index) => ({
      category: CLASSIC_CATEGORIES[index],
      popping: false,
    })),
  );

  useEffect(() => {
    const pool = [...CLASSIC_CATEGORIES];
    for (let index = pool.length - 1; index > 0; index--) {
      const other = Math.floor(Math.random() * (index + 1));
      [pool[index], pool[other]] = [pool[other], pool[index]];
    }
    setTags(pool.slice(0, 3).map((category) => ({ category, popping: false })));
  }, []);

  function replaceTag(slot: number) {
    setTags((current) => {
      const available = CLASSIC_CATEGORIES.filter(
        (category) => !current.some((tag) => tag.category.id === category.id),
      );
      const category = available[Math.floor(Math.random() * available.length)];
      return current.map((tag, index) =>
        index === slot ? { category, popping: false } : tag,
      );
    });
  }

  return (
    <div className="ld-category-globe">
      <InteractiveGlobe label="GeoHunter globe" />
      {tags.map((tag, slot) => (
        <button
          key={slot}
          className={`ld-globe-category ld-globe-category-${slot} ${tag.popping ? "is-popping" : ""}`}
          type="button"
          aria-label={`Pop ${tag.category.name}`}
          onClick={() =>
            setTags((current) =>
              current.map((item, index) =>
                index === slot ? { ...item, popping: true } : item,
              ),
            )
          }
          onAnimationEnd={(event) => {
            if (event.animationName === "ld-category-pop") replaceTag(slot);
          }}
        >
          <span className="ld-category-label" key={tag.category.id}>
            <span aria-hidden="true">{tag.category.icon}</span>
            {tag.category.name}
          </span>
        </button>
      ))}
    </div>
  );
}
