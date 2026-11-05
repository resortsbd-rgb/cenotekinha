import type { Metadata } from "next";
import FaqPage from "@/app/(es)/faq/page";
import { pageMetadata } from "@/lib/seo";
import { faqJsonLd } from "@/lib/structuredData";
import JsonLd from "@/components/seo/JsonLd";
import { translations } from "@/lib/translations";

export const metadata: Metadata = pageMetadata("faq", "en");

export default function Page() {
  return (
    <>
      <JsonLd data={faqJsonLd(translations.en.faq.items)} />
      <FaqPage />
    </>
  );
}
