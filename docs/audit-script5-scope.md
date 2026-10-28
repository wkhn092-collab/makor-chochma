# Script 5 · Scope exclusions (lead-gen Tier 1+)

> ננעל מול `PROJECT_BRIEF.md` · מודל: **לידים בלבד** — אין מחירים, אין סליקה, אין עגלה.  
> סעיפי סקריפט 5 שנדרשים לחנות $100K ומסומנים כאן = **לא רלוונטיים במכוון** (לא חובת מימוש).

| סעיף סקריפט | דרישה | סטטוס פרויקט | ראיה |
|---|---|---|---|
| 1.3 | Product Variants / מלאי Sanity | Out of scope | `sanity/schemaTypes/lead.ts` בלבד · BRIEF L29 |
| 1.4 | Faceted Search קטלוג | Out of scope | אין קטלוג מוצרים |
| 1.6 | Zustand cart + localStorage | Out of scope | `src/store/lead-ui.ts` — UI/interest בלבד |
| 1.12 | משלוח דינמי בשרת | Out of scope | דפי `/shipping` מידע בלבד · עסקה בפגישה |
| 1.31 | Lenis + ScrollTrigger sync | Out of scope (Tier 1+) | `MotionProvider` · `smooth={false}` · `getLenis: () => null` |
| 1.32 | Custom Cursor / Magnetic | Out of scope (Tier 1+) | `docs/motion-map.md` L57 «לא בונים» |
| 1.36–1.39 | 3D / Image Sequence / R3F | Out of scope (Tier 1+) | BRIEF L56 · `docs/3d-module.md` |
| 1.41 | Guest Checkout default | N/A — אין checkout · ליד בלי login | BRIEF L29 |
| 1.42–1.50 | Portal / IAM / OTP / IDOR הזמנות | Out of scope | אין `/account` · `docs/security.md` |
| 2.1–2.2 | Predictive / secured product search | Out of scope | אין קטלוג |
| 2.4 | One-Click cart + free-shipping bar | Out of scope | אין עגלה |
| 2.6–2.8 | מערכת ביקורות CMS + העלאת תמונות | Out of scope | המלצות = וידאו לקוח בקוד (`testimonials.ts`) |
| 2.10 / 2.12 | DRACO / Optimistic cart | Out of scope | אין 3D / עגלה |
| 2.15 Enforce CSP | Go-Live gate | Report-Only + `x-nonce` עד שבוע יציב · `launch-checklist.md` E |
| 2.19 Field Web Vitals | Go-Live gate | בקרות קוד ✅ · מדידת Lighthouse ב־`web-vitals-baseline.md` |
| 3.1 / 3.11 | Cart / Payment integrity | Out of scope | אין checkout |

**מה כן חל במלואו:** לידים (Zod, Turnstile, rate limit, server-only), עמודים משפטיים, motion Tier 1+, CSP headers, handoff docs.
