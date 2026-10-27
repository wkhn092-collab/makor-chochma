# חומת אבטחה — מותאם לאתר לידים (מקור חכמה)

סקריפט 3 מודול א׳, מותאם: **אין סליקה, עגלה, OTP, Clerk, ביקורות עם העלאה**.

## תשובות תחקיר (מ־PROJECT_BRIEF)

| שאלה | תשובה נעולה |
|---|---|
| PII / Payments | לידים: שם+טלפון(+מייל) ב־Sanity פרטי + מייל. **אין סליקה באתר** |
| Sanity Studio | רק לאבישי · MFA מומלץ בחשבון Sanity |
| Webhooks סליקה | **אין** |
| צד ג׳ | Resend, Turnstile, GA4, Clarity, Cloudinary (וידאו), Sanity |
| גישות | אבישי מנהל · הרב לא עורך CMS |

## רמה א׳ — מה יושם / מה N/A

| # | נושא | סטטוס |
|---|---|---|
| 1 | Cart / Price tampering | **N/A** — אין מחירים |
| 2 | Payment webhooks | **N/A** |
| 3 | Headers + CSP-RO + proxy | ✅ `src/proxy.ts` + `next.config` |
| 4 | Rate limit לידים | ✅ IP + טלפון · Upstash כשמוגדר env, אחרת in-memory (`src/lib/rate-limit.ts`) |
| 5 | Input sanitize | ✅ שם/כותרות מייל |
| 6 | Secure Server Action | ✅ Zod + Origin + Turnstile + honeypot |
| 7 | IDOR / חשבונות | **N/A** — אין לקוחות מחוברים |
| 8 | Session / OTP | **N/A** |
| 9 | Env Zod | ✅ `src/lib/env.ts` |
| 10 | Sanity | ✅ write token שרת בלבד · אין PII בדאטהסט ציבורי |
| 11 | Payment / inventory | **N/A** |
| 12 | Cache private | ✅ `/api/*` no-store |
| 13 | XSS / redirects | ✅ בלי dangerouslySetInnerHTML · מייל escape |
| 14 | Bot | ✅ Turnstile + honeypot |
| 15 | Health | ✅ `/api/health` → OK |
| 16 | 2FA accounts | ⬜ נוהל ידני — `docs/ops-security-checklist.md` |

### מה כל שכבה מגנה / לא מגנה

| שכבה | מגנה מפני | לא מגנה מפני |
|---|---|---|
| Origin + Turnstile + honeypot | ספאם בסיסי, CSRF גס | בוט אנושי מתוחכם |
| Rate limit | הצפה מאותו IP/טלפון | התקפה מבוזרת (צריך WAF/Upstash) |
| Headers/HSTS/CSP-RO | Clickjack, sniff, חלק XSS | לוגיקת אפליקציה |
| Env + server-only | דליפת סודות ללקוח | סוד שדלף מ־Vercel/Git |

## Go-Live Gate (לידים)

- [ ] Turnstile פעיל בפרודקשן  
- [ ] Resend שולח לרב + CC  
- [ ] Sanity מקבל ליד (או מייל בלבד מתועד)  
- [ ] `/api/health` = OK  
- [ ] CSP-RO בלי שגיאות קריטיות בקונסול  
- [ ] `security.txt` עם URL אמיתי אחרי דומיין  
- [ ] 2FA על Vercel / GitHub / Sanity / Cloudflare / Resend  
