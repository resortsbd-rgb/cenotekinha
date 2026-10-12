import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Cenotes Kin-Ha, Puerto Morelos",
  description: "Qué llevar, cómo llegar, horarios, transportación y reglas de los cenotes. Resuelve tus dudas antes de visitar Cenotes Kin-Ha.",
  alternates: { canonical: "/faq" },
  openGraph: {
    images: OG_IMAGES,
    siteName: "Cenotes Kin-Ha",
    locale: "es_MX",
    title: "Preguntas Frecuentes | Cenotes Kin-Ha, Puerto Morelos",
    description: "Qué llevar, cómo llegar, horarios, transportación y reglas de los cenotes. Resuelve tus dudas antes de visitar Cenotes Kin-Ha.",
    url: "/faq",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
