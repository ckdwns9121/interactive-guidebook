"use client";
import React, { useState, CSSProperties } from "react";
import { DOT_GRID_BACKGROUND } from "@/styles/backgrounds";

export interface DemoContainerProps {
  children: React.ReactNode;
  onReset?: () => void;
  style?: CSSProperties;
  className?: string;
}

const DemoContainer = ({ children, onReset, style, className = "" }: DemoContainerProps) => {
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey((k) => k + 1);
    if (onReset) onReset();
  };

  return (
    <div
      className={`w-full relative overflow-hidden rounded-xl border border-gray-200 dark:border-neutral-800 bg-[#1a1a1a] p-6 sm:p-8 flex justify-center min-h-[120px] ${className}`}
      style={{ ...DOT_GRID_BACKGROUND, ...style }}
    >
      <button
        onClick={handleReset}
        className="absolute right-3 top-3 z-10 bg-neutral-900/80 hover:bg-green-400 text-white text-xs px-3 py-1 rounded-md transition-colors duration-150 shadow"
        aria-label="리셋"
        type="button"
      >
        리셋
      </button>
      <div key={resetKey} className="w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default DemoContainer;
