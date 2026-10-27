import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";
import { getCopy } from "@/content/copy";

export const metadata: Metadata = {
  title: getCopy("en").navPages.services,
};

export default function Page() {
  return <SectionPage locale="en" section="services" />;
}
