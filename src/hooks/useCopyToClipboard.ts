import { useState, useCallback } from "react";

interface UseCopyToClipboardResult {
  /** Whether the content was recently copied */
  isCopied: boolean;
  /** Copy function that returns success status */
  copy: (text: string) => Promise<boolean>;
  /** Manually reset the copied state */
  reset: () => void;
  /** Error if copy failed */
  error: Error | null;
}

/**
 * Custom hook for copying text to clipboard
 * Handles the isCopied state with automatic reset
 */
export function useCopyToClipboard(resetDelayMs: number = 2000): UseCopyToClipboardResult {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setError(null);

        if (resetDelayMs > 0) {
          setTimeout(() => setIsCopied(false), resetDelayMs);
        }

        return true;
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to copy"));
        setIsCopied(false);
        return false;
      }
    },
    [resetDelayMs]
  );

  const reset = useCallback(() => {
    setIsCopied(false);
    setError(null);
  }, []);

  return { isCopied, copy, reset, error };
}

export default useCopyToClipboard;
