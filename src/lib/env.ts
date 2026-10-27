import "server-only";
import { z } from "zod";

/**
 * Server env validation — production lead pipeline is fail-closed unless
 * LEAD_ALLOW_DEGRADED=true (explicit soft-launch escape hatch).
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
  /** Explicit opt-in: allow form success without Resend/Sanity/Turnstile in production */
  LEAD_ALLOW_DEGRADED: z
    .enum(["true", "false", "1", "0"])
    .optional()
    .transform((v) => v === "true" || v === "1"),
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
    cached = { LEAD_ALLOW_DEGRADED: false } as ServerEnv;
    return cached;
  }
  cached = parsed.data;
  return cached;
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

/** At least one durable lead channel (email or Sanity write). */
export function hasLeadDeliveryChannel(env: ServerEnv = getServerEnv()): boolean {
  const hasEmail = Boolean(env.RESEND_API_KEY);
  const hasSanity = Boolean(
    env.SANITY_API_WRITE_TOKEN && env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  );
  return hasEmail || hasSanity;
}

export function hasTurnstile(env: ServerEnv = getServerEnv()): boolean {
  return Boolean(env.TURNSTILE_SECRET_KEY && env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
}

/**
 * Production gate for submitLead.
 * Returns false when pipeline is incomplete and degraded mode is not allowed.
 */
export function assertLeadPipelineReady():
  | { ok: true }
  | { ok: false; reason: "delivery" | "turnstile" | "site_url" } {
  const env = getServerEnv();
  if (!isProduction() || env.LEAD_ALLOW_DEGRADED) {
    return { ok: true };
  }
  if (!env.NEXT_PUBLIC_SITE_URL) {
    console.error("[env] production missing NEXT_PUBLIC_SITE_URL");
    return { ok: false, reason: "site_url" };
  }
  if (!hasLeadDeliveryChannel(env)) {
    console.error("[env] production missing RESEND_API_KEY and Sanity write");
    return { ok: false, reason: "delivery" };
  }
  if (!hasTurnstile(env)) {
    console.error("[env] production missing TURNSTILE_*");
    return { ok: false, reason: "turnstile" };
  }
  return { ok: true };
}
