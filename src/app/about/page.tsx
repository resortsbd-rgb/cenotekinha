"use client";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPage() {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-teal-800 mb-4">{t.about.title}</h1>
      <p className="text-lg text-gray-600">{t.about.subtitle}</p>
    </section>
  );
}
