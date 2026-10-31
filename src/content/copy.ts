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
        ? `תפילין, מזוזות, מגילות, ספרי תורה ופיטום הקטורת בכתיבת הרב יגאל עמרני. ${SITE.yearsExperience} שנה, מוסמך משמרת סת״ם ויד רפאל. שיחה לפני שסוגרים, ופגישה באלעד.`
        : `Tefillin, mezuzot, megillot, Sifrei Torah and Pitum HaKetoret by Rabbi Yigal Amarani. ${SITE.yearsExperience} years, Mishmeret Stam & Yad Rafael. Call first, then meet in Elad.`,
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
      // Recommended CRO hook — years only in h2 (no duplicate)
      h1: isHe ? "לא קונים סת״ם בלחיצה" : "Don’t buy stam with a click",
      h1YearsSuffix: isHe ? "" : "",
      h2: isHe
        ? `${SITE.yearsExperience} שנה על הקלף, משמרת סת״ם ויד רפאל. שיחה עם הסופר, ואז פגישה באלעד.`
        : `${SITE.yearsExperience} years on the parchment, Mishmeret Stam & Yad Rafael. Talk to the sofer, then meet in Elad.`,
      ctaPrimary: isHe ? "לתיאום שיחה" : "Book a call",
      ctaCall: isHe ? "התקשרו עכשיו" : "Call now",
      ctaSecondary: isHe
        ? "וואטסאפ להרב יגאל"
        : "WhatsApp Rabbi Yigal",
      micro: isHe
        ? "שיחה בלי התחייבות · אלעד"
        : "No-obligation call · Elad",
      /** Concrete value under CTA — what the call delivers */
      valueLine: isHe
        ? "בשיחה מבהירים הידור ומחיר — בלי עגלה ובלי לחץ לסגור"
        : "On the call we clarify hidur and price — no cart, no pressure to close",
      simulation: isHe ? "צילום להמחשה" : "Stock photo",
    },
    trust: isHe
      ? `תפילין · מזוזות · מגילות · ספרי תורה · פיטום · משמרת סת״ם · יד רפאל · ${SITE.yearsExperience} שנה`
      : `Tefillin · mezuzot · megillot · Sifrei Torah · Pitum · Mishmeret Stam · Yad Rafael · ${SITE.yearsExperience} years`,
    about: {
      h2: isHe ? SITE.contactName : SITE.contactNameEn,
      body: isHe
        ? `סופר סת״ם שכותב תפילין, מזוזות, מגילות וספרי תורה כבר ${SITE.yearsExperience} שנה, וגם פיטום הקטורת בתיאום. מוסמך משמרת סת״ם ומכון יד רפאל של הרב מועלם. גם מכשיר סופרים: מי שמלמד, חייב לדעת לכתוב.`
        : `A sofer who has written tefillin, mezuzot, megillot and Sifrei Torah for ${SITE.yearsExperience} years, and Pitum HaKetoret by arrangement. Certified by Mishmeret Stam and Yad Rafael (Rabbi Moalem). He also trains sofrim: if you teach, you must know how to write.`,
      line: isHe
        ? "הסת״ם מגיע מהסופר שכותב אותו, עם שם, ובשיחה לפני שסוגרים."
        : "The stam comes from the sofer who writes it, with a name, and a call before you close.",
      yearsLabel: isHe ? "שנות כתיבה" : "years of writing",
      certPending: isHe ? "" : "",
    },
    /** Wedge — us vs anonymous online buy (no competitor names) */
    whyUs: {
      eyebrow: isHe ? "למה אצלנו" : "Why here",
      h2: isHe
        ? "לקנות סת״ם בלחיצה, או לדעת מי כותב"
        : "Buy stam with a click, or know who writes",
      lead: isHe
        ? "באתרים רבים קונים סת״ם כמו מוצר בעגלה. כאן מתחילים משיחה עם מי שכותב: תפילין, מזוזה, מגילה או ספר תורה — ומקבלים בהירות על הידור ומחיר לפני שסוגרים."
        : "On many sites you buy stam like a cart product. Here you start with a call to the person who writes: tefillin, mezuzah, megillah or Sefer Torah — and get clarity on hidur and price before you close.",
      themLabel: isHe ? "קנייה אונליין טיפוסית" : "Typical online purchase",
      usLabel: isHe ? "מכון מקור חכמה" : "Makor Chochma",
      rows: isHe
        ? [
            { them: "מוצר בעגלה, סגירה מרחוק", us: "שיחה עם הרב יגאל, בלי התחייבות" },
            { them: "לא ברור מי כתב את הקלף", us: `הרב יגאל עמרני · ${SITE.yearsExperience} שנה על הקלף` },
            { them: "לחץ לסגור מרחוק", us: "פגישה באלעד, פנים אל פנים" },
            { them: "«מהודר» בלי שם מגיה", us: "מוסמך משמרת סת״ם ויד רפאל · מלמד סופרים" },
          ]
        : [
            { them: "Product in a cart, close remotely", us: "A call with Rabbi Yigal, no obligation" },
            { them: "Unclear who wrote the parchment", us: `Rabbi Yigal Amarani · ${SITE.yearsExperience} years on the parchment` },
            { them: "Pressure to close remotely", us: "Meet in Elad, face to face" },
            { them: "“Mehudar” with no magiah named", us: "Mishmeret Stam & Yad Rafael · trains sofrim" },
          ],
      proof: isHe
        ? "מה מקבלים בשיחה: מי כותב · רמת הידור · טווח מחיר · האם פגישה באלעד מתאימה"
        : "What the call covers: who writes · hidur level · price range · whether an Elad meeting fits",
      cta: isHe ? "התקשרו עכשיו" : "Call now",
      ctaSecondary: isHe ? "השאירו פרטים" : "Leave your details",
    },
    statement: isHe
      ? "מחפשים תפילין, מזוזות, מגילה, ספר תורה או פיטום הקטורת, ולא רוצים לקנות בלחיצה. רוצים לדעת מי כותב, מה רמת ההידור, ואיך הקלף מרגיש ביד. במכון מקור חכמה: דיו, קלף, ושיחה עם הסופר לפני שסוגרים."
      : "You’re looking for tefillin, mezuzot, a megillah, Sefer Torah or Pitum HaKetoret, and don’t want to buy with a click. You want to know who writes, what hidur level, and how the klaf feels in hand. At Makor Chochma: ink, parchment, and a talk with the sofer before you close.",
    quote: isHe
      ? "אני כותב על הקלף בעצמי, מהשיחה הראשונה עד שהדבר אצלכם."
      : "I write on the parchment myself, from the first call until it’s with you.",
    craft: {
      h2: isHe ? "משיחה עד סת״ם ביד" : "From a call to stam in hand",
      lead: isHe
        ? "ארבעה שלבים, מסופר על הקלף."
        : "Four stages, told on the parchment.",
      cta: isHe ? "השאירו פרטים" : "Leave your details",
      steps: isHe
        ? [
            { n: "01", title: "שיחה על מה שצריך", body: "תפילין, מזוזות, מגילה, ספר תורה או פיטום הקטורת: מבהירים יחד מה מתאים." },
            { n: "02", title: "קלף ודיו ביד", body: "כתיבה ידנית על קלף, לא הדפסה. הסופר שדיברתם איתו הוא שכותב." },
            { n: "03", title: "הגהה וליווי", body: "בדיקות, הסבר על ההידור, ושקיפות מולכם בכל שלב." },
            { n: "04", title: "פגישה באלעד", body: "סוגרים פנים אל פנים וממשיכים משם." },
          ]
        : [
            { n: "01", title: "A call about what you need", body: "Tefillin, mezuzot, a megillah, Sefer Torah or Pitum HaKetoret: we clarify together what fits." },
            { n: "02", title: "Parchment and ink by hand", body: "Handwriting on klaf, never print. The sofer you spoke with is the one who writes." },
            { n: "03", title: "Proofing and guidance", body: "Checks, a clear hidur explanation, and transparency at every step." },
            { n: "04", title: "Meeting in Elad", body: "Close face to face and continue from there." },
          ],
    },
    services: {
      h2: isHe ? "מה כותבים ומספקים אצלנו" : "What we write and supply",
      lead: isHe
        ? "בחרו נושא אחד: תפילין, מזוזות, מגילות, ספרי תורה, פיטום או ייעוץ. הבחירה נשמרת לטופס ולואטסאפ."
        : "Pick one topic: tefillin, mezuzot, megillot, Sifrei Torah, Pitum or advice. It carries to the form and WhatsApp.",
      selected: isHe ? "נבחר" : "Selected",
      hint: isHe
        ? "נשמר לטופס ולואטסאפ. אפשר לשנות לפני השליחה."
        : "Saved for the form and WhatsApp. You can change it before sending.",
    },
    testimonials: {
      h2: isHe
        ? "מה אומרים לקוחות שבחרו להפקיד את הסת״ם שלהם בידיים טובות?"
        : "What clients say after trusting their stam to careful hands",
      moreTitle: isHe ? "לקוחות נוספים משתפים" : "More clients share",
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
            "כתיבת הרב יגאל, משמרת סת״ם ויד רפאל",
            "שיחה קצרה, ואז פגישה באלעד",
          ]
        : [
            "Tefillin · mezuzot · megillot · Sifrei Torah · Pitum",
            "Written by Rabbi Yigal, Mishmeret Stam & Yad Rafael",
            "Short call, then meet in Elad",
          ],
      sideNextTitle: isHe ? "רוצים תשובה מהירה?" : "Want a quick answer?",
      sideNextLead: isHe
        ? "כתבו בוואטסאפ או השאירו פרטים, ונחזור לתיאום שיחה."
        : "WhatsApp us or leave details, and we’ll schedule a call.",
      sideCtaForm: isHe ? "להשארת פרטים" : "Leave details",
      sideCtaWa: isHe ? "וואטסאפ" : "WhatsApp",
      sideMetaHours: isHe ? SITE.hoursHe : SITE.hoursEn,
      sideMetaPlace: isHe ? "אלעד · בתיאום" : "Elad · by appointment",
      items: isHe
        ? [
            {
              q: "מה אפשר להזמין אצלכם?",
              a: "תפילין, מזוזות, מגילות, ספרי תורה ופיטום הקטורת. בשיחה מבהירים מה מתאים, ואז נפגשים באלעד אם צריך.",
            },
            {
              q: "מי כותב את הסת״ם?",
              a: `הרב יגאל עמרני, סופר סת״ם עם ${SITE.yearsExperience} שנות כתיבה, מוסמך משמרת סת״ם ומכון יד רפאל, גם מכשיר סופרים. בשיחה תשמעו בדיוק מה נכתב ומה נבדק.`,
            },
            {
              q: "איך אדע מה רמת ההידור?",
              a: "לא כותבים «מהודר» בלי הסבר. בשיחה ובפגישה מקבלים פירוט על הקלף, הכתיבה והבדיקות, לפי מה שמתאים לכם.",
            },
            {
              q: "איך בוחרים מה מתאים?",
              a: "כל הזמנה לפי הידור וצרכים: תפילין, מזוזה או ספר תורה. בשיחה קצרה מבהירים יחד, ואם מתאים נפגשים באלעד.",
            },
            {
              q: "למה לא לקנות סת״ם בלחיצה כמו כולם?",
              a: "כי כאן מדברים עם הסופר שכותב. יודעים מי כתב, מה נבדק, ואיך ממשיכים, לפני שסוגרים.",
            },
            {
              q: "איך מתקדמים בפועל?",
              a: "משאירים פרטים או כותבים בוואטסאפ, עוברים לשיחה קצרה, ואם מתאים קובעים פגישה באלעד.",
            },
            {
              q: "יש משלוחים?",
              a: "כן, בתיאום, במיוחד לפיטום הקטורת ולפריטים שסוכמו בשיחה.",
            },
            {
              q: "מתי אפשר להגיע?",
              a: `בתיאום מראש, בין ${SITE.hoursHe.replace(" בתיאום מראש", "")}. ${SITE.addressHe}.`,
            },
          ]
        : [
            {
              q: "What can I order?",
              a: "Tefillin, mezuzot, megillot, Sifrei Torah and Pitum HaKetoret. On the call we clarify what fits, then meet in Elad if needed.",
            },
            {
              q: "Who writes the stam?",
              a: `Rabbi Yigal Amarani, a sofer with ${SITE.yearsExperience} years of writing, certified by Mishmeret Stam and Yad Rafael, who also trains sofrim. On the call you’ll hear exactly what is written and what is checked.`,
            },
            {
              q: "How do I know the hidur level?",
              a: "We don’t say “mehudar” without explaining. On the call and in the meeting you get detail on the klaf, writing, and checks, matched to what fits you.",
            },
            {
              q: "How do you choose what fits?",
              a: "Every order is by hidur and needs: tefillin, mezuzah or Sefer Torah. On a short call we clarify together, then meet in Elad if it fits.",
            },
            {
              q: "Why not buy stam online like everyone else?",
              a: "Because here you speak with the sofer who writes. You know who wrote, what was checked, and how you continue, before you close.",
            },
            {
              q: "How does the process work?",
              a: "Leave details or WhatsApp, have a short call, and if it’s a fit we schedule a meeting in Elad.",
            },
            {
              q: "Do you ship?",
              a: "Yes, by arrangement, especially Pitum HaKetoret and items agreed on the call.",
            },
            {
              q: "When can I visit?",
              a: `By appointment, ${SITE.hoursEn}. ${SITE.addressEn}.`,
            },
          ],
    },
    form: {
      h2: isHe ? "שיחה קצרה. בלי התחייבות." : "A short call. No obligation.",
      lead: isHe
        ? "שם וטלפון. נחזור לתיאום שיחה על תפילין, מזוזות, מגילה, ספר תורה או פיטום, ואם מתאים גם לפגישה באלעד."
        : "Name and phone. We’ll call about tefillin, mezuzot, megillah, Sefer Torah or Pitum, then meet in Elad if it fits.",
      name: isHe ? "שם מלא" : "Full name",
      phone: isHe ? "טלפון נייד" : "Mobile phone",
      email: isHe ? "אימייל (אופציונלי)" : "Email (optional)",
      errorEmail: isHe ? "בדקו את כתובת המייל." : "Check the email address.",
      interest: isHe ? "במה להתמקד? (אופציונלי)" : "Focus area (optional)",
      submit: isHe ? "שלחו, ונחזור לשיחה" : "Send, and we’ll call you back",
      submitting: isHe ? "שולחים…" : "Sending…",
      successTitle: isHe ? "תודה, הפרטים אצלנו" : "Thank you, we have your details",
      success: isHe
        ? "ניצור קשר לתיאום שיחה. אם נוח עכשיו, התקשרו או כתבו בוואטסאפ."
        : "We’ll call to schedule a talk. Prefer now? Call or WhatsApp.",
      successSteps: isHe
        ? [
            "שיחה קצרה, בלי התחייבות",
            "אם מתאים, קובעים פגישה באלעד",
            "הפרטים נסגרים בפגישה באלעד",
          ]
        : [
            "A short call, no obligation",
            "If it’s a fit, we schedule a meeting in Elad",
            "Details are finalized in the Elad meeting",
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
        ? "השליחה מהווה הסכמה ליצירת קשר חוזר לתיאום שיחת ייעוץ (טלפון / וואטסאפ), לפי"
        : "Submitting means you agree we may contact you to schedule a consultation (phone / WhatsApp), per our",
      privacyLink: isHe ? "מדיניות הפרטיות" : "Privacy Policy",
      privacyMarketing: isHe
        ? "לא נשלח דיוור פרסומי המוני בלי הסכמה נפרדת."
        : "We will not send bulk marketing without separate consent.",
      maps: isHe ? "פתיחה בגוגל מפות" : "Open in Google Maps",
      turnstileMissing: isHe
        ? "טופס פעיל במצב פיתוח ללא Turnstile"
        : "Form running in dev without Turnstile",
    },
    sticky: {
      cta: isHe ? "תיאום שיחה" : "Book a call",
      call: isHe ? "התקשרו" : "Call",
      wa: isHe ? "וואטסאפ" : "WhatsApp",
    },
    portfolio: {
      h2: isHe ? "מה יוצא מהסדנה" : "What leaves the atelier",
      lead: isHe
        ? "תפילין, מזוזות, מגילות וספרי תורה מהסדנה."
        : "Tefillin, mezuzot, megillot and Sifrei Torah from the atelier.",
      items: isHe
        ? [
            { title: "תפילין", blurb: "פרשיות בכתיבת הסופר, רש״י או ר״ת, בשיחה" },
            { title: "מזוזות", blurb: "קלף לבית, למשרד ולשמחות" },
            { title: "מגילות", blurb: "כתיבה ביד על קלף" },
            { title: "ספר תורה ספרדי", blurb: "בתיק כסף, לקהילה ולמשפחה" },
          ]
        : [
            { title: "Tefillin", blurb: "Parchments by the sofer, Rashi or R\"T, chosen on the call" },
            { title: "Mezuzot", blurb: "Klaf for home, office, and celebrations" },
            { title: "Megillot", blurb: "Handwriting on parchment" },
            { title: "Sephardic Sefer Torah", blurb: "In a silver tik, for community and family" },
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
      miniH2: isHe ? "רוצים סת״ם? מתחילים בשיחה." : "Want stam? Start with a call.",
      miniLead: isHe
        ? "שיחה קצרה על מה שצריך: תפילין, מזוזות, מגילה, ספר תורה או פיטום, ואם מתאים גם פגישה באלעד."
        : "A short call about what you need: tefillin, mezuzot, megillah, Sefer Torah or Pitum, then Elad if it fits.",
      miniCtaCall: isHe ? "התקשרו עכשיו" : "Call now",
      miniCtaConsult: isHe ? "השאירו פרטים" : "Leave your details",
      navTitle: isHe ? "ניווט" : "Navigate",
      contactTitle: isHe ? "יצירת קשר" : "Contact",
      legalTitle: isHe ? "מידע משפטי" : "Legal",
      offlineDeal: isHe
        ? "ההזמנה נסגרת בשיחה ובפגישה מול הסופר."
        : "The order is finalized on the call and in the meeting with the sofer.",
      accessibility: isHe ? "נגישות" : "Accessibility",
      privacy: isHe ? "פרטיות" : "Privacy",
      terms: isHe ? "תנאי שימוש" : "Terms of use",
      shipping: isHe ? "משלוחים" : "Shipping",
      returns: isHe ? "החזרות" : "Returns",
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
            "אם נתקלתם בבעיית נגישות, כתבו או התקשרו ונטפל בהקדם.",
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
      title: isHe ? "מדיניות הפרטיות" : "Privacy Policy",
      body: isHe
        ? [
            "אנחנו אוספים שם מלא, מספר טלפון ובחירת תחום עניין כששולחים את טופס יצירת הקשר, כדי לחזור אליכם לתיאום שיחת ייעוץ ופגישה (טלפון / וואטסאפ).",
            `המידע נשלח אל ${SITE.email} ונשמר אצל מפעיל האתר לטיפול בפניות. הוא לא נמכר לצדדים שלישיים.`,
            "לא נשלח דיוור פרסומי המוני על בסיס הטופס בלי הסכמה נפרדת ומפורשת.",
            "שירותי תשתית (אירוח, שליחת מייל ואנטי־בוט) עשויים לעבד נתונים טכניים לפי מדיניות הספק.",
            "כלי אנליטיקס (GA4 / Clarity) נטענים רק אחרי שתאשרו מדידה בבאנר ההסכמה. אפשר לסרב.",
            `למחיקת פרטים או לשאלות: ${SITE.email} או ${SITE.phoneDisplay}.`,
            "האתר מיועד ליצירת קשר בלבד. אין רכישה דרכו.",
          ]
        : [
            "We collect your full name, phone number, and interest topic when you submit the contact form, so we can call you back for a consultation and meeting (phone / WhatsApp).",
            `Data is emailed to ${SITE.email} and retained by the site operator to handle inquiries. It is not sold to third parties.`,
            "We will not send bulk marketing from this form without separate, explicit consent.",
            "Infrastructure providers (hosting, email, bot protection) may process technical data under their policies.",
            "Analytics (GA4 / Clarity) load only after you accept measurement in the consent banner. You may decline.",
            `To request deletion or ask questions: ${SITE.email} or ${SITE.phoneDisplay}.`,
            "This site is for contact only. There is no purchase through it.",
          ],
    },

    terms: {
      title: isHe ? "תנאי שימוש" : "Terms of use",
      body: isHe
        ? [
            `האתר של ${SITE.brand} מיועד למידע וליצירת קשר, לתיאום שיחת ייעוץ ופגישה עם ${SITE.contactName}.`,
            "האתר מיועד למידע וליצירת קשר בלבד. הזמנה נסגרת בשיחה ובפגישה פנים אל פנים באלעד.",
            "תמונות המסומנות «הדמיה» הן להמחשה בלבד, ואינן מציגות מוצר ספציפי שנמסר ללקוח.",
            `השימוש באתר כפוף לדין הישראלי. לשאלות: ${SITE.phoneDisplay} או ${SITE.email}.`,
          ]
        : [
            `The ${SITE.brandEn} site is for information and contacting us to schedule a consultation and meeting with ${SITE.contactNameEn}.`,
            "This site is for information and contact only. Orders are finalized on a call and in an in-person meeting in Elad.",
            "Images labeled as illustrative are for atmosphere only and do not depict a specific delivered item.",
            `Use of this site is governed by Israeli law. Contact: ${SITE.phoneDisplay} or ${SITE.email}.`,
          ],
    },

    shipping: {
      title: isHe ? "מדיניות המשלוחים" : "Shipping policy",
      body: isHe
        ? [
            "אין רכישה או תשלום דרך האתר. אם נדרש משלוח, הוא נקבע רק אחרי שיחת ייעוץ וסגירת פרטים מול הסופר.",
            "אפשרויות נפוצות: איסוף עצמי באלעד (רח׳ רבי יוסי בן קיסמא 43, קומת חניה) או שליחות בתיאום מראש לפי אזור וסוג הפריט (תפילין, מזוזות, מגילה, ספר תורה, פיטום הקטורת).",
            "זמני אספקה ומחיר משלוח אינם מוצגים באתר. הם חלק מההצעה בשיחה, לפי הידור, זמינות וכמות.",
            `לתיאום: ${SITE.phoneDisplay} או ${SITE.email}.`,
          ]
        : [
            "There is no purchase or payment on this site. If delivery is needed, it is arranged only after a consultation call and agreement with the sofer.",
            "Common options: pickup in Elad (43 Rabbi Yossi Ben Kisma St., parking floor) or arranged courier by region and item type (tefillin, mezuzot, megillah, Sefer Torah, Pitum HaKetoret).",
            "Delivery times and shipping fees are not listed online. They are part of the call offer, based on hidur, availability, and quantity.",
            `To arrange: ${SITE.phoneDisplay} or ${SITE.email}.`,
          ],
    },

    returns: {
      title: isHe ? "מדיניות ההחזרות" : "Returns policy",
      body: isHe
        ? [
            "האתר אינו חנות מקוונת, ואין ביטול עסקה דרך האתר. העסקה נסגרת בשיחה ובפגישה פנים אל פנים.",
            "פריטי סת״ם (קלף, תפילין, מזוזות, מגילות ועוד) הם מוצרים אישיים או דתיים. תנאי ביטול, החלפה או תיקון נקבעים מול הסופר לפי מה שסוכם בהזמנה ולפי הדין החל בישראל.",
            "אם התגלתה תקלה בכתיבה או בהתאמה למה שסוכם, פנו אלינו מיד לטיפול ולתיקון.",
            `יצירת קשר: ${SITE.contactName} · ${SITE.phoneDisplay} · ${SITE.email}.`,
          ]
        : [
            "This site is not an online store, and cancellations are not processed through the website. Deals are closed on a call and in an in-person meeting.",
            "Stam items (klaf, tefillin, mezuzot, megillot, etc.) are personal or religious goods. Cancel, exchange, or repair terms are set with the sofer as agreed in the order and under applicable Israeli law.",
            "If a writing or fit issue appears versus what was agreed, contact us promptly for repair or resolution.",
            `Contact: ${SITE.contactNameEn} · ${SITE.phoneDisplay} · ${SITE.email}.`,
          ],
    },
  };
}

export type Copy = ReturnType<typeof getCopy>;
