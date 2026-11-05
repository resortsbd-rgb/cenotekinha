import { TOURS, MAIN_TOURS_FILTER } from "@/lib/stripe";
import { STATIC_ROUTES, tourPath } from "@/lib/routes";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// Resumen para agentes y asistentes de IA. Se genera desde el catálogo para no duplicar precios.
export function GET() {
  const tours = TOURS.filter(MAIN_TOURS_FILTER)
    .map(
      (tour) =>
        `- [${tour.nameEn}](${SITE_URL}${tourPath(tour.id, "en")}): from $${tour.fromUSD} USD / $${tour.fromMXN?.toLocaleString("en-US")} MXN per person, ${tour.duration}. ${tour.descEn}`,
    )
    .join("\n");

  const body = `# Cenotes Kin-Ha

> Adventure park on the Ruta de los Cenotes in Puerto Morelos, Quintana Roo, Mexico. Two cenotes (Kin-Ha, a cavern; Blanca Flor, open-air), 3 zip lines, ATVs and horseback riding, with pickup from Cancún, Puerto Morelos and Playa del Carmen. Open daily 9:00am to 5:00pm.

Free cancellation up to 24 hours before the tour. Children from age 5. No sunscreen of any kind is allowed in the cenotes. Prices below come from the official site; live availability is in the booking calendar.

## Tours

${tours}

## Plan your visit

- [Cenotes near Cancún: how to choose a tour](${SITE_URL}${STATIC_ROUTES.guide.en})
- [FAQ](${SITE_URL}${STATIC_ROUTES.faq.en})
- [Book online](${SITE_URL}${STATIC_ROUTES.booking.en})
- [Contact and directions](${SITE_URL}${STATIC_ROUTES.contact.en})

## Español

- [Inicio](${SITE_URL}/)
- [Tours y precios](${SITE_URL}${STATIC_ROUTES.experiences.es})
- [Guía: cenotes cerca de Cancún](${SITE_URL}${STATIC_ROUTES.guide.es})
- [Preguntas frecuentes](${SITE_URL}${STATIC_ROUTES.faq.es})
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
