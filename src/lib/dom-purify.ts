import "server-only";

/**
 * Strip tags/attrs for strings injected via dangerouslySetInnerHTML.
 * No jsdom/isomorphic-dompurify — that package crashes on Vercel serverless
 * (ERR_REQUIRE_ESM via html-encoding-sniffer) when the route is dynamic.
 */
export function purifyHtml(
  dirty: string,
  options?: { allowMinimalMarkup?: boolean },
): string {
  if (options?.allowMinimalMarkup) {
    return dirty
      .replace(/<\/?(script|iframe|object|embed|form)[^>]*>/gi, "")
      .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/\sstyle\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  }
  return dirty.replace(/<[^>]*>/g, "");
}
