import { ReactNode, CSSProperties } from "react";
import { DOT_GRID_BACKGROUND } from "@/styles/backgrounds";

interface ControlPanelWrapperProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function ControlPanelWrapper({ children, className = "", style }: ControlPanelWrapperProps) {
  return (
    <div
      className={`p-4 md:p-6 bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-neutral-800 ${className}`}
      style={{ ...DOT_GRID_BACKGROUND, ...style }}
    >
      {children}
    </div>
  );
}
