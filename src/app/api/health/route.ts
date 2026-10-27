import { NextResponse } from "next/server";

/** Liveness only — no versions, env, or internals */
export function GET() {
  return new NextResponse("OK", {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
