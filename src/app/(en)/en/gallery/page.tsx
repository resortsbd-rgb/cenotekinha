import type { Metadata } from "next";
import GalleryPage from "@/app/(es)/gallery/page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("gallery", "en");

export default function Page() {
  return <GalleryPage />;
}
