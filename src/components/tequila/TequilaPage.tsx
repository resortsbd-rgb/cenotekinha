import Image from "next/image";
import { Libre_Caslon_Text } from "next/font/google";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { STATIC_ROUTES, tourPath } from "@/lib/routes";
import { TOURS, MAIN_TOURS_FILTER } from "@/lib/stripe";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/structuredData";
import type { Locale } from "@/lib/translations";

const caslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-caslon",
  display: "swap",
});

// Historia del tequila artesanal que se ofrece en la degustación de Cenotes Kin-Ha.
// Sin precios a propósito: los precios viven en las páginas de cada tour.
const DATE_MODIFIED = "2026-11-20";

const COPY = {
  es: {
    home: "Inicio",
    breadcrumb: "Tequila artesanal",
    headline: "Tequila artesanal en Cenotes Kin-Ha: la historia de un sorbo que no se repite",
    eyebrow: "Tequila tasting · Incluido en cada experiencia",
    h1a: "Un sorbo que",
    h1b: "no se repite.",
    sub: "Empieza en los campos de agave azul de Jalisco, se toma su tiempo y termina en tus manos, en plena selva. En Kin-Ha, cada visitante lo prueba.",
    ctaBook: "Reservar mi aventura",
    ctaTours: "Elige tu aventura",
    heroAlt: "Botella de tequila Atalaje Añejo sobre una roca frente a un cenote azul iluminado en Cenotes Kin-Ha",
    heroCaption: "Atalaje Añejo, fotografiado dentro del cenote.",
    facts: [
      ["Jalisco, México", "Donde nace el tequila"],
      ["Agave azul", "La planta detrás de cada botella"],
      ["Cada lote es distinto", "Sabores únicos"],
      ["Incluido", "En cada experiencia Kin-Ha"],
    ],
    storyEyebrow: "La historia",
    storyH2: "La historia",
    lead1:
      "Hay cosas que no se pueden apurar. Un agave azul tarda años en estar listo. Un lote toma el tiempo que necesita. Y no hay dos lotes que salgan exactamente iguales.",
    lead2:
      "Ese es el tequila que abrimos para ti en Kin-Ha: hecho despacio, lote por lote, y pensado para probarse despacio también.",
    chapters: [
      ["Empieza en la tierra", "Cada botella empieza como agave azul creciendo en Jalisco, el corazón del país del tequila. Tarda años en estar listo y nadie puede apurarlo."],
      ["Hecho con paciencia", "El tequila artesanal se hace con cuidado en cada paso del proceso. Ese cuidado se nota al probarlo."],
      ["Ningún sorbo es igual", "Cada lote sale distinto, así que los sabores son únicos. Lo que pruebas en Kin-Ha no es copia de nada más."],
      ["Y llega a la selva", "De Jalisco a la Ruta de los Cenotes. Aquí, entre los árboles y el agua turquesa, la botella se abre para ti. Algo tan especial no se hizo para dejarlo pasar."],
    ],
    noteEyebrow: "Desde la mesa de cata",
    noteBig: "Hay bebidas que se terminan. Y hay otras que se recuerdan. Levanta la copa, respira, tómalo despacio y deja que este lugar se quede contigo.",
    noteSmall: "Palabras del equipo que guía la cata en Kin-Ha.",
    colEyebrow: "La colección",
    colH2: "Carta de cata",
    colSub: "Botellas reales, fotografiadas en Kin-Ha. Tequilas y licores de la selección actual; puede variar según el día.",
    lineupAlt: "Cinco botellas en fila sobre un muro de piedra en la selva: tequila Reposado Aguascalientes, tequila Añejo Atalaje y licores Cabo Único de chocolate, vainilla y damiana",
    bottles: [
      ["Tequila Reposado", "Aguascalientes", "Reposado en madera antes de embotellar."],
      ["Tequila Añejo", "Atalaje", "Añejado más tiempo en madera. Etiqueta metálica grabada."],
      ["Licor", "Cabo Único · Chocolate", "La etiqueta amarilla."],
      ["Licor", "Cabo Único · Vainilla", "La etiqueta roja."],
      ["Licor", "Cabo Único · Damiana", "La etiqueta azul."],
    ],
    takeEyebrow: "Para llevar",
    takeH2: "Que la historia no termine aquí.",
    takeBody:
      "Etiquetas grabadas, tapones de madera, un color distinto para cada botella. Las que ves en esta página están a la venta: pregunta por la tuya al terminar tu cata y llévate el sabor a casa.",
    damianaAlt: "Botella de licor Cabo Único Damiana junto a una vela amarilla encendida sobre una mesa de madera oscura",
    damianaCaption: "Licor Cabo Único Damiana.",
    toursEyebrow: "Tu capítulo de la historia",
    toursH2: "Elige cómo llegar. La cata va contigo.",
    toursSub: "El tequila tasting forma parte de cada experiencia Kin-Ha.",
    discover: "Descúbrelo",
    faqTitle: "Preguntas sobre la cata de tequila",
    faqs: [
      { q: "¿La degustación de tequila está incluida?", a: "Sí. La degustación de tequila forma parte de todas las experiencias de Cenotes Kin-Ha." },
      { q: "¿Qué es el tequila artesanal?", a: "Es tequila elaborado con mucho cuidado en el proceso. Por eso cada lote tiene sabores propios y no hay dos iguales." },
      { q: "¿De qué se hace el tequila?", a: "Todo tequila se elabora con agave azul (Weber) y solo puede producirse en las zonas de México autorizadas por su denominación de origen, principalmente en Jalisco." },
      { q: "¿Qué botellas puedo probar en Kin-Ha?", a: "La selección actual incluye los tequilas Aguascalientes Reposado y Atalaje Añejo, y los licores Cabo Único de chocolate, vainilla y damiana. La selección puede variar según el día." },
      { q: "¿Puedo comprar una botella?", a: "Sí. Las botellas de la colección están a la venta: pregunta por la tuya al terminar tu cata." },
      { q: "¿Quién puede participar en la degustación?", a: "Solo adultos mayores de 18 años. Disfruta con moderación." },
    ],
    endH2a: "Pruébalo.",
    endH2b: "Luego, al agua.",
    endSub: "Ven por los cenotes. Llévate una historia que vas a querer contar.",
    ctaPickup: "Recogida en hotel",
    legal: "Solo para mayores de edad. Disfruta con moderación.",
  },
  en: {
    home: "Home",
    breadcrumb: "Artisanal tequila",
    headline: "Artisanal tequila at Kin-Ha Cenotes: the story of a sip that never repeats",
    eyebrow: "Tequila tasting · Included in every experience",
    h1a: "A sip that",
    h1b: "never repeats.",
    sub: "It begins in the blue agave fields of Jalisco, takes its time, and ends in your hands, in the middle of the jungle. At Kin-Ha, every guest gets to taste it.",
    ctaBook: "Book my adventure",
    ctaTours: "Choose your adventure",
    heroAlt: "Bottle of Atalaje Añejo tequila on a stone ledge in front of a glowing blue cenote at Kin-Ha Cenotes",
    heroCaption: "Atalaje Añejo, photographed inside the cenote.",
    facts: [
      ["Jalisco, México", "Where tequila is born"],
      ["Blue agave", "The plant behind every bottle"],
      ["Every batch is different", "Unique flavors"],
      ["Included", "In every Kin-Ha experience"],
    ],
    storyEyebrow: "The story",
    storyH2: "The story",
    lead1:
      "Some things cannot be rushed. A blue agave takes years to be ready. A batch takes the time it needs. And no two batches come out quite the same.",
    lead2:
      "That is the tequila we open for you at Kin-Ha: made slowly, batch by batch, and meant to be tasted slowly too.",
    chapters: [
      ["It starts in the earth", "Every bottle begins as blue agave growing in Jalisco, the heart of tequila country. It takes years to be ready, and nobody can hurry it."],
      ["Made with patience", "Artisanal tequila is made with care at every step of the process. That care is something you can taste."],
      ["No two sips alike", "Every batch comes out different, so the flavors are truly unique. What you taste at Kin-Ha is not a copy of anything else."],
      ["Then it reaches the jungle", "From Jalisco to the Ruta de los Cenotes. Here, among the trees and the turquoise water, the bottle is opened for you. Something this special is not meant to be skipped."],
    ],
    noteEyebrow: "From the tasting table",
    noteBig: "Some drinks you finish. Some you remember. Lift the glass, breathe in, take it slowly, and let this place stay with you.",
    noteSmall: "Words from the team that leads the tasting at Kin-Ha.",
    colEyebrow: "The collection",
    colH2: "Tasting menu",
    colSub: "Real bottles, photographed at Kin-Ha. Tequilas and liqueurs from the current selection; it may vary by day.",
    lineupAlt: "Five bottles in a row on a stone wall in the jungle: Aguascalientes Reposado tequila, Atalaje Añejo tequila, and Cabo Único chocolate, vanilla and damiana liqueurs",
    bottles: [
      ["Reposado tequila", "Aguascalientes", "Rested in wood before bottling."],
      ["Añejo tequila", "Atalaje", "Aged longer in wood. Embossed metal label."],
      ["Liqueur", "Cabo Único · Chocolate", "The yellow label."],
      ["Liqueur", "Cabo Único · Vanilla", "The red label."],
      ["Liqueur", "Cabo Único · Damiana", "The blue label."],
    ],
    takeEyebrow: "Take it home",
    takeH2: "Do not let the story end here.",
    takeBody:
      "Embossed labels, wooden stoppers, a different color for every bottle. The ones you see on this page are for sale: ask for yours at the end of your tasting and take the flavor home.",
    damianaAlt: "Bottle of Cabo Único Damiana liqueur next to a lit yellow candle on a dark wooden table",
    damianaCaption: "Cabo Único Damiana liqueur.",
    toursEyebrow: "Your chapter of the story",
    toursH2: "Choose how you arrive. The tasting comes with you.",
    toursSub: "Tequila tasting is part of every Kin-Ha experience.",
    discover: "Discover it",
    faqTitle: "Questions about the tequila tasting",
    faqs: [
      { q: "Is the tequila tasting included?", a: "Yes. The tequila tasting is part of every experience at Kin-Ha Cenotes." },
      { q: "What is artisanal tequila?", a: "It is tequila made with great care in the process. That is why every batch has its own flavors and no two are the same." },
      { q: "What is tequila made from?", a: "All tequila is made from blue (Weber) agave and can only be produced in the areas of México covered by its denomination of origin, mainly in Jalisco." },
      { q: "Which bottles can I taste at Kin-Ha?", a: "The current selection includes Aguascalientes Reposado and Atalaje Añejo tequilas, plus Cabo Único chocolate, vanilla and damiana liqueurs. The selection may vary by day." },
      { q: "Can I buy a bottle?", a: "Yes. The bottles in the collection are for sale: ask for yours at the end of your tasting." },
      { q: "Who can join the tasting?", a: "Adults 18 and older only. Please enjoy responsibly." },
    ],
    endH2a: "Taste it.",
    endH2b: "Then jump in.",
    endSub: "Come for the cenotes. Leave with a story you will want to tell.",
    ctaPickup: "Hotel pickup info",
    legal: "For adults only. Please enjoy responsibly.",
  },
};

const SERIF = { fontFamily: "var(--font-caslon, 'Libre Caslon Text'), Georgia, serif" };
const SANS = { fontFamily: "var(--font-body), system-ui, sans-serif" };
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 .95  0 0 0 0 .85  0 0 0 .05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const H2 = "text-3xl font-normal leading-tight sm:text-4xl lg:text-5xl";
const BTN_PRIMARY =
  "inline-flex min-h-14 items-center justify-center rounded-sm bg-[#efe6d3] px-9 py-4 text-base font-bold tracking-wide text-[#14100d] transition hover:bg-white";
const BTN_GHOST =
  "inline-flex min-h-14 items-center justify-center rounded-sm border border-[#efe6d3]/50 px-9 py-4 text-base text-[#efe6d3] transition hover:border-[#efe6d3] hover:bg-[#efe6d3]/10";
const HAIR = "border-[#b59a6a]/35";
const DIM = "text-[#efe6d3]/75";

export default function TequilaPage({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const path = STATIC_ROUTES.tequila[locale];
  const mainTours = TOURS.filter(MAIN_TOURS_FILTER);

  return (
    <article
      className={`${caslon.variable} bg-[#14100d] text-[#efe6d3]`}
      style={{ ...SERIF, backgroundImage: GRAIN }}
    >
      <JsonLd
        data={articleJsonLd({
          headline: t.headline,
          description: t.sub,
          path,
          locale,
          dateModified: DATE_MODIFIED,
          image: "/images/tequila-atalaje-cenote.webp",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.home, path: STATIC_ROUTES.home[locale] },
          { name: t.breadcrumb, path },
        ])}
      />
      <JsonLd data={faqJsonLd(t.faqs)} />

      {/* PORTADA */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-12 lg:items-end lg:gap-16">
        <div className="lg:col-span-6">
          <p className="mb-6 text-lg italic text-[#b59a6a]">{t.eyebrow}</p>
          <h1 className="mb-8 text-5xl font-normal leading-[1.05] sm:text-6xl lg:text-7xl" style={SERIF}>
            {t.h1a} <em>{t.h1b}</em>
          </h1>
          <p className={`mb-10 max-w-lg text-xl leading-relaxed ${DIM}`}>{t.sub}</p>
          <div className="flex flex-wrap gap-3" style={SANS}>
            <Link href={STATIC_ROUTES.booking[locale]} className={BTN_PRIMARY}>
              {t.ctaBook}
            </Link>
            <a href="#tours" className={BTN_GHOST}>
              {t.ctaTours}
            </a>
          </div>
        </div>
        <figure className="lg:col-span-6">
          <div className="border border-[#efe6d3]/20 p-3">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/tequila-atalaje-cenote.webp"
                alt={t.heroAlt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 560px"
                className="object-cover object-[50%_58%]"
              />
            </div>
          </div>
          <figcaption className="mt-3 text-sm italic text-[#efe6d3]/60">{t.heroCaption}</figcaption>
        </figure>
      </section>

      <p className={`mx-auto max-w-6xl border-y ${HAIR} px-5 py-5 text-center text-base italic text-[#efe6d3]/70 sm:px-8`}>
        {t.facts.map(([big]) => big).join("  ·  ")}
      </p>

      {/* HISTORIA */}
      <section className="mx-auto max-w-2xl px-5 py-28 sm:px-8">
        <h2 className={`${H2} mb-10`} style={SERIF}>{t.storyH2}</h2>
        <p className="mb-6 text-xl leading-[1.8] first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-[#b59a6a]">
          {t.lead1}
        </p>
        <p className={`mb-12 text-xl leading-[1.8] ${DIM}`}>{t.lead2}</p>
        <div className="space-y-8">
          {t.chapters.map(([title, body]) => (
            <p key={title} className={`text-lg leading-[1.8] ${DIM}`}>
              <em className="text-[#efe6d3]">{title}. </em>
              {body}
            </p>
          ))}
        </div>
      </section>

      {/* VOZ DE LA CATA */}
      <section className={`border-y ${HAIR}`}>
        <blockquote className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
          <p className="mb-6 text-3xl italic leading-snug sm:text-4xl">{t.noteBig}</p>
          <footer className="text-base text-[#b59a6a]">{t.noteSmall}</footer>
        </blockquote>
      </section>

      {/* CARTA DE CATA */}
      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-28 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="border border-[#efe6d3]/20 p-3">
            <div className="relative aspect-[9/16] overflow-hidden">
              <Image
                src="/images/tequila-botellas-kinha.webp"
                alt={t.lineupAlt}
                fill
                sizes="(max-width: 1024px) 90vw, 440px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <h2 className={`${H2} mb-4`} style={SERIF}>{t.colH2}</h2>
          <p className={`mb-10 max-w-xl text-lg leading-relaxed ${DIM}`}>{t.colSub}</p>
          <ul className={`border-b ${HAIR}`}>
            {t.bottles.map(([kind, name, line]) => (
              <li key={name} className={`flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-t ${HAIR} py-6`}>
                <div className="min-w-0">
                  <p className="text-2xl sm:text-3xl" style={SERIF}>{name}</p>
                  <p className={`mt-1 text-base ${DIM}`}>{line}</p>
                </div>
                <p className="text-base italic text-[#b59a6a]">{kind}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PARA LLEVAR */}
      <section className={`border-y ${HAIR} bg-[#1b1612]/70`}>
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-28 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:order-2 lg:col-span-5">
            <figure>
              <div className="border border-[#efe6d3]/20 p-3">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/tequila-damiana-vela.webp"
                    alt={t.damianaAlt}
                    fill
                    sizes="(max-width: 1024px) 90vw, 440px"
                    className="object-cover object-[50%_45%]"
                  />
                </div>
              </div>
              <figcaption className="mt-3 text-sm italic text-[#efe6d3]/60">{t.damianaCaption}</figcaption>
            </figure>
          </div>
          <div className="lg:order-1 lg:col-span-7">
            <h2 className={`${H2} mb-8`} style={SERIF}>{t.takeH2}</h2>
            <p className={`max-w-xl text-xl leading-[1.8] ${DIM}`}>{t.takeBody}</p>
          </div>
        </div>
      </section>

      {/* EXPERIENCIAS */}
      <section id="tours" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-28 sm:px-8">
        <h2 className={`${H2} mb-4`} style={SERIF}>{t.toursH2}</h2>
        <p className={`mb-10 text-lg ${DIM}`}>{t.toursSub}</p>
        <ul className={`border-b ${HAIR}`}>
          {mainTours.map((tour) => (
            <li key={tour.id} className={`border-t ${HAIR}`}>
              <Link
                href={tourPath(tour.id, locale)}
                className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-6 transition hover:bg-[#efe6d3]/5"
              >
                <div className="min-w-0 max-w-xl">
                  <p className="text-2xl" style={SERIF}>{locale === "es" ? tour.nameEs : tour.nameEn}</p>
                  <p className={`mt-1 text-base ${DIM}`}>{locale === "es" ? tour.descEs : tour.descEn}</p>
                </div>
                <span className="text-base italic text-[#b59a6a] underline-offset-4 group-hover:underline">{t.discover} →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* PREGUNTAS */}
      <section className="mx-auto max-w-3xl px-5 pb-28 sm:px-8">
        <h2 className="mb-8 text-3xl font-normal leading-tight" style={SERIF}>{t.faqTitle}</h2>
        <div className={`divide-y divide-[#b59a6a]/35 border-y ${HAIR}`}>
          {t.faqs.map((item) => (
            <div key={item.q} className="py-6">
              <h3 className="text-xl font-normal" style={SERIF}>{item.q}</h3>
              <p className={`mt-2 text-lg leading-relaxed ${DIM}`}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CIERRE */}
      <section className={`border-t ${HAIR} bg-[#1b1612]/70`}>
        <div className="mx-auto max-w-3xl px-5 py-28 text-center sm:px-8">
          <h2 className="mb-6 text-5xl font-normal leading-[1.05] sm:text-6xl" style={SERIF}>
            {t.endH2a} <em>{t.endH2b}</em>
          </h2>
          <p className={`mb-10 text-xl ${DIM}`}>{t.endSub}</p>
          <div className="flex flex-wrap justify-center gap-3" style={SANS}>
            <Link href={STATIC_ROUTES.booking[locale]} className={BTN_PRIMARY}>
              {t.ctaBook}
            </Link>
            <Link href={STATIC_ROUTES.pickup[locale]} className={BTN_GHOST}>
              {t.ctaPickup}
            </Link>
          </div>
          <p className="mt-12 text-sm italic text-[#efe6d3]/55">{t.legal}</p>
        </div>
      </section>
    </article>
  );
}
