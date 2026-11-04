import type { Metadata } from "next";
import ContactPage from "@/app/(es)/contact/page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("contact", "en");

export default function Page() {
  return <ContactPage />;
}
