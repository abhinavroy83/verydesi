"use client";

import { useScreenResolution } from "@/store";

interface TruncateOptions {
  maxLength: number;
  suffix?: string;
}

function truncateCharacters(str: string, options: TruncateOptions): string {
  const { maxLength, suffix = "..." } = options;
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

export default function TruncateText({ text }: { text: string }) {
  const { width } = useScreenResolution();

  const getTruncateOptions = (width: number): TruncateOptions => {
    if (width <= 640) return { maxLength:32 }; // Phone (Small)
    if (width <= 768) return { maxLength: 32 }; // Phone (Medium)
    if (width <= 1024) return { maxLength: 54 }; // Tablet
    if (width <= 1281) return { maxLength: 34 }; // Small laptop
    if (width <= 1536) return { maxLength: 44 }; // Laptop
    return { maxLength: 54 }; // Desktop
  };

  const truncatedText = truncateCharacters(text, getTruncateOptions(width));

  return (
    <h2 className="lg:text-[21px] text-[18px] font-sans font-bold text-gray-800  transition-colors duration-300">
      {truncatedText}
    </h2>
  );
}
