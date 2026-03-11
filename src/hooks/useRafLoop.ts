import { useRef, useEffect } from "react";

type RafCallback = (deltaTime: number) => void;

export function useRafLoop(callback: RafCallback, enabled: boolean = true): void {
  const callbackRef = useRef(callback);
  const rafIdRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
        previousTimeRef.current = null;
      }
      return;
    }

    const loop = (currentTime: number) => {
      if (previousTimeRef.current === null) {
        previousTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - previousTimeRef.current;
      previousTimeRef.current = currentTime;

      callbackRef.current(deltaTime);

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
        previousTimeRef.current = null;
      }
    };
  }, [enabled]);
}

export default useRafLoop;
