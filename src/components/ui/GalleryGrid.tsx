"use client";
import Image from "next/image";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";
import BASE_PATH from "@/lib/basePath";

// Fotos reales de Kin-Ha (carpeta PICTURES de Luis), convertidas a webp.
const images = [
  {
    src: `${BASE_PATH}/images/galeria-tirolesa-casco.webp`,
    alt: { es: "Visitante con casco y arnés volando en la tirolesa sobre la selva de Kin-Ha", en: "Guest in helmet and harness flying on the zip line over the Kin-Ha jungle" },
    featured: true,
  },
  {
    src: `${BASE_PATH}/images/galeria-blanca-flor.webp`,
    alt: { es: "Vista desde arriba del agua turquesa del cenote Blanca Flor", en: "Looking down into the turquoise water of Blanca Flor cenote" },
  },
  {
    src: `${BASE_PATH}/images/galeria-cueva-luz.webp`,
    alt: { es: "Entrada de luz natural sobre el agua azul de la cueva Kin-Ha", en: "Natural light pouring into the blue water of the Kin-Ha cave" },
  },
  {
    src: `${BASE_PATH}/images/galeria-familia-cenote.webp`,
    alt: { es: "Familia con chalecos salvavidas nadando en el cenote Kin-Ha", en: "Family in life jackets swimming in the Kin-Ha cenote" },
  },
  {
    src: `${BASE_PATH}/images/galeria-plataforma-salto.webp`,
    alt: { es: "Plataformas de salto de madera sobre el cenote Blanca Flor", en: "Wooden jumping platforms above Blanca Flor cenote" },
  },
  {
    src: `${BASE_PATH}/images/galeria-tirolesa.webp`,
    alt: { es: "Niño feliz en la tirolesa entre la selva", en: "Happy kid on the zip line through the jungle" },
  },
  {
    src: `${BASE_PATH}/images/galeria-atv.webp`,
    alt: { es: "Visitante en cuatrimoto por un camino de la selva", en: "Guest riding an ATV on a jungle trail" },
  },
  {
    src: `${BASE_PATH}/images/galeria-caballo.webp`,
    alt: { es: "Paseo a caballo por un sendero de la selva", en: "Horseback ride on a jungle trail" },
  },
  {
    src: `${BASE_PATH}/images/galeria-grupo-cenote.webp`,
    alt: { es: "Grupo grande con chalecos salvavidas dentro del cenote", en: "Large group in life jackets inside the cenote" },
  },
];

export default function GalleryGrid({ asPageTitle = false }: { asPageTitle?: boolean }) {
  const Heading = asPageTitle ? "h1" : "h2";
  const { locale } = useLanguage();
  const t = translations[locale];

  return (
    <section id="gallery" className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 mb-3">
            {t.gallery.subtitle}
          </p>
          <Heading className="text-4xl md:text-5xl font-bold text-gray-900">
            {t.gallery.title}
          </Heading>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative aspect-square overflow-hidden rounded-xl group cursor-pointer${img.featured ? " col-span-2 row-span-2" : ""}`}
            >
              <Image
                src={img.src}
                alt={img.alt[locale]}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes={img.featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
