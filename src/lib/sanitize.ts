import "server-only";

export { sanitizePlainText } from "@/lib/plain-text";

/** Prevent CRLF injection into email headers */
export function sanitizeHeaderValue(input: string): string {
  return input.replace(/[\r\n]+/g, " ").trim().slice(0, 200);
}
