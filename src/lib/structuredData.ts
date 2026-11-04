// Datos estructurados (JSON-LD): negocio, tours, migas de pan y preguntas frecuentes.
// Solo datos reales que también se ven en la página. No se marca aggregateRating: las
// calificaciones son de Google Maps y GetYourGuide, y se muestran como texto con su fuente.
import { TOURS } from "@/lib/stripe";
import { SITE_URL as SITE } from "@/lib/seo";
import { STATIC_ROUTES, tourPath } from "@/lib/routes";
import type { Locale } from "@/lib/translations";

// Ficha principal de Cenotes Kin-Ha en Google Maps (4.5 estrellas, 1,291 reseñas al 16-oct-2026).
export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Cenotes%20Kin%20Ha&query_place_id=ChIJy_vHcGxuTo8R7zV63v7I2sk";

const TRIPADVISOR_URL =
  "https://www.tripadvisor.com.mx/Attraction_Review-g240327-d8421063-Reviews-Cenotes_Kin_Ha-Puerto_Morelos_Yucatan_Peninsula.html";

const INSTAGRAM_URL = "https://instagram.com/kinhacenotesoficial";

const BUSINESS_ID = `${SITE}/#negocio`;
const WEBSITE_ID = `${SITE}/#sitio`;

const absolute = (path: string) => (path === "/" ? `${SITE}/` : `${SITE}${path}`);

function priceFor(tour: (typeof TOURS)[number], locale: Locale) {
  return locale === "en"
    ? { price: tour.fromUSD as number, priceCurrency: "USD" }
    : { price: tour.fromMXN as number, priceCurrency: "MXN" };
}

const PRICED_TOURS = TOURS.filter((tour) => tour.fromMXN && tour.fromUSD);

function priceRange(locale: Locale) {
  const values = PRICED_TOURS.map((tour) => priceFor(tour, locale).price);
  const currency = locale === "en" ? "USD" : "MXN";
  return `${currency} ${Math.min(...values).toLocaleString("en-US")}–${Math.max(...values).toLocaleString("en-US")}`;
}

const BUSINESS_COPY = {
  es: {
    description:
      "Parque de aventura en la Ruta de los Cenotes de Puerto Morelos: Cenote Kin-Ha (caverna) y Cenote Blanca Flor (abierto), tirolesas, ATV y paseo a caballo, con transporte desde Cancún, Puerto Morelos y Playa del Carmen.",
    cave: "Cenote de caverna con luz natural, estalactitas y agua azul profunda.",
    open: "Cenote abierto al cielo, con plataformas para saltar.",
  },
  en: {
    description:
      "Adventure park on the Ruta de los Cenotes in Puerto Morelos: Kin-Ha Cenote (cavern) and Blanca Flor Cenote (open-air), zip lines, ATVs and horseback riding, with pickup from Cancún, Puerto Morelos and Playa del Carmen.",
    cave: "Cavern cenote with natural light, stalactites and deep blue water.",
    open: "Open-air cenote with jumping platforms.",
  },
};

export function businessJsonLd(locale: Locale) {
  const copy = BUSINESS_COPY[locale];
  return {
    "@context": "https://schema.org",
    "@type": ["TouristAttraction", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: "Cenotes Kin-Ha",
    alternateName: ["Cenote Kin-Ha", "Cenotes Kin Ha", "Kin-Ha Cenotes"],
    url: absolute(STATIC_ROUTES.home[locale]),
    logo: `${SITE}/apple-icon.png`,
    image: [
      `${SITE}/images/og-cenotes-kinha.jpg`,
      `${SITE}/images/hero-cueva-columpio.webp`,
      `${SITE}/images/hero-blanca-flor-plataformas.webp`,
    ],
    description: copy.description,
    telephone: "+52 998 205 3527",
    email: "luis@kinhaexperience.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ruta de los Cenotes",
      addressLocality: "Puerto Morelos",
      addressRegion: "Quintana Roo",
      addressCountry: "MX",
    },
    geo: { "@type": "GeoCoordinates", latitude: 20.851221, longitude: -87.1276722 },
    hasMap: GOOGLE_MAPS_URL,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    priceRange: priceRange(locale),
    currenciesAccepted: "MXN, USD",
    availableLanguage: ["es", "en"],
    isAccessibleForFree: false,
    publicAccess: true,
    containsPlace: [
      { "@type": "TouristAttraction", name: "Cenote Kin-Ha", description: copy.cave },
      { "@type": "TouristAttraction", name: "Cenote Blanca Flor", description: copy.open },
    ],
    sameAs: [INSTAGRAM_URL, TRIPADVISOR_URL, GOOGLE_MAPS_URL],
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Cenotes Kin-Ha",
    url: `${SITE}/`,
    inLanguage: locale,
    publisher: { "@id": BUSINESS_ID },
  };
}

function tourTrip(tour: (typeof TOURS)[number], locale: Locale, itinerary?: string[]) {
  const url = absolute(tourPath(tour.id, locale));
  return {
    "@type": "TouristTrip",
    "@id": `${url}#tour`,
    name: locale === "en" ? tour.nameEn : tour.nameEs,
    description: locale === "en" ? tour.descEn : tour.descEs,
    url,
    inLanguage: locale,
    image: `${SITE}${tour.image}`,
    provider: { "@id": BUSINESS_ID },
    ...(itinerary && {
      itinerary: {
        "@type": "ItemList",
        itemListElement: itinerary.map((name, index) => ({ "@type": "ListItem", position: index + 1, name })),
      },
    }),
    offers: {
      "@type": "Offer",
      ...priceFor(tour, locale),
      url,
      availability: "https://schema.org/InStock",
    },
  };
}

/** Lista de tours con precio "desde" (páginas de experiencias). */
export function toursJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "en" ? "Tours at Kin-Ha Cenotes" : "Tours en Cenotes Kin-Ha",
    itemListElement: PRICED_TOURS.map((tour, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: tourTrip(tour, locale),
    })),
  };
}

export function tourJsonLd(tourId: string, locale: Locale, itinerary: string[]) {
  const tour = TOURS.find((item) => item.id === tourId);
  if (!tour) throw new Error(`Tour desconocido: ${tourId}`);
  return { "@context": "https://schema.org", ...tourTrip(tour, locale, itinerary) };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function articleJsonLd({ headline, description, path, locale, dateModified }: {
  headline: string; description: string; path: string; locale: Locale; dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    inLanguage: locale,
    mainEntityOfPage: absolute(path),
    image: `${SITE}/images/hero-blanca-flor-plataformas.webp`,
    datePublished: dateModified,
    dateModified,
    author: { "@id": BUSINESS_ID },
    publisher: { "@id": BUSINESS_ID },
  };
}
