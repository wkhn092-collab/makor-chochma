import "server-only";

import { createClient } from "@sanity/client";
import type { LeadInput } from "@/lib/validation/lead";
import { normalizeIlPhone } from "@/lib/validation/lead";

function getClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion: "2025-01-01",
    token,
    useCdn: false,
  });
}

export async function persistLead(
  input: LeadInput,
  meta: { turnstilePassed: boolean; userAgent?: string | null },
): Promise<{ ok: boolean; id?: string; skipped?: boolean }> {
  const client = getClient();
  if (!client) {
    console.info("[lead:dev-no-sanity]", input.interest);
    return { ok: true, skipped: true };
  }

  const doc = {
    _type: "lead",
    name: input.name.trim(),
    phone: normalizeIlPhone(input.phone),
    email: input.email || undefined,
    interest: input.interest,
    secondaryInterest: input.secondaryInterest || undefined,
    source: "form",
    locale: input.locale,
    status: "new",
    createdAt: new Date().toISOString(),
    turnstilePassed: meta.turnstilePassed,
    userAgent: meta.userAgent || undefined,
  };

  const created = await client.create(doc);
  return { ok: true, id: created._id };
}
