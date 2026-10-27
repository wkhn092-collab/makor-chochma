import type { Locale } from "@/content/copy";
import { getCopy } from "@/content/copy";
import { SiteChrome } from "@/components/SiteChrome";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { LeadSection } from "@/components/sections/LeadSection";
import { SITE } from "@/content/site";

export type SectionKey =
  | "about"
  | "services"
  | "portfolio"
  | "recommendations"
  | "faq"
  | "contact";

export function SectionPage({
  locale,
  section,
}: {
  locale: Locale;
  section: SectionKey;
}) {
  const copy = getCopy(locale);

  return (
    <SiteChrome locale={locale}>
      {section === "about" && <About copy={copy} />}
      {section === "services" && <Services copy={copy} />}
      {section === "portfolio" && <Portfolio copy={copy} />}
      {section === "recommendations" && <Testimonials copy={copy} />}
      {section === "faq" && <Faq copy={copy} />}
      {section === "contact" && (
        <>
          <LeadSection copy={copy} />
          <div className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
            <iframe
              title={copy.form.maps}
              className="h-72 w-full rounded-[var(--radius-md)] border border-stone shadow-contact"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE.addressHe)}&z=15&output=embed`}
            />
          </div>
        </>
      )}
    </SiteChrome>
  );
}
