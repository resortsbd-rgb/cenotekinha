"use client";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <section className="max-w-2xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-teal-800 mb-4">{t.contact.title}</h1>
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <input type="text" placeholder={locale === "es" ? "Nombre" : "Name"} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400 outline-none" />
        <input type="email" placeholder="Email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400 outline-none" />
        <textarea rows={5} placeholder={locale === "es" ? "Mensaje" : "Message"} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400 outline-none resize-none" />
        <button className="w-full bg-teal-600 text-white font-semibold py-3 rounded-full hover:bg-teal-500 transition">
          {locale === "es" ? "Enviar mensaje" : "Send message"}
        </button>
      </div>
    </section>
  );
}
