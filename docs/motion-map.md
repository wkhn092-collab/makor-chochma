# מודול א׳-3 — מנוע תנועה · מכון מקור חכמה

> לאישור לפני קוד · 26.10.2026  
> כיוון: «קלף ודיו» · Tier 1+ · HE/RTL  
> מתכונים מהספר: A01–A05, A10, A18, A29–A32, A35 · בלי A21–A28 (WebGL)

---

## חוקי ברזל

1. מנפישים **רק** `transform` + `opacity` (+ CSS vars מספריות ל־counter).
2. יעד **60FPS** · חישובים כבדים — לא רלוונטי (אין sequence).
3. **LCP קודם:** פוסטר Hero נראה מיד — **בלי** opacity fade-in על LCP.
4. תנועה **לא חוסמת** לחיצה (`pointer-events` תקינים תמיד על CTA).
5. **אין Scroll-Jacking** — Pin קל מותר; מהירות גלילה של המשתמש לא נשברת.
6. `prefers-reduced-motion: reduce` → בלי stagger/counter אנימציה; תוכן מלא מיד.
7. **מובייל:** בלי magnetic · בלי Lenis חובה · מרחקי parallax מופחתים ×0.4.
8. **RTL:** כניסות אופקיות מ־`x: +24` (מימין) בדסקטופ; SplitText עם כיוון עברית.

---

## 1. טוקני Easing

| Token | Value | שימוש |
|---|---|---|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Reveals ראשיים, sticky CTA |
| `--ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` | עליית מקטעים |
| `--ease-in-out-soft` | `cubic-bezier(0.45, 0, 0.55, 1)` | Hover settle |
| GSAP default | `power3.out` · `0.85s` | ScrollTrigger enters |
| Micro | `0.25s–0.35s` | Hover כפתור / float WA |
| Stagger copy | `0.1s–0.14s` | שורות / מילים |
| Stagger cards | `0.12s–0.16s` | 4 שירותים |
| Counter | `1.4s` · `power2.out` | 0 → 32 |

**אסור:** `ease` / `ease-in-out` לינארי על Hero או H1.

```ts
gsap.defaults({ ease: "power3.out", duration: 0.85 });
```

**Preset שם:** `sofer` (שקט, סמכות, מרחק קטן מ־`studio` של Aura)

| | sofer |
|---|---|
| distance Y | `28–40px` (לא 80 — פחות דרמטי, יותר מכובד) |
| duration | `0.85s` |
| lerp (אם Lenis) | `0.08` דסקטופ בלבד, אופציונלי |

---

## 2. התנהגויות גלובליות

| התנהגות | מפרט | מובייל |
|---|---|---|
| Sticky CTA | מופיע אחרי יציאה מ־Hero (`scrollY > heroHeight − 40`) · `y: 16→0` + opacity · backdrop blur | תחתית מסך; לא חופף ל־WA |
| WhatsApp float | תמיד visible אחרי 1.2s מ־load (או מיד ב־reduced) · pulse עדין `scale 1→1.04` loop איטי **רק** אם לא reduced | שמאל תחתון (RTL: physically left/start — `inset-inline-start`) מעל sticky ב־`bottom` מדורג |
| Magnetic / custom cursor | **לא בונים** (Tier 3) | — |
| Lenis | **אופציונלי דסקטופ בלבד**; ברירת מחדל v1 = native + ScrollTrigger | כבוי |
| Kinetic SplitText | H1: **InkReveal** (overflow clip + `yPercent`, RTL-safe) · `immediate` אחרי LCP · `SplitReveal` זמין ל־EN/chars | במובייל: אותו mask, בלי split אותיות |
| Section Pin | **רק** מקטע «32 שנה» — pin קצר (~80–100vh) בזמן שהמספר רץ; בלי jacking | בלי pin; counter on enter |

---

## 3. מפת תנועה לפי מקטע (עמוד הבית)

### Hero (`S01`)
| Beat | Trigger | Animation |
|---|---|---|
| LCP image | Load | נראית מיד · **אין fade** |
| תג «הדמיה» | Load | סטטי |
| לוגו | `DOMContentLoaded` + fonts | opacity 0→1 · y 12→0 · 0.5s · אחרי LCP |
| H1 | אחרי לוגו / `+0.15s` | SplitReveal מילים · mask · `--ease-out-expo` · 0.9s |
| H2 | stagger אחרי H1 | y 20→0 · opacity |
| CTAs | stagger +0.12s | y 16→0 · opacity · **לחיצים מהפריים הראשון של הופעה** |
| Trust strip | +0.2s או scroll 10% | fade+y קל |

### אודות + תעודות
| Beat | Trigger | Animation |
|---|---|---|
| כותרת | top 78% | Reveal |
| פסקה | top 75% | y+opacity |
| כרטיסי תעודה | top 72% | stagger 0.14s · y 28→0 |
| **Counter 32** | enter + pin קל בדסקטופ | מספר מ־0 ל־32 · CSS var או textContent ב־rAF קל · `will-change: contents` בזהירות |

### שירותים
| Beat | Trigger | Animation |
|---|---|---|
| 4 כרטיסים | top 75% | stagger · y 32→0 |
| בחירת עניין | click/tap | `scale 0.98→1` + מסגרת accent · 0.25s · מעדכן Zustand |
| Hover (fine pointer) | hover | `translateY(-2px)` בלבד |

### ממליצים
| Beat | Trigger | Animation |
|---|---|---|
| Placeholder / קרוסלה | top 80% | fade block |
| אם יש iframe | lazy load on near-view | אין אנימציית opacity על iframe עצמו (ביצועים) |

### FAQ
| Beat | Trigger | Animation |
|---|---|---|
| פריטים | top 80% | stagger קצר |
| פתיחת תשובה | click | `grid-template-rows` / height — **או** max-height; עדיף `transform` על אייקון `rotate` + opacity תוכן |

### טופס ליד
| Beat | Trigger | Animation |
|---|---|---|
| בלוק טופס | top 75% | y+opacity |
| הצלחה | submit ok | הודעה y 8→0 · צבע success · **בלי confetti כבד** |
| שגיאה | validation | shake עדין `x: ±4` ×2 · 0.3s |

### `/accessibility` · `/privacy`
| Beat | | |
|---|---|---|
| | ללא motion מיוחד | fade קל לכותרת או סטטי |

### `/en`
אותו מפה · LTR · כניסות `x: -24` במקום +24.

---

## 4. ביצועים

| כלל | פירוט |
|---|---|
| Composite only | transform/opacity |
| תמונות | WebP · sizes · priority רק על Hero LCP |
| ScrollTrigger | `scrub` רק אם צריך; רוב = `toggleActions` once |
| יוטיוב | `loading=lazy` · facades (thumbnail כפתור) עד קליק — **מומלץ** |
| חבילה | בלי Three / Curtains / Lenis אם לא אושר במפורש בפריסה |

---

## 5. מה לא בונים (מידתיות)

| פיצ׳ר | נימוק |
|---|---|
| Image Sequence / WebGL | Tier 1+ · תקציב · אין מוצר לסקרול |
| Custom magnetic cursor | Tier 3 · מובייל־פירסט ישראלי |
| Scroll-jack wheel | חוק ברזל |
| Confetti / particles בליד | לא תואם V12 |

---

## 6. מודול 3D — סטטוס רשמי

**Path: None.** אין Pipeline A/B/C.  
אין רכש GLB/Sequence. אין Worker לפריימים.  
תיעוד: `docs/3d-module.md`.

---

## אישור נדרש

אחרי אישור מפה זו → מותרת **כתיבת קוד הליבה** (מודול א׳ שלב 3).
