// Carruseles de encabezado. Solo fotos reales de Kin-Ha (carpeta KINHA PICS y sitio actual).
// Cada foto tiene versión de 1600 px y de 828 px: el celular baja solo la ligera.
import type { Locale } from "@/lib/translations";

export type HeroSlide = {
  id: string;
  position: string;
  alt: Record<Locale, string>;
  caption: Record<Locale, string>;
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
  },
  blanca: {
    id: "blanca-flor",
    position: "object-[58%_55%]",
    alt: {
      es: "Cenote Blanca Flor abierto al cielo, con plataformas de salto y selva alrededor",
      en: "Open-air Blanca Flor Cenote with jumping platforms and jungle all around",
    },
    caption: { es: "Cenote Blanca Flor, abierto al cielo", en: "Blanca Flor Cenote, open to the sky" },
  },
  nado: {
    id: "blanca-nado",
    position: "object-[50%_50%]",
    alt: { es: "Visitantes nadando en el Cenote Blanca Flor", en: "Guests swimming in Blanca Flor Cenote" },
    caption: { es: "Nado libre en Blanca Flor", en: "Free swim at Blanca Flor" },
  },
  grupo: {
    id: "cenote-grupo",
    position: "object-[50%_35%]",
    alt: { es: "Visitantes con chaleco dentro del Cenote Kin-Ha", en: "Guests in life jackets inside Kin-Ha Cenote" },
    caption: { es: "Dentro del Cenote Kin-Ha", en: "Inside Kin-Ha Cenote" },
  },
  atv: {
    id: "atv-sonrisa",
    position: "object-[60%_22%]",
    alt: { es: "Visitante sonriendo mientras maneja un ATV en la selva", en: "Smiling guest riding an ATV in the jungle" },
    caption: { es: "ATV por la selva", en: "Jungle ATV ride" },
  },
  atvSelva: {
    id: "atv-selva",
    position: "object-[60%_20%]",
    alt: { es: "Visitante feliz en ATV rodeada de selva", en: "Happy guest on an ATV surrounded by jungle" },
    caption: { es: "Selva de la Ruta de los Cenotes", en: "Jungle on the Ruta de los Cenotes" },
  },
  amigos: {
    id: "atv-amigos",
    position: "object-[45%_45%]",
    alt: { es: "Dos visitantes en ATV en un camino de la selva", en: "Two guests on ATVs on a jungle trail" },
    caption: { es: "ATV con tu grupo", en: "ATVs with your group" },
  },
  tirolesa: {
    id: "tirolesa",
    position: "object-[72%_42%]",
    alt: { es: "Visitante de cabeza en la tirolesa entre la selva", en: "Guest hanging upside down on a zip line in the jungle" },
    caption: { es: "3 tirolesas entre la selva", en: "3 zip lines through the jungle" },
  },
  caballo: {
    id: "caballo",
    position: "object-[50%_18%]",
    alt: { es: "Paseo a caballo por un sendero de la selva", en: "Horseback ride on a jungle trail" },
    caption: { es: "Cabalgata por la selva", en: "Jungle horseback ride" },
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
