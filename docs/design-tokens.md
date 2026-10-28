# Design Tokens — מכון מקור חכמה

> **Quiet Luxury / Maison Atelier** (נעול) · קרם שנהב + שחור + זהב שמפניה  
> מקורות: Cartier editorial · AURELIS · Peretz luxury jewellery audit

| Token | Value | Use |
|---|---|---|
| `--parchment` | `#F7F4EF` | רקע ראשי (ivory) |
| `--parchment-deep` | `#EFEBE3` | פסים עדינים |
| `--surface` | `#FFFFFF` | טופס / כרטיסים |
| `--void` | `#050505` | סקשנים כהים |
| `--ink` | `#1A1814` | טקסט (לא חום בוצי) |
| `--bronze` | `#6B6560` | טקסט משני |
| `--stone` | `#E4DFD6` | גבולות |
| `--gold` | `#C9A962` | **הדגשה יחידה** · קווים · 32 |
| `--accent` | `#0A0A0A` | CTA שחור יוקרה |
| `--accent-hover` | `#1F1F1F` | CTA hover |
| `--font-display` | Frank Ruhl Libre | H1–H2 / מספרים |
| `--font-body` | Assistant | גוף / UI |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | תנועה |

Breakpoints: mobile-first `375` → `768` → `1024`.

## Type utilities (`globals.css`)

| Class | Size | Use |
|---|---|---|
| `.text-tag` | 9px | SimulationBadge |
| `.text-micro` | 10px | Meta under stats |
| `.text-caption` | 11px | Eyebrows / labels |
| `.text-label` | 13px | Compact UI |
| `.text-body-sm` | 14px | Card blurbs |
| `.text-body-soft` | 0.95rem | Soft body |
| `.text-lead` | 1.05rem | Hero support |
| `.tracking-eyebrow` | 0.22em | Uppercase eyebrows |
| `.tracking-label` | 0.14em | Section labels |
| `.tracking-caption-wide` | 0.18em | Gold captions |

## Arbitrary-value audit (Script 5 · 1.27)

| תאריך | מופעים `-[…]` ב־`src/` | הערה |
|---|---|---|
| 28.10.2026 לפני | 174 / 27 קבצים | סריקת baseline |
| 28.10.2026 אחרי | ~138 | הוחלפו text/tracking נפוצים לסקאלה לעיל |

**חריגים מכוונים (לא להחליף בעיוורון):** `clamp()` לכותרות רספונסיביות · `100svh`/`100dvh` · `safe-area-inset` · `env()` · מחלקות radius דרך `--radius-sm` / `--radius-md` · `ScrollRoadmap.tsx` (נעול ל־lawyer parity).

> הערה: אל תכתבו ב־docs מחרוזת דמויה למחלקת Tailwind עם `*` — הסורק של Tailwind v4 עלול לייצר CSS לא תקין ולשבור את הבילד.
