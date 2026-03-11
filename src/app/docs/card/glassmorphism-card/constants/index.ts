export const GLASS_CARD_DEFAULTS = {
  blurAmount: 16,
  bgOpacity: 0.08,
  bgColor: "#ffffff",
  enableReflection: true,
  reflectionSize: 250,
  reflectionOpacity: 0.15,
  enableTilt: true,
  maxTilt: 8,
  edgeHighlight: 0.4,
  noiseOpacity: 0.03,
  innerShadow: 0.3,
};

export const BG_COLOR_PRESETS = [
  { value: "#ffffff", label: "White" },
  { value: "#38bdf8", label: "Sky Blue" },
  { value: "#818cf8", label: "Indigo" },
  { value: "#a78bfa", label: "Violet" },
  { value: "#f472b6", label: "Pink" },
  { value: "#34d399", label: "Emerald" },
  { value: "#fbbf24", label: "Amber" },
];

export const BACKDROP_PRESETS = [
  { value: "from-indigo-600 via-purple-600 to-pink-600", label: "Indigo → Pink" },
  { value: "from-emerald-600 via-teal-600 to-cyan-600", label: "Emerald → Cyan" },
  { value: "from-rose-600 via-red-600 to-orange-600", label: "Rose → Orange" },
  { value: "from-sky-600 via-blue-600 to-indigo-600", label: "Sky → Indigo" },
  { value: "from-amber-600 via-yellow-600 to-lime-600", label: "Amber → Lime" },
];
