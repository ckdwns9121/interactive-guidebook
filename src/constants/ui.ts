export const CURSOR_DEFAULTS = {
  size: 48,
  expandedSize: 80,
  color: "#ff69b4",
  text: "",
  springConfig: { stiffness: 300, damping: 30 },
} as const;

export const DOT_GRID_STYLE = {
  backgroundImage:
    "radial-gradient(circle, #444 1.5px, transparent 1.5px), radial-gradient(circle, #222 1.5px, transparent 1.5px)",
  backgroundSize: "20px 20px",
  backgroundPosition: "0 0, 10px 10px",
} as const;
