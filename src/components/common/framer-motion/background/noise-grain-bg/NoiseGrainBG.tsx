"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface NoiseGrainBGProps {
  opacity?: number;
  baseFrequency?: number;
  numOctaves?: number;
  animate?: boolean;
  speed?: number;
  blendMode?: string;
  className?: string;
  children?: React.ReactNode;
}

const NoiseGrainBG: React.FC<NoiseGrainBGProps> = ({
  opacity = 0.15,
  baseFrequency = 0.65,
  numOctaves = 4,
  animate = true,
  speed = 10,
  blendMode = "overlay",
  className = "",
  children,
}) => {
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const rafRef = useRef<number>(0);
  const seedRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);

  const animateGrain = useCallback(
    (time: number) => {
      if (!turbulenceRef.current) return;

      const interval = 1000 / speed;
      if (time - lastFrameTimeRef.current >= interval) {
        seedRef.current = (seedRef.current + 1) % 100;
        turbulenceRef.current.setAttribute("seed", String(seedRef.current));
        lastFrameTimeRef.current = time;
      }

      rafRef.current = requestAnimationFrame(animateGrain);
    },
    [speed]
  );

  useEffect(() => {
    if (animate) {
      rafRef.current = requestAnimationFrame(animateGrain);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate, animateGrain]);

  const filterId = `noise-grain-${React.useId().replace(/:/g, "")}`;

  return (
    <div className={`relative ${className}`}>
      {children}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"],
          opacity,
        }}
      >
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <filter id={filterId}>
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency={baseFrequency}
              numOctaves={numOctaves}
              stitchTiles="stitch"
              seed="0"
            />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter={`url(#${filterId})`}
          />
        </svg>
      </div>
    </div>
  );
};

export default NoiseGrainBG;
