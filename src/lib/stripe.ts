// Catálogo de experiencias del sitio (tarjetas en home, /experiences y /booking).
// Precios "Desde": redondos, MXN en español y USD en inglés, sin centavos.
//   · Solo se muestra precio si fromMXN está definido.
//   · ATV y Caballos van SIN precio hasta que Luis los apruebe.
//   · Si cambia la tarifa en Bókun, actualizar aquí.
// Stripe temporarily disabled — enable when STRIPE_SECRET_KEY is configured
// import Stripe from 'stripe';
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' });

import BASE_PATH from "@/lib/basePath";

/** Cómo llega el cliente: recogida incluida, por su cuenta, o transporte que se confirma por WhatsApp. */
export type Transport = "pickup" | "own" | "on-request";

export type Tour = {
  id: string; nameEs: string; nameEn: string; descEs: string; descEn: string;
  duration: string; maxPeople: number; image: string; featured?: boolean;
  /** Encuadre de la foto en tarjetas apaisadas (clase object-position de Tailwind). */
  imagePosition?: string;
  /** Etiqueta de las tarjetas grandes (featured). */
  badge?: { es: string; en: string };
  fromMXN?: number; fromUSD?: number;
  transport: Transport;
  /** Promoción REAL con fecha de fin (debe coincidir con Bókun). Se apaga sola al vencer. */
  promo?: { es: string; en: string; until: string };
  /** Variante con transporte que se reserva por WhatsApp (sin producto en Bókun todavía). */
  withTransport?: { fromMXN: number; fromUSD: number };
};

export const TOURS: Tour[] = [
  {
    id: 'atv-cenotes',
    fromMXN: 1100,  // ATV compartido por persona: precio único permanente (sin tarifa "regular" + "promo")
    fromUSD: 60,    // ≤ GetYourGuide ($64 con descuento / $80 regular): el sitio siempre es el mejor precio
    nameEs: 'ATV, tirolesas y dos cenotes',
    nameEn: 'ATV, Zip Lines & Two Cenotes',
    descEs: 'Recorre la selva en ATV, vuela en 3 tirolesas y nada en el Cenote Kin-Ha y el Cenote Blanca Flor. Incluye transporte desde tu hotel, comida mexicana y degustación de tequila. Opción de ATV individual. Desde 2 personas.',
    descEn: 'Ride an ATV through the jungle, fly on 3 zip lines and swim in Kin-Ha and Blanca Flor cenotes. Includes hotel pickup, Mexican lunch and a tequila tasting. Solo ATV option available. From 2 people.',
    duration: '4–5 h',
    maxPeople: 15,
    image: `${BASE_PATH}/images/tour-atv-cenotes.webp`,
    featured: true,
    badge: { es: 'Experiencia insignia', en: 'Signature experience' },
    transport: 'pickup',
  },
  {
    id: 'tour-ecologico',
    fromMXN: 800,   // cenotes + transporte + comida (sin ATV ni tirolesas) — confirmado por Luis
    fromUSD: 45,
    nameEs: 'Tour ecológico: cenotes con transporte y comida',
    nameEn: 'Eco Tour: Cenotes with Pickup & Lunch',
    descEs: 'Te recogemos en tu hotel, nadas en el Cenote Kin-Ha y el Cenote Blanca Flor y disfrutas una comida mexicana con degustación de tequila. Un día de naturaleza a tu ritmo, ideal para familias.',
    descEn: 'We pick you up at your hotel, you swim in Kin-Ha and Blanca Flor cenotes and enjoy a Mexican lunch with a tequila tasting. A laid-back nature day, perfect for families.',
    duration: '4–5 h',
    maxPeople: 20,
    image: `${BASE_PATH}/images/tour-ecologico.webp`,
    imagePosition: 'object-[50%_60%]',
    transport: 'pickup',
  },
  {
    id: 'cenote-dual',
    fromMXN: 600,   // regular Bókun 1321347 (la oferta de octubre, 480, la muestra Bókun)
    fromUSD: 33,    // tarifa fija en USD de Bókun 1321347
    nameEs: 'Cenote Kin-Ha y Cenote Blanca Flor',
    nameEn: 'Kin-Ha & Blanca Flor Cenotes',
    descEs: 'Nada en el Cenote Kin-Ha, una caverna subterránea con luz natural, y en el Cenote Blanca Flor, abierto al cielo y con plataformas para saltar. Ideal si vienes en tu auto; ¿sin auto?, elige el Tour ecológico.',
    descEn: 'Swim in Kin-Ha Cenote, an underground cavern lit by natural light, and in open-air Blanca Flor Cenote with its jumping platforms. Perfect if you have a car; no car? Choose the Eco Tour.',
    duration: '5 h',
    maxPeople: 20,
    image: `${BASE_PATH}/images/tour-dos-cenotes.webp`,
    imagePosition: 'object-[50%_35%]',
    transport: 'own',
    promo: {
      es: 'Oferta de octubre: 20% de descuento pagando en línea antes del 31 de octubre.',
      en: 'October deal: 20% off when you pay online by October 31.',
      until: '2026-11-01T05:00:00Z', // 31-oct 23:59 hora de Cancún (oferta de Bókun 1321347)
    },
  },
  {
    id: 'ecuestre-cenotes',
    nameEs: 'Paseo a caballo y dos cenotes',
    nameEn: 'Horseback Ride & Two Cenotes',
    descEs: 'Cabalgata guiada por la selva y nado en el Cenote Kin-Ha y el Cenote Blanca Flor. Escríbenos y te confirmamos horario, transporte y precio.',
    descEn: 'Guided horseback ride through the jungle plus a swim in Kin-Ha and Blanca Flor cenotes. Message us and we confirm times, pickup and price.',
    duration: '4 h',
    maxPeople: 15,
    image: `${BASE_PATH}/images/tour-caballos-cenotes.webp`,
    imagePosition: 'object-[50%_18%]',
    transport: 'on-request',
  },
  {
    id: 'experiencia-completa',
    fromMXN: 1400,  // adulto Bókun 1226446
    fromUSD: 80,    // Bókun convierte 1,400 MXN ≈ USD 79.40
    nameEs: 'Aventura completa: ATV, caballo y cenotes',
    nameEn: 'Full Adventure: ATV, Horses & Cenotes',
    descEs: 'Todo en un día: ATV, paseo a caballo, tirolesas y los cenotes Kin-Ha y Blanca Flor. Incluye transporte desde tu hotel, guía bilingüe, comida mexicana y degustación de tequila. Desde 2 personas.',
    descEn: 'Everything in one day: ATV, horseback ride, zip lines and the Kin-Ha and Blanca Flor cenotes. Includes hotel pickup, bilingual guide, Mexican lunch and a tequila tasting. From 2 people.',
    duration: '5 h',
    maxPeople: 15,
    image: `${BASE_PATH}/images/tour-aventura-completa.webp`,
    imagePosition: 'object-[30%_30%]',
    featured: true,
    badge: { es: 'Día completo · comida y transporte', en: 'Full day · lunch & pickup' },
    transport: 'pickup',
  },
];
