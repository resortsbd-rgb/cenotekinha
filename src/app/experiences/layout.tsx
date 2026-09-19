import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Tours de cenotes, ATV y tirolesas | Cenotes Kin-Ha',
  description: 'Compara experiencias de cenotes, cuatrimotos y tirolesas en Puerto Morelos. Consulta opciones y reserva tu aventura en Kin-Ha.',
  alternates: { canonical: "/experiences" },
  openGraph: { title: 'Tours de cenotes, ATV y tirolesas | Cenotes Kin-Ha', description: 'Compara experiencias de cenotes, cuatrimotos y tirolesas en Puerto Morelos. Consulta opciones y reserva tu aventura en Kin-Ha.', url: "/experiences" },
};

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
