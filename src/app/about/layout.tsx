import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Conoce Cenotes Kin-Ha | Puerto Morelos',
  description: 'Conoce Cenotes Kin-Ha y su entorno natural en la Ruta de los Cenotes, Puerto Morelos, Quintana Roo.',
  alternates: { canonical: "/about" },
  openGraph: { title: 'Conoce Cenotes Kin-Ha | Puerto Morelos', description: 'Conoce Cenotes Kin-Ha y su entorno natural en la Ruta de los Cenotes, Puerto Morelos, Quintana Roo.', url: "/about" },
};

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
