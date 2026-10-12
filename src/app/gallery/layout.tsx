import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Galería de Fotos | Cenotes Kin-Ha en la Ruta de los Cenotes",
  description: "Fotos reales del cenote subterráneo Kin-Ha, el cenote abierto Blanca Flor, tirolesas y ATV en la selva de Puerto Morelos.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    images: OG_IMAGES,
    siteName: "Cenotes Kin-Ha",
    locale: "es_MX",
    title: "Galería de Fotos | Cenotes Kin-Ha en la Ruta de los Cenotes",
    description: "Fotos reales del cenote subterráneo Kin-Ha, el cenote abierto Blanca Flor, tirolesas y ATV en la selva de Puerto Morelos.",
    url: "/gallery",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
