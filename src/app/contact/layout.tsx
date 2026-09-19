import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Contacto y ubicación | Cenotes Kin-Ha',
  description: 'Contacta a Cenotes Kin-Ha y organiza tu visita a la Ruta de los Cenotes en Puerto Morelos.',
  alternates: { canonical: "/contact" },
  openGraph: { title: 'Contacto y ubicación | Cenotes Kin-Ha', description: 'Contacta a Cenotes Kin-Ha y organiza tu visita a la Ruta de los Cenotes en Puerto Morelos.', url: "/contact" },
};

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
