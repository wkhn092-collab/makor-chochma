# Architecture — מכון מקור חכמה

> מודול א' · שלב 2 · לאישור לפני קוד  
> תאריך: 26.10.2026 · Tier 1+ · Lead-gen one-pager

---

## 1. מטרת המערכת

להביא גולש מעוניין ל**שיחת טלפון**, משם ל**פגישה פנים־אל־פנים באלעד**, ושם נסגרת העסקה (תפילין/מזוזות וכו׳ — סכום גבוה).  
האתר **לא** מוכר, **לא** מציג מחירים, **לא** מסלק.

```
Hero CTA / WhatsApp / Form
        ↓
   שיחת טלפון
        ↓
 פגישה פנים־אל־פנים
        ↓
   סגירת עסקה (מחוץ לאתר)
```

---

## 2. Stack

| שכבה | בחירה | הערה |
|---|---|---|
| Framework | Next.js App Router | HE default RTL · `/en` |
| UI | Tailwind CSS + Design Tokens | קלף / דיו מהלוגו |
| Motion | GSAP + Framer Motion (kit קל) | בלי Lenis חובה; אופציונלי דסקטופ |
| State | Zustand | רק `interest` + UI flags — **בלי PII** |
| CMS | Sanity | **רק** מסמכי `lead` (+ אופציונלי `promo`) — לא תוכן שיווקי |
| Email | Resend | To: רב · Cc: אבישי |
| Bot | Cloudflare Turnstile | על הטופס |
| Analytics | GA4 + Clarity | KPIs מוגדרים |
| Host | Vercel | Preview עד דומיין מהלקוח |

---

## 3. מבנה אפליקציה (מתוכנן)

```
app/
  [locale]/                    # he (default) | en
    page.tsx                 # one-pager
    accessibility/page.tsx
    privacy/page.tsx
  api/
    lead/route.ts            # או server action בלבד
  studio/[[...tool]]/        # Sanity — אבישי בלבד
components/
  hero/ about/ services/ testimonials/ faq/ lead-form/
  sticky-cta/ whatsapp-float/
lib/
  validation/lead.ts         # Zod
  phone/il.ts
  rate-limit.ts
  mail/resend.ts             # server-only
sanity/
  schemaTypes/lead.ts
  schemaTypes/promo.ts
content/
  services.ts faq.ts copy.he.ts copy.en.ts
```

---

## 4. סכמות Sanity

### `lead`

| שדה | טיפוס | חובה |
|---|---|---|
| `name` | string | כן |
| `phone` | string | כן (E.164 / IL) |
| `interest` | string enum | כן |
| `source` | string (`form` / `whatsapp-click`) | כן |
| `locale` | `he` \| `en` | כן |
| `status` | `new` \| `called` \| `meeting` \| `won` \| `lost` | כן (default `new`) |
| `notes` | text | לא (אבישי) |
| `createdAt` | datetime | כן |
| `turnstilePassed` | boolean | כן |
| `userAgent` | string | לא |
| `ipHash` | string | לא (hash בלבד, לא IP גולמי אם אפשר) |

**Enum עניין:** `tefillin` | `mezuzot` | `megillot` | `pitum` | `general`

### `promo` (אופציונלי, כבוי כברירת מחדל)

| שדה | טיפוס |
|---|---|
| `enabled` | boolean |
| `title` | string |
| `body` | text |
| `endsAt` | datetime |
| `code` | string (אופציונלי) |

מוצג ב־UI **רק אם** `enabled === true` ו־`endsAt > now`.

### מה אין ב־Sanity

product, price, cart, order, customer portal, blog.

---

## 5. ארכיטקטורת "עגלה" → מצב ליד (Zustand)

אין עגלה. מקבילה:

```ts
// client only — no PII
type LeadUiState = {
  interest: Interest | null;  // בחירה אחת במסלול
  promoDismissed: boolean;
  setInterest: (i: Interest) => void;
};
```

- בחירת שירות מעדכנת `interest` פעם אחת → prefill לטופס + טקסט וואטסאפ.
- שם/טלפון חיים רק ב־controlled inputs → נשלחים לשרת → לא נשמרים ב־store.

---

## 6. זרימת ליד (Server)

1. Client: Turnstile token + Zod client hint  
2. Server Action:  
   - `import 'server-only'` secrets  
   - Verify Turnstile  
   - Rate limit (IP hash / phone)  
   - Zod parse (`name`, `phone` IL, `interest`)  
   - Persist Sanity `lead`  
   - Resend email (רב + CC אבישי)  
3. Response: success | validation | rate-limited | bot  
4. UI: הודעת הצלחה — "נחזור אליכם לתיאום שיחה"

**כשלון חלקי:** אם מייל נכשל אחרי שמירה — לוג + עדיין success עם ליד ב־CMS (אבישי רואה). אם שמירה נכשלה — error למשתמש.

---

## 7. מפת אבטחה (תקציר)

| כלל | יישום |
|---|---|
| Server-Side Truth | אין מחירים; לידים רק דרך Server Action |
| Client hygiene | Zustand בלי PII |
| Secrets | `server-only` + Vercel env |
| GROQ | פרמטרים בלבד (שליפות לידים באולפן — לא ציבורי) |
| Validation | Zod |
| Authz | Studio לאבישי; אין API ציבורי לשליפת לידים |
| CSP | Report-Only → Enforce |
| Turnstile | חובה בטופס |
| Rate limit | לידים |
| Open redirects | Allowlist אם יהיו |

פירוט: `docs/security.md`

---

## 8. i18n + RTL

- `he` default · `dir="rtl"`  
- `en` · `dir="ltr"`  
- מספרי טלפון / לטינית ב־`<bdi>` או `dir="ltr"`  
- Copy ב־`content/copy.*.ts` — אבישי מעדכן בקוד

---

## 9. KPIs + מדידה

| KPI | אירוע |
|---|---|
| שליחת טופס | `lead_submit` |
| קליק וואטסאפ | `whatsapp_click` |
| צפייה בתעודות | `certs_view` (IntersectionObserver) |
| גלילה לטופס | `form_section_view` |
| החלפת שפה | `locale_switch` |

Clarity = מפות חום / הקלטות.

---

## 10. פריסה (Vercel) — טיוטה

**Env (לא בקוד):**  
`RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_CC_EMAIL`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `SANITY_*`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`

דומיין: Preview עד שהלקוח מעדכן.

---

## 11. מה מחוץ לסקופ (מודולים ב׳/ג׳)

פורטל לקוח, OTP, Clerk, Reorder, סליקה — **לא בשלב זה**. אם יידרש בעתיד: מודול ב׳/ג׳ בנפרד.
