# נוהל אבטחה תפעולי — מכון מקור חכמה

> סקריפט 3 · רמה א׳ פריטים 3.10 / 3.14 / 3.16 · 27.10.2026  
> מה שלא ניתן לאמת מהקוד — נסגר כאן ידנית לפני Go-Live מלא.

---

## A. מפתחות פרוד (3.14)

| משתנה | סטטוס יעד |
|---|---|
| `RESEND_API_KEY` + `LEAD_*` | חובה — מייל לרב + CC |
| `TURNSTILE_*` | חובה — בוט |
| `NEXT_PUBLIC_SITE_URL` | חובה — Origin |
| `SANITY_*` / write token | מומלץ (או מייל בלבד מתועד) |
| `LEAD_ALLOW_DEGRADED` | **לא** בפרוד רגיל |

בדיקה: שליחת טופס אמיתית → מייל + (אופציונלי) מסמך Sanity.

---

## B. Sanity Hardening (3.10)

- [ ] Dataset ללידים: הרשאות מצומצמות; Studio רק לאבישי  
- [ ] CORS / API: רק דומיין הפרוד (אחרי דומיין מותאם)  
- [ ] Token כתיבה = Editor/create בלבד, רק ב־Vercel env (לא בריפו)  
- [ ] MFA על חשבון Sanity של אבישי  
- [ ] אין GROQ קריאה ללידים מהקליינט (כרגע: create בלבד בשרת)

---

## C. 2FA על ספקים (3.16)

| חשבון | 2FA |
|---|---|
| GitHub (ריפו) | חובה |
| Vercel (פרויקט) | חובה |
| Sanity | חובה |
| Cloudflare (Turnstile) | חובה |
| Resend | חובה |
| Cloudinary (וידאו) | מומלץ |

- [ ] Branch protection על `main` (PR / checks)  
- [ ] Deployment Protection / מי מוסמך לפרוס  

---

## D. CSP (3.3) — מסלול Enforce

1. עכשיו: CSP **Report-Only** (בלי `unsafe-eval`).  
2. אחרי שבוע יציב בפרוד בלי שגיאות קריטיות בקונסול → Enforce + תכנון nonce.  
3. קובץ: `next.config.ts` · הערות ב־`DEPLOY.md`.

---

## E. Rate limit (3.5)

- ברירת מחדל: in-memory  
- פרוד מומלץ: `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`  
- מימוש: `src/lib/rate-limit.ts`
