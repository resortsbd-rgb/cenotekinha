import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tours en Cenotes Kin-Ha | ATV, Tirolesas y Cenotes en Puerto Morelos",
  description: "Elige tu aventura en Cenotes Kin-Ha: dos cenotes, ATV por la selva, tirolesas y cabalgata en la Ruta de los Cenotes, Puerto Morelos. Reserva en línea.",
  alternates: { canonical: "/experiences" },
  openGraph: {
    siteName: "Cenotes Kin-Ha",
    locale: "es_MX",
    title: "Tours en Cenotes Kin-Ha | ATV, Tirolesas y Cenotes en Puerto Morelos",
    description: "Elige tu aventura en Cenotes Kin-Ha: dos cenotes, ATV por la selva, tirolesas y cabalgata en la Ruta de los Cenotes, Puerto Morelos. Reserva en línea.",
    url: "/experiences",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
