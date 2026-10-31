import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Network boundary (Next 16 `proxy`) — security headers + CSP Enforce with nonce.
 */
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set("x-nonce", nonce);

  const isDev = process.env.NODE_ENV === "development";
  // Dev needs unsafe-eval for React refresh; production stays nonce-only.
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    ...(isDev ? ["'unsafe-eval'"] : []),
    "https://challenges.cloudflare.com",
    "https://www.googletagmanager.com",
    "https://www.clarity.ms",
  ].join(" ");

  const csp = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob: https: https://res.cloudinary.com",
    "font-src 'self' data:",
    "connect-src 'self' https://challenges.cloudflare.com https://www.google-analytics.com https://analytics.google.com https://www.clarity.ms https://*.clarity.ms https://*.api.sanity.io",
    "frame-src https://challenges.cloudflare.com https://maps.google.com https://www.google.com",
    "worker-src 'self' blob:",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ]
    .join("; ")
    .replace(/\s+/g, " ")
    .trim();

  response.headers.set("Content-Security-Policy", csp);

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
