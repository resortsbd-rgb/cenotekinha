import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Reserva tu Tour en Cenotes Kin-Ha | Puerto Morelos",
  description: "Reserva en línea tu visita a Cenotes Kin-Ha con calendario en tiempo real y pago seguro, o escríbenos por WhatsApp. Ruta de los Cenotes, Puerto Morelos.",
  alternates: { canonical: "/booking" },
  openGraph: {
    images: OG_IMAGES,
    siteName: "Cenotes Kin-Ha",
    locale: "es_MX",
    title: "Reserva tu Tour en Cenotes Kin-Ha | Puerto Morelos",
    description: "Reserva en línea tu visita a Cenotes Kin-Ha con calendario en tiempo real y pago seguro, o escríbenos por WhatsApp. Ruta de los Cenotes, Puerto Morelos.",
    url: "/booking",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
