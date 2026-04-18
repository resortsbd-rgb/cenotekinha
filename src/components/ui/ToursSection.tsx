"use client";
import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { translations } from "@/lib/translations";
import { TOURS } from "@/lib/stripe";
import type { Locale } from "@/lib/translations";

export default function ToursSection() {
  const { locale } = useParams<{ locale: string }>();
  const t = translations[(locale as Locale) ?? "es"];
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleBook(tourId: string) {
    setLoadingId(tourId);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tourId, quantity: 1, locale }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      if (data.url) window.location.href = data.url;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al procesar el pago";
      toast.error(message);
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <section id="tours" className="bg-gray-50 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 mb-3">
            {t.tours.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            {t.tours.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TOURS.map((tour) => {
            const name = locale === "en" ? tour.nameEn : tour.nameEs;
            const desc = locale === "en" ? tour.descEn : tour.descEs;
            const isLoading = loadingId === tour.id;

            return (
              <div
                key={tour.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/hero1.png";
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                    {t.tours.price_from} ${tour.priceMXN} MXN
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
                    {desc}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-5">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {t.tours.duration}: {tour.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {t.tours.max}: {tour.maxPeople}
                    </span>
                  </div>

                  <button
                    onClick={() => handleBook(tour.id)}
                    disabled={isLoading}
                    className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-teal-300 text-white font-semibold py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {locale === "en" ? "Processing..." : "Procesando..."}
                      </>
                    ) : (
                      t.tours.book
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
