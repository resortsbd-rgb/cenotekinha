import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import HeroCarousel from "@/components/ui/HeroCarousel";
import { GUIDE_SLIDES } from "@/lib/heroSlides";
import { STATIC_ROUTES, tourPath } from "@/lib/routes";
import { TOURS, MAIN_TOURS_FILTER } from "@/lib/stripe";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/structuredData";
import { VISIT_NOTES } from "@/lib/tourContent";
import type { Locale } from "@/lib/translations";

const DATE_MODIFIED = "2026-11-05";
const MEXICO_DESCONOCIDO = "https://escapadas.mexicodesconocido.com.mx/atractivos/ruta-de-los-cenotes/";

const COPY = {
  es: {
    home: "Inicio",
    breadcrumb: "Guía de cenotes",
    title: "Cenotes cerca de Cancún: cómo elegir tu tour",
    description:
      "Qué es la Ruta de los Cenotes, en qué se diferencia un cenote de caverna de uno abierto, qué tour elegir, cómo llegar, qué llevar y las reglas para nadar.",
    lead: "Si te hospedas en Cancún o Playa del Carmen, la Ruta de los Cenotes de Puerto Morelos es una de las zonas donde puedes nadar en cenotes en plena selva. La mejor elección depende de tres cosas: si quieres adrenalina o un día tranquilo, si tienes auto y cuánto quieres gastar.",
    updated: "Actualizada el 5 de noviembre de 2026 por el equipo de Cenotes Kin-Ha.",
    whatTitle: "¿Qué es un cenote?",
    what: "Un cenote es una poza natural de agua dulce que se forma cuando se colapsa la roca caliza y queda expuesta el agua subterránea. Son característicos de la península de Yucatán y su agua suele ser muy clara porque se filtra a través de la roca.",
    routeTitle: "¿Qué es la Ruta de los Cenotes?",
    route: "Es el camino que entra a la selva desde Puerto Morelos, entre Cancún y Playa del Carmen, con cenotes abiertos, semiabiertos y de caverna a lo largo del trayecto.",
    routeSource: "México Desconocido incluye a Kin Ha entre los cenotes de esta ruta.",
    routeSourceLink: "Ver su guía de la ruta",
    typesTitle: "Cenote de caverna o cenote abierto: ¿cuál es la diferencia?",
    types: [
      ["Cenote de caverna", "Está bajo tierra, con techo de roca y formaciones como estalactitas. En Kin-Ha entra luz natural a la cueva y hay un columpio sobre el agua. Es ideal si te atrae lo subterráneo."],
      ["Cenote abierto", "Está al aire libre, rodeado de selva. El Cenote Blanca Flor está abierto al cielo y tiene plataformas para saltar. Es ideal si prefieres sol y espacio."],
    ],
    typesNote: "En Cenotes Kin-Ha no tienes que elegir: todas las experiencias incluyen los dos, con traslado de uno a otro.",
    chooseTitle: "¿Qué tour de cenotes elegir?",
    tableTour: "Tour",
    tablePrice: "Desde, por persona",
    tableBest: "Mejor para",
    best: {
      "atv-cenotes": "Aventura con transporte; también para viajeros solos",
      "tour-ecologico": "Familias y días tranquilos, sin ATV ni tirolesas",
      "cenote-dual": "Quien llega en su auto y solo quiere nadar",
      "experiencia-completa": "Probar todo en un día, desde 2 personas",
    },
    horse: "¿Prefieres caballo? El tour de ATV también se ofrece con cabalgata de 45 minutos al mismo precio.",
    horseLink: "Ver el tour a caballo",
    arriveTitle: "¿Cómo llegar a los cenotes desde Cancún o Playa del Carmen?",
    arrive: [
      ["Con transporte", "El Tour ecológico, el tour de ATV, el tour a caballo y la Aventura completa incluyen recogida en hoteles desde Playacar hasta Puerto Morelos, Cancún e Isla Blanca. El tiempo de traslado depende de tu hotel."],
      ["En tu auto", "Busca «Cenotes Kin-Ha» en Google Maps. Puedes llegar entre las 9:30 am y las 3:00 pm y el estacionamiento es gratis."],
    ],
    bring: "¿Qué llevar a un cenote?",
    rules: "Reglas para nadar",
    moreTitle: "Más preguntas",
    faqs: [
      { q: "¿Se puede usar bloqueador en los cenotes?", a: "En Cenotes Kin-Ha no se permite ningún bloqueador en el agua, ni biodegradable. Dúchate antes de entrar: el agua del cenote se contamina con facilidad." },
      { q: "¿Los cenotes son aptos para niños?", a: "En Cenotes Kin-Ha pueden participar niños desde 5 años, con chaleco salvavidas." },
      { q: "¿Hay que saber nadar para entrar a un cenote?", a: "En Cenotes Kin-Ha no es obligatorio, porque hay chalecos salvavidas para todos." },
    ],
    cta: "Ver tours y precios",
    faqLink: "Preguntas frecuentes",
  },
  en: {
    home: "Home",
    breadcrumb: "Cenote guide",
    title: "Cenotes Near Cancún: How to Choose Your Tour",
    description:
      "What the Ruta de los Cenotes is, how cave and open-air cenotes differ, which tour to pick, how to get there, what to bring and the rules for swimming.",
    lead: "If you're staying in Cancún or Playa del Carmen, the Ruta de los Cenotes in Puerto Morelos is one of the areas where you can swim in cenotes deep in the jungle. The best choice comes down to three things: whether you want adrenaline or a relaxed day, whether you have a car, and your budget.",
    updated: "Updated November 5, 2026 by the Kin-Ha Cenotes team.",
    whatTitle: "What is a cenote?",
    what: "A cenote is a natural freshwater pool that forms when limestone collapses and exposes the groundwater below. They're typical of the Yucatán Peninsula, and the water is often very clear because it filters through the rock.",
    routeTitle: "What is the Ruta de los Cenotes?",
    route: "It's the road that runs into the jungle from Puerto Morelos, between Cancún and Playa del Carmen, with open, semi-open and cave cenotes along the way.",
    routeSource: "México Desconocido lists Kin Ha among the cenotes on this route.",
    routeSourceLink: "See its route guide (in Spanish)",
    typesTitle: "Cave cenote vs open-air cenote: what's the difference?",
    types: [
      ["Cave cenote", "It's underground, with a rock ceiling and formations like stalactites. At Kin-Ha, natural light enters the cave and there's a swing over the water. Great if you're drawn to the underground world."],
      ["Open-air cenote", "It's outdoors, surrounded by jungle. Blanca Flor Cenote is open to the sky and has jumping platforms. Great if you prefer sun and space."],
    ],
    typesNote: "At Kin-Ha you don't have to choose: every experience includes both, with a ride from one to the other.",
    chooseTitle: "Which cenote tour should you choose?",
    tableTour: "Tour",
    tablePrice: "From, per person",
    tableBest: "Best for",
    best: {
      "atv-cenotes": "Adventure with pickup; solo travelers welcome",
      "tour-ecologico": "Families and relaxed days, with no ATV or zip lines",
      "cenote-dual": "Guests with a car who just want to swim",
      "experiencia-completa": "Trying everything in one day, from 2 people",
    },
    horse: "Prefer horses? The ATV tour is also available with a 45-minute horseback ride at the same price.",
    horseLink: "See the horseback tour",
    arriveTitle: "How do you get to the cenotes from Cancún or Playa del Carmen?",
    arrive: [
      ["With pickup", "The Eco Tour, ATV tour, horseback tour and Full Adventure include pickup from hotels between Playacar, Puerto Morelos, Cancún and Isla Blanca. Travel time depends on your hotel."],
      ["By car", "Search “Cenotes Kin-Ha” in Google Maps. You can arrive between 9:30am and 3:00pm, and parking is free."],
    ],
    bring: "What should you bring to a cenote?",
    rules: "Rules for swimming",
    moreTitle: "More questions",
    faqs: [
      { q: "Can you wear sunscreen in the cenotes?", a: "At Kin-Ha, no sunscreen of any kind is allowed in the water, not even biodegradable. Please shower before entering: cenote water is easily polluted." },
      { q: "Are cenotes good for kids?", a: "At Kin-Ha, children from age 5 can join with a life jacket." },
      { q: "Do you need to know how to swim to enter a cenote?", a: "At Kin-Ha it isn't required, because life jackets are available for everyone." },
    ],
    cta: "See tours & prices",
    faqLink: "FAQ",
  },
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 mt-14 text-3xl font-medium leading-tight tracking-[-0.02em]">{children}</h2>;
}

export default function GuidePage({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const path = STATIC_ROUTES.guide[locale];
  const mainTours = TOURS.filter(MAIN_TOURS_FILTER);
  const horseTour = TOURS.find((tour) => tour.id === "ecuestre-cenotes");

  return (
    <article className="bg-[#f6f1e7] pb-24 text-[#10231e]">
      <JsonLd
        data={articleJsonLd({ headline: t.title, description: t.description, path, locale, dateModified: DATE_MODIFIED })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.home, path: STATIC_ROUTES.home[locale] },
          { name: t.breadcrumb, path },
        ])}
      />
      <JsonLd data={faqJsonLd(t.faqs)} />

      <HeroCarousel slides={GUIDE_SLIDES} title={t.title} />

      <div className="mx-auto max-w-3xl px-5 pt-10 sm:px-8">
        <p className="text-lg leading-relaxed text-[#10231e]/80">{t.lead}</p>
        <p className="mt-4 text-sm text-[#10231e]/55">{t.updated}</p>

        <H2>{t.chooseTitle}</H2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm sm:text-base">
            <thead>
              <tr className="border-b-2 border-[#10231e]/20 text-xs uppercase tracking-[0.12em] text-[#0b7760]">
                <th scope="col" className="py-3 pr-4">{t.tableTour}</th>
                <th scope="col" className="py-3 pr-4">{t.tablePrice}</th>
                <th scope="col" className="py-3">{t.tableBest}</th>
              </tr>
            </thead>
            <tbody>
              {mainTours.map((tour) => (
                <tr key={tour.id} className="border-b border-[#10231e]/12 align-top">
                  <td className="py-4 pr-4 font-semibold">
                    <Link href={tourPath(tour.id, locale)} className="underline underline-offset-4 hover:text-[#0b7760]">
                      {locale === "es" ? tour.nameEs : tour.nameEn}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap py-4 pr-4">
                    {locale === "es" ? `$${tour.fromMXN?.toLocaleString("es-MX")} MXN` : `$${tour.fromUSD} USD`}
                  </td>
                  <td className="py-4 text-[#10231e]/80">{t.best[tour.id as keyof typeof t.best]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {horseTour && (
          <p className="mt-4 text-[#10231e]/80">
            {t.horse}{" "}
            <Link href={tourPath(horseTour.id, locale)} className="font-semibold underline underline-offset-4">{t.horseLink}</Link>
          </p>
        )}

        <H2>{t.whatTitle}</H2>
        <p className="text-lg leading-relaxed text-[#10231e]/80">{t.what}</p>

        <H2>{t.routeTitle}</H2>
        <p className="text-lg leading-relaxed text-[#10231e]/80">{t.route}</p>
        <p className="mt-3 text-[#10231e]/70">
          {t.routeSource}{" "}
          <a href={MEXICO_DESCONOCIDO} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
            {t.routeSourceLink}
          </a>
        </p>

        <H2>{t.typesTitle}</H2>
        <dl className="space-y-5">
          {t.types.map(([label, value]) => (
            <div key={label}>
              <dt className="font-semibold">{label}</dt>
              <dd className="mt-1 leading-relaxed text-[#10231e]/80">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 leading-relaxed text-[#10231e]/80">{t.typesNote}</p>

        <H2>{t.arriveTitle}</H2>
        <dl className="space-y-5">
          {t.arrive.map(([label, value]) => (
            <div key={label}>
              <dt className="font-semibold">{label}</dt>
              <dd className="mt-1 leading-relaxed text-[#10231e]/80">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-5">
          <Link href={STATIC_ROUTES.pickup[locale]} className="font-semibold underline underline-offset-4">
            {locale === "es" ? "Ver zonas de recogida" : "See pickup areas"}
          </Link>
        </p>

        <H2>{t.bring}</H2>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-[#10231e]/80">
          {VISIT_NOTES[locale].bring.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <H2>{t.rules}</H2>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-[#10231e]/80">
          {VISIT_NOTES[locale].rules.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <H2>{t.moreTitle}</H2>
        <div className="divide-y divide-[#10231e]/12 border-y border-[#10231e]/12">
          {t.faqs.map((item) => (
            <div key={item.q} className="py-5">
              <h3 className="font-semibold">{item.q}</h3>
              <p className="mt-2 leading-relaxed text-[#10231e]/75">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href={STATIC_ROUTES.experiences[locale]}
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#c9792e] px-8 py-4 font-bold text-white transition hover:bg-[#d99a4e]"
          >
            {t.cta}
          </Link>
          <Link href={STATIC_ROUTES.faq[locale]} className="text-center font-semibold text-[#0b4638] underline underline-offset-4">
            {t.faqLink}
          </Link>
        </div>
      </div>
    </article>
  );
}
