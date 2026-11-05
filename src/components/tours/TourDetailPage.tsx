import Image from "next/image";
import Link from "next/link";
import BokunButton from "@/components/booking/BokunButton";
import JsonLd from "@/components/seo/JsonLd";
import HeroCarousel from "@/components/ui/HeroCarousel";
import { TOUR_SLIDES, TOUR_STORY } from "@/lib/heroSlides";
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
    pickup: "Incluido, desde hoteles entre Playacar, Puerto Morelos, Cancún e Isla Blanca",
    own: "Llegas en tu auto, con estacionamiento gratis",
    booking: "Reserva",
    online: "En línea, con calendario y pago seguro",
    whatsapp: "Por WhatsApp",
    lastMinute: "Último momento",
    lastMinuteValue: "Reserva hasta 8 horas antes de la recogida",
    pickupLink: "Ver zonas de recogida",
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
    pickup: "Included, from hotels between Playacar, Puerto Morelos, Cancún and Isla Blanca",
    own: "Arrive by car, with free parking",
    booking: "Booking",
    online: "Online, with live calendar and secure payment",
    whatsapp: "On WhatsApp",
    lastMinute: "Last minute",
    lastMinuteValue: "Book as late as 8 hours before pickup",
    pickupLink: "See pickup areas",
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

function Fold({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-[#10231e]/12">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <span aria-hidden="true" className="text-2xl leading-none text-[#0b7760] transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="pb-6">{children}</div>
    </details>
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
    ...(tour.transport === "own" ? [] : ([[t.lastMinute, t.lastMinuteValue]] as [string, string][])),
    [t.cancellation, t.free],
  ];
  const buttonClass =
    "inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#c9792e] px-8 py-4 text-center font-bold text-white transition hover:bg-[#d99a4e]";

  return (
    <div className="bg-[#f6f1e7] pb-24 text-[#10231e]">
      <JsonLd data={tourJsonLd(tour.id, locale, content.activities[locale])} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqJsonLd(content.faqs[locale])} />

      <HeroCarousel
        slides={TOUR_SLIDES[tourId]}
        title={name}
        actions={
          <div className="hidden flex-wrap items-center gap-5 lg:flex">
            <div className="w-64">
              <BokunButton
                tourId={tour.id}
                label={online ? t.bookOnline : t.bookWhatsapp}
                whatsappMessage={t.message(name)}
                tourName={name}
                source="tour_page_hero"
                className={buttonClass}
              />
            </div>
            <p className="text-lg text-white/90">
              {t.from} <strong className="font-semibold text-white">{price}</strong> {t.person} · {t.free}
            </p>
          </div>
        }
      />

      {/* Lo esencial, directo: este párrafo es el que pueden citar buscadores y asistentes. */}
      <section className="bg-[#062c24] px-5 py-14 text-white sm:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <nav aria-label={locale === "es" ? "Ruta de navegación" : "Breadcrumb"} className="mb-8 text-sm text-white/60">
            <Link href={breadcrumbs[0].path} className="hover:underline">{t.home}</Link>
            <span aria-hidden="true"> / </span>
            <Link href={breadcrumbs[1].path} className="hover:underline">{t.tours}</Link>
            <span aria-hidden="true"> / </span>
            <span>{name}</span>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
            <div>
              <p className="text-xl leading-relaxed text-white/90 lg:text-2xl lg:leading-relaxed">{fillPrice(content.answer[locale], tour, locale)}</p>
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm text-[#69d8cb] underline underline-offset-4 hover:text-white">
                {t.rating}
              </a>
            </div>
            <dl className="divide-y divide-white/15 border-y border-white/15">
              {facts.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5">
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-[#69d8cb]">{label}</dt>
                  <dd className="text-white/85">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* La historia del día: una foto a pantalla completa por cada momento. */}
      <section aria-label={t.activities}>
        {TOUR_STORY[tourId].map((beat, index) => (
          <article key={beat.slide.id} className="relative flex min-h-[88svh] items-end overflow-hidden bg-[#06292a] text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/hero/${beat.slide.id}-1600.webp`}
              srcSet={`/images/hero/${beat.slide.id}-828.webp 828w, /images/hero/${beat.slide.id}-1600.webp 1600w`}
              sizes="100vw"
              alt={beat.slide.alt[locale]}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover ${beat.slide.position}`}
            />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#031a15]/95 via-[#031a15]/50 to-transparent" />
            <div className="story-reveal relative mx-auto w-full max-w-6xl px-5 pb-14 sm:px-8 lg:pb-20">
              <p className="mb-3 text-sm font-bold tracking-[0.2em] text-[#e8b06a]">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="max-w-3xl text-balance font-serif text-[clamp(2.5rem,5.5vw,5rem)] font-medium leading-[0.98] tracking-[-0.03em] [text-shadow:0_4px_24px_rgba(0,0,0,.45)]">
                {beat.title[locale]}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/90">{beat.text[locale]}</p>
            </div>
          </article>
        ))}
      </section>

      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 lg:pt-24">
        <section>
          <Heading>{t.activities}</Heading>
          <List items={content.activities[locale]} />
          <p className="mt-4 text-sm text-[#10231e]/60">{t.orderNote}</p>
        </section>

        <section className="mt-14 grid gap-10 md:grid-cols-3">
          <div>
            <Heading>{t.includes}</Heading>
            <List items={TOUR_DETAILS[tourId].includes[locale]} />
          </div>
          <div>
            <Heading>{t.notIncluded}</Heading>
            <List items={content.notIncluded[locale]} mark="–" />
          </div>
          <div>
            <Heading>{t.idealFor}</Heading>
            <List items={content.idealFor[locale]} />
          </div>
        </section>

        <section className="mt-14 border-t border-[#10231e]/12">
          <Fold title={t.arrival}>
            <p className="leading-relaxed text-[#10231e]/80">{content.arrival[locale]}</p>
            {tour.transport !== "own" && (
              <Link href={STATIC_ROUTES.pickup[locale]} className="mt-3 inline-block font-semibold text-[#0b4638] underline underline-offset-4">
                {t.pickupLink}
              </Link>
            )}
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
          </Fold>
          <Fold title={t.bring}>
            <List items={VISIT_NOTES[locale].bring} />
          </Fold>
          <Fold title={t.rules}>
            <List items={VISIT_NOTES[locale].rules} mark="•" />
          </Fold>
        </section>

        <section className="mt-14">
          <Heading>{t.faq}</Heading>
          <div className="border-t border-[#10231e]/12">
            {content.faqs[locale].map((item) => (
              <Fold key={item.q} title={item.q}>
                <p className="leading-relaxed text-[#10231e]/75">{item.a}</p>
              </Fold>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-2 text-sm font-semibold sm:flex-row sm:gap-6">
            <Link href={localizedHref("/faq", locale)} className="text-[#0b4638] underline underline-offset-4">{t.moreFaq}</Link>
            <Link href={STATIC_ROUTES.guide[locale]} className="text-[#0b4638] underline underline-offset-4">{t.guide}</Link>
            <Link href={STATIC_ROUTES.experiences[locale]} className="text-[#0b4638] underline underline-offset-4">{t.allTours}</Link>
          </div>
        </section>

        <p className="mt-10 text-sm text-[#10231e]/55">{t.updated}</p>

        <section className="mt-16">
          <Heading>{t.others}</Heading>
          <div className="grid gap-5 md:grid-cols-3">
            {others.map((item) => (
              <Link key={item.id} href={tourPath(item.id, locale)} className="group relative block h-72 overflow-hidden bg-[#06292a] text-white">
                <Image
                  src={item.image}
                  alt={locale === "es" ? item.nameEs : item.nameEn}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={`object-cover ${item.imagePosition ?? "object-center"} transition duration-700 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031a15]/90 via-[#031a15]/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-lg font-semibold leading-snug">{locale === "es" ? item.nameEs : item.nameEn}</p>
                  <p className="mt-1 text-sm text-white/85">
                    {t.from} {locale === "es" ? `$${item.fromMXN?.toLocaleString("es-MX")} MXN` : `$${item.fromUSD} USD`} {t.person}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* En teléfono, el precio y el botón siempre a la vista: quien ya está en destino decide rápido. */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-[#10231e]/12 bg-white px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,.12)] lg:justify-end lg:px-10">
        <p className="shrink-0 text-sm leading-tight">
          <span className="block text-[#10231e]/65">{t.from}</span>
          <strong className="text-base">{price}</strong>
        </p>
        <div className="min-w-0 flex-1 lg:w-64 lg:flex-none">
          <BokunButton
            tourId={tour.id}
            label={online ? t.bookOnline : t.bookWhatsapp}
            whatsappMessage={t.message(name)}
            tourName={name}
            source="tour_page_sticky"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#c9792e] px-4 py-2 text-center text-sm font-bold text-white"
          />
        </div>
      </div>
    </div>
  );
}
