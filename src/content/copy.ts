import { SITE } from "./site";

export type Locale = "he" | "en";

export function getCopy(locale: Locale) {
  const isHe = locale === "he";
  return {
    locale,
    dir: isHe ? ("rtl" as const) : ("ltr" as const),
    meta: {
      title: isHe
        ? `${SITE.brand} | סופר סת״ם מוסמך · אלעד`
        : `${SITE.brandEn} | Certified Sofer Stam · Elad`,
      description: isHe
        ? `סופר סת״ם עם ${SITE.yearsExperience} שנות ניסיון, מוסמך משמרת סת״ם ויד רפאל. שיחת ייעוץ ואז פגישה באלעד.`
        : `Certified sofer stam with ${SITE.yearsExperience} years’ experience. Consultation call, then an in-person meeting in Elad.`,
    },
    nav: {
      about: isHe ? "אודות" : "About",
      services: isHe ? "שירותים" : "Services",
      testimonials: isHe ? "המלצות" : "Testimonials",
      faq: isHe ? "שאלות" : "FAQ",
      contact: isHe ? "צור קשר" : "Contact",
      ctaCall: isHe ? "התקשרו עכשיו" : "Call now",
      openMenu: isHe ? "פתח תפריט" : "Open menu",
      closeMenu: isHe ? "סגור תפריט" : "Close menu",
      switchLabel: isHe ? "EN" : "עב",
      switchHref: isHe ? "/en" : "/",
    },
    hero: {
      eyebrow: isHe ? `${SITE.brand} · אלעד` : `${SITE.brandEn} · Elad`,
      h1: isHe
        ? "התפילין שלכם בידיים שכותבות כבר"
        : "Your tefillin in hands that have been writing for",
      h1YearsSuffix: isHe ? "שנה" : "years",
      h2: isHe
        ? "מוסמך משמרת סת״ם ויד רפאל. קודם שיחה, בלי מחירים באתר."
        : "Certified by Mishmeret Stam & Yad Rafael. First a call, no prices on the site.",
      ctaPrimary: isHe ? "לתיאום שיחת ייעוץ" : "Schedule a consultation call",
      ctaCall: isHe ? "התקשרו עכשיו" : "Call now",
      ctaSecondary: isHe
        ? "וואטסאפ להרב יגאל"
        : "WhatsApp Rabbi Yigal",
      micro: isHe
        ? "שיחה בלי התחייבות · בלי מחיר באתר · כ־15 דקות · ואז פגישה באלעד אם מתאים"
        : "No-obligation call · no prices on the site · ~15 min · then Elad meeting if it fits",
      simulation: isHe ? "צילום להמחשה" : "Stock photo",
    },
    trust: isHe
      ? `מוסמך משמרת סת״ם · מוסמך יד רפאל · ${SITE.yearsExperience} שנות ניסיון · ייעוץ לפני החלטה`
      : `Mishmeret Stam · Yad Rafael · ${SITE.yearsExperience} years · advice before you decide`,
    about: {
      h2: isHe ? SITE.contactName : SITE.contactNameEn,
      body: isHe
        ? `סופר סת״ם עם ${SITE.yearsExperience} שנות ניסיון. מוסמך על ידי מכון משמרת סת״ם ומכון יד רפאל של הרב מועלם. מלמד ומכשיר סופרים — מי שמלמד, חייב לדעת.`
        : `A sofer stam with ${SITE.yearsExperience} years of experience. Certified by Mishmeret Stam and Yad Rafael Institute (Rabbi Moalem). He also trains sofrim — those who teach must know.`,
      line: isHe
        ? "המסר שלנו פשוט: התפילין והמזוזות שלכם בידיים טובות."
        : "Our message is simple: your tefillin and mezuzot are in good hands.",
      yearsLabel: isHe ? "שנות ניסיון" : "years of experience",
      certPending: isHe
        ? "תמונת תעודה תתווסף כשתסופק · כרגע מצוין השם בלבד"
        : "Certificate image will be added when provided",
    },
    /** Wedge — us vs anonymous online buy (no competitor names) */
    whyUs: {
      eyebrow: isHe ? "למה אצלנו" : "Why here",
      h2: isHe
        ? "לא קונים סת״ם בלחיצה — קודם שיחה עם הסופר שכותב"
        : "You don’t buy stam with a click — first a call with the sofer who writes",
      lead: isHe
        ? "השוואה עדינה למסלול הקנייה האונליין הנפוץ. בלי שמות מתחרים — רק מה שחשוב לכם."
        : "A quiet contrast to the usual online-buy path. No competitor names — only what matters to you.",
      themLabel: isHe ? "קנייה אונליין טיפוסית" : "Typical online purchase",
      usLabel: isHe ? "מכון מקור חכמה" : "Makor Chochma",
      rows: isHe
        ? [
            { them: "מוצר בעגלה, מחיר על המסך", us: "שיחת ייעוץ בלי התחייבות" },
            { them: "לא תמיד ברור מי כתב", us: `הרב יגאל עמרני · ${SITE.yearsExperience} שנות כתיבה` },
            { them: "לחץ לסגור עסקה מרחוק", us: "פגישה פנים־אל־פנים באלעד" },
            { them: "סיסמאות «מהודר» כלליות", us: "מוסמך משמרת סת״ם ויד רפאל · מלמד סופרים" },
          ]
        : [
            { them: "Product in a cart, price on screen", us: "No-obligation consultation call" },
            { them: "Often unclear who wrote it", us: `Rabbi Yigal Amarani · ${SITE.yearsExperience} years writing` },
            { them: "Pressure to close remotely", us: "In-person meeting in Elad" },
            { them: "Generic “mehudar” slogans", us: "Mishmeret Stam & Yad Rafael · trains sofrim" },
          ],
      cta: isHe ? "לשיחה עם הסופר" : "Talk to the sofer",
    },
    statement: isHe
      ? "מחפשים תפילין או מזוזות ולא רוצים לקנות בלחיצה. רוצים לדעת מי כותב, מה רמת ההידור, ואיך זה מרגיש בידיים. מכון מקור חכמה בשביל מי שמחפש סדנת סופר אמיתית: דיו, קלף, ושיחה לפני שסוגרים — לא חנות אונליין."
      : "You're looking for tefillin or mezuzot and don't want to buy with a click. You want to know who writes, what level of hidur, and how it feels in the hands. Makor Chochma is for anyone seeking a real sofer's atelier: ink, parchment, and a talk before you decide — not an online shop.",
    quote: isHe
      ? "בסדנה אני לא מסתכל מהצד. אני כותב איתכם את הדרך מהשיחה הראשונה עד שהסת״ם בידיים שלכם."
      : "In the atelier I don't watch from the side. I write the path with you from the first call until the Stam is in your hands.",
    craft: {
      h2: isHe ? "איך זה עובד אצלנו" : "How it works here",
      lead: isHe
        ? "גללו — המסלול נצבע בזהב. כל שלב מחליף את הסיפור למעלה."
        : "Scroll — the path fills in gold. Each stage rewrites the story above.",
      cta: isHe ? "לתיאום שיחה" : "Book a call",
      steps: isHe
        ? [
            { n: "01", title: "שיחת ייעוץ", body: "מבינים מה מתאים — תפילין, מזוזות, מגילות או ספר תורה. בלי מחירים באתר." },
            { n: "02", title: "קלף ודיו", body: "חומרים כשרים, כתיבה ביד לפי הלכה — חוויית מלאכה, לא הדפסה." },
            { n: "03", title: "הגהה וליווי", body: "בדיקות, הסבר על ההידור, שקיפות מלאה מולכם בכל שלב." },
            { n: "04", title: "פגישה באלעד", body: "סוגרים פנים־אל־פנים — ואז ממשיכים בידיים טובות." },
          ]
        : [
            { n: "01", title: "Advice call", body: "We clarify what fits — tefillin, mezuzot, megillot or a Sefer Torah. No prices online." },
            { n: "02", title: "Parchment & ink", body: "Kosher materials, handwritten to halacha — craft, never print." },
            { n: "03", title: "Proof & guidance", body: "Checks, clarity on hidur, full transparency at every step." },
            { n: "04", title: "Meeting in Elad", body: "Close face-to-face — then continue in good hands." },
          ],
    },
    services: {
      h2: isHe ? "מה אפשר לקבל אצלנו" : "What we offer",
      lead: isHe
        ? "בחרו נושא אחד. זה יישמר לטופס ולואטסאפ. בלי מחירים באתר; העסקה נסגרת בפגישה."
        : "Pick one topic. It carries to the form and WhatsApp. No prices online; the deal closes in person.",
      selected: isHe ? "נבחר" : "Selected",
      hint: isHe
        ? "נשמר לטופס ולואטסאפ. אפשר לשנות לפני השליחה."
        : "Saved for the form and WhatsApp. You can change it before sending.",
    },
    testimonials: {
      h2: isHe
        ? "מה אומרים לקוחות על תפילין וספרי תורה מהמכון?"
        : "What do clients say about tefillin and Sifrei Torah from the institute?",
      moreTitle: isHe ? "עוד לקוחות משתפים" : "More clients share",
      prev: isHe ? "הקודם" : "Previous",
      next: isHe ? "הבא" : "Next",
      swipeHint: isHe ? "החליקו לראות עוד המלצות" : "Swipe for more testimonials",
    },
    faq: {
      h2: isHe ? "שאלות שחוזרות בשיחה" : "Questions we hear on every call",
      sidePhotoCaption: isHe ? "כתיבה ידנית על קלף" : "Hand writing on parchment",
      sideTrustTitle: isHe ? "לפני השיחה" : "Before you call",
      sideTrust: isHe
        ? [
            "סופר מוסמך — משמרת סת״ם ויד רפאל",
            "שיחת ייעוץ קצרה, בלי התחייבות",
            "פגישה פנים־אל־פנים באלעד",
          ]
        : [
            "Certified sofer — Mishmeret Stam & Yad Rafael",
            "Short consultation call, no obligation",
            "In-person meeting in Elad",
          ],
      sideNextTitle: isHe ? "רוצים תשובה מהירה?" : "Want a quick answer?",
      sideNextLead: isHe
        ? "כתבו בוואטסאפ או השאירו פרטים — נחזור לתיאום שיחה."
        : "WhatsApp us or leave details — we’ll schedule a call.",
      sideCtaForm: isHe ? "להשארת פרטים" : "Leave details",
      sideCtaWa: isHe ? "וואטסאפ" : "WhatsApp",
      sideMetaHours: isHe ? SITE.hoursHe : SITE.hoursEn,
      sideMetaPlace: isHe ? "אלעד · בתיאום" : "Elad · by appointment",
      items: isHe
        ? [
            {
              q: "איך אדע שהסת״ם כשר?",
              a: "העבודה נעשית בידי סופר מוסמך ממשמרת סת״ם ומכון יד רפאל. בשיחה ובפגישה תקבלו הסבר ברור על רמת ההידור והבדיקות — בלי סיסמאות.",
            },
            {
              q: "מי כותב את הסת״ם?",
              a: `הרב יגאל עמרני — סופר סת״ם עם ${SITE.yearsExperience} שנות ניסיון, גם מכשיר סופרים. פרטי הכתיבה והליווי נסגרים מולכם בשקיפות בשיחה.`,
            },
            {
              q: "למה אין מחירים באתר?",
              a: "זו עסקה משמעותית. קודם מבינים מה מתאים לכם בשיחת ייעוץ (~15 דק׳, בלי התחייבות), אחר כך נפגשים באלעד וסוגרים שם — בלי לחץ אונליין ובלי «מחיר לפני» מטעה.",
            },
            {
              q: "למה לא פשוט לקנות באתר כמו כולם?",
              a: "כי כאן אתם מדברים עם הסופר שכותב — לא עם עגלה. ככה יודעים מי כותב, מה רמת ההידור, ואיך ממשיכים — לפני שסוגרים.",
            },
            {
              q: "איך מתקדמים בפועל?",
              a: "משאירים פרטים או כותבים בוואטסאפ → שיחת טלפון קצרה → אם זה מתאים, קובעים פגישה פנים־אל־פנים באלעד.",
            },
            {
              q: "יש משלוחים?",
              a: "כן, בתיאום — במיוחד לפיטום הקטורת ולמוצרים שסוכמו בשיחה.",
            },
            {
              q: "מתי אפשר להגיע?",
              a: `בתיאום מראש, בין ${SITE.hoursHe.replace(" בתיאום מראש", "")}. ${SITE.addressHe}.`,
            },
          ]
        : [
            {
              q: "How do I know the stam is kosher?",
              a: "Work is done by a sofer certified by Mishmeret Stam and Yad Rafael. On the call and in the meeting you’ll get a clear explanation of hidur and checks — no slogans.",
            },
            {
              q: "Who writes the stam?",
              a: `Rabbi Yigal Amarani — a sofer with ${SITE.yearsExperience} years’ experience who also trains sofrim. Writing and guidance details are agreed transparently on the call.`,
            },
            {
              q: "Why are there no prices on the site?",
              a: "This is a significant purchase. First we clarify what fits on a ~15‑minute no-obligation call, then we meet in Elad and close there — no online pressure and no misleading “was/now” pricing.",
            },
            {
              q: "Why not just buy online like everyone else?",
              a: "Because here you speak with the sofer who writes — not a cart. You know who writes, what hidur level, and how you continue — before you close.",
            },
            {
              q: "How does the process work?",
              a: "Leave details or WhatsApp → a short phone call → if it’s a fit, we schedule an in-person meeting in Elad.",
            },
            {
              q: "Do you ship?",
              a: "Yes, by arrangement — especially Pitum HaKetoret and items agreed on the call.",
            },
            {
              q: "When can I visit?",
              a: `By appointment, ${SITE.hoursEn}. ${SITE.addressEn}.`,
            },
          ],
    },
    form: {
      h2: isHe ? "בואו נתחיל משיחה" : "Let’s start with a call",
      lead: isHe
        ? "מלאו שם וטלפון. נחזור לתיאום שיחת ייעוץ, ואם זה מתאים לפגישה באלעד."
        : "Name and phone. We’ll call to schedule a consultation, then an in-person meeting in Elad if it fits.",
      name: isHe ? "שם מלא" : "Full name",
      phone: isHe ? "טלפון נייד" : "Mobile phone",
      email: isHe ? "אימייל (אופציונלי)" : "Email (optional)",
      errorEmail: isHe ? "בדקו את כתובת המייל." : "Check the email address.",
      interest: isHe ? "במה להתמקד? (אופציונלי)" : "Focus area (optional)",
      submit: isHe ? "שלחו, נחזור אליכם" : "Send, we’ll get back to you",
      submitting: isHe ? "שולחים…" : "Sending…",
      successTitle: isHe ? "תודה — הפרטים אצלנו" : "Thank you — we have your details",
      success: isHe
        ? "ניצור קשר לתיאום שיחת ייעוץ. אם נוח לכם עכשיו — התקשרו או כתבו בוואטסאפ."
        : "We’ll call to schedule a consultation. Prefer now? Call or WhatsApp.",
      successSteps: isHe
        ? [
            "שיחת ייעוץ קצרה (~15 דק׳), בלי התחייבות",
            "אם זה מתאים — קובעים פגישה פנים־אל־פנים באלעד",
            "סגירת פרטים והזמנה נעשית בפגישה, לא באתר",
          ]
        : [
            "A short consultation call (~15 min), no obligation",
            "If it’s a fit — we schedule an in-person meeting in Elad",
            "Order details are finalized in the meeting, not on this site",
          ],
      successCall: isHe ? "התקשרו עכשיו" : "Call now",
      successWa: isHe ? "וואטסאפ עכשיו" : "WhatsApp now",
      successHome: isHe ? "חזרה לדף הבית" : "Back to home",
      errorPhone: isHe
        ? "בדקו את מספר הנייד (10 ספרות, מתחיל ב־05)."
        : "Check the mobile number (Israeli format).",
      errorGeneric: isHe
        ? "לא הצלחנו לשלוח. נסו שוב או כתבו בוואטסאפ."
        : "Couldn’t send. Try again or message on WhatsApp.",
      errorBot: isHe
        ? "אימות האבטחה נכשל. רעננו את העמוד ונסו שוב."
        : "Security check failed. Refresh and try again.",
      errorRate: isHe
        ? "נשלחו יותר מדי פניות. נסו שוב בעוד כמה דקות."
        : "Too many requests. Try again in a few minutes.",
      privacy: isHe
        ? "השליחה מהווה הסכמה ליצירת קשר לפי"
        : "Sending means you agree to be contacted per our",
      privacyLink: isHe ? "מדיניות הפרטיות" : "Privacy Policy",
      maps: isHe ? "פתיחה בגוגל מפות" : "Open in Google Maps",
      turnstileMissing: isHe
        ? "טופס פעיל במצב פיתוח ללא Turnstile"
        : "Form running in dev without Turnstile",
    },
    sticky: {
      cta: isHe ? "לתיאום שיחה" : "Book a call",
      call: isHe ? "התקשרו" : "Call",
      wa: isHe ? "וואטסאפ" : "WhatsApp",
    },
    portfolio: {
      h2: isHe ? "תיק עבודות" : "Portfolio",
      lead: isHe
        ? "דוגמאות ויזואליות להמחשה. יוחלפו בתמונות של המכון כשיסופקו."
        : "Illustrative visuals for layout. Will be replaced with the institute’s own photos when provided.",
      items: isHe
        ? [
            { title: "תפילין", blurb: "כתיבה מהודרת בליווי אישי" },
            { title: "מזוזות", blurb: "קלפים לבית ולשמחות" },
            { title: "מגילות", blurb: "כתיבה ביד לפי הלכה" },
            { title: "ספר תורה ספרדי", blurb: "בתיק כסף — פרויקטים קהילתיים ומשפחתיים" },
          ]
        : [
            { title: "Tefillin", blurb: "Refined writing with personal guidance" },
            { title: "Mezuzot", blurb: "Scrolls for home and celebrations" },
            { title: "Megillot", blurb: "Hand-written to halacha" },
            { title: "Sephardic Sefer Torah", blurb: "In a silver tik — community and family projects" },
          ],
    },
    navPages: {
      home: isHe ? "ראשי" : "Home",
      about: isHe ? "אודות" : "About",
      services: isHe ? "שירותים" : "Services",
      portfolio: isHe ? "תיק עבודות" : "Portfolio",
      recommendations: isHe ? "המלצות" : "Recommendations",
      faq: isHe ? "שאלות" : "FAQ",
      contact: isHe ? "צור קשר" : "Contact",
    },
    waPrefillGeneral: isHe
      ? "שלום הרב יגאל, הגעתי מהאתר של מכון מקור חכמה ואשמח לשיחת ייעוץ."
      : "Hello Rabbi Yigal, I found Makor Chochma online and would like a consultation call.",
    footer: {
      miniH2: isHe ? "בואו נתחיל משיחה" : "Let’s start with a call",
      miniLead: isHe
        ? "שיחת ייעוץ קצרה, ואם זה מתאים פגישה באלעד."
        : "A short consultation call, then an in-person meeting in Elad if it’s a fit.",
      miniCtaCall: isHe ? "התקשרו עכשיו" : "Call now",
      miniCtaConsult: isHe ? "לתיאום שיחה" : "Book a call",
      navTitle: isHe ? "ניווט" : "Navigate",
      contactTitle: isHe ? "יצירת קשר" : "Contact",
      legalTitle: isHe ? "מידע משפטי" : "Legal",
      offlineDeal: isHe
        ? "הזמנה ותשלום נסגרים בשיחה ובפגישה מול הסופר — לא באתר."
        : "Orders and payment are finalized on the call and in the in-person meeting — not on this site.",
      accessibility: isHe ? "נגישות" : "Accessibility",
      privacy: isHe ? "פרטיות" : "Privacy",
      terms: isHe ? "תנאי שימוש" : "Terms of use",
      maps: isHe ? "פתיחה במפות" : "Open in Maps",
      rights: isHe
        ? `© 2026 ${SITE.brand}`
        : `© 2026 ${SITE.brandEn}`,
    },
    a11y: {
      title: isHe ? "הצהרת נגישות" : "Accessibility statement",
      body: isHe
        ? [
            `${SITE.brand} פועל ליישום הנגישות בהתאם לתקן ישראלי ת״י 5568 ברמת AA ככל הניתן באתר זה.`,
            `אחראי נגישות: ${SITE.contactName}. ליצירת קשר בנושא נגישות: ${SITE.phoneDisplay} או ${SITE.email}.`,
            "אם נתקלתם בבעיית נגישות — כתבו או התקשרו ונטפל בהקדם.",
            "האתר תומך בניווט מקלדת, מבנה כותרות, ניגודיות גבוהה יחסית, וכיבוד העדפת הפחתת תנועה בדפדפן.",
          ]
        : [
            `${SITE.brandEn} aims to meet Israeli Standard SI 5568 (WCAG-aligned) Level AA where reasonably possible.`,
            `Accessibility contact: ${SITE.contactNameEn}, ${SITE.phoneDisplay} or ${SITE.email}.`,
            "If you find an accessibility barrier, please contact us and we will address it promptly.",
            "The site supports keyboard navigation, heading structure, strong contrast, and prefers-reduced-motion.",
          ],
    },
    privacy: {
      title: isHe ? "מדיניות פרטיות" : "Privacy Policy",
      body: isHe
        ? [
            "אנו אוספים שם מלא, מספר טלפון, ובחירת תחום עניין כשאתם שולחים את טופס יצירת הקשר — לצורך חזרה אליכם לתיאום שיחת ייעוץ ופגישה.",
            `המידע נשלח ל־${SITE.email} ונשמר אצל מפעיל האתר לטיפול בפניות. אינו נמכר לצדדים שלישיים.`,
            "שירותי תשתית (אירוח, שליחת מייל, אנטי־בוט, אנליטיקס אם הופעל) עשויים לעבד נתונים טכניים לפי מדיניות הספק.",
            `למחיקת פרטים או שאלות: ${SITE.email} או ${SITE.phoneDisplay}.`,
            "אין רכישה או סליקה באתר; פרטי תשלום אינם נאספים כאן.",
          ]
        : [
            "We collect your full name, phone number, and interest topic when you submit the contact form — to call you back for a consultation and meeting.",
            `Data is emailed to ${SITE.email} and retained by the site operator to handle inquiries. It is not sold to third parties.`,
            "Infrastructure providers (hosting, email, bot protection, analytics if enabled) may process technical data under their policies.",
            `To request deletion or ask questions: ${SITE.email} or ${SITE.phoneDisplay}.`,
            "There is no checkout on this site; payment details are never collected here.",
          ],
    },
    terms: {
      title: isHe ? "תנאי שימוש" : "Terms of use",
      body: isHe
        ? [
            `האתר של ${SITE.brand} מיועד למידע וליצירת קשר לתיאום שיחת ייעוץ ופגישה עם ${SITE.contactName}.`,
            "אין רכישה, סליקה, עגלה או מחירים באתר. הזמנה ותשלום נסגרים בשיחה ובפגישה פנים־אל־פנים באלעד.",
            "תמונות המסומנות «הדמיה» הן להמחשה בלבד ואינן מצגות מוצר ספציפי שנמסר ללקוח.",
            `השימוש באתר כפוף לדין הישראלי. לשאלות: ${SITE.phoneDisplay} או ${SITE.email}.`,
          ]
        : [
            `The ${SITE.brandEn} site is for information and contacting us to schedule a consultation and meeting with ${SITE.contactNameEn}.`,
            "There is no purchase, payment, cart, or pricing on this site. Orders and payment are finalized on a call and in an in-person meeting in Elad.",
            "Images labeled as illustrative are for atmosphere only and do not depict a specific delivered item.",
            `Use of this site is governed by Israeli law. Contact: ${SITE.phoneDisplay} or ${SITE.email}.`,
          ],
    },
  };
}

export type Copy = ReturnType<typeof getCopy>;
