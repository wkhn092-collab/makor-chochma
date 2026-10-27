import dynamic from "next/dynamic";
import type { Locale } from "@/content/copy";
import { getCopy } from "@/content/copy";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCta } from "@/components/StickyCta";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhyUs } from "@/components/sections/WhyUs";
import { Services } from "@/components/sections/Services";
import { Faq } from "@/components/sections/Faq";
import { LeadSection } from "@/components/sections/LeadSection";
import { Analytics } from "@/components/Analytics";
import { ConsentBanner } from "@/components/ConsentBanner";
import { SectionTracker } from "@/components/SectionTracker";
import { LocaleHtml } from "@/components/LocaleHtml";
import { SiteMotion } from "@/components/motion/SiteMotion";
import { SkipLink } from "@/components/SkipLink";
import { JsonLd } from "@/components/JsonLd";
import { PromoBanner } from "@/components/PromoBanner";

/** Heavy GSAP sections — defer client bundle until after first paint. */
const StatsMoment = dynamic(
  () =>
    import("@/components/sections/StatsMoment").then((m) => m.StatsMoment),
  { ssr: true },
);
const ScrollRoadmap = dynamic(
  () =>
    import("@/components/sections/ScrollRoadmap").then((m) => m.ScrollRoadmap),
  { ssr: true },
);
const Portfolio = dynamic(
  () => import("@/components/sections/Portfolio").then((m) => m.Portfolio),
  { ssr: true },
);
const Testimonials = dynamic(
  () =>
    import("@/components/sections/Testimonials").then((m) => m.Testimonials),
  { ssr: true },
);

export function HomePage({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  return (
    <SiteMotion>
      <LocaleHtml locale={locale} />
      <JsonLd locale={locale} faqs={copy.faq.items} />
      <SkipLink locale={locale} />
      <Analytics />
      <ConsentBanner locale={locale} />
      <PromoBanner locale={locale} />
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
