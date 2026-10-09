import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Cenotes Kin-Ha, Puerto Morelos",
  description: "Qué llevar, cómo llegar, horarios, transportación y reglas de los cenotes. Resuelve tus dudas antes de visitar Cenotes Kin-Ha.",
  alternates: { canonical: "/faq" },
  openGraph: {
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
