import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";
import { getCopy } from "@/content/copy";

export const metadata: Metadata = {
  title: getCopy("he").navPages.about,
};

export default function Page() {
  return <SectionPage locale="he" section="about" />;
}
