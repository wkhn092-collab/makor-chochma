import "server-only";
import { z } from "zod";

/**
 * Server env validation — fails fast in production when critical secrets missing.
 * Public analytics keys remain optional.
 */
const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  LEAD_FROM_EMAIL: z.string().email().optional().or(z.literal("")),
  LEAD_TO_EMAIL: z.string().email().optional().or(z.literal("")),
  LEAD_CC_EMAIL: z.string().email().optional().or(z.literal("")),
  TURNSTILE_SECRET_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1).optional(),
  SANITY_API_WRITE_TOKEN: z.string().min(1).optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional().or(z.literal("")),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_CLARITY_ID: z.string().optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cached: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cached) return cached;
  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("[env] invalid environment", parsed.error.flatten());
    if (process.env.NODE_ENV === "production") {
      throw new Error("Invalid server environment configuration");
    }
    cached = {} as ServerEnv;
    return cached;
  }
  cached = parsed.data;

  if (process.env.NODE_ENV === "production") {
    const missing: string[] = [];
    if (!cached.RESEND_API_KEY) missing.push("RESEND_API_KEY");
    if (!cached.TURNSTILE_SECRET_KEY || !cached.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
      missing.push("TURNSTILE_*");
    }
    if (!cached.NEXT_PUBLIC_SITE_URL) missing.push("NEXT_PUBLIC_SITE_URL");
    // Sanity optional if email works — warn only
    if (!cached.SANITY_API_WRITE_TOKEN || !cached.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      console.warn("[env] Sanity write not configured — leads email-only");
    }
    if (missing.length) {
      console.error("[env] production missing:", missing.join(", "));
    }
  }

  return cached;
}
