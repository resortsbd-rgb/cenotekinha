"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { GOOGLE_MAPS_URL } from "@/lib/structuredData";

// Calificaciones REALES y verificables. Nunca inventar reseñas ni testimonios.
// Si cambian los números, actualizarlos aquí con su fecha.
//   · Google Maps, ficha "Cenotes Kin Ha": 4.5 con 1,291 reseñas (consultada el 16-oct-2026).
//   · GetYourGuide: 4.6 (9 reseñas) y 4.5 (21 reseñas) en los dos tours de Kin-Ha (consultadas el 11-oct-2026).
//     Ya no se enlazan: mandaban a los visitantes a comprar con comisión fuera del sitio.
const SOURCE_DATE = { es: "octubre de 2026", en: "October 2026" };

const GOOGLE = { rating: 4.5, reviews: 1291 };

const GYG_LISTINGS = [
  { rating: 4.6, reviews: 9 },
  { rating: 4.5, reviews: 21 },
];
const GYG_REVIEWS = GYG_LISTINGS.reduce((sum, listing) => sum + listing.reviews, 0);
// Promedio ponderado por número de reseñas, a un decimal.
const GYG_AVERAGE =
  Math.round(
    (GYG_LISTINGS.reduce((sum, listing) => sum + listing.rating * listing.reviews, 0) / GYG_REVIEWS) * 10,
  ) / 10;

function formatCount(value: number) {
  return value.toLocaleString("en-US");
}

function Stars({ value, small = false }: { value: number; small?: boolean }) {
  const size = small ? "h-3.5 w-3.5" : "h-5 w-5";
  const row = (color: string) => (
    <span className={`flex gap-0.5 ${color}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} aria-hidden="true" className={`${size} shrink-0`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
  return (
    <span className="relative inline-block" role="img" aria-label={`${value.toFixed(1)} / 5`}>
      {row("text-[#0b4638]/15")}
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${(value / 5) * 100}%` }}>
        {row("text-[#d99a4e]")}
      </span>
    </span>
  );
}

export default function ReviewsSection() {
  const { locale } = useLanguage();
  const t = translations[locale];
  const isEs = locale === "es";

  return (
    <section id="reviews" className="bg-[#f6f1e7] px-4 py-20 text-[#10231e] sm:px-6 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#0b7760]">
            {isEs ? "Reseñas públicas" : "Public reviews"}
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1] tracking-[-0.03em] md:text-5xl">
            {t.testimonials.title}
          </h2>
          <div className="mt-8 flex items-end gap-4">
            <span className="font-serif text-7xl leading-none text-[#0b4638]">{GOOGLE.rating.toFixed(1)}</span>
            <div className="pb-2">
              <Stars value={GOOGLE.rating} />
              <p className="mt-2 text-sm text-[#10231e]/70">
                {isEs
                  ? `de 5 · ${formatCount(GOOGLE.reviews)} reseñas en Google Maps`
                  : `out of 5 · ${formatCount(GOOGLE.reviews)} reviews on Google Maps`}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-md leading-relaxed text-[#10231e]/70">
            {isEs
              ? "Lo que opinan quienes ya visitaron los cenotes Kin-Ha y Blanca Flor. Léelas antes de reservar."
              : "What guests who have already visited Kin-Ha and Blanca Flor cenotes say. Read them before you book."}
          </p>
        </div>

        <ul className="grid gap-4">
          <li>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-6 border border-[#0b4638]/15 bg-white px-6 py-5 transition hover:border-[#0b4638]/40 hover:shadow-md"
            >
              <span>
                <span className="block font-semibold leading-snug">
                  {isEs ? "Cenotes Kin-Ha en Google Maps" : "Kin-Ha Cenotes on Google Maps"}
                </span>
                <span className="mt-1 block text-sm text-[#10231e]/60">
                  {isEs
                    ? `${formatCount(GOOGLE.reviews)} reseñas · Ver en Google Maps ↗`
                    : `${formatCount(GOOGLE.reviews)} reviews · See on Google Maps ↗`}
                </span>
              </span>
              <span className="shrink-0 text-right">
                <span className="block font-serif text-3xl leading-none text-[#0b4638]">{GOOGLE.rating.toFixed(1)}</span>
                <span className="mt-1 block">
                  <Stars value={GOOGLE.rating} small />
                </span>
              </span>
            </a>
          </li>
          <li className="flex items-center justify-between gap-6 border border-[#0b4638]/15 bg-white px-6 py-5">
            <span>
              <span className="block font-semibold leading-snug">
                {isEs ? "Tours de ATV, tirolesas y cenotes" : "ATV, zip line & cenote tours"}
              </span>
              <span className="mt-1 block text-sm text-[#10231e]/60">
                {isEs
                  ? `${GYG_REVIEWS} reseñas verificadas en GetYourGuide`
                  : `${GYG_REVIEWS} verified reviews on GetYourGuide`}
              </span>
            </span>
            <span className="shrink-0 text-right">
              <span className="block font-serif text-3xl leading-none text-[#0b4638]">{GYG_AVERAGE.toFixed(1)}</span>
              <span className="mt-1 block">
                <Stars value={GYG_AVERAGE} small />
              </span>
            </span>
          </li>
          <li className="text-xs text-[#10231e]/50">
            {isEs
              ? `Calificaciones publicadas en Google Maps y GetYourGuide, ${SOURCE_DATE.es}.`
              : `Ratings published on Google Maps and GetYourGuide, ${SOURCE_DATE.en}.`}
          </li>
        </ul>
      </div>
    </section>
  );
}
