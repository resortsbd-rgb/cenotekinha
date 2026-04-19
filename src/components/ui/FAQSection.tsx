"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FAQSection() {
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{t.faq.title}</h2>
        </div>

        <div className="space-y-3">
          {t.faq.items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-sm md:text-base">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-teal-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
