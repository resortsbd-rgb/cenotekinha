// ─────────────────────────────────────────────────────────────
// Integración Bókun — checkout real (calendario + pago)
// Canal online-sales de Cenotes Kin-Ha (fuente de verdad, oct 2026).
// Precio, disponibilidad, ofertas y cupo los muestra Bókun en su
// calendario. El sitio NO debe tener precios escritos a mano.
// ─────────────────────────────────────────────────────────────

export const BOKUN_CHANNEL_UUID = "4825db78-8910-4c60-9122-f2dd8eebcc44";

export const BOKUN_LOADER_SRC =
  `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${BOKUN_CHANNEL_UUID}`;

// WhatsApp para tours sin calendario en línea. Sin '+' ni espacios.
export const WHATSAPP_FALLBACK = "529982053527";

// ─────────────────────────────────────────────────────────────
// Mapeo: id del tour en el sitio → experiencia ACTIVA en Bókun.
//   null = sin calendario en línea → el botón abre WhatsApp.
//
// Experiencias Bókun (9-oct-2026):
//   #1321347  Dos cenotes · llegada propia        ACTIVA
//   #1226446  Combo completo de aventura           ACTIVA
//   #1225604, #1321345, #1321346                    INACTIVAS — no usar
// ─────────────────────────────────────────────────────────────
export const BOKUN_PRODUCT_BY_TOUR: Record<string, number | null> = {
  "cenote-dual": 1321347,           // Dos Cenotes Kin-Ha (llegada propia)
  "experiencia-completa": 1226446,  // Aventura Completa = Combo completo
  "atv-cenotes": 1321345,           // ATV + dos cenotes + comida + pickup (activado por Luis 11-oct-2026)
  "ecuestre-cenotes": null,         // Cabalgata + dos cenotes → WhatsApp (Bókun 1321346 inactivo)
  "tour-ecologico": null,           // Cenotes + transporte + comida → WhatsApp (sin producto en Bókun)
};

export function getBokunProductId(tourId: string): number | null {
  return BOKUN_PRODUCT_BY_TOUR[tourId] ?? null;
}

// URL del calendario/checkout de un producto (se abre como modal).
// El idioma y la moneda siguen al idioma del sitio: ES → MXN, EN → USD.
export function bokunExperienceSrc(productId: number, locale: "es" | "en" = "es"): string {
  const lang = locale === "en" ? "en" : "es";
  const currency = locale === "en" ? "USD" : "MXN";
  return `https://widgets.bokun.io/online-sales/${BOKUN_CHANNEL_UUID}/experience-calendar/${productId}?partialView=1&lang=${lang}&currency=${currency}`;
}
