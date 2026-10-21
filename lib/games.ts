export const games = [
  {
    id: "geohunter",
    name: "GeoHunter",
    description: "Match countries to categories.",
    href: "https://geohuntergame.com",
    theme: "hunter",
    category: "Country rankings",
  },
  {
    id: "higher-or-lower",
    name: "GeoHigherOrLower",
    description: "Compare countries. Higher or lower?",
    href: "https://geohuntergame.com/higherorlower",
    theme: "higher",
    category: "Country comparisons",
  },
  {
    id: "eight-votes",
    name: "Eight Votes",
    description: "Daily geopolitics game.",
    href: "https://eightvotes.vercel.app",
    theme: "votes",
    category: "Geopolitics",
  },
  {
    id: "eight-stops",
    name: "Eight Stops",
    description: "Daily London Underground game.",
    href: "https://eight-stops.pages.dev",
    theme: "stops",
    category: "London Underground",
  },
] as const;
