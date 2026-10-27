import type { MetadataRoute } from "next";

const paths = [
  "",
  "/about",
  "/services",
  "/portfolio",
  "/recommendations",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://makor-chochma.vercel.app"
  ).replace(/\/$/, "");
  const now = new Date();

  const he = paths.map((p) => ({
    url: `${base}${p || "/"}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const en = paths.map((p) => ({
    url: `${base}/en${p || ""}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 0.9 : 0.6,
  }));

  return [...he, ...en];
}
