# מכון מקור חכמה

דף נחיתה לידים (עברית ברירת מחדל + `/en`) לסופר סת״ם הרב יגאל עמרני.

**משפך:** אתר → שיחת טלפון → פגישה באלעד → סגירת עסקה (אין סליקה באתר).

## פיתוח מקומי

```bash
npm install
cp .env.example .env.local
npm run dev
```

בלי מפתחות Resend/Sanity/Turnstile — הטופס עובד במצב פיתוח (לוג לקונסול).

## מסמכים

- `PROJECT_BRIEF.md` — זיכרון פרויקט
- `docs/architecture.md` · `docs/copy-deck.md` · `docs/motion-map.md`
- `DEPLOY.md` — פריסת Vercel

## Stack

Next.js 16 · Tailwind 4 · Zustand · Zod · GSAP · Resend · Sanity (לידים) · Turnstile
