import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getCopy } from "@/content/copy";

export const metadata: Metadata = {
  title: getCopy("he").shipping.title,
};

export default function Page() {
  return <LegalPage locale="he" kind="shipping" />;
}
