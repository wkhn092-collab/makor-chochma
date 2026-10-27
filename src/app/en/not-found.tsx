import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-display text-5xl font-bold text-gold">404</p>
      <h1 className="font-display mt-4 text-2xl font-bold text-ink">Page not found</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink/70">
        This address doesn’t exist or has moved. Return home or leave details for a call.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/en" className="bg-ink px-4 py-2.5 text-sm font-medium text-parchment">
          Home
        </Link>
        <Link
          href="/en#lead"
          className="border border-ink/20 bg-surface px-4 py-2.5 text-sm font-medium text-ink"
        >
          Book a call
        </Link>
      </div>
    </div>
  );
}
