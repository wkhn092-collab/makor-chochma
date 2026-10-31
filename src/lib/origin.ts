import "server-only";

/**
 * Exact host match for Server Actions — reject cross-site forged posts.
 * Compares hostname only (no substring includes).
 * localhost is allowed only outside production.
 */
export function assertSameOrigin(
  headerList: Headers,
): { ok: true } | { ok: false } {
  const rawHost = headerList.get("x-forwarded-host") || headerList.get("host");
  const origin = headerList.get("origin");
  const referer = headerList.get("referer");

  if (!rawHost) return { ok: false };

  // Vercel may send comma-separated forwarded hosts — take the first
  const hostName = rawHost
    .split(",")[0]
    ?.trim()
    .split(":")[0]
    ?.toLowerCase();
  if (!hostName) return { ok: false };

  const allowed = new Set<string>([hostName]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    try {
      allowed.add(new URL(siteUrl).hostname.toLowerCase());
    } catch {
      /* ignore bad SITE_URL */
    }
  }

  if (process.env.NODE_ENV !== "production") {
    allowed.add("localhost");
    allowed.add("127.0.0.1");
  }

  function hostFromUrl(raw: string | null): string | null {
    if (!raw) return null;
    try {
      return new URL(raw).hostname.toLowerCase();
    } catch {
      return null;
    }
  }

  const originHost = hostFromUrl(origin);
  if (originHost) {
    return allowed.has(originHost) ? { ok: true } : { ok: false };
  }

  const refHost = hostFromUrl(referer);
  if (refHost) {
    return allowed.has(refHost) ? { ok: true } : { ok: false };
  }

  if (process.env.NODE_ENV === "production") return { ok: false };
  return { ok: true };
}
