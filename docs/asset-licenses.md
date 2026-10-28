# רישוי נכסים — מכון מקור חכמה

> Script 5 · סעיף 1.40 · עודכן 28.10.2026  
> **אין נכסי 3D / Image Sequence / WebGL** (`docs/3d-module.md`).  
> **חוק רמזור:** רק CC0 / CC-BY / נכס לקוח מאושר. אסור NC / Editorial בלי רישיון מסחרי.

---

## 1. נכסי לקוח (מאושרים לשימוש עסקי)

| נכס | מקור | רישיון | הוכחה |
|---|---|---|---|
| `public/logo.jpg` | הלקוח (WhatsApp) | שימוש עסקי מאושר ללקוח | מסירה ישירה · מוצג ב־Header/Footer/`apple` icon |
| סרטוני המלצות (7) — Cloudinary | הלקוח WhatsApp → `res.cloudinary.com/ab7zmaca/...` | שימוש עסקי מאושר | URLs ב־`src/content/testimonials.ts` · עותקים מקומיים אופציונליים ב־`public/videos/testimonials/` |
| `public/videos/testimonials/*.mp4` | אותם קבצי לקוח (גיבוי מקומי) | שימוש עסקי מאושר | שמות: ariel-harar, sharabi, tziona-iraqi, yaakov, aviv, lior, shul-community |

**צילומי מסך CC:** לא רלוונטי לנכסי לקוח (אין רישיון צד־ג׳). האישור = מסירת הקבצים מהרב/אבישי לשימוש באתר.

---

## 2. תמונות בשימוש ב־UI (`SITE_IMAGES` + חריגים)

כל השורות כאן מסומנות ב־UI ב־`SimulationBadge` («צילום להמחשה») עד החלפה בצילומי מכון.

| נתיב | שימוש בקוד | מקור / סטטוס רישיון | פעולה נדרשת לפני Go-Live |
|---|---|---|---|
| `/images/hero-lcp.webp` | Hero LCP | הדמיה זמנית · **לא** נטען כ־CC0 מתועד | החלף בצילום לקוח **או** צרף URL+צילום רישיון ל־`docs/licenses/` |
| `/images/about-lcp.webp` | About | הדמיה זמנית | כנ״ל |
| `/images/tefillin-v8.jpg` | Portfolio / Services / HeroFan | הדמיה זמנית | כנ״ל |
| `/images/mezuzah-real-v3.jpg` | Portfolio / Services / HeroFan | הדמיה זמנית | כנ״ל |
| `/images/megillah-v7.jpg` | Portfolio / Services / HeroFan | הדמיה זמנית | כנ״ל |
| `/images/sefer-sephardi-v7.jpg` | Portfolio / HeroFan | הדמיה זמנית | כנ״ל |
| `/images/pitum-klaf-v5.jpg` | Services (pitum) | הדמיה זמנית | כנ״ל |
| `/images/megillah-yad-v6.jpg` | FAQ side + StatsMoment BG | הדמיה זמנית | כנ״ל |
| `/images/footer-cta-bg-v1.jpg` | Footer band | הדמיה זמנית | כנ״ל |
| `/images/craft/01-consult.jpg` | Craft roadmap / HeroFan | הדמיה זמנית | כנ״ל |
| `/images/craft/02-ink.jpg` | Craft roadmap / HeroFan | הדמיה זמנית | כנ״ל |
| `/images/craft/03-proof.jpg` | Craft roadmap / HeroFan | הדמיה זמנית | כנ״ל |
| `/images/craft/04-meeting.jpg` | Craft + LeadSection | הדמיה זמנית | כנ״ל |

**אין טענת CC0/CC-BY באתר** על התמונות לעיל — הן placeholders עם badge.  
**צילומי רישיון CC:** אין קבצים תחת `docs/licenses/` כי אין נכס צד־ג׳ שנטען כרגע כ־licensed stock. כשיתווסף נכס CC — חובה: קישור מקור + צילום מסך של דף הרישיון ב־`docs/licenses/<asset-id>.png|jpg` + שורה בטבלה.

---

## 3. תיקיות ארכיון (לא ב־UI הפעיל)

קבצים תחת הנתיבים הבאים **אינם** מקושרים מ־`SITE_IMAGES` / רכיבי הפרודקשן הנוכחיים. לא מוצגים לגולש. לא נטענים כ־CC באתר.

| תיקייה | הערה |
|---|---|
| `public/images/premium/` | ניסויי Unsplash/Pexels וכו׳ — **ארכיון** · לא לינק בקוד |
| `public/images/real/` | מועמדים / ניסויים — **ארכיון** |
| `public/images/*` גרסאות ישנות (`tefillin-v2`…`v7`, `megillah-*` שאינם בטבלה §2, וכו׳) | שאריות פיתוח — לא ב־`SITE_IMAGES` |

מומלץ לפני שיגור: למחוק או להעביר מחוץ ל־`public/` כדי שלא ייחשפו ב־URL ישיר.

---

## 4. נכסי מערכת / מותג טכני

| נכס | רישיון |
|---|---|
| `src/app/favicon.ico` | נגזר ממותג הלקוח / Next app icon |
| `src/app/opengraph-image.tsx` | נוצר בקוד (צבעי Quiet Luxury) — אין תמונת צד־ג׳ |
| `public/next.svg`, `vercel.svg`, `globe.svg`, `file.svg`, `window.svg` | ברירת Next scaffold — לא בשימוש שיווקי ב־UI |

---

## 5. 3D / Immersive

| נכס | סטטוס |
|---|---|
| מודלי GLTF/GLB | אין |
| Image Sequence frames | אין |
| HDRI / Lightmaps | אין |

נימוק: `docs/3d-module.md`.

---

## 6. תעודות (ממתין)

| נכס | סטטוס |
|---|---|
| תמונות תעודות משמרת סת״ם / יד רפאל | ממתין ללקוח · כרגע טקסט בלבד ב־About |

---

## 7. נוהל הוספת נכס CC0 / CC-BY

1. שמור את הקובץ תחת `public/images/…`  
2. הוסף שורה בטבלה §2 עם URL המקור  
3. שמור צילום מסך של דף הרישיון ב־`docs/licenses/<id>.png`  
4. ודא שהרישיון **לא** NC / Editorial בלבד  
5. הסר `SimulationBadge` רק אם זה צילום לקוח אמיתי או CC מאושר ומתועד
