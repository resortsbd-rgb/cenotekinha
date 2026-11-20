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

> Adventure park on the Ruta de los Cenotes in Puerto Morelos, Quintana Roo, Mexico. Two cenotes (Kin-Ha, a cavern; Blanca Flor, open-air), 3 zip lines, ATVs and horseback riding, with hotel pickup between Playacar, Playa del Carmen, Puerto Morelos, Cancún and Isla Blanca. Open daily 9:00am to 5:00pm.

Tours with pickup can be booked up to 8 hours before pickup; guests arriving on their own can come between 9:30am and 3:00pm. Free cancellation up to 24 hours before the tour. Children from age 5. No sunscreen of any kind is allowed in the cenotes. Prices below come from the official site; live availability is in the booking calendar.

## Tours

${tours}

## Plan your visit

- [Hotel pickup areas](${SITE_URL}${STATIC_ROUTES.pickup.en})
- [Cenotes near Cancún: how to choose a tour](${SITE_URL}${STATIC_ROUTES.guide.en})
- [Artisanal tequila tasting: the story](${SITE_URL}${STATIC_ROUTES.tequila.en}): tequila tasting is included in every experience; the artisanal tequilas and liqueurs you can taste and buy at Kin-Ha
- [FAQ](${SITE_URL}${STATIC_ROUTES.faq.en})
- [Book online](${SITE_URL}${STATIC_ROUTES.booking.en})
- [Contact and directions](${SITE_URL}${STATIC_ROUTES.contact.en})

## Español

- [Inicio](${SITE_URL}/)
- [Tours y precios](${SITE_URL}${STATIC_ROUTES.experiences.es})
- [Recogida en hotel](${SITE_URL}${STATIC_ROUTES.pickup.es})
- [Guía: cenotes cerca de Cancún](${SITE_URL}${STATIC_ROUTES.guide.es})
- [Tequila artesanal: la historia de la cata](${SITE_URL}${STATIC_ROUTES.tequila.es}): la degustación de tequila está incluida en cada experiencia; los tequilas y licores artesanales que puedes probar y comprar en Kin-Ha
- [Preguntas frecuentes](${SITE_URL}${STATIC_ROUTES.faq.es})
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
