import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tours en Cenotes Kin-Ha | ATV, Tirolesas y Cenotes en Puerto Morelos",
  description: "Tours al Cenote Kin-Ha y al Cenote Blanca Flor: tour ecológico con comida, ATV, tirolesas y cabalgata, con transporte desde Cancún. Puerto Morelos.",
  alternates: { canonical: "/experiences" },
  openGraph: {
    siteName: "Cenotes Kin-Ha",
    locale: "es_MX",
    title: "Tours en Cenotes Kin-Ha | ATV, Tirolesas y Cenotes en Puerto Morelos",
    description: "Tours al Cenote Kin-Ha y al Cenote Blanca Flor: tour ecológico con comida, ATV, tirolesas y cabalgata, con transporte desde Cancún. Puerto Morelos.",
    url: "/experiences",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
