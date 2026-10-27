"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import type { Copy } from "@/content/copy";
import { INTERESTS, interestLabel, SITE, type InterestId } from "@/content/site";
import { useLeadUi } from "@/store/lead-ui";
import { submitLead } from "@/actions/submit-lead";
import { SecondaryInterestHint } from "@/components/SecondaryInterestHint";
import { waPrefill, whatsappUrl } from "@/lib/whatsapp";
import clsx from "clsx";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
        },
      ) => string;
      reset: (id?: string) => void;
    };
  }
}

type Props = { copy: Copy };

export function LeadForm({ copy }: Props) {
  const interest = useLeadUi((s) => s.interest);
  const secondaryInterest = useLeadUi((s) => s.secondaryInterest);
  const setInterest = useLeadUi((s) => s.setInterest);
  const setSecondaryInterest = useLeadUi((s) => s.setSecondaryInterest);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !widgetRef.current) return;
    const mount = () => {
      if (!window.turnstile || !widgetRef.current || widgetId.current) return;
      widgetId.current = window.turnstile.render(widgetRef.current, {
        sitekey: siteKey,
        callback: (t) => setToken(t),
        "expired-callback": () => setToken(undefined),
      });
    };
    if (window.turnstile) {
      mount();
      return;
    }
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = mount;
    document.body.appendChild(s);
  }, [siteKey]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget as HTMLFormElement;
    const hpEl = form.querySelector<HTMLInputElement>("#company-website");
    const honeypot = hpEl?.value ?? "";
    const selected: InterestId = interest ?? "general";
    const secondary =
      secondaryInterest && secondaryInterest !== selected
        ? secondaryInterest
        : undefined;
    startTransition(async () => {
      const result = await submitLead({
        name,
        phone,
        email,
        interest: selected,
        secondaryInterest: secondary ?? null,
        locale: copy.locale,
        turnstileToken: token,
        companyWebsite: honeypot,
      });
      if (result.ok) {
        setSuccess(true);
        setName("");
        setPhone("");
        setEmail("");
        setSecondaryInterest(null);
        if (typeof window !== "undefined" && "gtag" in window) {
          (window as unknown as { gtag: (...a: unknown[]) => void }).gtag(
            "event",
            "lead_submit",
            {
              interest: selected,
              secondary_interest: secondary ?? undefined,
            },
          );
        }
        return;
      }
      if (result.code === "validation" && result.field === "phone") {
        setError(copy.form.errorPhone);
      } else if (result.code === "validation" && result.field === "email") {
        setError(copy.form.errorEmail);
      } else if (result.code === "bot") {
        setError(copy.form.errorBot);
        window.turnstile?.reset(widgetId.current ?? undefined);
      } else if (result.code === "rate") {
        setError(copy.form.errorRate);
      } else {
        setError(copy.form.errorGeneric);
      }
    });
  }

  if (success) {
    const label = interestLabel(interest, copy.locale);
    const secondaryLabel =
      secondaryInterest && secondaryInterest !== interest
        ? interestLabel(secondaryInterest, copy.locale)
        : null;
    const waHref = whatsappUrl(
      waPrefill(copy.locale, label, secondaryLabel),
    );
    const telHref = `tel:+${SITE.phoneE164}`;
    return (
      <div
        className="rounded-[var(--radius-md)] border border-success/30 bg-surface p-6 shadow-contact"
        role="status"
      >
        <p className="text-success">{copy.form.success}</p>
        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
          <a
            href={telHref}
            data-analytics="phone_click"
            className="btn-primary w-full sm:w-auto"
          >
            {copy.form.successCall}
            <span className="ms-1.5 opacity-80" dir="ltr">
              <bdi>{SITE.phoneDisplay}</bdi>
            </span>
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics="whatsapp_click"
            className="btn-secondary w-full sm:w-auto"
          >
            {copy.form.successWa}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-4" noValidate>
      {/* Honeypot — hidden from humans */}
      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden
      >
        <label htmlFor="company-website">Website</label>
        <input
          id="company-website"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <div>
        <label htmlFor="lead-name" className="mb-1 block text-sm font-medium">
          {copy.form.name}
        </label>
        <input
          id="lead-name"
          name="name"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-[var(--radius-md)] border border-stone bg-surface px-4 py-3 text-ink outline-none ring-accent focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="lead-phone" className="mb-1 block text-sm font-medium">
          {copy.form.phone}
        </label>
        <input
          id="lead-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          dir="ltr"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-[var(--radius-md)] border border-stone bg-surface px-4 py-3 text-ink outline-none ring-accent focus:ring-2"
          placeholder="05X-XXX-XXXX"
        />
      </div>
      <div>
        <label htmlFor="lead-email" className="mb-1 block text-sm font-medium">
          {copy.form.email}
        </label>
        <input
          id="lead-email"
          name="email"
          type="email"
          autoComplete="email"
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-[var(--radius-md)] border border-stone bg-surface px-4 py-3 text-ink outline-none ring-accent focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="lead-interest" className="mb-1 block text-sm font-medium">
          {copy.form.interest}
        </label>
        <select
          id="lead-interest"
          value={interest ?? "general"}
          onChange={(e) => setInterest(e.target.value as InterestId)}
          className="w-full rounded-[var(--radius-md)] border border-stone bg-surface px-4 py-3 text-ink outline-none ring-accent focus:ring-2"
        >
          {INTERESTS.map((i) => (
            <option key={i.id} value={i.id}>
              {copy.locale === "he" ? i.he : i.en}
            </option>
          ))}
        </select>
        <SecondaryInterestHint copy={copy} primary={interest ?? "general"} />
      </div>

      {siteKey ? (
        <div ref={widgetRef} />
      ) : (
        process.env.NODE_ENV !== "production" && (
          <p className="text-xs text-bronze">{copy.form.turnstileMissing}</p>
        )
      )}

      {error && (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={clsx("btn-primary w-full", pending && "opacity-70")}
      >
        {pending ? copy.form.submitting : copy.form.submit}
      </button>
      <p className="text-center text-xs leading-relaxed text-bronze">
        {copy.locale === "he"
          ? "שיחה בלי התחייבות · בלי מחיר באתר · כ־15 דקות · נחזור לתיאום"
          : "No-obligation call · no prices on the site · ~15 min · we’ll schedule"}
      </p>

      <p className="text-xs text-bronze">
        {copy.form.privacy}{" "}
        <a
          href={copy.locale === "he" ? "/privacy" : "/en/privacy"}
          className="underline underline-offset-2"
        >
          {copy.form.privacyLink}
        </a>
        .
      </p>

      <a
        href={SITE.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-sm text-ink underline-offset-2 hover:underline"
      >
        {copy.form.maps}
      </a>
    </form>
  );
}
