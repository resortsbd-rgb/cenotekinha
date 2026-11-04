// Mapa de URLs por idioma. Cada página tiene una URL en español (sin prefijo) y otra en inglés (/en).
// Con este mapa se generan los enlaces internos, el selector de idioma, hreflang y el sitemap.
import type { Locale } from "@/lib/translations";

export type RoutePair = { es: string; en: string };

export const STATIC_ROUTES = {
  home: { es: "/", en: "/en" },
  experiences: { es: "/experiences", en: "/en/experiences" },
  booking: { es: "/booking", en: "/en/booking" },
  gallery: { es: "/gallery", en: "/en/gallery" },
  about: { es: "/about", en: "/en/about" },
  faq: { es: "/faq", en: "/en/faq" },
  contact: { es: "/contact", en: "/en/contact" },
  guide: { es: "/guia/cenotes-cerca-de-cancun", en: "/en/guide/cenotes-near-cancun" },
} satisfies Record<string, RoutePair>;

// Las direcciones en español reutilizan las del sitio anterior que Google todavía conoce.
export const TOUR_ROUTES: Record<string, RoutePair> = {
  "atv-cenotes": { es: "/tours/atv-tirolesas-cenotes", en: "/en/tours/atv-zip-lines-cenotes" },
  "tour-ecologico": { es: "/tours/tour-ecologico-cenotes", en: "/en/tours/eco-tour-cenotes" },
  "cenote-dual": { es: "/tours/cenote-kin-ha-blanca-flor", en: "/en/tours/kin-ha-blanca-flor-cenotes" },
  "experiencia-completa": { es: "/tours/aventura-completa-kin-ha", en: "/en/tours/full-adventure-atv-horses-cenotes" },
  "ecuestre-cenotes": { es: "/tours/caballos-y-cenotes", en: "/en/tours/horseback-zip-lines-cenotes" },
};

export const ALL_ROUTES: RoutePair[] = [...Object.values(STATIC_ROUTES), ...Object.values(TOUR_ROUTES)];

function normalize(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

function findPair(path: string) {
  const clean = normalize(path);
  return ALL_ROUTES.find((pair) => pair.es === clean || pair.en === clean);
}

/** La misma página en otro idioma. Si la ruta no está en el mapa, lleva al inicio de ese idioma. */
export function alternatePath(path: string, locale: Locale) {
  return findPair(path)?.[locale] ?? STATIC_ROUTES.home[locale];
}

/**
 * Convierte un enlace interno al idioma indicado y conserva ?consulta y #ancla.
 * Ejemplo: localizedHref("/booking?tour=atv-cenotes", "en") → "/en/booking?tour=atv-cenotes".
 */
export function localizedHref(href: string, locale: Locale) {
  const match = href.match(/^([^?#]*)(.*)$/);
  const path = match?.[1] || "/";
  const rest = match?.[2] ?? "";
  return `${alternatePath(path, locale)}${rest}`;
}

export function tourPath(tourId: string, locale: Locale) {
  return TOUR_ROUTES[tourId][locale];
}

export function tourIdFromSlug(slug: string, locale: Locale) {
  const prefix = locale === "en" ? "/en/tours/" : "/tours/";
  return Object.keys(TOUR_ROUTES).find((id) => TOUR_ROUTES[id][locale] === `${prefix}${slug}`);
}

export function tourSlugs(locale: Locale) {
  return Object.values(TOUR_ROUTES).map((pair) => pair[locale].split("/").pop() as string);
}
