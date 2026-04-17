import { useTranslations } from "next-intl";

export default function GalleryPage() {
  const t = useTranslations("gallery");
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-teal-800 mb-4">{t("title")}</h1>
      <p className="text-lg text-gray-600 mb-12">{t("subtitle")}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-square bg-teal-100 rounded-xl" />
        ))}
      </div>
    </section>
  );
}
