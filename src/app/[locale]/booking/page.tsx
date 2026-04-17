import { useTranslations } from "next-intl";

export default function BookingPage() {
  const t = useTranslations("booking");
  return (
    <section className="max-w-2xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-teal-800 mb-4">{t("title")}</h1>
      <p className="text-lg text-gray-600 mb-8">{t("subtitle")}</p>
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experiencia</label>
          <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400 outline-none">
            <option>Snorkel</option>
            <option>Rappel</option>
            <option>Tour Nocturno</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
          <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Personas</label>
          <input type="number" min={1} max={20} defaultValue={2} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400 outline-none" />
        </div>
        <button className="w-full bg-teal-600 text-white font-semibold py-3 rounded-full hover:bg-teal-500 transition">
          Continuar al pago
        </button>
      </div>
    </section>
  );
}
