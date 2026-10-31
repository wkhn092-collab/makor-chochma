import type { NextConfig } from "next";

/** CSP Enforce lives in `src/proxy.ts` (nonce per request). */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
let siteHost = "localhost:3000";
try {
  siteHost = new URL(siteUrl).host;
} catch {
  /* keep default */
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  /** Hide Next.js “N” badge while designing mobile layouts */
  devIndicators: false,
  /**
   * Cache Components / PPR left the static shell WITHOUT `__next_f` flight data.
   * Vercel CDN then served that shell (HIT) — React never hydrated, so hamburger
   * + testimonial play were dead static HTML. Classic static HTML includes flight.
   */
  cacheComponents: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "64kb",
      allowedOrigins: [siteHost, "localhost:3000", "127.0.0.1:3000"],
    },
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/logo.jpg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-store, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
