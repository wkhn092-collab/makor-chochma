"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

/** Root-level boundary — must include its own html/body (outside root layout). */
export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error("[app:global-error]", error.digest ?? error.message);
  }, [error]);

  return (
    <html lang="he" dir="rtl">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#f7f4ef",
          color: "#1a1814",
        }}
      >
        <div
          style={{
            maxWidth: 480,
            margin: "0 auto",
            padding: "5rem 1rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>משהו השתבש</h1>
          <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", opacity: 0.75 }}>
            נסו לרענן את העמוד. אם הבעיה נמשכת — פנו אלינו בטלפון או בוואטסאפ.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              padding: "0.65rem 1.25rem",
              background: "#0a0a0a",
              color: "#f7f4ef",
              border: "none",
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            נסו שוב
          </button>
        </div>
      </body>
    </html>
  );
}
