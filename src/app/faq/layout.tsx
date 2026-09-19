import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Preguntas frecuentes | Cenotes Kin-Ha',
  description: 'Resuelve tus dudas sobre actividades, reservas y visita a Cenotes Kin-Ha en Puerto Morelos.',
  alternates: { canonical: "/faq" },
  openGraph: { title: 'Preguntas frecuentes | Cenotes Kin-Ha', description: 'Resuelve tus dudas sobre actividades, reservas y visita a Cenotes Kin-Ha en Puerto Morelos.', url: "/faq" },
};

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
