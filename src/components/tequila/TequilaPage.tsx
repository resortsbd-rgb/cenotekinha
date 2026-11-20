import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { STATIC_ROUTES, tourPath } from "@/lib/routes";
import { TOURS, MAIN_TOURS_FILTER } from "@/lib/stripe";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/structuredData";
import type { Locale } from "@/lib/translations";

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
      ["Lotes pequeños", "Cada lote es distinto"],
      ["Incluido", "En cada experiencia Kin-Ha"],
    ],
    storyEyebrow: "La historia",
    storyH2: "Un destilado con domicilio.",
    lead1:
      "Hay cosas que no se pueden apurar. Un agave azul tarda años en estar listo. Un lote toma el tiempo que necesita. Y no hay dos lotes que salgan exactamente iguales.",
    lead2:
      "Ese es el tequila que abrimos para ti en Kin-Ha: hecho despacio, en lotes pequeños, y pensado para probarse despacio también.",
    chapters: [
      ["Empieza en la tierra", "Cada botella empieza como agave azul creciendo en Jalisco, el corazón del país del tequila. Tarda años en estar listo y nadie puede apurarlo."],
      ["Hecho con paciencia", "El tequila artesanal se hace en lotes pequeños, por productores que se toman su tiempo. Ese cuidado se nota al probarlo."],
      ["Ningún sorbo es igual", "Cada lote sale distinto, así que los sabores son únicos. Lo que pruebas en Kin-Ha no es copia de nada más."],
      ["Y llega a la selva", "De Jalisco a la Ruta de los Cenotes. Aquí, entre los árboles y el agua turquesa, la botella se abre para ti. Algo tan especial no se hizo para dejarlo pasar."],
    ],
    noteEyebrow: "Desde la mesa de cata",
    noteBig: "Hay bebidas que se terminan. Y hay otras que se recuerdan. Levanta la copa, respira, tómalo despacio y deja que este lugar se quede contigo.",
    noteSmall: "Palabras del equipo que guía la cata en Kin-Ha.",
    colEyebrow: "La colección",
    colH2: "Sobre la mesa.",
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
      { q: "¿Qué es el tequila artesanal?", a: "Es tequila elaborado en lotes pequeños y con mucho cuidado en el proceso. Por eso cada lote tiene sabores propios y no hay dos iguales." },
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
      ["Small batch", "Every lot is different"],
      ["Included", "In every Kin-Ha experience"],
    ],
    storyEyebrow: "The story",
    storyH2: "A spirit with an address.",
    lead1:
      "Some things cannot be rushed. A blue agave takes years to be ready. A batch takes the time it needs. And no two batches come out quite the same.",
    lead2:
      "That is the tequila we open for you at Kin-Ha: made slowly, in small batches, and meant to be tasted slowly too.",
    chapters: [
      ["It starts in the earth", "Every bottle begins as blue agave growing in Jalisco, the heart of tequila country. It takes years to be ready, and nobody can hurry it."],
      ["Made with patience", "Artisanal tequila is made in small batches by producers who take their time. That care is something you can taste."],
      ["No two sips alike", "Every batch comes out different, so the flavors are truly unique. What you taste at Kin-Ha is not a copy of anything else."],
      ["Then it reaches the jungle", "From Jalisco to the Ruta de los Cenotes. Here, among the trees and the turquoise water, the bottle is opened for you. Something this special is not meant to be skipped."],
    ],
    noteEyebrow: "From the tasting table",
    noteBig: "Some drinks you finish. Some you remember. Lift the glass, breathe in, take it slowly, and let this place stay with you.",
    noteSmall: "Words from the team that leads the tasting at Kin-Ha.",
    colEyebrow: "The collection",
    colH2: "On the table.",
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
      { q: "What is artisanal tequila?", a: "It is tequila made in small batches with great care in the process. That is why every batch has its own flavors and no two are the same." },
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

const EYEBROW = "text-xs font-bold uppercase tracking-[0.24em] text-[#5fd1d6]";
const H2 = "font-[family-name:var(--font-heading)] text-4xl font-medium leading-[1.05] tracking-[-0.01em] sm:text-5xl lg:text-6xl";
const BTN_PRIMARY =
  "inline-flex min-h-14 items-center justify-center rounded-full bg-[#c9792e] px-8 py-4 font-bold text-white transition hover:bg-[#d99a4e]";
const BTN_GHOST =
  "inline-flex min-h-14 items-center justify-center rounded-full border border-white/40 px-8 py-4 font-medium text-[#f6f1e7] transition hover:bg-white/10";

export default function TequilaPage({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const path = STATIC_ROUTES.tequila[locale];
  const mainTours = TOURS.filter(MAIN_TOURS_FILTER);

  return (
    <article className="bg-[#0a1411] text-[#f6f1e7]">
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

      {/* HERO */}
      <section className="mx-auto flex max-w-6xl flex-wrap items-center gap-14 px-5 pb-20 pt-32 sm:px-8">
        <div className="min-w-0 flex-[1_1_28rem]">
          <p className={`${EYEBROW} mb-5`}>{t.eyebrow}</p>
          <h1 className="mb-6 font-[family-name:var(--font-heading)] text-5xl font-medium leading-[1.02] tracking-[-0.01em] sm:text-6xl lg:text-7xl">
            {t.h1a} <em className="text-[#d99a4e]">{t.h1b}</em>
          </h1>
          <p className="mb-9 max-w-xl text-lg text-[#f6f1e7]/80 sm:text-xl">{t.sub}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={STATIC_ROUTES.booking[locale]} className={BTN_PRIMARY}>
              {t.ctaBook} →
            </Link>
            <a href="#tours" className={BTN_GHOST}>
              {t.ctaTours}
            </a>
          </div>
        </div>
        <figure className="min-w-[16rem] flex-[0_1_26rem]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-3xl border border-white/15">
            <Image
              src="/images/tequila-atalaje-cenote.webp"
              alt={t.heroAlt}
              fill
              priority
              sizes="(max-width: 768px) 90vw, 420px"
              className="object-cover object-[50%_60%]"
            />
          </div>
          <figcaption className="mt-3 text-center text-sm text-[#f6f1e7]/60">{t.heroCaption}</figcaption>
        </figure>
      </section>

      {/* FACTS */}
      <section className="border-y border-white/10 bg-[#0e1b16]">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-6 px-5 py-7 sm:px-8 lg:grid-cols-4">
          {t.facts.map(([big, small]) => (
            <div key={big}>
              <dt className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#d99a4e]">{big}</dt>
              <dd className="text-sm text-[#f6f1e7]/65">{small}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* STORY */}
      <section className="mx-auto flex max-w-6xl flex-wrap gap-16 px-5 py-24 sm:px-8">
        <div className="min-w-0 flex-[1_1_22rem]">
          <p className={`${EYEBROW} mb-4`}>{t.storyEyebrow}</p>
          <h2 className={`${H2} mb-6`}>{t.storyH2}</h2>
          <p className="mb-5 text-lg text-[#f6f1e7]/80">{t.lead1}</p>
          <p className="text-lg text-[#f6f1e7]/80">{t.lead2}</p>
        </div>
        <ol className="min-w-0 flex-[1.2_1_28rem]">
          {t.chapters.map(([title, body], index) => (
            <li key={title} className="flex gap-7 border-t border-white/10 py-8">
              <span aria-hidden="true" className="w-14 shrink-0 font-[family-name:var(--font-heading)] text-5xl italic leading-none text-[#d99a4e]">
                {["I", "II", "III", "IV"][index]}
              </span>
              <div className="min-w-0">
                <h3 className="mb-2 font-[family-name:var(--font-heading)] text-3xl font-semibold leading-tight">{title}</h3>
                <p className="text-[#f6f1e7]/80">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* TASTING NOTE */}
      <section className="border-y border-white/10 bg-[#11201b]">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
          <p className={`${EYEBROW} mb-5`}>{t.noteEyebrow}</p>
          <p className="mb-5 font-[family-name:var(--font-heading)] text-3xl font-medium italic leading-snug sm:text-4xl">{t.noteBig}</p>
          <p className="text-[#f6f1e7]/65">{t.noteSmall}</p>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <p className={`${EYEBROW} mb-4`}>{t.colEyebrow}</p>
          <h2 className={`${H2} mb-4`}>{t.colH2}</h2>
          <p className="text-lg text-[#f6f1e7]/80">{t.colSub}</p>
        </div>
        <div className="flex flex-wrap items-start gap-14">
          <div className="relative aspect-[9/16] w-full max-w-md min-w-[16rem] flex-[0_1_28rem] overflow-hidden rounded-3xl border border-white/15">
            <Image
              src="/images/tequila-botellas-kinha.webp"
              alt={t.lineupAlt}
              fill
              sizes="(max-width: 768px) 90vw, 448px"
              className="object-cover"
            />
          </div>
          <ul className="flex min-w-0 flex-[1_1_24rem] flex-col gap-3">
            {t.bottles.map(([kind, name, line], index) => (
              <li key={name} className="flex items-center gap-5 rounded-2xl border border-white/10 bg-[#11201b] px-6 py-5">
                <span aria-hidden="true" className="font-[family-name:var(--font-heading)] text-3xl italic text-[#d99a4e]">{index + 1}</span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#5fd1d6]">{kind}</p>
                  <p className="font-[family-name:var(--font-heading)] text-2xl font-semibold leading-tight">{name}</p>
                  <p className="text-sm text-[#f6f1e7]/70">{line}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TAKE HOME */}
      <section className="border-y border-white/10 bg-[#0e1b16]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-14 px-5 py-24 sm:px-8">
          <figure className="min-w-[16rem] flex-[0_1_26rem]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/15">
              <Image
                src="/images/tequila-damiana-vela.webp"
                alt={t.damianaAlt}
                fill
                sizes="(max-width: 768px) 90vw, 420px"
                className="object-cover object-[50%_45%]"
              />
            </div>
            <figcaption className="mt-3 text-sm text-[#f6f1e7]/60">{t.damianaCaption}</figcaption>
          </figure>
          <div className="min-w-0 flex-[1_1_24rem]">
            <p className={`${EYEBROW} mb-4`}>{t.takeEyebrow}</p>
            <h2 className={`${H2} mb-6`}>{t.takeH2}</h2>
            <p className="text-lg text-[#f6f1e7]/80">{t.takeBody}</p>
          </div>
        </div>
      </section>

      {/* TOURS */}
      <section id="tours" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
        <div className="mb-12 max-w-2xl">
          <p className={`${EYEBROW} mb-4`}>{t.toursEyebrow}</p>
          <h2 className={`${H2} mb-4`}>{t.toursH2}</h2>
          <p className="text-lg text-[#f6f1e7]/80">{t.toursSub}</p>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mainTours.map((tour) => (
            <li key={tour.id}>
              <Link
                href={tourPath(tour.id, locale)}
                className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-[#11201b] p-7 transition hover:border-[#5fd1d6] hover:bg-[#172a24]"
              >
                <span className="font-[family-name:var(--font-heading)] text-2xl font-semibold leading-tight">
                  {locale === "es" ? tour.nameEs : tour.nameEn}
                </span>
                <span className="flex-1 text-sm text-[#f6f1e7]/70">{locale === "es" ? tour.descEs : tour.descEn}</span>
                <span className="text-sm font-bold text-[#5fd1d6]">{t.discover} →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        <h2 className="mb-8 font-[family-name:var(--font-heading)] text-4xl font-medium leading-tight">{t.faqTitle}</h2>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {t.faqs.map((item) => (
            <div key={item.q} className="py-5">
              <h3 className="font-semibold">{item.q}</h3>
              <p className="mt-2 leading-relaxed text-[#f6f1e7]/75">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="border-t border-white/10 bg-[#11201b]">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
          <h2 className="mb-5 font-[family-name:var(--font-heading)] text-5xl font-medium leading-[1.02] sm:text-6xl lg:text-7xl">
            {t.endH2a} <em className="text-[#d99a4e]">{t.endH2b}</em>
          </h2>
          <p className="mb-9 text-lg text-[#f6f1e7]/80 sm:text-xl">{t.endSub}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={STATIC_ROUTES.booking[locale]} className={BTN_PRIMARY}>
              {t.ctaBook} →
            </Link>
            <Link href={STATIC_ROUTES.pickup[locale]} className={BTN_GHOST}>
              {t.ctaPickup}
            </Link>
          </div>
          <p className="mt-10 text-sm text-[#f6f1e7]/55">{t.legal}</p>
        </div>
      </section>
    </article>
  );
}
