import type { Metadata } from "next";
import TequilaPage from "@/components/tequila/TequilaPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("tequila", "es");

export default function Page() {
  return <TequilaPage locale="es" />;
}
