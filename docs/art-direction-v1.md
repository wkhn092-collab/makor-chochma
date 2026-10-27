# מודול א׳-2 — ארט דיירקשן · מכון מקור חכמה

> לאישור לפני קוד · 26.10.2026  
> נישה: N23 יודאיקה · קול ראשי: **V12 שומר מסורת** · משני: **V01 האומן**  
> מטרה: ליד → שיחת טלפון → פגישה באלעד

---

## שלב 1 — שלושה כיוונים

### כיוון א׳ — «קלף ודיו» ⭐ המלצת Art Director

| | |
|---|---|
| **תחושה** | סדנת סופר חמה, נייר קלף, דיו חום, אמון שקט — לא חנות, לא הייטק |
| **למה ממיר** | תואם לוגו; קריא בשמש במובייל; מרגיש «דתי־מכובד» לקהל ישראלי; מוריד חשד מול אתרי סת״ם מסחריים |
| **השראה 1%** | [DAIKUHARA Kintsugi](https://www.awwwards.com/sites/daikuhara-kintsugi-antique) — שקט, מלאכה, טיפוגרפיה מרוסנת · [Atelier d'Offard](https://atelierdoffard.com) — מורשת חומר, תמונה מדברת · [ORVANE Watchmaker](https://horizonx.so) (editorial parchment craft) — קלף + סיפור גלילה |
| **פלטה (מעודכן Quiet Luxury)** | parchment `#F7F4EF` · ink `#1A1814` · bronze `#6B6560` · gold `#C9A962` · accent CTA `#0A0A0A` · surface `#FFF` — ראה `docs/design-tokens.md` |
| **פונטים** | כותרות: **Frank Ruhl Libre** · גוף/UI: **Assistant** |
| **רגע חתימה** | המספר **32** גדל בגלילה מול שמות שתי ההסמכות (משמרת סת״ם · יד רפאל) |

**Signature mechanics לאימוץ (לא העתקה):** אוויר בין מקטעים כמו DAIKUHARA; תקריב חומר כמו d'Offard; מספר גדול כעוגן אמון כמו editorial watchmakers.

---

### כיוון ב׳ — «סדנה בלילה»

| | |
|---|---|
| **תחושה** | שולחן כתיבה מואר, צללים עמוקים, יוקרה שקטה |
| **השראה** | Cartier editorial product pages · Velmont haute horlogerie (HorizonX) · Lumen Artspace heritage gallery |
| **פלטה** | `#1A1510` · `#C4A574` · `#F5E6D3` |
| **פונטים** | **Playfair Display** (EN) / **Frank Ruhl Libre** · גוף **Heebo** |
| **רגע חתימה** | Hero כהה + קרן אור על קולמוס/קלף (הדמיה) |

**סיכון המרה:** כהה מדי לקהל חרדי/דתי במובייל; מתחרה ויזואלית עם מותגי יוקרה חילוניים. **לא מומלץ כברירת מחדל.**

---

### כיוון ג׳ — «מכון הסמכה»

| | |
|---|---|
| **תחושה** | מכון רשמי, לבן, תעודות בחזית, סמכות מוסדית |
| **השראה** | Sofrout (מקומי — מבנה מכון) · מרפאות/משרדי עו״ד premium editorial · Keylight (trust/auth layouts) |
| **פלטה** | `#FFFFFF` · `#111` · קו תכלת־אפור `#4A5568` · הדגשת דיו רק בלוגו |
| **פונטים** | **Assistant** לכל המשקלים (שיטתי, נגיש) |
| **רגע חתימה** | גריד תעודות גדול מעל ה־fold |

**סיכון:** קר רגשית; מאבד את «הידיים שכותבות»; נראה כמו ביטוח/מרפאה. טוב למשני (סקשן תעודות) — לא לכל הדף.

---

## בחירת ברירת מחדל לאישור

**כיוון א׳ — קלף ודיו.**  
כיוון ב׳ נשמר כ־accent לסקשן ממליצים אם יגיעו סרטונים.  
כיוון ג׳ מזין את מקטע התעודות בלבד (כרטיסי הסמכה נקיים על parchment).

---

## שלב 2 — Design Tokens + Anti-AI Hero

### Tokens (כיוון א׳)

```css
:root {
  --ink: #4F3910;
  --bronze: #79705C;
  --stone: #C1BBAA;
  --parchment: #F2EFE9;
  --parchment-deep: #E8E2D6;
  --surface: #FFFFFF;
  --accent: #6B4E1F;
  --accent-hover: #5A4119;
  --success: #2F5D3A;
  --danger: #8B2E2E;
  --radius-sm: 4px;
  --radius-md: 10px;
  --shadow-contact:
    0 1px 1px rgb(79 57 16 / 0.04),
    0 4px 12px rgb(79 57 16 / 0.06),
    0 16px 40px rgb(79 57 16 / 0.08);
  --font-display: "Frank Ruhl Libre", "Times New Roman", serif;
  --font-body: "Assistant", "Alef", sans-serif;
  --tracking-display: -0.02em;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Visual Physics

- כפתור CTA: contact shadow רב־שכבתי (`--shadow-contact`), לא `0 4px 6px black`
- Sticky bar מובייל: `backdrop-filter: blur(12px) saturate(1.1)` על parchment/80
- כרטיסי שירות: **בלי כרטיסים דקורטיביים** — רק אם נדרש ללחיצה/בחירת עניין (גבול stone דק)

### Bullshit Filter (חובה)

**אסור ב־H1/H2:** מסע, חדשנות, חוויה רוחנית, פשרות ללא, הכי טוב בארץ, unlock, seamless.

**H1 חייב:** מספר או שם מעשה מוחשי (32 / כתיבה / הסמכה).  
**H2 חייב:** גיבוי מספרי או שם מכון הסמכה אמיתי.

### טיפוגרפיה

- H1: `clamp(2.25rem, 6vw, 4rem)` · `letter-spacing: -0.02em` · Frank Ruhl Libre
- Body: `clamp(1rem, 2.5vw, 1.125rem)` · Assistant · line-height 1.6
- מובייל־פירסט: 375px קודם

### חוקי Hero (Anti-AI composition)

מעל ה־fold רק: **לוגו/מותג** · **H1 אחד** · **משפט תומך אחד** · **קבוצת CTA** · **מישור ויזואלי מלא־רוחב** (הדמיה).  
בלי סטטיסטיקות בשורה, בלי badges צפים על התמונה, בלי כרטיסים ב־Hero.

---

## שלב 3 — המלצת מיקרו־קופי (תקציר)

ראה `docs/copy-deck.md` המלא.

**הבטחה במשפט אחד:**  
סת״ם שנכתב בידי סופר מוסמך עם 32 שנות ניסיון — קודם שיחת ייעוץ, אחר כך פגישה באלעד.

**CTA ראשי:** לתיאום שיחת ייעוץ  
**CTA משני:** וואטסאפ לרב יגאל
