// Carruseles de encabezado. Solo fotos reales de Kin-Ha (carpeta KINHA PICS y sitio actual).
// Cada foto tiene versión de 1600 px y de 828 px: el celular baja solo la ligera.
import type { Locale } from "@/lib/translations";

export type HeroSlide = {
  id: string;
  position: string;
  alt: Record<Locale, string>;
  caption: Record<Locale, string>;
  headline: Record<Locale, { line1: string; line2: string }>;
};

export type StoryBeat = {
  slide: HeroSlide;
  title: Record<Locale, string>;
  text: Record<Locale, string>;
};

const SLIDES = {
  cueva: {
    id: "cueva-columpio",
    position: "object-[50%_60%]",
    alt: {
      es: "Visitante en el columpio sobre el agua azul de la cueva del Cenote Kin-Ha",
      en: "Guest on the swing over the blue water of the Kin-Ha cave cenote",
    },
    caption: { es: "Cenote Kin-Ha, la caverna", en: "Kin-Ha Cenote, the cavern" },
    headline: { es: { line1: "Salta a la cueva.", line2: "Vive la aventura." }, en: { line1: "Dive into the cave.", line2: "Live the adventure." } },
  },
  blanca: {
    id: "blanca-flor",
    position: "object-[58%_55%]",
    alt: {
      es: "Cenote Blanca Flor abierto al cielo, con plataformas de salto y selva alrededor",
      en: "Open-air Blanca Flor Cenote with jumping platforms and jungle all around",
    },
    caption: { es: "Cenote Blanca Flor, abierto al cielo", en: "Blanca Flor Cenote, open to the sky" },
    headline: { es: { line1: "Agua que brilla.", line2: "Selva que respira." }, en: { line1: "Water that glows.", line2: "Jungle that breathes." } },
  },
  nado: {
    id: "blanca-nado",
    position: "object-[50%_50%]",
    alt: { es: "Visitantes nadando en el Cenote Blanca Flor", en: "Guests swimming in Blanca Flor Cenote" },
    caption: { es: "Nado libre en Blanca Flor", en: "Free swim at Blanca Flor" },
    headline: { es: { line1: "Sumérgete", line2: "en plena selva." }, en: { line1: "Plunge in,", line2: "deep in the jungle." } },
  },
  grupo: {
    id: "cenote-grupo",
    position: "object-[50%_35%]",
    alt: { es: "Visitantes con chaleco dentro del Cenote Kin-Ha", en: "Guests in life jackets inside Kin-Ha Cenote" },
    caption: { es: "Dentro del Cenote Kin-Ha", en: "Inside Kin-Ha Cenote" },
    headline: { es: { line1: "Baja a la cueva", line2: "con tu gente." }, en: { line1: "Head into the cave", line2: "with your crew." } },
  },
  atv: {
    id: "atv-sonrisa",
    position: "object-[60%_22%]",
    alt: { es: "Visitante sonriendo mientras maneja un ATV en la selva", en: "Smiling guest riding an ATV in the jungle" },
    caption: { es: "ATV por la selva", en: "Jungle ATV ride" },
    headline: { es: { line1: "Acelera en la selva.", line2: "Pura adrenalina." }, en: { line1: "Ride the jungle.", line2: "Pure adrenaline." } },
  },
  atvSelva: {
    id: "atv-selva",
    position: "object-[60%_20%]",
    alt: { es: "Visitante feliz en ATV rodeada de selva", en: "Happy guest on an ATV surrounded by jungle" },
    caption: { es: "Selva de la Ruta de los Cenotes", en: "Jungle on the Ruta de los Cenotes" },
    headline: { es: { line1: "Lodo, selva", line2: "y sonrisas." }, en: { line1: "Mud, jungle", line2: "and big smiles." } },
  },
  amigos: {
    id: "atv-amigos",
    position: "object-[45%_45%]",
    alt: { es: "Dos visitantes en ATV en un camino de la selva", en: "Two guests on ATVs on a jungle trail" },
    caption: { es: "ATV con tu grupo", en: "ATVs with your group" },
    headline: { es: { line1: "Rueda con tu gente", line2: "por la selva." }, en: { line1: "Ride with your crew", line2: "through the jungle." } },
  },
  tirolesa: {
    id: "tirolesa",
    position: "object-[72%_42%]",
    alt: { es: "Visitante de cabeza en la tirolesa entre la selva", en: "Guest hanging upside down on a zip line in the jungle" },
    caption: { es: "3 tirolesas entre la selva", en: "3 zip lines through the jungle" },
    headline: { es: { line1: "Vuela sobre", line2: "la selva." }, en: { line1: "Fly over", line2: "the jungle." } },
  },
  caballo: {
    id: "caballo",
    position: "object-[50%_18%]",
    alt: { es: "Paseo a caballo por un sendero de la selva", en: "Horseback ride on a jungle trail" },
    caption: { es: "Cabalgata por la selva", en: "Jungle horseback ride" },
    headline: { es: { line1: "Cruza la selva", line2: "a caballo." }, en: { line1: "Cross the jungle", line2: "on horseback." } },
  },
} satisfies Record<string, HeroSlide>;

const { cueva, blanca, nado, grupo, atv, atvSelva, amigos, tirolesa, caballo } = SLIDES;

export const PICKUP_SLIDES: HeroSlide[] = [cueva, atv, blanca, tirolesa, atvSelva];
export const GUIDE_SLIDES: HeroSlide[] = [blanca, cueva, nado, tirolesa, atv];
export const TOUR_SLIDES: Record<string, HeroSlide[]> = {
  "atv-cenotes": [atv, tirolesa, cueva, atvSelva, blanca],
  "tour-ecologico": [cueva, nado, blanca, grupo],
  "cenote-dual": [cueva, blanca, grupo, nado],
  "experiencia-completa": [atvSelva, caballo, tirolesa, cueva, amigos, blanca],
  "ecuestre-cenotes": [caballo, tirolesa, cueva, blanca],
};

const BEATS = {
  atv: {
    slide: atv,
    title: { es: "Acelera por la selva", en: "Ride through the jungle" },
    text: {
      es: "Caminos de tierra, lodo y selva a tu alrededor. No necesitas experiencia y, si prefieres, vas de pasajero con un guía.",
      en: "Dirt trails, mud and jungle all around you. No experience needed and, if you prefer, you can ride as a passenger with a guide.",
    },
  },
  tirolesa: {
    slide: tirolesa,
    title: { es: "Vuela entre los árboles", en: "Fly through the trees" },
    text: {
      es: "Tres tirolesas sobre la selva de la Ruta de los Cenotes.",
      en: "Three zip lines over the jungle on the Ruta de los Cenotes.",
    },
  },
  caballo: {
    slide: caballo,
    title: { es: "Cruza la selva a caballo", en: "Cross the jungle on horseback" },
    text: { es: "Una cabalgata guiada por senderos de selva.", en: "A guided ride along jungle trails." },
  },
  cueva: {
    slide: cueva,
    title: { es: "Entra a la cueva", en: "Enter the cave" },
    text: {
      es: "Agua azul profunda, estalactitas y luz natural que entra desde arriba. Tienes unos 30 minutos para nadar a tu ritmo.",
      en: "Deep blue water, stalactites and natural light pouring in from above. You get about 30 minutes to swim at your own pace.",
    },
  },
  blanca: {
    slide: blanca,
    title: { es: "Salta a Blanca Flor", en: "Jump into Blanca Flor" },
    text: {
      es: "Un cenote abierto al cielo, con plataformas de madera para saltar y selva alrededor.",
      en: "An open-air cenote with wooden jumping platforms and jungle all around.",
    },
  },
} satisfies Record<string, StoryBeat>;

export const TOUR_STORY: Record<string, StoryBeat[]> = {
  "atv-cenotes": [BEATS.atv, BEATS.tirolesa, BEATS.cueva, BEATS.blanca],
  "tour-ecologico": [BEATS.cueva, BEATS.blanca],
  "cenote-dual": [BEATS.cueva, BEATS.blanca],
  "experiencia-completa": [BEATS.atv, BEATS.caballo, BEATS.tirolesa, BEATS.cueva, BEATS.blanca],
  "ecuestre-cenotes": [BEATS.caballo, BEATS.tirolesa, BEATS.cueva, BEATS.blanca],
};
