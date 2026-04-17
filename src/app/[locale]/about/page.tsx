import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");
  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-teal-800 mb-4">{t("title")}</h1>
      <p className="text-lg text-gray-600">{t("subtitle")}</p>
    </section>
  );
}
