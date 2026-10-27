"use client";

import { useEffect } from "react";
import Link from "next/link";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error("[app:error]", error.digest ?? error.message);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="font-display text-2xl font-bold text-ink">משהו השתבש</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink/70">
        אפשר לנסות שוב, או לחזור לדף הבית. אם זה חוזר — התקשרו אלינו.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={reset} className="btn-primary !min-h-11 px-6 text-sm">
          נסו שוב
        </button>
        <Link href="/" className="btn-secondary !min-h-11 px-6 text-sm">
          לדף הבית
        </Link>
      </div>
    </div>
  );
}
