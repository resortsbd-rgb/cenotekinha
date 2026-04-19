"use client";

import { translations } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";

const stats = [
  { value: "2", labelKey: "cenotes" as const, icon: "💧" },
  { value: "15+", labelKey: "years" as const, icon: "🌿" },
  { value: "50K+", labelKey: "visitors" as const, icon: "😊" },
  { value: "✓", labelKey: "certified" as const, icon: "🛡️" },
];

export default function StatsSection() {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <section className="bg-teal-800 py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
        {stats.map(({ value, labelKey, icon }) => (
          <div key={labelKey} className="flex flex-col items-center gap-2">
            <span className="text-3xl">{icon}</span>
            <span className="text-4xl md:text-5xl font-bold text-teal-200">{value}</span>
            <span className="text-sm text-teal-300 uppercase tracking-wide">
              {t.stats[labelKey]}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
