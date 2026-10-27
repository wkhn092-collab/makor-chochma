import "server-only";

/**
 * Exact host match for Server Actions — reject cross-site forged posts.
 * Compares hostname only (no substring includes).
 */
export function assertSameOrigin(
  headerList: Headers,
): { ok: true } | { ok: false } {
  const host = headerList.get("x-forwarded-host") || headerList.get("host");
  const origin = headerList.get("origin");
  const referer = headerList.get("referer");

  if (!host) return { ok: false };

  const hostName = host.split(":")[0]?.toLowerCase();
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
  // Local dev
  allowed.add("localhost");
  allowed.add("127.0.0.1");

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

  // Some browsers omit Origin on same-site navigations — fall back to Referer
  const refHost = hostFromUrl(referer);
  if (refHost) {
    return allowed.has(refHost) ? { ok: true } : { ok: false };
  }

  // No Origin/Referer in production → reject (CSRF surface)
  if (process.env.NODE_ENV === "production") return { ok: false };
  return { ok: true };
}
