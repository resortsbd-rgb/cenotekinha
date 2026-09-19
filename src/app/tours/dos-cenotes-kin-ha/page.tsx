import type { Metadata } from "next";
import TourDetail from "@/components/tours/TourDetail";
import { tourPages } from "@/lib/tour-pages";

const slug = "dos-cenotes-kin-ha";
const page = tourPages[slug];
const path = `/tours/${slug}`;

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.description,
  alternates: { canonical: path },
  openGraph: { title: page.seoTitle, description: page.description, url: path, type: "website" },
};

export default function Page() {
  return <TourDetail slug={slug} />;
}
