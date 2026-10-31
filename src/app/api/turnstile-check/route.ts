import { NextResponse } from "next/server";
import { verifyTurnstile } from "@/lib/turnstile";

/**
 * Ops check for Turnstile secret wiring.
 * GET  — dummy token (secret accepted? → invalid-input-response)
 * POST — { token } real widget token (full verify path)
 * Delete after launch verification.
 */
export async function GET() {
  const result = await verifyTurnstile("diagnostic-dummy-token");
  const errors = result.errors ?? [];
  const secretOk = !errors.includes("invalid-input-secret");
  const missing = errors.includes("missing-input-secret");

  return NextResponse.json(
    {
      ok: secretOk && !missing,
      errors,
      siteKeyPresent: Boolean(
        process.env["NEXT_PUBLIC_TURNSTILE_SITE_KEY"]?.trim(),
      ),
      secretLen: (process.env["TURNSTILE_SECRET_KEY"] ?? "").trim().length,
    },
    {
      status: secretOk && !missing ? 200 : 500,
      headers: { "Cache-Control": "no-store" },
    },
  );
}

export async function POST(req: Request) {
  const json = (await req.json().catch(() => null)) as {
    token?: string;
  } | null;
  const token = json?.token?.trim();
  if (!token) {
    return NextResponse.json(
      { ok: false, errors: ["missing-token"] },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }
  const result = await verifyTurnstile(token);
  return NextResponse.json(
    {
      ok: result.ok,
      errors: result.errors ?? [],
      secretLen: (process.env["TURNSTILE_SECRET_KEY"] ?? "").trim().length,
    },
    {
      status: result.ok ? 200 : 400,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
