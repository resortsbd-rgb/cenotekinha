import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";
import { toursJsonLd } from "@/lib/structuredData";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Tours de cenotes, ATV y caballos cerca de Cancún | Kin-Ha",
  description: "Tours al Cenote Kin-Ha y al Cenote Blanca Flor con ATV, tirolesas, paseo a caballo o tour ecológico. Transporte desde Cancún y Playa del Carmen.",
  alternates: { canonical: "/experiences" },
  openGraph: {
    images: OG_IMAGES,
    siteName: "Cenotes Kin-Ha",
    locale: "es_MX",
    title: "Tours de cenotes, ATV y caballos cerca de Cancún | Kin-Ha",
    description: "Tours al Cenote Kin-Ha y al Cenote Blanca Flor con ATV, tirolesas, paseo a caballo o tour ecológico. Transporte desde Cancún y Playa del Carmen.",
    url: "/experiences",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Tours con precio para Google */}
      <JsonLd data={toursJsonLd} />
      {children}
    </>
  );
}
