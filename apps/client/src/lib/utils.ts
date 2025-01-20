import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string) {
  return address.trim().slice(0, 15);
}

export const truncatecharacter = (text: string, length: number) => {
  if (text.length <= length) {
    return text;
  }
  return text.slice(0, length);
};
export function formatDate(input: string) {
  const date = new Date(input);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formattime(input: string) {
  const date = new Date(input);
  return date
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(":", ".");
}

export function formatUSDate(input: string) {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}
