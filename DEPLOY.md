# פריסה — מכון מקור חכמה (Vercel)

## 1. הכנה

1. צרו פרויקט ב־Vercel מהריפו `makor-chochma`.
2. Framework Preset: **Next.js**.
3. העתיקו משתנים מ־`.env.example` ל־Project Settings → Environment Variables.

## 0. וידאו CDN — Cloudinary

אל תעלו MP4 ל־Vercel. מארחים ב־**Cloudinary** (`https://console.cloudinary.com/`):

1. העלו כל סרטון → העתיקו את ה־URL מ־`res.cloudinary.com/...`
2. הדביקו כ־`src` מלא ב־`src/content/testimonials.ts`
3. סרטון ראשון (חלוץ): כבר מחובר  
   `https://res.cloudinary.com/ab7zmaca/video/upload/v1793021591/WhatsApp_Video_2026-10-25_at_20.50.30.mp4`

## 2. משתני סביבה חובה לפרודקשן

| משתנה | תפקיד |
|---|---|
| `RESEND_API_KEY` | שליחת לידים |
| `LEAD_FROM_EMAIL` | דומיין מאומת ב־Resend |
| `LEAD_TO_EMAIL` | `y0548462387@gmail.com` |
| `LEAD_CC_EMAIL` | מייל אבישי |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile |
| `TURNSTILE_SECRET_KEY` | אימות שרת |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | שמירת לידים |
| `NEXT_PUBLIC_SANITY_DATASET` | בדרך כלל `production` |
| `SANITY_API_WRITE_TOKEN` | token עם create |
| `NEXT_PUBLIC_SITE_URL` | URL פרודקשן (CORS/metadata) |
| `LEAD_ALLOW_DEGRADED` | אופציונלי · `true` רק לשיגור רך בלי Resend/Turnstile (ברירת מחדל: fail-closed) |
| `NEXT_PUBLIC_GA_ID` | אופציונלי |
| `NEXT_PUBLIC_CLARITY_ID` | אופציונלי |

**פרודקשן:** בלי `RESEND_API_KEY` או Sanity write, ובלי Turnstile — `submitLead` מחזיר שגיאת שרת (אלא אם `LEAD_ALLOW_DEGRADED=true`).

## 3. Resend

1. אמתו דומיין או השתמשו זמנית ב־`onboarding@resend.dev` (רק לבדיקות).
2. בפרודקשן — דומיין של הלקוח אחרי רכישה.

## 4. Turnstile

1. צרו widget ב־Cloudflare Dashboard (Managed).
2. הוסיפו את הדומיין של Vercel + דומיין סופי.

## 5. Sanity

1. צרו פרויקט Sanity.
2. הוסיפו את סכמת `sanity/schemaTypes/lead.ts`.
3. צרו token עם הרשאת Editor/create.
4. Studio יכול לרוץ בנפרד — רק לאבישי.

## 6. CORS / דומיין

- אין API ציבורי חוץ מ־Server Actions (same-origin).
- אחרי שהלקוח מעדכן דומיין: חברו ב־Vercel Domains + עדכנו Turnstile + `NEXT_PUBLIC_SITE_URL`.
- CSP כרגע **Report-Only** — אחרי שבוע יציב עברו ל־Enforce ב־`next.config.ts`.

## 7. בדיקות אחרי שיגור

- [ ] שליחת טופס מגיעה למייל הרב + CC
- [ ] ליד מופיע ב־Sanity
- [ ] Turnstile חוסם בוט
- [ ] וואטסאפ נפתח עם טקסט
- [ ] `/en` · `/accessibility` · `/privacy`
- [ ] מובייל 375px: sticky לא חופף ל־WA
- [ ] תג «הדמיה» על Hero

## 8. KPIs

1. `lead_submit`  
2. `whatsapp_click`  
3. צפייה בתעודות (Clarity / ידני)  
4. `form_section_view`  
5. `locale_switch`
