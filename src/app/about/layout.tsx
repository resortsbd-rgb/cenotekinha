import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros | Cenotes Kin-Ha, Ruta de los Cenotes",
  description: "Conoce Cenotes Kin-Ha: un parque de aventura en la selva de Puerto Morelos con grupos pequeños y un sistema de dos cenotes.",
  alternates: { canonical: "/about" },
  openGraph: {
    siteName: "Cenotes Kin-Ha",
    locale: "es_MX",
    title: "Nosotros | Cenotes Kin-Ha, Ruta de los Cenotes",
    description: "Conoce Cenotes Kin-Ha: un parque de aventura en la selva de Puerto Morelos con grupos pequeños y un sistema de dos cenotes.",
    url: "/about",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
