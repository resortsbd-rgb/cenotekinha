import type { Metadata } from "next";
import ExperiencesPage from "@/app/(es)/experiences/page";
import { pageMetadata } from "@/lib/seo";
import { toursJsonLd } from "@/lib/structuredData";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata("experiences", "en");

export default function Page() {
  return (
    <>
      <JsonLd data={toursJsonLd("en")} />
      <ExperiencesPage />
    </>
  );
}
