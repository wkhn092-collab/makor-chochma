# Web Vitals baseline — מכון מקור חכמה

> Script 5 · 2.19 · יעדים: LCP &lt; 1.5s · INP &lt; 100ms · CLS &lt; 0.05 · JS ראשוני &lt; 150KB gzip

## בקרות קוד (תורמות ליעדים)

| בקרה | ראיה |
|---|---|
| LCP Hero eager | `Hero.tsx` `priority` + `fetchPriority="high"` · `hero-lcp.webp` ~169KB |
| תמונות AVIF/WebP | `next.config.ts` `images.formats` |
| Motion lazy | `MotionProvider` טוען ScrollTrigger ב־idle |
| Promo PPR | `PromoBanner` ב־`<Suspense>` + `connection()` |
| אין WebGL | `docs/3d-module.md` |
| FPS scroll | `docs/perf-motion-baseline.md` avg 60 |

## מדידת מעבדה (28.10.2026)

```bash
npx lighthouse http://localhost:3000/ --form-factor=mobile --only-categories=performance,accessibility
npx lighthouse https://makor-chochma.vercel.app/ --form-factor=mobile --only-categories=performance
```

| מדד | יעד | localhost (אחרי תיקונים) | prod Vercel (לפני פריסת תיקונים) |
|---|---|---|---|
| LCP | &lt; 1.5s | **1.3s** ✅ | 3.4s ⚠️ (פריסה ישנה + throttle) |
| CLS | &lt; 0.05 | **0** ✅ | 0 ✅ |
| FCP | — | 1.4s-ish | 1.4s |
| Performance score | — | 0.66 | 0.66 |
| INP (שדה) | &lt; 100ms | ⬜ למדוד ב־CrUX / field | ⬜ |
| JS transfer (gzip) | &lt; 150KB initial | ⬜ Network panel בפרוד | ⬜ |

**הערה:** ציון Performance 66 במעבדה מושפע מ־TBT (GSAP/motion). LCP+CLS על localhost עומדים ביעד. אחרי deploy — להריץ שוב מול URL הפרוד ולעדכן עמודה.

עד למדידת שדה INP: שערי LCP/CLS מקומיים ✅ · INP + אימות פרוד = שער Go-Live.
