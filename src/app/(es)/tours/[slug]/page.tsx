import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TourDetailPage from "@/components/tours/TourDetailPage";
import { TOUR_ROUTES, tourIdFromSlug, tourSlugs } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { TOURS } from "@/lib/stripe";
import { fillPrice, TOUR_CONTENT, type TourId } from "@/lib/tourContent";

export const dynamicParams = false;

export function generateStaticParams() {
  return tourSlugs("es").map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tourId = tourIdFromSlug(slug, "es") as TourId | undefined;
  if (!tourId) return {};
  const content = TOUR_CONTENT[tourId];
  const tour = TOURS.find((item) => item.id === tourId);
  const description = tour ? fillPrice(content.seoDescription.es, tour, "es") : content.seoDescription.es;
  return buildMetadata(TOUR_ROUTES[tourId], "es", content.seoTitle.es, description);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const tourId = tourIdFromSlug(slug, "es") as TourId | undefined;
  if (!tourId) notFound();
  return <TourDetailPage tourId={tourId} locale="es" />;
}
