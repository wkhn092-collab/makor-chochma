import "server-only";

export async function verifyTurnstile(
  token: string | undefined,
  ip?: string | null,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Dev / unset: allow only when site key also missing
    if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return true;
    return false;
  }
  if (!token) return false;

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (ip) body.set("remoteip", ip);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body, headers: { "content-type": "application/x-www-form-urlencoded" } },
  );
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}
