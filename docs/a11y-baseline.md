# Accessibility baseline — מכון מקור חכמה

> Script 5 · 2.13 · 28.10.2026 · WCAG 2.1 AA (lead-gen)

## Code evidence (static)

| דרישה | ראיה |
|---|---|
| Skip link | `SkipLinkHost` ב־`src/app/layout.tsx` → `#main` |
| Landmark main | `<main id="main" tabIndex={-1}>` ב־HomePage / SiteChrome |
| RTL / lang | `html` dir/lang דרך `LocaleHtml` + `layout` default `he`/`rtl` |
| Focus / menu | `SiteHeader` aria-expanded / Escape closes menu |
| Live regions | `LeadForm` success `aria-live` · `ConsentBanner` · `PromoBanner` |
| Reduced motion | `prefersReducedMotion` + `globals.css` |
| Forms | labels על שדות · הודעות שגיאה מקושרות |
| Sticky CTA | `inert` + `tabIndex={-1}` כשהבר מוסתר (`StickyCta`) |
| Eyebrows על parchment | `text-bronze` (לא `text-gold`) לניגודיות ≥4.5:1 |

## מדידה (28.10.2026)

| כלי | יעד | תוצאה |
|---|---|---|
| Lighthouse Accessibility · mobile · `localhost:3000` | 100 / 0 Critical | **100** · `aria-hidden-focus` ✅ · `color-contrast` ✅ |
| Lighthouse Accessibility · prod (לפני תיקון) | — | 92 · נכשל sticky aria-hidden + gold captions |

### ידני לפני Go-Live מלא (אחרי deploy)

- [ ] מקלדת בלבד על Preview/פרוד: Tab לכל CTA · Esc סוגר תפריט · Enter בשליחת טופס
- [ ] axe DevTools @ 375px על URL הפרוד אחרי הפריסה עם התיקונים

**סטטוס ביקורת:** בקרות קוד ✅ · Lighthouse a11y מקומי ✅ · אימות axe על פרוד אחרי deploy.
