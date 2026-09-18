"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const stats = [
  { value: "2", es: "cenotes únicos", en: "unique cenotes" },
  { value: "3", es: "tirolesas", en: "zip lines" },
  { value: "2", es: "salidas diarias", en: "daily departures" },
  { value: "✓", es: "transportación disponible", en: "transportation available" },
];

export default function StatsSection() {
  const { locale } = useLanguage();

  return (
    <section className="bg-[#f6f1e7] px-4 py-14 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 border-y border-[#0b4638]/15 md:grid-cols-4">
        {stats.map(({ value, es, en }, index) => (
          <div
            key={es}
            className={`flex min-h-36 flex-col justify-center px-4 py-7 text-center ${
              index % 2 ? "border-l border-[#0b4638]/15" : ""
            } md:border-l md:first:border-l-0`}
          >
            <span className="font-serif text-4xl text-[#0b4638] md:text-5xl">{value}</span>
            <span className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0b4638]/65">
              {locale === "es" ? es : en}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
