import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center bg-teal-900 text-white text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">{t("hero_title")}</h1>
          <p className="text-xl mb-8 text-teal-200">{t("hero_subtitle")}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/booking"
              className="bg-teal-400 text-teal-900 font-semibold px-8 py-3 rounded-full hover:bg-teal-300 transition"
            >
              {t("cta_book")}
            </Link>
            <Link
              href="/experiences"
              className="border border-white px-8 py-3 rounded-full hover:bg-white hover:text-teal-900 transition"
            >
              {t("cta_explore")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
