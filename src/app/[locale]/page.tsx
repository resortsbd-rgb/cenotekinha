import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import HeroSlider from "@/components/ui/HeroSlider";

const highlights = [
  {
    img: "/images/cenote7.png",
    titleEs: "Cenote Cueva",
    titleEn: "Cave Cenote",
    descEs: "Estalactitas milenarias y agua cristalina en un escenario único.",
    descEn: "Ancient stalactites and crystal water in a unique setting.",
  },
  {
    img: "/images/cenote5.png",
    titleEs: "Tour ATV",
    titleEn: "ATV Tour",
    descEs: "Recorre la selva maya en cuatrimoto antes de sumergirte.",
    descEn: "Explore the Mayan jungle on ATV before diving in.",
  },
  {
    img: "/images/cenote6.png",
    titleEs: "Rappel & Zip-line",
    titleEn: "Rappel & Zip-line",
    descEs: "Adrenalina pura sobre el cenote con equipo profesional.",
    descEn: "Pure adrenaline over the cenote with professional gear.",
  },
];

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="flex flex-col">
      <HeroSlider />

      {/* Highlights */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-teal-500 mb-3">
            Experiencias
          </p>
          <h2 className="text-center text-4xl font-bold text-gray-900 mb-16">
            {t("cta_explore")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((h) => (
              <div key={h.titleEs} className="group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={h.img}
                    alt={h.titleEs}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-teal-900 mb-2">{h.titleEs}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{h.descEs}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-28 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero4.png" alt="Cenote Kin-Ha" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-teal-900/75" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">¿Listo para sumergirte?</h2>
          <p className="text-teal-200 mb-8 text-lg">Reserva hoy y vive la experiencia Kin-Ha</p>
          <Link
            href="/es/booking"
            className="inline-block bg-teal-400 text-teal-900 font-bold px-10 py-4 rounded-full hover:bg-teal-300 transition text-lg shadow-lg"
          >
            {t("cta_book")}
          </Link>
        </div>
      </section>
    </div>
  );
}
