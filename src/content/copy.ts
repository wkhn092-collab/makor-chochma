import { SITE } from "./site";

export type Locale = "he" | "en";

export function getCopy(locale: Locale) {
  const isHe = locale === "he";
  return {
    locale,
    dir: isHe ? ("rtl" as const) : ("ltr" as const),
    meta: {
      title: isHe
        ? `${SITE.brand} | סת״ם אצל הסופר · אלעד`
        : `${SITE.brandEn} | Stam by the sofer · Elad`,
      description: isHe
        ? `תפילין, מזוזות, מגילות, ספרי תורה ופיטום הקטורת בכתיבת הרב יגאל עמרני — ${SITE.yearsExperience} שנה, מוסמך משמרת סת״ם ויד רפאל. שיחה לפני שסוגרים, פגישה באלעד.`
        : `Tefillin, mezuzot, megillot, Sifrei Torah and Pitum HaKetoret by Rabbi Yigal Amarani — ${SITE.yearsExperience} years, Mishmeret Stam & Yad Rafael. Call first, then meet in Elad.`,
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
      // Full range · ≤8 words · N23: name what is sold
      h1: isHe
        ? "סת״ם שנכתב אצל הסופר"
        : "Stam written by the sofer",
      h1YearsSuffix: isHe ? "שנה על הקלף" : "years on the parchment",
      h2: isHe
        ? "תפילין, מזוזות, מגילות, ספרי תורה ופיטום הקטורת. הרב יגאל עמרני · מוסמך משמרת סת״ם ויד רפאל · קודם שיחה, המחיר בפגישה."
        : "Tefillin, mezuzot, megillot, Sifrei Torah and Pitum HaKetoret. Rabbi Yigal Amarani · Mishmeret Stam & Yad Rafael · a call first, price in the meeting.",
      ctaPrimary: isHe ? "לתיאום שיחה" : "Book a call",
      ctaCall: isHe ? "התקשרו עכשיו" : "Call now",
      ctaSecondary: isHe
        ? "וואטסאפ להרב יגאל"
        : "WhatsApp Rabbi Yigal",
      micro: isHe
        ? "שיחה קצרה, בלי התחייבות · כ־15 דק׳ · ואז פגישה באלעד אם מתאים"
        : "A short call, no obligation · ~15 min · then meet in Elad if it fits",
      simulation: isHe ? "צילום להמחשה" : "Stock photo",
    },
    trust: isHe
      ? `תפילין · מזוזות · מגילות · ספרי תורה · פיטום · משמרת סת״ם · יד רפאל · ${SITE.yearsExperience} שנה`
      : `Tefillin · mezuzot · megillot · Sifrei Torah · Pitum · Mishmeret Stam · Yad Rafael · ${SITE.yearsExperience} years`,
    about: {
      h2: isHe ? SITE.contactName : SITE.contactNameEn,
      body: isHe
        ? `סופר סת״ם שכותב תפילין, מזוזות, מגילות וספרי תורה כבר ${SITE.yearsExperience} שנה — וגם פיטום הקטורת בתיאום. מוסמך משמרת סת״ם ומכון יד רפאל של הרב מועלם. גם מכשיר סופרים — מי שמלמד, חייב לדעת לכתוב.`
        : `A sofer who has written tefillin, mezuzot, megillot and Sifrei Torah for ${SITE.yearsExperience} years — and Pitum HaKetoret by arrangement. Certified by Mishmeret Stam and Yad Rafael (Rabbi Moalem). He also trains sofrim — if you teach, you must know how to write.`,
      line: isHe
        ? "הסת״ם מגיע מהסופר שכותב אותו — עם שם, ובשיחה לפני שסוגרים."
        : "The stam comes from the sofer who writes it — with a name, and a call before you close.",
      yearsLabel: isHe ? "שנות כתיבה" : "years of writing",
      certPending: isHe
        ? "תמונת תעודה תתווסף כשתסופק · כרגע מצוין השם בלבד"
        : "Certificate image will be added when provided",
    },
    /** Wedge — us vs anonymous online buy (no competitor names) */
    whyUs: {
      eyebrow: isHe ? "למה אצלנו" : "Why here",
      h2: isHe
        ? "לקנות סת״ם בלחיצה — או לדעת מי כותב"
        : "Buy stam with a click — or know who writes",
      lead: isHe
        ? "באתרים רבים קונים סת״ם כמו מוצר בעגלה. כאן מתחילים משיחה עם מי שכותב — תפילין, מזוזה, מגילה או ספר תורה."
        : "On many sites you buy stam like a cart product. Here you start with a call to the person who writes — tefillin, mezuzah, megillah or Sefer Torah.",
      themLabel: isHe ? "קנייה אונליין טיפוסית" : "Typical online purchase",
      usLabel: isHe ? "מכון מקור חכמה" : "Makor Chochma",
      rows: isHe
        ? [
            { them: "מוצר בעגלה, מחיר על המסך", us: "שיחה עם הרב יגאל, בלי התחייבות" },
            { them: "לא ברור מי כתב את הקלף", us: `הרב יגאל עמרני · ${SITE.yearsExperience} שנה על הקלף` },
            { them: "לחץ לסגור מרחוק", us: "פגישה באלעד — סוגרים פנים אל פנים" },
            { them: "«מהודר» בלי שם מגיה", us: "מוסמך משמרת סת״ם ויד רפאל · מלמד סופרים" },
          ]
        : [
            { them: "Product in a cart, price on screen", us: "A call with Rabbi Yigal, no obligation" },
            { them: "Unclear who wrote the parchment", us: `Rabbi Yigal Amarani · ${SITE.yearsExperience} years on the parchment` },
            { them: "Pressure to close remotely", us: "Meet in Elad — close face to face" },
            { them: "“Mehudar” with no magiah named", us: "Mishmeret Stam & Yad Rafael · trains sofrim" },
          ],
      cta: isHe ? "התקשרו עכשיו" : "Call now",
      ctaSecondary: isHe ? "השאירו פרטים" : "Leave your details",
    },
    statement: isHe
      ? "מחפשים תפילין, מזוזות, מגילה, ספר תורה או פיטום הקטורת — ולא רוצים לקנות בלחיצה. רוצים לדעת מי כותב, מה רמת ההידור, ואיך הקלף מרגיש ביד. במכון מקור חכמה: דיו, קלף, ושיחה עם הסופר לפני שסוגרים."
      : "You’re looking for tefillin, mezuzot, a megillah, Sefer Torah or Pitum HaKetoret — and don’t want to buy with a click. You want to know who writes, what hidur level, and how the klaf feels in hand. At Makor Chochma: ink, parchment, and a talk with the sofer before you close.",
    quote: isHe
      ? "אני כותב על הקלף בעצמי — מהשיחה הראשונה עד שהדבר אצלכם."
      : "I write on the parchment myself — from the first call until it’s with you.",
    craft: {
      h2: isHe ? "משיחה עד סת״ם ביד" : "From a call to stam in hand",
      lead: isHe
        ? "גללו — המסלול נצבע בזהב. כל שלב מחליף את הסיפור למעלה."
        : "Scroll — the path fills in gold. Each stage rewrites the story above.",
      cta: isHe ? "השאירו פרטים" : "Leave your details",
      steps: isHe
        ? [
            { n: "01", title: "שיחה על מה שצריך", body: "תפילין, מזוזות, מגילה, ספר תורה או פיטום הקטורת. המחיר נסגר בפגישה." },
            { n: "02", title: "קלף ודיו ביד", body: "כתיבה ידנית על קלף — לא הדפסה. הסופר שדיברתם איתו הוא שכותב." },
            { n: "03", title: "הגהה וליווי", body: "בדיקות, הסבר על ההידור, ושקיפות מולכם בכל שלב." },
            { n: "04", title: "פגישה באלעד", body: "סוגרים פנים אל פנים. הזמנה ותשלום — בפגישה, לא באתר." },
          ]
        : [
            { n: "01", title: "A call about what you need", body: "Tefillin, mezuzot, a megillah, Sefer Torah or Pitum HaKetoret. Price is set in the meeting." },
            { n: "02", title: "Parchment and ink by hand", body: "Handwriting on klaf — never print. The sofer you spoke with is the one who writes." },
            { n: "03", title: "Proofing and guidance", body: "Checks, a clear hidur explanation, and transparency at every step." },
            { n: "04", title: "Meeting in Elad", body: "Close face to face. Order and payment — in the meeting, not on this site." },
          ],
    },
    services: {
      h2: isHe ? "מה כותבים ומספקים אצלנו" : "What we write and supply",
      lead: isHe
        ? "בחרו נושא אחד — תפילין, מזוזות, מגילות, פיטום או ייעוץ. הבחירה נשמרת לטופס ולואטסאפ. המחיר נסגר בפגישה."
        : "Pick one topic — tefillin, mezuzot, megillot, Pitum or advice. It carries to the form and WhatsApp. Price is set in the meeting.",
      selected: isHe ? "נבחר" : "Selected",
      hint: isHe
        ? "נשמר לטופס ולואטסאפ. אפשר לשנות לפני השליחה."
        : "Saved for the form and WhatsApp. You can change it before sending.",
    },
    testimonials: {
      h2: isHe
        ? "מה אומרים מי שכבר לקחו סת״ם אצלנו"
        : "What people say after getting stam here",
      moreTitle: isHe ? "עוד לקוחות משתפים" : "More clients share",
      prev: isHe ? "הקודם" : "Previous",
      next: isHe ? "הבא" : "Next",
      swipeHint: isHe ? "החליקו לראות עוד המלצות" : "Swipe for more testimonials",
    },
    faq: {
      h2: isHe ? "שאלות לפני שמזמינים סת״ם" : "Questions before you order stam",
      sidePhotoCaption: isHe ? "כתיבה ידנית על קלף" : "Hand writing on parchment",
      sideTrustTitle: isHe ? "לפני השיחה" : "Before you call",
      sideTrust: isHe
        ? [
            "תפילין · מזוזות · מגילות · ספרי תורה · פיטום",
            "כתיבת הרב יגאל — משמרת סת״ם ויד רפאל",
            "שיחה קצרה, ואז פגישה באלעד",
          ]
        : [
            "Tefillin · mezuzot · megillot · Sifrei Torah · Pitum",
            "Written by Rabbi Yigal — Mishmeret Stam & Yad Rafael",
            "Short call, then meet in Elad",
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
              q: "מה אפשר להזמין אצלכם?",
              a: "תפילין, מזוזות, מגילות, ספרי תורה ופיטום הקטורת. בשיחה מבהירים מה מתאים — ואז נפגשים באלעד אם צריך.",
            },
            {
              q: "מי כותב את הסת״ם?",
              a: `הרב יגאל עמרני — סופר סת״ם עם ${SITE.yearsExperience} שנות כתיבה, מוסמך משמרת סת״ם ומכון יד רפאל, גם מכשיר סופרים. בשיחה תשמעו בדיוק מה נכתב ומה נבדק.`,
            },
            {
              q: "איך אדע מה רמת ההידור?",
              a: "לא כותבים «מהודר» בלי הסבר. בשיחה ובפגישה מקבלים פירוט על הקלף, הכתיבה והבדיקות — לפי מה שמתאים לכם.",
            },
            {
              q: "למה אין מחירים באתר?",
              a: "כי כל הזמנה נבחרת לפי הידור וצרכים — תפילין, מזוזה או ספר תורה. קודם שיחה קצרה (~15 דק׳), אחר כך פגישה באלעד וסגירה שם.",
            },
            {
              q: "למה לא לקנות סת״ם בלחיצה כמו כולם?",
              a: "כי כאן מדברים עם הסופר שכותב. יודעים מי כתב, מה נבדק, ואיך ממשיכים — לפני שסוגרים.",
            },
            {
              q: "איך מתקדמים בפועל?",
              a: "משאירים פרטים או כותבים בוואטסאפ → שיחה קצרה → אם מתאים, קובעים פגישה באלעד.",
            },
            {
              q: "יש משלוחים?",
              a: "כן, בתיאום — במיוחד לפיטום הקטורת ולפריטים שסוכמו בשיחה.",
            },
            {
              q: "מתי אפשר להגיע?",
              a: `בתיאום מראש, בין ${SITE.hoursHe.replace(" בתיאום מראש", "")}. ${SITE.addressHe}.`,
            },
          ]
        : [
            {
              q: "What can I order?",
              a: "Tefillin, mezuzot, megillot, Sifrei Torah and Pitum HaKetoret. On the call we clarify what fits — then meet in Elad if needed.",
            },
            {
              q: "Who writes the stam?",
              a: `Rabbi Yigal Amarani — a sofer with ${SITE.yearsExperience} years of writing, certified by Mishmeret Stam and Yad Rafael, who also trains sofrim. On the call you’ll hear exactly what is written and what is checked.`,
            },
            {
              q: "How do I know the hidur level?",
              a: "We don’t say “mehudar” without explaining. On the call and in the meeting you get detail on the klaf, writing, and checks — matched to what fits you.",
            },
            {
              q: "Why are there no prices on the site?",
              a: "Because every order is chosen by hidur and needs — tefillin, mezuzah or Sefer Torah. First a short call (~15 min), then a meeting in Elad where you close.",
            },
            {
              q: "Why not buy stam online like everyone else?",
              a: "Because here you speak with the sofer who writes. You know who wrote, what was checked, and how you continue — before you close.",
            },
            {
              q: "How does the process work?",
              a: "Leave details or WhatsApp → a short call → if it’s a fit, we schedule a meeting in Elad.",
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
        ? "שם וטלפון. נחזור לתיאום שיחה — תפילין, מזוזות, מגילה, ספר תורה או פיטום — ואם מתאים לפגישה באלעד."
        : "Name and phone. We’ll call about tefillin, mezuzot, megillah, Sefer Torah or Pitum — then meet in Elad if it fits.",
      name: isHe ? "שם מלא" : "Full name",
      phone: isHe ? "טלפון נייד" : "Mobile phone",
      email: isHe ? "אימייל (אופציונלי)" : "Email (optional)",
      errorEmail: isHe ? "בדקו את כתובת המייל." : "Check the email address.",
      interest: isHe ? "במה להתמקד? (אופציונלי)" : "Focus area (optional)",
      submit: isHe ? "שלחו — נחזור לשיחה" : "Send — we’ll call you back",
      submitting: isHe ? "שולחים…" : "Sending…",
      successTitle: isHe ? "תודה — הפרטים אצלנו" : "Thank you — we have your details",
      success: isHe
        ? "ניצור קשר לתיאום שיחה. אם נוח עכשיו — התקשרו או כתבו בוואטסאפ."
        : "We’ll call to schedule a talk. Prefer now? Call or WhatsApp.",
      successSteps: isHe
        ? [
            "שיחה קצרה (~15 דק׳), בלי התחייבות",
            "אם מתאים — קובעים פגישה באלעד",
            "הזמנה ותשלום נסגרים בפגישה, לא באתר",
          ]
        : [
            "A short call (~15 min), no obligation",
            "If it’s a fit — we schedule a meeting in Elad",
            "Order and payment close in the meeting, not on this site",
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
      cta: isHe ? "השאירו פרטים" : "Leave your details",
      call: isHe ? "התקשרו" : "Call",
      wa: isHe ? "וואטסאפ" : "WhatsApp",
    },
    portfolio: {
      h2: isHe ? "מה יוצא מהסדנה" : "What leaves the atelier",
      lead: isHe
        ? "תפילין, מזוזות, מגילות וספרי תורה — צילומים להמחשה עד שיגיעו תמונות מהמכון."
        : "Tefillin, mezuzot, megillot and Sifrei Torah — illustrative photos until the institute’s own arrive.",
      items: isHe
        ? [
            { title: "תפילין", blurb: "פרשיות בכתיבת הסופר — רש״י או ר״ת, בשיחה" },
            { title: "מזוזות", blurb: "קלף לבית, למשרד ולשמחות" },
            { title: "מגילות", blurb: "כתיבה ביד על קלף" },
            { title: "ספר תורה ספרדי", blurb: "בתיק כסף — לקהילה ולמשפחה" },
          ]
        : [
            { title: "Tefillin", blurb: "Parchments by the sofer — Rashi or R\"T, chosen on the call" },
            { title: "Mezuzot", blurb: "Klaf for home, office, and celebrations" },
            { title: "Megillot", blurb: "Handwriting on parchment" },
            { title: "Sephardic Sefer Torah", blurb: "In a silver tik — for community and family" },
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
      ? "שלום הרב יגאל, הגעתי מהאתר של מכון מקור חכמה ואשמח לשיחה על סת״ם."
      : "Hello Rabbi Yigal, I found Makor Chochma online and would like to talk about stam.",
    footer: {
      miniH2: isHe ? "בואו נדבר" : "Let’s talk",
      miniLead: isHe
        ? "שיחה קצרה על מה שצריך — תפילין, מזוזות, מגילה, ספר תורה או פיטום — ואם מתאים פגישה באלעד."
        : "A short call about what you need — tefillin, mezuzot, megillah, Sefer Torah or Pitum — then Elad if it fits.",
      miniCtaCall: isHe ? "התקשרו עכשיו" : "Call now",
      miniCtaConsult: isHe ? "השאירו פרטים" : "Leave your details",
      navTitle: isHe ? "ניווט" : "Navigate",
      contactTitle: isHe ? "יצירת קשר" : "Contact",
      legalTitle: isHe ? "מידע משפטי" : "Legal",
      offlineDeal: isHe
        ? "הזמנה ותשלום נסגרים בשיחה ובפגישה מול הסופר — לא באתר."
        : "Orders and payment close on the call and in the meeting — not on this site.",
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
            "שירותי תשתית (אירוח, שליחת מייל, אנטי־בוט) עשויים לעבד נתונים טכניים לפי מדיניות הספק.",
            "כלי אנליטיקס (GA4 / Clarity) נטענים רק אחרי שתאשרו מדידה בבאנר ההסכמה — אפשר לסרב.",
            `למחיקת פרטים או שאלות: ${SITE.email} או ${SITE.phoneDisplay}.`,
            "אין רכישה או סליקה באתר; פרטי תשלום אינם נאספים כאן.",
          ]
        : [
            "We collect your full name, phone number, and interest topic when you submit the contact form — to call you back for a consultation and meeting.",
            `Data is emailed to ${SITE.email} and retained by the site operator to handle inquiries. It is not sold to third parties.`,
            "Infrastructure providers (hosting, email, bot protection) may process technical data under their policies.",
            "Analytics (GA4 / Clarity) load only after you accept measurement in the consent banner — you may decline.",
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
