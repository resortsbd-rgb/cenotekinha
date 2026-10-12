import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tours en Cenotes Kin-Ha | ATV, Tirolesas y Cenotes en Puerto Morelos",
  description: "Tours al Cenote Kin-Ha y al Cenote Blanca Flor: tour ecológico con comida, ATV, tirolesas y cabalgata, con transporte desde Cancún. Puerto Morelos.",
  alternates: { canonical: "/experiences" },
  openGraph: {
    images: OG_IMAGES,
    siteName: "Cenotes Kin-Ha",
    locale: "es_MX",
    title: "Tours en Cenotes Kin-Ha | ATV, Tirolesas y Cenotes en Puerto Morelos",
    description: "Tours al Cenote Kin-Ha y al Cenote Blanca Flor: tour ecológico con comida, ATV, tirolesas y cabalgata, con transporte desde Cancún. Puerto Morelos.",
    url: "/experiences",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
