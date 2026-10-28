import "server-only";

import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitize a string that will be injected via dangerouslySetInnerHTML.
 * Default: strip all tags/attrs (safe for JSON-LD text blobs).
 */
export function purifyHtml(
  dirty: string,
  options?: { allowMinimalMarkup?: boolean },
): string {
  if (options?.allowMinimalMarkup) {
    return DOMPurify.sanitize(dirty, {
      USE_PROFILES: { html: true },
      FORBID_TAGS: ["script", "iframe", "object", "embed", "form"],
      FORBID_ATTR: ["style", "onerror", "onclick", "onload"],
    });
  }
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}
