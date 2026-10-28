# Motion / FPS baseline — מכון מקור חכמה

> Audit Script 5 · סעיף 1.8 · 28.10.2026  
> Tier 1+ · GSAP + Framer Motion · בלי Image Sequence / WebGL

## חוקי ביצוע בקוד

| כלל | איפה |
|---|---|
| אנימציה רק `transform` + `opacity` | `docs/motion-map.md` · `src/components/motion/Reveal.tsx` (`y`/`opacity`) |
| `prefers-reduced-motion` מבטל | `Reveal`, `YearsCounter`, `ScrollRoadmap`, `globals.css` |
| Lenis כבוי | `src/motion/MotionProvider.tsx` (Tier 1+) |
| אין WebGL / R3F / sequence | `package.json` · Grep `src/` |

## מדידה (מובייל מדומה 390×844)

| מדד | תוצאה | שיטה |
|---|---|---|
| תכונות אנימציה ב־GSAP | `opacity`, `y`/`x` (transform) בלבד ב־Reveal/Counter | קריאת קוד |
| FPS בגלילת `#craft` (45 frames rAF) | **avg 60 · min 58.8 · pass** (28.10.2026, localhost, Chromium MCP) | CDP `Runtime.evaluate` rAF sampler + `scrollBy` |
| Long tasks > 50ms בזמן גלילה | לא נמדדו בריצה זו | PerformanceObserver אופציונלי |

**יעד:** שמירה מעל ~55–60FPS במכשיר בינוני. אם יורדים — להקטין pin/scrub או לכבות stagger במובייל (בלי לגעת ב־ScrollRoadmap הנעול אלא באישור מפורש).
