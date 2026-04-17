import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact");
  return (
    <section className="max-w-2xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-teal-800 mb-4">{t("title")}</h1>
      <p className="text-lg text-gray-600 mb-8">{t("subtitle")}</p>
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <input type="text" placeholder="Nombre" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400 outline-none" />
        <input type="email" placeholder="Email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400 outline-none" />
        <textarea rows={5} placeholder="Mensaje" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400 outline-none resize-none" />
        <button className="w-full bg-teal-600 text-white font-semibold py-3 rounded-full hover:bg-teal-500 transition">
          Enviar mensaje
        </button>
      </div>
    </section>
  );
}
