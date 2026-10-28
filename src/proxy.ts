import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Network boundary (Next 16 `proxy`) — security headers for lead-gen site.
 * CSP stays Report-Only until a stable week in production (BRIEF).
 * Protects: clickjacking, MIME sniff, referrer leaks, basic transport hints.
 * Does NOT protect: app logic bugs, stolen Sanity tokens, or email account takeover.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  /** Nonce reserved for CSP Enforce (Script 5 · 2.15). Still Report-Only + unsafe-inline until launch week. */
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  response.headers.set("x-nonce", nonce);

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()",
  );
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-site");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );

  // Never cache HTML shell as shared user content (leads are via POST actions)
  const path = request.nextUrl.pathname;
  if (path.startsWith("/api/")) {
    response.headers.set(
      "Cache-Control",
      "private, no-store, max-age=0, must-revalidate",
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|videos/|logo\\.jpg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
};
