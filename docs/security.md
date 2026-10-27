# Security Map — מכון מקור חכמה

> Baseline לאתר לידים · 26.10.2026

## עקרונות

1. **Server-Side Truth** — אין מחירים/מלאי; האמת היחידה על ליד היא בשרת + Sanity.
2. **Client State Hygiene** — Zustand: `interest` בלבד. אסור שם/טלפון ב־localStorage.
3. **Secrets** — כל קובץ עם מפתחות: `import 'server-only'`.
4. **GROQ** — שאילתות עם `$params` בלבד; אין שליפת לידים מ־Client Component.
5. **Validation** — Zod על כל קלט ליד (שם, טלפון IL, interest enum, turnstile token).
6. **Authorization** — Sanity Studio לאבישי בלבד; אין route ציבורי ל־GET leads.

## משטח התקפה → בקרה

| משטח | סיכון | בקרה |
|---|---|---|
| טופס ליד | ספאם / בוטים | Turnstile + rate limit + honeypot משני אופציונלי |
| טופס ליד | הזרקת שדות | Zod strip + allowlist interest |
| מייל | דליפת מפתח Resend | server-only + Vercel env |
| Sanity | גישה ללידים | token כתיבה רק בשרת; studio מאובטח |
| XSS | תוכן משתמש באימייל | escape / טקסט בלבד בתבנית |
| Open redirect | N/A כמעט | allowlist אם יתווסף |
| CSP | XSS צד שלישי | Report-Only → Enforce; YouTube/Clarity/Turnstile ב־allowlist |
| Analytics | פרטיות | מדיניות `/privacy`; ללא PII באירועי GA |

## Headers (מתוכננים)

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` מצמצם
- CSP Report-Only בשיגור

## מה לא רלוונטי עדיין

Checkout, webhooks תשלום, IDOR על הזמנות לקוח, OTP — אין מודול ב׳ בשלב זה.
