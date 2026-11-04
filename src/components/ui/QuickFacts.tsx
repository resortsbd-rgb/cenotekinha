"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { STATIC_ROUTES } from "@/lib/routes";
import { TOURS } from "@/lib/stripe";

// Resumen directo: responde en un párrafo qué es Kin-Ha, dónde está, cuánto cuesta y cómo llegar.
// Es el bloque que un buscador o un asistente de IA puede citar tal cual.
const prices = TOURS.flatMap((tour) => (tour.fromMXN && tour.fromUSD ? [{ mxn: tour.fromMXN, usd: tour.fromUSD }] : []));
const MIN_MXN = Math.min(...prices.map((price) => price.mxn)).toLocaleString("es-MX");
const MAX_MXN = Math.max(...prices.map((price) => price.mxn)).toLocaleString("es-MX");
const MIN_USD = Math.min(...prices.map((price) => price.usd));
const MAX_USD = Math.max(...prices.map((price) => price.usd));

const COPY = {
  es: {
    eyebrow: "Lo esencial",
    title: "¿Qué es Cenotes Kin-Ha?",
    answer: `Cenotes Kin-Ha es un parque de aventura en la Ruta de los Cenotes de Puerto Morelos, cerca de Cancún. En un mismo día nadas en dos cenotes distintos: Kin-Ha, una caverna con luz natural, y Blanca Flor, abierto al cielo. Puedes sumar ATV, tirolesas y paseo a caballo. Los tours cuestan de $${MIN_MXN} a $${MAX_MXN} MXN por persona.`,
    facts: [
      ["Ubicación", "Ruta de los Cenotes, Puerto Morelos, Quintana Roo"],
      ["Horario", "Todos los días, de 9:00 am a 5:00 pm"],
      ["Transporte", "Desde hoteles de Cancún, Puerto Morelos y Playa del Carmen"],
      ["Cancelación", "Gratis hasta 24 horas antes"],
    ],
    link: "Cómo elegir tu tour de cenotes",
  },
  en: {
    eyebrow: "The essentials",
    title: "What is Kin-Ha Cenotes?",
    answer: `Kin-Ha Cenotes is an adventure park on the Ruta de los Cenotes in Puerto Morelos, near Cancún. In one day you swim in two very different cenotes: Kin-Ha, a cavern lit by natural light, and open-air Blanca Flor. You can add ATVs, zip lines and horseback riding. Tours cost from $${MIN_USD} to $${MAX_USD} USD per person.`,
    facts: [
      ["Location", "Ruta de los Cenotes, Puerto Morelos, Quintana Roo"],
      ["Hours", "Every day, 9:00am to 5:00pm"],
      ["Pickup", "From hotels in Cancún, Puerto Morelos and Playa del Carmen"],
      ["Cancellation", "Free up to 24 hours before"],
    ],
    link: "How to choose your cenote tour",
  },
};

export default function QuickFacts() {
  const { locale } = useLanguage();
  const t = COPY[locale];
  return (
    <section className="bg-[#f6f1e7] px-5 py-16 text-[#10231e] sm:px-8 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#0b7760]">{t.eyebrow}</p>
          <h2 className="text-balance text-4xl font-medium leading-[1] tracking-[-0.03em] md:text-5xl">{t.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-[#10231e]/75">{t.answer}</p>
          <Link href={STATIC_ROUTES.guide[locale]} className="mt-6 inline-block font-semibold text-[#0b4638] underline underline-offset-4 hover:text-[#0b7760]">
            {t.link}
          </Link>
        </div>
        <dl className="divide-y divide-[#10231e]/12 border-y border-[#10231e]/12">
          {t.facts.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-4">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[#0b7760]">{label}</dt>
              <dd className="text-[#10231e]/80">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
