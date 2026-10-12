import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Cenotes Kin-Ha · WhatsApp +52 998 205 3527",
  description: "Escríbenos por WhatsApp para reservar o resolver dudas. Cenotes Kin-Ha, Ruta de los Cenotes, Puerto Morelos, Quintana Roo.",
  alternates: { canonical: "/contact" },
  openGraph: {
    siteName: "Cenotes Kin-Ha",
    locale: "es_MX",
    title: "Contacto | Cenotes Kin-Ha · WhatsApp +52 998 205 3527",
    description: "Escríbenos por WhatsApp para reservar o resolver dudas. Cenotes Kin-Ha, Ruta de los Cenotes, Puerto Morelos, Quintana Roo.",
    url: "/contact",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
