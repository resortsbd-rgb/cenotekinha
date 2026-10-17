// Datos estructurados del sitio (JSON-LD) — negocio y tours.
// Solo datos reales del propio sitio: si cambia el horario, el teléfono o un precio,
// actualizarlo aquí y en la página donde se muestra.
import { TOURS } from "@/lib/stripe";

const SITE = "https://www.cenotekinha.com";

// Ficha principal de Cenotes Kin-Ha en Google Maps (4.5 estrellas, 1,291 reseñas al 16-oct-2026).
export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Cenotes%20Kin%20Ha&query_place_id=ChIJy_vHcGxuTo8R7zV63v7I2sk";

const TRIPADVISOR_URL =
  "https://www.tripadvisor.com.mx/Attraction_Review-g240327-d8421063-Reviews-Cenotes_Kin_Ha-Puerto_Morelos_Yucatan_Peninsula.html";

const INSTAGRAM_URL = "https://instagram.com/kinhacenotesoficial";

const BUSINESS_ID = `${SITE}/#negocio`;

// Rango de precios "desde" de los tours con precio publicado (MXN).
const PRICES = TOURS.flatMap((tour) => (tour.fromMXN ? [tour.fromMXN] : []));
const PRICE_RANGE = `MXN ${Math.min(...PRICES).toLocaleString("en-US")}–${Math.max(...PRICES).toLocaleString("en-US")}`;

export const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["TouristAttraction", "LocalBusiness"],
  "@id": BUSINESS_ID,
  name: "Cenotes Kin-Ha",
  alternateName: ["Cenote Kin-Ha", "Cenotes Kin Ha", "Kin-Ha Cenotes"],
  url: `${SITE}/`,
  logo: `${SITE}/apple-icon.png`,
  image: [
    `${SITE}/images/og-cenotes-kinha.jpg`,
    `${SITE}/images/hero-cueva-columpio.webp`,
    `${SITE}/images/hero-blanca-flor-plataformas.webp`,
  ],
  description:
    "Parque de aventura en la Ruta de los Cenotes de Puerto Morelos: Cenote Kin-Ha (caverna) y Cenote Blanca Flor (abierto), tirolesas, ATV y paseo a caballo, con transporte desde Cancún, Puerto Morelos y Playa del Carmen.",
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
  priceRange: PRICE_RANGE,
  currenciesAccepted: "MXN, USD",
  availableLanguage: ["es", "en"],
  isAccessibleForFree: false,
  publicAccess: true,
  containsPlace: [
    {
      "@type": "TouristAttraction",
      name: "Cenote Kin-Ha",
      description: "Cenote de caverna con luz natural, estalactitas y agua azul profunda.",
    },
    {
      "@type": "TouristAttraction",
      name: "Cenote Blanca Flor",
      description: "Cenote abierto al cielo, con plataformas para saltar.",
    },
  ],
  sameAs: [INSTAGRAM_URL, TRIPADVISOR_URL, GOOGLE_MAPS_URL],
};

// Lista de tours con precio "desde" (página /experiences).
export const toursJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Tours en Cenotes Kin-Ha",
  itemListElement: TOURS.filter((tour) => tour.fromMXN).map((tour, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "TouristTrip",
      name: tour.nameEs,
      description: tour.descEs,
      image: `${SITE}${tour.image}`,
      provider: { "@id": BUSINESS_ID },
      offers: {
        "@type": "Offer",
        price: tour.fromMXN,
        priceCurrency: "MXN",
        url: `${SITE}/booking?tour=${tour.id}`,
        availability: "https://schema.org/InStock",
      },
    },
  })),
};
