import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { toursJsonLd } from "@/lib/structuredData";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata("experiences", "es");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Tours con precio para buscadores */}
      <JsonLd data={toursJsonLd("es")} />
      {children}
    </>
  );
}
