"use client";

import { useCallback, useEffect, useState } from "react";

interface ScreenResolution {
  width: number;
  height: number;
}

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function useScreenResolution(): ScreenResolution {
  const [resolution, setResolution] = useState<ScreenResolution>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const updateResolution = useCallback(() => {
    setResolution({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);
  const debouncedUpdateResolution = useCallback(
    debounce(updateResolution, 250),
    [updateResolution]
  );

  useEffect(() => {
    window.addEventListener("resize", debouncedUpdateResolution);

    return () => {
      window.removeEventListener("resize", debouncedUpdateResolution);
    };
  }, [debouncedUpdateResolution]);

  return resolution;
}
