import type { Locale } from "@/content/copy";
import { getCopy } from "@/content/copy";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCta } from "@/components/StickyCta";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhyUs } from "@/components/sections/WhyUs";
import { StatsMoment } from "@/components/sections/StatsMoment";
import { ScrollRoadmap } from "@/components/sections/ScrollRoadmap";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { LeadSection } from "@/components/sections/LeadSection";
import { Analytics } from "@/components/Analytics";
import { SectionTracker } from "@/components/SectionTracker";
import { LocaleHtml } from "@/components/LocaleHtml";
import { SiteMotion } from "@/components/motion/SiteMotion";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SkipLink } from "@/components/SkipLink";
import { JsonLd } from "@/components/JsonLd";

export function HomePage({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  return (
    <SiteMotion>
      <LocaleHtml locale={locale} />
      <JsonLd locale={locale} faqs={copy.faq.items} />
      <SkipLink locale={locale} />
      <Analytics />
      <ScrollProgress />
      <SiteHeader copy={copy} />
      <main id="main" tabIndex={-1}>
        <Hero copy={copy} />
        <About copy={copy} />
        <WhyUs copy={copy} />
        <StatsMoment copy={copy} />
        <ScrollRoadmap copy={copy} />
        <Services copy={copy} />
        <Portfolio copy={copy} />
        <Testimonials copy={copy} />
        <Faq copy={copy} />
        <SectionTracker targetId="lead" eventName="form_section_view" />
        <LeadSection copy={copy} />
      </main>
      <SiteFooter copy={copy} />
      <StickyCta copy={copy} />
      <WhatsAppFloat copy={copy} />
    </SiteMotion>
  );
}
