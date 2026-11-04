import Image from "next/image";
import Link from "next/link";
import BokunButton from "@/components/booking/BokunButton";
import JsonLd from "@/components/seo/JsonLd";
import { getBokunProductId } from "@/lib/bokun";
import { STATIC_ROUTES, localizedHref, tourPath } from "@/lib/routes";
import { TOURS, MAIN_TOURS_FILTER } from "@/lib/stripe";
import { breadcrumbJsonLd, faqJsonLd, GOOGLE_MAPS_URL, tourJsonLd } from "@/lib/structuredData";
import { fillPrice, TOUR_CONTENT, TOUR_DETAILS, VISIT_NOTES, type TourId } from "@/lib/tourContent";
import type { Locale } from "@/lib/translations";

const LABELS = {
  es: {
    home: "Inicio",
    tours: "Tours",
    price: "Precio",
    from: "Desde",
    person: "por persona",
    duration: "Duración",
    transport: "Transporte",
    pickup: "Incluido desde tu hotel: Cancún, Puerto Morelos y Playa del Carmen",
    own: "Llegas en tu auto, con estacionamiento gratis",
    booking: "Reserva",
    online: "En línea, con calendario y pago seguro",
    whatsapp: "Por WhatsApp",
    cancellation: "Cancelación",
    free: "Gratis hasta 24 horas antes",
    bookOnline: "Ver fechas y reservar",
    bookWhatsapp: "Reservar por WhatsApp",
    allTours: "Comparar todos los tours",
    activities: "Qué harás",
    orderNote: "El orden de las actividades puede cambiar según la operación del día.",
    includes: "Qué incluye",
    notIncluded: "Qué no incluye",
    idealFor: "Ideal para",
    arrival: "Cómo llegas",
    directions: "Cómo llegar en Google Maps",
    bring: "Qué llevar",
    rules: "Antes de nadar",
    faq: "Preguntas sobre este tour",
    moreFaq: "Ver todas las preguntas frecuentes",
    guide: "Guía: cómo elegir tu tour de cenotes",
    rating: "4.5 de 5 con 1,291 reseñas en Google Maps (octubre de 2026)",
    others: "Otros tours en Kin-Ha",
    updated: "Información revisada en noviembre de 2026. La disponibilidad y el precio final se confirman en el calendario de reserva.",
    message: (name: string) => `Hola, me interesa ${name}. ¿Me ayudan a confirmar disponibilidad para reservar?`,
  },
  en: {
    home: "Home",
    tours: "Tours",
    price: "Price",
    from: "From",
    person: "per person",
    duration: "Duration",
    transport: "Transport",
    pickup: "Included from your hotel: Cancún, Puerto Morelos and Playa del Carmen",
    own: "Arrive by car, with free parking",
    booking: "Booking",
    online: "Online, with live calendar and secure payment",
    whatsapp: "On WhatsApp",
    cancellation: "Cancellation",
    free: "Free up to 24 hours before",
    bookOnline: "See dates & book",
    bookWhatsapp: "Book on WhatsApp",
    allTours: "Compare all tours",
    activities: "What you'll do",
    orderNote: "The order of activities may change depending on the day's operation.",
    includes: "What's included",
    notIncluded: "What's not included",
    idealFor: "Ideal for",
    arrival: "How you get there",
    directions: "Get directions in Google Maps",
    bring: "What to bring",
    rules: "Before you swim",
    faq: "Questions about this tour",
    moreFaq: "See all FAQs",
    guide: "Guide: how to choose your cenote tour",
    rating: "4.5 out of 5 from 1,291 reviews on Google Maps (October 2026)",
    others: "Other tours at Kin-Ha",
    updated: "Information reviewed in November 2026. Availability and final price are confirmed in the booking calendar.",
    message: (name: string) => `Hi, I am interested in ${name}. Can you help me check availability and book?`,
  },
};

function List({ items, mark = "✓" }: { items: string[]; mark?: string }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-[#10231e]/80">
          <span aria-hidden="true" className="font-bold text-[#0b7760]">{mark}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-5 text-3xl font-medium leading-tight tracking-[-0.02em]">{children}</h2>;
}

export default function TourDetailPage({ tourId, locale }: { tourId: TourId; locale: Locale }) {
  const tour = TOURS.find((item) => item.id === tourId);
  if (!tour) throw new Error(`Tour desconocido: ${tourId}`);
  const t = LABELS[locale];
  const content = TOUR_CONTENT[tourId];
  const name = locale === "es" ? tour.nameEs : tour.nameEn;
  const online = getBokunProductId(tour.id) != null;
  const price = locale === "es" ? `$${tour.fromMXN?.toLocaleString("es-MX")} MXN` : `$${tour.fromUSD} USD`;
  const others = TOURS.filter((item) => MAIN_TOURS_FILTER(item) && item.id !== tour.id);
  const breadcrumbs = [
    { name: t.home, path: STATIC_ROUTES.home[locale] },
    { name: t.tours, path: STATIC_ROUTES.experiences[locale] },
    { name, path: tourPath(tour.id, locale) },
  ];
  const facts: [string, string][] = [
    [t.price, `${t.from} ${price} ${t.person}`],
    [t.duration, tour.duration],
    [t.transport, tour.transport === "own" ? t.own : t.pickup],
    [t.booking, online ? t.online : t.whatsapp],
    [t.cancellation, t.free],
  ];
  const buttonClass =
    "inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#c9792e] px-8 py-4 text-center font-bold text-white transition hover:bg-[#d99a4e]";

  return (
    <div className="bg-[#f6f1e7] text-[#10231e]">
      <JsonLd data={tourJsonLd(tour.id, locale, content.activities[locale])} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqJsonLd(content.faqs[locale])} />

      <div className="relative h-[52vh] min-h-[380px] w-full">
        <Image
          src={tour.image}
          alt={name}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${tour.imagePosition ?? "object-[50%_30%]"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#031a15]/70 via-[#031a15]/10 to-[#031a15]/45" />
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-8">
        <nav aria-label={locale === "es" ? "Ruta de navegación" : "Breadcrumb"} className="mb-6 text-sm text-[#10231e]/60">
          <Link href={breadcrumbs[0].path} className="hover:underline">{t.home}</Link>
          <span aria-hidden="true"> / </span>
          <Link href={breadcrumbs[1].path} className="hover:underline">{t.tours}</Link>
          <span aria-hidden="true"> / </span>
          <span>{name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.25fr_.75fr] lg:items-start">
          <div className="min-w-0">
            <h1 className="text-balance text-4xl font-medium leading-[1.02] tracking-[-0.03em] md:text-6xl">{name}</h1>
            <p className="mt-6 text-lg leading-relaxed text-[#10231e]/80">{fillPrice(content.answer[locale], tour, locale)}</p>
            <p className="mt-4 text-sm text-[#10231e]/65">
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[#0b7760]">
                {t.rating}
              </a>
            </p>

            {/* En teléfono, el precio y el botón no deben quedar hasta abajo de la página. */}
            <div className="mt-6 border border-[#10231e]/12 bg-white p-5 lg:hidden">
              <p className="mb-4 font-semibold">{t.from} {price} <span className="font-normal text-[#10231e]/70">{t.person}</span></p>
              <BokunButton
                tourId={tour.id}
                label={online ? t.bookOnline : t.bookWhatsapp}
                whatsappMessage={t.message(name)}
                tourName={name}
                source="tour_page_top"
                className={buttonClass}
              />
            </div>

            <section className="mt-12">
              <Heading>{t.activities}</Heading>
              <List items={content.activities[locale]} />
              <p className="mt-4 text-sm text-[#10231e]/60">{t.orderNote}</p>
            </section>

            <section className="mt-12 grid gap-10 sm:grid-cols-2">
              <div>
                <Heading>{t.includes}</Heading>
                <List items={TOUR_DETAILS[tourId].includes[locale]} />
              </div>
              <div>
                <Heading>{t.notIncluded}</Heading>
                <List items={content.notIncluded[locale]} mark="–" />
                <div className="mt-10">
                  <Heading>{t.idealFor}</Heading>
                  <List items={content.idealFor[locale]} />
                </div>
              </div>
            </section>

            <section className="mt-12">
              <Heading>{t.arrival}</Heading>
              <p className="leading-relaxed text-[#10231e]/80">{content.arrival[locale]}</p>
              {tour.transport === "own" && (
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=20.851221,-87.1276722"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block font-semibold text-[#0b4638] underline underline-offset-4"
                >
                  {t.directions}
                </a>
              )}
            </section>

            <section className="mt-12 grid gap-10 sm:grid-cols-2">
              <div>
                <Heading>{t.bring}</Heading>
                <List items={VISIT_NOTES[locale].bring} />
              </div>
              <div>
                <Heading>{t.rules}</Heading>
                <List items={VISIT_NOTES[locale].rules} mark="•" />
              </div>
            </section>

            <section className="mt-12">
              <Heading>{t.faq}</Heading>
              <div className="divide-y divide-[#10231e]/12 border-y border-[#10231e]/12">
                {content.faqs[locale].map((item) => (
                  <div key={item.q} className="py-5">
                    <h3 className="font-semibold">{item.q}</h3>
                    <p className="mt-2 leading-relaxed text-[#10231e]/75">{item.a}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-col gap-2 text-sm font-semibold sm:flex-row sm:gap-6">
                <Link href={localizedHref("/faq", locale)} className="text-[#0b4638] underline underline-offset-4">{t.moreFaq}</Link>
                <Link href={STATIC_ROUTES.guide[locale]} className="text-[#0b4638] underline underline-offset-4">{t.guide}</Link>
              </div>
            </section>

            <p className="mt-10 text-sm text-[#10231e]/55">{t.updated}</p>
          </div>

          <aside className="border border-[#10231e]/12 bg-white p-6 lg:sticky lg:top-28 sm:p-8">
            <dl className="divide-y divide-[#10231e]/10">
              {facts.map(([label, value]) => (
                <div key={label} className="py-3.5 first:pt-0">
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[#0b7760]">{label}</dt>
                  <dd className="mt-1 text-[#10231e]/85">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <BokunButton
                tourId={tour.id}
                label={online ? t.bookOnline : t.bookWhatsapp}
                whatsappMessage={t.message(name)}
                tourName={name}
                source="tour_page"
                className={buttonClass}
              />
            </div>
            <Link href={STATIC_ROUTES.experiences[locale]} className="mt-4 block text-center text-sm font-semibold text-[#0b4638] underline underline-offset-4">
              {t.allTours}
            </Link>
          </aside>
        </div>

        <section className="mt-20">
          <Heading>{t.others}</Heading>
          <div className="grid gap-5 md:grid-cols-3">
            {others.map((item) => (
              <Link key={item.id} href={tourPath(item.id, locale)} className="group block border border-[#10231e]/12 bg-white">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={locale === "es" ? item.nameEs : item.nameEn}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={`object-cover ${item.imagePosition ?? "object-center"} transition duration-500 group-hover:scale-105`}
                  />
                </div>
                <div className="p-5">
                  <p className="font-semibold leading-snug">{locale === "es" ? item.nameEs : item.nameEn}</p>
                  <p className="mt-2 text-sm text-[#0b7760]">
                    {t.from} {locale === "es" ? `$${item.fromMXN?.toLocaleString("es-MX")} MXN` : `$${item.fromUSD} USD`} {t.person}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
