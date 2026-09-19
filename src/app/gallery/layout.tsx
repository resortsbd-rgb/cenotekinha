import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Fotos de Cenotes Kin-Ha | Puerto Morelos',
  description: 'Explora imágenes de los cenotes y experiencias de aventura de Kin-Ha en Puerto Morelos.',
  alternates: { canonical: "/gallery" },
  openGraph: { title: 'Fotos de Cenotes Kin-Ha | Puerto Morelos', description: 'Explora imágenes de los cenotes y experiencias de aventura de Kin-Ha en Puerto Morelos.', url: "/gallery" },
};

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
