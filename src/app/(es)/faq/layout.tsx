import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { faqJsonLd } from "@/lib/structuredData";
import JsonLd from "@/components/seo/JsonLd";
import { translations } from "@/lib/translations";

export const metadata: Metadata = pageMetadata("faq", "es");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={faqJsonLd(translations.es.faq.items)} />
      {children}
    </>
  );
}
