import { useTranslations } from "next-intl";

export default function ExperiencesPage() {
  const t = useTranslations("experiences");
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-teal-800 mb-4">{t("title")}</h1>
      <p className="text-lg text-gray-600 mb-12">{t("subtitle")}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {["Snorkel", "Rappel", "Tour Nocturno"].map((exp) => (
          <div key={exp} className="bg-teal-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="h-40 bg-teal-200 rounded-xl mb-4" />
            <h3 className="text-xl font-semibold text-teal-900">{exp}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
