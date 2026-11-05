import type { Metadata } from "next";
import PickupPage from "@/components/pickup/PickupPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("pickup", "es");

export default function Page() {
  return <PickupPage locale="es" />;
}
