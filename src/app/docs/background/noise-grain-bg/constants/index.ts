export const NOISE_GRAIN_DEFAULTS = {
  opacity: 0.15,
  baseFrequency: 0.65,
  numOctaves: 4,
  animate: true,
  speed: 10,
  blendMode: "overlay" as const,
};

export const BLEND_MODE_OPTIONS = [
  { value: "overlay", label: "Overlay" },
  { value: "multiply", label: "Multiply" },
  { value: "screen", label: "Screen" },
  { value: "soft-light", label: "Soft Light" },
  { value: "hard-light", label: "Hard Light" },
  { value: "normal", label: "Normal" },
];

export const BG_COLOR_PRESETS = [
  { value: "from-gray-900 to-gray-800", label: "Dark Gray" },
  { value: "from-indigo-900 to-purple-900", label: "Indigo Purple" },
  { value: "from-emerald-900 to-teal-900", label: "Emerald Teal" },
  { value: "from-rose-900 to-pink-900", label: "Rose Pink" },
  { value: "from-amber-900 to-orange-900", label: "Amber Orange" },
  { value: "from-sky-900 to-blue-900", label: "Sky Blue" },
];
