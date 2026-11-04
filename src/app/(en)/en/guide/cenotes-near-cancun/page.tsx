import type { Metadata } from "next";
import GuidePage from "@/components/guide/GuidePage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("guide", "en");

export default function Page() {
  return <GuidePage locale="en" />;
}
