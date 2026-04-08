/**
 * Travel data — ported from the old zaclippy.github.io/travel/travel.js.
 * Source of truth: https://github.com/zaclippy/zaclippy.github.io/blob/master/travel/travel.js
 *
 * The city list and country list preserve the originals 1:1. We also attach
 * an ISO-3166-1 numeric code (as a string, preserving the leading zero for
 * Belgium "056") so react-simple-maps can match against the world-atlas
 * countries-110m.json topojson, whose features use numeric IDs.
 *
 * Note: Liechtenstein ("LI") has no polygon in the 110m topojson (too small).
 * Its city marker (Vaduz) still plots correctly — we just can't fill the
 * country. That matches the behaviour of most low-res world maps.
 */

export type VisitedCountry = {
  iso2: string;
  numericId: string | null;
  name: string;
};

export type VisitedCity = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  description?: string;
};

export const visitedCountries: VisitedCountry[] = [
  { iso2: "NP", numericId: "524", name: "Nepal" },
  { iso2: "IN", numericId: "356", name: "India" },
  { iso2: "CN", numericId: "156", name: "China" },
  { iso2: "TH", numericId: "764", name: "Thailand" },
  { iso2: "KH", numericId: "116", name: "Cambodia" },
  { iso2: "MY", numericId: "458", name: "Malaysia" },
  { iso2: "VN", numericId: "704", name: "Vietnam" },
  { iso2: "US", numericId: "840", name: "United States" },
  { iso2: "MA", numericId: "504", name: "Morocco" },
  { iso2: "IS", numericId: "352", name: "Iceland" },
  { iso2: "SV", numericId: "222", name: "El Salvador" },
  { iso2: "GT", numericId: "320", name: "Guatemala" },
  { iso2: "NI", numericId: "558", name: "Nicaragua" },
  { iso2: "CO", numericId: "170", name: "Colombia" },
  { iso2: "PE", numericId: "604", name: "Peru" },
  { iso2: "BE", numericId: "056", name: "Belgium" },
  { iso2: "FR", numericId: "250", name: "France" },
  { iso2: "NL", numericId: "528", name: "Netherlands" },
  { iso2: "GB", numericId: "826", name: "United Kingdom" },
  { iso2: "DE", numericId: "276", name: "Germany" },
  { iso2: "PL", numericId: "616", name: "Poland" },
  { iso2: "ES", numericId: "724", name: "Spain" },
  { iso2: "PT", numericId: "620", name: "Portugal" },
  { iso2: "IT", numericId: "380", name: "Italy" },
  { iso2: "CH", numericId: "756", name: "Switzerland" },
  { iso2: "HU", numericId: "348", name: "Hungary" },
  { iso2: "SK", numericId: "703", name: "Slovakia" },
  { iso2: "OM", numericId: "512", name: "Oman" },
  { iso2: "AE", numericId: "784", name: "United Arab Emirates" },
  { iso2: "QA", numericId: "634", name: "Qatar" },
  { iso2: "HN", numericId: "340", name: "Honduras" },
  { iso2: "MX", numericId: "484", name: "Mexico" },
  { iso2: "LI", numericId: null, name: "Liechtenstein" },
  { iso2: "AL", numericId: "008", name: "Albania" },
  { iso2: "ME", numericId: "499", name: "Montenegro" },
  { iso2: "TR", numericId: "792", name: "Türkiye" },
  { iso2: "IL", numericId: "376", name: "Israel" },
  { iso2: "HR", numericId: "191", name: "Croatia" },
];

/** Fast lookup of visited-country numeric IDs (for polygon fill). */
export const visitedNumericIds: ReadonlySet<string> = new Set(
  visitedCountries
    .map((c) => c.numericId)
    .filter((id): id is string => id !== null)
);

export const visitedCities: VisitedCity[] = [
  // Europe — extras
  {
    name: "Den Haag",
    country: "Netherlands",
    latitude: 52.0983,
    longitude: 4.2681,
    description: "Cycling through the city with beautiful architecture and canals",
  },
  {
    name: "Scheveningen",
    country: "Netherlands",
    latitude: 51.9081,
    longitude: 4.1772,
  },
  {
    name: "Utrecht",
    country: "Netherlands",
    latitude: 52.0907,
    longitude: 5.1214,
    description: "Charming city with canals and historic architecture",
  },
  {
    name: "Annecy",
    country: "France",
    latitude: 45.8992,
    longitude: 6.1294,
    description:
      "Quick daytrip to this beautiful lakeside town full of canals during the rainy day",
  },
  {
    name: "Bratislava",
    country: "Slovakia",
    latitude: 48.1482,
    longitude: 17.1067,
    description: "Capital city with medieval architecture",
  },
  {
    name: "Budapest",
    country: "Hungary",
    latitude: 47.4979,
    longitude: 19.0402,
    description: "Stunning capital city with thermal baths",
  },
  {
    name: "Lucerne",
    country: "Switzerland",
    latitude: 47.0502,
    longitude: 8.3093,
    description: "Picturesque lakeside city with mountains",
  },
  {
    name: "Vaduz",
    country: "Liechtenstein",
    latitude: 47.1415,
    longitude: 9.5215,
    description: "Capital city with a medieval castle",
  },
  {
    name: "Amsterdam",
    country: "Netherlands",
    latitude: 52.3676,
    longitude: 4.9041,
    description: "Canal city with rich history and culture",
  },
  {
    name: "Cancún",
    country: "Mexico",
    latitude: 21.1619,
    longitude: -86.8515,
    description: "Quick layover on the beach for one night",
  },
  {
    name: "Philadelphia",
    country: "United States",
    latitude: 39.9526,
    longitude: -75.1652,
  },
  {
    name: "Venice",
    country: "Italy",
    latitude: 45.4408,
    longitude: 12.3155,
    description: "Unique city built on canals with rich history",
  },

  // Nepal
  {
    name: "Annapurna Base Camp",
    country: "Nepal",
    latitude: 28.5312,
    longitude: 83.392,
    description: "4000m in the himalayas, nice views of Annapurna range",
  },
  {
    name: "Pokhara",
    country: "Nepal",
    latitude: 28.0096,
    longitude: 84.1856,
    description: "Beautiful lakeside city with mountain views",
  },
  {
    name: "Ghandruk",
    country: "Nepal",
    latitude: 28.3894,
    longitude: 83.8103,
    description: "Traditional Gurung village with mountain panoramas",
  },
  {
    name: "Jhinu Danda",
    country: "Nepal",
    latitude: 28.7894,
    longitude: 83.8103,
    description: "Traditional Gurung village with mountain panoramas",
  },

  // India
  {
    name: "Rishikesh",
    country: "Uttarakhand, India",
    latitude: 30.0869,
    longitude: 78.2676,
    description: "Ganga river town, so amazing! Beatles visited here",
  },
  {
    name: "Agra",
    country: "UP, India",
    latitude: 27.1767,
    longitude: 78.0081,
    description: "Taj Mahal",
  },
  {
    name: "Varanasi",
    country: "UP, India",
    latitude: 25.3176,
    longitude: 82.9739,
    description: "Ancient city on the Ganges, most holy place in India",
  },
  {
    name: "Udaipur",
    country: "UP, India",
    latitude: 24.5854,
    longitude: 73.7125,
    description: "City of Lakes with stunning palaces",
  },
  {
    name: "Jaipur",
    country: "UP, India",
    latitude: 26.9124,
    longitude: 75.7873,
    description: "The Pink City with magnificent forts",
  },
  {
    name: "Hampi",
    country: "Karnataka, India",
    latitude: 15.335,
    longitude: 76.46,
    description:
      "Ruins of the ancient capital of the Vijayanagara Empire. 10/10 place to visit",
  },
  {
    name: "Kochi",
    country: "Kerala, India",
    latitude: 9.9312,
    longitude: 76.2673,
    description: "The best food I have ever eaten in my life",
  },
  {
    name: "Theni",
    country: "Tamil Nadu, India",
    latitude: 10.217,
    longitude: 77.7167,
    description: "Wild Elephants",
  },
  {
    name: "Chinnakanal",
    country: "Kerala, India",
    latitude: 9.7667,
    longitude: 76.7833,
    description: "Nice hill station with tea gardens",
  },
  {
    name: "Munnar",
    country: "Kerala, India",
    latitude: 10.0889,
    longitude: 77.0595,
    description:
      "Favourite place in india. Tea plantations, mountains, waterfalls, wild elephants",
  },
  {
    name: "Ahmedabad",
    country: "Gujarat, India",
    latitude: 23.0225,
    longitude: 72.5714,
    description: "Gandhi",
  },
  {
    name: "Mumbai",
    country: "Maharastra, India",
    latitude: 19.076,
    longitude: 72.8777,
  },
  {
    name: "Chandigarh",
    country: "Punjab, India",
    latitude: 30.7333,
    longitude: 76.7794,
  },
  {
    name: "Kasol",
    country: "Himachal Pradesh, India",
    latitude: 32.0,
    longitude: 77.1833,
    description: "Himalayan village known for trekking and nature",
  },
  {
    name: "Manali",
    country: "Himachal Pradesh, India",
    latitude: 32.2396,
    longitude: 77.1887,
  },
  {
    name: "Spiti Valley",
    country: "Himachal Pradesh, India",
    latitude: 32.1153,
    longitude: 78.208,
    description: "Remote Himalayan valley with stunning landscapes",
  },
  {
    name: "Alappuzha",
    country: "India",
    latitude: 9.4981,
    longitude: 76.3388,
    description: "Backwaters and houseboat rides in Kerala",
  },

  // China
  {
    name: "Xi'an",
    country: "China",
    latitude: 34.3853,
    longitude: 109.2784,
    description: "Terracotta Warriors",
  },
  {
    name: "Beijing",
    country: "China",
    latitude: 39.9042,
    longitude: 116.4074,
    description: "Capital of China — Forbidden City and the Great Wall",
  },
  {
    name: "Datong",
    country: "Shanxi, China",
    latitude: 40.0768,
    longitude: 113.3001,
    description: "Yungang Grottoes and the Hanging Monastery",
  },
  {
    name: "Changsha",
    country: "Hunan, China",
    latitude: 28.2282,
    longitude: 112.9388,
    description: "Capital of Hunan — spicy food and Mao history",
  },
  {
    name: "Yangshuo",
    country: "Guangxi, China",
    latitude: 24.7783,
    longitude: 110.4969,
    description: "Karst peaks and bamboo rafting on the Li River",
  },
  {
    name: "Zhaoxing",
    country: "Guizhou, China",
    latitude: 25.9133,
    longitude: 109.175,
    description: "Traditional Dong village with wooden drum towers",
  },
  {
    name: "Chongqing",
    country: "China",
    latitude: 29.4316,
    longitude: 106.9123,
    description: "Massive mountain megacity with cyberpunk vibes and hotpot",
  },
  {
    name: "Chengdu",
    country: "Sichuan, China",
    latitude: 30.5728,
    longitude: 104.0668,
    description: "Pandas, Sichuan hotpot, teahouses",
  },
  {
    name: "Emeishan",
    country: "Sichuan, China",
    latitude: 29.5994,
    longitude: 103.4844,
    description: "Sacred Buddhist mountain with mischievous monkeys",
  },
  {
    name: "Leshan",
    country: "Sichuan, China",
    latitude: 29.5521,
    longitude: 103.7656,
    description: "Giant Buddha carved into the cliffside",
  },
  {
    name: "Dali",
    country: "Yunnan, China",
    latitude: 25.6065,
    longitude: 100.268,
    description: "Old town by Erhai Lake with Bai culture",
  },
  {
    name: "Lijiang",
    country: "Yunnan, China",
    latitude: 26.8721,
    longitude: 100.2299,
    description: "Cobbled old town below the Jade Dragon Snow Mountain",
  },
  {
    name: "Shangri-La",
    country: "Yunnan, China",
    latitude: 27.8268,
    longitude: 99.7068,
    description: "Tibetan plateau town at the gateway to the Himalayas",
  },

  // Albania
  {
    name: "Tirana",
    country: "Albania",
    latitude: 41.3275,
    longitude: 19.8187,
    description: "Colourful capital with a wild communist-era history",
  },
  {
    name: "Shkodër",
    country: "Albania",
    latitude: 42.0683,
    longitude: 19.5126,
    description: "Lakeside city and gateway to the Albanian Alps",
  },
  {
    name: "Theth",
    country: "Albania",
    latitude: 42.3933,
    longitude: 19.7656,
    description: "Tiny mountain village deep in the Accursed Mountains",
  },
  {
    name: "Valbonë",
    country: "Albania",
    latitude: 42.4192,
    longitude: 19.8839,
    description: "End of an incredible day-hike from Theth over the pass",
  },

  // Türkiye
  {
    name: "Istanbul",
    country: "Türkiye",
    latitude: 41.0082,
    longitude: 28.9784,
    description: "Where Europe meets Asia — bazaars, mosques, and the Bosphorus",
  },

  // Montenegro
  {
    name: "Kotor",
    country: "Montenegro",
    latitude: 42.4247,
    longitude: 18.7712,
    description: "Walled town tucked into Europe's southernmost fjord",
  },
  {
    name: "Ulcinj",
    country: "Montenegro",
    latitude: 41.9292,
    longitude: 19.2247,
    description: "Long sandy beaches near the Albanian border",
  },

  // Thailand
  {
    name: "Chiang Mai",
    country: "Thailand",
    latitude: 18.7883,
    longitude: 98.9853,
    description: "Cultural capital in the mountains of the north of thailand",
  },
  {
    name: "Bangkok",
    country: "Thailand",
    latitude: 13.7563,
    longitude: 100.5018,
  },

  // Cambodia
  {
    name: "Angkor Wat",
    country: "Cambodia",
    latitude: 13.4125,
    longitude: 103.8669,
    description: "Insane temple complex, the biggest in the world",
  },

  // Malaysia
  {
    name: "Melaka",
    country: "Malaysia",
    latitude: 2.1896,
    longitude: 102.2501,
    description: "Nice port city on the Malacca Strait",
  },

  // Vietnam
  {
    name: "Chau Ðoc",
    country: "Vietnam",
    latitude: 10.7008,
    longitude: 105.1119,
    description: "Mekong Delta town near Cambodia border",
  },
  {
    name: "Cu Chi Tunnels",
    country: "Vietnam",
    latitude: 10.8231,
    longitude: 106.6297,
    description: "Underground tunnels used during the Vietnam War",
  },
  {
    name: "Ben Tre",
    country: "Vietnam",
    latitude: 10.2431,
    longitude: 106.3757,
    description: "Island in the Mekong Delta",
  },

  // USA
  {
    name: "Newport",
    country: "Rhode Island, USA",
    latitude: 41.4901,
    longitude: -71.3128,
    description: "Historic coastal city with mansions",
  },
  {
    name: "Savannah",
    country: "Georgia, USA",
    latitude: 32.0835,
    longitude: -81.0998,
    description: "Historic Southern charm and architecture",
  },
  {
    name: "Charleston",
    country: "South Carolina, USA",
    latitude: 32.7765,
    longitude: -79.9311,
  },

  // Morocco
  {
    name: "Marrakech",
    country: "Morocco",
    latitude: 31.6295,
    longitude: -7.9811,
    description: "Red city with souks and riads",
  },
  {
    name: "Imlil",
    country: "Morocco",
    latitude: 31.1472,
    longitude: -6.814,
    description: "Berber village in the Atlas Mountains",
  },

  // Iceland
  {
    name: "Thingvellir",
    country: "Iceland",
    latitude: 64.2558,
    longitude: -21.1294,
    description: "Historic parliament site and national park",
  },
  {
    name: "Reykjavik",
    country: "Iceland",
    latitude: 64.1355,
    longitude: -21.8954,
    description: "Cold capital city",
  },
  {
    name: "Seljalandsfoss",
    country: "Iceland",
    latitude: 63.6156,
    longitude: -19.9925,
    description: "Iconic waterfall you can walk behind",
  },
  {
    name: "Selfoss",
    country: "Iceland",
    latitude: 63.9339,
    longitude: -20.9971,
    description: "Town in South Iceland near geysers",
  },
  {
    name: "Vik",
    country: "Iceland",
    latitude: 63.4187,
    longitude: -19.0059,
    description: "Black sand beaches and dramatic coastline",
  },

  // El Salvador
  {
    name: "Santa Ana",
    country: "El Salvador",
    latitude: 13.8942,
    longitude: -88.9598,
    description: "Colonial city with a big volcano that has a lake in the crater",
  },
  {
    name: "Juayúa",
    country: "El Salvador",
    latitude: 13.6431,
    longitude: -88.9453,
    description: "Coffee town with lots of waterfalls",
  },

  // Guatemala
  {
    name: "Volcan Del Fuego",
    country: "Guatemala",
    latitude: 14.5586,
    longitude: -90.7344,
    description: "Active volcano that erupts every 15 mins",
  },
  {
    name: "Lake Atitlán",
    country: "Guatemala",
    latitude: 14.6906,
    longitude: -91.5025,
    description: "Stunning volcanic lake with Mayan villages",
  },

  // Nicaragua
  {
    name: "Ometepe",
    country: "Nicaragua",
    latitude: 11.5,
    longitude: -85.6333,
    description: "Volcanic island in Lake Nicaragua",
  },
  {
    name: "León",
    country: "Nicaragua",
    latitude: 12.4348,
    longitude: -86.8779,
    description: "Volcano boarding",
  },

  // Colombia
  {
    name: "Guatapé",
    country: "Colombia",
    latitude: 6.2303,
    longitude: -75.1567,
    description: "Colorful town with famous El Peñón rock",
  },
  {
    name: "Bogotá",
    country: "Colombia",
    latitude: 4.711,
    longitude: -74.0721,
    description: "High-altitude capital with vibrant culture",
  },
  {
    name: "Salento",
    country: "Colombia",
    latitude: 4.6369,
    longitude: -75.5706,
    description:
      "Coffee region with colonial architecture and the tallest wax palm trees in the world. You can also drink hot chocolate with cheese which is a bit weird",
  },
  {
    name: "Medellín",
    country: "Colombia",
    latitude: 6.2442,
    longitude: -75.5812,
    description:
      "City of eternal spring. The highlight was Comuna 13, once the most dangerous neighborhood in the world, now a cool community with street art and music",
  },
  {
    name: "Cartagena",
    country: "Colombia",
    latitude: 10.3932,
    longitude: -75.4832,
    description: "Caribbean colonial fortress city",
  },
  {
    name: "Tayrona",
    country: "Colombia",
    latitude: 11.3167,
    longitude: -74.0833,
    description: "National park with pristine beaches",
  },

  // Peru
  {
    name: "Huacachina",
    country: "Peru",
    latitude: -14.0875,
    longitude: -75.7639,
    description: "Desert oasis with sand dunes",
  },
  {
    name: "Arequipa",
    country: "Peru",
    latitude: -16.409,
    longitude: -71.5374,
    description: "Volcanic city",
  },
  {
    name: "Cusco",
    country: "Peru",
    latitude: -13.5319,
    longitude: -71.9675,
    description: "Ancient Inca capital",
  },
  {
    name: "Dead Womans Pass",
    country: "Peru",
    latitude: -13.1628,
    longitude: -73.5449,
    description: "Highest point on the Inca Trail",
  },
  {
    name: "Machu Picchu",
    country: "Peru",
    latitude: -13.1631,
    longitude: -72.545,
    description: "Lost city of the Incas",
  },
];

/** Emoji flag lookup — matches travelData cities whose `country` may include a region. */
const countryFlags: Record<string, string> = {
  Nepal: "🇳🇵",
  India: "🇮🇳",
  China: "🇨🇳",
  Thailand: "🇹🇭",
  Cambodia: "🇰🇭",
  Malaysia: "🇲🇾",
  Vietnam: "🇻🇳",
  "United States": "🇺🇸",
  Morocco: "🇲🇦",
  Iceland: "🇮🇸",
  "El Salvador": "🇸🇻",
  Guatemala: "🇬🇹",
  Nicaragua: "🇳🇮",
  Colombia: "🇨🇴",
  Peru: "🇵🇪",
  Belgium: "🇧🇪",
  France: "🇫🇷",
  Netherlands: "🇳🇱",
  "United Kingdom": "🇬🇧",
  Germany: "🇩🇪",
  Poland: "🇵🇱",
  Spain: "🇪🇸",
  Portugal: "🇵🇹",
  Italy: "🇮🇹",
  Switzerland: "🇨🇭",
  Hungary: "🇭🇺",
  Slovakia: "🇸🇰",
  Oman: "🇴🇲",
  "United Arab Emirates": "🇦🇪",
  Qatar: "🇶🇦",
  Honduras: "🇭🇳",
  Mexico: "🇲🇽",
  Liechtenstein: "🇱🇮",
  Albania: "🇦🇱",
  Montenegro: "🇲🇪",
  "Türkiye": "🇹🇷",
  Israel: "🇮🇱",
  Croatia: "🇭🇷",
};

export function getCountryFlag(countryLabel: string): string {
  if (countryFlags[countryLabel]) return countryFlags[countryLabel];
  // Region suffixes like "Kerala, India" → pick the main country on the right.
  for (const key of Object.keys(countryFlags)) {
    if (countryLabel.includes(key)) return countryFlags[key];
  }
  // "USA" suffix fallback.
  if (countryLabel.includes("USA")) return "🇺🇸";
  return "🌍";
}
