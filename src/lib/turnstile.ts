import "server-only";

export type TurnstileVerifyResult = {
  ok: boolean;
  errors?: string[];
};

function cleanSecret(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  // Trim whitespace and accidental pasted "\n" / quotes from Vercel UI
  return raw
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\\n$/g, "")
    .replace(/\r?\n/g, "")
    .trim();
}

export async function verifyTurnstile(
  token: string | undefined,
  _ip?: string | null,
): Promise<TurnstileVerifyResult> {
  const secret = cleanSecret(process.env.TURNSTILE_SECRET_KEY);
  const siteKey = cleanSecret(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  if (!secret) {
    if (!siteKey) return { ok: true };
    console.error("[turnstile] TURNSTILE_SECRET_KEY missing/empty after clean");
    return { ok: false, errors: ["missing-input-secret"] };
  }
  if (!token?.trim()) {
    console.error("[turnstile] missing token");
    return { ok: false, errors: ["missing-input-response"] };
  }

  if (siteKey && secret === siteKey) {
    console.error("[turnstile] secret equals site key — keys swapped");
    return { ok: false, errors: ["secret-equals-sitekey"] };
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token.trim());

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
      headers: { "content-type": "application/x-www-form-urlencoded" },
    },
  );
  if (!res.ok) {
    console.error("[turnstile] siteverify HTTP", res.status);
    return { ok: false, errors: [`http-${res.status}`] };
  }
  const data = (await res.json()) as {
    success?: boolean;
    "error-codes"?: string[];
  };
  if (!data.success) {
    console.error("[turnstile] siteverify failed", data["error-codes"] ?? data);
    return { ok: false, errors: data["error-codes"] ?? ["unknown"] };
  }
  return { ok: true };
}
