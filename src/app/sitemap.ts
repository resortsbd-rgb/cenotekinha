import type { MetadataRoute } from "next";
import { ALL_ROUTES, STATIC_ROUTES, TOUR_ROUTES } from "@/lib/routes";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// Fecha de la última revisión del contenido. Actualizarla cuando cambien precios o textos.
const LAST_REVIEWED = "2026-11-03";

const absolute = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

function priorityFor(path: string) {
  if (path === STATIC_ROUTES.home.es || path === STATIC_ROUTES.home.en) return 1;
  if (Object.values(TOUR_ROUTES).some((pair) => pair.es === path || pair.en === path)) return 0.9;
  return 0.7;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return ALL_ROUTES.flatMap((pair) =>
    [pair.es, pair.en].map((path) => ({
      url: absolute(path),
      lastModified: LAST_REVIEWED,
      priority: priorityFor(path),
      alternates: {
        languages: { es: absolute(pair.es), en: absolute(pair.en), "x-default": absolute(pair.en) },
      },
    })),
  );
}
