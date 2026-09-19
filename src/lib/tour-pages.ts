export const tourPages = {
  "dos-cenotes-kin-ha": {
    id: "cenote-dual",
    title: "Dos cenotes en Puerto Morelos: Kin-Ha y Blanca Flor",
    seoTitle: "Dos cenotes cerca de Cancún | Kin-Ha y Blanca Flor",
    description: "Visita el cenote subterráneo Kin-Ha y el cenote abierto Blanca Flor en la Ruta de los Cenotes, Puerto Morelos. Consulta disponibilidad para tu visita.",
    intro: "Conoce dos paisajes de agua dulce en una sola visita: Kin-Ha, un cenote subterráneo, y Blanca Flor, un cenote abierto. Ambos están en Cenotes Kin-Ha, en la Ruta de los Cenotes de Puerto Morelos.",
    highlights: ["Dos cenotes con ambientes diferentes", "Tiempo para nadar y explorar", "Una escapada de naturaleza desde Cancún o la Riviera Maya"],
    questions: [
      { q: "¿Dónde están los cenotes?", a: "En Cenotes Kin-Ha, sobre la Ruta de los Cenotes en Puerto Morelos, Quintana Roo. Solicita la ubicación exacta al confirmar tu visita." },
      { q: "¿Puedo usar bloqueador solar en los cenotes?", a: "No. Para proteger el agua, no uses bloqueador antes de entrar a los cenotes y toma la ducha previa." },
      { q: "¿Hay casilleros?", a: "Sí, hay casilleros disponibles sin costo." },
    ],
  },
  "atv-tirolesas-cenotes": {
    id: "atv-cenotes",
    title: "ATV, tirolesas y dos cenotes en Puerto Morelos",
    seoTitle: "ATV, tirolesas y cenotes cerca de Cancún | Kin-Ha",
    description: "Combina un recorrido en ATV, tirolesas y la visita a dos cenotes en la Ruta de los Cenotes, Puerto Morelos. Consulta horarios, transporte y disponibilidad.",
    intro: "Recorre la selva en ATV, prueba las tirolesas y termina entre las aguas de Kin-Ha y Blanca Flor: un cenote subterráneo y otro abierto en la Ruta de los Cenotes.",
    highlights: ["ATV por la selva", "Tres tirolesas", "Cenote Kin-Ha subterráneo y Blanca Flor abierto"],
    questions: [
      { q: "¿Incluye transporte desde Cancún?", a: "Hay opciones de salida y recogida según la reserva. Consulta cobertura, punto de encuentro y horario antes de confirmar." },
      { q: "¿Puedo añadir paseo a caballo?", a: "Consulta la disponibilidad y el costo del paseo a caballo al reservar; no está incluido en esta experiencia." },
      { q: "¿Qué debo saber antes de nadar?", a: "Dúchate antes de entrar al cenote y no uses bloqueador solar en el agua. Hay casilleros gratuitos." },
    ],
  },
  "caballos-y-cenotes": {
    id: "ecuestre-cenotes",
    title: "Caballos y cenotes en la Ruta de los Cenotes",
    seoTitle: "Paseo a caballo y cenotes en Puerto Morelos | Kin-Ha",
    description: "Combina un paseo a caballo y tiempo en los cenotes Kin-Ha y Blanca Flor en Puerto Morelos. Consulta condiciones, disponibilidad y reserva.",
    intro: "Disfruta un paseo a caballo en el entorno natural de Kin-Ha y visita los cenotes Kin-Ha y Blanca Flor. Es una opción para quienes quieren combinar la selva con tiempo en el agua.",
    highlights: ["Paseo a caballo en el entorno del parque", "Visita a dos cenotes", "Actividad en Puerto Morelos, Quintana Roo"],
    questions: [
      { q: "¿El paseo a caballo está incluido?", a: "Sí, el paseo a caballo forma parte de esta experiencia. Confirma duración, requisitos y disponibilidad al reservar." },
      { q: "¿Qué cenotes se visitan?", a: "Kin-Ha, subterráneo, y Blanca Flor, abierto." },
      { q: "¿Qué debo llevar?", a: "Traje de baño, toalla, ropa de cambio y calzado cómodo. No uses bloqueador solar antes de entrar a los cenotes." },
    ],
  },
  "aventura-completa-kin-ha": {
    id: "experiencia-completa",
    title: "Aventura completa en Cenotes Kin-Ha",
    seoTitle: "Aventura completa: ATV, caballos y cenotes | Kin-Ha",
    description: "Explora la experiencia completa de Kin-Ha: ATV, tirolesas, paseo a caballo y dos cenotes en Puerto Morelos. Consulta el itinerario y la disponibilidad.",
    intro: "Reúne en una visita las actividades de aventura de Kin-Ha: recorrido en ATV, tirolesas, paseo a caballo y tiempo en los cenotes Kin-Ha y Blanca Flor. La experiencia incluye almuerzo; confirma el menú y los horarios antes de reservar.",
    highlights: ["ATV y tirolesas", "Paseo a caballo", "Dos cenotes: uno subterráneo y otro abierto", "Almuerzo incluido"],
    questions: [
      { q: "¿Qué actividades incluye?", a: "ATV, tirolesas, paseo a caballo, acceso a Kin-Ha y Blanca Flor y almuerzo. Confirma los detalles operativos al reservar." },
      { q: "¿Está incluido el transporte?", a: "Consulta si hay recogida disponible para tu ubicación y el costo correspondiente antes de confirmar." },
      { q: "¿Puedo usar bloqueador en los cenotes?", a: "No. Se solicita ducha previa y no usar bloqueador antes de entrar al agua. Los casilleros son gratuitos." },
    ],
  },
} as const;

export type TourSlug = keyof typeof tourPages;
export const tourSlugs = Object.keys(tourPages) as TourSlug[];
