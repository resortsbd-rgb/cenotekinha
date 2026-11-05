import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import HeroCarousel from "@/components/ui/HeroCarousel";
import { PICKUP_SLIDES } from "@/lib/heroSlides";
import { STATIC_ROUTES, tourPath } from "@/lib/routes";
import { TOURS, MAIN_TOURS_FILTER } from "@/lib/stripe";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structuredData";
import type { Locale } from "@/lib/translations";

// Solo zonas confirmadas por Luis (nov-2026). Horarios por zona: agregar cuando estén confirmados.
const WHATSAPP = "529982053527";

const COPY = {
  es: {
    home: "Inicio",
    crumb: "Recogida en hotel",
    title: "Tours de cenotes con recogida en tu hotel",
    lead: "Recogemos en hoteles desde Playacar y Playa del Carmen hasta Puerto Morelos, Cancún e Isla Blanca. Si ya estás de viaje, puedes reservar un tour con transporte hasta 8 horas antes de la recogida.",
    zones: [
      { id: "cancun", title: "Desde Cancún e Isla Blanca", text: "La van sale de hoteles de Isla Blanca, como Planet Hollywood, Riu Dunamar y Garza Blanca, y sigue recogiendo por la Zona Hotelera de Cancún." },
      { id: "playa", title: "Desde Playa del Carmen y Playacar", text: "La van sale de Playacar y recoge en el camino hacia Puerto Morelos antes de subir a la Ruta de los Cenotes." },
      { id: "puerto-morelos", title: "Desde Puerto Morelos", text: "Puerto Morelos queda en el camino hacia la Ruta de los Cenotes. Si tienes auto, también puedes llegar por tu cuenta y reservar solo la entrada a los dos cenotes." },
    ],
    vanAlt: "Van de transporte en la entrada de Cenotes Kin-Ha",
    vanCaption: "Una de las vans en la entrada de Kin-Ha.",
    southTitle: "¿Te hospedas al sur de Playacar o fuera de estas zonas?",
    south: "Escríbenos por WhatsApp antes de reservar para confirmar si podemos recogerte.",
    southCta: "Preguntar por WhatsApp",
    southMessage: "Hola, quiero un tour en Cenotes Kin-Ha. ¿Pueden recogerme en mi hotel? Me hospedo en:",
    toursTitle: "Tours que incluyen recogida",
    from: "Desde",
    person: "por persona",
    ownTitle: "¿Vienes en tu auto?",
    own: "Puedes llegar entre las 9:30 am y las 3:00 pm. El estacionamiento es gratis.",
    ownLink: "Ver entrada a los dos cenotes",
    faqTitle: "Preguntas sobre la recogida",
    faqs: [
      { q: "¿Hasta cuándo puedo reservar un tour con recogida?", a: "Hasta 8 horas antes de la recogida." },
      { q: "¿A qué hora pasan por mí?", a: "Hay dos salidas diarias. La hora depende de tu hotel y te la confirmamos después de reservar. Conviene estar listo 10 minutos antes." },
      { q: "¿Por qué me piden mi número de habitación?", a: "Porque la seguridad de muchos hoteles lo exige para dar acceso al conductor." },
      { q: "¿Cuánto dura el traslado?", a: "Depende de tu hotel. Te lo confirmamos junto con la hora de recogida." },
    ],
  },
  en: {
    home: "Home",
    crumb: "Hotel pickup",
    title: "Cenote Tours with Hotel Pickup",
    lead: "We pick up at hotels from Playacar and Playa del Carmen to Puerto Morelos, Cancún and Isla Blanca. Already on vacation? You can book a tour with pickup as late as 8 hours before pickup.",
    zones: [
      { id: "cancun", title: "From Cancún and Isla Blanca", text: "The van starts at Isla Blanca resorts such as Planet Hollywood, Riu Dunamar and Garza Blanca, then picks up through Cancún's Hotel Zone." },
      { id: "playa", title: "From Playa del Carmen and Playacar", text: "The van starts in Playacar and picks up along the way to Puerto Morelos before heading up the Ruta de los Cenotes." },
      { id: "puerto-morelos", title: "From Puerto Morelos", text: "Puerto Morelos is on the way to the Ruta de los Cenotes. If you have a car, you can also drive yourself and book two-cenote admission only." },
    ],
    vanAlt: "Transport van at the entrance of Kin-Ha Cenotes",
    vanCaption: "One of the vans at the Kin-Ha entrance.",
    southTitle: "Staying south of Playacar or outside these areas?",
    south: "Message us on WhatsApp before booking so we can confirm whether we can pick you up.",
    southCta: "Ask on WhatsApp",
    southMessage: "Hi, I'd like a tour at Kin-Ha Cenotes. Can you pick me up at my hotel? I'm staying at:",
    toursTitle: "Tours that include pickup",
    from: "From",
    person: "per person",
    ownTitle: "Driving yourself?",
    own: "You can arrive between 9:30am and 3:00pm. Parking is free.",
    ownLink: "See two-cenote admission",
    faqTitle: "Hotel pickup questions",
    faqs: [
      { q: "How late can I book a tour with pickup?", a: "Up to 8 hours before pickup." },
      { q: "What time will you pick me up?", a: "There are two departures a day. The time depends on your hotel and we confirm it after you book. Please be ready 10 minutes early." },
      { q: "Why do you ask for my room number?", a: "Because security at many resorts requires it to give the driver access." },
      { q: "How long is the ride?", a: "It depends on your hotel. We confirm it along with your pickup time." },
    ],
  },
};

export default function PickupPage({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const path = STATIC_ROUTES.pickup[locale];
  const pickupTours = TOURS.filter((tour) => MAIN_TOURS_FILTER(tour) && tour.transport === "pickup");

  return (
    <div className="bg-[#f6f1e7] pb-24 text-[#10231e]">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.home, path: STATIC_ROUTES.home[locale] },
          { name: t.crumb, path },
        ])}
      />
      <JsonLd data={faqJsonLd(t.faqs)} />

      <HeroCarousel slides={PICKUP_SLIDES}>
        <h1 className="max-w-3xl text-balance text-4xl font-medium leading-[1.02] tracking-[-0.03em] [text-shadow:0_2px_16px_rgba(0,0,0,.45)] md:text-6xl">{t.title}</h1>
      </HeroCarousel>

      <div className="mx-auto max-w-3xl px-5 pt-10 sm:px-8">
        <p className="text-lg leading-relaxed text-[#10231e]/80">{t.lead}</p>

        {t.zones.map((zone) => (
          <section key={zone.id} id={zone.id} className="mt-12 scroll-mt-24">
            <h2 className="mb-3 text-3xl font-medium leading-tight tracking-[-0.02em]">{zone.title}</h2>
            <p className="text-lg leading-relaxed text-[#10231e]/80">{zone.text}</p>
          </section>
        ))}

        <figure className="mt-12">
          <div className="relative aspect-[3/2] w-full overflow-hidden">
            <Image
              src="/images/transporte-van-kinha.webp"
              alt={t.vanAlt}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-2 text-sm text-[#10231e]/65">{t.vanCaption}</figcaption>
        </figure>

        <section className="mt-12 border border-[#10231e]/12 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-medium leading-tight">{t.southTitle}</h2>
          <p className="mt-3 leading-relaxed text-[#10231e]/80">{t.south}</p>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t.southMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-[#0b4638] px-6 py-3 font-bold text-white transition hover:bg-[#0b7760]"
          >
            {t.southCta}
          </a>
        </section>

        <section className="mt-12">
          <h2 className="mb-5 text-3xl font-medium leading-tight tracking-[-0.02em]">{t.toursTitle}</h2>
          <ul className="divide-y divide-[#10231e]/12 border-y border-[#10231e]/12">
            {pickupTours.map((tour) => (
              <li key={tour.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <Link href={tourPath(tour.id, locale)} className="font-semibold underline underline-offset-4 hover:text-[#0b7760]">
                  {locale === "es" ? tour.nameEs : tour.nameEn}
                </Link>
                <span className="shrink-0 text-sm text-[#0b7760]">
                  {t.from} {locale === "es" ? `$${tour.fromMXN?.toLocaleString("es-MX")} MXN` : `$${tour.fromUSD} USD`} {t.person}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="mb-3 text-3xl font-medium leading-tight tracking-[-0.02em]">{t.ownTitle}</h2>
          <p className="leading-relaxed text-[#10231e]/80">{t.own}</p>
          <Link href={tourPath("cenote-dual", locale)} className="mt-3 inline-block font-semibold text-[#0b4638] underline underline-offset-4">
            {t.ownLink}
          </Link>
        </section>

        <section className="mt-12">
          <h2 className="mb-3 text-3xl font-medium leading-tight tracking-[-0.02em]">{t.faqTitle}</h2>
          <div className="divide-y divide-[#10231e]/12 border-y border-[#10231e]/12">
            {t.faqs.map((item) => (
              <div key={item.q} className="py-5">
                <h3 className="font-semibold">{item.q}</h3>
                <p className="mt-2 leading-relaxed text-[#10231e]/75">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
