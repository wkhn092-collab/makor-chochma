# Business Logic Matrix — מכון מקור חכמה

> כל כלל = בדיקת Unit / integration עתידית · 26.10.2026

| ID | כלל עסקי | בדיקה עתידית |
|---|---|---|
| BL-01 | ליד נדחה אם טלפון לא תקין לישראל | `reject when phone fails IL validator` |
| BL-02 | ליד נדחה אם `interest` לא ב־enum | `reject unknown interest` |
| BL-03 | ליד נדחה בלי Turnstile תקף | `reject when turnstile verify fails` |
| BL-04 | Rate limit חוסם שליחות חוזרות | `429 after N submits / window` |
| BL-05 | הצלחה ללקוח רק אחרי persist ל־Sanity | `success implies lead document exists` |
| BL-06 | מייל נשלח לרב; CC לאבישי כשמוגדר | `Resend payload includes to+cc` |
| BL-07 | סטטוס ליד חדש = `new` | `default status new` |
| BL-08 | אין מחיר ב־UI הציבורי | `public HTML has no ₪ price for products` |
| BL-09 | באנר מבצע מוסתר אם `!enabled` או פג תוקף | `promo hidden when disabled/expired` |
| BL-10 | בחירת עניין אחת משותפת לטופס ולוואטסאפ | `same interest in form state and wa.me text` |
| BL-11 | Zustand לא מכיל name/phone | `store snapshot has no PII keys` |
| BL-12 | תמונת הדמיה מסומנת | `simulation badge present on stock hero` |
| BL-13 | CTA הראשי מוביל לשיחה/טופס — לא לתשלום | `primary CTA href is #lead or tel/wa` |
| BL-14 | משפך: אתר ≠ סגירת עסקה | `copy never claims online purchase complete` |
| BL-15 | סקשן וידאו מוסתר/placeholder בלי URLs | `testimonials not claiming fake reviews` |
