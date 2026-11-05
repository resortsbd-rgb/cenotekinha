import type { Metadata } from "next";
import { STATIC_ROUTES, type RoutePair } from "@/lib/routes";
import type { Locale } from "@/lib/translations";

export const SITE_URL = "https://www.cenotekinha.com";

// Imagen que muestran WhatsApp, Facebook y otras redes al compartir un enlace del sitio.
// La foto de la tirolesa es la que mejor ha vendido en anuncios (Luis, 12-oct-2026).
export const OG_IMAGES = [
  {
    url: "/images/og-cenotes-kinha.jpg",
    width: 1200,
    height: 630,
    alt: "Tirolesa sobre la selva en Cenotes Kin-Ha, Puerto Morelos",
  },
];

/** hreflang: español, inglés y x-default (inglés para quien no busca en ninguno de los dos). */
export function languageAlternates(pair: RoutePair) {
  return { es: pair.es, en: pair.en, "x-default": pair.en };
}

export function buildMetadata(pair: RoutePair, locale: Locale, title: string, description: string): Metadata {
  const url = pair[locale];
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(pair) },
    openGraph: {
      images: OG_IMAGES,
      type: "website",
      siteName: "Cenotes Kin-Ha",
      locale: locale === "es" ? "es_MX" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_MX",
      title,
      description,
      url,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const PAGE_COPY = {
  home: {
    es: {
      title: "Cenotes Kin-Ha | Tours de cenotes y ATV cerca de Cancún",
      description:
        "Cenote Kin-Ha y Cenote Blanca Flor en la Ruta de los Cenotes, cerca de Cancún: ATV, tirolesas y paseo a caballo con transporte desde tu hotel.",
    },
    en: {
      title: "Cenotes Near Cancún: ATV, Zip Line & Horse Tours | Kin-Ha",
      description:
        "Swim in Kin-Ha and Blanca Flor cenotes on the Ruta de los Cenotes near Cancún. ATV, zip lines, horseback riding and hotel pickup. Free cancellation up to 24h.",
    },
  },
  experiences: {
    es: {
      title: "Tours de cenotes, ATV y caballos cerca de Cancún | Kin-Ha",
      description:
        "Compara los tours de Cenotes Kin-Ha: ATV, tirolesas, caballo o tour ecológico en dos cenotes. Precios por persona, transporte desde tu hotel y reserva en línea.",
    },
    en: {
      title: "Cenote, ATV & Horseback Tours Near Cancún | Kin-Ha",
      description:
        "Compare Kin-Ha's tours: ATV, zip lines, horseback riding or an eco tour with two cenotes. Prices per person, hotel pickup and online booking.",
    },
  },
  booking: {
    es: {
      title: "Reserva tu Tour en Cenotes Kin-Ha | Puerto Morelos",
      description:
        "Reserva en línea tu visita a Cenotes Kin-Ha con calendario en tiempo real y pago seguro, o escríbenos por WhatsApp. Ruta de los Cenotes, Puerto Morelos.",
    },
    en: {
      title: "Book Your Kin-Ha Cenote Tour | Near Cancún",
      description:
        "Book your Kin-Ha cenote tour online with a live calendar and secure payment, or message us on WhatsApp. Ruta de los Cenotes, Puerto Morelos.",
    },
  },
  gallery: {
    es: {
      title: "Fotos de Cenotes Kin-Ha y Blanca Flor | Puerto Morelos",
      description:
        "Fotos reales del Cenote Kin-Ha, el Cenote Blanca Flor, las tirolesas, el ATV y el paseo a caballo en la Ruta de los Cenotes de Puerto Morelos.",
    },
    en: {
      title: "Photos of Kin-Ha & Blanca Flor Cenotes | Near Cancún",
      description:
        "Real photos of Kin-Ha and Blanca Flor cenotes, the zip lines, ATV and horseback rides on the Ruta de los Cenotes in Puerto Morelos.",
    },
  },
  about: {
    es: {
      title: "Sobre Cenotes Kin-Ha | Ruta de los Cenotes, Puerto Morelos",
      description:
        "Conoce Cenotes Kin-Ha: dos cenotes, tirolesas, ATV y caballos en la selva de la Ruta de los Cenotes, con cuidado del agua y atención cercana.",
    },
    en: {
      title: "About Kin-Ha Cenotes | Ruta de los Cenotes, Puerto Morelos",
      description:
        "Meet Kin-Ha Cenotes: two cenotes, zip lines, ATVs and horses in the jungle on the Ruta de los Cenotes, with care for the water and personal attention.",
    },
  },
  faq: {
    es: {
      title: "Preguntas Frecuentes | Cenotes Kin-Ha, Puerto Morelos",
      description:
        "Qué llevar, cómo llegar, horarios, transportación y reglas de los cenotes. Resuelve tus dudas antes de visitar Cenotes Kin-Ha.",
    },
    en: {
      title: "FAQ: Visiting Kin-Ha Cenotes Near Cancún",
      description:
        "What to bring, how to get there, hours, hotel pickup and cenote rules. Get your questions answered before you visit Kin-Ha Cenotes.",
    },
  },
  contact: {
    es: {
      title: "Contacto y Cómo Llegar | Cenotes Kin-Ha, Puerto Morelos",
      description:
        "WhatsApp, correo, horario y ubicación de Cenotes Kin-Ha en la Ruta de los Cenotes de Puerto Morelos. Abierto todos los días de 9:00 a 17:00.",
    },
    en: {
      title: "Contact & Directions | Kin-Ha Cenotes Near Cancún",
      description:
        "WhatsApp, email, hours and directions to Kin-Ha Cenotes on the Ruta de los Cenotes in Puerto Morelos. Open daily from 9:00am to 5:00pm.",
    },
  },
  pickup: {
    es: {
      title: "Tours de cenotes con recogida en tu hotel | Kin-Ha",
      description:
        "Recogida en hoteles desde Playacar hasta Puerto Morelos, Cancún e Isla Blanca. Reserva hasta 8 horas antes. Cancelación gratis hasta 24 h.",
    },
    en: {
      title: "Cenote Tours with Hotel Pickup: Cancún & Playa | Kin-Ha",
      description:
        "Hotel pickup from Playacar to Puerto Morelos, Cancún and Isla Blanca. Book as late as 8 hours before pickup. Free cancellation up to 24 hours.",
    },
  },
  guide: {
    es: {
      title: "Cenotes cerca de Cancún: guía para elegir tu tour | Kin-Ha",
      description:
        "Qué es la Ruta de los Cenotes, diferencia entre cenote de caverna y abierto, qué tour elegir, cómo llegar, qué llevar y las reglas para nadar.",
    },
    en: {
      title: "Cenotes Near Cancún: How to Choose Your Tour | Kin-Ha",
      description:
        "What the Ruta de los Cenotes is, cave vs open-air cenotes, which tour to pick, how to get there, what to bring and the rules for swimming.",
    },
  },
} as const;

export function pageMetadata(page: keyof typeof PAGE_COPY, locale: Locale): Metadata {
  const copy = PAGE_COPY[page][locale];
  return buildMetadata(STATIC_ROUTES[page], locale, copy.title, copy.description);
}
