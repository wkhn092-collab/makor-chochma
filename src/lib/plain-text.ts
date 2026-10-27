/** Client-safe plain-text scrub (no secrets). */
export function sanitizePlainText(input: string, max = 80): string {
  return input
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/[<>`]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}
