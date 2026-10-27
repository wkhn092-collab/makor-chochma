/**
 * Media CDN (Cloudinary) — not Vercel bandwidth.
 * - Absolute https URL → returned as-is
 * - Relative path → NEXT_PUBLIC_CDN_BASE + path, or /videos/... locally
 */
export function cdnUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const base = (process.env.NEXT_PUBLIC_CDN_BASE || "").replace(/\/$/, "");
  const clean = pathOrUrl.replace(/^\//, "");
  if (base) return `${base}/${clean}`;
  return `/videos/${clean}`;
}

/** First-frame poster from Cloudinary video URL (so_0). Non-Cloudinary → null. */
export function cloudinaryPoster(videoUrl: string): string | null {
  if (!videoUrl.includes("res.cloudinary.com") || !videoUrl.includes("/video/upload/")) {
    return null;
  }
  // Insert so_0 transformation; swap extension to jpg for a still frame
  return videoUrl
    .replace("/video/upload/", "/video/upload/so_0,w_1200,c_limit,f_jpg,q_auto/")
    .replace(/\.mp4(\?.*)?$/i, ".jpg$1");
}
