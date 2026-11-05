// Contenido de cada tour: qué incluye, qué se hace y sus preguntas frecuentes.
// Solo datos confirmados por Luis o ya publicados en el sitio. Límites de edad, peso o salud
// que falten se agregan cuando operación los confirme: nunca se escriben por suposición.
import type { Locale } from "@/lib/translations";

export type TourId = "cenote-dual" | "atv-cenotes" | "ecuestre-cenotes" | "experiencia-completa" | "tour-ecologico";

export const TOUR_DETAILS: Record<TourId, {
  badge: { es: string; en: string };
  badgeColor: string;
  includes: { es: string[]; en: string[] };
  addons: { es: string[]; en: string[] };
}> = {
  "cenote-dual": {
    badge: { es: "CLÁSICO", en: "CLASSIC" },
    badgeColor: "bg-teal-500",
    includes: {
      es: ["Cenote Kin-Ha (caverna) y Cenote Blanca Flor (abierto)", "Traslado de un cenote a otro", "Chaleco salvavidas", "Degustación de tequila", "Guía bilingüe", "Lockers, baños y regaderas", "Estacionamiento gratuito"],
      en: ["Kin-Ha Cenote (cavern) and Blanca Flor Cenote (open-air)", "Ride between the two cenotes", "Life jacket", "Tequila tasting", "Bilingual guide", "Lockers, restrooms and showers", "Free parking"],
    },
    addons: {
      es: ["Paseo a caballo: +$300 MXN por persona (al pagar)", "Paquete de fotos (opcional)"],
      en: ["Horseback ride: +$17 USD per person (at checkout)", "Photo package (optional)"],
    },
  },
  "tour-ecologico": {
    badge: { es: "ECOLÓGICO", en: "ECO TOUR" },
    badgeColor: "bg-emerald-600",
    includes: {
      es: ["Transporte desde tu hotel (Cancún, Puerto Morelos, Playa del Carmen)", "Cenote Kin-Ha (caverna) y Cenote Blanca Flor (abierto)", "Traslado de un cenote a otro", "Comida mexicana", "Degustación de tequila", "Chaleco salvavidas", "Lockers, baños y regaderas"],
      en: ["Hotel pickup (Cancún, Puerto Morelos, Playa del Carmen)", "Kin-Ha Cenote (cavern) and Blanca Flor Cenote (open-air)", "Ride between the two cenotes", "Mexican lunch", "Tequila tasting", "Life jacket", "Lockers, restrooms and showers"],
    },
    addons: {
      es: ["Paquete de fotos (opcional)"],
      en: ["Photo package (optional)"],
    },
  },
  "atv-cenotes": {
    badge: { es: "MÁS POPULAR", en: "MOST POPULAR" },
    badgeColor: "bg-amber-500",
    includes: {
      es: ["Transporte desde tu hotel (Cancún, Puerto Morelos, Playa del Carmen)", "ATV por la selva", "3 tirolesas", "Cenote Kin-Ha (caverna) y Cenote Blanca Flor (abierto)", "Traslado de un cenote a otro", "Comida mexicana", "Degustación de tequila", "Chaleco salvavidas", "Guía bilingüe", "Lockers, baños y regaderas"],
      en: ["Hotel pickup (Cancún, Puerto Morelos, Playa del Carmen)", "Jungle ATV", "3 zip lines", "Kin-Ha Cenote (cavern) and Blanca Flor Cenote (open-air)", "Ride between the two cenotes", "Mexican lunch", "Tequila tasting", "Life jacket", "Bilingual guide", "Lockers, restrooms and showers"],
    },
    addons: {
      es: ["ATV individual (opcional)", "¿Prefieres caballo? Mismo precio, abajo"],
      en: ["Individual ATV (optional)", "Prefer horses? Same price, see below"],
    },
  },
  "ecuestre-cenotes": {
    badge: { es: "CON CABALLO", en: "WITH HORSES" },
    badgeColor: "bg-amber-500",
    includes: {
      es: ["Transporte desde tu hotel (Cancún, Puerto Morelos, Playa del Carmen)", "Paseo a caballo (45 min)", "3 tirolesas", "Cenote Kin-Ha (caverna) y Cenote Blanca Flor (abierto)", "Traslado de un cenote a otro", "Comida mexicana", "Degustación de tequila", "Guía certificado bilingüe", "Chaleco salvavidas", "Lockers, baños y regaderas"],
      en: ["Hotel pickup (Cancún, Puerto Morelos, Playa del Carmen)", "Horseback ride (45 min)", "3 zip lines", "Kin-Ha Cenote (cavern) and Blanca Flor Cenote (open-air)", "Ride between the two cenotes", "Mexican lunch", "Tequila tasting", "Bilingual certified guide", "Life jacket", "Lockers, restrooms and showers"],
    },
    addons: {
      es: ["Fotografía del paseo (opcional)"],
      en: ["Ride photography (optional)"],
    },
  },
  "experiencia-completa": {
    badge: { es: "MEJOR VALOR", en: "BEST VALUE" },
    badgeColor: "bg-purple-500",
    includes: {
      es: ["Transporte de ida y vuelta a tu hotel", "ATV por la selva (40 min)", "Paseo a caballo (40 min)", "Tirolesas", "Cenote Kin-Ha (caverna) y Cenote Blanca Flor (abierto)", "Traslado de un cenote a otro", "Comida mexicana tradicional y agua", "Degustación de tequila", "Chaleco salvavidas y equipo de seguridad", "Guía bilingüe", "Lockers, baños y regaderas"],
      en: ["Round-trip hotel pickup", "Jungle ATV (40 min)", "Horseback ride (40 min)", "Zip lines", "Kin-Ha Cenote (cavern) and Blanca Flor Cenote (open-air)", "Ride between the two cenotes", "Traditional Mexican lunch and water", "Tequila tasting", "Life jacket and safety gear", "Bilingual guide", "Lockers, restrooms and showers"],
    },
    addons: {
      es: [],
      en: [],
    },
  },
};

type Localized<T> = Record<Locale, T>;
type Faq = { q: string; a: string };

export type TourContent = {
  seoTitle: Localized<string>;
  seoDescription: Localized<string>;
  /** Primer párrafo: responde qué es, cuánto cuesta, cuánto dura y qué incluye. */
  answer: Localized<string>;
  activities: Localized<string[]>;
  notIncluded: Localized<string[]>;
  idealFor: Localized<string[]>;
  arrival: Localized<string>;
  faqs: Localized<Faq[]>;
};

const PICKUP_ARRIVAL = {
  es: "Recogemos en hoteles desde Playacar y Playa del Carmen hasta Puerto Morelos, Cancún e Isla Blanca. Te confirmamos la hora exacta y te pedimos tu número de habitación, porque la seguridad de muchos hoteles lo exige. Conviene estar listo 10 minutos antes.",
  en: "We pick up at hotels from Playacar and Playa del Carmen to Puerto Morelos, Cancún and Isla Blanca. We confirm the exact time and ask for your room number, because security at many resorts requires it. Please be ready 10 minutes early.",
};

export const TOUR_CONTENT: Record<TourId, TourContent> = {
  "atv-cenotes": {
    seoTitle: {
      es: "Tour ATV, tirolesas y dos cenotes desde Cancún | Kin-Ha",
      en: "ATV Tour from Cancún with Zip Lines & 2 Cenotes | Kin-Ha",
    },
    seoDescription: {
      es: "ATV por la selva, 3 tirolesas y nado en dos cenotes, con transporte, comida y tequila. Desde {price} por persona. Cancela gratis hasta 24 h.",
      en: "Jungle ATV, 3 zip lines and two cenote swims, with hotel pickup, lunch and tequila tasting. From {price} per person. Free cancellation up to 24 hours before.",
    },
    answer: {
      es: "El tour de ATV de Cenotes Kin-Ha combina un recorrido en cuatrimoto por la selva, 3 tirolesas y nado en dos cenotes: Kin-Ha, una caverna con luz natural, y Blanca Flor, abierto al cielo. Cuesta desde {price} por persona con ATV compartido, dura de 4 a 5 horas e incluye transporte desde tu hotel en Cancún, Puerto Morelos o Playa del Carmen, comida mexicana y degustación de tequila.",
      en: "Kin-Ha's ATV tour combines a jungle ride, 3 zip lines and swims in two cenotes: Kin-Ha, a cavern lit by natural light, and open-air Blanca Flor. It costs from {price} per person on a shared ATV, lasts 4 to 5 hours and includes hotel pickup from Cancún, Puerto Morelos or Playa del Carmen, a Mexican lunch and a tequila tasting.",
    },
    activities: {
      es: ["Recorrido en ATV por caminos de selva", "3 tirolesas entre la vegetación", "Nado libre en el Cenote Kin-Ha (caverna), unos 30 minutos", "Nado libre en el Cenote Blanca Flor (abierto, con plataformas para saltar), unos 30 minutos", "Comida mexicana y degustación de tequila"],
      en: ["ATV ride along jungle trails", "3 zip lines through the canopy", "Free swim in Kin-Ha Cenote (cavern), about 30 minutes", "Free swim in Blanca Flor Cenote (open-air, with jumping platforms), about 30 minutes", "Mexican lunch and tequila tasting"],
    },
    notIncluded: {
      es: ["Propinas (opcionales)", "Paquete de fotos (opcional)", "ATV individual: opcional, consulta el precio al reservar"],
      en: ["Tips (optional)", "Photo package (optional)", "Individual ATV: optional, check the price when booking"],
    },
    idealFor: {
      es: ["Quien busca aventura y cenotes en un solo tour", "Principiantes: no necesitas experiencia previa", "Viajeros solos: también puedes reservar para una persona"],
      en: ["Travelers who want adventure and cenotes in one tour", "Beginners: no prior experience needed", "Solo travelers: you can book for one person"],
    },
    arrival: PICKUP_ARRIVAL,
    faqs: {
      es: [
        { q: "¿Necesito experiencia para manejar el ATV?", a: "No. El tour es apto para principiantes. Si prefieres no manejar, puedes ir como pasajero con un guía." },
        { q: "¿Puedo reservar si viajo solo?", a: "Sí. Este tour se puede reservar para una persona." },
        { q: "¿Puedo cambiar el ATV por un paseo a caballo?", a: "Sí, al mismo precio. Es una cabalgata guiada de 45 minutos, con hasta 6 personas por salida." },
        { q: "¿Con cuánta anticipación debo reservar?", a: "Los tours con transporte se reservan con al menos 8 horas de anticipación." },
      ],
      en: [
        { q: "Do I need experience to ride the ATV?", a: "No. The tour is suitable for beginners. If you'd rather not drive, you can ride as a passenger with a guide." },
        { q: "Can I book if I'm traveling alone?", a: "Yes. This tour can be booked for one person." },
        { q: "Can I swap the ATV for a horseback ride?", a: "Yes, at the same price. It's a 45-minute guided ride, with up to 6 people per departure." },
        { q: "How far in advance should I book?", a: "Tours with pickup need at least 8 hours' notice." },
      ],
    },
  },
  "tour-ecologico": {
    seoTitle: {
      es: "Tour ecológico a dos cenotes con transporte y comida | Kin-Ha",
      en: "Cenote Eco Tour from Cancún with Pickup & Lunch | Kin-Ha",
    },
    seoDescription: {
      es: "Dos cenotes con transporte desde tu hotel, comida mexicana y tequila, sin ATV ni tirolesas. Ideal para familias. Desde {price} por persona.",
      en: "Two cenotes with hotel pickup, Mexican lunch and tequila tasting, with no ATV or zip lines. Great for families. From {price} per person.",
    },
    answer: {
      es: "El Tour ecológico de Cenotes Kin-Ha es la forma más tranquila de conocer los cenotes: te recogemos en tu hotel, nadas en el Cenote Kin-Ha y en el Cenote Blanca Flor y disfrutas una comida mexicana con degustación de tequila. Cuesta desde {price} por persona, dura de 4 a 5 horas y no incluye ATV ni tirolesas. Se reserva por WhatsApp.",
      en: "Kin-Ha's Eco Tour is the most relaxed way to see the cenotes: we pick you up at your hotel, you swim in Kin-Ha and Blanca Flor cenotes and enjoy a Mexican lunch with a tequila tasting. It costs from {price} per person, lasts 4 to 5 hours and does not include ATVs or zip lines. It's booked on WhatsApp.",
    },
    activities: {
      es: ["Transporte desde tu hotel", "Nado libre en el Cenote Kin-Ha (caverna), unos 30 minutos", "Nado libre en el Cenote Blanca Flor (abierto), unos 30 minutos", "Comida mexicana y degustación de tequila"],
      en: ["Hotel pickup", "Free swim in Kin-Ha Cenote (cavern), about 30 minutes", "Free swim in Blanca Flor Cenote (open-air), about 30 minutes", "Mexican lunch and tequila tasting"],
    },
    notIncluded: {
      es: ["ATV y tirolesas", "Propinas (opcionales)", "Paquete de fotos (opcional)"],
      en: ["ATV and zip lines", "Tips (optional)", "Photo package (optional)"],
    },
    idealFor: {
      es: ["Familias con niños desde 5 años", "Quien quiere cenotes sin actividades de adrenalina", "Quien no tiene auto y no quiere manejar"],
      en: ["Families with children from age 5", "Travelers who want cenotes without adrenaline activities", "Guests without a car who'd rather not drive"],
    },
    arrival: PICKUP_ARRIVAL,
    faqs: {
      es: [
        { q: "¿En qué se diferencia del tour de ATV?", a: "Incluye los mismos dos cenotes, transporte y comida, pero sin ATV ni tirolesas." },
        { q: "¿Cómo se reserva?", a: "Por WhatsApp: te confirmamos fecha y hora de recogida." },
        { q: "¿Hay que saber nadar?", a: "No es obligatorio. Hay chalecos salvavidas disponibles para todos." },
      ],
      en: [
        { q: "How is it different from the ATV tour?", a: "It includes the same two cenotes, pickup and lunch, but no ATV or zip lines." },
        { q: "How do I book it?", a: "On WhatsApp: we confirm your date and pickup time." },
        { q: "Do I need to know how to swim?", a: "It isn't required. Life jackets are available for everyone." },
      ],
    },
  },
  "cenote-dual": {
    seoTitle: {
      es: "Entrada al Cenote Kin-Ha y Blanca Flor | Puerto Morelos",
      en: "Kin-Ha & Blanca Flor Cenote Admission | Puerto Morelos",
    },
    seoDescription: {
      es: "Entrada a dos cenotes en la Ruta de los Cenotes: caverna y cenote abierto. Estacionamiento gratis, lockers y regaderas. Desde {price} por persona.",
      en: "Admission to two cenotes on the Ruta de los Cenotes: a cavern and an open-air cenote. Free parking, lockers and showers. From {price} per person.",
    },
    answer: {
      es: "La entrada a Cenotes Kin-Ha te da acceso a dos cenotes distintos en la Ruta de los Cenotes de Puerto Morelos: Kin-Ha, una caverna subterránea con luz natural, y Blanca Flor, abierto al cielo y con plataformas para saltar. Cuesta desde {price} por persona e incluye el traslado entre cenotes, chaleco salvavidas, degustación de tequila, lockers, regaderas y estacionamiento gratis. Es la opción para quien llega en su propio auto.",
      en: "Admission to Kin-Ha Cenotes gives you access to two very different cenotes on the Ruta de los Cenotes in Puerto Morelos: Kin-Ha, an underground cavern lit by natural light, and Blanca Flor, open to the sky with jumping platforms. It costs from {price} per person and includes the ride between cenotes, a life jacket, a tequila tasting, lockers, showers and free parking. It's the option for guests who arrive by car.",
    },
    activities: {
      es: ["Nado libre en el Cenote Kin-Ha (caverna), unos 30 minutos", "Nado libre en el Cenote Blanca Flor, unos 30 minutos", "Saltos desde las plataformas de Blanca Flor", "Degustación de tequila", "Opcional: paseo a caballo, +$300 MXN por persona"],
      en: ["Free swim in Kin-Ha Cenote (cavern), about 30 minutes", "Free swim in Blanca Flor Cenote, about 30 minutes", "Jumps from Blanca Flor's platforms", "Tequila tasting", "Optional: horseback ride, +$17 USD per person"],
    },
    notIncluded: {
      es: ["Transporte desde tu hotel", "Comida", "Propinas (opcionales)", "Paquete de fotos (opcional)"],
      en: ["Hotel pickup", "Lunch", "Tips (optional)", "Photo package (optional)"],
    },
    idealFor: {
      es: ["Quien renta auto y maneja por su cuenta", "Quien se hospeda cerca de Puerto Morelos", "Quien solo quiere nadar en los cenotes"],
      en: ["Travelers with a rental car", "Guests staying near Puerto Morelos", "Anyone who just wants to swim in the cenotes"],
    },
    arrival: {
      es: "Llegas por tu cuenta por la Ruta de los Cenotes de Puerto Morelos. Busca «Cenotes Kin-Ha» en Google Maps. Puedes llegar a cualquier hora entre las 9:30 am y las 3:00 pm; el estacionamiento es gratis.",
      en: "You drive yourself along the Ruta de los Cenotes from Puerto Morelos. Search “Cenotes Kin-Ha” in Google Maps. You can arrive any time between 9:30am and 3:00pm; parking is free.",
    },
    faqs: {
      es: [
        { q: "¿Puedo llegar sin reservar?", a: "Sí, el parque recibe visitantes que llegan directo todos los días, entre las 9:30 am y las 3:00 pm. Al reservar en línea aseguras tu lugar." },
        { q: "¿Hasta qué hora puedo reservar para el mismo día?", a: "Las reservas con llegada directa cierran una hora antes del cierre del parque, que es a las 5:00 pm." },
        { q: "¿Los lockers piden depósito?", a: "No. Los lockers no requieren depósito." },
        { q: "¿Y si no tengo auto?", a: "Elige el Tour ecológico, que incluye los mismos dos cenotes, transporte desde tu hotel y comida." },
      ],
      en: [
        { q: "Can I show up without a reservation?", a: "Yes, the park welcomes walk-ins every day between 9:30am and 3:00pm. Booking online secures your spot." },
        { q: "How late can I book for the same day?", a: "Direct-arrival bookings close one hour before the park closes at 5:00pm." },
        { q: "Do the lockers require a deposit?", a: "No. Lockers have no deposit." },
        { q: "What if I don't have a car?", a: "Choose the Eco Tour, which includes the same two cenotes plus hotel pickup and lunch." },
      ],
    },
  },
  "experiencia-completa": {
    seoTitle: {
      es: "Aventura completa: ATV, caballo, tirolesas y cenotes | Kin-Ha",
      en: "ATV, Horseback, Zip Lines & Cenotes from Cancún | Kin-Ha",
    },
    seoDescription: {
      es: "ATV, caballo, 3 tirolesas y dos cenotes en un día, con transporte, comida y tequila. Desde {price} por persona, mínimo 2 personas.",
      en: "ATV, horseback riding, 3 zip lines and two cenotes in one day, with pickup, lunch and tequila. From {price} per person, minimum 2 people.",
    },
    answer: {
      es: "La Aventura completa es el tour más amplio de Cenotes Kin-Ha: ATV por la selva (40 minutos), paseo a caballo (40 minutos), 3 tirolesas y nado en los cenotes Kin-Ha y Blanca Flor. Cuesta desde {price} por persona, con mínimo de 2 personas, dura unas 5 horas e incluye transporte redondo desde tu hotel, guía bilingüe, comida mexicana y degustación de tequila.",
      en: "The Full Adventure is Kin-Ha's most complete tour: a jungle ATV ride (40 minutes), horseback riding (40 minutes), 3 zip lines and swims in Kin-Ha and Blanca Flor cenotes. It costs from {price} per person, with a minimum of 2 people, lasts about 5 hours and includes round-trip hotel pickup, a bilingual guide, a Mexican lunch and a tequila tasting.",
    },
    activities: {
      es: ["ATV por la selva (40 minutos)", "Paseo a caballo (40 minutos)", "3 tirolesas", "Nado libre en el Cenote Kin-Ha (caverna), unos 30 minutos", "Nado libre en el Cenote Blanca Flor (abierto), unos 30 minutos", "Comida mexicana y degustación de tequila"],
      en: ["Jungle ATV ride (40 minutes)", "Horseback ride (40 minutes)", "3 zip lines", "Free swim in Kin-Ha Cenote (cavern), about 30 minutes", "Free swim in Blanca Flor Cenote (open-air), about 30 minutes", "Mexican lunch and tequila tasting"],
    },
    notIncluded: {
      es: ["Propinas (opcionales)", "Paquete de fotos (opcional)"],
      en: ["Tips (optional)", "Photo package (optional)"],
    },
    idealFor: {
      es: ["Parejas y grupos que quieren probar todo en un día", "Quien solo tiene un día para la aventura", "Principiantes: no necesitas experiencia previa"],
      en: ["Couples and groups who want to try everything in one day", "Travelers with just one day for adventure", "Beginners: no prior experience needed"],
    },
    arrival: PICKUP_ARRIVAL,
    faqs: {
      es: [
        { q: "¿Cuántas personas se necesitan como mínimo?", a: "Este tour se reserva desde 2 personas. Si viajas solo, puedes reservar el tour de ATV." },
        { q: "¿Qué actividades incluye?", a: "ATV, caballo, 3 tirolesas y los dos cenotes, además de transporte, comida y degustación de tequila." },
        { q: "¿Necesito experiencia con el ATV o el caballo?", a: "No. Los tours son aptos para principiantes y en el ATV puedes ir como pasajero con un guía." },
      ],
      en: [
        { q: "What's the minimum group size?", a: "This tour starts at 2 people. If you're traveling alone, book the ATV tour." },
        { q: "What activities are included?", a: "ATV, horseback riding, 3 zip lines and both cenotes, plus pickup, lunch and a tequila tasting." },
        { q: "Do I need ATV or horseback experience?", a: "No. Tours are suitable for beginners, and on the ATV you can ride as a passenger with a guide." },
      ],
    },
  },
  "ecuestre-cenotes": {
    seoTitle: {
      es: "Paseo a caballo, tirolesas y cenotes desde Cancún | Kin-Ha",
      en: "Horseback Riding, Zip Lines & Cenotes from Cancún | Kin-Ha",
    },
    seoDescription: {
      es: "Cabalgata guiada de 45 minutos, 3 tirolesas y dos cenotes, con transporte, comida y tequila. Desde {price} por persona, hasta 6 por salida.",
      en: "A 45-minute guided horseback ride, 3 zip lines and two cenotes, with pickup, lunch and tequila. From {price} per person, up to 6 per departure.",
    },
    answer: {
      es: "El paseo a caballo de Cenotes Kin-Ha es una cabalgata guiada de 45 minutos por la selva, con 3 tirolesas y nado en los cenotes Kin-Ha y Blanca Flor. Cuesta desde {price} por persona, el mismo precio que el tour de ATV, dura de 4 a 5 horas e incluye transporte desde tu hotel, comida mexicana y degustación de tequila. Sale con un máximo de 6 personas.",
      en: "Kin-Ha's horseback tour is a 45-minute guided ride through the jungle, with 3 zip lines and swims in Kin-Ha and Blanca Flor cenotes. It costs from {price} per person, the same as the ATV tour, lasts 4 to 5 hours and includes hotel pickup, a Mexican lunch and a tequila tasting. Each departure takes up to 6 people.",
    },
    activities: {
      es: ["Cabalgata guiada por la selva (45 minutos)", "3 tirolesas entre la vegetación", "Nado libre en el Cenote Kin-Ha (caverna), unos 30 minutos", "Nado libre en el Cenote Blanca Flor (abierto), unos 30 minutos", "Comida mexicana y degustación de tequila"],
      en: ["Guided jungle horseback ride (45 minutes)", "3 zip lines through the canopy", "Free swim in Kin-Ha Cenote (cavern), about 30 minutes", "Free swim in Blanca Flor Cenote (open-air), about 30 minutes", "Mexican lunch and tequila tasting"],
    },
    notIncluded: {
      es: ["Propinas (opcionales)", "Fotografía del paseo (opcional)"],
      en: ["Tips (optional)", "Ride photography (optional)"],
    },
    idealFor: {
      es: ["Quien prefiere caballo a cuatrimoto", "Grupos pequeños, hasta 6 personas por salida", "Principiantes: el paseo es guiado"],
      en: ["Travelers who prefer horses to ATVs", "Small groups, up to 6 people per departure", "Beginners: the ride is guided"],
    },
    arrival: PICKUP_ARRIVAL,
    faqs: {
      es: [
        { q: "¿Cuánto dura el paseo a caballo?", a: "La cabalgata guiada dura 45 minutos. El tour completo, con tirolesas y cenotes, dura de 4 a 5 horas." },
        { q: "¿Cuántas personas pueden ir?", a: "Hasta 6 personas por salida." },
        { q: "¿Puedo agregar caballo si llego en mi auto?", a: "Sí. En la entrada a los dos cenotes puedes agregar el paseo a caballo al pagar por $300 MXN más por persona." },
      ],
      en: [
        { q: "How long is the horseback ride?", a: "The guided ride lasts 45 minutes. The full tour, with zip lines and cenotes, lasts 4 to 5 hours." },
        { q: "How many people can join?", a: "Up to 6 people per departure." },
        { q: "Can I add horses if I arrive by car?", a: "Yes. With two-cenote admission you can add the horseback ride at checkout for $17 USD more per person." },
      ],
    },
  },
};

/** Pone el precio vigente del catálogo en los textos: al subir un precio basta cambiarlo en TOURS. */
export function fillPrice(text: string, tour: { fromMXN?: number; fromUSD?: number }, locale: Locale) {
  const price = locale === "es" ? `$${tour.fromMXN?.toLocaleString("es-MX")} MXN` : `$${tour.fromUSD} USD`;
  return text.replaceAll("{price}", price);
}

/** Antes de ir: lo mismo para todos los tours. */
export const VISIT_NOTES = {
  es: {
    bring: ["Traje de baño", "Ropa seca para cambiarte", "Toalla", "Zapatos cómodos o acuáticos", "Efectivo para extras"],
    rules: [
      "En los cenotes no se permite ningún bloqueador, ni biodegradable. Dúchate antes de entrar.",
      "Para ATV, tirolesas y caballo sí conviene usar bloqueador fuera del agua; regaderas disponibles antes de nadar.",
      "Niños desde 5 años.",
      "No es obligatorio saber nadar: hay chalecos salvavidas para todos.",
    ],
  },
  en: {
    bring: ["Swimsuit", "Dry clothes to change into", "Towel", "Comfortable or water shoes", "Cash for extras"],
    rules: [
      "No sunscreen of any kind is allowed in the cenotes, not even biodegradable. Please shower before entering.",
      "For ATV, zip lines and horses, sunscreen is a good idea out of the water; showers are available before you swim.",
      "Children from age 5.",
      "You don't need to know how to swim: life jackets are available for everyone.",
    ],
  },
};
