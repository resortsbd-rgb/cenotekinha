import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Reserva tu experiencia | Cenotes Kin-Ha',
  description: 'Consulta las experiencias disponibles y reserva tu visita a Cenotes Kin-Ha en Puerto Morelos.',
  alternates: { canonical: "/booking" },
  openGraph: { title: 'Reserva tu experiencia | Cenotes Kin-Ha', description: 'Consulta las experiencias disponibles y reserva tu visita a Cenotes Kin-Ha en Puerto Morelos.', url: "/booking" },
};

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
