"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { useNonce } from "@/components/NonceProvider";

const CONSENT_KEY = "mc-analytics-consent";

export type ConsentValue = "accepted" | "declined" | "unknown";

export function readAnalyticsConsent(): ConsentValue {
  if (typeof window === "undefined") return "unknown";
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    if (v === "1") return "accepted";
    if (v === "0") return "declined";
    return "unknown";
  } catch {
    return "unknown";
  }
}

export function writeAnalyticsConsent(accepted: boolean) {
  try {
    window.localStorage.setItem(CONSENT_KEY, accepted ? "1" : "0");
    window.dispatchEvent(new Event("mc-analytics-consent"));
  } catch {
    /* private mode */
  }
}

function subscribeConsent(onStoreChange: () => void) {
  window.addEventListener("mc-analytics-consent", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("mc-analytics-consent", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

/** Loads GA4 / Clarity only after explicit analytics consent. */
export function Analytics() {
  const nonce = useNonce();
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const clarity = process.env.NEXT_PUBLIC_CLARITY_ID;
  const consent = useSyncExternalStore(
    subscribeConsent,
    readAnalyticsConsent,
    () => "unknown" as ConsentValue,
  );

  if (consent !== "accepted") return null;
  if (!ga && !clarity) return null;

  return (
    <>
      {ga ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="lazyOnload"
            nonce={nonce}
          />
          <Script id="ga4" strategy="lazyOnload" nonce={nonce}>
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}
          </Script>
        </>
      ) : null}
      {clarity ? (
        <Script id="clarity" strategy="lazyOnload" nonce={nonce}>
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarity}");`}
        </Script>
      ) : null}
    </>
  );
}
