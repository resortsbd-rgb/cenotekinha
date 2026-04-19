"use client";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BookingPage() {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <section className="max-w-2xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-teal-800 mb-4">{t.booking.title}</h1>
      <p className="text-lg text-gray-600 mb-8">{t.booking.subtitle}</p>
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.booking.experience}</label>
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400 outline-none">
            <option>Sistema Dual Kin-Ha</option>
            <option>Portal Cueva + Rappel</option>
            <option>Experiencia Completa</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.booking.date}</label>
          <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.booking.people}</label>
          <input type="number" min={1} max={20} defaultValue={2} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400 outline-none" />
        </div>
        <button className="w-full bg-teal-600 text-white font-semibold py-3 rounded-full hover:bg-teal-500 transition">
          {t.booking.submit}
        </button>
      </div>
    </section>
  );
}
