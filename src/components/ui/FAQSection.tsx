"use client";
import { useState } from "react";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";

// Las respuestas siempre están en el HTML: solo se ocultan a la vista hasta que la persona
// abre la pregunta. Así Google (y los buscadores con IA) pueden leerlas.
export default function FAQSection({ asPageTitle = false }: { asPageTitle?: boolean }) {
  const Heading = asPageTitle ? "h1" : "h2";
  const { locale } = useLanguage();
  const t = translations[locale];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section id="faq" className="bg-gray-50 py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 mb-3">FAQ</p>
          <Heading className="text-4xl md:text-5xl font-bold text-gray-900">{t.faq.title}</Heading>
        </div>

        <div className="space-y-3">
          {t.faq.items.map((item, i) => {
            const isOpen = openIndex === i;
            const panelId = `${asPageTitle ? "faq-page" : "faq"}-answer-${i}`;
            return (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-sm md:text-base">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 text-teal-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                <div
                  id={panelId}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
