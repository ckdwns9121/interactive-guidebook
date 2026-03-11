export const LIQUID_DEFAULTS = {
  text: "LIQUID",
  scale: 12,
  baseFrequency: 0.015,
  speed: 0.8,
  numOctaves: 3,
  color: "#ffffff",
  fontSize: "text-6xl sm:text-8xl md:text-9xl",
  fontWeight: "font-black",
};

export const FONT_SIZE_OPTIONS = [
  { value: "text-2xl sm:text-3xl md:text-4xl", label: "Small" },
  { value: "text-3xl sm:text-4xl md:text-5xl", label: "Medium" },
  { value: "text-4xl sm:text-6xl md:text-7xl", label: "Large" },
  { value: "text-5xl sm:text-7xl md:text-8xl", label: "Extra Large" },
  { value: "text-6xl sm:text-8xl md:text-9xl", label: "Giant" },
];

export const FONT_WEIGHT_OPTIONS = [
  { value: "font-normal", label: "Normal" },
  { value: "font-medium", label: "Medium" },
  { value: "font-semibold", label: "Semibold" },
  { value: "font-bold", label: "Bold" },
  { value: "font-black", label: "Black" },
];

export const COLOR_PRESETS = [
  { value: "#ffffff", label: "White" },
  { value: "#38bdf8", label: "Sky Blue" },
  { value: "#818cf8", label: "Indigo" },
  { value: "#a78bfa", label: "Violet" },
  { value: "#f472b6", label: "Pink" },
  { value: "#34d399", label: "Emerald" },
  { value: "#fbbf24", label: "Amber" },
  { value: "#f87171", label: "Red" },
];
