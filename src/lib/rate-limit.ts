import "server-only";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX = 5;

function memoryLimitOk(key: string): boolean {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (existing.count >= MAX) return false;
  existing.count += 1;
  return true;
}

/**
 * Prefer Upstash Redis when configured (multi-instance / distributed).
 * Falls back to in-memory for local / soft-launch.
 */
export async function rateLimitOk(key: string): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    return memoryLimitOk(key);
  }

  try {
    const { Ratelimit } = await import("@upstash/ratelimit");
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({ url, token });
    const limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(MAX, "15 m"),
      prefix: "makor-lead",
    });
    const { success } = await limiter.limit(key);
    return success;
  } catch (err) {
    console.error("[rate-limit:upstash]", err);
    return memoryLimitOk(key);
  }
}
