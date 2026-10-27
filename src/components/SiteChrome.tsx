import type { Locale } from "@/content/copy";
import { getCopy } from "@/content/copy";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCta } from "@/components/StickyCta";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Analytics } from "@/components/Analytics";
import { LocaleHtml } from "@/components/LocaleHtml";
import { SiteMotion } from "@/components/motion/SiteMotion";
import { SkipLink } from "@/components/SkipLink";

type Props = {
  locale: Locale;
  children: React.ReactNode;
};

export function SiteChrome({ locale, children }: Props) {
  const copy = getCopy(locale);
  return (
    <SiteMotion>
      <LocaleHtml locale={locale} />
      <SkipLink locale={locale} />
      <Analytics />
      <SiteHeader copy={copy} />
      <main id="main" tabIndex={-1} className="pt-20">
        {children}
      </main>
      <SiteFooter copy={copy} />
      <StickyCta copy={copy} />
      <WhatsAppFloat copy={copy} />
    </SiteMotion>
  );
}
