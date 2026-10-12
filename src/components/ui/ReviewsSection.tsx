"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

// Calificaciones REALES y verificables de GetYourGuide (consultadas el 11-oct-2026).
// Nunca inventar reseñas ni testimonios. Si cambian los números, actualizarlos aquí con su fecha.
const SOURCE_DATE = { es: "octubre de 2026", en: "October 2026" };

const LISTINGS = [
  {
    url: "https://www.getyourguide.com/ruta-de-los-cenotes-l186496/cancun-jungle-atv-zipline-and-cenote-tour-with-lunch-t1386651/",
    name: {
      es: "ATV en la selva, 3 tirolesas y 2 cenotes con comida",
      en: "Jungle ATV, 3 zip lines & 2 cenotes with lunch",
    },
    rating: 4.6,
    reviews: 9,
  },
  {
    url: "https://www.getyourguide.com/playa-del-carmen-l308/riviera-maya-atv-ziplines-the-kin-ha-cenotes-home-t1390990/",
    name: {
      es: "ATV, tirolesas y los cenotes Kin-Ha",
      en: "ATV, zip lines & the Kin-Ha cenotes",
    },
    rating: 4.5,
    reviews: 21,
  },
];

const TOTAL_REVIEWS = LISTINGS.reduce((sum, listing) => sum + listing.reviews, 0);
// Promedio ponderado por número de reseñas, a un decimal.
const AVERAGE =
  Math.round(
    (LISTINGS.reduce((sum, listing) => sum + listing.rating * listing.reviews, 0) / TOTAL_REVIEWS) * 10,
  ) / 10;

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
            {isEs ? "Reseñas verificadas" : "Verified reviews"}
          </p>
          <h2 className="text-balance text-4xl font-medium leading-[1] tracking-[-0.03em] md:text-5xl">
            {t.testimonials.title}
          </h2>
          <div className="mt-8 flex items-end gap-4">
            <span className="font-serif text-7xl leading-none text-[#0b4638]">{AVERAGE.toFixed(1)}</span>
            <div className="pb-2">
              <Stars value={AVERAGE} />
              <p className="mt-2 text-sm text-[#10231e]/70">
                {isEs
                  ? `de 5 · ${TOTAL_REVIEWS} reseñas verificadas en GetYourGuide`
                  : `out of 5 · ${TOTAL_REVIEWS} verified reviews on GetYourGuide`}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-md leading-relaxed text-[#10231e]/70">
            {isEs
              ? "Opiniones de viajeros de Estados Unidos, Canadá, Reino Unido, Francia y Alemania que ya vivieron Kin-Ha."
              : "Reviews from travelers from the US, Canada, the UK, France and Germany who have already been to Kin-Ha."}
          </p>
        </div>

        <ul className="grid gap-4">
          {LISTINGS.map((listing) => (
            <li key={listing.url}>
              <a
                href={listing.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center justify-between gap-6 border border-[#0b4638]/15 bg-white px-6 py-5 transition hover:border-[#0b4638]/40 hover:shadow-md"
              >
                <span>
                  <span className="block font-semibold leading-snug">{listing.name[locale]}</span>
                  <span className="mt-1 block text-sm text-[#10231e]/60">
                    {isEs ? `${listing.reviews} reseñas verificadas` : `${listing.reviews} verified reviews`} · GetYourGuide ↗
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block font-serif text-3xl leading-none text-[#0b4638]">{listing.rating.toFixed(1)}</span>
                  <span className="mt-1 block">
                    <Stars value={listing.rating} small />
                  </span>
                </span>
              </a>
            </li>
          ))}
          <li className="text-xs text-[#10231e]/50">
            {isEs
              ? `Calificaciones publicadas en GetYourGuide, ${SOURCE_DATE.es}.`
              : `Ratings published on GetYourGuide, ${SOURCE_DATE.en}.`}
          </li>
        </ul>
      </div>
    </section>
  );
}
