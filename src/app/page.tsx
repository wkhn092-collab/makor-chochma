import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { getCopy } from "@/content/copy";

const copy = getCopy("he");

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
  alternates: {
    canonical: "/",
    languages: { he: "/", en: "/en" },
  },
};

export default function Page() {
  return <HomePage locale="he" />;
}
