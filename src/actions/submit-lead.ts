"use server";

import { headers } from "next/headers";
import { leadSchema } from "@/lib/validation/lead";
import { verifyTurnstile } from "@/lib/turnstile";
import { rateLimitOk } from "@/lib/rate-limit";
import { persistLead } from "@/lib/sanity";
import { sendLeadEmail } from "@/lib/mail";
import { normalizeIlPhone } from "@/lib/validation/lead";
import { assertSameOrigin } from "@/lib/origin";
import { assertLeadPipelineReady, getServerEnv } from "@/lib/env";

export type SubmitLeadResult =
  | { ok: true }
  | {
      ok: false;
      code: "validation" | "bot" | "rate" | "server" | "origin" | "turnstile";
      field?: string;
    };

export async function submitLead(
  raw: unknown,
): Promise<SubmitLeadResult> {
  getServerEnv();

  const pipeline = assertLeadPipelineReady();
  if (!pipeline.ok) {
    return { ok: false, code: "server" };
  }

  const h = await headers();
  const originCheck = assertSameOrigin(h);
  if (!originCheck.ok) {
    console.error("[lead] origin rejected", {
      host: h.get("x-forwarded-host") || h.get("host"),
      origin: h.get("origin"),
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    });
    return { ok: false, code: "origin" };
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const path = issue?.path[0];
    if (path === "companyWebsite") {
      return { ok: false, code: "bot" };
    }
    const field =
      path === "phone"
        ? "phone"
        : path === "name"
          ? "name"
          : path === "email"
            ? "email"
            : path === "interest"
              ? "interest"
              : undefined;
    return { ok: false, code: "validation", field };
  }

  const data = parsed.data;
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";
  const ua = h.get("user-agent");

  const phoneKey = normalizeIlPhone(data.phone);
  const phoneOk = await rateLimitOk(`lead:phone:${phoneKey}`);
  const ipOk = await rateLimitOk(`lead:ip:${ip}`);
  if (!phoneOk || !ipOk) {
    return { ok: false, code: "rate" };
  }

  const turnstileOk = await verifyTurnstile(data.turnstileToken, ip);
  if (!turnstileOk) {
    console.error("[lead] turnstile rejected", {
      hasToken: Boolean(data.turnstileToken),
      tokenLen: data.turnstileToken?.length ?? 0,
    });
    return { ok: false, code: "turnstile" };
  }

  try {
    const persisted = await persistLead(data, {
      turnstilePassed: turnstileOk,
      userAgent: ua,
    });
    if (!persisted.ok) {
      return { ok: false, code: "server" };
    }

    const mailed = await sendLeadEmail(data);
    if (!mailed.ok && !persisted.skipped) {
      console.error("[lead] email failed after persist");
    }
    if (!mailed.ok && persisted.skipped) {
      if (process.env.NODE_ENV === "production" && process.env.RESEND_API_KEY) {
        return { ok: false, code: "server" };
      }
    }

    return { ok: true };
  } catch (err) {
    console.error("[lead:submit]", err);
    return { ok: false, code: "server" };
  }
}
