"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";
import { TOURS } from "@/lib/stripe";
import { trackTourView, trackWhatsAppClick } from "@/lib/analytics";
import BokunButton from "@/components/booking/BokunButton";
import PromoLine from "@/components/ui/PromoLine";
import { getBokunProductId } from "@/lib/bokun";

const WHATSAPP = "529982053527";

// Cómo llega el cliente, siempre visible en la tarjeta.
const TRANSPORT_LABEL = {
  pickup: { es: "Recogida en hotel incluida", en: "Hotel pickup included" },
  own: { es: "Llegas en tu auto · estacionamiento gratis", en: "Drive in · free parking" },
  "on-request": { es: "Transporte disponible", en: "Pickup available" },
} as const;

const PICKUP_ZONES = "Cancún · Puerto Morelos · Playa del Carmen";

// Lo que incluyen TODAS las experiencias (confirmado por Luis, 11-oct-2026).
const INCLUDED_IN_ALL = {
  es: [
    "Cenote Kin-Ha y Cenote Blanca Flor",
    "Traslado de un cenote a otro",
    "Chaleco salvavidas",
    "Degustación de tequila",
    "Lockers, baños y regaderas",
  ],
  en: [
    "Kin-Ha & Blanca Flor cenotes",
    "Ride between the two cenotes",
    "Life jacket",
    "Tequila tasting",
    "Lockers, restrooms & showers",
  ],
};

export default function ToursSection({ asPageTitle = false }: { asPageTitle?: boolean }) {
  const Heading = asPageTitle ? "h1" : "h2";
  const { locale } = useLanguage();
  const t = translations[locale];
  const tourRefs = useRef<Record<string, HTMLElement | null>>({});
  const viewedTours = useRef(new Set<string>());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const tourId = entry.target.getAttribute("data-tour-id");
          if (!tourId || viewedTours.current.has(tourId)) return;

          const tour = TOURS.find((item) => item.id === tourId);
          if (!tour) return;

          trackTourView(tour.id, locale === "es" ? tour.nameEs : tour.nameEn);
          viewedTours.current.add(tourId);
        });
      },
      { threshold: 0.45 },
    );

    Object.values(tourRefs.current).forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [locale]);

  return (
    <section id="tours" className="bg-[#062c24] px-4 py-24 text-white sm:px-6 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#69d8cb]">
              {locale === "es" ? "Elige cómo vivir Kin-Ha" : "Choose your Kin-Ha experience"}
            </p>
            <Heading className="text-balance text-5xl font-medium leading-[0.95] tracking-[-0.035em] md:text-7xl">
              {t.tours.title}
            </Heading>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-white/65 lg:justify-self-end">
            {locale === "es"
              ? "Desde una visita a los cenotes hasta un día completo de aventura. Reserva en línea con calendario y pago seguro, o escríbenos por WhatsApp."
              : "From a cenote visit to a full day of adventure. Book online with live availability and secure payment, or message us on WhatsApp."}
          </p>
        </div>

        <div className="mb-8 border border-white/12 bg-white/[.04] px-5 py-5 sm:px-7">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#d7b56d]">
            {locale === "es" ? "Incluido en todas las experiencias" : "Included in every experience"}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            {INCLUDED_IN_ALL[locale].map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="text-[#69d8cb]">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-white/55">
            {locale === "es"
              ? "Transporte desde Cancún, Puerto Morelos y Playa del Carmen incluido en el Tour ecológico, el tour de ATV y la Aventura completa."
              : "Pickup from Cancún, Puerto Morelos and Playa del Carmen included on the Eco Tour, the ATV tour and the Full Adventure."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TOURS.map((tour, index) => {
            const name = locale === "es" ? tour.nameEs : tour.nameEn;
            const description = locale === "es" ? tour.descEs : tour.descEn;
            const isFeatured = "featured" in tour && tour.featured;
            const onlineBooking = getBokunProductId(tour.id) != null;
            const message =
              locale === "es"
                ? `Hola, me interesa ${name}. ¿Me ayudan a confirmar disponibilidad, transportación y precio final?`
                : `Hi, I am interested in ${name}. Can you help me confirm availability, transportation and final pricing?`;
            const transportMessage =
              locale === "es"
                ? `Hola, quiero ${name} con transporte. ¿Me ayudan con fecha y punto de recogida?`
                : `Hi, I'd like ${name} with pickup. Can you help me with the date and pickup point?`;

            return (
              <article
                key={tour.id}
                ref={(element) => {
                  tourRefs.current[tour.id] = element;
                }}
                data-tour-id={tour.id}
                className={`group overflow-hidden border border-white/12 bg-white/[.055] ${
                  isFeatured ? "md:col-span-2 md:grid md:grid-cols-[1.2fr_.8fr] lg:col-span-3" : ""
                }`}
              >
                <div className={`relative overflow-hidden ${isFeatured ? "min-h-[360px] md:min-h-[520px]" : "h-72"}`}>
                  <Image
                    src={tour.image}
                    alt={name}
                    fill
                    className={`object-cover ${tour.imagePosition ?? "object-center"} transition duration-700 group-hover:scale-[1.035]`}
                    sizes={isFeatured ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 50vw"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031a15]/65 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 border border-white/30 bg-[#031a15]/55 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] backdrop-blur-md">
                    {isFeatured && tour.badge
                      ? tour.badge[locale]
                      : `${String(index + 1).padStart(2, "0")} · ${tour.duration}`}
                  </span>
                </div>

                <div className={`flex flex-col justify-between p-7 ${isFeatured ? "md:p-10 lg:p-12" : ""}`}>
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#69d8cb]">
                      {tour.duration}
                    </p>
                    <h3 className={`mb-4 font-medium leading-tight ${isFeatured ? "text-4xl lg:text-5xl" : "text-3xl"}`}>
                      {name}
                    </h3>
                    <p className="mb-4 leading-relaxed text-white/65">{description}</p>
                    <p className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      <span className="inline-flex items-center gap-2 font-semibold text-[#69d8cb]">
                        <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        {TRANSPORT_LABEL[tour.transport][locale]}
                      </span>
                      {tour.transport === "pickup" && <span className="text-white/55">{PICKUP_ZONES}</span>}
                    </p>
                  </div>

                  <div>
                    {tour.fromMXN != null && (
                      <p className="mb-2 border-l-2 border-[#d7b56d] pl-4">
                        <span className="text-sm text-white/60">{locale === "es" ? "Desde " : "From "}</span>
                        <strong className="text-3xl font-semibold text-white">
                          {locale === "es" ? `$${tour.fromMXN.toLocaleString("es-MX")} MXN` : `$${tour.fromUSD} USD`}
                        </strong>
                        <span className="text-xs text-white/50"> /{locale === "es" ? "persona" : "person"}</span>
                      </p>
                    )}
                    <PromoLine promo={tour.promo} className="mb-2 pl-4 text-sm font-semibold text-[#d7b56d]" />
                    {tour.withTransport && (
                      <p className="mb-2 pl-4 text-sm text-white/70">
                        {locale === "es" ? "Con transporte desde tu hotel: " : "With hotel pickup: "}
                        <strong className="font-semibold text-white">
                          {locale === "es"
                            ? `$${tour.withTransport.fromMXN.toLocaleString("es-MX")} MXN`
                            : `$${tour.withTransport.fromUSD} USD`}
                        </strong>
                        {locale === "es" ? " por persona · " : " per person · "}
                        <a
                          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(transportMessage)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackWhatsAppClick("tour_card_transport", name)}
                          className="font-semibold text-[#69d8cb] underline underline-offset-4 hover:text-white"
                        >
                          {locale === "es" ? "resérvalo por WhatsApp" : "book on WhatsApp"}
                        </a>
                      </p>
                    )}
                    <p className="mb-6 border-l-2 border-[#d7b56d] pl-4 text-sm text-white/70">
                      {onlineBooking
                        ? locale === "es"
                          ? "Reserva en línea · cancelación gratis hasta 24 h antes."
                          : "Book online · free cancellation up to 24 hours before."
                        : locale === "es"
                          ? "Reserva por WhatsApp: te confirmamos fecha, transporte y precio."
                          : "Book on WhatsApp: we reply with date, pickup and price."}
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <BokunButton
                        tourId={tour.id}
                        label={onlineBooking ? (locale === "es" ? "Reservar en línea" : "Book online") : (locale === "es" ? "Reservar por WhatsApp" : "Book on WhatsApp")}
                        whatsappMessage={message}
                        tourName={name}
                        source="tour_card"
                        className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#c9792e] px-6 py-3 font-bold text-white transition hover:bg-[#d99a4e]"
                      />
                      <Link
                        href={`/booking?tour=${tour.id}`}
                        className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-white hover:bg-white/10"
                      >
                        {locale === "es" ? "Ver detalles" : "View details"}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
