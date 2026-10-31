# צ׳קליסט שיגור — מכון מקור חכמה

סדר עבודה מומלץ אחרי סקריפט 2. סמנו ✅ כשבוצע.

## A. חשבונות (אבישי)

| # | שירות | פעולה | סטטוס |
|---|---|---|---|
| 1 | **Vercel** | פרויקט מהריפו / `vercel link` | ⬜ |
| 2 | **Resend** | API key + דומיין מאומת (או `onboarding@resend.dev` לבדיקה) | ⬜ |
| 3 | **Cloudflare Turnstile** | Site key + Secret · דומיין Vercel | ⬜ |
| 4 | **Sanity** | Project + dataset `production` + write token + סכמת `lead` | ⬜ |
| 5 | **GA4** | Measurement ID → `NEXT_PUBLIC_GA_ID` | ⬜ אופציונלי |
| 6 | **Clarity** | Project ID → `NEXT_PUBLIC_CLARITY_ID` | ⬜ אופציונלי |

## B. משתני Vercel

העתיקו מ־`.env.example`. חובה לפרודקשן:

- `RESEND_API_KEY` · `LEAD_FROM_EMAIL` · `LEAD_TO_EMAIL` · `LEAD_CC_EMAIL`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` · `TURNSTILE_SECRET_KEY`
- `NEXT_PUBLIC_SANITY_PROJECT_ID` · `NEXT_PUBLIC_SANITY_DATASET` · `SANITY_API_WRITE_TOKEN`
- `NEXT_PUBLIC_SITE_URL` = URL הפרודקשן

## C. נכסי לקוח (הרב)

| נכס | סטטוס |
|---|---|
| צילומים אמיתיים (תפילין, מזוזות, מגילה, ס״ת, סדנה) | ⬜ מחכים — עד אז «הדמיה» |
| סריקות תעודות (משמרת סת״ם · יד רפאל) | ⬜ |
| דומיין סופי | ⬜ TBD |

## D. בדיקות אחרי Deploy

ראה `DEPLOY.md` §7.

## E. שער Go-Live (Script 5)

- [x] Lighthouse מובייל (localhost) — LCP 1.3s · CLS 0 · a11y 100 · `docs/web-vitals-baseline.md`
- [x] a11y Lighthouse @ mobile (localhost) — `docs/a11y-baseline.md` · axe על פרוד אחרי deploy
- [ ] Lighthouse חוזר מול URL הפרוד אחרי deploy של התיקונים
- [x] CSP Enforce עם nonce (`Content-Security-Policy` + `x-nonce` מ־`proxy.ts`)
- [ ] החלפת תמונות הדמיה בצילומי לקוח
- [ ] GMB קישור אם יש דירוג אמיתי
- [ ] 2FA ספקים — `docs/ops-security-checklist.md`
