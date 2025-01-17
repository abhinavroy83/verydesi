export function removeExtraSpaces(input: string): string {
  return input.trim().replace(/\s+/g, " ");
}
