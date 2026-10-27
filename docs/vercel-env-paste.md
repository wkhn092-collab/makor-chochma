# משתני סביבה להדבקה ב־Vercel

Project → Settings → Environment Variables → Production (+ Preview).

| Key | Value (מילוי) | חובה |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://YOUR-PROJECT.vercel.app` (אחר כך דומיין) | כן |
| `RESEND_API_KEY` | מ־Resend | כן לפרודקשן |
| `LEAD_FROM_EMAIL` | דומיין מאומת / זמנית `onboarding@resend.dev` | כן |
| `LEAD_TO_EMAIL` | `y0548462387@gmail.com` | כן |
| `LEAD_CC_EMAIL` | מייל אבישי | מומלץ |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile | כן |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile | כן |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity | מומלץ |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | מומלץ |
| `SANITY_API_WRITE_TOKEN` | Sanity Editor write | מומלץ |
| `NEXT_PUBLIC_GA_ID` | כשיהיה | אופציונלי |
| `NEXT_PUBLIC_CLARITY_ID` | כשיהיה | אופציונלי |

בלי Turnstile בפרודקשן — הטופס ייחסם (בכוונה).  
בלי Resend — לידים לא יישלחו במייל.
