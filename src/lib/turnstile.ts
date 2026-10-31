import "server-only";

export async function verifyTurnstile(
  token: string | undefined,
  _ip?: string | null,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Dev / unset: allow only when site key also missing
    if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return true;
    return false;
  }
  if (!token) {
    console.error("[turnstile] missing token");
    return false;
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  // Omit remoteip — mismatched/proxy IPs cause false failures on Vercel

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body, headers: { "content-type": "application/x-www-form-urlencoded" } },
  );
  if (!res.ok) {
    console.error("[turnstile] siteverify HTTP", res.status);
    return false;
  }
  const data = (await res.json()) as {
    success?: boolean;
    "error-codes"?: string[];
  };
  if (!data.success) {
    console.error("[turnstile] siteverify failed", data["error-codes"] ?? data);
  }
  return Boolean(data.success);
}
