import { useState, useEffect, useCallback, RefObject } from "react";

interface UseMousePositionOptions {
  targetRef?: RefObject<HTMLElement | null>;
  smooth?: boolean;
  throttleMs?: number;
}

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
  isInside: boolean;
}

export function useMousePosition(options: UseMousePositionOptions = {}): MousePosition {
  const { targetRef, smooth = false, throttleMs = 16 } = options;

  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    isInside: false,
  });

  const updatePosition = useCallback(
    (e: MouseEvent) => {
      if (targetRef?.current) {
        const rect = targetRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const normalizedX = rect.width > 0 ? (x - rect.width / 2) / (rect.width / 2) : 0;
        const normalizedY = rect.height > 0 ? (y - rect.height / 2) / (rect.height / 2) : 0;
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        setPosition({ x, y, normalizedX, normalizedY, isInside });
      } else {
        const { innerWidth, innerHeight } = window;
        const normalizedX = innerWidth > 0 ? (e.clientX - innerWidth / 2) / (innerWidth / 2) : 0;
        const normalizedY = innerHeight > 0 ? (e.clientY - innerHeight / 2) / (innerHeight / 2) : 0;

        setPosition({
          x: e.clientX,
          y: e.clientY,
          normalizedX,
          normalizedY,
          isInside: true,
        });
      }
    },
    [targetRef]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastTime = 0;
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      if (smooth) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => updatePosition(e));
      } else {
        updatePosition(e);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [updatePosition, smooth, throttleMs]);

  return position;
}

export default useMousePosition;
