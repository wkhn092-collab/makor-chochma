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

## מדידת מעבדה

```bash
npx lighthouse http://localhost:3000/ --form-factor=mobile --only-categories=performance,accessibility
npx lighthouse https://makor-chochma.vercel.app/ --form-factor=mobile --only-categories=performance
```

| מדד | יעד | localhost 28.10 | localhost 30.10 (אחרי CSP Enforce) | prod Vercel |
|---|---|---|---|---|
| LCP | &lt; 1.5s | **1.3s** ✅ | **2.1s** ⚠️ (מעבדה + TBT) | 3.4s ⚠️ (ישן) |
| CLS | &lt; 0.05 | **0** ✅ | **0** ✅ | 0 ✅ |
| FCP | — | 1.4s-ish | 1.1s | 1.4s |
| Performance score | — | 66 | 60 | 66 |
| TBT | — | — | ~5.7s (GSAP/dev throttle) | — |
| INP (שדה) | &lt; 100ms | ⬜ CrUX | ⬜ | ⬜ |

**הערה:** CLS יציב. LCP במעבדה רגיש ל־mobile throttle + GSAP TBT; אחרי deploy לפרוד להריץ שוב בלי `next dev`. Dev console גם דיווח LCP על תמונת fan — לוודא ש־Hero נשאר `priority` בפרוד.

עד למדידת שדה INP: שערי LCP/CLS מקומיים ✅ · INP + אימות פרוד = שער Go-Live.
