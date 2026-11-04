import type { Metadata } from "next";
import AboutPage from "@/app/(es)/about/page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("about", "en");

export default function Page() {
  return <AboutPage />;
}
